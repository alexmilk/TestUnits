jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0),
    function(e, t, n) {
        function r(n) {
            var r = t.console;
            i[n] || (i[n] = !0, e.migrateWarnings.push(n), r && r.warn && !e.migrateMute && (r.warn("JQMIGRATE: " + n), e.migrateTrace && r.trace && r.trace())) }

        function a(t, a, i, o) {
            if (Object.defineProperty) try {
                return Object.defineProperty(t, a, { configurable: !0, enumerable: !0, get: function() {
                        return r(o), i }, set: function(e) { r(o), i = e } }), n } catch (s) {}
            e._definePropertyBroken = !0, t[a] = i }
        var i = {};
        e.migrateWarnings = [], !e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active"), e.migrateTrace === n && (e.migrateTrace = !0), e.migrateReset = function() { i = {}, e.migrateWarnings.length = 0 }, "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
        var o = e("<input/>", { size: 1 }).attr("size") && e.attrFn,
            s = e.attr,
            u = e.attrHooks.value && e.attrHooks.value.get || function() {
                return null },
            c = e.attrHooks.value && e.attrHooks.value.set || function() {
                return n },
            l = /^(?:input|button)$/i,
            d = /^[238]$/,
            p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            f = /^(?:checked|selected)$/i;
        a(e, "attrFn", o || {}, "jQuery.attrFn is deprecated"), e.attr = function(t, a, i, u) {
            var c = a.toLowerCase(),
                g = t && t.nodeType;
            return u && (4 > s.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(g) && (o ? a in o : e.isFunction(e.fn[a]))) ? e(t)[a](i) : ("type" === a && i !== n && l.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = { get: function(t, r) {
                    var a, i = e.prop(t, r);
                    return i === !0 || "boolean" != typeof i && (a = t.getAttributeNode(r)) && a.nodeValue !== !1 ? r.toLowerCase() : n }, set: function(t, n, r) {
                    var a;
                    return n === !1 ? e.removeAttr(t, r) : (a = e.propFix[r] || r, a in t && (t[a] = !0), t.setAttribute(r, r.toLowerCase())), r } }, f.test(c) && r("jQuery.fn.attr('" + c + "') may use property instead of attribute")), s.call(e, t, a, i)) }, e.attrHooks.value = { get: function(e, t) {
                var n = (e.nodeName || "").toLowerCase();
                return "button" === n ? u.apply(this, arguments) : ("input" !== n && "option" !== n && r("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null) }, set: function(e, t) {
                var a = (e.nodeName || "").toLowerCase();
                return "button" === a ? c.apply(this, arguments) : ("input" !== a && "option" !== a && r("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, n) } };
        var g, h, v = e.fn.init,
            m = e.parseJSON,
            y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
        e.fn.init = function(t, n, a) {
            var i;
            return t && "string" == typeof t && !e.isPlainObject(n) && (i = y.exec(e.trim(t))) && i[0] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), i[3] && r("$(html) HTML text after last tag is ignored"), "#" === i[0].charAt(0) && (r("HTML string cannot start with a '#' character"), e.error("JQMIGRATE: Invalid selector string (XSS)")), n && n.context && (n = n.context), e.parseHTML) ? v.call(this, e.parseHTML(i[2], n, !0), n, a) : v.apply(this, arguments) }, e.fn.init.prototype = e.fn, e.parseJSON = function(e) {
            return e || null === e ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null) }, e.uaMatch = function(e) { e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return { browser: t[1] || "", version: t[2] || "0" } }, e.browser || (g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = !0, h.version = g.version), h.chrome ? h.webkit = !0 : h.webkit && (h.safari = !0), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function() {
            function t(e, n) {
                return new t.fn.init(e, n) }
            e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function(r, a) {
                return a && a instanceof e && !(a instanceof t) && (a = t(a)), e.fn.init.call(this, r, a, n) }, t.fn.init.prototype = t.fn;
            var n = t(document);
            return r("jQuery.sub() is deprecated"), t }, e.ajaxSetup({ converters: { "text json": e.parseJSON } });
        var b = e.fn.data;
        e.fn.data = function(t) {
            var a, i, o = this[0];
            return !o || "events" !== t || 1 !== arguments.length || (a = e.data(o, t), i = e._data(o, t), a !== n && a !== i || i === n) ? b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), i) };
        var j = /\/(java|ecma)script/i,
            w = e.fn.andSelf || e.fn.addBack;
        e.fn.andSelf = function() {
            return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments) }, e.clean || (e.clean = function(t, a, i, o) { a = a || document, a = !a.nodeType && a[0] || a, a = a.ownerDocument || a, r("jQuery.clean() is deprecated");
            var s, u, c, l, d = [];
            if (e.merge(d, e.buildFragment(t, a).childNodes), i)
                for (c = function(e) {
                        return !e.type || j.test(e.type) ? o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : n }, s = 0; null != (u = d[s]); s++) e.nodeName(u, "script") && c(u) || (i.appendChild(u), u.getElementsByTagName !== n && (l = e.grep(e.merge([], u.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(l)), s += l.length));
            return d });
        var Q = e.event.add,
            x = e.event.remove,
            k = e.event.trigger,
            N = e.fn.toggle,
            T = e.fn.live,
            M = e.fn.die,
            S = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
            C = RegExp("\\b(?:" + S + ")\\b"),
            H = /(?:^|\s)hover(\.\S+|)\b/,
            A = function(t) {
                return "string" != typeof t || e.event.special.hover ? t : (H.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(H, "mouseenter$1 mouseleave$1")) };
        e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function(e, t, n, a, i) { e !== document && C.test(t) && r("AJAX events should be attached to document: " + t), Q.call(this, e, A(t || ""), n, a, i) }, e.event.remove = function(e, t, n, r, a) { x.call(this, e, A(t) || "", n, r, a) }, e.fn.error = function() {
            var e = Array.prototype.slice.call(arguments, 0);
            return r("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this) }, e.fn.toggle = function(t, n) {
            if (!e.isFunction(t) || !e.isFunction(n)) return N.apply(this, arguments);
            r("jQuery.fn.toggle(handler, handler...) is deprecated");
            var a = arguments,
                i = t.guid || e.guid++,
                o = 0,
                s = function(n) {
                    var r = (e._data(this, "lastToggle" + t.guid) || 0) % o;
                    return e._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), a[r].apply(this, arguments) || !1 };
            for (s.guid = i; a.length > o;) a[o++].guid = i;
            return this.click(s) }, e.fn.live = function(t, n, a) {
            return r("jQuery.fn.live() is deprecated"), T ? T.apply(this, arguments) : (e(this.context).on(t, this.selector, n, a), this) }, e.fn.die = function(t, n) {
            return r("jQuery.fn.die() is deprecated"), M ? M.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this) }, e.event.trigger = function(e, t, n, a) {
            return n || C.test(e) || r("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, a) }, e.each(S.split("|"), function(t, n) { e.event.special[n] = { setup: function() {
                    var t = this;
                    return t !== document && (e.event.add(document, n + "." + e.guid, function() { e.event.trigger(n, null, t, !0) }), e._data(this, n, e.guid++)), !1 }, teardown: function() {
                    return this !== document && e.event.remove(document, n + "." + e._data(this, n)), !1 } } }) }(jQuery, window);;
window.Modernizr = function(a, b, c) {
    function C(a) { j.cssText = a }

    function D(a, b) {
        return C(n.join(a + ";") + (b || "")) }

    function E(a, b) {
        return typeof a === b }

    function F(a, b) {
        return !!~("" + a).indexOf(b) }

    function G(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!F(e, "-") && j[e] !== c) return b == "pfx" ? e : !0 }
        return !1 }

    function H(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : E(f, "function") ? f.bind(d || b) : f }
        return !1 }

    function I(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + p.join(d + " ") + d).split(" ");
        return E(b, "string") || E(b, "undefined") ? G(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), H(e, b, c)) }

    function J() { e.input = function(c) {
            for (var d = 0, e = c.length; d < e; d++) t[c[d]] = c[d] in k;
            return t.list && (t.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), t }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), s[a[d]] = !!e;
            return s }("search tel url email datetime date month week time datetime-local number range color".split(" ")) }
    var d = "2.7.1",
        e = {},
        f = !0,
        g = b.documentElement,
        h = "modernizr",
        i = b.createElement(h),
        j = i.style,
        k = b.createElement("input"),
        l = ":)",
        m = {}.toString,
        n = " -webkit- -moz- -o- -ms- ".split(" "),
        o = "Webkit Moz O ms",
        p = o.split(" "),
        q = o.toLowerCase().split(" "),
        r = {},
        s = {},
        t = {},
        u = [],
        v = u.slice,
        w, x = function(a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"),
                m = b.body,
                n = m || b.createElement("body");
            if (parseInt(d, 10))
                while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i },
        y = function(b) {
            var c = a.matchMedia || a.msMatchMedia;
            if (c) return c(b).matches;
            var d;
            return x("@media " + b + " { #" + h + " { position: absolute; } }", function(b) { d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute" }), d },
        z = function() {
            function d(d, e) { e = e || b.createElement(a[d] || "div"), d = "on" + d;
                var f = d in e;
                return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = E(e[d], "function"), E(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f }
            var a = { select: "input", change: "input", submit: "form", reset: "form", error: "img", load: "img", abort: "img" };
            return d }(),
        A = {}.hasOwnProperty,
        B;!E(A, "undefined") && !E(A.call, "undefined") ? B = function(a, b) {
        return A.call(a, b) } : B = function(a, b) {
        return b in a && E(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = v.call(arguments, 1),
            e = function() {
                if (this instanceof e) {
                    var a = function() {};
                    a.prototype = c.prototype;
                    var f = new a,
                        g = c.apply(f, d.concat(v.call(arguments)));
                    return Object(g) === g ? g : f }
                return c.apply(b, d.concat(v.call(arguments))) };
        return e }), r.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : x(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) { c = a.offsetTop === 9 }), c }, r.hashchange = function() {
        return z("hashchange", a) && (b.documentMode === c || b.documentMode > 7) }, r.rgba = function() {
        return C("background-color:rgba(150,255,150,.5)"), F(j.backgroundColor, "rgba") }, r.borderimage = function() {
        return I("borderImage") }, r.borderradius = function() {
        return I("borderRadius") }, r.boxshadow = function() {
        return I("boxShadow") }, r.opacity = function() {
        return D("opacity:.55"), /^0.55$/.test(j.opacity) }, r.csstransitions = function() {
        return I("transition") }, r.fontface = function() {
        var a;
        return x('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
            var e = b.getElementById("smodernizr"),
                f = e.sheet || e.styleSheet,
                g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0 }), a };
    for (var K in r) B(r, K) && (w = K.toLowerCase(), e[w] = r[K](), u.push((e[w] ? "" : "no-") + w));
    return e.input || J(), e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a) B(a, d) && e.addTest(d, a[d]);
        else { a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b }
        return e }, C(""), i = k = null, e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.mq = y, e.hasEvent = z, e.testProp = function(a) {
        return G([a]) }, e.testAllProps = I, e.testStyles = x, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + u.join(" ") : ""), e }(this, this.document);
(function() {
    var n = this,
        t = n._,
        r = {},
        e = Array.prototype,
        u = Object.prototype,
        i = Function.prototype,
        a = e.push,
        o = e.slice,
        c = e.concat,
        l = u.toString,
        f = u.hasOwnProperty,
        s = e.forEach,
        p = e.map,
        h = e.reduce,
        v = e.reduceRight,
        g = e.filter,
        d = e.every,
        m = e.some,
        y = e.indexOf,
        b = e.lastIndexOf,
        x = Array.isArray,
        w = Object.keys,
        _ = i.bind,
        j = function(n) {
            return n instanceof j ? n : this instanceof j ? (this._wrapped = n, void 0) : new j(n) }; "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = "1.5.2";
    var A = j.each = j.forEach = function(n, t, e) {
        if (null != n)
            if (s && n.forEach === s) n.forEach(t, e);
            else if (n.length === +n.length) {
            for (var u = 0, i = n.length; i > u; u++)
                if (t.call(e, n[u], u, n) === r) return } else
            for (var a = j.keys(n), u = 0, i = a.length; i > u; u++)
                if (t.call(e, n[a[u]], a[u], n) === r) return };
    j.map = j.collect = function(n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) { e.push(t.call(r, n, u, i)) }), e) };
    var E = "Reduce of empty array with no initial value";
    j.reduce = j.foldl = j.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduce === h) return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function(n, i, a) { u ? r = t.call(e, r, n, i, a) : (r = n, u = !0) }), !u) throw new TypeError(E);
        return r }, j.reduceRight = j.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduceRight === v) return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = j.keys(n);
            i = a.length }
        if (A(n, function(o, c, l) { c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0) }), !u) throw new TypeError(E);
        return r }, j.find = j.detect = function(n, t, r) {
        var e;
        return O(n, function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0 }), e }, j.filter = j.select = function(n, t, r) {
        var e = [];
        return null == n ? e : g && n.filter === g ? n.filter(t, r) : (A(n, function(n, u, i) { t.call(r, n, u, i) && e.push(n) }), e) }, j.reject = function(n, t, r) {
        return j.filter(n, function(n, e, u) {
            return !t.call(r, n, e, u) }, r) }, j.every = j.all = function(n, t, e) { t || (t = j.identity);
        var u = !0;
        return null == n ? u : d && n.every === d ? n.every(t, e) : (A(n, function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r }), !!u) };
    var O = j.some = j.any = function(n, t, e) { t || (t = j.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0 }), !!u) };
    j.contains = j.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : O(n, function(n) {
            return n === t }) }, j.invoke = function(n, t) {
        var r = o.call(arguments, 2),
            e = j.isFunction(t);
        return j.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r) }) }, j.pluck = function(n, t) {
        return j.map(n, function(n) {
            return n[t] }) }, j.where = function(n, t, r) {
        return j.isEmpty(t) ? r ? void 0 : [] : j[r ? "find" : "filter"](n, function(n) {
            for (var r in t)
                if (t[r] !== n[r]) return !1;
            return !0 }) }, j.findWhere = function(n, t) {
        return j.where(n, t, !0) }, j.max = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.max.apply(Math, n);
        if (!t && j.isEmpty(n)) return -1 / 0;
        var e = { computed: -1 / 0, value: -1 / 0 };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a > e.computed && (e = { value: n, computed: a }) }), e.value }, j.min = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.min.apply(Math, n);
        if (!t && j.isEmpty(n)) return 1 / 0;
        var e = { computed: 1 / 0, value: 1 / 0 };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a < e.computed && (e = { value: n, computed: a }) }), e.value }, j.shuffle = function(n) {
        var t, r = 0,
            e = [];
        return A(n, function(n) { t = j.random(r++), e[r - 1] = e[t], e[t] = n }), e }, j.sample = function(n, t, r) {
        return arguments.length < 2 || r ? n[j.random(n.length - 1)] : j.shuffle(n).slice(0, Math.max(0, t)) };
    var k = function(n) {
        return j.isFunction(n) ? n : function(t) {
            return t[n] } };
    j.sortBy = function(n, t, r) {
        var e = k(t);
        return j.pluck(j.map(n, function(n, t, u) {
            return { value: n, index: t, criteria: e.call(r, n, t, u) } }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1 }
            return n.index - t.index }), "value") };
    var F = function(n) {
        return function(t, r, e) {
            var u = {},
                i = null == r ? j.identity : k(r);
            return A(t, function(r, a) {
                var o = i.call(e, r, a, t);
                n(u, o, r) }), u } };
    j.groupBy = F(function(n, t, r) {
        (j.has(n, t) ? n[t] : n[t] = []).push(r) }), j.indexBy = F(function(n, t, r) { n[t] = r }), j.countBy = F(function(n, t) { j.has(n, t) ? n[t]++ : n[t] = 1 }), j.sortedIndex = function(n, t, r, e) { r = null == r ? j.identity : k(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
            var o = i + a >>> 1;
            r.call(e, n[o]) < u ? i = o + 1 : a = o }
        return i }, j.toArray = function(n) {
        return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : [] }, j.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length }, j.first = j.head = j.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t) }, j.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t)) }, j.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0)) }, j.rest = j.tail = j.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t) }, j.compact = function(n) {
        return j.filter(n, j.identity) };
    var M = function(n, t, r) {
        return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function(n) { j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : M(n, t, r) : r.push(n) }), r) };
    j.flatten = function(n, t) {
        return M(n, t, []) }, j.without = function(n) {
        return j.difference(n, o.call(arguments, 1)) }, j.uniq = j.unique = function(n, t, r, e) { j.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? j.map(n, r, e) : n,
            i = [],
            a = [];
        return A(u, function(r, e) {
            (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e])) }), i }, j.union = function() {
        return j.uniq(j.flatten(arguments, !0)) }, j.intersection = function(n) {
        var t = o.call(arguments, 1);
        return j.filter(j.uniq(n), function(n) {
            return j.every(t, function(t) {
                return j.indexOf(t, n) >= 0 }) }) }, j.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return j.filter(n, function(n) {
            return !j.contains(t, n) }) }, j.zip = function() {
        for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++) t[r] = j.pluck(arguments, "" + r);
        return t }, j.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r }, j.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0,
            u = n.length;
        if (r) {
            if ("number" != typeof r) return e = j.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r }
        if (y && n.indexOf === y) return n.indexOf(t, r);
        for (; u > e; e++)
            if (n[e] === t) return e;
        return -1 }, j.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--;)
            if (n[u] === t) return u;
        return -1 }, j.range = function(n, t, r) { arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;) i[u++] = n, n += r;
        return i };
    var R = function() {};
    j.bind = function(n, t) {
        var r, e;
        if (_ && n.bind === _) return _.apply(n, o.call(arguments, 1));
        if (!j.isFunction(n)) throw new TypeError;
        return r = o.call(arguments, 2), e = function() {
            if (!(this instanceof e)) return n.apply(t, r.concat(o.call(arguments)));
            R.prototype = n.prototype;
            var u = new R;
            R.prototype = null;
            var i = n.apply(u, r.concat(o.call(arguments)));
            return Object(i) === i ? i : u } }, j.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            return n.apply(this, t.concat(o.call(arguments))) } }, j.bindAll = function(n) {
        var t = o.call(arguments, 1);
        if (0 === t.length) throw new Error("bindAll must be passed function names");
        return A(t, function(t) { n[t] = j.bind(n[t], n) }), n }, j.memoize = function(n, t) {
        var r = {};
        return t || (t = j.identity),
            function() {
                var e = t.apply(this, arguments);
                return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments) } }, j.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r) }, t) }, j.defer = function(n) {
        return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1))) }, j.throttle = function(n, t, r) {
        var e, u, i, a = null,
            o = 0;
        r || (r = {});
        var c = function() { o = r.leading === !1 ? 0 : new Date, a = null, i = n.apply(e, u) };
        return function() {
            var l = new Date;
            o || r.leading !== !1 || (o = l);
            var f = t - (l - o);
            return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u)) : a || r.trailing === !1 || (a = setTimeout(c, f)), i } }, j.debounce = function(n, t, r) {
        var e, u, i, a, o;
        return function() { i = this, u = arguments, a = new Date;
            var c = function() {
                    var l = new Date - a;
                    t > l ? e = setTimeout(c, t - l) : (e = null, r || (o = n.apply(i, u))) },
                l = r && !e;
            return e || (e = setTimeout(c, t)), l && (o = n.apply(i, u)), o } }, j.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t) } }, j.wrap = function(n, t) {
        return function() {
            var r = [n];
            return a.apply(r, arguments), t.apply(this, r) } }, j.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [n[r].apply(this, t)];
            return t[0] } }, j.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0 } }, j.keys = w || function(n) {
        if (n !== Object(n)) throw new TypeError("Invalid object");
        var t = [];
        for (var r in n) j.has(n, r) && t.push(r);
        return t }, j.values = function(n) {
        for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
        return e }, j.pairs = function(n) {
        for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
        return e }, j.invert = function(n) {
        for (var t = {}, r = j.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
        return t }, j.functions = j.methods = function(n) {
        var t = [];
        for (var r in n) j.isFunction(n[r]) && t.push(r);
        return t.sort() }, j.extend = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t) n[r] = t[r] }), n }, j.pick = function(n) {
        var t = {},
            r = c.apply(e, o.call(arguments, 1));
        return A(r, function(r) { r in n && (t[r] = n[r]) }), t }, j.omit = function(n) {
        var t = {},
            r = c.apply(e, o.call(arguments, 1));
        for (var u in n) j.contains(r, u) || (t[u] = n[u]);
        return t }, j.defaults = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t) n[r] === void 0 && (n[r] = t[r]) }), n }, j.clone = function(n) {
        return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n }, j.tap = function(n, t) {
        return t(n), n };
    var S = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t)) return !1;
        switch (u) {
            case "[object String]":
                return n == String(t);
            case "[object Number]":
                return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n == +t;
            case "[object RegExp]":
                return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase }
        if ("object" != typeof n || "object" != typeof t) return !1;
        for (var i = r.length; i--;)
            if (r[i] == n) return e[i] == t;
        var a = n.constructor,
            o = t.constructor;
        if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o)) return !1;
        r.push(n), e.push(t);
        var c = 0,
            f = !0;
        if ("[object Array]" == u) {
            if (c = n.length, f = c == t.length)
                for (; c-- && (f = S(n[c], t[c], r, e));); } else {
            for (var s in n)
                if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e)))) break;
            if (f) {
                for (s in t)
                    if (j.has(t, s) && !c--) break;
                f = !c } }
        return r.pop(), e.pop(), f };
    j.isEqual = function(n, t) {
        return S(n, t, [], []) }, j.isEmpty = function(n) {
        if (null == n) return !0;
        if (j.isArray(n) || j.isString(n)) return 0 === n.length;
        for (var t in n)
            if (j.has(n, t)) return !1;
        return !0 }, j.isElement = function(n) {
        return !(!n || 1 !== n.nodeType) }, j.isArray = x || function(n) {
        return "[object Array]" == l.call(n) }, j.isObject = function(n) {
        return n === Object(n) }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) { j["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]" } }), j.isArguments(arguments) || (j.isArguments = function(n) {
        return !(!n || !j.has(n, "callee")) }), "function" != typeof /./ && (j.isFunction = function(n) {
        return "function" == typeof n }), j.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n)) }, j.isNaN = function(n) {
        return j.isNumber(n) && n != +n }, j.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n) }, j.isNull = function(n) {
        return null === n }, j.isUndefined = function(n) {
        return n === void 0 }, j.has = function(n, t) {
        return f.call(n, t) }, j.noConflict = function() {
        return n._ = t, this }, j.identity = function(n) {
        return n }, j.times = function(n, t, r) {
        for (var e = Array(Math.max(0, n)), u = 0; n > u; u++) e[u] = t.call(r, u);
        return e }, j.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1)) };
    var I = { escape: { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" } };
    I.unescape = j.invert(I.escape);
    var T = { escape: new RegExp("[" + j.keys(I.escape).join("") + "]", "g"), unescape: new RegExp("(" + j.keys(I.unescape).join("|") + ")", "g") };
    j.each(["escape", "unescape"], function(n) { j[n] = function(t) {
            return null == t ? "" : ("" + t).replace(T[n], function(t) {
                return I[n][t] }) } }), j.result = function(n, t) {
        if (null == n) return void 0;
        var r = n[t];
        return j.isFunction(r) ? r.call(n) : r }, j.mixin = function(n) { A(j.functions(n), function(t) {
            var r = j[t] = n[t];
            j.prototype[t] = function() {
                var n = [this._wrapped];
                return a.apply(n, arguments), z.call(this, r.apply(j, n)) } }) };
    var N = 0;
    j.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t : t }, j.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };
    var q = /(.)^/,
        B = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "": "t", "\u2028": "u2028", "\u2029": "u2029" },
        D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    j.template = function(n, t, r) {
        var e;
        r = j.defaults({}, r, j.templateSettings);
        var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$", "g"),
            i = 0,
            a = "__p+='";
        n.replace(u, function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(D, function(n) {
                return "\\" + B[n] }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try { e = new Function(r.variable || "obj", "_", a) } catch (o) {
            throw o.source = a, o }
        if (t) return e(t, j);
        var c = function(n) {
            return e.call(this, n, j) };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c }, j.chain = function(n) {
        return j(n).chain() };
    var z = function(n) {
        return this._chain ? j(n).chain() : n };
    j.mixin(j), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], z.call(this, r) } }), A(["concat", "join", "slice"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            return z.call(this, t.apply(this._wrapped, arguments)) } }), j.extend(j.prototype, { chain: function() {
            return this._chain = !0, this }, value: function() {
            return this._wrapped } }) }).call(this);
