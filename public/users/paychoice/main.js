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
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {

	    var dust = __webpack_require__(10);
	    __webpack_require__(21)(dust);
	    __webpack_require__(26)(dust);

	    // $.getJSON('/users/paychoice').then(function(data) {
	    //     var template = require("users/_paychoice-car-license.dust");
	    //     if (data.status == 404) {
	    //         data.total = 0;
	    //     }

	    //     if (data.total == 1) {
	    //         // alert('redirect to payment page');
	    //         var pay = {
	    //             detail_data: JSON.stringify(data.IpsParkingRecords[0])
	    //         }
	    //         $.post("/users/pay", pay);
	    //         // .done(function(response) {
	    //         //     console.log('done!!!!  ');
	    //         // }).fail(function(response) {
	    //         //     console.log('fail');
	    //         // })
	    //             /*  one car: directly go to payment page */
	    //             // var carlicenseId = data[0]['carLicenses'][0]['carlicenseId'];
	    //             // document.location = 'pay?carlicenseId=' + carlicenseId;
	    //     } else {

	    //         /*    Xcar: button link to the car-adding page     */
	    //         /*    cars: button for chooseing which car to pay  */
	    //         for (var key in data.IpsParkingRecords) {
	    //             data.IpsParkingRecords[key]['json_data'] = JSON.stringify(data.IpsParkingRecords[key]);
	    //         }
	    //         var insert_data = {
	    //             "carCount": data.total,
	    //             "carLicenses": data.IpsParkingRecords
	    //         }
	    //         dust.render('app/view/users/_paychoice-car-license', insert_data, function(err, html) {
	    //             $('#payChoiceContent')[0].insertAdjacentHTML('beforeend', html);
	    //         })
	    //     }
	    // })
	    // if("#CarNumber")
	    $(document).on('click', ".payChoice-link", function(e) {
	        // request.post('/users/pay').form({key:'value'})
	        $(this)[0].childNodes[1].submit(); // form 
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	module.exports = dust;

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = exports = function(dust){
		var _ = __webpack_require__(23);
		var moment = __webpack_require__(24);
		var self = this;
		dust.helpers["route"] = function(chunk, context, bodies, params){
			var path = params.route;
			if ( self._ns && self._ns !== "/" ) {
				chunk.write(self._ns);
			}
		    return _.isFunction(path) ? path(chunk, context) : chunk.write(path);
		}
		dust.helpers.env = function(chunk, context, bodies, params) {
			params.env = params.env || "dev";
			var env = process.env.NODE_ENV || "dev";
			if (params.env === env){
				bodies.block(chunk,context);
			}
			return chunk.write("");
		}
		dust.helpers["form"] = function(chunk, context, bodies, params){
			var path = params.route, method, hiddenmethod, enctype;
			if ( params.method ) {
				method = params.method;
			}
			if ( params.model ) {
				hiddenmethod = 'put';
			}
			enctype = params.enctype || "application/x-www-form-urlencoded";
			
			method = method || "post";

			method = dust.helpers.tap(method, chunk, context);
			method = method.toLowerCase();
			if ( method !== "get" && method !== "post") {
				hiddenmethod = method;
				method = "post";
			}
			chunk.write('<form method="');
			chunk.write(method);

			chunk.write('" action="');
			if ( self._ns && self._ns !== "/" ) {
				chunk.write(self._ns);
			}
		    _.isFunction(path) ? path(chunk, context) : chunk.write(path);

		    chunk.write('" enctype="')
		    _.isFunction(enctype) ? enctype(chunk, context) : chunk.write(enctype);
		    if ( params.class ) {
		    	chunk.write('" class="')
		    	_.isFunction(params.class) ? params.class(chunk, context) : chunk.write(params.class);
		    }
			chunk.write('">')
			if ( hiddenmethod ) {
				chunk.write('<input type="hidden" name="_method" value="'+hiddenmethod+'"/>')
			}
			if ( method !== 'get' && method !== 'head' ) {
				chunk.write('<input type="hidden" name="_csrf" value=""/>')
			}
			if ( bodies.block ) {
				bodies.block(chunk, context);
			}
		    return chunk.write('</form>');

		}
		dust.helpers["param"] = function(chunk, context, bodies, params) {
			var name = dust.helpers.tap(params.name, chunk, context);
			var attr = dust.helpers.tap(params.value, chunk, context);
			if ( !attr ) {
				context.current()[name]=function(chunk){
					bodies.block(chunk, context);
					return chunk;
				}
			} else {
				context.current()[name] = attr;
			}

			return chunk;
		}
		dust.helpers["date"] = function(chunk, context, bodies,params) {
			var key;
			if ( params.key ) {
				key = dust.helpers.tap(params.key, chunk, context);	
			}
			var format = dust.helpers.tap(params.format, chunk, context);

			return chunk.write(moment(key).format(format));
		}
		dust.helpers.loop = function(chunk, context, bodies, params) {
		  var from = parseInt(dust.helpers.tap(params.from, chunk, context), 10),
		        to = parseInt(dust.helpers.tap(params.to, chunk, context), 10);
		  from = ( NaN === from ) ? 1 : from;
		  to = ( NaN === to ) ? 1 : to;
		  var len = Math.abs(to - from) + 1,
		        increment = (to - from) / (len - 1) || 1;
		  while(from !== to) {
		      chunk = bodies.block(chunk, context.push(from, from, len));
		      from += increment;
		  }

		  return chunk.render(bodies.block, context.push(from, from, len));
		}
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 22 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	var moment = __webpack_require__(25);
	moment.fn.yesterday = function(){
		return this.subtract(1, 'days');
	}
	moment.fn.tomorrow = function(){
		return this.add(1, 'days');
	}

	module.exports = exports = moment;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = function(dust, config){
		config = config || {};
		var cdn = config.cdn;
	    var formatter = __webpack_require__(27)
	    var _ = __webpack_require__(23);
	    dust.helpers.static = function(chunk, context, bodies, params){
	        var resource = params.src;
	        if ( resource[0] !== "/" ) { resource = "/"+resource; }
	        if ( resource[0] === "/" ) {
	            resource = resource.substr(1);
	        }
	        var staticVersion = config.staticVersion || "0";
	        var extra = "&_v="+staticVersion.toString().trim();
	        if ( resource.indexOf("?") < 0 ) {
	        	extra = "?"+extra;
	        }
	        return chunk.write([cdn, resource, extra].join(''));
	    }
	    dust.helpers.arrContains = function(chunk, context, bodies, params) {   	
	    	var arr = dust.helpers.tap(params.arr, chunk, context);
	    	var value = dust.helpers.tap(params.value, chunk, context);
	    	if ( !_.isArray(arr) ) {
	    		return chunk.write("");
	    	}
	    	if ( arr.indexOf(value) > -1 ) {
	    		return chunk.render(bodies.block, context);
	    	}
	    	
	    	return chunk.write("");
	    };
	    dust.helpers.money = function(chunk, context, bodies, params) {
	    	var money = dust.helpers.tap(params.value, chunk, context);
	    	var type = dust.helpers.tap(params.type, chunk, context) || "d";
	    	type = type.toLowerCase();

	    	money = new Number(money);

	    	if ( "c" === type || "cents" === type ) {
	    		money = money/100;
	    	}

	    	return chunk.write(formatter.money(money, 2));
	    }
	    dust.helpers.paginate = function(chunk, context, bodies, params) {

			var curr = parseInt(dust.helpers.tap(params.curr, chunk, context), 10) || 1,
			    total = parseInt(dust.helpers.tap(params.total, chunk, context), 10) || 1,
			    count = parseInt(dust.helpers.tap(params.count, chunk, context), 10) || 1,
			    query = dust.helpers.tap(params.query, chunk, context) || "";
			var max = Math.ceil(total/count);
			var page = curr;
			context.current().max = max;
			context.current().curr = curr*count;
			var qs = __webpack_require__(28);
			if ( typeof query === "string" ) {
				query = qs.parse(query);
			}

			if ( bodies.begin ) {
				query.p = 1;
				context.current()['query'] = qs.stringify(query);
				chunk = bodies.begin(chunk, context.push(context, bodies, params));
			}

			if ( bodies.prev && page-1 >= 1 && page <= max ) {
				query.p = curr-1;
				context.current()['query'] = qs.stringify(query);
				chunk = bodies.prev(chunk, context.push(context, bodies, params));
			}

			if ( bodies.next && page+1 <= max && page >= 1) {
				query.p = curr+1;
				context.current()['query'] = qs.stringify(query);
				chunk = bodies.next(chunk, context.push(context, bodies, params));
			}
			
			if ( bodies.end ) {
				query.p = max;
				context.current()['query'] = qs.stringify(query);
				chunk = bodies.end(chunk, context.push(context, bodies, params));
			}
			// while(from !== to) {
			//   chunk = bodies.block(chunk, context.push(from, from, len));
			//   from += increment;
			// }

			return chunk;
	    }
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	var formatter = {
		/***
		 *@params money {Number or String} 金额
		 *@params digit {Number} 小数点的位数，不够补0
		 *@returns {String} 格式化后的金额
		 **/
		money: function formatMoney(money, digit){
		    var tpMoney = '0.00';
		    if(undefined != money){
		        tpMoney = money;
		    }
		    tpMoney = new Number(tpMoney);

		    if(isNaN(tpMoney)){
		        return '0.00';
		    }
		    tpMoney = tpMoney.toFixed(digit) + '';
		    var re = /^(-?\d+)(\d{3})(\.?\d*)/;
		    while(re.test(tpMoney)){
		        tpMoney = tpMoney.replace(re, "$1,$2$3")
		    }
		    return tpMoney;
		}
	}

	exports = module.exports = formatter;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(29);
	exports.encode = exports.stringify = __webpack_require__(30);


/***/ },
/* 29 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return map(objectKeys(obj), function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (isArray(obj[k])) {
	        return map(obj[k], function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};

	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};

	function map (xs, f) {
	  if (xs.map) return xs.map(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    res.push(f(xs[i], i));
	  }
	  return res;
	}

	var objectKeys = Object.keys || function (obj) {
	  var res = [];
	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
	  }
	  return res;
	};


/***/ }
/******/ ]);