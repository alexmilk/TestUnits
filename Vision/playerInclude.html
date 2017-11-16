(function(window, $) {

  var globalSettings = window.conduco.entitlements.playerInclude;

  function logStop(entitlementId, playLocation) {
    var data = {
      id: entitlementId
    };
    if (playLocation)
      data.play_location = playLocation;
    $.post('/entitlements/logStop?_csrf=' + globalSettings._csrf, data);
  }

  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }

  function SetPlayer(entry, ks, entitlement) {
    var _vars = { 'ks': ks };
    kWidget.destroy('kaltura_player');

    var _watermark = (entitlement.watermark === 'Yes') ? globalSettings.userName : ' ';

    _vars.watchwithPlugin = {
      text:_watermark,
      plugin: true,
      iframeHTML5Js: '/javascripts/watchwithPlugin.js',
      iframeHTML5Css: '/stylesheets/watchwith.css',
    };

    if (entitlement.play_location > 0) _vars['mediaProxy.mediaPlayFrom'] = entitlement.play_location;

    kWidget.embed({
      targetId: 'kaltura_player',
      wid: globalSettings.kalturaWid,
      uiconf_id: globalSettings.kalturaUIConf,
      entry_id: entry,
      flashvars: _vars,
      readyCallback: function (playerId) {
        var kdp = $('#kaltura_player').get(0), _popupTimer;

        // Remove binging and log event when the modal is closed.
        $('#popupPlayer').on('close.fndtn.reveal', function () {
          clearTimeout(_popupTimer);

          // Log when the window is closed.
          logStop(entitlement._id, kdp.evaluate('{video.player.currentTime}'));
        });

        kdp.kBind('doPlay', function () {
          // Log when the play button is pressed.
          $.post('/entitlements/logPlay?_csrf=' + globalSettings._csrf, {
            id: entitlement._id,
            play_location: kdp.evaluate('{video.player.currentTime}')
          });
        });
        kdp.kBind('firstPlay', function () {
          _popupTimer = setInterval(function () {
            $.post('/entitlements/setLocation?_csrf=' + globalSettings._csrf, {
              id: entitlement._id,
              play_location: kdp.evaluate('{video.player.currentTime}')
            }, function(data, textStatus) {
              if (textStatus === '403') {
                location.href = '/users/logout';
                return;
              }
              if (!data.error) {
                return;
              }
              logStop(entitlement._id, kdp.evaluate('{video.player.currentTime}'));
              $('#popupPlayer').foundation('reveal', 'close');
              popupMessage(data.error.message);
            });
          // Write the beacon every [polltime] seconds.
          }, globalSettings.polltime * 1000);
        });

        kdp.kBind('doPause', function () {
          // Log when the stop button is pressed.
          logStop(entitlement._id, kdp.evaluate('{video.player.currentTime}'));
        });
      }
    });
  }

  $(document).ready(function () {
    // This is a very simple check. It's perfectly fine for the intended purpose
    var isMobile = /(iphone|ipad|android|mobile|phone)/i.test(window.navigator.userAgent.toLowerCase());

    // If this is a mobile, make sure we won't display the screener
    if ( !isMobile ) {
      $(document).on('click', '.screener', debounce(function() {
        var _entitlement = $(this).closest('[data-id]');
        var _confirm = $($(_entitlement).attr('data-confirm'));
        var _piracy = $(_entitlement).attr('data-piracy');

        // Make sure we show the confirmation if we need to
        if (_confirm.length && _piracy && _piracy !== '') {
          if (_confirm.is('[data-reveal]')) {
            // Load the anti-piracy content and attributes to play screener once Accepted
            $('.piracy_content', _confirm).html(_piracy);
            $('.screener', _confirm).attr('data-id', $(_entitlement).attr('data-id'));
            $('.screener', _confirm).attr('data-entry-id', $(_entitlement).attr('data-entry-id'));
            _confirm.foundation('reveal', 'open');
            return false;
          }
        }

        // Show a popup in the meantime
        popupMessage('Starting to load screener, this can take a few seconds..');

        // Load in the screener
        $.ajax({
          url: '/entitlements/playScreener',
          data: {entitlement: $(_entitlement).attr('data-id'), _csrf: globalSettings._csrf},
          method: 'post',
          success: function (data) {
            if (data.error || !data.entitlement) {
              popupMessage(data.error || data.message);
            } else {
              SetPlayer($(_entitlement).attr('data-entry-id'), data.ks, data.entitlement);
              $('#popupPlayer').foundation('reveal', 'open');
            }

            _confirm.attr('checked', false);        // Clear variables used
          }
        });
      }, 1000));
    }
  });
})(window, jQuery);