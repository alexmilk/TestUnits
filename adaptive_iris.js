function emitPlaying() { IrisEngine.emit("PLAYING") }

function getPlaylist() {
    var e = [];
    return "undefined" != typeof IrisEngine && (e = IrisEngine.getPlaylist()), e }

function getCurrentIndex() {
    var e;
    return "undefined" != typeof IrisEngine && (e = IrisEngine.getCurrentIndex()), e }

function forceNextRequest(e) { IrisEngine.forceNextRequest(e) }

function setPlaylist(e) {
    return IrisEngine.setPlaylist(e), IrisEngine.getPlaylist() }

function playbackComplete() {
    return IrisEngine.emit("ENDED", { type: "next_auto", percentageWatched: 1 }), !0 }

function skipToIndex(e) {
    return IrisEngine.skipToIndex(e), IrisEngine.getCurrentIndex() }

function createIrisOptionsHash(e) {
    var i = { settings: { access_token: e.getConfig("iris_access_token"), api_url: e.getConfig("iris_api_url"), start_up_next: e.getConfig("iris_start_up_next"), end_up_next: e.getConfig("iris_end_up_next"), number: e.getConfig("iris_number"), ssl: e.getConfig("iris_ssl"), player_id: e.embedPlayer.id, platform_id: e.embedPlayer.evaluate("{mediaProxy.entry.id}"), platform: "kaltura", base_url: "kalturabaseurl", client_token: e.getConfig("iris_client_token") || e.embedPlayer.evaluate("{mediaProxy.entry.partnerId}"), campaign_tracking: e.getConfig("iris_campaign_tracking") }, player_elements: { player_id: e.embedPlayer.id, provider: "kaltura" }, iris_buttons: { thumbs_up: !1, thumbs_down: !1, skip_forward: !1, skip_back: !1, skip_on_thumbs_down: e.getConfig("iris_skip_on_thumbs_down") }, kalturaPlayer: e.getPlayer() };
    return i }

function loadIrisPlugin(e) {
    function i() {
        var i = e.kalturaPlayer,
            t = i.evaluate("{video.player.currentTime}");
        return t }

    function t() {
        var i = e.kalturaPlayer,
            t = i.evaluate("{mediaProxy.entry.duration}");
        return t }

    function n(i) {
        var t = e.kalturaPlayer;
        t.sendNotification("changeMedia", { entryId: i.platform_id }) }
    console.log("Plugin Version: Kaltura-Adaptive v1.4.4");
    e.kalturaPlayer;
    window.IrisEngine = initializeIrisPlugin(e), IrisEngine.registerFunction("currentTime", i), IrisEngine.registerFunction("currentDuration", t), IrisEngine.registerEvent("IRIS_PLAYING"), IrisEngine.registerEvent("ENDED"), isMobile() ? ("undefined" != typeof irisRelateDataCallback && (IrisEngine.addCallback.watch(irisRelateDataCallback), IrisEngine.addCallback.next(irisRelateDataCallback)), IrisEngine.registerFunction("play", function() {})) : IrisEngine.registerFunction("play", n) }

function isMobile() {
    var e = navigator.userAgent || navigator.vendor || window.opera,
        i = !1;
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (i = !0), i }
mw.kalturaPluginWrapper(function() { mw.PluginManager.add("iris", mw.KBaseComponent.extend({ setup: function() { window.kdp = this.embedPlayer;
            var e, i = createIrisOptionsHash(this);
            isMobile() || this.embedPlayer.getPluginInstance("related").destroy();
            var t = document.createElement("SCRIPT");
            t.src = "//ovp.iris.tv/libs/adaptive/iris.adaptive.js", t.type = "text/javascript", document.getElementsByTagName("head")[0].appendChild(t), t.onload = function() { loadIrisPlugin(i) }, this.bind("playbackComplete", function() { playbackComplete() }), this.bind("playerPlayed", function() { emitPlaying(), getCurrentIndex() > 0 && irisRelateDataCallback() }), this.bind("relatedData", function(t, n) {
                if (getPlaylist().length > 0) { e = getPlaylist(), e.splice(0, getCurrentIndex() + 2);
                    for (var a = e.length - 1; a >= 0; a--) e[a].name = e[a].title, e[a].thumbnailUrl = "http://cdnbakmi.kaltura.com/p/" + i.settings.client_token + "/sp/" + i.settings.client_token + "00/thumbnail/entry_id/" + e[a].platform_id + "/version/100000", e[a].id = e[a].platform_id;
                    irisRelateDataCallback = function() {
                        return function() { n(e) } }() } else irisRelateDataCallback = function(e) {
                    return function(e) {
                        for (var t = e.length - 1; t >= 0; t--) e[t].name = e[t].title, e[t].thumbnailUrl = "http://cdnbakmi.kaltura.com/p/" + i.settings.client_token + "/sp/" + i.settings.client_token + "00/thumbnail/entry_id/" + e[t].platform_id + "/version/100000", e[t].id = e[t].platform_id, e[t].platform_id == i.settings.platform_id && e.splice(t, 1);
                        n(e) } }();
                window.IrisEngine && (IrisEngine.addCallback.watch(irisRelateDataCallback), IrisEngine.addCallback.next(irisRelateDataCallback)) }), this.bind("relatedVideoSelect", function(e) { relatedEntryClicked = 1;
                var t = getPlaylist();
                t.slice(0, getCurrentIndex());
                clickedEntry = i.kalturaPlayer.evaluate("{related.selectedEntryId}");
                (function() {
                    for (var e = 0; e < t.length; e++) t[e].platform_id == clickedEntry && skipToIndex(e);
                    return { platform_id: clickedEntry, title: "clickedEntry" } })();
                forceNextRequest() }) } })) });