(function() {
    var t = this;
    var e = t.Backbone;
    var i = [];
    var r = i.push;
    var s = i.slice;
    var n = i.splice;
    var a;
    if (typeof exports !== "undefined") { a = exports } else { a = t.Backbone = {} }
    a.VERSION = "1.1.0";
    var h = t._;
    if (!h && typeof require !== "undefined") h = require("underscore");
    a.$ = t.jQuery || t.Zepto || t.ender || t.$;
    a.noConflict = function() { t.Backbone = e;
        return this };
    a.emulateHTTP = false;
    a.emulateJSON = false;
    var o = a.Events = { on: function(t, e, i) {
            if (!l(this, "on", t, [e, i]) || !e) return this;
            this._events || (this._events = {});
            var r = this._events[t] || (this._events[t] = []);
            r.push({ callback: e, context: i, ctx: i || this });
            return this }, once: function(t, e, i) {
            if (!l(this, "once", t, [e, i]) || !e) return this;
            var r = this;
            var s = h.once(function() { r.off(t, s);
                e.apply(this, arguments) });
            s._callback = e;
            return this.on(t, s, i) }, off: function(t, e, i) {
            var r, s, n, a, o, u, c, f;
            if (!this._events || !l(this, "off", t, [e, i])) return this;
            if (!t && !e && !i) { this._events = {};
                return this }
            a = t ? [t] : h.keys(this._events);
            for (o = 0, u = a.length; o < u; o++) { t = a[o];
                if (n = this._events[t]) { this._events[t] = r = [];
                    if (e || i) {
                        for (c = 0, f = n.length; c < f; c++) { s = n[c];
                            if (e && e !== s.callback && e !== s.callback._callback || i && i !== s.context) { r.push(s) } } }
                    if (!r.length) delete this._events[t] } }
            return this }, trigger: function(t) {
            if (!this._events) return this;
            var e = s.call(arguments, 1);
            if (!l(this, "trigger", t, e)) return this;
            var i = this._events[t];
            var r = this._events.all;
            if (i) c(i, e);
            if (r) c(r, arguments);
            return this }, stopListening: function(t, e, i) {
            var r = this._listeningTo;
            if (!r) return this;
            var s = !e && !i;
            if (!i && typeof e === "object") i = this;
            if (t)(r = {})[t._listenId] = t;
            for (var n in r) { t = r[n];
                t.off(e, i, this);
                if (s || h.isEmpty(t._events)) delete this._listeningTo[n] }
            return this } };
    var u = /\s+/;
    var l = function(t, e, i, r) {
        if (!i) return true;
        if (typeof i === "object") {
            for (var s in i) { t[e].apply(t, [s, i[s]].concat(r)) }
            return false }
        if (u.test(i)) {
            var n = i.split(u);
            for (var a = 0, h = n.length; a < h; a++) { t[e].apply(t, [n[a]].concat(r)) }
            return false }
        return true };
    var c = function(t, e) {
        var i, r = -1,
            s = t.length,
            n = e[0],
            a = e[1],
            h = e[2];
        switch (e.length) {
            case 0:
                while (++r < s)(i = t[r]).callback.call(i.ctx);
                return;
            case 1:
                while (++r < s)(i = t[r]).callback.call(i.ctx, n);
                return;
            case 2:
                while (++r < s)(i = t[r]).callback.call(i.ctx, n, a);
                return;
            case 3:
                while (++r < s)(i = t[r]).callback.call(i.ctx, n, a, h);
                return;
            default:
                while (++r < s)(i = t[r]).callback.apply(i.ctx, e) } };
    var f = { listenTo: "on", listenToOnce: "once" };
    h.each(f, function(t, e) { o[e] = function(e, i, r) {
            var s = this._listeningTo || (this._listeningTo = {});
            var n = e._listenId || (e._listenId = h.uniqueId("l"));
            s[n] = e;
            if (!r && typeof i === "object") r = this;
            e[t](i, r, this);
            return this } });
    o.bind = o.on;
    o.unbind = o.off;
    h.extend(a, o);
    var d = a.Model = function(t, e) {
        var i = t || {};
        e || (e = {});
        this.cid = h.uniqueId("c");
        this.attributes = {};
        if (e.collection) this.collection = e.collection;
        if (e.parse) i = this.parse(i, e) || {};
        i = h.defaults({}, i, h.result(this, "defaults"));
        this.set(i, e);
        this.changed = {};
        this.initialize.apply(this, arguments) };
    h.extend(d.prototype, o, { changed: null, validationError: null, idAttribute: "id", initialize: function() {}, toJSON: function(t) {
            return h.clone(this.attributes) }, sync: function() {
            return a.sync.apply(this, arguments) }, get: function(t) {
            return this.attributes[t] }, escape: function(t) {
            return h.escape(this.get(t)) }, has: function(t) {
            return this.get(t) != null }, set: function(t, e, i) {
            var r, s, n, a, o, u, l, c;
            if (t == null) return this;
            if (typeof t === "object") { s = t;
                i = e } else {
                (s = {})[t] = e }
            i || (i = {});
            if (!this._validate(s, i)) return false;
            n = i.unset;
            o = i.silent;
            a = [];
            u = this._changing;
            this._changing = true;
            if (!u) { this._previousAttributes = h.clone(this.attributes);
                this.changed = {} }
            c = this.attributes, l = this._previousAttributes;
            if (this.idAttribute in s) this.id = s[this.idAttribute];
            for (r in s) { e = s[r];
                if (!h.isEqual(c[r], e)) a.push(r);
                if (!h.isEqual(l[r], e)) { this.changed[r] = e } else { delete this.changed[r] }
                n ? delete c[r] : c[r] = e }
            if (!o) {
                if (a.length) this._pending = true;
                for (var f = 0, d = a.length; f < d; f++) { this.trigger("change:" + a[f], this, c[a[f]], i) } }
            if (u) return this;
            if (!o) {
                while (this._pending) { this._pending = false;
                    this.trigger("change", this, i) } }
            this._pending = false;
            this._changing = false;
            return this }, unset: function(t, e) {
            return this.set(t, void 0, h.extend({}, e, { unset: true })) }, clear: function(t) {
            var e = {};
            for (var i in this.attributes) e[i] = void 0;
            return this.set(e, h.extend({}, t, { unset: true })) }, hasChanged: function(t) {
            if (t == null) return !h.isEmpty(this.changed);
            return h.has(this.changed, t) }, changedAttributes: function(t) {
            if (!t) return this.hasChanged() ? h.clone(this.changed) : false;
            var e, i = false;
            var r = this._changing ? this._previousAttributes : this.attributes;
            for (var s in t) {
                if (h.isEqual(r[s], e = t[s])) continue;
                (i || (i = {}))[s] = e }
            return i }, previous: function(t) {
            if (t == null || !this._previousAttributes) return null;
            return this._previousAttributes[t] }, previousAttributes: function() {
            return h.clone(this._previousAttributes) }, fetch: function(t) { t = t ? h.clone(t) : {};
            if (t.parse === void 0) t.parse = true;
            var e = this;
            var i = t.success;
            t.success = function(r) {
                if (!e.set(e.parse(r, t), t)) return false;
                if (i) i(e, r, t);
                e.trigger("sync", e, r, t) };
            M(this, t);
            return this.sync("read", this, t) }, save: function(t, e, i) {
            var r, s, n, a = this.attributes;
            if (t == null || typeof t === "object") { r = t;
                i = e } else {
                (r = {})[t] = e }
            i = h.extend({ validate: true }, i);
            if (r && !i.wait) {
                if (!this.set(r, i)) return false } else {
                if (!this._validate(r, i)) return false }
            if (r && i.wait) { this.attributes = h.extend({}, a, r) }
            if (i.parse === void 0) i.parse = true;
            var o = this;
            var u = i.success;
            i.success = function(t) { o.attributes = a;
                var e = o.parse(t, i);
                if (i.wait) e = h.extend(r || {}, e);
                if (h.isObject(e) && !o.set(e, i)) {
                    return false }
                if (u) u(o, t, i);
                o.trigger("sync", o, t, i) };
            M(this, i);
            s = this.isNew() ? "create" : i.patch ? "patch" : "update";
            if (s === "patch") i.attrs = r;
            n = this.sync(s, this, i);
            if (r && i.wait) this.attributes = a;
            return n }, destroy: function(t) { t = t ? h.clone(t) : {};
            var e = this;
            var i = t.success;
            var r = function() { e.trigger("destroy", e, e.collection, t) };
            t.success = function(s) {
                if (t.wait || e.isNew()) r();
                if (i) i(e, s, t);
                if (!e.isNew()) e.trigger("sync", e, s, t) };
            if (this.isNew()) { t.success();
                return false }
            M(this, t);
            var s = this.sync("delete", this, t);
            if (!t.wait) r();
            return s }, url: function() {
            var t = h.result(this, "urlRoot") || h.result(this.collection, "url") || U();
            if (this.isNew()) return t;
            return t + (t.charAt(t.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id) }, parse: function(t, e) {
            return t }, clone: function() {
            return new this.constructor(this.attributes) }, isNew: function() {
            return this.id == null }, isValid: function(t) {
            return this._validate({}, h.extend(t || {}, { validate: true })) }, _validate: function(t, e) {
            if (!e.validate || !this.validate) return true;
            t = h.extend({}, this.attributes, t);
            var i = this.validationError = this.validate(t, e) || null;
            if (!i) return true;
            this.trigger("invalid", this, i, h.extend(e, { validationError: i }));
            return false } });
    var p = ["keys", "values", "pairs", "invert", "pick", "omit"];
    h.each(p, function(t) { d.prototype[t] = function() {
            var e = s.call(arguments);
            e.unshift(this.attributes);
            return h[t].apply(h, e) } });
    var v = a.Collection = function(t, e) { e || (e = {});
        if (e.model) this.model = e.model;
        if (e.comparator !== void 0) this.comparator = e.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (t) this.reset(t, h.extend({ silent: true }, e)) };
    var g = { add: true, remove: true, merge: true };
    var m = { add: true, remove: false };
    h.extend(v.prototype, o, { model: d, initialize: function() {}, toJSON: function(t) {
            return this.map(function(e) {
                return e.toJSON(t) }) }, sync: function() {
            return a.sync.apply(this, arguments) }, add: function(t, e) {
            return this.set(t, h.extend({ merge: false }, e, m)) }, remove: function(t, e) {
            var i = !h.isArray(t);
            t = i ? [t] : h.clone(t);
            e || (e = {});
            var r, s, n, a;
            for (r = 0, s = t.length; r < s; r++) { a = t[r] = this.get(t[r]);
                if (!a) continue;
                delete this._byId[a.id];
                delete this._byId[a.cid];
                n = this.indexOf(a);
                this.models.splice(n, 1);
                this.length--;
                if (!e.silent) { e.index = n;
                    a.trigger("remove", a, this, e) }
                this._removeReference(a) }
            return i ? t[0] : t }, set: function(t, e) { e = h.defaults({}, e, g);
            if (e.parse) t = this.parse(t, e);
            var i = !h.isArray(t);
            t = i ? t ? [t] : [] : h.clone(t);
            var r, s, n, a, o, u, l;
            var c = e.at;
            var f = this.model;
            var p = this.comparator && c == null && e.sort !== false;
            var v = h.isString(this.comparator) ? this.comparator : null;
            var m = [],
                y = [],
                _ = {};
            var w = e.add,
                b = e.merge,
                x = e.remove;
            var E = !p && w && x ? [] : false;
            for (r = 0, s = t.length; r < s; r++) { o = t[r];
                if (o instanceof d) { n = a = o } else { n = o[f.prototype.idAttribute] }
                if (u = this.get(n)) {
                    if (x) _[u.cid] = true;
                    if (b) { o = o === a ? a.attributes : o;
                        if (e.parse) o = u.parse(o, e);
                        u.set(o, e);
                        if (p && !l && u.hasChanged(v)) l = true }
                    t[r] = u } else if (w) { a = t[r] = this._prepareModel(o, e);
                    if (!a) continue;
                    m.push(a);
                    a.on("all", this._onModelEvent, this);
                    this._byId[a.cid] = a;
                    if (a.id != null) this._byId[a.id] = a }
                if (E) E.push(u || a) }
            if (x) {
                for (r = 0, s = this.length; r < s; ++r) {
                    if (!_[(a = this.models[r]).cid]) y.push(a) }
                if (y.length) this.remove(y, e) }
            if (m.length || E && E.length) {
                if (p) l = true;
                this.length += m.length;
                if (c != null) {
                    for (r = 0, s = m.length; r < s; r++) { this.models.splice(c + r, 0, m[r]) } } else {
                    if (E) this.models.length = 0;
                    var T = E || m;
                    for (r = 0, s = T.length; r < s; r++) { this.models.push(T[r]) } } }
            if (l) this.sort({ silent: true });
            if (!e.silent) {
                for (r = 0, s = m.length; r < s; r++) {
                    (a = m[r]).trigger("add", a, this, e) }
                if (l || E && E.length) this.trigger("sort", this, e) }
            return i ? t[0] : t }, reset: function(t, e) { e || (e = {});
            for (var i = 0, r = this.models.length; i < r; i++) { this._removeReference(this.models[i]) }
            e.previousModels = this.models;
            this._reset();
            t = this.add(t, h.extend({ silent: true }, e));
            if (!e.silent) this.trigger("reset", this, e);
            return t }, push: function(t, e) {
            return this.add(t, h.extend({ at: this.length }, e)) }, pop: function(t) {
            var e = this.at(this.length - 1);
            this.remove(e, t);
            return e }, unshift: function(t, e) {
            return this.add(t, h.extend({ at: 0 }, e)) }, shift: function(t) {
            var e = this.at(0);
            this.remove(e, t);
            return e }, slice: function() {
            return s.apply(this.models, arguments) }, get: function(t) {
            if (t == null) return void 0;
            return this._byId[t.id] || this._byId[t.cid] || this._byId[t] }, at: function(t) {
            return this.models[t] }, where: function(t, e) {
            if (h.isEmpty(t)) return e ? void 0 : [];
            return this[e ? "find" : "filter"](function(e) {
                for (var i in t) {
                    if (t[i] !== e.get(i)) return false }
                return true }) }, findWhere: function(t) {
            return this.where(t, true) }, sort: function(t) {
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            t || (t = {});
            if (h.isString(this.comparator) || this.comparator.length === 1) { this.models = this.sortBy(this.comparator, this) } else { this.models.sort(h.bind(this.comparator, this)) }
            if (!t.silent) this.trigger("sort", this, t);
            return this }, pluck: function(t) {
            return h.invoke(this.models, "get", t) }, fetch: function(t) { t = t ? h.clone(t) : {};
            if (t.parse === void 0) t.parse = true;
            var e = t.success;
            var i = this;
            t.success = function(r) {
                var s = t.reset ? "reset" : "set";
                i[s](r, t);
                if (e) e(i, r, t);
                i.trigger("sync", i, r, t) };
            M(this, t);
            return this.sync("read", this, t) }, create: function(t, e) { e = e ? h.clone(e) : {};
            if (!(t = this._prepareModel(t, e))) return false;
            if (!e.wait) this.add(t, e);
            var i = this;
            var r = e.success;
            e.success = function(t, e, s) {
                if (s.wait) i.add(t, s);
                if (r) r(t, e, s) };
            t.save(null, e);
            return t }, parse: function(t, e) {
            return t }, clone: function() {
            return new this.constructor(this.models) }, _reset: function() { this.length = 0;
            this.models = [];
            this._byId = {} }, _prepareModel: function(t, e) {
            if (t instanceof d) {
                if (!t.collection) t.collection = this;
                return t }
            e = e ? h.clone(e) : {};
            e.collection = this;
            var i = new this.model(t, e);
            if (!i.validationError) return i;
            this.trigger("invalid", this, i.validationError, e);
            return false }, _removeReference: function(t) {
            if (this === t.collection) delete t.collection;
            t.off("all", this._onModelEvent, this) }, _onModelEvent: function(t, e, i, r) {
            if ((t === "add" || t === "remove") && i !== this) return;
            if (t === "destroy") this.remove(e, r);
            if (e && t === "change:" + e.idAttribute) { delete this._byId[e.previous(e.idAttribute)];
                if (e.id != null) this._byId[e.id] = e }
            this.trigger.apply(this, arguments) } });
    var y = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
    h.each(y, function(t) { v.prototype[t] = function() {
            var e = s.call(arguments);
            e.unshift(this.models);
            return h[t].apply(h, e) } });
    var _ = ["groupBy", "countBy", "sortBy"];
    h.each(_, function(t) { v.prototype[t] = function(e, i) {
            var r = h.isFunction(e) ? e : function(t) {
                return t.get(e) };
            return h[t](this.models, r, i) } });
    var w = a.View = function(t) { this.cid = h.uniqueId("view");
        t || (t = {});
        h.extend(this, h.pick(t, x));
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents() };
    var b = /^(\S+)\s*(.*)$/;
    var x = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    h.extend(w.prototype, o, { tagName: "div", $: function(t) {
            return this.$el.find(t) }, initialize: function() {}, render: function() {
            return this }, remove: function() { this.$el.remove();
            this.stopListening();
            return this }, setElement: function(t, e) {
            if (this.$el) this.undelegateEvents();
            this.$el = t instanceof a.$ ? t : a.$(t);
            this.el = this.$el[0];
            if (e !== false) this.delegateEvents();
            return this }, delegateEvents: function(t) {
            if (!(t || (t = h.result(this, "events")))) return this;
            this.undelegateEvents();
            for (var e in t) {
                var i = t[e];
                if (!h.isFunction(i)) i = this[t[e]];
                if (!i) continue;
                var r = e.match(b);
                var s = r[1],
                    n = r[2];
                i = h.bind(i, this);
                s += ".delegateEvents" + this.cid;
                if (n === "") { this.$el.on(s, i) } else { this.$el.on(s, n, i) } }
            return this }, undelegateEvents: function() { this.$el.off(".delegateEvents" + this.cid);
            return this }, _ensureElement: function() {
            if (!this.el) {
                var t = h.extend({}, h.result(this, "attributes"));
                if (this.id) t.id = h.result(this, "id");
                if (this.className) t["class"] = h.result(this, "className");
                var e = a.$("<" + h.result(this, "tagName") + ">").attr(t);
                this.setElement(e, false) } else { this.setElement(h.result(this, "el"), false) } } });
    a.sync = function(t, e, i) {
        var r = T[t];
        h.defaults(i || (i = {}), { emulateHTTP: a.emulateHTTP, emulateJSON: a.emulateJSON });
        var s = { type: r, dataType: "json" };
        if (!i.url) { s.url = h.result(e, "url") || U() }
        if (i.data == null && e && (t === "create" || t === "update" || t === "patch")) { s.contentType = "application/json";
            s.data = JSON.stringify(i.attrs || e.toJSON(i)) }
        if (i.emulateJSON) { s.contentType = "application/x-www-form-urlencoded";
            s.data = s.data ? { model: s.data } : {} }
        if (i.emulateHTTP && (r === "PUT" || r === "DELETE" || r === "PATCH")) { s.type = "POST";
            if (i.emulateJSON) s.data._method = r;
            var n = i.beforeSend;
            i.beforeSend = function(t) { t.setRequestHeader("X-HTTP-Method-Override", r);
                if (n) return n.apply(this, arguments) } }
        if (s.type !== "GET" && !i.emulateJSON) { s.processData = false }
        if (s.type === "PATCH" && E) { s.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP") } }
        var o = i.xhr = a.ajax(h.extend(s, i));
        e.trigger("request", e, o, i);
        return o };
    var E = typeof window !== "undefined" && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);
    var T = { create: "POST", update: "PUT", patch: "PATCH", "delete": "DELETE", read: "GET" };
    a.ajax = function() {
        return a.$.ajax.apply(a.$, arguments) };
    var k = a.Router = function(t) { t || (t = {});
        if (t.routes) this.routes = t.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments) };
    var S = /\((.*?)\)/g;
    var $ = /(\(\?)?:\w+/g;
    var H = /\*\w+/g;
    var A = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    h.extend(k.prototype, o, { initialize: function() {}, route: function(t, e, i) {
            if (!h.isRegExp(t)) t = this._routeToRegExp(t);
            if (h.isFunction(e)) { i = e;
                e = "" }
            if (!i) i = this[e];
            var r = this;
            a.history.route(t, function(s) {
                var n = r._extractParameters(t, s);
                i && i.apply(r, n);
                r.trigger.apply(r, ["route:" + e].concat(n));
                r.trigger("route", e, n);
                a.history.trigger("route", r, e, n) });
            return this }, navigate: function(t, e) { a.history.navigate(t, e);
            return this }, _bindRoutes: function() {
            if (!this.routes) return;
            this.routes = h.result(this, "routes");
            var t, e = h.keys(this.routes);
            while ((t = e.pop()) != null) { this.route(t, this.routes[t]) } }, _routeToRegExp: function(t) { t = t.replace(A, "\\$&").replace(S, "(?:$1)?").replace($, function(t, e) {
                return e ? t : "([^/]+)" }).replace(H, "(.*?)");
            return new RegExp("^" + t + "$") }, _extractParameters: function(t, e) {
            var i = t.exec(e).slice(1);
            return h.map(i, function(t) {
                return t ? decodeURIComponent(t) : null }) } });
    var I = a.History = function() { this.handlers = [];
        h.bindAll(this, "checkUrl");
        if (typeof window !== "undefined") { this.location = window.location;
            this.history = window.history } };
    var N = /^[#\/]|\s+$/g;
    var O = /^\/+|\/+$/g;
    var P = /msie [\w.]+/;
    var C = /\/$/;
    var j = /[?#].*$/;
    I.started = false;
    h.extend(I.prototype, o, { interval: 50, getHash: function(t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : "" }, getFragment: function(t, e) {
            if (t == null) {
                if (this._hasPushState || !this._wantsHashChange || e) { t = this.location.pathname;
                    var i = this.root.replace(C, "");
                    if (!t.indexOf(i)) t = t.slice(i.length) } else { t = this.getHash() } }
            return t.replace(N, "") }, start: function(t) {
            if (I.started) throw new Error("Backbone.history has already been started");
            I.started = true;
            this.options = h.extend({ root: "/" }, this.options, t);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var e = this.getFragment();
            var i = document.documentMode;
            var r = P.exec(navigator.userAgent.toLowerCase()) && (!i || i <= 7);
            this.root = ("/" + this.root + "/").replace(O, "/");
            if (r && this._wantsHashChange) { this.iframe = a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(e) }
            if (this._hasPushState) { a.$(window).on("popstate", this.checkUrl) } else if (this._wantsHashChange && "onhashchange" in window && !r) { a.$(window).on("hashchange", this.checkUrl) } else if (this._wantsHashChange) { this._checkUrlInterval = setInterval(this.checkUrl, this.interval) }
            this.fragment = e;
            var s = this.location;
            var n = s.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !n) { this.fragment = this.getFragment(null, true);
                    this.location.replace(this.root + this.location.search + "#" + this.fragment);
                    return true } else if (this._hasPushState && n && s.hash) { this.fragment = this.getHash().replace(N, "");
                    this.history.replaceState({}, document.title, this.root + this.fragment + s.search) } }
            if (!this.options.silent) return this.loadUrl() }, stop: function() { a.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            I.started = false }, route: function(t, e) { this.handlers.unshift({ route: t, callback: e }) }, checkUrl: function(t) {
            var e = this.getFragment();
            if (e === this.fragment && this.iframe) { e = this.getFragment(this.getHash(this.iframe)) }
            if (e === this.fragment) return false;
            if (this.iframe) this.navigate(e);
            this.loadUrl() }, loadUrl: function(t) { t = this.fragment = this.getFragment(t);
            return h.any(this.handlers, function(e) {
                if (e.route.test(t)) { e.callback(t);
                    return true } }) }, navigate: function(t, e) {
            if (!I.started) return false;
            if (!e || e === true) e = { trigger: !!e };
            var i = this.root + (t = this.getFragment(t || ""));
            t = t.replace(j, "");
            if (this.fragment === t) return;
            this.fragment = t;
            if (t === "" && i !== "/") i = i.slice(0, -1);
            if (this._hasPushState) { this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i) } else if (this._wantsHashChange) { this._updateHash(this.location, t, e.replace);
                if (this.iframe && t !== this.getFragment(this.getHash(this.iframe))) {
                    if (!e.replace) this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, t, e.replace) } } else {
                return this.location.assign(i) }
            if (e.trigger) return this.loadUrl(t) }, _updateHash: function(t, e, i) {
            if (i) {
                var r = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(r + "#" + e) } else { t.hash = "#" + e } } });
    a.history = new I;
    var R = function(t, e) {
        var i = this;
        var r;
        if (t && h.has(t, "constructor")) { r = t.constructor } else { r = function() {
                return i.apply(this, arguments) } }
        h.extend(r, i, e);
        var s = function() { this.constructor = r };
        s.prototype = i.prototype;
        r.prototype = new s;
        if (t) h.extend(r.prototype, t);
        r.__super__ = i.prototype;
        return r };
    d.extend = v.extend = k.extend = w.extend = I.extend = R;
    var U = function() {
        throw new Error('A "url" property or function must be specified') };
    var M = function(t, e) {
        var i = e.error;
        e.error = function(r) {
            if (i) i(t, r, e);
            t.trigger("error", t, r, e) } } }).call(this);
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) { "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher") }(jQuery), + function(t) { "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.alert");
            n || i.data("bs.alert", n = new o(this)), "string" == typeof e && n[e].call(i) }) }
    var i = '[data-dismiss="alert"]',
        o = function(e) { t(e).on("click", i, this.close) };
    o.VERSION = "3.3.4", o.TRANSITION_DURATION = 150, o.prototype.close = function(e) {
        function i() { a.detach().trigger("closed.bs.alert").remove() }
        var n = t(this),
            s = n.attr("data-target");
        s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(s);
        e && e.preventDefault(), a.length || (a = n.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i()) };
    var n = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = o, t.fn.alert.noConflict = function() {
        return t.fn.alert = n, this }, t(document).on("click.bs.alert.data-api", i, o.prototype.close) }(jQuery), + function(t) { "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.button"),
                s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this, s)), "toggle" == e ? n.toggle() : e && n.setState(e) }) }
    var i = function(e, o) { this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1 };
    i.VERSION = "3.3.4", i.DEFAULTS = { loadingText: "loading..." }, i.prototype.setState = function(e) {
        var i = "disabled",
            o = this.$element,
            n = o.is("input") ? "val" : "html",
            s = o.data();
        e += "Text", null == s.resetText && o.data("resetText", o[n]()), setTimeout(t.proxy(function() { o[n](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i)) }, this), 0) }, i.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input"); "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change") } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active") };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
        return t.fn.button = o, this }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var o = t(i.target);
        o.hasClass("btn") || (o = o.closest(".btn")), e.call(o, "toggle"), i.preventDefault() }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) { t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type)) }) }(jQuery), + function(t) { "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.carousel"),
                s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this, s)), "number" == typeof e ? n.to(e) : a ? n[a]() : s.interval && n.pause().cycle() }) }
    var i = function(e, i) { this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this)) };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 600, i.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return }
            t.preventDefault() } }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active) }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e),
            o = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (o && !this.options.wrap) return e;
        var n = "prev" == t ? -1 : 1,
            s = (i + n) % this.$items.length;
        return this.$items.eq(s) }, i.prototype.to = function(t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() { e.to(t) }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t)) }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this }, i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next") }, i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev") }, i.prototype.slide = function(e, o) {
        var n = this.$element.find(".item.active"),
            s = o || this.getItemForDirection(e, n),
            a = this.interval,
            r = "next" == e ? "left" : "right",
            l = this;
        if (s.hasClass("active")) return this.sliding = !1;
        var h = s[0],
            d = t.Event("slide.bs.carousel", { relatedTarget: h, direction: r });
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) { this.$indicators.find(".active").removeClass("active");
                var p = t(this.$indicators.children()[this.getItemIndex(s)]);
                p && p.addClass("active") }
            var c = t.Event("slid.bs.carousel", { relatedTarget: h, direction: r });
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), s[0].offsetWidth, n.addClass(r), s.addClass(r), n.one("bsTransitionEnd", function() { s.removeClass([e, r].join(" ")).addClass("active"), n.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function() { l.$element.trigger(c) }, 0) }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(c)), a && this.cycle(), this } };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = o, this };
    var n = function(i) {
        var o, n = t(this),
            s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var a = t.extend({}, s.data(), n.data()),
                r = n.attr("data-slide-to");
            r && (a.interval = !1), e.call(s, a), r && s.data("bs.carousel").to(r), i.preventDefault() } };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), t(window).on("load", function() { t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data()) }) }) }(jQuery), + function(t) { "use strict";

    function e(e) { e && 3 === e.which || (t(n).remove(), t(s).each(function() {
            var o = t(this),
                n = i(o),
                s = { relatedTarget: this };
            n.hasClass("open") && (n.trigger(e = t.Event("hide.bs.dropdown", s)), e.isDefaultPrevented() || (o.attr("aria-expanded", "false"), n.removeClass("open").trigger("hidden.bs.dropdown", s))) })) }

    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent() }

    function o(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new a(this)), "string" == typeof e && o[e].call(i) }) }
    var n = ".dropdown-backdrop",
        s = '[data-toggle="dropdown"]',
        a = function(e) { t(e).on("click.bs.dropdown", this.toggle) };
    a.VERSION = "3.3.4", a.prototype.toggle = function(o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = i(n),
                a = s.hasClass("open");
            if (e(), !a) { "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var r = { relatedTarget: this };
                if (s.trigger(o = t.Event("show.bs.dropdown", r)), o.isDefaultPrevented()) return;
                n.trigger("focus").attr("aria-expanded", "true"), s.toggleClass("open").trigger("shown.bs.dropdown", r) }
            return !1 } }, a.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var o = t(this);
            if (e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled")) {
                var n = i(o),
                    a = n.hasClass("open");
                if (!a && 27 != e.which || a && 27 == e.which) return 27 == e.which && n.find(s).trigger("focus"), o.trigger("click");
                var r = " li:not(.disabled):visible a",
                    l = n.find('[role="menu"]' + r + ', [role="listbox"]' + r);
                if (l.length) {
                    var h = l.index(e.target);
                    38 == e.which && h > 0 && h--, 40 == e.which && h < l.length - 1 && h++, ~h || (h = 0), l.eq(h).trigger("focus") } } } };
    var r = t.fn.dropdown;
    t.fn.dropdown = o, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r, this }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) { t.stopPropagation() }).on("click.bs.dropdown.data-api", s, a.prototype.toggle).on("keydown.bs.dropdown.data-api", s, a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', a.prototype.keydown) }(jQuery), + function(t) { "use strict";

    function e(e, o) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.modal"),
                a = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this, a)), "string" == typeof e ? s[e](o) : a.show && s.show(o) }) }
    var i = function(e, i) { this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() { this.$element.trigger("loaded.bs.modal") }, this)) };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t) }, i.prototype.show = function(e) {
        var o = this,
            n = t.Event("show.bs.modal", { relatedTarget: e });
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() { o.$element.one("mouseup.dismiss.bs.modal", function(e) { t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0) }) }), this.backdrop(function() {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.adjustDialog(), n && o.$element[0].offsetWidth, o.$element.addClass("in").attr("aria-hidden", !1), o.enforceFocus();
            var s = t.Event("shown.bs.modal", { relatedTarget: e });
            n ? o.$dialog.one("bsTransitionEnd", function() { o.$element.trigger("focus").trigger(s) }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s) })) }, i.prototype.hide = function(e) { e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal()) }, i.prototype.enforceFocus = function() { t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) { this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus") }, this)) }, i.prototype.escape = function() { this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) { 27 == t.which && this.hide() }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal") }, i.prototype.resize = function() { this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal") }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() { t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal") }) }, i.prototype.removeBackdrop = function() { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, i.prototype.backdrop = function(e) {
        var o = this,
            n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t('<div class="modal-backdrop ' + n + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())) }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e() } else if (!this.isShown && this.$backdrop) { this.$backdrop.removeClass("in");
            var a = function() { o.removeBackdrop(), e && e() };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a() } else e && e() }, i.prototype.handleUpdate = function() { this.adjustDialog() }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({ paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : "" }) }, i.prototype.resetAdjustments = function() { this.$element.css({ paddingLeft: "", paddingRight: "" }) }, i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left) }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar() }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth) }, i.prototype.resetScrollbar = function() { this.$body.css("padding-right", this.originalBodyPad) }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = o, this }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var o = t(this),
            n = o.attr("href"),
            s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            a = s.data("bs.modal") ? "toggle" : t.extend({ remote: !/#/.test(n) && n }, s.data(), o.data());
        o.is("a") && i.preventDefault(), s.one("show.bs.modal", function(t) { t.isDefaultPrevented() || s.one("hidden.bs.modal", function() { o.is(":visible") && o.trigger("focus") }) }), e.call(s, a, this) }) }(jQuery), + function(t) { "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.tooltip"),
                s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.tooltip", n = new i(this, s)), "string" == typeof e && n[e]()) }) }
    var i = function(t, e) { this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, e) };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, i.prototype.init = function(e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var a = n[s];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" : "focusin",
                    l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this)) } }
        this.options.selector ? this._options = t.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle() }, i.prototype.getDefaults = function() {
        return i.DEFAULTS }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = { show: e.delay, hide: e.delay }), e }, i.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) { i[t] != o && (e[t] = o) }), e }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() { "in" == i.hoverState && i.show() }, i.options.delay.show)) : i.show()) }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() { "out" == i.hoverState && i.hide() }, i.options.delay.hide)) : i.hide() }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) { this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o) return;
            var n = this,
                s = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), s.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && s.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                h = l.test(r);
            h && (r = r.replace(l, "") || "top"), s.detach().css({ top: 0, left: 0, display: "block" }).addClass(r).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element);
            var d = this.getPosition(),
                p = s[0].offsetWidth,
                c = s[0].offsetHeight;
            if (h) {
                var f = r,
                    u = this.options.container ? t(this.options.container) : this.$element.parent(),
                    g = this.getPosition(u);
                r = "bottom" == r && d.bottom + c > g.bottom ? "top" : "top" == r && d.top - c < g.top ? "bottom" : "right" == r && d.right + p > g.width ? "left" : "left" == r && d.left - p < g.left ? "right" : r, s.removeClass(f).addClass(r) }
            var m = this.getCalculatedOffset(r, d, p, c);
            this.applyPlacement(m, r);
            var v = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n) };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v() } }, i.prototype.applyPlacement = function(e, i) {
        var o = this.tip(),
            n = o[0].offsetWidth,
            s = o[0].offsetHeight,
            a = parseInt(o.css("margin-top"), 10),
            r = parseInt(o.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(r) && (r = 0), e.top = e.top + a, e.left = e.left + r, t.offset.setOffset(o[0], t.extend({ using: function(t) { o.css({ top: Math.round(t.top), left: Math.round(t.left) }) } }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth,
            h = o[0].offsetHeight; "top" == i && h != s && (e.top = e.top + s - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i),
            c = p ? 2 * d.left - n + l : 2 * d.top - s + h,
            f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(c, o[0][f], p) }, i.prototype.replaceArrow = function(t, e, i) { this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "") }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right") }, i.prototype.hide = function(e) {
        function o() { "in" != n.hoverState && s.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), e && e() }
        var n = this,
            s = t(this.$tip),
            a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), this.hoverState = null, this) }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "") }, i.prototype.hasContent = function() {
        return this.getTitle() }, i.prototype.getPosition = function(e) { e = e || this.$element;
        var i = e[0],
            o = "BODY" == i.tagName,
            n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, { width: n.right - n.left, height: n.bottom - n.top }));
        var s = o ? { top: 0, left: 0 } : e.offset(),
            a = { scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop() },
            r = o ? { width: t(window).width(), height: t(window).height() } : null;
        return t.extend({}, n, a, r, s) }, i.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? { top: e.top + e.height, left: e.left + e.width / 2 - i / 2 } : "top" == t ? { top: e.top - o, left: e.left + e.width / 2 - i / 2 } : "left" == t ? { top: e.top + e.height / 2 - o / 2, left: e.left - i } : { top: e.top + e.height / 2 - o / 2, left: e.left + e.width } }, i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = { top: 0, left: 0 };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - s - a.scroll,
                l = e.top + s - a.scroll + o;
            r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l) } else {
            var h = e.left - s,
                d = e.left + s + i;
            h < a.left ? n.left = a.left - h : d > a.width && (n.left = a.left + a.width - d) }
        return n }, i.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title) }, i.prototype.getUID = function(t) { do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t }, i.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template) }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, i.prototype.enable = function() { this.enabled = !0 }, i.prototype.disable = function() { this.enabled = !1 }, i.prototype.toggleEnabled = function() { this.enabled = !this.enabled }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i) }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() { t.$element.off("." + t.type).removeData("bs." + t.type) }) };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = o, this } }(jQuery), + function(t) { "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.popover"),
                s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.popover", n = new i(this, s)), "string" == typeof e && n[e]()) }) }
    var i = function(t, e) { this.init("popover", t, e) };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.4", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function() {
        return i.DEFAULTS }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide() }, i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent() }, i.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content) }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow") };
    var o = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function() {
        return t.fn.popover = o, this } }(jQuery), + function(t) { "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]() }) }
    var i = function(e) { this.element = t(e) };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"),
                s = t.Event("hide.bs.tab", { relatedTarget: e[0] }),
                a = t.Event("show.bs.tab", { relatedTarget: n[0] });
            if (n.trigger(s), e.trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var r = t(o);
                this.activate(e.closest("li"), i), this.activate(r, r.parent(), function() { n.trigger({ type: "hidden.bs.tab", relatedTarget: e[0] }), e.trigger({ type: "shown.bs.tab", relatedTarget: n[0] }) }) } } }, i.prototype.activate = function(e, o, n) {
        function s() { a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), n && n() }
        var a = o.find("> .active"),
            r = n && t.support.transition && (a.length && a.hasClass("fade") || !!o.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), a.removeClass("in") };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = o, this };
    var n = function(i) { i.preventDefault(), e.call(t(this), "show") };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n) }(jQuery), + function(t) { "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.affix"),
                s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this, s)), "string" == typeof e && n[e]() }) }
    var i = function(e, o) { this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition() };
    i.VERSION = "3.3.4", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = { offset: 0, target: window }, i.prototype.getState = function(t, e, i, o) {
        var n = this.$target.scrollTop(),
            s = this.$element.offset(),
            a = this.$target.height();
        if (null != i && "top" == this.affixed) return i > n ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? n + this.unpin <= s.top ? !1 : "bottom" : t - o >= n + a ? !1 : "bottom";
        var r = null == this.affixed,
            l = r ? n : s.top,
            h = r ? a : e;
        return null != i && i >= n ? "top" : null != o && l + h >= t - o ? "bottom" : !1 }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t }, i.prototype.checkPositionWithEventLoop = function() { setTimeout(t.proxy(this.checkPosition, this), 1) }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                o = this.options.offset,
                n = o.top,
                s = o.bottom,
                a = t(document.body).height(); "object" != typeof o && (s = n = o), "function" == typeof n && (n = o.top(this.$element)), "function" == typeof s && (s = o.bottom(this.$element));
            var r = this.getState(a, e, n, s);
            if (this.affixed != r) { null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r : ""),
                    h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix") } "bottom" == r && this.$element.offset({ top: a - e - s }) } };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = o, this }, t(window).on("load", function() { t('[data-spy="affix"]').each(function() {
            var i = t(this),
                o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o) }) }) }(jQuery), + function(t) { "use strict";

    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o) }

    function i(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.collapse"),
                s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);!n && s.toggle && /show|hide/.test(e) && (s.toggle = !1), n || i.data("bs.collapse", n = new o(this, s)), "string" == typeof e && n[e]() }) }
    var o = function(e, i) { this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle() };
    o.VERSION = "3.3.4", o.TRANSITION_DURATION = 350, o.DEFAULTS = { toggle: !0 }, o.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height" }, o.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse"), e && e.transitioning))) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s), !s.isDefaultPrevented()) { n && n.length && (i.call(n, "hide"), e || n.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var r = function() { this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse") };
                    if (!t.support.transition) return r.call(this);
                    var l = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l]) } } } }, o.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function() { this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse") };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this) } } }, o.prototype.toggle = function() { this[this.$element.hasClass("in") ? "hide" : "show"]() }, o.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n) }, this)).end() }, o.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i) };
    var n = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = n, this }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n),
            a = s.data("bs.collapse"),
            r = a ? "toggle" : n.data();
        i.call(s, r) }) }(jQuery), + function(t) { "use strict";

    function e(i, o) { this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process() }

    function i(i) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.scrollspy"),
                s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this, s)), "string" == typeof i && n[i]() }) }
    e.VERSION = "3.3.4", e.DEFAULTS = { offset: 10 }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight) }, e.prototype.refresh = function() {
        var e = this,
            i = "offset",
            o = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this),
                n = e.data("target") || e.attr("href"),
                s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [
                [s[i]().top + o, n]
            ] || null }).sort(function(t, e) {
            return t[0] - e[0] }).each(function() { e.offsets.push(this[0]), e.targets.push(this[1]) }) }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            o = this.options.offset + i - this.$scrollElement.height(),
            n = this.offsets,
            s = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o) return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0]) return this.activeTarget = null, this.clear();
        for (t = n.length; t--;) a != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t]) }, e.prototype.activate = function(e) { this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy") }, e.prototype.clear = function() { t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active") };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = o, this }, t(window).on("load.bs.scrollspy.data-api", function() { t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data()) }) }) }(jQuery), + function(t) { "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
        for (var i in e)
            if (void 0 !== t.style[i]) return { end: e[i] };
        return !1 }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
            o = this;
        t(this).one("bsTransitionEnd", function() { i = !0 });
        var n = function() { i || t(o).trigger(t.support.transition.end) };
        return setTimeout(n, e), this }, t(function() { t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = { bindType: t.support.transition.end, delegateType: t.support.transition.end, handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0 } }) }) }(jQuery);
