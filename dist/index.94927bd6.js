(function () {
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire23b3"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire23b3"] = parcelRequire;
}
parcelRequire.register("hlNj3", function(module, exports) {
/**
 * EvEmitter v2.1.1
 * Lil' event emitter
 * MIT License
 */ (function(global, factory) {
    // universal module definition
    if (module.exports) // CommonJS - Browserify, Webpack
    module.exports = factory();
    else // Browser globals
    global.EvEmitter = factory();
})(typeof window != "undefined" ? window : module.exports, function() {
    function EvEmitter() {}
    let proto = EvEmitter.prototype;
    proto.on = function(eventName, listener) {
        if (!eventName || !listener) return this;
        // set events hash
        let events = this._events = this._events || {};
        // set listeners array
        let listeners = events[eventName] = events[eventName] || [];
        // only add once
        if (!listeners.includes(listener)) listeners.push(listener);
        return this;
    };
    proto.once = function(eventName, listener) {
        if (!eventName || !listener) return this;
        // add event
        this.on(eventName, listener);
        // set once flag
        // set onceEvents hash
        let onceEvents = this._onceEvents = this._onceEvents || {};
        // set onceListeners object
        let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        // set flag
        onceListeners[listener] = true;
        return this;
    };
    proto.off = function(eventName, listener) {
        let listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return this;
        let index = listeners.indexOf(listener);
        if (index != -1) listeners.splice(index, 1);
        return this;
    };
    proto.emitEvent = function(eventName, args) {
        let listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return this;
        // copy over to avoid interference if .off() in listener
        listeners = listeners.slice(0);
        args = args || [];
        // once stuff
        let onceListeners = this._onceEvents && this._onceEvents[eventName];
        for (let listener of listeners){
            let isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
            }
            // trigger listener
            listener.apply(this, args);
        }
        return this;
    };
    proto.allOff = function() {
        delete this._events;
        delete this._onceEvents;
        return this;
    };
    return EvEmitter;
});

});

var $9d1b094234a0f16e$exports = {};

/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */ (function(window1, factory) {
    // universal module definition
    if ($9d1b094234a0f16e$exports) // CommonJS
    $9d1b094234a0f16e$exports = factory(window1, (parcelRequire("hlNj3")));
    else // browser global
    window1.imagesLoaded = factory(window1, window1.EvEmitter);
})(typeof window !== "undefined" ? window : $9d1b094234a0f16e$exports, function factory(window1, EvEmitter) {
    let $ = window1.jQuery;
    let console = window1.console;
    // -------------------------- helpers -------------------------- //
    // turn element or nodeList into an array
    function makeArray(obj) {
        // use object if already an array
        if (Array.isArray(obj)) return obj;
        let isArrayLike = typeof obj == "object" && typeof obj.length == "number";
        // convert nodeList to array
        if (isArrayLike) return [
            ...obj
        ];
        // array of single index
        return [
            obj
        ];
    }
    // -------------------------- imagesLoaded -------------------------- //
    /**
 * @param {[Array, Element, NodeList, String]} elem
 * @param {[Object, Function]} options - if function, use as callback
 * @param {Function} onAlways - callback function
 * @returns {ImagesLoaded}
 */ function ImagesLoaded(elem, options, onAlways) {
        // coerce ImagesLoaded() without new, to be new ImagesLoaded()
        if (!(this instanceof ImagesLoaded)) return new ImagesLoaded(elem, options, onAlways);
        // use elem as selector string
        let queryElem = elem;
        if (typeof elem == "string") queryElem = document.querySelectorAll(elem);
        // bail if bad element
        if (!queryElem) {
            console.error(`Bad element for imagesLoaded ${queryElem || elem}`);
            return;
        }
        this.elements = makeArray(queryElem);
        this.options = {};
        // shift arguments if no options set
        if (typeof options == "function") onAlways = options;
        else Object.assign(this.options, options);
        if (onAlways) this.on("always", onAlways);
        this.getImages();
        // add jQuery Deferred object
        if ($) this.jqDeferred = new $.Deferred();
        // HACK check async to allow time to bind listeners
        setTimeout(this.check.bind(this));
    }
    ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
    ImagesLoaded.prototype.getImages = function() {
        this.images = [];
        // filter & find items if we have an item selector
        this.elements.forEach(this.addElementImages, this);
    };
    const elementNodeTypes = [
        1,
        9,
        11
    ];
    /**
 * @param {Node} elem
 */ ImagesLoaded.prototype.addElementImages = function(elem) {
        // filter siblings
        if (elem.nodeName === "IMG") this.addImage(elem);
        // get background image on element
        if (this.options.background === true) this.addElementBackgroundImages(elem);
        // find children
        // no non-element nodes, #143
        let { nodeType: nodeType  } = elem;
        if (!nodeType || !elementNodeTypes.includes(nodeType)) return;
        let childImgs = elem.querySelectorAll("img");
        // concat childElems to filterFound array
        for (let img of childImgs)this.addImage(img);
        // get child background images
        if (typeof this.options.background == "string") {
            let children = elem.querySelectorAll(this.options.background);
            for (let child of children)this.addElementBackgroundImages(child);
        }
    };
    const reURL = /url\((['"])?(.*?)\1\)/gi;
    ImagesLoaded.prototype.addElementBackgroundImages = function(elem) {
        let style = getComputedStyle(elem);
        // Firefox returns null if in a hidden iframe https://bugzil.la/548397
        if (!style) return;
        // get url inside url("...")
        let matches = reURL.exec(style.backgroundImage);
        while(matches !== null){
            let url = matches && matches[2];
            if (url) this.addBackground(url, elem);
            matches = reURL.exec(style.backgroundImage);
        }
    };
    /**
 * @param {Image} img
 */ ImagesLoaded.prototype.addImage = function(img) {
        let loadingImage = new LoadingImage(img);
        this.images.push(loadingImage);
    };
    ImagesLoaded.prototype.addBackground = function(url, elem) {
        let background = new Background(url, elem);
        this.images.push(background);
    };
    ImagesLoaded.prototype.check = function() {
        this.progressedCount = 0;
        this.hasAnyBroken = false;
        // complete if no images
        if (!this.images.length) {
            this.complete();
            return;
        }
        /* eslint-disable-next-line func-style */ let onProgress = (image, elem, message)=>{
            // HACK - Chrome triggers event before object properties have changed. #83
            setTimeout(()=>{
                this.progress(image, elem, message);
            });
        };
        this.images.forEach(function(loadingImage) {
            loadingImage.once("progress", onProgress);
            loadingImage.check();
        });
    };
    ImagesLoaded.prototype.progress = function(image, elem, message) {
        this.progressedCount++;
        this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
        // progress event
        this.emitEvent("progress", [
            this,
            image,
            elem
        ]);
        if (this.jqDeferred && this.jqDeferred.notify) this.jqDeferred.notify(this, image);
        // check if completed
        if (this.progressedCount === this.images.length) this.complete();
        if (this.options.debug && console) console.log(`progress: ${message}`, image, elem);
    };
    ImagesLoaded.prototype.complete = function() {
        let eventName = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = true;
        this.emitEvent(eventName, [
            this
        ]);
        this.emitEvent("always", [
            this
        ]);
        if (this.jqDeferred) {
            let jqMethod = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[jqMethod](this);
        }
    };
    // --------------------------  -------------------------- //
    function LoadingImage(img) {
        this.img = img;
    }
    LoadingImage.prototype = Object.create(EvEmitter.prototype);
    LoadingImage.prototype.check = function() {
        // If complete is true and browser supports natural sizes,
        // try to check for image status manually.
        let isComplete = this.getIsImageComplete();
        if (isComplete) {
            // report based on naturalWidth
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            return;
        }
        // If none of the checks above matched, simulate loading on detached element.
        this.proxyImage = new Image();
        // add crossOrigin attribute. #204
        if (this.img.crossOrigin) this.proxyImage.crossOrigin = this.img.crossOrigin;
        this.proxyImage.addEventListener("load", this);
        this.proxyImage.addEventListener("error", this);
        // bind to image as well for Firefox. #191
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.proxyImage.src = this.img.currentSrc || this.img.src;
    };
    LoadingImage.prototype.getIsImageComplete = function() {
        // check for non-zero, non-undefined naturalWidth
        // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
        return this.img.complete && this.img.naturalWidth;
    };
    LoadingImage.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded;
        let { parentNode: parentNode  } = this.img;
        // emit progress with parent <picture> or self <img>
        let elem = parentNode.nodeName === "PICTURE" ? parentNode : this.img;
        this.emitEvent("progress", [
            this,
            elem,
            message
        ]);
    };
    // ----- events ----- //
    // trigger specified handler for event type
    LoadingImage.prototype.handleEvent = function(event) {
        let method = "on" + event.type;
        if (this[method]) this[method](event);
    };
    LoadingImage.prototype.onload = function() {
        this.confirm(true, "onload");
        this.unbindEvents();
    };
    LoadingImage.prototype.onerror = function() {
        this.confirm(false, "onerror");
        this.unbindEvents();
    };
    LoadingImage.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this);
        this.proxyImage.removeEventListener("error", this);
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
    };
    // -------------------------- Background -------------------------- //
    function Background(url, element) {
        this.url = url;
        this.element = element;
        this.img = new Image();
    }
    // inherit LoadingImage prototype
    Background.prototype = Object.create(LoadingImage.prototype);
    Background.prototype.check = function() {
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.img.src = this.url;
        // check if image is already complete
        let isComplete = this.getIsImageComplete();
        if (isComplete) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            this.unbindEvents();
        }
    };
    Background.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
    };
    Background.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded;
        this.emitEvent("progress", [
            this,
            this.element,
            message
        ]);
    };
    // -------------------------- jQuery -------------------------- //
    ImagesLoaded.makeJQueryPlugin = function(jQuery) {
        jQuery = jQuery || window1.jQuery;
        if (!jQuery) return;
        // set local variable
        $ = jQuery;
        // $().imagesLoaded()
        $.fn.imagesLoaded = function(options, onAlways) {
            let instance = new ImagesLoaded(this, options, onAlways);
            return instance.jqDeferred.promise($(this));
        };
    };
    // try making plugin
    ImagesLoaded.makeJQueryPlugin();
    // --------------------------  -------------------------- //
    return ImagesLoaded;
});


/**
 * Preload images
 * @param {String} selector - Selector/scope from where images need to be preloaded. Default is 'img'
 */ const $3d2a545671ed6536$export$6b05b21262ec0515 = (selector = "img")=>{
    return new Promise((resolve)=>{
        $9d1b094234a0f16e$exports(document.querySelectorAll(selector), {
            background: true
        }, resolve);
    });
};
/**
 * Wraps the elements of an array.
 * @param {Array} arr - the array of elements to be wrapped
 * @param {String} wrapType - the type of the wrap element ('div', 'span' etc)
 * @param {String} wrapClass - the wrap class(es)
 */ const $3d2a545671ed6536$export$fec9ba7939aa9b65 = (arr, wrapType, wrapClass)=>{
    arr.forEach((el)=>{
        const wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        el.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(el);
    });
};


function $b9bdf98af2c3ca41$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}


/**
 * Class representing a Trail element, 
 * an element that has [trailElems] children/clones (of type image or text) 
 * and that we can use to stagger it's translation so it looks like a trail or dragging effect 
 */ class $2df3ca2e50417c51$var$Trail {
    /**
	 * Constructor.
	 * @param {Element} DOM_el - the .trail element
	 */ constructor(DOM_el, options){
        // DOM elements
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "DOM", {
            // Main element (.trail)
            el: null,
            // Trail child elements (.trail__img or .trail__text)
            trailElems: null
        });
        // option defaults
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "defaults", {
            // 3d
            perspective: false,
            // Total number of inner image elements
            totalTrailElements: 4
        });
        this.DOM.el = DOM_el;
        this.options = Object.assign(this.defaults, options);
        // 3d
        if (this.options.perspective) this.DOM.el.style.perspective = `${this.options.perspective}px`;
    }
}
class $2df3ca2e50417c51$export$c3ddc7f2aba2c1ae extends $2df3ca2e50417c51$var$Trail {
    /**
	 * Creates the HTML markup for the trail elements
	 */ layout() {
        // Remove the background image from the main element
        this.DOM.el.style.backgroundImage = "none";
        let innerHTML = "";
        for(let i = 0; i <= this.options.totalTrailElements - 1; ++i){
            const opacityVal = i === this.options.totalTrailElements - 1 ? 1 : 0.8; //1/this.options.totalTrailElements * i + 1/this.options.totalTrailElements
            innerHTML += `<img class="trail__img" src="${this.bgImage}" style="opacity: ${opacityVal}"/>`;
        }
        // Append to the main element
        this.DOM.el.innerHTML = innerHTML;
        // Get inner .trail__img elements
        this.DOM.trailElems = this.DOM.el.querySelectorAll(".trail__img");
        this.DOM.el.classList.add("trail");
    }
    reset() {
        this.DOM.el.classList.remove("trail");
        this.DOM.el.style.backgroundImage = `url(${this.bgImage})`;
        this.DOM.el.innerHTML = "";
        if (this.options.perspective) this.DOM.el.style.perspective = "none";
    }
    /**
	 * Constructor.
	 * @param {Element} DOM_el - the .trail element
	 */ constructor(DOM_el, options){
        super(DOM_el, options);
        // the image path
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "bgImage", void 0);
        // Get the main element's background image url 
        this.bgImage = /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(this.DOM.el.style.backgroundImage)[1];
        // Create the HTML markup for the trail elements
        this.layout();
    }
}
class $2df3ca2e50417c51$export$c42441291b8467f9 extends $2df3ca2e50417c51$var$Trail {
    /**
	 * Creates the HTML markup for the trail elements
	 */ layout() {
        // Get the main element's innerHTML
        this.content = this.DOM.el.innerHTML;
        let innerHTML = "";
        for(let i = 0; i <= this.options.totalTrailElements - 1; ++i){
            const opacityVal = i === this.options.totalTrailElements - 1 ? 1 : 1 / this.options.totalTrailElements * i + 1 / this.options.totalTrailElements;
            innerHTML += `<span class="trail__text" style="opacity: ${opacityVal}">${this.content}</span>`;
        }
        // Append to the main element
        this.DOM.el.innerHTML = innerHTML;
        // Get inner .trail__text elements
        this.DOM.trailElems = this.DOM.el.querySelectorAll(".trail__text");
        this.DOM.el.classList.add("trail");
    }
    reset() {
        this.DOM.el.classList.remove("trail");
        this.DOM.el.innerHTML = this.content;
        if (this.options.perspective) this.DOM.el.style.perspective = "none";
    }
    /**
	 * Constructor.
	 * @param {Element} DOM_el - the .trail element
	 */ constructor(DOM_el, options){
        super(DOM_el, options);
        // Create the HTML markup for the trail elements
        this.layout();
    }
}



