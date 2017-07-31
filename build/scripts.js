/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*
 Highcharts JS v5.0.14 (2017-07-28)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(L,T){"object"===typeof module&&module.exports?module.exports=L.document?T(L):T:L.Highcharts=T(L)})("undefined"!==typeof window?window:this,function(L){L=function(){var a=window,y=a.document,C=a.navigator&&a.navigator.userAgent||"",E=y&&y.createElementNS&&!!y.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,D=/(edge|msie|trident)/i.test(C)&&!window.opera,q=!E,d=/Firefox/.test(C),g=d&&4>parseInt(C.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",
version:"5.0.14",deg2rad:2*Math.PI/360,doc:y,hasBidiBug:g,hasTouch:y&&void 0!==y.documentElement.ontouchstart,isMS:D,isWebKit:/AppleWebKit/.test(C),isFirefox:d,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(C),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:E,vml:q,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){var y=[],C=a.charts,E=a.doc,D=a.win;a.error=function(q,d){q=a.isNumber(q)?"Highcharts error #"+
q+": www.highcharts.com/errors/"+q:q;if(d)throw Error(q);D.console&&console.log(q)};a.Fx=function(a,d,g){this.options=d;this.elem=a;this.prop=g};a.Fx.prototype={dSetter:function(){var a=this.paths[0],d=this.paths[1],g=[],p=this.now,m=a.length,n;if(1===p)g=this.toD;else if(m===d.length&&1>p)for(;m--;)n=parseFloat(a[m]),g[m]=isNaN(n)?a[m]:p*parseFloat(d[m]-n)+n;else g=d;this.elem.attr("d",g,null,!0)},update:function(){var a=this.elem,d=this.prop,g=this.now,p=this.options.step;if(this[d+"Setter"])this[d+
"Setter"]();else a.attr?a.element&&a.attr(d,g,null,!0):a.style[d]=g+this.unit;p&&p.call(a,g,this)},run:function(a,d,g){var q=this,m=function(a){return m.stopped?!1:q.step(a)},n;this.startTime=+new Date;this.start=a;this.end=d;this.unit=g;this.now=this.start;this.pos=0;m.elem=this.elem;m.prop=this.prop;m()&&1===y.push(m)&&(m.timerId=setInterval(function(){for(n=0;n<y.length;n++)y[n]()||y.splice(n--,1);y.length||clearInterval(m.timerId)},13))},step:function(q){var d=+new Date,g,p=this.options,m=this.elem,
n=p.complete,f=p.duration,c=p.curAnim;m.attr&&!m.element?q=!1:q||d>=f+this.startTime?(this.now=this.end,this.pos=1,this.update(),g=c[this.prop]=!0,a.objectEach(c,function(a){!0!==a&&(g=!1)}),g&&n&&n.call(m),q=!1):(this.pos=p.easing((d-this.startTime)/f),this.now=this.start+(this.end-this.start)*this.pos,this.update(),q=!0);return q},initPath:function(q,d,g){function p(a){var b,e;for(k=a.length;k--;)b="M"===a[k]||"L"===a[k],e=/[a-zA-Z]/.test(a[k+3]),b&&e&&a.splice(k+1,0,a[k+1],a[k+2],a[k+1],a[k+2])}
function m(a,e){for(;a.length<u;){a[0]=e[u-a.length];var l=a.slice(0,b);[].splice.apply(a,[0,0].concat(l));F&&(l=a.slice(a.length-b),[].splice.apply(a,[a.length,0].concat(l)),k--)}a[0]="M"}function n(a,c){for(var k=(u-a.length)/b;0<k&&k--;)l=a.slice().splice(a.length/H-b,b*H),l[0]=c[u-b-k*b],e&&(l[b-6]=l[b-2],l[b-5]=l[b-1]),[].splice.apply(a,[a.length/H,0].concat(l)),F&&k--}d=d||"";var f,c=q.startX,x=q.endX,e=-1<d.indexOf("C"),b=e?7:3,u,l,k;d=d.split(" ");g=g.slice();var F=q.isArea,H=F?2:1,B;e&&(p(d),
p(g));if(c&&x){for(k=0;k<c.length;k++)if(c[k]===x[0]){f=k;break}else if(c[0]===x[x.length-c.length+k]){f=k;B=!0;break}void 0===f&&(d=[])}d.length&&a.isNumber(f)&&(u=g.length+f*H*b,B?(m(d,g),n(g,d)):(m(g,d),n(d,g)));return[d,g]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.extend=function(a,d){var g;a||(a={});for(g in d)a[g]=d[g];return a};a.merge=function(){var q,d=arguments,g,p={},m=
function(d,f){"object"!==typeof d&&(d={});a.objectEach(f,function(c,g){!a.isObject(c,!0)||a.isClass(c)||a.isDOMElement(c)?d[g]=f[g]:d[g]=m(d[g]||{},c)});return d};!0===d[0]&&(p=d[1],d=Array.prototype.slice.call(d,2));g=d.length;for(q=0;q<g;q++)p=m(p,d[q]);return p};a.pInt=function(a,d){return parseInt(a,d||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(q,
d){return!!q&&"object"===typeof q&&(!d||!a.isArray(q))};a.isDOMElement=function(q){return a.isObject(q)&&"number"===typeof q.nodeType};a.isClass=function(q){var d=q&&q.constructor;return!(!a.isObject(q,!0)||a.isDOMElement(q)||!d||!d.name||"Object"===d.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,d){for(var g=a.length;g--;)if(a[g]===d){a.splice(g,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(q,d,g){var p;a.isString(d)?a.defined(g)?
q.setAttribute(d,g):q&&q.getAttribute&&(p=q.getAttribute(d)):a.defined(d)&&a.isObject(d)&&a.objectEach(d,function(a,d){q.setAttribute(d,a)});return p};a.splat=function(q){return a.isArray(q)?q:[q]};a.syncTimeout=function(a,d,g){if(d)return setTimeout(a,d,g);a.call(0,g)};a.pick=function(){var a=arguments,d,g,p=a.length;for(d=0;d<p;d++)if(g=a[d],void 0!==g&&null!==g)return g};a.css=function(q,d){a.isMS&&!a.svg&&d&&void 0!==d.opacity&&(d.filter="alpha(opacity\x3d"+100*d.opacity+")");a.extend(q.style,
d)};a.createElement=function(q,d,g,p,m){q=E.createElement(q);var n=a.css;d&&a.extend(q,d);m&&n(q,{padding:0,border:"none",margin:0});g&&n(q,g);p&&p.appendChild(q);return q};a.extendClass=function(q,d){var g=function(){};g.prototype=new q;a.extend(g.prototype,d);return g};a.pad=function(a,d,g){return Array((d||2)+1-String(a).length).join(g||0)+a};a.relativeLength=function(a,d,g){return/%$/.test(a)?d*parseFloat(a)/100+(g||0):parseFloat(a)};a.wrap=function(a,d,g){var p=a[d];a[d]=function(){var a=Array.prototype.slice.call(arguments),
d=arguments,f=this;f.proceed=function(){p.apply(f,arguments.length?arguments:d)};a.unshift(p);a=g.apply(this,a);f.proceed=null;return a}};a.getTZOffset=function(q){var d=a.Date;return 6E4*(d.hcGetTimezoneOffset&&d.hcGetTimezoneOffset(q)||d.hcTimezoneOffset||0)};a.dateFormat=function(q,d,g){if(!a.defined(d)||isNaN(d))return a.defaultOptions.lang.invalidDate||"";q=a.pick(q,"%Y-%m-%d %H:%M:%S");var p=a.Date,m=new p(d-a.getTZOffset(d)),n=m[p.hcGetHours](),f=m[p.hcGetDay](),c=m[p.hcGetDate](),x=m[p.hcGetMonth](),
e=m[p.hcGetFullYear](),b=a.defaultOptions.lang,u=b.weekdays,l=b.shortWeekdays,k=a.pad,p=a.extend({a:l?l[f]:u[f].substr(0,3),A:u[f],d:k(c),e:k(c,2," "),w:f,b:b.shortMonths[x],B:b.months[x],m:k(x+1),y:e.toString().substr(2,2),Y:e,H:k(n),k:n,I:k(n%12||12),l:n%12||12,M:k(m[p.hcGetMinutes]()),p:12>n?"AM":"PM",P:12>n?"am":"pm",S:k(m.getSeconds()),L:k(Math.round(d%1E3),3)},a.dateFormats);a.objectEach(p,function(a,b){for(;-1!==q.indexOf("%"+b);)q=q.replace("%"+b,"function"===typeof a?a(d):a)});return g?q.substr(0,
1).toUpperCase()+q.substr(1):q};a.formatSingle=function(q,d){var g=/\.([0-9])/,p=a.defaultOptions.lang;/f$/.test(q)?(g=(g=q.match(g))?g[1]:-1,null!==d&&(d=a.numberFormat(d,g,p.decimalPoint,-1<q.indexOf(",")?p.thousandsSep:""))):d=a.dateFormat(q,d);return d};a.format=function(q,d){for(var g="{",p=!1,m,n,f,c,x=[],e;q;){g=q.indexOf(g);if(-1===g)break;m=q.slice(0,g);if(p){m=m.split(":");n=m.shift().split(".");c=n.length;e=d;for(f=0;f<c;f++)e=e[n[f]];m.length&&(e=a.formatSingle(m.join(":"),e));x.push(e)}else x.push(m);
q=q.slice(g+1);g=(p=!p)?"}":"{"}x.push(q);return x.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(q,d,g,p,m){var n,f=q;g=a.pick(g,1);n=q/g;d||(d=m?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===p&&(1===g?d=a.grep(d,function(a){return 0===a%1}):.1>=g&&(d=[1/g])));for(p=0;p<d.length&&!(f=d[p],m&&f*g>=q||!m&&n<=(d[p]+(d[p+1]||d[p]))/2);p++);return f=a.correctFloat(f*g,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=
function(a,d){var g=a.length,p,q;for(q=0;q<g;q++)a[q].safeI=q;a.sort(function(a,f){p=d(a,f);return 0===p?a.safeI-f.safeI:p});for(q=0;q<g;q++)delete a[q].safeI};a.arrayMin=function(a){for(var d=a.length,g=a[0];d--;)a[d]<g&&(g=a[d]);return g};a.arrayMax=function(a){for(var d=a.length,g=a[0];d--;)a[d]>g&&(g=a[d]);return g};a.destroyObjectProperties=function(q,d){a.objectEach(q,function(a,p){a&&a!==d&&a.destroy&&a.destroy();delete q[p]})};a.discardElement=function(q){var d=a.garbageBin;d||(d=a.createElement("div"));
q&&d.appendChild(q);d.innerHTML=""};a.correctFloat=function(a,d){return parseFloat(a.toPrecision(d||14))};a.setAnimation=function(q,d){d.renderer.globalAnimation=a.pick(q,d.options.chart.animation,!0)};a.animObject=function(q){return a.isObject(q)?a.merge(q):{duration:q?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(q,d,g,p){q=+q||0;d=+d;var m=a.defaultOptions.lang,n=(q.toString().split(".")[1]||"").split("e")[0].length,
f,c,x=q.toString().split("e");-1===d?d=Math.min(n,20):a.isNumber(d)||(d=2);c=(Math.abs(x[1]?x[0]:q)+Math.pow(10,-Math.max(d,n)-1)).toFixed(d);n=String(a.pInt(c));f=3<n.length?n.length%3:0;g=a.pick(g,m.decimalPoint);p=a.pick(p,m.thousandsSep);q=(0>q?"-":"")+(f?n.substr(0,f)+p:"");q+=n.substr(f).replace(/(\d{3})(?=\d)/g,"$1"+p);d&&(q+=g+c.slice(-d));x[1]&&(q+="e"+x[1]);return q};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(q,d,g){if("width"===d)return Math.min(q.offsetWidth,
q.scrollWidth)-a.getStyle(q,"padding-left")-a.getStyle(q,"padding-right");if("height"===d)return Math.min(q.offsetHeight,q.scrollHeight)-a.getStyle(q,"padding-top")-a.getStyle(q,"padding-bottom");if(q=D.getComputedStyle(q,void 0))q=q.getPropertyValue(d),a.pick(g,!0)&&(q=a.pInt(q));return q};a.inArray=function(a,d){return d.indexOf?d.indexOf(a):[].indexOf.call(d,a)};a.grep=function(a,d){return[].filter.call(a,d)};a.find=function(a,d){return[].find.call(a,d)};a.map=function(a,d){for(var g=[],p=0,m=
a.length;p<m;p++)g[p]=d.call(a[p],a[p],p,a);return g};a.offset=function(a){var d=E.documentElement;a=a.getBoundingClientRect();return{top:a.top+(D.pageYOffset||d.scrollTop)-(d.clientTop||0),left:a.left+(D.pageXOffset||d.scrollLeft)-(d.clientLeft||0)}};a.stop=function(a,d){for(var g=y.length;g--;)y[g].elem!==a||d&&d!==y[g].prop||(y[g].stopped=!0)};a.each=function(a,d,g){return Array.prototype.forEach.call(a,d,g)};a.objectEach=function(a,d,g){for(var p in a)a.hasOwnProperty(p)&&d.call(g,a[p],p,a)};
a.addEvent=function(q,d,g){function p(a){a.target=a.srcElement||D;g.call(q,a)}var m=q.hcEvents=q.hcEvents||{};q.addEventListener?q.addEventListener(d,g,!1):q.attachEvent&&(q.hcEventsIE||(q.hcEventsIE={}),g.hcGetKey||(g.hcGetKey=a.uniqueKey()),q.hcEventsIE[g.hcGetKey]=p,q.attachEvent("on"+d,p));m[d]||(m[d]=[]);m[d].push(g);return function(){a.removeEvent(q,d,g)}};a.removeEvent=function(q,d,g){function p(a,e){q.removeEventListener?q.removeEventListener(a,e,!1):q.attachEvent&&(e=q.hcEventsIE[e.hcGetKey],
q.detachEvent("on"+a,e))}function m(){var c,e;q.nodeName&&(d?(c={},c[d]=!0):c=f,a.objectEach(c,function(a,c){if(f[c])for(e=f[c].length;e--;)p(c,f[c][e])}))}var n,f=q.hcEvents,c;f&&(d?(n=f[d]||[],g?(c=a.inArray(g,n),-1<c&&(n.splice(c,1),f[d]=n),p(d,g)):(m(),f[d]=[])):(m(),q.hcEvents={}))};a.fireEvent=function(q,d,g,p){var m;m=q.hcEvents;var n,f;g=g||{};if(E.createEvent&&(q.dispatchEvent||q.fireEvent))m=E.createEvent("Events"),m.initEvent(d,!0,!0),a.extend(m,g),q.dispatchEvent?q.dispatchEvent(m):q.fireEvent(d,
m);else if(m)for(m=m[d]||[],n=m.length,g.target||a.extend(g,{preventDefault:function(){g.defaultPrevented=!0},target:q,type:d}),d=0;d<n;d++)(f=m[d])&&!1===f.call(q,g)&&g.preventDefault();p&&!g.defaultPrevented&&p(g)};a.animate=function(q,d,g){var p,m="",n,f,c;a.isObject(g)||(c=arguments,g={duration:c[2],easing:c[3],complete:c[4]});a.isNumber(g.duration)||(g.duration=400);g.easing="function"===typeof g.easing?g.easing:Math[g.easing]||Math.easeInOutSine;g.curAnim=a.merge(d);a.objectEach(d,function(c,
e){a.stop(q,e);f=new a.Fx(q,g,e);n=null;"d"===e?(f.paths=f.initPath(q,q.d,d.d),f.toD=d.d,p=0,n=1):q.attr?p=q.attr(e):(p=parseFloat(a.getStyle(q,e))||0,"opacity"!==e&&(m="px"));n||(n=c);n&&n.match&&n.match("px")&&(n=n.replace(/px/g,""));f.run(p,n,m)})};a.seriesType=function(q,d,g,p,m){var n=a.getOptions(),f=a.seriesTypes;n.plotOptions[q]=a.merge(n.plotOptions[d],g);f[q]=a.extendClass(f[d]||function(){},p);f[q].prototype.type=q;m&&(f[q].prototype.pointClass=a.extendClass(a.Point,m));return f[q]};a.uniqueKey=
function(){var a=Math.random().toString(36).substring(2,9),d=0;return function(){return"highcharts-"+a+"-"+d++}}();D.jQuery&&(D.jQuery.fn.highcharts=function(){var q=[].slice.call(arguments);if(this[0])return q[0]?(new (a[a.isString(q[0])?q.shift():"Chart"])(this[0],q[0],q[1]),this):C[a.attr(this[0],"data-highcharts-chart")]});E&&!E.defaultView&&(a.getStyle=function(q,d){var g={width:"clientWidth",height:"clientHeight"}[d];if(q.style[d])return a.pInt(q.style[d]);"opacity"===d&&(d="filter");if(g)return q.style.zoom=
1,Math.max(q[g]-2*a.getStyle(q,"padding"),0);q=q.currentStyle[d.replace(/\-(\w)/g,function(a,d){return d.toUpperCase()})];"filter"===d&&(q=q.replace(/alpha\(opacity=([0-9]+)\)/,function(a,d){return d/100}));return""===q?1:a.pInt(q)});Array.prototype.forEach||(a.each=function(a,d,g){for(var p=0,m=a.length;p<m;p++)if(!1===d.call(g,a[p],p,a))return p});Array.prototype.indexOf||(a.inArray=function(a,d){var g,p=0;if(d)for(g=d.length;p<g;p++)if(d[p]===a)return p;return-1});Array.prototype.filter||(a.grep=
function(a,d){for(var g=[],p=0,m=a.length;p<m;p++)d(a[p],p)&&g.push(a[p]);return g});Array.prototype.find||(a.find=function(a,d){var g,p=a.length;for(g=0;g<p;g++)if(d(a[g],g))return a[g]})})(L);(function(a){var y=a.each,C=a.isNumber,E=a.map,D=a.merge,q=a.pInt;a.Color=function(d){if(!(this instanceof a.Color))return new a.Color(d);this.init(d)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[q(a[1]),
q(a[2]),q(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[q(a[1]),q(a[2]),q(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(d){var g,p,m,n;if((this.input=d=this.names[d&&d.toLowerCase?d.toLowerCase():""]||d)&&d.stops)this.stops=E(d.stops,function(d){return new a.Color(d[1])});else if(d&&"#"===d.charAt()&&(g=d.length,d=parseInt(d.substr(1),16),7===g?p=[(d&16711680)>>16,(d&65280)>>
8,d&255,1]:4===g&&(p=[(d&3840)>>4|(d&3840)>>8,(d&240)>>4|d&240,(d&15)<<4|d&15,1])),!p)for(m=this.parsers.length;m--&&!p;)n=this.parsers[m],(g=n.regex.exec(d))&&(p=n.parse(g));this.rgba=p||[]},get:function(a){var d=this.input,p=this.rgba,m;this.stops?(m=D(d),m.stops=[].concat(m.stops),y(this.stops,function(d,f){m.stops[f]=[m.stops[f][0],d.get(a)]})):m=p&&C(p[0])?"rgb"===a||!a&&1===p[3]?"rgb("+p[0]+","+p[1]+","+p[2]+")":"a"===a?p[3]:"rgba("+p.join(",")+")":d;return m},brighten:function(a){var d,p=this.rgba;
if(this.stops)y(this.stops,function(d){d.brighten(a)});else if(C(a)&&0!==a)for(d=0;3>d;d++)p[d]+=q(255*a),0>p[d]&&(p[d]=0),255<p[d]&&(p[d]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,g){var d,m;a.rgba.length?(d=this.rgba,a=a.rgba,m=1!==a[3]||1!==d[3],a=(m?"rgba(":"rgb(")+Math.round(a[0]+(d[0]-a[0])*(1-g))+","+Math.round(a[1]+(d[1]-a[1])*(1-g))+","+Math.round(a[2]+(d[2]-a[2])*(1-g))+(m?","+(a[3]+(d[3]-a[3])*(1-g)):"")+")"):a=a.input||"none";return a}};a.color=
function(d){return new a.Color(d)}})(L);(function(a){var y,C,E=a.addEvent,D=a.animate,q=a.attr,d=a.charts,g=a.color,p=a.css,m=a.createElement,n=a.defined,f=a.deg2rad,c=a.destroyObjectProperties,x=a.doc,e=a.each,b=a.extend,u=a.erase,l=a.grep,k=a.hasTouch,F=a.inArray,H=a.isArray,B=a.isFirefox,I=a.isMS,r=a.isObject,G=a.isString,w=a.isWebKit,A=a.merge,v=a.noop,J=a.objectEach,h=a.pick,t=a.pInt,M=a.removeEvent,K=a.splat,N=a.stop,O=a.svg,Q=a.SVG_NS,R=a.symbolSizes,P=a.win;y=a.SVGElement=function(){return this};
b(y.prototype,{opacity:1,SVG_NS:Q,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),init:function(a,h){this.element="span"===h?m(h):x.createElementNS(this.SVG_NS,h);this.renderer=a},animate:function(z,t,b){t=a.animObject(h(t,this.renderer.globalAnimation,!0));0!==t.duration?(b&&(t.complete=b),D(this,z,t)):(this.attr(z,null,b),t.step&&t.step.call(this));return this},colorGradient:function(z,h,t){var b=
this.renderer,c,l,k,d,f,w,g,v,u,S,r=[],K;z.radialGradient?l="radialGradient":z.linearGradient&&(l="linearGradient");l&&(k=z[l],f=b.gradients,g=z.stops,S=t.radialReference,H(k)&&(z[l]=k={x1:k[0],y1:k[1],x2:k[2],y2:k[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===l&&S&&!n(k.gradientUnits)&&(d=k,k=A(k,b.getRadialAttr(S,d),{gradientUnits:"userSpaceOnUse"})),J(k,function(a,z){"id"!==z&&r.push(z,a)}),J(g,function(a){r.push(a)}),r=r.join(","),f[r]?S=f[r].attr("id"):(k.id=S=a.uniqueKey(),f[r]=w=b.createElement(l).attr(k).add(b.defs),
w.radAttr=d,w.stops=[],e(g,function(z){0===z[1].indexOf("rgba")?(c=a.color(z[1]),v=c.get("rgb"),u=c.get("a")):(v=z[1],u=1);z=b.createElement("stop").attr({offset:z[0],"stop-color":v,"stop-opacity":u}).add(w);w.stops.push(z)})),K="url("+b.url+"#"+S+")",t.setAttribute(h,K),t.gradient=r,z.toString=function(){return K})},applyTextOutline:function(z){var h=this.element,t,b,c,l,k;-1!==z.indexOf("contrast")&&(z=z.replace(/contrast/g,this.renderer.getContrast(h.style.fill)));z=z.split(" ");b=z[z.length-1];
if((c=z[0])&&"none"!==c&&a.svg){this.fakeTS=!0;z=[].slice.call(h.getElementsByTagName("tspan"));this.ySetter=this.xSetter;c=c.replace(/(^[\d\.]+)(.*?)$/g,function(a,z,h){return 2*z+h});for(k=z.length;k--;)t=z[k],"highcharts-text-outline"===t.getAttribute("class")&&u(z,h.removeChild(t));l=h.firstChild;e(z,function(a,z){0===z&&(a.setAttribute("x",h.getAttribute("x")),z=h.getAttribute("y"),a.setAttribute("y",z||0),null===z&&h.setAttribute("y",0));a=a.cloneNode(1);q(a,{"class":"highcharts-text-outline",
fill:b,stroke:b,"stroke-width":c,"stroke-linejoin":"round"});h.insertBefore(a,l)})}},attr:function(a,h,t,b){var z,e=this.element,c,l=this,k,d;"string"===typeof a&&void 0!==h&&(z=a,a={},a[z]=h);"string"===typeof a?l=(this[a+"Getter"]||this._defaultGetter).call(this,a,e):(J(a,function(z,h){k=!1;b||N(this,h);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h)&&(c||(this.symbolAttr(a),c=!0),k=!0);!this.rotation||"x"!==h&&"y"!==h||(this.doTransform=!0);k||(d=this[h+"Setter"]||
this._defaultSetter,d.call(this,z,h,e))},this),this.afterSetters());t&&t();return l},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},addClass:function(a,h){var z=this.attr("class")||"";-1===z.indexOf(a)&&(h||(a=(z+(z?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==F(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var z=
this;e("x y r start end width height innerR anchorX anchorY".split(" "),function(t){z[t]=h(a[t],z[t])});z.attr({d:z.renderer.symbols[z.symbolName](z.x,z.y,z.width,z.height,z)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,h){var z=this,t={},b;h=h||a.strokeWidth||0;b=Math.round(h)%2/2;a.x=Math.floor(a.x||z.x||0)+b;a.y=Math.floor(a.y||z.y||0)+b;a.width=Math.floor((a.width||z.width||0)-2*b);a.height=Math.floor((a.height||z.height||0)-
2*b);n(a.strokeWidth)&&(a.strokeWidth=h);J(a,function(a,h){z[h]!==a&&(z[h]=t[h]=a)});return t},css:function(a){var h=this.styles,z={},e=this.element,c,k="",l,d=!h,f=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);h&&J(a,function(a,t){a!==h[t]&&(z[t]=a,d=!0)});d&&(h&&(a=b(h,z)),c=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===e.nodeName.toLowerCase()&&t(a.width),this.styles=a,c&&!O&&this.renderer.forExport&&delete a.width,I&&!O?p(this.element,a):(l=function(a,h){return"-"+
h.toLowerCase()},J(a,function(a,h){-1===F(h,f)&&(k+=h.replace(/([A-Z])/g,l)+":"+a+";")}),k&&q(e,"style",k)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},getStyle:function(a){return P.getComputedStyle(this.element||this,"").getPropertyValue(a)},strokeWidth:function(){var a=this.getStyle("stroke-width"),h;a.indexOf("px")===a.length-2?a=t(a):(h=x.createElementNS(Q,"rect"),q(h,{width:a,"stroke-width":0}),
this.element.parentNode.appendChild(h),a=h.getBBox().width,h.parentNode.removeChild(h));return a},on:function(a,h){var z=this,t=z.element;k&&"click"===a?(t.ontouchstart=function(a){z.touchEventFired=Date.now();a.preventDefault();h.call(t,a)},t.onclick=function(a){(-1===P.navigator.userAgent.indexOf("Android")||1100<Date.now()-(z.touchEventFired||0))&&h.call(t,a)}):t["on"+a]=h;return this},setRadialReference:function(a){var h=this.renderer.gradients[this.element.gradient];this.element.radialReference=
a;h&&h.radAttr&&h.animate(this.renderer.getRadialAttr(a,h.radAttr));return this},translate:function(a,h){return this.attr({translateX:a,translateY:h})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,t=this.translateY||0,b=this.scaleX,e=this.scaleY,c=this.inverted,k=this.rotation,l=this.element;c&&(a+=this.width,t+=this.height);a=["translate("+a+","+t+")"];c?a.push("rotate(90) scale(-1,1)"):k&&a.push("rotate("+k+" "+(l.getAttribute("x")||
0)+" "+(l.getAttribute("y")||0)+")");(n(b)||n(e))&&a.push("scale("+h(b,1)+" "+h(e,1)+")");a.length&&l.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,t,b){var z,e,c,k,l={};e=this.renderer;c=e.alignedObjects;var d,f;if(a){if(this.alignOptions=a,this.alignByTranslate=t,!b||G(b))this.alignTo=z=b||"renderer",u(c,this),c.push(this),b=null}else a=this.alignOptions,t=this.alignByTranslate,z=this.alignTo;b=h(b,e[z],e);
z=a.align;e=a.verticalAlign;c=(b.x||0)+(a.x||0);k=(b.y||0)+(a.y||0);"right"===z?d=1:"center"===z&&(d=2);d&&(c+=(b.width-(a.width||0))/d);l[t?"translateX":"x"]=Math.round(c);"bottom"===e?f=1:"middle"===e&&(f=2);f&&(k+=(b.height-(a.height||0))/f);l[t?"translateY":"y"]=Math.round(k);this[this.placed?"animate":"attr"](l);this.placed=!0;this.alignAttr=l;return this},getBBox:function(a,t){var z,c=this.renderer,l,k=this.element,d=this.styles,w,g=this.textStr,v,u=c.cache,r=c.cacheKeys,A;t=h(t,this.rotation);
l=t*f;w=k&&y.prototype.getStyle.call(k,"font-size");void 0!==g&&(A=g.toString(),-1===A.indexOf("\x3c")&&(A=A.replace(/[0-9]/g,"0")),A+=["",t||0,w,d&&d.width,d&&d.textOverflow].join());A&&!a&&(z=u[A]);if(!z){if(k.namespaceURI===this.SVG_NS||c.forExport){try{(v=this.fakeTS&&function(a){e(k.querySelectorAll(".highcharts-text-outline"),function(h){h.style.display=a})})&&v("none"),z=k.getBBox?b({},k.getBBox()):{width:k.offsetWidth,height:k.offsetHeight},v&&v("")}catch(V){}if(!z||0>z.width)z={width:0,height:0}}else z=
this.htmlGetBBox();c.isSVG&&(a=z.width,c=z.height,d&&"11px"===d.fontSize&&17===Math.round(c)&&(z.height=c=14),t&&(z.width=Math.abs(c*Math.sin(l))+Math.abs(a*Math.cos(l)),z.height=Math.abs(c*Math.cos(l))+Math.abs(a*Math.sin(l))));if(A&&0<z.height){for(;250<r.length;)delete u[r.shift()];u[A]||r.push(A);u[A]=z}}return z},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var h=this;h.animate({opacity:0},
{duration:a||150,complete:function(){h.attr({y:-9999})}})},add:function(a){var h=this.renderer,z=this.element,t;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&h.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)t=this.zIndexSetter();t||(a?a.element:h.box).appendChild(z);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var h=a.parentNode;h&&h.removeChild(a)},destroy:function(){var a=this,h=a.element||{},t=a.renderer.isSVG&&"SPAN"===h.nodeName&&
a.parentGroup,b=h.ownerSVGElement;h.onclick=h.onmouseout=h.onmouseover=h.onmousemove=h.point=null;N(a);a.clipPath&&b&&(e(b.querySelectorAll("[clip-path]"),function(h){-1<h.getAttribute("clip-path").indexOf(a.clipPath.element.id+")")&&h.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(b=0;b<a.stops.length;b++)a.stops[b]=a.stops[b].destroy();a.stops=null}for(a.safeRemoveChild(h);t&&t.div&&0===t.div.childNodes.length;)h=t.parentGroup,a.safeRemoveChild(t.div),delete t.div,
t=h;a.alignTo&&u(a.renderer.alignedObjects,a);J(a,function(h,t){delete a[t]});return null},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=h(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,h,t){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[h]!==a&&(t.setAttribute(h,a),this[h]=a)},alignSetter:function(a){this.element.setAttribute("text-anchor",
{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,h,t){this[h]=a;t.setAttribute(h,a)},titleSetter:function(a){var t=this.element.getElementsByTagName("title")[0];t||(t=x.createElementNS(this.SVG_NS,"title"),this.element.appendChild(t));t.firstChild&&t.removeChild(t.firstChild);t.appendChild(x.createTextNode(String(h(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,
h,t){"string"===typeof a?t.setAttribute(h,a):a&&this.colorGradient(a,h,t)},visibilitySetter:function(a,h,t){"inherit"===a?t.removeAttribute(h):this[h]!==a&&t.setAttribute(h,a);this[h]=a},zIndexSetter:function(a,h){var b=this.renderer,z=this.parentGroup,e=(z||b).element||b.box,c,k=this.element,l;c=this.added;var d;n(a)&&(k.zIndex=a,a=+a,this[h]===a&&(c=!1),this[h]=a);if(c){(a=this.zIndex)&&z&&(z.handleZ=!0);h=e.childNodes;for(d=0;d<h.length&&!l;d++)z=h[d],c=z.zIndex,z!==k&&(t(c)>a||!n(a)&&n(c)||0>
a&&!n(c)&&e!==b.box)&&(e.insertBefore(k,z),l=!0);l||e.appendChild(k)}return l},_defaultSetter:function(a,h,t){t.setAttribute(h,a)}});y.prototype.yGetter=y.prototype.xGetter;y.prototype.translateXSetter=y.prototype.translateYSetter=y.prototype.rotationSetter=y.prototype.verticalAlignSetter=y.prototype.scaleXSetter=y.prototype.scaleYSetter=function(a,h){this[h]=a;this.doTransform=!0};C=a.SVGRenderer=function(){this.init.apply(this,arguments)};b(C.prototype,{Element:y,SVG_NS:Q,init:function(a,h,t,b,
e,c){var z;b=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"});z=b.element;a.appendChild(z);-1===a.innerHTML.indexOf("xmlns")&&q(z,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=z;this.boxWrapper=b;this.alignedObjects=[];this.url=(B||w)&&x.getElementsByTagName("base").length?P.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(x.createTextNode("Created with Highcharts 5.0.14"));
this.defs=this.createElement("defs").add();this.allowHTML=c;this.forExport=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(h,t,!1);var k;B&&a.getBoundingClientRect&&(h=function(){p(a,{left:0,top:0});k=a.getBoundingClientRect();p(a,{left:Math.ceil(k.left)-k.left+"px",top:Math.ceil(k.top)-k.top+"px"})},h(),this.unSubPixelFix=E(P,"resize",h))},definition:function(a){function h(a,b){var z;e(K(a),function(a){var e=t.createElement(a.tagName),c={};J(a,function(a,h){"tagName"!==
h&&"children"!==h&&"textContent"!==h&&(c[h]=a)});e.attr(c);e.add(b||t.defs);a.textContent&&e.element.appendChild(x.createTextNode(a.textContent));h(a.children||[],e);z=e});return z}var t=this;return h(a)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();c(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var h=
new this.Element;h.init(this,a);return h},draw:v,getRadialAttr:function(a,h){return{cx:a[0]-a[2]/2+h.cx*a[2],cy:a[1]-a[2]/2+h.cy*a[2],r:h.r*a[2]}},getSpanWidth:function(a,h){var t=a.getBBox(!0).width;!O&&this.forExport&&(t=this.measureSpanWidth(h.firstChild.data,a.styles));return t},applyEllipsis:function(a,h,t,b){var e=a.rotation,z=t,c,k=0,l=t.length,d=function(a){h.removeChild(h.firstChild);a&&h.appendChild(x.createTextNode(a))},f;a.rotation=0;z=this.getSpanWidth(a,h);if(f=z>b){for(;k<=l;)c=Math.ceil((k+
l)/2),z=t.substring(0,c)+"\u2026",d(z),z=this.getSpanWidth(a,h),k===l?k=l+1:z>b?l=c-1:k=c;0===l&&d("")}a.rotation=e;return f},buildText:function(a){var b=a.element,c=this,k=c.forExport,z=h(a.textStr,"").toString(),d=-1!==z.indexOf("\x3c"),f=b.childNodes,w,g,v,u,r=q(b,"x"),A=a.styles,n=a.textWidth,K=A&&A.lineHeight,M=A&&A.textOutline,B=A&&"ellipsis"===A.textOverflow,I=A&&"nowrap"===A.whiteSpace,F,m=f.length,N=n&&!a.added&&this.box,R=function(a){return K?t(K):c.fontMetrics(void 0,a.getAttribute("style")?
a:b).h},A=[z,B,I,K,M,A&&A.fontSize,n].join();if(A!==a.textCache){for(a.textCache=A;m--;)b.removeChild(f[m]);d||M||B||n||-1!==z.indexOf(" ")?(w=/<.*class="([^"]+)".*>/,g=/<.*style="([^"]+)".*>/,v=/<.*href="([^"]+)".*>/,N&&N.appendChild(b),z=d?z.replace(/<(b|strong)>/g,'\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g,'\x3cspan class\x3d"highcharts-emphasized"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[z],z=l(z,function(a){return""!==
a}),e(z,function(h,t){var z,l=0;h=h.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");z=h.split("|||");e(z,function(h){if(""!==h||1===z.length){var e={},d=x.createElementNS(c.SVG_NS,"tspan"),f,A;w.test(h)&&(f=h.match(w)[1],q(d,"class",f));g.test(h)&&(A=h.match(g)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),q(d,"style",A));v.test(h)&&!k&&(q(d,"onclick",'location.href\x3d"'+h.match(v)[1]+'"'),p(d,{cursor:"pointer"}));h=(h.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,
"\x3c").replace(/&gt;/g,"\x3e");if(" "!==h){d.appendChild(x.createTextNode(h));l?e.dx=0:t&&null!==r&&(e.x=r);q(d,e);b.appendChild(d);!l&&F&&(!O&&k&&p(d,{display:"block"}),q(d,"dy",R(d)));if(n){e=h.replace(/([^\^])-/g,"$1- ").split(" ");f=1<z.length||t||1<e.length&&!I;var K=[],M,m=R(d),N=a.rotation;for(B&&(u=c.applyEllipsis(a,d,h,n));!B&&f&&(e.length||K.length);)a.rotation=0,M=c.getSpanWidth(a,d),h=M>n,void 0===u&&(u=h),h&&1!==e.length?(d.removeChild(d.firstChild),K.unshift(e.pop())):(e=K,K=[],e.length&&
!I&&(d=x.createElementNS(Q,"tspan"),q(d,{dy:m,x:r}),A&&q(d,"style",A),b.appendChild(d)),M>n&&(n=M)),e.length&&d.appendChild(x.createTextNode(e.join(" ").replace(/- /g,"-")));a.rotation=N}l++}}});F=F||b.childNodes.length}),u&&a.attr("title",a.textStr),N&&N.removeChild(b),M&&a.applyTextOutline&&a.applyTextOutline(M)):b.appendChild(x.createTextNode(z.replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=g(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,
h,t,b,e,c,k,l,d){var z=this.label(a,h,t,d,null,null,null,null,"button"),f=0;z.attr(A({padding:8,r:2},e));E(z.element,I?"mouseover":"mouseenter",function(){3!==f&&z.setState(1)});E(z.element,I?"mouseout":"mouseleave",function(){3!==f&&z.setState(f)});z.setState=function(a){1!==a&&(z.state=f=a);z.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0])};return z.on("click",function(a){3!==f&&b.call(z,a)})},crispLine:function(a,
h){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-h%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+h%2/2);return a},path:function(a){var h={};H(a)?h.d=a:r(a)&&b(h,a);return this.createElement("path").attr(h)},circle:function(a,h,t){a=r(a)?a:{x:a,y:h,r:t};h=this.createElement("circle");h.xSetter=h.ySetter=function(a,h,t){t.setAttribute("c"+h,a)};return h.attr(a)},arc:function(a,h,t,b,e,c){r(a)?(b=a,h=b.y,t=b.r,a=b.x):b={innerR:b,start:e,end:c};a=this.symbol("arc",a,h,t,t,b);a.r=t;return a},rect:function(a,
h,t,b,e,c){e=r(a)?a.r:e;c=this.createElement("rect");a=r(a)?a:void 0===a?{}:{x:a,y:h,width:Math.max(t,0),height:Math.max(b,0)};e&&(a.r=e);c.rSetter=function(a,h,t){q(t,{rx:a,ry:a})};return c.attr(a)},setSize:function(a,t,b){var e=this.alignedObjects,c=e.length;this.width=a;this.height=t;for(this.boxWrapper.animate({width:a,height:t},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:h(b,!0)?void 0:0});c--;)e[c].align()},g:function(a){var h=this.createElement("g");
return a?h.attr({"class":"highcharts-"+a}):h},image:function(a,h,t,e,c){var k={preserveAspectRatio:"none"};1<arguments.length&&b(k,{x:h,y:t,width:e,height:c});k=this.createElement("image").attr(k);k.element.setAttributeNS?k.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):k.element.setAttribute("hc-svg-href",a);return k},symbol:function(a,t,c,k,l,f){var z=this,w,g=/^url\((.*?)\)$/,A=g.test(a),u=!A&&(this.symbols[a]?a:"circle"),v=u&&this.symbols[u],r=n(t)&&v&&v.call(this.symbols,Math.round(t),
Math.round(c),k,l,f),K,Q;v?(w=this.path(r),b(w,{symbolName:u,x:t,y:c,width:k,height:l}),f&&b(w,f)):A&&(K=a.match(g)[1],w=this.image(K),w.imgwidth=h(R[K]&&R[K].width,f&&f.width),w.imgheight=h(R[K]&&R[K].height,f&&f.height),Q=function(){w.attr({width:w.width,height:w.height})},e(["width","height"],function(a){w[a+"Setter"]=function(a,h){var t={},b=this["img"+h],e="width"===h?"translateX":"translateY";this[h]=a;n(b)&&(this.element&&this.element.setAttribute(h,b),this.alignByTranslate||(t[e]=((this[h]||
0)-b)/2,this.attr(t)))}}),n(t)&&w.attr({x:t,y:c}),w.isImg=!0,n(w.imgwidth)&&n(w.imgheight)?Q():(w.attr({width:0,height:0}),m("img",{onload:function(){var a=d[z.chartIndex];0===this.width&&(p(this,{position:"absolute",top:"-999em"}),x.body.appendChild(this));R[K]={width:this.width,height:this.height};w.imgwidth=this.width;w.imgheight=this.height;w.element&&Q();this.parentNode&&this.parentNode.removeChild(this);z.imgCount--;if(!z.imgCount&&a&&a.onload)a.onload()},src:K}),this.imgCount++));return w},
symbols:{circle:function(a,h,t,b){return this.arc(a+t/2,h+b/2,t/2,b/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,h,t,b){return["M",a,h,"L",a+t,h,a+t,h+b,a,h+b,"Z"]},triangle:function(a,h,t,b){return["M",a+t/2,h,"L",a+t,h+b,a,h+b,"Z"]},"triangle-down":function(a,h,t,b){return["M",a,h,"L",a+t,h,a+t/2,h+b,"Z"]},diamond:function(a,h,t,b){return["M",a+t/2,h,"L",a+t,h+b/2,a+t/2,h+b,a,h+b/2,"Z"]},arc:function(a,t,b,e,c){var k=c.start,l=c.r||b,d=c.r||e||b,f=c.end-.001;b=c.innerR;e=h(c.open,.001>
Math.abs(c.end-c.start-2*Math.PI));var w=Math.cos(k),z=Math.sin(k),g=Math.cos(f),f=Math.sin(f);c=.001>c.end-k-Math.PI?0:1;l=["M",a+l*w,t+d*z,"A",l,d,0,c,1,a+l*g,t+d*f];n(b)&&l.push(e?"M":"L",a+b*g,t+b*f,"A",b,b,0,c,0,a+b*w,t+b*z);l.push(e?"":"Z");return l},callout:function(a,h,t,b,e){var c=Math.min(e&&e.r||0,t,b),k=c+6,l=e&&e.anchorX;e=e&&e.anchorY;var d;d=["M",a+c,h,"L",a+t-c,h,"C",a+t,h,a+t,h,a+t,h+c,"L",a+t,h+b-c,"C",a+t,h+b,a+t,h+b,a+t-c,h+b,"L",a+c,h+b,"C",a,h+b,a,h+b,a,h+b-c,"L",a,h+c,"C",a,
h,a,h,a+c,h];l&&l>t?e>h+k&&e<h+b-k?d.splice(13,3,"L",a+t,e-6,a+t+6,e,a+t,e+6,a+t,h+b-c):d.splice(13,3,"L",a+t,b/2,l,e,a+t,b/2,a+t,h+b-c):l&&0>l?e>h+k&&e<h+b-k?d.splice(33,3,"L",a,e+6,a-6,e,a,e-6,a,h+c):d.splice(33,3,"L",a,b/2,l,e,a,b/2,a,h+c):e&&e>b&&l>a+k&&l<a+t-k?d.splice(23,3,"L",l+6,h+b,l,h+b+6,l-6,h+b,a+c,h+b):e&&0>e&&l>a+k&&l<a+t-k&&d.splice(3,3,"L",l-6,h,l,h-6,l+6,h,t-c,h);return d}},clipRect:function(h,t,b,e){var c=a.uniqueKey(),k=this.createElement("clipPath").attr({id:c}).add(this.defs);
h=this.rect(h,t,b,e,0).add(k);h.id=c;h.clipPath=k;h.count=0;return h},text:function(a,h,t,b){var e=!O&&this.forExport,c={};if(b&&(this.allowHTML||!this.forExport))return this.html(a,h,t);c.x=Math.round(h||0);t&&(c.y=Math.round(t));if(a||0===a)c.text=a;a=this.createElement("text").attr(c);e&&a.css({position:"absolute"});b||(a.xSetter=function(a,h,t){var b=t.getElementsByTagName("tspan"),e,c=t.getAttribute(h),k;for(k=0;k<b.length;k++)e=b[k],e.getAttribute(h)===c&&e.setAttribute(h,a);t.setAttribute(h,
a)});return a},fontMetrics:function(a,h){a=h&&y.prototype.getStyle.call(h,"font-size");a=/px/.test(a)?t(a):/em/.test(a)?parseFloat(a)*(h?this.fontMetrics(null,h.parentNode).f:16):12;h=24>a?a+3:Math.round(1.2*a);return{h:h,b:Math.round(.8*h),f:a}},rotCorr:function(a,h,t){var b=a;h&&t&&(b=Math.max(b*Math.cos(h*f),4));return{x:-a/3*Math.sin(h*f),y:b}},label:function(h,t,c,k,l,d,f,w,g){var u=this,v=u.g("button"!==g&&"label"),r=v.text=u.text("",0,0,f).attr({zIndex:1}),K,z,x=0,Q=3,B=0,p,I,F,m,N,q={},R,
H=/^url\((.*?)\)$/.test(k),J=H,G,O,P,S;g&&v.addClass("highcharts-"+g);J=!0;G=function(){return K.strokeWidth()%2/2};O=function(){var a=r.element.style,h={};z=(void 0===p||void 0===I||N)&&n(r.textStr)&&r.getBBox();v.width=(p||z.width||0)+2*Q+B;v.height=(I||z.height||0)+2*Q;R=Q+u.fontMetrics(a&&a.fontSize,r).b;J&&(K||(v.box=K=u.symbols[k]||H?u.symbol(k):u.rect(),K.addClass(("button"===g?"":"highcharts-label-box")+(g?" highcharts-"+g+"-box":"")),K.add(v),a=G(),h.x=a,h.y=(w?-R:0)+a),h.width=Math.round(v.width),
h.height=Math.round(v.height),K.attr(b(h,q)),q={})};P=function(){var a=B+Q,h;h=w?0:R;n(p)&&z&&("center"===N||"right"===N)&&(a+={center:.5,right:1}[N]*(p-z.width));if(a!==r.x||h!==r.y)r.attr("x",a),void 0!==h&&r.attr("y",h);r.x=a;r.y=h};S=function(a,h){K?K.attr(a,h):q[a]=h};v.onAdd=function(){r.add(v);v.attr({text:h||0===h?h:"",x:t,y:c});K&&n(l)&&v.attr({anchorX:l,anchorY:d})};v.widthSetter=function(h){p=a.isNumber(h)?h:null};v.heightSetter=function(a){I=a};v["text-alignSetter"]=function(a){N=a};v.paddingSetter=
function(a){n(a)&&a!==Q&&(Q=v.padding=a,P())};v.paddingLeftSetter=function(a){n(a)&&a!==B&&(B=a,P())};v.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==x&&(x=a,z&&v.attr({x:F}))};v.textSetter=function(a){void 0!==a&&r.textSetter(a);O();P()};v["stroke-widthSetter"]=function(a,h){a&&(J=!0);this["stroke-width"]=a;S(h,a)};v.rSetter=function(a,h){S(h,a)};v.anchorXSetter=function(a,h){l=v.anchorX=a;S(h,Math.round(a)-G()-F)};v.anchorYSetter=function(a,h){d=v.anchorY=a;S(h,a-m)};v.xSetter=function(a){v.x=
a;x&&(a-=x*((p||z.width)+2*Q));F=Math.round(a);v.attr("translateX",F)};v.ySetter=function(a){m=v.y=Math.round(a);v.attr("translateY",m)};var U=v.css;return b(v,{css:function(a){if(a){var h={};a=A(a);e(v.textProps,function(t){void 0!==a[t]&&(h[t]=a[t],delete a[t])});r.css(h)}return U.call(v,a)},getBBox:function(){return{width:z.width+2*Q,height:z.height+2*Q,x:z.x-Q,y:z.y-Q}},destroy:function(){M(v.element,"mouseenter");M(v.element,"mouseleave");r&&(r=r.destroy());K&&(K=K.destroy());y.prototype.destroy.call(v);
v=u=O=P=S=null}})}});a.Renderer=C})(L);(function(a){var y=a.attr,C=a.createElement,E=a.css,D=a.defined,q=a.each,d=a.extend,g=a.isFirefox,p=a.isMS,m=a.isWebKit,n=a.pInt,f=a.SVGRenderer,c=a.win,x=a.wrap;d(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=d(this.styles,a);E(this.element,a);return this},htmlGetBBox:function(){var a=
this.element;"text"===a.nodeName&&(a.style.position="absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.x||0,l=this.y||0,k=this.textAlign||"left",d={left:0,center:.5,right:1}[k],f=this.styles;E(b,{marginLeft:this.translateX||0,marginTop:this.translateY||0});this.inverted&&q(b.childNodes,function(c){a.invertChild(c,b)});if("SPAN"===b.tagName){var g=this.rotation,x=n(this.textWidth),
r=f&&f.whiteSpace,p=[g,k,b.innerHTML,this.textWidth,this.textAlign].join();p!==this.cTT&&(f=a.fontMetrics(b.style.fontSize).b,D(g)&&this.setSpanRotation(g,d,f),E(b,{width:"",whiteSpace:r||"nowrap"}),b.offsetWidth>x&&/[ \-]/.test(b.textContent||b.innerText)&&E(b,{width:x+"px",display:"block",whiteSpace:r||"normal"}),this.getSpanCorrection(b.offsetWidth,f,d,g,k));E(b,{left:c+(this.xCorr||0)+"px",top:l+(this.yCorr||0)+"px"});m&&(f=b.offsetHeight);this.cTT=p}}else this.alignOnAdd=!0},setSpanRotation:function(a,
b,d){var e={},k=p?"-ms-transform":m?"-webkit-transform":g?"MozTransform":c.opera?"-o-transform":"";e[k]=e.transform="rotate("+a+"deg)";e[k+(g?"Origin":"-origin")]=e.transformOrigin=100*b+"% "+d+"px";E(this.element,e)},getSpanCorrection:function(a,b,c){this.xCorr=-a*c;this.yCorr=-b}});d(f.prototype,{html:function(a,b,c){var e=this.createElement("span"),k=e.element,f=e.renderer,g=f.isSVG,u=function(a,b){q(["opacity","visibility"],function(e){x(a,e+"Setter",function(a,e,c,k){a.call(this,e,c,k);b[c]=
e})})};e.textSetter=function(a){a!==k.innerHTML&&delete this.bBox;k.innerHTML=this.textStr=a;e.htmlUpdateTransform()};g&&u(e,e.element.style);e.xSetter=e.ySetter=e.alignSetter=e.rotationSetter=function(a,b){"align"===b&&(b="textAlign");e[b]=a;e.htmlUpdateTransform()};e.attr({text:a,x:Math.round(b),y:Math.round(c)}).css({position:"absolute"});k.style.whiteSpace="nowrap";e.css=e.htmlCss;g&&(e.add=function(a){var b,c=f.box.parentNode,l=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)l.push(a),a=a.parentGroup;
q(l.reverse(),function(a){var k,f=y(a.element,"class");f&&(f={className:f});b=a.div=a.div||C("div",f,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||c);k=b.style;d(a,{classSetter:function(a){this.element.setAttribute("class",a);b.className=a},on:function(){l[0].div&&e.on.apply({element:l[0].div},arguments);return a},translateXSetter:function(h,t){k.left=h+"px";a[t]=h;a.doTransform=!0},
translateYSetter:function(h,t){k.top=h+"px";a[t]=h;a.doTransform=!0}});u(a,k)})}}else b=c;b.appendChild(k);e.added=!0;e.alignOnAdd&&e.htmlUpdateTransform();return e});return e}})})(L);(function(a){function y(){var d=a.defaultOptions.global,m=g.moment;if(d.timezone){if(m)return function(a){return-m.tz(a,d.timezone).utcOffset()};a.error(25)}return d.useUTC&&d.getTimezoneOffset}function C(){var p=a.defaultOptions.global,m,n=p.useUTC,f=n?"getUTC":"get",c=n?"setUTC":"set";a.Date=m=p.Date||g.Date;m.hcTimezoneOffset=
n&&p.timezoneOffset;m.hcGetTimezoneOffset=y();m.hcMakeTime=function(a,e,b,c,l,k){var f;n?(f=m.UTC.apply(0,arguments),f+=D(f)):f=(new m(a,e,d(b,1),d(c,0),d(l,0),d(k,0))).getTime();return f};E("Minutes Hours Day Date Month FullYear".split(" "),function(a){m["hcGet"+a]=f+a});E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){m["hcSet"+a]=c+a})}var E=a.each,D=a.getTZOffset,q=a.merge,d=a.pick,g=a.win;a.defaultOptions={symbols:["circle","diamond","square","triangle","triangle-down"],
lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0},chart:{borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,
spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{},itemCheckboxStyle:{position:"absolute",width:"13px",
height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{}},loading:{},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,headerFormat:'\x3cspan class\x3d"highcharts-header"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cspan class\x3d"highcharts-strong"\x3e{point.y}\x3c/span\x3e\x3cbr/\x3e'},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},text:"Highcharts.com"}};a.setOptions=function(d){a.defaultOptions=q(!0,a.defaultOptions,d);C();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;
C()})(L);(function(a){var y=a.correctFloat,C=a.defined,E=a.destroyObjectProperties,D=a.isNumber,q=a.pick,d=a.deg2rad;a.Tick=function(a,d,m,n){this.axis=a;this.pos=d;this.type=m||"";this.isNewLabel=this.isNew=!0;m||n||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,d=a.options,m=a.chart,n=a.categories,f=a.names,c=this.pos,x=d.labels,e=a.tickPositions,b=c===e[0],u=c===e[e.length-1],f=n?q(n[c],f[c],c):c,n=this.label,e=e.info,l;a.isDatetimeAxis&&e&&(l=d.dateTimeLabelFormats[e.higherRanks[c]||
e.unitName]);this.isFirst=b;this.isLast=u;d=a.labelFormatter.call({axis:a,chart:m,isFirst:b,isLast:u,dateTimeLabelFormat:l,value:a.isLog?y(a.lin2log(f)):f,pos:c});C(n)?n&&n.attr({text:d}):(this.labelLength=(this.label=n=C(d)&&x.enabled?m.renderer.text(d,0,0,x.useHTML).add(a.labelGroup):null)&&n.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var g=this.axis,m=a.x,n=g.chart.chartWidth,f=
g.chart.spacing,c=q(g.labelLeft,Math.min(g.pos,f[3])),f=q(g.labelRight,Math.max(g.pos+g.len,n-f[1])),x=this.label,e=this.rotation,b={left:0,center:.5,right:1}[g.labelAlign],u=x.getBBox().width,l=g.getSlotWidth(),k=l,F=1,H,B={};if(e)0>e&&m-b*u<c?H=Math.round(m/Math.cos(e*d)-c):0<e&&m+b*u>f&&(H=Math.round((n-m)/Math.cos(e*d)));else if(n=m+(1-b)*u,m-b*u<c?k=a.x+k*(1-b)-c:n>f&&(k=f-a.x+k*b,F=-1),k=Math.min(l,k),k<l&&"center"===g.labelAlign&&(a.x+=F*(l-k-b*(l-Math.min(u,k)))),u>k||g.autoRotation&&(x.styles||
{}).width)H=k;H&&(B.width=H,(g.options.labels.style||{}).textOverflow||(B.textOverflow="ellipsis"),x.css(B))},getPosition:function(a,d,m,n){var f=this.axis,c=f.chart,g=n&&c.oldChartHeight||c.chartHeight;return{x:a?f.translate(d+m,null,null,n)+f.transB:f.left+f.offset+(f.opposite?(n&&c.oldChartWidth||c.chartWidth)-f.right-f.left:0),y:a?g-f.bottom+f.offset-(f.opposite?f.height:0):g-f.translate(d+m,null,null,n)-f.transB}},getLabelPosition:function(a,p,m,n,f,c,x,e){var b=this.axis,g=b.transA,l=b.reversed,
k=b.staggerLines,F=b.tickRotCorr||{x:0,y:0},q=f.y;C(q)||(q=0===b.side?m.rotation?-8:-m.getBBox().height:2===b.side?F.y+8:Math.cos(m.rotation*d)*(F.y-m.getBBox(!1,0).height/2));a=a+f.x+F.x-(c&&n?c*g*(l?-1:1):0);p=p+q-(c&&!n?c*g*(l?1:-1):0);k&&(m=x/(e||1)%k,b.opposite&&(m=k-m-1),p+=b.labelOffset/k*m);return{x:a,y:Math.round(p)}},getMarkPath:function(a,d,m,n,f,c){return c.crispLine(["M",a,d,"L",a+(f?0:-m),d+(f?m:0)],n)},renderGridLine:function(a,d,m){var g=this.axis,f=this.gridLine,c={},x=this.pos,e=
this.type,b=g.tickmarkOffset,u=g.chart.renderer;f||(e||(c.zIndex=1),a&&(c.opacity=0),this.gridLine=f=u.path().attr(c).addClass("highcharts-"+(e?e+"-":"")+"grid-line").add(g.gridGroup));if(!a&&f&&(a=g.getPlotLinePath(x+b,f.strokeWidth()*m,a,!0)))f[this.isNew?"attr":"animate"]({d:a,opacity:d})},renderMark:function(a,d,m){var g=this.axis,f=g.chart.renderer,c=this.type,x=g.tickSize(c?c+"Tick":"tick"),e=this.mark,b=!e,u=a.x;a=a.y;x&&(g.opposite&&(x[0]=-x[0]),b&&(this.mark=e=f.path().addClass("highcharts-"+
(c?c+"-":"")+"tick").add(g.axisGroup)),e[b?"attr":"animate"]({d:this.getMarkPath(u,a,x[0],e.strokeWidth()*m,g.horiz,f),opacity:d}))},renderLabel:function(a,d,m,n){var f=this.axis,c=f.horiz,g=f.options,e=this.label,b=g.labels,u=b.step,l=f.tickmarkOffset,k=!0,F=a.x;a=a.y;e&&D(F)&&(e.xy=a=this.getLabelPosition(F,a,e,c,b,l,n,u),this.isFirst&&!this.isLast&&!q(g.showFirstLabel,1)||this.isLast&&!this.isFirst&&!q(g.showLastLabel,1)?k=!1:!c||f.isRadial||b.step||b.rotation||d||0===m||this.handleOverflow(a),
u&&n%u&&(k=!1),k&&D(a.y)?(a.opacity=m,e[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(e.attr("y",-9999),this.isNewLabel=!0),this.isNew=!1)},render:function(a,d,m){var g=this.axis,f=g.horiz,c=this.getPosition(f,this.pos,g.tickmarkOffset,d),x=c.x,e=c.y,g=f&&x===g.pos+g.len||!f&&e===g.pos?-1:1;m=q(m,1);this.isActive=!0;this.renderGridLine(d,m,g);this.renderMark(c,m,g);this.renderLabel(c,d,m,a)},destroy:function(){E(this,this.axis)}}})(L);var T=function(a){var y=a.addEvent,C=a.animObject,
E=a.arrayMax,D=a.arrayMin,q=a.correctFloat,d=a.defaultOptions,g=a.defined,p=a.deg2rad,m=a.destroyObjectProperties,n=a.each,f=a.extend,c=a.fireEvent,x=a.format,e=a.getMagnitude,b=a.grep,u=a.inArray,l=a.isArray,k=a.isNumber,F=a.isString,H=a.merge,B=a.normalizeTickInterval,I=a.objectEach,r=a.pick,G=a.removeEvent,w=a.splat,A=a.syncTimeout,v=a.Tick,J=function(){this.init.apply(this,arguments)};a.extend(J.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",
hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle"},type:"linear"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,
enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)}}},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,t){var h=t.isX,b=this;b.chart=a;b.horiz=a.inverted&&!b.isZAxis?!h:h;b.isXAxis=h;b.coll=b.coll||(h?"xAxis":"yAxis");b.opposite=t.opposite;b.side=
t.side||(b.horiz?b.opposite?0:2:b.opposite?1:3);b.setOptions(t);var e=this.options,c=e.type;b.labelFormatter=e.labels.formatter||b.defaultLabelFormatter;b.userOptions=t;b.minPixelPadding=0;b.reversed=e.reversed;b.visible=!1!==e.visible;b.zoomEnabled=!1!==e.zoomEnabled;b.hasNames="category"===c||!0===e.categories;b.categories=e.categories||b.hasNames;b.names=b.names||[];b.plotLinesAndBandsGroups={};b.isLog="logarithmic"===c;b.isDatetimeAxis="datetime"===c;b.positiveValuesOnly=b.isLog&&!b.allowNegativeLog;
b.isLinked=g(e.linkedTo);b.ticks={};b.labelEdge=[];b.minorTicks={};b.plotLinesAndBands=[];b.alternateBands={};b.len=0;b.minRange=b.userMinRange=e.minRange||e.maxZoom;b.range=e.range;b.offset=e.offset||0;b.stacks={};b.oldStacks={};b.stacksTouched=0;b.max=null;b.min=null;b.crosshair=r(e.crosshair,w(a.options.tooltip.crosshairs)[h?0:1],!1);t=b.options.events;-1===u(b,a.axes)&&(h?a.axes.splice(a.xAxis.length,0,b):a.axes.push(b),a[b.coll].push(b));b.series=b.series||[];a.inverted&&!b.isZAxis&&h&&void 0===
b.reversed&&(b.reversed=!0);I(t,function(a,h){y(b,h,a)});b.lin2log=e.linearToLogConverter||b.lin2log;b.isLog&&(b.val2lin=b.log2lin,b.lin2val=b.lin2log)},setOptions:function(a){this.options=H(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],H(d[this.coll],a))},defaultLabelFormatter:function(){var h=this.axis,b=this.value,e=h.categories,c=this.dateTimeLabelFormat,
k=d.lang,l=k.numericSymbols,k=k.numericSymbolMagnitude||1E3,f=l&&l.length,w,v=h.options.labels.format,h=h.isLog?Math.abs(b):h.tickInterval;if(v)w=x(v,this);else if(e)w=b;else if(c)w=a.dateFormat(c,b);else if(f&&1E3<=h)for(;f--&&void 0===w;)e=Math.pow(k,f+1),h>=e&&0===10*b%e&&null!==l[f]&&0!==b&&(w=a.numberFormat(b/e,-1)+l[f]);void 0===w&&(w=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return w},getSeriesExtremes:function(){var a=this,t=a.chart;a.hasVisibleSeries=!1;a.dataMin=
a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();n(a.series,function(h){if(h.visible||!t.options.chart.ignoreHiddenSeries){var e=h.options,c=e.threshold,d;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=c&&(c=null);if(a.isXAxis)e=h.xData,e.length&&(h=D(e),k(h)||h instanceof Date||(e=b(e,function(a){return k(a)}),h=D(e)),a.dataMin=Math.min(r(a.dataMin,e[0]),h),a.dataMax=Math.max(r(a.dataMax,e[0]),E(e)));else if(h.getExtremes(),d=h.dataMax,h=h.dataMin,g(h)&&g(d)&&
(a.dataMin=Math.min(r(a.dataMin,h),h),a.dataMax=Math.max(r(a.dataMax,d),d)),g(c)&&(a.threshold=c),!e.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,b,e,c,d,l){var h=this.linkedParent||this,t=1,f=0,w=c?h.oldTransA:h.transA;c=c?h.oldMin:h.min;var v=h.minPixelPadding;d=(h.isOrdinal||h.isBroken||h.isLog&&d)&&h.lin2val;w||(w=h.transA);e&&(t*=-1,f=h.len);h.reversed&&(t*=-1,f-=t*(h.sector||h.len));b?(a=(a*t+f-v)/w+c,d&&(a=h.lin2val(a))):(d&&(a=h.val2lin(a)),a=t*(a-c)*w+f+
t*v+(k(l)?w*l:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,e,c,d){var h=this.chart,t=this.left,l=this.top,f,w,v=e&&h.oldChartHeight||h.chartHeight,g=e&&h.oldChartWidth||h.chartWidth,u;f=this.transB;var A=function(a,h,b){if(a<h||a>b)c?a=Math.min(Math.max(h,a),b):u=!0;return a};d=r(d,this.translate(a,null,null,e));a=e=Math.round(d+
f);f=w=Math.round(v-d-f);k(d)?this.horiz?(f=l,w=v-this.bottom,a=e=A(a,t,t+this.width)):(a=t,e=g-this.right,f=w=A(f,l,l+this.height)):u=!0;return u&&!c?null:h.renderer.crispLine(["M",a,f,"L",e,w],b||1)},getLinearTickPositions:function(a,b,e){var h,t=q(Math.floor(b/a)*a);e=q(Math.ceil(e/a)*a);var c=[];if(this.single)return[b];for(b=t;b<=e;){c.push(b);b=q(b+a);if(b===h)break;h=b}return c},getMinorTickPositions:function(){var a=this,b=a.options,e=a.tickPositions,c=a.minorTickInterval,k=[],d=a.pointRangePadding||
0,l=a.min-d,d=a.max+d,f=d-l;if(f&&f/c<a.len/3)if(a.isLog)n(this.paddedTicks,function(h,b,t){b&&k.push.apply(k,a.getLogTickPositions(c,t[b-1],t[b],!0))});else if(a.isDatetimeAxis&&"auto"===b.minorTickInterval)k=k.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c),l,d,b.startOfWeek));else for(b=l+(e[0]-l)%c;b<=d&&b!==k[0];b+=c)k.push(b);0!==k.length&&a.trimTicks(k);return k},adjustForMinRange:function(){var a=this.options,b=this.min,e=this.max,c,k,d,l,f,w,v,u;this.isXAxis&&void 0===this.minRange&&
!this.isLog&&(g(a.min)||g(a.max)?this.minRange=null:(n(this.series,function(a){w=a.xData;for(l=v=a.xIncrement?1:w.length-1;0<l;l--)if(f=w[l]-w[l-1],void 0===d||f<d)d=f}),this.minRange=Math.min(5*d,this.dataMax-this.dataMin)));e-b<this.minRange&&(k=this.dataMax-this.dataMin>=this.minRange,u=this.minRange,c=(u-e+b)/2,c=[b-c,r(a.min,b-c)],k&&(c[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=E(c),e=[b+u,r(a.max,b+u)],k&&(e[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),e=D(e),e-b<u&&
(c[0]=e-u,c[1]=r(a.min,e-u),b=E(c)));this.min=b;this.max=e},getClosest:function(){var a;this.categories?a=1:n(this.series,function(h){var b=h.closestPointRange,t=h.visible||!h.chart.options.chart.ignoreHiddenSeries;!h.noSharedTooltip&&g(b)&&t&&(a=g(a)?Math.min(a,b):b)});return a},nameToX:function(a){var h=l(this.categories),b=h?this.categories:this.names,e=a.options.x,c;a.series.requireSorting=!1;g(e)||(e=!1===this.options.uniqueNames?a.series.autoIncrement():u(a.name,b));-1===e?h||(c=b.length):c=
e;void 0!==c&&(this.names[c]=a.name);return c},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,n(this.series||[],function(h){h.xIncrement=null;if(!h.points||h.isDirtyData)h.processData(),h.generatePoints();n(h.points,function(b,t){var e;b.options&&(e=a.nameToX(b),void 0!==e&&e!==b.x&&(b.x=e,h.xData[t]=e))})}))},setAxisTranslation:function(a){var h=this,b=h.max-h.min,e=h.axisPointRange||0,c,k=0,d=0,l=h.linkedParent,f=!!h.categories,w=h.transA,
v=h.isXAxis;if(v||f||e)c=h.getClosest(),l?(k=l.minPointOffset,d=l.pointRangePadding):n(h.series,function(a){var b=f?1:v?r(a.options.pointRange,c,0):h.axisPointRange||0;a=a.options.pointPlacement;e=Math.max(e,b);h.single||(k=Math.max(k,F(a)?0:b/2),d=Math.max(d,"on"===a?0:b))}),l=h.ordinalSlope&&c?h.ordinalSlope/c:1,h.minPointOffset=k*=l,h.pointRangePadding=d*=l,h.pointRange=Math.min(e,b),v&&(h.closestPointRange=c);a&&(h.oldTransA=w);h.translationSlope=h.transA=w=h.options.staticScale||h.len/(b+d||
1);h.transB=h.horiz?h.left:h.bottom;h.minPixelPadding=w*k},minFromRange:function(){return this.max-this.range},setTickInterval:function(h){var b=this,d=b.chart,l=b.options,f=b.isLog,w=b.log2lin,v=b.isDatetimeAxis,u=b.isXAxis,A=b.isLinked,z=l.maxPadding,x=l.minPadding,F=l.tickInterval,m=l.tickPixelInterval,I=b.categories,p=b.threshold,J=b.softThreshold,G,H,y,C;v||I||A||this.getTickAmount();y=r(b.userMin,l.min);C=r(b.userMax,l.max);A?(b.linkedParent=d[b.coll][l.linkedTo],d=b.linkedParent.getExtremes(),
b.min=r(d.min,d.dataMin),b.max=r(d.max,d.dataMax),l.type!==b.linkedParent.options.type&&a.error(11,1)):(!J&&g(p)&&(b.dataMin>=p?(G=p,x=0):b.dataMax<=p&&(H=p,z=0)),b.min=r(y,G,b.dataMin),b.max=r(C,H,b.dataMax));f&&(b.positiveValuesOnly&&!h&&0>=Math.min(b.min,r(b.dataMin,b.min))&&a.error(10,1),b.min=q(w(b.min),15),b.max=q(w(b.max),15));b.range&&g(b.max)&&(b.userMin=b.min=y=Math.max(b.dataMin,b.minFromRange()),b.userMax=C=b.max,b.range=null);c(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();
!(I||b.axisPointRange||b.usePercentage||A)&&g(b.min)&&g(b.max)&&(w=b.max-b.min)&&(!g(y)&&x&&(b.min-=w*x),!g(C)&&z&&(b.max+=w*z));k(l.softMin)&&(b.min=Math.min(b.min,l.softMin));k(l.softMax)&&(b.max=Math.max(b.max,l.softMax));k(l.floor)&&(b.min=Math.max(b.min,l.floor));k(l.ceiling)&&(b.max=Math.min(b.max,l.ceiling));J&&g(b.dataMin)&&(p=p||0,!g(y)&&b.min<p&&b.dataMin>=p?b.min=p:!g(C)&&b.max>p&&b.dataMax<=p&&(b.max=p));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:A&&!F&&m===b.linkedParent.options.tickPixelInterval?
F=b.linkedParent.tickInterval:r(F,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,I?1:(b.max-b.min)*m/Math.max(b.len,m));u&&!h&&n(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!F&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));h=r(l.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);
!F&&b.tickInterval<h&&(b.tickInterval=h);v||f||F||(b.tickInterval=B(b.tickInterval,null,e(b.tickInterval),r(l.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=b.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,e=a.tickPositions,c=a.tickPositioner,k=a.startOnTick,d=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval=
"auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.single=this.min===this.max&&g(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=e&&e.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,
this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,c&&(c=c.apply(this,[this.min,this.max])))&&(this.tickPositions=b=c);this.paddedTicks=b.slice(0);this.trimTicks(b,k,d);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),e||c||this.adjustTickAmount())},trimTicks:function(a,b,e){var h=a[0],c=a[a.length-1],k=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==h)this.min=h;else for(;this.min-k>a[0];)a.shift();if(e)this.max=c;else for(;this.max+k<a[a.length-
1];)a.pop();0===a.length&&g(h)&&a.push((c+h)/2)}},alignToOthers:function(){var a={},b,e=this.options;!1===this.chart.options.chart.alignTicks||!1===e.alignTicks||this.isLog||n(this.chart[this.coll],function(h){var e=h.options,e=[h.horiz?e.left:e.top,e.width,e.height,e.pane].join();h.series.length&&(a[e]?b=!0:a[e]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,e=a.tickPixelInterval;!g(a.tickInterval)&&this.len<e&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=
2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/e)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,e=this.tickAmount,c=this.finalTickAmt,k=b&&b.length;if(k<e){for(;b.length<e;)b.push(q(b[b.length-1]+a));this.transA*=(k-1)/(e-1);this.max=b[b.length-1]}else k>e&&(this.tickInterval*=2,this.setTickPositions());if(g(c)){for(a=e=b.length;a--;)(3===c&&1===a%2||2>=c&&0<a&&a<e-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,
b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;n(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||
(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,e,k,d){var h=this,l=h.chart;e=r(e,!0);n(h.series,function(a){delete a.kdTree});d=f(d,{min:a,max:b});c(h,"setExtremes",d,function(){h.userMin=a;h.userMax=b;h.eventArgs=d;e&&l.redraw(k)})},zoom:function(a,b){var h=this.dataMin,e=this.dataMax,c=this.options,k=Math.min(h,r(c.min,h)),c=Math.max(e,r(c.max,e));if(a!==this.min||b!==this.max)this.allowZoomOutside||(g(h)&&(a<k&&(a=
k),a>c&&(a=c)),g(e)&&(b<k&&(b=k),b>c&&(b=c))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var b=this.chart,e=this.options,c=e.offsets||[0,0,0,0],k=this.horiz,d=this.width=Math.round(a.relativeLength(r(e.width,b.plotWidth-c[3]+c[1]),b.plotWidth)),l=this.height=Math.round(a.relativeLength(r(e.height,b.plotHeight-c[0]+c[2]),b.plotHeight)),f=this.top=Math.round(a.relativeLength(r(e.top,b.plotTop+c[0]),b.plotHeight,b.plotTop)),
e=this.left=Math.round(a.relativeLength(r(e.left,b.plotLeft+c[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-l-f;this.right=b.chartWidth-d-e;this.len=Math.max(k?d:l,0);this.pos=k?e:f},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?q(b(this.min)):this.min,max:a?q(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,h=this.lin2log,e=b?h(this.min):this.min,b=b?h(this.max):this.max;
null===a?a=e:e>a?a=e:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(r(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,h=b[a+"Length"],e=r(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(e&&h)return"inside"===b[a+"Position"]&&(h=-h),[h,e]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,
this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,e=this.tickInterval,c=e,k=this.len/(((this.categories?1:0)+this.max-this.min)/e),d,l=a.rotation,f=this.labelMetrics(),w,v=Number.MAX_VALUE,u,A=function(a){a/=k||1;a=1<a?Math.ceil(a):1;return a*e};b?(u=!a.staggerLines&&!a.step&&(g(l)?[l]:k<r(a.autoRotationLimit,80)&&a.autoRotation))&&n(u,function(a){var b;if(a===l||a&&-90<=a&&90>=a)w=A(Math.abs(f.h/Math.sin(p*a))),b=w+Math.abs(a/360),b<v&&(v=b,d=a,c=w)}):
a.step||(c=A(f.h));this.autoRotation=u;this.labelRotation=r(d,l);return c},getSlotWidth:function(){var a=this.chart,b=this.horiz,e=this.options.labels,c=Math.max(this.tickPositions.length-(this.categories?0:1),1),k=a.margin[3];return b&&2>(e.step||0)&&!e.rotation&&(this.staggerLines||1)*this.len/c||!b&&(k&&k-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,e=this.tickPositions,c=this.ticks,k=this.options.labels,d=this.horiz,l=this.getSlotWidth(),f=Math.max(1,
Math.round(l-2*(k.padding||5))),w={},v=this.labelMetrics(),g=k.style&&k.style.textOverflow,u,A=0,r,x;F(k.rotation)||(w.rotation=k.rotation||0);n(e,function(a){(a=c[a])&&a.labelLength>A&&(A=a.labelLength)});this.maxLabelLength=A;if(this.autoRotation)A>f&&A>v.h?w.rotation=this.labelRotation:this.labelRotation=0;else if(l&&(u={width:f+"px"},!g))for(u.textOverflow="clip",r=e.length;!d&&r--;)if(x=e[r],f=c[x].label)f.styles&&"ellipsis"===f.styles.textOverflow?f.css({textOverflow:"clip"}):c[x].labelLength>
l&&f.css({width:l+"px"}),f.getBBox().height>this.len/e.length-(v.h-v.f)&&(f.specCss={textOverflow:"ellipsis"});w.rotation&&(u={width:(A>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},g||(u.textOverflow="ellipsis"));if(this.labelAlign=k.align||this.autoLabelAlign(this.labelRotation))w.align=this.labelAlign;n(e,function(a){var b=(a=c[a])&&a.label;b&&(b.attr(w),u&&b.css(H(u,b.specCss)),delete b.specCss,a.rotation=w.rotation)});this.tickRotCorr=b.rotCorr(v.b,this.labelRotation||0,0!==this.side)},
hasData:function(){return this.hasVisibleSeries||g(this.min)&&g(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,h=this.horiz,e=this.opposite,c=this.options.title,k;this.axisTitle||((k=c.textAlign)||(k=(h?{low:"left",middle:"center",high:"right"}:{low:e?"right":"left",middle:"center",high:e?"left":"right"})[c.align]),this.axisTitle=b.text(c.text,0,0,c.useHTML).attr({zIndex:7,rotation:c.rotation||0,align:k}).addClass("highcharts-axis-title").add(this.axisGroup),this.axisTitle.isNew=
!0);this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new v(this,a)},getOffset:function(){var a=this,b=a.chart,e=b.renderer,c=a.options,k=a.tickPositions,d=a.ticks,l=a.horiz,f=a.side,w=b.inverted&&!a.isZAxis?[1,0,3,2][f]:f,v,u,A=0,x,B=0,F=c.title,m=c.labels,p=0,q=b.axisOffset,b=b.clipOffset,J=[-1,1,1,-1][f],G=c.className,H=a.axisParent,y=this.tickSize("tick");v=a.hasData();a.showAxis=u=v||r(c.showEmpty,!0);
a.staggerLines=a.horiz&&m.staggerLines;a.axisGroup||(a.gridGroup=e.g("grid").attr({zIndex:c.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(G||"")).add(H),a.axisGroup=e.g("axis").attr({zIndex:c.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(G||"")).add(H),a.labelGroup=e.g("axis-labels").attr({zIndex:m.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(G||"")).add(H));v||a.isLinked?(n(k,function(b,h){a.generateTick(b,h)}),a.renderUnsquish(),
!1===m.reserveSpace||0!==f&&2!==f&&{1:"left",3:"right"}[f]!==a.labelAlign&&"center"!==a.labelAlign||n(k,function(a){p=Math.max(d[a].getLabelSize(),p)}),a.staggerLines&&(p*=a.staggerLines,a.labelOffset=p*(a.opposite?-1:1))):I(d,function(a,b){a.destroy();delete d[b]});F&&F.text&&!1!==F.enabled&&(a.addTitle(u),u&&!1!==F.reserveSpace&&(a.titleOffset=A=a.axisTitle.getBBox()[l?"height":"width"],x=F.offset,B=g(x)?0:r(F.margin,l?5:10)));a.renderLine();a.offset=J*r(c.offset,q[f]);a.tickRotCorr=a.tickRotCorr||
{x:0,y:0};e=0===f?-a.labelMetrics().h:2===f?a.tickRotCorr.y:0;B=Math.abs(p)+B;p&&(B=B-e+J*(l?r(m.y,a.tickRotCorr.y+8*J):m.x));a.axisTitleMargin=r(x,B);q[f]=Math.max(q[f],a.axisTitleMargin+A+J*a.offset,B,v&&k.length&&y?y[0]+J*a.offset:0);k=2*Math.floor(a.axisLine.strokeWidth()/2);0<c.offset&&(k-=2*c.offset);b[w]=Math.max(b[w]||k,k)},getLinePath:function(a){var b=this.chart,h=this.opposite,e=this.offset,c=this.horiz,k=this.left+(h?this.width:0)+e,e=b.chartHeight-this.bottom-(h?this.height:0)+e;h&&(a*=
-1);return b.renderer.crispLine(["M",c?this.left:k,c?e:this.top,"L",c?b.chartWidth-this.right:k,c?e:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup))},getTitlePosition:function(){var a=this.horiz,b=this.left,e=this.top,c=this.len,k=this.options.title,d=a?b:e,l=this.opposite,f=this.offset,w=k.x||0,v=k.y||0,u=this.axisTitle,g=this.chart.renderer.fontMetrics(k.style&&k.style.fontSize,u),
u=Math.max(u.getBBox(null,0).height-g.h-1,0),c={low:d+(a?0:c),middle:d+c/2,high:d+(a?c:0)}[k.align],b=(a?e+this.height:b)+(a?1:-1)*(l?-1:1)*this.axisTitleMargin+[-u,u,g.f,-u][this.side];return{x:a?c+w:b+(l?this.width:0)+f+w,y:a?b+v-(l?this.height:0)+f:c+v}},renderMinorTick:function(a){var b=this.chart.hasRendered&&k(this.oldMin),h=this.minorTicks;h[a]||(h[a]=new v(this,a,"minor"));b&&h[a].isNew&&h[a].render(null,!0);h[a].render(null,!1,1)},renderTick:function(a,b){var h=this.isLinked,e=this.ticks,
c=this.chart.hasRendered&&k(this.oldMin);if(!h||a>=this.min&&a<=this.max)e[a]||(e[a]=new v(this,a)),c&&e[a].isNew&&e[a].render(b,!0,.1),e[a].render(b)},render:function(){var b=this,e=b.chart,c=b.options,d=b.isLog,l=b.lin2log,f=b.isLinked,w=b.tickPositions,u=b.axisTitle,g=b.ticks,r=b.minorTicks,x=b.alternateBands,B=c.stackLabels,F=c.alternateGridColor,m=b.tickmarkOffset,p=b.axisLine,q=b.showAxis,J=C(e.renderer.globalAnimation),G,H;b.labelEdge.length=0;b.overlap=!1;n([g,r,x],function(a){I(a,function(a){a.isActive=
!1})});if(b.hasData()||f)b.minorTickInterval&&!b.categories&&n(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),w.length&&(n(w,function(a,e){b.renderTick(a,e)}),m&&(0===b.min||b.single)&&(g[-1]||(g[-1]=new v(b,-1,null,!0)),g[-1].render(-1))),F&&n(w,function(h,c){H=void 0!==w[c+1]?w[c+1]+m:b.max-m;0===c%2&&h<b.max&&H<=b.max+(e.polar?-m:m)&&(x[h]||(x[h]=new a.PlotLineOrBand(b)),G=h+m,x[h].options={from:d?l(G):G,to:d?l(H):H,color:F},x[h].render(),x[h].isActive=!0)}),b._addedPlotLB||(n((c.plotLines||
[]).concat(c.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);n([g,r,x],function(a){var b,h=[],c=J.duration;I(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,h.push(b))});A(function(){for(b=h.length;b--;)a[h[b]]&&!a[h[b]].isActive&&(a[h[b]].destroy(),delete a[h[b]])},a!==x&&e.hasRendered&&c?c:0)});p&&(p[p.isPlaced?"animate":"attr"]({d:this.getLinePath(p.strokeWidth())}),p.isPlaced=!0,p[q?"show":"hide"](!0));u&&q&&(c=b.getTitlePosition(),k(c.y)?(u[u.isNew?"attr":"animate"](c),
u.isNew=!1):(u.attr("y",-9999),u.isNew=!0));B&&B.enabled&&b.renderStackTotals();b.isDirty=!1},redraw:function(){this.visible&&(this.render(),n(this.plotLinesAndBands,function(a){a.render()}));n(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,e=b.stacks,h=b.plotLinesAndBands,c;a||G(b);I(e,function(a,b){m(a);e[b]=null});n([b.ticks,b.minorTicks,b.alternateBands],function(a){m(a)});if(h)for(a=h.length;a--;)h[a].destroy();
n("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){b[a]&&(b[a]=b[a].destroy())});for(c in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[c]=b.plotLinesAndBandsGroups[c].destroy();I(b,function(a,e){-1===u(e,b.keepProps)&&delete b[e]})},drawCrosshair:function(a,b){var e,h=this.crosshair,c=r(h.snap,!0),k,d=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(g(b)||!c)?(c?g(b)&&(k=this.isXAxis?b.plotX:this.len-b.plotY):k=a&&(this.horiz?
a.chartX-this.pos:this.len-a.chartY+this.pos),g(k)&&(e=this.getPlotLinePath(b&&(this.isXAxis?b.x:r(b.stackY,b.y)),null,null,null,k)||null),g(e)?(b=this.categories&&!this.isRadial,d||(this.cross=d=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+h.className).attr({zIndex:r(h.zIndex,2)}).add()),d.show().attr({d:e}),b&&!h.width&&d.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&
this.cross.hide()}});return a.Axis=J}(L);(function(a){var y=a.Axis,C=a.Date,E=a.dateFormat,D=a.defaultOptions,q=a.defined,d=a.each,g=a.extend,p=a.getMagnitude,m=a.getTZOffset,n=a.normalizeTickInterval,f=a.pick,c=a.timeUnits;y.prototype.getTimeTicks=function(a,e,b,u){var l=[],k={},n=D.global.useUTC,x,B=new C(e-Math.max(m(e),m(b))),p=C.hcMakeTime,r=a.unitRange,G=a.count,w,A;if(q(e)){B[C.hcSetMilliseconds](r>=c.second?0:G*Math.floor(B.getMilliseconds()/G));if(r>=c.second)B[C.hcSetSeconds](r>=c.minute?
0:G*Math.floor(B.getSeconds()/G));if(r>=c.minute)B[C.hcSetMinutes](r>=c.hour?0:G*Math.floor(B[C.hcGetMinutes]()/G));if(r>=c.hour)B[C.hcSetHours](r>=c.day?0:G*Math.floor(B[C.hcGetHours]()/G));if(r>=c.day)B[C.hcSetDate](r>=c.month?1:G*Math.floor(B[C.hcGetDate]()/G));r>=c.month&&(B[C.hcSetMonth](r>=c.year?0:G*Math.floor(B[C.hcGetMonth]()/G)),x=B[C.hcGetFullYear]());if(r>=c.year)B[C.hcSetFullYear](x-x%G);if(r===c.week)B[C.hcSetDate](B[C.hcGetDate]()-B[C.hcGetDay]()+f(u,1));x=B[C.hcGetFullYear]();u=B[C.hcGetMonth]();
var v=B[C.hcGetDate](),J=B[C.hcGetHours]();if(C.hcTimezoneOffset||C.hcGetTimezoneOffset)A=(!n||!!C.hcGetTimezoneOffset)&&(b-e>4*c.month||m(e)!==m(b)),B=B.getTime(),w=m(B),B=new C(B+w);n=B.getTime();for(e=1;n<b;)l.push(n),n=r===c.year?p(x+e*G,0):r===c.month?p(x,u+e*G):!A||r!==c.day&&r!==c.week?A&&r===c.hour?p(x,u,v,J+e*G,0,0,w)-w:n+r*G:p(x,u,v+e*G*(r===c.day?1:7)),e++;l.push(n);r<=c.hour&&1E4>l.length&&d(l,function(a){0===a%18E5&&"000000000"===E("%H%M%S%L",a)&&(k[a]="day")})}l.info=g(a,{higherRanks:k,
totalRange:r*G});return l};y.prototype.normalizeTimeTickInterval=function(a,e){var b=e||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];e=b[b.length-1];var d=c[e[0]],l=e[1],k;for(k=0;k<b.length&&!(e=b[k],d=c[e[0]],l=e[1],b[k+1]&&a<=(d*l[l.length-1]+c[b[k+1][0]])/2);k++);d===c.year&&a<5*d&&(l=[1,2,5]);a=n(a/d,l,"year"===e[0]?Math.max(p(a/d),1):1);return{unitRange:d,
count:a,unitName:e[0]}}})(L);(function(a){var y=a.Axis,C=a.getMagnitude,E=a.map,D=a.normalizeTickInterval,q=a.pick;y.prototype.getLogTickPositions=function(a,g,p,m){var d=this.options,f=this.len,c=this.lin2log,x=this.log2lin,e=[];m||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),e=this.getLinearTickPositions(a,g,p);else if(.08<=a)for(var f=Math.floor(g),b,u,l,k,F,d=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<p+1&&!F;f++)for(u=d.length,b=0;b<u&&!F;b++)l=x(c(f)*d[b]),l>g&&(!m||k<=
p)&&void 0!==k&&e.push(k),k>p&&(F=!0),k=l;else g=c(g),p=c(p),a=d[m?"minorTickInterval":"tickInterval"],a=q("auto"===a?null:a,this._minorAutoInterval,d.tickPixelInterval/(m?5:1)*(p-g)/((m?f/this.tickPositions.length:f)||1)),a=D(a,null,C(a)),e=E(this.getLinearTickPositions(a,g,p),x),m||(this._minorAutoInterval=a/5);m||(this.tickInterval=a);return e};y.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};y.prototype.lin2log=function(a){return Math.pow(10,a)}})(L);(function(a,y){var C=a.arrayMax,
E=a.arrayMin,D=a.defined,q=a.destroyObjectProperties,d=a.each,g=a.erase,p=a.merge,m=a.pick;a.PlotLineOrBand=function(a,d){this.axis=a;d&&(this.options=d,this.id=d.id)};a.PlotLineOrBand.prototype={render:function(){var d=this,f=d.axis,c=f.horiz,g=d.options,e=g.label,b=d.label,u=g.to,l=g.from,k=g.value,F=D(l)&&D(u),q=D(k),B=d.svgElem,I=!B,r=[],G=m(g.zIndex,0),w=g.events,r={"class":"highcharts-plot-"+(F?"band ":"line ")+(g.className||"")},A={},v=f.chart.renderer,J=F?"bands":"lines",h;h=f.log2lin;f.isLog&&
(l=h(l),u=h(u),k=h(k));A.zIndex=G;J+="-"+G;(h=f.plotLinesAndBandsGroups[J])||(f.plotLinesAndBandsGroups[J]=h=v.g("plot-"+J).attr(A).add());I&&(d.svgElem=B=v.path().attr(r).add(h));if(q)r=f.getPlotLinePath(k,B.strokeWidth());else if(F)r=f.getPlotBandPath(l,u,g);else return;I&&r&&r.length?(B.attr({d:r}),w&&a.objectEach(w,function(a,b){B.on(b,function(a){w[b].apply(d,[a])})})):B&&(r?(B.show(),B.animate({d:r})):(B.hide(),b&&(d.label=b=b.destroy())));e&&D(e.text)&&r&&r.length&&0<f.width&&0<f.height&&!r.flat?
(e=p({align:c&&F&&"center",x:c?!F&&4:10,verticalAlign:!c&&F&&"middle",y:c?F?16:10:F?6:-4,rotation:c&&!F&&90},e),this.renderLabel(e,r,F,G)):b&&b.hide();return d},renderLabel:function(a,d,c,g){var e=this.label,b=this.axis.chart.renderer;e||(e={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(c?"band":"line")+"-label "+(a.className||"")},e.zIndex=g,this.label=e=b.text(a.text,0,0,a.useHTML).attr(e).add());g=[d[1],d[4],c?d[6]:d[1]];d=[d[2],d[5],c?d[7]:d[2]];c=E(g);b=E(d);e.align(a,
!1,{x:c,y:b,width:C(g)-c,height:C(d)-b});e.show()},destroy:function(){g(this.axis.plotLinesAndBands,this);delete this.axis;q(this)}};a.extend(y.prototype,{getPlotBandPath:function(a,d){var c=this.getPlotLinePath(d,null,null,!0),f=this.getPlotLinePath(a,null,null,!0),e=this.horiz,b=1;a=a<this.min&&d<this.min||a>this.max&&d>this.max;f&&c?(a&&(f.flat=f.toString()===c.toString(),b=0),f.push(e&&c[4]===f[4]?c[4]+b:c[4],e||c[5]!==f[5]?c[5]:c[5]+b,e&&c[1]===f[1]?c[1]+b:c[1],e||c[2]!==f[2]?c[2]:c[2]+b)):f=
null;return f},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(d,f){var c=(new a.PlotLineOrBand(this,d)).render(),g=this.userOptions;c&&(f&&(g[f]=g[f]||[],g[f].push(d)),this.plotLinesAndBands.push(c));return c},removePlotBandOrLine:function(a){for(var f=this.plotLinesAndBands,c=this.options,x=this.userOptions,e=f.length;e--;)f[e].id===a&&f[e].destroy();d([c.plotLines||[],x.plotLines||
[],c.plotBands||[],x.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&g(b,b[e])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(L,T);(function(a){var y=a.dateFormat,C=a.each,E=a.extend,D=a.format,q=a.isNumber,d=a.map,g=a.merge,p=a.pick,m=a.splat,n=a.syncTimeout,f=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];
this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split},cleanSplit:function(a){C(this.chart.series,function(c){var e=c&&c.tt;e&&(!e.isActive||a?c.tt=e.destroy():e.isActive=!1)})},applyFilter:function(){var a=this.chart;a.renderer.definition({tagName:"filter",id:"drop-shadow-"+a.index,opacity:.5,children:[{tagName:"feGaussianBlur",in:"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",
type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode",in:"SourceGraphic"}]}]});a.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+a.index+"{filter:url(#drop-shadow-"+a.index+")}"})},getLabel:function(){var a=this.chart.renderer,d=this.options;this.label||(this.label=this.split?a.g("tooltip"):a.label("",0,0,d.shape||"callout",null,null,d.useHTML,null,"tooltip").attr({padding:d.padding,r:d.borderRadius}),this.applyFilter(),this.label.addClass("highcharts-tooltip-"+
this.chart.index),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();g(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,g(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,d,e,b){var c=this,l=c.now,k=!1!==c.options.animation&&!c.isHidden&&(1<Math.abs(a-
l.x)||1<Math.abs(d-l.y)),f=c.followPointer||1<c.len;E(l,{x:k?(2*l.x+a)/3:a,y:k?(l.y+d)/2:d,anchorX:f?void 0:k?(2*l.anchorX+e)/3:e,anchorY:f?void 0:k?(l.anchorY+b)/2:b});c.getLabel().attr(l);k&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){c&&c.move(a,d,e,b)},32))},hide:function(a){var c=this;clearTimeout(this.hideTimer);a=p(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=n(function(){c.getLabel()[a?"fadeOut":"hide"]();c.isHidden=!0},a))},getAnchor:function(a,
f){var e,b=this.chart,c=b.inverted,l=b.plotTop,k=b.plotLeft,g=0,p=0,B,n;a=m(a);e=a[0].tooltipPos;this.followPointer&&f&&(void 0===f.chartX&&(f=b.pointer.normalize(f)),e=[f.chartX-b.plotLeft,f.chartY-l]);e||(C(a,function(a){B=a.series.yAxis;n=a.series.xAxis;g+=a.plotX+(!c&&n?n.left-k:0);p+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!c&&B?B.top-l:0)}),g/=a.length,p/=a.length,e=[c?b.plotWidth-p:g,this.shared&&!c&&1<a.length&&f?f.chartY-l:c?b.plotHeight-g:p]);return d(e,Math.round)},getPosition:function(a,
d,e){var b=this.chart,c=this.distance,l={},k=e.h||0,f,g=["y",b.chartHeight,d,e.plotY+b.plotTop,b.plotTop,b.plotTop+b.plotHeight],B=["x",b.chartWidth,a,e.plotX+b.plotLeft,b.plotLeft,b.plotLeft+b.plotWidth],n=!this.followPointer&&p(e.ttBelow,!b.inverted===!!e.negative),r=function(a,b,e,d,f,w){var h=e<d-c,v=d+c+e<b,g=d-c-e;d+=c;if(n&&v)l[a]=d;else if(!n&&h)l[a]=g;else if(h)l[a]=Math.min(w-e,0>g-k?g:g-k);else if(v)l[a]=Math.max(f,d+k+e>b?d:d+k);else return!1},m=function(a,b,e,d){var h;d<c||d>b-c?h=!1:
l[a]=d<e/2?1:d>b-e/2?b-e-2:d-e/2;return h},w=function(a){var b=g;g=B;B=b;f=a},A=function(){!1!==r.apply(0,g)?!1!==m.apply(0,B)||f||(w(!0),A()):f?l.x=l.y=0:(w(!0),A())};(b.inverted||1<this.len)&&w();A();return l},defaultFormatter:function(a){var c=this.points||m(this),e;e=[a.tooltipFooterHeaderFormatter(c[0])];e=e.concat(a.bodyFormatter(c));e.push(a.tooltipFooterHeaderFormatter(c[0],!0));return e},refresh:function(a,d){var e,b=this.options,c=a,l,k={},f=[];e=b.formatter||this.defaultFormatter;var k=
this.shared,g;b.enabled&&(clearTimeout(this.hideTimer),this.followPointer=m(c)[0].series.tooltipOptions.followPointer,l=this.getAnchor(c,d),d=l[0],b=l[1],!k||c.series&&c.series.noSharedTooltip?k=c.getLabelConfig():(C(c,function(a){a.setState("hover");f.push(a.getLabelConfig())}),k={x:c[0].category,y:c[0].y},k.points=f,c=c[0]),this.len=f.length,k=e.call(k,this),g=c.series,this.distance=p(g.tooltipOptions.distance,16),!1===k?this.hide():(e=this.getLabel(),this.isHidden&&e.attr({opacity:1}).show(),this.split?
this.renderSplit(k,a):(e.css({width:this.chart.spacingBox.width}),e.attr({text:k&&k.join?k.join(""):k}),e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+p(c.colorIndex,g.colorIndex)),this.updatePosition({plotX:d,plotY:b,negative:c.negative,ttBelow:c.ttBelow,h:l[2]||0})),this.isHidden=!1))},renderSplit:function(c,d){var e=this,b=[],f=this.chart,l=f.renderer,k=!0,g=this.options,n=0,B=this.getLabel();C(c.slice(0,d.length+1),function(a,c){if(!1!==a){c=d[c-1]||{isHeader:!0,plotX:d[0].plotX};
var u=c.series||e,w=u.tt,A="highcharts-color-"+p(c.colorIndex,(c.series||{}).colorIndex,"none");w||(u.tt=w=l.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+A).attr({padding:g.padding,r:g.borderRadius}).add(B));w.isActive=!0;w.attr({text:a});a=w.getBBox();A=a.width+w.strokeWidth();c.isHeader?(n=a.height,A=Math.max(0,Math.min(c.plotX+f.plotLeft-A/2,f.chartWidth-A))):A=c.plotX+f.plotLeft-p(g.distance,16)-A;0>A&&(k=!1);a=(c.series&&c.series.yAxis&&c.series.yAxis.pos)+(c.plotY||0);
a-=f.plotTop;b.push({target:c.isHeader?f.plotHeight+n:a,rank:c.isHeader?1:0,size:u.tt.getBBox().height+1,point:c,x:A,tt:w})}});this.cleanSplit();a.distribute(b,f.plotHeight+n);C(b,function(a){var b=a.point,e=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:k||b.isHeader?a.x:b.plotX+f.plotLeft+p(g.distance,16),y:a.pos+f.plotTop,anchorX:b.isHeader?b.plotX+f.plotLeft:b.plotX+e.xAxis.pos,anchorY:b.isHeader?a.pos+f.plotTop-15:b.plotY+e.yAxis.pos})})},updatePosition:function(a){var c=
this.chart,e=this.getLabel(),e=(this.options.positioner||this.getPosition).call(this,e.width,e.height,a);this.move(Math.round(e.x),Math.round(e.y||0),a.plotX+c.plotLeft,a.plotY+c.plotTop)},getDateFormat:function(a,d,e,b){var c=y("%m-%d %H:%M:%S.%L",d),l,k,g={millisecond:15,second:12,minute:9,hour:6,day:3},n="millisecond";for(k in f){if(a===f.week&&+y("%w",d)===e&&"00:00:00.000"===c.substr(6)){k="week";break}if(f[k]>a){k=n;break}if(g[k]&&c.substr(g[k])!=="01-01 00:00:00.000".substr(g[k]))break;"week"!==
k&&(n=k)}k&&(l=b[k]);return l},getXDateFormat:function(a,d,e){d=d.dateTimeLabelFormats;var b=e&&e.closestPointRange;return(b?this.getDateFormat(b,a.x,e.options.startOfWeek,d):d.day)||d.year},tooltipFooterHeaderFormatter:function(a,d){var e=d?"footer":"header";d=a.series;var b=d.tooltipOptions,c=b.xDateFormat,l=d.xAxis,k=l&&"datetime"===l.options.type&&q(a.key),e=b[e+"Format"];k&&!c&&(c=this.getXDateFormat(a,b,l));k&&c&&(e=e.replace("{point.key}","{point.key:"+c+"}"));return D(e,{point:a,series:d})},
bodyFormatter:function(a){return d(a,function(a){var e=a.series.tooltipOptions;return(e.pointFormatter||a.point.tooltipFormatter).call(a.point,e.pointFormat)})}}})(L);(function(a){var y=a.addEvent,C=a.attr,E=a.charts,D=a.css,q=a.defined,d=a.each,g=a.extend,p=a.find,m=a.fireEvent,n=a.isObject,f=a.offset,c=a.pick,x=a.removeEvent,e=a.splat,b=a.Tooltip,u=a.win;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,e){this.options=e;this.chart=a;this.runChartClick=e.chart.events&&
!!e.chart.events.click;this.pinchDown=[];this.lastValidTouch={};b&&(a.tooltip=new b(a,e.tooltip),this.followTouchMove=c(e.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,e=b.options.chart,d=e.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(d=c(e.pinchType,d));this.zoomX=a=/x/.test(d);this.zoomY=d=/y/.test(d);this.zoomHor=a&&!b||d&&b;this.zoomVert=d&&!b||a&&b;this.hasZoom=a||d},normalize:function(a,b){var e,c;a=a||u.event;a.target||(a.target=a.srcElement);
c=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=f(this.chart.container));void 0===c.pageX?(e=Math.max(a.x,a.clientX-b.left),b=a.y):(e=c.pageX-b.left,b=c.pageY-b.top);return g(a,{chartX:Math.round(e),chartY:Math.round(b)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};d(this.chart.axes,function(e){b[e.isXAxis?"xAxis":"yAxis"].push({axis:e,value:e.toValue(a[e.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,b,e){var c;d(a,function(a){var d=
!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(e,d);if((d=n(a,!0))&&!(d=!n(c,!0)))var d=c.distX-a.distX,k=c.dist-a.dist,f=(a.series.group&&a.series.group.zIndex)-(c.series.group&&c.series.group.zIndex),d=0<(0!==d&&b?d:0!==k?k:0!==f?f:c.series.index>a.series.index?-1:1);d&&(c=a)});return c},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var e=a.series,c=e.xAxis,e=e.yAxis;if(c&&
e)return b?{chartX:c.len+c.pos-a.clientX,chartY:e.len+e.pos-a.plotY}:{chartX:a.clientX+c.pos,chartY:a.plotY+e.pos}},getHoverData:function(b,e,f,g,u,m){var k,l=[];g=!(!g||!b);var w=e&&!e.stickyTracking?[e]:a.grep(f,function(a){return a.visible&&!(!u&&a.directTouch)&&c(a.options.enableMouseTracking,!0)&&a.stickyTracking});e=(k=g?b:this.findNearestKDPoint(w,u,m))&&k.series;k&&(u&&!e.noSharedTooltip?(w=a.grep(f,function(a){return a.visible&&!(!u&&a.directTouch)&&c(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),
d(w,function(a){a=p(a.points,function(a){return a.x===k.x});n(a)&&!a.isNull&&l.push(a)})):l.push(k));return{hoverPoint:k,hoverSeries:e,hoverPoints:l}},runPointActions:function(b,e){var k=this.chart,f=k.tooltip,l=f?f.shared:!1,g=e||k.hoverPoint,u=g&&g.series||k.hoverSeries,u=this.getHoverData(g,u,k.series,!!e||u&&u.directTouch&&this.isDirectTouch,l,b),n,g=u.hoverPoint;n=u.hoverPoints;e=(u=u.hoverSeries)&&u.tooltipOptions.followPointer;l=l&&u&&!u.noSharedTooltip;if(g&&(g!==k.hoverPoint||f&&f.isHidden)){d(k.hoverPoints||
[],function(b){-1===a.inArray(b,n)&&b.setState()});d(n||[],function(a){a.setState("hover")});if(k.hoverSeries!==u)u.onMouseOver();k.hoverPoint&&k.hoverPoint.firePointEvent("mouseOut");g.firePointEvent("mouseOver");k.hoverPoints=n;k.hoverPoint=g;f&&f.refresh(l?n:g,b)}else e&&f&&!f.isHidden&&(g=f.getAnchor([{}],b),f.updatePosition({plotX:g[0],plotY:g[1]}));this.unDocMouseMove||(this.unDocMouseMove=y(k.container.ownerDocument,"mousemove",function(b){var e=E[a.hoverChartIndex];if(e)e.pointer.onDocumentMouseMove(b)}));
d(k.axes,function(e){var d=c(e.crosshair.snap,!0),k=d?a.find(n,function(a){return a.series[e.coll]===e}):void 0;k||!d?e.drawCrosshair(b,k):e.hideCrosshair()})},reset:function(a,b){var c=this.chart,k=c.hoverSeries,f=c.hoverPoint,l=c.hoverPoints,g=c.tooltip,u=g&&g.shared?l:f;a&&u&&d(e(u),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)g&&u&&(g.refresh(u),f&&(f.setState(f.state,!0),d(c.axes,function(a){a.crosshair&&a.drawCrosshair(null,f)})));else{if(f)f.onMouseOut();l&&d(l,function(a){a.setState()});
if(k)k.onMouseOut();g&&g.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());d(c.axes,function(a){a.hideCrosshair()});this.hoverX=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(a,b){var e=this.chart,c;d(e.series,function(d){c=a||d.getPlotBox();d.xAxis&&d.xAxis.zoomEnabled&&d.group&&(d.group.attr(c),d.markerGroup&&(d.markerGroup.attr(c),d.markerGroup.clip(b?e.clipRect:null)),d.dataLabelsGroup&&d.dataLabelsGroup.attr(c))});e.clipRect.attr(b||e.clipBox)},dragStart:function(a){var b=
this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,e=b.options.chart,c=a.chartX,d=a.chartY,f=this.zoomHor,l=this.zoomVert,g=b.plotLeft,w=b.plotTop,u=b.plotWidth,v=b.plotHeight,n,h=this.selectionMarker,t=this.mouseDownX,p=this.mouseDownY,m=e.panKey&&a[e.panKey+"Key"];h&&h.touch||(c<g?c=g:c>g+u&&(c=g+u),d<w?d=w:d>w+v&&(d=w+v),this.hasDragged=Math.sqrt(Math.pow(t-c,2)+Math.pow(p-d,2)),10<this.hasDragged&&
(n=b.isInsidePlot(t-g,p-w),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&n&&!m&&!h&&(this.selectionMarker=h=b.renderer.rect(g,w,f?1:u,l?1:v,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add()),h&&f&&(c-=t,h.attr({width:Math.abs(c),x:(0<c?0:c)+t})),h&&l&&(c=d-p,h.attr({height:Math.abs(c),y:(0<c?0:c)+p})),n&&!h&&e.panning&&b.pan(a,e.panning)))},drop:function(a){var b=this,e=this.chart,c=this.hasPinched;if(this.selectionMarker){var f={originalEvent:a,xAxis:[],yAxis:[]},l=this.selectionMarker,
u=l.attr?l.attr("x"):l.x,n=l.attr?l.attr("y"):l.y,w=l.attr?l.attr("width"):l.width,A=l.attr?l.attr("height"):l.height,v;if(this.hasDragged||c)d(e.axes,function(e){if(e.zoomEnabled&&q(e.min)&&(c||b[{xAxis:"zoomX",yAxis:"zoomY"}[e.coll]])){var h=e.horiz,d="touchend"===a.type?e.minPixelPadding:0,k=e.toValue((h?u:n)+d),h=e.toValue((h?u+w:n+A)-d);f[e.coll].push({axis:e,min:Math.min(k,h),max:Math.max(k,h)});v=!0}}),v&&m(e,"selection",f,function(a){e.zoom(g(a,c?{animation:!1}:null))});this.selectionMarker=
this.selectionMarker.destroy();c&&this.scaleGroups()}e&&(D(e.container,{cursor:e._cursor}),e.cancelClick=10<this.hasDragged,e.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,e=this.chartPosition;a=this.normalize(a,e);
!e||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var e=E[a.hoverChartIndex];e&&(b.relatedTarget||b.toElement)&&(e.pointer.reset(),e.pointer.chartPosition=null)},onContainerMouseMove:function(b){var e=this.chart;q(a.hoverChartIndex)&&E[a.hoverChartIndex]&&E[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=e.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===e.mouseIsDown&&this.drag(b);!this.inClass(b.target,
"highcharts-tracker")&&!e.isInsidePlot(b.chartX-e.plotLeft,b.chartY-e.plotTop)||e.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var e;a;){if(e=C(a,"class")){if(-1!==e.indexOf(b))return!0;if(-1!==e.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,
"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,e=b.hoverPoint,c=b.plotLeft,d=b.plotTop;a=this.normalize(a);b.cancelClick||(e&&this.inClass(a.target,"highcharts-tracker")?(m(e.series,"click",g(a,{point:e})),b.hoverPoint&&e.firePointEvent("click",a)):(g(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-c,a.chartY-d)&&m(b,"click",a)))},setDOMEvents:function(){var b=this,e=b.chart.container,c=e.ownerDocument;e.onmousedown=function(a){b.onContainerMouseDown(a)};e.onmousemove=
function(a){b.onContainerMouseMove(a)};e.onclick=function(a){b.onContainerClick(a)};y(e,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&y(c,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(e.ontouchstart=function(a){b.onContainerTouchStart(a)},e.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&y(c,"touchend",b.onDocumentTouchEnd))},destroy:function(){var b=this,e=this.chart.container.ownerDocument;b.unDocMouseMove&&b.unDocMouseMove();x(b.chart.container,"mouseleave",b.onContainerMouseLeave);
a.chartCount||(x(e,"mouseup",b.onDocumentMouseUp),a.hasTouch&&x(e,"touchend",b.onDocumentTouchEnd));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,e){b[e]=null})}}})(L);(function(a){var y=a.charts,C=a.each,E=a.extend,D=a.map,q=a.noop,d=a.pick;E(a.Pointer.prototype,{pinchTranslate:function(a,d,m,n,f,c){this.zoomHor&&this.pinchTranslateDirection(!0,a,d,m,n,f,c);this.zoomVert&&this.pinchTranslateDirection(!1,a,d,m,n,f,c)},pinchTranslateDirection:function(a,d,m,n,f,c,q,e){var b=this.chart,
g=a?"x":"y",l=a?"X":"Y",k="chart"+l,p=a?"width":"height",x=b["plot"+(a?"Left":"Top")],B,I,r=e||1,G=b.inverted,w=b.bounds[a?"h":"v"],A=1===d.length,v=d[0][k],J=m[0][k],h=!A&&d[1][k],t=!A&&m[1][k],M;m=function(){!A&&20<Math.abs(v-h)&&(r=e||Math.abs(J-t)/Math.abs(v-h));I=(x-J)/r+v;B=b["plot"+(a?"Width":"Height")]/r};m();d=I;d<w.min?(d=w.min,M=!0):d+B>w.max&&(d=w.max-B,M=!0);M?(J-=.8*(J-q[g][0]),A||(t-=.8*(t-q[g][1])),m()):q[g]=[J,t];G||(c[g]=I-x,c[p]=B);c=G?1/r:r;f[p]=B;f[g]=d;n[G?a?"scaleY":"scaleX":
"scale"+l]=r;n["translate"+l]=c*x+(J-c*v)},pinch:function(a){var g=this,m=g.chart,n=g.pinchDown,f=a.touches,c=f.length,x=g.lastValidTouch,e=g.hasZoom,b=g.selectionMarker,u={},l=1===c&&(g.inClass(a.target,"highcharts-tracker")&&m.runTrackerClick||g.runChartClick),k={};1<c&&(g.initiated=!0);e&&g.initiated&&!l&&a.preventDefault();D(f,function(a){return g.normalize(a)});"touchstart"===a.type?(C(f,function(a,b){n[b]={chartX:a.chartX,chartY:a.chartY}}),x.x=[n[0].chartX,n[1]&&n[1].chartX],x.y=[n[0].chartY,
n[1]&&n[1].chartY],C(m.axes,function(a){if(a.zoomEnabled){var b=m.bounds[a.horiz?"h":"v"],e=a.minPixelPadding,c=a.toPixels(d(a.options.min,a.dataMin)),f=a.toPixels(d(a.options.max,a.dataMax)),k=Math.max(c,f);b.min=Math.min(a.pos,Math.min(c,f)-e);b.max=Math.max(a.pos+a.len,k+e)}}),g.res=!0):g.followTouchMove&&1===c?this.runPointActions(g.normalize(a)):n.length&&(b||(g.selectionMarker=b=E({destroy:q,touch:!0},m.plotBox)),g.pinchTranslate(n,f,u,b,k,x),g.hasPinched=e,g.scaleGroups(u,k),g.res&&(g.res=
!1,this.reset(!1,0)))},touch:function(g,p){var m=this.chart,n,f;if(m.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=m.index;1===g.touches.length?(g=this.normalize(g),(f=m.isInsidePlot(g.chartX-m.plotLeft,g.chartY-m.plotTop))&&!m.openMenu?(p&&this.runPointActions(g),"touchmove"===g.type&&(p=this.pinchDown,n=p[0]?4<=Math.sqrt(Math.pow(p[0].chartX-g.chartX,2)+Math.pow(p[0].chartY-g.chartY,2)):!1),d(n,!0)&&this.pinch(g)):p&&this.reset()):2===g.touches.length&&
this.pinch(g)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(d){y[a.hoverChartIndex]&&y[a.hoverChartIndex].pointer.drop(d)}})})(L);(function(a){var y=a.addEvent,C=a.charts,E=a.css,D=a.doc,q=a.extend,d=a.noop,g=a.Pointer,p=a.removeEvent,m=a.win,n=a.wrap;if(!a.hasTouch&&(m.PointerEvent||m.MSPointerEvent)){var f={},c=!!m.PointerEvent,x=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(f,
function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},e=function(b,e,c,f){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!C[a.hoverChartIndex]||(f(b),f=C[a.hoverChartIndex].pointer,f[e]({type:c,target:b.currentTarget,preventDefault:d,touches:x()}))};q(g.prototype,{onContainerPointerDown:function(a){e(a,"onContainerTouchStart","touchstart",function(a){f[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){e(a,
"onContainerTouchMove","touchmove",function(a){f[a.pointerId]={pageX:a.pageX,pageY:a.pageY};f[a.pointerId].target||(f[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){e(a,"onDocumentTouchEnd","touchend",function(a){delete f[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,c?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,c?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(D,c?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});
n(g.prototype,"init",function(a,e,c){a.call(this,e,c);this.hasZoom&&E(e.container,{"-ms-touch-action":"none","touch-action":"none"})});n(g.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(y)});n(g.prototype,"destroy",function(a){this.batchMSEvents(p);a.call(this)})}})(L);(function(a){var y=a.addEvent,C=a.css,E=a.discardElement,D=a.defined,q=a.each,d=a.isFirefox,g=a.marginNames,p=a.merge,m=a.pick,n=a.setAnimation,f=a.stableSort,c=a.win,x=a.wrap;
a.Legend=function(a,b){this.init(a,b)};a.Legend.prototype={init:function(a,b){this.chart=a;this.setOptions(b);b.enabled&&(this.render(),y(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var b=m(a.padding,8);this.options=a;this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=m(a.symbolWidth,16);this.pages=[]},update:function(a,b){var e=this.chart;this.setOptions(p(!0,this.options,
a));this.destroy();e.isDirtyLegend=e.isDirtyBox=!0;m(b,!0)&&e.redraw()},colorizeItem:function(a,b){a.legendGroup[b?"removeClass":"addClass"]("highcharts-legend-item-hidden")},positionItem:function(a){var b=this.options,e=b.symbolPadding,b=!b.rtl,c=a._legendItemPos,d=c[0],c=c[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?d:this.legendWidth-d-2*e-4,c);f&&(f.x=d,f.y=c)},destroyItem:function(a){var b=a.checkbox;q(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&
(a[b]=a[b].destroy())});b&&E(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}q(this.getAllItems(),function(b){q(["legendItem","legendGroup"],a,b)});q("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,e,c=this.clipHeight||this.legendHeight,d=this.titleHeight;b&&(e=b.translateY,q(this.allItems,function(f){var k=f.checkbox,g;k&&(g=e+d+k.y+(a||0)+3,C(k,{left:b.translateX+
f.checkboxOffset+k.x-20+"px",top:g+"px",display:g>e-6&&g<e+c-6?"":"none"}))}))},renderTitle:function(){var a=this.options,b=this.padding,c=a.title,d=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,b-3,b-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).add(this.group)),a=this.title.getBBox(),d=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:d}));this.titleHeight=d},setText:function(e){var b=this.options;e.legendItem.attr({text:b.labelFormat?
a.format(b.labelFormat,e):b.labelFormatter.call(e)})},renderItem:function(a){var b=this.chart,e=b.renderer,c=this.options,d="horizontal"===c.layout,f=this.symbolWidth,g=c.symbolPadding,n=this.padding,p=d?m(c.itemDistance,20):0,r=!c.rtl,q=c.width,w=c.itemMarginBottom||0,A=this.itemMarginTop,v=a.legendItem,x=!a.series,h=!x&&a.series.drawLegendSymbol?a.series:a,t=h.options,M=this.createCheckboxForItem&&t&&t.showCheckbox,t=f+g+p+(M?20:0),K=c.useHTML,N=a.options.className;v||(a.legendGroup=e.g("legend-item").addClass("highcharts-"+
h.type+"-series highcharts-color-"+a.colorIndex+(N?" "+N:"")+(x?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=v=e.text("",r?f+g:-g,this.baseline||0,K).attr({align:r?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(this.fontMetrics=e.fontMetrics(12,v),this.baseline=this.fontMetrics.f+3+A,v.attr("y",this.baseline)),this.symbolHeight=c.symbolHeight||this.fontMetrics.f,h.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,v,K),M&&this.createCheckboxForItem(a));
this.colorizeItem(a,a.visible);v.css({width:(c.itemWidth||c.width||b.spacingBox.width)-t});this.setText(a);e=v.getBBox();f=a.checkboxOffset=c.itemWidth||a.legendItemWidth||e.width+t;this.itemHeight=e=Math.round(a.legendItemHeight||e.height||this.symbolHeight);d&&this.itemX-n+f>(q||b.spacingBox.width-2*n-c.x)&&(this.itemX=n,this.itemY+=A+this.lastLineHeight+w,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,f);this.lastItemY=A+this.itemY+w;this.lastLineHeight=Math.max(e,this.lastLineHeight);
a._legendItemPos=[this.itemX,this.itemY];d?this.itemX+=f:(this.itemY+=A+e+w,this.lastLineHeight=e);this.offsetWidth=q||Math.max((d?this.itemX-n-(a.checkbox?0:p):f)+n,this.offsetWidth)},getAllItems:function(){var a=[];q(this.chart.series,function(b){var e=b&&b.options;b&&m(e.showInLegend,D(e.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===e.legendType?b.data:b)))});return a},adjustMargins:function(a,b){var e=this.chart,c=this.options,d=c.align.charAt(0)+c.verticalAlign.charAt(0)+c.layout.charAt(0);
c.floating||q([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,k){f.test(d)&&!D(a[k])&&(e[g[k]]=Math.max(e[g[k]],e.legend[(k+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][k]*c[k%2?"x":"y"]+m(c.margin,12)+b[k]))})},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,k,g,n,m,x=a.box,r=a.options,G=a.padding;a.itemX=G;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;d||(a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=
c.g().add(a.contentGroup));a.renderTitle();k=a.getAllItems();f(k,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});r.reversed&&k.reverse();a.allItems=k;a.display=g=!!k.length;a.lastLineHeight=0;q(k,function(b){a.renderItem(b)});n=(r.width||a.offsetWidth)+G;m=a.lastItemY+a.lastLineHeight+a.titleHeight;m=a.handleOverflow(m);m+=G;x||(a.box=x=c.rect().addClass("highcharts-legend-box").attr({r:r.borderRadius}).add(d),x.isNew=!0);0<n&&0<m&&(x[x.isNew?"attr":
"animate"](x.crisp({x:0,y:0,width:n,height:m},x.strokeWidth())),x.isNew=!1);x[g?"show":"hide"]();"none"===d.getStyle("display")&&(n=m=0);a.legendWidth=n;a.legendHeight=m;q(k,function(b){a.positionItem(b)});g&&d.align(p(r,{width:n,height:m}),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,e=c.renderer,d=this.options,f=d.y,g=this.padding,c=c.spacingBox.height+("top"===d.verticalAlign?-f:f)-g,f=d.maxHeight,n,p=this.clipRect,r=d.navigation,
x=m(r.animation,!0),w=r.arrowSize||12,A=this.nav,v=this.pages,J,h=this.allItems,t=function(a){"number"===typeof a?p.attr({height:a}):p&&(b.clipRect=p.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+g+"px,9999px,"+(g+a)+"px,0)":"auto")};"horizontal"!==d.layout||"middle"===d.verticalAlign||d.floating||(c/=2);f&&(c=Math.min(c,f));v.length=0;a>c&&!1!==r.enabled?(this.clipHeight=n=Math.max(c-20-this.titleHeight-g,0),this.currentPage=m(this.currentPage,1),this.fullHeight=
a,q(h,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var e=v.length;if(!e||c-v[e-1]>n&&(J||c)!==v[e-1])v.push(J||c),e++;b===h.length-1&&c+a-v[e-1]>n&&v.push(c);c!==J&&(J=c)}),p||(p=b.clipRect=e.clipRect(0,g,9999,0),b.contentGroup.clip(p)),t(n),A||(this.nav=A=e.g().attr({zIndex:1}).add(this.group),this.up=e.symbol("triangle",0,0,w,w).on("click",function(){b.scroll(-1,x)}).add(A),this.pager=e.text("",15,10).addClass("highcharts-legend-navigation").add(A),this.down=
e.symbol("triangle-down",0,0,w,w).on("click",function(){b.scroll(1,x)}).add(A)),b.scroll(0),a=c):A&&(t(),this.nav=A.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,b){var c=this.pages,e=c.length;a=this.currentPage+a;var d=this.clipHeight,f=this.pager,g=this.padding;a>e&&(a=e);0<a&&(void 0!==b&&n(b,this.chart),this.nav.attr({translateX:g,translateY:d+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":
"highcharts-legend-nav-active"}),f.attr({text:a+"/"+e}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===e?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),b=-c[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:b}),this.currentPage=a,this.positionCheckboxes(b))}};a.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.symbolHeight,e=a.options.squareSymbol;b.legendSymbol=this.chart.renderer.rect(e?(a.symbolWidth-c)/2:0,a.baseline-c+1,e?c:a.symbolWidth,c,m(a.options.symbolRadius,
c/2)).addClass("highcharts-point").attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options.marker,c,e=a.symbolWidth,d=a.symbolHeight;c=d/2;var f=this.chart.renderer,g=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);this.legendLine=f.path(["M",0,a,"L",e,a]).addClass("highcharts-graph").attr({}).add(g);b&&!1!==b.enabled&&(c=Math.min(m(b.radius,c),c),0===this.symbol.indexOf("url")&&(b=p(b,{width:d,height:d}),c=0),this.legendSymbol=b=f.symbol(this.symbol,e/2-c,
a-c,2*c,2*c,b).addClass("highcharts-point").add(g),b.isMarker=!0)}};(/Trident\/7\.0/.test(c.navigator.userAgent)||d)&&x(a.Legend.prototype,"positionItem",function(a,b){var c=this,e=function(){b._legendItemPos&&a.call(c,b)};e();setTimeout(e)})})(L);(function(a){var y=a.addEvent,C=a.animObject,E=a.attr,D=a.doc,q=a.Axis,d=a.createElement,g=a.defaultOptions,p=a.discardElement,m=a.charts,n=a.defined,f=a.each,c=a.extend,x=a.find,e=a.fireEvent,b=a.getStyle,u=a.grep,l=a.isNumber,k=a.isObject,F=a.isString,
H=a.Legend,B=a.marginNames,I=a.merge,r=a.objectEach,G=a.Pointer,w=a.pick,A=a.pInt,v=a.removeEvent,J=a.seriesTypes,h=a.splat,t=a.svg,M=a.syncTimeout,K=a.win,N=a.Renderer,O=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new O(a,b,c)};c(O.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(F(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var e,d,h=b.series,f=b.plotOptions||{};b.series=null;e=I(g,b);
for(d in e.plotOptions)e.plotOptions[d].tooltip=f[d]&&I(f[d].tooltip)||void 0;e.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;e.series=b.series=h;this.userOptions=b;b=e.chart;d=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=e;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;var k=this;k.index=m.length;m.push(k);a.chartCount++;d&&r(d,function(a,b){y(k,b,a)});k.xAxis=[];k.yAxis=[];k.pointCount=
k.colorCounter=k.symbolCounter=0;k.firstRender()},initSeries:function(b){var c=this.options.chart;(c=J[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,b,c){var e=c?b:a;a=c?a:b;return 0<=e&&e<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var d=this.axes,h=this.series,k=this.pointer,g=this.legend,
w=this.isDirtyLegend,v,l,t=this.hasCartesianSeries,A=this.isDirtyBox,n,m=this.renderer,r=m.isHidden(),p=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);r&&this.temporaryDisplay();this.layOutTitles();for(b=h.length;b--;)if(n=h[b],n.options.stacking&&(v=!0,n.isDirty)){l=!0;break}if(l)for(b=h.length;b--;)n=h[b],n.options.stacking&&(n.isDirty=!0);f(h,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),w=!0);a.isDirtyData&&e(a,"updatedData")});
w&&g.options.enabled&&(g.render(),this.isDirtyLegend=!1);v&&this.getStacks();t&&f(d,function(a){a.updateNames();a.setScale()});this.getMargins();t&&(f(d,function(a){a.isDirty&&(A=!0)}),f(d,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,p.push(function(){e(a,"afterSetExtremes",c(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(A||v)&&a.redraw()}));A&&this.drawChartBox();e(this,"predraw");f(h,function(a){(A||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});k&&k.reset(!0);m.draw();
e(this,"redraw");e(this,"render");r&&this.temporaryDisplay(!0);f(p,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var c,e=this.series,d;c=x(this.axes,b)||x(this.series,b);for(d=0;!c&&d<e.length;d++)c=x(e[d].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=h(b.xAxis||{}),b=b.yAxis=h(b.yAxis||{});f(c,function(a,b){a.index=b;a.isX=!0});f(b,function(a,b){a.index=b});c=c.concat(b);f(c,function(b){new q(a,b)})},getSelectedPoints:function(){var a=
[];f(this.series,function(b){a=a.concat(u(b.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return u(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var e=this,d=e.options,h;h=d.title=I(d.title,a);d=d.subtitle=I(d.subtitle,b);f([["title",a,h],["subtitle",b,d]],function(a,b){var c=a[0],d=e[c],h=a[1];a=a[2];d&&h&&(e[c]=d=d.destroy());a&&a.text&&!d&&(e[c]=e.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||
4}).add(),e[c].update=function(a){e.setTitle(!b&&a,b&&a)})});e.layOutTitles(c)},layOutTitles:function(a){var b=0,e,d=this.renderer,h=this.spacingBox;f(["title","subtitle"],function(a){var e=this[a],f=this.options[a];a="title"===a?-3:f.verticalAlign?0:b+2;var k;e&&(k=d.fontMetrics(k,e).b,e.css({width:(f.width||h.width+f.widthAdjust)+"px"}).align(c({y:a+k},f),!1,"spacingBox"),f.floating||f.verticalAlign||(b=Math.ceil(b+e.getBBox(f.useHTML).height)))},this);e=this.titleOffset!==b;this.titleOffset=b;
!this.isDirtyBox&&e&&(this.isDirtyBox=e,this.hasRendered&&w(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var c=this.options.chart,e=c.width,c=c.height,d=this.renderTo;n(e)||(this.containerWidth=b(d,"width"));n(c)||(this.containerHeight=b(d,"height"));this.chartWidth=Math.max(0,e||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(c,this.chartWidth)||this.containerHeight||400)},temporaryDisplay:function(c){var e=this.renderTo;if(c)for(;e&&e.style;)e.hcOrigStyle&&
(a.css(e,e.hcOrigStyle),delete e.hcOrigStyle),e.hcOrigDetached&&(D.body.removeChild(e),e.hcOrigDetached=!1),e=e.parentNode;else for(;e&&e.style;){D.body.contains(e)||(e.hcOrigDetached=!0,D.body.appendChild(e));if("none"===b(e,"display",!1)||e.hcOricDetached)e.hcOrigStyle={display:e.style.display,height:e.style.height,overflow:e.style.overflow},c={display:"block",overflow:"hidden"},e!==this.renderTo&&(c.height=0),a.css(e,c),e.offsetWidth||e.style.setProperty("display","block","important");e=e.parentNode;
if(e===D.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,e=c.chart,h,f;b=this.renderTo;var k=a.uniqueKey(),g;b||(this.renderTo=b=e.renderTo);F(b)&&(this.renderTo=b=D.getElementById(b));b||a.error(13,!0);h=A(E(b,"data-highcharts-chart"));l(h)&&m[h]&&m[h].hasRendered&&m[h].destroy();E(b,"data-highcharts-chart",this.index);b.innerHTML="";e.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();
h=this.chartWidth;f=this.chartHeight;this.container=b=d("div",{id:k},void 0,b);this._cursor=b.style.cursor;this.renderer=new (a[e.renderer]||N)(b,h,f,null,e.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(e.className);for(g in c.defs)this.renderer.definition(c.defs[g]);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,e=this.titleOffset;this.resetMargins();e&&!n(c[0])&&(this.plotTop=Math.max(this.plotTop,e+this.options.title.margin+b[0]));
this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&f(a.axes,function(a){a.visible&&a.getOffset()});f(B,function(e,d){n(c[d])||(a[e]+=b[d])});a.setChartSize()},reflow:function(a){var c=this,e=c.options.chart,d=c.renderTo,
h=n(e.width)&&n(e.height),f=e.width||b(d,"width"),e=e.height||b(d,"height"),d=a?a.target:K;if(!h&&!c.isPrinting&&f&&e&&(d===K||d===D)){if(f!==c.containerWidth||e!==c.containerHeight)clearTimeout(c.reflowTimeout),c.reflowTimeout=M(function(){c.container&&c.setSize(void 0,void 0,!1)},a?100:0);c.containerWidth=f;c.containerHeight=e}},initReflow:function(){var a=this,b;b=y(K,"resize",function(b){a.reflow(b)});y(a,"destroy",b)},setSize:function(b,c,d){var h=this,k=h.renderer;h.isResizing+=1;a.setAnimation(d,
h);h.oldChartHeight=h.chartHeight;h.oldChartWidth=h.chartWidth;void 0!==b&&(h.options.chart.width=b);void 0!==c&&(h.options.chart.height=c);h.getChartSize();h.setChartSize(!0);k.setSize(h.chartWidth,h.chartHeight,d);f(h.axes,function(a){a.isDirty=!0;a.setScale()});h.isDirtyLegend=!0;h.isDirtyBox=!0;h.layOutTitles();h.getMargins();h.redraw(d);h.oldChartHeight=null;e(h,"resize");M(function(){h&&e(h,"endResize",null,function(){--h.isResizing})},C(void 0).duration)},setChartSize:function(a){function b(a){a=
w[a]||0;return Math.max(n||a,a)/2}var c=this.inverted,e=this.renderer,d=this.chartWidth,h=this.chartHeight,k=this.options.chart,g=this.spacing,w=this.clipOffset,v,l,t,A,n;this.plotLeft=v=Math.round(this.plotLeft);this.plotTop=l=Math.round(this.plotTop);this.plotWidth=t=Math.max(0,Math.round(d-v-this.marginRight));this.plotHeight=A=Math.max(0,Math.round(h-l-this.marginBottom));this.plotSizeX=c?A:t;this.plotSizeY=c?t:A;this.plotBorderWidth=k.plotBorderWidth||0;this.spacingBox=e.spacingBox={x:g[3],y:g[0],
width:d-g[3]-g[1],height:h-g[0]-g[2]};this.plotBox=e.plotBox={x:v,y:l,width:t,height:A};n=2*Math.floor(this.plotBorderWidth/2);c=Math.ceil(b(3));e=Math.ceil(b(0));this.clipBox={x:c,y:e,width:Math.floor(this.plotSizeX-b(1)-c),height:Math.max(0,Math.floor(this.plotSizeY-b(2)-e))};a||f(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;f(["margin","spacing"],function(c){var e=b[c],d=k(e)?e:[e,e,e,e];f(["Top","Right","Bottom","Left"],function(e,
h){a[c][h]=w(b[c+e],d[h])})});f(B,function(b,c){a[b]=w(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,e=this.chartHeight,d=this.chartBackground,h=this.plotBackground,f=this.plotBorder,k,g,w=this.plotLeft,v=this.plotTop,l=this.plotWidth,t=this.plotHeight,A=this.plotBox,n=this.clipRect,m=this.clipBox,r="animate";d||(this.chartBackground=d=b.rect().addClass("highcharts-background").add(),r="attr");
k=g=d.strokeWidth();d[r]({x:g/2,y:g/2,width:c-g-k%2,height:e-g-k%2,r:a.borderRadius});r="animate";h||(r="attr",this.plotBackground=h=b.rect().addClass("highcharts-plot-background").add());h[r](A);n?n.animate({width:m.width,height:m.height}):this.clipRect=b.clipRect(m);r="animate";f||(r="attr",this.plotBorder=f=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());f[r](f.crisp({x:w,y:v,width:l,height:t},-f.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,
c,e=a.options.series,d,h;f(["inverted","angular","polar"],function(f){c=J[b.type||b.defaultSeriesType];h=b[f]||c&&c.prototype[f];for(d=e&&e.length;!h&&d--;)(c=J[e[d].type])&&c.prototype[f]&&(h=!0);a[f]=h})},linkSeries:function(){var a=this,b=a.series;f(b,function(a){a.linkedSeries.length=0});f(b,function(b){var c=b.options.linkedTo;F(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=w(b.options.visible,c.options.visible,b.visible))})},
renderSeries:function(){f(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&f(b.items,function(e){var d=c(b.style,e.style),h=A(d.left)+a.plotLeft,f=A(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(e.html,h,f).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,e,d,h;this.setTitle();this.legend=new H(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();
c=this.plotWidth;e=this.plotHeight-=21;f(a,function(a){a.setScale()});this.getAxisMargins();d=1.1<c/this.plotWidth;h=1.05<e/this.plotHeight;if(d||h)f(a,function(a){(a.horiz&&d||!a.horiz&&h)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&f(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=
!0},addCredits:function(a){var b=this;a=I(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(K.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,d=b.series,h=b.container,k,g=h&&h.parentNode;e(b,"destroy");b.renderer.forExport?
a.erase(m,b):m[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");v(b);for(k=c.length;k--;)c[k]=c[k].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(k=d.length;k--;)d[k]=d[k].destroy();f("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});h&&(h.innerHTML="",v(h),
g&&p(h));r(b,function(a,c){delete b[c]})},isReadyToRender:function(){var a=this;return t||K!=K.top||"complete"===D.readyState?!0:(D.attachEvent("onreadystatechange",function(){D.detachEvent("onreadystatechange",a.firstRender);"complete"===D.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();e(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();f(b.series||[],function(b){a.initSeries(b)});a.linkSeries();e(a,
"beforeRender");G&&(a.pointer=new G(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){f([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);e(this,"load");e(this,"render");n(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(L);(function(a){var y,C=a.each,E=a.extend,D=a.erase,q=a.fireEvent,d=a.format,g=a.isArray,p=a.isNumber,m=a.pick,n=a.removeEvent;a.Point=y=
function(){};a.Point.prototype={init:function(a,c,d){var e=a.chart.options.chart.colorCount;this.series=a;this.applyOptions(c,d);a.options.colorByPoint?(c=a.colorCounter,a.colorCounter++,a.colorCounter===e&&(a.colorCounter=0)):c=a.colorIndex;this.colorIndex=m(this.colorIndex,c);a.chart.pointCount++;return this},applyOptions:function(a,c){var d=this.series,e=d.options.pointValKey||d.pointValKey;a=y.prototype.optionsToObject.call(this,a);E(this,a);this.options=this.options?E(this.options,a):a;a.group&&
delete this.group;e&&(this.y=this[e]);this.isNull=m(this.isValid&&!this.isValid(),null===this.x||!p(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===c&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===c?d.autoIncrement(this):c);return this},optionsToObject:function(a){var c={},d=this.series,e=d.options.keys,b=e||d.pointArrayMap||["y"],f=b.length,l=0,k=0;if(p(a)||null===a)c[b[0]]=a;else if(g(a))for(!e&&a.length>f&&(d=typeof a[0],
"string"===d?c.name=a[0]:"number"===d&&(c.x=a[0]),l++);k<f;)e&&void 0===a[l]||(c[b[k]]=a[l]),l++,k++;else"object"===typeof a&&(c=a,a.dataLabels&&(d._hasPointLabels=!0),a.marker&&(d._hasPointMarkers=!0));return c},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:
"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,c=a.zones,a=a.zoneAxis||"y",d=0,e;for(e=c[d];this[a]>=e.value;)e=c[++d];e&&e.color&&!this.options.color&&(this.color=e.color);return e},destroy:function(){var a=this.series.chart,c=a.hoverPoints,d;a.pointCount--;c&&(this.setState(),D(c,this),c.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)n(this),this.destroyElements();
this.legendItem&&a.legend.destroyItem(this);for(d in this)this[d]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],c,d=6;d--;)c=a[d],this[c]&&(this[c]=this[c].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var c=this.series,
f=c.tooltipOptions,e=m(f.valueDecimals,""),b=f.valuePrefix||"",g=f.valueSuffix||"";C(c.pointArrayMap||["y"],function(c){c="{point."+c;if(b||g)a=a.replace(c+"}",b+c+"}"+g);a=a.replace(c+"}",c+":,."+e+"f}")});return d(a,{point:this,series:this.series})},firePointEvent:function(a,c,d){var e=this,b=this.series.options;(b.point.events[a]||e.options&&e.options.events&&e.options.events[a])&&this.importEvents();"click"===a&&b.allowPointSelect&&(d=function(a){e.select&&e.select(null,a.ctrlKey||a.metaKey||
a.shiftKey)});q(this,a,c,d)},visible:!0}})(L);(function(a){var y=a.addEvent,C=a.animObject,E=a.arrayMax,D=a.arrayMin,q=a.correctFloat,d=a.Date,g=a.defaultOptions,p=a.defined,m=a.each,n=a.erase,f=a.extend,c=a.fireEvent,x=a.grep,e=a.isArray,b=a.isNumber,u=a.isString,l=a.merge,k=a.objectEach,F=a.pick,H=a.removeEvent,B=a.splat,I=a.SVGElement,r=a.syncTimeout,G=a.win;a.Series=a.seriesType("line",null,{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{radius:4,states:{hover:{animation:{duration:50},
enabled:!0,radiusPlus:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],
colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,e,d=a.series,g;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();f(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});e=b.events;k(e,function(a,b){y(c,b,a)});if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();m(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=
!0);d.length&&(g=d[d.length-1]);c._i=F(g&&g._i,-1)+1;a.orderSeries(this.insert(d))},insert:function(a){var c=this.options.index,e;if(b(c)){for(e=a.length;e--;)if(c>=F(a[e].options.index,a[e]._i)){a.splice(e+1,0,this);break}-1===e&&a.unshift(this);e+=1}else a.push(this);return F(e,a.length-1)},bindAxes:function(){var b=this,c=b.options,e=b.chart,d;m(b.axisTypes||[],function(h){m(e[h],function(a){d=a.options;if(c[h]===d.index||void 0!==c[h]&&c[h]===d.id||void 0===c[h]&&0===d.index)b.insert(a.series),
b[h]=a,a.isDirty=!0});b[h]||b.optionalAxis===h||a.error(18,!0)})},updateParallelArrays:function(a,c){var e=a.series,d=arguments,h=b(c)?function(b){var d="y"===b&&e.toYData?e.toYData(a):a[b];e[b+"Data"][c]=d}:function(a){Array.prototype[c].apply(e[a+"Data"],Array.prototype.slice.call(d,2))};m(e.parallelArrays,h)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,e=a.pointIntervalUnit,b=F(b,a.pointStart,0);this.pointInterval=c=F(this.pointInterval,a.pointInterval,1);e&&(a=new d(b),"day"===
e?a=+a[d.hcSetDate](a[d.hcGetDate]()+c):"month"===e?a=+a[d.hcSetMonth](a[d.hcGetMonth]()+c):"year"===e&&(a=+a[d.hcSetFullYear](a[d.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options,e=c.plotOptions,d=(b.userOptions||{}).plotOptions||{},f=e[this.type];this.userOptions=a;b=l(f,e.series,a);this.tooltipOptions=l(g.tooltip,g.plotOptions.series&&g.plotOptions.series.tooltip,g.plotOptions[this.type].tooltip,c.tooltip.userOptions,e.series&&e.series.tooltip,
e[this.type].tooltip,a.tooltip);this.stickyTracking=F(a.stickyTracking,d[this.type]&&d[this.type].stickyTracking,d.series&&d.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===f.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative"});a.length&&p(a[a.length-1].value)&&a.push({});return b},
getCyclic:function(a,b,c){var e,d=this.chart,f=this.userOptions,k=a+"Index",g=a+"Counter",w=c?c.length:F(d.options.chart[a+"Count"],d[a+"Count"]);b||(e=F(f[k],f["_"+k]),p(e)||(d.series.length||(d[g]=0),f["_"+k]=e=d[g]%w,d[g]+=1),c&&(b=c[e]));void 0!==e&&(this[k]=e);this[a]=b},getColor:function(){this.getCyclic("color")},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(c,d,f,k){var h=
this,g=h.points,w=g&&g.length||0,l,v=h.options,n=h.chart,r=null,A=h.xAxis,p=v.turboThreshold,q=this.xData,B=this.yData,x=(l=h.pointArrayMap)&&l.length;c=c||[];l=c.length;d=F(d,!0);if(!1!==k&&l&&w===l&&!h.cropped&&!h.hasGroupedData&&h.visible)m(c,function(a,b){g[b].update&&a!==v.data[b]&&g[b].update(a,!1,null,!1)});else{h.xIncrement=null;h.colorCounter=0;m(this.parallelArrays,function(a){h[a+"Data"].length=0});if(p&&l>p){for(f=0;null===r&&f<l;)r=c[f],f++;if(b(r))for(f=0;f<l;f++)q[f]=this.autoIncrement(),
B[f]=c[f];else if(e(r))if(x)for(f=0;f<l;f++)r=c[f],q[f]=r[0],B[f]=r.slice(1,x+1);else for(f=0;f<l;f++)r=c[f],q[f]=r[0],B[f]=r[1];else a.error(12)}else for(f=0;f<l;f++)void 0!==c[f]&&(r={series:h},h.pointClass.prototype.applyOptions.apply(r,[c[f]]),h.updateParallelArrays(r,f));u(B[0])&&a.error(14,!0);h.data=[];h.options.data=h.userOptions.data=c;for(f=w;f--;)g[f]&&g[f].destroy&&g[f].destroy();A&&(A.minRange=A.userMinRange);h.isDirty=n.isDirtyBox=!0;h.isDirtyData=!!g;f=!1}"point"===v.legendType&&(this.processData(),
this.generatePoints());d&&n.redraw(f)},processData:function(b){var c=this.xData,e=this.yData,d=c.length,h;h=0;var f,k,g=this.xAxis,l,w=this.options;l=w.cropThreshold;var n=this.getExtremesFromAll||w.getExtremesFromAll,r=this.isCartesian,w=g&&g.val2lin,m=g&&g.isLog,p,u;if(r&&!this.isDirty&&!g.isDirty&&!this.yAxis.isDirty&&!b)return!1;g&&(b=g.getExtremes(),p=b.min,u=b.max);if(r&&this.sorted&&!n&&(!l||d>l||this.forceCrop))if(c[d-1]<p||c[0]>u)c=[],e=[];else if(c[0]<p||c[d-1]>u)h=this.cropData(this.xData,
this.yData,p,u),c=h.xData,e=h.yData,h=h.start,f=!0;for(l=c.length||1;--l;)d=m?w(c[l])-w(c[l-1]):c[l]-c[l-1],0<d&&(void 0===k||d<k)?k=d:0>d&&this.requireSorting&&a.error(15);this.cropped=f;this.cropStart=h;this.processedXData=c;this.processedYData=e;this.closestPointRange=k},cropData:function(a,b,c,e){var d=a.length,f=0,k=d,g=F(this.cropShoulder,1),l;for(l=0;l<d;l++)if(a[l]>=c){f=Math.max(0,l-g);break}for(c=l;c<d;c++)if(a[c]>e){k=c+g;break}return{xData:a.slice(f,k),yData:b.slice(f,k),start:f,end:k}},
generatePoints:function(){var a=this.options,b=a.data,c=this.data,e,d=this.processedXData,f=this.processedYData,k=this.pointClass,g=d.length,l=this.cropStart||0,n,r=this.hasGroupedData,a=a.keys,m,p=[],u;c||r||(c=[],c.length=b.length,c=this.data=c);a&&r&&(this.options.keys=!1);for(u=0;u<g;u++)n=l+u,r?(m=(new k).init(this,[d[u]].concat(B(f[u]))),m.dataGroup=this.groupMap[u]):(m=c[n])||void 0===b[n]||(c[n]=m=(new k).init(this,b[n],d[u])),m&&(m.index=n,p[u]=m);this.options.keys=a;if(c&&(g!==(e=c.length)||
r))for(u=0;u<e;u++)u!==l||r||(u+=g),c[u]&&(c[u].destroyElements(),c[u].plotX=void 0);this.data=c;this.points=p},getExtremes:function(a){var c=this.yAxis,d=this.processedXData,f,h=[],k=0;f=this.xAxis.getExtremes();var g=f.min,l=f.max,w,n,r,m;a=a||this.stackedYData||this.processedYData||[];f=a.length;for(m=0;m<f;m++)if(n=d[m],r=a[m],w=(b(r,!0)||e(r))&&(!c.positiveValuesOnly||r.length||0<r),n=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(d[m]||n)>=g&&(d[m]||n)<=l,w&&n)if(w=
r.length)for(;w--;)null!==r[w]&&(h[k++]=r[w]);else h[k++]=r;this.dataMin=D(h);this.dataMax=E(h)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,c=a.stacking,e=this.xAxis,d=e.categories,h=this.yAxis,f=this.points,k=f.length,g=!!this.modifyValue,l=a.pointPlacement,n="between"===l||b(l),r=a.threshold,m=a.startFromThreshold?r:0,u,B,x,I,G=Number.MAX_VALUE;"between"===l&&(l=.5);b(l)&&(l*=F(a.pointRange||e.pointRange));for(a=0;a<k;a++){var y=f[a],C=
y.x,H=y.y;B=y.low;var D=c&&h.stacks[(this.negStacks&&H<(m?0:r)?"-":"")+this.stackKey],E;h.positiveValuesOnly&&null!==H&&0>=H&&(y.isNull=!0);y.plotX=u=q(Math.min(Math.max(-1E5,e.translate(C,0,0,0,1,l,"flags"===this.type)),1E5));c&&this.visible&&!y.isNull&&D&&D[C]&&(I=this.getStackIndicator(I,C,this.index),E=D[C],H=E.points[I.key],B=H[0],H=H[1],B===m&&I.key===D[C].base&&(B=F(r,h.min)),h.positiveValuesOnly&&0>=B&&(B=null),y.total=y.stackTotal=E.total,y.percentage=E.total&&y.y/E.total*100,y.stackY=H,
E.setOffset(this.pointXOffset||0,this.barW||0));y.yBottom=p(B)?h.translate(B,0,1,0,1):null;g&&(H=this.modifyValue(H,y));y.plotY=B="number"===typeof H&&Infinity!==H?Math.min(Math.max(-1E5,h.translate(H,0,1,0,1)),1E5):void 0;y.isInside=void 0!==B&&0<=B&&B<=h.len&&0<=u&&u<=e.len;y.clientX=n?q(e.translate(C,0,0,0,1,l)):u;y.negative=y.y<(r||0);y.category=d&&void 0!==d[y.x]?d[y.x]:y.x;y.isNull||(void 0!==x&&(G=Math.min(G,Math.abs(u-x))),x=u);y.zone=this.zones.length&&y.getZone()}this.closestPointRangePx=
G},getValidPoints:function(a,b){var c=this.chart;return x(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,e=b.renderer,d=b.inverted,f=this.clipBox,k=f||b.clipBox,g=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,k.height,c.xAxis,c.yAxis].join(),l=b[g],n=b[g+"m"];l||(a&&(k.width=0,b[g+"m"]=n=e.clipRect(-99,d?-b.plotLeft:-b.plotTop,99,d?b.chartWidth:b.chartHeight)),b[g]=l=e.clipRect(k),
l.count={length:0});a&&!l.count[this.index]&&(l.count[this.index]=!0,l.count.length+=1);!1!==c.clip&&(this.group.clip(a||f?l:b.clipRect),this.markerGroup.clip(n),this.sharedClipKey=g);a||(l.count[this.index]&&(delete l.count[this.index],--l.count.length),0===l.count.length&&g&&b[g]&&(f||(b[g]=b[g].destroy()),b[g+"m"]&&(b[g+"m"]=b[g+"m"].destroy())))},animate:function(a){var b=this.chart,c=C(this.options.animation),e;a?this.setClip(c):(e=this.sharedClipKey,(a=b[e])&&a.animate({width:b.plotSizeX},c),
b[e+"m"]&&b[e+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();c(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,c=this.chart,e,d,h,f,k=this.options.marker,g,l,n,r,m=this[this.specialGroup]||this.markerGroup,u=F(k.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*k.radius);if(!1!==k.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)h=a[d],e=h.plotY,f=h.graphic,g=h.marker||{},l=!!h.marker,n=u&&
void 0===g.enabled||g.enabled,r=h.isInside,n&&b(e)&&null!==h.y?(e=F(g.symbol,this.symbol),h.hasImage=0===e.indexOf("url"),n=this.markerAttribs(h,h.selected&&"select"),f?f[r?"show":"hide"](!0).animate(n):r&&(0<n.width||h.hasImage)&&(h.graphic=f=c.renderer.symbol(e,n.x,n.y,n.width,n.height,l?g:k).add(m)),f&&f.addClass(h.getClassName(),!0)):f&&(h.graphic=f.destroy())},markerAttribs:function(a,b){var c=this.options.marker,e=a.marker||{},d=F(e.radius,c.radius);b&&(c=c.states[b],b=e.states&&e.states[b],
d=F(b&&b.radius,c&&c.radius,d+(c&&c.radiusPlus||0)));a.hasImage&&(d=0);a={x:Math.floor(a.plotX)-d,y:a.plotY-d};d&&(a.width=a.height=2*d);return a},destroy:function(){var a=this,b=a.chart,e=/AppleWebKit\/533/.test(G.navigator.userAgent),d,h,f=a.data||[],g,l;c(a,"destroy");H(a);m(a.axisTypes||[],function(b){(l=a[b])&&l.series&&(n(l.series,a),l.isDirty=l.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(h=f.length;h--;)(g=f[h])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);
k(a,function(a,b){a instanceof I&&!a.survive&&(d=e&&"group"===b?"hide":"destroy",a[d]())});b.hoverSeries===a&&(b.hoverSeries=null);n(b.series,a);b.orderSeries();k(a,function(b,c){delete a[c]})},getGraphPath:function(a,b,c){var e=this,d=e.options,f=d.step,g,k=[],l=[],n;a=a||e.points;(g=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&g&&(f=4-f);!d.connectNulls||b||c||(a=this.getValidPoints(a));m(a,function(h,g){var r=h.plotX,m=h.plotY,w=a[g-1];(h.leftCliff||w&&w.rightCliff)&&!c&&(n=!0);h.isNull&&
!p(b)&&0<g?n=!d.connectNulls:h.isNull&&!b?n=!0:(0===g||n?g=["M",h.plotX,h.plotY]:e.getPointSpline?g=e.getPointSpline(a,h,g):f?(g=1===f?["L",w.plotX,m]:2===f?["L",(w.plotX+r)/2,w.plotY,"L",(w.plotX+r)/2,m]:["L",r,w.plotY],g.push("L",r,m)):g=["L",r,m],l.push(h.x),f&&l.push(h.x),k.push.apply(k,g),n=!1)});k.xMap=l;return e.graphPath=k},drawGraph:function(){var a=this,b=(this.gappedPath||this.getGraphPath).call(this),c=[["graph","highcharts-graph"]];m(this.zones,function(a,b){c.push(["zone-graph-"+b,"highcharts-graph highcharts-zone-graph-"+
b+" "+(a.className||"")])});m(c,function(c,e){e=c[0];var d=a[e];d?(d.endX=b.xMap,d.animate({d:b})):b.length&&(a[e]=a.chart.renderer.path(b).addClass(c[1]).attr({zIndex:1}).add(a.group));d&&(d.startX=b.xMap,d.isArea=b.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,e=this.zones,d,f,g=this.clips||[],k,l=this.graph,n=this.area,r=Math.max(b.chartWidth,b.chartHeight),u=this[(this.zoneAxis||"y")+"Axis"],p,q,B=b.inverted,x,I,G,y,H=!1;e.length&&(l||n)&&u&&void 0!==u.min&&(q=u.reversed,
x=u.horiz,l&&l.hide(),n&&n.hide(),p=u.getExtremes(),m(e,function(e,h){d=q?x?b.plotWidth:0:x?0:u.toPixels(p.min);d=Math.min(Math.max(F(f,d),0),r);f=Math.min(Math.max(Math.round(u.toPixels(F(e.value,p.max),!0)),0),r);H&&(d=f=u.toPixels(p.max));I=Math.abs(d-f);G=Math.min(d,f);y=Math.max(d,f);u.isXAxis?(k={x:B?y:G,y:0,width:I,height:r},x||(k.x=b.plotHeight-k.x)):(k={x:0,y:B?y:G,width:r,height:I},x&&(k.y=b.plotWidth-k.y));g[h]?g[h].animate(k):(g[h]=c.clipRect(k),l&&a["zone-graph-"+h].clip(g[h]),n&&a["zone-area-"+
h].clip(g[h]));H=e.value>p.max}),this.clips=g)},invertGroups:function(a){function b(){m(["group","markerGroup"],function(b){c[b]&&(e.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,e=c.chart,d;c.xAxis&&(d=y(e,"resize",b),y(c,"destroy",d),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,e,d){var h=this[a],f=!h;f&&(this[a]=h=this.chart.renderer.g().attr({zIndex:e||.1}).add(d));h.addClass("highcharts-"+b+" highcharts-series-"+
this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+(this.options.className||""),!0);h.attr({visibility:c})[f?"attr":"animate"](this.getPlotBox());return h},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,e=a.options,d=!!a.animate&&b.renderer.isSVG&&C(e.animation).duration,f=a.visible?"inherit":
"hidden",g=e.zIndex,k=a.hasRendered,l=b.seriesGroup,n=b.inverted;c=a.plotGroup("group","series",f,g,l);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,l);d&&a.animate(!0);c.inverted=a.isCartesian?n:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(n);!1===e.clip||a.sharedClipKey||k||c.clip(b.clipRect);d&&a.animate();k||(a.animationTimeout=r(function(){a.afterAnimate()},
d));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,e=this.xAxis,d=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:F(e&&e.left,a.plotLeft),translateY:F(d&&d.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,e=this.yAxis,d=this.chart.inverted;return this.searchKDTree({clientX:d?c.len-a.chartY+
c.pos:a.chartX-c.pos,plotY:d?e.len-a.chartX+e.pos:a.chartY-e.pos},b)},buildKDTree:function(){function a(c,e,d){var h,f;if(f=c&&c.length)return h=b.kdAxisArray[e%d],c.sort(function(a,b){return a[h]-b[h]}),f=Math.floor(f/2),{point:c[f],left:a(c.slice(0,f),e+1,d),right:a(c.slice(f+1),e+1,d)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;r(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},
searchKDTree:function(a,b){function c(a,b,h,k){var l=b.point,n=e.kdAxisArray[h%k],r,m,u=l;m=p(a[d])&&p(l[d])?Math.pow(a[d]-l[d],2):null;r=p(a[f])&&p(l[f])?Math.pow(a[f]-l[f],2):null;r=(m||0)+(r||0);l.dist=p(r)?Math.sqrt(r):Number.MAX_VALUE;l.distX=p(m)?Math.sqrt(m):Number.MAX_VALUE;n=a[n]-l[n];r=0>n?"left":"right";m=0>n?"right":"left";b[r]&&(r=c(a,b[r],h+1,k),u=r[g]<u[g]?r:l);b[m]&&Math.sqrt(n*n)<u[g]&&(a=c(a,b[m],h+1,k),u=a[g]<u[g]?a:u);return u}var e=this,d=this.kdAxisArray[0],f=this.kdAxisArray[1],
g=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(L);(function(a){var y=a.Axis,C=a.Chart,E=a.correctFloat,D=a.defined,q=a.destroyObjectProperties,d=a.each,g=a.format,p=a.objectEach,m=a.pick,n=a.Series;a.StackItem=function(a,c,d,e,b){var f=a.chart.inverted;this.axis=a;this.isNegative=d;this.options=c;this.x=e;this.total=null;this.points={};this.stack=b;this.rightCliff=this.leftCliff=
0;this.alignOptions={align:c.align||(f?d?"left":"right":"center"),verticalAlign:c.verticalAlign||(f?"middle":d?"bottom":"top"),y:m(c.y,f?4:d?14:-6),x:m(c.x,f?d?-6:6:0)};this.textAlign=c.textAlign||(f?d?"right":"left":"center")};a.StackItem.prototype={destroy:function(){q(this,this.axis)},render:function(a){var c=this.options,d=c.format,d=d?g(d,this):c.formatter.call(this);this.label?this.label.attr({text:d,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(d,null,null,c.useHTML).css(c.style).attr({align:this.textAlign,
rotation:c.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,c){var d=this.axis,e=d.chart,b=d.translate(d.usePercentage?100:this.total,0,0,0,1),d=d.translate(0),d=Math.abs(b-d);a=e.xAxis[0].translate(this.x)+a;b=this.getStackBox(e,this,a,b,c,d);if(c=this.label)c.align(this.alignOptions,null,b),b=c.alignAttr,c[!1===this.options.crop||e.isInsidePlot(b.x,b.y)?"show":"hide"](!0)},getStackBox:function(a,c,d,e,b,g){var f=c.axis.reversed,k=a.inverted;a=a.plotHeight;c=c.isNegative&&!f||!c.isNegative&&
f;return{x:k?c?e:e-g:d,y:k?a-d-b:c?a-e-g:a-e,width:k?g:b,height:k?b:g}}};C.prototype.getStacks=function(){var a=this;d(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});d(a.series,function(c){!c.options.stacking||!0!==c.visible&&!1!==a.options.chart.ignoreHiddenSeries||(c.stackKey=c.type+m(c.options.stack,""))})};y.prototype.buildStacks=function(){var a=this.series,c=m(this.options.reversedStacks,!0),d=a.length,e;if(!this.isXAxis){this.usePercentage=!1;for(e=d;e--;)a[c?e:
d-e-1].setStackedPoints();if(this.usePercentage)for(e=0;e<d;e++)a[e].setPercentStacks()}};y.prototype.renderStackTotals=function(){var a=this.chart,c=a.renderer,d=this.stacks,e=this.stackTotalGroup;e||(this.stackTotalGroup=e=c.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());e.translate(a.plotLeft,a.plotTop);p(d,function(a){p(a,function(a){a.render(e)})})};y.prototype.resetStacks=function(){var a=this,c=a.stacks;a.isXAxis||p(c,function(c){p(c,function(e,b){e.touched<a.stacksTouched?
(e.destroy(),delete c[b]):(e.total=null,e.cum=null)})})};y.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),p(a,function(a){p(a,function(a){a.cum=a.total})}))};n.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var d=this.processedXData,c=this.processedYData,g=[],e=c.length,b=this.options,n=b.threshold,l=b.startFromThreshold?n:0,k=b.stack,b=b.stacking,p=this.stackKey,
q="-"+p,B=this.negStacks,I=this.yAxis,r=I.stacks,G=I.oldStacks,w,A,v,y,h,t,C;I.stacksTouched+=1;for(h=0;h<e;h++)t=d[h],C=c[h],w=this.getStackIndicator(w,t,this.index),y=w.key,v=(A=B&&C<(l?0:n))?q:p,r[v]||(r[v]={}),r[v][t]||(G[v]&&G[v][t]?(r[v][t]=G[v][t],r[v][t].total=null):r[v][t]=new a.StackItem(I,I.options.stackLabels,A,t,k)),v=r[v][t],null!==C&&(v.points[y]=v.points[this.index]=[m(v.cum,l)],D(v.cum)||(v.base=y),v.touched=I.stacksTouched,0<w.index&&!1===this.singleStacks&&(v.points[y][0]=v.points[this.index+
","+t+",0"][0])),"percent"===b?(A=A?p:q,B&&r[A]&&r[A][t]?(A=r[A][t],v.total=A.total=Math.max(A.total,v.total)+Math.abs(C)||0):v.total=E(v.total+(Math.abs(C)||0))):v.total=E(v.total+(C||0)),v.cum=m(v.cum,l)+(C||0),null!==C&&(v.points[y].push(v.cum),g[h]=v.cum);"percent"===b&&(I.usePercentage=!0);this.stackedYData=g;I.oldStacks={}}};n.prototype.setPercentStacks=function(){var a=this,c=a.stackKey,g=a.yAxis.stacks,e=a.processedXData,b;d([c,"-"+c],function(c){for(var d=e.length,f,n;d--;)if(f=e[d],b=a.getStackIndicator(b,
f,a.index,c),f=(n=g[c]&&g[c][f])&&n.points[b.key])n=n.total?100/n.total:0,f[0]=E(f[0]*n),f[1]=E(f[1]*n),a.stackedYData[d]=f[1]})};n.prototype.getStackIndicator=function(a,c,d,e){!D(a)||a.x!==c||e&&a.key!==e?a={x:c,index:0,key:e}:a.index++;a.key=[d,c,a.index].join();return a}})(L);(function(a){var y=a.addEvent,C=a.Axis,E=a.createElement,D=a.css,q=a.defined,d=a.each,g=a.erase,p=a.extend,m=a.fireEvent,n=a.inArray,f=a.isNumber,c=a.isObject,x=a.isArray,e=a.merge,b=a.objectEach,u=a.pick,l=a.Point,k=a.Series,
F=a.seriesTypes,H=a.setAnimation,B=a.splat;p(a.Chart.prototype,{addSeries:function(a,b,c){var e,d=this;a&&(b=u(b,!0),m(d,"addSeries",{options:a},function(){e=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return e},addAxis:function(a,b,c,d){var f=b?"xAxis":"yAxis",g=this.options;a=e(a,{index:this[f].length,isX:b});b=new C(this,a);g[f]=B(g[f]||{});g[f].push(a);u(c,!0)&&this.redraw(d);return b},showLoading:function(a){var b=this,c=b.options,e=b.loadingDiv,d=function(){e&&D(e,{left:b.plotLeft+
"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};e||(b.loadingDiv=e=E("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=E("span",{className:"highcharts-loading-inner"},null,e),y(b,"redraw",d));e.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;b.loadingShown=!0;d()},hideLoading:function(){var a=this.loadingDiv;a&&(a.className="highcharts-loading highcharts-loading-hidden");this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),update:function(a,c,g){var k=this,l={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},r=a.chart,m,h,p=[];if(r){e(!0,k.options.chart,r);"className"in r&&k.setClassName(r.className);if("inverted"in r||"polar"in r)k.propFromSeries(),m=!0;"alignTicks"in r&&(m=!0);b(r,function(a,b){-1!==n("chart."+b,k.propsRequireUpdateSeries)&&(h=!0);-1!==n(b,k.propsRequireDirtyBox)&&
(k.isDirtyBox=!0)})}a.plotOptions&&e(!0,this.options.plotOptions,a.plotOptions);b(a,function(a,b){if(k[b]&&"function"===typeof k[b].update)k[b].update(a,!1);else if("function"===typeof k[l[b]])k[l[b]](a);"chart"!==b&&-1!==n(b,k.propsRequireUpdateSeries)&&(h=!0)});d("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&(d(B(a[b]),function(a,c){(c=q(a.id)&&k.get(a.id)||k[b][c])&&c.coll===b&&(c.update(a,!1),g&&(c.touched=!0));if(!c&&g)if("series"===b)k.addSeries(a,!1).touched=!0;else if("xAxis"===
b||"yAxis"===b)k.addAxis(a,"xAxis"===b,!1).touched=!0}),g&&d(k[b],function(a){a.touched?delete a.touched:p.push(a)}))});d(p,function(a){a.remove(!1)});m&&d(k.axes,function(a){a.update({},!1)});h&&d(k.series,function(a){a.update({},!1)});a.loading&&e(!0,k.options.loading,a.loading);m=r&&r.width;r=r&&r.height;f(m)&&m!==k.chartWidth||f(r)&&r!==k.chartHeight?k.setSize(m,r):u(c,!0)&&k.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});p(l.prototype,{update:function(a,b,e,d){function f(){g.applyOptions(a);
null===g.y&&h&&(g.graphic=h.destroy());c(a,!0)&&(h&&h.element&&a&&a.marker&&void 0!==a.marker.symbol&&(g.graphic=h.destroy()),a&&a.dataLabels&&g.dataLabel&&(g.dataLabel=g.dataLabel.destroy()));l=g.index;k.updateParallelArrays(g,l);r.data[l]=c(r.data[l],!0)||c(a,!0)?g.options:a;k.isDirty=k.isDirtyData=!0;!k.fixedBox&&k.hasCartesianSeries&&(n.isDirtyBox=!0);"point"===r.legendType&&(n.isDirtyLegend=!0);b&&n.redraw(e)}var g=this,k=g.series,h=g.graphic,l,n=k.chart,r=k.options;b=u(b,!0);!1===d?f():g.firePointEvent("update",
{options:a},f)},remove:function(a,b){this.series.removePoint(n(this,this.series.data),a,b)}});p(k.prototype,{addPoint:function(a,b,c,e){var d=this.options,f=this.data,g=this.chart,h=this.xAxis,h=h&&h.hasNames&&h.names,k=d.data,l,n,r=this.xData,m,p;b=u(b,!0);l={series:this};this.pointClass.prototype.applyOptions.apply(l,[a]);p=l.x;m=r.length;if(this.requireSorting&&p<r[m-1])for(n=!0;m&&r[m-1]>p;)m--;this.updateParallelArrays(l,"splice",m,0,0);this.updateParallelArrays(l,m);h&&l.name&&(h[p]=l.name);
k.splice(m,0,a);n&&(this.data.splice(m,0,null),this.processData());"point"===d.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(l,"shift"),k.shift()));this.isDirtyData=this.isDirty=!0;b&&g.redraw(e)},removePoint:function(a,b,c){var e=this,d=e.data,f=d[a],g=e.points,h=e.chart,k=function(){g&&g.length===d.length&&g.splice(a,1);d.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(f||{series:e},"splice",a,1);f&&f.destroy();e.isDirty=
!0;e.isDirtyData=!0;b&&h.redraw()};H(c,h);b=u(b,!0);f?f.firePointEvent("remove",null,k):k()},remove:function(a,b,c){function e(){d.destroy();f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();u(a,!0)&&f.redraw(b)}var d=this,f=d.chart;!1!==c?m(d,"remove",null,e):e()},update:function(a,b){var c=this,f=c.chart,g=c.userOptions,k=c.oldType||c.type,l=a.type||g.type||f.options.chart.type,h=F[k].prototype,n,m=["group","markerGroup","dataLabelsGroup","navigatorSeries","baseSeries"],r=c.finishedAnimating&&{animation:!1};
if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,b);if(l&&l!==k||void 0!==a.zIndex)m.length=0;d(m,function(a){m[a]=c[a];delete c[a]});a=e(g,r,{index:c.index,pointStart:c.xData[0]},{data:c.options.data},a);c.remove(!1,null,!1);for(n in h)c[n]=void 0;p(c,F[l||k].prototype);d(m,function(a){c[a]=m[a]});c.init(f,a);c.oldType=k;f.linkSeries();u(b,!0)&&f.redraw(!1)}});p(C.prototype,{update:function(a,b){var c=this.chart;a=c.options[this.coll][this.options.index]=e(this.userOptions,
a);this.destroy(!0);this.init(c,p(a,{events:void 0}));c.isDirtyBox=!0;u(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,e=this.series,f=e.length;f--;)e[f]&&e[f].remove(!1);g(b.axes,this);g(b[c],this);x(b.options[c])?b.options[c].splice(this.options.index,1):delete b.options[c];d(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;u(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(L);
(function(a){var y=a.each,C=a.map,E=a.pick,D=a.Series,q=a.seriesType;q("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(d){var g=[],p=[],m=this.xAxis,n=this.yAxis,f=n.stacks[this.stackKey],c={},q=this.index,e=n.series,b=e.length,u,l=E(n.options.reversedStacks,!0)?1:-1,k;d=d||this.points;if(this.options.stacking){for(k=0;k<d.length;k++)c[d[k].x]=d[k];a.objectEach(f,function(a,b){null!==a.total&&p.push(b)});p.sort(function(a,b){return a-b});u=C(e,function(){return this.visible});
y(p,function(a,e){var d=0,x,r;if(c[a]&&!c[a].isNull)g.push(c[a]),y([-1,1],function(d){var g=1===d?"rightNull":"leftNull",n=0,m=f[p[e+d]];if(m)for(k=q;0<=k&&k<b;)x=m.points[k],x||(k===q?c[a][g]=!0:u[k]&&(r=f[a].points[k])&&(n-=r[1]-r[0])),k+=l;c[a][1===d?"rightCliff":"leftCliff"]=n});else{for(k=q;0<=k&&k<b;){if(x=f[a].points[k]){d=x[1];break}k+=l}d=n.translate(d,0,1,0,1);g.push({isNull:!0,plotX:m.translate(a,0,0,0,1),x:a,plotY:d,yBottom:d})}})}return g},getGraphPath:function(a){var d=D.prototype.getGraphPath,
p=this.options,m=p.stacking,n=this.yAxis,f,c,q=[],e=[],b=this.index,u,l=n.stacks[this.stackKey],k=p.threshold,y=n.getThreshold(p.threshold),C,p=p.connectNulls||"percent"===m,B=function(c,d,f){var g=a[c];c=m&&l[g.x].points[b];var r=g[f+"Null"]||0;f=g[f+"Cliff"]||0;var p,B,g=!0;f||r?(p=(r?c[0]:c[1])+f,B=c[0]+f,g=!!r):!m&&a[d]&&a[d].isNull&&(p=B=k);void 0!==p&&(e.push({plotX:u,plotY:null===p?y:n.getThreshold(p),isNull:g,isCliff:!0}),q.push({plotX:u,plotY:null===B?y:n.getThreshold(B),doCurve:!1}))};a=
a||this.points;m&&(a=this.getStackPoints(a));for(f=0;f<a.length;f++)if(c=a[f].isNull,u=E(a[f].rectPlotX,a[f].plotX),C=E(a[f].yBottom,y),!c||p)p||B(f,f-1,"left"),c&&!m&&p||(e.push(a[f]),q.push({x:f,plotX:u,plotY:C})),p||B(f,f+1,"right");f=d.call(this,e,!0,!0);q.reversed=!0;c=d.call(this,q,!0,!0);c.length&&(c[0]="L");c=f.concat(c);d=d.call(this,e,!1,p);c.xMap=f.xMap;this.areaPath=c;return d},drawGraph:function(){this.areaPath=[];D.prototype.drawGraph.apply(this);var a=this,g=this.areaPath,p=this.options,
m=[["area","highcharts-area"]];y(this.zones,function(a,d){m.push(["zone-area-"+d,"highcharts-area highcharts-zone-area-"+d+" "+a.className])});y(m,function(d){var f=d[0],c=a[f];c?(c.endX=g.xMap,c.animate({d:g})):(c=a[f]=a.chart.renderer.path(g).addClass(d[1]).attr({zIndex:0}).add(a.group),c.isArea=!0);c.startX=g.xMap;c.shiftUnit=p.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var y=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,E,D){var q=
E.plotX,d=E.plotY,g=a[D-1];D=a[D+1];var p,m,n,f;if(g&&!g.isNull&&!1!==g.doCurve&&!E.isCliff&&D&&!D.isNull&&!1!==D.doCurve&&!E.isCliff){a=g.plotY;n=D.plotX;D=D.plotY;var c=0;p=(1.5*q+g.plotX)/2.5;m=(1.5*d+a)/2.5;n=(1.5*q+n)/2.5;f=(1.5*d+D)/2.5;n!==p&&(c=(f-m)*(n-q)/(n-p)+d-f);m+=c;f+=c;m>a&&m>d?(m=Math.max(a,d),f=2*d-m):m<a&&m<d&&(m=Math.min(a,d),f=2*d-m);f>D&&f>d?(f=Math.max(D,d),m=2*d-f):f<D&&f<d&&(f=Math.min(D,d),m=2*d-f);E.rightContX=n;E.rightContY=f}E=["C",y(g.rightContX,g.plotX),y(g.rightContY,
g.plotY),y(p,q),y(m,d),q,d];g.rightContX=g.rightContY=null;return E}})})(L);(function(a){var y=a.seriesTypes.area.prototype,C=a.seriesType;C("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:y.getStackPoints,getGraphPath:y.getGraphPath,drawGraph:y.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(L);(function(a){var y=a.animObject,C=a.each,E=a.extend,D=a.isNumber,q=a.merge,d=a.pick,g=a.Series,p=a.seriesType,m=a.svg;p("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,
marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){g.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&C(d.series,function(c){c.type===a.type&&(c.isDirty=!0)})},getColumnMetrics:function(){var a=
this,f=a.options,c=a.xAxis,g=a.yAxis,e=c.reversed,b,m={},l=0;!1===f.grouping?l=1:C(a.chart.series,function(c){var e=c.options,d=c.yAxis,f;c.type!==a.type||!c.visible&&a.chart.options.chart.ignoreHiddenSeries||g.len!==d.len||g.pos!==d.pos||(e.stacking?(b=c.stackKey,void 0===m[b]&&(m[b]=l++),f=m[b]):!1!==e.grouping&&(f=l++),c.columnIndex=f)});var k=Math.min(Math.abs(c.transA)*(c.ordinalSlope||f.pointRange||c.closestPointRange||c.tickInterval||1),c.len),p=k*f.groupPadding,q=(k-2*p)/(l||1),f=Math.min(f.maxPointWidth||
c.len,d(f.pointWidth,q*(1-2*f.pointPadding)));a.columnMetrics={width:f,offset:(q-f)/2+(p+((a.columnIndex||0)+(e?1:0))*q-k/2)*(e?-1:1)};return a.columnMetrics},crispCol:function(a,d,c,g){var e=this.chart,b=this.borderWidth,f=-(b%2?.5:0),b=b%2?.5:1;e.inverted&&e.renderer.isVML&&(b+=1);this.options.crisp&&(c=Math.round(a+c)+f,a=Math.round(a)+f,c-=a);g=Math.round(d+g)+b;f=.5>=Math.abs(d)&&.5<g;d=Math.round(d)+b;g-=d;f&&g&&(--d,g+=1);return{x:a,y:d,width:c,height:g}},translate:function(){var a=this,f=
a.chart,c=a.options,m=a.dense=2>a.closestPointRange*a.xAxis.transA,m=a.borderWidth=d(c.borderWidth,m?0:1),e=a.yAxis,b=a.translatedThreshold=e.getThreshold(c.threshold),p=d(c.minPointLength,5),l=a.getColumnMetrics(),k=l.width,q=a.barW=Math.max(k,1+2*m),y=a.pointXOffset=l.offset;f.inverted&&(b-=.5);c.pointPadding&&(q=Math.ceil(q));g.prototype.translate.apply(a);C(a.points,function(c){var g=d(c.yBottom,b),l=999+Math.abs(g),l=Math.min(Math.max(-l,c.plotY),e.len+l),n=c.plotX+y,m=q,u=Math.min(l,g),B,x=
Math.max(l,g)-u;Math.abs(x)<p&&p&&(x=p,B=!e.reversed&&!c.negative||e.reversed&&c.negative,u=Math.abs(u-b)>p?g-p:b-(B?p:0));c.barX=n;c.pointWidth=k;c.tooltipPos=f.inverted?[e.len+e.pos-f.plotLeft-l,a.xAxis.len-n-m/2,x]:[n+m/2,l+e.pos-f.plotTop,x];c.shapeType="rect";c.shapeArgs=a.crispCol.apply(a,c.isNull?[n,b,m,0]:[n,u,m,x])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},drawPoints:function(){var a=
this,d=this.chart,c=a.options,g=d.renderer,e=c.animationLimit||250,b;C(a.points,function(f){var l=f.graphic;if(D(f.plotY)&&null!==f.y){b=f.shapeArgs;if(l)l[d.pointCount<e?"animate":"attr"](q(b));else f.graphic=l=g[f.shapeType](b).add(f.group||a.group);c.borderRadius&&l.attr({r:c.borderRadius});l.addClass(f.getClassName(),!0)}else l&&(f.graphic=l.destroy())})},animate:function(a){var d=this,c=this.yAxis,g=d.options,e=this.chart.inverted,b={};m&&(a?(b.scaleY=.001,a=Math.min(c.pos+c.len,Math.max(c.pos,
c.toPixels(g.threshold))),e?b.translateX=a-c.len:b.translateY=a,d.group.attr(b)):(b[e?"translateX":"translateY"]=c.pos,d.group.animate(b,E(y(d.options.animation),{step:function(a,b){d.group.attr({scaleY:Math.max(.001,b.pos)})}})),d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&C(d.series,function(c){c.type===a.type&&(c.isDirty=!0)});g.prototype.remove.apply(a,arguments)}})})(L);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(L);(function(a){var y=a.Series;
a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cspan class\x3d"highcharts-header"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,
drawGraph:function(){this.options.lineWidth&&y.prototype.drawGraph.call(this)}})})(L);(function(a){var y=a.pick,C=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,D=this.chart,q=2*(a.slicedOffset||0),d=D.plotWidth-2*q,D=D.plotHeight-2*q,g=a.center,g=[y(g[0],"50%"),y(g[1],"50%"),a.size||"100%",a.innerSize||0],p=Math.min(d,D),m,n;for(m=0;4>m;++m)n=g[m],a=2>m||2===m&&/%$/.test(n),g[m]=C(n,[d,D,p,g[2]][m])+(a?q:0);g[3]>g[2]&&(g[3]=g[2]);return g}}})(L);(function(a){var y=
a.addEvent,C=a.defined,E=a.each,D=a.extend,q=a.inArray,d=a.noop,g=a.pick,p=a.Point,m=a.Series,n=a.seriesType,f=a.setAnimation;n("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,
trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var c=this,e=c.points,b=c.startAngleRad;a||(E(e,function(a){var e=a.graphic,d=a.shapeArgs;e&&(e.attr({r:a.startR||c.center[3]/2,start:b,end:b}),e.animate({r:d.r,start:d.start,end:d.end},c.options.animation))}),c.animate=null)},updateTotals:function(){var a,d=0,e=this.points,b=e.length,f,g=this.options.ignoreHiddenPoint;for(a=0;a<b;a++)f=e[a],d+=g&&!f.visible?0:f.isNull?
0:f.y;this.total=d;for(a=0;a<b;a++)f=e[a],f.percentage=0<d&&(f.visible||!g)?f.y/d*100:0,f.total=d},generatePoints:function(){m.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var c=0,d=this.options,b=d.slicedOffset,f=b+(d.borderWidth||0),l,k,m,n=d.startAngle||0,p=this.startAngleRad=Math.PI/180*(n-90),n=(this.endAngleRad=Math.PI/180*(g(d.endAngle,n+360)-90))-p,q=this.points,r,G=d.dataLabels.distance,d=d.ignoreHiddenPoint,w,A=q.length,v;a||(this.center=
a=this.getCenter());this.getX=function(b,c,d){m=Math.asin(Math.min((b-a[1])/(a[2]/2+d.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(m)*(a[2]/2+d.labelDistance)};for(w=0;w<A;w++){v=q[w];v.labelDistance=g(v.options.dataLabels&&v.options.dataLabels.distance,G);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,v.labelDistance);l=p+c*n;if(!d||v.visible)c+=v.percentage/100;k=p+c*n;v.shapeType="arc";v.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*l)/1E3,end:Math.round(1E3*
k)/1E3};m=(k+l)/2;m>1.5*Math.PI?m-=2*Math.PI:m<-Math.PI/2&&(m+=2*Math.PI);v.slicedTranslation={translateX:Math.round(Math.cos(m)*b),translateY:Math.round(Math.sin(m)*b)};k=Math.cos(m)*a[2]/2;r=Math.sin(m)*a[2]/2;v.tooltipPos=[a[0]+.7*k,a[1]+.7*r];v.half=m<-Math.PI/2||m>Math.PI/2?1:0;v.angle=m;l=Math.min(f,v.labelDistance/5);v.labelPos=[a[0]+k+Math.cos(m)*v.labelDistance,a[1]+r+Math.sin(m)*v.labelDistance,a[0]+k+Math.cos(m)*l,a[1]+r+Math.sin(m)*l,a[0]+k,a[1]+r,0>v.labelDistance?"center":v.half?"right":
"left",m]}},drawGraph:null,drawPoints:function(){var a=this,d=a.chart.renderer,e,b,f;E(a.points,function(c){c.isNull||(b=c.graphic,f=c.shapeArgs,e=c.getTranslate(),b?b.setRadialReference(a.center).animate(D(f,e)):(c.graphic=b=d[c.shapeType](f).setRadialReference(a.center).attr(e).add(a.group),c.visible||b.attr({visibility:"hidden"})),b.addClass(c.getClassName()))})},searchPoint:d,sortByAngle:function(a,d){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*d})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,
getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:d},{init:function(){p.prototype.init.apply(this,arguments);var a=this,d;a.name=g(a.name,"Slice");d=function(c){a.slice("select"===c.type)};y(a,"select",d);y(a,"unselect",d);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,d){var c=this,b=c.series,f=b.chart,l=b.options.ignoreHiddenPoint;d=g(d,l);a!==c.visible&&(c.visible=c.options.visible=a=void 0===a?!c.visible:a,b.options.data[q(c,b.data)]=c.options,E(["graphic",
"dataLabel","connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0)}),c.legendItem&&f.legend.colorizeItem(c,a),a||"hover"!==c.state||c.setState(""),l&&(b.isDirty=!0),d&&f.redraw())},slice:function(a,d,e){var b=this.series;f(e,b.chart);g(d,!0);this.sliced=this.options.sliced=C(a)?a:!this.sliced;b.options.data[q(this,b.data)]=this.options;this.graphic.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var c=
this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+a,c.r+a,{innerR:this.shapeArgs.r,start:c.start,end:c.end})}})})(L);(function(a){var y=a.addEvent,C=a.arrayMax,E=a.defined,D=a.each,q=a.extend,d=a.format,g=a.map,p=a.merge,m=a.noop,n=a.pick,f=a.relativeLength,c=a.Series,x=a.seriesTypes,e=a.stableSort;a.distribute=function(a,c){function b(a,b){return a.target-b.target}var d,f=!0,m=a,n=[],p;p=0;for(d=a.length;d--;)p+=a[d].size;if(p>c){e(a,function(a,
b){return(b.rank||0)-(a.rank||0)});for(p=d=0;p<=c;)p+=a[d].size,d++;n=a.splice(d-1,a.length)}e(a,b);for(a=g(a,function(a){return{size:a.size,targets:[a.target]}});f;){for(d=a.length;d--;)f=a[d],p=(Math.min.apply(0,f.targets)+Math.max.apply(0,f.targets))/2,f.pos=Math.min(Math.max(0,p-f.size/2),c-f.size);d=a.length;for(f=!1;d--;)0<d&&a[d-1].pos+a[d-1].size>a[d].pos&&(a[d-1].size+=a[d].size,a[d-1].targets=a[d-1].targets.concat(a[d].targets),a[d-1].pos+a[d-1].size>c&&(a[d-1].pos=c-a[d-1].size),a.splice(d,
1),f=!0)}d=0;D(a,function(a){var b=0;D(a.targets,function(){m[d].pos=a.pos+b;b+=m[d].size;d++})});m.push.apply(m,n);e(m,b)};c.prototype.drawDataLabels=function(){var b=this,c=b.options,e=c.dataLabels,f=b.points,g,m,q=b.hasRendered||0,x,r,G=n(e.defer,!!c.animation),w=b.chart.renderer;if(e.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(e),r=b.plotGroup("dataLabelsGroup","data-labels",G&&!q?"hidden":"visible",e.zIndex||6),G&&(r.attr({opacity:+q}),q||y(b,"afterAnimate",function(){b.visible&&
r.show(!0);r[c.animation?"animate":"attr"]({opacity:1},{duration:200})})),m=e,D(f,function(c){var f,k=c.dataLabel,h,l,q=c.connector,u=!k;g=c.dlOptions||c.options&&c.options.dataLabels;if(f=n(g&&g.enabled,m.enabled)&&null!==c.y)e=p(m,g),h=c.getLabelConfig(),x=e.format?d(e.format,h):e.formatter.call(h,e),h=e.rotation,l={r:e.borderRadius||0,rotation:h,padding:e.padding,zIndex:1},a.objectEach(l,function(a,b){void 0===a&&delete l[b]});!k||f&&E(x)?f&&E(x)&&(k?l.text=x:(k=c.dataLabel=w[h?"text":"label"](x,
0,-9999,e.shape,null,null,e.useHTML,null,"data-label"),k.addClass("highcharts-data-label-color-"+c.colorIndex+" "+(e.className||"")+(e.useHTML?"highcharts-tracker":""))),k.attr(l),k.added||k.add(r),b.alignDataLabel(c,k,e,null,u)):(c.dataLabel=k=k.destroy(),q&&(c.connector=q.destroy()))})};c.prototype.alignDataLabel=function(a,c,d,e,f){var b=this.chart,g=b.inverted,k=n(a.plotX,-9999),l=n(a.plotY,-9999),m=c.getBBox(),p,u=d.rotation,v=d.align,x=this.visible&&(a.series.forceDL||b.isInsidePlot(k,Math.round(l),
g)||e&&b.isInsidePlot(k,g?e.x+1:e.y+e.height-1,g)),h="justify"===n(d.overflow,"justify");if(x&&(p=b.renderer.fontMetrics(void 0,c).b,e=q({x:g?this.yAxis.len-l:k,y:Math.round(g?this.xAxis.len-k:l),width:0,height:0},e),q(d,{width:m.width,height:m.height}),u?(h=!1,k=b.renderer.rotCorr(p,u),k={x:e.x+d.x+e.width/2+k.x,y:e.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*e.height},c[f?"attr":"animate"](k).attr({align:v}),l=(u+720)%360,l=180<l&&360>l,"left"===v?k.y-=l?m.height:0:"center"===v?(k.x-=m.width/
2,k.y-=m.height/2):"right"===v&&(k.x-=m.width,k.y-=l?0:m.height)):(c.align(d,null,e),k=c.alignAttr),h?a.isLabelJustified=this.justifyDataLabel(c,d,k,m,e,f):n(d.crop,!0)&&(x=b.isInsidePlot(k.x,k.y)&&b.isInsidePlot(k.x+m.width,k.y+m.height)),d.shape&&!u))c[f?"attr":"animate"]({anchorX:g?b.plotWidth-a.plotY:a.plotX,anchorY:g?b.plotHeight-a.plotX:a.plotY});x||(c.attr({y:-9999}),c.placed=!1)};c.prototype.justifyDataLabel=function(a,c,d,e,f,g){var b=this.chart,k=c.align,l=c.verticalAlign,m,n,p=a.box?0:
a.padding||0;m=d.x+p;0>m&&("right"===k?c.align="left":c.x=-m,n=!0);m=d.x+e.width-p;m>b.plotWidth&&("left"===k?c.align="right":c.x=b.plotWidth-m,n=!0);m=d.y+p;0>m&&("bottom"===l?c.verticalAlign="top":c.y=-m,n=!0);m=d.y+e.height-p;m>b.plotHeight&&("top"===l?c.verticalAlign="bottom":c.y=b.plotHeight-m,n=!0);n&&(a.placed=!g,a.align(c,null,f));return n};x.pie&&(x.pie.prototype.drawDataLabels=function(){var b=this,d=b.data,e,f=b.chart,g=b.options.dataLabels,m=n(g.connectorPadding,10),p=n(g.connectorWidth,
1),q=f.plotWidth,r=f.plotHeight,x,w=b.center,A=w[2]/2,v=w[1],y,h,t,M,K=[[],[]],N,O,L,R,P=[0,0,0,0];b.visible&&(g.enabled||b._hasPointLabels)&&(D(d,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),c.prototype.drawDataLabels.apply(b),D(d,function(a){a.dataLabel&&a.visible&&(K[a.half].push(a),a.dataLabel._pos=null)}),D(K,function(c,d){var k,l,p=c.length,u=[],B;if(p)for(b.sortByAngle(c,d-.5),
0<b.maxLabelDistance&&(k=Math.max(0,v-A-b.maxLabelDistance),l=Math.min(v+A+b.maxLabelDistance,f.plotHeight),D(c,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,v-A-a.labelDistance),a.bottom=Math.min(v+A+a.labelDistance,f.plotHeight),B=a.dataLabel.getBBox().height||21,a.positionsIndex=u.push({target:a.labelPos[1]-a.top+B/2,size:B,rank:a.y})-1)}),a.distribute(u,l+B-k)),R=0;R<p;R++)e=c[R],l=e.positionsIndex,t=e.labelPos,y=e.dataLabel,L=!1===e.visible?"hidden":"inherit",k=t[1],u&&E(u[l])?
void 0===u[l].pos?L="hidden":(M=u[l].size,O=e.top+u[l].pos):O=k,delete e.positionIndex,N=g.justify?w[0]+(d?-1:1)*(A+e.labelDistance):b.getX(O<e.top+2||O>e.bottom-2?k:O,d,e),y._attr={visibility:L,align:t[6]},y._pos={x:N+g.x+({left:m,right:-m}[t[6]]||0),y:O+g.y-10},t.x=N,t.y=O,n(g.crop,!0)&&(h=y.getBBox().width,k=null,N-h<m?(k=Math.round(h-N+m),P[3]=Math.max(k,P[3])):N+h>q-m&&(k=Math.round(N+h-q+m),P[1]=Math.max(k,P[1])),0>O-M/2?P[0]=Math.max(Math.round(-O+M/2),P[0]):O+M/2>r&&(P[2]=Math.max(Math.round(O+
M/2-r),P[2])),y.sideOverflow=k)}),0===C(P)||this.verifyDataLabelOverflow(P))&&(this.placeDataLabels(),p&&D(this.points,function(a){var c;x=a.connector;if((y=a.dataLabel)&&y._pos&&a.visible&&0<a.labelDistance){L=y._attr.visibility;if(c=!x)a.connector=x=f.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(b.dataLabelsGroup);x[c?"attr":"animate"]({d:b.connectorPath(a.labelPos)});x.attr("visibility",L)}else x&&(a.connector=x.destroy())}))},x.pie.prototype.connectorPath=
function(a){var b=a.x,c=a.y;return n(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),c,"C",b,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",a[4],a[5]]},x.pie.prototype.placeDataLabels=function(){D(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?
"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},x.pie.prototype.alignDataLabel=m,x.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,e=c.minSize||80,g,m=null!==c.size;m||(null!==d[0]?g=Math.max(b[2]-Math.max(a[1],a[3]),e):(g=Math.max(b[2]-a[1]-a[3],e),b[0]+=(a[3]-a[1])/2),null!==d[1]?g=Math.max(Math.min(g,b[2]-Math.max(a[0],a[2])),e):(g=Math.max(Math.min(g,b[2]-a[0]-a[2]),e),b[1]+=(a[0]-a[2])/2),g<b[2]?(b[2]=g,b[3]=Math.min(f(c.innerSize||
0,g),g),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):m=!0);return m});x.column&&(x.column.prototype.alignDataLabel=function(a,d,e,f,g){var b=this.chart.inverted,k=a.series,m=a.dlBox||a.shapeArgs,l=n(a.below,a.plotY>n(this.translatedThreshold,k.yAxis.len)),q=n(e.inside,!!this.options.stacking);m&&(f=p(m),0>f.y&&(f.height+=f.y,f.y=0),m=f.y+f.height-k.yAxis.len,0<m&&(f.height-=m),b&&(f={x:k.yAxis.len-f.y-f.height,y:k.xAxis.len-f.x-f.width,width:f.height,height:f.width}),q||(b?(f.x+=
l?0:f.width,f.width=0):(f.y+=l?f.height:0,f.height=0)));e.align=n(e.align,!b||q?"center":l?"right":"left");e.verticalAlign=n(e.verticalAlign,b||q?"middle":l?"top":"bottom");c.prototype.alignDataLabel.call(this,a,d,e,f,g);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(L);(function(a){var y=a.Chart,C=a.each,E=a.objectEach,D=a.pick,q=a.addEvent;y.prototype.callbacks.push(function(a){function d(){var d=[];C(a.yAxis||[],function(a){a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&
E(a.stacks,function(a){E(a,function(a){d.push(a.label)})})});C(a.series||[],function(a){var g=a.options.dataLabels,f=a.dataLabelCollections||["dataLabel"];(g.enabled||a._hasPointLabels)&&!g.allowOverlap&&a.visible&&C(f,function(c){C(a.points,function(a){a[c]&&(a[c].labelrank=D(a.labelrank,a.shapeArgs&&a.shapeArgs.height),d.push(a[c]))})})});a.hideOverlappingLabels(d)}d();q(a,"redraw",d)});y.prototype.hideOverlappingLabels=function(a){var d=a.length,p,m,n,f,c,q,e,b,u,l=function(a,b,c,d,e,f,g,m){return!(e>
a+c||e+g<a||f>b+d||f+m<b)};for(m=0;m<d;m++)if(p=a[m])p.oldOpacity=p.opacity,p.newOpacity=1,p.width||(n=p.getBBox(),p.width=n.width,p.height=n.height);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(m=0;m<d;m++)for(n=a[m],p=m+1;p<d;++p)if(f=a[p],n&&f&&n!==f&&n.placed&&f.placed&&0!==n.newOpacity&&0!==f.newOpacity&&(c=n.alignAttr,q=f.alignAttr,e=n.parentGroup,b=f.parentGroup,u=2*(n.box?0:n.padding||0),c=l(c.x+e.translateX,c.y+e.translateY,n.width-u,n.height-u,q.x+b.translateX,q.y+
b.translateY,f.width-u,f.height-u)))(n.labelrank<f.labelrank?n:f).newOpacity=0;C(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(L);(function(a){var y=a.addEvent,C=a.Chart,E=a.createElement,D=a.css,q=a.defaultOptions,d=a.defaultPlotOptions,g=a.each,p=a.extend,m=a.fireEvent,n=a.hasTouch,f=a.inArray,c=a.isObject,x=a.Legend,e=a.merge,b=a.pick,u=a.Point,l=a.Series,
k=a.seriesTypes,F=a.svg,H;H=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};g(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(g(a.trackerGroups,function(d){if(a[d]&&(a[d].addClass("highcharts-tracker").on("mouseover",c).on("mouseout",function(a){b.onTrackerMouseOut(a)}),
n))a[d].on("touchstart",c)}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options.trackByArea,c=[].concat(b?a.areaPath:a.graphPath),d=c.length,e=a.chart,f=e.pointer,k=e.renderer,m=e.options.tooltip.snap,h=a.tracker,l,p=function(){if(e.hoverSeries!==a)a.onMouseOver()},q="rgba(192,192,192,"+(F?.0001:.002)+")";if(d&&!b)for(l=d+1;l--;)"M"===c[l]&&c.splice(l+1,0,c[l+1]-m,c[l+2],"L"),(l&&"M"===c[l]||l===d)&&c.splice(l,0,"L",c[l-2]+m,c[l-1]);h?h.attr({d:c}):a.graph&&(a.tracker=k.path(c).attr({"stroke-linejoin":"round",
visibility:a.visible?"visible":"hidden",stroke:q,fill:b?q:"none","stroke-width":a.graph.strokeWidth()+(b?0:2*m),zIndex:2}).add(a.group),g([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",p).on("mouseout",function(a){f.onTrackerMouseOut(a)});if(n)a.on("touchstart",p)}))}};k.column&&(k.column.prototype.drawTracker=H.drawTrackerPoint);k.pie&&(k.pie.prototype.drawTracker=H.drawTrackerPoint);k.scatter&&(k.scatter.prototype.drawTracker=H.drawTrackerPoint);p(x.prototype,
{setItemEvents:function(a,b,c){var d=this.chart.renderer.boxWrapper,e="highcharts-legend-"+(a.series?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");d.addClass(e)}).on("mouseout",function(){d.removeClass(e);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):m(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=E("input",{type:"checkbox",
checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);y(a.checkbox,"click",function(b){m(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});p(C.prototype,{showResetZoom:function(){var a=this,b=q.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,
title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,!1,f)},zoomOut:function(){var a=this;m(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var d,e=this.pointer,f=!1,k;!a||a.resetSelection?(g(this.axes,function(a){d=a.zoom()}),e.initiated=!1):g(a.xAxis.concat(a.yAxis),function(a){var b=a.axis;e[b.isXAxis?"zoomX":"zoomY"]&&(d=b.zoom(a.min,a.max),b.displayBtn&&(f=!0))});k=this.resetZoomButton;f&&!k?this.showResetZoom():!f&&c(k)&&(this.resetZoomButton=
k.destroy());d&&this.redraw(b(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&g(d,function(a){a.setState()});g("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",h=c[d],g=(b.pointRange||0)/2,k=b.getExtremes(),l=b.toValue(h-f,!0)+g,g=b.toValue(h+b.len-f,!0)-g,m=g<l,h=m?g:l,l=m?l:g,g=Math.min(k.dataMin,b.toValue(b.toPixels(k.min)-b.minPixelPadding)),m=Math.max(k.dataMax,
b.toValue(b.toPixels(k.max)+b.minPixelPadding)),n;n=g-h;0<n&&(l+=n,h=g);n=l-m;0<n&&(l=m,h-=n);b.series.length&&h!==k.min&&l!==k.max&&(b.setExtremes(h,l,!1,!1,{trigger:"pan"}),e=!0);c[d]=f});e&&c.redraw(!1);D(c.container,{cursor:"move"})}});p(u.prototype,{select:function(a,c){var d=this,e=d.series,k=e.chart;a=b(a,!d.selected);d.firePointEvent(a?"select":"unselect",{accumulate:c},function(){d.selected=d.options.selected=a;e.options.data[f(d,e.data)]=d.options;d.setState(a&&"select");c||g(k.getSelectedPoints(),
function(a){a.selected&&a!==d&&(a.selected=a.options.selected=!1,e.options.data[f(a,e.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");g(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=
this,c=e(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(a,c){y(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,c){var e=Math.floor(this.plotX),f=this.plotY,g=this.series,k=g.options.states[a]||{},l=d[g.type].marker&&g.options.marker,m=l&&!1===l.enabled,h=l&&l.states&&l.states[a]||{},n=!1===h.enabled,p=g.stateMarkerGraphic,q=this.marker||{},u=g.chart,x=g.halo,y,B=l&&g.markerAttribs;a=a||"";if(!(a===this.state&&!c||this.selected&&"select"!==a||!1===k.enabled||a&&
(n||m&&!1===h.enabled)||a&&q.states&&q.states[a]&&!1===q.states[a].enabled)){B&&(y=g.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),y&&this.graphic.animate(y,b(u.options.chart.animation,h.animation,l.animation)),p&&p.hide();else{if(a&&h)if(l=q.symbol||g.symbol,p&&p.currentSymbol!==l&&(p=p.destroy()),p)p[c?"animate":"attr"]({x:y.x,y:y.y});else l&&(g.stateMarkerGraphic=p=u.renderer.symbol(l,
y.x,y.y,y.width,y.height).add(g.markerGroup),p.currentSymbol=l);p&&(p[a&&u.isInsidePlot(e,f,u.inverted)?"show":"hide"](),p.element.point=this)}(e=k.halo)&&e.size?(x||(g.halo=x=u.renderer.path().add((this.graphic||p).parentGroup)),x[c?"animate":"attr"]({d:this.haloPath(e.size)}),x.attr({"class":"highcharts-halo highcharts-color-"+b(this.colorIndex,g.colorIndex)}),x.point=this):x&&x.point&&x.point.haloPath&&x.animate({d:x.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-
a,this.plotY-a,2*a,2*a)}});p(l.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&m(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&m(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this;
a=a||"";b.state!==a&&(g([b.group,b.markerGroup,b.dataLabelsGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a)},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,k=d.options.chart.ignoreHiddenSeries,l=c.visible;f=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!l:a)?"show":"hide";g(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&
d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&g(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});g(c.linkedSeries,function(b){b.setVisible(a,!1)});k&&(d.isDirtyBox=!0);!1!==b&&d.redraw();m(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);m(this,a?"select":"unselect")},drawTracker:H.drawTrackerGraph})})(L);
(function(a){var y=a.Chart,C=a.each,E=a.inArray,D=a.isArray,q=a.isObject,d=a.pick,g=a.splat;y.prototype.setResponsive=function(d){var g=this.options.responsive,n=[],f=this.currentResponsive;g&&g.rules&&C(g.rules,function(c){void 0===c._id&&(c._id=a.uniqueKey());this.matchResponsiveRule(c,n,d)},this);var c=a.merge.apply(0,a.map(n,function(c){return a.find(g.rules,function(a){return a._id===c}).chartOptions})),n=n.toString()||void 0;n!==(f&&f.ruleIds)&&(f&&this.update(f.undoOptions,d),n?(this.currentResponsive=
{ruleIds:n,mergedOptions:c,undoOptions:this.currentOptions(c)},this.update(c,d)):this.currentResponsive=void 0)};y.prototype.matchResponsiveRule=function(a,g){var m=a.condition;(m.callback||function(){return this.chartWidth<=d(m.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=d(m.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=d(m.minWidth,0)&&this.chartHeight>=d(m.minHeight,0)}).call(this)&&g.push(a._id)};y.prototype.currentOptions=function(d){function m(d,c,n,e){var b;a.objectEach(d,function(a,f){if(!e&&
-1<E(f,["series","xAxis","yAxis"]))for(d[f]=g(d[f]),n[f]=[],b=0;b<d[f].length;b++)c[f][b]&&(n[f][b]={},m(a[b],c[f][b],n[f][b],e+1));else q(a)?(n[f]=D(a)?[]:{},m(a,c[f]||{},n[f],e+1)):n[f]=c[f]||null})}var n={};m(d,this.options,n,0);return n}})(L);return L});

/*
 Highcharts JS v5.0.14 (2017-07-28)
 Exporting module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(k){"object"===typeof module&&module.exports?module.exports=k:k(Highcharts)})(function(k){(function(f){var k=f.defaultOptions,p=f.doc,B=f.Chart,x=f.addEvent,I=f.removeEvent,F=f.fireEvent,r=f.createElement,C=f.discardElement,v=f.css,n=f.merge,D=f.pick,h=f.each,G=f.objectEach,t=f.extend,J=f.isTouchDevice,E=f.win,H=E.navigator.userAgent,K=f.Renderer.prototype.symbols;/Edge\/|Trident\/|MSIE /.test(H);/firefox/i.test(H);t(k.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",
downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});k.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}};n(!0,k.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",background:"none",color:"#333333",fontSize:J?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",
color:"#ffffff"},buttonOptions:{symbolFill:"#666666",symbolStroke:"#666666",symbolStrokeWidth:3,theme:{fill:"#ffffff",stroke:"none",padding:5}}});k.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:"printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")}},menuItemDefinitions:{printChart:{textKey:"printChart",
onclick:function(){this.print()}},separator:{separator:!0},downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChart()}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},downloadSVG:{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}}};f.post=function(a,b,e){var c=r("form",n({method:"post",action:a,enctype:"multipart/form-data"},
e),{display:"none"},p.body);G(b,function(a,b){r("input",{type:"hidden",name:b,value:a},null,c)});c.submit();C(c)};t(B.prototype,{sanitizeSVG:function(a,b){if(b&&b.exporting&&b.exporting.allowHTML){var e=a.match(/<\/svg>(.*?$)/);e&&e[1]&&(e='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+b.chart.width+'" height\x3d"'+b.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+e[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",a=a.replace("\x3c/svg\x3e",e+"\x3c/svg\x3e"))}a=a.replace(/zIndex="[^"]+"/g,
"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,
"\u00a0").replace(/&shy;/g,"\u00ad");return a=a.replace(/<IMG /g,"\x3cimage ").replace(/<(\/?)TITLE>/g,"\x3c$1title\x3e").replace(/height=([^" ]+)/g,'height\x3d"$1"').replace(/width=([^" ]+)/g,'width\x3d"$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href\x3d"$1"/\x3e').replace(/ id=([^" >]+)/g,' id\x3d"$1"').replace(/class=([^" >]+)/g,'class\x3d"$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()})},getChartHTML:function(){return this.container.innerHTML},
getSVG:function(a){var b,e,c,w,m,g=n(this.options,a);p.createElementNS||(p.createElementNS=function(a,b){return p.createElement(b)});e=r("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},p.body);c=this.renderTo.style.width;m=this.renderTo.style.height;c=g.exporting.sourceWidth||g.chart.width||/px$/.test(c)&&parseInt(c,10)||600;m=g.exporting.sourceHeight||g.chart.height||/px$/.test(m)&&parseInt(m,10)||400;t(g.chart,{animation:!1,renderTo:e,forExport:!0,
renderer:"SVGRenderer",width:c,height:m});g.exporting.enabled=!1;delete g.data;g.series=[];h(this.series,function(a){w=n(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});w.isInternal||g.series.push(w)});h(this.axes,function(a){a.userOptions.internalKey||(a.userOptions.internalKey=f.uniqueKey())});b=new f.Chart(g,this.callback);a&&h(["xAxis","yAxis","series"],function(c){var d={};a[c]&&(d[c]=a[c],b.update(d))});h(this.axes,function(a){var c=f.find(b.axes,function(b){return b.options.internalKey===
a.userOptions.internalKey}),d=a.getExtremes(),e=d.userMin,d=d.userMax;!c||void 0===e&&void 0===d||c.setExtremes(e,d,!0,!1)});c=b.getChartHTML();c=this.sanitizeSVG(c,g);g=null;b.destroy();C(e);return c},getSVGForExport:function(a,b){var e=this.options.exporting;return this.getSVG(n({chart:{borderRadius:0}},e.chartOptions,b,{exporting:{sourceWidth:a&&a.sourceWidth||e.sourceWidth,sourceHeight:a&&a.sourceHeight||e.sourceHeight}}))},exportChart:function(a,b){b=this.getSVGForExport(a,b);a=n(this.options.exporting,
a);f.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale,svg:b},a.formAttributes)},print:function(){var a=this,b=a.container,e=[],c=b.parentNode,f=p.body,m=f.childNodes,g=a.options.exporting.printMaxWidth,d,u;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,0);F(a,"beforePrint");if(u=g&&a.chartWidth>g)d=[a.options.chart.width,void 0,!1],a.setSize(g,void 0,!1);h(m,function(a,b){1===a.nodeType&&(e[b]=a.style.display,a.style.display="none")});f.appendChild(b);E.focus();
E.print();setTimeout(function(){c.appendChild(b);h(m,function(a,b){1===a.nodeType&&(a.style.display=e[b])});a.isPrinting=!1;u&&a.setSize.apply(a,d);F(a,"afterPrint")},1E3)}},contextMenu:function(a,b,e,c,w,m,g){var d=this,u=d.options.navigation,k=d.chartWidth,q=d.chartHeight,n="cache-"+a,l=d[n],y=Math.max(w,m),z,A;l||(d[n]=l=r("div",{className:a},{position:"absolute",zIndex:1E3,padding:y+"px"},d.container),z=r("div",{className:"highcharts-menu"},null,l),v(z,t({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",
boxShadow:"3px 3px 10px #888"},u.menuStyle)),A=function(){v(l,{display:"none"});g&&g.setState(0);d.openMenu=!1},d.exportEvents.push(x(l,"mouseleave",function(){l.hideTimer=setTimeout(A,500)}),x(l,"mouseenter",function(){clearTimeout(l.hideTimer)}),x(p,"mouseup",function(b){d.pointer.inClass(b.target,a)||A()})),h(b,function(a){"string"===typeof a&&(a=d.options.exporting.menuItemDefinitions[a]);if(f.isObject(a,!0)){var b;a.separator?b=r("hr",null,null,z):(b=r("div",{className:"highcharts-menu-item",
onclick:function(b){b&&b.stopPropagation();A();a.onclick&&a.onclick.apply(d,arguments)},innerHTML:a.text||d.options.lang[a.textKey]},null,z),b.onmouseover=function(){v(this,u.menuItemHoverStyle)},b.onmouseout=function(){v(this,u.menuItemStyle)},v(b,t({cursor:"pointer"},u.menuItemStyle)));d.exportDivElements.push(b)}}),d.exportDivElements.push(z,l),d.exportMenuWidth=l.offsetWidth,d.exportMenuHeight=l.offsetHeight);b={display:"block"};e+d.exportMenuWidth>k?b.right=k-e-w-y+"px":b.left=e-y+"px";c+m+d.exportMenuHeight>
q&&"top"!==g.alignOptions.verticalAlign?b.bottom=q-c-y+"px":b.top=c+m-y+"px";v(l,b);d.openMenu=!0},addButton:function(a){var b=this,e=b.renderer,c=n(b.options.navigation.buttonOptions,a),f=c.onclick,m=c.menuItems,g,d,k=c.symbolSize||12;b.btnCount||(b.btnCount=0);b.exportDivElements||(b.exportDivElements=[],b.exportSVGElements=[]);if(!1!==c.enabled){var h=c.theme,q=h.states,p=q&&q.hover,q=q&&q.select,l;delete h.states;f?l=function(a){a.stopPropagation();f.call(b,a)}:m&&(l=function(){b.contextMenu(d.menuClassName,
m,d.translateX,d.translateY,d.width,d.height,d);d.setState(2)});c.text&&c.symbol?h.paddingLeft=D(h.paddingLeft,25):c.text||t(h,{width:c.width,height:c.height,padding:0});d=e.button(c.text,0,0,l,h,p,q).addClass(a.className).attr({"stroke-linecap":"round",title:b.options.lang[c._titleKey],zIndex:3});d.menuClassName=a.menuClassName||"highcharts-menu-"+b.btnCount++;c.symbol&&(g=e.symbol(c.symbol,c.symbolX-k/2,c.symbolY-k/2,k,k).addClass("highcharts-button-symbol").attr({zIndex:1}).add(d),g.attr({stroke:c.symbolStroke,
fill:c.symbolFill,"stroke-width":c.symbolStrokeWidth||1}));d.add().align(t(c,{width:d.width,x:D(c.x,b.buttonOffset)}),!0,"spacingBox");b.buttonOffset+=(d.width+c.buttonSpacing)*("right"===c.align?-1:1);b.exportSVGElements.push(d,g)}},destroyExport:function(a){var b=a?a.target:this;a=b.exportSVGElements;var e=b.exportDivElements,c=b.exportEvents,f;a&&(h(a,function(a,c){a&&(a.onclick=a.ontouchstart=null,f="cache-"+a.menuClassName,b[f]&&delete b[f],b.exportSVGElements[c]=a.destroy())}),a.length=0);e&&
(h(e,function(a,c){clearTimeout(a.hideTimer);I(a,"mouseleave");b.exportDivElements[c]=a.onmouseout=a.onmouseover=a.ontouchstart=a.onclick=null;C(a)}),e.length=0);c&&(h(c,function(a){a()}),c.length=0)}});K.menu=function(a,b,e,c){return["M",a,b+2.5,"L",a+e,b+2.5,"M",a,b+c/2+.5,"L",a+e,b+c/2+.5,"M",a,b+c-1.5,"L",a+e,b+c-1.5]};B.prototype.renderExporting=function(){var a=this,b=a.options.exporting,e=b.buttons,c=a.isDirtyExporting||!a.exportSVGElements;a.buttonOffset=0;a.isDirtyExporting&&a.destroyExport();
c&&!1!==b.enabled&&(a.exportEvents=[],G(e,function(b){a.addButton(b)}),a.isDirtyExporting=!1);x(a,"destroy",a.destroyExport)};B.prototype.callbacks.push(function(a){a.renderExporting();x(a,"redraw",a.renderExporting);h(["exporting","navigation"],function(b){a[b]={update:function(e,c){a.isDirtyExporting=!0;n(!0,a.options[b],e);D(c,!0)&&a.redraw()}}})})})(k)});

/*
 Highcharts JS v5.0.14 (2017-07-28)
 Data module

 (c) 2012-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(p){"object"===typeof module&&module.exports?module.exports=p:p(Highcharts)})(function(p){(function(g){var p=g.win.document,m=g.each,z=g.objectEach,A=g.pick,w=g.inArray,x=g.isNumber,B=g.splat,n,u=function(b,a){this.init(b,a)};g.extend(u.prototype,{init:function(b,a){this.options=b;this.chartOptions=a;this.columns=b.columns||this.rowsToColumns(b.rows)||[];this.firstRowAsNames=A(b.firstRowAsNames,!0);this.decimalRegex=b.decimalPoint&&new RegExp("^(-?[0-9]+)"+b.decimalPoint+"([0-9]+)$");this.rawColumns=
[];this.columns.length?this.dataFound():(this.parseCSV(),this.parseTable(),this.parseGoogleSpreadsheet())},getColumnDistribution:function(){var b=this.chartOptions,a=this.options,d=[],f=function(b){return(g.seriesTypes[b||"line"].prototype.pointArrayMap||[0]).length},e=b&&b.chart&&b.chart.type,c=[],k=[],t=0,h;m(b&&b.series||[],function(b){c.push(f(b.type||e))});m(a&&a.seriesMapping||[],function(b){d.push(b.x||0)});0===d.length&&d.push(0);m(a&&a.seriesMapping||[],function(a){var d=new n,C=c[t]||f(e),
q=g.seriesTypes[((b&&b.series||[])[t]||{}).type||e||"line"].prototype.pointArrayMap||["y"];d.addColumnReader(a.x,"x");z(a,function(b,a){"x"!==a&&d.addColumnReader(b,a)});for(h=0;h<C;h++)d.hasReader(q[h])||d.addColumnReader(void 0,q[h]);k.push(d);t++});a=g.seriesTypes[e||"line"].prototype.pointArrayMap;void 0===a&&(a=["y"]);this.valueCount={global:f(e),xColumns:d,individual:c,seriesBuilders:k,globalPointArrayMap:a}},dataFound:function(){this.options.switchRowsAndColumns&&(this.columns=this.rowsToColumns(this.columns));
this.getColumnDistribution();this.parseTypes();!1!==this.parsed()&&this.complete()},parseCSV:function(){var b=this,a=this.options,d=a.csv,f=this.columns,e=a.startRow||0,c=a.endRow||Number.MAX_VALUE,k=a.startColumn||0,t=a.endColumn||Number.MAX_VALUE,h,g,y=0;d&&(g=d.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split(a.lineDelimiter||"\n"),h=a.itemDelimiter||(-1!==d.indexOf("\t")?"\t":","),m(g,function(a,d){var g=b.trim(a),q=0===g.indexOf("#");d>=e&&d<=c&&!q&&""!==g&&(a=a.split(h),m(a,function(b,a){a>=
k&&a<=t&&(f[a-k]||(f[a-k]=[]),f[a-k][y]=b)}),y+=1)}),this.dataFound())},parseTable:function(){var b=this.options,a=b.table,d=this.columns,f=b.startRow||0,e=b.endRow||Number.MAX_VALUE,c=b.startColumn||0,k=b.endColumn||Number.MAX_VALUE;a&&("string"===typeof a&&(a=p.getElementById(a)),m(a.getElementsByTagName("tr"),function(b,a){a>=f&&a<=e&&m(b.children,function(b,e){("TD"===b.tagName||"TH"===b.tagName)&&e>=c&&e<=k&&(d[e-c]||(d[e-c]=[]),d[e-c][a-f]=b.innerHTML)})}),this.dataFound())},parseGoogleSpreadsheet:function(){var b=
this,a=this.options,d=a.googleSpreadsheetKey,f=this.columns,e=a.startRow||0,c=a.endRow||Number.MAX_VALUE,k=a.startColumn||0,g=a.endColumn||Number.MAX_VALUE,h,q;d&&jQuery.ajax({dataType:"json",url:"https://spreadsheets.google.com/feeds/cells/"+d+"/"+(a.googleSpreadsheetWorksheet||"od6")+"/public/values?alt\x3djson-in-script\x26callback\x3d?",error:a.error,success:function(a){a=a.feed.entry;var d,t=a.length,r=0,n=0,l;for(l=0;l<t;l++)d=a[l],r=Math.max(r,d.gs$cell.col),n=Math.max(n,d.gs$cell.row);for(l=
0;l<r;l++)l>=k&&l<=g&&(f[l-k]=[],f[l-k].length=Math.min(n,c-e));for(l=0;l<t;l++)d=a[l],h=d.gs$cell.row-1,q=d.gs$cell.col-1,q>=k&&q<=g&&h>=e&&h<=c&&(f[q-k][h-e]=d.content.$t);m(f,function(a){for(l=0;l<a.length;l++)void 0===a[l]&&(a[l]=null)});b.dataFound()}})},trim:function(b,a){"string"===typeof b&&(b=b.replace(/^\s+|\s+$/g,""),a&&/^[0-9\s]+$/.test(b)&&(b=b.replace(/\s/g,"")),this.decimalRegex&&(b=b.replace(this.decimalRegex,"$1.$2")));return b},parseTypes:function(){for(var b=this.columns,a=b.length;a--;)this.parseColumn(b[a],
a)},parseColumn:function(b,a){var d=this.rawColumns,f=this.columns,e=b.length,c,k,g,h,n=this.firstRowAsNames,m=-1!==w(a,this.valueCount.xColumns),p=[],v=this.chartOptions,r,u=(this.options.columnTypes||[])[a],v=m&&(v&&v.xAxis&&"category"===B(v.xAxis)[0].type||"string"===u);for(d[a]||(d[a]=[]);e--;)c=p[e]||b[e],g=this.trim(c),h=this.trim(c,!0),k=parseFloat(h),void 0===d[a][e]&&(d[a][e]=g),v||0===e&&n?b[e]=g:+h===k?(b[e]=k,31536E6<k&&"float"!==u?b.isDatetime=!0:b.isNumeric=!0,void 0!==b[e+1]&&(r=k>
b[e+1])):(k=this.parseDate(c),m&&x(k)&&"float"!==u?(p[e]=c,b[e]=k,b.isDatetime=!0,void 0!==b[e+1]&&(c=k>b[e+1],c!==r&&void 0!==r&&(this.alternativeFormat?(this.dateFormat=this.alternativeFormat,e=b.length,this.alternativeFormat=this.dateFormats[this.dateFormat].alternative):b.unsorted=!0),r=c)):(b[e]=""===g?null:g,0!==e&&(b.isDatetime||b.isNumeric)&&(b.mixed=!0)));m&&b.mixed&&(f[a]=d[a]);if(m&&r&&this.options.sort)for(a=0;a<f.length;a++)f[a].reverse(),n&&f[a].unshift(f[a].pop())},dateFormats:{"YYYY-mm-dd":{regex:/^([0-9]{4})[\-\/\.]([0-9]{2})[\-\/\.]([0-9]{2})$/,
parser:function(b){return Date.UTC(+b[1],b[2]-1,+b[3])}},"dd/mm/YYYY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,parser:function(b){return Date.UTC(+b[3],b[2]-1,+b[1])},alternative:"mm/dd/YYYY"},"mm/dd/YYYY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,parser:function(b){return Date.UTC(+b[3],b[1]-1,+b[2])}},"dd/mm/YY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,parser:function(b){return Date.UTC(+b[3]+2E3,b[2]-1,+b[1])},alternative:"mm/dd/YY"},
"mm/dd/YY":{regex:/^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,parser:function(b){return Date.UTC(+b[3]+2E3,b[1]-1,+b[2])}}},parseDate:function(b){var a=this.options.parseDate,d,f,e=this.options.dateFormat||this.dateFormat,c;if(a)d=a(b);else if("string"===typeof b){if(e)a=this.dateFormats[e],(c=b.match(a.regex))&&(d=a.parser(c));else for(f in this.dateFormats)if(a=this.dateFormats[f],c=b.match(a.regex)){this.dateFormat=f;this.alternativeFormat=a.alternative;d=a.parser(c);break}c||(c=Date.parse(b),
"object"===typeof c&&null!==c&&c.getTime?d=c.getTime()-6E4*c.getTimezoneOffset():x(c)&&(d=c-6E4*(new Date(c)).getTimezoneOffset()))}return d},rowsToColumns:function(b){var a,d,f,e,c;if(b)for(c=[],d=b.length,a=0;a<d;a++)for(e=b[a].length,f=0;f<e;f++)c[f]||(c[f]=[]),c[f][a]=b[a][f];return c},parsed:function(){if(this.options.parsed)return this.options.parsed.call(this,this.columns)},getFreeIndexes:function(b,a){var d,f=[],e=[],c;for(d=0;d<b;d+=1)f.push(!0);for(b=0;b<a.length;b+=1)for(c=a[b].getReferencedColumnIndexes(),
d=0;d<c.length;d+=1)f[c[d]]=!1;for(d=0;d<f.length;d+=1)f[d]&&e.push(d);return e},complete:function(){var b=this.columns,a,d=this.options,f,e,c,k,g=[],h;if(d.complete||d.afterComplete){for(c=0;c<b.length;c++)this.firstRowAsNames&&(b[c].name=b[c].shift());f=[];e=this.getFreeIndexes(b.length,this.valueCount.seriesBuilders);for(c=0;c<this.valueCount.seriesBuilders.length;c++)h=this.valueCount.seriesBuilders[c],h.populateColumns(e)&&g.push(h);for(;0<e.length;){h=new n;h.addColumnReader(0,"x");c=w(0,e);
-1!==c&&e.splice(c,1);for(c=0;c<this.valueCount.global;c++)h.addColumnReader(void 0,this.valueCount.globalPointArrayMap[c]);h.populateColumns(e)&&g.push(h)}0<g.length&&0<g[0].readers.length&&(h=b[g[0].readers[0].columnIndex],void 0!==h&&(h.isDatetime?a="datetime":h.isNumeric||(a="category")));if("category"===a)for(c=0;c<g.length;c++)for(h=g[c],e=0;e<h.readers.length;e++)"x"===h.readers[e].configName&&(h.readers[e].configName="name");for(c=0;c<g.length;c++){h=g[c];e=[];for(k=0;k<b[0].length;k++)e[k]=
h.read(b,k);f[c]={data:e};h.name&&(f[c].name=h.name);"category"===a&&(f[c].turboThreshold=0)}b={series:f};a&&(b.xAxis={type:a},"category"===a&&(b.xAxis.uniqueNames=!1));d.complete&&d.complete(b);d.afterComplete&&d.afterComplete(b)}}});g.Data=u;g.data=function(b,a){return new u(b,a)};g.wrap(g.Chart.prototype,"init",function(b,a,d){var f=this;a&&a.data?g.data(g.extend(a.data,{afterComplete:function(e){var c,k;if(a.hasOwnProperty("series"))if("object"===typeof a.series)for(c=Math.max(a.series.length,
e.series.length);c--;)k=a.series[c]||{},a.series[c]=g.merge(k,e.series[c]);else delete a.series;a=g.merge(e,a);b.call(f,a,d)}}),a):b.call(f,a,d)});n=function(){this.readers=[];this.pointIsArray=!0};n.prototype.populateColumns=function(b){var a=!0;m(this.readers,function(a){void 0===a.columnIndex&&(a.columnIndex=b.shift())});m(this.readers,function(b){void 0===b.columnIndex&&(a=!1)});return a};n.prototype.read=function(b,a){var d=this.pointIsArray,f=d?[]:{},e;m(this.readers,function(c){var e=b[c.columnIndex][a];
d?f.push(e):f[c.configName]=e});void 0===this.name&&2<=this.readers.length&&(e=this.getReferencedColumnIndexes(),2<=e.length&&(e.shift(),e.sort(),this.name=b[e.shift()].name));return f};n.prototype.addColumnReader=function(b,a){this.readers.push({columnIndex:b,configName:a});"x"!==a&&"y"!==a&&void 0!==a&&(this.pointIsArray=!1)};n.prototype.getReferencedColumnIndexes=function(){var b,a=[],d;for(b=0;b<this.readers.length;b+=1)d=this.readers[b],void 0!==d.columnIndex&&a.push(d.columnIndex);return a};
n.prototype.hasReader=function(b){var a,d;for(a=0;a<this.readers.length;a+=1)if(d=this.readers[a],d.configName===b)return!0}})(p)});

$(document).ready(function () {

    $('#containerHighcharts').highcharts({

        chart: {
            height: 283,
            type: 'area'
        },
        xAxis: {
            categories: [0, 2, 4, 6, 8, 10, 12, 14],
            gridLineWidth: 1

        },


        series: [{
            name: 'Total Visitors',
            data: [2000, 1000, 0, 600, 2000, 3000, 4000, 3000, 2000, 1000, 500, 1000, 1540, 3000, 4000, 3000, 2000, 1000, 600, 2000 ]

        }]
});

});