var Handlebars = (function() {
    var __module3__ = (function() {
        "use strict";
        var __exports__;

        function SafeString(string) { this.string = string; }
        SafeString.prototype.toString = function() {
            return "" + this.string; };
        __exports__ = SafeString;
        return __exports__;
    })();
    var __module2__ = (function(__dependency1__) {
        "use strict";
        var __exports__ = {};
        var SafeString = __dependency1__;
        var escape = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" };
        var badChars = /[&<>"'`]/g;
        var possible = /[&<>"'`]/;

        function escapeChar(chr) {
            return escape[chr] || "&amp;"; }

        function extend(obj, value) {
            for (var key in value) {
                if (value.hasOwnProperty(key)) { obj[key] = value[key]; } } }
        __exports__.extend = extend;
        var toString = Object.prototype.toString;
        __exports__.toString = toString;
        var isFunction = function(value) {
            return typeof value === 'function'; };
        if (isFunction(/x/)) { isFunction = function(value) {
                return typeof value === 'function' && toString.call(value) === '[object Function]'; }; }
        var isFunction;
        __exports__.isFunction = isFunction;
        var isArray = Array.isArray || function(value) {
            return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false; };
        __exports__.isArray = isArray;

        function escapeExpression(string) {
            if (string instanceof SafeString) {
                return string.toString(); } else if (!string && string !== 0) {
                return ""; }
            string = "" + string;
            if (!possible.test(string)) {
                return string; }
            return string.replace(badChars, escapeChar);
        }
        __exports__.escapeExpression = escapeExpression;

        function isEmpty(value) {
            if (!value && value !== 0) {
                return true; } else if (isArray(value) && value.length === 0) {
                return true; } else {
                return false; } }
        __exports__.isEmpty = isEmpty;
        return __exports__;
    })(__module3__);
    var __module4__ = (function() {
        "use strict";
        var __exports__;
        var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

        function Exception() {
            var tmp = Error.prototype.constructor.apply(this, arguments);
            for (var idx = 0; idx < errorProps.length; idx++) { this[errorProps[idx]] = tmp[errorProps[idx]]; } }
        Exception.prototype = new Error();
        __exports__ = Exception;
        return __exports__;
    })();
    var __module1__ = (function(__dependency1__, __dependency2__) {
        "use strict";
        var __exports__ = {};
        var Utils = __dependency1__;
        var Exception = __dependency2__;
        var VERSION = "1.1.2";
        __exports__.VERSION = VERSION;
        var COMPILER_REVISION = 4;
        __exports__.COMPILER_REVISION = COMPILER_REVISION;
        var REVISION_CHANGES = { 1: '<= 1.0.rc.2', 2: '== 1.0.0-rc.3', 3: '== 1.0.0-rc.4', 4: '>= 1.0.0' };
        __exports__.REVISION_CHANGES = REVISION_CHANGES;
        var isArray = Utils.isArray,
            isFunction = Utils.isFunction,
            toString = Utils.toString,
            objectType = '[object Object]';

        function HandlebarsEnvironment(helpers, partials) { this.helpers = helpers || {};
            this.partials = partials || {};
            registerDefaultHelpers(this); }
        __exports__.HandlebarsEnvironment = HandlebarsEnvironment;
        HandlebarsEnvironment.prototype = {
            constructor: HandlebarsEnvironment,
            logger: logger,
            log: log,
            registerHelper: function(name, fn, inverse) {
                if (toString.call(name) === objectType) {
                    if (inverse || fn) {
                        throw new Exception('Arg not supported with multiple helpers'); }
                    Utils.extend(this.helpers, name);
                } else {
                    if (inverse) { fn.not = inverse; }
                    this.helpers[name] = fn;
                }
            },
            registerPartial: function(name, str) {
                if (toString.call(name) === objectType) { Utils.extend(this.partials, name); } else { this.partials[name] = str; } }
        };

        function registerDefaultHelpers(instance) {
            instance.registerHelper('helperMissing', function(arg) {
                if (arguments.length === 2) {
                    return undefined; } else {
                    throw new Error("Missing helper: '" + arg + "'"); } });
            instance.registerHelper('blockHelperMissing', function(context, options) {
                var inverse = options.inverse || function() {},
                    fn = options.fn;
                if (isFunction(context)) { context = context.call(this); }
                if (context === true) {
                    return fn(this); } else if (context === false || context == null) {
                    return inverse(this); } else if (isArray(context)) {
                    if (context.length > 0) {
                        return instance.helpers.each(context, options); } else {
                        return inverse(this); } } else {
                    return fn(context); }
            });
            instance.registerHelper('each', function(context, options) {
                var fn = options.fn,
                    inverse = options.inverse;
                var i = 0,
                    ret = "",
                    data;
                if (isFunction(context)) { context = context.call(this); }
                if (options.data) { data = createFrame(options.data); }
                if (context && typeof context === 'object') {
                    if (isArray(context)) {
                        for (var j = context.length; i < j; i++) {
                            if (data) {
                                data.index = i;
                                data.first = (i === 0)
                                data.last = (i === (context.length - 1));
                            }
                            ret = ret + fn(context[i], { data: data });
                        }
                    } else {
                        for (var key in context) {
                            if (context.hasOwnProperty(key)) {
                                if (data) { data.key = key; }
                                ret = ret + fn(context[key], { data: data });
                                i++;
                            }
                        }
                    }
                }
                if (i === 0) { ret = inverse(this); }
                return ret;
            });
            instance.registerHelper('if', function(conditional, options) {
                if (isFunction(conditional)) { conditional = conditional.call(this); }
                if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
                    return options.inverse(this); } else {
                    return options.fn(this); }
            });
            instance.registerHelper('unless', function(conditional, options) {
                return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash }); });
            instance.registerHelper('with', function(context, options) {
                if (isFunction(context)) { context = context.call(this); }
                if (!Utils.isEmpty(context)) return options.fn(context);
            });
            instance.registerHelper('log', function(context, options) {
                var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
                instance.log(level, context); });
        }
        var logger = { methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' }, DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3, log: function(level, obj) {
                if (logger.level <= level) {
                    var method = logger.methodMap[level];
                    if (typeof console !== 'undefined' && console[method]) { console[method].call(console, obj); } } } };
        __exports__.logger = logger;

        function log(level, obj) { logger.log(level, obj); }
        __exports__.log = log;
        var createFrame = function(object) {
            var obj = {};
            Utils.extend(obj, object);
            return obj; };
        __exports__.createFrame = createFrame;
        return __exports__;
    })(__module2__, __module4__);
    var __module5__ = (function(__dependency1__, __dependency2__, __dependency3__) {
        "use strict";
        var __exports__ = {};
        var Utils = __dependency1__;
        var Exception = __dependency2__;
        var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
        var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

        function checkRevision(compilerInfo) {
            var compilerRevision = compilerInfo && compilerInfo[0] || 1,
                currentRevision = COMPILER_REVISION;
            if (compilerRevision !== currentRevision) {
                if (compilerRevision < currentRevision) {
                    var runtimeVersions = REVISION_CHANGES[currentRevision],
                        compilerVersions = REVISION_CHANGES[compilerRevision];
                    throw new Error("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ")."); } else {
                    throw new Error("Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + compilerInfo[1] + ")."); } } }

        function template(templateSpec, env) {
            if (!env) {
                throw new Error("No environment passed to template"); }
            var invokePartialWrapper;
            if (env.compile) {
                invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
                    var result = invokePartial.apply(this, arguments);
                    if (result) {
                        return result; }
                    var options = { helpers: helpers, partials: partials, data: data };
                    partials[name] = env.compile(partial, { data: data !== undefined }, env);
                    return partials[name](context, options);
                };
            } else {
                invokePartialWrapper = function(partial, name) {
                    var result = invokePartial.apply(this, arguments);
                    if (result) {
                        return result; }
                    throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
                };
            }
            var container = {
                escapeExpression: Utils.escapeExpression,
                invokePartial: invokePartialWrapper,
                programs: [],
                program: function(i, fn, data) {
                    var programWrapper = this.programs[i];
                    if (data) { programWrapper = program(i, fn, data); } else if (!programWrapper) { programWrapper = this.programs[i] = program(i, fn); }
                    return programWrapper;
                },
                merge: function(param, common) {
                    var ret = param || common;
                    if (param && common && (param !== common)) { ret = {};
                        Utils.extend(ret, common);
                        Utils.extend(ret, param); }
                    return ret;
                },
                programWithDepth: programWithDepth,
                noop: noop,
                compilerInfo: null
            };
            return function(context, options) {
                options = options || {};
                var namespace = options.partial ? options : env,
                    helpers, partials;
                if (!options.partial) { helpers = options.helpers;
                    partials = options.partials; }
                var result = templateSpec.call(container, namespace, context, helpers, partials, options.data);
                if (!options.partial) { checkRevision(container.compilerInfo); }
                return result;
            };
        }
        __exports__.template = template;

        function programWithDepth(i, fn, data) {
            var args = Array.prototype.slice.call(arguments, 3);
            var prog = function(context, options) { options = options || {};
                return fn.apply(this, [context, options.data || data].concat(args)); };
            prog.program = i;
            prog.depth = args.length;
            return prog; }
        __exports__.programWithDepth = programWithDepth;

        function program(i, fn, data) {
            var prog = function(context, options) { options = options || {};
                return fn(context, options.data || data); };
            prog.program = i;
            prog.depth = 0;
            return prog; }
        __exports__.program = program;

        function invokePartial(partial, name, context, helpers, partials, data) {
            var options = { partial: true, helpers: helpers, partials: partials, data: data };
            if (partial === undefined) {
                throw new Exception("The partial " + name + " could not be found"); } else if (partial instanceof Function) {
                return partial(context, options); } }
        __exports__.invokePartial = invokePartial;

        function noop() {
            return ""; }
        __exports__.noop = noop;
        return __exports__;
    })(__module2__, __module4__, __module1__);
    var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) { "use strict";
        var __exports__;
        var base = __dependency1__;
        var SafeString = __dependency2__;
        var Exception = __dependency3__;
        var Utils = __dependency4__;
        var runtime = __dependency5__;
        var create = function() {
            var hb = new base.HandlebarsEnvironment();
            Utils.extend(hb, base);
            hb.SafeString = SafeString;
            hb.Exception = Exception;
            hb.Utils = Utils;
            hb.VM = runtime;
            hb.template = function(spec) {
                return runtime.template(spec, hb); };
            return hb; };
        var Handlebars = create();
        Handlebars.create = create;
        __exports__ = Handlebars;
        return __exports__; })(__module1__, __module3__, __module4__, __module2__, __module5__);
    return __module0__;
})();
jQuery.cookie = function(key, value, options) {
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);
        if (value === null || value === undefined) { options.expires = -1; }
        if (typeof options.expires === 'number') {
            var days = options.expires,
                t = options.expires = new Date();
            t.setDate(t.getDate() + days); }
        value = String(value);
        return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
    }
    options = value || {};
    var result, decode = options.raw ? function(s) {
        return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d); },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b; },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b; },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b; },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b; },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b; },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b; },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b; },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b; },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b; },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b; },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b; },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b; },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b; },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b; },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b; },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b; },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b; },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b; },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b; },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b; },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b; },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c;
            var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c;
            var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) { a = c;
            var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b; },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b; },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b; },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b; },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b; } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b; } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b; } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b; } },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b; }
});
(function($) {
    $.fn.touchwipe = function(settings) {
        var config = { min_move_x: 20, min_move_y: 20, wipeLeft: function() {}, wipeRight: function() {}, wipeUp: function() {}, wipeDown: function() {}, preventDefaultEvents: true };
        if (settings) $.extend(config, settings);
        this.each(function() {
            var startX;
            var startY;
            var isMoving = false;

            function cancelTouch() { this.removeEventListener('touchmove', onTouchMove);
                startX = null;
                isMoving = false; }

            function onTouchMove(e) {
                if (config.preventDefaultEvents) { e.preventDefault(); }
                if (isMoving) {
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;
                    if (Math.abs(dx) >= config.min_move_x) { cancelTouch();
                        if (dx > 0) { config.wipeLeft(e); } else { config.wipeRight(e); } } else if (Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if (dy > 0) { config.wipeDown(e); } else { config.wipeUp(e); }
                    }
                }
            }

            function onTouchStart(e) {
                if (e.touches.length == 1) { startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove', onTouchMove, false); } }
            if ('ontouchstart' in document.documentElement) { this.addEventListener('touchstart', onTouchStart, false); }
        });
        return this;
    };
})(jQuery);
define('requirecss', ['module'], function(module) {
    var loadedFiles = {};
    var baseUrl = module.config().baseUrl || '/';
    var requirecss = function() {
        var _this = Object.create({});
        var flagAsLoaded = function(url) {
            var cacheKey = getCacheKey(url);
            loadedFiles[cacheKey] = true; };
        var load = function(url, media) {
            var cacheKey = getCacheKey(url);
            if (isLoaded(cacheKey)) {
                return; }
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.media = media || 'screen';
            link.href = normalizeURL(url);
            document.getElementsByTagName('head')[0].appendChild(link);
            loadedFiles[cacheKey] = true;
        };
        var normalizeURL = function(url) {
            if (url.indexOf('http') == 0 || url.indexOf('//') == 0) {
                return url; }
            if (url.indexOf('/') == 0) {
                return baseUrl + url.substr(1); }
            return baseUrl + url;
        };
        var getCacheKey = function(url) {
            if (url.indexOf('http') == 0 || url.indexOf('//') == 0) {
                return url; }
            if (url.indexOf('/') == 0) {
                return url.substr(1); }
            return url;
        };
        var isLoaded = function(url) {
            return loadedFiles[url] === true ? true : false; };
        _this.flagAsLoaded = flagAsLoaded;
        _this.load = load;
        return _this;
    };
    return requirecss();
});
! function a(b, c, e) {
    function f(d, j) {
        if (!c[d]) {
            if (!b[d]) {
                var i = typeof require == 'function' && require;
                if (!j && i) return i(d, !0);
                if (g) return g(d, !0);
                throw new Error("Cannot find module '" + d + "'") }
            var h = c[d] = { exports: {} };
            b[d][0].call(h.exports, function(c) {
                var a = b[d][1][c];
                return f(a ? a : c) }, h, h.exports, a, b, c, e) }
        return c[d].exports }
    var g = typeof require == 'function' && require;
    for (var d = 0; d < e.length; d++) f(e[d]);
    return f }({ 1: [function(b, a, c) {! function(e, h, p, n, k, g, q, j, l, m, i, b, c, d, f, o) { 'use strict';
            e = function(a, c) {
                var b = a.style[c];
                if (a.currentStyle ? b = a.currentStyle[c] : window.getComputedStyle && (b = document.defaultView.getComputedStyle(a, null).getPropertyValue(c)), b == 'auto' && c == 'cursor') {
                    var e = ['a'];
                    for (var d = 0; d < e.length; d++)
                        if (a.tagName.toLowerCase() == e[d]) return 'pointer' }
                return b }, h = function(a) {
                if (!b.prototype._singleton) return;
                a || (a = window.event);
                var c;
                this !== window ? c = this : a.target ? c = a.target : a.srcElement && (c = a.srcElement), b.prototype._singleton.setCurrent(c) }, p = function(a, b, c) { a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent('on' + b, c) }, n = function(a, b, c) { a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent('on' + b, c) }, k = function(a, b) {
                if (a.addClass) return a.addClass(b), a;
                if (b && typeof b === 'string') {
                    var d = (b || '').split(/\s+/);
                    if (a.nodeType === 1)
                        if (!a.className) a.className = b;
                        else {
                            var f = ' ' + a.className + ' ',
                                e = a.className;
                            for (var c = 0, g = d.length; c < g; c++) f.indexOf(' ' + d[c] + ' ') < 0 && (e += ' ' + d[c]);
                            a.className = e.replace(/^\s+|\s+$/g, '') } }
                return a }, g = function(a, b) {
                if (a.removeClass) return a.removeClass(b), a;
                if (b && typeof b === 'string' || b === undefined) {
                    var e = (b || '').split(/\s+/);
                    if (a.nodeType === 1 && a.className)
                        if (b) {
                            var c = (' ' + a.className + ' ').replace(/[\n\t]/g, ' ');
                            for (var d = 0, f = e.length; d < f; d++) c = c.replace(' ' + e[d] + ' ', ' ');
                            a.className = c.replace(/^\s+|\s+$/g, '') } else a.className = '' }
                return a }, q = function(a) {
                var b = { left: 0, top: 0, width: a.width || a.offsetWidth || 0, height: a.height || a.offsetHeight || 0, zIndex: 9999 },
                    c = e(a, 'zIndex');
                c && c != 'auto' && (b.zIndex = parseInt(c, 10));
                while (a) {
                    var d = parseInt(e(a, 'borderLeftWidth'), 10),
                        f = parseInt(e(a, 'borderTopWidth'), 10);
                    b.left += isNaN(a.offsetLeft) ? 0 : a.offsetLeft, b.left += isNaN(d) ? 0 : d, b.top += isNaN(a.offsetTop) ? 0 : a.offsetTop, b.top += isNaN(f) ? 0 : f, a = a.offsetParent }
                return b }, j = function(a) {
                return (a.indexOf('?') >= 0 ? '&nocache=' : '?nocache=') + new Date().getTime() }, l = function(a) {
                var b = [];
                return a.trustedDomains && (typeof a.trustedDomains === 'string' ? b.push('trustedDomain=' + a.trustedDomains) : b.push('trustedDomain=' + a.trustedDomains.join(','))), b.join('&') }, m = function(c, b) {
                if (b.indexOf) return b.indexOf(c);
                for (var a = 0, d = b.length; a < d; a++)
                    if (b[a] === c) return a;
                return -1 }, i = function(a) {
                if (typeof a === 'string') throw new TypeError("ZeroClipboard doesn't accept query strings.");
                return a.length ? a : [a] }, b = function(d, e) {
                if (d && (b.prototype._singleton || this).glue(d), b.prototype._singleton) return b.prototype._singleton;
                b.prototype._singleton = this, this.options = {};
                for (var a in f) this.options[a] = f[a];
                for (var c in e) this.options[c] = e[c];
                this.handlers = {}, b.detectFlashSupport() && o() }, d = [], b.prototype.setCurrent = function(a) { c = a, this.reposition(), a.getAttribute('title') && this.setTitle(a.getAttribute('title')), this.setHandCursor(e(a, 'cursor') == 'pointer') }, b.prototype.setText = function(a) { a && a !== '' && (this.options.text = a, this.ready() && this.flashBridge.setText(a)) }, b.prototype.setTitle = function(a) { a && a !== '' && this.htmlBridge.setAttribute('title', a) }, b.prototype.setSize = function(a, b) { this.ready() && this.flashBridge.setSize(a, b) }, b.prototype.setHandCursor = function(a) { this.ready() && this.flashBridge.setHandCursor(a) }, b.version = '1.1.7', f = { moviePath: 'ZeroClipboard.swf', trustedDomains: null, text: null, hoverClass: 'zeroclipboard-is-hover', activeClass: 'zeroclipboard-is-active', allowScriptAccess: 'sameDomain' }, b.setDefaults = function(b) {
                for (var a in b) f[a] = b[a] }, b.destroy = function() { b.prototype._singleton.unglue(d);
                var a = b.prototype._singleton.htmlBridge;
                a.parentNode.removeChild(a), delete b.prototype._singleton }, b.detectFlashSupport = function() {
                var a = !1;
                try { new ActiveXObject('ShockwaveFlash.ShockwaveFlash'), a = !0 } catch (b) { navigator.mimeTypes['application/x-shockwave-flash'] && (a = !0) }
                return a }, o = function() {
                var c = b.prototype._singleton,
                    a = document.getElementById('global-zeroclipboard-html-bridge');
                if (!a) {
                    var d = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + c.options.moviePath + j(c.options.moviePath) + '"/>         <param name="allowScriptAccess" value="' + c.options.allowScriptAccess + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + l(c.options) + '"/>         <embed src="' + c.options.moviePath + j(c.options.moviePath) + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + l(c.options) + '"           scale="exactfit">         </embed>       </object>';
                    a = document.createElement('div'), a.id = 'global-zeroclipboard-html-bridge', a.setAttribute('class', 'global-zeroclipboard-container'), a.setAttribute('data-clipboard-ready', !1), a.style.position = 'absolute', a.style.left = '-9999px', a.style.top = '-9999px', a.style.width = '15px', a.style.height = '15px', a.style.zIndex = '9999', a.innerHTML = d, document.body.appendChild(a) }
                c.htmlBridge = a, c.flashBridge = document['global-zeroclipboard-flash-bridge'] || a.children[0].lastElementChild }, b.prototype.resetBridge = function() { this.htmlBridge.style.left = '-9999px', this.htmlBridge.style.top = '-9999px', this.htmlBridge.removeAttribute('title'), this.htmlBridge.removeAttribute('data-clipboard-text'), g(c, this.options.activeClass), c = null, this.options.text = null }, b.prototype.ready = function() {
                var a = this.htmlBridge.getAttribute('data-clipboard-ready');
                return a === 'true' || a === !0 }, b.prototype.reposition = function() {
                if (!c) return !1;
                var a = q(c);
                this.htmlBridge.style.top = a.top + 'px', this.htmlBridge.style.left = a.left + 'px', this.htmlBridge.style.width = a.width + 'px', this.htmlBridge.style.height = a.height + 'px', this.htmlBridge.style.zIndex = a.zIndex + 1, this.setSize(a.width, a.height) }, b.dispatch = function(a, c) { b.prototype._singleton.receiveEvent(a, c) }, b.prototype.on = function(a, e) {
                var d = a.toString().split(/\s/g);
                for (var c = 0; c < d.length; c++) a = d[c].toLowerCase().replace(/^on/, ''), this.handlers[a] || (this.handlers[a] = e);
                this.handlers.noflash && !b.detectFlashSupport() && this.receiveEvent('onNoFlash', null) }, b.prototype.addEventListener = b.prototype.on, b.prototype.off = function(c, e) {
                var d = c.toString().split(/\s/g);
                for (var a = 0; a < d.length; a++) { c = d[a].toLowerCase().replace(/^on/, '');
                    for (var b in this.handlers) b === c && this.handlers[b] === e && delete this.handlers[b] } }, b.prototype.removeEventListener = b.prototype.off, b.prototype.receiveEvent = function(b, d) { b = b.toString().toLowerCase().replace(/^on/, '');
                var a = c;
                switch (b) {
                    case 'load':
                        if (d && parseFloat(d.flashVersion.replace(',', '.').replace(/[^0-9\.]/gi, '')) < 10) { this.receiveEvent('onWrongFlash', { flashVersion: d.flashVersion });
                            return }
                        this.htmlBridge.setAttribute('data-clipboard-ready', !0);
                        break;
                    case 'mouseover':
                        k(a, this.options.hoverClass);
                        break;
                    case 'mouseout':
                        g(a, this.options.hoverClass);
                        this.resetBridge();
                        break;
                    case 'mousedown':
                        k(a, this.options.activeClass);
                        break;
                    case 'mouseup':
                        g(a, this.options.activeClass);
                        break;
                    case 'datarequested':
                        var h = a.getAttribute('data-clipboard-target'),
                            e = h ? document.getElementById(h) : null;
                        if (e) {
                            var i = e.value || e.textContent || e.innerText;
                            i && this.setText(i) } else {
                            var j = a.getAttribute('data-clipboard-text');
                            j && this.setText(j) }
                        break;
                    case 'complete':
                        this.options.text = null;
                        break }
                if (this.handlers[b]) {
                    var f = this.handlers[b];
                    typeof f == 'function' ? f.call(a, this, d) : typeof f == 'string' && window[f].call(a, this, d) } }, b.prototype.glue = function(a) { a = i(a);
                for (var b = 0; b < a.length; b++) m(a[b], d) == -1 && (d.push(a[b]), p(a[b], 'mouseover', h)) }, b.prototype.unglue = function(a) { a = i(a);
                for (var b = 0; b < a.length; b++) { n(a[b], 'mouseover', h);
                    var c = m(a[b], d);
                    c != -1 && d.splice(c, 1) } }, a !== void 0 ? a.exports = b : typeof define === 'function' && define.amd ? define(function() {
                return b }) : window.ZeroClipboard = b }() }, {}], 2: [function(h, j, i) {
        var c = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {},
            e = c.ZeroClipboard = h('ZeroClipboard'),
            g = { path: 'ZeroClipboard.swf', copy: null, beforeCopy: null, afterCopy: null, clickAfter: !0 },
            f = function(a) {
                return a = 0,
                    function() {
                        return a++ } }(),
            d = {},
            b, a = jQuery;
        a.fn.zclip = function(i) {
            var h, j;
            if (a.isPlainObject(i)) h = a.extend({}, g, i), j = f(), d[j] = h, this.data('zclip-client', j), b ? b.glue(this) : b = new e(this, { moviePath: h.path, trustedDomains: [c.location.protocol + '//' + c.location.host], hoverClass: 'hover', activeClass: 'active' }), a.isFunction(h.copy) && this.on('zClip_copy', a.proxy(h.copy, this)), a.isFunction(h.beforeCopy) && this.on('zClip_beforeCopy', a.proxy(h.beforeCopy, this)), a.isFunction(h.afterCopy) && this.on('zClip_afterCopy', a.proxy(h.afterCopy, this)), b.on('mouseover', function() {
                var b = a(this);
                b.trigger('mouseenter') }), b.on('mouseout', function() {
                var b = a(this);
                b.trigger('mouseleave') }), b.on('mousedown', function() {
                var b = a(this);
                b.trigger('mousedown') }), b.on('load', function(a) { a.setHandCursor(h.setHandCursor) }), b.on('complete', function(h, g) {
                var b = g.text,
                    e = a(this),
                    f = d[e.data('zclip-client')];
                a.isFunction(f.afterCopy) ? e.trigger('zClip_afterCopy', b) : (b.length > 500 && (b = b.substr(0, 500) + '\u2026\n\n(' + (b.length - 500) + 'characters not shown)'), c.alert('Copied text to clipboard:\n\n' + g.text)), f.clickAfter && e.trigger('click') }), b.on('dataRequested', function(e) {
                var b = a(this),
                    c = d[b.data('zclip-client')];
                b.trigger('zClip_beforeCopy'), a.isFunction(c.copy) ? e.setText(String(b.triggerHandler('zClip_copy'))) : e.setText(c.copy) }), a(c).on('load resize', function() { b.reposition() });
            else if (b && typeof i === 'string') switch (i) {
                case 'remove':
                case 'hide':
                    b.unglue(this);
                    break;
                case 'show':
                    b.glue(this) } } }, { ZeroClipboard: 1 }] }, {}, [2])

function debug(msg) {
    if (this.console && typeof console.log != 'undefined') { console.log(msg); } }

function popUpWin(url, windowName, windowOptions) { windowName = window.open(url, windowName, windowOptions);
    windowName.focus(); }
if (typeof Object.create !== 'function') { Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F(); }; }
define('document', function() {
    return document; });
define('window', function() {
    return window; });
define('amznads', ['window'], function(window) {
    return window.amznads; });
define('analytics', ['toofab/analytics/1.0.0/analytics'], function(analytics) {
    return analytics; });
define('backbone', ['window'], function(window) {
    return window.Backbone; });
define('facebook', ['window'], function(window) {
    return window.FB; });
define('ga', ['window'], function(window) {
    return window.ga; });
define('griddler', ['toofab/griddler/1.0.0/griddler'], function($) {
    return $; });
define('handlebars', ['window'], function(window) {
    return window.Handlebars; });
define('jquery.cookie', ['window'], function(window) {
    return window.jQuery.cookie; });
define('jquery.easing', ['window'], function(window) {
    return window.jQuery.easing; });
define('jquery.touchwipe', ['window'], function(window) {
    return window.jQuery; });
define('modernizr', ['window'], function(window) {
    return window.Modernizr; });
define('navtabs', ['toofab/navtabs/1.0.0/navtabs'], function($) {
    return $; });
define('omniture', ['window', 'logger'], function(window, logger) {
    return window.s || { t: function t() { logger.getInstance().error('Omniture is not available, t() will not be tracked.', arguments); }, tl: function tl() { logger.getInstance().error('Omniture is not available, tl() will not be tracked.', arguments); } }; });
define('page', ['window'], function(window) {
    return window.WB_PAGE; });
define('sodahead', ['wb/sodahead/1.1.2/sodahead'], function(sodahead) {
    return sodahead; });
define('templates/jst', ['window'], function(window) {
    return window.JST; });
define('tetris', ['toofab/tetris/1.0.0/tetris'], function($) {
    return $; });
define('twitter', ['window'], function(window) {
    return window.twttr; });
define('underscore', ['window'], function(window) {
    return window._; });
define('wbads', ['window'], function(window) {
    return window.wbads; });
require.config({ paths: { 'backbone': ['//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min', 'backbone/1.1.0/backbone-min'], 'handlebars': ['handlebars/1.1.2/handlebars.runtime'], 'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min', 'jquery/jquery-1.10.2.min'], 'jquery.ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min', 'jquery.ui/1.8.14/jquery.ui.min'], 'underscore': ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min', 'underscore/1.5.2/underscore-min'] }, shim: { 'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' }, 'handlebars': { exports: 'Handlebars' }, 'jquery': { exports: 'jQuery' }, 'jquery.ui': { deps: ['jquery'], exports: 'jQuery.ui' }, 'underscore': { exports: '_' } }, config: { 'loaders/kaltura-kwidget': { 'scriptUrl': 'https://cdnapisec.kaltura.com/p/%partner_id%/sp/%partner_id%00/embedIframeJs/uiconf_id/%uiconf_id%/partner_id/%partner_id%' }, requirecss: { baseUrl: require.s.contexts._.config.baseUrl.substr(0, require.s.contexts._.config.baseUrl.length - 3) } } });
this["JST"] = this["JST"] || {};
this["JST"]["users/nav-buttons"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "",
        stack1, functionType = "function",
        escapeExpression = this.escapeExpression,
        self = this;

    function program1(depth0, data) {
        var buffer = "",
            stack1;
        buffer += "\n                <li><a href=\"";
        if (stack1 = helpers.UPLOAD_SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.UPLOAD_SITE_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1) + "my-media\"><i class=\"glyphicon glyphicon-facetime-video\"></i> My Media</a></li>\n                <li><a href=\"";
        if (stack1 = helpers.UPLOAD_SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.UPLOAD_SITE_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1) + "user/logout\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li>\n            ";
        return buffer;
    }

    function program3(depth0, data) {
        var buffer = "",
            stack1;
        buffer += "\n                <li><a href=\"";
        if (stack1 = helpers.UPLOAD_SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.UPLOAD_SITE_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1) + "user/login\"><i class=\"glyphicon glyphicon-log-in\"></i> Login</a></li>\n                <li><a href=\"";
        if (stack1 = helpers.UPLOAD_SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.UPLOAD_SITE_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1) + "publicregistration/index/register\">Sign up!</a></li>\n            ";
        return buffer;
    }
    buffer += "<li class=\"upload\"><a href=\"";
    if (stack1 = helpers.SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.SITE_BASEURL;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1) + "upload/\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-upload\"></i> <span>Upload Video</span></a></li>\n<li class=\"settings\">\n    <div class=\"btn-group\">\n        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n            <i class=\"glyphicon glyphicon-user\"></i>\n            ";
    if (stack1 = helpers.display_name) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.display_name;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1) + "\n            <i class=\"glyphicon glyphicon-chevron-down\"></i>\n        </button>\n        <ul class=\"dropdown-menu pull-right\">\n            ";
    stack1 = helpers['if'].call(depth0, depth0.is_logged_in, { hash: {}, inverse: self.program(3, program3, data), fn: self.program(1, program1, data), data: data });
    if (stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n        </ul>\n    </div>\n</li>\n";
    return buffer;
});
this["JST"]["users/nav-dropdown"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "",
        stack1, functionType = "function",
        escapeExpression = this.escapeExpression,
        self = this;

    function program1(depth0, data) {
        var buffer = "",
            stack1;
        buffer += "\n            <li><a href=\"";
        if (stack1 = helpers.UPLOAD_SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.UPLOAD_SITE_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1) + "my-media\"><i class=\"glyphicon glyphicon-facetime-video\"></i> My Media</a></li>\n            <li class=\"divider\"></li>\n            <li><a href=\"";
        if (stack1 = helpers.UPLOAD_SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.UPLOAD_SITE_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1) + "user/logout\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li>\n        ";
        return buffer;
    }

    function program3(depth0, data) {
        var buffer = "",
            stack1;
        buffer += "\n            <li class=\"divider\"></li>\n            <li><a href=\"";
        if (stack1 = helpers.UPLOAD_SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.UPLOAD_SITE_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1) + "user/login\"><i class=\"glyphicon glyphicon-log-in\"></i> Login</a></li>\n            <li><a href=\"";
        if (stack1 = helpers.UPLOAD_SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.UPLOAD_SITE_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1) + "publicregistration/index/register\">Sign up!</a></li>\n        ";
        return buffer;
    }
    buffer += "<div class=\"btn-group\">\n    <button type=\"button\" class=\"btn btn-link dropdown-toggle\" data-toggle=\"dropdown\">\n        <i class=\"glyphicon glyphicon-user\"></i>\n        <span class=\"caret\"></span>\n    </button>\n    <ul class=\"dropdown-menu pull-right\">\n        <li class=\"dropdown-header\">";
    if (stack1 = helpers.display_name) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.display_name;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1) + "</li>\n        <li><a href=\"";
    if (stack1 = helpers.SITE_BASEURL) { stack1 = stack1.call(depth0, { hash: {}, data: data }); } else { stack1 = depth0.SITE_BASEURL;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1) + "upload/\"><i class=\"glyphicon glyphicon-film\"></i> <span>Upload Video</span></a></li>\n        ";
    stack1 = helpers['if'].call(depth0, depth0.is_logged_in, { hash: {}, inverse: self.program(3, program3, data), fn: self.program(1, program1, data), data: data });
    if (stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n    </ul>\n</div>\n";
    return buffer;
});
define('app', ['require', 'jquery', 'dispatcher', 'util', 'logger', 'module', 'window', 'document'], function(require, $, dispatcher, util, loggerFactory, module, window, document, undefined) {
    'use strict';
    var logger = loggerFactory.getInstance(module.id);

    function app() {
        var _this = Object.create({});

        function init() { $('a:not([href^="' + window.SITE_BASEURL + '"]):not([href^="http://photos.toofab.com"]):not([href^="#"]):not([href^="/"])').attr('target', '_blank').addClass('external');
            logger.info('init'); }
        _this.init = init;
        _this.dispatcher = dispatcher;
        _this.util = util;
        return _this;
    }
    return app();
});
define('dispatcher', ['underscore', 'backbone'], function(_, Backbone) { 'use strict';
    return _.clone(Backbone.Events); });