function $d1cc397620177a52$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $d1cc397620177a52$var$_inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
/*!
 * GSAP 3.11.2
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/ /* eslint-disable */ var $d1cc397620177a52$export$4922bee768729a77 = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
        lineHeight: ""
    }
}, $d1cc397620177a52$var$_defaults = {
    duration: .5,
    overwrite: false,
    delay: 0
}, $d1cc397620177a52$var$_suppressOverwrites, $d1cc397620177a52$var$_reverting, $d1cc397620177a52$var$_context, $d1cc397620177a52$var$_bigNum = 1e8, $d1cc397620177a52$var$_tinyNum = 1 / $d1cc397620177a52$var$_bigNum, $d1cc397620177a52$var$_2PI = Math.PI * 2, $d1cc397620177a52$var$_HALF_PI = $d1cc397620177a52$var$_2PI / 4, $d1cc397620177a52$var$_gsID = 0, $d1cc397620177a52$var$_sqrt = Math.sqrt, $d1cc397620177a52$var$_cos = Math.cos, $d1cc397620177a52$var$_sin = Math.sin, $d1cc397620177a52$export$f664476fd67145ca = function _isString(value) {
    return typeof value === "string";
}, $d1cc397620177a52$var$_isFunction = function _isFunction(value) {
    return typeof value === "function";
}, $d1cc397620177a52$var$_isNumber = function _isNumber(value) {
    return typeof value === "number";
}, $d1cc397620177a52$export$a8178c063a9fd3a1 = function _isUndefined(value) {
    return typeof value === "undefined";
}, $d1cc397620177a52$var$_isObject = function _isObject(value) {
    return typeof value === "object";
}, $d1cc397620177a52$var$_isNotFalse = function _isNotFalse(value) {
    return value !== false;
}, $d1cc397620177a52$var$_windowExists = function _windowExists() {
    return typeof window !== "undefined";
}, $d1cc397620177a52$var$_isFuncOrString = function _isFuncOrString(value) {
    return $d1cc397620177a52$var$_isFunction(value) || $d1cc397620177a52$export$f664476fd67145ca(value);
}, $d1cc397620177a52$var$_isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {}, // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
$d1cc397620177a52$var$_isArray = Array.isArray, $d1cc397620177a52$var$_strictNumExp = /(?:-?\.?\d|\.)+/gi, //only numbers (including negatives and decimals) but NOT relative values.
$d1cc397620177a52$export$b9d44bb6523120d6 = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
$d1cc397620177a52$export$65c88bbd597e7b0a = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, $d1cc397620177a52$var$_complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
$d1cc397620177a52$export$5a680e28b0b61bc = /[+-]=-?[.\d]+/, $d1cc397620177a52$var$_delimitedValueExp = /[^,'"\[\]\s]+/gi, // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
$d1cc397620177a52$var$_unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, $d1cc397620177a52$var$_globalTimeline, $d1cc397620177a52$var$_win, $d1cc397620177a52$var$_coreInitted, $d1cc397620177a52$var$_doc, $d1cc397620177a52$var$_globals = {}, $d1cc397620177a52$var$_installScope = {}, $d1cc397620177a52$var$_coreReady, $d1cc397620177a52$var$_install = function _install(scope) {
    return ($d1cc397620177a52$var$_installScope = $d1cc397620177a52$var$_merge(scope, $d1cc397620177a52$var$_globals)) && $d1cc397620177a52$export$99ee26438460406a;
}, $d1cc397620177a52$export$7fb54635790b59a5 = function _missingPlugin(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
}, $d1cc397620177a52$var$_warn = function _warn(message, suppress) {
    return !suppress && console.warn(message);
}, $d1cc397620177a52$var$_addGlobal = function _addGlobal(name, obj) {
    return name && ($d1cc397620177a52$var$_globals[name] = obj) && $d1cc397620177a52$var$_installScope && ($d1cc397620177a52$var$_installScope[name] = obj) || $d1cc397620177a52$var$_globals;
}, $d1cc397620177a52$var$_emptyFunc = function _emptyFunc() {
    return 0;
}, $d1cc397620177a52$var$_startAtRevertConfig = {
    suppressEvents: true,
    isStart: true,
    kill: false
}, $d1cc397620177a52$var$_revertConfigNoKill = {
    suppressEvents: true,
    kill: false
}, $d1cc397620177a52$var$_revertConfig = {
    suppressEvents: true
}, $d1cc397620177a52$var$_reservedProps = {}, $d1cc397620177a52$var$_lazyTweens = [], $d1cc397620177a52$var$_lazyLookup = {}, $d1cc397620177a52$var$_lastRenderedFrame, $d1cc397620177a52$export$d305d8ec5d7c26b8 = {}, $d1cc397620177a52$var$_effects = {}, $d1cc397620177a52$var$_nextGCFrame = 30, $d1cc397620177a52$var$_harnessPlugins = [], $d1cc397620177a52$var$_callbackNames = "", $d1cc397620177a52$var$_harness = function _harness(targets) {
    var target = targets[0], harnessPlugin, i;
    $d1cc397620177a52$var$_isObject(target) || $d1cc397620177a52$var$_isFunction(target) || (targets = [
        targets
    ]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
        // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
        i = $d1cc397620177a52$var$_harnessPlugins.length;
        while((i--) && !$d1cc397620177a52$var$_harnessPlugins[i].targetTest(target));
        harnessPlugin = $d1cc397620177a52$var$_harnessPlugins[i];
    }
    i = targets.length;
    while(i--)targets[i] && (targets[i]._gsap || (targets[i]._gsap = new $d1cc397620177a52$export$cf10981d5419cad5(targets[i], harnessPlugin))) || targets.splice(i, 1);
    return targets;
}, $d1cc397620177a52$export$8b9be379d2de2a39 = function _getCache(target) {
    return target._gsap || $d1cc397620177a52$var$_harness($d1cc397620177a52$export$45b10814cc054894(target))[0]._gsap;
}, $d1cc397620177a52$export$51d6bbe898aef1f9 = function _getProperty(target, property, v) {
    return (v = target[property]) && $d1cc397620177a52$var$_isFunction(v) ? target[property]() : $d1cc397620177a52$export$a8178c063a9fd3a1(v) && target.getAttribute && target.getAttribute(property) || v;
}, $d1cc397620177a52$export$f9000b814859f126 = function _forEachName(names, func) {
    return (names = names.split(",")).forEach(func) || names;
}, //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
$d1cc397620177a52$export$9c8d725d65e13f94 = function _round(value) {
    return Math.round(value * 100000) / 100000 || 0;
}, $d1cc397620177a52$var$_roundPrecise = function _roundPrecise(value) {
    return Math.round(value * 10000000) / 10000000 || 0;
}, // increased precision mostly for timing values.
$d1cc397620177a52$export$dac762bc6301b560 = function _parseRelative(start, value) {
    var operator = value.charAt(0), end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
}, $d1cc397620177a52$var$_arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
    //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
    var l = toFind.length, i = 0;
    for(; toSearch.indexOf(toFind[i]) < 0 && ++i < l;);
    return i < l;
}, $d1cc397620177a52$var$_lazyRender = function _lazyRender() {
    var l = $d1cc397620177a52$var$_lazyTweens.length, a = $d1cc397620177a52$var$_lazyTweens.slice(0), i, tween;
    $d1cc397620177a52$var$_lazyLookup = {};
    $d1cc397620177a52$var$_lazyTweens.length = 0;
    for(i = 0; i < l; i++){
        tween = a[i];
        tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
}, $d1cc397620177a52$var$_lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
    $d1cc397620177a52$var$_lazyTweens.length && $d1cc397620177a52$var$_lazyRender();
    animation.render(time, suppressEvents, force || $d1cc397620177a52$var$_reverting && time < 0 && (animation._initted || animation._startAt));
    $d1cc397620177a52$var$_lazyTweens.length && $d1cc397620177a52$var$_lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
}, $d1cc397620177a52$var$_numericIfPossible = function _numericIfPossible(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match($d1cc397620177a52$var$_delimitedValueExp).length < 2 ? n : $d1cc397620177a52$export$f664476fd67145ca(value) ? value.trim() : value;
}, $d1cc397620177a52$var$_passThrough = function _passThrough(p) {
    return p;
}, $d1cc397620177a52$export$dc2b19673bb53610 = function _setDefaults(obj, defaults) {
    for(var p in defaults)p in obj || (obj[p] = defaults[p]);
    return obj;
}, $d1cc397620177a52$var$_setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
    return function(obj, defaults) {
        for(var p in defaults)p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
    };
}, $d1cc397620177a52$var$_merge = function _merge(base, toMerge) {
    for(var p in toMerge)base[p] = toMerge[p];
    return base;
}, $d1cc397620177a52$var$_mergeDeep = function _mergeDeep(base, toMerge) {
    for(var p in toMerge)p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = $d1cc397620177a52$var$_isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    return base;
}, $d1cc397620177a52$var$_copyExcluding = function _copyExcluding(obj, excluding) {
    var copy = {}, p;
    for(p in obj)p in excluding || (copy[p] = obj[p]);
    return copy;
}, $d1cc397620177a52$var$_inheritDefaults = function _inheritDefaults(vars) {
    var parent = vars.parent || $d1cc397620177a52$var$_globalTimeline, func = vars.keyframes ? $d1cc397620177a52$var$_setKeyframeDefaults($d1cc397620177a52$var$_isArray(vars.keyframes)) : $d1cc397620177a52$export$dc2b19673bb53610;
    if ($d1cc397620177a52$var$_isNotFalse(vars.inherit)) while(parent){
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
    }
    return vars;
}, $d1cc397620177a52$var$_arraysMatch = function _arraysMatch(a1, a2) {
    var i = a1.length, match = i === a2.length;
    while(match && i-- && a1[i] === a2[i]);
    return i < 0;
}, $d1cc397620177a52$var$_addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) firstProp = "_first";
    if (lastProp === void 0) lastProp = "_last";
    var prev = parent[lastProp], t;
    if (sortBy) {
        t = child[sortBy];
        while(prev && prev[sortBy] > t)prev = prev._prev;
    }
    if (prev) {
        child._next = prev._next;
        prev._next = child;
    } else {
        child._next = parent[firstProp];
        parent[firstProp] = child;
    }
    if (child._next) child._next._prev = child;
    else parent[lastProp] = child;
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
}, $d1cc397620177a52$export$cd008aa6cd8844e3 = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) firstProp = "_first";
    if (lastProp === void 0) lastProp = "_last";
    var prev = child._prev, next = child._next;
    if (prev) prev._next = next;
    else if (parent[firstProp] === child) parent[firstProp] = next;
    if (next) next._prev = prev;
    else if (parent[lastProp] === child) parent[lastProp] = prev;
    child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
}, $d1cc397620177a52$var$_removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
    child._act = 0;
}, $d1cc397620177a52$var$_uncache = function _uncache(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
        // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
        var a = animation;
        while(a){
            a._dirty = 1;
            a = a.parent;
        }
    }
    return animation;
}, $d1cc397620177a52$var$_recacheAncestors = function _recacheAncestors(animation) {
    var parent = animation.parent;
    while(parent && parent.parent){
        //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
        parent._dirty = 1;
        parent.totalDuration();
        parent = parent.parent;
    }
    return animation;
}, $d1cc397620177a52$var$_rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
    return tween._startAt && ($d1cc397620177a52$var$_reverting ? tween._startAt.revert($d1cc397620177a52$var$_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
}, $d1cc397620177a52$var$_hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
}, $d1cc397620177a52$var$_elapsedCycleDuration = function _elapsedCycleDuration(animation) {
    return animation._repeat ? $d1cc397620177a52$var$_animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
}, // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
$d1cc397620177a52$var$_animationCycle = function _animationCycle(tTime, cycleDuration) {
    var whole = Math.floor(tTime /= cycleDuration);
    return tTime && whole === tTime ? whole - 1 : whole;
}, $d1cc397620177a52$var$_parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
}, $d1cc397620177a52$var$_setEnd = function _setEnd(animation) {
    return animation._end = $d1cc397620177a52$var$_roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || $d1cc397620177a52$var$_tinyNum) || 0));
}, $d1cc397620177a52$var$_alignPlayhead = function _alignPlayhead(animation, totalTime) {
    // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
        animation._start = $d1cc397620177a52$var$_roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
        $d1cc397620177a52$var$_setEnd(animation);
        parent._dirty || $d1cc397620177a52$var$_uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
    }
    return animation;
}, /*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/ $d1cc397620177a52$var$_postAddChecks = function _postAddChecks(timeline, child) {
    var t;
    if (child._time || child._initted && !child._dur) {
        //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
        t = $d1cc397620177a52$var$_parentToChildTotalTime(timeline.rawTime(), child);
        if (!child._dur || $d1cc397620177a52$var$_clamp(0, child.totalDuration(), t) - child._tTime > $d1cc397620177a52$var$_tinyNum) child.render(t, true);
    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
    if ($d1cc397620177a52$var$_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
        //in case any of the ancestors had completed but should now be enabled...
        if (timeline._dur < timeline.duration()) {
            t = timeline;
            while(t._dp){
                t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.
                t = t._dp;
            }
        }
        timeline._zTime = -$d1cc397620177a52$var$_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
    }
}, $d1cc397620177a52$var$_addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
    child.parent && $d1cc397620177a52$var$_removeFromParent(child);
    child._start = $d1cc397620177a52$var$_roundPrecise(($d1cc397620177a52$var$_isNumber(position) ? position : position || timeline !== $d1cc397620177a52$var$_globalTimeline ? $d1cc397620177a52$var$_parsePosition(timeline, position, child) : timeline._time) + child._delay);
    child._end = $d1cc397620177a52$var$_roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    $d1cc397620177a52$var$_addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);
    $d1cc397620177a52$var$_isFromOrFromStart(child) || (timeline._recent = child);
    skipChecks || $d1cc397620177a52$var$_postAddChecks(timeline, child);
    timeline._ts < 0 && $d1cc397620177a52$var$_alignPlayhead(timeline, timeline._tTime); // if the timeline is reversed and the new child makes it longer, we may need to adjust the parent's _start (push it back)
    return timeline;
}, $d1cc397620177a52$var$_scrollTrigger = function _scrollTrigger(animation, trigger) {
    return ($d1cc397620177a52$var$_globals.ScrollTrigger || $d1cc397620177a52$export$7fb54635790b59a5("scrollTrigger", trigger)) && $d1cc397620177a52$var$_globals.ScrollTrigger.create(trigger, animation);
}, $d1cc397620177a52$var$_attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
    $d1cc397620177a52$var$_initTween(tween, time, tTime);
    if (!tween._initted) return 1;
    if (!force && tween._pt && !$d1cc397620177a52$var$_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && $d1cc397620177a52$var$_lastRenderedFrame !== $d1cc397620177a52$export$762ed8fbedb691e3.frame) {
        $d1cc397620177a52$var$_lazyTweens.push(tween);
        tween._lazy = [
            tTime,
            suppressEvents
        ];
        return 1;
    }
}, $d1cc397620177a52$var$_parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
}, // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
$d1cc397620177a52$var$_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
}, $d1cc397620177a52$var$_renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && $d1cc397620177a52$var$_parentPlayheadIsBeforeStart(tween) && !(!tween._initted && $d1cc397620177a52$var$_isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !$d1cc397620177a52$var$_isFromOrFromStart(tween)) ? 0 : 1, // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
    repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
    if (repeatDelay && tween._repeat) {
        // in case there's a zero-duration tween that has a repeat with a repeatDelay
        tTime = $d1cc397620177a52$var$_clamp(0, tween._tDur, totalTime);
        iteration = $d1cc397620177a52$var$_animationCycle(tTime, repeatDelay);
        tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
        if (iteration !== $d1cc397620177a52$var$_animationCycle(tween._tTime, repeatDelay)) {
            // if iteration changed
            prevRatio = 1 - ratio;
            tween.vars.repeatRefresh && tween._initted && tween.invalidate();
        }
    }
    if (ratio !== prevRatio || $d1cc397620177a52$var$_reverting || force || tween._zTime === $d1cc397620177a52$var$_tinyNum || !totalTime && tween._zTime) {
        if (!tween._initted && $d1cc397620177a52$var$_attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
        return;
        prevIteration = tween._zTime;
        tween._zTime = totalTime || (suppressEvents ? $d1cc397620177a52$var$_tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.
        suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.
        tween.ratio = ratio;
        tween._from && (ratio = 1 - ratio);
        tween._time = 0;
        tween._tTime = tTime;
        pt = tween._pt;
        while(pt){
            pt.r(ratio, pt.d);
            pt = pt._next;
        }
        totalTime < 0 && $d1cc397620177a52$var$_rewindStartAt(tween, totalTime, suppressEvents, true);
        tween._onUpdate && !suppressEvents && $d1cc397620177a52$var$_callback(tween, "onUpdate");
        tTime && tween._repeat && !suppressEvents && tween.parent && $d1cc397620177a52$var$_callback(tween, "onRepeat");
        if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
            ratio && $d1cc397620177a52$var$_removeFromParent(tween, 1);
            if (!suppressEvents && !$d1cc397620177a52$var$_reverting) {
                $d1cc397620177a52$var$_callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
                tween._prom && tween._prom();
            }
        }
    } else if (!tween._zTime) tween._zTime = totalTime;
}, $d1cc397620177a52$var$_findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
        child = animation._first;
        while(child && child._start <= time){
            if (child.data === "isPause" && child._start > prevTime) return child;
            child = child._next;
        }
    } else {
        child = animation._last;
        while(child && child._start >= time){
            if (child.data === "isPause" && child._start < prevTime) return child;
            child = child._prev;
        }
    }
}, $d1cc397620177a52$var$_setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat, dur = $d1cc397620177a52$var$_roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : $d1cc397620177a52$var$_roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead && $d1cc397620177a52$var$_alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
    animation.parent && $d1cc397620177a52$var$_setEnd(animation);
    skipUncache || $d1cc397620177a52$var$_uncache(animation.parent, animation);
    return animation;
}, $d1cc397620177a52$var$_onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
    return animation instanceof $d1cc397620177a52$export$e6a97ba2cae5bb94 ? $d1cc397620177a52$var$_uncache(animation) : $d1cc397620177a52$var$_setDuration(animation, animation._dur);
}, $d1cc397620177a52$var$_zeroPosition = {
    _start: 0,
    endTime: $d1cc397620177a52$var$_emptyFunc,
    totalDuration: $d1cc397620177a52$var$_emptyFunc
}, $d1cc397620177a52$var$_parsePosition = function _parsePosition(animation, position, percentAnimation) {
    var labels = animation.labels, recent = animation._recent || $d1cc397620177a52$var$_zeroPosition, clippedDuration = animation.duration() >= $d1cc397620177a52$var$_bigNum ? recent.endTime(false) : animation._dur, //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
    i, offset, isPercent;
    if ($d1cc397620177a52$export$f664476fd67145ca(position) && (isNaN(position) || position in labels)) {
        //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
        offset = position.charAt(0);
        isPercent = position.substr(-1) === "%";
        i = position.indexOf("=");
        if (offset === "<" || offset === ">") {
            i >= 0 && (position = position.replace(/=/, ""));
            return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
        }
        if (i < 0) {
            position in labels || (labels[position] = clippedDuration);
            return labels[position];
        }
        offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
        if (isPercent && percentAnimation) offset = offset / 100 * ($d1cc397620177a52$var$_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
        return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
}, $d1cc397620177a52$var$_createTweenType = function _createTweenType(type, params, timeline) {
    var isLegacy = $d1cc397620177a52$var$_isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline;
    if (type) {
        irVars = vars;
        parent = timeline;
        while(parent && !("immediateRender" in irVars)){
            // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
            irVars = parent.vars.defaults || {};
            parent = $d1cc397620177a52$var$_isNotFalse(parent.vars.inherit) && parent.parent;
        }
        vars.immediateRender = $d1cc397620177a52$var$_isNotFalse(irVars.immediateRender);
        type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
    }
    return new $d1cc397620177a52$export$208a41d6b4e37b97(params[0], vars, params[varsIndex + 1]);
}, $d1cc397620177a52$var$_conditionalReturn = function _conditionalReturn(value, func) {
    return value || value === 0 ? func(value) : func;
}, $d1cc397620177a52$var$_clamp = function _clamp(min, max, value) {
    return value < min ? min : value > max ? max : value;
}, $d1cc397620177a52$export$65f2564e9a9b9222 = function getUnit(value, v) {
    return !$d1cc397620177a52$export$f664476fd67145ca(value) || !(v = $d1cc397620177a52$var$_unitExp.exec(value)) ? "" : v[1];
}, // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
$d1cc397620177a52$export$7d15b64cf5a3a4c4 = function clamp(min, max, value) {
    return $d1cc397620177a52$var$_conditionalReturn(value, function(v) {
        return $d1cc397620177a52$var$_clamp(min, max, v);
    });
}, $d1cc397620177a52$var$_slice = [].slice, $d1cc397620177a52$var$_isArrayLike = function _isArrayLike(value, nonEmpty) {
    return value && $d1cc397620177a52$var$_isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && $d1cc397620177a52$var$_isObject(value[0])) && !value.nodeType && value !== $d1cc397620177a52$var$_win;
}, $d1cc397620177a52$var$_flatten = function _flatten(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) accumulator = [];
    return ar.forEach(function(value) {
        var _accumulator;
        return $d1cc397620177a52$export$f664476fd67145ca(value) && !leaveStrings || $d1cc397620177a52$var$_isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, $d1cc397620177a52$export$45b10814cc054894(value)) : accumulator.push(value);
    }) || accumulator;
}, //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
$d1cc397620177a52$export$45b10814cc054894 = function toArray(value, scope, leaveStrings) {
    return $d1cc397620177a52$var$_context && !scope && $d1cc397620177a52$var$_context.selector ? $d1cc397620177a52$var$_context.selector(value) : $d1cc397620177a52$export$f664476fd67145ca(value) && !leaveStrings && ($d1cc397620177a52$var$_coreInitted || !$d1cc397620177a52$var$_wake()) ? $d1cc397620177a52$var$_slice.call((scope || $d1cc397620177a52$var$_doc).querySelectorAll(value), 0) : $d1cc397620177a52$var$_isArray(value) ? $d1cc397620177a52$var$_flatten(value, leaveStrings) : $d1cc397620177a52$var$_isArrayLike(value) ? $d1cc397620177a52$var$_slice.call(value, 0) : value ? [
        value
    ] : [];
}, $d1cc397620177a52$export$aea217a45095ce11 = function selector(value) {
    value = $d1cc397620177a52$export$45b10814cc054894(value)[0] || $d1cc397620177a52$var$_warn("Invalid scope") || {};
    return function(v) {
        var el = value.current || value.nativeElement || value;
        return $d1cc397620177a52$export$45b10814cc054894(v, el.querySelectorAll ? el : el === value ? $d1cc397620177a52$var$_warn("Invalid scope") || $d1cc397620177a52$var$_doc.createElement("div") : value);
    };
}, $d1cc397620177a52$export$448332262467e042 = function shuffle(a) {
    return a.sort(function() {
        return .5 - Math.random();
    });
}, // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
$d1cc397620177a52$export$f02a9ddbe4480f19 = function distribute(v) {
    if ($d1cc397620177a52$var$_isFunction(v)) return v;
    var vars = $d1cc397620177a52$var$_isObject(v) ? v : {
        each: v
    }, //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
    ease = $d1cc397620177a52$var$_parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
    if ($d1cc397620177a52$export$f664476fd67145ca(from)) ratioX = ratioY = ({
        center: .5,
        edges: .5,
        end: 1
    })[from] || 0;
    else if (!isDecimal && ratios) {
        ratioX = from[0];
        ratioY = from[1];
    }
    return function(i, target, a) {
        var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrapAt;
        if (!distances) {
            wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [
                1,
                $d1cc397620177a52$var$_bigNum
            ])[1];
            if (!wrapAt) {
                max = -$d1cc397620177a52$var$_bigNum;
                while(max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l);
                wrapAt--;
            }
            distances = cache[l] = [];
            originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
            originY = wrapAt === $d1cc397620177a52$var$_bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
            max = 0;
            min = $d1cc397620177a52$var$_bigNum;
            for(j = 0; j < l; j++){
                x = j % wrapAt - originX;
                y = originY - (j / wrapAt | 0);
                distances[j] = d = !axis ? $d1cc397620177a52$var$_sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
                d > max && (max = d);
                d < min && (min = d);
            }
            from === "random" && $d1cc397620177a52$export$448332262467e042(distances);
            distances.max = max - min;
            distances.min = min;
            distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
            distances.b = l < 0 ? base - l : base;
            distances.u = $d1cc397620177a52$export$65f2564e9a9b9222(vars.amount || vars.each) || 0; //unit
            ease = ease && l < 0 ? $d1cc397620177a52$var$_invertEase(ease) : ease;
        }
        l = (distances[i] - distances.min) / distances.max || 0;
        return $d1cc397620177a52$var$_roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
    };
}, $d1cc397620177a52$export$dd12390e6b265a17 = function _roundModifier(v) {
    //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())
    return function(raw) {
        var n = $d1cc397620177a52$var$_roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
        return (n - n % 1) / p + ($d1cc397620177a52$var$_isNumber(raw) ? 0 : $d1cc397620177a52$export$65f2564e9a9b9222(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
    };
}, $d1cc397620177a52$export$51a0620f7a28532b = function snap(snapTo, value) {
    var isArray = $d1cc397620177a52$var$_isArray(snapTo), radius, is2D;
    if (!isArray && $d1cc397620177a52$var$_isObject(snapTo)) {
        radius = isArray = snapTo.radius || $d1cc397620177a52$var$_bigNum;
        if (snapTo.values) {
            snapTo = $d1cc397620177a52$export$45b10814cc054894(snapTo.values);
            if (is2D = !$d1cc397620177a52$var$_isNumber(snapTo[0])) radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
        } else snapTo = $d1cc397620177a52$export$dd12390e6b265a17(snapTo.increment);
    }
    return $d1cc397620177a52$var$_conditionalReturn(value, !isArray ? $d1cc397620177a52$export$dd12390e6b265a17(snapTo) : $d1cc397620177a52$var$_isFunction(snapTo) ? function(raw) {
        is2D = snapTo(raw);
        return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function(raw) {
        var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = $d1cc397620177a52$var$_bigNum, closest = 0, i = snapTo.length, dx, dy;
        while(i--){
            if (is2D) {
                dx = snapTo[i].x - x;
                dy = snapTo[i].y - y;
                dx = dx * dx + dy * dy;
            } else dx = Math.abs(snapTo[i] - x);
            if (dx < min) {
                min = dx;
                closest = i;
            }
        }
        closest = !radius || min <= radius ? snapTo[closest] : raw;
        return is2D || closest === raw || $d1cc397620177a52$var$_isNumber(raw) ? closest : closest + $d1cc397620177a52$export$65f2564e9a9b9222(raw);
    });
}, $d1cc397620177a52$export$4385e60b38654f68 = function random(min, max, roundingIncrement, returnFunction) {
    return $d1cc397620177a52$var$_conditionalReturn($d1cc397620177a52$var$_isArray(min) ? !max : roundingIncrement === true ? (roundingIncrement = 0, false) : !returnFunction, function() {
        return $d1cc397620177a52$var$_isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5, returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
}, $d1cc397620177a52$export$a4627e546088548d = function pipe() {
    for(var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++)functions[_key] = arguments[_key];
    return function(value) {
        return functions.reduce(function(v, f) {
            return f(v);
        }, value);
    };
}, $d1cc397620177a52$export$d7502930aa5492de = function unitize(func, unit) {
    return function(value) {
        return func(parseFloat(value)) + (unit || $d1cc397620177a52$export$65f2564e9a9b9222(value));
    };
}, $d1cc397620177a52$export$a3295358bff77e = function normalize(min, max, value) {
    return $d1cc397620177a52$export$f65a7599bbc6b121(min, max, 0, 1, value);
}, $d1cc397620177a52$var$_wrapArray = function _wrapArray(a, wrapper, value) {
    return $d1cc397620177a52$var$_conditionalReturn(value, function(index) {
        return a[~~wrapper(index)];
    });
}, $d1cc397620177a52$export$4997ffc0176396a6 = function wrap(min, max, value) {
    // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
    var range = max - min;
    return $d1cc397620177a52$var$_isArray(min) ? $d1cc397620177a52$var$_wrapArray(min, wrap(0, min.length), max) : $d1cc397620177a52$var$_conditionalReturn(value, function(value) {
        return (range + (value - min) % range) % range + min;
    });
}, $d1cc397620177a52$export$cfc0b067273edc55 = function wrapYoyo(min, max, value) {
    var range = max - min, total = range * 2;
    return $d1cc397620177a52$var$_isArray(min) ? $d1cc397620177a52$var$_wrapArray(min, wrapYoyo(0, min.length - 1), max) : $d1cc397620177a52$var$_conditionalReturn(value, function(value) {
        value = (total + (value - min) % total) % total || 0;
        return min + (value > range ? total - value : value);
    });
}, $d1cc397620177a52$export$d5962a97e3cde94d = function _replaceRandom(value) {
    //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
    var prev = 0, s = "", i, nums, end, isArray;
    while(~(i = value.indexOf("random(", prev))){
        end = value.indexOf(")", i);
        isArray = value.charAt(i + 7) === "[";
        nums = value.substr(i + 7, end - i - 7).match(isArray ? $d1cc397620177a52$var$_delimitedValueExp : $d1cc397620177a52$var$_strictNumExp);
        s += value.substr(prev, i - prev) + $d1cc397620177a52$export$4385e60b38654f68(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
        prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
}, $d1cc397620177a52$export$f65a7599bbc6b121 = function mapRange(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin, outRange = outMax - outMin;
    return $d1cc397620177a52$var$_conditionalReturn(value, function(value) {
        return outMin + ((value - inMin) / inRange * outRange || 0);
    });
}, $d1cc397620177a52$export$89e29e4ab65e70a9 = function interpolate(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function(p) {
        return (1 - p) * start + p * end;
    };
    if (!func) {
        var isString = $d1cc397620177a52$export$f664476fd67145ca(start), master = {}, p, i, interpolators, l, il;
        progress === true && (mutate = 1) && (progress = null);
        if (isString) {
            start = {
                p: start
            };
            end = {
                p: end
            };
        } else if ($d1cc397620177a52$var$_isArray(start) && !$d1cc397620177a52$var$_isArray(end)) {
            interpolators = [];
            l = start.length;
            il = l - 2;
            for(i = 1; i < l; i++)interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
            l--;
            func = function func(p) {
                p *= l;
                var i = Math.min(il, ~~p);
                return interpolators[i](p - i);
            };
            progress = end;
        } else if (!mutate) start = $d1cc397620177a52$var$_merge($d1cc397620177a52$var$_isArray(start) ? [] : {}, start);
        if (!interpolators) {
            for(p in end)$d1cc397620177a52$var$_addPropTween.call(master, start, p, "get", end[p]);
            func = function func(p) {
                return $d1cc397620177a52$var$_renderPropTweens(p, master) || (isString ? start.p : start);
            };
        }
    }
    return $d1cc397620177a52$var$_conditionalReturn(progress, func);
}, $d1cc397620177a52$var$_getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
    //used for nextLabel() and previousLabel()
    var labels = timeline.labels, min = $d1cc397620177a52$var$_bigNum, p, distance, label;
    for(p in labels){
        distance = labels[p] - fromTime;
        if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
            label = p;
            min = distance;
        }
    }
    return label;
}, $d1cc397620177a52$var$_callback = function _callback(animation, type, executeLazyFirst) {
    var v = animation.vars, callback = v[type], prevContext = $d1cc397620177a52$var$_context, context = animation._ctx, params, scope, result;
    if (!callback) return;
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && $d1cc397620177a52$var$_lazyTweens.length && $d1cc397620177a52$var$_lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
    context && ($d1cc397620177a52$var$_context = context);
    result = params ? callback.apply(scope, params) : callback.call(scope);
    $d1cc397620177a52$var$_context = prevContext;
    return result;
}, $d1cc397620177a52$var$_interrupt = function _interrupt(animation) {
    $d1cc397620177a52$var$_removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(!!$d1cc397620177a52$var$_reverting);
    animation.progress() < 1 && $d1cc397620177a52$var$_callback(animation, "onInterrupt");
    return animation;
}, $d1cc397620177a52$var$_quickTween, $d1cc397620177a52$var$_createPlugin = function _createPlugin(config) {
    config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.
    var name = config.name, isFunc = $d1cc397620177a52$var$_isFunction(config), Plugin = name && !isFunc && config.init ? function() {
        this._props = [];
    } : config, //in case someone passes in an object that's not a plugin, like CustomEase
    instanceDefaults = {
        init: $d1cc397620177a52$var$_emptyFunc,
        render: $d1cc397620177a52$var$_renderPropTweens,
        add: $d1cc397620177a52$var$_addPropTween,
        kill: $d1cc397620177a52$var$_killPropTweensOf,
        modifier: $d1cc397620177a52$var$_addPluginModifier,
        rawVars: 0
    }, statics = {
        targetTest: 0,
        get: 0,
        getSetter: $d1cc397620177a52$export$d60fbc1e0278aaf0,
        aliases: {},
        register: 0
    };
    $d1cc397620177a52$var$_wake();
    if (config !== Plugin) {
        if ($d1cc397620177a52$export$d305d8ec5d7c26b8[name]) return;
        $d1cc397620177a52$export$dc2b19673bb53610(Plugin, $d1cc397620177a52$export$dc2b19673bb53610($d1cc397620177a52$var$_copyExcluding(config, instanceDefaults), statics)); //static methods
        $d1cc397620177a52$var$_merge(Plugin.prototype, $d1cc397620177a52$var$_merge(instanceDefaults, $d1cc397620177a52$var$_copyExcluding(config, statics))); //instance methods
        $d1cc397620177a52$export$d305d8ec5d7c26b8[Plugin.prop = name] = Plugin;
        if (config.targetTest) {
            $d1cc397620177a52$var$_harnessPlugins.push(Plugin);
            $d1cc397620177a52$var$_reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
    }
    $d1cc397620177a52$var$_addGlobal(name, Plugin);
    config.register && config.register($d1cc397620177a52$export$99ee26438460406a, Plugin, $d1cc397620177a52$export$3a67f7f44b1e838a);
}, /*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */ $d1cc397620177a52$var$_255 = 255, $d1cc397620177a52$var$_colorLookup = {
    aqua: [
        0,
        $d1cc397620177a52$var$_255,
        $d1cc397620177a52$var$_255
    ],
    lime: [
        0,
        $d1cc397620177a52$var$_255,
        0
    ],
    silver: [
        192,
        192,
        192
    ],
    black: [
        0,
        0,
        0
    ],
    maroon: [
        128,
        0,
        0
    ],
    teal: [
        0,
        128,
        128
    ],
    blue: [
        0,
        0,
        $d1cc397620177a52$var$_255
    ],
    navy: [
        0,
        0,
        128
    ],
    white: [
        $d1cc397620177a52$var$_255,
        $d1cc397620177a52$var$_255,
        $d1cc397620177a52$var$_255
    ],
    olive: [
        128,
        128,
        0
    ],
    yellow: [
        $d1cc397620177a52$var$_255,
        $d1cc397620177a52$var$_255,
        0
    ],
    orange: [
        $d1cc397620177a52$var$_255,
        165,
        0
    ],
    gray: [
        128,
        128,
        128
    ],
    purple: [
        128,
        0,
        128
    ],
    green: [
        0,
        128,
        0
    ],
    red: [
        $d1cc397620177a52$var$_255,
        0,
        0
    ],
    pink: [
        $d1cc397620177a52$var$_255,
        192,
        203
    ],
    cyan: [
        0,
        $d1cc397620177a52$var$_255,
        $d1cc397620177a52$var$_255
    ],
    transparent: [
        $d1cc397620177a52$var$_255,
        $d1cc397620177a52$var$_255,
        $d1cc397620177a52$var$_255,
        0
    ]
}, // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
// let ctx = _doc.createElement("canvas").getContext("2d");
// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
$d1cc397620177a52$var$_hue = function _hue(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * $d1cc397620177a52$var$_255 + .5 | 0;
}, $d1cc397620177a52$export$73d6f35be992df24 = function splitColor(v, toHSL, forceAlpha) {
    var a = !v ? $d1cc397620177a52$var$_colorLookup.black : $d1cc397620177a52$var$_isNumber(v) ? [
        v >> 16,
        v >> 8 & $d1cc397620177a52$var$_255,
        v & $d1cc397620177a52$var$_255
    ] : 0, r, g, b, h, s, l, max, min, d, wasHSL;
    if (!a) {
        if (v.substr(-1) === ",") //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
        if ($d1cc397620177a52$var$_colorLookup[v]) a = $d1cc397620177a52$var$_colorLookup[v];
        else if (v.charAt(0) === "#") {
            if (v.length < 6) {
                //for shorthand like #9F0 or #9F0F (could have alpha)
                r = v.charAt(1);
                g = v.charAt(2);
                b = v.charAt(3);
                v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
            }
            if (v.length === 9) {
                // hex with alpha, like #fd5e53ff
                a = parseInt(v.substr(1, 6), 16);
                return [
                    a >> 16,
                    a >> 8 & $d1cc397620177a52$var$_255,
                    a & $d1cc397620177a52$var$_255,
                    parseInt(v.substr(7), 16) / 255
                ];
            }
            v = parseInt(v.substr(1), 16);
            a = [
                v >> 16,
                v >> 8 & $d1cc397620177a52$var$_255,
                v & $d1cc397620177a52$var$_255
            ];
        } else if (v.substr(0, 3) === "hsl") {
            a = wasHSL = v.match($d1cc397620177a52$var$_strictNumExp);
            if (!toHSL) {
                h = +a[0] % 360 / 360;
                s = +a[1] / 100;
                l = +a[2] / 100;
                g = l <= .5 ? l * (s + 1) : l + s - l * s;
                r = l * 2 - g;
                a.length > 3 && (a[3] *= 1); //cast as number
                a[0] = $d1cc397620177a52$var$_hue(h + 1 / 3, r, g);
                a[1] = $d1cc397620177a52$var$_hue(h, r, g);
                a[2] = $d1cc397620177a52$var$_hue(h - 1 / 3, r, g);
            } else if (~v.indexOf("=")) {
                //if relative values are found, just return the raw strings with the relative prefixes in place.
                a = v.match($d1cc397620177a52$export$b9d44bb6523120d6);
                forceAlpha && a.length < 4 && (a[3] = 1);
                return a;
            }
        } else a = v.match($d1cc397620177a52$var$_strictNumExp) || $d1cc397620177a52$var$_colorLookup.transparent;
        a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
        r = a[0] / $d1cc397620177a52$var$_255;
        g = a[1] / $d1cc397620177a52$var$_255;
        b = a[2] / $d1cc397620177a52$var$_255;
        max = Math.max(r, g, b);
        min = Math.min(r, g, b);
        l = (max + min) / 2;
        if (max === min) h = s = 0;
        else {
            d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
            h *= 60;
        }
        a[0] = ~~(h + .5);
        a[1] = ~~(s * 100 + .5);
        a[2] = ~~(l * 100 + .5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
}, $d1cc397620177a52$var$_colorOrderData = function _colorOrderData(v) {
    // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
    var values = [], c = [], i = -1;
    v.split($d1cc397620177a52$export$dd733e62515be2bd).forEach(function(v) {
        var a = v.match($d1cc397620177a52$export$65c88bbd597e7b0a) || [];
        values.push.apply(values, a);
        c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
}, $d1cc397620177a52$var$_formatColors = function _formatColors(s, toHSL, orderMatchData) {
    var result = "", colors = (s + result).match($d1cc397620177a52$export$dd733e62515be2bd), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
    if (!colors) return s;
    colors = colors.map(function(color) {
        return (color = $d1cc397620177a52$export$73d6f35be992df24(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
        d = $d1cc397620177a52$var$_colorOrderData(s);
        c = orderMatchData.c;
        if (c.join(result) !== d.c.join(result)) {
            shell = s.replace($d1cc397620177a52$export$dd733e62515be2bd, "1").split($d1cc397620177a52$export$65c88bbd597e7b0a);
            l = shell.length - 1;
            for(; i < l; i++)result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
    }
    if (!shell) {
        shell = s.split($d1cc397620177a52$export$dd733e62515be2bd);
        l = shell.length - 1;
        for(; i < l; i++)result += shell[i] + colors[i];
    }
    return result + shell[l];
}, $d1cc397620177a52$export$dd733e62515be2bd = function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
    p;
    for(p in $d1cc397620177a52$var$_colorLookup)s += "|" + p + "\\b";
    return new RegExp(s + ")", "gi");
}(), $d1cc397620177a52$var$_hslExp = /hsl[a]?\(/, $d1cc397620177a52$export$7eb2e5eb5eeb96a4 = function _colorStringFilter(a) {
    var combined = a.join(" "), toHSL;
    $d1cc397620177a52$export$dd733e62515be2bd.lastIndex = 0;
    if ($d1cc397620177a52$export$dd733e62515be2bd.test(combined)) {
        toHSL = $d1cc397620177a52$var$_hslExp.test(combined);
        a[1] = $d1cc397620177a52$var$_formatColors(a[1], toHSL);
        a[0] = $d1cc397620177a52$var$_formatColors(a[0], toHSL, $d1cc397620177a52$var$_colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.
        return true;
    }
}, /*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */ $d1cc397620177a52$var$_tickerActive, $d1cc397620177a52$export$762ed8fbedb691e3 = function() {
    var _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1000 / 240, _nextTime = _gap, _listeners = [], _id, _req, _raf, _self, _delta, _i, _tick = function _tick(v) {
        var elapsed = _getTime() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
        elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
        _lastUpdate += elapsed;
        time = _lastUpdate - _startTime;
        overlap = time - _nextTime;
        if (overlap > 0 || manual) {
            frame = ++_self.frame;
            _delta = time - _self.time * 1000;
            _self.time = time = time / 1000;
            _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
            dispatch = 1;
        }
        manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
        if (dispatch) for(_i = 0; _i < _listeners.length; _i++)// use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
    };
    _self = {
        time: 0,
        frame: 0,
        tick: function tick() {
            _tick(true);
        },
        deltaRatio: function deltaRatio(fps) {
            return _delta / (1000 / (fps || 60));
        },
        wake: function wake() {
            if ($d1cc397620177a52$var$_coreReady) {
                if (!$d1cc397620177a52$var$_coreInitted && $d1cc397620177a52$var$_windowExists()) {
                    $d1cc397620177a52$var$_win = $d1cc397620177a52$var$_coreInitted = window;
                    $d1cc397620177a52$var$_doc = $d1cc397620177a52$var$_win.document || {};
                    $d1cc397620177a52$var$_globals.gsap = $d1cc397620177a52$export$99ee26438460406a;
                    ($d1cc397620177a52$var$_win.gsapVersions || ($d1cc397620177a52$var$_win.gsapVersions = [])).push($d1cc397620177a52$export$99ee26438460406a.version);
                    $d1cc397620177a52$var$_install($d1cc397620177a52$var$_installScope || $d1cc397620177a52$var$_win.GreenSockGlobals || !$d1cc397620177a52$var$_win.gsap && $d1cc397620177a52$var$_win || {});
                    _raf = $d1cc397620177a52$var$_win.requestAnimationFrame;
                }
                _id && _self.sleep();
                _req = _raf || function(f) {
                    return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
                };
                $d1cc397620177a52$var$_tickerActive = 1;
                _tick(2);
            }
        },
        sleep: function sleep() {
            (_raf ? $d1cc397620177a52$var$_win.cancelAnimationFrame : clearTimeout)(_id);
            $d1cc397620177a52$var$_tickerActive = 0;
            _req = $d1cc397620177a52$var$_emptyFunc;
        },
        lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
            _lagThreshold = threshold || 1 / $d1cc397620177a52$var$_tinyNum; //zero should be interpreted as basically unlimited
            _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
        },
        fps: function fps(_fps) {
            _gap = 1000 / (_fps || 240);
            _nextTime = _self.time * 1000 + _gap;
        },
        add: function add(callback, once, prioritize) {
            var func = once ? function(t, d, f, v) {
                callback(t, d, f, v);
                _self.remove(func);
            } : callback;
            _self.remove(callback);
            _listeners[prioritize ? "unshift" : "push"](func);
            $d1cc397620177a52$var$_wake();
            return func;
        },
        remove: function remove(callback, i) {
            ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
        },
        _listeners: _listeners
    };
    return _self;
}(), $d1cc397620177a52$var$_wake = function _wake() {
    return !$d1cc397620177a52$var$_tickerActive && $d1cc397620177a52$export$762ed8fbedb691e3.wake();
}, //also ensures the core classes are initialized.
/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/ $d1cc397620177a52$var$_easeMap = {}, $d1cc397620177a52$var$_customEaseExp = /^[\d.\-M][\d.\-,\s]/, $d1cc397620177a52$var$_quotesExp = /["']/g, $d1cc397620177a52$var$_parseObjectInString = function _parseObjectInString(value) {
    //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
    var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index, val, parsedVal;
    for(; i < l; i++){
        val = split[i];
        index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
        parsedVal = val.substr(0, index);
        obj[key] = isNaN(parsedVal) ? parsedVal.replace($d1cc397620177a52$var$_quotesExp, "").trim() : +parsedVal;
        key = val.substr(index + 1).trim();
    }
    return obj;
}, $d1cc397620177a52$var$_valueInParentheses = function _valueInParentheses(value) {
    var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
}, $d1cc397620177a52$var$_configEaseFromString = function _configEaseFromString(name) {
    //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
    var split = (name + "").split("("), ease = $d1cc397620177a52$var$_easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [
        $d1cc397620177a52$var$_parseObjectInString(split[1])
    ] : $d1cc397620177a52$var$_valueInParentheses(name).split(",").map($d1cc397620177a52$var$_numericIfPossible)) : $d1cc397620177a52$var$_easeMap._CE && $d1cc397620177a52$var$_customEaseExp.test(name) ? $d1cc397620177a52$var$_easeMap._CE("", name) : ease;
}, $d1cc397620177a52$var$_invertEase = function _invertEase(ease) {
    return function(p) {
        return 1 - ease(1 - p);
    };
}, // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
$d1cc397620177a52$var$_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
    var child = timeline._first, ease;
    while(child){
        if (child instanceof $d1cc397620177a52$export$e6a97ba2cae5bb94) _propagateYoyoEase(child, isYoyo);
        else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
            if (child.timeline) _propagateYoyoEase(child.timeline, isYoyo);
            else {
                ease = child._ease;
                child._ease = child._yEase;
                child._yEase = ease;
                child._yoyo = isYoyo;
            }
        }
        child = child._next;
    }
}, $d1cc397620177a52$var$_parseEase = function _parseEase(ease, defaultEase) {
    return !ease ? defaultEase : ($d1cc397620177a52$var$_isFunction(ease) ? ease : $d1cc397620177a52$var$_easeMap[ease] || $d1cc397620177a52$var$_configEaseFromString(ease)) || defaultEase;
}, $d1cc397620177a52$var$_insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) easeOut = function easeOut(p) {
        return 1 - easeIn(1 - p);
    };
    if (easeInOut === void 0) easeInOut = function easeInOut(p) {
        return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
    var ease = {
        easeIn: easeIn,
        easeOut: easeOut,
        easeInOut: easeInOut
    }, lowercaseName;
    $d1cc397620177a52$export$f9000b814859f126(names, function(name) {
        $d1cc397620177a52$var$_easeMap[name] = $d1cc397620177a52$var$_globals[name] = ease;
        $d1cc397620177a52$var$_easeMap[lowercaseName = name.toLowerCase()] = easeOut;
        for(var p in ease)$d1cc397620177a52$var$_easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = $d1cc397620177a52$var$_easeMap[name + "." + p] = ease[p];
    });
    return ease;
}, $d1cc397620177a52$var$_easeInOutFromOut = function _easeInOutFromOut(easeOut) {
    return function(p) {
        return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
    };
}, $d1cc397620177a52$var$_configElastic = function _configElastic(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1, //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
    p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / $d1cc397620177a52$var$_2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut(p) {
        return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * $d1cc397620177a52$var$_sin((p - p3) * p2) + 1;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
        return 1 - easeOut(1 - p);
    } : $d1cc397620177a52$var$_easeInOutFromOut(easeOut);
    p2 = $d1cc397620177a52$var$_2PI / p2; //precalculate to optimize
    ease.config = function(amplitude, period) {
        return _configElastic(type, amplitude, period);
    };
    return ease;
}, $d1cc397620177a52$var$_configBack = function _configBack(type, overshoot) {
    if (overshoot === void 0) overshoot = 1.70158;
    var easeOut = function easeOut(p) {
        return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
        return 1 - easeOut(1 - p);
    } : $d1cc397620177a52$var$_easeInOutFromOut(easeOut);
    ease.config = function(overshoot) {
        return _configBack(type, overshoot);
    };
    return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };
$d1cc397620177a52$export$f9000b814859f126("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
    var power = i < 5 ? i + 1 : i;
    $d1cc397620177a52$var$_insertEase(name + ",Power" + (power - 1), i ? function(p) {
        return Math.pow(p, power);
    } : function(p) {
        return p;
    }, function(p) {
        return 1 - Math.pow(1 - p, power);
    }, function(p) {
        return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
});
$d1cc397620177a52$var$_easeMap.Linear.easeNone = $d1cc397620177a52$var$_easeMap.none = $d1cc397620177a52$var$_easeMap.Linear.easeIn;
$d1cc397620177a52$var$_insertEase("Elastic", $d1cc397620177a52$var$_configElastic("in"), $d1cc397620177a52$var$_configElastic("out"), $d1cc397620177a52$var$_configElastic());
(function(n, c) {
    var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut(p) {
        return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
    };
    $d1cc397620177a52$var$_insertEase("Bounce", function(p) {
        return 1 - easeOut(1 - p);
    }, easeOut);
})(7.5625, 2.75);
$d1cc397620177a52$var$_insertEase("Expo", function(p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
});
$d1cc397620177a52$var$_insertEase("Circ", function(p) {
    return -($d1cc397620177a52$var$_sqrt(1 - p * p) - 1);
});
$d1cc397620177a52$var$_insertEase("Sine", function(p) {
    return p === 1 ? 1 : -$d1cc397620177a52$var$_cos(p * $d1cc397620177a52$var$_HALF_PI) + 1;
});
$d1cc397620177a52$var$_insertEase("Back", $d1cc397620177a52$var$_configBack("in"), $d1cc397620177a52$var$_configBack("out"), $d1cc397620177a52$var$_configBack());
$d1cc397620177a52$var$_easeMap.SteppedEase = $d1cc397620177a52$var$_easeMap.steps = $d1cc397620177a52$var$_globals.SteppedEase = {
    config: function config(steps, immediateStart) {
        if (steps === void 0) steps = 1;
        var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - $d1cc397620177a52$var$_tinyNum;
        return function(p) {
            return ((p2 * $d1cc397620177a52$var$_clamp(0, max, p) | 0) + p3) * p1;
        };
    }
};
$d1cc397620177a52$var$_defaults.ease = $d1cc397620177a52$var$_easeMap["quad.out"];
$d1cc397620177a52$export$f9000b814859f126("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
    return $d1cc397620177a52$var$_callbackNames += name + "," + name + "Params,";
});
var $d1cc397620177a52$export$cf10981d5419cad5 = function GSCache(target, harness) {
    this.id = $d1cc397620177a52$var$_gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : $d1cc397620177a52$export$51d6bbe898aef1f9;
    this.set = harness ? harness.getSetter : $d1cc397620177a52$export$d60fbc1e0278aaf0;
};
var $d1cc397620177a52$export$c35d437ae5945fcd = /*#__PURE__*/ function() {
    function Animation(vars) {
        this.vars = vars;
        this._delay = +vars.delay || 0;
        if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
            // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
            this._rDelay = vars.repeatDelay || 0;
            this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
        }
        this._ts = 1;
        $d1cc397620177a52$var$_setDuration(this, +vars.duration, 1, 1);
        this.data = vars.data;
        if ($d1cc397620177a52$var$_context) {
            this._ctx = $d1cc397620177a52$var$_context;
            $d1cc397620177a52$var$_context.data.push(this);
        }
        $d1cc397620177a52$var$_tickerActive || $d1cc397620177a52$export$762ed8fbedb691e3.wake();
    }
    var _proto = Animation.prototype;
    _proto.delay = function delay(value) {
        if (value || value === 0) {
            this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
            this._delay = value;
            return this;
        }
        return this._delay;
    };
    _proto.duration = function duration(value) {
        return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
        if (!arguments.length) return this._tDur;
        this._dirty = 0;
        return $d1cc397620177a52$var$_setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
        $d1cc397620177a52$var$_wake();
        if (!arguments.length) return this._tTime;
        var parent = this._dp;
        if (parent && parent.smoothChildTiming && this._ts) {
            $d1cc397620177a52$var$_alignPlayhead(this, _totalTime);
            !parent._dp || parent.parent || $d1cc397620177a52$var$_postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
            //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.
            while(parent && parent.parent){
                if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) parent.totalTime(parent._tTime, true);
                parent = parent.parent;
            }
            if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
            $d1cc397620177a52$var$_addToTimeline(this._dp, this, this._start - this._delay);
        }
        if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === $d1cc397620177a52$var$_tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
            // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
            this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
            //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
            //   this._lock = 1;
            $d1cc397620177a52$var$_lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
        //}
        }
        return this;
    };
    _proto.time = function time(value, suppressEvents) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + $d1cc397620177a52$var$_elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
        return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
    };
    _proto.progress = function progress(value, suppressEvents) {
        return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + $d1cc397620177a52$var$_elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
        var cycleDuration = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? $d1cc397620177a52$var$_animationCycle(this._tTime, cycleDuration) + 1 : 1;
    } // potential future addition:
    ;
    _proto.timeScale = function timeScale(value) {
        if (!arguments.length) return this._rts === -$d1cc397620177a52$var$_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
        if (this._rts === value) return this;
        var tTime = this.parent && this._ts ? $d1cc397620177a52$var$_parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
        // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
        //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
        // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.
        this._rts = +value || 0;
        this._ts = this._ps || value === -$d1cc397620177a52$var$_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.
        this.totalTime($d1cc397620177a52$var$_clamp(-this._delay, this._tDur, tTime), true);
        $d1cc397620177a52$var$_setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.
        return $d1cc397620177a52$var$_recacheAncestors(this);
    };
    _proto.paused = function paused(value) {
        if (!arguments.length) return this._ps;
        if (this._ps !== value) {
            this._ps = value;
            if (value) {
                this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.
                this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
            } else {
                $d1cc397620177a52$var$_wake();
                this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.
                this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== $d1cc397620177a52$var$_tinyNum && (this._tTime -= $d1cc397620177a52$var$_tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
            }
        }
        return this;
    };
    _proto.startTime = function startTime(value) {
        if (arguments.length) {
            this._start = value;
            var parent = this.parent || this._dp;
            parent && (parent._sort || !this.parent) && $d1cc397620177a52$var$_addToTimeline(parent, this, value - this._delay);
            return this;
        }
        return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
        return this._start + ($d1cc397620177a52$var$_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
        var parent = this.parent || this._dp; // _dp = detached parent
        return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : $d1cc397620177a52$var$_parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.revert = function revert(config) {
        if (config === void 0) config = $d1cc397620177a52$var$_revertConfig;
        var prevIsReverting = $d1cc397620177a52$var$_reverting;
        $d1cc397620177a52$var$_reverting = config;
        if (this._initted || this._startAt) {
            this.timeline && this.timeline.revert(config);
            this.totalTime(-0.01, config.suppressEvents);
        }
        this.data !== "nested" && config.kill !== false && this.kill();
        $d1cc397620177a52$var$_reverting = prevIsReverting;
        return this;
    };
    _proto.globalTime = function globalTime(rawTime) {
        var animation = this, time = arguments.length ? rawTime : animation.rawTime();
        while(animation){
            time = animation._start + time / (animation._ts || 1);
            animation = animation._dp;
        }
        return !this.parent && this.vars.immediateRender ? -1 : time; // the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for Recording.revert())
    };
    _proto.repeat = function repeat(value) {
        if (arguments.length) {
            this._repeat = value === Infinity ? -2 : value;
            return $d1cc397620177a52$var$_onUpdateTotalDuration(this);
        }
        return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
        if (arguments.length) {
            var time = this._time;
            this._rDelay = value;
            $d1cc397620177a52$var$_onUpdateTotalDuration(this);
            return time ? this.time(time) : this;
        }
        return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
        if (arguments.length) {
            this._yoyo = value;
            return this;
        }
        return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
        return this.totalTime($d1cc397620177a52$var$_parsePosition(this, position), $d1cc397620177a52$var$_isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
        return this.play().totalTime(includeDelay ? -this._delay : 0, $d1cc397620177a52$var$_isNotFalse(suppressEvents));
    };
    _proto.play = function play(from, suppressEvents) {
        from != null && this.seek(from, suppressEvents);
        return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
        from != null && this.seek(from || this.totalDuration(), suppressEvents);
        return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
        atTime != null && this.seek(atTime, suppressEvents);
        return this.paused(true);
    };
    _proto.resume = function resume() {
        return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
        if (arguments.length) {
            !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -$d1cc397620177a52$var$_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.
            return this;
        }
        return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
        this._initted = this._act = 0;
        this._zTime = -$d1cc397620177a52$var$_tinyNum;
        return this;
    };
    _proto.isActive = function isActive() {
        var parent = this.parent || this._dp, start = this._start, rawTime;
        return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - $d1cc397620177a52$var$_tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params) {
        var vars = this.vars;
        if (arguments.length > 1) {
            if (!callback) delete vars[type];
            else {
                vars[type] = callback;
                params && (vars[type + "Params"] = params);
                type === "onUpdate" && (this._onUpdate = callback);
            }
            return this;
        }
        return vars[type];
    };
    _proto.then = function then(onFulfilled) {
        var self = this;
        return new Promise(function(resolve) {
            var f = $d1cc397620177a52$var$_isFunction(onFulfilled) ? onFulfilled : $d1cc397620177a52$var$_passThrough, _resolve = function _resolve() {
                var _then = self.then;
                self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)
                $d1cc397620177a52$var$_isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
                resolve(f);
                self.then = _then;
            };
            if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) _resolve();
            else self._prom = _resolve;
        });
    };
    _proto.kill = function kill() {
        $d1cc397620177a52$var$_interrupt(this);
    };
    return Animation;
}();
$d1cc397620177a52$export$dc2b19673bb53610($d1cc397620177a52$export$c35d437ae5945fcd.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -$d1cc397620177a52$var$_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
});
var $d1cc397620177a52$export$e6a97ba2cae5bb94 = /*#__PURE__*/ function(_Animation) {
    $d1cc397620177a52$var$_inheritsLoose(Timeline, _Animation);
    function Timeline(vars, position) {
        var _this;
        if (vars === void 0) vars = {};
        _this = _Animation.call(this, vars) || this;
        _this.labels = {};
        _this.smoothChildTiming = !!vars.smoothChildTiming;
        _this.autoRemoveChildren = !!vars.autoRemoveChildren;
        _this._sort = $d1cc397620177a52$var$_isNotFalse(vars.sortChildren);
        $d1cc397620177a52$var$_globalTimeline && $d1cc397620177a52$var$_addToTimeline(vars.parent || $d1cc397620177a52$var$_globalTimeline, $d1cc397620177a52$var$_assertThisInitialized(_this), position);
        vars.reversed && _this.reverse();
        vars.paused && _this.paused(true);
        vars.scrollTrigger && $d1cc397620177a52$var$_scrollTrigger($d1cc397620177a52$var$_assertThisInitialized(_this), vars.scrollTrigger);
        return _this;
    }
    var _proto2 = Timeline.prototype;
    _proto2.to = function to(targets, vars, position) {
        $d1cc397620177a52$var$_createTweenType(0, arguments, this);
        return this;
    };
    _proto2.from = function from(targets, vars, position) {
        $d1cc397620177a52$var$_createTweenType(1, arguments, this);
        return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
        $d1cc397620177a52$var$_createTweenType(2, arguments, this);
        return this;
    };
    _proto2.set = function set(targets, vars, position) {
        vars.duration = 0;
        vars.parent = this;
        $d1cc397620177a52$var$_inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
        vars.immediateRender = !!vars.immediateRender;
        new $d1cc397620177a52$export$208a41d6b4e37b97(targets, vars, $d1cc397620177a52$var$_parsePosition(this, position), 1);
        return this;
    };
    _proto2.call = function call(callback, params, position) {
        return $d1cc397620177a52$var$_addToTimeline(this, $d1cc397620177a52$export$208a41d6b4e37b97.delayedCall(0, callback, params), position);
    } //ONLY for backward compatibility! Maybe delete?
    ;
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
        vars.duration = duration;
        vars.stagger = vars.stagger || stagger;
        vars.onComplete = onCompleteAll;
        vars.onCompleteParams = onCompleteAllParams;
        vars.parent = this;
        new $d1cc397620177a52$export$208a41d6b4e37b97(targets, vars, $d1cc397620177a52$var$_parsePosition(this, position));
        return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
        vars.runBackwards = 1;
        $d1cc397620177a52$var$_inheritDefaults(vars).immediateRender = $d1cc397620177a52$var$_isNotFalse(vars.immediateRender);
        return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
        toVars.startAt = fromVars;
        $d1cc397620177a52$var$_inheritDefaults(toVars).immediateRender = $d1cc397620177a52$var$_isNotFalse(toVars.immediateRender);
        return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render(totalTime, suppressEvents, force) {
        var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : $d1cc397620177a52$var$_roundPrecise(totalTime), // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
        crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
        this !== $d1cc397620177a52$var$_globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
        if (tTime !== this._tTime || force || crossingStart) {
            if (prevTime !== this._time && dur) {
                //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
                tTime += this._time - prevTime;
                totalTime += this._time - prevTime;
            }
            time = tTime;
            prevStart = this._start;
            timeScale = this._ts;
            prevPaused = !timeScale;
            if (crossingStart) {
                dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.
                (totalTime || !suppressEvents) && (this._zTime = totalTime);
            }
            if (this._repeat) {
                //adjust the time for repeats and yoyos
                yoyo = this._yoyo;
                cycleDuration = dur + this._rDelay;
                if (this._repeat < -1 && totalTime < 0) return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
                time = $d1cc397620177a52$var$_roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)
                if (tTime === tDur) {
                    // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
                    iteration = this._repeat;
                    time = dur;
                } else {
                    iteration = ~~(tTime / cycleDuration);
                    if (iteration && iteration === tTime / cycleDuration) {
                        time = dur;
                        iteration--;
                    }
                    time > dur && (time = dur);
                }
                prevIteration = $d1cc397620177a52$var$_animationCycle(this._tTime, cycleDuration);
                !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005
                if (yoyo && iteration & 1) {
                    time = dur - time;
                    isYoyo = 1;
                }
                /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */ if (iteration !== prevIteration && !this._lock) {
                    var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
                    iteration < prevIteration && (rewinding = !rewinding);
                    prevTime = rewinding ? 0 : dur;
                    this._lock = 1;
                    this.render(prevTime || (isYoyo ? 0 : $d1cc397620177a52$var$_roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
                    this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.
                    !suppressEvents && this.parent && $d1cc397620177a52$var$_callback(this, "onRepeat");
                    this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
                    if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
                    return this;
                    dur = this._dur; // in case the duration changed in the onRepeat
                    tDur = this._tDur;
                    if (doesWrap) {
                        this._lock = 2;
                        prevTime = rewinding ? dur : -0.0001;
                        this.render(prevTime, true);
                        this.vars.repeatRefresh && !isYoyo && this.invalidate();
                    }
                    this._lock = 0;
                    if (!this._ts && !prevPaused) return this;
                     //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.
                    $d1cc397620177a52$var$_propagateYoyoEase(this, isYoyo);
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2) {
                pauseTween = $d1cc397620177a52$var$_findNextPauseTween(this, $d1cc397620177a52$var$_roundPrecise(prevTime), $d1cc397620177a52$var$_roundPrecise(time));
                if (pauseTween) tTime -= time - (time = pauseTween._start);
            }
            this._tTime = tTime;
            this._time = time;
            this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.
            if (!this._initted) {
                this._onUpdate = this.vars.onUpdate;
                this._initted = 1;
                this._zTime = totalTime;
                prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
            }
            if (!prevTime && time && !suppressEvents) {
                $d1cc397620177a52$var$_callback(this, "onStart");
                if (this._tTime !== tTime) // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
                return this;
            }
            if (time >= prevTime && totalTime >= 0) {
                child = this._first;
                while(child){
                    next = child._next;
                    if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
                        if (child.parent !== this) // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
                        return this.render(totalTime, suppressEvents, force);
                        child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
                        if (time !== this._time || !this._ts && !prevPaused) {
                            //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
                            pauseTween = 0;
                            next && (tTime += this._zTime = -$d1cc397620177a52$var$_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)
                            break;
                        }
                    }
                    child = next;
                }
            } else {
                child = this._last;
                var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.
                while(child){
                    next = child._prev;
                    if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
                        if (child.parent !== this) // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
                        return this.render(totalTime, suppressEvents, force);
                        child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || $d1cc397620177a52$var$_reverting && (child._initted || child._startAt)); // if reverting, we should always force renders of initted tweens (but remember that .fromTo() or .from() may have a _startAt but not _initted yet). If, for example, a .fromTo() tween with a stagger (which creates an internal timeline) gets reverted BEFORE some of its child tweens render for the first time, it may not properly trigger them to revert.
                        if (time !== this._time || !this._ts && !prevPaused) {
                            //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
                            pauseTween = 0;
                            next && (tTime += this._zTime = adjustedTime ? -$d1cc397620177a52$var$_tinyNum : $d1cc397620177a52$var$_tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)
                            break;
                        }
                    }
                    child = next;
                }
            }
            if (pauseTween && !suppressEvents) {
                this.pause();
                pauseTween.render(time >= prevTime ? 0 : -$d1cc397620177a52$var$_tinyNum)._zTime = time >= prevTime ? 1 : -1;
                if (this._ts) {
                    //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
                    this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.
                    $d1cc397620177a52$var$_setEnd(this);
                    return this.render(totalTime, suppressEvents, force);
                }
            }
            this._onUpdate && !suppressEvents && $d1cc397620177a52$var$_callback(this, "onUpdate", true);
            if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
                if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
                    if (!this._lock) {
                        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
                        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && $d1cc397620177a52$var$_removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.
                        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                            $d1cc397620177a52$var$_callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                        }
                    }
                }
            }
        }
        return this;
    };
    _proto2.add = function add(child, position) {
        var _this2 = this;
        $d1cc397620177a52$var$_isNumber(position) || (position = $d1cc397620177a52$var$_parsePosition(this, position, child));
        if (!(child instanceof $d1cc397620177a52$export$c35d437ae5945fcd)) {
            if ($d1cc397620177a52$var$_isArray(child)) {
                child.forEach(function(obj) {
                    return _this2.add(obj, position);
                });
                return this;
            }
            if ($d1cc397620177a52$export$f664476fd67145ca(child)) return this.addLabel(child, position);
            if ($d1cc397620177a52$var$_isFunction(child)) child = $d1cc397620177a52$export$208a41d6b4e37b97.delayedCall(0, child);
            else return this;
        }
        return this !== child ? $d1cc397620177a52$var$_addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
        if (nested === void 0) nested = true;
        if (tweens === void 0) tweens = true;
        if (timelines === void 0) timelines = true;
        if (ignoreBeforeTime === void 0) ignoreBeforeTime = -$d1cc397620177a52$var$_bigNum;
        var a = [], child = this._first;
        while(child){
            if (child._start >= ignoreBeforeTime) {
                if (child instanceof $d1cc397620177a52$export$208a41d6b4e37b97) tweens && a.push(child);
                else {
                    timelines && a.push(child);
                    nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
                }
            }
            child = child._next;
        }
        return a;
    };
    _proto2.getById = function getById(id) {
        var animations = this.getChildren(1, 1, 1), i = animations.length;
        while(i--){
            if (animations[i].vars.id === id) return animations[i];
        }
    };
    _proto2.remove = function remove(child) {
        if ($d1cc397620177a52$export$f664476fd67145ca(child)) return this.removeLabel(child);
        if ($d1cc397620177a52$var$_isFunction(child)) return this.killTweensOf(child);
        $d1cc397620177a52$export$cd008aa6cd8844e3(this, child);
        if (child === this._recent) this._recent = this._last;
        return $d1cc397620177a52$var$_uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
        if (!arguments.length) return this._tTime;
        this._forcing = 1;
        if (!this._dp && this._ts) //special case for the global timeline (or any other that has no parent or detached parent).
        this._start = $d1cc397620177a52$var$_roundPrecise($d1cc397620177a52$export$762ed8fbedb691e3.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
        _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
        this._forcing = 0;
        return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
        this.labels[label] = $d1cc397620177a52$var$_parsePosition(this, position);
        return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
        delete this.labels[label];
        return this;
    };
    _proto2.addPause = function addPause(position, callback, params) {
        var t = $d1cc397620177a52$export$208a41d6b4e37b97.delayedCall(0, callback || $d1cc397620177a52$var$_emptyFunc, params);
        t.data = "isPause";
        this._hasPause = 1;
        return $d1cc397620177a52$var$_addToTimeline(this, t, $d1cc397620177a52$var$_parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
        var child = this._first;
        position = $d1cc397620177a52$var$_parsePosition(this, position);
        while(child){
            if (child._start === position && child.data === "isPause") $d1cc397620177a52$var$_removeFromParent(child);
            child = child._next;
        }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
        var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
        while(i--)$d1cc397620177a52$var$_overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
        return this;
    };
    _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
        var a = [], parsedTargets = $d1cc397620177a52$export$45b10814cc054894(targets), child = this._first, isGlobalTime = $d1cc397620177a52$var$_isNumber(onlyActive), // a number is interpreted as a global time. If the animation spans
        children;
        while(child){
            if (child instanceof $d1cc397620177a52$export$208a41d6b4e37b97) {
                if ($d1cc397620177a52$var$_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!$d1cc397620177a52$var$_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
                a.push(child);
            } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) a.push.apply(a, children);
            child = child._next;
        }
        return a;
    } // potential future feature - targets() on timelines
    ;
    _proto2.tweenTo = function tweenTo(position, vars) {
        vars = vars || {};
        var tl = this, endTime = $d1cc397620177a52$var$_parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = $d1cc397620177a52$export$208a41d6b4e37b97.to(tl, $d1cc397620177a52$export$dc2b19673bb53610({
            ease: vars.ease || "none",
            lazy: false,
            immediateRender: false,
            time: endTime,
            overwrite: "auto",
            duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || $d1cc397620177a52$var$_tinyNum,
            onStart: function onStart() {
                tl.pause();
                if (!initted) {
                    var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
                    tween._dur !== duration && $d1cc397620177a52$var$_setDuration(tween, duration, 0, 1).render(tween._time, true, true);
                    initted = 1;
                }
                _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
            }
        }, vars));
        return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
        return this.tweenTo(toPosition, $d1cc397620177a52$export$dc2b19673bb53610({
            startAt: {
                time: $d1cc397620177a52$var$_parsePosition(this, fromPosition)
            }
        }, vars));
    };
    _proto2.recent = function recent() {
        return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
        if (afterTime === void 0) afterTime = this._time;
        return $d1cc397620177a52$var$_getLabelInDirection(this, $d1cc397620177a52$var$_parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
        if (beforeTime === void 0) beforeTime = this._time;
        return $d1cc397620177a52$var$_getLabelInDirection(this, $d1cc397620177a52$var$_parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
        return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + $d1cc397620177a52$var$_tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
        if (ignoreBeforeTime === void 0) ignoreBeforeTime = 0;
        var child = this._first, labels = this.labels, p;
        while(child){
            if (child._start >= ignoreBeforeTime) {
                child._start += amount;
                child._end += amount;
            }
            child = child._next;
        }
        if (adjustLabels) {
            for(p in labels)if (labels[p] >= ignoreBeforeTime) labels[p] += amount;
        }
        return $d1cc397620177a52$var$_uncache(this);
    };
    _proto2.invalidate = function invalidate(soft) {
        var child = this._first;
        this._lock = 0;
        while(child){
            child.invalidate(soft);
            child = child._next;
        }
        return _Animation.prototype.invalidate.call(this, soft);
    };
    _proto2.clear = function clear(includeLabels) {
        if (includeLabels === void 0) includeLabels = true;
        var child = this._first, next;
        while(child){
            next = child._next;
            this.remove(child);
            child = next;
        }
        this._dp && (this._time = this._tTime = this._pTime = 0);
        includeLabels && (this.labels = {});
        return $d1cc397620177a52$var$_uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
        var max = 0, self = this, child = self._last, prevStart = $d1cc397620177a52$var$_bigNum, prev, start, parent;
        if (arguments.length) return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
        if (self._dirty) {
            parent = self.parent;
            while(child){
                prev = child._prev; //record it here in case the tween changes position in the sequence...
                child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.
                start = child._start;
                if (start > prevStart && self._sort && child._ts && !self._lock) {
                    //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
                    self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().
                    $d1cc397620177a52$var$_addToTimeline(self, child, start - child._delay, 1)._lock = 0;
                } else prevStart = start;
                if (start < 0 && child._ts) {
                    //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
                    max -= start;
                    if (!parent && !self._dp || parent && parent.smoothChildTiming) {
                        self._start += start / self._ts;
                        self._time -= start;
                        self._tTime -= start;
                    }
                    self.shiftChildren(-start, false, -Infinity);
                    prevStart = 0;
                }
                child._end > max && child._ts && (max = child._end);
                child = prev;
            }
            $d1cc397620177a52$var$_setDuration(self, self === $d1cc397620177a52$var$_globalTimeline && self._time > max ? self._time : max, 1, 1);
            self._dirty = 0;
        }
        return self._tDur;
    };
    Timeline.updateRoot = function updateRoot(time) {
        if ($d1cc397620177a52$var$_globalTimeline._ts) {
            $d1cc397620177a52$var$_lazySafeRender($d1cc397620177a52$var$_globalTimeline, $d1cc397620177a52$var$_parentToChildTotalTime(time, $d1cc397620177a52$var$_globalTimeline));
            $d1cc397620177a52$var$_lastRenderedFrame = $d1cc397620177a52$export$762ed8fbedb691e3.frame;
        }
        if ($d1cc397620177a52$export$762ed8fbedb691e3.frame >= $d1cc397620177a52$var$_nextGCFrame) {
            $d1cc397620177a52$var$_nextGCFrame += $d1cc397620177a52$export$4922bee768729a77.autoSleep || 120;
            var child = $d1cc397620177a52$var$_globalTimeline._first;
            if (!child || !child._ts) {
                if ($d1cc397620177a52$export$4922bee768729a77.autoSleep && $d1cc397620177a52$export$762ed8fbedb691e3._listeners.length < 2) {
                    while(child && !child._ts)child = child._next;
                    child || $d1cc397620177a52$export$762ed8fbedb691e3.sleep();
                }
            }
        }
    };
    return Timeline;
}($d1cc397620177a52$export$c35d437ae5945fcd);
$d1cc397620177a52$export$dc2b19673bb53610($d1cc397620177a52$export$e6a97ba2cae5bb94.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var $d1cc397620177a52$var$_addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
    //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    var pt = new $d1cc397620177a52$export$3a67f7f44b1e838a(this._pt, target, prop, 0, 1, $d1cc397620177a52$export$c5bc8e04394ecb2, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
    pt.b = start;
    pt.e = end;
    start += ""; //ensure values are strings
    end += "";
    if (hasRandom = ~end.indexOf("random(")) end = $d1cc397620177a52$export$d5962a97e3cde94d(end);
    if (stringFilter) {
        a = [
            start,
            end
        ];
        stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
        start = a[0];
        end = a[1];
    }
    startNums = start.match($d1cc397620177a52$var$_complexStringNumExp) || [];
    while(result = $d1cc397620177a52$var$_complexStringNumExp.exec(end)){
        endNum = result[0];
        chunk = end.substring(index, result.index);
        if (color) color = (color + 1) % 5;
        else if (chunk.substr(-5) === "rgba(") color = 1;
        if (endNum !== startNums[matchIndex++]) {
            startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.
            pt._pt = {
                _next: pt._pt,
                p: chunk || matchIndex === 1 ? chunk : ",",
                //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
                s: startNum,
                c: endNum.charAt(1) === "=" ? $d1cc397620177a52$export$dac762bc6301b560(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
                m: color && color < 4 ? Math.round : 0
            };
            index = $d1cc397620177a52$var$_complexStringNumExp.lastIndex;
        }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
    pt.fp = funcParam;
    if ($d1cc397620177a52$export$5a680e28b0b61bc.test(end) || hasRandom) pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    return pt;
}, $d1cc397620177a52$var$_addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
    $d1cc397620177a52$var$_isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop], parsedStart = start !== "get" ? start : !$d1cc397620177a52$var$_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !$d1cc397620177a52$var$_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !$d1cc397620177a52$var$_isFunction(currentValue) ? $d1cc397620177a52$var$_setterPlain : funcParam ? $d1cc397620177a52$var$_setterFuncWithParam : $d1cc397620177a52$var$_setterFunc, pt;
    if ($d1cc397620177a52$export$f664476fd67145ca(end)) {
        if (~end.indexOf("random(")) end = $d1cc397620177a52$export$d5962a97e3cde94d(end);
        if (end.charAt(1) === "=") {
            pt = $d1cc397620177a52$export$dac762bc6301b560(parsedStart, end) + ($d1cc397620177a52$export$65f2564e9a9b9222(parsedStart) || 0);
            if (pt || pt === 0) // to avoid isNaN, like if someone passes in a value like "!= whatever"
            end = pt;
        }
    }
    if (!optional || parsedStart !== end || $d1cc397620177a52$var$_forceAllPropTweens) {
        if (!isNaN(parsedStart * end) && end !== "") {
            // fun fact: any number multiplied by "" is evaluated as the number 0!
            pt = new $d1cc397620177a52$export$3a67f7f44b1e838a(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? $d1cc397620177a52$var$_renderBoolean : $d1cc397620177a52$var$_renderPlain, 0, setter);
            funcParam && (pt.fp = funcParam);
            modifier && pt.modifier(modifier, this, target);
            return this._pt = pt;
        }
        !currentValue && !(prop in target) && $d1cc397620177a52$export$7fb54635790b59a5(prop, end);
        return $d1cc397620177a52$var$_addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || $d1cc397620177a52$export$4922bee768729a77.stringFilter, funcParam);
    }
}, //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
$d1cc397620177a52$var$_processVars = function _processVars(vars, index, target, targets, tween) {
    $d1cc397620177a52$var$_isFunction(vars) && (vars = $d1cc397620177a52$var$_parseFuncOrString(vars, tween, index, target, targets));
    if (!$d1cc397620177a52$var$_isObject(vars) || vars.style && vars.nodeType || $d1cc397620177a52$var$_isArray(vars) || $d1cc397620177a52$var$_isTypedArray(vars)) return $d1cc397620177a52$export$f664476fd67145ca(vars) ? $d1cc397620177a52$var$_parseFuncOrString(vars, tween, index, target, targets) : vars;
    var copy = {}, p;
    for(p in vars)copy[p] = $d1cc397620177a52$var$_parseFuncOrString(vars[p], tween, index, target, targets);
    return copy;
}, $d1cc397620177a52$export$5c457b74208010cf = function _checkPlugin(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if ($d1cc397620177a52$export$d305d8ec5d7c26b8[property] && (plugin = new $d1cc397620177a52$export$d305d8ec5d7c26b8[property]()).init(target, plugin.rawVars ? vars[property] : $d1cc397620177a52$var$_processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
        tween._pt = pt = new $d1cc397620177a52$export$3a67f7f44b1e838a(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
        if (tween !== $d1cc397620177a52$var$_quickTween) {
            ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.
            i = plugin._props.length;
            while(i--)ptLookup[plugin._props[i]] = pt;
        }
    }
    return plugin;
}, $d1cc397620177a52$var$_overwritingTween, //store a reference temporarily so we can avoid overwriting itself.
$d1cc397620177a52$var$_forceAllPropTweens, $d1cc397620177a52$var$_initTween = function _initTween(tween, time, tTime) {
    var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, onUpdateParams = vars.onUpdateParams, callbackScope = vars.callbackScope, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !$d1cc397620177a52$var$_suppressOverwrites, tl = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = $d1cc397620177a52$var$_parseEase(ease, $d1cc397620177a52$var$_defaults.ease);
    tween._yEase = yoyoEase ? $d1cc397620177a52$var$_invertEase($d1cc397620177a52$var$_parseEase(yoyoEase === true ? ease : yoyoEase, $d1cc397620177a52$var$_defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
        //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
        yoyoEase = tween._yEase;
        tween._yEase = tween._ease;
        tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.
    if (!tl || keyframes && !vars.stagger) {
        //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
        harness = targets[0] ? $d1cc397620177a52$export$8b9be379d2de2a39(targets[0]).harness : 0;
        harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.
        cleanVars = $d1cc397620177a52$var$_copyExcluding(vars, $d1cc397620177a52$var$_reservedProps);
        if (prevStartAt) {
            prevStartAt._zTime < 0 && prevStartAt.progress(1); // in case it's a lazy startAt that hasn't rendered yet.
            time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? $d1cc397620177a52$var$_revertConfigNoKill : $d1cc397620177a52$var$_startAtRevertConfig); // if it's a "startAt" (not "from()" or runBackwards: true), we only need to do a shallow revert (keep transforms cached in CSSPlugin)
            // don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.
            prevStartAt._lazy = 0;
        }
        if (startAt) {
            $d1cc397620177a52$var$_removeFromParent(tween._startAt = $d1cc397620177a52$export$208a41d6b4e37b97.set(targets, $d1cc397620177a52$export$dc2b19673bb53610({
                data: "isStart",
                overwrite: false,
                parent: parent,
                immediateRender: true,
                lazy: $d1cc397620177a52$var$_isNotFalse(lazy),
                startAt: null,
                delay: 0,
                onUpdate: onUpdate,
                onUpdateParams: onUpdateParams,
                callbackScope: callbackScope,
                stagger: 0
            }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);
            time < 0 && ($d1cc397620177a52$var$_reverting || !immediateRender && !autoRevert) && tween._startAt.revert($d1cc397620177a52$var$_revertConfigNoKill); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.
            if (immediateRender) {
                if (dur && time <= 0 && tTime <= 0) {
                    // check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
                    time && (tween._zTime = time);
                    return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
                }
            }
        } else if (runBackwards && dur) //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
        {
            if (!prevStartAt) {
                time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
                p = $d1cc397620177a52$export$dc2b19673bb53610({
                    overwrite: false,
                    data: "isFromStart",
                    //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
                    lazy: immediateRender && $d1cc397620177a52$var$_isNotFalse(lazy),
                    immediateRender: immediateRender,
                    //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
                    stagger: 0,
                    parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})
                }, cleanVars);
                harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})
                $d1cc397620177a52$var$_removeFromParent(tween._startAt = $d1cc397620177a52$export$208a41d6b4e37b97.set(targets, p));
                time < 0 && ($d1cc397620177a52$var$_reverting ? tween._startAt.revert($d1cc397620177a52$var$_revertConfigNoKill) : tween._startAt.render(-1, true));
                tween._zTime = time;
                if (!immediateRender) _initTween(tween._startAt, $d1cc397620177a52$var$_tinyNum, $d1cc397620177a52$var$_tinyNum); //ensures that the initial values are recorded
                else if (!time) return;
            }
        }
        tween._pt = tween._ptCache = 0;
        lazy = dur && $d1cc397620177a52$var$_isNotFalse(lazy) || lazy && !dur;
        for(i = 0; i < targets.length; i++){
            target = targets[i];
            gsData = target._gsap || $d1cc397620177a52$var$_harness(targets)[i]._gsap;
            tween._ptLookup[i] = ptLookup = {};
            $d1cc397620177a52$var$_lazyLookup[gsData.id] && $d1cc397620177a52$var$_lazyTweens.length && $d1cc397620177a52$var$_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
            index = fullTargets === targets ? i : fullTargets.indexOf(target);
            if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
                tween._pt = pt = new $d1cc397620177a52$export$3a67f7f44b1e838a(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
                plugin._props.forEach(function(name) {
                    ptLookup[name] = pt;
                });
                plugin.priority && (hasPriority = 1);
            }
            if (!harness || harnessVars) {
                for(p in cleanVars)if ($d1cc397620177a52$export$d305d8ec5d7c26b8[p] && (plugin = $d1cc397620177a52$export$5c457b74208010cf(p, cleanVars, tween, index, target, fullTargets))) plugin.priority && (hasPriority = 1);
                else ptLookup[p] = pt = $d1cc397620177a52$var$_addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
            tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
            if (autoOverwrite && tween._pt) {
                $d1cc397620177a52$var$_overwritingTween = tween;
                $d1cc397620177a52$var$_globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!
                overwritten = !tween.parent;
                $d1cc397620177a52$var$_overwritingTween = 0;
            }
            tween._pt && lazy && ($d1cc397620177a52$var$_lazyLookup[gsData.id] = 1);
        }
        hasPriority && $d1cc397620177a52$export$eed5824f53346d57(tween);
        tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.
    keyframes && time <= 0 && tl.render($d1cc397620177a52$var$_bigNum, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
}, $d1cc397620177a52$var$_updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i;
    if (!ptCache) {
        ptCache = tween._ptCache[property] = [];
        lookup = tween._ptLookup;
        i = tween._targets.length;
        while(i--){
            pt = lookup[i][property];
            if (pt && pt.d && pt.d._pt) {
                // it's a plugin, so find the nested PropTween
                pt = pt.d._pt;
                while(pt && pt.p !== property && pt.fp !== property)// "fp" is functionParam for things like setting CSS variables which require .setProperty("--var-name", value)
                pt = pt._next;
            }
            if (!pt) {
                // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
                // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
                $d1cc397620177a52$var$_forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.
                tween.vars[property] = "+=0";
                $d1cc397620177a52$var$_initTween(tween, time);
                $d1cc397620177a52$var$_forceAllPropTweens = 0;
                return 1;
            }
            ptCache.push(pt);
        }
    }
    i = ptCache.length;
    while(i--){
        rootPT = ptCache[i];
        pt = rootPT._pt || rootPT; // complex values may have nested PropTweens. We only accommodate the FIRST value.
        pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
        pt.c = value - pt.s;
        rootPT.e && (rootPT.e = $d1cc397620177a52$export$9c8d725d65e13f94(value) + $d1cc397620177a52$export$65f2564e9a9b9222(rootPT.e)); // mainly for CSSPlugin (end value)
        rootPT.b && (rootPT.b = pt.s + $d1cc397620177a52$export$65f2564e9a9b9222(rootPT.b)); // (beginning value)
    }
}, $d1cc397620177a52$var$_addAliasesToVars = function _addAliasesToVars(targets, vars) {
    var harness = targets[0] ? $d1cc397620177a52$export$8b9be379d2de2a39(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
    if (!propertyAliases) return vars;
    copy = $d1cc397620177a52$var$_merge({}, vars);
    for(p in propertyAliases)if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while(i--)copy[aliases[i]] = copy[p];
    }
    return copy;
}, // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
$d1cc397620177a52$var$_parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut", p, a;
    if ($d1cc397620177a52$var$_isArray(obj)) {
        a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease
        obj.forEach(function(value, i) {
            return a.push({
                t: i / (obj.length - 1) * 100,
                v: value,
                e: ease
            });
        });
    } else for(p in obj){
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
            t: parseFloat(prop),
            v: obj[p],
            e: ease
        });
    }
}, $d1cc397620177a52$var$_parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
    return $d1cc397620177a52$var$_isFunction(value) ? value.call(tween, i, target, targets) : $d1cc397620177a52$export$f664476fd67145ca(value) && ~value.indexOf("random(") ? $d1cc397620177a52$export$d5962a97e3cde94d(value) : value;
}, $d1cc397620177a52$var$_staggerTweenProps = $d1cc397620177a52$var$_callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", $d1cc397620177a52$var$_staggerPropsToSkip = {};
$d1cc397620177a52$export$f9000b814859f126($d1cc397620177a52$var$_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
    return $d1cc397620177a52$var$_staggerPropsToSkip[name] = 1;
});
var $d1cc397620177a52$export$208a41d6b4e37b97 = /*#__PURE__*/ function(_Animation2) {
    $d1cc397620177a52$var$_inheritsLoose(Tween, _Animation2);
    function Tween(targets, vars, position, skipInherit) {
        var _this3;
        if (typeof vars === "number") {
            position.duration = vars;
            vars = position;
            position = null;
        }
        _this3 = _Animation2.call(this, skipInherit ? vars : $d1cc397620177a52$var$_inheritDefaults(vars)) || this;
        var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || $d1cc397620177a52$var$_globalTimeline, parsedTargets = ($d1cc397620177a52$var$_isArray(targets) || $d1cc397620177a52$var$_isTypedArray(targets) ? $d1cc397620177a52$var$_isNumber(targets[0]) : "length" in vars) ? [
            targets
        ] : $d1cc397620177a52$export$45b10814cc054894(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
        _this3._targets = parsedTargets.length ? $d1cc397620177a52$var$_harness(parsedTargets) : $d1cc397620177a52$var$_warn("GSAP target " + targets + " not found. https://greensock.com", !$d1cc397620177a52$export$4922bee768729a77.nullTargetWarn) || [];
        _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property
        _this3._overwrite = overwrite;
        if (keyframes || stagger || $d1cc397620177a52$var$_isFuncOrString(duration) || $d1cc397620177a52$var$_isFuncOrString(delay)) {
            vars = _this3.vars;
            tl = _this3.timeline = new $d1cc397620177a52$export$e6a97ba2cae5bb94({
                data: "nested",
                defaults: defaults || {},
                targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
            }); // we need to store the targets because for staggers and keyframes, we end up creating an individual tween for each but function-based values need to know the index and the whole Array of targets.
            tl.kill();
            tl.parent = tl._dp = $d1cc397620177a52$var$_assertThisInitialized(_this3);
            tl._start = 0;
            if (stagger || $d1cc397620177a52$var$_isFuncOrString(duration) || $d1cc397620177a52$var$_isFuncOrString(delay)) {
                l = parsedTargets.length;
                staggerFunc = stagger && $d1cc397620177a52$export$f02a9ddbe4480f19(stagger);
                if ($d1cc397620177a52$var$_isObject(stagger)) {
                    //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
                    for(p in stagger)if (~$d1cc397620177a52$var$_staggerTweenProps.indexOf(p)) {
                        staggerVarsToMerge || (staggerVarsToMerge = {});
                        staggerVarsToMerge[p] = stagger[p];
                    }
                }
                for(i = 0; i < l; i++){
                    copy = $d1cc397620177a52$var$_copyExcluding(vars, $d1cc397620177a52$var$_staggerPropsToSkip);
                    copy.stagger = 0;
                    yoyoEase && (copy.yoyoEase = yoyoEase);
                    staggerVarsToMerge && $d1cc397620177a52$var$_merge(copy, staggerVarsToMerge);
                    curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.
                    copy.duration = +$d1cc397620177a52$var$_parseFuncOrString(duration, $d1cc397620177a52$var$_assertThisInitialized(_this3), i, curTarget, parsedTargets);
                    copy.delay = (+$d1cc397620177a52$var$_parseFuncOrString(delay, $d1cc397620177a52$var$_assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
                    if (!stagger && l === 1 && copy.delay) {
                        // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
                        _this3._delay = delay = copy.delay;
                        _this3._start += delay;
                        copy.delay = 0;
                    }
                    tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
                    tl._ease = $d1cc397620177a52$var$_easeMap.none;
                }
                tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
            } else if (keyframes) {
                $d1cc397620177a52$var$_inheritDefaults($d1cc397620177a52$export$dc2b19673bb53610(tl.vars.defaults, {
                    ease: "none"
                }));
                tl._ease = $d1cc397620177a52$var$_parseEase(keyframes.ease || vars.ease || "none");
                var time = 0, a, kf, v;
                if ($d1cc397620177a52$var$_isArray(keyframes)) {
                    keyframes.forEach(function(frame) {
                        return tl.to(parsedTargets, frame, ">");
                    });
                    tl.duration(); // to ensure tl._dur is cached because we tap into it for performance purposes in the render() method.
                } else {
                    copy = {};
                    for(p in keyframes)p === "ease" || p === "easeEach" || $d1cc397620177a52$var$_parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
                    for(p in copy){
                        a = copy[p].sort(function(a, b) {
                            return a.t - b.t;
                        });
                        time = 0;
                        for(i = 0; i < a.length; i++){
                            kf = a[i];
                            v = {
                                ease: kf.e,
                                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                            };
                            v[p] = kf.v;
                            tl.to(parsedTargets, v, time);
                            time += v.duration;
                        }
                    }
                    tl.duration() < duration && tl.to({}, {
                        duration: duration - tl.duration()
                    }); // in case keyframes didn't go to 100%
                }
            }
            duration || _this3.duration(duration = tl.duration());
        } else _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
        if (overwrite === true && !$d1cc397620177a52$var$_suppressOverwrites) {
            $d1cc397620177a52$var$_overwritingTween = $d1cc397620177a52$var$_assertThisInitialized(_this3);
            $d1cc397620177a52$var$_globalTimeline.killTweensOf(parsedTargets);
            $d1cc397620177a52$var$_overwritingTween = 0;
        }
        $d1cc397620177a52$var$_addToTimeline(parent, $d1cc397620177a52$var$_assertThisInitialized(_this3), position);
        vars.reversed && _this3.reverse();
        vars.paused && _this3.paused(true);
        if (immediateRender || !duration && !keyframes && _this3._start === $d1cc397620177a52$var$_roundPrecise(parent._time) && $d1cc397620177a52$var$_isNotFalse(immediateRender) && $d1cc397620177a52$var$_hasNoPausedAncestors($d1cc397620177a52$var$_assertThisInitialized(_this3)) && parent.data !== "nested") {
            _this3._tTime = -$d1cc397620177a52$var$_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
            _this3.render(Math.max(0, -delay) || 0); //in case delay is negative
        }
        scrollTrigger && $d1cc397620177a52$var$_scrollTrigger($d1cc397620177a52$var$_assertThisInitialized(_this3), scrollTrigger);
        return _this3;
    }
    var _proto3 = Tween.prototype;
    _proto3.render = function render(totalTime, suppressEvents, force) {
        var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - $d1cc397620177a52$var$_tinyNum && !isNegative ? tDur : totalTime < $d1cc397620177a52$var$_tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline, yoyoEase;
        if (!dur) $d1cc397620177a52$var$_renderZeroDurationTween(this, totalTime, suppressEvents, force);
        else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
            //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
            time = tTime;
            timeline = this.timeline;
            if (this._repeat) {
                //adjust the time for repeats and yoyos
                cycleDuration = dur + this._rDelay;
                if (this._repeat < -1 && isNegative) return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
                time = $d1cc397620177a52$var$_roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)
                if (tTime === tDur) {
                    // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
                    iteration = this._repeat;
                    time = dur;
                } else {
                    iteration = ~~(tTime / cycleDuration);
                    if (iteration && iteration === tTime / cycleDuration) {
                        time = dur;
                        iteration--;
                    }
                    time > dur && (time = dur);
                }
                isYoyo = this._yoyo && iteration & 1;
                if (isYoyo) {
                    yoyoEase = this._yEase;
                    time = dur - time;
                }
                prevIteration = $d1cc397620177a52$var$_animationCycle(this._tTime, cycleDuration);
                if (time === prevTime && !force && this._initted) {
                    //could be during the repeatDelay part. No need to render and fire callbacks.
                    this._tTime = tTime;
                    return this;
                }
                if (iteration !== prevIteration) {
                    timeline && this._yEase && $d1cc397620177a52$var$_propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality
                    if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
                        this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.
                        this.render($d1cc397620177a52$var$_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
                    }
                }
            }
            if (!this._initted) {
                if ($d1cc397620177a52$var$_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
                    this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.
                    return this;
                }
                if (prevTime !== this._time) // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
                return this;
                if (dur !== this._dur) // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
                return this.render(totalTime, suppressEvents, force);
            }
            this._tTime = tTime;
            this._time = time;
            if (!this._act && this._ts) {
                this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.
                this._lazy = 0;
            }
            this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
            if (this._from) this.ratio = ratio = 1 - ratio;
            if (time && !prevTime && !suppressEvents) {
                $d1cc397620177a52$var$_callback(this, "onStart");
                if (this._tTime !== tTime) // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
                return this;
            }
            pt = this._pt;
            while(pt){
                pt.r(ratio, pt.d);
                pt = pt._next;
            }
            timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -$d1cc397620177a52$var$_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
            if (this._onUpdate && !suppressEvents) {
                isNegative && $d1cc397620177a52$var$_rewindStartAt(this, totalTime, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
                $d1cc397620177a52$var$_callback(this, "onUpdate");
            }
            this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && $d1cc397620177a52$var$_callback(this, "onRepeat");
            if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
                isNegative && !this._onUpdate && $d1cc397620177a52$var$_rewindStartAt(this, totalTime, true, true);
                (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && $d1cc397620177a52$var$_removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.
                if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
                    // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
                    $d1cc397620177a52$var$_callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
                    this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                }
            }
        }
        return this;
    };
    _proto3.targets = function targets() {
        return this._targets;
    };
    _proto3.invalidate = function invalidate(soft) {
        // "soft" gives us a way to clear out everything EXCEPT the recorded pre-"from" portion of from() tweens. Otherwise, for example, if you tween.progress(1).render(0, true true).invalidate(), the "from" values would persist and then on the next render, the from() tweens would initialize and the current value would match the "from" values, thus animate from the same value to the same value (no animation). We tap into this in ScrollTrigger's refresh() where we must push a tween to completion and then back again but honor its init state in case the tween is dependent on another tween further up on the page.
        (!soft || !this.vars.runBackwards) && (this._startAt = 0);
        this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
        this._ptLookup = [];
        this.timeline && this.timeline.invalidate(soft);
        return _Animation2.prototype.invalidate.call(this, soft);
    };
    _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
        $d1cc397620177a52$var$_tickerActive || $d1cc397620177a52$export$762ed8fbedb691e3.wake();
        this._ts || this.play();
        var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
        this._initted || $d1cc397620177a52$var$_initTween(this, time);
        ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
        // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
        // if (_isObject(property)) { // performance optimization
        // 	for (p in property) {
        // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
        // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
        // 		}
        // 	}
        // } else {
        if ($d1cc397620177a52$var$_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
         //}
        $d1cc397620177a52$var$_alignPlayhead(this, 0);
        this.parent || $d1cc397620177a52$var$_addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
        return this.render(0);
    };
    _proto3.kill = function kill(targets, vars) {
        if (vars === void 0) vars = "all";
        if (!targets && (!vars || vars === "all")) {
            this._lazy = this._pt = 0;
            return this.parent ? $d1cc397620177a52$var$_interrupt(this) : this;
        }
        if (this.timeline) {
            var tDur = this.timeline.totalDuration();
            this.timeline.killTweensOf(targets, vars, $d1cc397620177a52$var$_overwritingTween && $d1cc397620177a52$var$_overwritingTween.vars.overwrite !== true)._first || $d1cc397620177a52$var$_interrupt(this); // if nothing is left tweening, interrupt.
            this.parent && tDur !== this.timeline.totalDuration() && $d1cc397620177a52$var$_setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.
            return this;
        }
        var parsedTargets = this._targets, killingTargets = targets ? $d1cc397620177a52$export$45b10814cc054894(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
        if ((!vars || vars === "all") && $d1cc397620177a52$var$_arraysMatch(parsedTargets, killingTargets)) {
            vars === "all" && (this._pt = 0);
            return $d1cc397620177a52$var$_interrupt(this);
        }
        overwrittenProps = this._op = this._op || [];
        if (vars !== "all") {
            //so people can pass in a comma-delimited list of property names
            if ($d1cc397620177a52$export$f664476fd67145ca(vars)) {
                p = {};
                $d1cc397620177a52$export$f9000b814859f126(vars, function(name) {
                    return p[name] = 1;
                });
                vars = p;
            }
            vars = $d1cc397620177a52$var$_addAliasesToVars(parsedTargets, vars);
        }
        i = parsedTargets.length;
        while(i--)if (~killingTargets.indexOf(parsedTargets[i])) {
            curLookup = propTweenLookup[i];
            if (vars === "all") {
                overwrittenProps[i] = vars;
                props = curLookup;
                curOverwriteProps = {};
            } else {
                curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
                props = vars;
            }
            for(p in props){
                pt = curLookup && curLookup[p];
                if (pt) {
                    if (!("kill" in pt.d) || pt.d.kill(p) === true) $d1cc397620177a52$export$cd008aa6cd8844e3(this, pt, "_pt");
                    delete curLookup[p];
                }
                if (curOverwriteProps !== "all") curOverwriteProps[p] = 1;
            }
        }
        this._initted && !this._pt && firstPT && $d1cc397620177a52$var$_interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
        return this;
    };
    Tween.to = function to(targets, vars) {
        return new Tween(targets, vars, arguments[2]);
    };
    Tween.from = function from(targets, vars) {
        return $d1cc397620177a52$var$_createTweenType(1, arguments);
    };
    Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
        return new Tween(callback, 0, {
            immediateRender: false,
            lazy: false,
            overwrite: false,
            delay: delay,
            onComplete: callback,
            onReverseComplete: callback,
            onCompleteParams: params,
            onReverseCompleteParams: params,
            callbackScope: scope
        }); // we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
    };
    Tween.fromTo = function fromTo(targets, fromVars, toVars) {
        return $d1cc397620177a52$var$_createTweenType(2, arguments);
    };
    Tween.set = function set(targets, vars) {
        vars.duration = 0;
        vars.repeatDelay || (vars.repeat = 0);
        return new Tween(targets, vars);
    };
    Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
        return $d1cc397620177a52$var$_globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween;
}($d1cc397620177a52$export$c35d437ae5945fcd);
$d1cc397620177a52$export$dc2b19673bb53610($d1cc397620177a52$export$208a41d6b4e37b97.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.
$d1cc397620177a52$export$f9000b814859f126("staggerTo,staggerFrom,staggerFromTo", function(name) {
    $d1cc397620177a52$export$208a41d6b4e37b97[name] = function() {
        var tl = new $d1cc397620177a52$export$e6a97ba2cae5bb94(), params = $d1cc397620177a52$var$_slice.call(arguments, 0);
        params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
        return tl[name].apply(tl, params);
    };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */ var $d1cc397620177a52$var$_setterPlain = function _setterPlain(target, property, value) {
    return target[property] = value;
}, $d1cc397620177a52$var$_setterFunc = function _setterFunc(target, property, value) {
    return target[property](value);
}, $d1cc397620177a52$var$_setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
    return target[property](data.fp, value);
}, $d1cc397620177a52$var$_setterAttribute = function _setterAttribute(target, property, value) {
    return target.setAttribute(property, value);
}, $d1cc397620177a52$export$d60fbc1e0278aaf0 = function _getSetter(target, property) {
    return $d1cc397620177a52$var$_isFunction(target[property]) ? $d1cc397620177a52$var$_setterFunc : $d1cc397620177a52$export$a8178c063a9fd3a1(target[property]) && target.setAttribute ? $d1cc397620177a52$var$_setterAttribute : $d1cc397620177a52$var$_setterPlain;
}, $d1cc397620177a52$var$_renderPlain = function _renderPlain(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
}, $d1cc397620177a52$var$_renderBoolean = function _renderBoolean(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
}, $d1cc397620177a52$export$c5bc8e04394ecb2 = function _renderComplexString(ratio, data) {
    var pt = data._pt, s = "";
    if (!ratio && data.b) //b = beginning string
    s = data.b;
    else if (ratio === 1 && data.e) //e = ending string
    s = data.e;
    else {
        while(pt){
            s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.
            pt = pt._next;
        }
        s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
    }
    data.set(data.t, data.p, s, data);
}, $d1cc397620177a52$var$_renderPropTweens = function _renderPropTweens(ratio, data) {
    var pt = data._pt;
    while(pt){
        pt.r(ratio, pt.d);
        pt = pt._next;
    }
}, $d1cc397620177a52$var$_addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
    var pt = this._pt, next;
    while(pt){
        next = pt._next;
        pt.p === property && pt.modifier(modifier, tween, target);
        pt = next;
    }
}, $d1cc397620177a52$var$_killPropTweensOf = function _killPropTweensOf(property) {
    var pt = this._pt, hasNonDependentRemaining, next;
    while(pt){
        next = pt._next;
        if (pt.p === property && !pt.op || pt.op === property) $d1cc397620177a52$export$cd008aa6cd8844e3(this, pt, "_pt");
        else if (!pt.dep) hasNonDependentRemaining = 1;
        pt = next;
    }
    return !hasNonDependentRemaining;
}, $d1cc397620177a52$var$_setterWithModifier = function _setterWithModifier(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
}, $d1cc397620177a52$export$eed5824f53346d57 = function _sortPropTweensByPriority(parent) {
    var pt = parent._pt, next, pt2, first, last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)
    while(pt){
        next = pt._next;
        pt2 = first;
        while(pt2 && pt2.pr > pt.pr)pt2 = pt2._next;
        if (pt._prev = pt2 ? pt2._prev : last) pt._prev._next = pt;
        else first = pt;
        if (pt._next = pt2) pt2._prev = pt;
        else last = pt;
        pt = next;
    }
    parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)
var $d1cc397620177a52$export$3a67f7f44b1e838a = /*#__PURE__*/ function() {
    function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
        this.t = target;
        this.s = start;
        this.c = change;
        this.p = prop;
        this.r = renderer || $d1cc397620177a52$var$_renderPlain;
        this.d = data || this;
        this.set = setter || $d1cc397620177a52$var$_setterPlain;
        this.pr = priority || 0;
        this._next = next;
        if (next) next._prev = this;
    }
    var _proto4 = PropTween.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
        this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)
        this.set = $d1cc397620177a52$var$_setterWithModifier;
        this.m = func;
        this.mt = target; //modifier target
        this.tween = tween;
    };
    return PropTween;
}(); //Initialization tasks
$d1cc397620177a52$export$f9000b814859f126($d1cc397620177a52$var$_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
    return $d1cc397620177a52$var$_reservedProps[name] = 1;
});
$d1cc397620177a52$var$_globals.TweenMax = $d1cc397620177a52$var$_globals.TweenLite = $d1cc397620177a52$export$208a41d6b4e37b97;
$d1cc397620177a52$var$_globals.TimelineLite = $d1cc397620177a52$var$_globals.TimelineMax = $d1cc397620177a52$export$e6a97ba2cae5bb94;
$d1cc397620177a52$var$_globalTimeline = new $d1cc397620177a52$export$e6a97ba2cae5bb94({
    sortChildren: false,
    defaults: $d1cc397620177a52$var$_defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
});
$d1cc397620177a52$export$4922bee768729a77.stringFilter = $d1cc397620177a52$export$7eb2e5eb5eeb96a4;
var $d1cc397620177a52$var$_media = [], $d1cc397620177a52$var$_listeners = {}, $d1cc397620177a52$var$_emptyArray = [], $d1cc397620177a52$var$_lastMediaTime = 0, $d1cc397620177a52$var$_dispatch = function _dispatch(type) {
    return ($d1cc397620177a52$var$_listeners[type] || $d1cc397620177a52$var$_emptyArray).map(function(f) {
        return f();
    });
}, $d1cc397620177a52$var$_onMediaChange = function _onMediaChange() {
    var time = Date.now(), matches = [];
    if (time - $d1cc397620177a52$var$_lastMediaTime > 2) {
        $d1cc397620177a52$var$_dispatch("matchMediaInit");
        $d1cc397620177a52$var$_media.forEach(function(c) {
            var queries = c.queries, conditions = c.conditions, match, p, anyMatch, toggled;
            for(p in queries){
                match = $d1cc397620177a52$var$_win.matchMedia(queries[p]).matches; // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.
                match && (anyMatch = 1);
                if (match !== conditions[p]) {
                    conditions[p] = match;
                    toggled = 1;
                }
            }
            if (toggled) {
                c.revert();
                anyMatch && matches.push(c);
            }
        });
        $d1cc397620177a52$var$_dispatch("matchMediaRevert");
        matches.forEach(function(c) {
            return c.onMatch(c);
        });
        $d1cc397620177a52$var$_lastMediaTime = time;
        $d1cc397620177a52$var$_dispatch("matchMedia");
    }
};
var $d1cc397620177a52$var$Context = /*#__PURE__*/ function() {
    function Context(func, scope) {
        this.selector = scope && $d1cc397620177a52$export$aea217a45095ce11(scope);
        this.data = [];
        this._r = []; // returned/cleanup functions
        this.isReverted = false;
        func && this.add(func);
    }
    var _proto5 = Context.prototype;
    _proto5.add = function add(name, func, scope) {
        if ($d1cc397620177a52$var$_isFunction(name)) {
            scope = func;
            func = name;
            name = $d1cc397620177a52$var$_isFunction;
        }
        var self = this, f = function f() {
            var prev = $d1cc397620177a52$var$_context, prevSelector = self.selector, result;
            prev && prev !== self && prev.data.push(self);
            scope && (self.selector = $d1cc397620177a52$export$aea217a45095ce11(scope));
            $d1cc397620177a52$var$_context = self;
            result = func.apply(self, arguments);
            $d1cc397620177a52$var$_isFunction(result) && self._r.push(result);
            $d1cc397620177a52$var$_context = prev;
            self.selector = prevSelector;
            self.isReverted = false;
            return result;
        };
        self.last = f;
        return name === $d1cc397620177a52$var$_isFunction ? f(self) : name ? self[name] = f : f;
    };
    _proto5.ignore = function ignore(func) {
        var prev = $d1cc397620177a52$var$_context;
        $d1cc397620177a52$var$_context = null;
        func(this);
        $d1cc397620177a52$var$_context = prev;
    };
    _proto5.getTweens = function getTweens() {
        var a = [];
        this.data.forEach(function(e) {
            return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof $d1cc397620177a52$export$208a41d6b4e37b97 && !(e.parent && e.parent.data === "nested") && a.push(e);
        });
        return a;
    };
    _proto5.clear = function clear() {
        this._r.length = this.data.length = 0;
    };
    _proto5.kill = function kill(revert, matchMedia) {
        var _this4 = this;
        if (revert) {
            var tweens = this.getTweens();
            this.data.forEach(function(t) {
                // Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
                if (t.data === "isFlip") {
                    t.revert();
                    t.getChildren(true, true, false).forEach(function(tween) {
                        return tweens.splice(tweens.indexOf(tween), 1);
                    });
                }
            }); // save as an object so that we can cache the globalTime for each tween to optimize performance during the sort
            tweens.map(function(t) {
                return {
                    g: t.globalTime(0),
                    t: t
                };
            }).sort(function(a, b) {
                return b.g - a.g || -1;
            }).forEach(function(o) {
                return o.t.revert(revert);
            }); // note: all of the _startAt tweens should be reverted in reverse order that thy were created, and they'll all have the same globalTime (-1) so the " || -1" in the sort keeps the order properly.
            this.data.forEach(function(e) {
                return !(e instanceof $d1cc397620177a52$export$c35d437ae5945fcd) && e.revert && e.revert(revert);
            });
            this._r.forEach(function(f) {
                return f(revert, _this4);
            });
            this.isReverted = true;
        } else this.data.forEach(function(e) {
            return e.kill && e.kill();
        });
        this.clear();
        if (matchMedia) {
            var i = $d1cc397620177a52$var$_media.indexOf(this);
            !!~i && $d1cc397620177a52$var$_media.splice(i, 1);
        }
    };
    _proto5.revert = function revert(config) {
        this.kill(config || {});
    };
    return Context;
}();
var $d1cc397620177a52$var$MatchMedia = /*#__PURE__*/ function() {
    function MatchMedia(scope) {
        this.contexts = [];
        this.scope = scope;
    }
    var _proto6 = MatchMedia.prototype;
    _proto6.add = function add(conditions, func, scope) {
        $d1cc397620177a52$var$_isObject(conditions) || (conditions = {
            matches: conditions
        });
        var context = new $d1cc397620177a52$var$Context(0, scope || this.scope), cond = context.conditions = {}, mq, p, active;
        this.contexts.push(context);
        func = context.add("onMatch", func);
        context.queries = conditions;
        for(p in conditions)if (p === "all") active = 1;
        else {
            mq = $d1cc397620177a52$var$_win.matchMedia(conditions[p]);
            if (mq) {
                $d1cc397620177a52$var$_media.indexOf(context) < 0 && $d1cc397620177a52$var$_media.push(context);
                (cond[p] = mq.matches) && (active = 1);
                mq.addListener ? mq.addListener($d1cc397620177a52$var$_onMediaChange) : mq.addEventListener("change", $d1cc397620177a52$var$_onMediaChange);
            }
        }
        active && func(context);
        return this;
    } // refresh() {
    ;
    _proto6.revert = function revert(config) {
        this.kill(config || {});
    };
    _proto6.kill = function kill(revert) {
        this.contexts.forEach(function(c) {
            return c.kill(revert, true);
        });
    };
    return MatchMedia;
}();
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */ var $d1cc397620177a52$var$_gsap = {
    registerPlugin: function registerPlugin() {
        for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)args[_key2] = arguments[_key2];
        args.forEach(function(config) {
            return $d1cc397620177a52$var$_createPlugin(config);
        });
    },
    timeline: function timeline(vars) {
        return new $d1cc397620177a52$export$e6a97ba2cae5bb94(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
        return $d1cc397620177a52$var$_globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
        $d1cc397620177a52$export$f664476fd67145ca(target) && (target = $d1cc397620177a52$export$45b10814cc054894(target)[0]); //in case selector text or an array is passed in
        var getter = $d1cc397620177a52$export$8b9be379d2de2a39(target || {}).get, format = unit ? $d1cc397620177a52$var$_passThrough : $d1cc397620177a52$var$_numericIfPossible;
        unit === "native" && (unit = "");
        return !target ? target : !property ? function(property, unit, uncache) {
            return format(($d1cc397620177a52$export$d305d8ec5d7c26b8[property] && $d1cc397620177a52$export$d305d8ec5d7c26b8[property].get || getter)(target, property, unit, uncache));
        } : format(($d1cc397620177a52$export$d305d8ec5d7c26b8[property] && $d1cc397620177a52$export$d305d8ec5d7c26b8[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
        target = $d1cc397620177a52$export$45b10814cc054894(target);
        if (target.length > 1) {
            var setters = target.map(function(t) {
                return $d1cc397620177a52$export$99ee26438460406a.quickSetter(t, property, unit);
            }), l = setters.length;
            return function(value) {
                var i = l;
                while(i--)setters[i](value);
            };
        }
        target = target[0] || {};
        var Plugin = $d1cc397620177a52$export$d305d8ec5d7c26b8[property], cache = $d1cc397620177a52$export$8b9be379d2de2a39(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, // in case it's an alias, like "rotate" for "rotation".
        setter = Plugin ? function(value) {
            var p = new Plugin();
            $d1cc397620177a52$var$_quickTween._pt = 0;
            p.init(target, unit ? value + unit : value, $d1cc397620177a52$var$_quickTween, 0, [
                target
            ]);
            p.render(1, p);
            $d1cc397620177a52$var$_quickTween._pt && $d1cc397620177a52$var$_renderPropTweens(1, $d1cc397620177a52$var$_quickTween);
        } : cache.set(target, p);
        return Plugin ? setter : function(value) {
            return setter(target, p, unit ? value + unit : value, cache, 1);
        };
    },
    quickTo: function quickTo(target, property, vars) {
        var _merge2;
        var tween = $d1cc397620177a52$export$99ee26438460406a.to(target, $d1cc397620177a52$var$_merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})), func = function func(value, start, startIsRelative) {
            return tween.resetTo(property, value, start, startIsRelative);
        };
        func.tween = tween;
        return func;
    },
    isTweening: function isTweening(targets) {
        return $d1cc397620177a52$var$_globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
        value && value.ease && (value.ease = $d1cc397620177a52$var$_parseEase(value.ease, $d1cc397620177a52$var$_defaults.ease));
        return $d1cc397620177a52$var$_mergeDeep($d1cc397620177a52$var$_defaults, value || {});
    },
    config: function config(value) {
        return $d1cc397620177a52$var$_mergeDeep($d1cc397620177a52$export$4922bee768729a77, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
        var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
        (plugins || "").split(",").forEach(function(pluginName) {
            return pluginName && !$d1cc397620177a52$export$d305d8ec5d7c26b8[pluginName] && !$d1cc397620177a52$var$_globals[pluginName] && $d1cc397620177a52$var$_warn(name + " effect requires " + pluginName + " plugin.");
        });
        $d1cc397620177a52$var$_effects[name] = function(targets, vars, tl) {
            return effect($d1cc397620177a52$export$45b10814cc054894(targets), $d1cc397620177a52$export$dc2b19673bb53610(vars || {}, defaults), tl);
        };
        if (extendTimeline) $d1cc397620177a52$export$e6a97ba2cae5bb94.prototype[name] = function(targets, vars, position) {
            return this.add($d1cc397620177a52$var$_effects[name](targets, $d1cc397620177a52$var$_isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
    },
    registerEase: function registerEase(name, ease) {
        $d1cc397620177a52$var$_easeMap[name] = $d1cc397620177a52$var$_parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
        return arguments.length ? $d1cc397620177a52$var$_parseEase(ease, defaultEase) : $d1cc397620177a52$var$_easeMap;
    },
    getById: function getById(id) {
        return $d1cc397620177a52$var$_globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
        if (vars === void 0) vars = {};
        var tl = new $d1cc397620177a52$export$e6a97ba2cae5bb94(vars), child, next;
        tl.smoothChildTiming = $d1cc397620177a52$var$_isNotFalse(vars.smoothChildTiming);
        $d1cc397620177a52$var$_globalTimeline.remove(tl);
        tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).
        tl._time = tl._tTime = $d1cc397620177a52$var$_globalTimeline._time;
        child = $d1cc397620177a52$var$_globalTimeline._first;
        while(child){
            next = child._next;
            if (includeDelayedCalls || !(!child._dur && child instanceof $d1cc397620177a52$export$208a41d6b4e37b97 && child.vars.onComplete === child._targets[0])) $d1cc397620177a52$var$_addToTimeline(tl, child, child._start - child._delay);
            child = next;
        }
        $d1cc397620177a52$var$_addToTimeline($d1cc397620177a52$var$_globalTimeline, tl, 0);
        return tl;
    },
    context: function context(func, scope) {
        return func ? new $d1cc397620177a52$var$Context(func, scope) : $d1cc397620177a52$var$_context;
    },
    matchMedia: function matchMedia(scope) {
        return new $d1cc397620177a52$var$MatchMedia(scope);
    },
    matchMediaRefresh: function matchMediaRefresh() {
        return $d1cc397620177a52$var$_media.forEach(function(c) {
            var cond = c.conditions, found, p;
            for(p in cond)if (cond[p]) {
                cond[p] = false;
                found = 1;
            }
            found && c.revert();
        }) || $d1cc397620177a52$var$_onMediaChange();
    },
    addEventListener: function addEventListener(type, callback) {
        var a = $d1cc397620177a52$var$_listeners[type] || ($d1cc397620177a52$var$_listeners[type] = []);
        ~a.indexOf(callback) || a.push(callback);
    },
    removeEventListener: function removeEventListener(type, callback) {
        var a = $d1cc397620177a52$var$_listeners[type], i = a && a.indexOf(callback);
        i >= 0 && a.splice(i, 1);
    },
    utils: {
        wrap: $d1cc397620177a52$export$4997ffc0176396a6,
        wrapYoyo: $d1cc397620177a52$export$cfc0b067273edc55,
        distribute: $d1cc397620177a52$export$f02a9ddbe4480f19,
        random: $d1cc397620177a52$export$4385e60b38654f68,
        snap: $d1cc397620177a52$export$51a0620f7a28532b,
        normalize: $d1cc397620177a52$export$a3295358bff77e,
        getUnit: $d1cc397620177a52$export$65f2564e9a9b9222,
        clamp: $d1cc397620177a52$export$7d15b64cf5a3a4c4,
        splitColor: $d1cc397620177a52$export$73d6f35be992df24,
        toArray: $d1cc397620177a52$export$45b10814cc054894,
        selector: $d1cc397620177a52$export$aea217a45095ce11,
        mapRange: $d1cc397620177a52$export$f65a7599bbc6b121,
        pipe: $d1cc397620177a52$export$a4627e546088548d,
        unitize: $d1cc397620177a52$export$d7502930aa5492de,
        interpolate: $d1cc397620177a52$export$89e29e4ab65e70a9,
        shuffle: $d1cc397620177a52$export$448332262467e042
    },
    install: $d1cc397620177a52$var$_install,
    effects: $d1cc397620177a52$var$_effects,
    ticker: $d1cc397620177a52$export$762ed8fbedb691e3,
    updateRoot: $d1cc397620177a52$export$e6a97ba2cae5bb94.updateRoot,
    plugins: $d1cc397620177a52$export$d305d8ec5d7c26b8,
    globalTimeline: $d1cc397620177a52$var$_globalTimeline,
    core: {
        PropTween: $d1cc397620177a52$export$3a67f7f44b1e838a,
        globals: $d1cc397620177a52$var$_addGlobal,
        Tween: $d1cc397620177a52$export$208a41d6b4e37b97,
        Timeline: $d1cc397620177a52$export$e6a97ba2cae5bb94,
        Animation: $d1cc397620177a52$export$c35d437ae5945fcd,
        getCache: $d1cc397620177a52$export$8b9be379d2de2a39,
        _removeLinkedListItem: $d1cc397620177a52$export$cd008aa6cd8844e3,
        reverting: function reverting() {
            return $d1cc397620177a52$var$_reverting;
        },
        context: function context(toAdd) {
            if (toAdd && $d1cc397620177a52$var$_context) {
                $d1cc397620177a52$var$_context.data.push(toAdd);
                toAdd._ctx = $d1cc397620177a52$var$_context;
            }
            return $d1cc397620177a52$var$_context;
        },
        suppressOverwrites: function suppressOverwrites(value) {
            return $d1cc397620177a52$var$_suppressOverwrites = value;
        }
    }
};
$d1cc397620177a52$export$f9000b814859f126("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
    return $d1cc397620177a52$var$_gsap[name] = $d1cc397620177a52$export$208a41d6b4e37b97[name];
});
$d1cc397620177a52$export$762ed8fbedb691e3.add($d1cc397620177a52$export$e6a97ba2cae5bb94.updateRoot);
$d1cc397620177a52$var$_quickTween = $d1cc397620177a52$var$_gsap.to({}, {
    duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------
var $d1cc397620177a52$var$_getPluginPropTween = function _getPluginPropTween(plugin, prop) {
    var pt = plugin._pt;
    while(pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop)pt = pt._next;
    return pt;
}, $d1cc397620177a52$var$_addModifiers = function _addModifiers(tween, modifiers) {
    var targets = tween._targets, p, i, pt;
    for(p in modifiers){
        i = targets.length;
        while(i--){
            pt = tween._ptLookup[i][p];
            if (pt && (pt = pt.d)) {
                if (pt._pt) // is a plugin
                pt = $d1cc397620177a52$var$_getPluginPropTween(pt, p);
                pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
            }
        }
    }
}, $d1cc397620177a52$var$_buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
    return {
        name: name,
        rawVars: 1,
        //don't pre-process function-based values or "random()" strings.
        init: function init(target, vars, tween) {
            tween._onInit = function(tween) {
                var temp, p;
                if ($d1cc397620177a52$export$f664476fd67145ca(vars)) {
                    temp = {};
                    $d1cc397620177a52$export$f9000b814859f126(vars, function(name) {
                        return temp[name] = 1;
                    }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.
                    vars = temp;
                }
                if (modifier) {
                    temp = {};
                    for(p in vars)temp[p] = modifier(vars[p]);
                    vars = temp;
                }
                $d1cc397620177a52$var$_addModifiers(tween, vars);
            };
        }
    };
}; //register core plugins
var $d1cc397620177a52$export$99ee26438460406a = $d1cc397620177a52$var$_gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
        var p, pt, v;
        this.tween = tween;
        for(p in vars){
            v = target.getAttribute(p) || "";
            pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
            pt.op = p;
            pt.b = v; // record the beginning value so we can revert()
            this._props.push(p);
        }
    },
    render: function render(ratio, data) {
        var pt = data._pt;
        while(pt){
            $d1cc397620177a52$var$_reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d); // if reverting, go back to the original (pt.b)
            pt = pt._next;
        }
    }
}, {
    name: "endArray",
    init: function init(target, value) {
        var i = value.length;
        while(i--)this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
    }
}, $d1cc397620177a52$var$_buildModifierPlugin("roundProps", $d1cc397620177a52$export$dd12390e6b265a17), $d1cc397620177a52$var$_buildModifierPlugin("modifiers"), $d1cc397620177a52$var$_buildModifierPlugin("snap", $d1cc397620177a52$export$51a0620f7a28532b)) || $d1cc397620177a52$var$_gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.
$d1cc397620177a52$export$208a41d6b4e37b97.version = $d1cc397620177a52$export$e6a97ba2cae5bb94.version = $d1cc397620177a52$export$99ee26438460406a.version = "3.11.2";
$d1cc397620177a52$var$_coreReady = 1;
$d1cc397620177a52$var$_windowExists() && $d1cc397620177a52$var$_wake();
var $d1cc397620177a52$export$2fae1e8613537d5f = $d1cc397620177a52$var$_easeMap.Power0, $d1cc397620177a52$export$5d84ab4efbecec39 = $d1cc397620177a52$var$_easeMap.Power1, $d1cc397620177a52$export$d8c694b7490ad65d = $d1cc397620177a52$var$_easeMap.Power2, $d1cc397620177a52$export$acebdf2b184a0b6f = $d1cc397620177a52$var$_easeMap.Power3, $d1cc397620177a52$export$42e40a141003d2f0 = $d1cc397620177a52$var$_easeMap.Power4, $d1cc397620177a52$export$cff00ccf6e2392de = $d1cc397620177a52$var$_easeMap.Linear, $d1cc397620177a52$export$7005c9eb6671414d = $d1cc397620177a52$var$_easeMap.Quad, $d1cc397620177a52$export$755261d5a1567778 = $d1cc397620177a52$var$_easeMap.Cubic, $d1cc397620177a52$export$daf531446cad3d2a = $d1cc397620177a52$var$_easeMap.Quart, $d1cc397620177a52$export$4c407d38ce8ad8cc = $d1cc397620177a52$var$_easeMap.Quint, $d1cc397620177a52$export$f301627d437cff88 = $d1cc397620177a52$var$_easeMap.Strong, $d1cc397620177a52$export$56ebabebb04a9ca9 = $d1cc397620177a52$var$_easeMap.Elastic, $d1cc397620177a52$export$25e48ac541203d4a = $d1cc397620177a52$var$_easeMap.Back, $d1cc397620177a52$export$f7a11c7543d81853 = $d1cc397620177a52$var$_easeMap.SteppedEase, $d1cc397620177a52$export$d20e79fdc3899e95 = $d1cc397620177a52$var$_easeMap.Bounce, $d1cc397620177a52$export$bed2d20ad96b784c = $d1cc397620177a52$var$_easeMap.Sine, $d1cc397620177a52$export$41e9d1ff1a2fb15a = $d1cc397620177a52$var$_easeMap.Expo, $d1cc397620177a52$export$ce49a57dd865b86c = $d1cc397620177a52$var$_easeMap.Circ;



var $574adb8b27817578$var$_win, $574adb8b27817578$var$_doc, $574adb8b27817578$var$_docElement, $574adb8b27817578$var$_pluginInitted, $574adb8b27817578$var$_tempDiv, $574adb8b27817578$var$_tempDivStyler, $574adb8b27817578$var$_recentSetterPlugin, $574adb8b27817578$var$_reverting, $574adb8b27817578$var$_windowExists = function _windowExists() {
    return typeof window !== "undefined";
}, $574adb8b27817578$var$_transformProps = {}, $574adb8b27817578$var$_RAD2DEG = 180 / Math.PI, $574adb8b27817578$var$_DEG2RAD = Math.PI / 180, $574adb8b27817578$var$_atan2 = Math.atan2, $574adb8b27817578$var$_bigNum = 1e8, $574adb8b27817578$var$_capsExp = /([A-Z])/g, $574adb8b27817578$var$_horizontalExp = /(left|right|width|margin|padding|x)/i, $574adb8b27817578$var$_complexExp = /[\s,\(]\S/, $574adb8b27817578$var$_propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
}, $574adb8b27817578$var$_renderCSSProp = function _renderCSSProp(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
}, $574adb8b27817578$var$_renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
}, $574adb8b27817578$var$_renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
}, //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
$574adb8b27817578$var$_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : .5)) + data.u, data);
}, $574adb8b27817578$var$_renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
}, $574adb8b27817578$var$_renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
}, $574adb8b27817578$var$_setterCSSStyle = function _setterCSSStyle(target, property, value) {
    return target.style[property] = value;
}, $574adb8b27817578$var$_setterCSSProp = function _setterCSSProp(target, property, value) {
    return target.style.setProperty(property, value);
}, $574adb8b27817578$var$_setterTransform = function _setterTransform(target, property, value) {
    return target._gsap[property] = value;
}, $574adb8b27817578$var$_setterScale = function _setterScale(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
}, $574adb8b27817578$var$_setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
}, $574adb8b27817578$var$_setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
}, $574adb8b27817578$var$_transformProp = "transform", $574adb8b27817578$var$_transformOriginProp = $574adb8b27817578$var$_transformProp + "Origin", $574adb8b27817578$var$_saveStyle = function _saveStyle(property, isNotCSS) {
    var _this = this;
    var target = this.target, style = target.style;
    if (property in $574adb8b27817578$var$_transformProps) {
        this.tfm = this.tfm || {};
        if (property !== "transform") {
            property = $574adb8b27817578$var$_propertyAliases[property] || property;
            ~property.indexOf(",") ? property.split(",").forEach(function(a) {
                return _this.tfm[a] = $574adb8b27817578$var$_get(target, a);
            }) : this.tfm[property] = target._gsap.x ? target._gsap[property] : $574adb8b27817578$var$_get(target, property); // note: scale would map to "scaleX,scaleY", thus we loop and apply them both.
        }
        if (this.props.indexOf($574adb8b27817578$var$_transformProp) >= 0) return;
        if (target._gsap.svg) {
            this.svgo = target.getAttribute("data-svg-origin");
            this.props.push($574adb8b27817578$var$_transformOriginProp, isNotCSS, "");
        }
        property = $574adb8b27817578$var$_transformProp;
    }
    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
}, $574adb8b27817578$var$_removeIndependentTransforms = function _removeIndependentTransforms(style) {
    if (style.translate) {
        style.removeProperty("translate");
        style.removeProperty("scale");
        style.removeProperty("rotate");
    }
}, $574adb8b27817578$var$_revertStyle = function _revertStyle() {
    var props = this.props, target = this.target, style = target.style, cache = target._gsap, i, p;
    for(i = 0; i < props.length; i += 3)// stored like this: property, isNotCSS, value
    props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].replace($574adb8b27817578$var$_capsExp, "-$1").toLowerCase());
    if (this.tfm) {
        for(p in this.tfm)cache[p] = this.tfm[p];
        if (cache.svg) {
            cache.renderTransform();
            target.setAttribute("data-svg-origin", this.svgo || "");
        }
        i = $574adb8b27817578$var$_reverting();
        if (i && !i.isStart && !style[$574adb8b27817578$var$_transformProp]) {
            $574adb8b27817578$var$_removeIndependentTransforms(style);
            cache.uncache = 1; // if it's a startAt that's being reverted in the _initTween() of the core, we don't need to uncache transforms. This is purely a performance optimization.
        }
    }
}, $574adb8b27817578$var$_getStyleSaver = function _getStyleSaver(target, properties) {
    var saver = {
        target: target,
        props: [],
        revert: $574adb8b27817578$var$_revertStyle,
        save: $574adb8b27817578$var$_saveStyle
    };
    properties && properties.split(",").forEach(function(p) {
        return saver.save(p);
    });
    return saver;
}, $574adb8b27817578$var$_supports3D, $574adb8b27817578$export$a232bb0480ae674a = function _createElement(type, ns) {
    var e = $574adb8b27817578$var$_doc.createElementNS ? $574adb8b27817578$var$_doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : $574adb8b27817578$var$_doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.
    return e.style ? e : $574adb8b27817578$var$_doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
}, $574adb8b27817578$var$_getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace($574adb8b27817578$var$_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, $574adb8b27817578$export$8cbef5dd49a09c8b(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
}, $574adb8b27817578$var$_prefixes = "O,Moz,ms,Ms,Webkit".split(","), $574adb8b27817578$export$8cbef5dd49a09c8b = function _checkPropPrefix(property, element, preferPrefix) {
    var e = element || $574adb8b27817578$var$_tempDiv, s = e.style, i = 5;
    if (property in s && !preferPrefix) return property;
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while((i--) && !($574adb8b27817578$var$_prefixes[i] + property in s));
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? $574adb8b27817578$var$_prefixes[i] : "") + property;
}, $574adb8b27817578$var$_initCore = function _initCore() {
    if ($574adb8b27817578$var$_windowExists() && window.document) {
        $574adb8b27817578$var$_win = window;
        $574adb8b27817578$var$_doc = $574adb8b27817578$var$_win.document;
        $574adb8b27817578$var$_docElement = $574adb8b27817578$var$_doc.documentElement;
        $574adb8b27817578$var$_tempDiv = $574adb8b27817578$export$a232bb0480ae674a("div") || {
            style: {}
        };
        $574adb8b27817578$var$_tempDivStyler = $574adb8b27817578$export$a232bb0480ae674a("div");
        $574adb8b27817578$var$_transformProp = $574adb8b27817578$export$8cbef5dd49a09c8b($574adb8b27817578$var$_transformProp);
        $574adb8b27817578$var$_transformOriginProp = $574adb8b27817578$var$_transformProp + "Origin";
        $574adb8b27817578$var$_tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.
        $574adb8b27817578$var$_supports3D = !!$574adb8b27817578$export$8cbef5dd49a09c8b("perspective");
        $574adb8b27817578$var$_reverting = (0, $d1cc397620177a52$export$99ee26438460406a).core.reverting;
        $574adb8b27817578$var$_pluginInitted = 1;
    }
}, $574adb8b27817578$var$_getBBoxHack = function _getBBoxHack(swapIfPossible) {
    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
    var svg = $574adb8b27817578$export$a232bb0480ae674a("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText, bbox;
    $574adb8b27817578$var$_docElement.appendChild(svg);
    svg.appendChild(this);
    this.style.display = "block";
    if (swapIfPossible) try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox; //store the original
        this.getBBox = _getBBoxHack;
    } catch (e) {}
    else if (this._gsapBBox) bbox = this._gsapBBox();
    if (oldParent) {
        if (oldSibling) oldParent.insertBefore(this, oldSibling);
        else oldParent.appendChild(this);
    }
    $574adb8b27817578$var$_docElement.removeChild(svg);
    this.style.cssText = oldCSS;
    return bbox;
}, $574adb8b27817578$var$_getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
    var i = attributesArray.length;
    while(i--){
        if (target.hasAttribute(attributesArray[i])) return target.getAttribute(attributesArray[i]);
    }
}, $574adb8b27817578$export$41bc7c2d1e04f11b = function _getBBox(target) {
    var bounds;
    try {
        bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
    } catch (error) {
        bounds = $574adb8b27817578$var$_getBBoxHack.call(target, true);
    }
    bounds && (bounds.width || bounds.height) || target.getBBox === $574adb8b27817578$var$_getBBoxHack || (bounds = $574adb8b27817578$var$_getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
        x: +$574adb8b27817578$var$_getAttributeFallbacks(target, [
            "x",
            "cx",
            "x1"
        ]) || 0,
        y: +$574adb8b27817578$var$_getAttributeFallbacks(target, [
            "y",
            "cy",
            "y1"
        ]) || 0,
        width: 0,
        height: 0
    } : bounds;
}, $574adb8b27817578$var$_isSVG = function _isSVG(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && $574adb8b27817578$export$41bc7c2d1e04f11b(e));
}, //reports if the element is an SVG on which getBBox() actually works
$574adb8b27817578$var$_removeProperty = function _removeProperty(target, property) {
    if (property) {
        var style = target.style;
        if (property in $574adb8b27817578$var$_transformProps && property !== $574adb8b27817578$var$_transformOriginProp) property = $574adb8b27817578$var$_transformProp;
        if (style.removeProperty) {
            if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
            property = "-" + property;
            style.removeProperty(property.replace($574adb8b27817578$var$_capsExp, "-$1").toLowerCase());
        } else //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        style.removeAttribute(property);
    }
}, $574adb8b27817578$var$_addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new (0, $d1cc397620177a52$export$3a67f7f44b1e838a)(plugin._pt, target, property, 0, 1, onlySetAtEnd ? $574adb8b27817578$var$_renderNonTweeningValueOnlyAtEnd : $574adb8b27817578$var$_renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
}, $574adb8b27817578$var$_nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
}, $574adb8b27817578$var$_nonStandardLayouts = {
    grid: 1,
    flex: 1
}, //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
$574adb8b27817578$var$_convertToUnit = function _convertToUnit(target, property, value, unit) {
    var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
    style = $574adb8b27817578$var$_tempDiv.style, horizontal = $574adb8b27817578$var$_horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
    if (unit === curUnit || !curValue || $574adb8b27817578$var$_nonConvertibleUnits[unit] || $574adb8b27817578$var$_nonConvertibleUnits[curUnit]) return curValue;
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
    isSVG = target.getCTM && $574adb8b27817578$var$_isSVG(target);
    if ((toPercent || curUnit === "%") && ($574adb8b27817578$var$_transformProps[property] || ~property.indexOf("adius"))) {
        px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
        return (0, $d1cc397620177a52$export$9c8d725d65e13f94)(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) parent = (target.ownerSVGElement || {}).parentNode;
    if (!parent || parent === $574adb8b27817578$var$_doc || !parent.appendChild) parent = $574adb8b27817578$var$_doc.body;
    cache = parent._gsap;
    if (cache && toPercent && cache.width && horizontal && cache.time === (0, $d1cc397620177a52$export$762ed8fbedb691e3).time && !cache.uncache) return (0, $d1cc397620177a52$export$9c8d725d65e13f94)(curValue / cache.width * amount);
    else {
        (toPercent || curUnit === "%") && !$574adb8b27817578$var$_nonStandardLayouts[$574adb8b27817578$var$_getComputedProperty(parent, "display")] && (style.position = $574adb8b27817578$var$_getComputedProperty(target, "position"));
        parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.
        parent.appendChild($574adb8b27817578$var$_tempDiv);
        px = $574adb8b27817578$var$_tempDiv[measureProperty];
        parent.removeChild($574adb8b27817578$var$_tempDiv);
        style.position = "absolute";
        if (horizontal && toPercent) {
            cache = (0, $d1cc397620177a52$export$8b9be379d2de2a39)(parent);
            cache.time = (0, $d1cc397620177a52$export$762ed8fbedb691e3).time;
            cache.width = parent[measureProperty];
        }
    }
    return (0, $d1cc397620177a52$export$9c8d725d65e13f94)(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
}, $574adb8b27817578$var$_get = function _get(target, property, unit, uncache) {
    var value;
    $574adb8b27817578$var$_pluginInitted || $574adb8b27817578$var$_initCore();
    if (property in $574adb8b27817578$var$_propertyAliases && property !== "transform") {
        property = $574adb8b27817578$var$_propertyAliases[property];
        if (~property.indexOf(",")) property = property.split(",")[0];
    }
    if ($574adb8b27817578$var$_transformProps[property] && property !== "transform") {
        value = $574adb8b27817578$var$_parseTransform(target, uncache);
        value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : $574adb8b27817578$var$_firstTwoOnly($574adb8b27817578$var$_getComputedProperty(target, $574adb8b27817578$var$_transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
        value = target.style[property];
        if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) value = $574adb8b27817578$var$_specialProps[property] && $574adb8b27817578$var$_specialProps[property](target, property, unit) || $574adb8b27817578$var$_getComputedProperty(target, property) || (0, $d1cc397620177a52$export$51d6bbe898aef1f9)(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
    return unit && !~(value + "").trim().indexOf(" ") ? $574adb8b27817578$var$_convertToUnit(target, property, value, unit) + unit : value;
}, $574adb8b27817578$var$_tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
    // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    if (!start || start === "none") {
        // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
        var p = $574adb8b27817578$export$8cbef5dd49a09c8b(prop, target, 1), s = p && $574adb8b27817578$var$_getComputedProperty(target, p, 1);
        if (s && s !== start) {
            prop = p;
            start = s;
        } else if (prop === "borderColor") start = $574adb8b27817578$var$_getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
    var pt = new (0, $d1cc397620177a52$export$3a67f7f44b1e838a)(this._pt, target.style, prop, 0, 1, (0, $d1cc397620177a52$export$c5bc8e04394ecb2)), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
    pt.b = start;
    pt.e = end;
    start += ""; // ensure values are strings
    end += "";
    if (end === "auto") {
        target.style[prop] = end;
        end = $574adb8b27817578$var$_getComputedProperty(target, prop) || end;
        target.style[prop] = start;
    }
    a = [
        start,
        end
    ];
    (0, $d1cc397620177a52$export$7eb2e5eb5eeb96a4)(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().
    start = a[0];
    end = a[1];
    startValues = start.match((0, $d1cc397620177a52$export$65c88bbd597e7b0a)) || [];
    endValues = end.match((0, $d1cc397620177a52$export$65c88bbd597e7b0a)) || [];
    if (endValues.length) {
        while(result = (0, $d1cc397620177a52$export$65c88bbd597e7b0a).exec(end)){
            endValue = result[0];
            chunk = end.substring(index, result.index);
            if (color) color = (color + 1) % 5;
            else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") color = 1;
            if (endValue !== (startValue = startValues[matchIndex++] || "")) {
                startNum = parseFloat(startValue) || 0;
                startUnit = startValue.substr((startNum + "").length);
                endValue.charAt(1) === "=" && (endValue = (0, $d1cc397620177a52$export$dac762bc6301b560)(startNum, endValue) + startUnit);
                endNum = parseFloat(endValue);
                endUnit = endValue.substr((endNum + "").length);
                index = (0, $d1cc397620177a52$export$65c88bbd597e7b0a).lastIndex - endUnit.length;
                if (!endUnit) {
                    //if something like "perspective:300" is passed in and we must add a unit to the end
                    endUnit = endUnit || (0, $d1cc397620177a52$export$4922bee768729a77).units[prop] || startUnit;
                    if (index === end.length) {
                        end += endUnit;
                        pt.e += endUnit;
                    }
                }
                if (startUnit !== endUnit) startNum = $574adb8b27817578$var$_convertToUnit(target, prop, startValue, endUnit) || 0;
                 // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.
                pt._pt = {
                    _next: pt._pt,
                    p: chunk || matchIndex === 1 ? chunk : ",",
                    //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
                    s: startNum,
                    c: endNum - startNum,
                    m: color && color < 4 || prop === "zIndex" ? Math.round : 0
                };
            }
        }
        pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
    } else pt.r = prop === "display" && end === "none" ? $574adb8b27817578$var$_renderNonTweeningValueOnlyAtEnd : $574adb8b27817578$var$_renderNonTweeningValue;
    (0, $d1cc397620177a52$export$5a680e28b0b61bc).test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.
    return pt;
}, $574adb8b27817578$var$_keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
}, $574adb8b27817578$var$_convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
    var split = value.split(" "), x = split[0], y = split[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
        //the user provided them in the wrong order, so flip them
        value = x;
        x = y;
        y = value;
    }
    split[0] = $574adb8b27817578$var$_keywordToPercent[x] || x;
    split[1] = $574adb8b27817578$var$_keywordToPercent[y] || y;
    return split.join(" ");
}, $574adb8b27817578$var$_renderClearProps = function _renderClearProps(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
        var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i;
        if (props === "all" || props === true) {
            style.cssText = "";
            clearTransforms = 1;
        } else {
            props = props.split(",");
            i = props.length;
            while(--i > -1){
                prop = props[i];
                if ($574adb8b27817578$var$_transformProps[prop]) {
                    clearTransforms = 1;
                    prop = prop === "transformOrigin" ? $574adb8b27817578$var$_transformOriginProp : $574adb8b27817578$var$_transformProp;
                }
                $574adb8b27817578$var$_removeProperty(target, prop);
            }
        }
        if (clearTransforms) {
            $574adb8b27817578$var$_removeProperty(target, $574adb8b27817578$var$_transformProp);
            if (cache) {
                cache.svg && target.removeAttribute("transform");
                $574adb8b27817578$var$_parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.
                cache.uncache = 1;
                $574adb8b27817578$var$_removeIndependentTransforms(style);
            }
        }
    }
}, // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
$574adb8b27817578$var$_specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
        if (tween.data !== "isFromStart") {
            var pt = plugin._pt = new (0, $d1cc397620177a52$export$3a67f7f44b1e838a)(plugin._pt, target, property, 0, 0, $574adb8b27817578$var$_renderClearProps);
            pt.u = endValue;
            pt.pr = -10;
            pt.tween = tween;
            plugin._props.push(property);
            return 1;
        }
    }
}, /*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */ $574adb8b27817578$var$_identity2DMatrix = [
    1,
    0,
    0,
    1,
    0,
    0
], $574adb8b27817578$var$_rotationalProperties = {}, $574adb8b27817578$var$_isNullTransform = function _isNullTransform(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
}, $574adb8b27817578$var$_getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
    var matrixString = $574adb8b27817578$var$_getComputedProperty(target, $574adb8b27817578$var$_transformProp);
    return $574adb8b27817578$var$_isNullTransform(matrixString) ? $574adb8b27817578$var$_identity2DMatrix : matrixString.substr(7).match((0, $d1cc397620177a52$export$b9d44bb6523120d6)).map((0, $d1cc397620177a52$export$9c8d725d65e13f94));
}, $574adb8b27817578$var$_getMatrix = function _getMatrix(target, force2D) {
    var cache = target._gsap || (0, $d1cc397620177a52$export$8b9be379d2de2a39)(target), style = target.style, matrix = $574adb8b27817578$var$_getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
    if (cache.svg && target.getAttribute("transform")) {
        temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.
        matrix = [
            temp.a,
            temp.b,
            temp.c,
            temp.d,
            temp.e,
            temp.f
        ];
        return matrix.join(",") === "1,0,0,1,0,0" ? $574adb8b27817578$var$_identity2DMatrix : matrix;
    } else if (matrix === $574adb8b27817578$var$_identity2DMatrix && !target.offsetParent && target !== $574adb8b27817578$var$_docElement && !cache.svg) {
        //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
        //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
        temp = style.display;
        style.display = "block";
        parent = target.parentNode;
        if (!parent || !target.offsetParent) {
            // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
            addedToDOM = 1; //flag
            nextSibling = target.nextElementSibling;
            $574adb8b27817578$var$_docElement.appendChild(target); //we must add it to the DOM in order to get values properly
        }
        matrix = $574adb8b27817578$var$_getComputedTransformMatrixAsArray(target);
        temp ? style.display = temp : $574adb8b27817578$var$_removeProperty(target, "display");
        if (addedToDOM) nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : $574adb8b27817578$var$_docElement.removeChild(target);
    }
    return force2D && matrix.length > 6 ? [
        matrix[0],
        matrix[1],
        matrix[4],
        matrix[5],
        matrix[12],
        matrix[13]
    ] : matrix;
}, $574adb8b27817578$var$_applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap, matrix = matrixArray || $574adb8b27817578$var$_getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
    if (!originIsAbsolute) {
        bounds = $574adb8b27817578$export$41bc7c2d1e04f11b(target);
        xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
        yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== $574adb8b27817578$var$_identity2DMatrix && (determinant = a * d - b * c)) {
        //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
        x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
        y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
        xOrigin = x;
        yOrigin = y;
    }
    if (smooth || smooth !== false && cache.smooth) {
        tx = xOrigin - xOriginOld;
        ty = yOrigin - yOriginOld;
        cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
        cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else cache.xOffset = cache.yOffset = 0;
    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[$574adb8b27817578$var$_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).
    if (pluginToAddPropTweensTo) {
        $574adb8b27817578$var$_addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
        $574adb8b27817578$var$_addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
        $574adb8b27817578$var$_addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
        $574adb8b27817578$var$_addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
}, $574adb8b27817578$var$_parseTransform = function _parseTransform(target, uncache) {
    var cache = target._gsap || new (0, $d1cc397620177a52$export$cf10981d5419cad5)(target);
    if ("x" in cache && !uncache && !cache.uncache) return cache;
    var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = $574adb8b27817578$var$_getComputedProperty(target, $574adb8b27817578$var$_transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && $574adb8b27817578$var$_isSVG(target));
    if (cs.translate) {
        // accommodate independent transforms by combining them into normal ones.
        if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") style[$574adb8b27817578$var$_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[$574adb8b27817578$var$_transformProp] !== "none" ? cs[$574adb8b27817578$var$_transformProp] : "");
        style.scale = style.rotate = style.translate = "none";
    }
    matrix = $574adb8b27817578$var$_getMatrix(target, cache.svg);
    if (cache.svg) {
        if (cache.uncache) {
            // if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
            t2 = target.getBBox();
            origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
            t1 = "";
        } else t1 = !uncache && target.getAttribute("data-svg-origin"); //  Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
        $574adb8b27817578$var$_applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }
    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;
    if (matrix !== $574adb8b27817578$var$_identity2DMatrix) {
        a = matrix[0]; //a11
        b = matrix[1]; //a21
        c = matrix[2]; //a31
        d = matrix[3]; //a41
        x = a12 = matrix[4];
        y = a22 = matrix[5]; //2D matrix
        if (matrix.length === 6) {
            scaleX = Math.sqrt(a * a + b * b);
            scaleY = Math.sqrt(d * d + c * c);
            rotation = a || b ? $574adb8b27817578$var$_atan2(b, a) * $574adb8b27817578$var$_RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
            skewX = c || d ? $574adb8b27817578$var$_atan2(c, d) * $574adb8b27817578$var$_RAD2DEG + rotation : 0;
            skewX && (scaleY *= Math.abs(Math.cos(skewX * $574adb8b27817578$var$_DEG2RAD)));
            if (cache.svg) {
                x -= xOrigin - (xOrigin * a + yOrigin * c);
                y -= yOrigin - (xOrigin * b + yOrigin * d);
            } //3D matrix
        } else {
            a32 = matrix[6];
            a42 = matrix[7];
            a13 = matrix[8];
            a23 = matrix[9];
            a33 = matrix[10];
            a43 = matrix[11];
            x = matrix[12];
            y = matrix[13];
            z = matrix[14];
            angle = $574adb8b27817578$var$_atan2(a32, a33);
            rotationX = angle * $574adb8b27817578$var$_RAD2DEG; //rotationX
            if (angle) {
                cos = Math.cos(-angle);
                sin = Math.sin(-angle);
                t1 = a12 * cos + a13 * sin;
                t2 = a22 * cos + a23 * sin;
                t3 = a32 * cos + a33 * sin;
                a13 = a12 * -sin + a13 * cos;
                a23 = a22 * -sin + a23 * cos;
                a33 = a32 * -sin + a33 * cos;
                a43 = a42 * -sin + a43 * cos;
                a12 = t1;
                a22 = t2;
                a32 = t3;
            } //rotationY
            angle = $574adb8b27817578$var$_atan2(-c, a33);
            rotationY = angle * $574adb8b27817578$var$_RAD2DEG;
            if (angle) {
                cos = Math.cos(-angle);
                sin = Math.sin(-angle);
                t1 = a * cos - a13 * sin;
                t2 = b * cos - a23 * sin;
                t3 = c * cos - a33 * sin;
                a43 = d * sin + a43 * cos;
                a = t1;
                b = t2;
                c = t3;
            } //rotationZ
            angle = $574adb8b27817578$var$_atan2(b, a);
            rotation = angle * $574adb8b27817578$var$_RAD2DEG;
            if (angle) {
                cos = Math.cos(angle);
                sin = Math.sin(angle);
                t1 = a * cos + b * sin;
                t2 = a12 * cos + a22 * sin;
                b = b * cos - a * sin;
                a22 = a22 * cos - a12 * sin;
                a = t1;
                a12 = t2;
            }
            if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
                //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
                rotationX = rotation = 0;
                rotationY = 180 - rotationY;
            }
            scaleX = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(Math.sqrt(a * a + b * b + c * c));
            scaleY = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(Math.sqrt(a22 * a22 + a32 * a32));
            angle = $574adb8b27817578$var$_atan2(a12, a22);
            skewX = Math.abs(angle) > 0.0002 ? angle * $574adb8b27817578$var$_RAD2DEG : 0;
            perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
        }
        if (cache.svg) {
            //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
            t1 = target.getAttribute("transform");
            cache.forceCSS = target.setAttribute("transform", "") || !$574adb8b27817578$var$_isNullTransform($574adb8b27817578$var$_getComputedProperty(target, $574adb8b27817578$var$_transformProp));
            t1 && target.setAttribute("transform", t1);
        }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
        if (invertedScaleX) {
            scaleX *= -1;
            skewX += rotation <= 0 ? 180 : -180;
            rotation += rotation <= 0 ? 180 : -180;
        } else {
            scaleY *= -1;
            skewX += skewX <= 0 ? 180 : -180;
        }
    }
    uncache = uncache || cache.uncache;
    cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(scaleX);
    cache.scaleY = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(scaleY);
    cache.rotation = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(rotation) + deg;
    cache.rotationX = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(rotationX) + deg;
    cache.rotationY = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;
    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) style[$574adb8b27817578$var$_transformOriginProp] = $574adb8b27817578$var$_firstTwoOnly(origin);
    cache.xOffset = cache.yOffset = 0;
    cache.force3D = (0, $d1cc397620177a52$export$4922bee768729a77).force3D;
    cache.renderTransform = cache.svg ? $574adb8b27817578$var$_renderSVGTransforms : $574adb8b27817578$var$_supports3D ? $574adb8b27817578$var$_renderCSSTransforms : $574adb8b27817578$var$_renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
}, $574adb8b27817578$var$_firstTwoOnly = function _firstTwoOnly(value) {
    return (value = value.split(" "))[0] + " " + value[1];
}, //for handling transformOrigin values, stripping out the 3rd dimension
$574adb8b27817578$var$_addPxTranslate = function _addPxTranslate(target, start, value) {
    var unit = (0, $d1cc397620177a52$export$65f2564e9a9b9222)(start);
    return (0, $d1cc397620177a52$export$9c8d725d65e13f94)(parseFloat(start) + parseFloat($574adb8b27817578$var$_convertToUnit(target, "x", value + "px", unit))) + unit;
}, $574adb8b27817578$var$_renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;
    $574adb8b27817578$var$_renderCSSTransforms(ratio, cache);
}, $574adb8b27817578$var$_zeroDeg = "0deg", $574adb8b27817578$var$_zeroPx = "0px", $574adb8b27817578$var$_endParenthesis = ") ", $574adb8b27817578$var$_renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
    var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)
    if (zOrigin && (rotationX !== $574adb8b27817578$var$_zeroDeg || rotationY !== $574adb8b27817578$var$_zeroDeg)) {
        var angle = parseFloat(rotationY) * $574adb8b27817578$var$_DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
        angle = parseFloat(rotationX) * $574adb8b27817578$var$_DEG2RAD;
        cos = Math.cos(angle);
        x = $574adb8b27817578$var$_addPxTranslate(target, x, a13 * cos * -zOrigin);
        y = $574adb8b27817578$var$_addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
        z = $574adb8b27817578$var$_addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== $574adb8b27817578$var$_zeroPx) transforms += "perspective(" + transformPerspective + $574adb8b27817578$var$_endParenthesis;
    if (xPercent || yPercent) transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    if (use3D || x !== $574adb8b27817578$var$_zeroPx || y !== $574adb8b27817578$var$_zeroPx || z !== $574adb8b27817578$var$_zeroPx) transforms += z !== $574adb8b27817578$var$_zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + $574adb8b27817578$var$_endParenthesis;
    if (rotation !== $574adb8b27817578$var$_zeroDeg) transforms += "rotate(" + rotation + $574adb8b27817578$var$_endParenthesis;
    if (rotationY !== $574adb8b27817578$var$_zeroDeg) transforms += "rotateY(" + rotationY + $574adb8b27817578$var$_endParenthesis;
    if (rotationX !== $574adb8b27817578$var$_zeroDeg) transforms += "rotateX(" + rotationX + $574adb8b27817578$var$_endParenthesis;
    if (skewX !== $574adb8b27817578$var$_zeroDeg || skewY !== $574adb8b27817578$var$_zeroDeg) transforms += "skew(" + skewX + ", " + skewY + $574adb8b27817578$var$_endParenthesis;
    if (scaleX !== 1 || scaleY !== 1) transforms += "scale(" + scaleX + ", " + scaleY + $574adb8b27817578$var$_endParenthesis;
    target.style[$574adb8b27817578$var$_transformProp] = transforms || "translate(0, 0)";
}, $574adb8b27817578$var$_renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
    var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
        //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
        skewY = parseFloat(skewY);
        skewX += skewY;
        rotation += skewY;
    }
    if (rotation || skewX) {
        rotation *= $574adb8b27817578$var$_DEG2RAD;
        skewX *= $574adb8b27817578$var$_DEG2RAD;
        a11 = Math.cos(rotation) * scaleX;
        a21 = Math.sin(rotation) * scaleX;
        a12 = Math.sin(rotation - skewX) * -scaleY;
        a22 = Math.cos(rotation - skewX) * scaleY;
        if (skewX) {
            skewY *= $574adb8b27817578$var$_DEG2RAD;
            temp = Math.tan(skewX - skewY);
            temp = Math.sqrt(1 + temp * temp);
            a12 *= temp;
            a22 *= temp;
            if (skewY) {
                temp = Math.tan(skewY);
                temp = Math.sqrt(1 + temp * temp);
                a11 *= temp;
                a21 *= temp;
            }
        }
        a11 = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(a11);
        a21 = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(a21);
        a12 = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(a12);
        a22 = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(a22);
    } else {
        a11 = scaleX;
        a22 = scaleY;
        a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
        tx = $574adb8b27817578$var$_convertToUnit(target, "x", x, "px");
        ty = $574adb8b27817578$var$_convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
        tx = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
        ty = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
        //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
        temp = target.getBBox();
        tx = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(tx + xPercent / 100 * temp.width);
        ty = (0, $d1cc397620177a52$export$9c8d725d65e13f94)(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[$574adb8b27817578$var$_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the transform attribute changes!)
}, $574adb8b27817578$var$_addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
    var cap = 360, isString = (0, $d1cc397620177a52$export$f664476fd67145ca)(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? $574adb8b27817578$var$_RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
    if (isString) {
        direction = endValue.split("_")[1];
        if (direction === "short") {
            change %= cap;
            if (change !== change % (cap / 2)) change += change < 0 ? cap : -cap;
        }
        if (direction === "cw" && change < 0) change = (change + cap * $574adb8b27817578$var$_bigNum) % cap - ~~(change / cap) * cap;
        else if (direction === "ccw" && change > 0) change = (change - cap * $574adb8b27817578$var$_bigNum) % cap - ~~(change / cap) * cap;
    }
    plugin._pt = pt = new (0, $d1cc397620177a52$export$3a67f7f44b1e838a)(plugin._pt, target, property, startNum, change, $574adb8b27817578$var$_renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
}, $574adb8b27817578$var$_assign = function _assign(target, source) {
    // Internet Explorer doesn't have Object.assign(), so we recreate it here.
    for(var p in source)target[p] = source[p];
    return target;
}, $574adb8b27817578$var$_addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
    //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
    var startCache = $574adb8b27817578$var$_assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
    if (startCache.svg) {
        startValue = target.getAttribute("transform");
        target.setAttribute("transform", "");
        style[$574adb8b27817578$var$_transformProp] = transforms;
        endCache = $574adb8b27817578$var$_parseTransform(target, 1);
        $574adb8b27817578$var$_removeProperty(target, $574adb8b27817578$var$_transformProp);
        target.setAttribute("transform", startValue);
    } else {
        startValue = getComputedStyle(target)[$574adb8b27817578$var$_transformProp];
        style[$574adb8b27817578$var$_transformProp] = transforms;
        endCache = $574adb8b27817578$var$_parseTransform(target, 1);
        style[$574adb8b27817578$var$_transformProp] = startValue;
    }
    for(p in $574adb8b27817578$var$_transformProps){
        startValue = startCache[p];
        endValue = endCache[p];
        if (startValue !== endValue && exclude.indexOf(p) < 0) {
            //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
            startUnit = (0, $d1cc397620177a52$export$65f2564e9a9b9222)(startValue);
            endUnit = (0, $d1cc397620177a52$export$65f2564e9a9b9222)(endValue);
            startNum = startUnit !== endUnit ? $574adb8b27817578$var$_convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
            endNum = parseFloat(endValue);
            plugin._pt = new (0, $d1cc397620177a52$export$3a67f7f44b1e838a)(plugin._pt, endCache, p, startNum, endNum - startNum, $574adb8b27817578$var$_renderCSSProp);
            plugin._pt.u = endUnit || 0;
            plugin._props.push(p);
        }
    }
    $574adb8b27817578$var$_assign(endCache, startCache);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.
(0, $d1cc397620177a52$export$f9000b814859f126)("padding,margin,Width,Radius", function(name, index) {
    var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [
        t,
        r,
        b,
        l
    ] : [
        t + l,
        t + r,
        b + r,
        b + l
    ]).map(function(side) {
        return index < 2 ? name + side : "border" + side + name;
    });
    $574adb8b27817578$var$_specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
        var a, vars;
        if (arguments.length < 4) {
            // getter, passed target, property, and unit (from _get())
            a = props.map(function(prop) {
                return $574adb8b27817578$var$_get(plugin, prop, property);
            });
            vars = a.join(" ");
            return vars.split(a[0]).length === 5 ? a[0] : vars;
        }
        a = (endValue + "").split(" ");
        vars = {};
        props.forEach(function(prop, i) {
            return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
        });
        plugin.init(target, vars, tween);
    };
});
var $574adb8b27817578$export$855822f522f18eef = {
    name: "css",
    register: $574adb8b27817578$var$_initCore,
    targetTest: function targetTest(target) {
        return target.style && target.nodeType;
    },
    init: function init(target, vars, tween, index, targets) {
        var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps;
        $574adb8b27817578$var$_pluginInitted || $574adb8b27817578$var$_initCore(); // we may call init() multiple times on the same plugin instance, like when adding special properties, so make sure we don't overwrite the revert data or inlineProps
        this.styles = this.styles || $574adb8b27817578$var$_getStyleSaver(target);
        inlineProps = this.styles.props;
        this.tween = tween;
        for(p in vars){
            if (p === "autoRound") continue;
            endValue = vars[p];
            if ((0, $d1cc397620177a52$export$d305d8ec5d7c26b8)[p] && (0, $d1cc397620177a52$export$5c457b74208010cf)(p, vars, tween, index, target, targets)) continue;
            type = typeof endValue;
            specialProp = $574adb8b27817578$var$_specialProps[p];
            if (type === "function") {
                endValue = endValue.call(tween, index, target, targets);
                type = typeof endValue;
            }
            if (type === "string" && ~endValue.indexOf("random(")) endValue = (0, $d1cc397620177a52$export$d5962a97e3cde94d)(endValue);
            if (specialProp) specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
            else if (p.substr(0, 2) === "--") {
                //CSS variable
                startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
                endValue += "";
                (0, $d1cc397620177a52$export$dd733e62515be2bd).lastIndex = 0;
                if (!(0, $d1cc397620177a52$export$dd733e62515be2bd).test(startValue)) {
                    // colors don't have units
                    startUnit = (0, $d1cc397620177a52$export$65f2564e9a9b9222)(startValue);
                    endUnit = (0, $d1cc397620177a52$export$65f2564e9a9b9222)(endValue);
                }
                endUnit ? startUnit !== endUnit && (startValue = $574adb8b27817578$var$_convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
                this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
                props.push(p);
                inlineProps.push(p, 0, style[p]);
            } else if (type !== "undefined") {
                if (startAt && p in startAt) {
                    // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
                    startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
                    (0, $d1cc397620177a52$export$f664476fd67145ca)(startValue) && ~startValue.indexOf("random(") && (startValue = (0, $d1cc397620177a52$export$d5962a97e3cde94d)(startValue));
                    (0, $d1cc397620177a52$export$65f2564e9a9b9222)(startValue + "") || (startValue += (0, $d1cc397620177a52$export$4922bee768729a77).units[p] || (0, $d1cc397620177a52$export$65f2564e9a9b9222)($574adb8b27817578$var$_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.
                    (startValue + "").charAt(1) === "=" && (startValue = $574adb8b27817578$var$_get(target, p)); // can't work with relative values
                } else startValue = $574adb8b27817578$var$_get(target, p);
                startNum = parseFloat(startValue);
                relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
                relative && (endValue = endValue.substr(2));
                endNum = parseFloat(endValue);
                if (p in $574adb8b27817578$var$_propertyAliases) {
                    if (p === "autoAlpha") {
                        //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
                        if (startNum === 1 && $574adb8b27817578$var$_get(target, "visibility") === "hidden" && endNum) //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
                        startNum = 0;
                        inlineProps.push("visibility", 0, style.visibility);
                        $574adb8b27817578$var$_addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
                    }
                    if (p !== "scale" && p !== "transform") {
                        p = $574adb8b27817578$var$_propertyAliases[p];
                        ~p.indexOf(",") && (p = p.split(",")[0]);
                    }
                }
                isTransformRelated = p in $574adb8b27817578$var$_transformProps; //--- TRANSFORM-RELATED ---
                if (isTransformRelated) {
                    this.styles.save(p);
                    if (!transformPropTween) {
                        cache = target._gsap;
                        cache.renderTransform && !vars.parseTransform || $574adb8b27817578$var$_parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.
                        smooth = vars.smoothOrigin !== false && cache.smooth;
                        transformPropTween = this._pt = new (0, $d1cc397620177a52$export$3a67f7f44b1e838a)(this._pt, style, $574adb8b27817578$var$_transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)
                        transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
                    }
                    if (p === "scale") {
                        this._pt = new (0, $d1cc397620177a52$export$3a67f7f44b1e838a)(this._pt, cache, "scaleY", startNum, (relative ? (0, $d1cc397620177a52$export$dac762bc6301b560)(startNum, relative + endNum) : endNum) - startNum || 0, $574adb8b27817578$var$_renderCSSProp);
                        this._pt.u = 0;
                        props.push("scaleY", p);
                        p += "X";
                    } else if (p === "transformOrigin") {
                        inlineProps.push($574adb8b27817578$var$_transformOriginProp, 0, style[$574adb8b27817578$var$_transformOriginProp]);
                        endValue = $574adb8b27817578$var$_convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.
                        if (cache.svg) $574adb8b27817578$var$_applySVGOrigin(target, endValue, 0, smooth, 0, this);
                        else {
                            endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!
                            endUnit !== cache.zOrigin && $574adb8b27817578$var$_addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                            $574adb8b27817578$var$_addNonTweeningPT(this, style, p, $574adb8b27817578$var$_firstTwoOnly(startValue), $574adb8b27817578$var$_firstTwoOnly(endValue));
                        }
                        continue;
                    } else if (p === "svgOrigin") {
                        $574adb8b27817578$var$_applySVGOrigin(target, endValue, 1, smooth, 0, this);
                        continue;
                    } else if (p in $574adb8b27817578$var$_rotationalProperties) {
                        $574adb8b27817578$var$_addRotationalPropTween(this, cache, p, startNum, relative ? (0, $d1cc397620177a52$export$dac762bc6301b560)(startNum, relative + endValue) : endValue);
                        continue;
                    } else if (p === "smoothOrigin") {
                        $574adb8b27817578$var$_addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
                        continue;
                    } else if (p === "force3D") {
                        cache[p] = endValue;
                        continue;
                    } else if (p === "transform") {
                        $574adb8b27817578$var$_addRawTransformPTs(this, endValue, target);
                        continue;
                    }
                } else if (!(p in style)) p = $574adb8b27817578$export$8cbef5dd49a09c8b(p) || p;
                if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !$574adb8b27817578$var$_complexExp.test(endValue) && p in style) {
                    startUnit = (startValue + "").substr((startNum + "").length);
                    endNum || (endNum = 0); // protect against NaN
                    endUnit = (0, $d1cc397620177a52$export$65f2564e9a9b9222)(endValue) || (p in (0, $d1cc397620177a52$export$4922bee768729a77).units ? (0, $d1cc397620177a52$export$4922bee768729a77).units[p] : startUnit);
                    startUnit !== endUnit && (startNum = $574adb8b27817578$var$_convertToUnit(target, p, startValue, endUnit));
                    this._pt = new (0, $d1cc397620177a52$export$3a67f7f44b1e838a)(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? (0, $d1cc397620177a52$export$dac762bc6301b560)(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? $574adb8b27817578$var$_renderRoundedCSSProp : $574adb8b27817578$var$_renderCSSProp);
                    this._pt.u = endUnit || 0;
                    if (startUnit !== endUnit && endUnit !== "%") {
                        //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
                        this._pt.b = startValue;
                        this._pt.r = $574adb8b27817578$var$_renderCSSPropWithBeginning;
                    }
                } else if (!(p in style)) {
                    if (p in target) //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
                    this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
                    else {
                        (0, $d1cc397620177a52$export$7fb54635790b59a5)(p, endValue);
                        continue;
                    }
                } else $574adb8b27817578$var$_tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
                isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
                props.push(p);
            }
        }
        hasPriority && (0, $d1cc397620177a52$export$eed5824f53346d57)(this);
    },
    render: function render(ratio, data) {
        if (data.tween._time || !$574adb8b27817578$var$_reverting()) {
            var pt = data._pt;
            while(pt){
                pt.r(ratio, pt.d);
                pt = pt._next;
            }
        } else data.styles.revert();
    },
    get: $574adb8b27817578$var$_get,
    aliases: $574adb8b27817578$var$_propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
        //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
        var p = $574adb8b27817578$var$_propertyAliases[property];
        p && p.indexOf(",") < 0 && (property = p);
        return property in $574adb8b27817578$var$_transformProps && property !== $574adb8b27817578$var$_transformOriginProp && (target._gsap.x || $574adb8b27817578$var$_get(target, "x")) ? plugin && $574adb8b27817578$var$_recentSetterPlugin === plugin ? property === "scale" ? $574adb8b27817578$var$_setterScale : $574adb8b27817578$var$_setterTransform : ($574adb8b27817578$var$_recentSetterPlugin = plugin || {}, property === "scale" ? $574adb8b27817578$var$_setterScaleWithRender : $574adb8b27817578$var$_setterTransformWithRender) : target.style && !(0, $d1cc397620177a52$export$a8178c063a9fd3a1)(target.style[property]) ? $574adb8b27817578$var$_setterCSSStyle : ~property.indexOf("-") ? $574adb8b27817578$var$_setterCSSProp : (0, $d1cc397620177a52$export$d60fbc1e0278aaf0)(target, property);
    },
    core: {
        _removeProperty: $574adb8b27817578$var$_removeProperty,
        _getMatrix: $574adb8b27817578$var$_getMatrix
    }
};
(0, $d1cc397620177a52$export$99ee26438460406a).utils.checkPrefix = $574adb8b27817578$export$8cbef5dd49a09c8b;
(0, $d1cc397620177a52$export$99ee26438460406a).core.getStyleSaver = $574adb8b27817578$var$_getStyleSaver;
(function(positionAndScale, rotation, others, aliases) {
    var all = (0, $d1cc397620177a52$export$f9000b814859f126)(positionAndScale + "," + rotation + "," + others, function(name) {
        $574adb8b27817578$var$_transformProps[name] = 1;
    });
    (0, $d1cc397620177a52$export$f9000b814859f126)(rotation, function(name) {
        (0, $d1cc397620177a52$export$4922bee768729a77).units[name] = "deg";
        $574adb8b27817578$var$_rotationalProperties[name] = 1;
    });
    $574adb8b27817578$var$_propertyAliases[all[13]] = positionAndScale + "," + rotation;
    (0, $d1cc397620177a52$export$f9000b814859f126)(aliases, function(name) {
        var split = name.split(":");
        $574adb8b27817578$var$_propertyAliases[split[1]] = all[split[0]];
    });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
(0, $d1cc397620177a52$export$f9000b814859f126)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
    (0, $d1cc397620177a52$export$4922bee768729a77).units[name] = "px";
});
(0, $d1cc397620177a52$export$99ee26438460406a).registerPlugin($574adb8b27817578$export$855822f522f18eef);


var $c79ce6d7448420a8$export$99ee26438460406a = (0, $d1cc397620177a52$export$99ee26438460406a).registerPlugin((0, $574adb8b27817578$export$855822f522f18eef)) || (0, $d1cc397620177a52$export$99ee26438460406a), // to protect from tree shaking
$c79ce6d7448420a8$export$7b23975ad686bf91 = $c79ce6d7448420a8$export$99ee26438460406a.core.Tween;


class $733a48b7a3883fed$export$fed190818166dddb {
    /**
	 * Simulates a loading progress.
	 * @param {Function} onProgressComplete callback
	 * @return {GSAP Timeline}
	 */ onComplete(onProgressComplete) {
        return (0, $c79ce6d7448420a8$export$99ee26438460406a).timeline().to(this.progressVal, {
            duration: 1.5,
            ease: "steps(14)",
            value: 100,
            onUpdate: ()=>this.DOM.el.innerHTML = Math.floor(this.progressVal.value) + "%",
            onComplete: onProgressComplete
        })// then hide it
        .to(this.DOM.el, {
            duration: 0.7,
            ease: "power3.inOut",
            opacity: 0
        });
    }
    /**
	 * Constructor.
	 * @param {Element} DOM_el
	 */ constructor(DOM_el){
        // DOM elements
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "DOM", {
            // Main element
            el: null
        });
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "progressVal", {
            value: 0
        });
        this.DOM.el = DOM_el;
    }
}



