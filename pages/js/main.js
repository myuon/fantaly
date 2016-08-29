"use strict";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const _ = __webpack_require__(1);
	const window_size = [640, 480];
	const box_size = 32;
	var KeyName;
	(function (KeyName) {
	    KeyName[KeyName["KeyLeft"] = 37] = "KeyLeft";
	    KeyName[KeyName["KeyUp"] = 38] = "KeyUp";
	    KeyName[KeyName["KeyRight"] = 39] = "KeyRight";
	    KeyName[KeyName["KeyDown"] = 40] = "KeyDown";
	})(KeyName || (KeyName = {}));
	var BoardConst;
	(function (BoardConst) {
	    BoardConst.dv = 4;
	})(BoardConst || (BoardConst = {}));
	class Board {
	    constructor() {
	        this.move = [0, 0];
	        this.state = "none";
	        this.step = 0;
	        this.slide = () => {
	            this.container.x += this.move[0];
	            this.container.y += this.move[1];
	            this.step += 1;
	        };
	        this.setMove = (dir) => {
	            if (this.state == "moving")
	                return;
	            if (dir == "north") {
	                this.move = [0, BoardConst.dv];
	            }
	            else if (dir == "east") {
	                this.move = [-BoardConst.dv, 0];
	            }
	            else if (dir == "south") {
	                this.move = [0, -BoardConst.dv];
	            }
	            else if (dir == "west") {
	                this.move = [BoardConst.dv, 0];
	            }
	            this.state = "moving";
	            this.slide();
	        };
	        this.tick = () => {
	            if (this.step % (box_size / BoardConst.dv) == 0) {
	                this.state = "none";
	                this.move = [0, 0];
	                this.step = 0;
	            }
	            else {
	                this.slide();
	            }
	        };
	        this.container = new createjs.Container();
	        this.container.x = 0;
	        this.container.y = 0;
	    }
	}
	class Game {
	    constructor() {
	        this.haste = {};
	        this.keys = [];
	        this.tiling = () => {
	            let t = new createjs.Graphics();
	            t.beginFill(createjs.Graphics.getRGB(255, 200, 200));
	            t.drawRect(1, 1, box_size - 1, box_size - 1);
	            let tile = new createjs.Shape(t);
	            for (const ix of _.range(window_size[0] / box_size)) {
	                for (const iy of _.range(window_size[1] / box_size)) {
	                    let tileClone = tile.clone();
	                    tileClone.x = ix * box_size;
	                    tileClone.y = iy * box_size;
	                    this.board.container.addChild(tileClone);
	                }
	            }
	        };
	        this.tick = () => {
	            this.board.tick();
	            if (this.keys[KeyName.KeyLeft]) {
	                this.board.setMove("west");
	            }
	            if (this.keys[KeyName.KeyUp]) {
	                this.board.setMove("north");
	            }
	            if (this.keys[KeyName.KeyRight]) {
	                this.board.setMove("east");
	            }
	            if (this.keys[KeyName.KeyDown]) {
	                this.board.setMove("south");
	            }
	            this.stage.update();
	        };
	        this.run = () => {
	            createjs.Ticker.addEventListener("tick", this.tick);
	            createjs.Ticker.setFPS(30);
	        };
	        this.stage = new createjs.Stage("canvas");
	        this.board = new Board();
	        this.tiling();
	        this.stage.addChild(this.board.container);
	        this.stage.update();
	        document.onkeydown = (event) => {
	            this.keys[event.keyCode] = true;
	        };
	        document.onkeyup = (event) => {
	            delete this.keys[event.keyCode];
	        };
	    }
	}
	function initialize() {
	    let game = new Game();
	    game.run();
	}
	window.initialize = initialize;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global, setImmediate) {/**
	 * @license
	 * Lo-Dash 1.0.2 (Custom Build) <http://lodash.com/>
	 * Build: `lodash -o ./dist/lodash.compat.js`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.4.4 <http://underscorejs.org/>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
	 * Available under MIT license <http://lodash.com/license>
	 */
	;(function(window, undefined) {

	  /** Detect free variable `exports` */
	  var freeExports = typeof exports == 'object' && exports;

	  /** Detect free variable `module` */
	  var freeModule = typeof module == 'object' && module && module.exports == freeExports && module;

	  /** Detect free variable `global` and use it as `window` */
	  var freeGlobal = typeof global == 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    window = freeGlobal;
	  }

	  /** Used for array and object method references */
	  var arrayRef = [],
	      objectRef = {};

	  /** Used to generate unique IDs */
	  var idCounter = 0;

	  /** Used internally to indicate various things */
	  var indicatorObject = objectRef;

	  /** Used by `cachedContains` as the default size when optimizations are enabled for large arrays */
	  var largeArraySize = 30;

	  /** Used to restore the original `_` reference in `noConflict` */
	  var oldDash = window._;

	  /** Used to match HTML entities */
	  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;

	  /** Used to match empty string literals in compiled template source */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	  /** Used to match regexp flags from their coerced string values */
	  var reFlags = /\w*$/;

	  /** Used to detect if a method is native */
	  var reNative = RegExp('^' +
	    (objectRef.valueOf + '')
	      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	      .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
	  );

	  /**
	   * Used to match ES6 template delimiters
	   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-7.8.6
	   */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	  /** Used to match "interpolate" template delimiters */
	  var reInterpolate = /<%=([\s\S]+?)%>/g;

	  /** Used to ensure capturing order of template delimiters */
	  var reNoMatch = /($^)/;

	  /** Used to match HTML characters */
	  var reUnescapedHtml = /[&<>"']/g;

	  /** Used to match unescaped characters in compiled string literals */
	  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

	  /** Used to fix the JScript [[DontEnum]] bug */
	  var shadowed = [
	    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
	    'toLocaleString', 'toString', 'valueOf'
	  ];

	  /** Used to make template sourceURLs easier to identify */
	  var templateCounter = 0;

	  /** Native method shortcuts */
	  var ceil = Math.ceil,
	      concat = arrayRef.concat,
	      floor = Math.floor,
	      getPrototypeOf = reNative.test(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
	      hasOwnProperty = objectRef.hasOwnProperty,
	      push = arrayRef.push,
	      toString = objectRef.toString;

	  /* Native method shortcuts for methods with the same name as other `lodash` methods */
	  var nativeBind = reNative.test(nativeBind = slice.bind) && nativeBind,
	      nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
	      nativeIsFinite = window.isFinite,
	      nativeIsNaN = window.isNaN,
	      nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys,
	      nativeMax = Math.max,
	      nativeMin = Math.min,
	      nativeRandom = Math.random;

	  /** `Object#toString` result shortcuts */
	  var argsClass = '[object Arguments]',
	      arrayClass = '[object Array]',
	      boolClass = '[object Boolean]',
	      dateClass = '[object Date]',
	      funcClass = '[object Function]',
	      numberClass = '[object Number]',
	      objectClass = '[object Object]',
	      regexpClass = '[object RegExp]',
	      stringClass = '[object String]';

	  /** Detect various environments */
	  var isIeOpera = !!window.attachEvent,
	      isV8 = nativeBind && !/\n|true/.test(nativeBind + isIeOpera);

	  /* Detect if `Function#bind` exists and is inferred to be fast (all but V8) */
	  var isBindFast = nativeBind && !isV8;

	  /* Detect if `Object.keys` exists and is inferred to be fast (IE, Opera, V8) */
	  var isKeysFast = nativeKeys && (isIeOpera || isV8);

	  /**
	   * Detect the JScript [[DontEnum]] bug:
	   *
	   * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
	   * made non-enumerable as well.
	   */
	  var hasDontEnumBug;

	  /**
	   * Detect if a `prototype` properties are enumerable by default:
	   *
	   * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
	   * (if the prototype or a property on the prototype has been set)
	   * incorrectly sets a function's `prototype` property [[Enumerable]]
	   * value to `true`.
	   */
	  var hasEnumPrototype;

	  /** Detect if own properties are iterated after inherited properties (IE < 9) */
	  var iteratesOwnLast;

	  /**
	   * Detect if `Array#shift` and `Array#splice` augment array-like objects
	   * incorrectly:
	   *
	   * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
	   * and `splice()` functions that fail to remove the last element, `value[0]`,
	   * of array-like objects even though the `length` property is set to `0`.
	   * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
	   * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
	   */
	  var hasObjectSpliceBug = (hasObjectSpliceBug = { '0': 1, 'length': 1 },
	    arrayRef.splice.call(hasObjectSpliceBug, 0, 1), hasObjectSpliceBug[0]);

	  /** Detect if `arguments` object indexes are non-enumerable (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1) */
	  var nonEnumArgs = true;

	  (function() {
	    var props = [];
	    function ctor() { this.x = 1; }
	    ctor.prototype = { 'valueOf': 1, 'y': 1 };
	    for (var prop in new ctor) { props.push(prop); }
	    for (prop in arguments) { nonEnumArgs = !prop; }

	    hasDontEnumBug = !/valueOf/.test(props);
	    hasEnumPrototype = ctor.propertyIsEnumerable('prototype');
	    iteratesOwnLast = props[0] != 'x';
	  }(1));

	  /** Detect if `arguments` objects are `Object` objects (all but Opera < 10.5) */
	  var argsAreObjects = arguments.constructor == Object;

	  /** Detect if `arguments` objects [[Class]] is unresolvable (Firefox < 4, IE < 9) */
	  var noArgsClass = !isArguments(arguments);

	  /**
	   * Detect lack of support for accessing string characters by index:
	   *
	   * IE < 8 can't access characters by index and IE 8 can only access
	   * characters by index on string literals.
	   */
	  var noCharByIndex = ('x'[0] + Object('x')[0]) != 'xx';

	  /**
	   * Detect if a DOM node's [[Class]] is unresolvable (IE < 9)
	   * and that the JS engine won't error when attempting to coerce an object to
	   * a string without a `toString` function.
	   */
	  try {
	    var noNodeClass = toString.call(document) == objectClass && !({ 'toString': 0 } + '');
	  } catch(e) { }

	  /** Used to identify object classifications that `_.clone` supports */
	  var cloneableClasses = {};
	  cloneableClasses[funcClass] = false;
	  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
	  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
	  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
	  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

	  /** Used to lookup a built-in constructor by [[Class]] */
	  var ctorByClass = {};
	  ctorByClass[arrayClass] = Array;
	  ctorByClass[boolClass] = Boolean;
	  ctorByClass[dateClass] = Date;
	  ctorByClass[objectClass] = Object;
	  ctorByClass[numberClass] = Number;
	  ctorByClass[regexpClass] = RegExp;
	  ctorByClass[stringClass] = String;

	  /** Used to determine if values are of the language type Object */
	  var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	  };

	  /** Used to escape characters for inclusion in compiled string literals */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\t': 't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates a `lodash` object, that wraps the given `value`, to enable method
	   * chaining.
	   *
	   * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
	   * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
	   * and `unshift`
	   *
	   * The chainable wrapper functions are:
	   * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`, `compose`,
	   * `concat`, `countBy`, `debounce`, `defaults`, `defer`, `delay`, `difference`,
	   * `filter`, `flatten`, `forEach`, `forIn`, `forOwn`, `functions`, `groupBy`,
	   * `initial`, `intersection`, `invert`, `invoke`, `keys`, `map`, `max`, `memoize`,
	   * `merge`, `min`, `object`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
	   * `pick`, `pluck`, `push`, `range`, `reject`, `rest`, `reverse`, `shuffle`,
	   * `slice`, `sort`, `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`,
	   * `union`, `uniq`, `unshift`, `values`, `where`, `without`, `wrap`, and `zip`
	   *
	   * The non-chainable wrapper functions are:
	   * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `has`, `identity`,
	   * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`, `isEmpty`,
	   * `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`, `isObject`,
	   * `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`, `lastIndexOf`,
	   * `mixin`, `noConflict`, `pop`, `random`, `reduce`, `reduceRight`, `result`,
	   * `shift`, `size`, `some`, `sortedIndex`, `template`, `unescape`, and `uniqueId`
	   *
	   * The wrapper functions `first` and `last` return wrapped values when `n` is
	   * passed, otherwise they return unwrapped values.
	   *
	   * @name _
	   * @constructor
	   * @category Chaining
	   * @param {Mixed} value The value to wrap in a `lodash` instance.
	   * @returns {Object} Returns a `lodash` instance.
	   */
	  function lodash(value) {
	    // exit early if already wrapped, even if wrapped by a different `lodash` constructor
	    if (value && typeof value == 'object' && value.__wrapped__) {
	      return value;
	    }
	    // allow invoking `lodash` without the `new` operator
	    if (!(this instanceof lodash)) {
	      return new lodash(value);
	    }
	    this.__wrapped__ = value;
	  }

	  /**
	   * By default, the template delimiters used by Lo-Dash are similar to those in
	   * embedded Ruby (ERB). Change the following template settings to use alternative
	   * delimiters.
	   *
	   * @static
	   * @memberOf _
	   * @type Object
	   */
	  lodash.templateSettings = {

	    /**
	     * Used to detect `data` property values to be HTML-escaped.
	     *
	     * @memberOf _.templateSettings
	     * @type RegExp
	     */
	    'escape': /<%-([\s\S]+?)%>/g,

	    /**
	     * Used to detect code to be evaluated.
	     *
	     * @memberOf _.templateSettings
	     * @type RegExp
	     */
	    'evaluate': /<%([\s\S]+?)%>/g,

	    /**
	     * Used to detect `data` property values to inject.
	     *
	     * @memberOf _.templateSettings
	     * @type RegExp
	     */
	    'interpolate': reInterpolate,

	    /**
	     * Used to reference the data object in the template text.
	     *
	     * @memberOf _.templateSettings
	     * @type String
	     */
	    'variable': '',

	    /**
	     * Used to import variables into the compiled template.
	     *
	     * @memberOf _.templateSettings
	     * @type Object
	     */
	    'imports': {

	      /**
	       * A reference to the `lodash` function.
	       *
	       * @memberOf _.templateSettings.imports
	       * @type Function
	       */
	      '_': lodash
	    }
	  };

	  /*--------------------------------------------------------------------------*/

	  /**
	   * The template used to create iterator functions.
	   *
	   * @private
	   * @param {Obect} data The data object used to populate the text.
	   * @returns {String} Returns the interpolated text.
	   */
	  var iteratorTemplate = function(obj) {
	    
	    var __p = 'var index, iterable = ' +
	    (obj.firstArg ) +
	    ', result = iterable;\nif (!iterable) return result;\n' +
	    (obj.top ) +
	    ';\n';
	     if (obj.arrays) {
	    __p += 'var length = iterable.length; index = -1;\nif (' +
	    (obj.arrays ) +
	    ') {  ';
	     if (obj.noCharByIndex) {
	    __p += '\n  if (isString(iterable)) {\n    iterable = iterable.split(\'\')\n  }  ';
	     } ;
	    __p += '\n  while (++index < length) {\n    ' +
	    (obj.loop ) +
	    '\n  }\n}\nelse {  ';
	      } else if (obj.nonEnumArgs) {
	    __p += '\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += \'\';\n      ' +
	    (obj.loop ) +
	    '\n    }\n  } else {  ';
	     } ;
	    
	     if (obj.hasEnumPrototype) {
	    __p += '\n  var skipProto = typeof iterable == \'function\';\n  ';
	     } ;
	    
	     if (obj.isKeysFast && obj.useHas) {
	    __p += '\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] ? nativeKeys(iterable) : [],\n      length = ownProps.length;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n    ';
	     if (obj.hasEnumPrototype) {
	    __p += 'if (!(skipProto && index == \'prototype\')) {\n  ';
	     } ;
	    __p += 
	    (obj.loop ) +
	    '';
	     if (obj.hasEnumPrototype) {
	    __p += '}\n';
	     } ;
	    __p += '  }  ';
	     } else {
	    __p += '\n  for (index in iterable) {';
	        if (obj.hasEnumPrototype || obj.useHas) {
	    __p += '\n    if (';
	          if (obj.hasEnumPrototype) {
	    __p += '!(skipProto && index == \'prototype\')';
	     }      if (obj.hasEnumPrototype && obj.useHas) {
	    __p += ' && ';
	     }      if (obj.useHas) {
	    __p += 'hasOwnProperty.call(iterable, index)';
	     }    ;
	    __p += ') {    ';
	     } ;
	    __p += 
	    (obj.loop ) +
	    ';    ';
	     if (obj.hasEnumPrototype || obj.useHas) {
	    __p += '\n    }';
	     } ;
	    __p += '\n  }  ';
	     } ;
	    
	     if (obj.hasDontEnumBug) {
	    __p += '\n\n  var ctor = iterable.constructor;\n    ';
	     for (var k = 0; k < 7; k++) {
	    __p += '\n  index = \'' +
	    (obj.shadowed[k] ) +
	    '\';\n  if (';
	          if (obj.shadowed[k] == 'constructor') {
	    __p += '!(ctor && ctor.prototype === iterable) && ';
	          } ;
	    __p += 'hasOwnProperty.call(iterable, index)) {\n    ' +
	    (obj.loop ) +
	    '\n  }    ';
	     } ;
	    
	     } ;
	    
	     if (obj.arrays || obj.nonEnumArgs) {
	    __p += '\n}';
	     } ;
	    __p += 
	    (obj.bottom ) +
	    ';\nreturn result';
	    
	    
	    return __p
	  };

	  /** Reusable iterator options for `assign` and `defaults` */
	  var defaultsIteratorOptions = {
	    'args': 'object, source, guard',
	    'top':
	      'var args = arguments,\n' +
	      '    argsIndex = 0,\n' +
	      "    argsLength = typeof guard == 'number' ? 2 : args.length;\n" +
	      'while (++argsIndex < argsLength) {\n' +
	      '  iterable = args[argsIndex];\n' +
	      '  if (iterable && objectTypes[typeof iterable]) {',
	    'loop': "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
	    'bottom': '  }\n}'
	  };

	  /** Reusable iterator options shared by `each`, `forIn`, and `forOwn` */
	  var eachIteratorOptions = {
	    'args': 'collection, callback, thisArg',
	    'top': "callback = callback && typeof thisArg == 'undefined' ? callback : createCallback(callback, thisArg)",
	    'arrays': "typeof length == 'number'",
	    'loop': 'if (callback(iterable[index], index, collection) === false) return result'
	  };

	  /** Reusable iterator options for `forIn` and `forOwn` */
	  var forOwnIteratorOptions = {
	    'top': 'if (!objectTypes[typeof iterable]) return result;\n' + eachIteratorOptions.top,
	    'arrays': false
	  };

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates a function optimized to search large arrays for a given `value`,
	   * starting at `fromIndex`, using strict equality for comparisons, i.e. `===`.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {Mixed} value The value to search for.
	   * @param {Number} [fromIndex=0] The index to search from.
	   * @param {Number} [largeSize=30] The length at which an array is considered large.
	   * @returns {Boolean} Returns `true`, if `value` is found, else `false`.
	   */
	  function cachedContains(array, fromIndex, largeSize) {
	    fromIndex || (fromIndex = 0);

	    var length = array.length,
	        isLarge = (length - fromIndex) >= (largeSize || largeArraySize);

	    if (isLarge) {
	      var cache = {},
	          index = fromIndex - 1;

	      while (++index < length) {
	        // manually coerce `value` to a string because `hasOwnProperty`, in some
	        // older versions of Firefox, coerces objects incorrectly
	        var key = array[index] + '';
	        (hasOwnProperty.call(cache, key) ? cache[key] : (cache[key] = [])).push(array[index]);
	      }
	    }
	    return function(value) {
	      if (isLarge) {
	        var key = value + '';
	        return hasOwnProperty.call(cache, key) && indexOf(cache[key], value) > -1;
	      }
	      return indexOf(array, value, fromIndex) > -1;
	    }
	  }

	  /**
	   * Used by `_.max` and `_.min` as the default `callback` when a given
	   * `collection` is a string value.
	   *
	   * @private
	   * @param {String} value The character to inspect.
	   * @returns {Number} Returns the code unit of given character.
	   */
	  function charAtCallback(value) {
	    return value.charCodeAt(0);
	  }

	  /**
	   * Used by `sortBy` to compare transformed `collection` values, stable sorting
	   * them in ascending order.
	   *
	   * @private
	   * @param {Object} a The object to compare to `b`.
	   * @param {Object} b The object to compare to `a`.
	   * @returns {Number} Returns the sort order indicator of `1` or `-1`.
	   */
	  function compareAscending(a, b) {
	    var ai = a.index,
	        bi = b.index;

	    a = a.criteria;
	    b = b.criteria;

	    // ensure a stable sort in V8 and other engines
	    // http://code.google.com/p/v8/issues/detail?id=90
	    if (a !== b) {
	      if (a > b || typeof a == 'undefined') {
	        return 1;
	      }
	      if (a < b || typeof b == 'undefined') {
	        return -1;
	      }
	    }
	    return ai < bi ? -1 : 1;
	  }

	  /**
	   * Creates a function that, when called, invokes `func` with the `this` binding
	   * of `thisArg` and prepends any `partialArgs` to the arguments passed to the
	   * bound function.
	   *
	   * @private
	   * @param {Function|String} func The function to bind or the method name.
	   * @param {Mixed} [thisArg] The `this` binding of `func`.
	   * @param {Array} partialArgs An array of arguments to be partially applied.
	   * @param {Object} [rightIndicator] Used to indicate partially applying arguments from the right.
	   * @returns {Function} Returns the new bound function.
	   */
	  function createBound(func, thisArg, partialArgs, rightIndicator) {
	    var isFunc = isFunction(func),
	        isPartial = !partialArgs,
	        key = thisArg;

	    // juggle arguments
	    if (isPartial) {
	      partialArgs = thisArg;
	    }
	    if (!isFunc) {
	      thisArg = func;
	    }

	    function bound() {
	      // `Function#bind` spec
	      // http://es5.github.com/#x15.3.4.5
	      var args = arguments,
	          thisBinding = isPartial ? this : thisArg;

	      if (!isFunc) {
	        func = thisArg[key];
	      }
	      if (partialArgs.length) {
	        args = args.length
	          ? (args = slice(args), rightIndicator ? args.concat(partialArgs) : partialArgs.concat(args))
	          : partialArgs;
	      }
	      if (this instanceof bound) {
	        // ensure `new bound` is an instance of `bound` and `func`
	        noop.prototype = func.prototype;
	        thisBinding = new noop;
	        noop.prototype = null;

	        // mimic the constructor's `return` behavior
	        // http://es5.github.com/#x13.2.2
	        var result = func.apply(thisBinding, args);
	        return isObject(result) ? result : thisBinding;
	      }
	      return func.apply(thisBinding, args);
	    }
	    return bound;
	  }

	  /**
	   * Produces a callback bound to an optional `thisArg`. If `func` is a property
	   * name, the created callback will return the property value for a given element.
	   * If `func` is an object, the created callback will return `true` for elements
	   * that contain the equivalent object properties, otherwise it will return `false`.
	   *
	   * @private
	   * @param {Mixed} [func=identity] The value to convert to a callback.
	   * @param {Mixed} [thisArg] The `this` binding of the created callback.
	   * @param {Number} [argCount=3] The number of arguments the callback accepts.
	   * @returns {Function} Returns a callback function.
	   */
	  function createCallback(func, thisArg, argCount) {
	    if (func == null) {
	      return identity;
	    }
	    var type = typeof func;
	    if (type != 'function') {
	      if (type != 'object') {
	        return function(object) {
	          return object[func];
	        };
	      }
	      var props = keys(func);
	      return function(object) {
	        var length = props.length,
	            result = false;
	        while (length--) {
	          if (!(result = isEqual(object[props[length]], func[props[length]], indicatorObject))) {
	            break;
	          }
	        }
	        return result;
	      };
	    }
	    if (typeof thisArg != 'undefined') {
	      if (argCount === 1) {
	        return function(value) {
	          return func.call(thisArg, value);
	        };
	      }
	      if (argCount === 2) {
	        return function(a, b) {
	          return func.call(thisArg, a, b);
	        };
	      }
	      if (argCount === 4) {
	        return function(accumulator, value, index, object) {
	          return func.call(thisArg, accumulator, value, index, object);
	        };
	      }
	      return function(value, index, object) {
	        return func.call(thisArg, value, index, object);
	      };
	    }
	    return func;
	  }

	  /**
	   * Creates compiled iteration functions.
	   *
	   * @private
	   * @param {Object} [options1, options2, ...] The compile options object(s).
	   *  arrays - A string of code to determine if the iterable is an array or array-like.
	   *  useHas - A boolean to specify using `hasOwnProperty` checks in the object loop.
	   *  args - A string of comma separated arguments the iteration function will accept.
	   *  top - A string of code to execute before the iteration branches.
	   *  loop - A string of code to execute in the object loop.
	   *  bottom - A string of code to execute after the iteration branches.
	   *
	   * @returns {Function} Returns the compiled function.
	   */
	  function createIterator() {
	    var data = {
	      // support properties
	      'hasDontEnumBug': hasDontEnumBug,
	      'hasEnumPrototype': hasEnumPrototype,
	      'isKeysFast': isKeysFast,
	      'nonEnumArgs': nonEnumArgs,
	      'noCharByIndex': noCharByIndex,
	      'shadowed': shadowed,

	      // iterator options
	      'arrays': 'isArray(iterable)',
	      'bottom': '',
	      'loop': '',
	      'top': '',
	      'useHas': true
	    };

	    // merge options into a template data object
	    for (var object, index = 0; object = arguments[index]; index++) {
	      for (var key in object) {
	        data[key] = object[key];
	      }
	    }
	    var args = data.args;
	    data.firstArg = /^[^,]+/.exec(args)[0];

	    // create the function factory
	    var factory = Function(
	        'createCallback, hasOwnProperty, isArguments, isArray, isString, ' +
	        'objectTypes, nativeKeys',
	      'return function(' + args + ') {\n' + iteratorTemplate(data) + '\n}'
	    );
	    // return the compiled function
	    return factory(
	      createCallback, hasOwnProperty, isArguments, isArray, isString,
	      objectTypes, nativeKeys
	    );
	  }

	  /**
	   * A function compiled to iterate `arguments` objects, arrays, objects, and
	   * strings consistenly across environments, executing the `callback` for each
	   * element in the `collection`. The `callback` is bound to `thisArg` and invoked
	   * with three arguments; (value, index|key, collection). Callbacks may exit
	   * iteration early by explicitly returning `false`.
	   *
	   * @private
	   * @type Function
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array|Object|String} Returns `collection`.
	   */
	  var each = createIterator(eachIteratorOptions);

	  /**
	   * Used by `template` to escape characters for inclusion in compiled
	   * string literals.
	   *
	   * @private
	   * @param {String} match The matched character to escape.
	   * @returns {String} Returns the escaped character.
	   */
	  function escapeStringChar(match) {
	    return '\\' + stringEscapes[match];
	  }

	  /**
	   * Used by `escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {String} match The matched character to escape.
	   * @returns {String} Returns the escaped character.
	   */
	  function escapeHtmlChar(match) {
	    return htmlEscapes[match];
	  }

	  /**
	   * Checks if `value` is a DOM node in IE < 9.
	   *
	   * @private
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true` if the `value` is a DOM node, else `false`.
	   */
	  function isNode(value) {
	    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
	    // methods that are `typeof` "string" and still can coerce nodes to strings
	    return typeof value.toString != 'function' && typeof (value + '') == 'string';
	  }

	  /**
	   * A no-operation function.
	   *
	   * @private
	   */
	  function noop() {
	    // no operation performed
	  }

	  /**
	   * Slices the `collection` from the `start` index up to, but not including,
	   * the `end` index.
	   *
	   * Note: This function is used, instead of `Array#slice`, to support node lists
	   * in IE < 9 and to ensure dense arrays are returned.
	   *
	   * @private
	   * @param {Array|Object|String} collection The collection to slice.
	   * @param {Number} start The start index.
	   * @param {Number} end The end index.
	   * @returns {Array} Returns the new array.
	   */
	  function slice(array, start, end) {
	    start || (start = 0);
	    if (typeof end == 'undefined') {
	      end = array ? array.length : 0;
	    }
	    var index = -1,
	        length = end - start || 0,
	        result = Array(length < 0 ? 0 : length);

	    while (++index < length) {
	      result[index] = array[start + index];
	    }
	    return result;
	  }

	  /**
	   * Used by `unescape` to convert HTML entities to characters.
	   *
	   * @private
	   * @param {String} match The matched character to unescape.
	   * @returns {String} Returns the unescaped character.
	   */
	  function unescapeHtmlChar(match) {
	    return htmlUnescapes[match];
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Checks if `value` is an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is an `arguments` object, else `false`.
	   * @example
	   *
	   * (function() { return _.isArguments(arguments); })(1, 2, 3);
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    return toString.call(value) == argsClass;
	  }
	  // fallback for browsers that can't detect `arguments` objects by [[Class]]
	  if (noArgsClass) {
	    isArguments = function(value) {
	      return value ? hasOwnProperty.call(value, 'callee') : false;
	    };
	  }

	  /**
	   * Iterates over `object`'s own and inherited enumerable properties, executing
	   * the `callback` for each property. The `callback` is bound to `thisArg` and
	   * invoked with three arguments; (value, key, object). Callbacks may exit iteration
	   * early by explicitly returning `false`.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Objects
	   * @param {Object} object The object to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * function Dog(name) {
	   *   this.name = name;
	   * }
	   *
	   * Dog.prototype.bark = function() {
	   *   alert('Woof, woof!');
	   * };
	   *
	   * _.forIn(new Dog('Dagny'), function(value, key) {
	   *   alert(key);
	   * });
	   * // => alerts 'name' and 'bark' (order is not guaranteed)
	   */
	  var forIn = createIterator(eachIteratorOptions, forOwnIteratorOptions, {
	    'useHas': false
	  });

	  /**
	   * Iterates over an object's own enumerable properties, executing the `callback`
	   * for each property. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, key, object). Callbacks may exit iteration early by explicitly
	   * returning `false`.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Objects
	   * @param {Object} object The object to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	   *   alert(key);
	   * });
	   * // => alerts '0', '1', and 'length' (order is not guaranteed)
	   */
	  var forOwn = createIterator(eachIteratorOptions, forOwnIteratorOptions);

	  /**
	   * Checks if `value` is an array.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is an array, else `false`.
	   * @example
	   *
	   * (function() { return _.isArray(arguments); })();
	   * // => false
	   *
	   * _.isArray([1, 2, 3]);
	   * // => true
	   */
	  var isArray = nativeIsArray || function(value) {
	    // `instanceof` may cause a memory leak in IE 7 if `value` is a host object
	    // http://ajaxian.com/archives/working-aroung-the-instanceof-memory-leak
	    return (argsAreObjects && value instanceof Array) || toString.call(value) == arrayClass;
	  };

	  /**
	   * Creates an array composed of the own enumerable property names of `object`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns a new array of property names.
	   * @example
	   *
	   * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	   * // => ['one', 'two', 'three'] (order is not guaranteed)
	   */
	  var keys = !nativeKeys ? shimKeys : function(object) {
	    if (!isObject(object)) {
	      return [];
	    }
	    if ((hasEnumPrototype && typeof object == 'function') ||
	        (nonEnumArgs && object.length && isArguments(object))) {
	      return shimKeys(object);
	    }
	    return nativeKeys(object);
	  };

	  /**
	   * A fallback implementation of `isPlainObject` that checks if a given `value`
	   * is an object created by the `Object` constructor, assuming objects created
	   * by the `Object` constructor have no inherited enumerable properties and that
	   * there are no `Object.prototype` extensions.
	   *
	   * @private
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if `value` is a plain object, else `false`.
	   */
	  function shimIsPlainObject(value) {
	    // avoid non-objects and false positives for `arguments` objects
	    var result = false;
	    if (!(value && typeof value == 'object') || isArguments(value)) {
	      return result;
	    }
	    // check that the constructor is `Object` (i.e. `Object instanceof Object`)
	    var ctor = value.constructor;
	    if ((!isFunction(ctor) && (!noNodeClass || !isNode(value))) || ctor instanceof ctor) {
	      // IE < 9 iterates inherited properties before own properties. If the first
	      // iterated property is an object's own property then there are no inherited
	      // enumerable properties.
	      if (iteratesOwnLast) {
	        forIn(value, function(value, key, object) {
	          result = !hasOwnProperty.call(object, key);
	          return false;
	        });
	        return result === false;
	      }
	      // In most environments an object's own properties are iterated before
	      // its inherited properties. If the last iterated property is an object's
	      // own property then there are no inherited enumerable properties.
	      forIn(value, function(value, key) {
	        result = key;
	      });
	      return result === false || hasOwnProperty.call(value, result);
	    }
	    return result;
	  }

	  /**
	   * A fallback implementation of `Object.keys` that produces an array of the
	   * given object's own enumerable property names.
	   *
	   * @private
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns a new array of property names.
	   */
	  function shimKeys(object) {
	    var result = [];
	    forOwn(object, function(value, key) {
	      result.push(key);
	    });
	    return result;
	  }

	  /**
	   * Used to convert characters to HTML entities:
	   *
	   * Though the `>` character is escaped for symmetry, characters like `>` and `/`
	   * don't require escaping in HTML and have no special meaning unless they're part
	   * of a tag or an unquoted attribute value.
	   * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
	   */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;'
	  };

	  /** Used to convert HTML entities to characters */
	  var htmlUnescapes = invert(htmlEscapes);

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object. Subsequent sources will overwrite propery assignments of previous
	   * sources. If a `callback` function is passed, it will be executed to produce
	   * the assigned values. The `callback` is bound to `thisArg` and invoked with
	   * two arguments; (objectValue, sourceValue).
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @alias extend
	   * @category Objects
	   * @param {Object} object The destination object.
	   * @param {Object} [source1, source2, ...] The source objects.
	   * @param {Function} [callback] The function to customize assigning values.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns the destination object.
	   * @example
	   *
	   * _.assign({ 'name': 'moe' }, { 'age': 40 });
	   * // => { 'name': 'moe', 'age': 40 }
	   *
	   * var defaults = _.partialRight(_.assign, function(a, b) {
	   *   return typeof a == 'undefined' ? b : a;
	   * });
	   *
	   * var food = { 'name': 'apple' };
	   * defaults(food, { 'name': 'banana', 'type': 'fruit' });
	   * // => { 'name': 'apple', 'type': 'fruit' }
	   */
	  var assign = createIterator(defaultsIteratorOptions, {
	    'top':
	      defaultsIteratorOptions.top.replace(';',
	        ';\n' +
	        "if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n" +
	        '  var callback = createCallback(args[--argsLength - 1], args[argsLength--], 2);\n' +
	        "} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n" +
	        '  callback = args[--argsLength];\n' +
	        '}'
	      ),
	    'loop': 'result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]'
	  });

	  /**
	   * Creates a clone of `value`. If `deep` is `true`, nested objects will also
	   * be cloned, otherwise they will be assigned by reference. If a `callback`
	   * function is passed, it will be executed to produce the cloned values. If
	   * `callback` returns `undefined`, cloning will be handled by the method instead.
	   * The `callback` is bound to `thisArg` and invoked with one argument; (value).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to clone.
	   * @param {Boolean} [deep=false] A flag to indicate a deep clone.
	   * @param {Function} [callback] The function to customize cloning values.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @param- {Array} [stackA=[]] Internally used to track traversed source objects.
	   * @param- {Array} [stackB=[]] Internally used to associate clones with source counterparts.
	   * @returns {Mixed} Returns the cloned `value`.
	   * @example
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * var shallow = _.clone(stooges);
	   * shallow[0] === stooges[0];
	   * // => true
	   *
	   * var deep = _.clone(stooges, true);
	   * deep[0] === stooges[0];
	   * // => false
	   *
	   * _.mixin({
	   *   'clone': _.partialRight(_.clone, function(value) {
	   *     return _.isElement(value) ? value.cloneNode(false) : undefined;
	   *   })
	   * });
	   *
	   * var clone = _.clone(document.body);
	   * clone.childNodes.length;
	   * // => 0
	   */
	  function clone(value, deep, callback, thisArg, stackA, stackB) {
	    var result = value;

	    // allows working with "Collections" methods without using their `callback`
	    // argument, `index|key`, for this method's `callback`
	    if (typeof deep == 'function') {
	      thisArg = callback;
	      callback = deep;
	      deep = false;
	    }
	    if (typeof callback == 'function') {
	      callback = typeof thisArg == 'undefined' ? callback : createCallback(callback, thisArg, 1);
	      result = callback(result);

	      var done = typeof result != 'undefined';
	      if (!done) {
	        result = value;
	      }
	    }
	    // inspect [[Class]]
	    var isObj = isObject(result);
	    if (isObj) {
	      var className = toString.call(result);
	      if (!cloneableClasses[className] || (noNodeClass && isNode(result))) {
	        return result;
	      }
	      var isArr = isArray(result);
	    }
	    // shallow clone
	    if (!isObj || !deep) {
	      return isObj && !done
	        ? (isArr ? slice(result) : assign({}, result))
	        : result;
	    }
	    var ctor = ctorByClass[className];
	    switch (className) {
	      case boolClass:
	      case dateClass:
	        return done ? result : new ctor(+result);

	      case numberClass:
	      case stringClass:
	        return done ? result : new ctor(result);

	      case regexpClass:
	        return done ? result : ctor(result.source, reFlags.exec(result));
	    }
	    // check for circular references and return corresponding clone
	    stackA || (stackA = []);
	    stackB || (stackB = []);

	    var length = stackA.length;
	    while (length--) {
	      if (stackA[length] == value) {
	        return stackB[length];
	      }
	    }
	    // init cloned object
	    if (!done) {
	      result = isArr ? ctor(result.length) : {};

	      // add array properties assigned by `RegExp#exec`
	      if (isArr) {
	        if (hasOwnProperty.call(value, 'index')) {
	          result.index = value.index;
	        }
	        if (hasOwnProperty.call(value, 'input')) {
	          result.input = value.input;
	        }
	      }
	    }
	    // add the source value to the stack of traversed objects
	    // and associate it with its clone
	    stackA.push(value);
	    stackB.push(result);

	    // recursively populate clone (susceptible to call stack limits)
	    (isArr ? forEach : forOwn)(done ? result : value, function(objValue, key) {
	      result[key] = clone(objValue, deep, callback, undefined, stackA, stackB);
	    });

	    return result;
	  }

	  /**
	   * Creates a deep clone of `value`. If a `callback` function is passed, it will
	   * be executed to produce the cloned values. If `callback` returns the value it
	   * was passed, cloning will be handled by the method instead. The `callback` is
	   * bound to `thisArg` and invoked with one argument; (value).
	   *
	   * Note: This function is loosely based on the structured clone algorithm. Functions
	   * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
	   * objects created by constructors other than `Object` are cloned to plain `Object` objects.
	   * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to deep clone.
	   * @param {Function} [callback] The function to customize cloning values.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the deep cloned `value`.
	   * @example
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * var deep = _.cloneDeep(stooges);
	   * deep[0] === stooges[0];
	   * // => false
	   *
	   * var view = {
	   *   'label': 'docs',
	   *   'node': element
	   * };
	   *
	   * var clone = _.cloneDeep(view, function(value) {
	   *   return _.isElement(value) ? value.cloneNode(true) : value;
	   * });
	   *
	   * clone.node == view.node;
	   * // => false
	   */
	  function cloneDeep(value, callback, thisArg) {
	    return clone(value, true, callback, thisArg);
	  }

	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object for all destination properties that resolve to `undefined`. Once a
	   * property is set, additional defaults of the same property will be ignored.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Objects
	   * @param {Object} object The destination object.
	   * @param {Object} [source1, source2, ...] The source objects.
	   * @param- {Object} [guard] Internally used to allow working with `_.reduce`
	   *  without using its callback's `key` and `object` arguments as sources.
	   * @returns {Object} Returns the destination object.
	   * @example
	   *
	   * var food = { 'name': 'apple' };
	   * _.defaults(food, { 'name': 'banana', 'type': 'fruit' });
	   * // => { 'name': 'apple', 'type': 'fruit' }
	   */
	  var defaults = createIterator(defaultsIteratorOptions);

	  /**
	   * Creates a sorted array of all enumerable properties, own and inherited,
	   * of `object` that have function values.
	   *
	   * @static
	   * @memberOf _
	   * @alias methods
	   * @category Objects
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns a new array of property names that have function values.
	   * @example
	   *
	   * _.functions(_);
	   * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
	   */
	  function functions(object) {
	    var result = [];
	    forIn(object, function(value, key) {
	      if (isFunction(value)) {
	        result.push(key);
	      }
	    });
	    return result.sort();
	  }

	  /**
	   * Checks if the specified object `property` exists and is a direct property,
	   * instead of an inherited property.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to check.
	   * @param {String} property The property to check for.
	   * @returns {Boolean} Returns `true` if key is a direct property, else `false`.
	   * @example
	   *
	   * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
	   * // => true
	   */
	  function has(object, property) {
	    return object ? hasOwnProperty.call(object, property) : false;
	  }

	  /**
	   * Creates an object composed of the inverted keys and values of the given `object`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to invert.
	   * @returns {Object} Returns the created inverted object.
	   * @example
	   *
	   *  _.invert({ 'first': 'moe', 'second': 'larry' });
	   * // => { 'moe': 'first', 'larry': 'second' } (order is not guaranteed)
	   */
	  function invert(object) {
	    var index = -1,
	        props = keys(object),
	        length = props.length,
	        result = {};

	    while (++index < length) {
	      var key = props[index];
	      result[object[key]] = key;
	    }
	    return result;
	  }

	  /**
	   * Checks if `value` is a boolean value.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a boolean value, else `false`.
	   * @example
	   *
	   * _.isBoolean(null);
	   * // => false
	   */
	  function isBoolean(value) {
	    return value === true || value === false || toString.call(value) == boolClass;
	  }

	  /**
	   * Checks if `value` is a date.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a date, else `false`.
	   * @example
	   *
	   * _.isDate(new Date);
	   * // => true
	   */
	  function isDate(value) {
	    return value instanceof Date || toString.call(value) == dateClass;
	  }

	  /**
	   * Checks if `value` is a DOM element.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a DOM element, else `false`.
	   * @example
	   *
	   * _.isElement(document.body);
	   * // => true
	   */
	  function isElement(value) {
	    return value ? value.nodeType === 1 : false;
	  }

	  /**
	   * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
	   * length of `0` and objects with no own enumerable properties are considered
	   * "empty".
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Array|Object|String} value The value to inspect.
	   * @returns {Boolean} Returns `true`, if the `value` is empty, else `false`.
	   * @example
	   *
	   * _.isEmpty([1, 2, 3]);
	   * // => false
	   *
	   * _.isEmpty({});
	   * // => true
	   *
	   * _.isEmpty('');
	   * // => true
	   */
	  function isEmpty(value) {
	    var result = true;
	    if (!value) {
	      return result;
	    }
	    var className = toString.call(value),
	        length = value.length;

	    if ((className == arrayClass || className == stringClass ||
	        className == argsClass || (noArgsClass && isArguments(value))) ||
	        (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
	      return !length;
	    }
	    forOwn(value, function() {
	      return (result = false);
	    });
	    return result;
	  }

	  /**
	   * Performs a deep comparison between two values to determine if they are
	   * equivalent to each other. If `callback` is passed, it will be executed to
	   * compare values. If `callback` returns `undefined`, comparisons will be handled
	   * by the method instead. The `callback` is bound to `thisArg` and invoked with
	   * two arguments; (a, b).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} a The value to compare.
	   * @param {Mixed} b The other value to compare.
	   * @param {Function} [callback] The function to customize comparing values.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @param- {Object} [stackA=[]] Internally used track traversed `a` objects.
	   * @param- {Object} [stackB=[]] Internally used track traversed `b` objects.
	   * @returns {Boolean} Returns `true`, if the values are equvalent, else `false`.
	   * @example
	   *
	   * var moe = { 'name': 'moe', 'age': 40 };
	   * var copy = { 'name': 'moe', 'age': 40 };
	   *
	   * moe == copy;
	   * // => false
	   *
	   * _.isEqual(moe, copy);
	   * // => true
	   *
	   * var words = ['hello', 'goodbye'];
	   * var otherWords = ['hi', 'goodbye'];
	   *
	   * _.isEqual(words, otherWords, function(a, b) {
	   *   var reGreet = /^(?:hello|hi)$/i,
	   *       aGreet = _.isString(a) && reGreet.test(a),
	   *       bGreet = _.isString(b) && reGreet.test(b);
	   *
	   *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
	   * });
	   * // => true
	   */
	  function isEqual(a, b, callback, thisArg, stackA, stackB) {
	    // used to indicate that when comparing objects, `a` has at least the properties of `b`
	    var whereIndicator = callback === indicatorObject;
	    if (callback && !whereIndicator) {
	      callback = typeof thisArg == 'undefined' ? callback : createCallback(callback, thisArg, 2);
	      var result = callback(a, b);
	      if (typeof result != 'undefined') {
	        return !!result;
	      }
	    }
	    // exit early for identical values
	    if (a === b) {
	      // treat `+0` vs. `-0` as not equal
	      return a !== 0 || (1 / a == 1 / b);
	    }
	    var type = typeof a,
	        otherType = typeof b;

	    // exit early for unlike primitive values
	    if (a === a &&
	        (!a || (type != 'function' && type != 'object')) &&
	        (!b || (otherType != 'function' && otherType != 'object'))) {
	      return false;
	    }
	    // exit early for `null` and `undefined`, avoiding ES3's Function#call behavior
	    // http://es5.github.com/#x15.3.4.4
	    if (a == null || b == null) {
	      return a === b;
	    }
	    // compare [[Class]] names
	    var className = toString.call(a),
	        otherClass = toString.call(b);

	    if (className == argsClass) {
	      className = objectClass;
	    }
	    if (otherClass == argsClass) {
	      otherClass = objectClass;
	    }
	    if (className != otherClass) {
	      return false;
	    }
	    switch (className) {
	      case boolClass:
	      case dateClass:
	        // coerce dates and booleans to numbers, dates to milliseconds and booleans
	        // to `1` or `0`, treating invalid dates coerced to `NaN` as not equal
	        return +a == +b;

	      case numberClass:
	        // treat `NaN` vs. `NaN` as equal
	        return a != +a
	          ? b != +b
	          // but treat `+0` vs. `-0` as not equal
	          : (a == 0 ? (1 / a == 1 / b) : a == +b);

	      case regexpClass:
	      case stringClass:
	        // coerce regexes to strings (http://es5.github.com/#x15.10.6.4)
	        // treat string primitives and their corresponding object instances as equal
	        return a == b + '';
	    }
	    var isArr = className == arrayClass;
	    if (!isArr) {
	      // unwrap any `lodash` wrapped values
	      if (a.__wrapped__ || b.__wrapped__) {
	        return isEqual(a.__wrapped__ || a, b.__wrapped__ || b, callback, thisArg, stackA, stackB);
	      }
	      // exit for functions and DOM nodes
	      if (className != objectClass || (noNodeClass && (isNode(a) || isNode(b)))) {
	        return false;
	      }
	      // in older versions of Opera, `arguments` objects have `Array` constructors
	      var ctorA = !argsAreObjects && isArguments(a) ? Object : a.constructor,
	          ctorB = !argsAreObjects && isArguments(b) ? Object : b.constructor;

	      // non `Object` object instances with different constructors are not equal
	      if (ctorA != ctorB && !(
	            isFunction(ctorA) && ctorA instanceof ctorA &&
	            isFunction(ctorB) && ctorB instanceof ctorB
	          )) {
	        return false;
	      }
	    }
	    // assume cyclic structures are equal
	    // the algorithm for detecting cyclic structures is adapted from ES 5.1
	    // section 15.12.3, abstract operation `JO` (http://es5.github.com/#x15.12.3)
	    stackA || (stackA = []);
	    stackB || (stackB = []);

	    var length = stackA.length;
	    while (length--) {
	      if (stackA[length] == a) {
	        return stackB[length] == b;
	      }
	    }
	    var size = 0;
	    result = true;

	    // add `a` and `b` to the stack of traversed objects
	    stackA.push(a);
	    stackB.push(b);

	    // recursively compare objects and arrays (susceptible to call stack limits)
	    if (isArr) {
	      length = a.length;
	      size = b.length;

	      // compare lengths to determine if a deep comparison is necessary
	      result = size == a.length;
	      if (!result && !whereIndicator) {
	        return result;
	      }
	      // deep compare the contents, ignoring non-numeric properties
	      while (size--) {
	        var index = length,
	            value = b[size];

	        if (whereIndicator) {
	          while (index--) {
	            if ((result = isEqual(a[index], value, callback, thisArg, stackA, stackB))) {
	              break;
	            }
	          }
	        } else if (!(result = isEqual(a[size], value, callback, thisArg, stackA, stackB))) {
	          break;
	        }
	      }
	      return result;
	    }
	    // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
	    // which, in this case, is more costly
	    forIn(b, function(value, key, b) {
	      if (hasOwnProperty.call(b, key)) {
	        // count the number of properties.
	        size++;
	        // deep compare each property value.
	        return (result = hasOwnProperty.call(a, key) && isEqual(a[key], value, callback, thisArg, stackA, stackB));
	      }
	    });

	    if (result && !whereIndicator) {
	      // ensure both objects have the same number of properties
	      forIn(a, function(value, key, a) {
	        if (hasOwnProperty.call(a, key)) {
	          // `size` will be `-1` if `a` has more properties than `b`
	          return (result = --size > -1);
	        }
	      });
	    }
	    return result;
	  }

	  /**
	   * Checks if `value` is, or can be coerced to, a finite number.
	   *
	   * Note: This is not the same as native `isFinite`, which will return true for
	   * booleans and empty strings. See http://es5.github.com/#x15.1.2.5.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is finite, else `false`.
	   * @example
	   *
	   * _.isFinite(-101);
	   * // => true
	   *
	   * _.isFinite('10');
	   * // => true
	   *
	   * _.isFinite(true);
	   * // => false
	   *
	   * _.isFinite('');
	   * // => false
	   *
	   * _.isFinite(Infinity);
	   * // => false
	   */
	  function isFinite(value) {
	    return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
	  }

	  /**
	   * Checks if `value` is a function.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a function, else `false`.
	   * @example
	   *
	   * _.isFunction(_);
	   * // => true
	   */
	  function isFunction(value) {
	    return typeof value == 'function';
	  }
	  // fallback for older versions of Chrome and Safari
	  if (isFunction(/x/)) {
	    isFunction = function(value) {
	      return value instanceof Function || toString.call(value) == funcClass;
	    };
	  }

	  /**
	   * Checks if `value` is the language type of Object.
	   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is an object, else `false`.
	   * @example
	   *
	   * _.isObject({});
	   * // => true
	   *
	   * _.isObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isObject(1);
	   * // => false
	   */
	  function isObject(value) {
	    // check if the value is the ECMAScript language type of Object
	    // http://es5.github.com/#x8
	    // and avoid a V8 bug
	    // http://code.google.com/p/v8/issues/detail?id=2291
	    return value ? objectTypes[typeof value] : false;
	  }

	  /**
	   * Checks if `value` is `NaN`.
	   *
	   * Note: This is not the same as native `isNaN`, which will return `true` for
	   * `undefined` and other values. See http://es5.github.com/#x15.1.2.4.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is `NaN`, else `false`.
	   * @example
	   *
	   * _.isNaN(NaN);
	   * // => true
	   *
	   * _.isNaN(new Number(NaN));
	   * // => true
	   *
	   * isNaN(undefined);
	   * // => true
	   *
	   * _.isNaN(undefined);
	   * // => false
	   */
	  function isNaN(value) {
	    // `NaN` as a primitive is the only value that is not equal to itself
	    // (perform the [[Class]] check first to avoid errors with some host objects in IE)
	    return isNumber(value) && value != +value
	  }

	  /**
	   * Checks if `value` is `null`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is `null`, else `false`.
	   * @example
	   *
	   * _.isNull(null);
	   * // => true
	   *
	   * _.isNull(undefined);
	   * // => false
	   */
	  function isNull(value) {
	    return value === null;
	  }

	  /**
	   * Checks if `value` is a number.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a number, else `false`.
	   * @example
	   *
	   * _.isNumber(8.4 * 5);
	   * // => true
	   */
	  function isNumber(value) {
	    return typeof value == 'number' || toString.call(value) == numberClass;
	  }

	  /**
	   * Checks if a given `value` is an object created by the `Object` constructor.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if `value` is a plain object, else `false`.
	   * @example
	   *
	   * function Stooge(name, age) {
	   *   this.name = name;
	   *   this.age = age;
	   * }
	   *
	   * _.isPlainObject(new Stooge('moe', 40));
	   * // => false
	   *
	   * _.isPlainObject([1, 2, 3]);
	   * // => false
	   *
	   * _.isPlainObject({ 'name': 'moe', 'age': 40 });
	   * // => true
	   */
	  var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	    if (!(value && typeof value == 'object')) {
	      return false;
	    }
	    var valueOf = value.valueOf,
	        objProto = typeof valueOf == 'function' && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

	    return objProto
	      ? value == objProto || (getPrototypeOf(value) == objProto && !isArguments(value))
	      : shimIsPlainObject(value);
	  };

	  /**
	   * Checks if `value` is a regular expression.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a regular expression, else `false`.
	   * @example
	   *
	   * _.isRegExp(/moe/);
	   * // => true
	   */
	  function isRegExp(value) {
	    return value instanceof RegExp || toString.call(value) == regexpClass;
	  }

	  /**
	   * Checks if `value` is a string.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a string, else `false`.
	   * @example
	   *
	   * _.isString('moe');
	   * // => true
	   */
	  function isString(value) {
	    return typeof value == 'string' || toString.call(value) == stringClass;
	  }

	  /**
	   * Checks if `value` is `undefined`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is `undefined`, else `false`.
	   * @example
	   *
	   * _.isUndefined(void 0);
	   * // => true
	   */
	  function isUndefined(value) {
	    return typeof value == 'undefined';
	  }

	  /**
	   * Recursively merges own enumerable properties of the source object(s), that
	   * don't resolve to `undefined`, into the destination object. Subsequent sources
	   * will overwrite propery assignments of previous sources. If a `callback` function
	   * is passed, it will be executed to produce the merged values of the destination
	   * and source properties. If `callback` returns `undefined`, merging will be
	   * handled by the method instead. The `callback` is bound to `thisArg` and
	   * invoked with two arguments; (objectValue, sourceValue).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The destination object.
	   * @param {Object} [source1, source2, ...] The source objects.
	   * @param {Function} [callback] The function to customize merging properties.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @param- {Object} [deepIndicator] Internally used to indicate that `stackA`
	   *  and `stackB` are arrays of traversed objects instead of source objects.
	   * @param- {Array} [stackA=[]] Internally used to track traversed source objects.
	   * @param- {Array} [stackB=[]] Internally used to associate values with their
	   *  source counterparts.
	   * @returns {Object} Returns the destination object.
	   * @example
	   *
	   * var names = {
	   *   'stooges': [
	   *     { 'name': 'moe' },
	   *     { 'name': 'larry' }
	   *   ]
	   * };
	   *
	   * var ages = {
	   *   'stooges': [
	   *     { 'age': 40 },
	   *     { 'age': 50 }
	   *   ]
	   * };
	   *
	   * _.merge(names, ages);
	   * // => { 'stooges': [{ 'name': 'moe', 'age': 40 }, { 'name': 'larry', 'age': 50 }] }
	   *
	   * var food = {
	   *   'fruits': ['apple'],
	   *   'vegetables': ['beet']
	   * };
	   *
	   * var otherFood = {
	   *   'fruits': ['banana'],
	   *   'vegetables': ['carrot']
	   * };
	   *
	   * _.merge(food, otherFood, function(a, b) {
	   *   return _.isArray(a) ? a.concat(b) : undefined;
	   * });
	   * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
	   */
	  function merge(object, source, deepIndicator) {
	    var args = arguments,
	        index = 0,
	        length = 2;

	    if (!isObject(object)) {
	      return object;
	    }
	    if (deepIndicator === indicatorObject) {
	      var callback = args[3],
	          stackA = args[4],
	          stackB = args[5];
	    } else {
	      stackA = [];
	      stackB = [];

	      // allows working with `_.reduce` and `_.reduceRight` without
	      // using their `callback` arguments, `index|key` and `collection`
	      if (typeof deepIndicator != 'number') {
	        length = args.length;
	      }
	      if (length > 3 && typeof args[length - 2] == 'function') {
	        callback = createCallback(args[--length - 1], args[length--], 2);
	      } else if (length > 2 && typeof args[length - 1] == 'function') {
	        callback = args[--length];
	      }
	    }
	    while (++index < length) {
	      (isArray(args[index]) ? forEach : forOwn)(args[index], function(source, key) {
	        var found,
	            isArr,
	            result = source,
	            value = object[key];

	        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
	          // avoid merging previously merged cyclic sources
	          var stackLength = stackA.length;
	          while (stackLength--) {
	            if ((found = stackA[stackLength] == source)) {
	              value = stackB[stackLength];
	              break;
	            }
	          }
	          if (!found) {
	            value = isArr
	              ? (isArray(value) ? value : [])
	              : (isPlainObject(value) ? value : {});

	            if (callback) {
	              result = callback(value, source);
	              if (typeof result != 'undefined') {
	                value = result;
	              }
	            }
	            // add `source` and associated `value` to the stack of traversed objects
	            stackA.push(source);
	            stackB.push(value);

	            // recursively merge objects and arrays (susceptible to call stack limits)
	            if (!callback) {
	              value = merge(value, source, indicatorObject, callback, stackA, stackB);
	            }
	          }
	        }
	        else {
	          if (callback) {
	            result = callback(value, source);
	            if (typeof result == 'undefined') {
	              result = source;
	            }
	          }
	          if (typeof result != 'undefined') {
	            value = result;
	          }
	        }
	        object[key] = value;
	      });
	    }
	    return object;
	  }

	  /**
	   * Creates a shallow clone of `object` excluding the specified properties.
	   * Property names may be specified as individual arguments or as arrays of
	   * property names. If a `callback` function is passed, it will be executed
	   * for each property in the `object`, omitting the properties `callback`
	   * returns truthy for. The `callback` is bound to `thisArg` and invoked
	   * with three arguments; (value, key, object).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The source object.
	   * @param {Function|String} callback|[prop1, prop2, ...] The properties to omit
	   *  or the function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns an object without the omitted properties.
	   * @example
	   *
	   * _.omit({ 'name': 'moe', 'age': 40 }, 'age');
	   * // => { 'name': 'moe' }
	   *
	   * _.omit({ 'name': 'moe', 'age': 40 }, function(value) {
	   *   return typeof value == 'number';
	   * });
	   * // => { 'name': 'moe' }
	   */
	  function omit(object, callback, thisArg) {
	    var isFunc = typeof callback == 'function',
	        result = {};

	    if (isFunc) {
	      callback = createCallback(callback, thisArg);
	    } else {
	      var props = concat.apply(arrayRef, arguments);
	    }
	    forIn(object, function(value, key, object) {
	      if (isFunc
	            ? !callback(value, key, object)
	            : indexOf(props, key, 1) < 0
	          ) {
	        result[key] = value;
	      }
	    });
	    return result;
	  }

	  /**
	   * Creates a two dimensional array of the given object's key-value pairs,
	   * i.e. `[[key1, value1], [key2, value2]]`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns new array of key-value pairs.
	   * @example
	   *
	   * _.pairs({ 'moe': 30, 'larry': 40 });
	   * // => [['moe', 30], ['larry', 40]] (order is not guaranteed)
	   */
	  function pairs(object) {
	    var index = -1,
	        props = keys(object),
	        length = props.length,
	        result = Array(length);

	    while (++index < length) {
	      var key = props[index];
	      result[index] = [key, object[key]];
	    }
	    return result;
	  }

	  /**
	   * Creates a shallow clone of `object` composed of the specified properties.
	   * Property names may be specified as individual arguments or as arrays of property
	   * names. If `callback` is passed, it will be executed for each property in the
	   * `object`, picking the properties `callback` returns truthy for. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, key, object).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The source object.
	   * @param {Array|Function|String} callback|[prop1, prop2, ...] The function called
	   *  per iteration or properties to pick, either as individual arguments or arrays.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns an object composed of the picked properties.
	   * @example
	   *
	   * _.pick({ 'name': 'moe', '_userid': 'moe1' }, 'name');
	   * // => { 'name': 'moe' }
	   *
	   * _.pick({ 'name': 'moe', '_userid': 'moe1' }, function(value, key) {
	   *   return key.charAt(0) != '_';
	   * });
	   * // => { 'name': 'moe' }
	   */
	  function pick(object, callback, thisArg) {
	    var result = {};
	    if (typeof callback != 'function') {
	      var index = 0,
	          props = concat.apply(arrayRef, arguments),
	          length = isObject(object) ? props.length : 0;

	      while (++index < length) {
	        var key = props[index];
	        if (key in object) {
	          result[key] = object[key];
	        }
	      }
	    } else {
	      callback = createCallback(callback, thisArg);
	      forIn(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result[key] = value;
	        }
	      });
	    }
	    return result;
	  }

	  /**
	   * Creates an array composed of the own enumerable property values of `object`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns a new array of property values.
	   * @example
	   *
	   * _.values({ 'one': 1, 'two': 2, 'three': 3 });
	   * // => [1, 2, 3]
	   */
	  function values(object) {
	    var index = -1,
	        props = keys(object),
	        length = props.length,
	        result = Array(length);

	    while (++index < length) {
	      result[index] = object[props[index]];
	    }
	    return result;
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates an array of elements from the specified indexes, or keys, of the
	   * `collection`. Indexes may be specified as individual arguments or as arrays
	   * of indexes.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Array|Number|String} [index1, index2, ...] The indexes of
	   *  `collection` to retrieve, either as individual arguments or arrays.
	   * @returns {Array} Returns a new array of elements corresponding to the
	   *  provided indexes.
	   * @example
	   *
	   * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
	   * // => ['a', 'c', 'e']
	   *
	   * _.at(['moe', 'larry', 'curly'], 0, 2);
	   * // => ['moe', 'curly']
	   */
	  function at(collection) {
	    var index = -1,
	        props = concat.apply(arrayRef, slice(arguments, 1)),
	        length = props.length,
	        result = Array(length);

	    if (noCharByIndex && isString(collection)) {
	      collection = collection.split('');
	    }
	    while(++index < length) {
	      result[index] = collection[props[index]];
	    }
	    return result;
	  }

	  /**
	   * Checks if a given `target` element is present in a `collection` using strict
	   * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
	   * as the offset from the end of the collection.
	   *
	   * @static
	   * @memberOf _
	   * @alias include
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Mixed} target The value to check for.
	   * @param {Number} [fromIndex=0] The index to search from.
	   * @returns {Boolean} Returns `true` if the `target` element is found, else `false`.
	   * @example
	   *
	   * _.contains([1, 2, 3], 1);
	   * // => true
	   *
	   * _.contains([1, 2, 3], 1, 2);
	   * // => false
	   *
	   * _.contains({ 'name': 'moe', 'age': 40 }, 'moe');
	   * // => true
	   *
	   * _.contains('curly', 'ur');
	   * // => true
	   */
	  function contains(collection, target, fromIndex) {
	    var index = -1,
	        length = collection ? collection.length : 0,
	        result = false;

	    fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
	    if (typeof length == 'number') {
	      result = (isString(collection)
	        ? collection.indexOf(target, fromIndex)
	        : indexOf(collection, target, fromIndex)
	      ) > -1;
	    } else {
	      each(collection, function(value) {
	        if (++index >= fromIndex) {
	          return !(result = value === target);
	        }
	      });
	    }
	    return result;
	  }

	  /**
	   * Creates an object composed of keys returned from running each element of the
	   * `collection` through the given `callback`. The corresponding value of each key
	   * is the number of times the key was returned by the `callback`. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns the composed aggregate object.
	   * @example
	   *
	   * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
	   * // => { '4': 1, '6': 2 }
	   *
	   * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	   * // => { '4': 1, '6': 2 }
	   *
	   * _.countBy(['one', 'two', 'three'], 'length');
	   * // => { '3': 2, '5': 1 }
	   */
	  function countBy(collection, callback, thisArg) {
	    var result = {};
	    callback = createCallback(callback, thisArg);

	    forEach(collection, function(value, key, collection) {
	      key = callback(value, key, collection) + '';
	      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
	    });
	    return result;
	  }

	  /**
	   * Checks if the `callback` returns a truthy value for **all** elements of a
	   * `collection`. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias all
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Boolean} Returns `true` if all elements pass the callback check,
	   *  else `false`.
	   * @example
	   *
	   * _.every([true, 1, null, 'yes'], Boolean);
	   * // => false
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.every(stooges, 'age');
	   * // => true
	   *
	   * // using "_.where" callback shorthand
	   * _.every(stooges, { 'age': 50 });
	   * // => false
	   */
	  function every(collection, callback, thisArg) {
	    var result = true;
	    callback = createCallback(callback, thisArg);

	    if (isArray(collection)) {
	      var index = -1,
	          length = collection.length;

	      while (++index < length) {
	        if (!(result = !!callback(collection[index], index, collection))) {
	          break;
	        }
	      }
	    } else {
	      each(collection, function(value, index, collection) {
	        return (result = !!callback(value, index, collection));
	      });
	    }
	    return result;
	  }

	  /**
	   * Examines each element in a `collection`, returning an array of all elements
	   * the `callback` returns truthy for. The `callback` is bound to `thisArg` and
	   * invoked with three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias select
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of elements that passed the callback check.
	   * @example
	   *
	   * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	   * // => [2, 4, 6]
	   *
	   * var food = [
	   *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
	   *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.filter(food, 'organic');
	   * // => [{ 'name': 'carrot', 'organic': true, 'type': 'vegetable' }]
	   *
	   * // using "_.where" callback shorthand
	   * _.filter(food, { 'type': 'fruit' });
	   * // => [{ 'name': 'apple', 'organic': false, 'type': 'fruit' }]
	   */
	  function filter(collection, callback, thisArg) {
	    var result = [];
	    callback = createCallback(callback, thisArg);

	    if (isArray(collection)) {
	      var index = -1,
	          length = collection.length;

	      while (++index < length) {
	        var value = collection[index];
	        if (callback(value, index, collection)) {
	          result.push(value);
	        }
	      }
	    } else {
	      each(collection, function(value, index, collection) {
	        if (callback(value, index, collection)) {
	          result.push(value);
	        }
	      });
	    }
	    return result;
	  }

	  /**
	   * Examines each element in a `collection`, returning the first that the `callback`
	   * returns truthy for. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias detect
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the element that passed the callback check,
	   *  else `undefined`.
	   * @example
	   *
	   * var even = _.find([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	   * // => 2
	   *
	   * var food = [
	   *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
	   *   { 'name': 'banana', 'organic': true,  'type': 'fruit' },
	   *   { 'name': 'beet',   'organic': false, 'type': 'vegetable' },
	   *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * var veggie = _.find(food, { 'type': 'vegetable' });
	   * // => { 'name': 'beet', 'organic': false, 'type': 'vegetable' }
	   *
	   * // using "_.pluck" callback shorthand
	   * var healthy = _.find(food, 'organic');
	   * // => { 'name': 'banana', 'organic': true, 'type': 'fruit' }
	   */
	  function find(collection, callback, thisArg) {
	    var result;
	    callback = createCallback(callback, thisArg);

	    forEach(collection, function(value, index, collection) {
	      if (callback(value, index, collection)) {
	        result = value;
	        return false;
	      }
	    });
	    return result;
	  }

	  /**
	   * Iterates over a `collection`, executing the `callback` for each element in
	   * the `collection`. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index|key, collection). Callbacks may exit iteration early
	   * by explicitly returning `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias each
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array|Object|String} Returns `collection`.
	   * @example
	   *
	   * _([1, 2, 3]).forEach(alert).join(',');
	   * // => alerts each number and returns '1,2,3'
	   *
	   * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, alert);
	   * // => alerts each number value (order is not guaranteed)
	   */
	  function forEach(collection, callback, thisArg) {
	    if (callback && typeof thisArg == 'undefined' && isArray(collection)) {
	      var index = -1,
	          length = collection.length;

	      while (++index < length) {
	        if (callback(collection[index], index, collection) === false) {
	          break;
	        }
	      }
	    } else {
	      each(collection, callback, thisArg);
	    }
	    return collection;
	  }

	  /**
	   * Creates an object composed of keys returned from running each element of the
	   * `collection` through the `callback`. The corresponding value of each key is
	   * an array of elements passed to `callback` that returned the key. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns the composed aggregate object.
	   * @example
	   *
	   * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
	   * // => { '4': [4.2], '6': [6.1, 6.4] }
	   *
	   * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	   * // => { '4': [4.2], '6': [6.1, 6.4] }
	   *
	   * // using "_.pluck" callback shorthand
	   * _.groupBy(['one', 'two', 'three'], 'length');
	   * // => { '3': ['one', 'two'], '5': ['three'] }
	   */
	  function groupBy(collection, callback, thisArg) {
	    var result = {};
	    callback = createCallback(callback, thisArg);

	    forEach(collection, function(value, key, collection) {
	      key = callback(value, key, collection) + '';
	      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
	    });
	    return result;
	  }

	  /**
	   * Invokes the method named by `methodName` on each element in the `collection`,
	   * returning an array of the results of each invoked method. Additional arguments
	   * will be passed to each invoked method. If `methodName` is a function, it will
	   * be invoked for, and `this` bound to, each element in the `collection`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|String} methodName The name of the method to invoke or
	   *  the function invoked per iteration.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
	   * @returns {Array} Returns a new array of the results of each invoked method.
	   * @example
	   *
	   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	   * // => [[1, 5, 7], [1, 2, 3]]
	   *
	   * _.invoke([123, 456], String.prototype.split, '');
	   * // => [['1', '2', '3'], ['4', '5', '6']]
	   */
	  function invoke(collection, methodName) {
	    var args = slice(arguments, 2),
	        index = -1,
	        isFunc = typeof methodName == 'function',
	        length = collection ? collection.length : 0,
	        result = Array(typeof length == 'number' ? length : 0);

	    forEach(collection, function(value) {
	      result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
	    });
	    return result;
	  }

	  /**
	   * Creates an array of values by running each element in the `collection`
	   * through the `callback`. The `callback` is bound to `thisArg` and invoked with
	   * three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias collect
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of the results of each `callback` execution.
	   * @example
	   *
	   * _.map([1, 2, 3], function(num) { return num * 3; });
	   * // => [3, 6, 9]
	   *
	   * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
	   * // => [3, 6, 9] (order is not guaranteed)
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.map(stooges, 'name');
	   * // => ['moe', 'larry']
	   */
	  function map(collection, callback, thisArg) {
	    var index = -1,
	        length = collection ? collection.length : 0,
	        result = Array(typeof length == 'number' ? length : 0);

	    callback = createCallback(callback, thisArg);
	    if (isArray(collection)) {
	      while (++index < length) {
	        result[index] = callback(collection[index], index, collection);
	      }
	    } else {
	      each(collection, function(value, key, collection) {
	        result[++index] = callback(value, key, collection);
	      });
	    }
	    return result;
	  }

	  /**
	   * Retrieves the maximum value of an `array`. If `callback` is passed,
	   * it will be executed for each value in the `array` to generate the
	   * criterion by which the value is ranked. The `callback` is bound to
	   * `thisArg` and invoked with three arguments; (value, index, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the maximum value.
	   * @example
	   *
	   * _.max([4, 2, 8, 6]);
	   * // => 8
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * _.max(stooges, function(stooge) { return stooge.age; });
	   * // => { 'name': 'larry', 'age': 50 };
	   *
	   * // using "_.pluck" callback shorthand
	   * _.max(stooges, 'age');
	   * // => { 'name': 'larry', 'age': 50 };
	   */
	  function max(collection, callback, thisArg) {
	    var computed = -Infinity,
	        result = computed;

	    if (!callback && isArray(collection)) {
	      var index = -1,
	          length = collection.length;

	      while (++index < length) {
	        var value = collection[index];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      callback = !callback && isString(collection)
	        ? charAtCallback
	        : createCallback(callback, thisArg);

	      each(collection, function(value, index, collection) {
	        var current = callback(value, index, collection);
	        if (current > computed) {
	          computed = current;
	          result = value;
	        }
	      });
	    }
	    return result;
	  }

	  /**
	   * Retrieves the minimum value of an `array`. If `callback` is passed,
	   * it will be executed for each value in the `array` to generate the
	   * criterion by which the value is ranked. The `callback` is bound to `thisArg`
	   * and invoked with three arguments; (value, index, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the minimum value.
	   * @example
	   *
	   * _.min([4, 2, 8, 6]);
	   * // => 2
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * _.min(stooges, function(stooge) { return stooge.age; });
	   * // => { 'name': 'moe', 'age': 40 };
	   *
	   * // using "_.pluck" callback shorthand
	   * _.min(stooges, 'age');
	   * // => { 'name': 'moe', 'age': 40 };
	   */
	  function min(collection, callback, thisArg) {
	    var computed = Infinity,
	        result = computed;

	    if (!callback && isArray(collection)) {
	      var index = -1,
	          length = collection.length;

	      while (++index < length) {
	        var value = collection[index];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      callback = !callback && isString(collection)
	        ? charAtCallback
	        : createCallback(callback, thisArg);

	      each(collection, function(value, index, collection) {
	        var current = callback(value, index, collection);
	        if (current < computed) {
	          computed = current;
	          result = value;
	        }
	      });
	    }
	    return result;
	  }

	  /**
	   * Retrieves the value of a specified property from all elements in the `collection`.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {String} property The property to pluck.
	   * @returns {Array} Returns a new array of property values.
	   * @example
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * _.pluck(stooges, 'name');
	   * // => ['moe', 'larry']
	   */
	  var pluck = map;

	  /**
	   * Reduces a `collection` to a value that is the accumulated result of running
	   * each element in the `collection` through the `callback`, where each successive
	   * `callback` execution consumes the return value of the previous execution.
	   * If `accumulator` is not passed, the first element of the `collection` will be
	   * used as the initial `accumulator` value. The `callback` is bound to `thisArg`
	   * and invoked with four arguments; (accumulator, value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @alias foldl, inject
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [accumulator] Initial value of the accumulator.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the accumulated value.
	   * @example
	   *
	   * var sum = _.reduce([1, 2, 3], function(sum, num) {
	   *   return sum + num;
	   * });
	   * // => 6
	   *
	   * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	   *   result[key] = num * 3;
	   *   return result;
	   * }, {});
	   * // => { 'a': 3, 'b': 6, 'c': 9 }
	   */
	  function reduce(collection, callback, accumulator, thisArg) {
	    var noaccum = arguments.length < 3;
	    callback = createCallback(callback, thisArg, 4);

	    if (isArray(collection)) {
	      var index = -1,
	          length = collection.length;

	      if (noaccum) {
	        accumulator = collection[++index];
	      }
	      while (++index < length) {
	        accumulator = callback(accumulator, collection[index], index, collection);
	      }
	    } else {
	      each(collection, function(value, index, collection) {
	        accumulator = noaccum
	          ? (noaccum = false, value)
	          : callback(accumulator, value, index, collection)
	      });
	    }
	    return accumulator;
	  }

	  /**
	   * This method is similar to `_.reduce`, except that it iterates over a
	   * `collection` from right to left.
	   *
	   * @static
	   * @memberOf _
	   * @alias foldr
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [accumulator] Initial value of the accumulator.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the accumulated value.
	   * @example
	   *
	   * var list = [[0, 1], [2, 3], [4, 5]];
	   * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
	   * // => [4, 5, 2, 3, 0, 1]
	   */
	  function reduceRight(collection, callback, accumulator, thisArg) {
	    var iterable = collection,
	        length = collection ? collection.length : 0,
	        noaccum = arguments.length < 3;

	    if (typeof length != 'number') {
	      var props = keys(collection);
	      length = props.length;
	    } else if (noCharByIndex && isString(collection)) {
	      iterable = collection.split('');
	    }
	    callback = createCallback(callback, thisArg, 4);
	    forEach(collection, function(value, index, collection) {
	      index = props ? props[--length] : --length;
	      accumulator = noaccum
	        ? (noaccum = false, iterable[index])
	        : callback(accumulator, iterable[index], index, collection);
	    });
	    return accumulator;
	  }

	  /**
	   * The opposite of `_.filter`, this method returns the elements of a
	   * `collection` that `callback` does **not** return truthy for.
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of elements that did **not** pass the
	   *  callback check.
	   * @example
	   *
	   * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	   * // => [1, 3, 5]
	   *
	   * var food = [
	   *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
	   *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.reject(food, 'organic');
	   * // => [{ 'name': 'apple', 'organic': false, 'type': 'fruit' }]
	   *
	   * // using "_.where" callback shorthand
	   * _.reject(food, { 'type': 'fruit' });
	   * // => [{ 'name': 'carrot', 'organic': true, 'type': 'vegetable' }]
	   */
	  function reject(collection, callback, thisArg) {
	    callback = createCallback(callback, thisArg);
	    return filter(collection, function(value, index, collection) {
	      return !callback(value, index, collection);
	    });
	  }

	  /**
	   * Creates an array of shuffled `array` values, using a version of the
	   * Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to shuffle.
	   * @returns {Array} Returns a new shuffled collection.
	   * @example
	   *
	   * _.shuffle([1, 2, 3, 4, 5, 6]);
	   * // => [4, 1, 6, 3, 5, 2]
	   */
	  function shuffle(collection) {
	    var index = -1,
	        length = collection ? collection.length : 0,
	        result = Array(typeof length == 'number' ? length : 0);

	    forEach(collection, function(value) {
	      var rand = floor(nativeRandom() * (++index + 1));
	      result[index] = result[rand];
	      result[rand] = value;
	    });
	    return result;
	  }

	  /**
	   * Gets the size of the `collection` by returning `collection.length` for arrays
	   * and array-like objects or the number of own enumerable properties for objects.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to inspect.
	   * @returns {Number} Returns `collection.length` or number of own enumerable properties.
	   * @example
	   *
	   * _.size([1, 2]);
	   * // => 2
	   *
	   * _.size({ 'one': 1, 'two': 2, 'three': 3 });
	   * // => 3
	   *
	   * _.size('curly');
	   * // => 5
	   */
	  function size(collection) {
	    var length = collection ? collection.length : 0;
	    return typeof length == 'number' ? length : keys(collection).length;
	  }

	  /**
	   * Checks if the `callback` returns a truthy value for **any** element of a
	   * `collection`. The function returns as soon as it finds passing value, and
	   * does not iterate over the entire `collection`. The `callback` is bound to
	   * `thisArg` and invoked with three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias any
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Boolean} Returns `true` if any element passes the callback check,
	   *  else `false`.
	   * @example
	   *
	   * _.some([null, 0, 'yes', false], Boolean);
	   * // => true
	   *
	   * var food = [
	   *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
	   *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.some(food, 'organic');
	   * // => true
	   *
	   * // using "_.where" callback shorthand
	   * _.some(food, { 'type': 'meat' });
	   * // => false
	   */
	  function some(collection, callback, thisArg) {
	    var result;
	    callback = createCallback(callback, thisArg);

	    if (isArray(collection)) {
	      var index = -1,
	          length = collection.length;

	      while (++index < length) {
	        if ((result = callback(collection[index], index, collection))) {
	          break;
	        }
	      }
	    } else {
	      each(collection, function(value, index, collection) {
	        return !(result = callback(value, index, collection));
	      });
	    }
	    return !!result;
	  }

	  /**
	   * Creates an array of elements, sorted in ascending order by the results of
	   * running each element in the `collection` through the `callback`. This method
	   * performs a stable sort, that is, it will preserve the original sort order of
	   * equal elements. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of sorted elements.
	   * @example
	   *
	   * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
	   * // => [3, 1, 2]
	   *
	   * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
	   * // => [3, 1, 2]
	   *
	   * // using "_.pluck" callback shorthand
	   * _.sortBy(['banana', 'strawberry', 'apple'], 'length');
	   * // => ['apple', 'banana', 'strawberry']
	   */
	  function sortBy(collection, callback, thisArg) {
	    var index = -1,
	        length = collection ? collection.length : 0,
	        result = Array(typeof length == 'number' ? length : 0);

	    callback = createCallback(callback, thisArg);
	    forEach(collection, function(value, key, collection) {
	      result[++index] = {
	        'criteria': callback(value, key, collection),
	        'index': index,
	        'value': value
	      };
	    });

	    length = result.length;
	    result.sort(compareAscending);
	    while (length--) {
	      result[length] = result[length].value;
	    }
	    return result;
	  }

	  /**
	   * Converts the `collection` to an array.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to convert.
	   * @returns {Array} Returns the new converted array.
	   * @example
	   *
	   * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
	   * // => [2, 3, 4]
	   */
	  function toArray(collection) {
	    if (collection && typeof collection.length == 'number') {
	      return noCharByIndex && isString(collection)
	        ? collection.split('')
	        : slice(collection);
	    }
	    return values(collection);
	  }

	  /**
	   * Examines each element in a `collection`, returning an array of all elements
	   * that have the given `properties`. When checking `properties`, this method
	   * performs a deep comparison between values to determine if they are equivalent
	   * to each other.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Object} properties The object of property values to filter by.
	   * @returns {Array} Returns a new array of elements that have the given `properties`.
	   * @example
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * _.where(stooges, { 'age': 40 });
	   * // => [{ 'name': 'moe', 'age': 40 }]
	   */
	  var where = filter;

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates an array with all falsey values of `array` removed. The values
	   * `false`, `null`, `0`, `""`, `undefined` and `NaN` are all falsey.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to compact.
	   * @returns {Array} Returns a new filtered array.
	   * @example
	   *
	   * _.compact([0, 1, false, 2, '', 3]);
	   * // => [1, 2, 3]
	   */
	  function compact(array) {
	    var index = -1,
	        length = array ? array.length : 0,
	        result = [];

	    while (++index < length) {
	      var value = array[index];
	      if (value) {
	        result.push(value);
	      }
	    }
	    return result;
	  }

	  /**
	   * Creates an array of `array` elements not present in the other arrays
	   * using strict equality for comparisons, i.e. `===`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to process.
	   * @param {Array} [array1, array2, ...] Arrays to check.
	   * @returns {Array} Returns a new array of `array` elements not present in the
	   *  other arrays.
	   * @example
	   *
	   * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
	   * // => [1, 3, 4]
	   */
	  function difference(array) {
	    var index = -1,
	        length = array ? array.length : 0,
	        flattened = concat.apply(arrayRef, arguments),
	        contains = cachedContains(flattened, length),
	        result = [];

	    while (++index < length) {
	      var value = array[index];
	      if (!contains(value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  }

	  /**
	   * Gets the first element of the `array`. If a number `n` is passed, the first
	   * `n` elements of the `array` are returned. If a `callback` function is passed,
	   * the first elements the `callback` returns truthy for are returned. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, index, array).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias head, take
	   * @category Arrays
	   * @param {Array} array The array to query.
	   * @param {Function|Object|Number|String} [callback|n] The function called
	   *  per element or the number of elements to return. If a property name or
	   *  object is passed, it will be used to create a "_.pluck" or "_.where"
	   *  style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the first element(s) of `array`.
	   * @example
	   *
	   * _.first([1, 2, 3]);
	   * // => 1
	   *
	   * _.first([1, 2, 3], 2);
	   * // => [1, 2]
	   *
	   * _.first([1, 2, 3], function(num) {
	   *   return num < 3;
	   * });
	   * // => [1, 2]
	   *
	   * var food = [
	   *   { 'name': 'banana', 'organic': true },
	   *   { 'name': 'beet',   'organic': false },
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.first(food, 'organic');
	   * // => [{ 'name': 'banana', 'organic': true }]
	   *
	   * var food = [
	   *   { 'name': 'apple',  'type': 'fruit' },
	   *   { 'name': 'banana', 'type': 'fruit' },
	   *   { 'name': 'beet',   'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * _.first(food, { 'type': 'fruit' });
	   * // => [{ 'name': 'apple', 'type': 'fruit' }, { 'name': 'banana', 'type': 'fruit' }]
	   */
	  function first(array, callback, thisArg) {
	    if (array) {
	      var n = 0,
	          length = array.length;

	      if (typeof callback != 'number' && callback != null) {
	        var index = -1;
	        callback = createCallback(callback, thisArg);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array[0];
	        }
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, n), length));
	    }
	  }

	  /**
	   * Flattens a nested array (the nesting can be to any depth). If `shallow` is
	   * truthy, `array` will only be flattened a single level.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to compact.
	   * @param {Boolean} shallow A flag to indicate only flattening a single level.
	   * @returns {Array} Returns a new flattened array.
	   * @example
	   *
	   * _.flatten([1, [2], [3, [[4]]]]);
	   * // => [1, 2, 3, 4];
	   *
	   * _.flatten([1, [2], [3, [[4]]]], true);
	   * // => [1, 2, 3, [[4]]];
	   */
	  function flatten(array, shallow) {
	    var index = -1,
	        length = array ? array.length : 0,
	        result = [];

	    while (++index < length) {
	      var value = array[index];

	      // recursively flatten arrays (susceptible to call stack limits)
	      if (isArray(value)) {
	        push.apply(result, shallow ? value : flatten(value));
	      } else {
	        result.push(value);
	      }
	    }
	    return result;
	  }

	  /**
	   * Gets the index at which the first occurrence of `value` is found using
	   * strict equality for comparisons, i.e. `===`. If the `array` is already
	   * sorted, passing `true` for `fromIndex` will run a faster binary search.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to search.
	   * @param {Mixed} value The value to search for.
	   * @param {Boolean|Number} [fromIndex=0] The index to search from or `true` to
	   *  perform a binary search on a sorted `array`.
	   * @returns {Number} Returns the index of the matched value or `-1`.
	   * @example
	   *
	   * _.indexOf([1, 2, 3, 1, 2, 3], 2);
	   * // => 1
	   *
	   * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
	   * // => 4
	   *
	   * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
	   * // => 2
	   */
	  function indexOf(array, value, fromIndex) {
	    var index = -1,
	        length = array ? array.length : 0;

	    if (typeof fromIndex == 'number') {
	      index = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0) - 1;
	    } else if (fromIndex) {
	      index = sortedIndex(array, value);
	      return array[index] === value ? index : -1;
	    }
	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * Gets all but the last element of `array`. If a number `n` is passed, the
	   * last `n` elements are excluded from the result. If a `callback` function
	   * is passed, the last elements the `callback` returns truthy for are excluded
	   * from the result. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index, array).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to query.
	   * @param {Function|Object|Number|String} [callback|n=1] The function called
	   *  per element or the number of elements to exclude. If a property name or
	   *  object is passed, it will be used to create a "_.pluck" or "_.where"
	   *  style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a slice of `array`.
	   * @example
	   *
	   * _.initial([1, 2, 3]);
	   * // => [1, 2]
	   *
	   * _.initial([1, 2, 3], 2);
	   * // => [1]
	   *
	   * _.initial([1, 2, 3], function(num) {
	   *   return num > 1;
	   * });
	   * // => [1]
	   *
	   * var food = [
	   *   { 'name': 'beet',   'organic': false },
	   *   { 'name': 'carrot', 'organic': true }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.initial(food, 'organic');
	   * // => [{ 'name': 'beet',   'organic': false }]
	   *
	   * var food = [
	   *   { 'name': 'banana', 'type': 'fruit' },
	   *   { 'name': 'beet',   'type': 'vegetable' },
	   *   { 'name': 'carrot', 'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * _.initial(food, { 'type': 'vegetable' });
	   * // => [{ 'name': 'banana', 'type': 'fruit' }]
	   */
	  function initial(array, callback, thisArg) {
	    if (!array) {
	      return [];
	    }
	    var n = 0,
	        length = array.length;

	    if (typeof callback != 'number' && callback != null) {
	      var index = length;
	      callback = createCallback(callback, thisArg);
	      while (index-- && callback(array[index], index, array)) {
	        n++;
	      }
	    } else {
	      n = (callback == null || thisArg) ? 1 : callback || n;
	    }
	    return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
	  }

	  /**
	   * Computes the intersection of all the passed-in arrays using strict equality
	   * for comparisons, i.e. `===`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} [array1, array2, ...] Arrays to process.
	   * @returns {Array} Returns a new array of unique elements that are present
	   *  in **all** of the arrays.
	   * @example
	   *
	   * _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
	   * // => [1, 2]
	   */
	  function intersection(array) {
	    var args = arguments,
	        argsLength = args.length,
	        cache = { '0': {} },
	        index = -1,
	        length = array ? array.length : 0,
	        isLarge = length >= 100,
	        result = [],
	        seen = result;

	    outer:
	    while (++index < length) {
	      var value = array[index];
	      if (isLarge) {
	        var key = value + '';
	        var inited = hasOwnProperty.call(cache[0], key)
	          ? !(seen = cache[0][key])
	          : (seen = cache[0][key] = []);
	      }
	      if (inited || indexOf(seen, value) < 0) {
	        if (isLarge) {
	          seen.push(value);
	        }
	        var argsIndex = argsLength;
	        while (--argsIndex) {
	          if (!(cache[argsIndex] || (cache[argsIndex] = cachedContains(args[argsIndex], 0, 100)))(value)) {
	            continue outer;
	          }
	        }
	        result.push(value);
	      }
	    }
	    return result;
	  }

	  /**
	   * Gets the last element of the `array`. If a number `n` is passed, the last
	   * `n` elements of the `array` are returned. If a `callback` function is passed,
	   * the last elements the `callback` returns truthy for are returned. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, index, array).
	   *
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to query.
	   * @param {Function|Object|Number|String} [callback|n] The function called
	   *  per element or the number of elements to return. If a property name or
	   *  object is passed, it will be used to create a "_.pluck" or "_.where"
	   *  style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the last element(s) of `array`.
	   * @example
	   *
	   * _.last([1, 2, 3]);
	   * // => 3
	   *
	   * _.last([1, 2, 3], 2);
	   * // => [2, 3]
	   *
	   * _.last([1, 2, 3], function(num) {
	   *   return num > 1;
	   * });
	   * // => [2, 3]
	   *
	   * var food = [
	   *   { 'name': 'beet',   'organic': false },
	   *   { 'name': 'carrot', 'organic': true }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.last(food, 'organic');
	   * // => [{ 'name': 'carrot', 'organic': true }]
	   *
	   * var food = [
	   *   { 'name': 'banana', 'type': 'fruit' },
	   *   { 'name': 'beet',   'type': 'vegetable' },
	   *   { 'name': 'carrot', 'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * _.last(food, { 'type': 'vegetable' });
	   * // => [{ 'name': 'beet', 'type': 'vegetable' }, { 'name': 'carrot', 'type': 'vegetable' }]
	   */
	  function last(array, callback, thisArg) {
	    if (array) {
	      var n = 0,
	          length = array.length;

	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = createCallback(callback, thisArg);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array[length - 1];
	        }
	      }
	      return slice(array, nativeMax(0, length - n));
	    }
	  }

	  /**
	   * Gets the index at which the last occurrence of `value` is found using strict
	   * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
	   * as the offset from the end of the collection.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to search.
	   * @param {Mixed} value The value to search for.
	   * @param {Number} [fromIndex=array.length-1] The index to search from.
	   * @returns {Number} Returns the index of the matched value or `-1`.
	   * @example
	   *
	   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
	   * // => 4
	   *
	   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
	   * // => 1
	   */
	  function lastIndexOf(array, value, fromIndex) {
	    var index = array ? array.length : 0;
	    if (typeof fromIndex == 'number') {
	      index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
	    }
	    while (index--) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * Creates an object composed from arrays of `keys` and `values`. Pass either
	   * a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`, or
	   * two arrays, one of `keys` and one of corresponding `values`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} keys The array of keys.
	   * @param {Array} [values=[]] The array of values.
	   * @returns {Object} Returns an object composed of the given keys and
	   *  corresponding values.
	   * @example
	   *
	   * _.object(['moe', 'larry'], [30, 40]);
	   * // => { 'moe': 30, 'larry': 40 }
	   */
	  function object(keys, values) {
	    var index = -1,
	        length = keys ? keys.length : 0,
	        result = {};

	    while (++index < length) {
	      var key = keys[index];
	      if (values) {
	        result[key] = values[index];
	      } else {
	        result[key[0]] = key[1];
	      }
	    }
	    return result;
	  }

	  /**
	   * Creates an array of numbers (positive and/or negative) progressing from
	   * `start` up to but not including `end`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Number} [start=0] The start of the range.
	   * @param {Number} end The end of the range.
	   * @param {Number} [step=1] The value to increment or descrement by.
	   * @returns {Array} Returns a new range array.
	   * @example
	   *
	   * _.range(10);
	   * // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	   *
	   * _.range(1, 11);
	   * // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	   *
	   * _.range(0, 30, 5);
	   * // => [0, 5, 10, 15, 20, 25]
	   *
	   * _.range(0, -10, -1);
	   * // => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
	   *
	   * _.range(0);
	   * // => []
	   */
	  function range(start, end, step) {
	    start = +start || 0;
	    step = +step || 1;

	    if (end == null) {
	      end = start;
	      start = 0;
	    }
	    // use `Array(length)` so V8 will avoid the slower "dictionary" mode
	    // http://youtu.be/XAqIpGU8ZZk#t=17m25s
	    var index = -1,
	        length = nativeMax(0, ceil((end - start) / step)),
	        result = Array(length);

	    while (++index < length) {
	      result[index] = start;
	      start += step;
	    }
	    return result;
	  }

	  /**
	   * The opposite of `_.initial`, this method gets all but the first value of `array`.
	   * If a number `n` is passed, the first `n` values are excluded from the result.
	   * If a `callback` function is passed, the first elements the `callback` returns
	   * truthy for are excluded from the result. The `callback` is bound to `thisArg`
	   * and invoked with three arguments; (value, index, array).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias drop, tail
	   * @category Arrays
	   * @param {Array} array The array to query.
	   * @param {Function|Object|Number|String} [callback|n=1] The function called
	   *  per element or the number of elements to exclude. If a property name or
	   *  object is passed, it will be used to create a "_.pluck" or "_.where"
	   *  style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a slice of `array`.
	   * @example
	   *
	   * _.rest([1, 2, 3]);
	   * // => [2, 3]
	   *
	   * _.rest([1, 2, 3], 2);
	   * // => [3]
	   *
	   * _.rest([1, 2, 3], function(num) {
	   *   return num < 3;
	   * });
	   * // => [3]
	   *
	   * var food = [
	   *   { 'name': 'banana', 'organic': true },
	   *   { 'name': 'beet',   'organic': false },
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.rest(food, 'organic');
	   * // => [{ 'name': 'beet', 'organic': false }]
	   *
	   * var food = [
	   *   { 'name': 'apple',  'type': 'fruit' },
	   *   { 'name': 'banana', 'type': 'fruit' },
	   *   { 'name': 'beet',   'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * _.rest(food, { 'type': 'fruit' });
	   * // => [{ 'name': 'beet', 'type': 'vegetable' }]
	   */
	  function rest(array, callback, thisArg) {
	    if (typeof callback != 'number' && callback != null) {
	      var n = 0,
	          index = -1,
	          length = array ? array.length : 0;

	      callback = createCallback(callback, thisArg);
	      while (++index < length && callback(array[index], index, array)) {
	        n++;
	      }
	    } else {
	      n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
	    }
	    return slice(array, n);
	  }

	  /**
	   * Uses a binary search to determine the smallest index at which the `value`
	   * should be inserted into `array` in order to maintain the sort order of the
	   * sorted `array`. If `callback` is passed, it will be executed for `value` and
	   * each element in `array` to compute their sort ranking. The `callback` is
	   * bound to `thisArg` and invoked with one argument; (value).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to iterate over.
	   * @param {Mixed} value The value to evaluate.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Number} Returns the index at which the value should be inserted
	   *  into `array`.
	   * @example
	   *
	   * _.sortedIndex([20, 30, 50], 40);
	   * // => 2
	   *
	   * // using "_.pluck" callback shorthand
	   * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	   * // => 2
	   *
	   * var dict = {
	   *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
	   * };
	   *
	   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	   *   return dict.wordToNumber[word];
	   * });
	   * // => 2
	   *
	   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	   *   return this.wordToNumber[word];
	   * }, dict);
	   * // => 2
	   */
	  function sortedIndex(array, value, callback, thisArg) {
	    var low = 0,
	        high = array ? array.length : low;

	    // explicitly reference `identity` for better inlining in Firefox
	    callback = callback ? createCallback(callback, thisArg, 1) : identity;
	    value = callback(value);

	    while (low < high) {
	      var mid = (low + high) >>> 1;
	      callback(array[mid]) < value
	        ? low = mid + 1
	        : high = mid;
	    }
	    return low;
	  }

	  /**
	   * Computes the union of the passed-in arrays using strict equality for
	   * comparisons, i.e. `===`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} [array1, array2, ...] Arrays to process.
	   * @returns {Array} Returns a new array of unique values, in order, that are
	   *  present in one or more of the arrays.
	   * @example
	   *
	   * _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
	   * // => [1, 2, 3, 101, 10]
	   */
	  function union() {
	    return uniq(concat.apply(arrayRef, arguments));
	  }

	  /**
	   * Creates a duplicate-value-free version of the `array` using strict equality
	   * for comparisons, i.e. `===`. If the `array` is already sorted, passing `true`
	   * for `isSorted` will run a faster algorithm. If `callback` is passed, each
	   * element of `array` is passed through a callback` before uniqueness is computed.
	   * The `callback` is bound to `thisArg` and invoked with three arguments; (value, index, array).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias unique
	   * @category Arrays
	   * @param {Array} array The array to process.
	   * @param {Boolean} [isSorted=false] A flag to indicate that the `array` is already sorted.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a duplicate-value-free array.
	   * @example
	   *
	   * _.uniq([1, 2, 1, 3, 1]);
	   * // => [1, 2, 3]
	   *
	   * _.uniq([1, 1, 2, 2, 3], true);
	   * // => [1, 2, 3]
	   *
	   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return Math.floor(num); });
	   * // => [1, 2, 3]
	   *
	   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return this.floor(num); }, Math);
	   * // => [1, 2, 3]
	   *
	   * // using "_.pluck" callback shorthand
	   * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	   * // => [{ 'x': 1 }, { 'x': 2 }]
	   */
	  function uniq(array, isSorted, callback, thisArg) {
	    var index = -1,
	        length = array ? array.length : 0,
	        result = [],
	        seen = result;

	    // juggle arguments
	    if (typeof isSorted == 'function') {
	      thisArg = callback;
	      callback = isSorted;
	      isSorted = false;
	    }
	    // init value cache for large arrays
	    var isLarge = !isSorted && length >= 75;
	    if (isLarge) {
	      var cache = {};
	    }
	    if (callback) {
	      seen = [];
	      callback = createCallback(callback, thisArg);
	    }
	    while (++index < length) {
	      var value = array[index],
	          computed = callback ? callback(value, index, array) : value;

	      if (isLarge) {
	        var key = computed + '';
	        var inited = hasOwnProperty.call(cache, key)
	          ? !(seen = cache[key])
	          : (seen = cache[key] = []);
	      }
	      if (isSorted
	            ? !index || seen[seen.length - 1] !== computed
	            : inited || indexOf(seen, computed) < 0
	          ) {
	        if (callback || isLarge) {
	          seen.push(computed);
	        }
	        result.push(value);
	      }
	    }
	    return result;
	  }

	  /**
	   * Creates an array with all occurrences of the passed values removed using
	   * strict equality for comparisons, i.e. `===`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to filter.
	   * @param {Mixed} [value1, value2, ...] Values to remove.
	   * @returns {Array} Returns a new filtered array.
	   * @example
	   *
	   * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
	   * // => [2, 3, 4]
	   */
	  function without(array) {
	    var index = -1,
	        length = array ? array.length : 0,
	        contains = cachedContains(arguments, 1),
	        result = [];

	    while (++index < length) {
	      var value = array[index];
	      if (!contains(value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  }

	  /**
	   * Groups the elements of each array at their corresponding indexes. Useful for
	   * separate data sources that are coordinated through matching array indexes.
	   * For a matrix of nested arrays, `_.zip.apply(...)` can transpose the matrix
	   * in a similar fashion.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} [array1, array2, ...] Arrays to process.
	   * @returns {Array} Returns a new array of grouped elements.
	   * @example
	   *
	   * _.zip(['moe', 'larry'], [30, 40], [true, false]);
	   * // => [['moe', 30, true], ['larry', 40, false]]
	   */
	  function zip(array) {
	    var index = -1,
	        length = array ? max(pluck(arguments, 'length')) : 0,
	        result = Array(length);

	    while (++index < length) {
	      result[index] = pluck(arguments, index);
	    }
	    return result;
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Creates a function that is restricted to executing `func` only after it is
	   * called `n` times. The `func` is executed with the `this` binding of the
	   * created function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Number} n The number of times the function must be called before
	   * it is executed.
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * var renderNotes = _.after(notes.length, render);
	   * _.forEach(notes, function(note) {
	   *   note.asyncSave({ 'success': renderNotes });
	   * });
	   * // `renderNotes` is run once, after all notes have saved
	   */
	  function after(n, func) {
	    if (n < 1) {
	      return func();
	    }
	    return function() {
	      if (--n < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  }

	  /**
	   * Creates a function that, when called, invokes `func` with the `this`
	   * binding of `thisArg` and prepends any additional `bind` arguments to those
	   * passed to the bound function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to bind.
	   * @param {Mixed} [thisArg] The `this` binding of `func`.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
	   * @returns {Function} Returns the new bound function.
	   * @example
	   *
	   * var func = function(greeting) {
	   *   return greeting + ' ' + this.name;
	   * };
	   *
	   * func = _.bind(func, { 'name': 'moe' }, 'hi');
	   * func();
	   * // => 'hi moe'
	   */
	  function bind(func, thisArg) {
	    // use `Function#bind` if it exists and is fast
	    // (in V8 `Function#bind` is slower except when partially applied)
	    return isBindFast || (nativeBind && arguments.length > 2)
	      ? nativeBind.call.apply(nativeBind, arguments)
	      : createBound(func, thisArg, slice(arguments, 2));
	  }

	  /**
	   * Binds methods on `object` to `object`, overwriting the existing method.
	   * Method names may be specified as individual arguments or as arrays of method
	   * names. If no method names are provided, all the function properties of `object`
	   * will be bound.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Object} object The object to bind and assign the bound methods to.
	   * @param {String} [methodName1, methodName2, ...] Method names on the object to bind.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * var view = {
	   *  'label': 'docs',
	   *  'onClick': function() { alert('clicked ' + this.label); }
	   * };
	   *
	   * _.bindAll(view);
	   * jQuery('#docs').on('click', view.onClick);
	   * // => alerts 'clicked docs', when the button is clicked
	   */
	  function bindAll(object) {
	    var funcs = concat.apply(arrayRef, arguments),
	        index = funcs.length > 1 ? 0 : (funcs = functions(object), -1),
	        length = funcs.length;

	    while (++index < length) {
	      var key = funcs[index];
	      object[key] = bind(object[key], object);
	    }
	    return object;
	  }

	  /**
	   * Creates a function that, when called, invokes the method at `object[key]`
	   * and prepends any additional `bindKey` arguments to those passed to the bound
	   * function. This method differs from `_.bind` by allowing bound functions to
	   * reference methods that will be redefined or don't yet exist.
	   * See http://michaux.ca/articles/lazy-function-definition-pattern.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Object} object The object the method belongs to.
	   * @param {String} key The key of the method.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
	   * @returns {Function} Returns the new bound function.
	   * @example
	   *
	   * var object = {
	   *   'name': 'moe',
	   *   'greet': function(greeting) {
	   *     return greeting + ' ' + this.name;
	   *   }
	   * };
	   *
	   * var func = _.bindKey(object, 'greet', 'hi');
	   * func();
	   * // => 'hi moe'
	   *
	   * object.greet = function(greeting) {
	   *   return greeting + ', ' + this.name + '!';
	   * };
	   *
	   * func();
	   * // => 'hi, moe!'
	   */
	  function bindKey(object, key) {
	    return createBound(object, key, slice(arguments, 2));
	  }

	  /**
	   * Creates a function that is the composition of the passed functions,
	   * where each function consumes the return value of the function that follows.
	   * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
	   * Each function is executed with the `this` binding of the composed function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} [func1, func2, ...] Functions to compose.
	   * @returns {Function} Returns the new composed function.
	   * @example
	   *
	   * var greet = function(name) { return 'hi ' + name; };
	   * var exclaim = function(statement) { return statement + '!'; };
	   * var welcome = _.compose(exclaim, greet);
	   * welcome('moe');
	   * // => 'hi moe!'
	   */
	  function compose() {
	    var funcs = arguments;
	    return function() {
	      var args = arguments,
	          length = funcs.length;

	      while (length--) {
	        args = [funcs[length].apply(this, args)];
	      }
	      return args[0];
	    };
	  }

	  /**
	   * Creates a function that will delay the execution of `func` until after
	   * `wait` milliseconds have elapsed since the last time it was invoked. Pass
	   * `true` for `immediate` to cause debounce to invoke `func` on the leading,
	   * instead of the trailing, edge of the `wait` timeout. Subsequent calls to
	   * the debounced function will return the result of the last `func` call.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to debounce.
	   * @param {Number} wait The number of milliseconds to delay.
	   * @param {Boolean} immediate A flag to indicate execution is on the leading
	   *  edge of the timeout.
	   * @returns {Function} Returns the new debounced function.
	   * @example
	   *
	   * var lazyLayout = _.debounce(calculateLayout, 300);
	   * jQuery(window).on('resize', lazyLayout);
	   */
	  function debounce(func, wait, immediate) {
	    var args,
	        result,
	        thisArg,
	        timeoutId;

	    function delayed() {
	      timeoutId = null;
	      if (!immediate) {
	        result = func.apply(thisArg, args);
	      }
	    }
	    return function() {
	      var isImmediate = immediate && !timeoutId;
	      args = arguments;
	      thisArg = this;

	      clearTimeout(timeoutId);
	      timeoutId = setTimeout(delayed, wait);

	      if (isImmediate) {
	        result = func.apply(thisArg, args);
	      }
	      return result;
	    };
	  }

	  /**
	   * Executes the `func` function after `wait` milliseconds. Additional arguments
	   * will be passed to `func` when it is invoked.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to delay.
	   * @param {Number} wait The number of milliseconds to delay execution.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
	   * @returns {Number} Returns the `setTimeout` timeout id.
	   * @example
	   *
	   * var log = _.bind(console.log, console);
	   * _.delay(log, 1000, 'logged later');
	   * // => 'logged later' (Appears after one second.)
	   */
	  function delay(func, wait) {
	    var args = slice(arguments, 2);
	    return setTimeout(function() { func.apply(undefined, args); }, wait);
	  }

	  /**
	   * Defers executing the `func` function until the current call stack has cleared.
	   * Additional arguments will be passed to `func` when it is invoked.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to defer.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
	   * @returns {Number} Returns the `setTimeout` timeout id.
	   * @example
	   *
	   * _.defer(function() { alert('deferred'); });
	   * // returns from the function before `alert` is called
	   */
	  function defer(func) {
	    var args = slice(arguments, 1);
	    return setTimeout(function() { func.apply(undefined, args); }, 1);
	  }
	  // use `setImmediate` if it's available in Node.js
	  if (isV8 && freeModule && typeof setImmediate == 'function') {
	    defer = bind(setImmediate, window);
	  }

	  /**
	   * Creates a function that memoizes the result of `func`. If `resolver` is
	   * passed, it will be used to determine the cache key for storing the result
	   * based on the arguments passed to the memoized function. By default, the first
	   * argument passed to the memoized function is used as the cache key. The `func`
	   * is executed with the `this` binding of the memoized function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to have its output memoized.
	   * @param {Function} [resolver] A function used to resolve the cache key.
	   * @returns {Function} Returns the new memoizing function.
	   * @example
	   *
	   * var fibonacci = _.memoize(function(n) {
	   *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
	   * });
	   */
	  function memoize(func, resolver) {
	    var cache = {};
	    return function() {
	      var key = (resolver ? resolver.apply(this, arguments) : arguments[0]) + '';
	      return hasOwnProperty.call(cache, key)
	        ? cache[key]
	        : (cache[key] = func.apply(this, arguments));
	    };
	  }

	  /**
	   * Creates a function that is restricted to execute `func` once. Repeat calls to
	   * the function will return the value of the first call. The `func` is executed
	   * with the `this` binding of the created function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * var initialize = _.once(createApplication);
	   * initialize();
	   * initialize();
	   * // `initialize` executes `createApplication` once
	   */
	  function once(func) {
	    var ran,
	        result;

	    return function() {
	      if (ran) {
	        return result;
	      }
	      ran = true;
	      result = func.apply(this, arguments);

	      // clear the `func` variable so the function may be garbage collected
	      func = null;
	      return result;
	    };
	  }

	  /**
	   * Creates a function that, when called, invokes `func` with any additional
	   * `partial` arguments prepended to those passed to the new function. This
	   * method is similar to `_.bind`, except it does **not** alter the `this` binding.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to partially apply arguments to.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
	   * @returns {Function} Returns the new partially applied function.
	   * @example
	   *
	   * var greet = function(greeting, name) { return greeting + ' ' + name; };
	   * var hi = _.partial(greet, 'hi');
	   * hi('moe');
	   * // => 'hi moe'
	   */
	  function partial(func) {
	    return createBound(func, slice(arguments, 1));
	  }

	  /**
	   * This method is similar to `_.partial`, except that `partial` arguments are
	   * appended to those passed to the new function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to partially apply arguments to.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
	   * @returns {Function} Returns the new partially applied function.
	   * @example
	   *
	   * var defaultsDeep = _.partialRight(_.merge, _.defaults);
	   *
	   * var options = {
	   *   'variable': 'data',
	   *   'imports': { 'jq': $ }
	   * };
	   *
	   * defaultsDeep(options, _.templateSettings);
	   *
	   * options.variable
	   * // => 'data'
	   *
	   * options.imports
	   * // => { '_': _, 'jq': $ }
	   */
	  function partialRight(func) {
	    return createBound(func, slice(arguments, 1), null, indicatorObject);
	  }

	  /**
	   * Creates a function that, when executed, will only call the `func`
	   * function at most once per every `wait` milliseconds. If the throttled
	   * function is invoked more than once during the `wait` timeout, `func` will
	   * also be called on the trailing edge of the timeout. Subsequent calls to the
	   * throttled function will return the result of the last `func` call.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to throttle.
	   * @param {Number} wait The number of milliseconds to throttle executions to.
	   * @returns {Function} Returns the new throttled function.
	   * @example
	   *
	   * var throttled = _.throttle(updatePosition, 100);
	   * jQuery(window).on('scroll', throttled);
	   */
	  function throttle(func, wait) {
	    var args,
	        result,
	        thisArg,
	        timeoutId,
	        lastCalled = 0;

	    function trailingCall() {
	      lastCalled = new Date;
	      timeoutId = null;
	      result = func.apply(thisArg, args);
	    }
	    return function() {
	      var now = new Date,
	          remaining = wait - (now - lastCalled);

	      args = arguments;
	      thisArg = this;

	      if (remaining <= 0) {
	        clearTimeout(timeoutId);
	        timeoutId = null;
	        lastCalled = now;
	        result = func.apply(thisArg, args);
	      }
	      else if (!timeoutId) {
	        timeoutId = setTimeout(trailingCall, remaining);
	      }
	      return result;
	    };
	  }

	  /**
	   * Creates a function that passes `value` to the `wrapper` function as its
	   * first argument. Additional arguments passed to the function are appended
	   * to those passed to the `wrapper` function. The `wrapper` is executed with
	   * the `this` binding of the created function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Mixed} value The value to wrap.
	   * @param {Function} wrapper The wrapper function.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * var hello = function(name) { return 'hello ' + name; };
	   * hello = _.wrap(hello, function(func) {
	   *   return 'before, ' + func('moe') + ', after';
	   * });
	   * hello();
	   * // => 'before, hello moe, after'
	   */
	  function wrap(value, wrapper) {
	    return function() {
	      var args = [value];
	      push.apply(args, arguments);
	      return wrapper.apply(this, args);
	    };
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
	   * corresponding HTML entities.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {String} string The string to escape.
	   * @returns {String} Returns the escaped string.
	   * @example
	   *
	   * _.escape('Moe, Larry & Curly');
	   * // => 'Moe, Larry &amp; Curly'
	   */
	  function escape(string) {
	    return string == null ? '' : (string + '').replace(reUnescapedHtml, escapeHtmlChar);
	  }

	  /**
	   * This function returns the first argument passed to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Mixed} value Any value.
	   * @returns {Mixed} Returns `value`.
	   * @example
	   *
	   * var moe = { 'name': 'moe' };
	   * moe === _.identity(moe);
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }

	  /**
	   * Adds functions properties of `object` to the `lodash` function and chainable
	   * wrapper.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Object} object The object of function properties to add to `lodash`.
	   * @example
	   *
	   * _.mixin({
	   *   'capitalize': function(string) {
	   *     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	   *   }
	   * });
	   *
	   * _.capitalize('moe');
	   * // => 'Moe'
	   *
	   * _('moe').capitalize();
	   * // => 'Moe'
	   */
	  function mixin(object) {
	    forEach(functions(object), function(methodName) {
	      var func = lodash[methodName] = object[methodName];

	      lodash.prototype[methodName] = function() {
	        var args = [this.__wrapped__];
	        push.apply(args, arguments);
	        return new lodash(func.apply(lodash, args));
	      };
	    });
	  }

	  /**
	   * Reverts the '_' variable to its previous value and returns a reference to
	   * the `lodash` function.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @returns {Function} Returns the `lodash` function.
	   * @example
	   *
	   * var lodash = _.noConflict();
	   */
	  function noConflict() {
	    window._ = oldDash;
	    return this;
	  }

	  /**
	   * Produces a random number between `min` and `max` (inclusive). If only one
	   * argument is passed, a number between `0` and the given number will be returned.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Number} [min=0] The minimum possible value.
	   * @param {Number} [max=1] The maximum possible value.
	   * @returns {Number} Returns a random number.
	   * @example
	   *
	   * _.random(0, 5);
	   * // => a number between 0 and 5
	   *
	   * _.random(5);
	   * // => also a number between 0 and 5
	   */
	  function random(min, max) {
	    if (min == null && max == null) {
	      max = 1;
	    }
	    min = +min || 0;
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + floor(nativeRandom() * ((+max || 0) - min + 1));
	  }

	  /**
	   * Resolves the value of `property` on `object`. If `property` is a function,
	   * it will be invoked and its result returned, else the property value is
	   * returned. If `object` is falsey, then `null` is returned.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Object} object The object to inspect.
	   * @param {String} property The property to get the value of.
	   * @returns {Mixed} Returns the resolved value.
	   * @example
	   *
	   * var object = {
	   *   'cheese': 'crumpets',
	   *   'stuff': function() {
	   *     return 'nonsense';
	   *   }
	   * };
	   *
	   * _.result(object, 'cheese');
	   * // => 'crumpets'
	   *
	   * _.result(object, 'stuff');
	   * // => 'nonsense'
	   */
	  function result(object, property) {
	    var value = object ? object[property] : undefined;
	    return isFunction(value) ? object[property]() : value;
	  }

	  /**
	   * A micro-templating method that handles arbitrary delimiters, preserves
	   * whitespace, and correctly escapes quotes within interpolated code.
	   *
	   * Note: In the development build, `_.template` utilizes sourceURLs for easier
	   * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	   *
	   * Note: Lo-Dash may be used in Chrome extensions by either creating a `lodash csp`
	   * build and using precompiled templates, or loading Lo-Dash in a sandbox.
	   *
	   * For more information on precompiling templates see:
	   * http://lodash.com/#custom-builds
	   *
	   * For more information on Chrome extension sandboxes see:
	   * http://developer.chrome.com/stable/extensions/sandboxingEval.html
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {String} text The template text.
	   * @param {Obect} data The data object used to populate the text.
	   * @param {Object} options The options object.
	   *  escape - The "escape" delimiter regexp.
	   *  evaluate - The "evaluate" delimiter regexp.
	   *  interpolate - The "interpolate" delimiter regexp.
	   *  sourceURL - The sourceURL of the template's compiled source.
	   *  variable - The data object variable name.
	   *
	   * @returns {Function|String} Returns a compiled function when no `data` object
	   *  is given, else it returns the interpolated text.
	   * @example
	   *
	   * // using a compiled template
	   * var compiled = _.template('hello <%= name %>');
	   * compiled({ 'name': 'moe' });
	   * // => 'hello moe'
	   *
	   * var list = '<% _.forEach(people, function(name) { %><li><%= name %></li><% }); %>';
	   * _.template(list, { 'people': ['moe', 'larry'] });
	   * // => '<li>moe</li><li>larry</li>'
	   *
	   * // using the "escape" delimiter to escape HTML in data property values
	   * _.template('<b><%- value %></b>', { 'value': '<script>' });
	   * // => '<b>&lt;script&gt;</b>'
	   *
	   * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
	   * _.template('hello ${ name }', { 'name': 'curly' });
	   * // => 'hello curly'
	   *
	   * // using the internal `print` function in "evaluate" delimiters
	   * _.template('<% print("hello " + epithet); %>!', { 'epithet': 'stooge' });
	   * // => 'hello stooge!'
	   *
	   * // using custom template delimiters
	   * _.templateSettings = {
	   *   'interpolate': /{{([\s\S]+?)}}/g
	   * };
	   *
	   * _.template('hello {{ name }}!', { 'name': 'mustache' });
	   * // => 'hello mustache!'
	   *
	   * // using the `sourceURL` option to specify a custom sourceURL for the template
	   * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
	   * compiled(data);
	   * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	   *
	   * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	   * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
	   * compiled.source;
	   * // => function(data) {
	   *   var __t, __p = '', __e = _.escape;
	   *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
	   *   return __p;
	   * }
	   *
	   * // using the `source` property to inline compiled templates for meaningful
	   * // line numbers in error messages and a stack trace
	   * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	   *   var JST = {\
	   *     "main": ' + _.template(mainText).source + '\
	   *   };\
	   * ');
	   */
	  function template(text, data, options) {
	    // based on John Resig's `tmpl` implementation
	    // http://ejohn.org/blog/javascript-micro-templating/
	    // and Laura Doktorova's doT.js
	    // https://github.com/olado/doT
	    var settings = lodash.templateSettings;
	    text || (text = '');

	    // avoid missing dependencies when `iteratorTemplate` is not defined
	    options = defaults({}, options, settings);

	    var imports = defaults({}, options.imports, settings.imports),
	        importsKeys = keys(imports),
	        importsValues = values(imports);

	    var isEvaluating,
	        index = 0,
	        interpolate = options.interpolate || reNoMatch,
	        source = "__p += '";

	    // compile regexp to match each delimiter
	    var reDelimiters = RegExp(
	      (options.escape || reNoMatch).source + '|' +
	      interpolate.source + '|' +
	      (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	      (options.evaluate || reNoMatch).source + '|$'
	    , 'g');

	    text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	      interpolateValue || (interpolateValue = esTemplateValue);

	      // escape characters that cannot be included in string literals
	      source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	      // replace delimiters with snippets
	      if (escapeValue) {
	        source += "' +\n__e(" + escapeValue + ") +\n'";
	      }
	      if (evaluateValue) {
	        isEvaluating = true;
	        source += "';\n" + evaluateValue + ";\n__p += '";
	      }
	      if (interpolateValue) {
	        source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	      }
	      index = offset + match.length;

	      // the JS engine embedded in Adobe products requires returning the `match`
	      // string in order to produce the correct `offset` value
	      return match;
	    });

	    source += "';\n";

	    // if `variable` is not specified and the template contains "evaluate"
	    // delimiters, wrap a with-statement around the generated code to add the
	    // data object to the top of the scope chain
	    var variable = options.variable,
	        hasVariable = variable;

	    if (!hasVariable) {
	      variable = 'obj';
	      source = 'with (' + variable + ') {\n' + source + '\n}\n';
	    }
	    // cleanup code by stripping empty strings
	    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	      .replace(reEmptyStringMiddle, '$1')
	      .replace(reEmptyStringTrailing, '$1;');

	    // frame code as the function body
	    source = 'function(' + variable + ') {\n' +
	      (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
	      "var __t, __p = '', __e = _.escape" +
	      (isEvaluating
	        ? ', __j = Array.prototype.join;\n' +
	          "function print() { __p += __j.call(arguments, '') }\n"
	        : ';\n'
	      ) +
	      source +
	      'return __p\n}';

	    // Use a sourceURL for easier debugging and wrap in a multi-line comment to
	    // avoid issues with Narwhal, IE conditional compilation, and the JS engine
	    // embedded in Adobe products.
	    // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	    var sourceURL = '\n/*\n//@ sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

	    try {
	      var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
	    } catch(e) {
	      e.source = source;
	      throw e;
	    }
	    if (data) {
	      return result(data);
	    }
	    // provide the compiled function's source via its `toString` method, in
	    // supported environments, or the `source` property as a convenience for
	    // inlining compiled templates during the build process
	    result.source = source;
	    return result;
	  }

	  /**
	   * Executes the `callback` function `n` times, returning an array of the results
	   * of each `callback` execution. The `callback` is bound to `thisArg` and invoked
	   * with one argument; (index).
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Number} n The number of times to execute the callback.
	   * @param {Function} callback The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of the results of each `callback` execution.
	   * @example
	   *
	   * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
	   * // => [3, 6, 4]
	   *
	   * _.times(3, function(n) { mage.castSpell(n); });
	   * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
	   *
	   * _.times(3, function(n) { this.cast(n); }, mage);
	   * // => also calls `mage.castSpell(n)` three times
	   */
	  function times(n, callback, thisArg) {
	    n = +n || 0;
	    var index = -1,
	        result = Array(n);

	    while (++index < n) {
	      result[index] = callback.call(thisArg, index);
	    }
	    return result;
	  }

	  /**
	   * The opposite of `_.escape`, this method converts the HTML entities
	   * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
	   * corresponding characters.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {String} string The string to unescape.
	   * @returns {String} Returns the unescaped string.
	   * @example
	   *
	   * _.unescape('Moe, Larry &amp; Curly');
	   * // => 'Moe, Larry & Curly'
	   */
	  function unescape(string) {
	    return string == null ? '' : (string + '').replace(reEscapedHtml, unescapeHtmlChar);
	  }

	  /**
	   * Generates a unique ID. If `prefix` is passed, the ID will be appended to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {String} [prefix] The value to prefix the ID with.
	   * @returns {String} Returns the unique ID.
	   * @example
	   *
	   * _.uniqueId('contact_');
	   * // => 'contact_104'
	   *
	   * _.uniqueId();
	   * // => '105'
	   */
	  function uniqueId(prefix) {
	    var id = ++idCounter;
	    return (prefix == null ? '' : prefix + '') + id;
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Invokes `interceptor` with the `value` as the first argument, and then
	   * returns `value`. The purpose of this method is to "tap into" a method chain,
	   * in order to perform operations on intermediate results within the chain.
	   *
	   * @static
	   * @memberOf _
	   * @category Chaining
	   * @param {Mixed} value The value to pass to `interceptor`.
	   * @param {Function} interceptor The function to invoke.
	   * @returns {Mixed} Returns `value`.
	   * @example
	   *
	   * _([1, 2, 3, 4])
	   *  .filter(function(num) { return num % 2 == 0; })
	   *  .tap(alert)
	   *  .map(function(num) { return num * num; })
	   *  .value();
	   * // => // [2, 4] (alerted)
	   * // => [4, 16]
	   */
	  function tap(value, interceptor) {
	    interceptor(value);
	    return value;
	  }

	  /**
	   * Produces the `toString` result of the wrapped value.
	   *
	   * @name toString
	   * @memberOf _
	   * @category Chaining
	   * @returns {String} Returns the string result.
	   * @example
	   *
	   * _([1, 2, 3]).toString();
	   * // => '1,2,3'
	   */
	  function wrapperToString() {
	    return this.__wrapped__ + '';
	  }

	  /**
	   * Extracts the wrapped value.
	   *
	   * @name valueOf
	   * @memberOf _
	   * @alias value
	   * @category Chaining
	   * @returns {Mixed} Returns the wrapped value.
	   * @example
	   *
	   * _([1, 2, 3]).valueOf();
	   * // => [1, 2, 3]
	   */
	  function wrapperValueOf() {
	    return this.__wrapped__;
	  }

	  /*--------------------------------------------------------------------------*/

	  // add functions that return wrapped values when chaining
	  lodash.after = after;
	  lodash.assign = assign;
	  lodash.at = at;
	  lodash.bind = bind;
	  lodash.bindAll = bindAll;
	  lodash.bindKey = bindKey;
	  lodash.compact = compact;
	  lodash.compose = compose;
	  lodash.countBy = countBy;
	  lodash.debounce = debounce;
	  lodash.defaults = defaults;
	  lodash.defer = defer;
	  lodash.delay = delay;
	  lodash.difference = difference;
	  lodash.filter = filter;
	  lodash.flatten = flatten;
	  lodash.forEach = forEach;
	  lodash.forIn = forIn;
	  lodash.forOwn = forOwn;
	  lodash.functions = functions;
	  lodash.groupBy = groupBy;
	  lodash.initial = initial;
	  lodash.intersection = intersection;
	  lodash.invert = invert;
	  lodash.invoke = invoke;
	  lodash.keys = keys;
	  lodash.map = map;
	  lodash.max = max;
	  lodash.memoize = memoize;
	  lodash.merge = merge;
	  lodash.min = min;
	  lodash.object = object;
	  lodash.omit = omit;
	  lodash.once = once;
	  lodash.pairs = pairs;
	  lodash.partial = partial;
	  lodash.partialRight = partialRight;
	  lodash.pick = pick;
	  lodash.pluck = pluck;
	  lodash.range = range;
	  lodash.reject = reject;
	  lodash.rest = rest;
	  lodash.shuffle = shuffle;
	  lodash.sortBy = sortBy;
	  lodash.tap = tap;
	  lodash.throttle = throttle;
	  lodash.times = times;
	  lodash.toArray = toArray;
	  lodash.union = union;
	  lodash.uniq = uniq;
	  lodash.values = values;
	  lodash.where = where;
	  lodash.without = without;
	  lodash.wrap = wrap;
	  lodash.zip = zip;

	  // add aliases
	  lodash.collect = map;
	  lodash.drop = rest;
	  lodash.each = forEach;
	  lodash.extend = assign;
	  lodash.methods = functions;
	  lodash.select = filter;
	  lodash.tail = rest;
	  lodash.unique = uniq;

	  // add functions to `lodash.prototype`
	  mixin(lodash);

	  /*--------------------------------------------------------------------------*/

	  // add functions that return unwrapped values when chaining
	  lodash.clone = clone;
	  lodash.cloneDeep = cloneDeep;
	  lodash.contains = contains;
	  lodash.escape = escape;
	  lodash.every = every;
	  lodash.find = find;
	  lodash.has = has;
	  lodash.identity = identity;
	  lodash.indexOf = indexOf;
	  lodash.isArguments = isArguments;
	  lodash.isArray = isArray;
	  lodash.isBoolean = isBoolean;
	  lodash.isDate = isDate;
	  lodash.isElement = isElement;
	  lodash.isEmpty = isEmpty;
	  lodash.isEqual = isEqual;
	  lodash.isFinite = isFinite;
	  lodash.isFunction = isFunction;
	  lodash.isNaN = isNaN;
	  lodash.isNull = isNull;
	  lodash.isNumber = isNumber;
	  lodash.isObject = isObject;
	  lodash.isPlainObject = isPlainObject;
	  lodash.isRegExp = isRegExp;
	  lodash.isString = isString;
	  lodash.isUndefined = isUndefined;
	  lodash.lastIndexOf = lastIndexOf;
	  lodash.mixin = mixin;
	  lodash.noConflict = noConflict;
	  lodash.random = random;
	  lodash.reduce = reduce;
	  lodash.reduceRight = reduceRight;
	  lodash.result = result;
	  lodash.size = size;
	  lodash.some = some;
	  lodash.sortedIndex = sortedIndex;
	  lodash.template = template;
	  lodash.unescape = unescape;
	  lodash.uniqueId = uniqueId;

	  // add aliases
	  lodash.all = every;
	  lodash.any = some;
	  lodash.detect = find;
	  lodash.foldl = reduce;
	  lodash.foldr = reduceRight;
	  lodash.include = contains;
	  lodash.inject = reduce;

	  forOwn(lodash, function(func, methodName) {
	    if (!lodash.prototype[methodName]) {
	      lodash.prototype[methodName] = function() {
	        var args = [this.__wrapped__];
	        push.apply(args, arguments);
	        return func.apply(lodash, args);
	      };
	    }
	  });

	  /*--------------------------------------------------------------------------*/

	  // add functions capable of returning wrapped and unwrapped values when chaining
	  lodash.first = first;
	  lodash.last = last;

	  // add aliases
	  lodash.take = first;
	  lodash.head = first;

	  forOwn(lodash, function(func, methodName) {
	    if (!lodash.prototype[methodName]) {
	      lodash.prototype[methodName]= function(callback, thisArg) {
	        var result = func(this.__wrapped__, callback, thisArg);
	        return callback == null || (thisArg && typeof callback != 'function')
	          ? result
	          : new lodash(result);
	      };
	    }
	  });

	  /*--------------------------------------------------------------------------*/

	  /**
	   * The semantic version number.
	   *
	   * @static
	   * @memberOf _
	   * @type String
	   */
	  lodash.VERSION = '1.0.2';

	  // add "Chaining" functions to the wrapper
	  lodash.prototype.toString = wrapperToString;
	  lodash.prototype.value = wrapperValueOf;
	  lodash.prototype.valueOf = wrapperValueOf;

	  // add `Array` functions that return unwrapped values
	  each(['join', 'pop', 'shift'], function(methodName) {
	    var func = arrayRef[methodName];
	    lodash.prototype[methodName] = function() {
	      return func.apply(this.__wrapped__, arguments);
	    };
	  });

	  // add `Array` functions that return the wrapped value
	  each(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
	    var func = arrayRef[methodName];
	    lodash.prototype[methodName] = function() {
	      func.apply(this.__wrapped__, arguments);
	      return this;
	    };
	  });

	  // add `Array` functions that return new wrapped values
	  each(['concat', 'slice', 'splice'], function(methodName) {
	    var func = arrayRef[methodName];
	    lodash.prototype[methodName] = function() {
	      return new lodash(func.apply(this.__wrapped__, arguments));
	    };
	  });

	  // avoid array-like object bugs with `Array#shift` and `Array#splice`
	  // in Firefox < 10 and IE < 9
	  if (hasObjectSpliceBug) {
	    each(['pop', 'shift', 'splice'], function(methodName) {
	      var func = arrayRef[methodName],
	          isSplice = methodName == 'splice';

	      lodash.prototype[methodName] = function() {
	        var value = this.__wrapped__,
	            result = func.apply(value, arguments);

	        if (value.length === 0) {
	          delete value[0];
	        }
	        return isSplice ? new lodash(result) : result;
	      };
	    });
	  }

	  /*--------------------------------------------------------------------------*/

	  // expose Lo-Dash
	  // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
	  if (true) {
	    // Expose Lo-Dash to the global object even when an AMD loader is present in
	    // case Lo-Dash was injected by a third-party script and not intended to be
	    // loaded as a module. The global assignment can be reverted in the Lo-Dash
	    // module via its `noConflict()` method.
	    window._ = lodash;

	    // define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return lodash;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // check for `exports` after `define` in case a build optimizer adds an `exports` object
	  else if (freeExports) {
	    // in Node.js or RingoJS v0.8.0+
	    if (freeModule) {
	      (freeModule.exports = lodash)._ = lodash;
	    }
	    // in Narwhal or RingoJS v0.7.0-
	    else {
	      freeExports._ = lodash;
	    }
	  }
	  else {
	    // in a browser or Rhino
	    window._ = lodash;
	  }
	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), (function() { return this; }()), __webpack_require__(3).setImmediate))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(4).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).setImmediate, __webpack_require__(3).clearImmediate))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ]);
