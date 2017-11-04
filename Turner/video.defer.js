! function(e, t) {
	"use strict";

	function a() {
		v = t("#videoEndBoard"), p = v.find(".item"), g = v.find(".videoEndBoard-countdown-block-seconds"), v.on("click mouseover mouseout", ".videoEndBoard-close-btn, .item", m)
	}
	function o(e) {
		v.length > 0 && (w = e, n(), i())
	}
	function n() {
		l(), v.toggleClass("hide")
	}
	function r(e) {
		e.hasClass("card") && e.toggleClass("over expanded")
	}
	function i() {
		var t = p.length,
			a = Math.floor(Math.random() * t);
		y = 7, d(y), h = p.eq(a).find("a"), b = e.setInterval(s, 1e3)
	}
	function s() {
		y -= 1, h.addClass("next"), 0 === y && (l(), h.removeClass("next"), e.location = h.attr("href")), d(y)
	}
	function d(e) {
		g.text("0" + e)
	}
	function l() {
		e.clearInterval(b)
	}
	function c(e) {
		e.hasClass("videoEndBoard-close-btn") && (n(), h.removeClass("next"), w.sendNotification("doReplay"))
	}
	function u(e) {
		r(e)
	}
	function f(e) {
		r(e)
	}
	function m(e) {
		var a = t(e.currentTarget);
		switch (e.type) {
			case "click":
				c(a);
				break;
			case "mouseover":
				u(a);
				break;
			case "mouseout":
				f(a)
		}
	}
	var v, p, h, g, y, b, w;
	e.VideoEndBoardController = {
		show: o
	}, a()
}(window, jQuery),
function(e, t, a, o) {
	"use strict";

	function n() {
		var e = t("#videoPlayerVideoHolder");
		c = {
			partnerId: e.attr("data-partner-id"),
			uiConfId: e.attr("data-uiconf-id"),
			streamerType: e.attr("data-streamer-type")
		}, u = {
			ratingId: e.attr("data-rated-id"),
			videoId: e.attr("data-video-id")
		}, r()
	}
	function r() {
		var e = o.videoPlayerURL,
			a = {
				url: e,
				dataType: "script",
				success: d
			};
		t.ajax(a)
	}
	function i() {
		var e = {
			targetId: "kpt_v2",
			wid: "_" + c.partnerId,
			uiconf_id: c.uiConfId,
			entry_id: u.videoId,
			flashvars: {
				autoPlay: "true",
				"bumper.bumperEntryID": u.ratingId || null,
				entryId: u.videoId,
				vast:{
					plugin: false
				}
				}
			},
			params: {
				allowFullScreen: "true",
				allowScriptAccess: "always",
				quality: "best",
				bgcolor: "#000000",
				wmode: "opaque"
			},
			readyCallback: s
		};
		switch (c.streamerType) {
			case "rtmp":
				e.flashvars.streamerType = "rtmp", e.flashvars.mediaProtocol = "rtmp";
				break;
			case "hds":
				e.flashvars.streamerType = "hdnetworkmanifest", e.flashvars.twoPhaseManifest = "true", e.flashvars.akamaiHD = {
					loadingPolicy: "preInitialize",
					asyncInit: "true"
				};
				break;
			case "progressive":
		}
		kWidget.embed(e)
	}
	function s(e) {
		var a = t("#" + e).get(0);
		a.kBind("playerPlayEnd", l)
	}
	function d() {
		i()
	}
	function l(o) {
		var n = t("#" + o).get(0);
		n.sendNotification("closeFullScreen"), a.show(n), e.CNLAGames && CNLAGames.notifyAction("Sys_PlayVideo")
	}
	var c, u;
	n()
}(window, jQuery, VideoEndBoardController, CNConfig),
function(e, t, a) {
	"use strict";

	function o() {
		e("#miniGame").length > 0 && (e("#miniGame_showNextGameBtn").click(n), n())
	}
	function n(e) {
		var t = a.miniGamesList,
			o = t.length;
		i = "undefined" == typeof i ? Math.floor(o * Math.random()) : (i + 1) % o, r(t[i])
	}
	function r(e) {
		var a = e.substr(0, e.lastIndexOf("/") + 1),
			o = {
				bgcolor: "#333333",
				menu: "false",
				wmode: "opaque",
				allowFullScreen: "true",
				base: a,
				allowScriptAccess: "always"
			}, n = {
				id: "miniGameObject"
			};
		t.embedSWF(e, "miniGameObject", "355", "214", "10.0.0", !1, {}, o, n)
	}
	var i;
	o()
}(jQuery, swfobject, CNConfig), CNConfig.modules.user && (new LightboxRecuperaDatosController("#lightboxUsuarioMenor").init(), new LightboxRecuperaDatosController("#lightboxUsuarioInexistente").init(), new LightboxRecuperaDatosController("#lightboxRecuperaDatos").init(), LightboxCreditsPopupController.init());