/**
 * SplitType
 * https://github.com/lukePeavey/SplitType
 * @version 0.2.5
 * @author Luke Peavey <lwpeavey@gmail.com>
 */ function $5cf480e2da466646$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $5cf480e2da466646$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $5cf480e2da466646$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $5cf480e2da466646$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $5cf480e2da466646$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}
/**
 * Shallow merges the properties of an object with the target object. Only
 * includes properties that exist on the target object. Non-writable properties
 * on the target object will not be over-written.
 *
 * @param {Object} target
 * @param {Object} object
 */ function $5cf480e2da466646$var$extend(target, object) {
    return Object.getOwnPropertyNames(Object(target)).reduce(function(extended, key) {
        var currentValue = Object.getOwnPropertyDescriptor(Object(target), key);
        var newValue = Object.getOwnPropertyDescriptor(Object(object), key);
        return Object.defineProperty(extended, key, newValue || currentValue);
    }, {});
}
/**
 * Parses user supplied settings objects.
 */ function $5cf480e2da466646$var$parseSettings(settings) {
    var object = $5cf480e2da466646$var$extend(settings);
    if (object.types || object.split) // Support `split` as an alias for `types`
    object.types = object.types || object.split;
    if (object.absolute || object.position) // Support `position: absolute` as alias for `absolute: true`
    object.absolute = object.absolute || /absolute/.test(settings.position);
    return object;
}
/**
 * Returns true if `value` is a non-null object.
 * @param {any} value
 * @return {boolean}
 */ function $5cf480e2da466646$var$isObject(value) {
    return value !== null && typeof value === "object";
}
/**
 * Checks if `value` is a valid array-like length.
 * Original source: Lodash
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3)
 * // => true
 *
 * _.isLength(Number.MIN_VALUE)
 * // => false
 *
 * _.isLength(Infinity)
 * // => false
 *
 * _.isLength('3')
 * // => false
 */ function $5cf480e2da466646$var$isLength(value) {
    return typeof value === "number" && value > -1 && value % 1 === 0;
}
/**
 * Checks if `value` is an array-like object
 * @param {any} value
 * @return {boolean} true if `value` is array-like`, else `false`
 * @example
 * isArrayLike(new Array())
 * // => true
 *
 * isArrayLike(document.querySelectorAll('div'))
 * // => true
 *
 * isArrayLike(document.getElementsByTagName('div'))
 * // => true
 *
 * isArrayLike(() => {})
 * // => false
 *
 * isArrayLike({foo: 'bar'})
 * // => false
 *
 * * isArrayLike(null)
 * // => false
 */ function $5cf480e2da466646$var$isArrayLike(value) {
    return $5cf480e2da466646$var$isObject(value) && $5cf480e2da466646$var$isLength(value.length);
}
/**
 * Coerces `value` to an `Array`.
 *
 * @param {any} value
 * @return {any[]}
 * @example
 * // If `value` is any `Array`, returns original `Array`
 * let arr = [1, 2]
 * toArray(arr)
 * // => arr
 *
 * // If `value` is an `ArrayLike`, its equivalent to `Array.from(value)`
 * let nodeList = document.querySelectorAll('div')
 * toArray(nodeList)
 * // => HTMLElement[] s
 *
 * // If value is falsy, returns empty array
 * toArray(null)
 * // => []
 *
 * // For any other type of value, its equivalent to `Array.of(value)`
 * let element = document.createElement('div')
 * toArray(element)
 * // => [element]
 *
 */ function $5cf480e2da466646$var$toArray(value) {
    if (Array.isArray(value)) return value;
    if (value == null) return [];
    return $5cf480e2da466646$var$isArrayLike(value) ? Array.prototype.slice.call(value) : [
        value
    ];
}
/**
 * Returns true if `input` is one of the following:
 * - `Element`
 * - `Text`
 * - `Document`
 * - `DocumentFragment`
 */ function $5cf480e2da466646$var$isNode(input) {
    return $5cf480e2da466646$var$isObject(input) && /^(1|3|11)$/.test(input.nodeType);
}
/**
 * Checks if given value is a string
 *
 * @param {any} value
 * @return {boolean} `true` if `value` is a string, else `false`
 */ function $5cf480e2da466646$var$isString(value) {
    return typeof value === "string";
}
/**
 * Flattens nested ArrayLike object (max 2 levels deep)
 */ function $5cf480e2da466646$var$flatten(obj) {
    return $5cf480e2da466646$var$toArray(obj).reduce(function(result, item) {
        return result.concat($5cf480e2da466646$var$toArray(item));
    }, []);
}
/**
 * Processes target elements for the splitType function. `target` can any
 * of the following types.
 * 1. `string` - A css selector
 * 2. `HTMLElement` - A single element
 * 3. `ArrayLike<HTMLElement>` - A collection of elements (ie NodeList)
 * 4. `Array<HTMLElement | ArrayLike<HTMLElement>>` - An array of elements
 *     and/or collections of elements
 *
 * Returns a flat array of HTML elements. If `target` does not contain any
 * valid elements, returns an empty array.
 *
 * @param {any} target
 * @returns {HTMLElement[]} A flat array HTML elements
 * @example
 *
 * // Single Element
 * const element = document.createElement('div')
 * getTargetElements()
 * // => [element]
 *
 * const nodeList = document.querySelectorAll('div')
 * getTargetElements(nodeList)
 * // => HTMLElement[] (all elements in `nodeList`)
 *
 * const nodeListA = document.querySelectorAll('div')
 * const nodeListB = document.querySelectorAll('p')
 * getTargetElements([nodeListA, nodeListB])
 * // => HTMLElement[] (all elements in `nodeListA` and `nodeListB`)
 *
 * // ID selector
 * getTargetElements('#id')
 * // => HTMLElement[]
 *
 * // Class selector
 * getTargetElements('.text')
 * // => HTMLElement[]
 *
 * // Non element object will not be returned
 * getTargetElements({foo: bar})
 * // => []
 *
 */ function $5cf480e2da466646$var$getTargetElements(target) {
    var elements = target; // If `target` is a selector string...
    if ($5cf480e2da466646$var$isString(target)) {
        if (/^(#[a-z]\w+)$/.test(target.trim())) // If `target` is an ID, use `getElementById`
        elements = document.getElementById(target.trim().slice(1));
        else // Else use `querySelectorAll`
        elements = document.querySelectorAll(target);
    }
    return $5cf480e2da466646$var$flatten(elements).filter($5cf480e2da466646$var$isNode);
}
/**
 * Stores data associated with DOM elements. This is a simplified version of
 * jQuery's data method.
 */ function $5cf480e2da466646$var$Data(owner, key, value) {
    var data = {};
    var id = null;
    if ($5cf480e2da466646$var$isObject(owner)) {
        id = owner[$5cf480e2da466646$var$Data.expando] || (owner[$5cf480e2da466646$var$Data.expando] = ++$5cf480e2da466646$var$Data.uid);
        data = $5cf480e2da466646$var$Data.cache[id] || ($5cf480e2da466646$var$Data.cache[id] = {});
    } // Get data
    if (value === undefined) {
        if (key === undefined) return data;
        return data[key];
    } else if (key !== undefined) {
        data[key] = value;
        return value;
    }
}
$5cf480e2da466646$var$Data.expando = "splitType".concat(new Date() * 1);
$5cf480e2da466646$var$Data.cache = {};
$5cf480e2da466646$var$Data.uid = 0; // Remove all data associated with the given element
function $5cf480e2da466646$var$RemoveData(element) {
    var id = element && element[$5cf480e2da466646$var$Data.expando];
    if (id) {
        delete element[id];
        delete $5cf480e2da466646$var$Data.cache[id];
    }
}
/**
 * Iterates values of an array or array-like object calling the provided
 * `callback` for each item. Based on `array.forEach`
 * @param {any} collection
 * @param {function} callback
 */ function $5cf480e2da466646$var$forEach(collection, callback) {
    var arr = $5cf480e2da466646$var$toArray(collection);
    for(var len = arr.length, i = 0; i < len; i++)callback(arr[i], i, arr);
}
/**
 * Splits a string into an array of words.
 *
 * @param {string} string
 * @param {string | RegExp} [separator = ' ']
 * @return {string[]} Array of words
 */ function $5cf480e2da466646$var$toWords(string) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";
    string = string ? String(string) : "";
    return string.split(separator);
}
/**
 * Based on lodash#split <https://lodash.com/license>
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters &
 * Editors
 */ var $5cf480e2da466646$var$rsAstralRange = "\ud800-\udfff";
var $5cf480e2da466646$var$rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
var $5cf480e2da466646$var$rsComboSymbolsRange = "\\u20d0-\\u20f0";
var $5cf480e2da466646$var$rsVarRange = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */ var $5cf480e2da466646$var$rsAstral = "[".concat($5cf480e2da466646$var$rsAstralRange, "]");
var $5cf480e2da466646$var$rsCombo = "[".concat($5cf480e2da466646$var$rsComboMarksRange).concat($5cf480e2da466646$var$rsComboSymbolsRange, "]");
var $5cf480e2da466646$var$rsFitz = "\ud83c[\udffb-\udfff]";
var $5cf480e2da466646$var$rsModifier = "(?:".concat($5cf480e2da466646$var$rsCombo, "|").concat($5cf480e2da466646$var$rsFitz, ")");
var $5cf480e2da466646$var$rsNonAstral = "[^".concat($5cf480e2da466646$var$rsAstralRange, "]");
var $5cf480e2da466646$var$rsRegional = "(?:\ud83c[\udde6-\uddff]){2}";
var $5cf480e2da466646$var$rsSurrPair = "[\ud800-\udbff][\udc00-\udfff]";
var $5cf480e2da466646$var$rsZWJ = "\\u200d";
/** Used to compose unicode regexes. */ var $5cf480e2da466646$var$reOptMod = "".concat($5cf480e2da466646$var$rsModifier, "?");
var $5cf480e2da466646$var$rsOptVar = "[".concat($5cf480e2da466646$var$rsVarRange, "]?");
var $5cf480e2da466646$var$rsOptJoin = "(?:" + $5cf480e2da466646$var$rsZWJ + "(?:" + [
    $5cf480e2da466646$var$rsNonAstral,
    $5cf480e2da466646$var$rsRegional,
    $5cf480e2da466646$var$rsSurrPair
].join("|") + ")" + $5cf480e2da466646$var$rsOptVar + $5cf480e2da466646$var$reOptMod + ")*";
var $5cf480e2da466646$var$rsSeq = $5cf480e2da466646$var$rsOptVar + $5cf480e2da466646$var$reOptMod + $5cf480e2da466646$var$rsOptJoin;
var $5cf480e2da466646$var$rsSymbol = "(?:".concat([
    "".concat($5cf480e2da466646$var$rsNonAstral).concat($5cf480e2da466646$var$rsCombo, "?"),
    $5cf480e2da466646$var$rsCombo,
    $5cf480e2da466646$var$rsRegional,
    $5cf480e2da466646$var$rsSurrPair,
    $5cf480e2da466646$var$rsAstral
].join("|"), "\n)");
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */ var $5cf480e2da466646$var$reUnicode = RegExp("".concat($5cf480e2da466646$var$rsFitz, "(?=").concat($5cf480e2da466646$var$rsFitz, ")|").concat($5cf480e2da466646$var$rsSymbol).concat($5cf480e2da466646$var$rsSeq), "g");
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */ var $5cf480e2da466646$var$unicodeRange = [
    $5cf480e2da466646$var$rsZWJ,
    $5cf480e2da466646$var$rsAstralRange,
    $5cf480e2da466646$var$rsComboMarksRange,
    $5cf480e2da466646$var$rsComboSymbolsRange,
    $5cf480e2da466646$var$rsVarRange
];
var $5cf480e2da466646$var$reHasUnicode = RegExp("[".concat($5cf480e2da466646$var$unicodeRange.join(""), "]"));
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */ function $5cf480e2da466646$var$asciiToArray(string) {
    return string.split("");
}
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */ function $5cf480e2da466646$var$hasUnicode(string) {
    return $5cf480e2da466646$var$reHasUnicode.test(string);
}
/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */ function $5cf480e2da466646$var$unicodeToArray(string) {
    return string.match($5cf480e2da466646$var$reUnicode) || [];
}
/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */ function $5cf480e2da466646$var$stringToArray(string) {
    return $5cf480e2da466646$var$hasUnicode(string) ? $5cf480e2da466646$var$unicodeToArray(string) : $5cf480e2da466646$var$asciiToArray(string);
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values.
 *
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */ function $5cf480e2da466646$var$toString(value) {
    return value == null ? "" : String(value);
}
/**
 * Splits `string` into an array of characters. If `separator` is omitted,
 * it behaves likes split.split('').
 *
 * Unlike native string.split(''), it can split strings that contain unicode
 * characters like emojis and symbols.
 *
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} [separator=''] The separator pattern to split by.
 * @returns {Array} Returns the string segments.
 * @example
 * toChars('foo');
 * // => ['f', 'o', 'o']
 *
 * toChars('foo bar');
 * // => ["f", "o", "o", " ", "b", "a", "r"]
 *
 * toChars('f😀o');
 * // => ['f', '😀', 'o']
 *
 * toChars('f-😀-o', /-/);
 * // => ['f', '😀', 'o']
 *
 */ function $5cf480e2da466646$var$toChars(string) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    string = $5cf480e2da466646$var$toString(string);
    if (string && $5cf480e2da466646$var$isString(string)) {
        if (!separator && $5cf480e2da466646$var$hasUnicode(string)) return $5cf480e2da466646$var$stringToArray(string);
    }
    return string.split(separator);
}
/**
 * Create an HTML element with the the given attributes
 *
 * attributes can include standard HTML attribute, as well as the following
 * "special" properties:
 *   - children: HTMLElement | ArrayLike<HTMLElement>
 *   - textContent: string
 *   - innerHTML: string
 *
 * @param {string} name
 * @param  {Object} [attributes]
 * @returns {HTMLElement}
 */ function $5cf480e2da466646$var$createElement(name, attributes) {
    var element = document.createElement(name);
    if (!attributes) // When called without the second argument, its just return the result
    // of `document.createElement`
    return element;
    Object.keys(attributes).forEach(function(attribute) {
        var value = attributes[attribute]; // Ignore attribute if value is `null`
        if (value === null) return; // Handle `textContent` and `innerHTML`
        if (attribute === "textContent" || attribute === "innerHTML") element[attribute] = value;
        else if (attribute === "children") $5cf480e2da466646$var$forEach(value, function(child) {
            if ($5cf480e2da466646$var$isNode(child)) element.appendChild(child);
        });
        else element.setAttribute(attribute, String(value).trim());
    });
    return element;
}
/**
 * Takes a comma separated list of `types` and returns an objet
 *
 * @param {string | string[]} value a comma separated list of split types
 * @return {{lines: boolean, words: boolean, chars: boolean}}
 */ function $5cf480e2da466646$var$parseTypes(value) {
    var types = $5cf480e2da466646$var$isString(value) || Array.isArray(value) ? String(value) : "";
    return {
        lines: /line/i.test(types),
        words: /word/i.test(types),
        chars: /(char)|(character)/i.test(types)
    };
}
/**
 * Gets the text content of an HTML element.
 *
 * Optionally, <br> tags can be replaced with a unique string so they can be
 * converted back HTML later on.
 *
 * @param {HTMLElement} element
 * @param {string} BR_SYMBOL
 * @return {string} the text content of the given element
 */ function $5cf480e2da466646$var$getTextContent(element, LINE_BREAK_SYMBOL) {
    var brTag = /<br\s*\/?>/g;
    var textContent = element.textContent;
    if (LINE_BREAK_SYMBOL) {
        var innerHTML = element.innerHTML;
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = innerHTML.replace(brTag, " ".concat(LINE_BREAK_SYMBOL, " "));
        textContent = tempDiv.textContent;
    } // Remove extra white space
    return textContent.replace(/\s+/g, " ").trim();
}
var $5cf480e2da466646$var$defaults = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: "lines, words, chars",
    absolute: false,
    tagName: "div"
};
var $5cf480e2da466646$var$createFragment = function createFragment() {
    return document.createDocumentFragment();
};
var $5cf480e2da466646$var$createTextNode = function createTextNode(str) {
    return document.createTextNode(str);
};
/**
 * Splits the text content of a single element using the provided settings.
 * There are three possible split types: lines, words, and characters. Each one
 * is optional, so text can be split into any combination of the three types.
 *
 * @param {HTMLElement} element the target element
 * @param {Object} settings
 * @return {{
 *   lines: HTMLElement[],
 *   words: HTMLElement[],
 *   chars: HTMLElement[]
 * }}
 */ function $5cf480e2da466646$var$splitSingleElement(element, settings) {
    settings = $5cf480e2da466646$var$extend($5cf480e2da466646$var$defaults, settings); // The split types
    var types = $5cf480e2da466646$var$parseTypes(settings.types); // the tag name for split text nodes
    var TAG_NAME = settings.tagName; // A unique string to temporarily replace <br> tags
    var BR_SYMBOL = "B".concat(new Date() * 1, "R"); // (boolean) true if position is set to absolute
    var isAbsolute = settings.position === "absolute" || settings.absolute; // The array of wrapped line elements
    var lines = []; // The array of wrapped words elements
    var words = []; // The array of wrapped character elements
    var chars = []; // The plain text content of the target element
    var splitText;
    /**------------------------------------------------
   ** SPLIT TEXT INTO WORDS AND CHARACTERS
   **-----------------------------------------------*/ // `splitText` is a wrapper to hold the HTML structure
    splitText = types.lines ? $5cf480e2da466646$var$createElement("div") : $5cf480e2da466646$var$createFragment(); // Get the element's text content.
    var TEXT_CONTENT = $5cf480e2da466646$var$getTextContent(element, BR_SYMBOL); // Create an array of wrapped word elements.
    words = $5cf480e2da466646$var$toWords(TEXT_CONTENT).reduce(function(result, WORD, idx, arr) {
        // Let `wordElement` be the wrapped element for the current word
        var wordElement;
        var characterElementsForCurrentWord; // If the current word is a symbol representing a `<br>` tag,
        // append a `<br>` tag to splitText and continue to the next word
        if (WORD === BR_SYMBOL) {
            splitText.appendChild($5cf480e2da466646$var$createElement("br"));
            return result;
        } // If splitting text into characters...
        if (types.chars) {
            // Iterate through the characters in the current word
            // TODO: support emojis in text
            characterElementsForCurrentWord = $5cf480e2da466646$var$toChars(WORD).map(function(CHAR) {
                return $5cf480e2da466646$var$createElement(TAG_NAME, {
                    class: "".concat(settings.splitClass, " ").concat(settings.charClass),
                    style: "display: inline-block;",
                    textContent: CHAR
                });
            }); // push the character nodes for this word onto the array of
            // all character nodes
            chars = chars.concat(characterElementsForCurrentWord);
        } // END IF;
        if (types.words || types.lines) {
            // | If Splitting Text Into Words...
            // | Create an element (`wordElement`) to wrap the current word.
            // | If we are also splitting text into characters, the word element
            // | will contain the wrapped character nodes for this word. If not,
            // | it will contain the `WORD`
            wordElement = $5cf480e2da466646$var$createElement(TAG_NAME, {
                class: "".concat(settings.wordClass, " ").concat(settings.splitClass),
                style: "display: inline-block; position: ".concat(types.words ? "relative" : "static"),
                children: types.chars ? characterElementsForCurrentWord : null,
                textContent: !types.chars ? WORD : null
            });
            splitText.appendChild(wordElement);
        } else // | If NOT splitting into words OR lines...
        // | Append the characters elements directly to splitText.
        $5cf480e2da466646$var$forEach(characterElementsForCurrentWord, function(characterElement) {
            splitText.appendChild(characterElement);
        });
        if (idx !== arr.length - 1) // Add a space after the word.
        splitText.appendChild($5cf480e2da466646$var$createTextNode(" "));
         // If we not splitting text into words, we return an empty array
        return types.words ? result.concat(wordElement) : result;
    }, []); // 4. Replace the original HTML content of the element with the `splitText`
    element.innerHTML = "";
    element.appendChild(splitText); // Unless we are splitting text into lines or using
    if (!isAbsolute && !types.lines) return {
        chars: chars,
        words: words,
        lines: []
    };
    /**------------------------------------------------
   ** GET STYLES AND POSITIONS
   **-----------------------------------------------*/ // There is no built-in way to detect natural line breaks in text (when a
    // block of text wraps to fit its container). To split text into lines, we
    // have to detect line breaks by checking the top offset of words. This is
    // why text was split into words first. To apply absolute
    // positioning, its also necessary to record the size and position of every
    // split node (lines, words, characters).
    // To consolidate DOM getting/settings, this is all done at the same time,
    // before actually splitting text into lines, which involves restructuring
    // the DOM again.
    var wordsInEachLine = [];
    var wordsInCurrentLine = [];
    var lineHeight;
    var elementHeight;
    var elementWidth;
    var contentBox;
    var lineOffsetY; // TODO: Is it necessary to store `nodes` in the cache?
    // nodes is a live HTML collection of the nodes in this element
    var nodes = $5cf480e2da466646$var$Data(element, "nodes", element.getElementsByTagName(TAG_NAME)); // Cache the element's parent and next sibling (for DOM removal).
    var parent = element.parentElement;
    var nextSibling = element.nextElementSibling; // get the computed style object for the element
    var cs = window.getComputedStyle(element);
    var align = cs.textAlign; // If using absolute position...
    if (isAbsolute) {
        // Let contentBox be an object containing the width and offset position of
        // the element's content box (the area inside padding box). This is needed
        // (for absolute positioning) to set the width and position of line
        // elements, which have not been created yet.
        contentBox = {
            left: splitText.offsetLeft,
            top: splitText.offsetTop,
            width: splitText.offsetWidth
        }; // Let elementWidth and elementHeight equal the actual width/height of the
        // element. Also check if the element has inline height or width styles
        // already set. If it does, cache those values for later.
        elementWidth = element.offsetWidth;
        elementHeight = element.offsetHeight;
        $5cf480e2da466646$var$Data(element).cssWidth = element.style.width;
        $5cf480e2da466646$var$Data(element).cssHeight = element.style.height;
    } // Iterate over every split text node
    $5cf480e2da466646$var$forEach(nodes, function(node) {
        if (node === splitText) return;
        var isWord = node.parentElement === splitText;
        var wordOffsetY; // a. Detect line breaks by checking the top offset of word nodes.
        //    For each line, create an array (line) containing the words in that
        //    line.
        if (types.lines && isWord) {
            // wordOffsetY is the top offset of the current word.
            wordOffsetY = $5cf480e2da466646$var$Data(node, "top", node.offsetTop); // If wordOffsetY is different than the value of lineOffsetY...
            // Then this word is the beginning of a new line.
            // Set lineOffsetY to value of wordOffsetY.
            // Create a new array (line) to hold the words in this line.
            if (wordOffsetY !== lineOffsetY) {
                lineOffsetY = wordOffsetY;
                wordsInEachLine.push(wordsInCurrentLine = []);
            } // Add the current word node to the line array
            wordsInCurrentLine.push(node);
        } // b. Get the size and position of all split text nodes.
        if (isAbsolute) {
            // The values are stored using the data method
            // All split nodes have the same height (lineHeight). So its only
            // retrieved once.
            // If offset top has already been cached (step 11 a) use the stored value.
            $5cf480e2da466646$var$Data(node).top = wordOffsetY || node.offsetTop;
            $5cf480e2da466646$var$Data(node).left = node.offsetLeft;
            $5cf480e2da466646$var$Data(node).width = node.offsetWidth;
            $5cf480e2da466646$var$Data(node).height = lineHeight || (lineHeight = node.offsetHeight);
        }
    }); // END LOOP
    // Remove the element from the DOM
    if (parent) parent.removeChild(element);
    /**------------------------------------------------
   ** SPLIT LINES
   **-----------------------------------------------*/ if (types.lines) {
        // Let splitText be a new document createFragment to hold the HTML
        // structure.
        splitText = $5cf480e2da466646$var$createFragment(); // Iterate over lines of text (see 11 b)
        // Let `line` be the array of words in the current line.
        // Return an array of the wrapped line elements (lineElements)
        lines = wordsInEachLine.map(function(wordsInThisLine) {
            // Create an element to wrap the current line.
            var lineElement = $5cf480e2da466646$var$createElement(TAG_NAME, {
                class: "".concat(settings.splitClass, " ").concat(settings.lineClass),
                style: "display: block; text-align: ".concat(align, "; width: 100%;")
            }); // Append the `lineElement` to `SplitText`
            splitText.appendChild(lineElement); // Store size/position values for the line element.
            if (isAbsolute) {
                $5cf480e2da466646$var$Data(lineElement).type = "line"; // the offset top of the first word in the line
                $5cf480e2da466646$var$Data(lineElement).top = $5cf480e2da466646$var$Data(wordsInThisLine[0]).top;
                $5cf480e2da466646$var$Data(lineElement).height = lineHeight;
            } // Iterate over the word elements in the current line.
            $5cf480e2da466646$var$forEach(wordsInThisLine, function(wordElement, idx, arr) {
                if (types.words) // | If we are splitting text into words,
                // | just append each wordElement to the lineElement.
                lineElement.appendChild(wordElement);
                else if (types.chars) // | If splitting text into characters but not words...
                // | Append the character elements directly to the line element
                $5cf480e2da466646$var$forEach(wordElement.children, function(charNode) {
                    lineElement.appendChild(charNode);
                });
                else // | If NOT splitting into words OR characters...
                // | append the plain text content of the word to the line element
                lineElement.appendChild($5cf480e2da466646$var$createTextNode(wordElement.textContent));
                 // Add a space after the word
                if (idx !== arr.length - 1) lineElement.appendChild($5cf480e2da466646$var$createTextNode(" "));
            }); // END LOOP
            return lineElement;
        }); // END LOOP
        // 10. Insert the new splitText
        element.replaceChild(splitText, element.firstChild);
    }
    /**------------------------------------------------
   **  SET ABSOLUTE POSITION
   **-----------------------------------------------*/ // Apply absolute positioning to all split text elements (lines, words, and
    // characters). The size and relative position of split nodes has already
    // been recorded. Now we use those values to set each element to absolute
    // position. However, positions were logged before text was split into lines
    // (step 13 - 15). So some values need to be recalculated to account for the
    // modified DOM structure.
    if (isAbsolute) {
        // Set the width/height of the parent element, so it does not collapse
        // when its child nodes are set to absolute position.
        element.style.width = "".concat(element.style.width || elementWidth, "px");
        element.style.height = "".concat(elementHeight, "px"); // Iterate over all split nodes.
        $5cf480e2da466646$var$forEach(nodes, function(node) {
            var isLineNode = $5cf480e2da466646$var$Data(node).type === "line";
            var isChildOfLineNode = !isLineNode && $5cf480e2da466646$var$Data(node.parentElement).type === "line"; // Set the top position of the current node.
            // -> If its a line node, we use the top offset of its first child
            // -> If its the child of line node, then its top offset is zero
            node.style.top = "".concat(isChildOfLineNode ? 0 : $5cf480e2da466646$var$Data(node).top, "px"); // Set the left position of the current node.
            // -> If its a line node, this this is equal to the left offset of
            //    contentBox.
            // -> If its the child of a line node, the cached valued must be
            //    recalculated so its relative to the line node (which didn't
            //    exist when value was initially checked). NOTE: the value is
            //    recalculated without querying the DOM again
            node.style.left = isLineNode ? "".concat(contentBox.left, "px") : "".concat($5cf480e2da466646$var$Data(node).left - (isChildOfLineNode ? contentBox.left : 0), "px"); // Set the height of the current node to the cached value.
            node.style.height = "".concat($5cf480e2da466646$var$Data(node).height, "px"); //  Set the width of the current node.
            //  If its a line element, width is equal to the width of the contentBox.
            node.style.width = isLineNode ? "".concat(contentBox.width, "px") : "".concat($5cf480e2da466646$var$Data(node).width, "px"); // Finally, set the node's position to absolute.
            node.style.position = "absolute";
        });
    } // end if;
    // 14. Re-attach the element to the DOM
    if (parent) {
        if (nextSibling) parent.insertBefore(element, nextSibling);
        else parent.appendChild(element);
    }
    return {
        lines: lines,
        words: types.words ? words : [],
        chars: chars
    };
}
var $5cf480e2da466646$var$_defaults = $5cf480e2da466646$var$extend($5cf480e2da466646$var$defaults, {});
var $5cf480e2da466646$var$SplitType = /*#__PURE__*/ function() {
    $5cf480e2da466646$var$_createClass(SplitType, null, [
        {
            key: "defaults",
            /**
     * The default settings for all splitType instances
     */ get: function get() {
                return $5cf480e2da466646$var$_defaults;
            },
            set: function set(options) {
                $5cf480e2da466646$var$_defaults = $5cf480e2da466646$var$extend($5cf480e2da466646$var$_defaults, $5cf480e2da466646$var$parseSettings(options));
            }
        }
    ]);
    function SplitType(target, options) {
        $5cf480e2da466646$var$_classCallCheck(this, SplitType);
        this.isSplit = false;
        this.settings = $5cf480e2da466646$var$extend($5cf480e2da466646$var$_defaults, $5cf480e2da466646$var$parseSettings(options));
        this.elements = $5cf480e2da466646$var$getTargetElements(target) || [];
        if (this.elements.length) {
            // Store the original HTML content of each target element
            this.originals = this.elements.map(function(element) {
                return $5cf480e2da466646$var$Data(element, "html", $5cf480e2da466646$var$Data(element).html || element.innerHTML);
            });
            if (this.settings.types) // Initiate the split operation.
            this.split();
        }
    }
    /**
   * Splits the text in all target elements. This method is called
   * automatically when a new SplitType instance is created. It can also be
   * called manually to re-split text with new options.
   * @param {Object} options
   * @public
   */ $5cf480e2da466646$var$_createClass(SplitType, [
        {
            key: "split",
            value: function split(options) {
                var _this = this;
                // If any of the target elements have already been split,
                // revert them back to their original content before splitting them.
                this.revert(); // Create arrays to hold the split lines, words, and characters
                this.lines = [];
                this.words = [];
                this.chars = []; // cache vertical scroll position before splitting
                var scrollPos = [
                    window.pageXOffset,
                    window.pageYOffset
                ]; // If new options were passed into the `split()` method, update settings
                if (options !== undefined) this.settings = $5cf480e2da466646$var$extend(this.settings, $5cf480e2da466646$var$parseSettings(options));
                 // Split text in each target element
                this.elements.forEach(function(element) {
                    // Add the split text nodes from this element to the arrays of all split
                    // text nodes for this instance.
                    var _split2 = $5cf480e2da466646$var$splitSingleElement(element, _this.settings), lines = _split2.lines, words = _split2.words, chars = _split2.chars;
                    _this.lines = _this.lines.concat(lines);
                    _this.words = _this.words.concat(words);
                    _this.chars = _this.chars.concat(chars);
                    $5cf480e2da466646$var$Data(element).isSplit = true;
                }); // Set isSplit to true for the SplitType instance
                this.isSplit = true; // Set scroll position to cached value.
                window.scrollTo(scrollPos[0], scrollPos[1]); // Clear data Cache
                this.elements.forEach(function(element) {
                    var nodes = $5cf480e2da466646$var$Data(element).nodes || [];
                    $5cf480e2da466646$var$toArray(nodes).forEach($5cf480e2da466646$var$RemoveData);
                });
            }
        },
        {
            key: "revert",
            value: function revert() {
                var _this2 = this;
                // Delete the arrays of split text elements
                if (this.isSplit) {
                    this.lines = null;
                    this.words = null;
                    this.chars = null;
                } // Remove split text from target elements and restore original content
                this.elements.forEach(function(element) {
                    if ($5cf480e2da466646$var$Data(element).isSplit && $5cf480e2da466646$var$Data(element).html) {
                        element.innerHTML = $5cf480e2da466646$var$Data(element).html;
                        element.style.height = $5cf480e2da466646$var$Data(element).cssHeight || "";
                        element.style.width = $5cf480e2da466646$var$Data(element).cssWidth || "";
                        _this2.isSplit = false;
                    }
                });
            }
        }
    ]);
    return SplitType;
}();
var $5cf480e2da466646$export$2e2bcd8739ae039 = $5cf480e2da466646$var$SplitType;