// This object will hold all exports.
var Haste = {};

/* Constructor functions for small ADTs. */
function T0(t){this._=t;}
function T1(t,a){this._=t;this.a=a;}
function T2(t,a,b){this._=t;this.a=a;this.b=b;}
function T3(t,a,b,c){this._=t;this.a=a;this.b=b;this.c=c;}
function T4(t,a,b,c,d){this._=t;this.a=a;this.b=b;this.c=c;this.d=d;}
function T5(t,a,b,c,d,e){this._=t;this.a=a;this.b=b;this.c=c;this.d=d;this.e=e;}
function T6(t,a,b,c,d,e,f){this._=t;this.a=a;this.b=b;this.c=c;this.d=d;this.e=e;this.f=f;}

/* Thunk
   Creates a thunk representing the given closure.
   If the non-updatable flag is undefined, the thunk is updatable.
*/
function T(f, nu) {
    this.f = f;
    if(nu === undefined) {
        this.x = __updatable;
    }
}

/* Hint to optimizer that an imported symbol is strict. */
function __strict(x) {return x}

// A tailcall.
function F(f) {
    this.f = f;
}

// A partially applied function. Invariant: members are never thunks.
function PAP(f, args) {
    this.f = f;
    this.args = args;
    this.arity = f.length - args.length;
}

