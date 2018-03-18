/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var tooltip = new $.tooltip();
var fileID = 0;
var mediaID = 0;
var thirdPartyType = "";
var streamURL = "";
var canInitPlayer = true;

var opts = {
    lines: 13,
    length: 0,
    width: 15,
    radius: 31,
    scale: 1.5,
    corners: 1,
    color: '#FFF',
    opacity: 0.10,
    rotate: 0,
    direction: 1,
    speed: 0.8,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    className: 'spinner',
    top: '51%',
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'relative'
}

var spinnerTarget = null;
var spinner = null;

function onFilterSelected(val) {
    for (var ctrlName in appCtrl.coverflow) {
        appCtrl.coverflow[ctrlName].getDataProvider().filter({"filter": val});
    }
}

$(document).ready(function () {
    createControls(onCoverflowCreated);
    initFilterCombo(onFilterSelected, [
        {name: 'All', value: 'all', selected: true},
        {name: 'Free Only', value: 'free'},
        {name: 'Premium Only', value: 'premium'}
    ]);

    fileID = $("#fileIdHidden").val();
    mediaID = $("#mediaIdHidden").val();
    thirdPartyType = $("#thirdPartyType").val();
    streamURL = $("#streamURL").val();

    spinnerTarget = document.getElementById('video-loading-placeholder');
    spinner = new Spinner(opts).spin(spinnerTarget);

    var login = getCookie("login");
	var isFree = $('#video-player').attr('data-free');

	if ( '1' == isFree ) {
		canInitPlayer = true;
		$("#not-player").remove();
		$("#video-player").removeClass("hiddenBlock");
	} else {
		notSubscribedHandler(login);
	}

    var data = {
        srv: "asset",
        act: "getPrice",
        MediaID: mediaID,
        fileIds: [fileID],
        udid: getUDID()
    };

    if (login !== "") {
        login = JSON.parse(login);
        data.siteGuid = login.siteGuid;
        data.domainId = login.domainID;
    }

    loadFavorite(mediaID);

    if (fileID !== "") {
        $.ajax({
            url: serviceUrl,
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            error: function () {
                return false;
            },
            success: function (data) {
                if (data.prices[0].reason == "Free" || data.prices[0].reason == "SubscriptionPurchased") {
                    if (data.prices[0].reason == "Free") {
                        if (login === "") {
                            initPlayer(mediaID, thirdPartyType, streamURL, login);
                        } else {
                            checkDomains(login, thirdPartyType, streamURL, mediaID);
                        }
                    } else {
                        if (login != "" && login != undefined) {
                            checkDomains(login, thirdPartyType, streamURL, mediaID);
                        } else {
                            hidePlayer();
                        }
                    }
                } else if (data.prices[0].reason == "ForPurchase" || data.prices[0].reason == "ForPurchaseSubscriptionOnly") {
                    hidePlayer();
                } else {
                    showAlert("Warning", data.prices[0].reason);
                }
            }
        });
    } else {
        spinner.stop();
    }

    if (login !== "") {
        loadUserRate(mediaID);
    } else {
        $('.rating-stars').css('color', '#999999', 'important');
        $(".aggregateRating").remove();
    }

    function loadUserRate(mediaID) {
        $.ajax({
            url: serviceUrl,
            headers: {'T-timestamp': Date.now()},
            type: 'POST',
            data: JSON.stringify({
                srv: "useraction",
                act: "getUserAction",
                assetID: mediaID,
                userAction: "RATES",
                siteGuid: login.siteGuid,
                domainId: login.domainID
            }),
            dataType: 'json',
            error: function () {
                return false;
            },
            success: function (data) {
                if (data.rated) {
                    $('.rating-stars').css('color', '#dd0019');
                    $("#input-rating").val(data.rateValue);
                    $("#input-rating").rating('update', data.rateValue);

                    $(".ratingValue").attr("content", data.rateValue);
                }
            }
        });
    }

    function checkDomains(login, thirdPartyType, streamURL, entryID) {
        if (canInitPlayer === true) {
            $.ajax({
                url: serviceUrl,
                type: 'POST',
                data: JSON.stringify({
                    srv: "common",
                    act: "addDeviceToDomain",
                    udid: getUDID(),
                    siteGuid: login.siteGuid,
                    domainId: login.domainID,
                    sDeviceName: getUDID()
                }),
                dataType: 'json',
                error: function () {
                    return false;
                },
                success: function (data) {
                    if (data.kaltura_domain_response_status == "OK" || data.kaltura_domain_response_status == "DeviceAlreadyExists") {
                        initPlayer(entryID, thirdPartyType, streamURL, login);
                    } else if (data.kaltura_domain_response_status == "DeviceExistsInOtherDomains") {
                        generateUDIDByUser(login.siteGuid);
                        checkDomains(login, thirdPartyType, streamURL, entryID);
                    } else if (data.kaltura_domain_response_status == "ExceededLimit") {
                        spinner.stop();
                        showAlert("Warning", "You exceeded the device limitation with this user!");
                    } else {
                        spinner.stop();
                        showAlert("Warning", data.kaltura_domain_response_status);
                    }
                }
            });
        }
    }

    function initPlayer(entryID, thirdPartyPlayer, streamURL, login) {
                var mediaProxyKalturaToolKitVideo = {
                'entry':{
                    'id': "key_1",
                    "thumbnailUrl": 'http://cdnbakmi.kaltura.com/p/243342/sp/24334200/thumbnail/entry_id/1_sf5ovm7u/version/100003/width/640'
                },
                'entryCuePoints': [{
                    "protocolType": 1,
                    "adType": 1, 
                    "cuePointType": "adCuePoint.Ad",
                    "sourceUrl": "http://projects.kaltura.com/mdale/hotelVastAd.xml"
                }],
                "contextData":{
                    'isCountryRestricted': false
                },
                'entryMetadata': {
                    'thumbSlicesUrl': 'http://cdnbakmi.kaltura.com/p/243342/sp/24334200/thumbnail/entry_id/1_sf5ovm7u/version/100003/width/100/vid_slices/100',
                    'AgeGroup': "16"
                },
                'sources':[
                     {
                        "src":"http://urtmpkal-f.akamaihd.net/i/0tek2e78r_1@67885/master.m3u8",
                        "type":"application/vnd.apple.mpegurl"
                     }
                ]
            }
        if (thirdPartyPlayer === "kaltura") {
            $.getScript(playerURL, function () {
                mw.setConfig('forceMobileHTML5', true);
                kalturaLoader();
                kWidget.embed({
                    'targetId': 'kaltura_player',
                    'wid': '_243342',
                    'uiconf_id': kalturaVars.mtod_uiconf,
                    'flashvars': {
						"ks" : 123456,
                        'mediaProxy': mediaProxyKalturaToolKitVideo,
                        'EmbedPlayer.UseDirectManifestLinks': true,
                        "proxyData": {
                            "initObj": {
                                "Locale": {
                                    "LocaleLanguage": "",
                                    "LocaleCountry": "",
                                    "LocaleDevice": "",
                                    "LocaleUserState": "Unknown"
                                },
                                "Platform": "Web",
                                "SiteGuid": login !== "" ? login.siteGuid : "0",
                                "DomainID": login !== "" ? login.domainID : 0,
                                "UDID": getUDID(),
                                "ApiUser": playerUser,
                                "ApiPass": "11111"
                            },
                            "MediaID": entryID,
                            "iMediaID": entryID,
                            "mediaType": 0,
                            "withDynamic": false
                        },
                        'autoPlay': true
                    }
                });
            });
        } else if (thirdPartyPlayer == "1") {
            $("#kaltura_player").html('<iframe width="100%" height="595" src="' + streamURL + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
        } else if (thirdPartyPlayer == "2") {
            $("#kaltura_player").html('<iframe style="border: 0 none transparent;" src="' + streamURL + '?wmode=direct&amp;autoplay=true" width="100%" height="595" frameborder="no" allowfullscreen="true"></iframe>');
        } else if (thirdPartyPlayer == "3") {
            $("#kaltura_player").html('<iframe src="' + streamURL + '" style="border:0px #FFFFFF none;" name="torque" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="595px" width="100%"></iframe>');
        } else if (thirdPartyPlayer == "4") {
            $.getScript("//player.ooyala.com/v3/a4f10a372b984e5a960ec4fcf47db48a", function () {
                $("#kaltura_player").html('<div id="ooyalaplayer" style="width:100%;height:100%"></div><script>OO.ready(function() { OO.Player.create("ooyalaplayer", "' + streamURL + '"); });</script><noscript><div>Please enable Javascript to watch this video</div></noscript>');
            });
        }
    }

    function loadFavorite(assetId) {
        $("#add-remove-favorites").addClass('disabled');
        $("#add-remove-favorites").removeClass('hidden');

        if (login !== "") {
            var data = {
                srv: "asset",
                act: "isFavorite",
                mediaID: assetId,
                siteGuid: login.siteGuid,
                domainId: login.domainID
            };

            $.ajax({
                url: serviceUrl,
                type: 'POST',
                data: JSON.stringify(data),
                dataType: 'json',
                error: function () {
                    showAlert("Error", "An error has occured. Please try it again later!");
                },
                success: function (response) {
                    $("#add-remove-favorites").removeClass('disabled');
                    if (response.results) {
                        $("#add-remove-favorites").addClass('active');
                    } else {
                        $("#add-remove-favorites").removeClass('active');
                    }
                }
            });
        }
    }

    function handleFavorite(item) {
        var data = {
            srv: "favorite",
            mediaID: mediaID,
            siteGuid: login.siteGuid,
            domainId: login.domainID,
            udid: getUDID()
        };

        if (item.hasClass("active")) {
            data.act = "removeFromFavorites";
        } else {
            data.act = "addToFavorites";
        }

        $.ajax({
            url: serviceUrl,
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            error: function () {
                showAlert("Error", "An error has occured. Please try it again later!");
            },
            success: function (response) {
                if (response) {
                    if (data.act == "removeFromFavorites") {
                        item.removeClass('active', 400);
                    } else {
                        item.addClass('active', 300);
                    }

                    item.find('.text').html('My favorites');
                }
            }
        });
    }

    function notSubscribedHandler(login) {
        var subInfo = getCookie("purchased_subscription");
		var isFree = $('#video-player').attr('data-free');
        if (login === "" && '1' != isFree) {
			$("#myModal.not-logged-in").removeClass("hiddenBlock");
            $(".hide-if").show();
        } else if (subInfo === "" && '1' != isFree) {
			$("#myModal.not-subscribed").removeClass("hiddenBlock");
            $(".hide-if").show();
        }
		
		if (login === "" || (login != "" && subInfo === "")) {
			canInitPlayer = false;
			$("#not-player").removeClass("hiddenBlock");
			$("#video-player, #kaltura_player").remove();

			if (login === "") {
				$("#kaltura_player_thumbnail").click(function () {
					$(".hide-if").show();
					$("#myModal.not-logged-in").modal("show");
				});
			} else if (login != "" && subInfo === "") {
				$("#kaltura_player_thumbnail").click(function () {
					$(".hide-if").show();
					$("#myModal.not-subscribed").modal("show");
				});
			}

		} else {
			canInitPlayer = true;
			$("#video-player").removeClass("hiddenBlock");
		}
    }

    $("#input-rating").on("rating.change", function (event, value) {
        var login = getCookie("login");
        if (login === "") {
            $("#myModal").modal("show");
            $("#input-rating").rating('reset')
        } else {
            login = JSON.parse(login);
            $.ajax({
                url: serviceUrl,
                type: 'POST',
                data: JSON.stringify({
                    srv: "asset",
                    act: "rateAsset",
                    udid: getUDID(),
                    siteGuid: login.siteGuid,
                    domainId: login.domainID,
                    assetID: $("#input-rating").data("asset"),
                    rateValue: value
                }),
                dataType: 'json',
                error: function () {
                    return false;
                },
                success: function (data) {
                    if (data.m_eActionResponseStatusIntern == 1) {
                        $('.rating-stars').css('color', '#dd0019');
                    } else {
                        $("#input-rating").rating('reset');
                    }
                }
            });
        }
    });

    $("#add-remove-favorites").click(function () {
        if (!$(this).hasClass('disabled')) {
            $(this).find('.text').html($(this).hasClass('active') ? "Removing..." : "Adding...");
            handleFavorite($(this));
        } else {
            $("#myModal").modal('show');
        }
    });
});

function hidePlayer() {
    $("#video-player").hide();
    canInitPlayer = false;
}

// prevent rating input with zero value to be shown
$(document).ajaxComplete(function () {
    $(".rating-container").show();
});
/* another js */var showFilter = "newest";
var selectedMovieId = $("#mediaIdHidden").val();
var seriesName = $('#showNameHidden').text();

// counts how many videos should be shown on first load and on pagination click as well
var current_page_episode_list = 1;
var videos_to_be_shown = 20;

function createPaginationEpisodeList(value) {
    $('.episodes-list .episodes-container .episode-item').slice((value * videos_to_be_shown) - videos_to_be_shown, (value * videos_to_be_shown)).css('display', 'block');
}

function episodeListTotalHandler(data) {
    var episodesCount = data;

    headingCount = "{{#compare totalItems 1 operator='>='}} EPISODES ({{totalItems}}){{/compare}}";
    headingCountEpisodes = "{{#if freeItems}}{{freeItems}} Free Episodes{{/if}}{{#if freeItems}}{{#if totalItems}} | {{/if}}{{/if}}{{#if totalItems}}{{totalItems}} Total Episodes{{/if}}";

    navigationFilters = "<h3 class='episodeslist-counter'>" +
            "{{#compare totalItems 1 operator='>='}} EPISODES ({{totalItems}}){{/compare}}" +
            "</h3>" +
            "<div class='category_filter'>" +
            "<span class='category_filter_label'>Sort By</span>" +
            "<div class='sort_by_selectbox'></div>" +
            "</div>" +
            "{{#compare totalItems 20 operator='>'}}" +
            "<div class='category_filter quantity_on_page'>" +
            "<span class='category_filter_label'>View:</span>" +
            "<div class='quantity_on_page_selectbox'></div>" +
            "</div>" +
            "{{/compare}}" +
            "<div class='clear'></div>";
    headingCountTemplate = Handlebars.compile(headingCount);
    navigationFilterTemplate = Handlebars.compile(navigationFilters);
    headingCountTemplateEpisodes = Handlebars.compile(headingCountEpisodes);
    $('p.episodeCount').html(headingCountTemplateEpisodes(episodesCount));

    $('.episodes-navigation.top').append(navigationFilterTemplate(episodesCount));
    $('.sort_by_selectbox').selectbox_filter({
        items: [
            {
                name: 'Recently Added',
                value: 'newest',
                selected: true
            },
            {
                name: 'Popularity',
                value: 'votes'
            },
            {
                name: 'Views',
                value: 'views'
            }
        ],
        change: function (val) {
            current_page_episode_list = 1;
            $('.pagination').hide();
            $(".current_page_episode_list").val(current_page_episode_list);
            $('.episodes-list .episodes-container').html('<div id="loading" ><i class="fa fa-spinner fa-pulse"></i></div>');
            showFilter = val;
            $('#loading').show();
            getEpisodesList();
        }
    });
    $('.quantity_on_page_selectbox').selectbox_filter({
        items: [
            {
                name: '20',
                value: 20,
                selected: true
            },
            {
                name: '40',
                value: 40
            },
            {
                name: '100',
                value: 100
            }
        ],
        change: function (val) {
            $('.pagination').hide();
            current_page_episode_list = 1;
            $(".current_page_episode_list").val(current_page_episode_list);
            videos_to_be_shown = val;
            $('.episodes-list .episodes-container').html('<div id="loading" ><i class="fa fa-spinner fa-pulse"></i></div>');
            $('#loading').show();
            getEpisodesList();
        }
    });
}

function episodeListHandler(data) {
    var searchResults = data;
    var episodeslist = searchResults.items;

    if (searchResults.totalItems == 0) {
        $('.episodes-list').hide();
        return;
    }

    if (searchResults.totalItems <= videos_to_be_shown) {
        $('.episodes-navigation .pagination').hide();
    } else {
        $('.episodes-navigation .pagination').show(); 
    }

    sourceEpisodesList = "{{#each_upto this 9999}}" +
            "<div class='episode-item'>" +
            "<div class='episode-thumbnail{{#unless image}} no-image{{/unless}} {{#compare id " + selectedMovieId + " operator='=='}}current{{/compare}}' data-id='{{id}}' data-title='{{video_title}}' data-category='{{category}}' data-free='{{is_free}}'>" +
            "{{#compare is_free 1 operator='=='}}<span class='free-label'>FREE</span>{{/compare}}" +
            "<a class='pending-link' data-free='{{is_free}}' title='Open detail page of {{video_title}}' href='" + detailPgLinks + "detail/{{replacedTitleWithLowerCase category 'category'}}/{{replacedTitleWithLowerCaseExtended video_title 'video-'}}/{{id}}/'>" +
            "<i class='fa fa-play-circle-o'></i>" +
            "{{#if image}}" +
            "<img src='{{image}}'>" +
            "{{/if}}" +
            "</a>" +
            "</div>" +
            "<div class='episode-body'>" +
            "<p class='episode-title'>{{shortenTitle video_title}}</p>" +
            "<div class='episode-details'>" +
            "<span class='episode-duration'>({{duration}})</span>" +
            "{{#compare rate 0 operator='>'}}<span class='vertical-rule'>|</span>{{/compare}}" +
            "<div class='rating-container'>" +
            "<ul class='rating'>" +
            "<li>" +
            "<input class='rate-this' value='{{rate}}' data-step='1' data-size='xs'" +
            " data-show-clear='false'" +
            "data-show-caption='false' data-glyphicon='false'" +
            "data-rating-class='rating-fa' data-disabled='true'>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "{{/each_upto}}";

    template = Handlebars.compile(sourceEpisodesList);

    $('div.episodes-container').append(template(episodeslist));

    var episode = $(".episode-item");
    $.each(episode, function (idx, elem) {
        var odd = (idx % 5 == 0);
        if (odd)
            $(elem).css("margin-left", "0px");
    });
    $('.episodes-container .episode-item:last-child').after('<div class="clear"></div>');
    $('.episodes-list .rate-this').rating().on("rating.change", function (event, value) {
        $('.rating-stars').css('color', '#dd0019');
    });
    var size_episodes_list = $(".episodes-list .episodes-container .episode-item").size();
    var page_size_episodes_list = Math.ceil(size_episodes_list / videos_to_be_shown);

    $('.pagination-last-episode-list').html(page_size_episodes_list);

    createPaginationEpisodeList(current_page_episode_list);

    if (size_episodes_list < videos_to_be_shown) {

        $('.next-episode-list').css('visibility', 'hidden');
        $('.back-episode-list').css('visibility', 'hidden');
    } else if (size_episodes_list > videos_to_be_shown) {

        $('.next-episode-list').css('visibility', 'visible');
        $('.back-episode-list').css('visibility', 'visible');
    }

    if (current_page_episode_list == 1) {
        $('.back-episode-list').css('visibility', 'hidden');
    }

    $('.current_page_episode_list').off().on('keyup', function (e) {

        var data = $(this).val();
        if (data <= 0) {
            data = 1;
        }
        if (e.which == 13) {
            if (data > page_size_episodes_list || isNaN(data)) {
                showAlert("Error", "No such page!");
                $(".current_page_episode_list").val(current_page_episode_list);

            } else {
                $('.episodes-list .episodes-container .episode-item').hide();
                current_page_episode_list = data;
                createPaginationEpisodeList(data);

                $(".current_page_episode_list").val(current_page_episode_list);

                if (current_page_episode_list == page_size_episodes_list) {
                    $('.next-episode-list').css('visibility', 'hidden');
                    $('.back-episode-list').css('visibility', 'visible');
                }

                if (current_page_episode_list == 1 && size_episodes_list > videos_to_be_shown) {
                    $('.back-episode-list').css('visibility', 'hidden');
                    $('.next-episode-list').css('visibility', 'visible');
                }

                if (current_page_episode_list < page_size_episodes_list && current_page_episode_list != 1) {
                    $('.back-episode-list').css('visibility', 'visible');
                    $('.next-episode-list').css('visibility', 'visible');
                }
            }
        }
    });


    $('.next-episode-list').off().on('click', function () {
        current_page_episode_list++;

        $(".current_page_episode_list").val(current_page_episode_list);
        $('.episodes-list .episodes-container .episode-item').hide();
        createPaginationEpisodeList(current_page_episode_list);

        if (current_page_episode_list === page_size_episodes_list) {
            $('.next-episode-list').css('visibility', 'hidden');
            $('.back-episode-list').css('visibility', 'visible');
        }

        if (current_page_episode_list == 1 || current_page_episode_list < page_size_episodes_list) {
            $('.back-episode-list').css('visibility', 'visible');
        }

        if (current_page_episode_list < page_size_episodes_list && current_page_episode_list != 1) {
            $('.back-episode-list').css('visibility', 'visible');
            $('.next-episode-list').css('visibility', 'visible');
        }

    });

    $('.back-episode-list').off().on('click', function () {
        current_page_episode_list--;
        $(".current_page_episode_list").val(current_page_episode_list);
        $('.episodes-list .episodes-container .episode-item').hide();

        createPaginationEpisodeList(current_page_episode_list);

        if (current_page_episode_list == 1 && size_episodes_list > videos_to_be_shown) {
            $('.back-episode-list').css('visibility', 'hidden');
            $('.next-episode-list').css('visibility', 'visible');
        }

        if (current_page_episode_list < page_size_episodes_list && current_page_episode_list != 1) {
            $('.back-episode-list').css('visibility', 'visible');
            $('.next-episode-list').css('visibility', 'visible');
        }
    });

    $('.episode-item .episode-thumbnail a').addClass('no-image');
    $('.episode-item .episode-thumbnail a img').error(function () {
        $(this).hide();
    }).load(function () {
        $(this).show();
        $(this).parent().removeClass("no-image");
    });

    handlePendingLinks();
    appendTooltipHoverListener();
    $('#loading').hide();
}

function appendTooltipHoverListener() {
    var items = $(".episode-thumbnail");

    $.each(items, function (idx, elem) {
        var west = ((idx -3) % 5 === 0 || (idx - 4) % 5 === 0);
        if (west) {
            $(elem).data("location", "w");
        } else {
            $(elem).data("location", "e");
        }
    });

    $.each(items, function (index, value) {
        var item = $(this);
        item.attr("id", "show_result_" + index);
        $("#show_result_" + index).unbind("mouseenter");
        $("#show_result_" + index).unbind("mouseleave");

        $("#show_result_" + index).on("mouseenter", function (ev) {
            var currentTarget = $(ev.currentTarget);
            setTimeout(function () {
                if (currentTarget.is(":hover") && !tooltip.isDisplayedForAsset(item.data("id"))) {
                    var settings = {
                        assetId: item.data("id"),
                        assetType: mediaType.episode,
                        assetTitle: item.data("title"),
                        assetCategory: item.data("category"),
                        assetIsFree: item.data("free"),
                        item: currentTarget,
                        location: item.data("location")
                    };

                    tooltip.changeSettings(settings);
                    tooltip.show();
                }
                tooltip.setInUIItem(true);
            }, 800);
        });
        
        $("#show_result_" + index).on("mouseleave", function () {
            tooltip.setInUIItem(false);
            tooltip.remove();
        });
    });
}

function getEpisodesList(callback) {
    $.ajax({
        url: serviceUrl + '?srv=asset&act=getEpisodesByShowName&seriesName=' + seriesName + '&order_by=' + showFilter,
        cache: false,
        success: function (data) {
            episodeListHandler(data);
        },
        beforeSend: function () {
            $('#loading').show();
        },
        complete: function (data) {
            if(callback !== "undefined") {
                callback(data);
            }
            $('#loading').hide();
        }
    });
}

(function () {
    if (login === "") {
        $(".show-details-free-trial").click(function () {
            $('#loading').show();
            window.location.href = baseUrl + "sign-up/";
        });
    } else {
        if (subscriptions === "") {
            $(".show-details-free-trial").click(function () {
                $('#loading').show();
                window.location.href = baseUrl + "select-plan/";
            });
        }
    }

    $('#loading').show();
    try {
       episodeListTotalHandler(episodes);
       episodeListHandler(episodes); 
    } catch(error) {
       $('#loading').hide();
    }
})();