define('loaders/kaltura-kwidget', ['require', 'jquery', 'dispatcher', 'wbppid', 'wbkrux', 'logger', 'module', 'window', 'document'], function(require, $, dispatcher, wbppid, wbkrux, loggerFactory, module, window, undefined) {
    'use strict';
    var logger = loggerFactory.getInstance(module.id);
    var scriptUrl = module.config().scriptUrl || 'https://cdnapisec.kaltura.com/p/%partner_id%/sp/%partner_id%00/embedIframeJs/uiconf_id/%uiconf_id%/partner_id/%partner_id%';

    function loader() {
        var _this = Object.create({});
        var scriptReadyDeferred = $.Deferred();
        var scriptReadyPromise = scriptReadyDeferred.promise();
        var requested = false;

        function load(partnerId, uiconfId) {
            if (requested) { logger.info('load :: already requested');
                return scriptReadyPromise; }
            if (!partnerId || !uiconfId) { logger.warn('load :: cannot request kWidget without partnerId and uiconfId');
                return scriptReadyPromise; }
            requested = true;
            scriptUrl = scriptUrl.replace(/%partner_id%/gi, partnerId).replace(/%uiconf_id%/gi, uiconfId);
            logger.info('load :: scriptUrl = ' + scriptUrl);
            require([scriptUrl], function() {
                if (!window.kWidget) { logger.error('load :: window.kWidget never got defined', window.kWidget);
                    scriptReadyDeferred.reject(); } else {
                    if (window.mw) { configureMwEmbed(window.mw); }
                    configureKWidget(window.kWidget);
                    scriptReadyDeferred.resolve(window.kWidget);
                }
            });
            return scriptReadyPromise;
        }

        function configureMwEmbed(mw) { mw.setConfig('Kaltura.EnableEmbedUiConfJs', true);
            dispatcher.trigger('kaltura:player:global-configure-mwembed', mw); }

        function configureKWidget(kWidget) { dispatcher.trigger('kaltura:player:global-configure-kwidget', kWidget); }

        function configureKWidgetEmbed(embed) {
            var entryId = embed['_wb_entry_id'];
            var embedContext = embed['_wb_embed_context'] || 'unknown';
            var embedRef = embed['_wb_embed_ref'] || '';
            var duration = parseInt(embed['_wb_duration']) || 30;
            var adzone = embed['_wb_adzone'] || 'video';
            if ('tpxnoads' != adzone && 'prod' != window.SYSTEM_ENV) { adzone += '-dev'; }
            
			var defaults = {
			     entry_id: entryId,
			     targetId: 'kaltura_player_' + entryId,
			     wid: '_' + embed['_wb_partner_id'],
			     uiconf_id: embed['_wb_uiconf_id'],
			     cache_st: window.SYSTEM_VERSION,
			     flashvars: {
			         externalInterfaceDisabled: false,
			         ppid: wbppid.get(),
			         adtest: getQueryStringParamByName('adtest'),
			         adzone: adzone,
			         titleLabel: {
			             plugin: true
			         },
			         doubleClick: {
						adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/toofab/{configProxy.flashvars.adzone}&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]&ppid={configProxy.flashvars.ppid}&cust_params=adtest%253D{configProxy.flashvars.adtest}%2526adzone%253D{configProxy.flashvars.adzone}%2526vid%253D{mediaProxy.entry.id}%2526{configProxy.flashvars.cust_params}"
			         },
			         related: {
			             plugin: true,
			             displayOnPlaybackDone: true,
			             autoContinueEnabled: true
			         },
			         sourceSelector: {
			             switchOnResize: false
			         },
			         cust_params: wbkrux.getGptCustParams(),
			         autoPlay: false
			     },
			     params: {
			         wmode: 'transparent'
			     },
			     _wb_ppid: wbppid.get(),
			     _wb_duration: duration,
			     _wb_adzone: adzone,
			     _wb_embed_context: embedContext,
			     _wb_embed_ref: embedRef
			 };
            switch (embedContext) {
                case 'permalink':
                    defaults.flashvars.titleLabel.plugin = false;
                    break;
                case 'widget':
                    defaults.flashvars.autoPlay = false;
                    defaults.flashvars.related.plugin = false;
                    defaults.flashvars.related.displayOnPlaybackDone = false;
                    defaults.flashvars.related.autoContinueEnabled = false;
                    defaults.flashvars.doubleClick.plugin = false;
                    break;
                case 'shortcode':
                    defaults.flashvars.autoPlay = false;
                    break;
                default:
                    break; }
            embed = $.extend(true, defaults, embed);
            dispatcher.trigger('kaltura:player:configure-kwidget-embed', embed);
            return embed;
        }

        function getQueryStringParamByName(name) { name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' ')); }
        _this.load = load;
        _this.configureKWidgetEmbed = configureKWidgetEmbed;
        return _this;
    }
    return loader();
});
define('logger', ['module', 'jquery', 'window'], function(module, $, window, undefined) {
    'use strict';
    var enabled = window.console && typeof window.console.log != 'undefined';
    var loggers = {};

    function logger(channel) {
        var _this = Object.create({});

        function log(msg, context) {
            if (!enabled) {
                return; }
            writeLog('log', msg, context);
        }

        function debug(msg, context) {
            if (!enabled) {
                return; }
            writeLog('debug', msg, context);
        }

        function info(msg, context) {
            if (!enabled) {
                return; }
            writeLog('info', msg, context);
        }

        function warn(msg, context) {
            if (!enabled) {
                return; }
            writeLog('warn', msg, context);
        }

        function error(msg, context) {
            if (!enabled) {
                return; }
            writeLog('error', msg, context);
        }

        function writeLog(level, msg, context) {
            if (undefined === window.console[level]) { level = 'log'; }
            var label = '[' + level.toUpperCase() + '][' + channel + ']';
            var type = $.type(msg);
            if (type === 'string' || type === 'number' || type === 'boolean') { label += ' ' + msg.toString(); } else { context = context || {};
                context._msg = msg; }
            if (context) { window.console[level](label, context); } else { window.console[level](label); }
        }
        _this.log = log;
        _this.debug = debug;
        _this.info = info;
        _this.warn = warn;
        _this.error = error;
        return _this;
    }
    return {
        getInstance: function getInstance(channel) {
            channel = channel || 'app';
            if (!loggers[channel]) { loggers[channel] = logger(channel); }
            return loggers[channel];
        }
    };
});
define('toofab/analytics/1.0.0/analytics', ['jquery', 'dispatcher', 'ga', 'omniture', 'logger', 'module', 'window', 'document'], function($, dispatcher, ga, s, loggerFactory, module, window, document, undefined) {
    'use strict';
    var logger = loggerFactory.getInstance(module.id);

    function analytics() {
        var _this = Object.create({});

        function init() { bindTrackLinkHandlers(); }

        function bindTrackLinkHandlers() {
            $(document).on('click', '.js-track-link', function(e) {
                var $link = $(this);
                var linkEvent = $link.data('event') || {};
                var target = $link.attr('target');
                var href = $link.attr('href');
                var context = linkEvent.context || false;
                var title = linkEvent.title || '';
                var action = linkEvent.action || 'click';
                var pos = linkEvent.pos || '';
                if (!context) { logger.error('onTrackLink :: "context" cannot be empty in data-event payload.', [$link[0], linkEvent]);
                    return true; }
                if (!href) { logger.error('onTrackLink :: "href" must be set on link element.', [$link[0], linkEvent]);
                    return true; }
                var opensInSameWindow = !target || '_self' == target || '_top' == target || '_parent' == target || window.name && window.name == target;
                if (window.BASE_TARGET_BLANK) { opensInSameWindow = false; }
                if (opensInSameWindow) { e.preventDefault(); }
                var eventName = context + ':' + action + (pos ? ':' + pos : '');
                var eventData = { action: action, label: title || $link[0].textContent || href || 'unknown' };
                try { trackEvent(eventName, eventData, null, function handleTrackLinkCallback() {
                        if (opensInSameWindow) { window.location.href = href; } else { logger.info('onTrackLink :: success', [eventName, eventData]); } }); } catch (err) { logger.error('onTrackLink :: error', [err, $link[0], linkEvent, eventName, eventData]);
                    if (opensInSameWindow) { window.location.href = href; } }
                return !opensInSameWindow;
            });
            logger.debug('bindTrackLinkHandlers :: done');
        }

        function trackPageView(page) {
            dispatcher.trigger('page:enrich', page);
            var title = page.section + ':' + page.content_type + ':' + (page.content_facet || '') + ':' + page.title_slug;
            s.pageName = title;
            s.prop2 = s.eVar2 = page.content_type;
            s.prop3 = s.eVar3 = page.section;
            s.prop4 = s.eVar4 = page.sub_section;
            s.prop7 = s.eVar7 = page.hashtags.join(',').toLowerCase();
            s.prop18 = s.eVar18 = page.uri;
            s.prop29 = s.eVar29 = page.channel;
            s.prop30 = s.eVar30 = (page.search_query || '').toLowerCase().replace(/\s\s+/g, ' ');
            s.prop34 = s.eVar34 = page.lists.join(',').toLowerCase();
            s.prop35 = s.eVar35 = page.galleries.join(',').toLowerCase();
            s.prop36 = s.eVar36 = page.sponsor;
            s.prop54 = s.eVar54 = page.video_duration || '';
            s.prop55 = s.eVar55 = page.video_published_at;
            s.prop57 = s.eVar57 = page.mpm;
            s.prop58 = s.eVar58 = page.eref;
            s.prop59 = s.eVar59 = page.ad_zone;
            s.events = 'event6';
            if (page.initial_load && page.search_query) { s.events += ',event19'; }
            dispatcher.trigger('page:track_view.omniture.before', { s: s, page: page });
            s.t();
            if (s.campaign) { ga('set', 'campaignId', s.campaign); }
            ga('set', 'title', title);
            ga('send', 'pageview');
            dispatcher.trigger('page:track_view', page);
            page.initial_load = false;
        }

        function trackEvent(event, data, options, callback) {
            data = data || {};
            options = options || {};
            var action = data.action || 'click';
            var label = data.label || 'unknown';
            var timeout = options.timeout || 500;
            if (!event) {
                logger.error('trackEvent :: "event" cannot be empty.', [event, data, options, callback]);
                if ($.isFunction(callback)) { callback(); }
                return;
            }
            var gaDeferred = $.Deferred();
            var sDeferred = $.Deferred();
            $.when(gaDeferred, sDeferred).always(function() { clearTimeout(t);
                if ($.isFunction(callback)) { callback(); } });
            var t = setTimeout(function() { gaDeferred.resolve();
                sDeferred.resolve(); }, timeout);
            s.prop45 = s.eVar45 = event;
            s.prop46 = s.eVar46 = label;
            s.linkTrackVars = 'eVar13,prop13,eVar18,prop18,eVar45,prop45,eVar46,prop46,eVar51,prop51,events';
            s.linkTrackEvents = s.events = 'event4';
            if ('share' == action) { s.prop13 = s.eVar13 = event.replace(':click', '');
                s.prop51 = s.eVar51 = data.share_url || label;
                s.linkTrackEvents = s.events = s.events + ',event5'; }
            s.tl(true, 'o', event, null, function resolveS() { s.prop45 = s.eVar45 = '';
                s.prop46 = s.eVar46 = '';
                s.linkTrackVars = 'None';
                s.linkTrackEvents = 'None';
                s.events = '';
                sDeferred.resolve(); });
            ga('send', { hitType: 'event', eventCategory: event, eventAction: action, eventLabel: label, hitCallback: function resolveGa() { gaDeferred.resolve(); } });
        }
        _this.init = init;
        _this.trackPageView = trackPageView;
        _this.trackEvent = trackEvent;
        return _this;
    }
    return analytics();
});
define('toofab/griddler/1.0.0/griddler', ['jquery', 'analytics', 'dispatcher', 'page', 'logger', 'module', 'window', 'document'], function($, analytics, dispatcher, page, loggerFactory, module, window, document, undefined) {
    'use strict';
    var logger = loggerFactory.getInstance(module.id);
    var moduleName = 'griddler';
    var moduleDefaults = { loadMoreUrl: '', container: 'main', title: '' };

    function griddler(element, options) {
        var settings = $.extend({}, moduleDefaults, options);
        var _this = Object.create({});
        var $elm = $(element);
        var $content;
        var $loadMore;
        var curPage = 1;

        function init() {
            $content = $elm.find('.load-more-target');
            $loadMore = $elm.find('.btn-load-more');
            if (!settings.loadMoreUrl) { logger.info('init :: loadMoreUrl was blank, must be no more items available.');
                return _this; }
            $(window).unload(function() { destroy(); });
            bindControls();
            $('body').addClass('has-griddler');
            dispatcher.trigger('griddler:init:complete', { element: $elm });
            return _this;
        }

        function destroy() { logger.debug('destroy');
            $elm.off();
            $loadMore.off(); }

        function bindControls() { logger.debug('bindControls');
            $loadMore.on('click', function(e) {
                var $btn = $(this);
                $btn.button('loading');
                loadMoreContent(); }); }

        function updateControls() { logger.debug('updateControls', settings);
            $loadMore.button('reset');
            if (!settings.loadMoreUrl) { $loadMore.hide(); } }

        function loadMoreContent() {
            if (!settings.loadMoreUrl) { logger.warn('loadMoreContent :: loadMoreUrl is blank, abort!');
                updateControls();
                return; }
            analytics.trackEvent(settings.container + ':' + settings.title + ':griddler:load-more:' + curPage, { action: 'load-more', label: 'collection:' + settings.title + '-page-' + curPage });
            $.ajax({ url: settings.loadMoreUrl, html: true }).success(function(data) { curPage++;
                page.paging_method = 'load-more';
                page.paging_page = curPage;
                page.title = page.title.split(' - Page ')[0] + ' - Page ' + curPage;
                page.title_slug = page.title_slug.split('-page-')[0] + '-page-' + curPage;
                analytics.trackPageView(page);
                dispatcher.trigger('griddler:load_more:success', { element: $elm, page: curPage, url: settings.loadMoreUrl });
                $content.append(data); }).fail(function(msg) { setLoadMoreUrl('');
                dispatcher.trigger('griddler:load_more:fail', { element: $elm, page: curPage, url: settings.loadMoreUrl });
                logger.error('loadMoreContent :: failed with message: ' + msg); });
        }

        function setLoadMoreUrl(url) { settings.loadMoreUrl = $.trim(url);
            updateControls();
            return _this; }
        _this.init = init;
        _this.setLoadMoreUrl = setLoadMoreUrl;
        init();
        return _this;
    }
    $.fn[moduleName] = function(options) {
        return this.each(function() {
            var $elm = $(this);
            if (!$elm.data(moduleName)) {
                var myModule = griddler(this, options);
                $elm.data(moduleName, myModule); } }); };
    $.fn[moduleName].defaults = moduleDefaults;
    return $;
});
define('toofab/navtabs/1.0.0/navtabs', ['jquery', 'window', 'document'], function($, window, document, undefined) {
    'use strict';
    var moduleName = 'navTabs';
    var moduleDefaults = { debug: false, container: '', ajaxSlotBaseUrl: '/_/ajax/promotion-slot/', allowedDomain: window.location.href };

    function module(element, options) {
        var settings = $.extend({}, moduleDefaults, options);
        var _this = Object.create({});
        var $elm = $(element);
        var loadedTabs = {};
        var currentTab, $tabs, $tabsContent, tabsOpen, windowWidth;

        function init() {
            if (!isValidHost(settings.allowedDomain)) {
                return _this; }
            windowWidth = $(window).width();
            $(window).resize(function() { windowWidth = $(window).width();
                if (windowWidth > 767) { bindControls(); } else { destroy(); } });
            $tabs = $elm.find('.navtabs-nav li');
            $tabsContent = $elm.find('.navtabs-content > div');
            tabsOpen = 0;
            $tabs.addClass('inactive');
            $tabsContent.addClass('navtabs-content-hidden');
            if (windowWidth > 767) { bindControls(); }
            $(window).unload(function() { destroy(); });
            return _this;
        }

        function destroy() { $tabs.find('a').off();
            $tabs.off(); }

        function bindControls() {
            var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
            var mouseoverEvent = supportsTouch ? 'touchstart' : 'mouseover';
            $tabs.find('a').on(mouseoverEvent, function(e) { e.stopPropagation();
                e.preventDefault();
                tabsOpen = 1;
                var $tab = $(this).parent();
                var tabIdx = $tab.index();
                currentTab = tabIdx;
                $tabsContent.parent().show();
                loadTabContent(tabIdx, $tab.data('slot'));
                updateControls(); });
            $elm.on('mouseleave', function() { tabsOpen = 0;
                $tabs.eq(currentTab).removeClass('active').addClass('inactive');
                $tabsContent.addClass('navtabs-content-hidden'); });
            $(document).on('touchstart', function(event) {
                if (!($elm.is(event.target)) && ($elm.has(event.target).length === 0)) { tabsOpen = 0;
                    $tabs.eq(currentTab).removeClass('active').addClass('inactive');
                    $tabsContent.addClass('navtabs-content-hidden'); } }); }

        function updateControls() { $tabs.removeClass('active').addClass('inactive');
            $tabs.eq(currentTab).addClass('active').removeClass('inactive');
            $tabsContent.addClass('navtabs-content-hidden');
            $tabsContent.eq(currentTab).removeClass('navtabs-content-hidden'); }

        function loadTabContent(tabIdx, tabSlot) {
            var tab = tabSlot || 'tab' + tabIdx;
            if (loadedTabs[tab]) {
                return; }
            var $target = $tabsContent.eq(tabIdx);
            if ($target.data('loaded') || !tabSlot) { loadedTabs[tab] = $target;
                return; }
            $target.html('<div class="loading navtabs-content-loading">Loading content.</div>');
            var url = settings.ajaxSlotBaseUrl + tabSlot + '/';
            if (settings.container) { url += '?Container=' + encodeURIComponent(settings.container); }
            $.ajax({ url: url, html: true }).success(function(data) { $target.html(data); }).fail(function(msg) { $target.html('Unable to load tab content: ' + msg); });
            loadedTabs[tab] = $target;
            $target.data('loaded', true);
        }

        function isValidHost(url) {
            var hostName = url.match(/^(http(s)?:)?\/\/(([^\/])+)/)[3];
            return window.location.host === hostName; }

        function debug(msg) {
            if (!settings.debug) return;
            if (this.console && typeof console.log != 'undefined') { console.log(msg); } }
        init();
        return _this;
    }
    $.fn[moduleName] = function(options) {
        return this.each(function() {
            var $elm = $(this);
            if (!$elm.data(moduleName)) {
                var myModule = module(this, options);
                $elm.data(moduleName, myModule); } }); };
    $.fn[moduleName].defaults = moduleDefaults;
    return $;
});
define('toofab/search-box/1.0.0/search-box', ['jquery', 'modernizr', 'dispatcher', 'window', 'document'], function($, Modernizr, dispatcher, window, document, undefined) {
    'use strict';

    function searchBox() {
        var _this = Object.create({});
        var $inputs;
        var defaultText = '';

        function init() {
            $inputs = $('.site-search-query');
            defaultText = $inputs.attr('placeholder') || 'Search';
            if (!Modernizr.input.placeholder) { $inputs.val(defaultText);
                $inputs.bind('focus', function() {
                    var $input = $(this);
                    if ($input.val() == defaultText) { $input.val(''); } });
                $inputs.bind('blur', function() {
                    var $input = $(this);
                    if ($.trim($input.val()) == '') { $input.val(defaultText); } }); }
            $('.site-search-form').submit(function(e) { getResults($(this));
                return false; });
        }

        function getResults($form) {
            var $input = $form.find('.site-search-query');
            var evt = { abort: false, $form: $form, $input: $input };
            dispatcher.trigger('search:sanitize-query', evt);
            var q = evt.$input.val();
            q = $.trim(q);
            if (q == '' || q == defaultText || evt.abort) { window.alert(evt.message || 'Please enter a search query.');
                $input.focus();
                return false; }
            $form[0].submit();
        }
        _this.init = init;
        return _this;
    }
    return searchBox();
});
define('toofab/tetris/1.0.0/tetris', ['jquery', 'analytics', 'dispatcher', 'page', 'logger', 'module', 'util', 'window', 'document'], function($, analytics, dispatcher, page, loggerFactory, module, util, window, document, undefined) {
    'use strict';
    var logger = loggerFactory.getInstance(module.id);
    var moduleName = 'tetris';
    var moduleDefaults = { loadMoreUrl: '', container: 'main', title: '' };

    function tetris(element, options) {
        var settings = $.extend({}, moduleDefaults, options);
        var _this = Object.create({});
        var $elm = $(element);
        var $content;
        var $loadMore;
        var curPage = 1;

        function init() {
            $content = $elm.find('.load-more-target');
            $loadMore = $elm.find('.btn-load-more');
            if (!settings.loadMoreUrl) { logger.info('init :: loadMoreUrl was blank, must be no more items available.');
                return _this; }
            $(window).unload(function() { destroy(); });
            bindControls();
            $('body').addClass('has-tetris');
            dispatcher.trigger('tetris:init:complete', { element: $elm });
            return _this;
        }

        function destroy() { logger.debug('destroy');
            $elm.off();
            $loadMore.off(); }

        function bindControls() { logger.debug('bindControls');
            $loadMore.on('click', function(e) {
                var $btn = $(this);
                $btn.button('loading');
                loadMoreContent(); }); }

        function updateControls() { logger.debug('updateControls', settings);
            $loadMore.button('reset');
            if (!settings.loadMoreUrl) { $loadMore.hide(); } }

        function loadMoreContent() {
            if (!settings.loadMoreUrl) { logger.warn('loadMoreContent :: loadMoreUrl is blank, abort!');
                updateControls();
                return; }
            analytics.trackEvent(settings.container + ':' + settings.title + ':tetris:load-more:' + curPage, { action: 'load-more', label: 'collection:' + settings.title + '-page-' + curPage });
            $.ajax({ url: settings.loadMoreUrl, html: true }).success(function(data) { curPage++;
                page.paging_method = 'load-more';
                page.paging_page = curPage;
                page.title = page.title.split(' - Page ')[0] + ' - Page ' + curPage;
                page.title_slug = page.title_slug.split('-page-')[0] + '-page-' + curPage;
                analytics.trackPageView(page);
                dispatcher.trigger('tetris:load_more:success', { element: $elm, page: curPage, url: settings.loadMoreUrl });
                $content.append(data);
                util.parseSharing($content.get(0)); }).fail(function(msg) { setLoadMoreUrl('');
                dispatcher.trigger('tetris:load_more:fail', { element: $elm, page: curPage, url: settings.loadMoreUrl });
                logger.error('loadMoreContent :: failed with message: ' + msg); });
        }

        function setLoadMoreUrl(url) { settings.loadMoreUrl = $.trim(url);
            updateControls();
            return _this; }
        _this.init = init;
        _this.setLoadMoreUrl = setLoadMoreUrl;
        init();
        return _this;
    }
    $.fn[moduleName] = function(options) {
        return this.each(function() {
            var $elm = $(this);
            if (!$elm.data(moduleName)) {
                var myModule = tetris(this, options);
                $elm.data(moduleName, myModule); } }); };
    $.fn[moduleName].defaults = moduleDefaults;
    return $;
});
define('util', ['module', 'jquery', 'underscore', 'handlebars', 'window', 'document'], function(module, $, _, Handlebars, window, document, undefined) {
    'use strict';
    Handlebars.registerHelper('SYSTEM_VERSION', function() {
        return window.SYSTEM_VERSION || ''; });
    Handlebars.registerHelper('SYSTEM_ENV', function() {
        return window.SYSTEM_ENV || ''; });
    Handlebars.registerHelper('DEVICE_VIEW', function() {
        return window.DEVICE_VIEW || ''; });
    Handlebars.registerHelper('ASSETS_BASEURL', function() {
        return window.ASSETS_BASEURL || ''; });
    Handlebars.registerHelper('SITE_BASEURL', function() {
        return window.SITE_BASEURL || ''; });
    Handlebars.registerHelper('SITE_DOMAIN', function() {
        return window.SITE_DOMAIN || ''; });
    var domReadyDeferred = $.Deferred();
    var domReadyPromise = domReadyDeferred.promise();
    $(document).ready(function() { domReadyDeferred.resolve(); });

    function util() {
        var _this = Object.create({});

        function getDomReadyPromise() {
            return domReadyPromise; }

        function parseSharing(domElement) {
            getDomReadyPromise().done(function() {
                if (window.twttr && window.twttr.widgets) { window.twttr.widgets.load(domElement); }
                if (window.stButtons) { window.stButtons.locateElements(); }
            });
        }
        _this.getDomReadyPromise = getDomReadyPromise;
        _this.parseSharing = parseSharing;
        return _this;
    }
    return util();
});
if (typeof googletag === "undefined") {
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    (function() {
        var gads = document.createElement('script');
        gads.async = true;
        gads.type = 'text/javascript';
        var useSSL = 'https:' == document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node); })(); }