// "Zero" object; used to avoid creating a whole bunch of new objects
// in the extremely common case of a nil-like data constructor.
var __Z = new T0(0);

// Special object used for blackholing.
var __blackhole = {};

// Used to indicate that an object is updatable.
var __updatable = {};

// Indicates that a closure-creating tail loop isn't done.
var __continue = {};

/* Generic apply.
   Applies a function *or* a partial application object to a list of arguments.
   See https://ghc.haskell.org/trac/ghc/wiki/Commentary/Rts/HaskellExecution/FunctionCalls
   for more information.
*/
function A(f, args) {
    while(true) {
        f = E(f);
        if(f instanceof Function) {
            if(args.length === f.length) {
                return f.apply(null, args);
            } else if(args.length < f.length) {
                return new PAP(f, args);
            } else {
                var f2 = f.apply(null, args.slice(0, f.length));
                args = args.slice(f.length);
                f = B(f2);
            }
        } else if(f instanceof PAP) {
            if(args.length === f.arity) {
                return f.f.apply(null, f.args.concat(args));
            } else if(args.length < f.arity) {
                return new PAP(f.f, f.args.concat(args));
            } else {
                var f2 = f.f.apply(null, f.args.concat(args.slice(0, f.arity)));
                args = args.slice(f.arity);
                f = B(f2);
            }
        } else {
            return f;
        }
    }
}

