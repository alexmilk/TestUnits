if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {}
        ;
        F.prototype = o;
        return new F();
    }
    ;
}
define('requirecss', ['module'], function(module) {
    var loadedFiles = {};
    var baseUrl = module.config().baseUrl || '/';
    var requirecss = function() {
        var _this = Object.create({});
        var flagAsLoaded = function(url) {
            var cacheKey = getCacheKey(url);
            loadedFiles[cacheKey] = true;
        }
        ;
        var load = function(url, media) {
            var cacheKey = getCacheKey(url);
            if (isLoaded(cacheKey)) {
                return;
            }
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.media = media || 'screen';
            link.href = normalizeURL(url);
            document.getElementsByTagName('head')[0].appendChild(link);
            loadedFiles[cacheKey] = true;
        }
        ;
        var normalizeURL = function(url) {
            if (url.indexOf('http') == 0 || url.indexOf('//') == 0) {
                return url;
            }
            if (url.indexOf('/') == 0) {
                return baseUrl + url.substr(1);
            }
            return baseUrl + url;
        }
        ;
        var getCacheKey = function(url) {
            if (url.indexOf('http') == 0 || url.indexOf('//') == 0) {
                return url;
            }
            if (url.indexOf('/') == 0) {
                return url.substr(1);
            }
            return url;
        }
        ;
        var isLoaded = function(url) {
            return loadedFiles[url] === true ? true : false;
        }
        ;
        _this.flagAsLoaded = flagAsLoaded;
        _this.load = load;
        return _this;
    }
    ;
    return requirecss();
});
var Handlebars = (function() {
    var __module3__ = (function() {
        "use strict";
        var __exports__;
        function SafeString(string) {
            this.string = string;
        }
        SafeString.prototype.toString = function() {
            return "" + this.string;
        }
        ;
        __exports__ = SafeString;
        return __exports__;
    })();
    var __module2__ = (function(__dependency1__) {
        "use strict";
        var __exports__ = {};
        var SafeString = __dependency1__;
        var escape = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        };
        var badChars = /[&<>"'`]/g;
        var possible = /[&<>"'`]/;
        function escapeChar(chr) {
            return escape[chr] || "&amp;";
        }
        function extend(obj, value) {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    obj[key] = value[key];
                }
            }
        }
        __exports__.extend = extend;
        var toString = Object.prototype.toString;
        __exports__.toString = toString;
        var isFunction = function(value) {
            return typeof value === 'function';
        }
        ;
        if (isFunction(/x/)) {
            isFunction = function(value) {
                return typeof value === 'function' && toString.call(value) === '[object Function]';
            }
            ;
        }
        var isFunction;
        __exports__.isFunction = isFunction;
        var isArray = Array.isArray || function(value) {
            return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
        }
        ;
        __exports__.isArray = isArray;
        function escapeExpression(string) {
            if (string instanceof SafeString) {
                return string.toString();
            } else if (!string && string !== 0) {
                return "";
            }
            string = "" + string;
            if (!possible.test(string)) {
                return string;
            }
            return string.replace(badChars, escapeChar);
        }
        __exports__.escapeExpression = escapeExpression;
        function isEmpty(value) {
            if (!value && value !== 0) {
                return true;
            } else if (isArray(value) && value.length === 0) {
                return true;
            } else {
                return false;
            }
        }
        __exports__.isEmpty = isEmpty;
        return __exports__;
    })(__module3__);
    var __module4__ = (function() {
        "use strict";
        var __exports__;
        var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
        function Exception() {
            var tmp = Error.prototype.constructor.apply(this, arguments);
            for (var idx = 0; idx < errorProps.length; idx++) {
                this[errorProps[idx]] = tmp[errorProps[idx]];
            }
        }
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
        var REVISION_CHANGES = {
            1: '<= 1.0.rc.2',
            2: '== 1.0.0-rc.3',
            3: '== 1.0.0-rc.4',
            4: '>= 1.0.0'
        };
        __exports__.REVISION_CHANGES = REVISION_CHANGES;
        var isArray = Utils.isArray
          , isFunction = Utils.isFunction
          , toString = Utils.toString
          , objectType = '[object Object]';
        function HandlebarsEnvironment(helpers, partials) {
            this.helpers = helpers || {};
            this.partials = partials || {};
            registerDefaultHelpers(this);
        }
        __exports__.HandlebarsEnvironment = HandlebarsEnvironment;
        HandlebarsEnvironment.prototype = {
            constructor: HandlebarsEnvironment,
            logger: logger,
            log: log,
            registerHelper: function(name, fn, inverse) {
                if (toString.call(name) === objectType) {
                    if (inverse || fn) {
                        throw new Exception('Arg not supported with multiple helpers');
                    }
                    Utils.extend(this.helpers, name);
                } else {
                    if (inverse) {
                        fn.not = inverse;
                    }
                    this.helpers[name] = fn;
                }
            },
            registerPartial: function(name, str) {
                if (toString.call(name) === objectType) {
                    Utils.extend(this.partials, name);
                } else {
                    this.partials[name] = str;
                }
            }
        };
        function registerDefaultHelpers(instance) {
            instance.registerHelper('helperMissing', function(arg) {
                if (arguments.length === 2) {
                    return undefined;
                } else {
                    throw new Error("Missing helper: '" + arg + "'");
                }
            });
            instance.registerHelper('blockHelperMissing', function(context, options) {
                var inverse = options.inverse || function() {}
                  , fn = options.fn;
                if (isFunction(context)) {
                    context = context.call(this);
                }
                if (context === true) {
                    return fn(this);
                } else if (context === false || context == null ) {
                    return inverse(this);
                } else if (isArray(context)) {
                    if (context.length > 0) {
                        return instance.helpers.each(context, options);
                    } else {
                        return inverse(this);
                    }
                } else {
                    return fn(context);
                }
            });
            instance.registerHelper('each', function(context, options) {
                var fn = options.fn
                  , inverse = options.inverse;
                var i = 0, ret = "", data;
                if (isFunction(context)) {
                    context = context.call(this);
                }
                if (options.data) {
                    data = createFrame(options.data);
                }
                if (context && typeof context === 'object') {
                    if (isArray(context)) {
                        for (var j = context.length; i < j; i++) {
                            if (data) {
                                data.index = i;
                                data.first = (i === 0)
                                data.last = (i === (context.length - 1));
                            }
                            ret = ret + fn(context[i], {
                                data: data
                            });
                        }
                    } else {
                        for (var key in context) {
                            if (context.hasOwnProperty(key)) {
                                if (data) {
                                    data.key = key;
                                }
                                ret = ret + fn(context[key], {
                                    data: data
                                });
                                i++;
                            }
                        }
                    }
                }
                if (i === 0) {
                    ret = inverse(this);
                }
                return ret;
            });
            instance.registerHelper('if', function(conditional, options) {
                if (isFunction(conditional)) {
                    conditional = conditional.call(this);
                }
                if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
                    return options.inverse(this);
                } else {
                    return options.fn(this);
                }
            });
            instance.registerHelper('unless', function(conditional, options) {
                return instance.helpers['if'].call(this, conditional, {
                    fn: options.inverse,
                    inverse: options.fn,
                    hash: options.hash
                });
            });
            instance.registerHelper('with', function(context, options) {
                if (isFunction(context)) {
                    context = context.call(this);
                }
                if (!Utils.isEmpty(context))
                    return options.fn(context);
            });
            instance.registerHelper('log', function(context, options) {
                var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
                instance.log(level, context);
            });
        }
        var logger = {
            methodMap: {
                0: 'debug',
                1: 'info',
                2: 'warn',
                3: 'error'
            },
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 3,
            log: function(level, obj) {
                if (logger.level <= level) {
                    var method = logger.methodMap[level];
                    if (typeof console !== 'undefined' && console[method]) {
                        console[method].call(console, obj);
                    }
                }
            }
        };
        __exports__.logger = logger;
        function log(level, obj) {
            logger.log(level, obj);
        }
        __exports__.log = log;
        var createFrame = function(object) {
            var obj = {};
            Utils.extend(obj, object);
            return obj;
        }
        ;
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
            var compilerRevision = compilerInfo && compilerInfo[0] || 1
              , currentRevision = COMPILER_REVISION;
            if (compilerRevision !== currentRevision) {
                if (compilerRevision < currentRevision) {
                    var runtimeVersions = REVISION_CHANGES[currentRevision]
                      , compilerVersions = REVISION_CHANGES[compilerRevision];
                    throw new Error("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
                } else {
                    throw new Error("Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + compilerInfo[1] + ").");
                }
            }
        }
        function template(templateSpec, env) {
            if (!env) {
                throw new Error("No environment passed to template");
            }
            var invokePartialWrapper;
            if (env.compile) {
                invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
                    var result = invokePartial.apply(this, arguments);
                    if (result) {
                        return result;
                    }
                    var options = {
                        helpers: helpers,
                        partials: partials,
                        data: data
                    };
                    partials[name] = env.compile(partial, {
                        data: data !== undefined
                    }, env);
                    return partials[name](context, options);
                }
                ;
            } else {
                invokePartialWrapper = function(partial, name) {
                    var result = invokePartial.apply(this, arguments);
                    if (result) {
                        return result;
                    }
                    throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
                }
                ;
            }
            var container = {
                escapeExpression: Utils.escapeExpression,
                invokePartial: invokePartialWrapper,
                programs: [],
                program: function(i, fn, data) {
                    var programWrapper = this.programs[i];
                    if (data) {
                        programWrapper = program(i, fn, data);
                    } else if (!programWrapper) {
                        programWrapper = this.programs[i] = program(i, fn);
                    }
                    return programWrapper;
                },
                merge: function(param, common) {
                    var ret = param || common;
                    if (param && common && (param !== common)) {
                        ret = {};
                        Utils.extend(ret, common);
                        Utils.extend(ret, param);
                    }
                    return ret;
                },
                programWithDepth: programWithDepth,
                noop: noop,
                compilerInfo: null
            };
            return function(context, options) {
                options = options || {};
                var namespace = options.partial ? options : env, helpers, partials;
                if (!options.partial) {
                    helpers = options.helpers;
                    partials = options.partials;
                }
                var result = templateSpec.call(container, namespace, context, helpers, partials, options.data);
                if (!options.partial) {
                    checkRevision(container.compilerInfo);
                }
                return result;
            }
            ;
        }
        __exports__.template = template;
        function programWithDepth(i, fn, data) {
            var args = Array.prototype.slice.call(arguments, 3);
            var prog = function(context, options) {
                options = options || {};
                return fn.apply(this, [context, options.data || data].concat(args));
            }
            ;
            prog.program = i;
            prog.depth = args.length;
            return prog;
        }
        __exports__.programWithDepth = programWithDepth;
        function program(i, fn, data) {
            var prog = function(context, options) {
                options = options || {};
                return fn(context, options.data || data);
            }
            ;
            prog.program = i;
            prog.depth = 0;
            return prog;
        }
        __exports__.program = program;
        function invokePartial(partial, name, context, helpers, partials, data) {
            var options = {
                partial: true,
                helpers: helpers,
                partials: partials,
                data: data
            };
            if (partial === undefined) {
                throw new Exception("The partial " + name + " could not be found");
            } else if (partial instanceof Function) {
                return partial(context, options);
            }
        }
        __exports__.invokePartial = invokePartial;
        function noop() {
            return "";
        }
        __exports__.noop = noop;
        return __exports__;
    })(__module2__, __module4__, __module1__);
    var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
        "use strict";
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
                return runtime.template(spec, hb);
            }
            ;
            return hb;
        }
        ;
        var Handlebars = create();
        Handlebars.create = create;
        __exports__ = Handlebars;
        return __exports__;
    })(__module1__, __module3__, __module4__, __module2__, __module5__);
    return __module0__;
})();
;(function($, undefined) {
    var tag2attr = {
        a: 'href',
        img: 'src',
        form: 'action',
        base: 'href',
        script: 'src',
        iframe: 'src',
        link: 'href'
    }
      , key = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"]
      , aliases = {
        "anchor": "fragment"
    }
      , parser = {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
      , querystring_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g
      , fragment_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g;
    function parseUri(url, strictMode) {
        var str = decodeURI(url)
          , res = parser[strictMode || false ? "strict" : "loose"].exec(str)
          , uri = {
            attr: {},
            param: {},
            seg: {}
        }
          , i = 14;
        while (i--) {
            uri.attr[key[i]] = res[i] || "";
        }
        uri.param['query'] = {};
        uri.param['fragment'] = {};
        uri.attr['query'].replace(querystring_parser, function($0, $1, $2) {
            if ($1) {
                uri.param['query'][$1] = $2;
            }
        });
        uri.attr['fragment'].replace(fragment_parser, function($0, $1, $2) {
            if ($1) {
                uri.param['fragment'][$1] = $2;
            }
        });
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g, '').split('/');
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g, '').split('/');
        uri.attr['base'] = uri.attr.host ? uri.attr.protocol + "://" + uri.attr.host + (uri.attr.port ? ":" + uri.attr.port : '') : '';
        return uri;
    }
    ;function getAttrName(elm) {
        var tn = elm.tagName;
        if (tn !== undefined)
            return tag2attr[tn.toLowerCase()];
        return tn;
    }
    $.fn.url = function(strictMode) {
        var url = '';
        if (this.length) {
            url = $(this).attr(getAttrName(this[0])) || '';
        }
        return $.url(url, strictMode);
    }
    ;
    $.url = function(url, strictMode) {
        if (arguments.length === 1 && url === true) {
            strictMode = true;
            url = undefined;
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();
        return {
            data: parseUri(url, strictMode),
            attr: function(attr) {
                attr = aliases[attr] || attr;
                return attr !== undefined ? this.data.attr[attr] : this.data.attr;
            },
            param: function(param) {
                return param !== undefined ? this.data.param.query[param] : this.data.param.query;
            },
            fparam: function(param) {
                return param !== undefined ? this.data.param.fragment[param] : this.data.param.fragment;
            },
            segment: function(seg) {
                if (seg === undefined) {
                    return this.data.seg.path;
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1;
                    return this.data.seg.path[seg];
                }
            },
            fsegment: function(seg) {
                if (seg === undefined) {
                    return this.data.seg.fragment;
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1;
                    return this.data.seg.fragment[seg];
                }
            }
        };
    }
    ;
})(jQuery);
jQuery.cookie = function(key, value, options) {
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires
              , t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        value = String(value);
        return ( document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('')) ;
    }
    options = value || {};
    var result, decode = options.raw ? function(s) {
        return s;
    }
    : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null ;
}
;
(function(jQuery, undefined) {
    var oldManip = jQuery.fn.domManip, tmplItmAtt = "_tmplitem", htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, newTmplItems = {}, wrappedItems = {}, appendToTmplItems, topTmplItem = {
        key: 0,
        data: {}
    }, itemKey = 0, cloneIndex = 0, stack = [];
    function newTmplItem(options, parentItem, fn, data) {
        var newItem = {
            data: data || (parentItem ? parentItem.data : {}),
            _wrap: parentItem ? parentItem._wrap : null ,
            tmpl: null ,
            parent: parentItem || null ,
            nodes: [],
            calls: tiCalls,
            nest: tiNest,
            wrap: tiWrap,
            html: tiHtml,
            update: tiUpdate
        };
        if (options) {
            jQuery.extend(newItem, options, {
                nodes: [],
                parent: parentItem
            });
        }
        if (fn) {
            newItem.tmpl = fn;
            newItem._ctnt = newItem._ctnt || newItem.tmpl(jQuery, newItem);
            newItem.key = ++itemKey;
            (stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
        }
        return newItem;
    }
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var ret = [], insert = jQuery(selector), elems, i, l, tmplItems, parent = this.length === 1 && this[0].parentNode;
            appendToTmplItems = newTmplItems || {};
            if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[original](this[0]);
                ret = this;
            } else {
                for (i = 0,
                l = insert.length; i < l; i++) {
                    cloneIndex = i;
                    elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery.fn[original].apply(jQuery(insert[i]), elems);
                    ret = ret.concat(elems);
                }
                cloneIndex = 0;
                ret = this.pushStack(ret, name, insert.selector);
            }
            tmplItems = appendToTmplItems;
            appendToTmplItems = null ;
            jQuery.tmpl.complete(tmplItems);
            return ret;
        }
        ;
    });
    jQuery.fn.extend({
        tmpl: function(data, options, parentItem) {
            return jQuery.tmpl(this[0], data, options, parentItem);
        },
        tmplItem: function() {
            return jQuery.tmplItem(this[0]);
        },
        template: function(name) {
            return jQuery.template(name, this[0]);
        },
        domManip: function(args, table, callback, options) {
            if (args[0] && args[0].nodeType) {
                var dmArgs = jQuery.makeArray(arguments), argsLength = args.length, i = 0, tmplItem;
                while (i < argsLength && !(tmplItem = jQuery.data(args[i++], "tmplItem"))) {}
                if (argsLength > 1) {
                    dmArgs[0] = [jQuery.makeArray(args)];
                }
                if (tmplItem && cloneIndex) {
                    dmArgs[2] = function(fragClone) {
                        jQuery.tmpl.afterManip(this, fragClone, callback);
                    }
                    ;
                }
                oldManip.apply(this, dmArgs);
            } else {
                oldManip.apply(this, arguments);
            }
            cloneIndex = 0;
            if (!appendToTmplItems) {
                jQuery.tmpl.complete(newTmplItems);
            }
            return this;
        }
    });
    jQuery.extend({
        tmpl: function(tmpl, data, options, parentItem) {
            var ret, topLevel = !parentItem;
            if (topLevel) {
                parentItem = topTmplItem;
                tmpl = jQuery.template[tmpl] || jQuery.template(null , tmpl);
                wrappedItems = {};
            } else if (!tmpl) {
                tmpl = parentItem.tmpl;
                newTmplItems[parentItem.key] = parentItem;
                parentItem.nodes = [];
                if (parentItem.wrapped) {
                    updateWrapped(parentItem, parentItem.wrapped);
                }
                return jQuery(build(parentItem, null , parentItem.tmpl(jQuery, parentItem)));
            }
            if (!tmpl) {
                return [];
            }
            if (typeof data === "function") {
                data = data.call(parentItem || {});
            }
            if (options && options.wrapped) {
                updateWrapped(options, options.wrapped);
            }
            ret = jQuery.isArray(data) ? jQuery.map(data, function(dataItem) {
                return dataItem ? newTmplItem(options, parentItem, tmpl, dataItem) : null ;
            }) : [newTmplItem(options, parentItem, tmpl, data)];
            return topLevel ? jQuery(build(parentItem, null , ret)) : ret;
        },
        tmplItem: function(elem) {
            var tmplItem;
            if (elem instanceof jQuery) {
                elem = elem[0];
            }
            while (elem && elem.nodeType === 1 && !(tmplItem = jQuery.data(elem, "tmplItem")) && (elem = elem.parentNode)) {}
            return tmplItem || topTmplItem;
        },
        template: function(name, tmpl) {
            if (tmpl) {
                if (typeof tmpl === "string") {
                    tmpl = buildTmplFn(tmpl)
                } else if (tmpl instanceof jQuery) {
                    tmpl = tmpl[0] || {};
                }
                if (tmpl.nodeType) {
                    tmpl = jQuery.data(tmpl, "tmpl") || jQuery.data(tmpl, "tmpl", buildTmplFn(tmpl.innerHTML));
                }
                return typeof name === "string" ? (jQuery.template[name] = tmpl) : tmpl;
            }
            return name ? (typeof name !== "string" ? jQuery.template(null , name) : (jQuery.template[name] || jQuery.template(null , htmlExpr.test(name) ? name : jQuery(name)))) : null ;
        },
        encode: function(text) {
            return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
        }
    });
    jQuery.extend(jQuery.tmpl, {
        tag: {
            "tmpl": {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
            },
            "wrap": {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(_,$1,$2);_=[];",
                close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
            },
            "each": {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            "html": {
                open: "if($notnull_1){_.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){_.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function(items) {
            newTmplItems = {};
        },
        afterManip: function afterManip(elem, fragClone, callback) {
            var content = fragClone.nodeType === 11 ? jQuery.makeArray(fragClone.childNodes) : fragClone.nodeType === 1 ? [fragClone] : [];
            callback.call(elem, fragClone);
            storeTmplItems(content);
            cloneIndex++;
        }
    });
    function build(tmplItem, nested, content) {
        var frag, ret = content ? jQuery.map(content, function(item) {
            return (typeof item === "string") ? (tmplItem.key ? item.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2") : item) : build(item, tmplItem, item._ctnt);
        }) : tmplItem;
        if (nested) {
            return ret;
        }
        ret = ret.join("");
        ret.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(all, before, middle, after) {
            frag = jQuery(middle).get();
            storeTmplItems(frag);
            if (before) {
                frag = unencode(before).concat(frag);
            }
            if (after) {
                frag = frag.concat(unencode(after));
            }
        });
        return frag ? frag : unencode(ret);
    }
    function unencode(text) {
        var el = document.createElement("div");
        el.innerHTML = text;
        return jQuery.makeArray(el.childNodes);
    }
    function buildTmplFn(markup) {
        return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;" + "with($data){_.push('" + jQuery.trim(markup).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(all, slash, type, fnargs, target, parens, args) {
            var tag = jQuery.tmpl.tag[type], def, expr, exprAutoFnDetect;
            if (!tag) {
                throw "Template command not found: " + type;
            }
            def = tag._default || [];
            if (parens && !/\w$/.test(target)) {
                target += parens;
                parens = "";
            }
            if (target) {
                target = unescape(target);
                args = args ? ("," + unescape(args) + ")") : (parens ? ")" : "");
                expr = parens ? (target.indexOf(".") > -1 ? target + parens : ("(" + target + ").call($item" + args)) : target;
                exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
            } else {
                exprAutoFnDetect = expr = def.$1 || "null";
            }
            fnargs = unescape(fnargs);
            return "');" + tag[slash ? "close" : "open"].split("$notnull_1").join(target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true").split("$1a").join(exprAutoFnDetect).split("$1").join(expr).split("$2").join(fnargs ? fnargs.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function(all, name, parens, params) {
                params = params ? ("," + params + ")") : (parens ? ")" : "");
                return params ? ("(" + name + ").call($item" + params) : all;
            }) : (def.$2 || "")) + "_.push('";
        }) + "');}return _;");
    }
    function updateWrapped(options, wrapped) {
        options._wrap = build(options, true, jQuery.isArray(wrapped) ? wrapped : [htmlExpr.test(wrapped) ? wrapped : jQuery(wrapped).html()]).join("");
    }
    function unescape(args) {
        return args ? args.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null ;
    }
    function outerHtml(elem) {
        var div = document.createElement("div");
        div.appendChild(elem.cloneNode(true));
        return div.innerHTML;
    }
    function storeTmplItems(content) {
        var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
        for (i = 0,
        l = content.length; i < l; i++) {
            if ((elem = content[i]).nodeType !== 1) {
                continue;
            }
            elems = elem.getElementsByTagName("*");
            for (m = elems.length - 1; m >= 0; m--) {
                processItemKey(elems[m]);
            }
            processItemKey(elem);
        }
        function processItemKey(el) {
            var pntKey, pntNode = el, pntItem, tmplItem, key;
            if ((key = el.getAttribute(tmplItmAtt)) ) {
                while (pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute(tmplItmAtt))) {}
                if (pntKey !== key) {
                    pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute(tmplItmAtt) || 0)) : 0;
                    if (!(tmplItem = newTmplItems[key])) {
                        tmplItem = wrappedItems[key];
                        tmplItem = newTmplItem(tmplItem, newTmplItems[pntNode] || wrappedItems[pntNode], null , true);
                        tmplItem.key = ++itemKey;
                        newTmplItems[itemKey] = tmplItem;
                    }
                    if (cloneIndex) {
                        cloneTmplItem(key);
                    }
                }
                el.removeAttribute(tmplItmAtt);
            } else if (cloneIndex && (tmplItem = jQuery.data(el, "tmplItem"))) {
                cloneTmplItem(tmplItem.key);
                newTmplItems[tmplItem.key] = tmplItem;
                pntNode = jQuery.data(el.parentNode, "tmplItem");
                pntNode = pntNode ? pntNode.key : 0;
            }
            if (tmplItem) {
                pntItem = tmplItem;
                while (pntItem && pntItem.key != pntNode) {
                    pntItem.nodes.push(el);
                    pntItem = pntItem.parent;
                }
                delete tmplItem._ctnt;
                delete tmplItem._wrap;
                jQuery.data(el, "tmplItem", tmplItem);
            }
            function cloneTmplItem(key) {
                key = key + keySuffix;
                tmplItem = newClonedItems[key] = (newClonedItems[key] || newTmplItem(tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent, null , true));
            }
        }
    }
    function tiCalls(content, tmpl, data, options) {
        if (!content) {
            return stack.pop();
        }
        stack.push({
            _: content,
            tmpl: tmpl,
            item: this,
            data: data,
            options: options
        });
    }
    function tiNest(tmpl, data, options) {
        return jQuery.tmpl(jQuery.template(tmpl), data, options, this);
    }
    function tiWrap(call, wrapped) {
        var options = call.options || {};
        options.wrapped = wrapped;
        return jQuery.tmpl(jQuery.template(call.tmpl), call.data, options, call.item);
    }
    function tiHtml(filter, textOnly) {
        var wrapped = this._wrap;
        return jQuery.map(jQuery(jQuery.isArray(wrapped) ? wrapped.join("") : wrapped).filter(filter || "*"), function(e) {
            return textOnly ? e.innerText || e.textContent : e.outerHTML || outerHtml(e);
        });
    }
    function tiUpdate() {
        var coll = this.nodes;
        jQuery.tmpl(null , null , null , this).insertBefore(coll[0]);
        jQuery(coll).remove();
    }
})(jQuery);
this["JST"] = this["JST"] || {};
Handlebars.registerPartial("polls/_answer-item", Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression;
    buffer += "<li class=\"results\">\n<div>\n<div class=\"answer\">";
    if (stack1 = helpers.text) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.text;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\n<span class=\"line-sep\"></span>\n</div>\n<div class=\"pct\">";
    if (stack1 = helpers.percent) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.percent;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "</div>\n</div>\n</li>";
    return buffer;
}));
Handlebars.registerPartial("polls/_choice-item", Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression;
    buffer += "<li class=\"options\">\n<!-- The span is used to display the graphical checkbox -->\n<input type=\"radio\" name=\"answer\" value=\"";
    if (stack1 = helpers.id) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.id;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\"><span></span>\n";
    if (stack1 = helpers.text) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.text;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\n</li>";
    return buffer;
}));
Handlebars.registerPartial("search/_search-results", Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, options, functionType = "function", escapeExpression = this.escapeExpression, self = this, blockHelperMissing = helpers.blockHelperMissing;
    function program1(depth0, data) {
        return "articles";
    }
    function program3(depth0, data) {
        return "photos";
    }
    function program5(depth0, data) {
        return "<h3 class=\"search-heading\">Latest News</h3>";
    }
    function program7(depth0, data) {
        var buffer = "", stack1, options;
        buffer += "\n        ";
        options = {
            hash: {},
            inverse: self.programWithDepth(8, program8, data, depth0),
            fn: self.noop,
            data: data
        };
        if (stack1 = helpers.last) {
            stack1 = stack1.call(depth0, options);
        } else {
            stack1 = depth0.last;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (!helpers.last) {
            stack1 = blockHelperMissing.call(depth0, stack1, options);
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n      ";
        return buffer;
    }
    function program8(depth0, data, depth1) {
        var buffer = "", stack1, stack2;
        buffer += "\n            <li class=\"";
        stack1 = helpers['if'].call(depth0, depth1.galleries, {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "clearfix\">\n                <div class=\"";
        stack1 = helpers['if'].call(depth0, depth1.galleries, {
            hash: {},
            inverse: self.program(13, program13, data),
            fn: self.program(11, program11, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += " clearfix\">\n                    <a data-adid=\"TMZ_Search_Results\" class=\"has-adid\" href=\"/";
        if (stack1 = helpers.url) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.url;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">\n                        <img src=\"";
        stack1 = helpers['if'].call(depth0, depth0.primaryImage, {
            hash: {},
            inverse: self.program(17, program17, data),
            fn: self.program(15, program15, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\" />\n                    </a>\n                </div>\n                <div class=\"title\"><a data-adid=\"TMZ_Search_Results\" class=\"has-adid\" href=\"/";
        if (stack1 = helpers.url) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.url;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">";
        if (stack1 = helpers.title) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.title;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "</a><br /></div>\n              ";
        stack2 = ((stack1 = ((stack1 = depth1.galleries),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),
        blockHelperMissing.call(depth0, stack1, {
            hash: {},
            inverse: self.program(19, program19, data),
            fn: self.noop,
            data: data
        }));
        if (stack2 || stack2 === 0) {
            buffer += stack2;
        }
        buffer += "\n            </li>\n        ";
        return buffer;
    }
    function program9(depth0, data) {
        return "photo ";
    }
    function program11(depth0, data) {
        return "thumb";
    }
    function program13(depth0, data) {
        return "all-thumb";
    }
    function program15(depth0, data) {
        var stack1;
        if (stack1 = helpers.primaryImage) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.primaryImage;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        return escapeExpression(stack1);
    }
    function program17(depth0, data) {
        var buffer = "", stack1;
        if (stack1 = helpers.ASSETS_BASEURL) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.ASSETS_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "images/tmz_logo_default_100px.gif";
        return buffer;
    }
    function program19(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n                  <div class=\"snippet\"><span>";
        if (stack1 = helpers.date) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.date;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + " - </span>";
        if (stack1 = helpers.contents) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.contents;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "<br /></div>\n                  <div class=\"display-url\">";
        if (stack1 = helpers.SITE_BASEURL) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.SITE_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1);
        if (stack1 = helpers.url) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.url;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "</div>\n              ";
        return buffer;
    }
    function program21(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n      <span class=\"previous\"><a href=\"/search/";
        if (stack1 = helpers.searchType) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.searchType;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "/";
        if (stack1 = helpers.query) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.query;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "/page/";
        if (stack1 = helpers.prevPage) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.prevPage;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">Previous</a></span>\n  ";
        return buffer;
    }
    function program23(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n      <span class=\"next\"><a href=\"/search/";
        if (stack1 = helpers.searchType) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.searchType;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "/";
        if (stack1 = helpers.query) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.query;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "/page/";
        if (stack1 = helpers.nextPage) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.nextPage;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">Next >></a></span>\n  ";
        return buffer;
    }
    buffer += "<div class=\"gsa-results gsa-";
    stack1 = helpers['if'].call(depth0, depth0.news, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    stack1 = helpers['if'].call(depth0, depth0.galleries, {
        hash: {},
        inverse: self.noop,
        fn: self.program(3, program3, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "-results\">\n    <div id=\"search_celebs\"></div>\n    ";
    stack1 = helpers['if'].call(depth0, depth0.news, {
        hash: {},
        inverse: self.noop,
        fn: self.program(5, program5, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n    <ul>\n      ";
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.program(7, program7, data),
        data: data
    };
    if (stack1 = helpers.posts) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.posts;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.posts) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n    </ul>\n</div>\n<div class=\"gsa-paging\">\n    <!-- pagination links -->\n  ";
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.program(21, program21, data),
        data: data
    };
    if (stack1 = helpers.hasPrevPage) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.hasPrevPage;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.hasPrevPage) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n  ";
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.program(23, program23, data),
        data: data
    };
    if (stack1 = helpers.hasNextPage) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.hasNextPage;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.hasNextPage) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n</div>\n";
    return buffer;
}));
this["JST"]["community/member-comments"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, options, functionType = "function", escapeExpression = this.escapeExpression, self = this, blockHelperMissing = helpers.blockHelperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1, stack2;
        buffer += "\n<li class=\"comment-item group\">\n<div class=\"comment-image\">\n<img src=\"" + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.object),
        stack1 == null || stack1 === false ? stack1 : stack1.author)),
        stack1 == null || stack1 === false ? stack1 : stack1.avatar)),
        stack1 == null || stack1 === false ? stack1 : stack1.small)),
        stack1 == null || stack1 === false ? stack1 : stack1.cache)),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "\" height=\"50\" width=\"50\" alt=\"Avatar\" />\n</div>\n<div class=\"comment-single\">\n<div class=\"left\">\n<h3><a href=\"";
        stack2 = ((stack1 = ((stack1 = depth0.object),
        stack1 == null || stack1 === false ? stack1 : stack1.url)),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
        if (stack2 || stack2 === 0) {
            buffer += stack2;
        }
        buffer += "\">";
        stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.object),
        stack1 == null || stack1 === false ? stack1 : stack1.thread)),
        stack1 == null || stack1 === false ? stack1 : stack1.title)),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
        if (stack2 || stack2 === 0) {
            buffer += stack2;
        }
        buffer += "</a></h3>\n<div class=\"comment-text\">" + escapeExpression(((stack1 = ((stack1 = depth0.object),
        stack1 == null || stack1 === false ? stack1 : stack1.raw_message)),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</div>\n<div class=\"comment-meta\">\n<a href=\"/my-tmz/\">" + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.object),
        stack1 == null || stack1 === false ? stack1 : stack1.author)),
        stack1 == null || stack1 === false ? stack1 : stack1.name)),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</a>&nbsp;&nbsp;" + escapeExpression(((stack1 = ((stack1 = depth0.object),
        stack1 == null || stack1 === false ? stack1 : stack1.daysAgo)),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + " DAYS AGO\n</div>\n</div>\n</div>\n</li>\n";
        return buffer;
    }
    function program3(depth0, data) {
        return "\n<li class=\"comment-item group\" style=\"margin-left:15px;\">No comments.</li>\n";
    }
    function program5(depth0, data) {
        var buffer = "", stack1, options;
        buffer += "\n<div class=\"pagination\">\n";
        options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(6, program6, data),
            data: data
        };
        if (stack1 = helpers.hasPrev) {
            stack1 = stack1.call(depth0, options);
        } else {
            stack1 = depth0.hasPrev;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (!helpers.hasPrev) {
            stack1 = blockHelperMissing.call(depth0, stack1, options);
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n\n";
        options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(8, program8, data),
            data: data
        };
        if (stack1 = helpers.hasNext) {
            stack1 = stack1.call(depth0, options);
        } else {
            stack1 = depth0.hasNext;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (!helpers.hasNext) {
            stack1 = blockHelperMissing.call(depth0, stack1, options);
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n</div>\n";
        return buffer;
    }
    function program6(depth0, data) {
        return "\n<a href=\"#\" data-cursor=\"prev\">Previous</a>\n";
    }
    function program8(depth0, data) {
        return "\n<a href=\"#\" data-cursor=\"next\">Next</a>\n";
    }
    buffer += "<!-- Comments -->\n<ul class=\"comments-list group\">\n<!-- If comments -->\n";
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    };
    if (stack1 = helpers.response) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.response;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.response) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n\n<!-- No Comments -->\n";
    options = {
        hash: {},
        inverse: self.program(3, program3, data),
        fn: self.noop,
        data: data
    };
    if (stack1 = helpers.response) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.response;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.response) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n</ul>\n\n<!-- Pagination -->\n";
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.program(5, program5, data),
        data: data
    };
    if (stack1 = helpers.pagination) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.pagination;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.pagination) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    return buffer;
});
this["JST"]["header/user-nav"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression;
    buffer += "<li class=\"user-wrap\">\n<a href=\"#\" class=\"userThumb\" title=\"";
    if (stack1 = helpers.userTitle) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.userTitle;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\"><img src=\"";
    if (stack1 = helpers.userThumb) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.userThumb;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" alt=\"thumbnail_";
    if (stack1 = helpers.userTitle) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.userTitle;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" width=\"50\" height=\"50\"/></a>\n<aside class=\"my-tmz-box\">\n    <div class=\"arrow-up\"></div>\n    <div class=\"qlf-container\">\n    <h2><a href=\"/my-tmz\">MY TMZ</a></h2>\n    <a href=\"/signout\">SIGN OUT</a>\n    </div>\n  </aside>\n</li>\n";
    return buffer;
});
this["JST"]["photos/ad-partial"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression;
    buffer += "<div class=\"category-divider\">\n    <div class=\"ad-title\">ADVERTISEMENT</div>\n    <div align=\"center\" class=\"ad-container wbads\" data-adsize=\"leaderboard\" data-pos=\"bottom\" data-tile=\"";
    if (stack1 = helpers.ad) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.ad;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\"></div>\n</div>\n";
    return buffer;
});
this["JST"]["photos/ad"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    return "<div class=\"gallery-slide gallery-ad-slide\">\n  <div class=\"gallery-ad-wrap\"> \n    <div class=\"title\">ADVERTISEMENT</div>\n    <div class=\"gallery-ad-container\"></div>\n  </div>\n</div>";
});
this["JST"]["photos/categories"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n\n<div class=\"gallery-featured\">\n    <ul>\n        ";
        stack1 = helpers.each.call(depth0, depth0.items, {
            hash: {},
            inverse: self.noop,
            fn: self.program(2, program2, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n    </ul>\n</div>\n\n";
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1, stack2;
        buffer += "\n        <li class=\"gallery-item\">\n            <a href=\"";
        if (stack1 = helpers.link) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.link;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">\n                <img class=\"item-bg\" src=\"";
        if (stack1 = helpers.thumbnailUrl) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.thumbnailUrl;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\" />\n                <div class=\"image-fade\"></div>\n                <div class=\"content\">\n                    <div class=\"icon-gallery\"></div>\n                    ";
        stack2 = helpers['if'].call(depth0, ((stack1 = data),
        stack1 == null || stack1 === false ? stack1 : stack1.first), {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        });
        if (stack2 || stack2 === 0) {
            buffer += stack2;
        }
        buffer += "\n                    <h2 class=\"item-title\">";
        if (stack2 = helpers.title) {
            stack2 = stack2.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack2 = depth0.title;
            stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
        }
        if (stack2 || stack2 === 0) {
            buffer += stack2;
        }
        buffer += "</h2>\n                </div>\n            </a>\n        </li>\n        ";
        return buffer;
    }
    function program3(depth0, data) {
        return "\n                      <h3 class=\"item-tag\">Featured Gallery</h3>\n                    ";
    }
    function program5(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n\n<div class=\"category-wrapper\">\n    <div class=\"category-section\">\n        <h1 class=\"category-title\">";
        if (stack1 = helpers.categoryTitle) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.categoryTitle;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "</h1>\n        <a class=\"category-link\" href=\"/photos/category/";
        if (stack1 = helpers.slug) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.slug;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\"><span>&#9658;&nbsp;</span> More from this category</a>\n        <ul class=\"";
        if (stack1 = helpers.gridType) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.gridType;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">\n          ";
        stack1 = helpers.each.call(depth0, depth0.items, {
            hash: {},
            inverse: self.noop,
            fn: self.program(6, program6, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n        </ul>\n    </div>\n</div>\n\n";
        return buffer;
    }
    function program6(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n            <li>\n                <a href=\"";
        if (stack1 = helpers.link) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.link;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">\n                    <div class=\"gallery-bg\">\n                        <img class=\"bg-img\" src=\"";
        if (stack1 = helpers.thumbnailUrl) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.thumbnailUrl;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\" />\n                        <div class=\"icon-gallery\"></div>\n                    </div>\n                    <h2 class=\"item-title\">";
        if (stack1 = helpers.title) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.title;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "</h2>\n                </a>\n            </li>\n          ";
        return buffer;
    }
    stack1 = helpers['if'].call(depth0, depth0.featured, {
        hash: {},
        inverse: self.program(5, program5, data),
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n";
    return buffer;
});
this["JST"]["photos/fork"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression, self = this;
    function program1(depth0, data) {
        return "gallery-end-slide";
    }
    function program3(depth0, data) {
        return "gallery-replay";
    }
    function program5(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n      <div class=\"keep-going\">KEEP GOING!</div>\n      <div class=\"more-photos\">";
        if (stack1 = helpers.imagesLeft) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.imagesLeft;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + " MORE PHOTOS</div>\n      ";
        return buffer;
    }
    function program7(depth0, data) {
        var buffer = "", stack1, stack2;
        buffer += "\n      <li class=\"recent-gallery\">\n        <a href=\"" + escapeExpression(((stack1 = depth0.RecordLink),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "\" style=\"background-image:url(" + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.images),
        stack1 == null || stack1 === false ? stack1 : stack1[0])),
        stack1 == null || stack1 === false ? stack1 : stack1['thumbnails-json'])),
        stack1 == null || stack1 === false ? stack1 : stack1[5])),
        stack1 == null || stack1 === false ? stack1 : stack1.url)),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + ");\" target=\"_parent\">\n          <span class=\"recent-gallery-title\">";
        stack2 = ((stack1 = depth0.title),
        typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
        if (stack2 || stack2 === 0) {
            buffer += stack2;
        }
        buffer += "</span>\n        </a>\n      </li>\n    ";
        return buffer;
    }
    buffer += "<div class=\"gallery-slide gallery-fork-slide ";
    stack1 = helpers['if'].call(depth0, depth0.isEnd, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\">\n  <div class=\"gallery-fork-top\" style=\"background-image:url(";
    if (stack1 = helpers.bgImg) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.bgImg;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + ");\">\n    <div class=\"gallery-fork-top-content ";
    stack1 = helpers['if'].call(depth0, depth0.isEnd, {
        hash: {},
        inverse: self.noop,
        fn: self.program(3, program3, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\">\n      ";
    stack1 = helpers['if'].call(depth0, depth0.isFork, {
        hash: {},
        inverse: self.noop,
        fn: self.program(5, program5, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += " \n    </div>\n  </div>\n  <div class=\"gallery-fork-bottom\">\n    <div class=\"something-else\">MORE GALLERIES</div>\n    <ul class=\"recent-galleries\">\n    ";
    stack1 = helpers.each.call(depth0, depth0.relatedGalleries, {
        hash: {},
        inverse: self.noop,
        fn: self.program(7, program7, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n    </ul>\n  </div>\n</div>";
    return buffer;
});
this["JST"]["photos/grid"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression;
    buffer += "<div class=\"gallery-grid-thumb\" data-index=\"";
    if (stack1 = helpers.index) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.index;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" style=\"background-image: url(";
    if (stack1 = helpers.src) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.src;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + ");\"></div>";
    return buffer;
});
this["JST"]["photos/more-categories"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n    <li><a href=\"";
        if (stack1 = helpers.link) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.link;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\" data-slug=\"";
        if (stack1 = helpers.slug) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.slug;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">";
        if (stack1 = helpers.title) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.title;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "</a></li>\n  ";
        return buffer;
    }
    buffer += "<h2 class=\"looking-title\">LOOKING FOR MORE?</h2>\n<ul class=\"looking-list\">\n  ";
    stack1 = helpers.each.call(depth0, depth0.items, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n</ul>\n";
    return buffer;
});
this["JST"]["photos/poll"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n    <li class=\"poll-answer\" data-count=\"";
        if (stack1 = helpers.count) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.count;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\" data-id=\"";
        if (stack1 = helpers.id) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.id;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">\n      <span class=\"circle\"></span>\n      <span class=\"text\">";
        if (stack1 = helpers.text) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.text;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "</span>\n      <span class=\"percent\">";
        if (stack1 = helpers.percent) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.percent;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "%</span>\n    </li>\n  ";
        return buffer;
    }
    buffer += "<div class=\"related-poll clearfix\">\n  <div class=\"poll-title\">";
    if (stack1 = helpers.title) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.title;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "</div>\n  <ul class=\"poll-answers\">\n  ";
    stack1 = helpers.each.call(depth0, depth0.answers, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n  </ul>\n  <div class=\"poll-count\"><span>";
    if (stack1 = helpers.total) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.total;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "</span> VOTES</div>\n</div>";
    return buffer;
});
this["JST"]["photos/slide"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression;
    buffer += "<div class=\"gallery-slide gallery-image-slide\" data-index=\"";
    if (stack1 = helpers.index) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.index;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" data-caption=\"";
    if (stack1 = helpers.caption) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.caption;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" data-slug=\"";
    if (stack1 = helpers.slug) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.slug;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" data-credit=\"";
    if (stack1 = helpers.credit) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.credit;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" data-legacy-poll-code=\"";
    if (stack1 = helpers.legacyPollCode) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.legacyPollCode;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" data-related-poll-guid=\"";
    if (stack1 = helpers.relatedPollGuid) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.relatedPollGuid;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\">\n  <img class=\"hidden\" src=\"\" id=\"slide_";
    if (stack1 = helpers.index) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.index;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" data-src=\"";
    if (stack1 = helpers.src) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.src;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\" />\n  <div class=\"gallery-poll\"></div>\n</div>";
    return buffer;
});
this["JST"]["polls/poll-homepage-post-results"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    partials = this.merge(partials, Handlebars.partials);
    data = data || {};
    var buffer = "", stack1, stack2, self = this, functionType = "function", escapeExpression = this.escapeExpression;
    function program1(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n";
        stack1 = self.invokePartial(partials['polls/_answer-item'], 'polls/_answer-item', depth0, helpers, partials, data);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n";
        return buffer;
    }
    buffer += "<!-- Results Container -->\n<div id=\"poll-";
    if (stack1 = helpers.guid) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.guid;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "-results\" class=\"poll-results\" data-answers-template=\"polls/poll-homepage-post-results\">\n<div class=\"results-wrapper\">\n\n<!-- Answers -->\n<ul>\n";
    stack2 = helpers.each.call(depth0, ((stack1 = depth0.item),
    stack1 == null || stack1 === false ? stack1 : stack1.answers), {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack2 || stack2 === 0) {
        buffer += stack2;
    }
    buffer += "\n</ul>\n\n<span class=\"vote-tally\">\nTotal Votes: <span>";
    if (stack2 = helpers['total-votes']) {
        stack2 = stack2.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack2 = depth0['total-votes'];
        stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
    }
    buffer += escapeExpression(stack2) + "</span>\n</span>\n<a href=\"#\" class=\"note-toggle note-on\">*Poll Results</a>\n<div style=\"clear: both;\"></div>\n</div>\n\n<!-- Note on results -->\n<div class=\"note-on-results\">\n<p class=\"note\">\n<strong>NOTE:</strong> Poll results are not scientific and reflect\nthe opinions of only those users who chose to participate. Poll\nresults are not reflected in real time.\n</p>\n<div class=\"back-to-results\">\n<a href=\"#\" class=\"note-toggle\">Back to Poll Results</a>\n</div>\n</div>\n\n<!-- Voted Button -->\n<div class=\"voted-btn\">\n<span>VOTED</span>\n</div>\n</div>";
    return buffer;
});
this["JST"]["polls/poll-homepage-post-wide-results"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    partials = this.merge(partials, Handlebars.partials);
    data = data || {};
    var buffer = "", stack1, stack2, self = this, functionType = "function", escapeExpression = this.escapeExpression;
    function program1(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n";
        stack1 = self.invokePartial(partials['polls/_answer-item'], 'polls/_answer-item', depth0, helpers, partials, data);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n";
        return buffer;
    }
    buffer += "\n<div id=\"poll-";
    if (stack1 = helpers.guid) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.guid;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "-results\" class=\"poll-results\"\n     data-answers-template=\"polls/poll-homepage-post-wide-results\">\n    <div class=\"poll-title\">\n        <h3>";
    stack2 = ((stack1 = ((stack1 = depth0.item),
    stack1 == null || stack1 === false ? stack1 : stack1.title)),
    typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
    if (stack2 || stack2 === 0) {
        buffer += stack2;
    }
    buffer += "</h3>\n    </div>\n    <div class=\"poll-answers results-wrapper\">\n      " + "\n<ul class=\"results-list\">\n";
    stack2 = helpers.each.call(depth0, ((stack1 = depth0.item),
    stack1 == null || stack1 === false ? stack1 : stack1.answers), {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack2 || stack2 === 0) {
        buffer += stack2;
    }
    buffer += "\n</ul>\n        <div style=\"clear: both;\"></div>\n        <span class=\"vote-tally\">\n            Total Votes: <span>";
    if (stack2 = helpers['total-votes']) {
        stack2 = stack2.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack2 = depth0['total-votes'];
        stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
    }
    buffer += escapeExpression(stack2) + "</span>\n        </span>\n        <a href=\"#\" class=\"note-toggle note-on\">*Poll Results</a>\n\n    </div>\n\n  " + "\n  <div class=\"poll-answers note-on-results\">\n    <p class=\"note\">\n        <strong>NOTE:</strong> Poll results are not scientific and reflect\n        the opinions of only those users who chose to participate. Poll\n        results are not reflected in real time.\n    </p>\n\n    <div class=\"back-to-results\">\n        <a href=\"#\" class=\"note-toggle\">Back to Poll Results</a>\n    </div>\n  </div>\n\n  " + "\n  <div class=\"poll-submit voted-btn\">\n    <span>VOTED</span>\n  </div>\n</div>";
    return buffer;
});
this["JST"]["polls/poll-homepage-post-wide"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    partials = this.merge(partials, Handlebars.partials);
    data = data || {};
    var buffer = "", stack1, self = this, functionType = "function", escapeExpression = this.escapeExpression;
    function program1(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n                    ";
        stack1 = self.invokePartial(partials['polls/_choice-item'], 'polls/_choice-item', depth0, helpers, partials, data);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n                ";
        return buffer;
    }
    buffer += "<div class=\"poll\">\n    <form class=\"poll\" data-guid=\"";
    if (stack1 = helpers.guid) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.guid;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\">\n        " + "\n        <div class=\"poll-title\">\n            <h3>";
    if (stack1 = helpers.title) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.title;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "</h3>\n            <input type=\"hidden\" name=\"title\" value=\"";
    if (stack1 = helpers.title) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.title;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\"/>\n            " + "\n            <div id=\"poll-";
    if (stack1 = helpers.guid) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.guid;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "-message\" class=\"polls-message\"></div>\n        </div>\n        <div class=\"poll-answers\">\n            <ul>\n                ";
    stack1 = helpers.each.call(depth0, depth0.answers, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n            </ul>\n        </div>\n        <div class=\"poll-submit\">\n            " + "\n            <button type=\"button\" value=\"VOTE\" class=\"btn-vote\">VOTE</button>\n        </div>\n    </form>\n</div>";
    return buffer;
});
this["JST"]["polls/poll-homepage-post"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    partials = this.merge(partials, Handlebars.partials);
    data = data || {};
    var buffer = "", stack1, self = this, functionType = "function", escapeExpression = this.escapeExpression;
    function program1(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n";
        stack1 = self.invokePartial(partials['polls/_choice-item'], 'polls/_choice-item', depth0, helpers, partials, data);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n";
        return buffer;
    }
    buffer += "<!-- Poll Question -->\n<h3>\n<strong>";
    if (stack1 = helpers.title) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.title;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "</strong>\n</h3>\n\n<!-- Container -->\n<div class=\"poll\">\n<!-- Poll Message (error) -->\n<div id=\"poll-";
    if (stack1 = helpers.guid) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.guid;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "-message\" class=\"polls-message\"></div>\n\n<!-- Form -->\n<form class=\"poll\" data-guid=\"";
    if (stack1 = helpers.guid) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.guid;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "\">\n<!-- Choices -->\n<ul>\n";
    stack1 = helpers.each.call(depth0, depth0.answers, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n</ul>\n\n<!-- Submit -->\n<button type=\"button\" value=\"VOTE\" class=\"btn-vote\">VOTE</button>\n<div style=\"clear: both;\"></div>\n</form>\n</div>";
    return buffer;
});
this["JST"]["search/celebs"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, options, functionType = "function", escapeExpression = this.escapeExpression, self = this, blockHelperMissing = helpers.blockHelperMissing;
    function program1(depth0, data, depth1) {
        var buffer = "", stack1;
        buffer += "\n      <li class=\"";
        stack1 = helpers['if'].call(depth0, depth1.galleries, {
            hash: {},
            inverse: self.noop,
            fn: self.program(2, program2, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "clearfix\">\n        <a data-adid=\"TMZ_Search_Results\" class=\"has-adid celeb-result\" href=\"/person/";
        if (stack1 = helpers.url) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.url;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">\n          <img src=\"";
        stack1 = helpers['if'].call(depth0, depth0.primaryImage, {
            hash: {},
            inverse: self.program(6, program6, data),
            fn: self.program(4, program4, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\" />\n          <div class=\"title\">";
        if (stack1 = helpers.title) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.title;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "</div>\n        </a>\n      </li>\n  ";
        return buffer;
    }
    function program2(depth0, data) {
        return "photo ";
    }
    function program4(depth0, data) {
        var stack1;
        if (stack1 = helpers.primaryImage) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.primaryImage;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        return escapeExpression(stack1);
    }
    function program6(depth0, data) {
        var buffer = "", stack1;
        if (stack1 = helpers.ASSETS_BASEURL) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.ASSETS_BASEURL;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "images/tmz_logo_default_100px.gif";
        return buffer;
    }
    buffer += "<h3 class=\"search-heading\">Celebs</h3>\n<ul>\n  ";
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.programWithDepth(1, program1, data, depth0),
        data: data
    };
    if (stack1 = helpers.posts) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.posts;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.posts) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n</ul>\n<script>\n  $('.celeb-result').on('click', function() {\n    s.prop37 = s.eVar37 = $(this).find('.title').html();\n    s.tl();  \n  });\n</script>";
    return buffer;
});
this["JST"]["search/search"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    partials = this.merge(partials, Handlebars.partials);
    data = data || {};
    var buffer = "", stack1, options, self = this, functionType = "function", escapeExpression = this.escapeExpression, blockHelperMissing = helpers.blockHelperMissing;
    function program1(depth0, data) {
        return "current ";
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n    ";
        stack1 = self.invokePartial(partials['search/_search-results'], 'search/_search-results', depth0, helpers, partials, data);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n";
        return buffer;
    }
    buffer += "<div class=\"breadcrumbs group\"><a href=\"/\" id=\"breadcrumb-home\">Home</a>Search</div>\n<div id=\"main-content\">\n    <div class=\"gsa-tabs\" id=\"gsa-tabs\">\n        <ul>\n            <li><a id=\"gsa-tabs-articles\" data-search-type=\"news\" data-adid=\"TMZ_Search_Results_Tabs\" class=\"";
    stack1 = helpers['if'].call(depth0, depth0.news, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "has-adid search-tab\" href=\"/search/news/";
    if (stack1 = helpers.query) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.query;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "/\">Latest News &amp; Celebs</a></li>\n            <li><a id=\"gsa-tabs-photos\" data-search-type=\"galleries\" data-adid=\"TMZ_Search_Results_Tabs\" class=\"";
    stack1 = helpers['if'].call(depth0, depth0.galleries, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "has-adid search-tab\" href=\"/search/galleries/";
    if (stack1 = helpers.query) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.query;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "/\">Photos</a></li>\n            <li><a id=\"gsa-tabs-videos\" data-search-type=\"videos\" data-adid=\"TMZ_Search_Results_Tabs\" class=\"";
    stack1 = helpers['if'].call(depth0, depth0.videos, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "has-adid search-tab\" href=\"/search/videos/";
    if (stack1 = helpers.query) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.query;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "/\">Videos</a></li>\n        </ul>\n    </div>\n    <div class=\"gsa-results-header clearfix\">\n        <p>Your search for <strong>";
    if (stack1 = helpers.query) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.query;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "</strong> returned about <strong>";
    if (stack1 = helpers.totalResults) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.totalResults;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "</strong> results.</p>\n    </div>\n";
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.program(3, program3, data),
        data: data
    };
    if (stack1 = helpers.hasData) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.hasData;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.hasData) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n</div> <!-- END main-content -->\n";
    return buffer;
});
this["JST"]["share/share"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression;
    buffer += "<a class=\"box\" href=\"#\">\n  <div class=\"share\">\n    <span class=\"share-";
    if (stack1 = helpers['class']) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0['class'];
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "-icon\"></span>\n    <span class=\"share-count\">{total}</span>\n  </div>\n</a>";
    return buffer;
});
this["JST"]["shortcodes/tmz-video-embed"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, options, functionType = "function", escapeExpression = this.escapeExpression, self = this, blockHelperMissing = helpers.blockHelperMissing;
    function program1(depth0, data) {
        var stack1;
        if (stack1 = helpers.launch_quote_template) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.launch_quote_template;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (stack1 || stack1 === 0) {
            return stack1;
        } else {
            return '';
        }
    }
    function program3(depth0, data) {
        return "false";
    }
    function program5(depth0, data) {
        return "true";
    }
    buffer += "<div class=\"";
    if (stack1 = helpers.player_name) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.player_name;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\" data-video-type=\"kaltura\"\n     style=\"height:";
    if (stack1 = helpers.custom_height) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.custom_height;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "px; width:";
    if (stack1 = helpers.custom_width) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.custom_width;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "px;position:relative;clear:both;\">\n     <div class=\"video-container\"></div>\n     ";
    options = {
        hash: {},
        inverse: self.program(1, program1, data),
        fn: self.noop,
        data: data
    };
    if (stack1 = helpers.auto_play) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.auto_play;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.auto_play) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n</div>\n<script>\n    var playerName = '";
    if (stack1 = helpers.player_name) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.player_name;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "';\n    $(function (callback) {\n        playerName = new TmzKalturaPlayerView({\n            where: '.' + '";
    if (stack1 = helpers.player_name) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.player_name;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += " .video-container',\n            height: ";
    if (stack1 = helpers.custom_height) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.custom_height;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + ",\n            width: ";
    if (stack1 = helpers.custom_width) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.custom_width;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + ",\n            cacheSt: 9999999999,\n            site: 'tmz',\n            endcard: ";
    if (stack1 = helpers.endcard) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.endcard;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + ",\n            autoPlay: ";
    options = {
        hash: {},
        inverse: self.program(3, program3, data),
        fn: self.noop,
        data: data
    };
    if (stack1 = helpers.auto_play) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.auto_play;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.auto_play) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.program(5, program5, data),
        data: data
    };
    if (stack1 = helpers.auto_play) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.auto_play;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.auto_play) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += ",\n            autoMute: ";
    options = {
        hash: {},
        inverse: self.program(3, program3, data),
        fn: self.noop,
        data: data
    };
    if (stack1 = helpers.auto_mute) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.auto_mute;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.auto_mute) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.program(5, program5, data),
        data: data
    };
    if (stack1 = helpers.auto_mute) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.auto_mute;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.auto_mute) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += ",\n            autoContinue: false,\n            thumbnail: true,\n            showPlaylist: false,\n            playerOptions: {\n                entryId: '";
    if (stack1 = helpers.video_id) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.video_id;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "',\n                thumbnailUrl: '";
    if (stack1 = helpers.primary_image) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.primary_image;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    buffer += escapeExpression(stack1) + "'\n            }\n        });\n        callback(playerName);\n    }(function (player) {\n        player.draw();\n    }));\n</script>\n";
    return buffer;
});
this["JST"]["shortcodes/tmz-video-launch-quote"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, functionType = "function";
    buffer += "<div class=\"launch-quote\"><span class=\"launch-quote-text\">";
    if (stack1 = helpers.launch_quote) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.launch_quote;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "</span><span\n        class=\"video-credit-text\">";
    if (stack1 = helpers.video_credit) {
        stack1 = stack1.call(depth0, {
            hash: {},
            data: data
        });
    } else {
        stack1 = depth0.video_credit;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "</span></div>\n";
    return buffer;
});
this["JST"]["videos/playlist"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, self = this, functionType = "function", escapeExpression = this.escapeExpression;
    function program1(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n<li class=\"chapterBox";
        stack1 = helpers['if'].call(depth0, depth0.active, {
            hash: {},
            inverse: self.noop,
            fn: self.program(2, program2, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\" data-entryId=\"";
        if (stack1 = helpers.slug) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.slug;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\" data-mediabox-index=\"0\">\n    <div class=\"chapterBoxInner\">\n        <div class=\"thumbnailHolder\">\n            <img class=\"k-thumb resized\" alt=\"\" data-mediabox-index=\"-1\" src=\"";
        if (stack1 = helpers.thumbnailUrl) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.thumbnailUrl;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\">\n        </div>\n        <div class=\"k-title-container\">\n            <span class=\"k-title\">";
        if (stack1 = helpers.title) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.title;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "</span>\n        </div>\n        <div class=\"k-duration\">\n          <span>";
        if (stack1 = helpers.duration) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.duration;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "</span>\n        </div>\n    </div>\n</li>\n";
        return buffer;
    }
    function program2(depth0, data) {
        return " active";
    }
    stack1 = helpers.each.call(depth0, depth0.items, {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    });
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n";
    return buffer;
});
this["JST"]["widgets/newsletter-signup"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    return "<div class=\"newsletter-signup-container\">\n    <div class=\"newsletter-modal\">\n        <div class=\"header\">\n            <div class=\"logo\"></div>\n            <span class=\"subtitle\">Newsletter</span>\n            <a class=\"btn-close\" href=\"#\">&#10005;</a>\n        </div>\n        <div class=\"content\">\n            <div class=\"form-section\">\n                <h2 class=\"headline\">Get the <span class=\"red\">news you need</span> right in your inbox</h2>\n                <input class=\"input-email\" type=\"text\" placeholder=\"Your email address here...\" />\n                <a class=\"btn-signup\" href=\"#\">\n                    <span class=\"text\">Sign Me Up</span>\n                    <div class=\"loading\"></div>\n                </a>\n                <p class=\"fine-print\">By clicking \"Sign me up!\"\" you agree to the <a href=\"http://www.warnerbros.com/privacy-center-wb-privacy-policy\" target=\"_blank\">Privacy Policy</a> and <a href=\"http://www.tmz.com/terms\" target=\"_blank\">Terms of Use</a></p>\n            </div>\n            <div class=\"success\">\n                <div class=\"checkbox\">\n                    <span class=\"checkmark\"></span>\n                </div>\n                <h2 class=\"headline\">You're all set</h2>\n            </div>\n        </div>\n    </div>\n</div>\n";
});
this["JST"]["widgets/quick-subscribe"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    return "<div class=\"quick-subscribe-block\">\n  <h2>SUBSCRIBE</h2>\n   <form class=\"quick-subscribe-form\">\n    <div class=\"optin-errortxt\"></div>\n    <input type=\"text\" id=\"fteemail2\" class=\"quicksub-email\" name=\"email\" value=\"\" placeholder=\"Email Address\"/>\n    <span class=\"disclaimer\">By clicking \"Sign me up!\", you agree to the <a href=\"\">Privacy Policy</a> and <a href=\"\">Terms\n      of Use</a>.</span>\n    <input class=\"quick-subscribe-submit\" type=\"submit\" value=\"GO\">\n  </form>\n</div>";
});
this["JST"]["widgets/sidebar/follow-tmz"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    return "<div class=\"tabs\">\n    <h3>FOLLOW TMZ</h3>\n    <ul class=\"tab-links first clr\">\n        <li id=\"viaemail\" class=\"arrow_box\"><i></i></li>\n        <li id=\"facebook\"><i></i></li>\n        <li id=\"twitter\"><i></i></li>\n        <li id=\"youtube\"><i></i></li>\n        <li id=\"instagram\"><i></i></li>\n        <li id=\"apps\"><i></i></li>\n        <li id=\"menuMore\"><i></i></li>\n    </ul>\n    <ul class=\"tab-links second clr hidden\">\n        <li id=\"gplus\" class=\"arrow_box\"><i></i></li>\n        <li id=\"tumblr\"><i></i></li>\n        <li id=\"pinterest\"><i></i></li>\n        <li id=\"vine\"><i></i></li>\n        <li id=\"rssfeed\"><i></i></li>\n        <li id=\"sms\"><i></i></li>\n        <li id=\"menuClose\"><i></i></li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"groupA\">\n            <div id=\"tab1\" class=\"viaemail tab clr\"><!-- email -->\n\n                <iframe id=\"opt-in-iframe2\" width=\"0\" height=\"0\"\n                        scrolling=\"no\" name=\"opt-in-iframe2\"></iframe>\n                <form id=\"email-opt-in\"\n                      action=\"http://www.nl.tmz.com/subscribev2.php\"\n                      method=\"post\" class=\"emailForm\"\n                      target=\"opt-in-iframe2\">\n                    <div id=\"optin-errormsg\"></div>\n                    <div class=\"leftcol\">\n                        <input type=\"text\" id=\"ftemail\" name=\"email\"\n                               value=\"Enter your email\"\n                               placeholder=\"Enter your email\"/>\n                        <input type=\"checkbox\" name=\"groups[]\" value=\"3\"\n                               id=\"icymi\" checked onclick=\"customAdId('follow-widget.tmz.newsletter.icymi.checked');\"/>\n                        <input type=\"checkbox\" name=\"groups[]\" value=\"268\"\n                               id=\"breaking\" checked onclick=\"customAdId('follow-widget.tmz.newsletter.breaking.checked');\"/>\n                        <span class=\"policy-link\">By clicking \"Sign me up!\" you agree to the <a\n                                href=\"http://www.warnerbros.com/privacy-center-wb-privacy-policy\"\n                                target=\"_new\"\n                                onclick=\"s_objectID=&quot;http://www.warnerbros.com/privacy-center-wb-privacy-policy_1&quot;;return this.s_oc?this.s_oc(e):true\">Privacy\n                            Policy</a> and <a\n                                href=\"http://www.tmz.com/terms/\"\n                                target=\"_new\"\n                                onclick=\"s_objectID=&quot;http://www.tmz.com/terms/_1&quot;;return this.s_oc?this.s_oc(e):true\">Terms\n                            of Use</a>.</span>\n\n                        <div class=\"form-labels\">\n                            <label for=\"icymi\"><strong>In Case You Missed\n                                It</strong><br/>Receive a breakdown of the\n                                week's top stories.</label><br/><br/>\n                            <label for=\"breaking\"><strong>Breaking\n                                News</strong><br/>Our biggest stories\n                                delivered straight to your inbox.</label>\n                        </div>\n                    </div>\n                    <div class=\"rightcol\">\n                        <input id=\"ftmz-subscribe-btn\" type=\"submit\"\n                               value=\"Sign me Up!\"/>\n                    </div>\n                </form>\n\n            </div>\n            <div id=\"tab2\" class=\"facebook tab hidden\"><!-- facebook -->\n                <div id=\"fb-root\"></div>\n                <div class=\"fb-like\" data-href=\"https://www.facebook.com/tmz\" data-width=\"275\" data-layout=\"standard\" data-action=\"like\" data-show-faces=\"false\" data-share=\"false\"></div>\n            </div>\n            <div id=\"tab3\" class=\"twitter tab hidden\"><!-- twitter -->\n\n            </div>\n            <div id=\"tab4\" class=\"youtube tab hidden\"><!-- youtube -->\n                <div class=\"g-ytsubscribe\" data-channel=\"TMZ\"\n                     data-layout=\"full\" data-count=\"default\"></div>\n            </div>\n            <div id=\"tab5\" class=\"instagram tab hidden\"><!-- instagram -->\n                <a href=\"http://instagram.com/tmz_tv?ref=badge\"\n                   class=\"ig-b- ig-b-v-24\" target=\"_new\" onclick=\"customAdId('follow-widget.tmz.instagram.submit');\"><img\n                        src=\"//badges.instagram.com/static/images/ig-badge-view-24.png\"\n                        alt=\"Instagram\"/></a>\n            </div>\n            <div id=\"tab6\" class=\"apps tab hidden\"><!-- apps -->\n                <a href=\"https://itunes.apple.com/us/app/tmz/id299948601?mt=8\"\n                   target=\"_new\" onclick=\"customAdId('follow-widget.tmz.app.appleStore');\"><i id=\"ios\"></i></a>\n                <hr>\n                <a href=\"https://play.google.com/store/apps/details?id=com.rhythmnewmedia.tmz&hl=en\"\n                   target=\"_new\" onclick=\"customAdId('follow-widget.tmz.app.googleStore');\"><i id=\"googleplay\"></i></a>\n                <hr>\n                <a href=\"http://www.amazon.com/Warner-Bros-TMZ/dp/B004SRD2MY\"\n                   target=\"_new\" onclick=\"customAdId('follow-widget.tmz.app.amazonStore');\"><i id=\"amazonstore\"></i></a>\n            </div>\n        </div>\n        <div class=\"groupB\">\n            <div id=\"tab7\" class=\"gplus tab hidden\"><!-- gplus -->\n                <div class=\"g-follow\" data-annotation=\"bubble\"\n                     data-height=\"24\"\n                     data-href=\"https://plus.google.com/112203561486212102740\"\n                     data-rel=\"publisher\"></div>\n            </div>\n            <div id=\"tab8\" class=\"tumblr tab hidden\"><!-- tumblr -->\n                <iframe class=\"btn\" frameborder=\"0\" border=\"0\"\n                        scrolling=\"no\" allowtransparency=\"true\" height=\"25\"\n                        width=\"116\"\n                        src=\"http://platform.tumblr.com/v1/follow_button.html?button_type=2&tumblelog=tmz&color_scheme=dark\"></iframe>\n            </div>\n            <div id=\"tab9\" class=\"pinterest tab hidden\"><!-- pinterest -->\n                <a data-pin-do=\"buttonFollow\"\n                   href=\"http://www.pinterest.com/tmz/\" onclick=\"customAdId('follow-widget.tmz.pinterest.submit');\">TMZ</a>\n                <script type=\"text/javascript\" async defer\n                        src=\"//assets.pinterest.com/js/pinit.js\"></script>\n            </div>\n            <div id=\"tab10\" class=\"vine tab hidden\"><!-- vine -->\n                <a href=\"https://vine.co/tmz\" target=\"_new\"><i\n                        id=\"vinelink\" onclick=\"customAdId('follow-widget.tmz.vine.submit');\"></i></a>\n            </div>\n            <div id=\"tab11\" class=\"rssfeed tab hidden\"><!-- rssfeeds -->\n                <a href=\"http://www.tmz.com/rss.xml\" target=\"_new\" onclick=\"customAdId('follow-widget.tmz.rss.tmz.submit');\"><i\n                        id=\"rsslink\"></i></a>\n                <hr>\n                <a href=\"http://www.tmz.com/feeds\" class=\"allfeeds\"\n                   target=\"_new\" onclick=\"customAdId('follow-widget.tmz.rss.allfeeds.submit');\">View all RSS feeds.</a>\n            </div>\n            <div id=\"tab12\" class=\"sms tab hidden\"><!-- sms -->\n                <span>To receive Breaking News texted to your mobile phone, sign up for <strong>Mobile\n                    SMS Alerts</strong> by <a\n                        href=\"http://www.tmz.com/tmzmobilealerts\"\n                        target=\"_new\" onclick=\"customAdId('follow-widget.tmz.sms.submit');\">submitting your phone number here</a>.</span>\n            </div>\n        </div>\n        <!-- end .groupB -->\n    </div>\n    <!-- .tab-content -->\n</div>\n<! -- tabs -->";
});
this["JST"]["widgets/sidebar/most-commented-posts"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, options, functionType = "function", escapeExpression = this.escapeExpression, self = this, blockHelperMissing = helpers.blockHelperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n<article class=\"clearfix\">\n";
        stack1 = helpers['if'].call(depth0, depth0.primaryImage, {
            hash: {},
            inverse: self.noop,
            fn: self.program(2, program2, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n\n<a class=\"subheader\" href=\"";
        if (stack1 = helpers.url) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.url;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "?adid=sidebarwidget-most-commented\">\n";
        stack1 = helpers['if'].call(depth0, depth0.fragments, {
            hash: {},
            inverse: self.program(7, program7, data),
            fn: self.program(4, program4, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n</a>\n<h5>";
        if (stack1 = helpers.date) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.date;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "</h5>\n</article>\n";
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n<a href=\"";
        if (stack1 = helpers.url) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.url;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "?adid=sidebarwidget-most-commented\" target=\"_blank\" rel=\"nofollow\"><img src=\"";
        if (stack1 = helpers.primaryImage) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.primaryImage;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\" /></a>\n";
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n";
        stack1 = helpers.each.call(depth0, depth0.fragments, {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n";
        return buffer;
    }
    function program5(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n";
        stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n";
        return buffer;
    }
    function program7(depth0, data) {
        var buffer = "", stack1;
        buffer += "\n";
        if (stack1 = helpers.title) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.title;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + "\n";
        return buffer;
    }
    buffer += "<div class=\"sidebar-widget posts-widget tmz-posts\">\n<div class=\"widget-title\">Most Commented</div>\n\n";
    options = {
        hash: {},
        inverse: self.noop,
        fn: self.program(1, program1, data),
        data: data
    };
    if (stack1 = helpers.posts) {
        stack1 = stack1.call(depth0, options);
    } else {
        stack1 = depth0.posts;
        stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
    }
    if (!helpers.posts) {
        stack1 = blockHelperMissing.call(depth0, stack1, options);
    }
    if (stack1 || stack1 === 0) {
        buffer += stack1;
    }
    buffer += "\n\n</div>";
    return buffer;
});
define('document', function() {
    return document;
});
define('window', function() {
    return window;
});
define('jquery.cookie', ['window'], function(window) {
    return window.jQuery.cookie;
});
define('jquery.tmpl', ['window'], function(window) {
    return window.jQuery.template;
});
define('handlebars', ['window'], function(window) {
    return window.Handlebars;
});
define('templates/jst', ['window'], function(window) {
    return window.JST;
});
require.config({
    paths: {
        'backbone': ['//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min', 'backbone/1.1.0/backbone-min'],
        'handlebars': ['handlebars/1.1.2/handlebars.runtime'],
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min', 'jquery/jquery-1.10.2.min'],
        'jquery.ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min', 'jquery.ui/1.8.14/jquery.ui.min'],
        'underscore': ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min', 'underscore/1.5.2/underscore-min'],
        'async': ['//connect.facebook.net/en_US/all']
    },
    map: {
        '*': {
            'gallery': 'photos/1.1.0/gallery',
            'categories': 'photos/1.1.0/categories',
            'tips': 'tips/1.0.4/tips',
            'ad-custom': 'widgets/sidebar/ad-custom/1.0.0/ad-custom',
            'search': 'search/1.0.2/search',
            'playlist': 'videos/playlist/1.0.1/playlist',
            'newsletter-signup': 'widgets/newsletter-signup/1.0.0/newsletter-signup'
        }
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'jquery': {
            exports: 'jQuery'
        },
        'jquery.ui': {
            deps: ['jquery'],
            exports: 'jQuery.ui'
        },
        'underscore': {
            exports: '_'
        },
        'facebook': {
            exports: 'FB'
        }
    },
    config: {
        requirecss: {
            baseUrl: require.s.contexts._.config.baseUrl.substr(0, require.s.contexts._.config.baseUrl.length - 3)
        }
    }
});
define('app', ['require', 'jquery', 'dispatcher', 'util', 'logger', 'module', 'window', 'document'], function(require, $, dispatcher, util, loggerFactory, module, window, document, undefined) {
    'use strict';
    var logger = loggerFactory.getInstance(module.id);
    var userLoggedIn = false;
    function app() {
        var _this = Object.create({});
        function init() {
            logger.info('init');
        }
        function setUserLoggedIn(loggedIn) {
            userLoggedIn = loggedIn;
            if (userLoggedIn) {
                dispatcher.trigger('user:logged_in');
            } else {
                dispatcher.trigger('user:logged_out');
            }
        }
        function isUserLoggedIn() {
            return userLoggedIn;
        }
        _this.init = init;
        _this.dispatcher = dispatcher;
        _this.util = util;
        _this.setUserLoggedIn = setUserLoggedIn;
        _this.isUserLoggedIn = isUserLoggedIn;
        return _this;
    }
    return app();
});
define('dispatcher', ['jquery'], function($) {
    'use strict';
    return $('<div/>');
});
define('logger', ['module', 'jquery', 'window'], function(module, $, window, undefined) {
    'use strict';
    var enabled = window.console && typeof window.console.log != 'undefined';
    var loggers = {};
    function logger(channel) {
        var _this = Object.create({});
        function log(msg, context) {
            if (!enabled) {
                return;
            }
            writeLog('log', msg, context);
        }
        function debug(msg, context) {
            if (!enabled) {
                return;
            }
            writeLog('debug', msg, context);
        }
        function info(msg, context) {
            if (!enabled) {
                return;
            }
            writeLog('info', msg, context);
        }
        function warn(msg, context) {
            if (!enabled) {
                return;
            }
            writeLog('warn', msg, context);
        }
        function error(msg, context) {
            if (!enabled) {
                return;
            }
            writeLog('error', msg, context);
        }
        function writeLog(level, msg, context) {
            if (undefined === window.console[level]) {
                level = 'log';
            }
            var label = '[' + level.toUpperCase() + '][' + channel + ']';
            var type = $.type(msg);
            if (type === 'string' || type === 'number' || type === 'boolean') {
                label += ' ' + msg.toString();
            } else {
                context = context || {};
                context._msg = msg;
            }
            if (context) {
                window.console[level](label, context);
            } else {
                window.console[level](label);
            }
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
            if (!loggers[channel]) {
                loggers[channel] = logger(channel);
            }
            return loggers[channel];
        }
    };
});
define('util', ['module', 'jquery', 'handlebars', 'window', 'document'], function(module, $, Handlebars, window, document, undefined) {
    'use strict';
    Handlebars.registerHelper('SYSTEM_VERSION', function() {
        return window.SYSTEM_VERSION || '';
    });
    Handlebars.registerHelper('SYSTEM_ENV', function() {
        return window.SYSTEM_ENV || '';
    });
    Handlebars.registerHelper('DEVICE_VIEW', function() {
        return window.DEVICE_VIEW || '';
    });
    Handlebars.registerHelper('ASSETS_BASEURL', function() {
        return window.ASSETS_BASEURL || '';
    });
    Handlebars.registerHelper('SITE_BASEURL', function() {
        return window.SITE_BASEURL || '';
    });
    Handlebars.registerHelper('SITE_DOMAIN', function() {
        return window.SITE_DOMAIN || '';
    });
    var domReadyDeferred = $.Deferred();
    var domReadyPromise = domReadyDeferred.promise();
    $(document).ready(function() {
        domReadyDeferred.resolve();
    });
    function util() {
        var _this = Object.create({});
        function getDomReadyPromise() {
            return domReadyPromise;
        }
        function parseSharing(domElement) {
            getDomReadyPromise().done(function() {
                if (window.addthis && window.addthis.toolbox) {
                    window.addthis.toolbox(domElement);
                }
                if (window.twttr && window.twttr.widgets) {
                    window.twttr.widgets.load(domElement);
                }
            });
        }
        _this.getDomReadyPromise = getDomReadyPromise;
        _this.parseSharing = parseSharing;
        return _this;
    }
    return util();
});
define('tmz/members/1.0.3/members', ['jquery', 'jquery.cookie', 'tmz/middleware/1.0.0/client', 'templates/jst', 'logger', 'module'], function($, cookie, mw, templates, loggerFactory, module) {
    'use strict';
    var logger = loggerFactory.getInstance(module.id);
    function members() {
        var _this = {}
          , cookieMemberCMS = 'CMSU'
          , cookieMemberRef = 'memberRef'
          , cookieMemberGuid = 'MEMBER_GUID'
          , cookieMemberTitle = 'MEMBER_TITLE'
          , cookieMemberThumb = 'MEMBER_THUMB40'
          , endpointMwUser = '/api/v1/users/'
          , selectorUserNav = '#nav .user-nav'
          , selectorUserLogout = 'aside.my-tmz-box'
          , selectorUserThumb = 'li .userThumb'
          , signoutUrl = '/members/signout/ajax'
          , defaultUserThumb = null ;
        var loggedInState = function loggedInState() {
            var $result = true;
            var cmsMemberCookie = cookie(cookieMemberCMS);
            var memberCookie = cookie(cookieMemberRef) || cmsMemberCookie;
            if (!memberCookie) {
                $result = false;
            }
            var memberGuid = cookie(cookieMemberGuid);
            if (!memberGuid && !cmsMemberCookie) {
                $result = false;
            }
            return $result;
        }
        var renderUserNav = function renderUserNav() {
            var cmsMemberCookie = cookie(cookieMemberCMS);
            var memberCookie = cookie(cookieMemberRef) || cmsMemberCookie;
            if (!memberCookie) {
                return _this;
            }
            var username = memberCookie.split('|')[0].split(':')[1];
            var userTitle = cookie(cookieMemberTitle);
            var userThumb = cookie(cookieMemberThumb);
            if (typeof userTitle === 'string') {
                userTitle = userTitle.replace(/\+/g, ' ');
            }
            if (typeof userThumb === 'string') {
                userThumb = decodeURIComponent(userThumb);
            }
            if (!userTitle || !userThumb) {
                var memberGuid = cookie(cookieMemberGuid);
                if (!memberGuid && !cmsMemberCookie) {
                    $.ajax(signoutUrl);
                    return _this;
                } else if (!memberGuid && cmsMemberCookie) {
                    return _this;
                }
                var mwMemberUrl = endpointMwUser + memberGuid + '?fields=all';
                mw.get(mwMemberUrl).done(function(response) {
                    cookie(cookieMemberTitle, response.title, {
                        path: '/'
                    });
                    var _myThumb = defaultUserThumb;
                    if (response.thumbnailUrls !== null ) {
                        _myThumb = response.thumbnailUrls['40x40'];
                        if (SYSTEM_ENV == "dev") {}
                    }
                    cookie(cookieMemberThumb, _myThumb, {
                        path: '/'
                    });
                    renderUserTemplate({
                        username: username,
                        userTitle: response.title,
                        userThumb: _myThumb
                    });
                });
            } else {
                renderUserTemplate({
                    username: username,
                    userTitle: userTitle,
                    userThumb: userThumb
                });
            }
            return _this;
        }
        ;
        var setDefaultUserThumb = function(url) {
            defaultUserThumb = url;
        }
        var renderUserTemplate = function renderUserTemplate(context) {
            var renderedTemplate = templates['header/user-nav'](context);
            $(selectorUserNav).html(renderedTemplate);
        }
        ;
        var setEndpointMwUser = function setEndpointMwUser(val) {
            endpointMwUser = val;
        }
        ;
        var setSelectorUserNav = function setSelectorUserNav(val) {
            selectorUserNav = val;
        }
        ;
        var setSignoutUrl = function setSignoutUrl(val) {
            signoutUrl = val;
        }
        ;
        return _this = {
            renderUserNav: renderUserNav,
            setSelectorUserNav: setSelectorUserNav,
            setEndpointMwUser: setEndpointMwUser,
            setSignoutUrl: setSignoutUrl,
            loggedInState: loggedInState,
            setDefaultUserThumb: setDefaultUserThumb
        };
    }
    return members();
});
(function(root, factory) {
    if (typeof bootstrap === 'function') {
        bootstrap('WbGeoLocation', factory(root.$));
    } else if (typeof exports === "object") {
        module.exports = factory(require('jquery'), require('jquery.cookie'));
    } else if (typeof define === "function" && define.amd) {
        define('wb/geolocation/1.0.1/geolocation', ['jquery', 'jquery.cookie'], factory);
    } else {
        root.WbGeoLocation = factory(root.$);
    }
})(this, function($) {
    var logEnabled = this.console && typeof console.log != 'undefined';
    var log = function(msg) {
        if (logEnabled) {
            var type = $.type(msg);
            if (type === 'string' || type === 'number') {
                console.log('[WbGeoLocation] ' + msg);
            } else {
                console.log(msg);
            }
        }
    }
    ;
    var ipLookupUri = '/wb-geolocation';
    var testIpAddress = '';
    var useGoogleClientLocation = false;
    var useGetByCoordinates = true;
    var getByCoordinatesProvider = 'google';
    var googleJsApiUrl = '//www.google.com/jsapi';
    var googleMapsLookupUrl = '//maps.google.com/maps/api/geocode/json?sensor=false&latlng=';
    var cookieName = 'WBGEO';
    var cookieExpires = 365;
    var cookieDomain = (document.domain).match(/(.\.)?(\w+\.\w+)$/)[2];
    var module = function() {
        var _this = Object.create({});
        var geoLocation;
        var geoLocationDeferred;
        var zip;
        var zipDeferred;
        var resetGeoLocation = function() {
            log('resetGeoLocation');
            geoLocation = undefined;
            geoLocationDeferred = undefined;
            return _this;
        }
        ;
        var getGeoLocationDeferred = function() {
            if (geoLocationDeferred) {
                log('getGeoLocationDeferred::already created');
                return geoLocationDeferred;
            }
            log('getGeoLocationDeferred::new');
            geoLocationDeferred = $.Deferred();
            geoLocationDeferred.always(function(newGeoLocation) {
                log('getGeoLocationDeferred::always,geolocation=');
                log(newGeoLocation);
                geoLocation = newGeoLocation;
            });
            return geoLocationDeferred;
        }
        ;
        var getGeoLocation = function(askForLocation) {
            if (geoLocationDeferred) {
                log('getGeoLocation::cached promise');
                return geoLocationDeferred.promise();
            }
            var deferred = getGeoLocationDeferred();
            if (askForLocation) {
                getGeoLocationFromNavigator().then(function(geoLocation) {
                    deferred.resolve(geoLocation);
                }, function(error) {
                    deferred.reject();
                });
                return deferred.promise();
            }
            getGeoLocationFromGoogle().then(function(geoLocation) {
                deferred.resolve(geoLocation);
            }, function(error) {
                getGeoLocationByIp().then(function(geoLocation) {
                    deferred.resolve(geoLocation);
                }, function(error) {
                    deferred.reject();
                });
            });
            return deferred.promise();
        }
        ;
        var getGeoLocationByIp = function() {
            var url = testIpAddress ? ipLookupUri + '/' + testIpAddress : ipLookupUri;
            var deferred = $.Deferred();
            log('getGeoLocationByIp::calling api::' + url);
            $.ajax(url, {
                dataType: 'json'
            }).done(function(data) {
                if (data.status == 'ok') {
                    log('getGeoLocationByIp::zip=' + data.location.zipCode);
                    if (data.location.zipCode.length > 1) {
                        deferred.resolve(data.location);
                    } else {
                        if (data.provider == 'maxmind' && data.location.countryCode == 'US') {
                            log('getGeoLocationByIp::still no zip, provider is maxmind so attempt lookup by coordinates.');
                            getGeoLocationByCoordinates(data.location.latitude, data.location.longitude).then(function(geoLocation) {
                                data.location.zipCode = geoLocation.zipCode;
                                deferred.resolve(data.location);
                            }, function() {
                                deferred.reject();
                            });
                            return;
                        }
                        deferred.reject();
                    }
                } else {
                    log('getGeoLocationByIp::failed:ip address not found');
                    deferred.reject();
                }
            }).fail(function(xhr) {
                log('getGeoLocationByIp::failed:' + xhr.status + ' -> ' + xhr.statusText);
                deferred.reject();
            });
            return deferred.promise();
        }
        ;
        var getGeoLocationByCoordinates = function(lat, lng) {
            var url;
            var deferred = $.Deferred();
            var geoLocation = {
                latitude: lat,
                longitude: lng
            };
            if (!useGetByCoordinates) {
                log('getGeoLocationByCoordinates::disabled');
                deferred.reject();
                return deferred.promise();
            }
            if (getByCoordinatesProvider == 'google') {
                url = googleMapsLookupUrl + lat + ',' + lng;
                $.ajax(url, {
                    dataType: 'json'
                }).done(function(data) {
                    if (data.results instanceof Array && data.status == 'OK' && data.results.length > 0) {
                        $.each(data.results[0].address_components, function(ix, comp) {
                            if ($.inArray('postal_code', comp.types) >= 0) {
                                geoLocation.zipCode = comp.long_name;
                            } else if ($.inArray('country', comp.types) >= 0) {
                                geoLocation.countryCode = comp.short_name;
                                geoLocation.countryName = comp.long_name;
                            } else if ($.inArray('locality', comp.types) >= 0) {
                                geoLocation.cityName = comp.long_name;
                            } else if ($.inArray('administrative_area_level_1', comp.types) >= 0) {
                                geoLocation.regionName = comp.long_name;
                            }
                        });
                        if (geoLocation.countryCode != 'US') {
                            log('getGeoLocationByCoordinates::NON-US, address=' + data.results[0].formatted_address);
                            deferred.resolve(geoLocation);
                            return;
                        }
                        if (geoLocation.countryCode == 'US' && geoLocation.zipCode && geoLocation.zipCode.length > 1) {
                            log('getGeoLocationByCoordinates::address=' + data.results[0].formatted_address);
                            deferred.resolve(geoLocation);
                            return;
                        }
                    }
                    log('getGeoLocationByCoordinates::failed: no zip code');
                    deferred.reject();
                }).fail(function(xhr) {
                    log('getGeoLocationByCoordinates::failed: ' + xhr.status + ' -> ' + xhr.statusText);
                    deferred.reject();
                });
            } else if (getByCoordinatesProvider == 'bing') {
                log('getGeoLocationByCoordinates::bing not implemented');
                deferred.reject();
            } else {
                log('getGeoLocationByCoordinates::invalid provider=' + getByCoordinatesProvider);
                deferred.reject();
            }
            return deferred.promise();
        }
        ;
        var getGeoLocationFromGoogle = function() {
            var deferred = $.Deferred();
            var latitude;
            var longitude;
            if (!useGoogleClientLocation) {
                log('getGeoLocationFromGoogle::ClientLocation check disabled');
                deferred.reject();
                return deferred.promise();
            }
            var handleClientLocation = function() {
                if (!window['google'] || !window['google']['loader']) {
                    log('getGeoLocationFromGoogle::no google loader');
                    deferred.reject();
                    return;
                }
                if (!google.loader.ClientLocation) {
                    log('getGeoLocationFromGoogle::no ClientLocation');
                    deferred.reject();
                    return;
                }
                latitude = google.loader.ClientLocation.latitude;
                longitude = google.loader.ClientLocation.longitude;
                log('getGeoLocationFromGoogle::latitude=' + latitude + ',longitude=' + longitude);
                getGeoLocationByCoordinates(latitude, longitude).then(function(geoLocation) {
                    deferred.resolve(geoLocation);
                }, function() {
                    deferred.reject();
                });
            }
            ;
            if (!window['google'] || !window['google']['loader']) {
                $.ajax(googleJsApiUrl, {
                    dataType: 'script',
                    cache: true
                }).done(function() {
                    handleClientLocation();
                }).fail(function(xhr) {
                    log('getGeoLocationFromGoogle::failed: ' + xhr.status + ' -> ' + xhr.statusText);
                    deferred.reject();
                });
            } else {
                handleClientLocation();
            }
            return deferred.promise();
        }
        ;
        var getGeoLocationFromNavigator = function() {
            var deferred = $.Deferred();
            var timer;
            if (!navigator.geolocation) {
                log('getGeoLocationFromNavigator::geolocation not supported in browser.');
                deferred.reject();
                return deferred.promise();
            }
            log('getGeoLocationFromNavigator::calling getCurrentPosition()');
            navigator.geolocation.getCurrentPosition(function(pos) {
                if (pos && pos.coords) {
                    log('getGeoLocationFromNavigator::pos=');
                    log(pos);
                    getGeoLocationByCoordinates(pos.coords.latitude, pos.coords.longitude).then(function(geoLocation) {
                        deferred.resolve(geoLocation);
                        clearTimeout(timer);
                    }, function() {
                        deferred.reject();
                        clearTimeout(timer);
                    });
                } else {
                    log('getGeoLocationFromNavigator::pos is invalid');
                    deferred.reject({
                        code: 'POSITION_UNAVAILABLE'
                    });
                    clearTimeout(timer);
                }
            }, function(error) {
                log('getGeoLocationFromNavigator::error=');
                log(error);
                deferred.reject(error);
                clearTimeout(timer);
            }, {
                timeout: 2000
            });
            timer = setTimeout(function() {
                log('getGeoLocationFromNavigator::user selected "not now" or dismissed dialog');
                deferred.reject({
                    code: 'PERMISSION_DENIED'
                });
            }, 10000);
            return deferred.promise();
        }
        ;
        var resetZip = function() {
            log('resetZip');
            zip = undefined;
            zipDeferred = undefined;
            return _this;
        }
        ;
        var getZipDeferred = function() {
            if (zipDeferred) {
                log('getZipDeferred::already created');
                return zipDeferred;
            }
            log('getZipDeferred::new');
            zipDeferred = $.Deferred();
            zipDeferred.always(function(newZip) {
                log('getZipDeferred::always,zip=' + newZip);
                zip = newZip;
            });
            return zipDeferred;
        }
        ;
        var getZip = function(askForLocation) {
            var deferred;
            var zip;
            var geoLocationPromise;
            if (zipDeferred) {
                log('getZip::cached promise');
                return zipDeferred.promise();
            }
            deferred = getZipDeferred();
            zip = getZipCookie();
            if (zip && zip.length > 0) {
                if (zip == '-1') {
                    log('getZip::reject with cookie=' + zip);
                    deferred.reject();
                } else {
                    log('getZip::resolve with cookie=' + zip);
                    deferred.resolve(zip);
                }
                return deferred.promise();
            }
            geoLocationPromise = getGeoLocation(askForLocation);
            geoLocationPromise.then(function(geoLocation) {
                if (geoLocation.zipCode) {
                    log('getZip::resolve from getGeoLocation=' + geoLocation.zipCode);
                    setZipCookie(geoLocation.zipCode);
                    deferred.resolve(geoLocation.zipCode);
                } else {
                    log('getZip::reject from getGeoLocation, no zipCode property');
                    setZipCookie('-1');
                    deferred.reject();
                }
            }, function() {
                log('getZip::reject from getGeoLocation');
                setZipCookie('-1');
                deferred.reject();
            });
            return deferred.promise();
        }
        ;
        var getZipCookie = function() {
            var zip = $.cookie(cookieName + 'ZIP') || '';
            return zip.replace(/[^a-zA-Z0-9\s_-]/g, '');
        }
        ;
        var setZipCookie = function(zip) {
            log('setZipCookie::' + zip);
            $.cookie(cookieName + 'ZIP', null , {
                path: '/',
                expires: -1
            });
            $.cookie(cookieName + 'ZIP', zip, {
                path: '/',
                expires: cookieExpires,
                domain: cookieDomain
            });
        }
        ;
        var setZip = function(newZip) {
            log('setZip::' + newZip);
            setZipCookie(newZip);
            if (zip == newZip) {
                log('setZip::zip unchanged');
                return _this;
            }
            resetZip();
            if (newZip) {
                if (newZip == '-1') {
                    log('setZip::reject with newZip=' + newZip);
                    getZipDeferred().reject();
                } else {
                    log('setZip::resolve with newZip=' + newZip);
                    getZipDeferred().resolve(newZip);
                }
            }
            return _this;
        }
        ;
        var setTestIpAddress = function(ip) {
            log('setTestIpAddress::' + ip);
            testIpAddress = ip;
            return _this;
        }
        ;
        var enableGoogleClientLocation = function(enabled) {
            log('enableGoogleClientLocation::' + enabled);
            useGoogleClientLocation = enabled ? true : false;
            return _this;
        }
        ;
        var enableGetByCoordinates = function(enabled) {
            log('enableGetByCoordinates::' + enabled);
            useGetByCoordinates = enabled ? true : false;
            return _this;
        }
        ;
        _this.resetGeoLocation = resetGeoLocation;
        _this.getGeoLocation = getGeoLocation;
        _this.resetZip = resetZip;
        _this.getZip = getZip;
        _this.getZipCookie = getZipCookie;
        _this.setZip = setZip;
        _this.setTestIpAddress = setTestIpAddress;
        _this.enableGoogleClientLocation = enableGoogleClientLocation;
        _this.enableGetByCoordinates = enableGetByCoordinates;
        return _this;
    }
    ;
    return module();
});
(function(root, factory) {
    if (typeof bootstrap === 'function') {
        bootstrap('WbShowTimes', factory(root.$));
    } else if (typeof exports === "object") {
        module.exports = factory(require('jquery'));
    } else if (typeof define === "function" && define.amd) {
        define('wb/showtimes/1.0.1/showtimes', ['jquery'], factory);
    } else {
        root.WbShowTimes = factory(root.$);
    }
})(this, function($) {
    var theWindow = this;
    var logEnabled = this.console && typeof console.log != 'undefined';
    var log = function(msg) {
        if (logEnabled) {
            var type = $.type(msg);
            if (type === 'string' || type === 'number') {
                console.log('[WbShowTimes] ' + msg);
            } else {
                console.log(msg);
            }
        }
    }
    ;
    var defaults = {
        siteName: '',
        serviceUrl: 'http://showtimes.telepicturestv.com/%SITE_NAME%/lookup/zip/'
    };
    return function(options) {
        var _this = Object.create({});
        var settings = $.extend({}, defaults, options);
        var serviceUrl = settings.serviceUrl.replace('%SITE_NAME%', settings.siteName);
        var callbackHandler = 'wbShowTimes_' + settings.siteName + '_';
        var promises = {};
        log('serviceUrl=' + serviceUrl);
        log('callbackHandler=' + callbackHandler);
        var getByUSZip = function(zip) {
            zip = zip.replace(/\D/g, '');
            var cacheKey = 'byUSZip_' + zip;
            var deferred;
            if (!promises[cacheKey] && zip.length != 5) {
                log('getByUSZip::not a US Zip=' + zip);
                deferred = $.Deferred();
                deferred.reject();
                promises[cacheKey] = deferred.promise();
                return promises[cacheKey];
            }
            if (!promises[cacheKey]) {
                log('getByUSZip::calling api::' + serviceUrl + zip);
                deferred = $.ajax(serviceUrl + zip, {
                    dataType: 'jsonp',
                    jsonpCallback: callbackHandler + 'onGetByUSZip',
                    cache: true
                });
                promises[cacheKey] = deferred.promise();
            } else {
                log('getByUSZip::cached promise::' + zip);
            }
            return promises[cacheKey];
        }
        ;
        var onGetByUSZip = function(data) {
            log('onGetByUSZip::called');
        }
        ;
        _this.getByUSZip = getByUSZip;
        theWindow[callbackHandler + 'onGetByUSZip'] = onGetByUSZip;
        return _this;
    }
    ;
});
(function(n, f) {
    var u = n.parse
      , c = [1, 4, 5, 6, 7, 10, 11];
    n.parse = function(t) {
        var i, o, a = 0;
        if (o = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(t)) {
            for (var v = 0, r; r = c[v]; ++v)
                o[r] = +o[r] || 0;
            o[2] = (+o[2] || 1) - 1,
            o[3] = +o[3] || 1,
            o[8] !== "Z" && o[9] !== f && (a = o[10] * 60 + o[11],
            o[9] === "+" && (a = 0 - a)),
            i = n.UTC(o[1], o[2], o[3], o[4], o[5] + a, o[6], o[7])
        } else
            i = u ? u(t) : NaN;
        return i
    }
})(Date);
(function($) {
    window.TmzClass = {
        create: function(className) {
            var args = Array.prototype.slice.call(arguments, 0);
            var options, class_definition, superclass, superclassName;
            var f;
            className = args.shift();
            if (typeof args[0] === "string") {
                superclassName = args.shift();
            } else if (typeof args[0] === "function") {
                throw ("tmzDefineClass: superclass name must be string, not the function itself");
            } else {
                if (typeof TmzObject === "function") {
                    superclassName = 'TmzObject';
                } else {
                    superclassName = 'Object';
                }
            }
            if ($.type(window[superclassName]) === "null" || $.type(window[superclassName]) === "undefined") {
                throw ("TmzClass.create cannot find parent class '" + superclassName + "'");
            }
            superclass = window[superclassName];
            class_definition = args.shift() || {};
            if (!class_definition.hasOwnProperty('constructor')) {
                class_definition.constructor = function() {
                    superclass.apply(this, arguments);
                }
                ;
            }
            eval(className + ' = function() { class_definition.constructor.apply(this, arguments); }');
            f = function() {}
            ;
            f.prototype = superclass.prototype;
            window[className].prototype = new f();
            $.extend(window[className].prototype, {
                "className": className,
                "class": window[className],
                "superclass": superclass,
                "superclassName": superclassName
            }, class_definition);
            return window[className];
        },
        abstractMethod: function(msg) {
            throw ('Abstract method not overriden by subclass - ' + (msg || ""));
        }
    };
})(jQuery);
(function($) {
    TmzClass.create('TmzObject', 'Object', {
        constructor: function(options) {
            Object.apply(this, []);
            this.$options = options || {};
            this.$___listeners = {};
        },
        options: function() {
            return this.$options;
        },
        toString: function() {
            return "[ " + this.className + " ]";
        },
        addListener: function(listenerName, callback) {
            if (!this.$___listeners[listenerName]) {
                this.$___listeners[listenerName] = [];
            }
            if ($.inArray(callback, this.$___listeners[listenerName]) === -1) {
                this.$___listeners[listenerName].push(callback);
            }
        },
        removeListener: function(listenerName, callback) {
            if (!this.$___listeners[listenerName]) {
                return;
            } else {
                var index;
                if ((index = $.inArray(callback, this.$___listeners[listenerName])) !== -1) {
                    this.$___listeners[listenerName].splice(index, 1);
                }
            }
        },
        fireListener: function(listenerName) {
            var t = this;
            var args = Array.prototype.slice.call(arguments, 1);
            if (this.$___listeners[listenerName]) {
                $.each(this.$___listeners[listenerName], function(i, callback) {
                    if (callback) {
                        callback.apply(t, args);
                    }
                });
            }
        },
        isInstanceOf: function(klass) {
            if ($.type(klass) === 'string') {
                klass = window[klass];
            }
            var parent_or_self = this['class'];
            while (klass !== null ) {
                if (klass === parent_or_self) {
                    return true;
                }
                parent_or_self = parent_or_self.superclass;
            }
            return false;
        },
        log: function() {
            if (window.console && window.console.log) {
                console.log([this.className + ":"].concat(Array.prototype.slice.call(arguments)));
            }
        },
        error: function(msg) {
            throw (this.className + ": " + msg);
        },
        report: function(msg) {
            t.log(this.className + ": " + msg);
        },
        destroy: function() {},
        __randString: function() {
            return (Math.random() * 10000000000).toString().split('.')[0];
        },
        __keyCount: function(obj) {
            var count = 0;
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    count++;
                }
            }
            return count;
        },
        ___any: function(array, cond) {
            for (var i = 0; i < array.length; i++) {
                if (cond.call(this, array[i])) {
                    return true;
                }
            }
            return false;
        },
        ___all: function(array, cond) {
            for (var i = 0; i < array.length; i++) {
                if (!cond.call(this, array[i])) {
                    return false;
                }
            }
            return true;
        }
    });
})(jQuery);
(function($) {
    TmzClass.create('TmzModel', {
        constructor: function(attributes, options) {
            this.$attributes = attributes || {};
            TmzObject.apply(this, [options]);
        }
    });
})(jQuery);
(function($) {
    TmzClass.create('TmzCFBackedModel', 'TmzModel', {
        constructor: function(attributes, options) {
            if (attributes.activeDate) {
                attributes.activeDate = new Date(Date.parse(attributes.activeDate));
            }
            TmzModel.apply(this, [attributes, options]);
        },
        fromGSA: function() {
            return !this.$attributes.CrawlDate;
        },
        title: function() {
            return this.$attributes.title;
        },
        description: function() {
            return this.$attributes.description;
        },
        thumbnailUrl: function() {
            return this.$attributes.thumbnailUrl;
        },
        activeDate: function() {
            return this.$attributes.activeDate;
        },
        url: function() {
            return this.$attributes.RecordLink;
        }
    });
})(jQuery);
(function($) {
    TmzClass.create('TmzGalleryModel', 'TmzCFBackedModel', {
        constructor: function(attributes, options) {
            var t = this;
            if (attributes.images) {
                attributes.images = $.map(attributes.images, function(imageJson, i) {
                    return new TmzGalleryImageModel(imageJson,{
                        gallery: t
                    });
                });
            }
            if (attributes.nextGallery) {
                attributes.nextGallery = new TmzGalleryModel(attributes.nextGallery);
            }
            if (attributes.prevGallery) {
                attributes.prevGallery = new TmzGalleryModel(attributes.prevGallery);
            }
            if (attributes.relatedGalleries) {
                var relatedGalleries = attributes.relatedGalleries;
                attributes.relatedGalleries = [];
                $.each(relatedGalleries, function(index, value) {
                    attributes.relatedGalleries.push(new TmzGalleryModel(value));
                });
            }
            if (attributes.recentGalleries) {
                var recentGalleries = attributes.recentGalleries;
                attributes.recentGalleries = [];
                $.each(recentGalleries, function(index, value) {
                    attributes.recentGalleries.push(new TmzGalleryModel(value));
                });
            }
            TmzCFBackedModel.apply(this, [attributes, options]);
        },
        adPosition3: function() {
            return this.$attributes.adPosition3;
        },
        adPosition5: function() {
            return this.$attributes.adPosition5;
        },
        nextGallery: function() {
            return this.$attributes.nextGallery;
        },
        prevGallery: function() {
            return this.$attributes.prevGallery;
        },
        permalink: function() {
            if (this.$attributes.RecordLink) {
                return this.$attributes.RecordLink;
            } else if (this.$attributes.URL) {
                return this.$attributes.URL;
            } else {
                return "/photos/" + this.slug();
            }
        },
        slug: function() {
            return this.$attributes.slug;
        },
        relatedGalleries: function() {
            return this.$attributes.relatedGalleries;
        },
        recentGalleries: function() {
            return this.$attributes.recentGalleries;
        },
        thumbnailOverrideSize: function(size) {
            if (!this.$attributes['thumbnail-override']) {
                return null ;
            }
            var retJson;
            $.each(this.$attributes['thumbnail-override'], function(i, json) {
                if (json.value === size) {
                    retJson = json;
                }
            });
            return retJson;
        },
        collections: function() {
            return this.$attributes.collections;
        },
        images: function() {
            return this.$attributes.images;
        },
        image: function(id) {
            for (i = 0; i < this.$attributes.images.length; i++) {
                if (this.$attributes.images[i].id() === id) {
                    return this.$attributes.images[i];
                }
            }
            return null ;
        },
        photos: function() {
            this.images.apply(this, arguments);
        },
        thumbnailUrl: function() {
            if (this.$attributes.thumbnailUrl) {
                return this.$attributes.thumbnailUrl.replace('_thumb.', '_full.');
            } else {
                return "";
            }
        },
        credit: function() {
            return this.$attributes['photo-credit-text-current'];
        },
        hasInterstitials: function() {
            return !this.disableInterstitials();
        },
        disableInterstitials: function() {
            return ( this.$attributes.disableInterstitials === true) ;
        },
        safeGallery: function() {
            return ( this.$attributes.safeGallery === true) ;
        },
        interstitialFrequency: function() {
            return 5;
        },
        rightrailFrequency: function() {
            return 3;
        }
    });
})(jQuery);
(function($) {
    TmzClass.create('TmzGalleryImageModel', 'TmzCFBackedModel', {
        constructor: function(attributes, options) {
            this.$gallery = null ;
            if (options.gallery) {
                this.$gallery = options.gallery;
            }
            TmzCFBackedModel.apply(this, [attributes, options]);
        },
        permalink: function() {
            if (this.gallery()) {
                return ( this.gallery().permalink().replace(/\/$/, '') + "/images/" + this.slug() + "/") ;
            } else {
                return null ;
            }
        },
        slug: function() {
            return this.$attributes.Slug;
        },
        setGallery: function(g) {
            this.$gallery = g;
        },
        gallery: function() {
            return this.$gallery;
        },
        url: function(value, searchForWatermark) {
            var size = this.size(value, searchForWatermark);
            return (size) ? size.url : null ;
        },
        "symbolforce-id": function() {
            return this.$attributes['symbolforce-id'];
        },
        size: function(value, searchForWatermark) {
            var retJson;
            if (typeof searchForWatermark === "undefined") {
                searchForWatermark = true;
            }
            if (searchForWatermark) {
                retJson = this.size(value + "-watermark", false);
            }
            if (!retJson) {
                $.each(this.$attributes['thumbnails-json'], function(i, json) {
                    if (json.value === value) {
                        retJson = json;
                    }
                });
            }
            return retJson;
        },
        title: function() {
            return this.$attributes.title;
        },
        caption: function() {
            return this.$attributes.caption || this.$gallery.description();
        },
        hasZoomview: function() {
            return false;
        },
        zoomspots: function() {
            return [];
        },
        pollCode: function() {
            return this.$attributes['poll-code'];
        },
        hasPoll: function() {
            return ( this.pollCode() !== null ) ;
        },
        credit: function() {
            return this.$gallery.credit() || this.$attributes['photo-credit-text-current'] || "";
        }
    });
})(jQuery);
(function($) {
    TmzClass.create('TmzVideoModel', 'TmzCFBackedModel', {
        constructor: function(attributes) {
            if ($.type(attributes.duration) === 'string') {
                attributes.duration = parseInt(attributes.duration, 10);
            }
            TmzCFBackedModel.apply(this, arguments);
        },
        thumbnailUrl: function(kalturaOptions) {
            kalturaOptions = kalturaOptions || {};
            if (!this.fromGSA() && this.$attributes.thumbnailUrl.indexOf('cdnbakmi.kaltura.com') === -1) {
                return this.$attributes.thumbnailUrl.replace('_thumb.', '_still.');
            } else {
                var urlSuffix = "";
                $.each(kalturaOptions, function(k, v) {
                    urlSuffix += '/' + k + '/' + v;
                });
                return this.$attributes.thumbnailUrl + urlSuffix;
            }
        },
        kalturaId: function() {
            if (this.$attributes.kalturaId) {
                return this.$attributes.kalturaId;
            } else {
                if (this.$attributes.DisplayURL) {
                    var match = this.$attributes.DisplayURL.match(/\/([0-9a-z]{1}[_\-][0-9a-z]{8})/);
                    if (match) {
                        return match[1].replace('-', '_');
                    }
                }
            }
            return null ;
        },
        slug: function() {
            if (this.$attributes.Slug) {
                return this.$attributes.Slug;
            } else {
                var kid = this.kalturaId();
                if (kid) {
                    return kid.replace('_', '-');
                } else {
                    return '';
                }
            }
        },
        dsMediaKey: function() {
            if (!this.kalturaId() && this.$attributes.DisplayURL) {
                var match = this.$attributes.DisplayURL.match(/(mediaKey=)?([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/);
                if (match) {
                    return match[2];
                }
            }
            return null ;
        },
        brightcoveId: function() {
            if (!this.kalturaId() && this.$attributes.DisplayURL) {
                var match = this.$attributes.DisplayURL.match(/(mediaKey=|\/)?([0-9]+)/);
                if (match) {
                    return match[2];
                }
            }
            return null ;
        },
        videoUrl: function() {
            return this.$attributes.videoUrl;
        },
        duration: function() {
            return this.$attributes.duration;
        },
        durationSeconds: function() {
            return this.duration() % 60;
        },
        durationMinutes: function() {
            return Math.floor(this.duration() / 60);
        },
        views: function() {
            return this.$attributes.views;
        },
        plays: function() {
            return this.$attributes.plays;
        },
        publishDate: function() {
            return this.$attributes.publishDate;
        },
        url: function() {
            return "http://" + window.location.hostname + "/videos/" + this.kalturaId() + "/";
        }
    });
})(jQuery);
(function($) {
    TmzClass.create('TmzGalleryCollectionModel', 'TmzCFBackedModel', {
        constructor: function(attributes) {
            TmzCFBackedModel.apply(this, arguments);
        },
        slug: function() {
            return this.$attributes.slug;
        }
    });
})(jQuery);
(function($) {
    TmzClass.create('TmzView', 'TmzObject', {
        constructor: function(options) {
            $.extend({
                needsUniqueId: false
            }, options || {});
            TmzObject.apply(this, [options]);
            this.$___drawn = false;
            this.$___where = null ;
            this.$___originalWhere = null ;
            if (this.$options.where) {
                this.setWhere(this.$options.where);
            }
            if (this.where() && this.$options.draw === true) {
                this.draw();
            }
        },
        hasWhere: function() {
            return this.where().size() > 0;
        },
        setWhere: function(where) {
            this.$___where = where;
        },
        where: function() {
            return $(this.$___where);
        },
        wasDrawn: function() {
            return this.$___drawn;
        },
        draw: function(options) {
            options = $.extend({
                showOnlyAfterDrawn: true,
                secludedDiv: true
            }, options || {});
            if (this.wasDrawn()) {
                throw (this.className + ': already called draw(), try ___redraw()');
            }
            if (options.where) {
                this.setWhere(options.where);
            }
            if (this.where() === null || this.where().length === 0) {
                if ($.type(this.$___where) === 'string') {
                    this.error('You have set where as a selector, but that selector does not match any elements');
                } else {
                    this.error('Cannot draw() without first setting a valid where');
                }
            }
            this.fireListener('beforeDraw');
            if (options.secludedDiv) {
                this.$___originalWhere = this.$___where;
                this.setWhere($('<div></div>').appendTo(this.where().slice(0, 1)));
            }
            if (options.showOnlyAfterDrawn) {
                this.where().css('visibility', 'hidden');
            }
            this.where().addClass(this.cssClassNames()).data('tmz-this', this);
            if (this.$options.needsUniqueId) {
                this.where().attr('id', this.___toDash(this.className) + Math.random().toString().substring(2, 20));
            }
            if (this.___hardcodedWidth()) {
                this.where().width(this.___hardcodedWidth());
            }
            if (this.___hardcodedHeight()) {
                this.where().height(this.___hardcodedHeight());
            }
            if (this.drawFunction) {
                this.drawFunction.call(this);
            }
            if (options.showOnlyAfterDrawn) {
                this.where().css('visibility', '');
            }
            this.$___drawn = true;
            this.fireListener('afterDraw');
        },
        ensureDrawn: function(options) {
            if (!this.wasDrawn()) {
                this.draw(options || {});
            }
        },
        ___redraw: function() {
            if (this.wasDrawn()) {
                this.fireListener('beforeRedraw');
                this.$___drawn = false;
                this.where().empty();
                this.draw({
                    secludedDiv: false
                });
                this.fireListener('afterRedraw');
            } else {
                throw (this.className + ': cannot redraw(), was never draw()n');
            }
        },
        show: function() {
            this.where().show();
        },
        hide: function() {
            this.where().hide();
        },
        destroy: function() {
            if (this.wasDrawn()) {
                this.where().remove();
            }
        },
        width: function() {
            if (this.___hardcodedWidth()) {
                return this.___hardcodedWidth();
            } else if (this.wasDrawn()) {
                return this.where().outerWidth(true);
            } else {
                throw (this.className + ": Cant get width before element is drawn");
            }
        },
        height: function() {
            if (this.___hardcodedHeight()) {
                return this.___hardcodedHeight();
            } else if (this.wasDrawn()) {
                return this.where().outerHeight(true);
            } else {
                throw (this.className + ": Cant get height before element is drawn");
            }
        },
        scoped: function(selector) {
            return $(selector, this.where());
        },
        cssClassNames: function() {
            return this.___toDash(this.className);
        },
        ___hardcodedWidth: function() {
            return this.$options.width;
        },
        ___hardcodedHeight: function() {
            return this.$options.height;
        },
        ___toDash: function() {
            return this.className.replace(/([A-Z])/g, function($1) {
                return "-" + $1.toLowerCase();
            }).substring(1).replace(/-view$/, "");
        }
    });
})(jQuery);
(function($) {
    TmzClass.create('TmzLightbox', 'TmzView', {
        DEFAULT_INTERVAL: 250,
        constructor: function(url, options) {
            var t = this;
            t.$url = url;
            t.$options = $.extend({
                where: $('<div></div>').appendTo('body'),
                initialHeight: 1000,
                fixedHeight: null ,
                resizeContinuously: true,
                resizeInterval: t.DEFAULT_INTERVAL,
                outsideClickCloses: true,
                offsetFromWindowTop: 20
            }, (options || {}));
            t.$trap = null ;
            t.$resizeIntervalID = null ;
            if (t.$options.fixedHeight) {
                t.$options.initialHeight = t.$options.fixedHeight;
                t.$options.resizeContinuously = false;
            }
            t.$currentLightboxHeight = null ;
            t.$recenterFrameCallback = function() {
                t.___recenterFrame();
            }
            ;
            TmzView.apply(this, [this.$options]);
            t.draw();
        },
        show: function() {
            var t = this;
            var trapHeight = $(document).height();
            t.$trap = $('<div class="tmz-lightbox-modal-trap"></div>').css('height', trapHeight).appendTo('body').click(function(e) {
                e.preventDefault();
                if (t.$options.outsideClickCloses) {
                    t.destroy();
                }
            });
            t.___recenterFrame();
            t.where().show();
        },
        hide: function() {
            this.where().hide();
            this.$trap.remove();
            this.$trap = null ;
        },
        destroy: function() {
            this.hide();
            $(this.___lightboxDocument()).unbind('keyup.tmzLightbox');
            $(document).unbind('keyup.tmzLightbox');
            this.where().remove();
            if (this.$resizeIntervalID) {
                clearInterval(this.$resizeIntervalID);
            }
        },
        drawFunction: function() {
            var t = this;
            var keyupEventHandler = $.proxy(t.___keyupHandler, t);
            $(document).bind('keyup.tmzLightbox', keyupEventHandler);
            window.lightboxReadyCallback = function() {
                $(t.___lightboxDocument()).bind('keyup.tmzLightbox', keyupEventHandler);
                t.___resizeIframeHeight();
                if (t.$options.resizeContinuously) {
                    t.$resizeIntervalID = setInterval(function() {
                        t.___resizeIframeHeight();
                    }, t.$options.resizeInterval);
                }
            }
            ;
            t.where().append('<div class="close"></div><div class="frame shadow"><iframe scrolling="no" allowfullscreen src="' + this.$url + '"></iframe></div>');
            this.___setIframeHeight(t.$options.initialHeight);
            t.where().css('top', $(window).scrollTop() + t.$options.offsetFromWindowTop);
            t.scoped('> .close').click(function(e) {
                e.preventDefault();
                t.destroy();
            });
            t.scoped('> .frame > iframe').get(0).contentWindow.containingLightbox = t;
            t.scoped('> .frame > iframe').get(0).contentWindow.containingWindow = window;
            $(window).resize(t.$recenterFrameCallback);
        },
        ___keyupHandler: function(e) {
            var t = this;
            if (e.which === 27) {
                e.preventDefault();
                t.destroy();
            }
        },
        ___recenterFrame: function() {
            var offsetLeft = Math.max(($(window).width() - this.where().width()) / 2, 0);
            this.where().css('left', offsetLeft);
        },
        ___lightboxRoot: function() {
            var root = this.scoped('> .frame > iframe').contents().find('html');
            if ($.browser && $.browser.msie) {
                return root.parent();
            }
            return root;
        },
        ___lightboxDocument: function() {
            var iframe = this.scoped('> .frame > iframe').get(0);
            return iframe.contentWindow.document;
        },
        ___resizeIframeHeight: function() {
            var newLightboxHeight;
            if (this.$options.fixedHeight) {
                newLightboxHeight = this.$options.fixedHeight;
            } else {
                newLightboxHeight = this.___lightboxRoot().height();
            }
            this.___setIframeHeight(newLightboxHeight);
        },
        ___setIframeHeight: function(height) {
            if (this.$currentLightboxHeight !== height) {
                this.scoped('> .frame').height(height);
                this.scoped('> .frame > iframe').attr('height', height);
                this.$currentLightboxHeight = height;
            }
        }
    });
})(jQuery);
function allowfullscreen() {
    var element = document.body;
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) {
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null ) {
            wscript.SendKeys("{F11}");
        }
    }
    return false;
}
(function tmzKalturaPlayerView($) {
    'use strict';
    function assetUrl() {
        return '//ll-assets.tmz.com/kaltura-player/';
    }
    if (window.location.hostname.match(/dev.com/)) {
        var uiConfMap = {
            tmz: {
                uiConfId: 35790831,
                wid: '_591531',
                shareUrl: 'http://www.tmz.com/videos/{mediaProxy.entry.id}',
                adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/tmz/staging/video&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url={utility.referrer_url}&description_url=http://www.tmz.com/videos/{mediaProxy.entry.id}&vid={mediaProxy.entry.id}&correlator={utility.random}&cmsid=2904'
            },
            toofab: {
                uiConfId: 23386221,
                wid: '_682882',
                shareUrl: 'http://www.toofab.com/videos/{mediaProxy.entry.id}',
                adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/toofab/staging/video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]'
            },
            fishwrapper: {
                uiConfId: 23677451,
                wid: '_1369352',
                shareUrl: 'http://www.fishwrapper.com/videos/{mediaProxy.entry.id}',
                adCall: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x360&ad_rule=0&iu=/55153744/fishwrapper/staging/video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url={utility.referrer_url}&cmsid=2904&vid={mediaProxy.entry.id}&correlator={utility.random}'
            }
        };
    } else {
        var uiConfMap = {
            tmz: {
                uiConfId: 35790831,
                wid: '_591531',
                shareUrl: 'http://www.tmz.com/videos/{mediaProxy.entry.id}',
                adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/tmz/video&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url={utility.referrer_url}&description_url=http://www.tmz.com/videos/{mediaProxy.entry.id}&vid={mediaProxy.entry.id}&correlator={utility.random}&cmsid=2904'
            },
            toofab: {
                uiConfId: 23386221,
                wid: '_682882',
                shareUrl: 'http://www.toofab.com/videos/{mediaProxy.entry.id}',
                adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/toofab/video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]'
            },
            fishwrapper: {
                uiConfId: 23677451,
                wid: '_1369352',
                shareUrl: 'http://www.fishwrapper.com/videos/{mediaProxy.entry.id}',
                adCall: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/55153744/fishwrapper/video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]'
            }
        };
    }
    var tmzEmbedSnippet = '<iframe src="//cdnapisec.kaltura.com/p/591531/sp/59153100/embedIframeJs/uiconf_id/35790831/partner_id/591531?iframeembed=true&playerId=kaltura_player_1413478522&entry_id={mediaProxy.entry.id}" width="664" height="421" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0" style="width: 700; height: 394px;"></iframe>';
    var toofabEmbedSnippet = '<iframe src="//cdnapisec.kaltura.com/p/682882/sp/68288200/embedIframeJs/uiconf_id/23386221/partner_id/682882?iframeembed=true&playerId=kaltura_player_1413478522&entry_id={mediaProxy.entry.id}" width="400" height="333" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0" style="width: 400px; height: 333px;"></iframe>';
    function vastRandomNum() {
        return Math.ceil(Math.random() * 100000000000000000);
    }
    function hideLaunchQuote(options) {
        var $playerDiv = $(options.where);
        var $launchQuoteDiv = $playerDiv.find('.launch-quote');
        if ($launchQuoteDiv.length > 0) {
            $launchQuoteDiv.hide();
        }
        var $swipe = $playerDiv.parent().parent().prev('.primary-image-swipe');
        $swipe.hide();
    }
    function getEmbedSnippet() {
        var site = window.location.host.match(/tmz/) ? 'tmz' : 'toofab';
        switch (site) {
        case 'tmz':
            return tmzEmbedSnippet;
        case 'toofab':
            return toofabEmbedSnippet;
        }
    }
    var updatedAssetUrl;
    function getAssetUrl() {
        updatedAssetUrl = ASSETS_BASEURL.substr(ASSETS_BASEURL.indexOf('://') + 1);
    }
    getAssetUrl();
    function retrieve(n) {
        var m, k = 'kx' + n, results;
        if (localStorage) {
            results = localStorage[k] || '';
        } else if (navigator.cookieEnabled) {
            m = d.cookie.match(k + '=([^;]*)');
            results = m && encodeURIComponent(m[1]) || '';
        } else {
            results = '';
        }
        return results;
    }
    var kruxTokens = (function() {
        var ksg = (retrieve('segs') && retrieve('segs').split(',')) || [];
        var kuid = retrieve('user');
        var khost = encodeURIComponent(location.hostname);
        var krux_string = encodeURIComponent('ksg=' + ksg + '&kuid=' + kuid + '&khost=' + khost);
        return {
            value: function() {
                return krux_string;
            }
        };
    })();
    function loadTaboola(entryID, prodURL) {
        window._taboola = window._taboola || [];
        _taboola.push({
            notify: 'videoPlay',
            id: entryID,
            url: prodURL
        })
    }
    ;TmzClass.create('TmzKalturaPlayerView', 'TmzView', {
        constructor: function(options) {
            var t = this;
            $.extend({
                secludedDiv: false
            }, options || {});
            t.$initialized = false;
            t.$cacheSt = options.cacheSt;
            t.$uniqueIdNumber = t.$cacheSt + '-' + vastRandomNum();
            t.$uniqueId = 'kaltura-player-' + t.$uniqueIdNumber;
            t.$autoPlay = options.autoPlay;
            t.$autoMute = options.autoMute;
            t.$width = options.width || 700;
            t.$height = options.height || 394;
            t.$kdp = null ;
            t.$currentVideo = null ;
            t.playerDrawn = false;
            t.$playerOptions = options.playerOptions;
            t.$entryId = t.$playerOptions.entryId || '';
            t.$entryId = t.$entryId.replace('-', '_');
            t.$enableDevAdMode = window.location.hostname.match(/dev/) ? true : false;
            t.$defaultAdOptions = {
                plugin: false,
                disableCompanionAds: 'false',
                htmlCompanions: 'adCompanionBanner:300:250',
                debugMode: 'true',
                adsManagerLoadedTimeout: 15000,
                timeout: 10,
                leadWithFlash: true
            };
            t.$defaultPlaylistOptions = {
                iframeHTML5Js: updatedAssetUrl + 'js/videos/tmzPlaylistAPI.js',
                plugin: false,
                width: '50%',
                height: '50%',
                containerPosition: 'right',
                kpl0Id: ''
            };
            t.$defaultPlayerOptions = {
                targetId: t.$uniqueId,
                wid: '_591531',
                uiconf_id: 35790831,
                'Kaltura.LoadingSpinner.Disabled': true,
                'Kaltura.UseAppleAdaptive': false,
                readyCallback: function(playerId) {
                    t = TmzKalturaPlayerView.getPlayerForPlayerId(playerId);
                    t.setKdp();
                    var $player = $('#' + playerId + '_ifp');
                    var $iframe = $player.contents();
                    if ($player.parents('.superpost').length) {
                        $iframe.find('.videoHolder').addClass('alt');
                    }
                    t.$kdp.kBind('mediaReady', function() {
                        t.$kdp.setKDPAttribute('tmzShare', 'template', t.playerShareTemplate());
                        if (t.___shouldAutoPlay()) {}
                        t.$kdp.sendNotification('hideClosedCaptions');
                    });
                    t.$kdp.kBind('adStart', function() {
                        hideLaunchQuote(options);
                    });
                    t.$kdp.kBind('adEnd', function() {
                        var entryID = t.$entryId;
                        var prodURL = 'http://www.tmz.com/videos/' + t.$entryId;
                        loadTaboola(entryID, prodURL);
                    });
                    t.$kdp.kBind('doPlay', function() {
                        hideLaunchQuote(options);
                    });
                    t.$kdp.kBind('relatedVideoSelect', function() {
                        parent.s.prop46 = parent.s.eVar46 = 'recommendedvideo';
                        parent.s.tl();
                    });
                    t.$kdp.kBind('replayEvent', function() {
                        parent.s.events = 'event20';
                        parent.s.tl();
                    });
                },
                flashvars: {
                    autoPlay: false,
                    autoMute: t.$autoMute,
                    'volumeControl.useCookie': false,
                    streamerType: 'http',
                    externalInterfaceDisabled: false,
                    IframeCustomPluginCss1: updatedAssetUrl + 'css/kaltura/1.0.0/kaltura_external_css.css',
                    IframeCustomPluginJs1: updatedAssetUrl + 'js/videos/tmzCustomFormater.js',
                    'loadingSpinner.plugin': false,
                    'controlBarContainer': {
                        'plugin': true,
                        'hover': true
                    },
                    closedCaptions: {
                        plugin: true,
                        width: '0%',
                        height: '0%',
                        includeInLayout: false,
                        layout: 'ontop',
                        useCookie: false,
                        fontFamily: 'Arial',
                        fontsize: '12',
                        fontColor: '0xFFFFFF',
                        bg: '0x335544',
                        useGlow: false,
                        glowBlur: '4',
                        glowColor: '0x133693',
                        hideClosedCaptions: true,
                        hideWhenEmpty: true
                    },
                    share: {
                        plugin: false
                    },
                    tmzShare: {
                        plugin: true,
                        iframeHTML5Js: updatedAssetUrl + 'js/videos/tmzSharePlugin.js',
                        loadingPolicy: 'onDemand',
                        position: 'before',
                        width: '0%',
                        height: '0%',
                        includeInLayout: false,
                        parent: 'controlsContainer',
                        align: 'right',
                        socialShareURL: 'http://' + window.location.hostname + '/videos/{mediaProxy.entry.id}',
                        order: '6'
                    },
                    doubleClick: {
                        plugin: false,
                        adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&cust_params=sample_ct%3Dlinear&correlator='
                    },
                    playlistAPI: t.$defaultPlaylistOptions,
                    TMZConfigPlugin: {
                        iframeHTML5Js: updatedAssetUrl + 'js/videos/TMZConfigPlugin.js',
                        plugin: true
                    },
                    related: {
                        parent: 'topBarContainer',
                        order: '4',
                        autoContinueTime: '5',
                        itemsLimit: '10',
                        displayOnPlaybackDone: 'true',
                        sendContextWithPlaylist: 'false',
                        autoContinueEnabled: 'false',
                        storeSession: 'true',
                        template: '' + '<img class="screen-bg" src="<%=nextItem.thumbnailUrl%>/width/250" />' + '<div class="vid large">' + '<a href="#" data-entry-id="<%=nextItem.id%>" data-click="changeMedia">' + '<div class="thumbnail">' + '<img class="thumb-bg" src="<%=nextItem.thumbnailUrl%>/width/250" />' + '<div class="play-btn"></div>' + '</div>' + '<div class="content">' + '<span class="playlistTitle">Up Next</span>' + '<h3 class="item-title"><%= nextItem.name %></h3>' + '</div>' + '</a>' + '</div>' + '<% $.each(moreItems, function(idx, item) { %>' + '<div class="vid small">' + '<a href="#" data-entry-id="<%=item.id%>" data-click="changeMedia">' + '<div class="thumbnail">' + '<img class="thumb-bg" src="<%=item.thumbnailUrl%>/width/250" />' + '<div class="play-btn"></div>' + '</div>' + '<div class="content">' + '<h3 class="item-title"><%= item.name %></h3>' + '</div>' + '</a>' + '</div>' + '<% }); %>' + '<a class="btn-replay" data-notification="doReplay"><span class="btn-bg"></span><span class="label">Replay</span></a>' + '<div class="fullscreen-bg"></div>',
                        playlistId: '',
                        plugin: 'true'
                    },
                    'omnitureOnPage': {
                        'additionalEvarsAndProps': 'eVar1,eVar2,eVar3,eVar11,eVar12,eVar8,prop1,prop2,prop3,prop11,prop12,prop8',
                        'additionalEvarsAndPropsValues': 'TMZ.us,Video,Video,{mediaProxy.entry.id},{mediaProxy.entry.duration},{mediaProxy.entry.name|escape},TMZ.us,Video,Video,{mediaProxy.entry.id},{mediaProxy.entry.duration},{mediaProxy.entry.name|escape}'
                    },
                    adsOnReplay: true
                },
                uiVars: [{
                    'key': 'EmbedPlayer.EnableIpadHTMLControls',
                    'value': 'false'
                }, {
                    'key': 'EmbedPlayer.NativeControlsMobileSafari',
                    'value': 'true'
                }, {
                    'key': 'EmbedPlayer.EnableIpadNativeFullscreen',
                    'value': 'true'
                }],
                cache_st: t.$cacheSt,
                entry_id: t.$entryId,
                height: t.$height,
                width: t.$width,
                plugins: {}
            };
            window[t.___jsInterfaceReadyName()] = function() {
                return t.$playerDrawn;
            }
            ;
            window[t.___jsCallbackReadyName()] = function(playerId) {
                var player = TmzKalturaPlayerView.players[playerId];
                if (player) {
                    player.jsCallbackReady(playerId);
                }
            }
            ;
            options.secludedDiv = false;
            TmzView.apply(t, [t.___processOptions(options)]);
        },
        playerShareTemplate: function() {
            var t = this;
            var template = '<div class="panel-right">' + '<span> Share </span>' + '<input value="<%= tmzShare.getConfig(\'shareURL\') %>" /> <br/><br/>';
            if (t.___canEmbed()) {
                template += '<span> Embed </span>' + '<input value=\'' + getEmbedSnippet() + '\' />';
            }
            template += '<div class="divider"></div>' + '<h3>Social Share</h3>' + '<ul>' + '<% $.each(networks, function(idx, network){ %>' + '<li style="list-style: none; display: inline;"><a href="<%=network.url%>" data-click="openPopup"><img src=' + assetUrl() + '<%=network.name.toLowerCase()%>-icon.png' + '></a></li>' + '<% }); %>' + '</ul>' + '</div>';
            return template;
        },
        playerTemplate: function() {
            var t = this;
            var tagStyle = t.$options.thumbnail ? 'style="width: 100%; height: 100%;"' : '';
            return '<div id="' + t.$uniqueId + '" ' + tagStyle + '>' + '<span itemprop="name" content=""></span>' + '<span itemprop="description" content=""></span>' + '<span itemprop="duration" content=""></span>' + '<span itemprop="thumbnail" content=""></span>' + '<span itemprop="width" content="' + t.___getPlayerWidth() + '"></span>' + '<span itemprop="height" content="' + t.$height + '"></span>' + '</div>';
        },
        ___getPlayerWidth: function() {
            var t = this;
            return t.$width;
        },
        ___processOptions: function(overrideOptions) {
            var t = this;
            if (overrideOptions.playerOptions.thumbnailUrl !== '') {
                t.$defaultPlayerOptions.flashvars.thumbnailUrl = overrideOptions.playerOptions.thumbnailUrl;
            }
            // if (overrideOptions.ads) {
            //     t.$defaultPlayerOptions.doubleClick = t.$defaultAdOptions;
            //     t.$defaultPlayerOptions.doubleClick.adTagUrl = overrideOptions.ads.prerollUrl;
            // }
            if (overrideOptions.playlistId) {
                t.$defaultPlayerOptions.flashvars.tmzRelated.playlistId = overrideOptions.playlistId;
                t.$defaultPlayerOptions.flashvars.playlistAPI.kpl0Id = overrideOptions.playlistId;
                if (overrideOptions.playerOptions.entryId) {
                    t.$defaultPlayerOptions.flashvars.playlistAPI.initItemEntryId = overrideOptions.playerOptions.entryId;
                }
            }
            if (overrideOptions.cssSkin) {
                t.$defaultPlayerOptions.flashvars.IframeCustomPluginCss1 = overrideOptions.cssSkin;
            }
            if (overrideOptions.site) {
                if (overrideOptions.uiConfId) {
                    t.$defaultPlayerOptions.uiconf_id = overrideOptions.uiConfId;
                } else {
                    t.$defaultPlayerOptions.uiconf_id = uiConfMap[overrideOptions.site].uiConfId;
                }
                t.$defaultPlayerOptions.wid = uiConfMap[overrideOptions.site].wid;
                t.$defaultPlayerOptions.flashvars.share.shareURL = uiConfMap[overrideOptions.site].shareUrl;
                t.$defaultPlayerOptions.flashvars.share.socialShareURL = uiConfMap[overrideOptions.site].shareUrl;
            }
            return $.extend(t.$defaultPlayerOptions, overrideOptions || {});
        },
        makeCurrentTmzVideoFromKDP: function() {
            var t = this;
            t.$currentVideo = new TmzVideoModel({
                title: t.$kdp.evaluate('{mediaProxy.entry.name}'),
                description: t.$kdp.evaluate('{mediaProxy.entry.description}'),
                duration: t.$kdp.evaluate('{mediaProxy.entry.duration}'),
                kalturaId: t.$kdp.evaluate('{mediaProxy.entry.id}'),
                videoUrl: t.$kdp.evaluate('{mediaProxy.entry.dataUrl}'),
                thumbnailUrl: t.$kdp.evaluate('{mediaProxy.entry.thumbnailUrl}'),
                views: t.$kdp.evaluate('{mediaProxy.entry.views}'),
                plays: t.$kdp.evaluate('{mediaProxy.entry.plays}'),
                publishDate: t.$kdp.evaluate('{mediaProxy.entry.createdAt}'),
                categoryType: t.$kdp.evaluate('{mediaProxy.entry.categories}'),
                ratingType: t.$kdp.evaluate('{mediaProxy.entryMetaData.ContentRating}')
            });
        },
        uniqueId: function() {
            return this.$uniqueId;
        },
        setKdp: function() {
            var t = this;
            t.$kdp = document.getElementById(t.$uniqueId);
        },
        destroy: function() {
            if (window[this.___jsInterfaceReadyName()]) {
                window[this.___jsInterfaceReadyName] == null ;
            }
            TmzView.prototype.destroy.call(this);
        },
        jsCallbackReady: function(playerId) {
            var t = this;
            t.$initialized = true;
            t.$kdp = document.getElementById(playerId);
            t.makeCurrentTmzVideoFromKDP();
        },
        addKdpListener: function(kdpListenerName, callback) {},
        drawFunction: function() {
            var t = this;
            t.___errorUnlessDependenciesSatisfied();
            t.where().html(t.playerTemplate());
            var x = function(callback) {
                if (t.$autoPlay == true) {
                    t.$options.thumbnail = false;
                }
                if (t.$options.thumbnail == true) {
                    kWidget.thumbEmbed(t.options());
                } else {
                    kWidget.embed(t.options());
                }
                callback();
            }
            ;
            x(function() {
                TmzKalturaPlayerView.players.push(t);
            });
        },
        ___canEmbed: function() {
            var t = this;
            var theCategories = t.$kdp.evaluate('{mediaProxy.entry.categories}').split(',') || '';
            return theCategories.indexOf('No Share') === -1 && theCategories.indexOf('Agency') === -1;
        },
        ___shouldAutoPlay: function() {
            var t = this;
            return !(t.$options.autoplay == false);
        },
        ___shouldDisplayPlaylist: function() {
            var t = this;
            return t.$options.showPlaylist == true;
        },
        ___mediaUrl: function() {
            var t = this;
            var url = 'http://www.kaltura.com/index.php/kwidget/cache_st/' + t.$options.cacheSt + '/wid/_' + t.$options.partnerId + '/partner_id/' + t.$options.partnerId + '/uiconf_id/' + t.$options.uiconfId;
            if (t.$options.entryId) {
                url += '/entry_id/' + t.$options.entryId;
            }
            return url;
        },
        ___errorUnlessDependenciesSatisfied: function() {},
        ___jsInterfaceReadyName: function() {
            return 'jsInterfaceReady_' + this.$uniqueId;
        },
        ___jsCallbackReadyName: function() {
            return 'jsCallbackReady_' + this.$uniqueId;
        },
        ___swfCallbackFn: function(e) {
            this.$swfobjectDrawn = true;
        },
        drawView: function() {
            this.draw(this.$options);
        }
    });
    TmzKalturaPlayerView.players = [];
    TmzKalturaPlayerView.getPlayerForPlayerId = function(playerId) {
        var filtered = $.grep(TmzKalturaPlayerView.players, function(item, index) {
            return ( item.$uniqueId == playerId) ;
        });
        return filtered[0];
    }
    ;
})(jQuery);
(function($) {
    var DynamicCarousel = function(e, options) {
        var t = this;
        t.pane = $(e);
        t.options = options || {};
        t.options = $.extend({
            trimLeft: 0,
            trimRight: 0
        }, options);
        t.firstElementShown = 0;
        t.init = function() {
            t.pane.append($('<ul></ul>').css({
                'list-style-type': 'none',
                'padding': '0',
                'margin': '0',
                'overflow': 'hidden'
            }));
            t.content = t.pane.children().slice(0, 1);
            t.elementWidth = t.options.elementWidth || 0;
            t.elementsShown = t.options.elementsShown || 5;
            t.pane.css({
                overflow: 'hidden',
                'position': 'relative'
            });
            t.setPaneWidthFromElementsShown();
            t.setContentWidthFromElementWidth
            t.pane.data('dynamicCarousel', t);
            t.initDefaultScrollButtonBehavior();
            t.triggerEvents();
        }
        t.initDefaultScrollButtonBehavior = function() {
            $(t.options.nextButton).click(function(e) {
                e.preventDefault();
                t.scroll(1);
            });
            $(t.options.prevButton).click(function(e) {
                e.preventDefault();
                t.scroll(-1);
            });
            t.pane.bind('dc:previousNotAvailable ', function(e) {
                $(t.options.prevButton).addClass('dc-button-disabled');
            });
            t.pane.bind('dc:previousAvailable', function(e) {
                $(t.options.prevButton).removeClass('dc-button-disabled');
            });
            t.pane.bind('dc:nextNotAvailable', function(e) {
                $(t.options.nextButton).addClass('dc-button-disabled');
            });
            t.pane.bind('dc:nextAvailable', function(e) {
                $(t.options.nextButton).removeClass('dc-button-disabled');
            });
        }
        ;
        t.push = function(html, id) {
            t.insert(t.elements().length, html, id);
        }
        ;
        t.insert = function(index, html, id) {
            var el = $('<li></li>').css({
                'float': 'left',
                'width': t.elementWidth,
                'overflow': 'hidden'
            }).append($(html));
            if (id) {
                if (t.elementWithId(id)) {
                    return false;
                }
                el.data('dynamicCarouselElementId', id);
            }
            var priorElement = $('li', t.content).eq(index);
            if (priorElement.size()) {
                priorElement.before(el);
            } else {
                t.content.append(el);
            }
            t.setContentWidthFromElementWidth();
            if (t.elements().length == 1) {
                t.showFirst(1);
            } else {
                t.triggerEvents();
            }
        }
        ;
        t.unshift = function(html, id) {
            t.insert(0, html, id);
        }
        ;
        t.elements = function() {
            return t.content.find('li');
        }
        ;
        t.elementWithId = function(id) {
            t.elements().each(function(i, e) {
                if ($(e).data('dynamicCarouselElementId') == id) {
                    return $(e);
                }
            });
            return false;
        }
        ;
        t.removeById = function(id) {
            var element = false;
            t.elements().each(function() {
                if ($(this).data('dynamicCarouselElementId') == id) {
                    element = $(this)
                }
            });
            if (element) {
                element.remove()
                t.setContentWidthFromElementWidth();
                t.repositionFirstElementAfterRemove();
                return element;
            } else {
                return false;
            }
        }
        ;
        t.repositionFirstElementAfterRemove = function() {
            t.showFirst(t.boundedFirstElement(t.firstElementShown));
        }
        ;
        t.scroll = function(offset) {
            t.showFirst(t.firstElementShown + offset);
        }
        ;
        t.triggerEvents = function() {
            if (t.firstElementShown <= 1) {
                t.pane.trigger('dc:previousNotAvailable');
            } else {
                t.pane.trigger('dc:previousAvailable');
            }
            if (t.firstElementShown == t.greatestPossibleFirstElement()) {
                t.pane.trigger('dc:nextNotAvailable');
            } else {
                t.pane.trigger('dc:nextAvailable');
            }
        }
        ;
        t.showFirst = function(i) {
            i = t.boundedFirstElement(i);
            t.firstElementShown = i;
            t.setContentOffsetFromFirstElement();
            t.triggerEvents();
        }
        ;
        t.boundedFirstElement = function(i) {
            return Math.max(Math.min(t.elements().length, 1), Math.min(i, t.greatestPossibleFirstElement()));
        }
        ;
        t.greatestPossibleFirstElement = function() {
            return Math.max(Math.min(t.elements().length, 1), t.elements().length - t.elementsShown + 1);
        }
        ;
        t.setContentOffsetFromFirstElement = function() {
            t.content.css('margin-left', (1 - t.firstElementShown) * t.elementWidth - t.options.trimLeft + "px");
        }
        ;
        t.setPaneWidthFromElementsShown = function() {
            t.pane.css('width', t.elementsShown * t.elementWidth - t.options.trimLeft - t.options.trimRight);
        }
        ;
        t.setContentWidthFromElementWidth = function() {
            t.content.css('width', (t.elements().length * t.elementWidth) + "px");
        }
        t.init();
    }
    ;
    $.fn.dynamicCarousel = function(options) {
        return this.each(function() {
            (new DynamicCarousel(this,options));
        });
    }
    ;
})(jQuery);
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
        node.parentNode.insertBefore(gads, node);
    })();
}
var _qevents = _qevents || [];
var wbads = (function($, googletag, window, document, undefined) {
    'use strict';
    var _this = Object.create({});
    var settings;
    var dfp_settings;
    var display_provider = googletag;
    var unit_name = ""
      , required_params = {
        site_id: "",
        site_domain: "",
        ad_zone: "article"
    };
    var module_defaults = {
        enabled: true,
        debug_enabled: false,
        device_view: "main",
        selector: "wbads",
        data_store: "wbadsdata",
        evt_callbacks: {
            "pre.init": {},
            "post.init": {},
            "pre.enable.services": {},
            "post.enable.services": {},
            "pre.slot.discovery": {},
            "post.slot.discovery": {},
            "pre.slot.define": {},
            "post.slot.define": {},
            "pre.display.ads": {},
            "post.display.ads": {}
        },
        quantcast: {
            enabled: true,
            qacct: "p-21jBY4_vbHNJQ",
            segs: ""
        }
    };
    var dfp_defaults = {
        collapse_empty_divs: false,
        disable_initial_load: false,
        enable_single_request: false,
        enable_async_rendering: true,
        enable_video_ads: false,
        no_fetch: false,
        disable_publisher_console: false,
        category_exclusion: [],
        global_targeting: {
            qcs: {},
            category: "",
            channel: "",
            tag: [],
            url: "",
            adtest: ""
        }
    };
    var cmd = [];
    var slots = {}
      , slot_count = 0;
    var ad_sizes_list = {
        main: {
            leaderboard: [[728, 90]],
            leaderboard_flex: [[728, 90], [970, 66], [1010, 150], [970, 250], [1010, 250]],
            medium_rectangle: [[300, 250]],
            medium_rectangle_flex: [[300, 250], [300, 600]],
            skin: [[1, 1]]
        },
        smartphone: {
            leaderboard: [[320, 50]],
            leaderboard_flex: [[300, 250], [320, 50]],
            leaderboard_all: [[1, 1], [300, 250], [320, 50], [320, 360], [320, 480]],
            medium_rectangle: [[300, 250]],
            medium_rectangle_flex: [[300, 250], [300, 600]],
            skin: [[1, 1]]
        }
    };
    function Slot(id) {
        this.deferred = new $.Deferred();
        this.div_id = id;
        this.gpt_slot_object = false;
        this.slot_data = {
            tile: "",
            size_list: "",
            size_nickname: "",
            interstitial: false,
            refresh: false,
            slot_targeting: {},
            responsive_size_map: {},
            adsense_params: {}
        };
        var _this = this;
        defineCallback('pre.display.ads', function() {
            if (!_this.hasGptSlot()) {
                return;
            }
            $.each(_this.slot_data.slot_targeting, function(k, v) {
                if (k && v != '' && typeof v != 'undefined') {
                    _this.gpt_slot_object.setTargeting(k, v);
                }
            });
        });
    }
    Slot.prototype.setTargetingParam = function(key, value) {
        if (key && value != '' && typeof value != 'undefined') {
            this.slot_data.slot_targeting[key] = value;
        }
        return this;
    }
    ;
    Slot.prototype.refresh = function() {
        if (this.hasGptSlot()) {
            display_provider.pubads().refresh([this.gpt_slot_object]);
        }
        return this;
    }
    ;
    Slot.prototype.attachGptSlot = function(gptSlot) {
        this.gpt_slot_object = gptSlot;
        var _this = this;
        $.each(_this.slot_data.slot_targeting, function(k, v) {
            if (k && v != '' && typeof v != 'undefined') {
                _this.gpt_slot_object.setTargeting(k, v);
            }
        });
        this.deferred.resolve(this);
        return this;
    }
    ;
    Slot.prototype.hasGptSlot = function() {
        return this.gpt_slot_object ? true : false;
    }
    ;
    function init(site_id, site_domain, ad_zone, options, dfp_options) {
        var initArgs = {
            site_id: site_id,
            site_domain: site_domain,
            ad_zone: ad_zone,
            options: options,
            dfp_options: dfp_options
        };
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
        if (!settings.enabled) {
            debug("init :: WBADS ads disabled. no ad slots will be created or displayed");
            return _this;
        }
        $.each(settings.evt_callbacks, function(name, func) {
            defineCallback(name, func);
        });
        getGlobalTargetingParams();
        trigger("pre.init");
        if (settings.quantcast.enabled) {
            embedQuantCastDeliveryTag();
            embedQuantCastMeasurementTag();
        }
        pushCmd(function() {
            trigger("pre.enable.services");
            if (dfp_settings.collapse_empty_divs)
                googletag.pubads().collapseEmptyDivs();
            if (dfp_settings.disable_initial_load)
                googletag.pubads().disableInitialLoad();
            if (dfp_settings.enable_single_request)
                googletag.pubads().enableSingleRequest();
            if (dfp_settings.enable_async_rendering)
                googletag.pubads().enableAsyncRendering();
            if (dfp_settings.enable_video_ads)
                googletag.pubads().enableVideoAds();
            if (dfp_settings.no_fetch)
                googletag.pubads().noFetch();
            if (dfp_settings.disable_publisher_console)
                googletag.pubads().disablePublisherConsole();
            $.each(dfp_settings.global_targeting, function(key, value) {
                if (key && value != '' && typeof value != 'undefined') {
                    googletag.pubads().setTargeting(key, value);
                    debug("pre.enable.services :: setting global param[" + key + "]=" + value);
                }
            });
            googletag.enableServices();
            trigger("post.enable.services");
        });
        trigger("post.init");
        return _this;
    }
    function defineCallback(eventRef, eventBinding) {
        if ($.isFunction(eventBinding)) {
            bind(eventRef, eventBinding);
        }
        return _this;
    }
    function setGlobalOption(option, enabled) {
        if (typeof dfp_settings === "undefined") {
            defineCallback("pre.init", function() {
                setGlobalOption(option, enabled);
            });
            return _this;
        }
        if (typeof dfp_settings[option] !== 'undefined') {
            dfp_settings[option] = enabled;
            debug("setGlobalOption :: " + option + " set to: " + dfp_settings[option]);
        } else {
            debug("setGlobalOption :: No such option: " + option + " ...ABORTING! ");
        }
        return _this;
    }
    function setChannel(channel) {
        setGlobalTargetingParam('category', channel);
        return _this;
    }
    function setGlobalTargetingParam(param, value) {
        if (typeof dfp_settings === "undefined") {
            defineCallback("pre.init", function() {
                setGlobalTargetingParam(param, value);
            });
            return _this;
        }
        if (param && value != '' && typeof value != 'undefined') {
            dfp_settings.global_targeting[param] = value;
            googletag.pubads().setTargeting(param, value);
        }
        return _this;
    }
    function getGlobalTargetingParams() {
        dfp_settings.global_targeting["url"] = getUriPaths();
        dfp_settings.global_targeting["qcs"] = getQCSegs();
        getHashtags();
        dfp_settings.global_targeting["adtest"] = getParamFromUri("adtest");
    }
    function buildSlots() {
        trigger('pre.slot.discovery');
        if (!settings.enabled) {
            debug('buildSlots :: ads disabled. no ad slots will be created or displayed');
            return _this;
        }
        var cnt = 0;
        $('.' + settings.selector).each(function() {
            var adDiv = $(this);
            var id = adDiv.attr('id');
            if (id && getSlotById(id)) {
                return;
            }
            cnt++;
            defineNewAdSlot(adDiv, null , null , false, false);
        });
        debug('buildSlots :: found and created ' + cnt + ' ads');
        trigger('post.slot.discovery');
        return _this;
    }
    function addSlot(divId, sizeType, sizeList, interstitial, refresh) {
        if (!settings.enabled) {
            debug('addSlot :: ads disabled. no ad slots will be created or displayed');
            return _this;
        }
        defineNewAdSlot($('#' + divId), sizeType, sizeList, interstitial, refresh);
        debug('addSlot :: googletag slot[' + divId + '] added');
        return _this;
    }
    function setSlotTargetingParam(slotDivId, param, value) {
        var slot = getSlotById(slotDivId);
        if (!slot) {
            debug("setSlotTargetingParam :: slot[" + slotDivId + "] does not exist.");
            return _this;
        }
        slot.setTargetingParam(param, value);
        return _this;
    }
    function defineNewAdSlot(adDiv, sizeType, sizeList, interstitial, refresh) {
        if (!adDiv) {
            debug("defineNewAdSlot :: no adDiv exists! ABORTING.");
            return _this;
        }
        var divId = generateId(adDiv);
        if (getSlotById(divId)) {
            debug(divId + ' :: defineNewAdSlot :: slot already defined.');
            return _this;
        }
        slots[divId] = new Slot(divId);
        trigger('pre.slot.define', slots[divId]);
        pushCmd(function() {
            var gptSlot = adDiv.data(settings.data_store);
            var slotUnit = unit_name;
            if (gptSlot) {
                slots[divId].attachGptSlot(gptSlot);
            } else {
                var adSizeType = sizeType || adDiv.data('adsize');
                var adSizeList = sizeList || adDiv.data('adsize-list');
                var isInterstitial = (interstitial ? true : adDiv.data('interstitial')) || false;
                if (adSizeType == 'skin') {
                    slotUnit += '/skin';
                }
                var refreshable = (refresh ? true : adDiv.data('refresh')) || false;
                debug(divId + " :: defineNewAdSlot :: type:" + adSizeType + ", list:" + adSizeList + ", interstitial:" + isInterstitial + ", refreshable:" + refreshable);
                if (!isInterstitial) {
                    var dfpAdSizes;
                    if (adSizeList) {
                        debug(divId + " :: defineNewAdSlot :: using adhoc size: " + adSizeList);
                        dfpAdSizes = getSizesFromString(adSizeList);
                    } else if (adSizeType && ad_sizes_list[settings.device_view][adSizeType]) {
                        dfpAdSizes = ad_sizes_list[settings.device_view][adSizeType];
                        debug(divId + " :: defineNewAdSlot :: using sizetype: " + adSizeType);
                    } else {
                        debug(divId + " :: defineNewAdSlot :: NO VALID SIZES FOUND. will expand to element size by default");
                    }
                    gptSlot = googletag.defineSlot(slotUnit, dfpAdSizes, divId).addService(googletag.pubads());
                    if (dfp_settings.enable_single_request) {
                        adDiv.data('unfilled', true);
                        defineCallback("pre.display.ads", function() {
                            if (!adDiv.data('registered')) {
                                pushCmd(function() {
                                    display_provider.display(divId);
                                    adDiv.data('registered', true);
                                    debug(divId + " :: defineNewAdSlot :: pushing SRA display to cmd queue");
                                });
                            }
                        });
                    }
                    debug(divId + " :: defineNewAdSlot :: googletag slot defined");
                } else {
                    if (adDiv.data('pos').indexOf('prestitial') != -1) {
                        slotUnit += '/prestitial';
                    } else {
                        slotUnit += '/interstitial';
                    }
                    gptSlot = googletag.defineOutOfPageSlot(slotUnit, divId).addService(googletag.pubads()).setCollapseEmptyDiv(true);
                    if (dfp_settings.enable_single_request) {
                        adDiv.data('unfilled', true);
                        defineCallback("pre.display.ads", function() {
                            if (!adDiv.data('registered')) {
                                pushCmd(function() {
                                    display_provider.display(divId);
                                    adDiv.data('registered', true);
                                    debug(divId + " :: defineNewAdSlot :: pushing OutOfPageSlot SRA display to cmd queue");
                                });
                            }
                        });
                    }
                    debug(divId + " :: defineNewAdSlot :: googletag out-of-page slot defined");
                    adDiv.data('interstitial', true);
                }
                if (refreshable) {
                    adDiv.data('refresh', true);
                    debug(divId + " :: defineNewAdSlot :: this slot will REFRESH with each showAds()");
                }
                if (adDiv.data('pos') != null ) {
                    slots[divId].setTargetingParam('pos', adDiv.data('pos'));
                }
                if (adDiv.data('tile') != null ) {
                    slots[divId].slot_data.tile = adDiv.data('tile');
                    slots[divId].setTargetingParam('tile', slots[divId].slot_data.tile);
                }
                slots[divId].attachGptSlot(gptSlot);
                adDiv.data(settings.data_store, gptSlot);
            }
        });
        trigger('post.slot.define', slots[divId]);
        return _this;
    }
    function getSlotById(id) {
        if (slots[id]) {
            return slots[id];
        }
        return null ;
    }
    function showAds() {
        flushCmd();
        var deferreds = $.map(slots, function(slot, index) {
            return slot.deferred;
        });
        $.when.apply($, deferreds).then(function() {
            trigger('pre.display.ads');
            $.each(slots, function(index, slot) {
                var adDiv = $('#' + slot.div_id);
                var adSlotData = adDiv.data(settings.data_store);
                var refreshable = adDiv.data('refresh') || false;
                var unfilled = adDiv.data('unfilled') || false;
                var filled = adDiv.data('filled') || false;
                var registered = adDiv.data('registered');
                if (dfp_settings.enable_single_request) {
                    if (refreshable) {
                        pushCmd(function() {
                            display_provider.pubads().refresh([adSlotData]);
                        });
                        debug("showAds :: refreshing ad " + adDiv.attr('id'));
                    } else if (unfilled) {
                        pushCmd(function() {
                            display_provider.pubads().refresh([adSlotData]);
                        });
                        debug("showAds :: filling unfilled ad " + adDiv.attr('id'));
                        adDiv.data('unfilled', false);
                    }
                } else {
                    if (refreshable) {
                        if (!registered) {
                            pushCmd(function() {
                                display_provider.display(adDiv.attr('id'));
                                debug("showAds :: displaying ad " + adDiv.attr('id') + " - will REFRESH on next showAds()");
                                adDiv.data('registered', true);
                            });
                        } else {
                            pushCmd(function() {
                                display_provider.pubads().refresh([adSlotData]);
                            });
                            debug("showAds :: refreshing ad " + adDiv.attr('id'));
                        }
                    } else if (!filled) {
                        pushCmd(function() {
                            display_provider.display(adDiv.attr('id'));
                        });
                        debug("showAds :: displaying ad " + adDiv.attr('id') + " for the first and only time!");
                        adDiv.data('filled', true);
                    } else {
                        debug("showAds :: nonrefreshing ad " + adDiv.attr('id') + " already displayed..skipping.");
                    }
                }
            });
            flushCmd();
            trigger('post.display.ads');
        });
        return _this;
    }
    function generateId(element) {
        slot_count++;
        if (element && element.attr('id')) {
            return element.attr('id');
        }
        var id = 'wbad-' + getRequiredParam('site_domain') + '-' + slot_count;
        id = id.replace(/[^A-Za-z0-9-]+/g, '').toLowerCase();
        element.attr('id', id);
        return id;
    }
    function cleanParamName(param) {
        param = trim(param.toLowerCase());
        param = param.replace(/[^a-z0-9_]/g, '');
        var param_regex = /^[a-z_][a-z0-9_]{1,20}$/;
        if (!param_regex.test(param)) {
            debug("_cleanParamName :: invalid param name: " + param);
            return "";
        }
        return param;
    }
    function setRequiredParam(param, val) {
        param = cleanParamName(param);
        if (!param)
            return false;
        required_params[param] = val || false;
        if (typeof (required_params[param]) == "string")
            required_params[param] = trim(required_params[param]);
        return true;
    }
    function getRequiredParam(param) {
        param = cleanParamName(param);
        if (!param)
            return false;
        return ( required_params[param] || false) ;
    }
    function setSelector(classname) {
        if (typeof settings === "undefined") {
            defineCallback("pre.slot.discovery", function() {
                setSelector(classname);
            });
            return _this;
        }
        if (null !== classname && "" != classname) {
            if (classname.charAt(0) === '.')
                classname = classname.substr(1);
            settings.selector = classname;
        }
        return _this;
    }
    function setEnabled(showAds) {
        if (typeof settings === "undefined") {
            defineCallback("pre.init", function() {
                setEnabled(showAds);
            });
            return _this;
        }
        settings.enabled = showAds || false;
        debug("setEnabled :: ads enabled : " + settings.enabled);
        return _this;
    }
    function getEnabled() {
        return settings.enabled;
    }
    function setDeviceView(device) {
        if (typeof settings === "undefined") {
            defineCallback("pre.init", function() {
                setDeviceView(device);
            });
            return _this;
        }
        settings.device_view = device || "main";
        debug("setDeviceView :: device_view set to : " + settings.device_view);
        return _this;
    }
    function setDebug(enabled) {
        if (typeof settings === "undefined") {
            defineCallback("pre.init", function() {
                setDebug(enabled);
            });
            return _this;
        }
        settings.debug_enabled = enabled || false;
        return _this;
    }
    function debug(msg) {
        if (typeof settings === "undefined" || !settings.debug_enabled)
            return;
        if (window.console && typeof console.log != "undefined")
            console.log("[WBADS] " + msg);
    }
    function trim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }
    function getParamFromUri(param) {
        var value = decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(param).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$","i"), "$1"));
        debug("getParamFromUri :: param " + param + (value ? " found with value: " + value : " not found"));
        return value;
    }
    function getSizesFromString(str) {
        var sizes = [];
        if (str.length) {
            var pairs = str.split(',');
            $.each(pairs, function(key, value) {
                var currentSize = value.split('x');
                sizes.push([parseInt(currentSize[0], 10), parseInt(currentSize[1], 10)]);
                debug("getSizesFromString :: adding SIZE=[" + currentSize[0] + "," + currentSize[1] + "]");
            });
        } else {
            debug("getSizesFromString :: NO VALID SIZES FOUND. will expand to element size by default");
        }
        return sizes;
    }
    function getUriPaths() {
        var paths = window.location.pathname.replace(/\/$/, '');
        debug("getUriPaths :: found paths:" + paths);
        return paths;
    }
    function setQuantcast(enabled) {
        if (typeof settings === "undefined") {
            defineCallback("pre.init", function() {
                setQuantcast(enabled);
            });
            return;
        }
        settings.quantcast.enabled = enabled || false;
        embedQuantCastDeliveryTag();
    }
    function embedQuantCastDeliveryTag() {
        if (!settings.quantcast.enabled)
            return;
        document.write('<scr' + 'ipt src="//pixel.quantserve.com/seg/' + settings.quantcast.qacct + '.js" type="text/javascript"></scr' + 'ipt>');
    }
    function embedQuantCastMeasurementTag() {
        if (!settings.quantcast.enabled)
            return;
        var elem = document.createElement('script');
        elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
        elem.async = true;
        elem.type = "text/javascript";
        var scpt = document.getElementsByTagName('script')[0];
        scpt.parentNode.insertBefore(elem, scpt);
        _qevents.push({
            qacct: settings.quantcast.qacct
        });
    }
    function _quantgc(n) {
        var c = document.cookie;
        if (!c)
            return '';
        var i = c.indexOf(n + "=");
        if (-1 == i)
            return '';
        var len = i + n.length + 1;
        var end = c.indexOf(";", len);
        return c.substring(len, end < 0 ? c.length : end);
    }
    function getQCSegs() {
        if (!settings.quantcast.enabled)
            return "";
        if (settings.quantcast.segs != "")
            return settings.quantcast.segs;
        var segs = [];
        var _qsegs = _quantgc("__qseg").split("|");
        for (var i = 0; i < _qsegs.length; i++) {
            var qArr = _qsegs[i].split("_");
            segs.push(qArr[1]);
        }
        settings.quantcast.segs = segs;
        debug("getQCSegs :: found segs:" + settings.quantcast.segs);
        return settings.quantcast.segs;
    }
    function getChannel() {
        var channel = "";
        debug("getChannel :: found channel:" + channel);
        return channel;
    }
    function getHashtags() {
        var hashtags = [];
        if (dfp_settings.global_targeting["tag"] != "") {
            hashtags = dfp_settings.global_targeting["tag"].split(",");
            var tagString = "";
            $.each(hashtags, function(index, tag) {
                debug("getHashtags :: pushing tag:" + tag);
                if (tagString != "")
                    tagString += ",";
                tagString += $.trim(tag);
            });
            dfp_settings.global_targeting["tag"] = tagString;
        }
        debug("getHashtags :: found hashtags:" + dfp_settings.global_targeting["tag"]);
    }
    function pushCmd(func) {
        cmd.push(func);
    }
    function flushCmd() {
        var cmds = cmd.slice(0);
        cmd = [];
        for (var i = 0; i < cmds.length; i++) {
            googletag.cmd.push(cmds[i]);
        }
    }
    function bind(trigger, func) {
        $(_this).bind(trigger + ".wbads", func);
    }
    function trigger(trigger, args) {
        $(_this).trigger(trigger + ".wbads", args || _this);
    }
    function setDisplayProvider(provider) {
        display_provider = provider;
        return _this;
    }
    function refresh(opt_slots, opt_options) {
        display_provider.pubads().refresh(opt_slots, opt_options);
        return _this;
    }
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
    _this.setDisplayProvider = setDisplayProvider;
    _this.refresh = refresh;
    _this.init = init;
    return _this;
})(window.jQuery, googletag, window, document);
window.CRTG_NID = window.CRTG_NID || false;
window.CRTG_COOKIE_NAME = window.CRTG_COOKIE_NAME || false;
window.CRTG_VAR_NAME = window.CRTG_VAR_NAME || 'crtg_content';
(function(w, d, wbads) {
    'use strict';
    var ctagId = 'criteo-js'
      , ctag = d.getElementById(ctagId);
    if (ctag) {
        if (!w.CRTG_NID) {
            w.CRTG_NID = ctag.getAttribute('data-nid') || false;
        }
        if (!w.CRTG_COOKIE_NAME) {
            w.CRTG_COOKIE_NAME = ctag.getAttribute('data-cookie-name') || false;
        }
    }
    if (!w.CRTG_NID || !w.CRTG_COOKIE_NAME || !w.CRTG_VAR_NAME) {
        return;
    }
    if (!ctag) {
        ctag = d.createElement('script');
        ctag.type = 'text/javascript';
        ctag.id = ctagId;
        ctag.async = true;
        ctag.setAttribute('class', ctagId);
        ctag.setAttribute('data-nid', w.CRTG_NID);
        ctag.setAttribute('data-cookie-name', w.CRTG_COOKIE_NAME);
        ctag.setAttribute('data-var-name', w.CRTG_VAR_NAME);
        var rnd = Math.floor(Math.random() * 99999999999);
        var url = location.protocol + '//rtax.criteo.com/delivery/rta/rta.js?netId=' + encodeURIComponent(w.CRTG_NID);
        url += '&cookieName=' + encodeURIComponent(w.CRTG_COOKIE_NAME);
        url += '&rnd=' + rnd;
        url += '&varName=' + encodeURIComponent(w.CRTG_VAR_NAME);
        ctag.src = url;
        d.getElementsByTagName('head')[0].appendChild(ctag);
    }
    function getCookie(cookieName) {
        var i, x, y, cookies = document.cookie.split(';');
        for (i = 0; i < cookies.length; i++) {
            x = cookies[i].substr(0, cookies[i].indexOf('='));
            y = cookies[i].substr(cookies[i].indexOf('=') + 1);
            x = x.replace(/^\s+|\s+$/g, '');
            if (x == cookieName) {
                return decodeURIComponent(y);
            }
        }
        return '';
    }
    wbads.defineCallback('pre.enable.services', function() {
        var parts, params = getCookie(w.CRTG_COOKIE_NAME).split(';');
        for (var i = 0; i < params.length; i++) {
            parts = params[i].split('=');
            wbads.setGlobalTargetingParam('' + parts[0], '' + parts[1]);
        }
    });
}(window, document, window.wbads));
window.KRUX_CONFID = window.KRUX_CONFID || false;
window.KRUX_VERSION = window.KRUX_VERSION || '1.9';
window.Krux || ((Krux = function() {
    Krux.q.push(arguments)
}
).q = []);
(function(w, d, wbads, krux, factory) {
    'use strict';
    w.wbkrux = factory(w, d, wbads, krux);
    if (typeof bootstrap === 'function') {
        bootstrap('wbkrux', w.wbkrux);
    }
    if (typeof exports === 'object') {
        module.exports = w.wbkrux;
    }
    if (typeof define === 'function' && define.amd) {
        define('wbkrux', [], w.wbkrux);
    }
})(window, document, window.wbads, window.Krux, function(w, d, wbads, krux) {
    'use strict';
    var _this = {};
    var ctagId = 'kxct';
    var ctag = d.getElementById(ctagId);
    function retrieve(n, ns) {
        var m, k = ns + n;
        if (w.localStorage) {
            return w.localStorage[k] || '';
        } else if (navigator.cookieEnabled) {
            m = d.cookie.match(k + '=([^;]*)');
            return m && decodeURIComponent(m[1]) || '';
        }
        return '';
    }
    function getParam(n) {
        return retrieve(n, 'kxwarnerbros_') || retrieve(n, 'kxwarnerbros') || retrieve(n, 'kx');
    }
    function getUser() {
        return getParam('user');
    }
    function getSegments() {
        var segs = getParam('segs');
        return segs && segs.split(',') || [];
    }
    function getGptCustParams(encode) {
        encode = encode || true;
        var ksg = getSegments();
        var kuid = getUser();
        var khost = encodeURIComponent(d.location.hostname);
        var str = 'ksg=' + ksg + '&kuid=' + kuid + '&khost=' + khost;
        return encode ? encodeURIComponent(str) : str;
    }
    if (ctag && !w.KRUX_CONFID) {
        w.KRUX_CONFID = ctag.getAttribute('data-id') || false;
    }
    _this.getParam = getParam;
    _this.getUser = getUser;
    _this.getSegments = getSegments;
    _this.getGptCustParams = getGptCustParams;
    if (!w.KRUX_CONFID) {
        return _this;
    }
    if (!ctag) {
        ctag = d.createElement('script');
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
        s.parentNode.insertBefore(k, s);
    }
    wbads.defineCallback('pre.enable.services', function() {
        krux.user = getUser();
        krux.segments = getSegments();
        wbads.setGlobalTargetingParam('ksg', krux.segments);
        wbads.setGlobalTargetingParam('kuid', krux.user);
        wbads.setGlobalTargetingParam('khost', encodeURIComponent(d.location.hostname));
    });
    return _this;
});
jQuery.fn.live = function(types, data, fn) {
    jQuery(this.context).on(types, this.selector, data, fn);
    return this;
}
$(document).ready(function() {
    var $header = $('#masthead-wrap');
    var $mastheadAd = $('.masthead-ad');
    var $masthead = $('.masthead');
    var mastheadTop = 0;
    if ($masthead.offset()) {
        var mastheadTop = $masthead.offset().top;
    }
    var $watchTmz = $('.watch-tmz');
    var $showtimes = $('#showtimes-main');
    var $nav = $('#nav');
    var $body = $('body');
    var isSticky = false;
    var isTouchDevice = 'ontouchstart'in document.documentElement;
    var navTop = 0;
    $(window).on('scroll', function() {
        if ($(document).scrollTop() > $('#nav').offset().top) {
            if (!isSticky) {
                navTop = $('#nav').offset().top;
                $header = $('#masthead-wrap');
                var headerHeight = $header.outerHeight() - 20;
                $header.addClass('is-sticky');
                $body.css('padding-top', headerHeight);
                isSticky = true;
            }
        } else if ($(document).scrollTop() < navTop) {
            if (isSticky) {
                $body.css('padding-top', 0);
                $body.removeClass('fixfixed');
                $header.removeClass('is-sticky');
                if (isTouchDevice) {
                    $header.css('top', '');
                }
                isSticky = false;
            }
        }
    });
    if (mastheadTop > 50) {
        setTimeout(function() {
            $header.addClass('sticky-ad-hidden');
            setTimeout(function() {
                $mastheadAd.removeClass('first-show');
            }, 500);
        }, 15000);
    }
    $watchTmz.add($showtimes).on('mouseenter', function() {
        $showtimes.show();
    });
    $watchTmz.add($showtimes).on('mouseleave', function() {
        $showtimes.hide();
    });
});
var swfobject = function() {
    var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window, j = document, t = navigator, T = false, U = [h], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G, m = true, M = function() {
        var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D
          , ah = t.userAgent.toLowerCase()
          , Y = t.platform.toLowerCase()
          , ae = Y ? /win/.test(Y) : /win/.test(ah)
          , ac = Y ? /mac/.test(Y) : /mac/.test(ah)
          , af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false
          , X = !+"\v1"
          , ag = [0, 0, 0]
          , ab = null ;
        if (typeof t.plugins != D && typeof t.plugins[S] == r) {
            ab = t.plugins[S].description;
            if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                T = true;
                X = false;
                ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            }
        } else {
            if (typeof O.ActiveXObject != D) {
                try {
                    var ad = new ActiveXObject(W);
                    if (ad) {
                        ab = ad.GetVariable("$version");
                        if (ab) {
                            X = true;
                            ab = ab.split(" ")[1].split(",");
                            ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                        }
                    }
                } catch (Z) {}
            }
        }
        return {
            w3: aa,
            pv: ag,
            wk: af,
            ie: X,
            win: ae,
            mac: ac
        }
    }(), k = function() {
        if (!M.w3) {
            return
        }
        if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
            f()
        }
        if (!J) {
            if (typeof j.addEventListener != D) {
                j.addEventListener("DOMContentLoaded", f, false)
            }
            if (M.ie && M.win) {
                j.attachEvent(x, function() {
                    if (j.readyState == "complete") {
                        j.detachEvent(x, arguments.callee);
                        f()
                    }
                });
                if (O == top) {
                    (function() {
                        if (J) {
                            return
                        }
                        try {
                            j.documentElement.doScroll("left")
                        } catch (X) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
            }
            if (M.wk) {
                (function() {
                    if (J) {
                        return
                    }
                    if (!/loaded|complete/.test(j.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    f()
                })()
            }
            s(f)
        }
    }();
    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }
    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }
    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function() {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }
    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }
    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function() {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null ;
                H()
            })()
        } else {
            H()
        }
    }
    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {
                    success: false,
                    id: Y
                };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }
    function z(aa) {
        var X = null ;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }
    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }
    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null ;
        B = {
            success: false,
            id: X
        };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn"
              , ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function() {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }
    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function() {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }
    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }
    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }
    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }
    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function() {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }
    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }
    function c(Z) {
        var X = null ;
        try {
            X = j.getElementById(Z)
        } catch (Y) {}
        return X
    }
    function C(X) {
        return j.createElement(X)
    }
    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }
    function F(Z) {
        var Y = M.pv
          , X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
    }
    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null ;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }
    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }
    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null ;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }
    var d = function() {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function() {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null ;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function(ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            } else {
                if (Z) {
                    Z({
                        success: false,
                        id: ab
                    })
                }
            }
        },
        getObjectById: function(X) {
            if (M.w3) {
                return z(X)
            }
        },
        embedSWF: function(ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {
                success: false,
                id: ah
            };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function() {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            } else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        } else {
                            w(ah, true)
                        }
                    }
                    if (ac) {
                        ac(X)
                    }
                })
            } else {
                if (ac) {
                    ac(X)
                }
            }
        },
        switchOffAutoHideShow: function() {
            m = false
        },
        ua: M,
        getFlashPlayerVersion: function() {
            return {
                major: M.pv[0],
                minor: M.pv[1],
                release: M.pv[2]
            }
        },
        hasFlashPlayerVersion: F,
        createSWF: function(Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X)
            } else {
                return undefined
            }
        },
        showExpressInstall: function(Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        },
        removeSWF: function(X) {
            if (M.w3) {
                y(X)
            }
        },
        createCSS: function(aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        },
        addDomLoadEvent: K,
        addLoadEvent: s,
        getQueryParamValue: function(aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null ) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function() {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
}();
function FlashTag(src, width, height, version) {
    if (arguments.length < 4) {
        throw new Exception('RequiredAttributeException','You must pass in a src, width, height, and version when creating a FlashTag.');
    }
    for (var i = 0; i < arguments.length; ++i) {
        if (arguments[i] == undefined || arguments[i] == null ) {
            throw new Exception('RequiredAttributeException','All constructor arguments must have values.');
        }
    }
    this.src = src;
    this.width = width;
    this.height = height;
    this.version = version;
    this.id = null ;
    this.flashVars = null ;
    this.flashVarsStr = null ;
    this.genericParam = new Object();
    this.ie = (navigator.appName.indexOf("Microsoft") != -1) ? 1 : 0;
}
FlashTag.prototype.setSource = function(src) {
    this.src = src;
}
FlashTag.prototype.setWidth = function(w) {
    this.width = width;
}
FlashTag.prototype.setHeight = function(h) {
    this.h = height;
}
FlashTag.prototype.setVersion = function(v) {
    this.version = v;
}
FlashTag.prototype.setId = function(id) {
    this.id = id;
}
FlashTag.prototype.setBgcolor = function(bgc) {
    if (bgc.charAt(0) != '#')
        bgc = '#' + bgc;
    this.genericParam['bgcolor'] = bgc;
}
FlashTag.prototype.addFlashVars = function(fvs) {
    this.flashVarsStr = fvs;
}
FlashTag.prototype.addFlashVar = function(n, v) {
    if (this.flashVars == null )
        this.flashVars = new Object();
    this.flashVars[n] = v;
}
FlashTag.prototype.removeFlashVar = function(n) {
    if (this.flashVars != null )
        this.flashVars[n] = undefined;
}
FlashTag.prototype.setSwliveconnect = function(swlc) {
    this.genericParam['swliveconnect'] = swlc;
}
FlashTag.prototype.setPlay = function(p) {
    this.genericParam['play'] = p;
}
FlashTag.prototype.setLoop = function(l) {
    this.genericParam['loop'] = l;
}
FlashTag.prototype.setMenu = function(m) {
    this.genericParam['menu'] = m;
}
FlashTag.prototype.setQuality = function(q) {
    if (q != 'low' && q != 'high' && q != 'autolow' && q != 'autohigh' && q != 'best') {
        throw new Exception('UnsupportedValueException','Supported values are "low", "high", "autolow", "autohigh", and "best".');
    }
    this.genericParam['quality'] = q;
}
FlashTag.prototype.setScale = function(sc) {
    if (sc != 'showall' && sc != 'noborder' && sc != 'exactfit' && sc != 'noscale') {
        throw new Exception('UnsupportedValueException','Supported values are "showall", "noborder", "exactfit, and "noscale".');
    }
    this.genericParam['scale'] = sc;
}
FlashTag.prototype.setAlign = function(a) {
    if (a != 'l' && a != 't' && a != 'r' && a != 'b') {
        throw new Exception('UnsupportedValueException','Supported values are "l", "t", "r" and "b".');
    }
    this.genericParam['align'] = a;
}
FlashTag.prototype.setSalign = function(sa) {
    if (sa != 'l' && sa != 't' && sa != 'r' && sa != 'b' && sa != 'tl' && sa != 'tr' && sa != 'bl' && sa != 'br') {
        throw new Exception('UnsupportedValueException','Supported values are "l", "t", "r", "b", "tl", "tr", "bl" and "br".');
    }
    this.genericParam['salign'] = sa;
}
FlashTag.prototype.setWmode = function(wm) {
    if (wm != 'window' && wm != 'opaque' && wm != 'transparent') {
        throw new Exception('UnsupportedValueException','Supported values are "window", "opaque", and "transparent".');
    }
    this.genericParam['wmode'] = wm;
}
FlashTag.prototype.setBase = function(base) {
    this.genericParam['base'] = base;
}
FlashTag.prototype.toString = function() {
    var flashTag = new String();
    if (this.ie) {
        flashTag += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
        if (this.id != null ) {
            flashTag += 'id="' + this.id + '" ';
        }
        flashTag += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + this.version + '" ';
        flashTag += 'width="' + this.width + '" ';
        flashTag += 'height="' + this.height + '">';
        flashTag += '<param name="movie" value="' + this.src + '"/>';
        for (var n in this.genericParam) {
            if (this.genericParam[n] != undefined && this.genericParam[n] != null ) {
                flashTag += '<param name="' + n + '" value="' + this.genericParam[n] + '"/>';
            }
        }
        if (this.flashVars != null ) {
            var fv = this.getFlashVarsAsString();
            if (fv.length > 0) {
                flashTag += '<param name="flashvars" value="' + fv + '"/>';
            }
        }
        flashTag += '</object>';
    } else {
        flashTag += '<embed src="' + this.src + '"';
        flashTag += ' width="' + this.width + '"';
        flashTag += ' height="' + this.height + '"';
        flashTag += ' type="application/x-shockwave-flash"';
        if (this.id != null ) {
            flashTag += ' name="' + this.id + '"';
        }
        for (var n in this.genericParam) {
            if (this.genericParam[n] != undefined && this.genericParam[n] != null ) {
                flashTag += (' ' + n + '="' + this.genericParam[n] + '"');
            }
        }
        if (this.flashVars != null || this.flashVarsStr != null ) {
            var fv = this.getFlashVarsAsString();
            if (fv.length > 0) {
                flashTag += ' flashvars="' + fv + '"';
            }
        }
        flashTag += ' pluginspage="http://www.macromedia.com/go/getflashplayer">';
        flashTag += '</embed>';
    }
    return flashTag;
}
FlashTag.prototype.write = function(doc) {
    doc.write(this.toString());
}
FlashTag.prototype.getFlashVarsAsString = function() {
    var qs = new String();
    for (var n in this.flashVars) {
        if (this.flashVars[n] != undefined && this.flashVars[n] != null ) {
            qs += (escape(n) + '=' + escape(this.flashVars[n]) + '&');
        }
    }
    if (this.flashVarsStr != null )
        return qs + this.flashVarsStr;
    return qs.substring(0, qs.length - 1);
}
FlashTag.prototype.setParams = function(id, bgc, fvs, swlc, p, l, m, q, sc, a, wm, base) {
    if (id != null )
        this.id = id;
    if (fvs != null )
        this.flashVarsStr = fvs;
    if (bgc != null )
        this.setBgcolor(bgc);
    if (swlc != null )
        this.setSwliveconnect(swlc);
    if (p != null )
        this.setPlay(p);
    if (l != null )
        this.setLoop(l);
    if (m != null )
        this.setMenu(m);
    if (q != null )
        this.setQuality(q);
    if (sc != null )
        this.setScale(sc);
    if (a != null )
        this.setAlign(a);
    if (wm != null )
        this.setWmode(wm);
    if (base != null )
        this.setBase(base);
}
function writeOnLoad() {
    try {
        if (flashTagParams != undefined) {
            var tag = new FlashTag(flashTagParams.src,flashTagParams.width,flashTagParams.height,flashTagParams.version);
            document.write(tag.toString());
        }
    } catch (ex) {}
}
writeOnLoad();
;(function($, window, document, undefined) {
    var pluginName = 'sharrre'
      , defaults = {
        className: 'sharrre',
        share: {
            googlePlus: false,
            facebook: false,
            twitter: false,
            digg: false,
            delicious: false,
            stumbleupon: false,
            linkedin: false,
            pinterest: false
        },
        shareTotal: 0,
        template: '',
        title: '',
        url: document.location.href,
        text: document.title,
        urlCurl: 'sharrre.php',
        count: {},
        total: 0,
        shorterTotal: true,
        enableHover: true,
        enableCounter: true,
        enableTracking: false,
        hover: function() {},
        hide: function() {},
        click: function() {},
        render: function() {},
        buttons: {
            googlePlus: {
                url: '',
                urlCount: false,
                size: 'medium',
                lang: 'en-US',
                annotation: ''
            },
            facebook: {
                url: '',
                urlCount: false,
                action: 'like',
                layout: 'button_count',
                width: '',
                send: 'false',
                faces: 'false',
                colorscheme: '',
                font: '',
                lang: 'en_US'
            },
            twitter: {
                url: '',
                urlCount: false,
                count: 'horizontal',
                hashtags: '',
                via: '',
                related: '',
                lang: 'en'
            },
            digg: {
                url: '',
                urlCount: false,
                type: 'DiggCompact'
            },
            delicious: {
                url: '',
                urlCount: false,
                size: 'medium'
            },
            stumbleupon: {
                url: '',
                urlCount: false,
                layout: '1'
            },
            linkedin: {
                url: '',
                urlCount: false,
                counter: ''
            },
            pinterest: {
                url: '',
                media: '',
                description: '',
                layout: 'horizontal'
            }
        }
    }
      , urlJson = {
        googlePlus: "",
        facebook: "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
        twitter: "",
        digg: "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
        delicious: 'http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?',
        stumbleupon: "",
        linkedin: "http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
        pinterest: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?"
    }
      , loadButton = {
        googlePlus: function(self) {
            var sett = self.options.buttons.googlePlus;
            $(self.element).find('.buttons').append('<div class="button googleplus"><div class="g-plusone" data-size="' + sett.size + '" data-href="' + (sett.url !== '' ? sett.url : self.options.url) + '" data-annotation="' + sett.annotation + '"></div></div>');
            window.___gcfg = {
                lang: self.options.buttons.googlePlus.lang
            };
            var loading = 0;
            if (typeof gapi === 'undefined' && loading == 0) {
                loading = 1;
                (function() {
                    var po = document.createElement('script');
                    po.type = 'text/javascript';
                    po.async = true;
                    po.src = '//apis.google.com/js/plusone.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(po, s);
                })();
            } else {
                gapi.plusone.go();
            }
        },
        facebook: function(self) {
            var sett = self.options.buttons.facebook;
            $(self.element).find('.buttons').append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="' + (sett.url !== '' ? sett.url : self.options.url) + '" data-send="' + sett.send + '" data-layout="' + sett.layout + '" data-width="' + sett.width + '" data-show-faces="' + sett.faces + '" data-action="' + sett.action + '" data-colorscheme="' + sett.colorscheme + '" data-font="' + sett.font + '" data-via="' + sett.via + '"></div></div>');
            var loading = 0;
            if (typeof FB === 'undefined' && loading == 0) {
                loading = 1;
                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = '//connect.facebook.net/' + sett.lang + '/all.js#xfbml=1';
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            } else {
                FB.XFBML.parse();
            }
        },
        twitter: function(self) {
            var sett = self.options.buttons.twitter;
            $(self.element).find('.buttons').append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="' + (sett.url !== '' ? sett.url : self.options.url) + '" data-count="' + sett.count + '" data-text="' + self.options.text + '" data-via="' + self.options.via + '" data-hashtags="' + sett.hashtags + '" data-related="' + self.options.related + '" data-lang="' + sett.lang + '">Tweet</a></div>');
            var loading = 0;
            if (typeof twttr === 'undefined' && loading == 0) {
                loading = 1;
                (function() {
                    var twitterScriptTag = document.createElement('script');
                    twitterScriptTag.type = 'text/javascript';
                    twitterScriptTag.async = true;
                    twitterScriptTag.src = '//platform.twitter.com/widgets.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(twitterScriptTag, s);
                })();
            } else {
                $.ajax({
                    url: '//platform.twitter.com/widgets.js',
                    dataType: 'script',
                    cache: true
                });
            }
        },
        digg: function(self) {
            var sett = self.options.buttons.digg;
            $(self.element).find('.buttons').append('<div class="button digg"><a class="DiggThisButton ' + sett.type + '" rel="nofollow external" href="http://digg.com/submit?url=' + encodeURIComponent((sett.url !== '' ? sett.url : self.options.url)) + '"></a></div>');
            var loading = 0;
            if (typeof __DBW === 'undefined' && loading == 0) {
                loading = 1;
                (function() {
                    var s = document.createElement('SCRIPT')
                      , s1 = document.getElementsByTagName('SCRIPT')[0];
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = '//widgets.digg.com/buttons.js';
                    s1.parentNode.insertBefore(s, s1);
                })();
            }
        },
        delicious: function(self) {
            if (self.options.buttons.delicious.size == 'tall') {
                var css = 'width:50px;'
                  , cssCount = 'height:35px;width:50px;font-size:15px;line-height:35px;'
                  , cssShare = 'height:18px;line-height:18px;margin-top:3px;';
            } else {
                var css = 'width:93px;'
                  , cssCount = 'float:right;padding:0 3px;height:20px;width:26px;line-height:20px;'
                  , cssShare = 'float:left;height:20px;line-height:20px;';
            }
            var count = self.shorterTotal(self.options.count.delicious);
            if (typeof count === "undefined") {
                count = 0;
            }
            $(self.element).find('.buttons').append('<div class="button delicious"><div style="' + css + 'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;">' + '<div style="' + cssCount + 'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">' + count + '</div>' + '<div style="' + cssShare + 'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;">' + '<img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>');
            $(self.element).find('.delicious').on('click', function() {
                self.openPopup('delicious');
            });
        },
        stumbleupon: function(self) {
            var sett = self.options.buttons.stumbleupon;
            $(self.element).find('.buttons').append('<div class="button stumbleupon"><su:badge layout="' + sett.layout + '" location="' + (sett.url !== '' ? sett.url : self.options.url) + '"></su:badge></div>');
            var loading = 0;
            if (typeof STMBLPN === 'undefined' && loading == 0) {
                loading = 1;
                (function() {
                    var li = document.createElement('script');
                    li.type = 'text/javascript';
                    li.async = true;
                    li.src = '//platform.stumbleupon.com/1/widgets.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(li, s);
                })();
                s = window.setTimeout(function() {
                    if (typeof STMBLPN !== 'undefined') {
                        STMBLPN.processWidgets();
                        clearInterval(s);
                    }
                }, 500);
            } else {
                STMBLPN.processWidgets();
            }
        },
        linkedin: function(self) {
            var sett = self.options.buttons.linkedin;
            $(self.element).find('.buttons').append('<div class="button linkedin"><script type="in/share" data-url="' + (sett.url !== '' ? sett.url : self.options.url) + '" data-counter="' + sett.counter + '"></script></div>');
            var loading = 0;
            if (typeof window.IN === 'undefined' && loading == 0) {
                loading = 1;
                (function() {
                    var li = document.createElement('script');
                    li.type = 'text/javascript';
                    li.async = true;
                    li.src = '//platform.linkedin.com/in.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(li, s);
                })();
            } else {
                window.IN.init();
            }
        },
        pinterest: function(self) {
            var sett = self.options.buttons.pinterest;
            $(self.element).find('.buttons').append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url=' + (sett.url !== '' ? sett.url : self.options.url) + '&media=' + sett.media + '&description=' + sett.description + '" class="pin-it-button" count-layout="' + sett.layout + '">Pin It</a></div>');
            (function() {
                var li = document.createElement('script');
                li.type = 'text/javascript';
                li.async = true;
                li.src = '//assets.pinterest.com/js/pinit.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(li, s);
            })();
        }
    }
      , tracking = {
        googlePlus: function() {},
        facebook: function() {
            fb = window.setInterval(function() {
                if (typeof FB !== 'undefined') {
                    FB.Event.subscribe('edge.create', function(targetUrl) {
                        _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
                    });
                    FB.Event.subscribe('edge.remove', function(targetUrl) {
                        _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
                    });
                    FB.Event.subscribe('message.send', function(targetUrl) {
                        _gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
                    });
                    clearInterval(fb);
                }
            }, 1000);
        },
        twitter: function() {
            tw = window.setInterval(function() {
                if (typeof twttr !== 'undefined') {
                    twttr.events.bind('tweet', function(event) {
                        if (event) {
                            _gaq.push(['_trackSocial', 'twitter', 'tweet']);
                        }
                    });
                    clearInterval(tw);
                }
            }, 1000);
        },
        digg: function() {},
        delicious: function() {},
        stumbleupon: function() {},
        linkedin: function() {
            function LinkedInShare() {
                _gaq.push(['_trackSocial', 'linkedin', 'share']);
            }
        },
        pinterest: function() {}
    }
      , popup = {
        googlePlus: function(opt) {
            window.open("https://plus.google.com/share?hl=" + opt.buttons.googlePlus.lang + "&url=" + encodeURIComponent((opt.buttons.googlePlus.url !== '' ? opt.buttons.googlePlus.url : opt.url)), "", "toolbar=0, status=0, width=900, height=500");
        },
        facebook: function(opt) {
            window.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent((opt.buttons.facebook.url !== '' ? opt.buttons.facebook.url : opt.url)) + "&t=" + opt.text + "", "", "toolbar=0, status=0, width=575, height=450");
        },
        twitter: function(opt) {
            window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(opt.text) + "&url=" + encodeURIComponent((opt.buttons.twitter.url !== '' ? opt.buttons.twitter.url : opt.url)) + '&via=' + opt.via + '&related=' + opt.related, "", "toolbar=0, status=0, width=575, height=450");
        },
        digg: function(opt) {
            window.open("http://digg.com/tools/diggthis/submit?url=" + encodeURIComponent((opt.buttons.digg.url !== '' ? opt.buttons.digg.url : opt.url)) + "&title=" + opt.text + "&related=true&style=true", "", "toolbar=0, status=0, width=650, height=360");
        },
        delicious: function(opt) {
            window.open('http://www.delicious.com/save?v=5&noui&jump=close&url=' + encodeURIComponent((opt.buttons.delicious.url !== '' ? opt.buttons.delicious.url : opt.url)) + '&title=' + opt.text, 'delicious', 'toolbar=no,width=550,height=550');
        },
        stumbleupon: function(opt) {
            window.open('http://www.stumbleupon.com/badge/?url=' + encodeURIComponent((opt.buttons.stumbleupon.url !== '' ? opt.buttons.stumbleupon.url : opt.url)), 'stumbleupon', 'toolbar=no,width=550,height=550');
        },
        linkedin: function(opt) {
            window.open('https://www.linkedin.com/cws/share?url=' + encodeURIComponent((opt.buttons.linkedin.url !== '' ? opt.buttons.linkedin.url : opt.url)) + '&token=&isFramed=true', 'linkedin', 'toolbar=no,width=550,height=550');
        },
        pinterest: function(opt) {
            window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent((opt.buttons.pinterest.url !== '' ? opt.buttons.pinterest.url : opt.url)) + '&media=' + encodeURIComponent(opt.buttons.pinterest.media) + '&description=' + opt.buttons.pinterest.description, 'pinterest', 'toolbar=no,width=700,height=300');
        }
    };
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend(true, {}, defaults, options);
        this.options.share = options.share;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    ;Plugin.prototype.init = function() {
        var self = this;
        if (this.options.urlCurl !== '') {
            urlJson.googlePlus = this.options.urlCurl + '?url={url}&type=googlePlus';
            urlJson.stumbleupon = this.options.urlCurl + '?url={url}&type=stumbleupon';
        }
        $(this.element).addClass(this.options.className);
        if (typeof $(this.element).data('title') !== 'undefined') {
            this.options.title = $(this.element).attr('data-title');
        }
        if (typeof $(this.element).data('url') !== 'undefined') {
            this.options.url = $(this.element).data('url');
        }
        if (typeof $(this.element).data('text') !== 'undefined') {
            this.options.text = $(this.element).data('text');
        }
        if (typeof $(this.element).data('related') !== 'undefined') {
            this.options.related = $(this.element).attr('data-related');
        }
        if (typeof $(this.element).data('via') !== 'undefined') {
            this.options.via = $(this.element).attr('data-via');
        }
        $.each(this.options.share, function(name, val) {
            if (val === true) {
                self.options.shareTotal++;
            }
        });
        if (self.options.enableCounter === true) {
            $.each(this.options.share, function(name, val) {
                if (val === true) {
                    try {
                        self.getSocialJson(name);
                    } catch (e) {}
                }
            });
        } else if (self.options.template !== '') {
            this.options.render(this, this.options);
        } else {
            this.loadButtons();
        }
        $(this.element).hover(function() {
            if ($(this).find('.buttons').length === 0 && self.options.enableHover === true) {
                self.loadButtons();
            }
            self.options.hover(self, self.options);
        }, function() {
            self.options.hide(self, self.options);
        });
        $(this.element).click(function() {
            self.options.click(self, self.options);
            return false;
        });
    }
    ;
    Plugin.prototype.loadButtons = function() {
        var self = this;
        $(this.element).append('<div class="buttons"></div>');
        $.each(self.options.share, function(name, val) {
            if (val == true) {
                loadButton[name](self);
                if (self.options.enableTracking === true) {
                    tracking[name]();
                }
            }
        });
    }
    ;
    Plugin.prototype.getSocialJson = function(name) {
        var self = this
          , count = 0
          , url = urlJson[name].replace('{url}', encodeURIComponent(this.options.url));
        if (this.options.buttons[name].urlCount === true && this.options.buttons[name].url !== '') {
            url = urlJson[name].replace('{url}', this.options.buttons[name].url);
        }
        if (url != '' && self.options.urlCurl !== '') {
            $.getJSON(url, function(json) {
                if (typeof json.count !== "undefined") {
                    var temp = json.count + '';
                    temp = temp.replace('\u00c2\u00a0', '');
                    count += parseInt(temp, 10);
                } else if (json.data && json.data.length > 0 && typeof json.data[0].total_count !== "undefined") {
                    count += parseInt(json.data[0].total_count, 10);
                } else if (typeof json[0] !== "undefined") {
                    count += parseInt(json[0].total_posts, 10);
                } else if (typeof json[0] !== "undefined") {}
                self.options.count[name] = count;
                self.options.total += count;
                self.renderer();
                self.rendererPerso();
            }).error(function() {
                self.options.count[name] = 0;
                self.rendererPerso();
            });
        } else {
            self.renderer();
            self.options.count[name] = 0;
            self.rendererPerso();
        }
    }
    ;
    Plugin.prototype.rendererPerso = function() {
        var shareCount = 0;
        for (e in this.options.count) {
            shareCount++;
        }
        if (shareCount === this.options.shareTotal) {
            this.options.render(this, this.options);
        }
    }
    ;
    Plugin.prototype.renderer = function() {
        var total = this.options.total
          , template = this.options.template;
        if ($(this.element).data('count')) {
            total = $(this.element).data('count');
        }
        if (this.options.shorterTotal === true) {
            total = this.shorterTotal(total);
        }
        if (template !== '') {
            template = template.replace('{total}', total);
            $(this.element).html(template);
        } else {
            $(this.element).html('<div class="box"><a class="count" href="#">' + total + '</a>' + (this.options.title !== '' ? '<a class="share" href="#">' + this.options.title + '</a>' : '') + '</div>');
        }
    }
    ;
    Plugin.prototype.shorterTotal = function(num) {
        if (num >= 1e6) {
            num = (num / 1e6).toFixed(2) + "M"
        } else if (num >= 1e3) {
            num = (num / 1e3).toFixed(1) + "k"
        }
        return num;
    }
    ;
    Plugin.prototype.openPopup = function(site) {
        popup[site](this.options);
        if (this.options.enableTracking === true) {
            var tracking = {
                googlePlus: {
                    site: 'Google',
                    action: '+1'
                },
                facebook: {
                    site: 'facebook',
                    action: 'like'
                },
                twitter: {
                    site: 'twitter',
                    action: 'tweet'
                },
                digg: {
                    site: 'digg',
                    action: 'add'
                },
                delicious: {
                    site: 'delicious',
                    action: 'add'
                },
                stumbleupon: {
                    site: 'stumbleupon',
                    action: 'add'
                },
                linkedin: {
                    site: 'linkedin',
                    action: 'share'
                },
                pinterest: {
                    site: 'pinterest',
                    action: 'pin'
                }
            };
            _gaq.push(['_trackSocial', tracking[site].site, tracking[site].action]);
        }
    }
    ;
    Plugin.prototype.simulateClick = function() {
        var html = $(this.element).html();
        $(this.element).html(html.replace(this.options.total, this.options.total + 1));
    }
    ;
    Plugin.prototype.update = function(url, text) {
        if (url !== '') {
            this.options.url = url;
        }
        if (text !== '') {
            this.options.text = text;
        }
    }
    ;
    $.fn[pluginName] = function(options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this,options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function() {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        }
    }
    ;
})(jQuery, window, document);
Showtimes = {
    zip: '',
    views: {
        masthead: {},
        sidebar: {}
    },
    showtimesCookieExpires: 1,
    autoLoad: true,
    logEnabled: this.console && typeof console.log != 'undefined',
    log: function(msg) {
        if (this.logEnabled) {
            var type = $.type(msg);
            if (type === 'string' || type === 'number') {
                console.log('[TMZShowTimes] ' + msg);
            } else {
                console.log(msg);
            }
        }
    },
    enableAutoLoad: function(enabled) {
        this.log('enableAutoLoad::' + enabled);
        this.autoLoad = enabled ? true : false;
    },
    getShowtimesCookie: function(brand) {
        var cookieName = brand + 'ShowTimes'
        if ($.cookie(cookieName) && $.cookie(cookieName).length > 1) {
            var data = $.parseJSON($.cookie(cookieName))
        } else {
            var data = '';
        }
        return data;
    },
    setShowtimesCookie: function(data, brand) {
        var cookieName = brand + 'ShowTimes'
        this.log('setShowtimesCookie::' + cookieName + JSON.stringify(data));
        $.cookie(cookieName, JSON.stringify(data), {
            path: '/',
            expires: this.showtimesCookieExpires
        });
    },
    showForm: function($container) {},
    hideForm: function($container) {},
    setZipChangeLink: function($container, zip) {},
    handleNoResults: function($container) {
        var $stations = $container.find('.stations');
        var $remindMe = $container.find('.remindme');
        var showLink = $stations.data("showtimesUrl");
        $stations.html("<span class='no-results'>Couldn't find listings in your area</span>");
        $stations.show();
        $remindMe.hide();
        $('.masthead-showtimes .change-location').show();
        this.setZipChangeLink($('.masthead-showtimes'), this.zip);
    },
    callShowtimesService: function(brand, zip) {
        var t = this;
        t.log('callShowtimesService, brand:' + brand);
        var service = WbShowTimes({
            siteName: brand
        });
        service.getByUSZip(zip).then(function(data) {
            t.log('callShowtimesService for ' + brand + ' succeeded');
            t.setShowtimesCookie(data, brand);
            t.renderHeader(data, brand);
            t.renderSidebar(data, brand);
        }, function() {
            t.log('callShowtimesService for ' + brand + 'failed, no data');
            t.setShowtimesCookie('', brand);
            t.renderHeader('', brand);
            t.renderSidebar('', brand);
        });
    },
    bindEvents: function($container) {
        var t = this;
        $container.delegate('.change-location a', 'click', function() {
            t.showForm($container);
            return false;
        });
        $container.delegate('form', 'submit', function() {
            $container.find('.active-stations').html('');
            var $zip = $(this).find('input.zip-code-field');
            var zip = $zip.val().replace(/[^a-zA-Z0-9\s_-]/g, '');
            t.setZipChangeLink($container, zip);
            t.zip = zip;
            t.hideForm($('.masthead-showtimes'));
            t.hideForm($('.next-tmzlive-locator'));
            t.hideForm($('.next-tmz-locator'));
            if (zip) {
                t.log('bindEvents::formsubmit::zip: ' + zip);
                WbGeoLocation.setZip(zip);
                t.renderShowtimes();
            } else {
                t.log('bindEvents::formsubmit::no zip');
                WbGeoLocation.setZip('');
                t.handleNoResults($container);
            }
            return false;
        });
    },
    daySearch: function(array, day) {
        day = $.grep(array, function(e) {
            return e.day === day;
        })[0];
        return day;
    },
    showtimeCompare: function(a, b) {
        if (a.day < b.day)
            return -1;
        if (a.day > b.day)
            return 1;
        return 0;
    },
    groupShowtimesByDay: function(data) {
        var t = this;
        var newdata = {};
        newdata.stations = [];
        $.each(data, function(i, stationObject) {
            var station = {};
            station.logo_thumb = stationObject.station.logo_thumb;
            station.affiliate = stationObject.station.affiliate;
            station.callsign = stationObject.station.callsign;
            station.showtimesByDay = [];
            $.each(stationObject.station.showtimes, function(i, showtime) {
                var dayGroup = {
                    day: {}
                };
                var savedDay = t.daySearch(station.showtimesByDay, showtime.day);
                if (station.showtimesByDay && savedDay) {
                    dayGroup = savedDay;
                } else {
                    dayGroup.day = showtime.day;
                    station.showtimesByDay.push(dayGroup);
                }
                if (dayGroup && dayGroup.times) {
                    var timeIsUnique = (dayGroup.times.indexOf(showtime.time) === -1)
                    if (timeIsUnique) {
                        dayGroup.times.push(showtime.time);
                    }
                } else {
                    dayGroup.times = [];
                    dayGroup.times.push(showtime.time);
                }
            });
            station.showtimesByDay.sort(t.showtimeCompare);
            if (station.showtimesByDay.length > 0) {
                newdata.stations.push(station);
            }
        });
        return newdata;
    },
    renderHeader: function(data, brand) {
        var t = this;
        t.log('renderHeader, brand:' + brand);
        var container = '.showtimes-block.' + brand;
        var $container = $(container);
        if (!$container.length > 0) {
            return;
        }
        $('.zip-code-field').val(this.zip);
        data = t.groupShowtimesByDay(data);
        if (data && data.stations.length > 0) {
            t.views.masthead.stationView = '<li class="station">' + '<div class="callsign">' + '{{if affiliate}}${affiliate} {{/if}}' + '{{if callsign}}(${callsign}){{/if}}' + '</div>' + '<dl class="listings">' + '{{each(i,showtime) showtimesByDay}}' + '<dt>${showtime.day} </dt>' + '{{each(i,time) showtime.times}}' + '{{if i < 3 }}' + '<dd>${time}' + '{{if showtime.times.length - 1 > i}},{{/if}}' + ' </dd>' + '{{/if}}' + '{{/each}}' + '{{if showtime.day === "M-F"}}<br/>{{/if}}' + '{{/each}}' + '</dl>' + '</li>';
            $.template('showTimes_masthead_StationView', t.views.masthead.stationView);
            var $stations = $container.find('ul.stations').show();
            $container.data('zip', t.zip);
            $stations.html('');
            $.each(data.stations, function(index, value) {
                if (index > 0) {
                    return;
                }
                $.tmpl('showTimes_masthead_StationView', value).appendTo($stations);
            });
            var $remindMe = $container.find('.remindme');
            var $href = $remindMe.attr('href');
            $href = $href.replace(/(zip=)[^\&]+/, '$1' + this.zip);
            $remindMe.attr('href', $href);
            $remindMe.show();
        } else {
            t.handleNoResults($container);
        }
        $('.stations-results').tinycarousel();
    },
    renderSidebar: function(data, brand) {
        var t = this;
        t.log('renderSidebar, brand:' + brand);
        var container = '.next-' + brand + '-locator';
        var $container = $(container);
        if (!$container.length > 0) {
            return;
        }
        this.setZipChangeLink($(container), this.zip);
        t.hideForm($container);
        data = t.groupShowtimesByDay(data);
        if (data && data.stations.length > 0) {
            t.views.sidebar.stationView = '<li class="station">' + '<div class="callsign">' + '{{if logo_thumb}}' + '<img src="${logo_thumb}"></img>' + '{{else}}' + '{{if affiliate}}${affiliate} {{/if}}' + '{{if callsign}}(${callsign}){{/if}}' + '{{/if}}' + '</div>' + '<dl class="listings">' + '{{each(i,showtime) showtimesByDay}}' + '<dt>${showtime.day} </dt>' + '{{each(i,time) showtime.times}}' + '{{if i < 3 }}' + '<dd>${time}' + '{{if showtime.times.length - 1 > i}},{{/if}}' + ' </dd>' + '{{/if}}' + '{{/each}}' + '{{if showtime.day === "M-F"}}<br/>{{/if}}' + '{{/each}}' + '</dl>' + '</li>';
            $.template('showTimes_sidebar_StationView', t.views.sidebar.stationView);
            var $stations = $container.find('.js-stations').show();
            $container.data('zip', t.zip);
            $stations.html('');
            $.each(data.stations, function(index, value) {
                $.tmpl('showTimes_sidebar_StationView', value).appendTo($stations);
            });
        } else {
            t.handleNoResults($container);
        }
    },
    renderShowtimes: function() {
        var t = this;
        var tmzShowtimesResults = this.getShowtimesCookie('tmz');
        var tmzLiveShowtimesResults = this.getShowtimesCookie('tmzlive');
        var tmzHasResults = tmzShowtimesResults && tmzShowtimesResults.length > 6;
        var tmzLiveHasResults = tmzLiveShowtimesResults && tmzLiveShowtimesResults.length > 6;
        var zip = t.zip;
        if (tmzHasResults) {
            t.log('getShowtimesCookie from cookie succeeded for tmz');
            t.renderHeader(tmzShowtimesResults, 'tmz');
            t.renderSidebar(tmzShowtimesResults, 'tmz');
        } else {
            t.log('getShowtimesCookie from cookie failed for tmz');
            t.callShowtimesService('tmz', zip);
        }
        if (tmzLiveHasResults) {
            t.log('getShowtimesCookie from cookie succeeded for tmzlive');
            t.renderHeader(tmzLiveShowtimesResults, 'tmzlive');
            t.renderSidebar(tmzLiveShowtimesResults, 'tmzlive');
        } else {
            t.log('getShowtimesCookie from cookie failed for tmzlive');
            t.callShowtimesService('tmzlive', zip);
        }
    },
    init: function() {
        var t = this;
        t.bindEvents($('.masthead-showtimes'));
        t.bindEvents($('.next-tmzlive-locator'));
        t.bindEvents($('.next-tmz-locator'));
        var zipCookie = WbGeoLocation.getZipCookie();
        if (!zipCookie || zipCookie == '-1' || !zipCookie.length > 0) {
            t.log('getZip from cookie failed, no zip');
            if (!t.autoLoad) {
                t.log('no autoLoad, no zip');
                t.showForm($('.masthead-showtimes'));
                t.showForm($('.next-tmzlive-locator'));
                t.showForm($('.next-tmz-locator'));
                $('.zip-form-close').hide();
            } else {
                t.log('autoLoad, get zip from WbGeoLocation');
                setTimeout(function() {
                    WbGeoLocation.getZip().done(function(zip) {
                        t.log('getZip succeeded: ' + zip);
                        t.zip = zip;
                        t.renderShowtimes();
                    });
                }, 2000);
                setTimeout(function() {
                    WbGeoLocation.getZip().fail(function(zip) {
                        t.log('getZip failed, no zip');
                        t.zip = '';
                        t.setShowtimesCookie('', 'tmz');
                        t.setShowtimesCookie('', 'tmzlive');
                        t.setShowtimesCookie('', 'tmzsports');
                        t.showForm($('.masthead-showtimes'));
                        t.showForm($('.next-tmzlive-locator'));
                        t.showForm($('.next-tmz-locator'));
                        $('.zip-form-close').hide();
                    });
                }, 2000);
            }
        } else {
            t.log('getZip from cookie succeeded');
            t.zip = zipCookie;
            t.renderShowtimes();
        }
    }
}
$(document).on('click', '.has-adid', function() {
    var $link = $(this);
    var adId = $link.data('adid');
    var href = $link.attr('href');
    $link.attr("href", href + "?adid=" + adId);
    return true;
});
$(document).on('click', '.kWidgetPlayBtn', function() {
    var $kalturaPlayerID = $(this).attr('id').replace('_playBtn', '');
    var $playerDiv = $('div#' + $kalturaPlayerID).closest('div[data-video-type=kaltura]');
    $playerDiv.find('div.launch-quote').hide();
    var $priorPriorElement = $playerDiv.prev().prev();
    if ($priorPriorElement.hasClass('primary-image-swipe')) {
        $priorPriorElement.hide();
    }
    return true;
});
$(document).ready(function() {
    $('.video-feed-item a').on('click', function(e) {
        var category = $(this).parents('.category-wrapper').data('slug');
        sessionStorage.categoryName = category;
    });
});
function closeTermsBar() {
    $('#legalbar').hide();
    $.cookie('termsclosed', 'true', {
        expires: 9999
    });
    return false;
}
function addTermsBar() {
    $("body").prepend("<div class='legal' id='legalbar'>By using this site, you agree to the <a href='http://www.warnerbros.com/privacy-center-wb-privacy-policy' target='_blank'>Privacy Policy</a> and <a href='http://www.tmz.com/terms' target='_blank'>Terms of Use.</a><a href='#' class='close' onclick='closeTermsBar();'>close</a></div>");
    return false;
}
jQuery(document).ready(function() {
    var termbarclosed = $.cookie("termsclosed");
    if (termbarclosed != "true") {
        if ($("html.lightbox")[0]) {
            return false;
        } else {
            addTermsBar();
            return false;
        }
    }
});
(function($) {
    $.fn.jMyCarousel = function(o) {
        o = $.extend({
            btnPrev: null ,
            btnNext: null ,
            mouseWheel: true,
            auto: false,
            speed: 500,
            easing: 'linear',
            vertical: false,
            circular: true,
            visible: '4',
            start: 0,
            scroll: 1,
            step: 50,
            eltByElt: false,
            evtStart: 'mouseover',
            evtStop: 'mouseout',
            beforeStart: null ,
            afterEnd: null
        }, o || {});
        return this.each(function() {
            var running = false
              , animCss = o.vertical ? "top" : "left"
              , sizeCss = o.vertical ? "height" : "width";
            var div = $(this)
              , ul = $("ul", div)
              , tLi = $("li", ul)
              , tl = tLi.size()
              , v = o.visible;
            var mousewheelN = 0;
            var defaultBtn = (o.btnNext === null && o.btnPrev === null ) ? true : false;
            var cssU = (v.toString().indexOf("%") != -1 ? '%' : (v.toString().indexOf("px") != -1) ? 'px' : 'el');
            var direction = null ;
            if (o.circular) {
                var imgSet = tLi.clone();
                ul.prepend(imgSet).append(imgSet.clone())
            }
            var li = $("li", ul);
            div.css("visibility", "visible");
            li.css("overflow", "hidden").css("float", o.vertical ? "none" : "left").children().css("overflow", "hidden");
            if (!o.vertical) {
                li.css("display", "inline")
            }
            if (li.children().get(0).tagName.toLowerCase() == 'a' && !o.vertical) {
                li.children().css('float', 'left')
            }
            if (o.vertical && jQuery.browser.msie) {
                li.css('line-height', '4px').children().css('margin-bottom', '-4px')
            }
            ul.css("margin", "0").css("padding", "0").css("position", "relative").css("list-style-type", "none").css("z-index", "1");
            div.css("overflow", "hidden").css("position", "relative").css("z-index", "2").css("left", "0px");
            var liSize = o.vertical ? height(li) : width(li);
            var liSizeV = o.vertical ? elHeight(li) : height(li);
            var curr = o.start;
            var nbAllElts = li.size();
            var ulSize = liSize * nbAllElts;
            var nbElts = tl;
            var eltsSize = nbElts * liSize;
            var allEltsSize = nbAllElts * liSize;
            var step = o.step == 'default' ? liSize : o.step;
            o.btnPrev = defaultBtn ? $('<input type="button" class="' + (o.vertical ? 'up' : 'prev saga-sprite') + '" />') : $(o.btnPrev);
            o.btnNext = defaultBtn ? $('<input type="button" class="' + (o.vertical ? 'down' : 'next saga-sprite') + '" />') : $(o.btnNext);
            var prev = o.btnPrev;
            var next = o.btnNext;
            if (defaultBtn && o.auto !== true) {
                prev.css({
                    'opacity': '0.6'
                });
                next.css({
                    'opacity': '0.6'
                });
                div.prepend(prev);
                div.prepend(next);
                o.btnPrev = prev;
                o.btnNext = next
            }
            if (o.eltByElt) {
                step = liSize;
                if (o.start % liSize !== 0) {
                    var imgStart = parseInt(o.start / liSize);
                    curr = o.start = (imgStart * liSize)
                }
            }
            if (o.circular) {
                o.start += (liSize * tl);
                curr += (liSize * tl)
            }
            var divSize, cssSize, cssUnity;
            if (cssU == '%') {
                divSize = 0;
                cssSize = parseInt(v);
                cssUnity = "%"
            } else if (cssU == 'px') {
                divSize = parseInt(v);
                cssSize = parseInt(v);
                cssUnity = "px"
            } else {
                divSize = liSize * parseInt(v);
                cssSize = liSize * parseInt(v);
                cssUnity = "px"
            }
            ul.css(sizeCss, ulSize + "px").css(animCss, -(o.start));
            div.css(sizeCss, cssSize + cssUnity);
            if (o.vertical && cssUnity == '%') {
                var pxsize = ((liSize * nbElts) * (parseInt(v) / 100));
                div.css(sizeCss, pxsize + 'px')
            }
            if (divSize === 0) {
                divSize = div.width()
            }
            if (o.vertical) {
                div.css("width", liSizeV + 'px');
                ul.css("width", liSizeV + 'px');
                li.css('margin-bottom', (parseInt(li.css('margin-bottom')) * 2) + 'px');
                li.eq(li.size() - 1).css('margin-bottom', li.css('margin-top'))
            } else {
                div.css('height', liSizeV + 'px');
                ul.css('height', liSizeV + 'px')
            }
            if (cssU == '%') {
                v = divSize / li.width();
                if (v % 1 !== 0) {
                    v += 1
                }
                v = parseInt(v)
            }
            var divVSize = div.height();
            if (defaultBtn) {
                next.css({
                    'z-index': 200,
                    'position': 'absolute'
                });
                prev.css({
                    'z-index': 200,
                    'position': 'absolute'
                });
                if (o.vertical) {
                    prev.css({
                        'width': prev.width(),
                        'height': prev.height(),
                        'top': '0px',
                        'left': parseInt(liSizeV / 2) - parseInt(prev.width() / 2) + 'px'
                    });
                    next.css({
                        'width': prev.width(),
                        'height': prev.height(),
                        'top': (divVSize - prev.height()) + 'px',
                        'left': parseInt(liSizeV / 2) - parseInt(prev.width() / 2) + 'px'
                    })
                } else {
                    prev.css({
                        'left': '0px',
                        'top': parseInt(liSizeV / 2) - parseInt(prev.height() / 2) + 'px'
                    });
                    next.css({
                        'right': '0px',
                        'top': parseInt(liSizeV / 2) - parseInt(prev.height() / 2) + 'px'
                    })
                }
            }
            if (o.btnPrev) {
                $(o.btnPrev).bind(o.evtStart, function() {
                    if (defaultBtn) {
                        o.btnPrev.css('opacity', 0.9)
                    }
                    running = true;
                    direction = 'backward';
                    return backward()
                });
                $(o.btnPrev).bind(o.evtStop, function() {
                    if (defaultBtn) {
                        o.btnPrev.css('opacity', 0.6)
                    }
                    running = false;
                    direction = null ;
                    return stop()
                })
            }
            if (o.btnNext) {
                $(o.btnNext).bind(o.evtStart, function() {
                    if (defaultBtn) {
                        o.btnNext.css('opacity', 0.9)
                    }
                    running = true;
                    direction = 'forward';
                    return forward()
                });
                $(o.btnNext).bind(o.evtStop, function() {
                    if (defaultBtn) {
                        o.btnNext.css('opacity', 0.6)
                    }
                    running = false;
                    direction = null ;
                    return stop()
                })
            }
            if (o.auto === true) {
                running = true;
                forward()
            }
            if (o.mouseWheel && div.mousewheel) {
                div.mousewheel(function(e, d) {
                    if (!o.circular && (d > 0 ? (curr + divSize < ulSize) : (curr > 0)) || o.circular) {
                        mousewheelN += 1;
                        if (running === false) {
                            if (d > 0) {
                                forward(step, true)
                            } else {
                                backward(step, true)
                            }
                            running = true
                        }
                    }
                })
            }
            function forward(stepsize, once) {
                var s = (stepsize ? stepsize : step);
                if (running === true && direction === "backward") {
                    return
                }
                if (!o.circular) {
                    if (curr + s + (o.vertical ? divVSize : divSize) > eltsSize) {
                        s = eltsSize - (curr + (o.vertical ? divVSize : divSize))
                    }
                }
                ul.animate(animCss == "left" ? {
                    left: -(curr + s)
                } : {
                    top: -(curr + s)
                }, o.speed, o.easing, function() {
                    curr += s;
                    if (o.circular) {
                        if (curr + (o.vertical ? divVSize : divSize) + liSize >= allEltsSize) {
                            ul.css(o.vertical ? 'top' : 'left', -curr + eltsSize);
                            curr -= eltsSize
                        }
                    }
                    if (!once && running) {
                        forward()
                    } else if (once) {
                        if (--mousewheelN > 0) {
                            this.forward(step, true)
                        } else {
                            running = false;
                            direction = null
                        }
                    }
                })
            }
            function backward(stepsize, once) {
                var s = (stepsize ? stepsize : step);
                if (running === true && direction === "forward") {
                    return
                }
                if (!o.circular) {
                    if (curr - s < 0) {
                        s = curr - 0
                    }
                }
                ul.animate(animCss == "left" ? {
                    left: -(curr - s)
                } : {
                    top: -(curr - s)
                }, o.speed, o.easing, function() {
                    curr -= s;
                    if (o.circular) {
                        if (curr <= liSize) {
                            ul.css(o.vertical ? 'top' : 'left', -(curr + eltsSize));
                            curr += eltsSize
                        }
                    }
                    if (!once && running) {
                        backward()
                    } else if (once) {
                        if (--mousewheelN > 0) {
                            backward(step, true)
                        } else {
                            running = false;
                            direction = null
                        }
                    }
                })
            }
            function stop() {
                if (!o.eltByElt) {
                    ul.stop();
                    curr = 0 - parseInt(ul.css(animCss))
                }
                running = false;
                direction = null
            }
            function imgSize(el, dimension) {
                if (dimension == 'width') {
                    return el.find('img').width()
                } else {
                    return el.find('img').height()
                }
            }
            function elHeight(el) {
                var elImg = el.find('img');
                if (o.vertical) {
                    return parseInt(el.css('margin-left')) + parseInt(el.css('margin-right')) + parseInt(elImg.width()) + parseInt(el.css('border-left-width')) + parseInt(el.css('border-right-width')) + parseInt(el.css('padding-right')) + parseInt(el.css('padding-left'))
                } else {
                    return parseInt(el.css('margin-top')) + parseInt(el.css('margin-bottom')) + parseInt(elImg.width()) + parseInt(el.css('border-top-height')) + parseInt(el.css('border-bottom-height')) + parseInt(el.css('padding-top')) + parseInt(el.css('padding-bottom'))
                }
            }
            function debug(html) {
                $('#debug').html($('#debug').html() + html + "<br/>")
            }
        })
    }
    ;
    function css(el, prop) {
        return parseInt($.css(el[0], prop)) || 0
    }
    function width(el) {
        return el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight')
    }
    function height(el) {
        return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom')
    }
})(jQuery);
(function($, window, undefined) {
    $.fn.jScrollPane = function(settings) {
        function JScrollPane(elem, s) {
            var settings, jsp = this, pane, paneWidth, paneHeight, container, contentWidth, contentHeight, percentInViewH, percentInViewV, isScrollableV, isScrollableH, verticalDrag, dragMaxY, verticalDragPosition, horizontalDrag, dragMaxX, horizontalDragPosition, verticalBar, verticalTrack, scrollbarWidth, verticalTrackHeight, verticalDragHeight, arrowUp, arrowDown, horizontalBar, horizontalTrack, horizontalTrackWidth, horizontalDragWidth, arrowLeft, arrowRight, reinitialiseInterval, originalPadding, originalPaddingTotalWidth, previousContentWidth, wasAtTop = true, wasAtLeft = true, wasAtBottom = false, wasAtRight = false, originalElement = elem.clone(false, false).empty(), mwEvent = $.fn.mwheelIntent ? 'mwheelIntent.jsp' : 'mousewheel.jsp';
            originalPadding = elem.css('paddingTop') + ' ' + elem.css('paddingRight') + ' ' + elem.css('paddingBottom') + ' ' + elem.css('paddingLeft');
            originalPaddingTotalWidth = (parseInt(elem.css('paddingLeft'), 10) || 0) + (parseInt(elem.css('paddingRight'), 10) || 0);
            function initialise(s) {
                var isMaintainingPositon, lastContentX, lastContentY, hasContainingSpaceChanged, originalScrollTop, originalScrollLeft, maintainAtBottom = false, maintainAtRight = false;
                settings = s;
                if (pane === undefined) {
                    originalScrollTop = elem.scrollTop();
                    originalScrollLeft = elem.scrollLeft();
                    elem.css({
                        overflow: 'hidden',
                        padding: 0
                    });
                    paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
                    paneHeight = elem.innerHeight();
                    elem.width(paneWidth);
                    pane = $('<div class="jspPane" />').css('padding', originalPadding).append(elem.children());
                    container = $('<div class="jspContainer" />').css({
                        'width': paneWidth + 'px',
                        'height': paneHeight + 'px'
                    }).append(pane).appendTo(elem);
                } else {
                    elem.css('width', '');
                    maintainAtBottom = settings.stickToBottom && isCloseToBottom();
                    maintainAtRight = settings.stickToRight && isCloseToRight();
                    hasContainingSpaceChanged = elem.innerWidth() + originalPaddingTotalWidth != paneWidth || elem.outerHeight() != paneHeight;
                    if (hasContainingSpaceChanged) {
                        paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
                        paneHeight = elem.innerHeight();
                        container.css({
                            width: paneWidth + 'px',
                            height: paneHeight + 'px'
                        });
                    }
                    if (!hasContainingSpaceChanged && previousContentWidth == contentWidth && pane.outerHeight() == contentHeight) {
                        elem.width(paneWidth);
                        return;
                    }
                    previousContentWidth = contentWidth;
                    pane.css('width', '');
                    elem.width(paneWidth);
                    container.find('>.jspVerticalBar,>.jspHorizontalBar').remove().end();
                }
                pane.css('overflow', 'auto');
                if (s.contentWidth) {
                    contentWidth = s.contentWidth;
                } else {
                    contentWidth = pane[0].scrollWidth;
                }
                contentHeight = pane[0].scrollHeight;
                pane.css('overflow', '');
                percentInViewH = contentWidth / paneWidth;
                percentInViewV = contentHeight / paneHeight;
                isScrollableV = percentInViewV > 1;
                isScrollableH = percentInViewH > 1;
                if (!(isScrollableH || isScrollableV)) {
                    elem.removeClass('jspScrollable');
                    pane.css({
                        top: 0,
                        width: container.width() - originalPaddingTotalWidth
                    });
                    removeMousewheel();
                    removeFocusHandler();
                    removeKeyboardNav();
                    removeClickOnTrack();
                } else {
                    elem.addClass('jspScrollable');
                    isMaintainingPositon = settings.maintainPosition && (verticalDragPosition || horizontalDragPosition);
                    if (isMaintainingPositon) {
                        lastContentX = contentPositionX();
                        lastContentY = contentPositionY();
                    }
                    initialiseVerticalScroll();
                    initialiseHorizontalScroll();
                    resizeScrollbars();
                    if (isMaintainingPositon) {
                        scrollToX(maintainAtRight ? (contentWidth - paneWidth) : lastContentX, false);
                        scrollToY(maintainAtBottom ? (contentHeight - paneHeight) : lastContentY, false);
                    }
                    initFocusHandler();
                    initMousewheel();
                    initTouch();
                    if (settings.enableKeyboardNavigation) {
                        initKeyboardNav();
                    }
                    if (settings.clickOnTrack) {
                        initClickOnTrack();
                    }
                    observeHash();
                    if (settings.hijackInternalLinks) {
                        hijackInternalLinks();
                    }
                }
                if (settings.autoReinitialise && !reinitialiseInterval) {
                    reinitialiseInterval = setInterval(function() {
                        initialise(settings);
                    }, settings.autoReinitialiseDelay);
                } else if (!settings.autoReinitialise && reinitialiseInterval) {
                    clearInterval(reinitialiseInterval);
                }
                originalScrollTop && elem.scrollTop(0) && scrollToY(originalScrollTop, false);
                originalScrollLeft && elem.scrollLeft(0) && scrollToX(originalScrollLeft, false);
                elem.trigger('jsp-initialised', [isScrollableH || isScrollableV]);
            }
            function initialiseVerticalScroll() {
                if (isScrollableV) {
                    container.append($('<div class="jspVerticalBar" />').append($('<div class="jspCap jspCapTop" />'), $('<div class="jspTrack" />').append($('<div class="jspDrag" />').append($('<div class="jspDragTop" />'), $('<div class="jspDragBottom" />'))), $('<div class="jspCap jspCapBottom" />')));
                    verticalBar = container.find('>.jspVerticalBar');
                    verticalTrack = verticalBar.find('>.jspTrack');
                    verticalDrag = verticalTrack.find('>.jspDrag');
                    if (settings.showArrows) {
                        arrowUp = $('<a class="jspArrow jspArrowUp" />').bind('mousedown.jsp', getArrowScroll(0, -1)).bind('click.jsp', nil);
                        arrowDown = $('<a class="jspArrow jspArrowDown" />').bind('mousedown.jsp', getArrowScroll(0, 1)).bind('click.jsp', nil);
                        if (settings.arrowScrollOnHover) {
                            arrowUp.bind('mouseover.jsp', getArrowScroll(0, -1, arrowUp));
                            arrowDown.bind('mouseover.jsp', getArrowScroll(0, 1, arrowDown));
                        }
                        appendArrows(verticalTrack, settings.verticalArrowPositions, arrowUp, arrowDown);
                    }
                    verticalTrackHeight = paneHeight;
                    container.find('>.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow').each(function() {
                        verticalTrackHeight -= $(this).outerHeight();
                    });
                    verticalDrag.hover(function() {
                        verticalDrag.addClass('jspHover');
                    }, function() {
                        verticalDrag.removeClass('jspHover');
                    }).bind('mousedown.jsp', function(e) {
                        $('html').bind('dragstart.jsp selectstart.jsp', nil);
                        verticalDrag.addClass('jspActive');
                        var startY = e.pageY - verticalDrag.position().top;
                        $('html').bind('mousemove.jsp', function(e) {
                            positionDragY(e.pageY - startY, false);
                        }).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
                        return false;
                    });
                    sizeVerticalScrollbar();
                }
            }
            function sizeVerticalScrollbar() {
                verticalTrack.height(verticalTrackHeight + 'px');
                verticalDragPosition = 0;
                scrollbarWidth = settings.verticalGutter + verticalTrack.outerWidth();
                pane.width(paneWidth - scrollbarWidth - originalPaddingTotalWidth);
                try {
                    if (verticalBar.position().left === 0) {
                        pane.css('margin-left', scrollbarWidth + 'px');
                    }
                } catch (err) {}
            }
            function initialiseHorizontalScroll() {
                if (isScrollableH) {
                    container.append($('<div class="jspHorizontalBar" />').append($('<div class="jspCap jspCapLeft" />'), $('<div class="jspTrack" />').append($('<div class="jspDrag" />').append($('<div class="jspDragLeft" />'), $('<div class="jspDragRight" />'))), $('<div class="jspCap jspCapRight" />')));
                    horizontalBar = container.find('>.jspHorizontalBar');
                    horizontalTrack = horizontalBar.find('>.jspTrack');
                    horizontalDrag = horizontalTrack.find('>.jspDrag');
                    if (settings.showArrows) {
                        arrowLeft = $('<a class="jspArrow jspArrowLeft" />').bind('mousedown.jsp', getArrowScroll(-1, 0)).bind('click.jsp', nil);
                        arrowRight = $('<a class="jspArrow jspArrowRight" />').bind('mousedown.jsp', getArrowScroll(1, 0)).bind('click.jsp', nil);
                        if (settings.arrowScrollOnHover) {
                            arrowLeft.bind('mouseover.jsp', getArrowScroll(-1, 0, arrowLeft));
                            arrowRight.bind('mouseover.jsp', getArrowScroll(1, 0, arrowRight));
                        }
                        appendArrows(horizontalTrack, settings.horizontalArrowPositions, arrowLeft, arrowRight);
                    }
                    horizontalDrag.hover(function() {
                        horizontalDrag.addClass('jspHover');
                    }, function() {
                        horizontalDrag.removeClass('jspHover');
                    }).bind('mousedown.jsp', function(e) {
                        $('html').bind('dragstart.jsp selectstart.jsp', nil);
                        horizontalDrag.addClass('jspActive');
                        var startX = e.pageX - horizontalDrag.position().left;
                        $('html').bind('mousemove.jsp', function(e) {
                            positionDragX(e.pageX - startX, false);
                        }).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
                        return false;
                    });
                    horizontalTrackWidth = container.innerWidth();
                    sizeHorizontalScrollbar();
                }
            }
            function sizeHorizontalScrollbar() {
                container.find('>.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow').each(function() {
                    horizontalTrackWidth -= $(this).outerWidth();
                });
                horizontalTrack.width(horizontalTrackWidth + 'px');
                horizontalDragPosition = 0;
            }
            function resizeScrollbars() {
                if (isScrollableH && isScrollableV) {
                    var horizontalTrackHeight = horizontalTrack.outerHeight()
                      , verticalTrackWidth = verticalTrack.outerWidth();
                    verticalTrackHeight -= horizontalTrackHeight;
                    $(horizontalBar).find('>.jspCap:visible,>.jspArrow').each(function() {
                        horizontalTrackWidth += $(this).outerWidth();
                    });
                    horizontalTrackWidth -= verticalTrackWidth;
                    paneHeight -= verticalTrackWidth;
                    paneWidth -= horizontalTrackHeight;
                    horizontalTrack.parent().append($('<div class="jspCorner" />').css('width', horizontalTrackHeight + 'px'));
                    sizeVerticalScrollbar();
                    sizeHorizontalScrollbar();
                }
                if (isScrollableH) {
                    pane.width((container.outerWidth() - originalPaddingTotalWidth) + 'px');
                }
                contentHeight = pane.outerHeight();
                percentInViewV = contentHeight / paneHeight;
                if (isScrollableH) {
                    horizontalDragWidth = Math.ceil(1 / percentInViewH * horizontalTrackWidth);
                    if (horizontalDragWidth > settings.horizontalDragMaxWidth) {
                        horizontalDragWidth = settings.horizontalDragMaxWidth;
                    } else if (horizontalDragWidth < settings.horizontalDragMinWidth) {
                        horizontalDragWidth = settings.horizontalDragMinWidth;
                    }
                    horizontalDrag.width(horizontalDragWidth + 'px');
                    dragMaxX = horizontalTrackWidth - horizontalDragWidth;
                    _positionDragX(horizontalDragPosition);
                }
                if (isScrollableV) {
                    verticalDragHeight = Math.ceil(1 / percentInViewV * verticalTrackHeight);
                    if (verticalDragHeight > settings.verticalDragMaxHeight) {
                        verticalDragHeight = settings.verticalDragMaxHeight;
                    } else if (verticalDragHeight < settings.verticalDragMinHeight) {
                        verticalDragHeight = settings.verticalDragMinHeight;
                    }
                    verticalDrag.height(verticalDragHeight + 'px');
                    dragMaxY = verticalTrackHeight - verticalDragHeight;
                    _positionDragY(verticalDragPosition);
                }
            }
            function appendArrows(ele, p, a1, a2) {
                var p1 = "before", p2 = "after", aTemp;
                if (p == "os") {
                    p = /Mac/.test(navigator.platform) ? "after" : "split";
                }
                if (p == p1) {
                    p2 = p;
                } else if (p == p2) {
                    p1 = p;
                    aTemp = a1;
                    a1 = a2;
                    a2 = aTemp;
                }
                ele[p1](a1)[p2](a2);
            }
            function getArrowScroll(dirX, dirY, ele) {
                return function() {
                    arrowScroll(dirX, dirY, this, ele);
                    this.blur();
                    return false;
                }
                ;
            }
            function arrowScroll(dirX, dirY, arrow, ele) {
                arrow = $(arrow).addClass('jspActive');
                var eve, scrollTimeout, isFirst = true, doScroll = function() {
                    if (dirX !== 0) {
                        jsp.scrollByX(dirX * settings.arrowButtonSpeed);
                    }
                    if (dirY !== 0) {
                        jsp.scrollByY(dirY * settings.arrowButtonSpeed);
                    }
                    scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.arrowRepeatFreq);
                    isFirst = false;
                }
                ;
                doScroll();
                eve = ele ? 'mouseout.jsp' : 'mouseup.jsp';
                ele = ele || $('html');
                ele.bind(eve, function() {
                    arrow.removeClass('jspActive');
                    scrollTimeout && clearTimeout(scrollTimeout);
                    scrollTimeout = null ;
                    ele.unbind(eve);
                });
            }
            function initClickOnTrack() {
                removeClickOnTrack();
                if (isScrollableV) {
                    verticalTrack.bind('mousedown.jsp', function(e) {
                        if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
                            var clickedTrack = $(this), offset = clickedTrack.offset(), direction = e.pageY - offset.top - verticalDragPosition, scrollTimeout, isFirst = true, doScroll = function() {
                                var offset = clickedTrack.offset()
                                  , pos = e.pageY - offset.top - verticalDragHeight / 2
                                  , contentDragY = paneHeight * settings.scrollPagePercent
                                  , dragY = dragMaxY * contentDragY / (contentHeight - paneHeight);
                                if (direction < 0) {
                                    if (verticalDragPosition - dragY > pos) {
                                        jsp.scrollByY(-contentDragY);
                                    } else {
                                        positionDragY(pos);
                                    }
                                } else if (direction > 0) {
                                    if (verticalDragPosition + dragY < pos) {
                                        jsp.scrollByY(contentDragY);
                                    } else {
                                        positionDragY(pos);
                                    }
                                } else {
                                    cancelClick();
                                    return;
                                }
                                scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
                                isFirst = false;
                            }
                            , cancelClick = function() {
                                scrollTimeout && clearTimeout(scrollTimeout);
                                scrollTimeout = null ;
                                $(document).unbind('mouseup.jsp', cancelClick);
                            }
                            ;
                            doScroll();
                            $(document).bind('mouseup.jsp', cancelClick);
                            return false;
                        }
                    });
                }
                if (isScrollableH) {
                    horizontalTrack.bind('mousedown.jsp', function(e) {
                        if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
                            var clickedTrack = $(this), offset = clickedTrack.offset(), direction = e.pageX - offset.left - horizontalDragPosition, scrollTimeout, isFirst = true, doScroll = function() {
                                var offset = clickedTrack.offset()
                                  , pos = e.pageX - offset.left - horizontalDragWidth / 2
                                  , contentDragX = paneWidth * settings.scrollPagePercent
                                  , dragX = dragMaxX * contentDragX / (contentWidth - paneWidth);
                                if (direction < 0) {
                                    if (horizontalDragPosition - dragX > pos) {
                                        jsp.scrollByX(-contentDragX);
                                    } else {
                                        positionDragX(pos);
                                    }
                                } else if (direction > 0) {
                                    if (horizontalDragPosition + dragX < pos) {
                                        jsp.scrollByX(contentDragX);
                                    } else {
                                        positionDragX(pos);
                                    }
                                } else {
                                    cancelClick();
                                    return;
                                }
                                scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
                                isFirst = false;
                            }
                            , cancelClick = function() {
                                scrollTimeout && clearTimeout(scrollTimeout);
                                scrollTimeout = null ;
                                $(document).unbind('mouseup.jsp', cancelClick);
                            }
                            ;
                            doScroll();
                            $(document).bind('mouseup.jsp', cancelClick);
                            return false;
                        }
                    });
                }
            }
            function removeClickOnTrack() {
                if (horizontalTrack) {
                    horizontalTrack.unbind('mousedown.jsp');
                }
                if (verticalTrack) {
                    verticalTrack.unbind('mousedown.jsp');
                }
            }
            function cancelDrag() {
                $('html').unbind('dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp');
                if (verticalDrag) {
                    verticalDrag.removeClass('jspActive');
                }
                if (horizontalDrag) {
                    horizontalDrag.removeClass('jspActive');
                }
            }
            function positionDragY(destY, animate) {
                if (!isScrollableV) {
                    return;
                }
                if (destY < 0) {
                    destY = 0;
                } else if (destY > dragMaxY) {
                    destY = dragMaxY;
                }
                if (animate === undefined) {
                    animate = settings.animateScroll;
                }
                if (animate) {
                    jsp.animate(verticalDrag, 'top', destY, _positionDragY);
                } else {
                    verticalDrag.css('top', destY);
                    _positionDragY(destY);
                }
            }
            function _positionDragY(destY) {
                if (destY === undefined) {
                    destY = verticalDrag.position().top;
                }
                container.scrollTop(0);
                verticalDragPosition = destY;
                var isAtTop = verticalDragPosition === 0
                  , isAtBottom = verticalDragPosition == dragMaxY
                  , percentScrolled = destY / dragMaxY
                  , destTop = -percentScrolled * (contentHeight - paneHeight);
                if (wasAtTop != isAtTop || wasAtBottom != isAtBottom) {
                    wasAtTop = isAtTop;
                    wasAtBottom = isAtBottom;
                    elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
                }
                updateVerticalArrows(isAtTop, isAtBottom);
                pane.css('top', destTop);
                elem.trigger('jsp-scroll-y', [-destTop, isAtTop, isAtBottom]).trigger('scroll');
            }
            function positionDragX(destX, animate) {
                if (!isScrollableH) {
                    return;
                }
                if (destX < 0) {
                    destX = 0;
                } else if (destX > dragMaxX) {
                    destX = dragMaxX;
                }
                if (animate === undefined) {
                    animate = settings.animateScroll;
                }
                if (animate) {
                    jsp.animate(horizontalDrag, 'left', destX, _positionDragX);
                } else {
                    horizontalDrag.css('left', destX);
                    _positionDragX(destX);
                }
            }
            function _positionDragX(destX) {
                if (destX === undefined) {
                    destX = horizontalDrag.position().left;
                }
                container.scrollTop(0);
                horizontalDragPosition = destX;
                var isAtLeft = horizontalDragPosition === 0
                  , isAtRight = horizontalDragPosition == dragMaxX
                  , percentScrolled = destX / dragMaxX
                  , destLeft = -percentScrolled * (contentWidth - paneWidth);
                if (wasAtLeft != isAtLeft || wasAtRight != isAtRight) {
                    wasAtLeft = isAtLeft;
                    wasAtRight = isAtRight;
                    elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
                }
                updateHorizontalArrows(isAtLeft, isAtRight);
                pane.css('left', destLeft);
                elem.trigger('jsp-scroll-x', [-destLeft, isAtLeft, isAtRight]).trigger('scroll');
            }
            function updateVerticalArrows(isAtTop, isAtBottom) {
                if (settings.showArrows) {
                    arrowUp[isAtTop ? 'addClass' : 'removeClass']('jspDisabled');
                    arrowDown[isAtBottom ? 'addClass' : 'removeClass']('jspDisabled');
                }
            }
            function updateHorizontalArrows(isAtLeft, isAtRight) {
                if (settings.showArrows) {
                    arrowLeft[isAtLeft ? 'addClass' : 'removeClass']('jspDisabled');
                    arrowRight[isAtRight ? 'addClass' : 'removeClass']('jspDisabled');
                }
            }
            function scrollToY(destY, animate) {
                var percentScrolled = destY / (contentHeight - paneHeight);
                positionDragY(percentScrolled * dragMaxY, animate);
            }
            function scrollToX(destX, animate) {
                var percentScrolled = destX / (contentWidth - paneWidth);
                positionDragX(percentScrolled * dragMaxX, animate);
            }
            function scrollToElement(ele, stickToTop, animate) {
                var e, eleHeight, eleWidth, eleTop = 0, eleLeft = 0, viewportTop, viewportLeft, maxVisibleEleTop, maxVisibleEleLeft, destY, destX;
                try {
                    e = $(ele);
                } catch (err) {
                    return;
                }
                eleHeight = e.outerHeight();
                eleWidth = e.outerWidth();
                container.scrollTop(0);
                container.scrollLeft(0);
                while (!e.is('.jspPane')) {
                    eleTop += e.position().top;
                    eleLeft += e.position().left;
                    e = e.offsetParent();
                    if (/^body|html$/i.test(e[0].nodeName)) {
                        return;
                    }
                }
                viewportTop = contentPositionY();
                maxVisibleEleTop = viewportTop + paneHeight;
                if (eleTop < viewportTop || stickToTop) {
                    destY = eleTop - settings.verticalGutter;
                } else if (eleTop + eleHeight > maxVisibleEleTop) {
                    destY = eleTop - paneHeight + eleHeight + settings.verticalGutter;
                }
                if (destY) {
                    scrollToY(destY, animate);
                }
                viewportLeft = contentPositionX();
                maxVisibleEleLeft = viewportLeft + paneWidth;
                if (eleLeft < viewportLeft || stickToTop) {
                    destX = eleLeft - settings.horizontalGutter;
                } else if (eleLeft + eleWidth > maxVisibleEleLeft) {
                    destX = eleLeft - paneWidth + eleWidth + settings.horizontalGutter;
                }
                if (destX) {
                    scrollToX(destX, animate);
                }
            }
            function contentPositionX() {
                return -pane.position().left;
            }
            function contentPositionY() {
                return -pane.position().top;
            }
            function isCloseToBottom() {
                var scrollableHeight = contentHeight - paneHeight;
                return (scrollableHeight > 20) && (scrollableHeight - contentPositionY() < 10);
            }
            function isCloseToRight() {
                var scrollableWidth = contentWidth - paneWidth;
                return (scrollableWidth > 20) && (scrollableWidth - contentPositionX() < 10);
            }
            function initMousewheel() {
                container.unbind(mwEvent).bind(mwEvent, function(event, delta, deltaX, deltaY) {
                    var dX = horizontalDragPosition
                      , dY = verticalDragPosition;
                    jsp.scrollBy(deltaX * settings.mouseWheelSpeed, -deltaY * settings.mouseWheelSpeed, false);
                    return dX == horizontalDragPosition && dY == verticalDragPosition;
                });
            }
            function removeMousewheel() {
                container.unbind(mwEvent);
            }
            function nil() {
                return false;
            }
            function initFocusHandler() {
                pane.find(':input,a').unbind('focus.jsp').bind('focus.jsp', function(e) {
                    scrollToElement(e.target, false);
                });
            }
            function removeFocusHandler() {
                pane.find(':input,a').unbind('focus.jsp');
            }
            function initKeyboardNav() {
                var keyDown, elementHasScrolled, validParents = [];
                isScrollableH && validParents.push(horizontalBar[0]);
                isScrollableV && validParents.push(verticalBar[0]);
                pane.focus(function() {
                    elem.focus();
                });
                elem.attr('tabindex', 0).unbind('keydown.jsp keypress.jsp').bind('keydown.jsp', function(e) {
                    if (e.target !== this && !(validParents.length && $(e.target).closest(validParents).length)) {
                        return;
                    }
                    var dX = horizontalDragPosition
                      , dY = verticalDragPosition;
                    switch (e.keyCode) {
                    case 40:
                    case 38:
                    case 34:
                    case 32:
                    case 33:
                    case 39:
                    case 37:
                        keyDown = e.keyCode;
                        keyDownHandler();
                        break;
                    case 35:
                        scrollToY(contentHeight - paneHeight);
                        keyDown = null ;
                        break;
                    case 36:
                        scrollToY(0);
                        keyDown = null ;
                        break;
                    }
                    elementHasScrolled = e.keyCode == keyDown && dX != horizontalDragPosition || dY != verticalDragPosition;
                    return !elementHasScrolled;
                }).bind('keypress.jsp', function(e) {
                    if (e.keyCode == keyDown) {
                        keyDownHandler();
                    }
                    return !elementHasScrolled;
                });
                if (settings.hideFocus) {
                    elem.css('outline', 'none');
                    if ('hideFocus'in container[0]) {
                        elem.attr('hideFocus', true);
                    }
                } else {
                    elem.css('outline', '');
                    if ('hideFocus'in container[0]) {
                        elem.attr('hideFocus', false);
                    }
                }
                function keyDownHandler() {
                    var dX = horizontalDragPosition
                      , dY = verticalDragPosition;
                    switch (keyDown) {
                    case 40:
                        jsp.scrollByY(settings.keyboardSpeed, false);
                        break;
                    case 38:
                        jsp.scrollByY(-settings.keyboardSpeed, false);
                        break;
                    case 34:
                    case 32:
                        jsp.scrollByY(paneHeight * settings.scrollPagePercent, false);
                        break;
                    case 33:
                        jsp.scrollByY(-paneHeight * settings.scrollPagePercent, false);
                        break;
                    case 39:
                        jsp.scrollByX(settings.keyboardSpeed, false);
                        break;
                    case 37:
                        jsp.scrollByX(-settings.keyboardSpeed, false);
                        break;
                    }
                    elementHasScrolled = dX != horizontalDragPosition || dY != verticalDragPosition;
                    return elementHasScrolled;
                }
            }
            function removeKeyboardNav() {
                elem.attr('tabindex', '-1').removeAttr('tabindex').unbind('keydown.jsp keypress.jsp');
            }
            function observeHash() {
                if (location.hash && location.hash.length > 1) {
                    var e, retryInt, hash = escape(location.hash.substr(1));
                    try {
                        e = $('#' + hash + ', a[name="' + hash + '"]');
                    } catch (err) {
                        return;
                    }
                    if (e.length && pane.find(hash)) {
                        if (container.scrollTop() === 0) {
                            retryInt = setInterval(function() {
                                if (container.scrollTop() > 0) {
                                    scrollToElement(e, true);
                                    $(document).scrollTop(container.position().top);
                                    clearInterval(retryInt);
                                }
                            }, 50);
                        } else {
                            scrollToElement(e, true);
                            $(document).scrollTop(container.position().top);
                        }
                    }
                }
            }
            function hijackInternalLinks() {
                if ($(document.body).data('jspHijack')) {
                    return;
                }
                $(document.body).data('jspHijack', true);
                $(document.body).delegate('a[href*=#]', 'click', function(event) {
                    var href = this.href.substr(0, this.href.indexOf('#')), locationHref = location.href, hash, element, container, jsp, scrollTop, elementTop;
                    if (location.href.indexOf('#') !== -1) {
                        locationHref = location.href.substr(0, location.href.indexOf('#'));
                    }
                    if (href !== locationHref) {
                        return;
                    }
                    hash = escape(this.href.substr(this.href.indexOf('#') + 1));
                    element;
                    try {
                        element = $('#' + hash + ', a[name="' + hash + '"]');
                    } catch (e) {
                        return;
                    }
                    if (!element.length) {
                        return;
                    }
                    container = element.closest('.jspScrollable');
                    jsp = container.data('jsp');
                    jsp.scrollToElement(element, true);
                    if (container[0].scrollIntoView) {
                        scrollTop = $(window).scrollTop();
                        elementTop = element.offset().top;
                        if (elementTop < scrollTop || elementTop > scrollTop + $(window).height()) {
                            container[0].scrollIntoView();
                        }
                    }
                    event.preventDefault();
                });
            }
            function initTouch() {
                var startX, startY, touchStartX, touchStartY, moved, moving = false;
                container.unbind('touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick MSPointerDown.jsp MSPointerMove.jsp MSPointerUp.jsp MSPointerCancel.jsp').bind('touchstart.jsp MSPointerDown.jsp', function(e) {
                    var touch;
                    if (e.originalEvent.touches) {
                        touch = e.originalEvent.touches[0];
                    } else {
                        touch = e.originalEvent;
                    }
                    startX = contentPositionX();
                    startY = contentPositionY();
                    touchStartX = touch.pageX;
                    touchStartY = touch.pageY;
                    moved = false;
                    moving = true;
                }).bind('touchmove.jsp MSPointerMove.jsp', function(ev) {
                    if (!moving) {
                        return;
                    }
                    var touchPos, dX = horizontalDragPosition, dY = verticalDragPosition;
                    if (ev.originalEvent.touches) {
                        touchPos = ev.originalEvent.touches[0];
                    } else {
                        touchPos = ev.originalEvent;
                    }
                    jsp.scrollTo(startX + touchStartX - touchPos.pageX, startY + touchStartY - touchPos.pageY);
                    moved = moved || Math.abs(touchStartX - touchPos.pageX) > 5 || Math.abs(touchStartY - touchPos.pageY) > 5;
                    return dX == horizontalDragPosition && dY == verticalDragPosition;
                }).bind('touchend.jsp MSPointerUp.jsp MSPointerCancel.jsp', function(e) {
                    moving = false;
                }).bind('click.jsp-touchclick', function(e) {
                    if (moved) {
                        moved = false;
                        return false;
                    }
                });
            }
            function destroy() {
                var currentY = contentPositionY()
                  , currentX = contentPositionX();
                elem.removeClass('jspScrollable').unbind('.jsp');
                elem.replaceWith(originalElement.append(pane.children()));
                originalElement.scrollTop(currentY);
                originalElement.scrollLeft(currentX);
                if (reinitialiseInterval) {
                    clearInterval(reinitialiseInterval);
                }
            }
            function moveScroll() {
                $('.jspHorizontalBar').appendTo('#sagafooter');
            }
            $.extend(jsp, {
                reinitialise: function(s) {
                    s = $.extend({}, settings, s);
                    initialise(s);
                },
                scrollToElement: function(ele, stickToTop, animate) {
                    scrollToElement(ele, stickToTop, animate);
                },
                scrollTo: function(destX, destY, animate) {
                    scrollToX(destX, animate);
                    scrollToY(destY, animate);
                },
                scrollToX: function(destX, animate) {
                    scrollToX(destX, animate);
                },
                scrollToY: function(destY, animate) {
                    scrollToY(destY, animate);
                },
                scrollToPercentX: function(destPercentX, animate) {
                    scrollToX(destPercentX * (contentWidth - paneWidth), animate);
                },
                scrollToPercentY: function(destPercentY, animate) {
                    scrollToY(destPercentY * (contentHeight - paneHeight), animate);
                },
                scrollBy: function(deltaX, deltaY, animate) {
                    jsp.scrollByX(deltaX, animate);
                    jsp.scrollByY(deltaY, animate);
                },
                scrollByX: function(deltaX, animate) {
                    var destX = contentPositionX() + Math[deltaX < 0 ? 'floor' : 'ceil'](deltaX)
                      , percentScrolled = destX / (contentWidth - paneWidth);
                    positionDragX(percentScrolled * dragMaxX, animate);
                },
                scrollByY: function(deltaY, animate) {
                    var destY = contentPositionY() + Math[deltaY < 0 ? 'floor' : 'ceil'](deltaY)
                      , percentScrolled = destY / (contentHeight - paneHeight);
                    positionDragY(percentScrolled * dragMaxY, animate);
                },
                positionDragX: function(x, animate) {
                    positionDragX(x, animate);
                },
                positionDragY: function(y, animate) {
                    positionDragY(y, animate);
                },
                animate: function(ele, prop, value, stepCallback) {
                    var params = {};
                    params[prop] = value;
                    ele.animate(params, {
                        'duration': settings.animateDuration,
                        'easing': settings.animateEase,
                        'queue': false,
                        'step': stepCallback
                    });
                },
                getContentPositionX: function() {
                    return contentPositionX();
                },
                getContentPositionY: function() {
                    return contentPositionY();
                },
                getContentWidth: function() {
                    return contentWidth;
                },
                getContentHeight: function() {
                    return contentHeight;
                },
                getPercentScrolledX: function() {
                    return contentPositionX() / (contentWidth - paneWidth);
                },
                getPercentScrolledY: function() {
                    return contentPositionY() / (contentHeight - paneHeight);
                },
                getIsScrollableH: function() {
                    return isScrollableH;
                },
                getIsScrollableV: function() {
                    return isScrollableV;
                },
                getContentPane: function() {
                    return pane;
                },
                scrollToBottom: function(animate) {
                    positionDragY(dragMaxY, animate);
                },
                hijackInternalLinks: $.noop,
                destroy: function() {
                    destroy();
                }
            });
            initialise(s);
        }
        settings = $.extend({}, $.fn.jScrollPane.defaults, settings);
        $.each(['mouseWheelSpeed', 'arrowButtonSpeed', 'trackClickSpeed', 'keyboardSpeed'], function() {
            settings[this] = settings[this] || settings.speed;
        });
        return this.each(function() {
            var elem = $(this)
              , jspApi = elem.data('jsp');
            if (jspApi) {
                jspApi.reinitialise(settings);
            } else {
                $("script", elem).filter('[type="text/javascript"],:not([type])').remove();
                jspApi = new JScrollPane(elem,settings);
                elem.data('jsp', jspApi);
            }
        });
    }
    ;
    $.fn.jScrollPane.defaults = {
        showArrows: false,
        maintainPosition: true,
        stickToBottom: false,
        stickToRight: false,
        clickOnTrack: true,
        autoReinitialise: false,
        autoReinitialiseDelay: 500,
        verticalDragMinHeight: 0,
        verticalDragMaxHeight: 99999,
        horizontalDragMinWidth: 0,
        horizontalDragMaxWidth: 99999,
        contentWidth: undefined,
        animateScroll: false,
        animateDuration: 300,
        animateEase: 'linear',
        hijackInternalLinks: false,
        verticalGutter: 4,
        horizontalGutter: 4,
        mouseWheelSpeed: 0,
        arrowButtonSpeed: 0,
        arrowRepeatFreq: 50,
        arrowScrollOnHover: false,
        trackClickSpeed: 0,
        trackClickRepeatFreq: 70,
        verticalArrowPositions: 'split',
        horizontalArrowPositions: 'split',
        enableKeyboardNavigation: true,
        hideFocus: false,
        keyboardSpeed: 0,
        initialDelay: 300,
        speed: 30,
        scrollPagePercent: .8
    };
})(jQuery, this);
function randomNum() {
    return Math.ceil(Math.random() * 100000000000000000);
}
function tmzThumbnailEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof (height) === "undefined" ? 394 : parseInt(height);
    var customWidth = typeof (width) === "undefined" ? 700 : parseInt(width);
    var template = "<div class=" + playerName + " style=\"height: " + customHeight + "px; width: " + customWidth + "px;position:relative;clear:both;\"></div>\n" + "  <script>\n" + "  $(function(callback) {\n" + "    " + playerName + " = new TmzKalturaPlayerView({\n" + "      \"where\": \"." + playerName + "\",\n" + "      \"cacheSt\": 9999999999,\n" + "      \"height\": " + customHeight + ",\n" + "      \"width\": " + customWidth + ",\n" + "      \"site\": \"tmz\",\n" + "      \"endcard\": true,\n" + "      \"autoplay\": false,\n" + "      \"autoContinue\": false,\n" + "      \"thumbnail\": true,\n" + "      \"showPlaylist\": false,\n" + "      \"playerOptions\": {\n" + "        \"entryId\": \"" + entryId + "\"\n" + "      }\n" + "    });\n" + "    callback(" + playerName + ");\n" + "  }(function(player){\n" + "    player.draw();\n" + "  }));\n" + "</script>\n";
    console.log("performing document.write");
    document.write(template);
}
function tmzVideoEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof (height) === "undefined" ? 394 : parseInt(height);
    var customWidth = typeof (width) === "undefined" ? 700 : parseInt(width);
    var template = "<div class=" + playerName + " style=\"height: " + customHeight + "px; width: " + customWidth + "px;position:relative;clear:both;\"></div>\n" + "  <script>\n" + "  $(function(callback) {\n" + "    " + playerName + " = new TmzKalturaPlayerView({\n" + "      \"where\": \"." + playerName + "\",\n" + "      \"height\": " + customHeight + ",\n" + "      \"width\": " + customWidth + ",\n" + "      \"cacheSt\": 9999999999,\n" + "      \"site\": \"tmz\",\n" + "      \"endcard\": true,\n" + "      \"autoplay\": false,\n" + "      \"autoContinue\": false,\n" + "      \"thumbnail\": true,\n" + "      \"showPlaylist\": false,\n" + "      \"playerOptions\": {\n" + "        \"entryId\": \"" + entryId + "\"\n" + "      }\n" + "    });\n" + "    callback(" + playerName + ");\n" + "  }(function(player){\n" + "    player.draw();\n" + "  }));\n" + "</script>\n";
    console.log("performing document.write");
    document.write(template);
}
function tmzVideoEmbedV2(options) {
    var playerOptions = JSON.parse(options);
    var playerName = 'player' + randomNum();
    var customHeight = typeof playerOptions.height === 'undefined' ? 394 : parseInt(playerOptions.height);
    var customWidth = typeof playerOptions.width === 'undefined' ? 700 : parseInt(playerOptions.width);
    var endcard = typeof playerOptions.endcard === 'undefined' ? true : (playerOptions.endcard.toLowerCase() === 'true');
    var launchQuote = typeof playerOptions.launch_quote === 'undefined' || playerOptions.launch_quote === null ? '' : decodeURIComponent(playerOptions.launch_quote);
    var videoCredit = typeof playerOptions.video_credit === 'undefined' || playerOptions.video_credit === null ? '' : decodeURIComponent(playerOptions.video_credit);
    var launchQuoteHtml = '<div class=\"launch-quote\"><span class=\"launch-quote-text\">' + launchQuote + '</span>\n' + '<span class=\"video-credit-text\">' + videoCredit + '</span></div>\n';
    var launchQuoteTemplate = launchQuote === '' ? '' : launchQuoteHtml;
    var template = "<div class=" + playerName + " data-video-type=\"kaltura\" style=\"height: " + customHeight + "px; width: " + customWidth + "px;position:relative;clear:both;\">" + launchQuoteTemplate + "</div>\n" + "  <script>\n" + "  $(function(callback) {\n" + "    " + playerName + " = new TmzKalturaPlayerView({\n" + "      \"where\": \"." + playerName + "\",\n" + "      \"height\": " + customHeight + ",\n" + "      \"width\": " + customWidth + ",\n" + "      \"cacheSt\": 9999999999,\n" + "      \"site\": \"tmz\",\n" + "      \"endcard\": " + endcard + ",\n" + "      \"autoplay\": false,\n" + "      \"autoContinue\": false,\n" + "      \"thumbnail\": true,\n" + "      \"showPlaylist\": false,\n" + "      \"playerOptions\": {\n" + "           \"entryId\": \"" + playerOptions.id.replace('-', '_') + "\"\n" + "      }\n" + "    });\n" + "    callback(" + playerName + ");\n" + "  }(function(player){\n" + "    player.draw();\n" + "  }));\n" + "</script>\n";
    document.write(template);
}
function toofabThumbnailEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof (height) === "undefined" ? 421 : parseInt(height);
    var customWidth = typeof (width) === "undefined" ? 664 : parseInt(width);
    var template = "<div class=" + playerName + " style=\"height: " + customHeight + "px; width: " + customWidth + "px;\"></div>\n" + "  <script>\n" + "  $(function(callback) {\n" + "    " + playerName + " = new TmzKalturaPlayerView({\n" + "      \"where\": \"." + playerName + "\",\n" + "      \"cacheSt\": 9999999999,\n" + "      \"height\": " + customHeight + ",\n" + "      \"width\": " + customWidth + ",\n" + "      \"site\": \"toofab\",\n" + "      \"endcard\": true,\n" + "      \"autoplay\": false,\n" + "      \"autoContinue\": false,\n" + "      \"thumbnail\": true,\n" + "      \"showPlaylist\": false,\n" + "      \"playerOptions\": {\n" + "        \"entryId\": \"" + entryId + "\"\n" + "      }\n" + "    });\n" + "    callback(" + playerName + ");\n" + "  }(function(player){\n" + "    player.draw();\n" + "  }));\n" + "</script>\n";
    console.log("performing document.write");
    document.write(template);
}
function toofabVideoEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof (height) === "undefined" ? 421 : parseInt(height);
    var customWidth = typeof (width) === "undefined" ? 664 : parseInt(width);
    var template = "<div class=" + playerName + " style=\"height: " + customHeight + "px; width: " + customWidth + "px;\"></div>\n" + "  <script>\n" + "  $(function(callback) {\n" + "    " + playerName + " = new TmzKalturaPlayerView({\n" + "      \"where\": \"." + playerName + "\",\n" + "      \"height\": " + customHeight + ",\n" + "      \"width\": " + customWidth + ",\n" + "      \"cacheSt\": 9999999999,\n" + "      \"site\": \"toofab\",\n" + "      \"endcard\": false,\n" + "      \"autoplay\": false,\n" + "      \"autoContinue\": false,\n" + "      \"showPlaylist\": false,\n" + "      \"playerOptions\": {\n" + "        \"entryId\": \"" + entryId + "\"\n" + "      }\n" + "    });\n" + "    callback(" + playerName + ");\n" + "  }(function(player){\n" + "    player.draw();\n" + "  }));\n" + "</script>\n";
    console.log("performing document.write");
    document.write(template);
}
function fishwrapperThumbnailEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof (height) === "undefined" ? 421 : parseInt(height);
    var customWidth = typeof (width) === "undefined" ? 664 : parseInt(width);
    var template = "<div class=" + playerName + " style=\"height: " + customHeight + "px; width: " + customWidth + "px;\"></div>\n" + "  <script>\n" + "  $(function(callback) {\n" + "    " + playerName + " = new TmzKalturaPlayerView({\n" + "      \"where\": \"." + playerName + "\",\n" + "      \"cacheSt\": 9999999999,\n" + "      \"height\": " + customHeight + ",\n" + "      \"width\": " + customWidth + ",\n" + "      \"site\": \"fishwrapper\",\n" + "      \"endcard\": true,\n" + "      \"autoplay\": false,\n" + "      \"autoContinue\": false,\n" + "      \"thumbnail\": true,\n" + "      \"showPlaylist\": false,\n" + "      \"playerOptions\": {\n" + "        \"entryId\": \"" + entryId + "\"\n" + "      }\n" + "    });\n" + "    callback(" + playerName + ");\n" + "  }(function(player){\n" + "    player.draw();\n" + "  }));\n" + "</script>\n";
    console.log("performing document.write");
    document.write(template);
}
function fishwrapperVideoEmbed(entryId, width, height) {
    var playerName = "player" + randomNum();
    var customHeight = typeof (height) === "undefined" ? 421 : parseInt(height);
    var customWidth = typeof (width) === "undefined" ? 664 : parseInt(width);
    var template = "<div class=" + playerName + " style=\"height: " + customHeight + "px; width: " + customWidth + "px;\"></div>\n" + "  <script>\n" + "  $(function(callback) {\n" + "    " + playerName + " = new TmzKalturaPlayerView({\n" + "      \"where\": \"." + playerName + "\",\n" + "      \"height\": " + customHeight + ",\n" + "      \"width\": " + customWidth + ",\n" + "      \"cacheSt\": 9999999999,\n" + "      \"site\": \"fishwrapper\",\n" + "      \"endcard\": true,\n" + "      \"autoplay\": false,\n" + "      \"autoContinue\": false,\n" + "      \"showPlaylist\": false,\n" + "      \"playerOptions\": {\n" + "        \"entryId\": \"" + entryId + "\"\n" + "      }\n" + "    });\n" + "    callback(" + playerName + ");\n" + "  }(function(player){\n" + "    player.draw();\n" + "  }));\n" + "</script>\n";
    console.log("performing document.write");
    document.write(template);
}
