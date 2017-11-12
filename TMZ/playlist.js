// playlist
define('videos/playlist/1.0.1/playlist', [
	'jquery',
	'tmz/middleware/1.0.0/client',
	'templates/jst',
	'lib/nanoscroller/nanoscroller'],

function($, mwClient, handlebars, nano) {

	var exports = {};
	var $playlist = $('.playlist-wrapper');
	var $nano = $('.nano');
	var $unpublished = $('.unpublished-screen');

	// total # of playlist results
	var playlistTotal = 50;

	// default category ID and title
	var categoryId = 'bf9a9b17-f953-4656-93f7-213669145110';
	var categoryTitle = 'More Videos';


	function loadTaboola(entryID, prodURL) {
		//reload taboola ads
		window._taboola = window._taboola || [];
		_taboola.push({
			notify: 'newPageLoad'
		});
		_taboola.push({
			notify: 'videoPlay',
			id: entryID,
			url: prodURL
		});
		_taboola.push({
			mode: 'alternating-thumbnails-a',
			container: 'taboola-below-player-thumbnails',
			placement: 'Below Player Thumbnails',
			target_type: 'mix'
		});
		_taboola.push({
			flush: true
		});
	}

	function convertTime(duration) {
		// converts seconds to mm:ss format
		var minutes = Math.floor(duration / 60);
		var seconds = Math.round(duration % 60);
		var sec;

		if (minutes < 1) {
			time = '0:' + duration;
		} else {
			// leading zero
			seconds = seconds.toString();
			sec = seconds.length == 1 ? '0' + seconds : seconds;
			time = minutes + ':' + sec;
		}

		return time;
	}

	function getCurrentPosition($iframe) {
		var $current = $iframe.find('.chapterBox.active');
		var currentIndex = $current.index();
		var position = 0;
		var thisHeight;

		$.each($iframe.find('.chapterBox'), function(index, value) {
			if (index < currentIndex) {
				thisHeight = $(this).outerHeight();
				position = position + thisHeight;
			}
		});

		return position;
	}

	function playlistScrollTop($iframe, animate) {
		var position = getCurrentPosition($iframe);
		var $container = $('.nano-content');

		if (animate) {
			setTimeout(function() {
				$container.animate({
					scrollTop: position
				}, 'slow');
			}, 1500);
		} else {
			$container.scrollTop(position);
		}
	}

	function showUnpublished() {
		var populate = populatePlaylist(categoryId, categoryTitle);
		var $container = $('.kWidgetIframeContainer iframe');

		// show unpublished screen
		$container.html('');
		$unpublished.removeClass('hide');

		$.when(populate).done(function() {
			var $chapterBox = $('.chapterBox');

			$chapterBox.on('click', function() {
				var videoId = $(this).data('entryid');

				embedVideo(videoId); // pass id
				$unpublished.addClass('hide');
			});
		});
	}

	function checkIfPublished(slug) {
		// if no slug then play first video in playlist
		if (slug === '') {
			setupPlaylist();
			return;
		}

		var endpoint = '/api/v1/videos/slug/' + slug.replace('_', '-');

		mwClient.get(endpoint).done(function(response) {
			setupPlaylist();
		}).fail(function(response) {
			showUnpublished();
		});
	}

	function appendCurrentToPlaylist(kdp) {
		var slug = kdp.evaluate('{mediaProxy.entry.id}');
		var thumbnailUrl = kdp.evaluate('{mediaProxy.entry.thumbnailUrl}');
		var title = kdp.evaluate('{mediaProxy.entry.name}');
		var duration = kdp.evaluate('{mediaProxy.entry.duration}');
		var items = [];
		var output;

		items.push({
			slug: slug,
			thumbnailUrl: thumbnailUrl,
			title: title,
			duration: convertTime(duration),
			active: 1
		});

		// output playlist
		output = handlebars['videos/playlist']({
			items: items
		});
		$playlist.prepend(output);
	}

	function populatePlaylist(categoryId, categoryTitle) {
		var deferred = $.Deferred();
		var output;
		var items = [];
		var $playlistTitle = $('.playlistTitle');
		var endpoint = '/api/v1/videos/category/';
		var params = {
			page: 1,
			numRecords: playlistTotal,
			fields: 'primaryImage, primaryTabletImage'
		};
		var apiUrl = endpoint + categoryId + '?' + jQuery.param(params);

		mwClient.get(apiUrl).done(function(response) {
			// build playlist
			$.each(response.items, function(key, val) {
				var slug = val.additionalProperties.kalturaId;
				var active = (entryId == slug ? 1 : 0);

				// check for assets
				if (typeof val.assets.primaryImage == 'undefined') {
					console.log('Note: missing primary image for videoId: ' + slug);
					return true; // skip to next item
				}

				items.push({
					slug: slug,
					thumbnailUrl: val.assets.primaryImage[0].thumbnailUrls['150'],
					title: val.title,
					duration: convertTime(val.additionalProperties.duration),
					active: active
				});
			});

			// output playlist
			output = handlebars['videos/playlist']({
				items: items
			});
			$playlist.html(output);

			// playlist title
			$playlistTitle.html(categoryTitle);

			// init scrollbar
			$nano.nanoScroller();

			// if entry ID is not defined
			if (entryId == '') {
				// choose first entry in playlist
				$playlist.children('.chapterBox').first().addClass('active');
				entryId = items[0].slug;
			}

			deferred.resolve();
		});

		return deferred.promise();
	}

	function setupPlaylist() {
		// get current category
		if (sessionStorage.categoryName != '' && sessionStorage.categoryName != null) {
			var categorySlug = sessionStorage.categoryName;
			var catUrl = '/api/v1/categories/slug/' + categorySlug + '?fields=id';

			mwClient.get(catUrl).done(function(response) {
				categoryId = response.item.id;
				categoryTitle = response.item.title;

				// populate playlist
				var populate = populatePlaylist(categoryId, categoryTitle);
				$.when(populate).done(function() {
					// embed video player
					embedVideo();
				});
			});

			// clear session
			sessionStorage.categoryName = '';

		} else {
			// populate playlist
			var populate = populatePlaylist(categoryId, categoryTitle);
			$.when(populate).done(function() {
				// embed video player
				embedVideo();
			});
		}
	}

	function playNextVideo(direction) {
		// pass next or prev
		var $next;

		if (direction === 'prev') {
			$next = $playlist.find('.active').prev();
		} else {
			$next = $playlist.find('.active').next();
		}

		// play next video
		kdp.sendNotification("changeMedia", {
			'entryId': $next.data('entryid')
		});
	}

	function listeners() {

		$('.video-feed-item a').on('click', function(e) {
			// save session
			var category = $(this).parents('.category-wrapper').data('slug');
			sessionStorage.categoryName = category;
		});

	}

	function embedVideo(id) {
		// set default id
		if (id !== undefined) {
			entryId = id;
		}

		kWidget.embed({
			"targetId": "kaltura_player_" + cacheSt,
			"wid": "_591531",
			"uiconf_id": 35790831,
			"flashvars": {
				// "forceMobileHTML5": true,
				"metadataProfileId": 3071,
				"EmbedPlayer.HidePosterOnStart": false,
				"EmbedPlayer.BlackPixel": false,
				"requiredMetadataFields": true,
				//"playlistAPI.kpl0Id": "0_d6tofiro",
				"autoPlay": false,
				"IframeCustomPluginCss1": ASSETS_BASEURL + 'css/kaltura-player.css',
                "doubleClick": {
                        "plugin": true,
                        "disableCompanionAds": true,
                        "adTagUrl": "http://pubads.g.doubleclick.net/gampad/ads?ad_rule=0&adk=2422714230&ciu_szs=&cmsid=2904&correlator=4169585227988992&cust_params=category%3DTMZ-TV-Clips%2CAOL-AOL-On%2CNewslook&dt=1468596995078&env=vp&flash=22.0.0.209&frm=0&gdfp_req=1&ged=ve4_td7_tt0_pd7_la7000_er279.183.693.903_vi282.0.777.1440_vp99_ts0_eb23787&impl=s&kfa=0&lip=true&max_ad_duration=30000&min_ad_duration=0&mpt=kaltura%2FmwEmbed&mpv=2.40&osd=6&output=xml_vast3&pod=1&ppos=1&sarid=7104&scor=1221558095839232&sdkv=3.241.0&sdr=1&sf=2&sfu=vid&slotname=%2F55153744%2Ftmz%2Fvideo&sz=640x360&tfcd=0&u_ah=837&u_asa=1&u_aw=1440&u_cd=24&u_h=900&u_his=1&u_java=false&u_nmime=8&u_nplug=6&u_tz=180&u_w=1440&unviewed_position_start=1&url=http%3A%2F%2Fwww.tmz.com%2Fvideos%2F0_34nylh50%2F&vad_type=linear&video_doc_id=0_34nylh50&video_url_to_fetch=http%3A%2F%2Fwww.tmz.com%2Fvideos%2F0_34nylh50&vpos=preroll"
                        // "leadWithFlash": false
                    },
				"playlistAPI": {
					"autoPlay": false,
					"initItemEntryId": entryId,
					"kpl0Name": "More Videos"
				},
				"cust_params": "",
				"externalInterfaceDisabled": false,
				"loadingSpinner.plugin": false
			},
			'readyCallback': function(playerId) {

				var kdp = document.getElementById(playerId);
				var $iframe = $('#' + playerId + '_ifp').contents();
				var $chapterBox = $('.chapterBox');
				var $body = $('body');

				kdp.kBind('adEnd', function() {
					var entryID = kdp.evaluate('{mediaProxy.entry.id}');
					var prodURL = 'http://www.tmz.com/videos/' + entryID;
					loadTaboola(entryID, prodURL);
					$body.removeClass('ad-playing');
				});

				// kdp.kBind('adStart', function() {
				//	$body.addClass('ad-playing');
				// });

				kdp.kBind('changeMedia', function() {
					var current = kdp.evaluate('{mediaProxy.entry.id}');

					// change active
					$playlist.find('.active').removeClass('active');
					$playlist.find('[data-entryid="' + current + '"]').addClass('active');

					// scroll to active
					playlistScrollTop($playlist, 1);
				});

				kdp.kBind('playerPlayEnd', function() {
					playNextVideo('next');
				});

				kdp.kBind('mediaReady', function() {
					// check if current video is in playlist
					if ($playlist.find('.active').length == 0) {
						// append to playlist
						appendCurrentToPlaylist(kdp);
					}

					$chapterBox.off();

					$chapterBox.on('click', function() {
						var videoId = $(this).data('entryid');
						kdp.sendNotification("changeMedia", {
							'entryId': videoId
						});
					});

				});

				kdp.addJsListener("playlistPlayNext", function() {
					playNextVideo('next');
				});

				kdp.addJsListener("playlistPlayPrevious", function() {
					playNextVideo('prev');
				});
			},
			"cache_st": cacheSt,
			"entry_id": entryId
		});
	}

	exports.init = function() {
		// check if video is published, then setup playlist
		checkIfPublished(entryId);

		// event listeners
		listeners();
	}

	return exports;
});