function A1(f, x) {
    f = E(f);
    if(f instanceof Function) {
        return f.length === 1 ? f(x) : new PAP(f, [x]);
    } else if(f instanceof PAP) {
        return f.arity === 1 ? f.f.apply(null, f.args.concat([x]))
                             : new PAP(f.f, f.args.concat([x]));
    } else {
        return f;
    }
}

function A2(f, x, y) {
    f = E(f);
    if(f instanceof Function) {
        switch(f.length) {
        case 2:  return f(x, y);
        case 1:  return A1(B(f(x)), y);
        default: return new PAP(f, [x,y]);
        }
    } else if(f instanceof PAP) {
        switch(f.arity) {
        case 2:  return f.f.apply(null, f.args.concat([x,y]));
        case 1:  return A1(B(f.f.apply(null, f.args.concat([x]))), y);
        default: return new PAP(f.f, f.args.concat([x,y]));
        }
    } else {
        return f;
    }
}

function A3(f, x, y, z) {
    f = E(f);
    if(f instanceof Function) {
        switch(f.length) {
        case 3:  return f(x, y, z);
        case 2:  return A1(B(f(x, y)), z);
        case 1:  return A2(B(f(x)), y, z);
        default: return new PAP(f, [x,y,z]);
        }
    } else if(f instanceof PAP) {
        switch(f.arity) {
        case 3:  return f.f.apply(null, f.args.concat([x,y,z]));
        case 2:  return A1(B(f.f.apply(null, f.args.concat([x,y]))), z);
        case 1:  return A2(B(f.f.apply(null, f.args.concat([x]))), y, z);
        default: return new PAP(f.f, f.args.concat([x,y,z]));
        }
    } else {
        return f;
    }
}