const $38f1e996af275b9d$export$db69c10dea599f = {
    duration: 1.4,
    ease: "power4"
};




class $15b2a328e237db56$export$8d6dee1bc13078fb {
    /**
     * Animates the lines in.
     * @return {GSAP Timeline} the animation timeline
     * @param {Boolean} animation - with or without animation.
     */ in(animation = true) {
        // Lines are visible
        this.isVisible = true;
        (0, $c79ce6d7448420a8$export$99ee26438460406a).killTweensOf(this.SplitTypeInstance.lines);
        this.inTimeline = (0, $c79ce6d7448420a8$export$99ee26438460406a).timeline({
            defaults: (0, $38f1e996af275b9d$export$db69c10dea599f)
        }).addLabel("start", 0).set(this.SplitTypeInstance.lines, {
            yPercent: 105
        }, "start");
        if (animation) this.inTimeline.to(this.SplitTypeInstance.lines, {
            yPercent: 0,
            stagger: 0.04
        }, "start");
        else this.inTimeline.set(this.SplitTypeInstance.lines, {
            yPercent: 0
        }, "start");
        return this.inTimeline;
    }
    /**
     * Animates the lines out.
     * @param {Boolean} animation - with or without animation.
     * @return {GSAP Timeline} the animation timeline
     */ out(animation = true) {
        // Lines are invisible
        this.isVisible = false;
        (0, $c79ce6d7448420a8$export$99ee26438460406a).killTweensOf(this.SplitTypeInstance.lines);
        this.outTimeline = (0, $c79ce6d7448420a8$export$99ee26438460406a).timeline({
            defaults: (0, $38f1e996af275b9d$export$db69c10dea599f)
        }).addLabel("start", 0);
        if (animation) this.outTimeline.to(this.SplitTypeInstance.lines, {
            yPercent: -105,
            stagger: 0.04
        }, "start");
        else this.outTimeline.set(this.SplitTypeInstance.lines, {
            yPercent: -105
        }, "start");
        return this.outTimeline;
    }
    /**
     * Initializes some events.
     */ initEvents() {
        // Re-initialize the Split Text on window resize.
        window.addEventListener("resize", ()=>{
            // Re-split text
            // https://github.com/lukePeavey/SplitType#instancesplitoptions-void
            this.SplitTypeInstance.split();
            // Need to wrap again the new lines elements (div with class .oh)
            (0, $3d2a545671ed6536$export$fec9ba7939aa9b65)(this.SplitTypeInstance.lines, "div", "oh");
            // Hide the lines
            if (!this.isVisible) (0, $c79ce6d7448420a8$export$99ee26438460406a).set(this.SplitTypeInstance.lines, {
                yPercent: 105
            });
        });
    }
    /**
     * Constructor.
     * @param {Element} DOM_el - a text DOM element
     */ constructor(DOM_el){
        // DOM elements
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "DOM", {
            // main element (a text DOM element)
            el: null
        });
        // Split Type instance
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "SplitTypeInstance", void 0);
        // Checks if the Split Type lines are visible or not
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "isVisible", void 0);
        // Animation timelines
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "inTimeline", void 0);
        (0, $b9bdf98af2c3ca41$export$2e2bcd8739ae039)(this, "outTimeline", void 0);
        this.DOM = {
            el: DOM_el
        };
        this.SplitTypeInstance = new (0, $5cf480e2da466646$export$2e2bcd8739ae039)(this.DOM.el, {
            types: "lines"
        });
        // Wrap the lines (div with class .oh)
        // The inner child will be the one animating the transform
        (0, $3d2a545671ed6536$export$fec9ba7939aa9b65)(this.SplitTypeInstance.lines, "div", "oh");
        this.initEvents();
    }
}