var _qevents = _qevents || [];
var wbads = (function($, window, document, undefined) {
    'use strict';
    var _this = Object.create({});
    var settings;
    var dfp_settings;
    var unit_name = "",
        required_params = { site_id: "", site_domain: "", ad_zone: "article" };
    var module_defaults = { enabled: true, debug_enabled: false, device_view: "main", selector: "wbads", data_store: "wbadsdata", evt_callbacks: { "pre.init": {}, "post.init": {}, "pre.enable.services": {}, "post.enable.services": {}, "pre.slot.discovery": {}, "post.slot.discovery": {}, "pre.slot.define": {}, "post.slot.define": {}, "pre.display.ads": {}, "post.display.ads": {} }, quantcast: { enabled: true, qacct: "p-21jBY4_vbHNJQ", segs: "" } };
    var dfp_defaults = { collapse_empty_divs: false, disable_initial_load: false, enable_single_request: false, enable_async_rendering: true, enable_video_ads: false, no_fetch: false, disable_publisher_console: false, category_exclusion: [], global_targeting: { qcs: {}, category: "", channel: "", tag: [], url: "", adtest: "" } };
    var cmd = [];
    var slots = {},
        slot_count = 0;
    var ad_sizes_list = { main: { leaderboard: [
                [728, 90]
            ], leaderboard_flex: [
                [728, 90],
                [970, 66],
                [1010, 150],
                [970, 250],
                [1010, 250]
            ], medium_rectangle: [
                [300, 250]
            ], medium_rectangle_flex: [
                [300, 250],
                [300, 600]
            ], skin: [
                [1, 1]
            ] }, smartphone: { leaderboard: [
                [320, 50]
            ], leaderboard_flex: [
                [300, 250],
                [320, 50]
            ], leaderboard_all: [
                [1, 1],
                [300, 250],
                [320, 50],
                [320, 360],
                [320, 480]
            ], medium_rectangle: [
                [300, 250]
            ], medium_rectangle_flex: [
                [300, 250],
                [300, 600]
            ], skin: [
                [1, 1]
            ] } };

    function Slot(id) {
        this.deferred = new $.Deferred();
        this.div_id = id;
        this.gpt_slot_object = false;
        this.slot_data = { tile: "", size_list: "", size_nickname: "", interstitial: false, refresh: false, slot_targeting: {}, responsive_size_map: {}, adsense_params: {} };
        var _this = this;
        defineCallback('pre.display.ads', function() {
            if (!_this.hasGptSlot()) {
                return; }
            $.each(_this.slot_data.slot_targeting, function(k, v) {
                if (k && v != '' && typeof v != 'undefined') { _this.gpt_slot_object.setTargeting(k, v); } });
        });
    }
    Slot.prototype.setTargetingParam = function(key, value) {
        if (key && value != '' && typeof value != 'undefined') { this.slot_data.slot_targeting[key] = value; }
        return this;
    };
    Slot.prototype.refresh = function() {
        if (this.hasGptSlot()) { googletag.pubads().refresh([this.gpt_slot_object]); }
        return this;
    };
    Slot.prototype.attachGptSlot = function(gptSlot) { this.gpt_slot_object = gptSlot;
        var _this = this;
        $.each(_this.slot_data.slot_targeting, function(k, v) {
            if (k && v != '' && typeof v != 'undefined') { _this.gpt_slot_object.setTargeting(k, v); } });
        this.deferred.resolve(this);
        return this; };
    Slot.prototype.hasGptSlot = function() {
        return this.gpt_slot_object ? true : false; };

    function init(site_id, site_domain, ad_zone, options, dfp_options) {
        var initArgs = { site_id: site_id, site_domain: site_domain, ad_zone: ad_zone, options: options, dfp_options: dfp_options };
        trigger("filter.init.args", initArgs);
        site_id = initArgs.site_id;
        site_domain = initArgs.site_domain;
        ad_zone = initArgs.ad_zone;
        options = initArgs.options;
        dfp_options = initArgs.dfp_options;
        settings = $.extend({}, module_defaults, options);
        dfp_settings = $.extend({}, dfp_defaults, dfp_options);
        settings.enabled = setRequiredParam("site_id", site_id) && setRequiredParam("site_domain", site_domain);
        var hasAdzone = ad_zone ? true : false;
        setRequiredParam("ad_zone", ad_zone);
        unit_name = "/" + getRequiredParam("site_id") + "/" + getRequiredParam("site_domain") + (hasAdzone ? "/" + getRequiredParam("ad_zone") : "");
        if (!settings.enabled) { debug("init :: WBADS ads disabled. no ad slots will be created or displayed");
            return _this; }
        $.each(settings.evt_callbacks, function(name, func) { defineCallback(name, func); });
        getGlobalTargetingParams();
        trigger("pre.init");
        if (settings.quantcast.enabled) { embedQuantCastDeliveryTag();
            embedQuantCastMeasurementTag(); }
        pushCmd(function() { trigger("pre.enable.services");
            if (dfp_settings.collapse_empty_divs) googletag.pubads().collapseEmptyDivs();
            if (dfp_settings.disable_initial_load) googletag.pubads().disableInitialLoad();
            if (dfp_settings.enable_single_request) googletag.pubads().enableSingleRequest();
            if (dfp_settings.enable_async_rendering) googletag.pubads().enableAsyncRendering();
            if (dfp_settings.enable_video_ads) googletag.pubads().enableVideoAds();
            if (dfp_settings.no_fetch) googletag.pubads().noFetch();
            if (dfp_settings.disable_publisher_console) googletag.pubads().disablePublisherConsole();
            $.each(dfp_settings.global_targeting, function(key, value) {
                if (key && value != '' && typeof value != 'undefined') { googletag.pubads().setTargeting(key, value);
                    debug("pre.enable.services :: setting global param[" + key + "]=" + value); } });
            googletag.enableServices();
            trigger("post.enable.services"); });
        trigger("post.init");
        return _this;
    }

    function defineCallback(eventRef, eventBinding) {
        if ($.isFunction(eventBinding)) { bind(eventRef, eventBinding); }
        return _this;
    }

    function setGlobalOption(option, enabled) {
        if (typeof dfp_settings === "undefined") { defineCallback("pre.init", function() { setGlobalOption(option, enabled); });
            return _this; }
        if (typeof dfp_settings[option] !== 'undefined') { dfp_settings[option] = enabled;
            debug("setGlobalOption :: " + option + " set to: " + dfp_settings[option]); } else { debug("setGlobalOption :: No such option: " + option + " ...ABORTING! "); }
        return _this;
    }

    function setChannel(channel) { setGlobalTargetingParam('category', channel);
        return _this; }

    function setGlobalTargetingParam(param, value) {
        if (typeof dfp_settings === "undefined") { defineCallback("pre.init", function() { setGlobalTargetingParam(param, value); });
            return _this; }
        if (param && value != '' && typeof value != 'undefined') { dfp_settings.global_targeting[param] = value;
            googletag.pubads().setTargeting(param, value); }
        return _this;
    }

    function getGlobalTargetingParams() { dfp_settings.global_targeting["url"] = getUriPaths();
        dfp_settings.global_targeting["qcs"] = getQCSegs();
        getHashtags();
        dfp_settings.global_targeting["adtest"] = getParamFromUri("adtest"); }

    function buildSlots() {
        trigger('pre.slot.discovery');
        if (!settings.enabled) { debug('buildSlots :: ads disabled. no ad slots will be created or displayed');
            return _this; }
        var cnt = 0;
        $('.' + settings.selector).each(function() {
            var adDiv = $(this);
            var id = adDiv.attr('id');
            if (id && getSlotById(id)) {
                return; }
            cnt++;
            defineNewAdSlot(adDiv, null, null, false, false);
        });
        debug('buildSlots :: found and created ' + cnt + ' ads');
        trigger('post.slot.discovery');
        return _this;
    }

    function addSlot(divId, sizeType, sizeList, interstitial, refresh) {
        if (!settings.enabled) { debug('addSlot :: ads disabled. no ad slots will be created or displayed');
            return _this; }
        defineNewAdSlot($('#' + divId), sizeType, sizeList, interstitial, refresh);
        debug('addSlot :: googletag slot[' + divId + '] added');
        return _this;
    }

    function setSlotTargetingParam(slotDivId, param, value) {
        var slot = getSlotById(slotDivId);
        if (!slot) { debug("setSlotTargetingParam :: slot[" + slotDivId + "] does not exist.");
            return _this; }
        slot.setTargetingParam(param, value);
        return _this;
    }

    function defineNewAdSlot(adDiv, sizeType, sizeList, interstitial, refresh) {
        if (!adDiv) { debug("defineNewAdSlot :: no adDiv exists! ABORTING.");
            return _this; }
        var divId = generateId(adDiv);
        if (getSlotById(divId)) { debug(divId + ' :: defineNewAdSlot :: slot already defined.');
            return _this; }
        slots[divId] = new Slot(divId);
        trigger('pre.slot.define', slots[divId]);
        pushCmd(function() {
            var gptSlot = adDiv.data(settings.data_store);
            var slotUnit = unit_name;
            if (gptSlot) { slots[divId].attachGptSlot(gptSlot); } else {
                var adSizeType = sizeType || adDiv.data('adsize');
                var adSizeList = sizeList || adDiv.data('adsize-list');
                var isInterstitial = (interstitial ? true : adDiv.data('interstitial')) || false;
                if (adSizeType == 'skin') { slotUnit += '/skin'; }
                var refreshable = (refresh ? true : adDiv.data('refresh')) || false;
                debug(divId + " :: defineNewAdSlot :: type:" + adSizeType + ", list:" + adSizeList + ", interstitial:" + isInterstitial + ", refreshable:" + refreshable);
                if (!isInterstitial) {
                    var dfpAdSizes;
                    if (adSizeList) { debug(divId + " :: defineNewAdSlot :: using adhoc size: " + adSizeList);
                        dfpAdSizes = getSizesFromString(adSizeList); } else if (adSizeType && ad_sizes_list[settings.device_view][adSizeType]) { dfpAdSizes = ad_sizes_list[settings.device_view][adSizeType];
                        debug(divId + " :: defineNewAdSlot :: using sizetype: " + adSizeType); } else { debug(divId + " :: defineNewAdSlot :: NO VALID SIZES FOUND. will expand to element size by default"); }
                    gptSlot = googletag.defineSlot(slotUnit, dfpAdSizes, divId).addService(googletag.pubads());
                    if (dfp_settings.enable_single_request) { adDiv.data('unfilled', true);
                        defineCallback("pre.display.ads", function() {
                            if (!adDiv.data('registered')) { pushCmd(function() { googletag.display(divId);
                                    adDiv.data('registered', true);
                                    debug(divId + " :: defineNewAdSlot :: pushing SRA display to cmd queue"); }); } }); }
                    debug(divId + " :: defineNewAdSlot :: googletag slot defined");
                } else {
                    if (adDiv.data('pos').indexOf('prestitial') != -1) { slotUnit += '/prestitial'; } else { slotUnit += '/interstitial'; }
                    gptSlot = googletag.defineOutOfPageSlot(slotUnit, divId).addService(googletag.pubads()).setCollapseEmptyDiv(true);
                    if (dfp_settings.enable_single_request) { adDiv.data('unfilled', true);
                        defineCallback("pre.display.ads", function() {
                            if (!adDiv.data('registered')) { pushCmd(function() { googletag.display(divId);
                                    adDiv.data('registered', true);
                                    debug(divId + " :: defineNewAdSlot :: pushing OutOfPageSlot SRA display to cmd queue"); }); } }); }
                    debug(divId + " :: defineNewAdSlot :: googletag out-of-page slot defined");
                    adDiv.data('interstitial', true);
                }
                if (refreshable) { adDiv.data('refresh', true);
                    debug(divId + " :: defineNewAdSlot :: this slot will REFRESH with each showAds()"); }
                if (adDiv.data('pos') != null) { slots[divId].setTargetingParam('pos', adDiv.data('pos')); }
                if (adDiv.data('tile') != null) { slots[divId].slot_data.tile = adDiv.data('tile');
                    slots[divId].setTargetingParam('tile', slots[divId].slot_data.tile); }
                slots[divId].attachGptSlot(gptSlot);
                adDiv.data(settings.data_store, gptSlot);
            }
        });
        trigger('post.slot.define', slots[divId]);
        return _this;
    }

    function getSlotById(id) {
        if (slots[id]) {
            return slots[id]; }
        return null;
    }

    function showAds() { flushCmd();
        var deferreds = $.map(slots, function(slot, index) {
            return slot.deferred; });
        $.when.apply($, deferreds).then(function() { trigger('pre.display.ads');
            $.each(slots, function(index, slot) {
                var adDiv = $('#' + slot.div_id);
                var adSlotData = adDiv.data(settings.data_store);
                var refreshable = adDiv.data('refresh') || false;
                var unfilled = adDiv.data('unfilled') || false;
                var filled = adDiv.data('filled') || false;
                var registered = adDiv.data('registered');
                if (dfp_settings.enable_single_request) {
                    if (refreshable) { pushCmd(function() { googletag.pubads().refresh([adSlotData]); });
                        debug("showAds :: refreshing ad " + adDiv.attr('id')); } else if (unfilled) { pushCmd(function() { googletag.pubads().refresh([adSlotData]); });
                        debug("showAds :: filling unfilled ad " + adDiv.attr('id'));
                        adDiv.data('unfilled', false); } } else {
                    if (refreshable) {
                        if (!registered) { pushCmd(function() { googletag.display(adDiv.attr('id'));
                                debug("showAds :: displaying ad " + adDiv.attr('id') + " - will REFRESH on next showAds()");
                                adDiv.data('registered', true); }); } else { pushCmd(function() { googletag.pubads().refresh([adSlotData]); });
                            debug("showAds :: refreshing ad " + adDiv.attr('id')); } } else if (!filled) { pushCmd(function() { googletag.display(adDiv.attr('id')); });
                        debug("showAds :: displaying ad " + adDiv.attr('id') + " for the first and only time!");
                        adDiv.data('filled', true); } else { debug("showAds :: nonrefreshing ad " + adDiv.attr('id') + " already displayed..skipping."); } } });
            flushCmd();
            trigger('post.display.ads'); });
        return _this; }

    function generateId(element) {
        slot_count++;
        if (element && element.attr('id')) {
            return element.attr('id'); }
        var id = 'wbad-' + getRequiredParam('site_domain') + '-' + slot_count;
        id = id.replace(/[^A-Za-z0-9-]+/g, '').toLowerCase();
        element.attr('id', id);
        return id;
    }

    function cleanParamName(param) {
        param = trim(param.toLowerCase());
        param = param.replace(/[^a-z0-9_]/g, '');
        var param_regex = /^[a-z_][a-z0-9_]{1,20}$/;
        if (!param_regex.test(param)) { debug("_cleanParamName :: invalid param name: " + param);
            return ""; }
        return param;
    }

    function setRequiredParam(param, val) {
        param = cleanParamName(param);
        if (!param) return false;
        required_params[param] = val || false;
        if (typeof(required_params[param]) == "string")
            required_params[param] = trim(required_params[param]);
        return true;
    }

    function getRequiredParam(param) { param = cleanParamName(param);
        if (!param) return false;
        return (required_params[param] || false); }

    function setSelector(classname) {
        if (typeof settings === "undefined") { defineCallback("pre.slot.discovery", function() { setSelector(classname); });
            return _this; }
        if (null !== classname && "" != classname) {
            if (classname.charAt(0) === '.') classname = classname.substr(1);
            settings.selector = classname; }
        return _this;
    }

    function setEnabled(showAds) {
        if (typeof settings === "undefined") { defineCallback("pre.init", function() { setEnabled(showAds); });
            return _this; }
        settings.enabled = showAds || false;
        debug("setEnabled :: ads enabled : " + settings.enabled);
        return _this;
    }

    function getEnabled() {
        return settings.enabled; }

    function setDeviceView(device) {
        if (typeof settings === "undefined") { defineCallback("pre.init", function() { setDeviceView(device); });
            return _this; }
        settings.device_view = device || "main";
        debug("setDeviceView :: device_view set to : " + settings.device_view);
        return _this;
    }

    function setDebug(enabled) {
        if (typeof settings === "undefined") { defineCallback("pre.init", function() { setDebug(enabled); });
            return _this; }
        settings.debug_enabled = enabled || false;
        return _this;
    }

    function debug(msg) {
        if (typeof settings === "undefined" || !settings.debug_enabled) return;
        if (window.console && typeof console.log != "undefined")
            console.log("[WBADS] " + msg);
    }

    function trim(str) {
        return str.replace(/^\s+|\s+$/g, ""); }

    function getParamFromUri(param) {
        var value = decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(param).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        debug("getParamFromUri :: param " + param + (value ? " found with value: " + value : " not found"));
        return value; }

    function getSizesFromString(str) {
        var sizes = [];
        if (str.length) {
            var pairs = str.split(',');
            $.each(pairs, function(key, value) {
                var currentSize = value.split('x');
                sizes.push([parseInt(currentSize[0], 10), parseInt(currentSize[1], 10)]);
                debug("getSizesFromString :: adding SIZE=[" + currentSize[0] + "," + currentSize[1] + "]"); }); } else { debug("getSizesFromString :: NO VALID SIZES FOUND. will expand to element size by default"); }
        return sizes;
    }

    function getUriPaths() {
        var paths = window.location.pathname.replace(/\/$/, '');
        debug("getUriPaths :: found paths:" + paths);
        return paths; }

    function setQuantcast(enabled) {
        if (typeof settings === "undefined") { defineCallback("pre.init", function() { setQuantcast(enabled); });
            return; }
        settings.quantcast.enabled = enabled || false;
        embedQuantCastDeliveryTag();
    }

    function embedQuantCastDeliveryTag() {
        if (!settings.quantcast.enabled) return;
        document.write('<scr' + 'ipt src="//pixel.quantserve.com/seg/' + settings.quantcast.qacct + '.js" type="text/javascript"></scr' + 'ipt>'); }

    function embedQuantCastMeasurementTag() {
        if (!settings.quantcast.enabled) return;
        var elem = document.createElement('script');
        elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
        elem.async = true;
        elem.type = "text/javascript";
        var scpt = document.getElementsByTagName('script')[0];
        scpt.parentNode.insertBefore(elem, scpt);
        _qevents.push({ qacct: settings.quantcast.qacct }); }

    function _quantgc(n) {
        var c = document.cookie;
        if (!c) return '';
        var i = c.indexOf(n + "=");
        if (-1 == i) return '';
        var len = i + n.length + 1;
        var end = c.indexOf(";", len);
        return c.substring(len, end < 0 ? c.length : end); }

    function getQCSegs() {
        if (!settings.quantcast.enabled) return "";
        if (settings.quantcast.segs != "")
            return settings.quantcast.segs;
        var segs = [];
        var _qsegs = _quantgc("__qseg").split("|");
        for (var i = 0; i < _qsegs.length; i++) {
            var qArr = _qsegs[i].split("_");
            segs.push(qArr[1]); }
        settings.quantcast.segs = segs;
        debug("getQCSegs :: found segs:" + settings.quantcast.segs);
        return settings.quantcast.segs;
    }

    function getChannel() {
        var channel = "";
        debug("getChannel :: found channel:" + channel);
        return channel; }

    function getHashtags() {
        var hashtags = [];
        if (dfp_settings.global_targeting["tag"] != "") { hashtags = dfp_settings.global_targeting["tag"].split(",");
            var tagString = "";
            $.each(hashtags, function(index, tag) { debug("getHashtags :: pushing tag:" + tag);
                if (tagString != "") tagString += ",";
                tagString += $.trim(tag); });
            dfp_settings.global_targeting["tag"] = tagString; }
        debug("getHashtags :: found hashtags:" + dfp_settings.global_targeting["tag"]);
    }

    function pushCmd(func) { cmd.push(func); }

    function flushCmd() {
        var cmds = cmd.slice(0);
        cmd = [];
        for (var i = 0; i < cmds.length; i++) { googletag.cmd.push(cmds[i]); } }

    function bind(trigger, func) { $(_this).bind(trigger + ".wbads", func); }

    function trigger(trigger, args) { $(_this).trigger(trigger + ".wbads", args || _this); }
    _this.setDebug = setDebug;
    _this.setEnabled = setEnabled;
    _this.getEnabled = getEnabled;
    _this.setSelector = setSelector;
    _this.setGlobalOption = setGlobalOption;
    _this.setGlobalTargetingParam = setGlobalTargetingParam;
    _this.setQuantcast = setQuantcast;
    _this.addSlot = addSlot;
    _this.getSlotById = getSlotById;
    _this.setSlotTargetingParam = setSlotTargetingParam;
    _this.setChannel = setChannel;
    _this.defineCallback = defineCallback;
    _this.debug = debug;
    _this.showAds = showAds;
    _this.buildSlots = buildSlots;
    _this.init = init;
    return _this;
})(window.jQuery, window, document);
window.KRUX_CONFID = window.KRUX_CONFID || false;
window.KRUX_VERSION = window.KRUX_VERSION || '1.9';
window.Krux || ((Krux = function() { Krux.q.push(arguments) }).q = []);
(function(w, d, wbads, krux, factory) {
    'use strict';
    w.wbkrux = factory(w, d, wbads, krux);
    if (typeof bootstrap === 'function') { bootstrap('wbkrux', w.wbkrux); }
    if (typeof exports === 'object') { module.exports = w.wbkrux; }
    if (typeof define === 'function' && define.amd) { define('wbkrux', [], w.wbkrux); }
})(window, document, window.wbads, window.Krux, function(w, d, wbads, krux) {
    'use strict';
    var _this = {};
    var ctagId = 'kxct';
    var ctag = d.getElementById(ctagId);

    function retrieve(n, ns) {
        var m, k = ns + n;
        if (w.localStorage) {
            return w.localStorage[k] || ''; } else if (navigator.cookieEnabled) { m = d.cookie.match(k + '=([^;]*)');
            return m && decodeURIComponent(m[1]) || ''; }
        return '';
    }

    function getParam(n) {
        return retrieve(n, 'kxwarnerbros') || retrieve(n, 'kx'); }

    function getUser() {
        return getParam('user'); }

    function getSegments() {
        var segs = getParam('segs');
        return segs && segs.split(',') || []; }

    function getGptCustParams(encode) { encode = encode || true;
        var ksg = getSegments();
        var kuid = getUser();
        var khost = encodeURIComponent(d.location.hostname);
        var str = 'ksg=' + ksg + '&kuid=' + kuid + '&khost=' + khost;
        return encode ? encodeURIComponent(str) : str; }
    if (ctag && !w.KRUX_CONFID) { w.KRUX_CONFID = ctag.getAttribute('data-id') || false; }
    _this.getParam = getParam;
    _this.getUser = getUser;
    _this.getSegments = getSegments;
    _this.getGptCustParams = getGptCustParams;
    if (!w.KRUX_CONFID) {
        return _this; }
    if (!ctag) { ctag = d.createElement('script');
        ctag.type = 'text/javascript';
        ctag.id = ctagId;
        ctag.setAttribute('class', ctagId);
        ctag.setAttribute('data-id', w.KRUX_CONFID);
        ctag.setAttribute('data-timing', 'async');
        ctag.setAttribute('data-version', w.KRUX_VERSION);
        var s = d.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ctag, s);
        var k = d.createElement('script');
        k.type = 'text/javascript';
        k.async = true;
        var m, src = (m = location.href.match(/\bkxsrc=([^&]+)/)) && decodeURIComponent(m[1]);
        k.src = /^https?:\/\/([a-z0-9_\-\.]+\.)?krxd\.net(:\d{1,5})?\//i.test(src) ? src : src === 'disable' ? '' : (location.protocol === 'https:' ? 'https:' : 'http:') + '//cdn.krxd.net/controltag?confid=' + w.KRUX_CONFID;
        s.parentNode.insertBefore(k, s); }
    wbads.defineCallback('pre.enable.services', function() { krux.user = getUser();
        krux.segments = getSegments();
        wbads.setGlobalTargetingParam('ksg', krux.segments);
        wbads.setGlobalTargetingParam('kuid', krux.user);
        wbads.setGlobalTargetingParam('khost', encodeURIComponent(d.location.hostname)); });
    return _this;
});
(function(w, d, factory) {
    'use strict';
    w.wbppid = factory(w, d);
    if (typeof bootstrap === 'function') { bootstrap('wbppid', w.wbppid); }
    if (typeof exports === 'object') { module.exports = w.wbppid; }
    if (typeof define === 'function' && define.amd) { define('wbppid', [], w.wbppid); }
})(window, document, function(w, d, undefined) {
    'use strict';
    var _this = {};
    var ppid;
    var cookieName = w.WB_PPID_COOKIE_NAME || 'wbppid';
    var cookieExpires = w.WB_PPID_COOKIE_EXPIRES || 365;
    var cookieDomain = (d.domain).match(/(.\.)?(\w+\.\w+)$/)[2];
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + cookieExpires);
    var uuidv4 = function b(a) {
        return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b); };

    function fromStorage() {
        var m, results;
        if (w.localStorage) { results = w.localStorage[cookieName] || false; }
        if (!results && navigator.cookieEnabled) { m = d.cookie.match(cookieName + '=([^;]*)');
            results = m && encodeURIComponent(m[1]) || false; }
        return results || '';
    }

    function toStorage(ppid) {
        if (w.localStorage) { w.localStorage[cookieName] = ppid; }
        if (navigator.cookieEnabled) { d.cookie = [cookieName, '=', ppid, '; expires=', expiry.toUTCString(), '; path=/; domain=', cookieDomain].join(''); }
    }

    function toGoogletag() {
        if (typeof googletag !== 'undefined' && typeof googletag.pubads == 'function') {
            var id = get();
            if ('OPTOUT' === id) { id = ''; }
            googletag.pubads().setPublisherProvidedId(id);
        }
    }

    function get() {
        return ppid || generate(); }

    function set(value) {
        value = value.replace(/[\W_]/g, '');
        if (value.length < 32 || value.length > 150) { value = ''; }
        ppid = value;
        toStorage(ppid);
    }

    function optout() { ppid = 'OPTOUT';
        toStorage(ppid); }

    function generate() { set(uuidv4());
        return ppid; }
    ppid = fromStorage();
    _this.get = get;
    _this.set = set;
    _this.optout = optout;
    _this.regenerate = generate;
    _this.toGoogletag = toGoogletag;
    return _this;
});
(function(root, factory) {
    if (typeof bootstrap === 'function') { bootstrap('WbSodaHead', factory(root.$)); } else if (typeof exports === "object") { module.exports = factory(require('jquery')); } else if (typeof define === "function" && define.amd) { define('wb/sodahead/1.1.2/sodahead', ['jquery'], factory); } else { root.WbSodaHead = factory(root.$); } })(this, function($) {
    var logEnabled = this.console && typeof console.log != 'undefined';
    var log = function(msg) {
        if (logEnabled) {
            var type = $.type(msg);
            if (type === 'string' || type === 'number') { console.log('[WbSodaHead] ' + msg); } else { console.log(msg); } } };
    var iframeId = 'wb-sodahead-iframe';
    var apiURL = '//telepictures.sodahead.com/api/';
    var module = function() {
        var _this = Object.create({});
        var polls = {};
        var pollsData = {};
        var queuedPolls = [];
        var queueProcessed = false;
        var queueDeferred = $.Deferred();
        var init = function() { $('<iframe id="' + iframeId + '" name="' + iframeId + '" style="display:none;"></iframe>').appendTo('body');
            return _this; };
        var processQueue = function() {
            queueProcessed = true;
            if (!queuedPolls.length) { queuedPolls = [];
                queueDeferred.resolve();
                return; }
            fetchPolls(queuedPolls).then(function() { queueDeferred.resolve(); }, function() { queueDeferred.reject(); });
            queuedPolls = [];
        };
        var onQueueProcessed = function() {
            return queueDeferred.promise(); };
        var fetchPolls = function(ids, deferred, page) {
            var pollIds = $.isArray(ids) ? ids.join('/') : ids;
            page = page || 1;
            page = parseInt(page);
            var url = apiURL + 'polls/' + pollIds + '/';
            if (page > 1) { url += '?page=' + page; }
            deferred = deferred || $.Deferred();
            log('fetchPolls::' + url);
            if (page > 4) { log('fetchPolls::too much recursion.');
                deferred.resolve();
                return deferred.promise(); }
            if (pollIds == '') { log('fetchPolls:: blank pollIds');
                deferred.resolve();
                return deferred.promise(); }
            $.ajax({ url: url, dataType: 'jsonp', 'jsonp': 'jsonp', cache: false }).done(function(data) {
                if (!data) { deferred.reject();
                    return; }
                if (data.poll) {
                    if (polls[data.poll.id]) { pollsData[data.poll.id] = data.poll;
                        renderPolls(data.poll.id);
                        deferred.resolve();
                        return; }
                    log('fetchPolls:: (single) never requested poll id: ' + data.poll.id);
                    deferred.reject();
                    return;
                }
                if (data.polls) {
                    var pollCount = data.polls.length;
                    var hasValidPoll = false;
                    for (var i = 0; i < pollCount; i++) {
                        var poll = data.polls[i].poll;
                        if (polls[poll.id]) { pollsData[poll.id] = poll;
                            renderPolls(poll.id);
                            hasValidPoll = true; } else { log('fetchPolls:: (multiple) never requested poll id: ' + data.poll.id); } }
                    var hasNext = data.next || false;
                    if (hasNext !== false && data.next.length > pollIds.length) { page++;
                        fetchPolls(ids, deferred, page);
                        return; }
                    if (hasValidPoll) { deferred.resolve(); } else { deferred.reject(); }
                    return;
                }
                log('fetchPolls::invalid response:');
                log(data);
                deferred.reject();
            }).fail(function(xhr) { log('fetchPolls::failed:' + xhr.status + ' -> ' + xhr.statusText);
                deferred.reject(); });
            return deferred.promise();
        };
        var renderPolls = function(pollId) { $.each(polls[pollId], function(domId, pollObj) {
                if (pollsData[pollId] && pollsData[pollId].answers) { pollObj.data = pollsData[pollId];
                    renderPoll(pollObj); } else { log('renderPolls::no answers property on data.');
                    log(pollsData[pollId]); } }); };
        var renderPoll = function(poll) {
            var answersHtml = '';
            var resultsHtml = '';
            var answer;
            var answerDomId;
            var answerPercent = 0;
            var hasAnyVotes = poll.data.totalVotes;
            var answerCount = poll.data.answers.length;
            for (var i = 0; i < answerCount; i++) {
                answer = poll.data.answers[i];
                answerDomId = poll.domId + answer.id;
                if (answer.totalVotes > 0) { answerPercent = hasAnyVotes ? Math.round((answer.totalVotes / poll.data.totalVotes) * 100) : 100; } else { answerPercent = 0; }
                answersHtml += '<div class="answer clearfix"><label for="' + answerDomId + '-af">' +
                    escapeHtml(answer.title) + '</label><div><input type="radio" name="answer" id="' +
                    answerDomId + '-af" value="' + answer.id + '"/></div></div>';
                resultsHtml += '<div class="result clearfix"><div class="title">' + escapeHtml(answer.title) + '</div>' + '<div class="percent"><div class="meter" style="width:' +
                    answerPercent + '%;"></div><span>' + answerPercent + '%</span></div></div>';
            }
            if (!poll.data.closed) {
                var serviceURL;
                if ($.browser.msie) { serviceURL = '/wb-sodahead/proxy/polls/' + poll.id + '/vote/'; } else { serviceURL = apiURL + 'polls/' + poll.id + '/vote/'; }
                answersHtml = '<form action="' + serviceURL + '" method="post" id="' + poll.domId + '-form" target="' + iframeId + '">' + answersHtml + '</form>';
                poll.$answers.html(answersHtml);
                poll.$results.html(resultsHtml);
                poll.$voteButton.on('click', function(e) { e.stopPropagation();
                    e.preventDefault();
                    vote(poll);
                    return false; });
                poll.$answers.on('click', '.answer', function(e) { e.stopPropagation();
                    e.preventDefault();
                    poll.$answers.find('input[name=answer]:checked').removeAttr('checked');
                    $(this).find('input[name=answer]').attr('checked', 'checked');
                    vote(poll);
                    return false; });
                poll.$answers.show();
                poll.$voteButton.show();
            } else {
                poll.$answers.hide();
                if (poll.data.hideResults) {
                    if (poll.data.hideResults_content) { resultsHtml = '<p>' + escapeHtml(poll.data.hideResults_content) + '</p>'; } else { resultsHtml = '<p>This poll is now closed.</p>'; } }
                poll.$results.html(resultsHtml);
                poll.$results.show();
            }
        };
        var vote = function(poll) {
            var answer = poll.$answers.find('input[name=answer]:checked').val();
            if (parseInt(answer) != answer) { poll.$errors.html('<p>Please select an answer.</p>').slideDown('fast');
                return; }
            poll.$answers.find('form').submit();
            poll.$errors.slideUp('fast').empty();
            poll.$voteButton.hide();
            poll.$answers.hide();
            poll.$results.fadeIn('fast');
            $(_this).trigger('vote', [poll]);
        };
        var addPoll = function(pollId, domId) {
            var $elm = $('#' + domId);
            if (!$elm || parseInt(pollId) != pollId) { log('addPoll::failed, no dom node with id ' + domId);
                return; }
            if (!polls[pollId]) { polls[pollId] = {};
                pollsData[pollId] = {}; }
            log('addPoll::creating polls[' + pollId + '][' + domId + ']');
            polls[pollId][domId] = { id: pollId, domId: domId, $container: $elm, $voteButton: $elm.find('.poll-vote-button'), $errors: $elm.find('.poll-errors'), $answers: $elm.find('.poll-answers'), $results: $elm.find('.poll-results') };
            if (queueProcessed) { fetchPolls(pollId); } else { queuedPolls.push(pollId); }
        };
        var escapeHtml = function(str) {
            return $('<div/>').text(str).html(); };
        var setApiURL = function(url) { apiURL = url; };
        var enableLogging = function(enabled) { log('enableLogging::' + enabled);
            logEnabled = (enabled ? true : false) && this.console && typeof console.log != 'undefined';
            return _this; };
        _this.addPoll = addPoll;
        _this.setApiURL = setApiURL;
        _this.enableLogging = enableLogging;
        _this.processQueue = processQueue;
        _this.onQueueProcessed = onQueueProcessed;
        init();
        return _this;
    };
    return module();
});