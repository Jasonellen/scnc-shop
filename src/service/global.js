import '@/style/common.scss'
import '@/service/flexible'
import '@/lib/iscroll-probe'
import _fetch from '@/service/fetch'
import url from '@/api'
import fetchJsonp from 'fetch-jsonp'  //全局的跨域请求

//全局变量
Object.defineProperties(global, {
	_fetch: {value: _fetch},
	url: {value: url},
	fetchJsonp: {value: fetchJsonp},
});

//禁止页面默认滚动
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
	capture: false,
	passive: false
} : false);

function isPassive() {
	var supportsPassiveOption = false;
	try {
		addEventListener("test", null, Object.defineProperty({}, 'passive', {
			get: function () {
				supportsPassiveOption = true;
			}
		}));
	} catch(e) {console.log(e)}
	return supportsPassiveOption;
}

//分享进来的,重新进一下,不然二次分享失败
if(location.href.indexOf('from') !== -1){
	location.href = location.origin
}

//微信中更新token信息
var ua = window.navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	fetchJsonp(url.binding)
		.then((response)=>{
			return response.json()
		})
		.then((data)=>{
			console.log(data,'successjsonp')
			let oldToken = localStorage.getItem('s_token')
			if(oldToken && (oldToken !== data.token)){
				localStorage.setItem('s_token',data.token)
				location.reload()
			}
		})
}

//扩展对象
if (typeof Object.assign != 'function') {
	Object.assign = function(target) {
		'use strict';
		if (target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		target = Object(target);
		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source != null) {
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
}
if (!Array.prototype.filter)
{
	Array.prototype.filter = function(fun /* , thisArg*/)
  {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();
		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++)
    {
			if (i in t)
      {
				var val = t[i];
				if (fun.call(thisArg, val, i, t))
					res.push(val);
			}
		}
		return res;
	};
}
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;
		return function(obj) {
			if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}
//扩展localhost
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
	Array.prototype.reduce = function(callback /*, initialValue*/) {
		'use strict';
		if (this == null) {
			throw new TypeError('Array.prototype.reduce called on null or undefined');
		}
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}
		var t = Object(this), len = t.length >>> 0, k = 0, value;
		if (arguments.length == 2) {
			value = arguments[1];
		} else {
			while (k < len && !(k in t)) {
				k++;
			}
			if (k >= len) {
				throw new TypeError('Reduce of empty array with no initial value');
			}
			value = t[k++];
		}
		for (; k < len; k++) {
			if (k in t) {
				value = callback(value, t[k], k, t);
			}
		}
		return value;
	};
}

if (!Array.prototype.map) {
	Array.prototype.map = function(callback, thisArg) {

		var T, A, k;
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		// 1. 将O赋值为调用map方法的数组.
		var O = Object(this);
		// 2.将len赋值为数组O的长度.
		var len = O.length >>> 0;
		// 3.如果callback不是函数,则抛出TypeError异常.
		if (Object.prototype.toString.call(callback) != "[object Function]") {
			throw new TypeError(callback + " is not a function");
		}
		// 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
		if (thisArg) {
			T = thisArg;
		}
		// 5. 创建新数组A,长度为原数组O长度len
		A = new Array(len);
		// 6. 将k赋值为0
		k = 0;
		// 7. 当 k < len 时,执行循环.
		while(k < len) {
			var kValue, mappedValue;
			//遍历O,k为原数组索引
			if (k in O) {
				//kValue为索引k对应的值.
				kValue = O[ k ];
				// 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
				mappedValue = callback.call(T, kValue, k, O);
				// 返回值添加到新数组A中.
				A[ k ] = mappedValue;
			}
			// k自增1
			k++;
		}
		// 8. 返回新数组A
		return A;
	};
}

if (!Array.prototype.find) {
	Object.defineProperty(Array.prototype, 'find', {
		value: function(predicate) {
			// 1. Let O be ? ToObject(this value).
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}
			var o = Object(this);
			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;
			// 3. If IsCallable(predicate) is false, throw a TypeError exception.
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
			var thisArg = arguments[1];
			// 5. Let k be 0.
			var k = 0;
			// 6. Repeat, while k < len
			while (k < len) {
				// a. Let Pk be ! ToString(k).
				// b. Let kValue be ? Get(O, Pk).
				// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
				// d. If testResult is true, return kValue.
				var kValue = o[k];
				if (predicate.call(thisArg, kValue, k, o)) {
					return kValue;
				}
				// e. Increase k by 1.
				k++;
			}
			// 7. Return undefined.
			return undefined;
		}
	});
}