/*!
 * matrix 3.11.2
 * https://greensock.com
 *
 * Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/ /* eslint-disable */ var $b651d38205e168eb$var$_doc, $b651d38205e168eb$var$_win, $b651d38205e168eb$var$_docElement, $b651d38205e168eb$var$_body, $b651d38205e168eb$var$_divContainer, $b651d38205e168eb$var$_svgContainer, $b651d38205e168eb$var$_identityMatrix, $b651d38205e168eb$var$_gEl, $b651d38205e168eb$var$_transformProp = "transform", $b651d38205e168eb$var$_transformOriginProp = $b651d38205e168eb$var$_transformProp + "Origin", $b651d38205e168eb$var$_hasOffsetBug, $b651d38205e168eb$export$33c547c3e20d49b1 = function _setDoc(element) {
    var doc = element.ownerDocument || element;
    if (!($b651d38205e168eb$var$_transformProp in element.style) && "msTransform" in element.style) {
        //to improve compatibility with old Microsoft browsers
        $b651d38205e168eb$var$_transformProp = "msTransform";
        $b651d38205e168eb$var$_transformOriginProp = $b651d38205e168eb$var$_transformProp + "Origin";
    }
    while(doc.parentNode && (doc = doc.parentNode));
    $b651d38205e168eb$var$_win = window;
    $b651d38205e168eb$var$_identityMatrix = new $b651d38205e168eb$export$26e6ecd136a15474();
    if (doc) {
        $b651d38205e168eb$var$_doc = doc;
        $b651d38205e168eb$var$_docElement = doc.documentElement;
        $b651d38205e168eb$var$_body = doc.body;
        $b651d38205e168eb$var$_gEl = $b651d38205e168eb$var$_doc.createElementNS("http://www.w3.org/2000/svg", "g"); // prevent any existing CSS from transforming it
        $b651d38205e168eb$var$_gEl.style.transform = "none"; // now test for the offset reporting bug. Use feature detection instead of browser sniffing to make things more bulletproof and future-proof. Hopefully Safari will fix their bug soon but it's 2020 and it's still not fixed.
        var d1 = doc.createElement("div"), d2 = doc.createElement("div");
        $b651d38205e168eb$var$_body.appendChild(d1);
        d1.appendChild(d2);
        d1.style.position = "static";
        d1.style[$b651d38205e168eb$var$_transformProp] = "translate3d(0,0,1px)";
        $b651d38205e168eb$var$_hasOffsetBug = d2.offsetParent !== d1;
        $b651d38205e168eb$var$_body.removeChild(d1);
    }
    return doc;
}, $b651d38205e168eb$var$_forceNonZeroScale = function _forceNonZeroScale(e) {
    // walks up the element's ancestors and finds any that had their scale set to 0 via GSAP, and changes them to 0.0001 to ensure that measurements work. Firefox has a bug that causes it to incorrectly report getBoundingClientRect() when scale is 0.
    var a, cache;
    while(e && e !== $b651d38205e168eb$var$_body){
        cache = e._gsap;
        cache && cache.uncache && cache.get(e, "x"); // force re-parsing of transforms if necessary
        if (cache && !cache.scaleX && !cache.scaleY && cache.renderTransform) {
            cache.scaleX = cache.scaleY = 1e-4;
            cache.renderTransform(1, cache);
            a ? a.push(cache) : a = [
                cache
            ];
        }
        e = e.parentNode;
    }
    return a;
}, // possible future addition: pass an element to _forceDisplay() and it'll walk up all its ancestors and make sure anything with display: none is set to display: block, and if there's no parentNode, it'll add it to the body. It returns an Array that you can then feed to _revertDisplay() to have it revert all the changes it made.
// _forceDisplay = e => {
// 	let a = [],
// 		parent;
// 	while (e && e !== _body) {
// 		parent = e.parentNode;
// 		(_win.getComputedStyle(e).display === "none" || !parent) && a.push(e, e.style.display, parent) && (e.style.display = "block");
// 		parent || _body.appendChild(e);
// 		e = parent;
// 	}
// 	return a;
// },
// _revertDisplay = a => {
// 	for (let i = 0; i < a.length; i+=3) {
// 		a[i+1] ? (a[i].style.display = a[i+1]) : a[i].style.removeProperty("display");
// 		a[i+2] || a[i].parentNode.removeChild(a[i]);
// 	}
// },
$b651d38205e168eb$var$_svgTemps = [], //we create 3 elements for SVG, and 3 for other DOM elements and cache them for performance reasons. They get nested in _divContainer and _svgContainer so that just one element is added to the DOM on each successive attempt. Again, performance is key.
$b651d38205e168eb$var$_divTemps = [], $b651d38205e168eb$export$ffd2ae2432b6e61c = function _getDocScrollTop() {
    return $b651d38205e168eb$var$_win.pageYOffset || $b651d38205e168eb$var$_doc.scrollTop || $b651d38205e168eb$var$_docElement.scrollTop || $b651d38205e168eb$var$_body.scrollTop || 0;
}, $b651d38205e168eb$export$cf8963d945186253 = function _getDocScrollLeft() {
    return $b651d38205e168eb$var$_win.pageXOffset || $b651d38205e168eb$var$_doc.scrollLeft || $b651d38205e168eb$var$_docElement.scrollLeft || $b651d38205e168eb$var$_body.scrollLeft || 0;
}, $b651d38205e168eb$var$_svgOwner = function _svgOwner(element) {
    return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
}, $b651d38205e168eb$export$72052b0a226e838 = function _isFixed(element) {
    if ($b651d38205e168eb$var$_win.getComputedStyle(element).position === "fixed") return true;
    element = element.parentNode;
    if (element && element.nodeType === 1) // avoid document fragments which will throw an error.
    return _isFixed(element);
}, $b651d38205e168eb$var$_createSibling = function _createSibling(element, i) {
    if (element.parentNode && ($b651d38205e168eb$var$_doc || $b651d38205e168eb$export$33c547c3e20d49b1(element))) {
        var svg = $b651d38205e168eb$var$_svgOwner(element), ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", type = svg ? i ? "rect" : "g" : "div", x = i !== 2 ? 0 : 100, y = i === 3 ? 100 : 0, css = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", e = $b651d38205e168eb$var$_doc.createElementNS ? $b651d38205e168eb$var$_doc.createElementNS(ns.replace(/^https/, "http"), type) : $b651d38205e168eb$var$_doc.createElement(type);
        if (i) {
            if (!svg) {
                if (!$b651d38205e168eb$var$_divContainer) {
                    $b651d38205e168eb$var$_divContainer = _createSibling(element);
                    $b651d38205e168eb$var$_divContainer.style.cssText = css;
                }
                e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";
                $b651d38205e168eb$var$_divContainer.appendChild(e);
            } else {
                $b651d38205e168eb$var$_svgContainer || ($b651d38205e168eb$var$_svgContainer = _createSibling(element));
                e.setAttribute("width", 0.01);
                e.setAttribute("height", 0.01);
                e.setAttribute("transform", "translate(" + x + "," + y + ")");
                $b651d38205e168eb$var$_svgContainer.appendChild(e);
            }
        }
        return e;
    }
    throw "Need document and parent.";
}, $b651d38205e168eb$var$_consolidate = function _consolidate(m) {
    // replaces SVGTransformList.consolidate() because a bug in Firefox causes it to break pointer events. See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800
    var c = new $b651d38205e168eb$export$26e6ecd136a15474(), i = 0;
    for(; i < m.numberOfItems; i++)c.multiply(m.getItem(i).matrix);
    return c;
}, $b651d38205e168eb$export$a2b87f76ca5ccbd0 = function _getCTM(svg) {
    var m = svg.getCTM(), transform;
    if (!m) {
        // Firefox returns null for getCTM() on root <svg> elements, so this is a workaround using a <g> that we temporarily append.
        transform = svg.style[$b651d38205e168eb$var$_transformProp];
        svg.style[$b651d38205e168eb$var$_transformProp] = "none"; // a bug in Firefox causes css transforms to contaminate the getCTM()
        svg.appendChild($b651d38205e168eb$var$_gEl);
        m = $b651d38205e168eb$var$_gEl.getCTM();
        svg.removeChild($b651d38205e168eb$var$_gEl);
        transform ? svg.style[$b651d38205e168eb$var$_transformProp] = transform : svg.style.removeProperty($b651d38205e168eb$var$_transformProp.replace(/([A-Z])/g, "-$1").toLowerCase());
    }
    return m || $b651d38205e168eb$var$_identityMatrix.clone(); // Firefox will still return null if the <svg> has a width/height of 0 in the browser.
}, $b651d38205e168eb$var$_placeSiblings = function _placeSiblings(element, adjustGOffset) {
    var svg = $b651d38205e168eb$var$_svgOwner(element), isRootSVG = element === svg, siblings = svg ? $b651d38205e168eb$var$_svgTemps : $b651d38205e168eb$var$_divTemps, parent = element.parentNode, container, m, b, x, y, cs;
    if (element === $b651d38205e168eb$var$_win) return element;
    siblings.length || siblings.push($b651d38205e168eb$var$_createSibling(element, 1), $b651d38205e168eb$var$_createSibling(element, 2), $b651d38205e168eb$var$_createSibling(element, 3));
    container = svg ? $b651d38205e168eb$var$_svgContainer : $b651d38205e168eb$var$_divContainer;
    if (svg) {
        if (isRootSVG) {
            b = $b651d38205e168eb$export$a2b87f76ca5ccbd0(element);
            x = -b.e / b.a;
            y = -b.f / b.d;
            m = $b651d38205e168eb$var$_identityMatrix;
        } else if (element.getBBox) {
            b = element.getBBox();
            m = element.transform ? element.transform.baseVal : {}; // IE11 doesn't follow the spec.
            m = !m.numberOfItems ? $b651d38205e168eb$var$_identityMatrix : m.numberOfItems > 1 ? $b651d38205e168eb$var$_consolidate(m) : m.getItem(0).matrix; // don't call m.consolidate().matrix because a bug in Firefox makes pointer events not work when consolidate() is called on the same tick as getBoundingClientRect()! See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800
            x = m.a * b.x + m.c * b.y;
            y = m.b * b.x + m.d * b.y;
        } else {
            // may be a <mask> which has no getBBox() so just use defaults instead of throwing errors.
            m = new $b651d38205e168eb$export$26e6ecd136a15474();
            x = y = 0;
        }
        if (adjustGOffset && element.tagName.toLowerCase() === "g") x = y = 0;
        (isRootSVG ? svg : parent).appendChild(container);
        container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
    } else {
        x = y = 0;
        if ($b651d38205e168eb$var$_hasOffsetBug) {
            // some browsers (like Safari) have a bug that causes them to misreport offset values. When an ancestor element has a transform applied, it's supposed to treat it as if it's position: relative (new context). Safari botches this, so we need to find the closest ancestor (between the element and its offsetParent) that has a transform applied and if one is found, grab its offsetTop/Left and subtract them to compensate.
            m = element.offsetParent;
            b = element;
            while(b && (b = b.parentNode) && b !== m && b.parentNode)if (($b651d38205e168eb$var$_win.getComputedStyle(b)[$b651d38205e168eb$var$_transformProp] + "").length > 4) {
                x = b.offsetLeft;
                y = b.offsetTop;
                b = 0;
            }
        }
        cs = $b651d38205e168eb$var$_win.getComputedStyle(element);
        if (cs.position !== "absolute" && cs.position !== "fixed") {
            m = element.offsetParent;
            while(parent && parent !== m){
                // if there's an ancestor element between the element and its offsetParent that's scrolled, we must factor that in.
                x += parent.scrollLeft || 0;
                y += parent.scrollTop || 0;
                parent = parent.parentNode;
            }
        }
        b = container.style;
        b.top = element.offsetTop - y + "px";
        b.left = element.offsetLeft - x + "px";
        b[$b651d38205e168eb$var$_transformProp] = cs[$b651d38205e168eb$var$_transformProp];
        b[$b651d38205e168eb$var$_transformOriginProp] = cs[$b651d38205e168eb$var$_transformOriginProp]; // b.border = m.border;
        // b.borderLeftStyle = m.borderLeftStyle;
        // b.borderTopStyle = m.borderTopStyle;
        // b.borderLeftWidth = m.borderLeftWidth;
        // b.borderTopWidth = m.borderTopWidth;
        b.position = cs.position === "fixed" ? "fixed" : "absolute";
        element.parentNode.appendChild(container);
    }
    return container;
}, $b651d38205e168eb$var$_setMatrix = function _setMatrix(m, a, b, c, d, e, f) {
    m.a = a;
    m.b = b;
    m.c = c;
    m.d = d;
    m.e = e;
    m.f = f;
    return m;
};
var $b651d38205e168eb$export$26e6ecd136a15474 = /*#__PURE__*/ function() {
    function Matrix2D(a, b, c, d, e, f) {
        if (a === void 0) a = 1;
        if (b === void 0) b = 0;
        if (c === void 0) c = 0;
        if (d === void 0) d = 1;
        if (e === void 0) e = 0;
        if (f === void 0) f = 0;
        $b651d38205e168eb$var$_setMatrix(this, a, b, c, d, e, f);
    }
    var _proto = Matrix2D.prototype;
    _proto.inverse = function inverse() {
        var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, determinant = a * d - b * c || 1e-10;
        return $b651d38205e168eb$var$_setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
    };
    _proto.multiply = function multiply(matrix) {
        var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, a2 = matrix.a, b2 = matrix.c, c2 = matrix.b, d2 = matrix.d, e2 = matrix.e, f2 = matrix.f;
        return $b651d38205e168eb$var$_setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
    };
    _proto.clone = function clone() {
        return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
    };
    _proto.equals = function equals(matrix) {
        var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
        return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
    };
    _proto.apply = function apply(point, decoratee) {
        if (decoratee === void 0) decoratee = {};
        var x = point.x, y = point.y, a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
        decoratee.x = x * a + y * c + e || 0;
        decoratee.y = x * b + y * d + f || 0;
        return decoratee;
    };
    return Matrix2D;
}(); // Feed in an element and it'll return a 2D matrix (optionally inverted) so that you can translate between coordinate spaces.
function $b651d38205e168eb$export$91a495f99cf781b7(element, inverse, adjustGOffset, includeScrollInFixed) {
    // adjustGOffset is typically used only when grabbing an element's PARENT's global matrix, and it ignores the x/y offset of any SVG <g> elements because they behave in a special way.
    if (!element || !element.parentNode || ($b651d38205e168eb$var$_doc || $b651d38205e168eb$export$33c547c3e20d49b1(element)).documentElement === element) return new $b651d38205e168eb$export$26e6ecd136a15474();
    var zeroScales = $b651d38205e168eb$var$_forceNonZeroScale(element), svg = $b651d38205e168eb$var$_svgOwner(element), temps = svg ? $b651d38205e168eb$var$_svgTemps : $b651d38205e168eb$var$_divTemps, container = $b651d38205e168eb$var$_placeSiblings(element, adjustGOffset), b1 = temps[0].getBoundingClientRect(), b2 = temps[1].getBoundingClientRect(), b3 = temps[2].getBoundingClientRect(), parent = container.parentNode, isFixed = !includeScrollInFixed && $b651d38205e168eb$export$72052b0a226e838(element), m = new $b651d38205e168eb$export$26e6ecd136a15474((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : $b651d38205e168eb$export$cf8963d945186253()), b1.top + (isFixed ? 0 : $b651d38205e168eb$export$ffd2ae2432b6e61c()));
    parent.removeChild(container);
    if (zeroScales) {
        b1 = zeroScales.length;
        while(b1--){
            b2 = zeroScales[b1];
            b2.scaleX = b2.scaleY = 0;
            b2.renderTransform(1, b2);
        }
    }
    return inverse ? m.inverse() : m;
}