/* Eval
   Evaluate the given thunk t into head normal form.
   If the "thunk" we get isn't actually a thunk, just return it.
*/
function E(t) {
    if(t instanceof T) {
        if(t.f !== __blackhole) {
            if(t.x === __updatable) {
                var f = t.f;
                t.f = __blackhole;
                t.x = f();
            } else {
                return t.f();
            }
        }
        if(t.x === __updatable) {
            throw 'Infinite loop!';
        } else {
            return t.x;
        }
    } else {
        return t;
    }
}

/* Tail call chain counter. */
var C = 0, Cs = [];

/* Bounce
   Bounce on a trampoline for as long as we get a function back.
*/
function B(f) {
    Cs.push(C);
    while(f instanceof F) {
        var fun = f.f;
        f.f = __blackhole;
        C = 0;
        f = fun();
    }
    C = Cs.pop();
    return f;
}

// Export Haste, A, B and E. Haste because we need to preserve exports, A, B
// and E because they're handy for Haste.Foreign.
if(!window) {
    var window = {};
}
window['Haste'] = Haste;
window['A'] = A;
window['E'] = E;
window['B'] = B;


/* Throw an error.
   We need to be able to use throw as an exception so we wrap it in a function.
*/
function die(err) {
    throw E(err);
}

function quot(a, b) {
    return (a-a%b)/b;
}

function quotRemI(a, b) {
    return {_:0, a:(a-a%b)/b, b:a%b};
}

// 32 bit integer multiplication, with correct overflow behavior
// note that |0 or >>>0 needs to be applied to the result, for int and word
// respectively.
if(Math.imul) {
    var imul = Math.imul;
} else {
    var imul = function(a, b) {
        // ignore high a * high a as the result will always be truncated
        var lows = (a & 0xffff) * (b & 0xffff); // low a * low b
        var aB = (a & 0xffff) * (b & 0xffff0000); // low a * high b
        var bA = (a & 0xffff0000) * (b & 0xffff); // low b * high a
        return lows + aB + bA; // sum will not exceed 52 bits, so it's safe
    }
}

function addC(a, b) {
    var x = a+b;
    return {_:0, a:x & 0xffffffff, b:x > 0x7fffffff};
}

function subC(a, b) {
    var x = a-b;
    return {_:0, a:x & 0xffffffff, b:x < -2147483648};
}

function sinh (arg) {
    return (Math.exp(arg) - Math.exp(-arg)) / 2;
}

function tanh (arg) {
    return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
}

function cosh (arg) {
    return (Math.exp(arg) + Math.exp(-arg)) / 2;
}

function isFloatFinite(x) {
    return isFinite(x);
}

function isDoubleFinite(x) {
    return isFinite(x);
}

function err(str) {
    die(toJSStr(str));
}

/* unpackCString#
   NOTE: update constructor tags if the code generator starts munging them.
*/
function unCStr(str) {return unAppCStr(str, __Z);}

function unFoldrCStr(str, f, z) {
    var acc = z;
    for(var i = str.length-1; i >= 0; --i) {
        acc = B(A(f, [str.charCodeAt(i), acc]));
    }
    return acc;
}

function unAppCStr(str, chrs) {
    var i = arguments[2] ? arguments[2] : 0;
    if(i >= str.length) {
        return E(chrs);
    } else {
        return {_:1,a:str.charCodeAt(i),b:new T(function() {
            return unAppCStr(str,chrs,i+1);
        })};
    }
}

function charCodeAt(str, i) {return str.charCodeAt(i);}

function fromJSStr(str) {
    return unCStr(E(str));
}

function toJSStr(hsstr) {
    var s = '';
    for(var str = E(hsstr); str._ == 1; str = E(str.b)) {
        s += String.fromCharCode(E(str.a));
    }
    return s;
}

// newMutVar
function nMV(val) {
    return ({x: val});
}

// readMutVar
function rMV(mv) {
    return mv.x;
}

// writeMutVar
function wMV(mv, val) {
    mv.x = val;
}

// atomicModifyMutVar
function mMV(mv, f) {
    var x = B(A(f, [mv.x]));
    mv.x = x.a;
    return x.b;
}

function localeEncoding() {
    var le = newByteArr(5);
    le['v']['i8'][0] = 'U'.charCodeAt(0);
    le['v']['i8'][1] = 'T'.charCodeAt(0);
    le['v']['i8'][2] = 'F'.charCodeAt(0);
    le['v']['i8'][3] = '-'.charCodeAt(0);
    le['v']['i8'][4] = '8'.charCodeAt(0);
    return le;
}

var isDoubleNaN = isNaN;
var isFloatNaN = isNaN;

function isDoubleInfinite(d) {
    return (d === Infinity);
}
var isFloatInfinite = isDoubleInfinite;

function isDoubleNegativeZero(x) {
    return (x===0 && (1/x)===-Infinity);
}
var isFloatNegativeZero = isDoubleNegativeZero;

function strEq(a, b) {
    return a == b;
}

function strOrd(a, b) {
    if(a < b) {
        return 0;
    } else if(a == b) {
        return 1;
    }
    return 2;
}

function jsCatch(act, handler) {
    try {
        return B(A(act,[0]));
    } catch(e) {
        return B(A(handler,[e, 0]));
    }
}

/* Haste represents constructors internally using 1 for the first constructor,
   2 for the second, etc.
   However, dataToTag should use 0, 1, 2, etc. Also, booleans might be unboxed.
 */
function dataToTag(x) {
    if(x instanceof Object) {
        return x._;
    } else {
        return x;
    }
}

function __word_encodeDouble(d, e) {
    return d * Math.pow(2,e);
}

var __word_encodeFloat = __word_encodeDouble;
var jsRound = Math.round, rintDouble = jsRound, rintFloat = jsRound;
var jsTrunc = Math.trunc ? Math.trunc : function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
};
function jsRoundW(n) {
    return Math.abs(jsTrunc(n));
}
var realWorld = undefined;
if(typeof _ == 'undefined') {
    var _ = undefined;
}

function popCnt64(i) {
    return popCnt(i.low) + popCnt(i.high);
}

function popCnt(i) {
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
    return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
}

function __clz(bits, x) {
    x &= (Math.pow(2, bits)-1);
    if(x === 0) {
        return bits;
    } else {
        return bits - (1 + Math.floor(Math.log(x)/Math.LN2));
    }
}

// TODO: can probably be done much faster with arithmetic tricks like __clz
function __ctz(bits, x) {
    var y = 1;
    x &= (Math.pow(2, bits)-1);
    if(x === 0) {
        return bits;
    }
    for(var i = 0; i < bits; ++i) {
        if(y & x) {
            return i;
        } else {
            y <<= 1;
        }
    }
    return 0;
}

// Scratch space for byte arrays.
var rts_scratchBuf = new ArrayBuffer(8);
var rts_scratchW32 = new Uint32Array(rts_scratchBuf);
var rts_scratchFloat = new Float32Array(rts_scratchBuf);
var rts_scratchDouble = new Float64Array(rts_scratchBuf);

function decodeFloat(x) {
    if(x === 0) {
        return __decodedZeroF;
    }
    rts_scratchFloat[0] = x;
    var sign = x < 0 ? -1 : 1;
    var exp = ((rts_scratchW32[0] >> 23) & 0xff) - 150;
    var man = rts_scratchW32[0] & 0x7fffff;
    if(exp === 0) {
        ++exp;
    } else {
        man |= (1 << 23);
    }
    return {_:0, a:sign*man, b:exp};
}

var __decodedZero = {_:0,a:1,b:0,c:0,d:0};
var __decodedZeroF = {_:0,a:1,b:0};

function decodeDouble(x) {
    if(x === 0) {
        // GHC 7.10+ *really* doesn't like 0 to be represented as anything
        // but zeroes all the way.
        return __decodedZero;
    }
    rts_scratchDouble[0] = x;
    var sign = x < 0 ? -1 : 1;
    var manHigh = rts_scratchW32[1] & 0xfffff;
    var manLow = rts_scratchW32[0];
    var exp = ((rts_scratchW32[1] >> 20) & 0x7ff) - 1075;
    if(exp === 0) {
        ++exp;
    } else {
        manHigh |= (1 << 20);
    }
    return {_:0, a:sign, b:manHigh, c:manLow, d:exp};
}

function isNull(obj) {
    return obj === null;
}

function jsRead(str) {
    return Number(str);
}

function jsShowI(val) {return val.toString();}
function jsShow(val) {
    var ret = val.toString();
    return val == Math.round(val) ? ret + '.0' : ret;
}

window['jsGetMouseCoords'] = function jsGetMouseCoords(e) {
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) 	{
	posx = e.pageX;
	posy = e.pageY;
    }
    else if (e.clientX || e.clientY) 	{
	posx = e.clientX + document.body.scrollLeft
	    + document.documentElement.scrollLeft;
	posy = e.clientY + document.body.scrollTop
	    + document.documentElement.scrollTop;
    }
    return [posx - (e.currentTarget.offsetLeft || 0),
	    posy - (e.currentTarget.offsetTop || 0)];
}

var jsRand = Math.random;

// Concatenate a Haskell list of JS strings
function jsCat(strs, sep) {
    var arr = [];
    strs = E(strs);
    while(strs._) {
        strs = E(strs);
        arr.push(E(strs.a));
        strs = E(strs.b);
    }
    return arr.join(sep);
}

// Parse a JSON message into a Haste.JSON.JSON value.
// As this pokes around inside Haskell values, it'll need to be updated if:
// * Haste.JSON.JSON changes;
// * E() starts to choke on non-thunks;
// * data constructor code generation changes; or
// * Just and Nothing change tags.
function jsParseJSON(str) {
    try {
        var js = JSON.parse(str);
        var hs = toHS(js);
    } catch(_) {
        return __Z;
    }
    return {_:1,a:hs};
}

function toHS(obj) {
    switch(typeof obj) {
    case 'number':
        return {_:0, a:jsRead(obj)};
    case 'string':
        return {_:1, a:obj};
    case 'boolean':
        return {_:2, a:obj}; // Booleans are special wrt constructor tags!
    case 'object':
        if(obj instanceof Array) {
            return {_:3, a:arr2lst_json(obj, 0)};
        } else if (obj == null) {
            return {_:5};
        } else {
            // Object type but not array - it's a dictionary.
            // The RFC doesn't say anything about the ordering of keys, but
            // considering that lots of people rely on keys being "in order" as
            // defined by "the same way someone put them in at the other end,"
            // it's probably a good idea to put some cycles into meeting their
            // misguided expectations.
            var ks = [];
            for(var k in obj) {
                ks.unshift(k);
            }
            var xs = [0];
            for(var i = 0; i < ks.length; i++) {
                xs = {_:1, a:{_:0, a:ks[i], b:toHS(obj[ks[i]])}, b:xs};
            }
            return {_:4, a:xs};
        }
    }
}

function arr2lst_json(arr, elem) {
    if(elem >= arr.length) {
        return __Z;
    }
    return {_:1, a:toHS(arr[elem]), b:new T(function() {return arr2lst_json(arr,elem+1);}),c:true}
}

/* gettimeofday(2) */
function gettimeofday(tv, _tz) {
    var t = new Date().getTime();
    writeOffAddr("i32", 4, tv, 0, (t/1000)|0);
    writeOffAddr("i32", 4, tv, 1, ((t%1000)*1000)|0);
    return 0;
}

// Create a little endian ArrayBuffer representation of something.
function toABHost(v, n, x) {
    var a = new ArrayBuffer(n);
    new window[v](a)[0] = x;
    return a;
}

function toABSwap(v, n, x) {
    var a = new ArrayBuffer(n);
    new window[v](a)[0] = x;
    var bs = new Uint8Array(a);
    for(var i = 0, j = n-1; i < j; ++i, --j) {
        var tmp = bs[i];
        bs[i] = bs[j];
        bs[j] = tmp;
    }
    return a;
}

window['toABle'] = toABHost;
window['toABbe'] = toABSwap;

// Swap byte order if host is not little endian.
var buffer = new ArrayBuffer(2);
new DataView(buffer).setInt16(0, 256, true);
if(new Int16Array(buffer)[0] !== 256) {
    window['toABle'] = toABSwap;
    window['toABbe'] = toABHost;
}