var $faadebd64d09aa69$var$_id = 1, $faadebd64d09aa69$var$_toArray, $faadebd64d09aa69$var$gsap, $faadebd64d09aa69$var$_batch, $faadebd64d09aa69$var$_batchAction, $faadebd64d09aa69$var$_body, $faadebd64d09aa69$var$_closestTenth, $faadebd64d09aa69$var$_forEachBatch = function _forEachBatch(batch, name) {
    return batch.actions.forEach(function(a) {
        return a.vars[name] && a.vars[name](a);
    });
}, $faadebd64d09aa69$var$_batchLookup = {}, $faadebd64d09aa69$var$_RAD2DEG = 180 / Math.PI, $faadebd64d09aa69$var$_DEG2RAD = Math.PI / 180, $faadebd64d09aa69$var$_emptyObj = {}, $faadebd64d09aa69$var$_dashedNameLookup = {}, $faadebd64d09aa69$var$_memoizedRemoveProps = {}, $faadebd64d09aa69$var$_listToArray = function _listToArray(list) {
    return typeof list === "string" ? list.split(" ").join("").split(",") : list;
}, // removes extra spaces contaminating the names, returns an Array.
$faadebd64d09aa69$var$_callbacks = $faadebd64d09aa69$var$_listToArray("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt"), $faadebd64d09aa69$var$_removeProps = $faadebd64d09aa69$var$_listToArray("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight"), $faadebd64d09aa69$var$_getEl = function _getEl(target) {
    return $faadebd64d09aa69$var$_toArray(target)[0] || console.warn("Element not found:", target);
}, $faadebd64d09aa69$var$_round = function _round(value) {
    return Math.round(value * 10000) / 10000 || 0;
}, $faadebd64d09aa69$var$_toggleClass = function _toggleClass(targets, className, action) {
    return targets.forEach(function(el) {
        return el.classList[action](className);
    });
}, $faadebd64d09aa69$var$_reserved = {
    zIndex: 1,
    kill: 1,
    simple: 1,
    spin: 1,
    clearProps: 1,
    targets: 1,
    toggleClass: 1,
    onComplete: 1,
    onUpdate: 1,
    onInterrupt: 1,
    onStart: 1,
    delay: 1,
    repeat: 1,
    repeatDelay: 1,
    yoyo: 1,
    scale: 1,
    fade: 1,
    absolute: 1,
    props: 1,
    onEnter: 1,
    onLeave: 1,
    custom: 1,
    paused: 1,
    nested: 1,
    prune: 1,
    absoluteOnLeave: 1
}, $faadebd64d09aa69$var$_fitReserved = {
    zIndex: 1,
    simple: 1,
    clearProps: 1,
    scale: 1,
    absolute: 1,
    fitChild: 1,
    getVars: 1,
    props: 1
}, $faadebd64d09aa69$var$_camelToDashed = function _camelToDashed(p) {
    return p.replace(/([A-Z])/g, "-$1").toLowerCase();
}, $faadebd64d09aa69$var$_copy = function _copy(obj, exclude) {
    var result = {}, p;
    for(p in obj)exclude[p] || (result[p] = obj[p]);
    return result;
}, $faadebd64d09aa69$var$_memoizedProps = {}, $faadebd64d09aa69$var$_memoizeProps = function _memoizeProps(props) {
    var p = $faadebd64d09aa69$var$_memoizedProps[props] = $faadebd64d09aa69$var$_listToArray(props);
    $faadebd64d09aa69$var$_memoizedRemoveProps[props] = p.concat($faadebd64d09aa69$var$_removeProps);
    return p;
}, $faadebd64d09aa69$var$_getInverseGlobalMatrix = function _getInverseGlobalMatrix(el) {
    // integrates caching for improved performance
    var cache = el._gsap || $faadebd64d09aa69$var$gsap.core.getCache(el);
    if (cache.gmCache === $faadebd64d09aa69$var$gsap.ticker.frame) return cache.gMatrix;
    cache.gmCache = $faadebd64d09aa69$var$gsap.ticker.frame;
    return cache.gMatrix = (0, $b651d38205e168eb$export$91a495f99cf781b7)(el, true, false, true);
}, $faadebd64d09aa69$var$_getDOMDepth = function _getDOMDepth(el, invert, level) {
    if (level === void 0) level = 0;
    // In invert is true, the sibling depth is increments of 1, and parent/nesting depth is increments of 1000. This lets us order elements in an Array to reflect document flow.
    var parent = el.parentNode, inc = 1000 * Math.pow(10, level) * (invert ? -1 : 1), l = invert ? -inc * 900 : 0;
    while(el){
        l += inc;
        el = el.previousSibling;
    }
    return parent ? l + _getDOMDepth(parent, invert, level + 1) : l;
}, $faadebd64d09aa69$var$_orderByDOMDepth = function _orderByDOMDepth(comps, invert, isElStates) {
    comps.forEach(function(comp) {
        return comp.d = $faadebd64d09aa69$var$_getDOMDepth(isElStates ? comp.element : comp.t, invert);
    });
    comps.sort(function(c1, c2) {
        return c1.d - c2.d;
    });
    return comps;
}, $faadebd64d09aa69$var$_recordInlineStyles = function _recordInlineStyles(elState, props) {
    // records the current inline CSS properties into an Array in alternating name/value pairs that's stored in a "css" property on the state object so that we can revert later.
    var style = elState.element.style, a = elState.css = elState.css || [], i = props.length, p, v;
    while(i--){
        p = props[i];
        v = style[p] || style.getPropertyValue(p);
        a.push(v ? p : $faadebd64d09aa69$var$_dashedNameLookup[p] || ($faadebd64d09aa69$var$_dashedNameLookup[p] = $faadebd64d09aa69$var$_camelToDashed(p)), v);
    }
    return style;
}, $faadebd64d09aa69$var$_applyInlineStyles = function _applyInlineStyles(state) {
    var css = state.css, style = state.element.style, i = 0;
    state.cache.uncache = 1;
    for(; i < css.length; i += 2)css[i + 1] ? style[css[i]] = css[i + 1] : style.removeProperty(css[i]);
}, $faadebd64d09aa69$var$_setFinalStates = function _setFinalStates(comps, onlyTransforms) {
    comps.forEach(function(c) {
        return c.a.cache.uncache = 1;
    });
    onlyTransforms || comps.finalStates.forEach($faadebd64d09aa69$var$_applyInlineStyles);
}, $faadebd64d09aa69$var$_absoluteProps = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(","), // properties that we must record just
$faadebd64d09aa69$var$_makeAbsolute = function _makeAbsolute(elState, fallbackNode, ignoreBatch) {
    var element = elState.element, width = elState.width, height = elState.height, uncache = elState.uncache, getProp = elState.getProp, style = element.style, i = 4, result, displayIsNone, cs;
    typeof fallbackNode !== "object" && (fallbackNode = elState);
    if ($faadebd64d09aa69$var$_batch && ignoreBatch !== 1) {
        $faadebd64d09aa69$var$_batch._abs.push({
            t: element,
            b: elState,
            a: elState,
            sd: 0
        });
        $faadebd64d09aa69$var$_batch._final.push(function() {
            return elState.cache.uncache = 1, $faadebd64d09aa69$var$_applyInlineStyles(elState);
        });
        return element;
    }
    displayIsNone = getProp("display") === "none";
    if (!elState.isVisible || displayIsNone) {
        displayIsNone && ($faadebd64d09aa69$var$_recordInlineStyles(elState, [
            "display"
        ]).display = fallbackNode.display);
        elState.matrix = fallbackNode.matrix;
        elState.width = width = elState.width || fallbackNode.width;
        elState.height = height = elState.height || fallbackNode.height;
    }
    $faadebd64d09aa69$var$_recordInlineStyles(elState, $faadebd64d09aa69$var$_absoluteProps);
    cs = window.getComputedStyle(element);
    while(i--)style[$faadebd64d09aa69$var$_absoluteProps[i]] = cs[$faadebd64d09aa69$var$_absoluteProps[i]]; // record paddings as px-based because if removed from grid, percentage-based ones could be altered.
    style.gridArea = "1 / 1 / 1 / 1";
    style.transition = "none";
    style.position = "absolute";
    style.width = width + "px";
    style.height = height + "px";
    style.top || (style.top = "0px");
    style.left || (style.left = "0px");
    if (uncache) result = new $faadebd64d09aa69$var$ElementState(element);
    else {
        // better performance
        result = $faadebd64d09aa69$var$_copy(elState, $faadebd64d09aa69$var$_emptyObj);
        result.position = "absolute";
        if (elState.simple) {
            var bounds = element.getBoundingClientRect();
            result.matrix = new (0, $b651d38205e168eb$export$26e6ecd136a15474)(1, 0, 0, 1, bounds.left + (0, $b651d38205e168eb$export$cf8963d945186253)(), bounds.top + (0, $b651d38205e168eb$export$ffd2ae2432b6e61c)());
        } else result.matrix = (0, $b651d38205e168eb$export$91a495f99cf781b7)(element, false, false, true);
    }
    result = $faadebd64d09aa69$var$_fit(result, elState, true);
    elState.x = $faadebd64d09aa69$var$_closestTenth(result.x, 0.01);
    elState.y = $faadebd64d09aa69$var$_closestTenth(result.y, 0.01);
    return element;
}, $faadebd64d09aa69$var$_filterComps = function _filterComps(comps, targets) {
    if (targets !== true) {
        targets = $faadebd64d09aa69$var$_toArray(targets);
        comps = comps.filter(function(c) {
            if (targets.indexOf((c.sd < 0 ? c.b : c.a).element) !== -1) return true;
            else {
                c.t._gsap.renderTransform(1); // we must force transforms to render on anything that isn't being made position: absolute, otherwise the absolute position happens and then when animation begins it applies transforms which can create a new stacking context, throwing off positioning!
                if (c.b.isVisible) {
                    c.t.style.width = c.b.width + "px"; // otherwise things can collapse when contents are made position: absolute.
                    c.t.style.height = c.b.height + "px";
                }
            }
        });
    }
    return comps;
}, $faadebd64d09aa69$var$_makeCompsAbsolute = function _makeCompsAbsolute(comps) {
    return $faadebd64d09aa69$var$_orderByDOMDepth(comps, true).forEach(function(c) {
        return (c.a.isVisible || c.b.isVisible) && $faadebd64d09aa69$var$_makeAbsolute(c.sd < 0 ? c.b : c.a, c.b, 1);
    });
}, $faadebd64d09aa69$var$_findElStateInState = function _findElStateInState(state, other) {
    return other && state.idLookup[$faadebd64d09aa69$var$_parseElementState(other).id] || state.elementStates[0];
}, $faadebd64d09aa69$var$_parseElementState = function _parseElementState(elOrNode, props, simple, other) {
    return elOrNode instanceof $faadebd64d09aa69$var$ElementState ? elOrNode : elOrNode instanceof $faadebd64d09aa69$var$FlipState ? $faadebd64d09aa69$var$_findElStateInState(elOrNode, other) : new $faadebd64d09aa69$var$ElementState(typeof elOrNode === "string" ? $faadebd64d09aa69$var$_getEl(elOrNode) || console.warn(elOrNode + " not found") : elOrNode, props, simple);
}, $faadebd64d09aa69$var$_recordProps = function _recordProps(elState, props) {
    var getProp = $faadebd64d09aa69$var$gsap.getProperty(elState.element, null, "native"), obj = elState.props = {}, i = props.length;
    while(i--)obj[props[i]] = (getProp(props[i]) + "").trim();
    obj.zIndex && (obj.zIndex = parseFloat(obj.zIndex) || 0);
    return elState;
}, $faadebd64d09aa69$var$_applyProps = function _applyProps(element, props) {
    var style = element.style || element, // could pass in a vars object.
    p;
    for(p in props)style[p] = props[p];
}, $faadebd64d09aa69$var$_getID = function _getID(el) {
    var id = el.getAttribute("data-flip-id");
    id || el.setAttribute("data-flip-id", id = "auto-" + $faadebd64d09aa69$var$_id++);
    return id;
}, $faadebd64d09aa69$var$_elementsFromElementStates = function _elementsFromElementStates(elStates) {
    return elStates.map(function(elState) {
        return elState.element;
    });
}, $faadebd64d09aa69$var$_handleCallback = function _handleCallback(callback, elStates, tl) {
    return callback && elStates.length && tl.add(callback($faadebd64d09aa69$var$_elementsFromElementStates(elStates), tl, new $faadebd64d09aa69$var$FlipState(elStates, 0, true)), 0);
}, $faadebd64d09aa69$var$_fit = function _fit(fromState, toState, scale, applyProps, fitChild, vars) {
    var element = fromState.element, cache = fromState.cache, parent = fromState.parent, x = fromState.x, y = fromState.y, width = toState.width, height = toState.height, scaleX = toState.scaleX, scaleY = toState.scaleY, rotation = toState.rotation, bounds = toState.bounds, cssText = vars && element.style.cssText, transform = vars && element.getBBox && element.getAttribute("transform"), dimensionState = fromState, _toState$matrix = toState.matrix, e = _toState$matrix.e, f = _toState$matrix.f, deep = fromState.bounds.width !== bounds.width || fromState.bounds.height !== bounds.height || fromState.scaleX !== scaleX || fromState.scaleY !== scaleY || fromState.rotation !== rotation, simple = !deep && fromState.simple && toState.simple && !fitChild, skewX, fromPoint, toPoint, getProp, parentMatrix, matrix, bbox;
    if (simple || !parent) {
        scaleX = scaleY = 1;
        rotation = skewX = 0;
    } else {
        parentMatrix = $faadebd64d09aa69$var$_getInverseGlobalMatrix(parent);
        matrix = parentMatrix.clone().multiply(toState.ctm ? toState.matrix.clone().multiply(toState.ctm) : toState.matrix); // root SVG elements have a ctm that we must factor out (for example, viewBox:"0 0 94 94" with a width of 200px would scale the internals by 2.127 but when we're matching the size of the root <svg> element itself, that scaling shouldn't factor in!)
        rotation = $faadebd64d09aa69$var$_round(Math.atan2(matrix.b, matrix.a) * $faadebd64d09aa69$var$_RAD2DEG);
        skewX = $faadebd64d09aa69$var$_round(Math.atan2(matrix.c, matrix.d) * $faadebd64d09aa69$var$_RAD2DEG + rotation) % 360; // in very rare cases, minor rounding might end up with 360 which should be 0.
        scaleX = Math.sqrt(Math.pow(matrix.a, 2) + Math.pow(matrix.b, 2));
        scaleY = Math.sqrt(Math.pow(matrix.c, 2) + Math.pow(matrix.d, 2)) * Math.cos(skewX * $faadebd64d09aa69$var$_DEG2RAD);
        if (fitChild) {
            fitChild = $faadebd64d09aa69$var$_toArray(fitChild)[0];
            getProp = $faadebd64d09aa69$var$gsap.getProperty(fitChild);
            bbox = fitChild.getBBox && typeof fitChild.getBBox === "function" && fitChild.getBBox();
            dimensionState = {
                scaleX: getProp("scaleX"),
                scaleY: getProp("scaleY"),
                width: bbox ? bbox.width : Math.ceil(parseFloat(getProp("width", "px"))),
                height: bbox ? bbox.height : parseFloat(getProp("height", "px"))
            };
        }
        cache.rotation = rotation + "deg";
        cache.skewX = skewX + "deg";
    }
    if (scale) {
        scaleX *= width === dimensionState.width || !dimensionState.width ? 1 : width / dimensionState.width; // note if widths are both 0, we should make scaleX 1 - some elements have box-sizing that incorporates padding, etc. and we don't want it to collapse in that case.
        scaleY *= height === dimensionState.height || !dimensionState.height ? 1 : height / dimensionState.height;
        cache.scaleX = scaleX;
        cache.scaleY = scaleY;
    } else {
        width = $faadebd64d09aa69$var$_closestTenth(width * scaleX / dimensionState.scaleX, 0);
        height = $faadebd64d09aa69$var$_closestTenth(height * scaleY / dimensionState.scaleY, 0);
        element.style.width = width + "px";
        element.style.height = height + "px";
    } // if (fromState.isFixed) { // commented out because it's now taken care of in getGlobalMatrix() with a flag at the end.
    // 	e -= _getDocScrollLeft();
    // 	f -= _getDocScrollTop();
    // }
    applyProps && $faadebd64d09aa69$var$_applyProps(element, toState.props);
    if (simple || !parent) {
        x += e - fromState.matrix.e;
        y += f - fromState.matrix.f;
    } else if (deep || parent !== toState.parent) {
        cache.renderTransform(1, cache);
        matrix = (0, $b651d38205e168eb$export$91a495f99cf781b7)(fitChild || element, false, false, true);
        fromPoint = parentMatrix.apply({
            x: matrix.e,
            y: matrix.f
        });
        toPoint = parentMatrix.apply({
            x: e,
            y: f
        });
        x += toPoint.x - fromPoint.x;
        y += toPoint.y - fromPoint.y;
    } else {
        // use a faster/cheaper algorithm if we're just moving x/y
        parentMatrix.e = parentMatrix.f = 0;
        toPoint = parentMatrix.apply({
            x: e - fromState.matrix.e,
            y: f - fromState.matrix.f
        });
        x += toPoint.x;
        y += toPoint.y;
    }
    x = $faadebd64d09aa69$var$_closestTenth(x, 0.02);
    y = $faadebd64d09aa69$var$_closestTenth(y, 0.02);
    if (vars && !(vars instanceof $faadebd64d09aa69$var$ElementState)) {
        // revert
        element.style.cssText = cssText;
        element.getBBox && element.setAttribute("transform", transform || "");
        cache.uncache = 1;
    } else {
        // or apply the transform immediately
        cache.x = x + "px";
        cache.y = y + "px";
        cache.renderTransform(1, cache);
    }
    if (vars) {
        vars.x = x;
        vars.y = y;
        vars.rotation = rotation;
        vars.skewX = skewX;
        if (scale) {
            vars.scaleX = scaleX;
            vars.scaleY = scaleY;
        } else {
            vars.width = width;
            vars.height = height;
        }
    }
    return vars || cache;
}, $faadebd64d09aa69$var$_parseState = function _parseState(targetsOrState, vars) {
    return targetsOrState instanceof $faadebd64d09aa69$var$FlipState ? targetsOrState : new $faadebd64d09aa69$var$FlipState(targetsOrState, vars);
}, $faadebd64d09aa69$var$_getChangingElState = function _getChangingElState(toState, fromState, id) {
    var to1 = toState.idLookup[id], to2 = toState.alt[id];
    return to2.isVisible && (!(fromState.getElementState(to2.element) || to2).isVisible || !to1.isVisible) ? to2 : to1;
}, $faadebd64d09aa69$var$_bodyMetrics = [], $faadebd64d09aa69$var$_bodyProps = "width,height,overflowX,overflowY".split(","), $faadebd64d09aa69$var$_bodyLocked, $faadebd64d09aa69$var$_lockBodyScroll = function _lockBodyScroll(lock) {
    // if there's no scrollbar, we should lock that so that measurements don't get affected by temporary repositioning, like if something is centered in the window.
    if (lock !== $faadebd64d09aa69$var$_bodyLocked) {
        var s = $faadebd64d09aa69$var$_body.style, w = $faadebd64d09aa69$var$_body.clientWidth === window.outerWidth, h = $faadebd64d09aa69$var$_body.clientHeight === window.outerHeight, i = 4;
        if (lock && (w || h)) {
            while(i--)$faadebd64d09aa69$var$_bodyMetrics[i] = s[$faadebd64d09aa69$var$_bodyProps[i]];
            if (w) {
                s.width = $faadebd64d09aa69$var$_body.clientWidth + "px";
                s.overflowY = "hidden";
            }
            if (h) {
                s.height = $faadebd64d09aa69$var$_body.clientHeight + "px";
                s.overflowX = "hidden";
            }
            $faadebd64d09aa69$var$_bodyLocked = lock;
        } else if ($faadebd64d09aa69$var$_bodyLocked) {
            while(i--)$faadebd64d09aa69$var$_bodyMetrics[i] ? s[$faadebd64d09aa69$var$_bodyProps[i]] = $faadebd64d09aa69$var$_bodyMetrics[i] : s.removeProperty($faadebd64d09aa69$var$_camelToDashed($faadebd64d09aa69$var$_bodyProps[i]));
            $faadebd64d09aa69$var$_bodyLocked = lock;
        }
    }
}, $faadebd64d09aa69$var$_fromTo = function _fromTo(fromState, toState, vars, relative) {
    // relative is -1 if "from()", and 1 if "to()"
    fromState instanceof $faadebd64d09aa69$var$FlipState && toState instanceof $faadebd64d09aa69$var$FlipState || console.warn("Not a valid state object.");
    vars = vars || {};
    var _vars = vars, clearProps = _vars.clearProps, onEnter = _vars.onEnter, onLeave = _vars.onLeave, absolute = _vars.absolute, absoluteOnLeave = _vars.absoluteOnLeave, custom = _vars.custom, delay = _vars.delay, paused = _vars.paused, repeat = _vars.repeat, repeatDelay = _vars.repeatDelay, yoyo = _vars.yoyo, toggleClass = _vars.toggleClass, nested = _vars.nested, _zIndex = _vars.zIndex, scale = _vars.scale, fade = _vars.fade, stagger = _vars.stagger, spin = _vars.spin, prune = _vars.prune, props = ("props" in vars ? vars : fromState).props, tweenVars = $faadebd64d09aa69$var$_copy(vars, $faadebd64d09aa69$var$_reserved), animation = $faadebd64d09aa69$var$gsap.timeline({
        delay: delay,
        paused: paused,
        repeat: repeat,
        repeatDelay: repeatDelay,
        yoyo: yoyo,
        data: "isFlip"
    }), remainingProps = tweenVars, entering = [], leaving = [], comps = [], swapOutTargets = [], spinNum = spin === true ? 1 : spin || 0, spinFunc = typeof spin === "function" ? spin : function() {
        return spinNum;
    }, interrupted = fromState.interrupted || toState.interrupted, addFunc = animation[relative !== 1 ? "to" : "from"], v, p, endTime, i, el, comp, state, targets, finalStates, fromNode, toNode, run, a, b; //relative || (toState = (new FlipState(toState.targets, {props: props})).fit(toState, scale));
    for(p in toState.idLookup){
        toNode = !toState.alt[p] ? toState.idLookup[p] : $faadebd64d09aa69$var$_getChangingElState(toState, fromState, p);
        el = toNode.element;
        fromNode = fromState.idLookup[p];
        fromState.alt[p] && el === fromNode.element && (fromState.alt[p].isVisible || !toNode.isVisible) && (fromNode = fromState.alt[p]);
        if (fromNode) {
            comp = {
                t: el,
                b: fromNode,
                a: toNode,
                sd: fromNode.element === el ? 0 : toNode.isVisible ? 1 : -1
            };
            comps.push(comp);
            if (comp.sd) {
                if (comp.sd < 0) {
                    comp.b = toNode;
                    comp.a = fromNode;
                } // for swapping elements that got interrupted, we must re-record the inline styles to ensure they're not tainted. Remember, .batch() permits getState() not to force in-progress flips to their end state.
                interrupted && $faadebd64d09aa69$var$_recordInlineStyles(comp.b, props ? $faadebd64d09aa69$var$_memoizedRemoveProps[props] : $faadebd64d09aa69$var$_removeProps);
                fade && comps.push(comp.swap = {
                    t: fromNode.element,
                    b: comp.b,
                    a: comp.a,
                    sd: -comp.sd,
                    swap: comp
                });
            }
            el._flip = fromNode.element._flip = $faadebd64d09aa69$var$_batch ? $faadebd64d09aa69$var$_batch.timeline : animation;
        } else if (toNode.isVisible) {
            comps.push({
                t: el,
                b: $faadebd64d09aa69$var$_copy(toNode, {
                    isVisible: 1
                }),
                a: toNode,
                sd: 0,
                entering: 1
            }); // to include it in the "entering" Array and do absolute positioning if necessary
            el._flip = $faadebd64d09aa69$var$_batch ? $faadebd64d09aa69$var$_batch.timeline : animation;
        }
    }
    props && ($faadebd64d09aa69$var$_memoizedProps[props] || $faadebd64d09aa69$var$_memoizeProps(props)).forEach(function(p) {
        return tweenVars[p] = function(i) {
            return comps[i].a.props[p];
        };
    });
    comps.finalStates = finalStates = [];
    run = function run() {
        $faadebd64d09aa69$var$_orderByDOMDepth(comps);
        $faadebd64d09aa69$var$_lockBodyScroll(true); // otherwise, measurements may get thrown off when things get fit.
        // TODO: cache the matrix, especially for parent because it'll probably get reused quite a bit, but lock it to a particular cycle(?).
        for(i = 0; i < comps.length; i++){
            comp = comps[i];
            a = comp.a;
            b = comp.b;
            if (prune && !a.isDifferent(b) && !comp.entering) // only flip if things changed! Don't omit it from comps initially because that'd prevent the element from being positioned absolutely (if necessary)
            comps.splice(i--, 1);
            else {
                el = comp.t;
                nested && !(comp.sd < 0) && i && (a.matrix = (0, $b651d38205e168eb$export$91a495f99cf781b7)(el, false, false, true)); // moving a parent affects the position of children
                if (b.isVisible && a.isVisible) {
                    if (comp.sd < 0) {
                        // swapping OUT (swap direction of -1 is out)
                        state = new $faadebd64d09aa69$var$ElementState(el, props, fromState.simple);
                        $faadebd64d09aa69$var$_fit(state, a, scale, 0, 0, state);
                        state.matrix = (0, $b651d38205e168eb$export$91a495f99cf781b7)(el, false, false, true);
                        state.css = comp.b.css;
                        comp.a = a = state;
                        fade && (el.style.opacity = interrupted ? b.opacity : a.opacity);
                        stagger && swapOutTargets.push(el);
                    } else if (comp.sd > 0 && fade) // swapping IN (swap direction of 1 is in)
                    el.style.opacity = interrupted ? a.opacity - b.opacity : "0";
                    $faadebd64d09aa69$var$_fit(a, b, scale, props);
                } else if (b.isVisible !== a.isVisible) {
                    // either entering or leaving (one side is invisible)
                    if (!b.isVisible) {
                        // entering
                        a.isVisible && entering.push(a);
                        comps.splice(i--, 1);
                    } else if (!a.isVisible) {
                        // leaving
                        b.css = a.css;
                        leaving.push(b);
                        comps.splice(i--, 1);
                        absolute && nested && $faadebd64d09aa69$var$_fit(a, b, scale, props);
                    }
                }
                if (!scale) {
                    el.style.maxWidth = Math.max(a.width, b.width) + "px";
                    el.style.maxHeight = Math.max(a.height, b.height) + "px";
                    el.style.minWidth = Math.min(a.width, b.width) + "px";
                    el.style.minHeight = Math.min(a.height, b.height) + "px";
                }
                nested && toggleClass && el.classList.add(toggleClass);
            }
            finalStates.push(a);
        }
        var classTargets;
        if (toggleClass) {
            classTargets = finalStates.map(function(s) {
                return s.element;
            });
            nested && classTargets.forEach(function(e) {
                return e.classList.remove(toggleClass);
            }); // there could be a delay, so don't leave the classes applied (we'll do it in a timeline callback)
        }
        $faadebd64d09aa69$var$_lockBodyScroll(false);
        if (scale) {
            tweenVars.scaleX = function(i) {
                return comps[i].a.scaleX;
            };
            tweenVars.scaleY = function(i) {
                return comps[i].a.scaleY;
            };
        } else {
            tweenVars.width = function(i) {
                return comps[i].a.width + "px";
            };
            tweenVars.height = function(i) {
                return comps[i].a.height + "px";
            };
            tweenVars.autoRound = vars.autoRound || false;
        }
        tweenVars.x = function(i) {
            return comps[i].a.x + "px";
        };
        tweenVars.y = function(i) {
            return comps[i].a.y + "px";
        };
        tweenVars.rotation = function(i) {
            return comps[i].a.rotation + (spin ? spinFunc(i, targets[i], targets) * 360 : 0);
        };
        tweenVars.skewX = function(i) {
            return comps[i].a.skewX;
        };
        targets = comps.map(function(c) {
            return c.t;
        });
        if (_zIndex || _zIndex === 0) {
            tweenVars.modifiers = {
                zIndex: function zIndex() {
                    return _zIndex;
                }
            };
            tweenVars.zIndex = _zIndex;
            tweenVars.immediateRender = vars.immediateRender !== false;
        }
        fade && (tweenVars.opacity = function(i) {
            return comps[i].sd < 0 ? 0 : comps[i].sd > 0 ? comps[i].a.opacity : "+=0";
        });
        if (swapOutTargets.length) {
            stagger = $faadebd64d09aa69$var$gsap.utils.distribute(stagger);
            var dummyArray = targets.slice(swapOutTargets.length);
            tweenVars.stagger = function(i, el) {
                return stagger(~swapOutTargets.indexOf(el) ? targets.indexOf(comps[i].swap.t) : i, el, dummyArray);
            };
        } // // for testing...
        // gsap.delayedCall(vars.data ? 50 : 1, function() {
        // 	animation.eventCallback("onComplete", () => _setFinalStates(comps, !clearProps));
        // 	addFunc.call(animation, targets, tweenVars, 0).play();
        // });
        // return;
        $faadebd64d09aa69$var$_callbacks.forEach(function(name) {
            return vars[name] && animation.eventCallback(name, vars[name], vars[name + "Params"]);
        }); // apply callbacks to the timeline, not tweens (because "custom" timing can make multiple tweens)
        if (custom && targets.length) {
            // bust out the custom properties as their own tweens so they can use different eases, durations, etc.
            remainingProps = $faadebd64d09aa69$var$_copy(tweenVars, $faadebd64d09aa69$var$_reserved);
            if ("scale" in custom) {
                custom.scaleX = custom.scaleY = custom.scale;
                delete custom.scale;
            }
            for(p in custom){
                v = $faadebd64d09aa69$var$_copy(custom[p], $faadebd64d09aa69$var$_fitReserved);
                v[p] = tweenVars[p];
                !("duration" in v) && "duration" in tweenVars && (v.duration = tweenVars.duration);
                v.stagger = tweenVars.stagger;
                addFunc.call(animation, targets, v, 0);
                delete remainingProps[p];
            }
        }
        if (targets.length || leaving.length || entering.length) {
            toggleClass && animation.add(function() {
                return $faadebd64d09aa69$var$_toggleClass(classTargets, toggleClass, animation._zTime < 0 ? "remove" : "add");
            }, 0) && !paused && $faadebd64d09aa69$var$_toggleClass(classTargets, toggleClass, "add");
            targets.length && addFunc.call(animation, targets, remainingProps, 0);
        }
        $faadebd64d09aa69$var$_handleCallback(onEnter, entering, animation);
        $faadebd64d09aa69$var$_handleCallback(onLeave, leaving, animation);
        var batchTl = $faadebd64d09aa69$var$_batch && $faadebd64d09aa69$var$_batch.timeline;
        if (batchTl) {
            batchTl.add(animation, 0);
            $faadebd64d09aa69$var$_batch._final.push(function() {
                return $faadebd64d09aa69$var$_setFinalStates(comps, !clearProps);
            });
        }
        endTime = animation.duration();
        animation.call(function() {
            var forward = animation.time() >= endTime;
            forward && !batchTl && $faadebd64d09aa69$var$_setFinalStates(comps, !clearProps);
            toggleClass && $faadebd64d09aa69$var$_toggleClass(classTargets, toggleClass, forward ? "remove" : "add");
        });
    };
    absoluteOnLeave && (absolute = comps.filter(function(comp) {
        return !comp.sd && !comp.a.isVisible && comp.b.isVisible;
    }).map(function(comp) {
        return comp.a.element;
    }));
    if ($faadebd64d09aa69$var$_batch) {
        var _batch$_abs;
        absolute && (_batch$_abs = $faadebd64d09aa69$var$_batch._abs).push.apply(_batch$_abs, $faadebd64d09aa69$var$_filterComps(comps, absolute));
        $faadebd64d09aa69$var$_batch._run.push(run);
    } else {
        absolute && $faadebd64d09aa69$var$_makeCompsAbsolute($faadebd64d09aa69$var$_filterComps(comps, absolute)); // when making absolute, we must go in a very particular order so that document flow changes don't affect things. Don't make it visible if both the before and after states are invisible! There's no point, and it could make things appear visible during the flip that shouldn't be.
        run();
    }
    var anim = $faadebd64d09aa69$var$_batch ? $faadebd64d09aa69$var$_batch.timeline : animation;
    anim.revert = function() {
        return $faadebd64d09aa69$var$_killFlip(anim, 1);
    }; // a Flip timeline should behave very different when reverting - it should actually jump to the end so that styles get cleared out.
    return anim;
}, $faadebd64d09aa69$var$_interrupt = function _interrupt(tl) {
    tl.vars.onInterrupt && tl.vars.onInterrupt.apply(tl, tl.vars.onInterruptParams || []);
    tl.getChildren(true, false, true).forEach(_interrupt);
}, $faadebd64d09aa69$var$_killFlip = function _killFlip(tl, action) {
    // action: 0 = nothing, 1 = complete, 2 = only kill (don't complete)
    if (tl && tl.progress() < 1 && !tl.paused()) {
        if (action) {
            $faadebd64d09aa69$var$_interrupt(tl);
            action < 2 && tl.progress(1); // we should also kill it in case it was added to a parent timeline.
            tl.kill();
        }
        return true;
    }
}, $faadebd64d09aa69$var$_createLookup = function _createLookup(state) {
    var lookup = state.idLookup = {}, alt = state.alt = {}, elStates = state.elementStates, i = elStates.length, elState;
    while(i--){
        elState = elStates[i];
        lookup[elState.id] ? alt[elState.id] = elState : lookup[elState.id] = elState;
    }
};
var $faadebd64d09aa69$var$FlipState = /*#__PURE__*/ function() {
    function FlipState(targets, vars, targetsAreElementStates) {
        this.props = vars && vars.props;
        this.simple = !!(vars && vars.simple);
        if (targetsAreElementStates) {
            this.targets = $faadebd64d09aa69$var$_elementsFromElementStates(targets);
            this.elementStates = targets;
            $faadebd64d09aa69$var$_createLookup(this);
        } else {
            this.targets = $faadebd64d09aa69$var$_toArray(targets);
            var soft = vars && (vars.kill === false || vars.batch && !vars.kill);
            $faadebd64d09aa69$var$_batch && !soft && $faadebd64d09aa69$var$_batch._kill.push(this);
            this.update(soft || !!$faadebd64d09aa69$var$_batch); // when batching, don't force in-progress flips to their end; we need to do that AFTER all getStates() are called.
        }
    }
    var _proto = FlipState.prototype;
    _proto.update = function update(soft) {
        var _this = this;
        this.elementStates = this.targets.map(function(el) {
            return new $faadebd64d09aa69$var$ElementState(el, _this.props, _this.simple);
        });
        $faadebd64d09aa69$var$_createLookup(this);
        this.interrupt(soft);
        this.recordInlineStyles();
        return this;
    };
    _proto.clear = function clear() {
        this.targets.length = this.elementStates.length = 0;
        $faadebd64d09aa69$var$_createLookup(this);
        return this;
    };
    _proto.fit = function fit(state, scale, nested) {
        var elStatesInOrder = $faadebd64d09aa69$var$_orderByDOMDepth(this.elementStates.slice(0), false, true), toElStates = (state || this).idLookup, i = 0, fromNode, toNode;
        for(; i < elStatesInOrder.length; i++){
            fromNode = elStatesInOrder[i];
            nested && (fromNode.matrix = (0, $b651d38205e168eb$export$91a495f99cf781b7)(fromNode.element, false, false, true)); // moving a parent affects the position of children
            toNode = toElStates[fromNode.id];
            toNode && $faadebd64d09aa69$var$_fit(fromNode, toNode, scale, true, 0, fromNode);
            fromNode.matrix = (0, $b651d38205e168eb$export$91a495f99cf781b7)(fromNode.element, false, false, true);
        }
        return this;
    };
    _proto.getProperty = function getProperty(element, property) {
        var es = this.getElementState(element) || $faadebd64d09aa69$var$_emptyObj;
        return (property in es ? es : es.props || $faadebd64d09aa69$var$_emptyObj)[property];
    };
    _proto.add = function add(state) {
        var i = state.targets.length, lookup = this.idLookup, alt = this.alt, index, es, es2;
        while(i--){
            es = state.elementStates[i];
            es2 = lookup[es.id];
            if (es2 && (es.element === es2.element || alt[es.id] && alt[es.id].element === es.element)) {
                // if the flip id is already in this FlipState, replace it!
                index = this.elementStates.indexOf(es.element === es2.element ? es2 : alt[es.id]);
                this.targets.splice(index, 1, state.targets[i]);
                this.elementStates.splice(index, 1, es);
            } else {
                this.targets.push(state.targets[i]);
                this.elementStates.push(es);
            }
        }
        state.interrupted && (this.interrupted = true);
        state.simple || (this.simple = false);
        $faadebd64d09aa69$var$_createLookup(this);
        return this;
    };
    _proto.compare = function compare(state) {
        var l1 = state.idLookup, l2 = this.idLookup, unchanged = [], changed = [], enter = [], leave = [], targets = [], a1 = state.alt, a2 = this.alt, place = function place(s1, s2, el) {
            return (s1.isVisible !== s2.isVisible ? s1.isVisible ? enter : leave : s1.isVisible ? changed : unchanged).push(el) && targets.push(el);
        }, placeIfDoesNotExist = function placeIfDoesNotExist(s1, s2, el) {
            return targets.indexOf(el) < 0 && place(s1, s2, el);
        }, s1, s2, p, el, s1Alt, s2Alt, c1, c2;
        for(p in l1){
            s1Alt = a1[p];
            s2Alt = a2[p];
            s1 = !s1Alt ? l1[p] : $faadebd64d09aa69$var$_getChangingElState(state, this, p);
            el = s1.element;
            s2 = l2[p];
            if (s2Alt) {
                c2 = s2.isVisible || !s2Alt.isVisible && el === s2.element ? s2 : s2Alt;
                c1 = s1Alt && !s1.isVisible && !s1Alt.isVisible && c2.element === s1Alt.element ? s1Alt : s1; //c1.element !== c2.element && c1.element === s2.element && (c2 = s2);
                if (c1.isVisible && c2.isVisible && c1.element !== c2.element) {
                    // swapping, so force into "changed" array
                    (c1.isDifferent(c2) ? changed : unchanged).push(c1.element, c2.element);
                    targets.push(c1.element, c2.element);
                } else place(c1, c2, c1.element);
                s1Alt && c1.element === s1Alt.element && (s1Alt = l1[p]);
                placeIfDoesNotExist(c1.element !== s2.element && s1Alt ? s1Alt : c1, s2, s2.element);
                placeIfDoesNotExist(s1Alt && s1Alt.element === s2Alt.element ? s1Alt : c1, s2Alt, s2Alt.element);
                s1Alt && placeIfDoesNotExist(s1Alt, s2Alt.element === s1Alt.element ? s2Alt : s2, s1Alt.element);
            } else {
                !s2 ? enter.push(el) : !s2.isDifferent(s1) ? unchanged.push(el) : place(s1, s2, el);
                s1Alt && placeIfDoesNotExist(s1Alt, s2, s1Alt.element);
            }
        }
        for(p in l2)if (!l1[p]) {
            leave.push(l2[p].element);
            a2[p] && leave.push(a2[p].element);
        }
        return {
            changed: changed,
            unchanged: unchanged,
            enter: enter,
            leave: leave
        };
    };
    _proto.recordInlineStyles = function recordInlineStyles() {
        var props = $faadebd64d09aa69$var$_memoizedRemoveProps[this.props] || $faadebd64d09aa69$var$_removeProps, i = this.elementStates.length;
        while(i--)$faadebd64d09aa69$var$_recordInlineStyles(this.elementStates[i], props);
    };
    _proto.interrupt = function interrupt(soft) {
        var _this2 = this;
        // soft = DON'T force in-progress flip animations to completion (like when running a batch, we can't immediately kill flips when getting states because it could contaminate positioning and other .getState() calls that will run in the batch (we kill AFTER all the .getState() calls complete).
        var timelines = [];
        this.targets.forEach(function(t) {
            var tl = t._flip, foundInProgress = $faadebd64d09aa69$var$_killFlip(tl, soft ? 0 : 1);
            soft && foundInProgress && timelines.indexOf(tl) < 0 && tl.add(function() {
                return _this2.updateVisibility();
            });
            foundInProgress && timelines.push(tl);
        });
        !soft && timelines.length && this.updateVisibility(); // if we found an in-progress Flip animation, we must record all the values in their current state at that point BUT we should update the isVisible value AFTER pushing that flip to completion so that elements that are entering or leaving will populate those Arrays properly.
        this.interrupted || (this.interrupted = !!timelines.length);
    };
    _proto.updateVisibility = function updateVisibility() {
        this.elementStates.forEach(function(es) {
            var b = es.element.getBoundingClientRect();
            es.isVisible = !!(b.width || b.height || b.top || b.left);
            es.uncache = 1;
        });
    };
    _proto.getElementState = function getElementState(element) {
        return this.elementStates[this.targets.indexOf($faadebd64d09aa69$var$_getEl(element))];
    };
    _proto.makeAbsolute = function makeAbsolute() {
        return $faadebd64d09aa69$var$_orderByDOMDepth(this.elementStates.slice(0), true, true).map($faadebd64d09aa69$var$_makeAbsolute);
    };
    return FlipState;
}();
var $faadebd64d09aa69$var$ElementState = /*#__PURE__*/ function() {
    function ElementState(element, props, simple) {
        this.element = element;
        this.update(props, simple);
    }
    var _proto2 = ElementState.prototype;
    _proto2.isDifferent = function isDifferent(state) {
        var b1 = this.bounds, b2 = state.bounds;
        return b1.top !== b2.top || b1.left !== b2.left || b1.width !== b2.width || b1.height !== b2.height || !this.matrix.equals(state.matrix) || this.opacity !== state.opacity || this.props && state.props && JSON.stringify(this.props) !== JSON.stringify(state.props);
    };
    _proto2.update = function update(props, simple) {
        var self = this, element = self.element, getProp = $faadebd64d09aa69$var$gsap.getProperty(element), cache = $faadebd64d09aa69$var$gsap.core.getCache(element), bounds = element.getBoundingClientRect(), bbox = element.getBBox && typeof element.getBBox === "function" && element.nodeName.toLowerCase() !== "svg" && element.getBBox(), m = simple ? new (0, $b651d38205e168eb$export$26e6ecd136a15474)(1, 0, 0, 1, bounds.left + (0, $b651d38205e168eb$export$cf8963d945186253)(), bounds.top + (0, $b651d38205e168eb$export$ffd2ae2432b6e61c)()) : (0, $b651d38205e168eb$export$91a495f99cf781b7)(element, false, false, true);
        self.getProp = getProp;
        self.element = element;
        self.id = $faadebd64d09aa69$var$_getID(element);
        self.matrix = m;
        self.cache = cache;
        self.bounds = bounds;
        self.isVisible = !!(bounds.width || bounds.height || bounds.left || bounds.top);
        self.display = getProp("display");
        self.position = getProp("position");
        self.parent = element.parentNode;
        self.x = getProp("x");
        self.y = getProp("y");
        self.scaleX = cache.scaleX;
        self.scaleY = cache.scaleY;
        self.rotation = getProp("rotation");
        self.skewX = getProp("skewX");
        self.opacity = getProp("opacity");
        self.width = bbox ? bbox.width : $faadebd64d09aa69$var$_closestTenth(getProp("width", "px"), 0.04); // round up to the closest 0.1 so that text doesn't wrap.
        self.height = bbox ? bbox.height : $faadebd64d09aa69$var$_closestTenth(getProp("height", "px"), 0.04);
        props && $faadebd64d09aa69$var$_recordProps(self, $faadebd64d09aa69$var$_memoizedProps[props] || $faadebd64d09aa69$var$_memoizeProps(props));
        self.ctm = element.getCTM && element.nodeName.toLowerCase() === "svg" && (0, $b651d38205e168eb$export$a2b87f76ca5ccbd0)(element).inverse();
        self.simple = simple || $faadebd64d09aa69$var$_round(m.a) === 1 && !$faadebd64d09aa69$var$_round(m.b) && !$faadebd64d09aa69$var$_round(m.c) && $faadebd64d09aa69$var$_round(m.d) === 1; // allows us to speed through some other tasks if it's not scale/rotated
        self.uncache = 0;
    };
    return ElementState;
}();
var $faadebd64d09aa69$var$FlipAction = /*#__PURE__*/ function() {
    function FlipAction(vars, batch) {
        this.vars = vars;
        this.batch = batch;
        this.states = [];
        this.timeline = batch.timeline;
    }
    var _proto3 = FlipAction.prototype;
    _proto3.getStateById = function getStateById(id) {
        var i = this.states.length;
        while(i--){
            if (this.states[i].idLookup[id]) return this.states[i];
        }
    };
    _proto3.kill = function kill() {
        this.batch.remove(this);
    };
    return FlipAction;
}();
var $faadebd64d09aa69$var$FlipBatch = /*#__PURE__*/ function() {
    function FlipBatch(id) {
        this.id = id;
        this.actions = [];
        this._kill = [];
        this._final = [];
        this._abs = [];
        this._run = [];
        this.data = {};
        this.state = new $faadebd64d09aa69$var$FlipState();
        this.timeline = $faadebd64d09aa69$var$gsap.timeline();
    }
    var _proto4 = FlipBatch.prototype;
    _proto4.add = function add(config) {
        var result = this.actions.filter(function(action) {
            return action.vars === config;
        });
        if (result.length) return result[0];
        result = new $faadebd64d09aa69$var$FlipAction(typeof config === "function" ? {
            animate: config
        } : config, this);
        this.actions.push(result);
        return result;
    };
    _proto4.remove = function remove(action) {
        var i = this.actions.indexOf(action);
        i >= 0 && this.actions.splice(i, 1);
        return this;
    };
    _proto4.getState = function getState(merge) {
        var _this3 = this;
        var prevBatch = $faadebd64d09aa69$var$_batch, prevAction = $faadebd64d09aa69$var$_batchAction;
        $faadebd64d09aa69$var$_batch = this;
        this.state.clear();
        this._kill.length = 0;
        this.actions.forEach(function(action) {
            if (action.vars.getState) {
                action.states.length = 0;
                $faadebd64d09aa69$var$_batchAction = action;
                action.state = action.vars.getState(action);
            }
            merge && action.states.forEach(function(s) {
                return _this3.state.add(s);
            });
        });
        $faadebd64d09aa69$var$_batchAction = prevAction;
        $faadebd64d09aa69$var$_batch = prevBatch;
        this.killConflicts();
        return this;
    };
    _proto4.animate = function animate() {
        var _this4 = this;
        var prevBatch = $faadebd64d09aa69$var$_batch, tl = this.timeline, i = this.actions.length, finalStates, endTime;
        $faadebd64d09aa69$var$_batch = this;
        tl.clear();
        this._abs.length = this._final.length = this._run.length = 0;
        this.actions.forEach(function(a) {
            a.vars.animate && a.vars.animate(a);
            var onEnter = a.vars.onEnter, onLeave = a.vars.onLeave, targets = a.targets, s, result;
            if (targets && targets.length && (onEnter || onLeave)) {
                s = new $faadebd64d09aa69$var$FlipState();
                a.states.forEach(function(state) {
                    return s.add(state);
                });
                result = s.compare($faadebd64d09aa69$export$4d2fae537bd90431.getState(targets));
                result.enter.length && onEnter && onEnter(result.enter);
                result.leave.length && onLeave && onLeave(result.leave);
            }
        });
        $faadebd64d09aa69$var$_makeCompsAbsolute(this._abs);
        this._run.forEach(function(f) {
            return f();
        });
        endTime = tl.duration();
        finalStates = this._final.slice(0);
        tl.add(function() {
            if (endTime <= tl.time()) {
                // only call if moving forward in the timeline (in case it's nested in a timeline that gets reversed)
                finalStates.forEach(function(f) {
                    return f();
                });
                $faadebd64d09aa69$var$_forEachBatch(_this4, "onComplete");
            }
        });
        $faadebd64d09aa69$var$_batch = prevBatch;
        while(i--)this.actions[i].vars.once && this.actions[i].kill();
        $faadebd64d09aa69$var$_forEachBatch(this, "onStart");
        tl.restart();
        return this;
    };
    _proto4.loadState = function loadState(done) {
        done || (done = function done() {
            return 0;
        });
        var queue = [];
        this.actions.forEach(function(c) {
            if (c.vars.loadState) {
                var i, f = function f(targets) {
                    targets && (c.targets = targets);
                    i = queue.indexOf(f);
                    if (~i) {
                        queue.splice(i, 1);
                        queue.length || done();
                    }
                };
                queue.push(f);
                c.vars.loadState(f);
            }
        });
        queue.length || done();
        return this;
    };
    _proto4.setState = function setState() {
        this.actions.forEach(function(c) {
            return c.targets = c.vars.setState && c.vars.setState(c);
        });
        return this;
    };
    _proto4.killConflicts = function killConflicts(soft) {
        this.state.interrupt(soft);
        this._kill.forEach(function(state) {
            return state.interrupt(soft);
        });
        return this;
    };
    _proto4.run = function run(skipGetState, merge) {
        var _this5 = this;
        if (this !== $faadebd64d09aa69$var$_batch) {
            skipGetState || this.getState(merge);
            this.loadState(function() {
                if (!_this5._killed) {
                    _this5.setState();
                    _this5.animate();
                }
            });
        }
        return this;
    };
    _proto4.clear = function clear(stateOnly) {
        this.state.clear();
        stateOnly || (this.actions.length = 0);
    };
    _proto4.getStateById = function getStateById(id) {
        var i = this.actions.length, s;
        while(i--){
            s = this.actions[i].getStateById(id);
            if (s) return s;
        }
        return this.state.idLookup[id] && this.state;
    };
    _proto4.kill = function kill() {
        this._killed = 1;
        this.clear();
        delete $faadebd64d09aa69$var$_batchLookup[this.id];
    };
    return FlipBatch;
}();
var $faadebd64d09aa69$export$4d2fae537bd90431 = /*#__PURE__*/ function() {
    function Flip() {}
    Flip.getState = function getState(targets, vars) {
        var state = $faadebd64d09aa69$var$_parseState(targets, vars);
        $faadebd64d09aa69$var$_batchAction && $faadebd64d09aa69$var$_batchAction.states.push(state);
        vars && vars.batch && Flip.batch(vars.batch).state.add(state);
        return state;
    };
    Flip.from = function from(state, vars) {
        vars = vars || {};
        "clearProps" in vars || (vars.clearProps = true);
        return $faadebd64d09aa69$var$_fromTo(state, $faadebd64d09aa69$var$_parseState(vars.targets || state.targets, {
            props: vars.props || state.props,
            simple: vars.simple,
            kill: !!vars.kill
        }), vars, -1);
    };
    Flip.to = function to(state, vars) {
        return $faadebd64d09aa69$var$_fromTo(state, $faadebd64d09aa69$var$_parseState(vars.targets || state.targets, {
            props: vars.props || state.props,
            simple: vars.simple,
            kill: !!vars.kill
        }), vars, 1);
    };
    Flip.fromTo = function fromTo(fromState, toState, vars) {
        return $faadebd64d09aa69$var$_fromTo(fromState, toState, vars);
    };
    Flip.fit = function fit(fromEl, toEl, vars) {
        var v = vars ? $faadebd64d09aa69$var$_copy(vars, $faadebd64d09aa69$var$_fitReserved) : {}, _ref = vars || v, absolute = _ref.absolute, scale = _ref.scale, getVars = _ref.getVars, props = _ref.props, runBackwards = _ref.runBackwards, onComplete = _ref.onComplete, simple = _ref.simple, fitChild = vars && vars.fitChild && $faadebd64d09aa69$var$_getEl(vars.fitChild), before = $faadebd64d09aa69$var$_parseElementState(toEl, props, simple, fromEl), after = $faadebd64d09aa69$var$_parseElementState(fromEl, 0, simple, before), inlineProps = props ? $faadebd64d09aa69$var$_memoizedRemoveProps[props] : $faadebd64d09aa69$var$_removeProps;
        props && $faadebd64d09aa69$var$_applyProps(v, before.props);
        if (runBackwards) {
            $faadebd64d09aa69$var$_recordInlineStyles(after, inlineProps);
            "immediateRender" in v || (v.immediateRender = true);
            v.onComplete = function() {
                $faadebd64d09aa69$var$_applyInlineStyles(after);
                onComplete && onComplete.apply(this, arguments);
            };
        }
        absolute && $faadebd64d09aa69$var$_makeAbsolute(after, before);
        v = $faadebd64d09aa69$var$_fit(after, before, scale || fitChild, props, fitChild, v.duration || getVars ? v : 0);
        return getVars ? v : v.duration ? $faadebd64d09aa69$var$gsap.to(after.element, v) : null;
    };
    Flip.makeAbsolute = function makeAbsolute(targetsOrStates, vars) {
        return (targetsOrStates instanceof $faadebd64d09aa69$var$FlipState ? targetsOrStates : new $faadebd64d09aa69$var$FlipState(targetsOrStates, vars)).makeAbsolute();
    };
    Flip.batch = function batch(id) {
        id || (id = "default");
        return $faadebd64d09aa69$var$_batchLookup[id] || ($faadebd64d09aa69$var$_batchLookup[id] = new $faadebd64d09aa69$var$FlipBatch(id));
    };
    Flip.killFlipsOf = function killFlipsOf(targets, complete) {
        (targets instanceof $faadebd64d09aa69$var$FlipState ? targets.targets : $faadebd64d09aa69$var$_toArray(targets)).forEach(function(t) {
            return t && $faadebd64d09aa69$var$_killFlip(t._flip, complete !== false ? 1 : 2);
        });
    };
    Flip.isFlipping = function isFlipping(target) {
        var f = Flip.getByTarget(target);
        return !!f && f.isActive();
    };
    Flip.getByTarget = function getByTarget(target) {
        return ($faadebd64d09aa69$var$_getEl(target) || $faadebd64d09aa69$var$_emptyObj)._flip;
    };
    Flip.getElementState = function getElementState(target, props) {
        return new $faadebd64d09aa69$var$ElementState($faadebd64d09aa69$var$_getEl(target), props);
    };
    Flip.convertCoordinates = function convertCoordinates(fromElement, toElement, point) {
        var m = (0, $b651d38205e168eb$export$91a495f99cf781b7)(toElement, true, true).multiply((0, $b651d38205e168eb$export$91a495f99cf781b7)(fromElement));
        return point ? m.apply(point) : m;
    };
    Flip.register = function register(core) {
        $faadebd64d09aa69$var$_body = typeof document !== "undefined" && document.body;
        if ($faadebd64d09aa69$var$_body) {
            $faadebd64d09aa69$var$gsap = core;
            (0, $b651d38205e168eb$export$33c547c3e20d49b1)($faadebd64d09aa69$var$_body);
            $faadebd64d09aa69$var$_toArray = $faadebd64d09aa69$var$gsap.utils.toArray;
            var snap = $faadebd64d09aa69$var$gsap.utils.snap(0.1);
            $faadebd64d09aa69$var$_closestTenth = function _closestTenth(value, add) {
                return snap(parseFloat(value) + add);
            };
        }
    };
    return Flip;
}();
$faadebd64d09aa69$export$4d2fae537bd90431.version = "3.11.2"; // function whenImagesLoad(el, func) {
// 	let pending = [],
// 		onLoad = e => {
// 			pending.splice(pending.indexOf(e.target), 1);
// 			e.target.removeEventListener("load", onLoad);
// 			pending.length || func();
// 		};
// 	gsap.utils.toArray(el.tagName.toLowerCase() === "img" ? el : el.querySelectorAll("img")).forEach(img => img.complete || img.addEventListener("load", onLoad) || pending.push(img));
// 	pending.length || func();
// }
typeof window !== "undefined" && window.gsap && window.gsap.registerPlugin($faadebd64d09aa69$export$4d2fae537bd90431);


(0, $c79ce6d7448420a8$export$99ee26438460406a).registerPlugin((0, $faadebd64d09aa69$export$4d2fae537bd90431));
// trail elements (Image and the two intro title elements (up and down)
const $334868c9e0ca4f01$var$trailImage = new (0, $2df3ca2e50417c51$export$c3ddc7f2aba2c1ae)(document.querySelector(".intro-image"), {
    perspective: 1000,
    totalTrailElements: 8
});
const $334868c9e0ca4f01$var$trailTextTop = new (0, $2df3ca2e50417c51$export$c42441291b8467f9)(document.querySelector(".intro-content__title--up"), {
    perspective: 1000,
    totalTrailElements: 2
});
const $334868c9e0ca4f01$var$trailTextBottom = new (0, $2df3ca2e50417c51$export$c42441291b8467f9)(document.querySelector(".intro-content__title--down"), {
    totalTrailElements: 3
});
// DOM elements
const $334868c9e0ca4f01$var$frame = {
    menu: document.querySelector(".button-menu"),
    logo: document.querySelector(".logo"),
    progress: document.querySelector(".intro-progress")
};
const $334868c9e0ca4f01$var$intro = {
    image: document.querySelector(".intro-content__image"),
    enterButton: document.querySelector(".button-enter")
};
const $334868c9e0ca4f01$var$content = {
    titleTop: document.querySelector(".content__title--up"),
    titleBottom: document.querySelector(".content__title--down"),
    about: document.querySelector(".content__about"),
    aboutText: document.querySelector(".content__about-text"),
    finalImagePlacement: document.querySelector(".content__image--2"),
    otherImages: document.querySelectorAll(".content__image--1 > .content__image-inner, .content__image--3 > .content__image-inner")
};
// the TextLinesReveal instance (animate each text line of the about text using the SplitText library)
const $334868c9e0ca4f01$var$aboutLines = new (0, $15b2a328e237db56$export$8d6dee1bc13078fb)($334868c9e0ca4f01$var$content.aboutText);
// state
let $334868c9e0ca4f01$var$state = {
    isAnimating: false,
    iscontentOpen: false
};
// First step: fake progress and move the image to the center of the screen. Also animate the top/bottom texts in and show the enter button
const $334868c9e0ca4f01$var$showIntro = ()=>{
    if ($334868c9e0ca4f01$var$state.isAnimating) return false;
    $334868c9e0ca4f01$var$state.isAnimating = true;
    (0, $c79ce6d7448420a8$export$99ee26438460406a).timeline({
        defaults: (0, $38f1e996af275b9d$export$db69c10dea599f),
        onComplete: ()=>{
            // Reset the trails structure on the texts and image
            $334868c9e0ca4f01$var$trailTextTop.reset();
            $334868c9e0ca4f01$var$trailTextBottom.reset();
            $334868c9e0ca4f01$var$trailImage.reset();
            $334868c9e0ca4f01$var$state.isAnimating = false;
        }
    }).addLabel("start", 0).add(()=>{
        // Let's use the gsap Flip plugin to animate the image into a new element (.intro-content__image)
        // Get state
        const state = (0, $faadebd64d09aa69$export$4d2fae537bd90431).getState($334868c9e0ca4f01$var$trailImage.DOM.trailElems);
        // Change place
        $334868c9e0ca4f01$var$intro.image.appendChild($334868c9e0ca4f01$var$trailImage.DOM.el);
        // Flip
        (0, $faadebd64d09aa69$export$4d2fae537bd90431).from(state, {
            duration: (0, $38f1e996af275b9d$export$db69c10dea599f).duration,
            ease: (0, $38f1e996af275b9d$export$db69c10dea599f).ease,
            stagger: -0.03,
            scale: true
        });
    }, "start")// Hide the intro title trail elements initially and show its parents which are hidden by default (CSS)
    .set([
        $334868c9e0ca4f01$var$trailTextTop.DOM.trailElems,
        $334868c9e0ca4f01$var$trailTextBottom.DOM.trailElems
    ], {
        opacity: 0
    }, "start").set([
        $334868c9e0ca4f01$var$trailTextTop.DOM.el,
        $334868c9e0ca4f01$var$trailTextBottom.DOM.el
    ], {
        opacity: 1
    }, "start")// Now translate the title elements
    .to($334868c9e0ca4f01$var$trailTextTop.DOM.trailElems, {
        y: 0,
        startAt: {
            rotateY: 160,
            opacity: 0
        },
        rotateY: 0,
        opacity: 1,
        stagger: -0.1
    }, "start").to($334868c9e0ca4f01$var$trailTextBottom.DOM.trailElems, {
        y: 0,
        opacity: 1,
        stagger: -0.08
    }, "start")// And show the intro enter button
    .to($334868c9e0ca4f01$var$intro.enterButton, {
        startAt: {
            opacity: 0,
            scale: 0.8
        },
        opacity: 1,
        scale: 1
    }, "start+=0.3").add(()=>{
        // Show the logo and menu button 
        $334868c9e0ca4f01$var$frame.menu.classList.add("show");
        $334868c9e0ca4f01$var$frame.logo.classList.add("show");
    }, "start+=0.3");
};
// Second step: show the other images and scale down the texts
const $334868c9e0ca4f01$var$showContent = ()=>{
    if ($334868c9e0ca4f01$var$state.isAnimating || $334868c9e0ca4f01$var$state.iscontentOpen) return false;
    $334868c9e0ca4f01$var$state.isAnimating = true;
    $334868c9e0ca4f01$var$state.iscontentOpen = true;
    (0, $c79ce6d7448420a8$export$99ee26438460406a).timeline({
        defaults: (0, $38f1e996af275b9d$export$db69c10dea599f),
        onComplete: ()=>{
            $334868c9e0ca4f01$var$state.isAnimating = false;
        }
    }).addLabel("start", 0).to($334868c9e0ca4f01$var$intro.enterButton, {
        duration: 0.6,
        opacity: 0,
        scale: 0.8
    }, "start").add(()=>{
        const topTitleState = (0, $faadebd64d09aa69$export$4d2fae537bd90431).getState($334868c9e0ca4f01$var$trailTextTop.DOM.el);
        const bottomTitleState = (0, $faadebd64d09aa69$export$4d2fae537bd90431).getState($334868c9e0ca4f01$var$trailTextBottom.DOM.el);
        $334868c9e0ca4f01$var$content.titleTop.appendChild($334868c9e0ca4f01$var$trailTextTop.DOM.el);
        $334868c9e0ca4f01$var$content.titleBottom.appendChild($334868c9e0ca4f01$var$trailTextBottom.DOM.el);
        (0, $faadebd64d09aa69$export$4d2fae537bd90431).from(topTitleState, {
            duration: (0, $38f1e996af275b9d$export$db69c10dea599f).duration,
            ease: (0, $38f1e996af275b9d$export$db69c10dea599f).ease,
            scale: true
        });
        (0, $faadebd64d09aa69$export$4d2fae537bd90431).from(bottomTitleState, {
            duration: (0, $38f1e996af275b9d$export$db69c10dea599f).duration,
            ease: (0, $38f1e996af275b9d$export$db69c10dea599f).ease,
            scale: true
        });
        const imageState = (0, $faadebd64d09aa69$export$4d2fae537bd90431).getState($334868c9e0ca4f01$var$trailImage.DOM.el, {
            props: "border-radius"
        });
        // Change place
        $334868c9e0ca4f01$var$content.finalImagePlacement.appendChild($334868c9e0ca4f01$var$trailImage.DOM.el);
        (0, $c79ce6d7448420a8$export$99ee26438460406a).set($334868c9e0ca4f01$var$trailImage.DOM.el, {
            opacity: 1
        });
        // Flip
        (0, $faadebd64d09aa69$export$4d2fae537bd90431).from(imageState, {
            duration: (0, $38f1e996af275b9d$export$db69c10dea599f).duration,
            ease: (0, $38f1e996af275b9d$export$db69c10dea599f).ease
        });
    }, "start")// animate the other images in
    .to($334868c9e0ca4f01$var$content.otherImages, {
        startAt: {
            yPercent: 100
        },
        yPercent: 0,
        opacity: 1
    }, "start+=0.1")// about section
    .to($334868c9e0ca4f01$var$content.about, {
        startAt: {
            yPercent: 10
        },
        yPercent: 0,
        opacity: 1
    }, "start+=0.2")// about text lines
    .add(()=>{
        $334868c9e0ca4f01$var$aboutLines.in();
    }, "start+=0.2");
};
// Enter button click event
$334868c9e0ca4f01$var$intro.enterButton.addEventListener("click", $334868c9e0ca4f01$var$showContent);
// Simulate the initial progress
const $334868c9e0ca4f01$var$fakeProgress = new (0, $733a48b7a3883fed$export$fed190818166dddb)($334868c9e0ca4f01$var$frame.progress);
$334868c9e0ca4f01$var$fakeProgress.onComplete($334868c9e0ca4f01$var$showIntro);
// Preload images
(0, $3d2a545671ed6536$export$6b05b21262ec0515)(".intro-image").then((_)=>document.body.classList.remove("loading"));

})();