/* bn.js by Fedor Indutny, see doc/LICENSE.bn for license */
var __bn = {};
(function (module, exports) {
'use strict';

function BN(number, base, endian) {
  // May be `new BN(bn)` ?
  if (number !== null &&
      typeof number === 'object' &&
      Array.isArray(number.words)) {
    return number;
  }

  this.negative = 0;
  this.words = null;
  this.length = 0;

  if (base === 'le' || base === 'be') {
    endian = base;
    base = 10;
  }

  if (number !== null)
    this._init(number || 0, base || 10, endian || 'be');
}
if (typeof module === 'object')
  module.exports = BN;
else
  exports.BN = BN;

BN.BN = BN;
BN.wordSize = 26;

BN.max = function max(left, right) {
  if (left.cmp(right) > 0)
    return left;
  else
    return right;
};

BN.min = function min(left, right) {
  if (left.cmp(right) < 0)
    return left;
  else
    return right;
};

BN.prototype._init = function init(number, base, endian) {
  if (typeof number === 'number') {
    return this._initNumber(number, base, endian);
  } else if (typeof number === 'object') {
    return this._initArray(number, base, endian);
  }
  if (base === 'hex')
    base = 16;

  number = number.toString().replace(/\s+/g, '');
  var start = 0;
  if (number[0] === '-')
    start++;

  if (base === 16)
    this._parseHex(number, start);
  else
    this._parseBase(number, base, start);

  if (number[0] === '-')
    this.negative = 1;

  this.strip();

  if (endian !== 'le')
    return;

  this._initArray(this.toArray(), base, endian);
};

BN.prototype._initNumber = function _initNumber(number, base, endian) {
  if (number < 0) {
    this.negative = 1;
    number = -number;
  }
  if (number < 0x4000000) {
    this.words = [ number & 0x3ffffff ];
    this.length = 1;
  } else if (number < 0x10000000000000) {
    this.words = [
      number & 0x3ffffff,
      (number / 0x4000000) & 0x3ffffff
    ];
    this.length = 2;
  } else {
    this.words = [
      number & 0x3ffffff,
      (number / 0x4000000) & 0x3ffffff,
      1
    ];
    this.length = 3;
  }

  if (endian !== 'le')
    return;

  // Reverse the bytes
  this._initArray(this.toArray(), base, endian);
};

BN.prototype._initArray = function _initArray(number, base, endian) {
  if (number.length <= 0) {
    this.words = [ 0 ];
    this.length = 1;
    return this;
  }

  this.length = Math.ceil(number.length / 3);
  this.words = new Array(this.length);
  for (var i = 0; i < this.length; i++)
    this.words[i] = 0;

  var off = 0;
  if (endian === 'be') {
    for (var i = number.length - 1, j = 0; i >= 0; i -= 3) {
      var w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
  } else if (endian === 'le') {
    for (var i = 0, j = 0; i < number.length; i += 3) {
      var w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
  }
  return this.strip();
};

function parseHex(str, start, end) {
  var r = 0;
  var len = Math.min(str.length, end);
  for (var i = start; i < len; i++) {
    var c = str.charCodeAt(i) - 48;

    r <<= 4;

    // 'a' - 'f'
    if (c >= 49 && c <= 54)
      r |= c - 49 + 0xa;

    // 'A' - 'F'
    else if (c >= 17 && c <= 22)
      r |= c - 17 + 0xa;

    // '0' - '9'
    else
      r |= c & 0xf;
  }
  return r;
}

BN.prototype._parseHex = function _parseHex(number, start) {
  // Create possibly bigger array to ensure that it fits the number
  this.length = Math.ceil((number.length - start) / 6);
  this.words = new Array(this.length);
  for (var i = 0; i < this.length; i++)
    this.words[i] = 0;

  // Scan 24-bit chunks and add them to the number
  var off = 0;
  for (var i = number.length - 6, j = 0; i >= start; i -= 6) {
    var w = parseHex(number, i, i + 6);
    this.words[j] |= (w << off) & 0x3ffffff;
    this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    off += 24;
    if (off >= 26) {
      off -= 26;
      j++;
    }
  }
  if (i + 6 !== start) {
    var w = parseHex(number, start, i + 6);
    this.words[j] |= (w << off) & 0x3ffffff;
    this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
  }
  this.strip();
};

function parseBase(str, start, end, mul) {
  var r = 0;
  var len = Math.min(str.length, end);
  for (var i = start; i < len; i++) {
    var c = str.charCodeAt(i) - 48;

    r *= mul;

    // 'a'
    if (c >= 49)
      r += c - 49 + 0xa;

    // 'A'
    else if (c >= 17)
      r += c - 17 + 0xa;

    // '0' - '9'
    else
      r += c;
  }
  return r;
}

BN.prototype._parseBase = function _parseBase(number, base, start) {
  // Initialize as zero
  this.words = [ 0 ];
  this.length = 1;

  // Find length of limb in base
  for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base)
    limbLen++;
  limbLen--;
  limbPow = (limbPow / base) | 0;

  var total = number.length - start;
  var mod = total % limbLen;
  var end = Math.min(total, total - mod) + start;

  var word = 0;
  for (var i = start; i < end; i += limbLen) {
    word = parseBase(number, i, i + limbLen, base);

    this.imuln(limbPow);
    if (this.words[0] + word < 0x4000000)
      this.words[0] += word;
    else
      this._iaddn(word);
  }

  if (mod !== 0) {
    var pow = 1;
    var word = parseBase(number, i, number.length, base);

    for (var i = 0; i < mod; i++)
      pow *= base;
    this.imuln(pow);
    if (this.words[0] + word < 0x4000000)
      this.words[0] += word;
    else
      this._iaddn(word);
  }
};

BN.prototype.copy = function copy(dest) {
  dest.words = new Array(this.length);
  for (var i = 0; i < this.length; i++)
    dest.words[i] = this.words[i];
  dest.length = this.length;
  dest.negative = this.negative;
};

BN.prototype.clone = function clone() {
  var r = new BN(null);
  this.copy(r);
  return r;
};

// Remove leading `0` from `this`
BN.prototype.strip = function strip() {
  while (this.length > 1 && this.words[this.length - 1] === 0)
    this.length--;
  return this._normSign();
};

BN.prototype._normSign = function _normSign() {
  // -0 = 0
  if (this.length === 1 && this.words[0] === 0)
    this.negative = 0;
  return this;
};

var zeros = [
  '',
  '0',
  '00',
  '000',
  '0000',
  '00000',
  '000000',
  '0000000',
  '00000000',
  '000000000',
  '0000000000',
  '00000000000',
  '000000000000',
  '0000000000000',
  '00000000000000',
  '000000000000000',
  '0000000000000000',
  '00000000000000000',
  '000000000000000000',
  '0000000000000000000',
  '00000000000000000000',
  '000000000000000000000',
  '0000000000000000000000',
  '00000000000000000000000',
  '000000000000000000000000',
  '0000000000000000000000000'
];

var groupSizes = [
  0, 0,
  25, 16, 12, 11, 10, 9, 8,
  8, 7, 7, 7, 7, 6, 6,
  6, 6, 6, 6, 6, 5, 5,
  5, 5, 5, 5, 5, 5, 5,
  5, 5, 5, 5, 5, 5, 5
];

var groupBases = [
  0, 0,
  33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
  43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
  16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
  6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
  24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
];

BN.prototype.toString = function toString(base, padding) {
  base = base || 10;
  var padding = padding | 0 || 1;
  if (base === 16 || base === 'hex') {
    var out = '';
    var off = 0;
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = this.words[i];
      var word = (((w << off) | carry) & 0xffffff).toString(16);
      carry = (w >>> (24 - off)) & 0xffffff;
      if (carry !== 0 || i !== this.length - 1)
        out = zeros[6 - word.length] + word + out;
      else
        out = word + out;
      off += 2;
      if (off >= 26) {
        off -= 26;
        i--;
      }
    }
    if (carry !== 0)
      out = carry.toString(16) + out;
    while (out.length % padding !== 0)
      out = '0' + out;
    if (this.negative !== 0)
      out = '-' + out;
    return out;
  } else if (base === (base | 0) && base >= 2 && base <= 36) {
    var groupSize = groupSizes[base];
    var groupBase = groupBases[base];
    var out = '';
    var c = this.clone();
    c.negative = 0;
    while (c.cmpn(0) !== 0) {
      var r = c.modn(groupBase).toString(base);
      c = c.idivn(groupBase);

      if (c.cmpn(0) !== 0)
        out = zeros[groupSize - r.length] + r + out;
      else
        out = r + out;
    }
    if (this.cmpn(0) === 0)
      out = '0' + out;
    while (out.length % padding !== 0)
      out = '0' + out;
    if (this.negative !== 0)
      out = '-' + out;
    return out;
  } else {
    throw 'Base should be between 2 and 36';
  }
};

BN.prototype.toJSON = function toJSON() {
  return this.toString(16);
};

BN.prototype.toArray = function toArray(endian, length) {
  this.strip();
  var littleEndian = endian === 'le';
  var res = new Array(this.byteLength());
  res[0] = 0;

  var q = this.clone();
  if (!littleEndian) {
    // Assume big-endian
    for (var i = 0; q.cmpn(0) !== 0; i++) {
      var b = q.andln(0xff);
      q.iushrn(8);

      res[res.length - i - 1] = b;
    }
  } else {
    for (var i = 0; q.cmpn(0) !== 0; i++) {
      var b = q.andln(0xff);
      q.iushrn(8);

      res[i] = b;
    }
  }

  if (length) {
    while (res.length < length) {
      if (littleEndian)
        res.push(0);
      else
        res.unshift(0);
    }
  }

  return res;
};

if (Math.clz32) {
  BN.prototype._countBits = function _countBits(w) {
    return 32 - Math.clz32(w);
  };
} else {
  BN.prototype._countBits = function _countBits(w) {
    var t = w;
    var r = 0;
    if (t >= 0x1000) {
      r += 13;
      t >>>= 13;
    }
    if (t >= 0x40) {
      r += 7;
      t >>>= 7;
    }
    if (t >= 0x8) {
      r += 4;
      t >>>= 4;
    }
    if (t >= 0x02) {
      r += 2;
      t >>>= 2;
    }
    return r + t;
  };
}

// Return number of used bits in a BN
BN.prototype.bitLength = function bitLength() {
  var hi = 0;
  var w = this.words[this.length - 1];
  var hi = this._countBits(w);
  return (this.length - 1) * 26 + hi;
};

BN.prototype.byteLength = function byteLength() {
  return Math.ceil(this.bitLength() / 8);
};

// Return negative clone of `this`
BN.prototype.neg = function neg() {
  if (this.cmpn(0) === 0)
    return this.clone();

  var r = this.clone();
  r.negative = this.negative ^ 1;
  return r;
};

BN.prototype.ineg = function ineg() {
  this.negative ^= 1;
  return this;
};

// Or `num` with `this` in-place
BN.prototype.iuor = function iuor(num) {
  while (this.length < num.length)
    this.words[this.length++] = 0;

  for (var i = 0; i < num.length; i++)
    this.words[i] = this.words[i] | num.words[i];

  return this.strip();
};

BN.prototype.ior = function ior(num) {
  //assert((this.negative | num.negative) === 0);
  return this.iuor(num);
};


// Or `num` with `this`
BN.prototype.or = function or(num) {
  if (this.length > num.length)
    return this.clone().ior(num);
  else
    return num.clone().ior(this);
};

BN.prototype.uor = function uor(num) {
  if (this.length > num.length)
    return this.clone().iuor(num);
  else
    return num.clone().iuor(this);
};


// And `num` with `this` in-place
BN.prototype.iuand = function iuand(num) {
  // b = min-length(num, this)
  var b;
  if (this.length > num.length)
    b = num;
  else
    b = this;

  for (var i = 0; i < b.length; i++)
    this.words[i] = this.words[i] & num.words[i];

  this.length = b.length;

  return this.strip();
};

BN.prototype.iand = function iand(num) {
  //assert((this.negative | num.negative) === 0);
  return this.iuand(num);
};


// And `num` with `this`
BN.prototype.and = function and(num) {
  if (this.length > num.length)
    return this.clone().iand(num);
  else
    return num.clone().iand(this);
};

BN.prototype.uand = function uand(num) {
  if (this.length > num.length)
    return this.clone().iuand(num);
  else
    return num.clone().iuand(this);
};


// Xor `num` with `this` in-place
BN.prototype.iuxor = function iuxor(num) {
  // a.length > b.length
  var a;
  var b;
  if (this.length > num.length) {
    a = this;
    b = num;
  } else {
    a = num;
    b = this;
  }

  for (var i = 0; i < b.length; i++)
    this.words[i] = a.words[i] ^ b.words[i];

  if (this !== a)
    for (; i < a.length; i++)
      this.words[i] = a.words[i];

  this.length = a.length;

  return this.strip();
};

BN.prototype.ixor = function ixor(num) {
  //assert((this.negative | num.negative) === 0);
  return this.iuxor(num);
};


// Xor `num` with `this`
BN.prototype.xor = function xor(num) {
  if (this.length > num.length)
    return this.clone().ixor(num);
  else
    return num.clone().ixor(this);
};

BN.prototype.uxor = function uxor(num) {
  if (this.length > num.length)
    return this.clone().iuxor(num);
  else
    return num.clone().iuxor(this);
};


// Add `num` to `this` in-place
BN.prototype.iadd = function iadd(num) {
  // negative + positive
  if (this.negative !== 0 && num.negative === 0) {
    this.negative = 0;
    var r = this.isub(num);
    this.negative ^= 1;
    return this._normSign();

  // positive + negative
  } else if (this.negative === 0 && num.negative !== 0) {
    num.negative = 0;
    var r = this.isub(num);
    num.negative = 1;
    return r._normSign();
  }

  // a.length > b.length
  var a;
  var b;
  if (this.length > num.length) {
    a = this;
    b = num;
  } else {
    a = num;
    b = this;
  }

  var carry = 0;
  for (var i = 0; i < b.length; i++) {
    var r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
    this.words[i] = r & 0x3ffffff;
    carry = r >>> 26;
  }
  for (; carry !== 0 && i < a.length; i++) {
    var r = (a.words[i] | 0) + carry;
    this.words[i] = r & 0x3ffffff;
    carry = r >>> 26;
  }

  this.length = a.length;
  if (carry !== 0) {
    this.words[this.length] = carry;
    this.length++;
  // Copy the rest of the words
  } else if (a !== this) {
    for (; i < a.length; i++)
      this.words[i] = a.words[i];
  }

  return this;
};

// Add `num` to `this`
BN.prototype.add = function add(num) {
  if (num.negative !== 0 && this.negative === 0) {
    num.negative = 0;
    var res = this.sub(num);
    num.negative ^= 1;
    return res;
  } else if (num.negative === 0 && this.negative !== 0) {
    this.negative = 0;
    var res = num.sub(this);
    this.negative = 1;
    return res;
  }

  if (this.length > num.length)
    return this.clone().iadd(num);
  else
    return num.clone().iadd(this);
};

// Subtract `num` from `this` in-place
BN.prototype.isub = function isub(num) {
  // this - (-num) = this + num
  if (num.negative !== 0) {
    num.negative = 0;
    var r = this.iadd(num);
    num.negative = 1;
    return r._normSign();

  // -this - num = -(this + num)
  } else if (this.negative !== 0) {
    this.negative = 0;
    this.iadd(num);
    this.negative = 1;
    return this._normSign();
  }

  // At this point both numbers are positive
  var cmp = this.cmp(num);

  // Optimization - zeroify
  if (cmp === 0) {
    this.negative = 0;
    this.length = 1;
    this.words[0] = 0;
    return this;
  }

  // a > b
  var a;
  var b;
  if (cmp > 0) {
    a = this;
    b = num;
  } else {
    a = num;
    b = this;
  }

  var carry = 0;
  for (var i = 0; i < b.length; i++) {
    var r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
    carry = r >> 26;
    this.words[i] = r & 0x3ffffff;
  }
  for (; carry !== 0 && i < a.length; i++) {
    var r = (a.words[i] | 0) + carry;
    carry = r >> 26;
    this.words[i] = r & 0x3ffffff;
  }

  // Copy rest of the words
  if (carry === 0 && i < a.length && a !== this)
    for (; i < a.length; i++)
      this.words[i] = a.words[i];
  this.length = Math.max(this.length, i);

  if (a !== this)
    this.negative = 1;

  return this.strip();
};

// Subtract `num` from `this`
BN.prototype.sub = function sub(num) {
  return this.clone().isub(num);
};

function smallMulTo(self, num, out) {
  out.negative = num.negative ^ self.negative;
  var len = (self.length + num.length) | 0;
  out.length = len;
  len = (len - 1) | 0;

  // Peel one iteration (compiler can't do it, because of code complexity)
  var a = self.words[0] | 0;
  var b = num.words[0] | 0;
  var r = a * b;

  var lo = r & 0x3ffffff;
  var carry = (r / 0x4000000) | 0;
  out.words[0] = lo;

  for (var k = 1; k < len; k++) {
    // Sum all words with the same `i + j = k` and accumulate `ncarry`,
    // note that ncarry could be >= 0x3ffffff
    var ncarry = carry >>> 26;
    var rword = carry & 0x3ffffff;
    var maxJ = Math.min(k, num.length - 1);
    for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
      var i = (k - j) | 0;
      var a = self.words[i] | 0;
      var b = num.words[j] | 0;
      var r = a * b;

      var lo = r & 0x3ffffff;
      ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
      lo = (lo + rword) | 0;
      rword = lo & 0x3ffffff;
      ncarry = (ncarry + (lo >>> 26)) | 0;
    }
    out.words[k] = rword | 0;
    carry = ncarry | 0;
  }
  if (carry !== 0) {
    out.words[k] = carry | 0;
  } else {
    out.length--;
  }

  return out.strip();
}

function bigMulTo(self, num, out) {
  out.negative = num.negative ^ self.negative;
  out.length = self.length + num.length;

  var carry = 0;
  var hncarry = 0;
  for (var k = 0; k < out.length - 1; k++) {
    // Sum all words with the same `i + j = k` and accumulate `ncarry`,
    // note that ncarry could be >= 0x3ffffff
    var ncarry = hncarry;
    hncarry = 0;
    var rword = carry & 0x3ffffff;
    var maxJ = Math.min(k, num.length - 1);
    for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
      var i = k - j;
      var a = self.words[i] | 0;
      var b = num.words[j] | 0;
      var r = a * b;

      var lo = r & 0x3ffffff;
      ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
      lo = (lo + rword) | 0;
      rword = lo & 0x3ffffff;
      ncarry = (ncarry + (lo >>> 26)) | 0;

      hncarry += ncarry >>> 26;
      ncarry &= 0x3ffffff;
    }
    out.words[k] = rword;
    carry = ncarry;
    ncarry = hncarry;
  }
  if (carry !== 0) {
    out.words[k] = carry;
  } else {
    out.length--;
  }

  return out.strip();
}

BN.prototype.mulTo = function mulTo(num, out) {
  var res;
  if (this.length + num.length < 63)
    res = smallMulTo(this, num, out);
  else
    res = bigMulTo(this, num, out);
  return res;
};

// Multiply `this` by `num`
BN.prototype.mul = function mul(num) {
  var out = new BN(null);
  out.words = new Array(this.length + num.length);
  return this.mulTo(num, out);
};

// In-place Multiplication
BN.prototype.imul = function imul(num) {
  if (this.cmpn(0) === 0 || num.cmpn(0) === 0) {
    this.words[0] = 0;
    this.length = 1;
    return this;
  }

  var tlen = this.length;
  var nlen = num.length;

  this.negative = num.negative ^ this.negative;
  this.length = this.length + num.length;
  this.words[this.length - 1] = 0;

  for (var k = this.length - 2; k >= 0; k--) {
    // Sum all words with the same `i + j = k` and accumulate `carry`,
    // note that carry could be >= 0x3ffffff
    var carry = 0;
    var rword = 0;
    var maxJ = Math.min(k, nlen - 1);
    for (var j = Math.max(0, k - tlen + 1); j <= maxJ; j++) {
      var i = k - j;
      var a = this.words[i] | 0;
      var b = num.words[j] | 0;
      var r = a * b;

      var lo = r & 0x3ffffff;
      carry += (r / 0x4000000) | 0;
      lo += rword;
      rword = lo & 0x3ffffff;
      carry += lo >>> 26;
    }
    this.words[k] = rword;
    this.words[k + 1] += carry;
    carry = 0;
  }

  // Propagate overflows
  var carry = 0;
  for (var i = 1; i < this.length; i++) {
    var w = (this.words[i] | 0) + carry;
    this.words[i] = w & 0x3ffffff;
    carry = w >>> 26;
  }

  return this.strip();
};

BN.prototype.imuln = function imuln(num) {
  // Carry
  var carry = 0;
  for (var i = 0; i < this.length; i++) {
    var w = (this.words[i] | 0) * num;
    var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
    carry >>= 26;
    carry += (w / 0x4000000) | 0;
    // NOTE: lo is 27bit maximum
    carry += lo >>> 26;
    this.words[i] = lo & 0x3ffffff;
  }

  if (carry !== 0) {
    this.words[i] = carry;
    this.length++;
  }

  return this;
};

BN.prototype.muln = function muln(num) {
  return this.clone().imuln(num);
};

// `this` * `this`
BN.prototype.sqr = function sqr() {
  return this.mul(this);
};

// `this` * `this` in-place
BN.prototype.isqr = function isqr() {
  return this.mul(this);
};

// Shift-left in-place
BN.prototype.iushln = function iushln(bits) {
  var r = bits % 26;
  var s = (bits - r) / 26;
  var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);

  if (r !== 0) {
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var newCarry = this.words[i] & carryMask;
      var c = ((this.words[i] | 0) - newCarry) << r;
      this.words[i] = c | carry;
      carry = newCarry >>> (26 - r);
    }
    if (carry) {
      this.words[i] = carry;
      this.length++;
    }
  }

  if (s !== 0) {
    for (var i = this.length - 1; i >= 0; i--)
      this.words[i + s] = this.words[i];
    for (var i = 0; i < s; i++)
      this.words[i] = 0;
    this.length += s;
  }

  return this.strip();
};

BN.prototype.ishln = function ishln(bits) {
  return this.iushln(bits);
};

// Shift-right in-place
BN.prototype.iushrn = function iushrn(bits, hint, extended) {
  var h;
  if (hint)
    h = (hint - (hint % 26)) / 26;
  else
    h = 0;

  var r = bits % 26;
  var s = Math.min((bits - r) / 26, this.length);
  var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
  var maskedWords = extended;

  h -= s;
  h = Math.max(0, h);

  // Extended mode, copy masked part
  if (maskedWords) {
    for (var i = 0; i < s; i++)
      maskedWords.words[i] = this.words[i];
    maskedWords.length = s;
  }

  if (s === 0) {
    // No-op, we should not move anything at all
  } else if (this.length > s) {
    this.length -= s;
    for (var i = 0; i < this.length; i++)
      this.words[i] = this.words[i + s];
  } else {
    this.words[0] = 0;
    this.length = 1;
  }

  var carry = 0;
  for (var i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
    var word = this.words[i] | 0;
    this.words[i] = (carry << (26 - r)) | (word >>> r);
    carry = word & mask;
  }

  // Push carried bits as a mask
  if (maskedWords && carry !== 0)
    maskedWords.words[maskedWords.length++] = carry;

  if (this.length === 0) {
    this.words[0] = 0;
    this.length = 1;
  }

  this.strip();

  return this;
};

BN.prototype.ishrn = function ishrn(bits, hint, extended) {
  return this.iushrn(bits, hint, extended);
};

// Shift-left
BN.prototype.shln = function shln(bits) {
  var x = this.clone();
  var neg = x.negative;
  x.negative = false;
  x.ishln(bits);
  x.negative = neg;
  return x;
};

BN.prototype.ushln = function ushln(bits) {
  return this.clone().iushln(bits);
};

// Shift-right
BN.prototype.shrn = function shrn(bits) {
  var x = this.clone();
  if(x.negative) {
      x.negative = false;
      x.ishrn(bits);
      x.negative = true;
      return x.isubn(1);
  } else {
      return x.ishrn(bits);
  }
};

BN.prototype.ushrn = function ushrn(bits) {
  return this.clone().iushrn(bits);
};

// Test if n bit is set
BN.prototype.testn = function testn(bit) {
  var r = bit % 26;
  var s = (bit - r) / 26;
  var q = 1 << r;

  // Fast case: bit is much higher than all existing words
  if (this.length <= s) {
    return false;
  }

  // Check bit and return
  var w = this.words[s];

  return !!(w & q);
};

// Add plain number `num` to `this`
BN.prototype.iaddn = function iaddn(num) {
  if (num < 0)
    return this.isubn(-num);

  // Possible sign change
  if (this.negative !== 0) {
    if (this.length === 1 && (this.words[0] | 0) < num) {
      this.words[0] = num - (this.words[0] | 0);
      this.negative = 0;
      return this;
    }

    this.negative = 0;
    this.isubn(num);
    this.negative = 1;
    return this;
  }

  // Add without checks
  return this._iaddn(num);
};

BN.prototype._iaddn = function _iaddn(num) {
  this.words[0] += num;

  // Carry
  for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
    this.words[i] -= 0x4000000;
    if (i === this.length - 1)
      this.words[i + 1] = 1;
    else
      this.words[i + 1]++;
  }
  this.length = Math.max(this.length, i + 1);

  return this;
};

// Subtract plain number `num` from `this`
BN.prototype.isubn = function isubn(num) {
  if (num < 0)
    return this.iaddn(-num);

  if (this.negative !== 0) {
    this.negative = 0;
    this.iaddn(num);
    this.negative = 1;
    return this;
  }

  this.words[0] -= num;

  // Carry
  for (var i = 0; i < this.length && this.words[i] < 0; i++) {
    this.words[i] += 0x4000000;
    this.words[i + 1] -= 1;
  }

  return this.strip();
};

BN.prototype.addn = function addn(num) {
  return this.clone().iaddn(num);
};

BN.prototype.subn = function subn(num) {
  return this.clone().isubn(num);
};

BN.prototype.iabs = function iabs() {
  this.negative = 0;

  return this;
};

BN.prototype.abs = function abs() {
  return this.clone().iabs();
};

BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
  // Bigger storage is needed
  var len = num.length + shift;
  var i;
  if (this.words.length < len) {
    var t = new Array(len);
    for (var i = 0; i < this.length; i++)
      t[i] = this.words[i];
    this.words = t;
  } else {
    i = this.length;
  }

  // Zeroify rest
  this.length = Math.max(this.length, len);
  for (; i < this.length; i++)
    this.words[i] = 0;

  var carry = 0;
  for (var i = 0; i < num.length; i++) {
    var w = (this.words[i + shift] | 0) + carry;
    var right = (num.words[i] | 0) * mul;
    w -= right & 0x3ffffff;
    carry = (w >> 26) - ((right / 0x4000000) | 0);
    this.words[i + shift] = w & 0x3ffffff;
  }
  for (; i < this.length - shift; i++) {
    var w = (this.words[i + shift] | 0) + carry;
    carry = w >> 26;
    this.words[i + shift] = w & 0x3ffffff;
  }

  if (carry === 0)
    return this.strip();

  carry = 0;
  for (var i = 0; i < this.length; i++) {
    var w = -(this.words[i] | 0) + carry;
    carry = w >> 26;
    this.words[i] = w & 0x3ffffff;
  }
  this.negative = 1;

  return this.strip();
};

BN.prototype._wordDiv = function _wordDiv(num, mode) {
  var shift = this.length - num.length;

  var a = this.clone();
  var b = num;

  // Normalize
  var bhi = b.words[b.length - 1] | 0;
  var bhiBits = this._countBits(bhi);
  shift = 26 - bhiBits;
  if (shift !== 0) {
    b = b.ushln(shift);
    a.iushln(shift);
    bhi = b.words[b.length - 1] | 0;
  }

  // Initialize quotient
  var m = a.length - b.length;
  var q;

  if (mode !== 'mod') {
    q = new BN(null);
    q.length = m + 1;
    q.words = new Array(q.length);
    for (var i = 0; i < q.length; i++)
      q.words[i] = 0;
  }

  var diff = a.clone()._ishlnsubmul(b, 1, m);
  if (diff.negative === 0) {
    a = diff;
    if (q)
      q.words[m] = 1;
  }

  for (var j = m - 1; j >= 0; j--) {
    var qj = (a.words[b.length + j] | 0) * 0x4000000 +
             (a.words[b.length + j - 1] | 0);

    // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
    // (0x7ffffff)
    qj = Math.min((qj / bhi) | 0, 0x3ffffff);

    a._ishlnsubmul(b, qj, j);
    while (a.negative !== 0) {
      qj--;
      a.negative = 0;
      a._ishlnsubmul(b, 1, j);
      if (a.cmpn(0) !== 0)
        a.negative ^= 1;
    }
    if (q)
      q.words[j] = qj;
  }
  if (q)
    q.strip();
  a.strip();

  // Denormalize
  if (mode !== 'div' && shift !== 0)
    a.iushrn(shift);
  return { div: q ? q : null, mod: a };
};

BN.prototype.divmod = function divmod(num, mode, positive) {
  if (this.negative !== 0 && num.negative === 0) {
    var res = this.neg().divmod(num, mode);
    var div;
    var mod;
    if (mode !== 'mod')
      div = res.div.neg();
    if (mode !== 'div') {
      mod = res.mod.neg();
      if (positive && mod.neg)
        mod = mod.add(num);
    }
    return {
      div: div,
      mod: mod
    };
  } else if (this.negative === 0 && num.negative !== 0) {
    var res = this.divmod(num.neg(), mode);
    var div;
    if (mode !== 'mod')
      div = res.div.neg();
    return { div: div, mod: res.mod };
  } else if ((this.negative & num.negative) !== 0) {
    var res = this.neg().divmod(num.neg(), mode);
    var mod;
    if (mode !== 'div') {
      mod = res.mod.neg();
      if (positive && mod.neg)
        mod = mod.isub(num);
    }
    return {
      div: res.div,
      mod: mod
    };
  }

  // Both numbers are positive at this point

  // Strip both numbers to approximate shift value
  if (num.length > this.length || this.cmp(num) < 0)
    return { div: new BN(0), mod: this };

  // Very short reduction
  if (num.length === 1) {
    if (mode === 'div')
      return { div: this.divn(num.words[0]), mod: null };
    else if (mode === 'mod')
      return { div: null, mod: new BN(this.modn(num.words[0])) };
    return {
      div: this.divn(num.words[0]),
      mod: new BN(this.modn(num.words[0]))
    };
  }

  return this._wordDiv(num, mode);
};

// Find `this` / `num`
BN.prototype.div = function div(num) {
  return this.divmod(num, 'div', false).div;
};

// Find `this` % `num`
BN.prototype.mod = function mod(num) {
  return this.divmod(num, 'mod', false).mod;
};

BN.prototype.umod = function umod(num) {
  return this.divmod(num, 'mod', true).mod;
};

// Find Round(`this` / `num`)
BN.prototype.divRound = function divRound(num) {
  var dm = this.divmod(num);

  // Fast case - exact division
  if (dm.mod.cmpn(0) === 0)
    return dm.div;

  var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

  var half = num.ushrn(1);
  var r2 = num.andln(1);
  var cmp = mod.cmp(half);

  // Round down
  if (cmp < 0 || r2 === 1 && cmp === 0)
    return dm.div;

  // Round up
  return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
};

BN.prototype.modn = function modn(num) {
  var p = (1 << 26) % num;

  var acc = 0;
  for (var i = this.length - 1; i >= 0; i--)
    acc = (p * acc + (this.words[i] | 0)) % num;

  return acc;
};

// In-place division by number
BN.prototype.idivn = function idivn(num) {
  var carry = 0;
  for (var i = this.length - 1; i >= 0; i--) {
    var w = (this.words[i] | 0) + carry * 0x4000000;
    this.words[i] = (w / num) | 0;
    carry = w % num;
  }

  return this.strip();
};

BN.prototype.divn = function divn(num) {
  return this.clone().idivn(num);
};

BN.prototype.isEven = function isEven() {
  return (this.words[0] & 1) === 0;
};

BN.prototype.isOdd = function isOdd() {
  return (this.words[0] & 1) === 1;
};

// And first word and num
BN.prototype.andln = function andln(num) {
  return this.words[0] & num;
};

BN.prototype.cmpn = function cmpn(num) {
  var negative = num < 0;
  if (negative)
    num = -num;

  if (this.negative !== 0 && !negative)
    return -1;
  else if (this.negative === 0 && negative)
    return 1;

  num &= 0x3ffffff;
  this.strip();

  var res;
  if (this.length > 1) {
    res = 1;
  } else {
    var w = this.words[0] | 0;
    res = w === num ? 0 : w < num ? -1 : 1;
  }
  if (this.negative !== 0)
    res = -res;
  return res;
};

// Compare two numbers and return:
// 1 - if `this` > `num`
// 0 - if `this` == `num`
// -1 - if `this` < `num`
BN.prototype.cmp = function cmp(num) {
  if (this.negative !== 0 && num.negative === 0)
    return -1;
  else if (this.negative === 0 && num.negative !== 0)
    return 1;

  var res = this.ucmp(num);
  if (this.negative !== 0)
    return -res;
  else
    return res;
};

// Unsigned comparison
BN.prototype.ucmp = function ucmp(num) {
  // At this point both numbers have the same sign
  if (this.length > num.length)
    return 1;
  else if (this.length < num.length)
    return -1;

  var res = 0;
  for (var i = this.length - 1; i >= 0; i--) {
    var a = this.words[i] | 0;
    var b = num.words[i] | 0;

    if (a === b)
      continue;
    if (a < b)
      res = -1;
    else if (a > b)
      res = 1;
    break;
  }
  return res;
};
})(undefined, __bn);

// MVar implementation.
// Since Haste isn't concurrent, takeMVar and putMVar don't block on empty
// and full MVars respectively, but terminate the program since they would
// otherwise be blocking forever.

function newMVar() {
    return ({empty: true});
}

function tryTakeMVar(mv) {
    if(mv.empty) {
        return {_:0, a:0, b:undefined};
    } else {
        var val = mv.x;
        mv.empty = true;
        mv.x = null;
        return {_:0, a:1, b:val};
    }
}

function takeMVar(mv) {
    if(mv.empty) {
        // TODO: real BlockedOnDeadMVar exception, perhaps?
        err("Attempted to take empty MVar!");
    }
    var val = mv.x;
    mv.empty = true;
    mv.x = null;
    return val;
}

function putMVar(mv, val) {
    if(!mv.empty) {
        // TODO: real BlockedOnDeadMVar exception, perhaps?
        err("Attempted to put full MVar!");
    }
    mv.empty = false;
    mv.x = val;
}

function tryPutMVar(mv, val) {
    if(!mv.empty) {
        return 0;
    } else {
        mv.empty = false;
        mv.x = val;
        return 1;
    }
}

function sameMVar(a, b) {
    return (a == b);
}

function isEmptyMVar(mv) {
    return mv.empty ? 1 : 0;
}

// Implementation of stable names.
// Unlike native GHC, the garbage collector isn't going to move data around
// in a way that we can detect, so each object could serve as its own stable
// name if it weren't for the fact we can't turn a JS reference into an
// integer.
// So instead, each object has a unique integer attached to it, which serves
// as its stable name.

var __next_stable_name = 1;
var __stable_table;

function makeStableName(x) {
    if(x instanceof Object) {
        if(!x.stableName) {
            x.stableName = __next_stable_name;
            __next_stable_name += 1;
        }
        return {type: 'obj', name: x.stableName};
    } else {
        return {type: 'prim', name: Number(x)};
    }
}

function eqStableName(x, y) {
    return (x.type == y.type && x.name == y.name) ? 1 : 0;
}

// TODO: inefficient compared to real fromInt?
__bn.Z = new __bn.BN(0);
__bn.ONE = new __bn.BN(1);
__bn.MOD32 = new __bn.BN(0x100000000); // 2^32
var I_fromNumber = function(x) {return new __bn.BN(x);}
var I_fromInt = I_fromNumber;
var I_fromBits = function(lo,hi) {
    var x = new __bn.BN(lo >>> 0);
    var y = new __bn.BN(hi >>> 0);
    y.ishln(32);
    x.iadd(y);
    return x;
}
var I_fromString = function(s) {return new __bn.BN(s);}
var I_toInt = function(x) {return I_toNumber(x.mod(__bn.MOD32));}
var I_toWord = function(x) {return I_toInt(x) >>> 0;};
// TODO: inefficient!
var I_toNumber = function(x) {return Number(x.toString());}
var I_equals = function(a,b) {return a.cmp(b) === 0;}
var I_compare = function(a,b) {return a.cmp(b);}
var I_compareInt = function(x,i) {return x.cmp(new __bn.BN(i));}
var I_negate = function(x) {return x.neg();}
var I_add = function(a,b) {return a.add(b);}
var I_sub = function(a,b) {return a.sub(b);}
var I_mul = function(a,b) {return a.mul(b);}
var I_mod = function(a,b) {return I_rem(I_add(b, I_rem(a, b)), b);}
var I_quotRem = function(a,b) {
    var qr = a.divmod(b);
    return {_:0, a:qr.div, b:qr.mod};
}
var I_div = function(a,b) {
    if((a.cmp(__bn.Z)>=0) != (a.cmp(__bn.Z)>=0)) {
        if(a.cmp(a.rem(b), __bn.Z) !== 0) {
            return a.div(b).sub(__bn.ONE);
        }
    }
    return a.div(b);
}
var I_divMod = function(a,b) {
    return {_:0, a:I_div(self, other), b:a.mod(b)};
}
var I_quot = function(a,b) {return a.div(b);}
var I_rem = function(a,b) {return a.mod(b);}
var I_and = function(a,b) {return a.and(b);}
var I_or = function(a,b) {return a.or(b);}
var I_xor = function(a,b) {return a.xor(b);}
var I_shiftLeft = function(a,b) {return a.shln(b);}
var I_shiftRight = function(a,b) {return a.shrn(b);}
var I_signum = function(x) {return x.cmp(new __bn.BN(0));}
var I_abs = function(x) {return x.abs();}
var I_decodeDouble = function(x) {
    var dec = decodeDouble(x);
    var mantissa = I_fromBits(dec.c, dec.b);
    if(dec.a < 0) {
        mantissa = I_negate(mantissa);
    }
    return {_:0, a:dec.d, b:mantissa};
}
var I_toString = function(x) {return x.toString();}
var I_fromRat = function(a, b) {
    return I_toNumber(a) / I_toNumber(b);
}

function I_fromInt64(x) {
    if(x.isNegative()) {
        return I_negate(I_fromInt64(x.negate()));
    } else {
        return I_fromBits(x.low, x.high);
    }
}

function I_toInt64(x) {
    if(x.negative) {
        return I_toInt64(I_negate(x)).negate();
    } else {
        return new Long(I_toInt(x), I_toInt(I_shiftRight(x,32)));
    }
}

function I_fromWord64(x) {
    return I_fromBits(x.toInt(), x.shru(32).toInt());
}

function I_toWord64(x) {
    var w = I_toInt64(x);
    w.unsigned = true;
    return w;
}

/**
 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/long.js for details
 */
function Long(low, high, unsigned) {
    this.low = low | 0;
    this.high = high | 0;
    this.unsigned = !!unsigned;
}

var INT_CACHE = {};
var UINT_CACHE = {};
function cacheable(x, u) {
    return u ? 0 <= (x >>>= 0) && x < 256 : -128 <= (x |= 0) && x < 128;
}

function __fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        if (cache = cacheable(value >>>= 0, true)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = new Long(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        if (cache = cacheable(value |= 0, false)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = new Long(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

function __fromNumber(value, unsigned) {
    if (isNaN(value) || !isFinite(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return __fromNumber(-value, unsigned).neg();
    return new Long((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}
var pow_dbl = Math.pow;
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = __fromInt(TWO_PWR_24_DBL);
var ZERO = __fromInt(0);
Long.ZERO = ZERO;
var UZERO = __fromInt(0, true);
Long.UZERO = UZERO;
var ONE = __fromInt(1);
Long.ONE = ONE;
var UONE = __fromInt(1, true);
Long.UONE = UONE;
var NEG_ONE = __fromInt(-1);
Long.NEG_ONE = NEG_ONE;
var MAX_VALUE = new Long(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);
Long.MAX_VALUE = MAX_VALUE;
var MAX_UNSIGNED_VALUE = new Long(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
var MIN_VALUE = new Long(0, 0x80000000|0, false);
Long.MIN_VALUE = MIN_VALUE;
var __lp = Long.prototype;
__lp.toInt = function() {return this.unsigned ? this.low >>> 0 : this.low;};
__lp.toNumber = function() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};
__lp.isZero = function() {return this.high === 0 && this.low === 0;};
__lp.isNegative = function() {return !this.unsigned && this.high < 0;};
__lp.isOdd = function() {return (this.low & 1) === 1;};
__lp.eq = function(other) {
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};
__lp.neq = function(other) {return !this.eq(other);};
__lp.lt = function(other) {return this.comp(other) < 0;};
__lp.lte = function(other) {return this.comp(other) <= 0;};
__lp.gt = function(other) {return this.comp(other) > 0;};
__lp.gte = function(other) {return this.comp(other) >= 0;};
__lp.compare = function(other) {
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};
__lp.comp = __lp.compare;
__lp.negate = function() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};
__lp.neg = __lp.negate;
__lp.add = function(addend) {
    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return new Long((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};
__lp.subtract = function(subtrahend) {return this.add(subtrahend.neg());};
__lp.sub = __lp.subtract;
__lp.multiply = function(multiplier) {
    if (this.isZero())
        return ZERO;
    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return __fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return new Long((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};
__lp.mul = __lp.multiply;
__lp.divide = function(divisor) {
    if (divisor.isZero())
        throw Error('division by zero');
    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (this.eq(MIN_VALUE)) {
        if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
            return MIN_VALUE;
        else if (divisor.eq(MIN_VALUE))
            return ONE;
        else {
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(ZERO)) {
                return divisor.isNegative() ? ONE : NEG_ONE;
            } else {
                rem = this.sub(divisor.mul(approx));
                res = approx.add(rem.div(divisor));
                return res;
            }
        }
    } else if (divisor.eq(MIN_VALUE))
        return this.unsigned ? UZERO : ZERO;
    if (this.isNegative()) {
        if (divisor.isNegative())
            return this.neg().div(divisor.neg());
        return this.neg().div(divisor).neg();
    } else if (divisor.isNegative())
        return this.div(divisor.neg()).neg();

    res = ZERO;
    rem = this;
    while (rem.gte(divisor)) {
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),
            approxRes = __fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = __fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};
__lp.div = __lp.divide;
__lp.modulo = function(divisor) {return this.sub(this.div(divisor).mul(divisor));};
__lp.mod = __lp.modulo;
__lp.not = function not() {return new Long(~this.low, ~this.high, this.unsigned);};
__lp.and = function(other) {return new Long(this.low & other.low, this.high & other.high, this.unsigned);};
__lp.or = function(other) {return new Long(this.low | other.low, this.high | other.high, this.unsigned);};
__lp.xor = function(other) {return new Long(this.low ^ other.low, this.high ^ other.high, this.unsigned);};

__lp.shl = function(numBits) {
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return new Long(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return new Long(0, this.low << (numBits - 32), this.unsigned);
};

__lp.shr = function(numBits) {
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return new Long((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return new Long(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

__lp.shru = function(numBits) {
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return new Long((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return new Long(high, 0, this.unsigned);
        else
            return new Long(high >>> (numBits - 32), 0, this.unsigned);
    }
};

__lp.toSigned = function() {return this.unsigned ? new Long(this.low, this.high, false) : this;};
__lp.toUnsigned = function() {return this.unsigned ? this : new Long(this.low, this.high, true);};

// Int64
function hs_eqInt64(x, y) {return x.eq(y);}
function hs_neInt64(x, y) {return x.neq(y);}
function hs_ltInt64(x, y) {return x.lt(y);}
function hs_leInt64(x, y) {return x.lte(y);}
function hs_gtInt64(x, y) {return x.gt(y);}
function hs_geInt64(x, y) {return x.gte(y);}
function hs_quotInt64(x, y) {return x.div(y);}
function hs_remInt64(x, y) {return x.modulo(y);}
function hs_plusInt64(x, y) {return x.add(y);}
function hs_minusInt64(x, y) {return x.subtract(y);}
function hs_timesInt64(x, y) {return x.multiply(y);}
function hs_negateInt64(x) {return x.negate();}
function hs_uncheckedIShiftL64(x, bits) {return x.shl(bits);}
function hs_uncheckedIShiftRA64(x, bits) {return x.shr(bits);}
function hs_uncheckedIShiftRL64(x, bits) {return x.shru(bits);}
function hs_int64ToInt(x) {return x.toInt();}
var hs_intToInt64 = __fromInt;

// Word64
function hs_wordToWord64(x) {return __fromInt(x, true);}
function hs_word64ToWord(x) {return x.toInt(x);}
function hs_mkWord64(low, high) {return new Long(low,high,true);}
function hs_and64(a,b) {return a.and(b);};
function hs_or64(a,b) {return a.or(b);};
function hs_xor64(a,b) {return a.xor(b);};
function hs_not64(x) {return x.not();}
var hs_eqWord64 = hs_eqInt64;
var hs_neWord64 = hs_neInt64;
var hs_ltWord64 = hs_ltInt64;
var hs_leWord64 = hs_leInt64;
var hs_gtWord64 = hs_gtInt64;
var hs_geWord64 = hs_geInt64;
var hs_quotWord64 = hs_quotInt64;
var hs_remWord64 = hs_remInt64;
var hs_uncheckedShiftL64 = hs_uncheckedIShiftL64;
var hs_uncheckedShiftRL64 = hs_uncheckedIShiftRL64;
function hs_int64ToWord64(x) {return x.toUnsigned();}
function hs_word64ToInt64(x) {return x.toSigned();}

// Joseph Myers' MD5 implementation, ported to work on typed arrays.
// Used under the BSD license.
function md5cycle(x, k) {
    var a = x[0], b = x[1], c = x[2], d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17,  606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12,  1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7,  1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7,  1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22,  1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14,  643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9,  38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5,  568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20,  1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14,  1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16,  1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11,  1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4,  681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23,  76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16,  530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10,  1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6,  1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6,  1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21,  1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15,  718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s, n) {
    var a = s['v']['w8'];
    var orig_n = n,
        state = [1732584193, -271733879, -1732584194, 271733878], i;
    for (i=64; i<=n; i+=64) {
        md5cycle(state, md5blk(a.subarray(i-64, i)));
    }
    a = a.subarray(i-64);
    n = n < (i-64) ? 0 : n-(i-64);
    var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
    for (i=0; i<n; i++)
        tail[i>>2] |= a[i] << ((i%4) << 3);
    tail[i>>2] |= 0x80 << ((i%4) << 3);
    if (i > 55) {
        md5cycle(state, tail);
        for (i=0; i<16; i++) tail[i] = 0;
    }
    tail[14] = orig_n*8;
    md5cycle(state, tail);
    return state;
}
window['md51'] = md51;

function md5blk(s) {
    var md5blks = [], i;
    for (i=0; i<64; i+=4) {
        md5blks[i>>2] = s[i]
            + (s[i+1] << 8)
            + (s[i+2] << 16)
            + (s[i+3] << 24);
    }
    return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
    var s='', j=0;
    for(; j<4; j++)
        s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
        + hex_chr[(n >> (j * 8)) & 0x0F];
    return s;
}

function hex(x) {
    for (var i=0; i<x.length; i++)
        x[i] = rhex(x[i]);
    return x.join('');
}

function md5(s, n) {
    return hex(md51(s, n));
}

window['md5'] = md5;

function add32(a, b) {
    return (a + b) & 0xFFFFFFFF;
}

function __hsbase_MD5Init(ctx) {}
// Note that this is a one time "update", since that's all that's used by
// GHC.Fingerprint.
function __hsbase_MD5Update(ctx, s, n) {
    ctx.md5 = md51(s, n);
}
function __hsbase_MD5Final(out, ctx) {
    var a = out['v']['i32'];
    a[0] = ctx.md5[0];
    a[1] = ctx.md5[1];
    a[2] = ctx.md5[2];
    a[3] = ctx.md5[3];
}

// Functions for dealing with arrays.

function newArr(n, x) {
    var arr = new Array(n);
    for(var i = 0; i < n; ++i) {
        arr[i] = x;
    }
    return arr;
}

// Create all views at once; perhaps it's wasteful, but it's better than having
// to check for the right view at each read or write.
function newByteArr(n) {
    // Pad the thing to multiples of 8.
    var padding = 8 - n % 8;
    if(padding < 8) {
        n += padding;
    }
    return new ByteArray(new ArrayBuffer(n));
}

// Wrap a JS ArrayBuffer into a ByteArray. Truncates the array length to the
// closest multiple of 8 bytes.
function wrapByteArr(buffer) {
    var diff = buffer.byteLength % 8;
    if(diff != 0) {
        var buffer = buffer.slice(0, buffer.byteLength-diff);
    }
    return new ByteArray(buffer);
}

function ByteArray(buffer) {
    var views =
        { 'i8' : new Int8Array(buffer)
        , 'i16': new Int16Array(buffer)
        , 'i32': new Int32Array(buffer)
        , 'w8' : new Uint8Array(buffer)
        , 'w16': new Uint16Array(buffer)
        , 'w32': new Uint32Array(buffer)
        , 'f32': new Float32Array(buffer)
        , 'f64': new Float64Array(buffer)
        };
    this['b'] = buffer;
    this['v'] = views;
    this['off'] = 0;
}
window['newArr'] = newArr;
window['newByteArr'] = newByteArr;
window['wrapByteArr'] = wrapByteArr;
window['ByteArray'] = ByteArray;

// An attempt at emulating pointers enough for ByteString and Text to be
// usable without patching the hell out of them.
// The general idea is that Addr# is a byte array with an associated offset.

function plusAddr(addr, off) {
    var newaddr = {};
    newaddr['off'] = addr['off'] + off;
    newaddr['b']   = addr['b'];
    newaddr['v']   = addr['v'];
    return newaddr;
}

function writeOffAddr(type, elemsize, addr, off, x) {
    addr['v'][type][addr.off/elemsize + off] = x;
}

function readOffAddr(type, elemsize, addr, off) {
    return addr['v'][type][addr.off/elemsize + off];
}

// Two addresses are equal if they point to the same buffer and have the same
// offset. For other comparisons, just use the offsets - nobody in their right
// mind would check if one pointer is less than another, completely unrelated,
// pointer and then act on that information anyway.
function addrEq(a, b) {
    if(a == b) {
        return true;
    }
    return a && b && a['b'] == b['b'] && a['off'] == b['off'];
}

function addrLT(a, b) {
    if(a) {
        return b && a['off'] < b['off'];
    } else {
        return (b != 0); 
    }
}

function addrGT(a, b) {
    if(b) {
        return a && a['off'] > b['off'];
    } else {
        return (a != 0);
    }
}

function withChar(f, charCode) {
    return f(String.fromCharCode(charCode)).charCodeAt(0);
}

function u_towlower(charCode) {
    return withChar(function(c) {return c.toLowerCase()}, charCode);
}

function u_towupper(charCode) {
    return withChar(function(c) {return c.toUpperCase()}, charCode);
}

var u_towtitle = u_towupper;

function u_iswupper(charCode) {
    var c = String.fromCharCode(charCode);
    return c == c.toUpperCase() && c != c.toLowerCase();
}

function u_iswlower(charCode) {
    var c = String.fromCharCode(charCode);
    return  c == c.toLowerCase() && c != c.toUpperCase();
}

function u_iswdigit(charCode) {
    return charCode >= 48 && charCode <= 57;
}

function u_iswcntrl(charCode) {
    return charCode <= 0x1f || charCode == 0x7f;
}

function u_iswspace(charCode) {
    var c = String.fromCharCode(charCode);
    return c.replace(/\s/g,'') != c;
}

function u_iswalpha(charCode) {
    var c = String.fromCharCode(charCode);
    return c.replace(__hs_alphare, '') != c;
}

function u_iswalnum(charCode) {
    return u_iswdigit(charCode) || u_iswalpha(charCode);
}

function u_iswprint(charCode) {
    return !u_iswcntrl(charCode);
}

function u_gencat(c) {
    throw 'u_gencat is only supported with --full-unicode.';
}

// Regex that matches any alphabetic character in any language. Horrible thing.
var __hs_alphare = /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/g;

// Simulate handles.
// When implementing new handles, remember that passed strings may be thunks,
// and so need to be evaluated before use.

function jsNewHandle(init, read, write, flush, close, seek, tell) {
    var h = {
        read: read || function() {},
        write: write || function() {},
        seek: seek || function() {},
        tell: tell || function() {},
        close: close || function() {},
        flush: flush || function() {}
    };
    init.call(h);
    return h;
}

function jsReadHandle(h, len) {return h.read(len);}
function jsWriteHandle(h, str) {return h.write(str);}
function jsFlushHandle(h) {return h.flush();}
function jsCloseHandle(h) {return h.close();}

function jsMkConWriter(op) {
    return function(str) {
        str = E(str);
        var lines = (this.buf + str).split('\n');
        for(var i = 0; i < lines.length-1; ++i) {
            op.call(console, lines[i]);
        }
        this.buf = lines[lines.length-1];
    }
}

function jsMkStdout() {
    return jsNewHandle(
        function() {this.buf = '';},
        function(_) {return '';},
        jsMkConWriter(console.log),
        function() {console.log(this.buf); this.buf = '';}
    );
}

function jsMkStderr() {
    return jsNewHandle(
        function() {this.buf = '';},
        function(_) {return '';},
        jsMkConWriter(console.warn),
        function() {console.warn(this.buf); this.buf = '';}
    );
}

function jsMkStdin() {
    return jsNewHandle(
        function() {this.buf = '';},
        function(len) {
            while(this.buf.length < len) {
                this.buf += prompt('[stdin]') + '\n';
            }
            var ret = this.buf.substr(0, len);
            this.buf = this.buf.substr(len);
            return ret;
        }
    );
}

// "Weak Pointers". Mostly useless implementation since
// JS does its own GC.

function mkWeak(key, val, fin) {
    fin = !fin? function() {}: fin;
    return {key: key, val: val, fin: fin};
}

function derefWeak(w) {
    return {_:0, a:1, b:E(w).val};
}

function finalizeWeak(w) {
    return {_:0, a:B(A1(E(w).fin, __Z))};
}

/* For foreign import ccall "wrapper" */
function createAdjustor(args, f, a, b) {
    return function(){
        var x = f.apply(null, arguments);
        while(x instanceof F) {x = x.f();}
        return x;
    };
}

var __apply = function(f,as) {
    var arr = [];
    for(; as._ === 1; as = as.b) {
        arr.push(as.a);
    }
    arr.reverse();
    return f.apply(null, arr);
}
var __app0 = function(f) {return f();}
var __app1 = function(f,a) {return f(a);}
var __app2 = function(f,a,b) {return f(a,b);}
var __app3 = function(f,a,b,c) {return f(a,b,c);}
var __app4 = function(f,a,b,c,d) {return f(a,b,c,d);}
var __app5 = function(f,a,b,c,d,e) {return f(a,b,c,d,e);}
var __jsNull = function() {return null;}
var __eq = function(a,b) {return a===b;}
var __createJSFunc = function(arity, f){
    if(f instanceof Function && arity === f.length) {
        return (function() {
            var x = f.apply(null,arguments);
            if(x instanceof T) {
                if(x.f !== __blackhole) {
                    var ff = x.f;
                    x.f = __blackhole;
                    return x.x = ff();
                }
                return x.x;
            } else {
                while(x instanceof F) {
                    x = x.f();
                }
                return E(x);
            }
        });
    } else {
        return (function(){
            var as = Array.prototype.slice.call(arguments);
            as.push(0);
            return E(B(A(f,as)));
        });
    }
}


function __arr2lst(elem,arr) {
    if(elem >= arr.length) {
        return __Z;
    }
    return {_:1,
            a:arr[elem],
            b:new T(function(){return __arr2lst(elem+1,arr);})};
}

function __lst2arr(xs) {
    var arr = [];
    xs = E(xs);
    for(;xs._ === 1; xs = E(xs.b)) {
        arr.push(E(xs.a));
    }
    return arr;
}

var __new = function() {return ({});}
var __set = function(o,k,v) {o[k]=v;}
var __get = function(o,k) {return o[k];}
var __has = function(o,k) {return o[k]!==undefined;}

var _0=0,_1=function(_){return _0;},_2=new T(function(){return B(unCStr("Control.Exception.Base"));}),_3=new T(function(){return B(unCStr("base"));}),_4=new T(function(){return B(unCStr("NoMethodError"));}),_5=__Z,_6=new T(function(){var _7=hs_wordToWord64(new Long(1682668460,2475369181,true)),_8=hs_wordToWord64(new Long(2653737051,154809188,true));return new T5(0,_7,_8,new T5(0,_7,_8,_3,_2,_4),_5,_5);}),_9=function(_a){return E(_6);},_b=function(_c){return E(E(_c).a);},_d=function(_e,_f,_g){var _h=B(A1(_e,_)),_i=B(A1(_f,_)),_j=hs_eqWord64(_h.a,_i.a);if(!_j){return __Z;}else{var _k=hs_eqWord64(_h.b,_i.b);return (!_k)?__Z:new T1(1,_g);}},_l=function(_m){var _n=E(_m);return new F(function(){return _d(B(_b(_n.a)),_9,_n.b);});},_o=function(_p){return E(E(_p).a);},_q=function(_r){return new T2(0,_s,_r);},_t=function(_u,_v){var _w=E(_u);return (_w._==0)?E(_v):new T2(1,_w.a,new T(function(){return B(_t(_w.b,_v));}));},_x=function(_y,_z){return new F(function(){return _t(E(_y).a,_z);});},_A=44,_B=93,_C=91,_D=function(_E,_F,_G){var _H=E(_F);if(!_H._){return new F(function(){return unAppCStr("[]",_G);});}else{var _I=new T(function(){var _J=new T(function(){var _K=function(_L){var _M=E(_L);if(!_M._){return E(new T2(1,_B,_G));}else{var _N=new T(function(){return B(A2(_E,_M.a,new T(function(){return B(_K(_M.b));})));});return new T2(1,_A,_N);}};return B(_K(_H.b));});return B(A2(_E,_H.a,_J));});return new T2(1,_C,_I);}},_O=function(_P,_Q){return new F(function(){return _D(_x,_P,_Q);});},_R=function(_S,_T,_U){return new F(function(){return _t(E(_T).a,_U);});},_V=new T3(0,_R,_o,_O),_s=new T(function(){return new T5(0,_9,_V,_q,_l,_o);}),_W=new T(function(){return B(unCStr("No instance nor default method for class operation"));}),_X=function(_Y){return E(E(_Y).c);},_Z=function(_10,_11){return new F(function(){return die(new T(function(){return B(A2(_X,_11,_10));}));});},_12=function(_13,_14){return new F(function(){return _Z(_13,_14);});},_15=function(_16,_17){var _18=E(_17);if(!_18._){return new T2(0,_5,_5);}else{var _19=_18.a;if(!B(A1(_16,_19))){return new T2(0,_5,_18);}else{var _1a=new T(function(){var _1b=B(_15(_16,_18.b));return new T2(0,_1b.a,_1b.b);});return new T2(0,new T2(1,_19,new T(function(){return E(E(_1a).a);})),new T(function(){return E(E(_1a).b);}));}}},_1c=32,_1d=new T(function(){return B(unCStr("\n"));}),_1e=function(_1f){return (E(_1f)==124)?false:true;},_1g=function(_1h,_1i){var _1j=B(_15(_1e,B(unCStr(_1h)))),_1k=_1j.a,_1l=function(_1m,_1n){var _1o=new T(function(){var _1p=new T(function(){return B(_t(_1i,new T(function(){return B(_t(_1n,_1d));},1)));});return B(unAppCStr(": ",_1p));},1);return new F(function(){return _t(_1m,_1o);});},_1q=E(_1j.b);if(!_1q._){return new F(function(){return _1l(_1k,_5);});}else{if(E(_1q.a)==124){return new F(function(){return _1l(_1k,new T2(1,_1c,_1q.b));});}else{return new F(function(){return _1l(_1k,_5);});}}},_1r=function(_1s){return new F(function(){return _12(new T1(0,new T(function(){return B(_1g(_1s,_W));})),_s);});},_1t=new T(function(){return B(_1r("Main.hs:51:10-28|parseJSON"));}),_1u=new T(function(){return B(unCStr("PatternMatchFail"));}),_1v=new T(function(){var _1w=hs_wordToWord64(new Long(18445595,3739165398,true)),_1x=hs_wordToWord64(new Long(52003073,3246954884,true));return new T5(0,_1w,_1x,new T5(0,_1w,_1x,_3,_2,_1u),_5,_5);}),_1y=function(_1z){return E(_1v);},_1A=function(_1B){var _1C=E(_1B);return new F(function(){return _d(B(_b(_1C.a)),_1y,_1C.b);});},_1D=function(_1E){return E(E(_1E).a);},_1F=function(_r){return new T2(0,_1G,_r);},_1H=function(_1I,_1J){return new F(function(){return _t(E(_1I).a,_1J);});},_1K=function(_1L,_1M){return new F(function(){return _D(_1H,_1L,_1M);});},_1N=function(_1O,_1P,_1Q){return new F(function(){return _t(E(_1P).a,_1Q);});},_1R=new T3(0,_1N,_1D,_1K),_1G=new T(function(){return new T5(0,_1y,_1R,_1F,_1A,_1D);}),_1S=new T(function(){return B(unCStr("Non-exhaustive patterns in"));}),_1T=function(_1U){return new F(function(){return _12(new T1(0,new T(function(){return B(_1g(_1U,_1S));})),_1G);});},_1V=function(_1W){return new F(function(){return _1T("MakeLense.hs:(218,3)-(221,33)|function jsonToUnion");});},_1X=new T(function(){return B(_1V(_));}),_1Y=function(_1Z,_20){while(1){var _21=E(_20);if(!_21._){return __Z;}else{var _22=_21.b,_23=E(_1Z);if(_23==1){return E(_22);}else{_1Z=_23-1|0;_20=_22;continue;}}}},_24=function(_25,_26,_27){var _28=E(_25);if(_28==1){return E(_27);}else{return new F(function(){return _1Y(_28-1|0,_27);});}},_29=function(_2a,_2b){var _2c=E(_2b);if(!_2c._){return __Z;}else{var _2d=_2c.a,_2e=E(_2a);return (_2e==1)?new T2(1,_2d,_5):new T2(1,_2d,new T(function(){return B(_29(_2e-1|0,_2c.b));}));}},_2f=function(_2g,_2h,_2i){return new T2(1,new T(function(){if(0>=_2g){return __Z;}else{return B(_29(_2g,new T2(1,_2h,_2i)));}}),new T(function(){if(_2g>0){return B(_2j(_2g,B(_24(_2g,_2h,_2i))));}else{return B(_2f(_2g,_2h,_2i));}}));},_2j=function(_2k,_2l){var _2m=E(_2l);if(!_2m._){return __Z;}else{var _2n=_2m.a,_2o=_2m.b;return new T2(1,new T(function(){if(0>=_2k){return __Z;}else{return B(_29(_2k,_2m));}}),new T(function(){if(_2k>0){return B(_2j(_2k,B(_24(_2k,_2n,_2o))));}else{return B(_2f(_2k,_2n,_2o));}}));}},_2p=function(_2q){return new T1(0,E(_2q));},_2r=function(_2s,_2t){var _2u=E(_2t);return (_2u._==0)?__Z:new T2(1,new T(function(){return B(A1(_2s,_2u.a));}),new T(function(){return B(_2r(_2s,_2u.b));}));},_2v=function(_2w){return new T1(3,E(B(_2r(_2p,_2w))));},_2x=new T(function(){return B(unCStr("Map.!: given key is not an element in the map"));}),_2y=new T(function(){return B(err(_2x));}),_2z=function(_2A,_2B,_2C){while(1){var _2D=E(_2C);if(!_2D._){var _2E=_2D.d,_2F=_2D.e,_2G=E(_2D.b),_2H=E(_2G.a);if(_2A>=_2H){if(_2A!=_2H){_2C=_2F;continue;}else{var _2I=E(_2G.b);if(_2B>=_2I){if(_2B!=_2I){_2C=_2F;continue;}else{return E(_2D.c);}}else{_2C=_2E;continue;}}}else{_2C=_2E;continue;}}else{return E(_2y);}}},_2J=function(_2K,_2L,_2M){while(1){var _2N=E(_2M);if(!_2N._){var _2O=_2N.d,_2P=_2N.e,_2Q=E(_2N.b),_2R=E(_2Q.a);if(_2K>=_2R){if(_2K!=_2R){_2M=_2P;continue;}else{var _2S=E(_2L),_2T=E(_2Q.b);if(_2S>=_2T){if(_2S!=_2T){return new F(function(){return _2z(_2K,_2S,_2P);});}else{return E(_2N.c);}}else{return new F(function(){return _2z(_2K,_2S,_2O);});}}}else{_2M=_2O;continue;}}else{return E(_2y);}}},_2U=function(_2V,_2W){if(_2V<=_2W){var _2X=function(_2Y){return new T2(1,_2Y,new T(function(){if(_2Y!=_2W){return B(_2X(_2Y+1|0));}else{return __Z;}}));};return new F(function(){return _2X(_2V);});}else{return __Z;}},_2Z=function(_30){var _31=E(_30),_32=E(E(_31.b).a),_33=E(_32.a),_34=_33-1|0;if(0<=_34){var _35=new T(function(){return E(E(E(_31.c).b).a);}),_36=function(_37){var _38=new T(function(){if(_37!=_34){return B(_36(_37+1|0));}else{return __Z;}}),_39=function(_3a){var _3b=E(_3a);return (_3b._==0)?E(_38):new T2(1,new T(function(){return B(_2J(_37,_3b.a,_35));}),new T(function(){return B(_39(_3b.b));}));};return new F(function(){return _39(B(_2U(0,E(_32.b)-1|0)));});};return new F(function(){return _2r(_2v,B(_2j(_33,B(_36(0)))));});}else{return new F(function(){return _2r(_2v,_5);});}},_3c=new T1(0,_),_3d=function(_3e,_3f){return E(_3e)==E(_3f);},_3g=function(_3h,_3i){return E(_3h)!=E(_3i);},_3j=new T2(0,_3d,_3g),_3k=function(_3l,_3m){var _3n=E(_3l),_3o=E(_3m);return (_3n>_3o)?E(_3n):E(_3o);},_3p=function(_3q,_3r){var _3s=E(_3q),_3t=E(_3r);return (_3s>_3t)?E(_3t):E(_3s);},_3u=function(_3v,_3w){return (_3v>=_3w)?(_3v!=_3w)?2:1:0;},_3x=function(_3y,_3z){return new F(function(){return _3u(E(_3y),E(_3z));});},_3A=function(_3B,_3C){return E(_3B)>=E(_3C);},_3D=function(_3E,_3F){return E(_3E)>E(_3F);},_3G=function(_3H,_3I){return E(_3H)<=E(_3I);},_3J=function(_3K,_3L){return E(_3K)<E(_3L);},_3M={_:0,a:_3j,b:_3x,c:_3J,d:_3G,e:_3D,f:_3A,g:_3k,h:_3p},_3N=new T0(1),_3O=new T(function(){return B(unCStr("Failure in Data.Map.balanceR"));}),_3P=function(_3Q){return new F(function(){return err(_3O);});},_3R=new T(function(){return B(_3P(_));}),_3S=function(_3T,_3U,_3V,_3W){var _3X=E(_3V);if(!_3X._){var _3Y=_3X.a,_3Z=E(_3W);if(!_3Z._){var _40=_3Z.a,_41=_3Z.b,_42=_3Z.c;if(_40<=(imul(3,_3Y)|0)){return new T5(0,(1+_3Y|0)+_40|0,E(_3T),_3U,E(_3X),E(_3Z));}else{var _43=E(_3Z.d);if(!_43._){var _44=_43.a,_45=_43.b,_46=_43.c,_47=_43.d,_48=E(_3Z.e);if(!_48._){var _49=_48.a;if(_44>=(imul(2,_49)|0)){var _4a=function(_4b){var _4c=E(_3T),_4d=E(_43.e);return (_4d._==0)?new T5(0,(1+_3Y|0)+_40|0,E(_45),_46,E(new T5(0,(1+_3Y|0)+_4b|0,E(_4c),_3U,E(_3X),E(_47))),E(new T5(0,(1+_49|0)+_4d.a|0,E(_41),_42,E(_4d),E(_48)))):new T5(0,(1+_3Y|0)+_40|0,E(_45),_46,E(new T5(0,(1+_3Y|0)+_4b|0,E(_4c),_3U,E(_3X),E(_47))),E(new T5(0,1+_49|0,E(_41),_42,E(_3N),E(_48))));},_4e=E(_47);if(!_4e._){return new F(function(){return _4a(_4e.a);});}else{return new F(function(){return _4a(0);});}}else{return new T5(0,(1+_3Y|0)+_40|0,E(_41),_42,E(new T5(0,(1+_3Y|0)+_44|0,E(_3T),_3U,E(_3X),E(_43))),E(_48));}}else{return E(_3R);}}else{return E(_3R);}}}else{return new T5(0,1+_3Y|0,E(_3T),_3U,E(_3X),E(_3N));}}else{var _4f=E(_3W);if(!_4f._){var _4g=_4f.a,_4h=_4f.b,_4i=_4f.c,_4j=_4f.e,_4k=E(_4f.d);if(!_4k._){var _4l=_4k.a,_4m=_4k.b,_4n=_4k.c,_4o=_4k.d,_4p=E(_4j);if(!_4p._){var _4q=_4p.a;if(_4l>=(imul(2,_4q)|0)){var _4r=function(_4s){var _4t=E(_3T),_4u=E(_4k.e);return (_4u._==0)?new T5(0,1+_4g|0,E(_4m),_4n,E(new T5(0,1+_4s|0,E(_4t),_3U,E(_3N),E(_4o))),E(new T5(0,(1+_4q|0)+_4u.a|0,E(_4h),_4i,E(_4u),E(_4p)))):new T5(0,1+_4g|0,E(_4m),_4n,E(new T5(0,1+_4s|0,E(_4t),_3U,E(_3N),E(_4o))),E(new T5(0,1+_4q|0,E(_4h),_4i,E(_3N),E(_4p))));},_4v=E(_4o);if(!_4v._){return new F(function(){return _4r(_4v.a);});}else{return new F(function(){return _4r(0);});}}else{return new T5(0,1+_4g|0,E(_4h),_4i,E(new T5(0,1+_4l|0,E(_3T),_3U,E(_3N),E(_4k))),E(_4p));}}else{return new T5(0,3,E(_4m),_4n,E(new T5(0,1,E(_3T),_3U,E(_3N),E(_3N))),E(new T5(0,1,E(_4h),_4i,E(_3N),E(_3N))));}}else{var _4w=E(_4j);return (_4w._==0)?new T5(0,3,E(_4h),_4i,E(new T5(0,1,E(_3T),_3U,E(_3N),E(_3N))),E(_4w)):new T5(0,2,E(_3T),_3U,E(_3N),E(_4f));}}else{return new T5(0,1,E(_3T),_3U,E(_3N),E(_3N));}}},_4x=function(_4y,_4z){return new T5(0,1,E(_4y),_4z,E(_3N),E(_3N));},_4A=function(_4B,_4C,_4D){var _4E=E(_4D);if(!_4E._){return new F(function(){return _3S(_4E.b,_4E.c,_4E.d,B(_4A(_4B,_4C,_4E.e)));});}else{return new F(function(){return _4x(_4B,_4C);});}},_4F=new T(function(){return B(unCStr("Failure in Data.Map.balanceL"));}),_4G=function(_4H){return new F(function(){return err(_4F);});},_4I=new T(function(){return B(_4G(_));}),_4J=function(_4K,_4L,_4M,_4N){var _4O=E(_4N);if(!_4O._){var _4P=_4O.a,_4Q=E(_4M);if(!_4Q._){var _4R=_4Q.a,_4S=_4Q.b,_4T=_4Q.c;if(_4R<=(imul(3,_4P)|0)){return new T5(0,(1+_4R|0)+_4P|0,E(_4K),_4L,E(_4Q),E(_4O));}else{var _4U=E(_4Q.d);if(!_4U._){var _4V=_4U.a,_4W=E(_4Q.e);if(!_4W._){var _4X=_4W.a,_4Y=_4W.b,_4Z=_4W.c,_50=_4W.d;if(_4X>=(imul(2,_4V)|0)){var _51=function(_52){var _53=E(_4W.e);return (_53._==0)?new T5(0,(1+_4R|0)+_4P|0,E(_4Y),_4Z,E(new T5(0,(1+_4V|0)+_52|0,E(_4S),_4T,E(_4U),E(_50))),E(new T5(0,(1+_4P|0)+_53.a|0,E(_4K),_4L,E(_53),E(_4O)))):new T5(0,(1+_4R|0)+_4P|0,E(_4Y),_4Z,E(new T5(0,(1+_4V|0)+_52|0,E(_4S),_4T,E(_4U),E(_50))),E(new T5(0,1+_4P|0,E(_4K),_4L,E(_3N),E(_4O))));},_54=E(_50);if(!_54._){return new F(function(){return _51(_54.a);});}else{return new F(function(){return _51(0);});}}else{return new T5(0,(1+_4R|0)+_4P|0,E(_4S),_4T,E(_4U),E(new T5(0,(1+_4P|0)+_4X|0,E(_4K),_4L,E(_4W),E(_4O))));}}else{return E(_4I);}}else{return E(_4I);}}}else{return new T5(0,1+_4P|0,E(_4K),_4L,E(_3N),E(_4O));}}else{var _55=E(_4M);if(!_55._){var _56=_55.a,_57=_55.b,_58=_55.c,_59=_55.e,_5a=E(_55.d);if(!_5a._){var _5b=_5a.a,_5c=E(_59);if(!_5c._){var _5d=_5c.a,_5e=_5c.b,_5f=_5c.c,_5g=_5c.d;if(_5d>=(imul(2,_5b)|0)){var _5h=function(_5i){var _5j=E(_5c.e);return (_5j._==0)?new T5(0,1+_56|0,E(_5e),_5f,E(new T5(0,(1+_5b|0)+_5i|0,E(_57),_58,E(_5a),E(_5g))),E(new T5(0,1+_5j.a|0,E(_4K),_4L,E(_5j),E(_3N)))):new T5(0,1+_56|0,E(_5e),_5f,E(new T5(0,(1+_5b|0)+_5i|0,E(_57),_58,E(_5a),E(_5g))),E(new T5(0,1,E(_4K),_4L,E(_3N),E(_3N))));},_5k=E(_5g);if(!_5k._){return new F(function(){return _5h(_5k.a);});}else{return new F(function(){return _5h(0);});}}else{return new T5(0,1+_56|0,E(_57),_58,E(_5a),E(new T5(0,1+_5d|0,E(_4K),_4L,E(_5c),E(_3N))));}}else{return new T5(0,3,E(_57),_58,E(_5a),E(new T5(0,1,E(_4K),_4L,E(_3N),E(_3N))));}}else{var _5l=E(_59);return (_5l._==0)?new T5(0,3,E(_5l.b),_5l.c,E(new T5(0,1,E(_57),_58,E(_3N),E(_3N))),E(new T5(0,1,E(_4K),_4L,E(_3N),E(_3N)))):new T5(0,2,E(_4K),_4L,E(_55),E(_3N));}}else{return new T5(0,1,E(_4K),_4L,E(_3N),E(_3N));}}},_5m=function(_5n,_5o,_5p){var _5q=E(_5p);if(!_5q._){return new F(function(){return _4J(_5q.b,_5q.c,B(_5m(_5n,_5o,_5q.d)),_5q.e);});}else{return new F(function(){return _4x(_5n,_5o);});}},_5r=function(_5s,_5t,_5u,_5v,_5w,_5x,_5y){return new F(function(){return _4J(_5v,_5w,B(_5m(_5s,_5t,_5x)),_5y);});},_5z=function(_5A,_5B,_5C,_5D,_5E,_5F,_5G,_5H){var _5I=E(_5C);if(!_5I._){var _5J=_5I.a,_5K=_5I.b,_5L=_5I.c,_5M=_5I.d,_5N=_5I.e;if((imul(3,_5J)|0)>=_5D){if((imul(3,_5D)|0)>=_5J){return new T5(0,(_5J+_5D|0)+1|0,E(_5A),_5B,E(_5I),E(new T5(0,_5D,E(_5E),_5F,E(_5G),E(_5H))));}else{return new F(function(){return _3S(_5K,_5L,_5M,B(_5z(_5A,_5B,_5N,_5D,_5E,_5F,_5G,_5H)));});}}else{return new F(function(){return _4J(_5E,_5F,B(_5O(_5A,_5B,_5J,_5K,_5L,_5M,_5N,_5G)),_5H);});}}else{return new F(function(){return _5r(_5A,_5B,_5D,_5E,_5F,_5G,_5H);});}},_5O=function(_5P,_5Q,_5R,_5S,_5T,_5U,_5V,_5W){var _5X=E(_5W);if(!_5X._){var _5Y=_5X.a,_5Z=_5X.b,_60=_5X.c,_61=_5X.d,_62=_5X.e;if((imul(3,_5R)|0)>=_5Y){if((imul(3,_5Y)|0)>=_5R){return new T5(0,(_5R+_5Y|0)+1|0,E(_5P),_5Q,E(new T5(0,_5R,E(_5S),_5T,E(_5U),E(_5V))),E(_5X));}else{return new F(function(){return _3S(_5S,_5T,_5U,B(_5z(_5P,_5Q,_5V,_5Y,_5Z,_60,_61,_62)));});}}else{return new F(function(){return _4J(_5Z,_60,B(_5O(_5P,_5Q,_5R,_5S,_5T,_5U,_5V,_61)),_62);});}}else{return new F(function(){return _4A(_5P,_5Q,new T5(0,_5R,E(_5S),_5T,E(_5U),E(_5V)));});}},_63=function(_64,_65,_66,_67){var _68=E(_66);if(!_68._){var _69=_68.a,_6a=_68.b,_6b=_68.c,_6c=_68.d,_6d=_68.e,_6e=E(_67);if(!_6e._){var _6f=_6e.a,_6g=_6e.b,_6h=_6e.c,_6i=_6e.d,_6j=_6e.e;if((imul(3,_69)|0)>=_6f){if((imul(3,_6f)|0)>=_69){return new T5(0,(_69+_6f|0)+1|0,E(_64),_65,E(_68),E(_6e));}else{return new F(function(){return _3S(_6a,_6b,_6c,B(_5z(_64,_65,_6d,_6f,_6g,_6h,_6i,_6j)));});}}else{return new F(function(){return _4J(_6g,_6h,B(_5O(_64,_65,_69,_6a,_6b,_6c,_6d,_6i)),_6j);});}}else{return new F(function(){return _4A(_64,_65,_68);});}}else{return new F(function(){return _5m(_64,_65,_67);});}},_6k=function(_6l,_6m,_6n,_6o,_6p){var _6q=E(_6l);if(_6q==1){var _6r=E(_6p);if(!_6r._){return new T3(0,new T5(0,1,E(new T2(0,_6m,_6n)),_6o,E(_3N),E(_3N)),_5,_5);}else{var _6s=E(E(_6r.a).a),_6t=E(_6s.a);return (_6m>=_6t)?(_6m!=_6t)?new T3(0,new T5(0,1,E(new T2(0,_6m,_6n)),_6o,E(_3N),E(_3N)),_5,_6r):(_6n<E(_6s.b))?new T3(0,new T5(0,1,E(new T2(0,_6m,_6n)),_6o,E(_3N),E(_3N)),_6r,_5):new T3(0,new T5(0,1,E(new T2(0,_6m,_6n)),_6o,E(_3N),E(_3N)),_5,_6r):new T3(0,new T5(0,1,E(new T2(0,_6m,_6n)),_6o,E(_3N),E(_3N)),_6r,_5);}}else{var _6u=B(_6k(_6q>>1,_6m,_6n,_6o,_6p)),_6v=_6u.a,_6w=_6u.c,_6x=E(_6u.b);if(!_6x._){return new T3(0,_6v,_5,_6w);}else{var _6y=E(_6x.a),_6z=_6y.a,_6A=_6y.b,_6B=E(_6x.b);if(!_6B._){return new T3(0,new T(function(){return B(_4A(_6z,_6A,_6v));}),_5,_6w);}else{var _6C=_6B.b,_6D=E(_6B.a),_6E=_6D.b,_6F=E(_6z),_6G=E(_6D.a),_6H=_6G.b,_6I=E(_6F.a),_6J=E(_6G.a);if(_6I>=_6J){if(_6I!=_6J){return new T3(0,_6v,_5,_6x);}else{var _6K=E(_6H);if(E(_6F.b)<_6K){var _6L=B(_6k(_6q>>1,_6J,_6K,_6E,_6C));return new T3(0,new T(function(){return B(_63(_6F,_6A,_6v,_6L.a));}),_6L.b,_6L.c);}else{return new T3(0,_6v,_5,_6x);}}}else{var _6M=B(_6N(_6q>>1,_6J,_6H,_6E,_6C));return new T3(0,new T(function(){return B(_63(_6F,_6A,_6v,_6M.a));}),_6M.b,_6M.c);}}}}},_6N=function(_6O,_6P,_6Q,_6R,_6S){var _6T=E(_6O);if(_6T==1){var _6U=E(_6S);if(!_6U._){return new T3(0,new T5(0,1,E(new T2(0,_6P,_6Q)),_6R,E(_3N),E(_3N)),_5,_5);}else{var _6V=E(E(_6U.a).a),_6W=E(_6V.a);if(_6P>=_6W){if(_6P!=_6W){return new T3(0,new T5(0,1,E(new T2(0,_6P,_6Q)),_6R,E(_3N),E(_3N)),_5,_6U);}else{var _6X=E(_6Q);return (_6X<E(_6V.b))?new T3(0,new T5(0,1,E(new T2(0,_6P,_6X)),_6R,E(_3N),E(_3N)),_6U,_5):new T3(0,new T5(0,1,E(new T2(0,_6P,_6X)),_6R,E(_3N),E(_3N)),_5,_6U);}}else{return new T3(0,new T5(0,1,E(new T2(0,_6P,_6Q)),_6R,E(_3N),E(_3N)),_6U,_5);}}}else{var _6Y=B(_6N(_6T>>1,_6P,_6Q,_6R,_6S)),_6Z=_6Y.a,_70=_6Y.c,_71=E(_6Y.b);if(!_71._){return new T3(0,_6Z,_5,_70);}else{var _72=E(_71.a),_73=_72.a,_74=_72.b,_75=E(_71.b);if(!_75._){return new T3(0,new T(function(){return B(_4A(_73,_74,_6Z));}),_5,_70);}else{var _76=_75.b,_77=E(_75.a),_78=_77.b,_79=E(_73),_7a=E(_77.a),_7b=_7a.b,_7c=E(_79.a),_7d=E(_7a.a);if(_7c>=_7d){if(_7c!=_7d){return new T3(0,_6Z,_5,_71);}else{var _7e=E(_7b);if(E(_79.b)<_7e){var _7f=B(_6k(_6T>>1,_7d,_7e,_78,_76));return new T3(0,new T(function(){return B(_63(_79,_74,_6Z,_7f.a));}),_7f.b,_7f.c);}else{return new T3(0,_6Z,_5,_71);}}}else{var _7g=B(_6N(_6T>>1,_7d,_7b,_78,_76));return new T3(0,new T(function(){return B(_63(_79,_74,_6Z,_7g.a));}),_7g.b,_7g.c);}}}}},_7h=function(_7i,_7j,_7k,_7l){var _7m=E(_7l);if(!_7m._){var _7n=_7m.c,_7o=_7m.d,_7p=_7m.e,_7q=E(_7m.b),_7r=E(_7q.a);if(_7i>=_7r){if(_7i!=_7r){return new F(function(){return _3S(_7q,_7n,_7o,B(_7h(_7i,_7j,_7k,_7p)));});}else{var _7s=E(_7q.b);if(_7j>=_7s){if(_7j!=_7s){return new F(function(){return _3S(_7q,_7n,_7o,B(_7h(_7i,_7j,_7k,_7p)));});}else{return new T5(0,_7m.a,E(new T2(0,_7i,_7j)),_7k,E(_7o),E(_7p));}}else{return new F(function(){return _4J(_7q,_7n,B(_7h(_7i,_7j,_7k,_7o)),_7p);});}}}else{return new F(function(){return _4J(_7q,_7n,B(_7h(_7i,_7j,_7k,_7o)),_7p);});}}else{return new T5(0,1,E(new T2(0,_7i,_7j)),_7k,E(_3N),E(_3N));}},_7t=function(_7u,_7v,_7w,_7x){var _7y=E(_7x);if(!_7y._){var _7z=_7y.c,_7A=_7y.d,_7B=_7y.e,_7C=E(_7y.b),_7D=E(_7C.a);if(_7u>=_7D){if(_7u!=_7D){return new F(function(){return _3S(_7C,_7z,_7A,B(_7t(_7u,_7v,_7w,_7B)));});}else{var _7E=E(_7v),_7F=E(_7C.b);if(_7E>=_7F){if(_7E!=_7F){return new F(function(){return _3S(_7C,_7z,_7A,B(_7h(_7u,_7E,_7w,_7B)));});}else{return new T5(0,_7y.a,E(new T2(0,_7u,_7E)),_7w,E(_7A),E(_7B));}}else{return new F(function(){return _4J(_7C,_7z,B(_7h(_7u,_7E,_7w,_7A)),_7B);});}}}else{return new F(function(){return _4J(_7C,_7z,B(_7t(_7u,_7v,_7w,_7A)),_7B);});}}else{return new T5(0,1,E(new T2(0,_7u,_7v)),_7w,E(_3N),E(_3N));}},_7G=function(_7H,_7I,_7J,_7K){var _7L=E(_7K);if(!_7L._){var _7M=_7L.c,_7N=_7L.d,_7O=_7L.e,_7P=E(_7L.b),_7Q=E(_7H),_7R=E(_7P.a);if(_7Q>=_7R){if(_7Q!=_7R){return new F(function(){return _3S(_7P,_7M,_7N,B(_7t(_7Q,_7I,_7J,_7O)));});}else{var _7S=E(_7I),_7T=E(_7P.b);if(_7S>=_7T){if(_7S!=_7T){return new F(function(){return _3S(_7P,_7M,_7N,B(_7h(_7Q,_7S,_7J,_7O)));});}else{return new T5(0,_7L.a,E(new T2(0,_7Q,_7S)),_7J,E(_7N),E(_7O));}}else{return new F(function(){return _4J(_7P,_7M,B(_7h(_7Q,_7S,_7J,_7N)),_7O);});}}}else{return new F(function(){return _4J(_7P,_7M,B(_7t(_7Q,_7I,_7J,_7N)),_7O);});}}else{return new T5(0,1,E(new T2(0,_7H,_7I)),_7J,E(_3N),E(_3N));}},_7U=function(_7V,_7W){while(1){var _7X=E(_7W);if(!_7X._){return E(_7V);}else{var _7Y=E(_7X.a),_7Z=E(_7Y.a),_80=B(_7G(_7Z.a,_7Z.b,_7Y.b,_7V));_7V=_80;_7W=_7X.b;continue;}}},_81=function(_82,_83,_84,_85,_86){return new F(function(){return _7U(B(_7G(_83,_84,_85,_82)),_86);});},_87=function(_88,_89,_8a){var _8b=E(_89),_8c=E(_8b.a);return new F(function(){return _7U(B(_7G(_8c.a,_8c.b,_8b.b,_88)),_8a);});},_8d=function(_8e,_8f,_8g){var _8h=E(_8g);if(!_8h._){return E(_8f);}else{var _8i=E(_8h.a),_8j=_8i.a,_8k=_8i.b,_8l=E(_8h.b);if(!_8l._){return new F(function(){return _4A(_8j,_8k,_8f);});}else{var _8m=E(_8l.a),_8n=E(_8j),_8o=_8n.b,_8p=E(_8m.a),_8q=_8p.b,_8r=E(_8n.a),_8s=E(_8p.a),_8t=function(_8u){var _8v=B(_6N(_8e,_8s,_8q,_8m.b,_8l.b)),_8w=_8v.a,_8x=E(_8v.c);if(!_8x._){return new F(function(){return _8d(_8e<<1,B(_63(_8n,_8k,_8f,_8w)),_8v.b);});}else{return new F(function(){return _87(B(_63(_8n,_8k,_8f,_8w)),_8x.a,_8x.b);});}};if(_8r>=_8s){if(_8r!=_8s){return new F(function(){return _81(_8f,_8r,_8o,_8k,_8l);});}else{var _8y=E(_8o);if(_8y<E(_8q)){return new F(function(){return _8t(_);});}else{return new F(function(){return _81(_8f,_8r,_8y,_8k,_8l);});}}}else{return new F(function(){return _8t(_);});}}}},_8z=function(_8A,_8B,_8C,_8D,_8E,_8F){var _8G=E(_8F);if(!_8G._){return new F(function(){return _4A(new T2(0,_8C,_8D),_8E,_8B);});}else{var _8H=E(_8G.a),_8I=E(_8H.a),_8J=_8I.b,_8K=E(_8I.a),_8L=function(_8M){var _8N=B(_6N(_8A,_8K,_8J,_8H.b,_8G.b)),_8O=_8N.a,_8P=E(_8N.c);if(!_8P._){return new F(function(){return _8d(_8A<<1,B(_63(new T2(0,_8C,_8D),_8E,_8B,_8O)),_8N.b);});}else{return new F(function(){return _87(B(_63(new T2(0,_8C,_8D),_8E,_8B,_8O)),_8P.a,_8P.b);});}};if(_8C>=_8K){if(_8C!=_8K){return new F(function(){return _81(_8B,_8C,_8D,_8E,_8G);});}else{if(_8D<E(_8J)){return new F(function(){return _8L(_);});}else{return new F(function(){return _81(_8B,_8C,_8D,_8E,_8G);});}}}else{return new F(function(){return _8L(_);});}}},_8Q=function(_8R,_8S,_8T,_8U,_8V,_8W){var _8X=E(_8W);if(!_8X._){return new F(function(){return _4A(new T2(0,_8T,_8U),_8V,_8S);});}else{var _8Y=E(_8X.a),_8Z=E(_8Y.a),_90=_8Z.b,_91=E(_8Z.a),_92=function(_93){var _94=B(_6N(_8R,_91,_90,_8Y.b,_8X.b)),_95=_94.a,_96=E(_94.c);if(!_96._){return new F(function(){return _8d(_8R<<1,B(_63(new T2(0,_8T,_8U),_8V,_8S,_95)),_94.b);});}else{return new F(function(){return _87(B(_63(new T2(0,_8T,_8U),_8V,_8S,_95)),_96.a,_96.b);});}};if(_8T>=_91){if(_8T!=_91){return new F(function(){return _81(_8S,_8T,_8U,_8V,_8X);});}else{var _97=E(_8U);if(_97<E(_90)){return new F(function(){return _92(_);});}else{return new F(function(){return _81(_8S,_8T,_97,_8V,_8X);});}}}else{return new F(function(){return _92(_);});}}},_98=function(_99){var _9a=E(_99);if(!_9a._){return new T0(1);}else{var _9b=E(_9a.a),_9c=_9b.a,_9d=_9b.b,_9e=E(_9a.b);if(!_9e._){return new T5(0,1,E(_9c),_9d,E(_3N),E(_3N));}else{var _9f=_9e.b,_9g=E(_9e.a),_9h=_9g.b,_9i=E(_9c),_9j=E(_9g.a),_9k=_9j.b,_9l=E(_9i.a),_9m=E(_9j.a);if(_9l>=_9m){if(_9l!=_9m){return new F(function(){return _81(new T5(0,1,E(_9i),_9d,E(_3N),E(_3N)),_9m,_9k,_9h,_9f);});}else{var _9n=E(_9k);if(E(_9i.b)<_9n){return new F(function(){return _8z(1,new T5(0,1,E(_9i),_9d,E(_3N),E(_3N)),_9m,_9n,_9h,_9f);});}else{return new F(function(){return _81(new T5(0,1,E(_9i),_9d,E(_3N),E(_3N)),_9m,_9n,_9h,_9f);});}}}else{return new F(function(){return _8Q(1,new T5(0,1,E(_9i),_9d,E(_3N),E(_3N)),_9m,_9k,_9h,_9f);});}}}},_9o=function(_9p){return E(E(_9p).b);},_9q=function(_9r){return E(E(_9r).a);},_9s=function(_9t){return E(E(_9t).a);},_9u=function(_9v){return E(E(_9v).g);},_9w=new T(function(){return B(unCStr(": empty list"));}),_9x=new T(function(){return B(unCStr("Prelude."));}),_9y=function(_9z){return new F(function(){return err(B(_t(_9x,new T(function(){return B(_t(_9z,_9w));},1))));});},_9A=new T(function(){return B(unCStr("maximum"));}),_9B=new T(function(){return B(_9y(_9A));}),_9C=function(_9D,_9E){var _9F=E(_9E);if(!_9F._){return E(_9B);}else{var _9G=new T(function(){return B(_9u(_9D));}),_9H=function(_9I,_9J){while(1){var _9K=E(_9I);if(!_9K._){return E(_9J);}else{var _9L=B(A2(_9G,E(_9J),_9K.a));_9I=_9K.b;_9J=_9L;continue;}}};return new F(function(){return _9H(_9F.b,_9F.a);});}},_9M=function(_9N){var _9O=new T(function(){return B(_2r(_9s,_9N));});return new T3(1,_,new T1(0,new T2(0,new T(function(){return 1+B(_9C(_3M,B(_2r(_9q,_9O))))|0;}),new T(function(){return 1+B(_9C(_3M,B(_2r(_9o,_9O))))|0;}))),new T3(1,_,new T1(0,new T(function(){return B(_98(_9N));})),_3c));},_9P="]",_9Q="}",_9R=":",_9S=",",_9T=new T(function(){return eval("JSON.stringify");}),_9U="false",_9V="null",_9W="[",_9X="{",_9Y="\"",_9Z="true",_a0=function(_a1,_a2){var _a3=E(_a2);switch(_a3._){case 0:return new T2(0,new T(function(){return jsShow(_a3.a);}),_a1);case 1:return new T2(0,new T(function(){var _a4=__app1(E(_9T),_a3.a);return String(_a4);}),_a1);case 2:return (!E(_a3.a))?new T2(0,_9U,_a1):new T2(0,_9Z,_a1);case 3:var _a5=E(_a3.a);if(!_a5._){return new T2(0,_9W,new T2(1,_9P,_a1));}else{var _a6=new T(function(){var _a7=new T(function(){var _a8=function(_a9){var _aa=E(_a9);if(!_aa._){return E(new T2(1,_9P,_a1));}else{var _ab=new T(function(){var _ac=B(_a0(new T(function(){return B(_a8(_aa.b));}),_aa.a));return new T2(1,_ac.a,_ac.b);});return new T2(1,_9S,_ab);}};return B(_a8(_a5.b));}),_ad=B(_a0(_a7,_a5.a));return new T2(1,_ad.a,_ad.b);});return new T2(0,_9W,_a6);}break;case 4:var _ae=E(_a3.a);if(!_ae._){return new T2(0,_9X,new T2(1,_9Q,_a1));}else{var _af=E(_ae.a),_ag=new T(function(){var _ah=new T(function(){var _ai=function(_aj){var _ak=E(_aj);if(!_ak._){return E(new T2(1,_9Q,_a1));}else{var _al=E(_ak.a),_am=new T(function(){var _an=B(_a0(new T(function(){return B(_ai(_ak.b));}),_al.b));return new T2(1,_an.a,_an.b);});return new T2(1,_9S,new T2(1,_9Y,new T2(1,_al.a,new T2(1,_9Y,new T2(1,_9R,_am)))));}};return B(_ai(_ae.b));}),_ao=B(_a0(_ah,_af.b));return new T2(1,_ao.a,_ao.b);});return new T2(0,_9X,new T2(1,new T(function(){var _ap=__app1(E(_9T),E(_af.a));return String(_ap);}),new T2(1,_9R,_ag)));}break;default:return new T2(0,_9V,_a1);}},_aq=new T(function(){return toJSStr(_5);}),_ar=new T(function(){return eval("JSON.parse");}),_as=function(_at){var _au=B(_a0(_5,_at)),_av=jsCat(new T2(1,_au.a,_au.b),E(_aq)),_aw=__app1(E(_ar),_av);return E(_aw);},_ax=new T(function(){return eval("(function(s,f){Haste[s] = f;})");}),_ay=new T(function(){return eval("(function(s,f){Haste[s] = f;})");}),_az=new T(function(){return B(unCStr("Irrefutable pattern failed for pattern"));}),_aA=function(_aB){return new F(function(){return _12(new T1(0,new T(function(){return B(_1g(_aB,_az));})),_1G);});},_aC=new T(function(){return B(_aA("Main.hs:79:18-38|Just x"));}),_aD=0,_aE=new T2(0,_aD,_aD),_aF=new T2(0,_aE,_aD),_aG=1,_aH=new T2(0,_aG,_aD),_aI=new T2(0,_aH,_aG),_aJ=2,_aK=new T2(0,_aJ,_aD),_aL=new T2(0,_aK,_aJ),_aM=3,_aN=new T2(0,_aM,_aD),_aO=4,_aP=new T2(0,_aN,_aO),_aQ=new T2(0,_aD,_aG),_aR=new T2(0,_aQ,_aM),_aS=new T2(0,_aG,_aG),_aT=new T2(0,_aS,_aO),_aU=new T2(0,_aJ,_aG),_aV=5,_aW=new T2(0,_aU,_aV),_aX=new T2(0,_aM,_aG),_aY=new T2(0,_aX,_aG),_aZ=new T2(0,_aD,_aJ),_b0=6,_b1=new T2(0,_aZ,_b0),_b2=new T2(0,_aG,_aJ),_b3=7,_b4=new T2(0,_b2,_b3),_b5=new T2(0,_aJ,_aJ),_b6=8,_b7=new T2(0,_b5,_b6),_b8=new T2(0,_aM,_aJ),_b9=new T2(0,_b8,_aD),_ba=new T2(1,_b9,_5),_bb=new T2(1,_b7,_ba),_bc=new T2(1,_b4,_bb),_bd=new T2(1,_b1,_bc),_be=new T2(1,_aY,_bd),_bf=new T2(1,_aW,_be),_bg=new T2(1,_aT,_bf),_bh=new T2(1,_aR,_bg),_bi=new T2(1,_aP,_bh),_bj=new T2(1,_aL,_bi),_bk=new T2(1,_aI,_bj),_bl=new T2(1,_aF,_bk),_bm=function(_){var _bn=function(_bo,_){return new T(function(){var _bp=String(E(_bo)),_bq=jsParseJSON(toJSStr(fromJSStr(_bp)));if(!_bq._){return E(_aC);}else{var _br=E(_bq.a);if(_br._==4){if(!E(_br.a)._){return E(_1X);}else{return E(_1t);}}else{return E(_1X);}}});},_bs=__createJSFunc(2,E(_bn)),_bt=__app2(E(_ax),"tick",_bs),_bu=__app2(E(_ay),"defField",B(_as(new T1(3,E(B(_2Z(B(_9M(_bl)))))))));return new F(function(){return _1(_);});},_bv=function(_){return new F(function(){return _bm(_);});};
var hasteMain = function() {B(A(_bv, [0]));};hasteMain(); initialize();