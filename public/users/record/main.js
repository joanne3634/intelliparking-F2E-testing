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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	    var dust = __webpack_require__(10);
	    var template = __webpack_require__(32);
	    $.getJSON('/users/record/list').then(function(data) {
	        data.history.forEach(function(el) {
	            if (el['charge'] != 0) {
	                var insert_data = {
	                    json_data: JSON.stringify(el),
	                    number: el['pid'],
	                    parkingplace: el['parking_lot']['name'],
	                    costtime: CostTime(!el['departure'] ? DateNow() : el['departure'], el['arrival']),
	                    date: dateTrans(el['arrival']),
	                    carlicense: el['plate_no'],
	                    feed: '¥' + intToFloat(el['charge'])
	                }
	                dust.render('app/view/users/_record-item', insert_data, function(err, html) {
	                    $('#record-container')[0].insertAdjacentHTML('beforeend', html);
	                })
	            }
	        })
	        if ($('#record-container').is(':empty')) {
	            $('#record-container').text('暂无记录 ');
	        }
	    })


	    $(document).on('click', ".record-item-container", function(e) {
	        $(this)[0].childNodes[0].submit();
	    });

	    function CostTime(departure, arrival) {
	        var d = new Date((departure - arrival));
	        var hour = d.getHours();
	        var min = d.getMinutes();
	        return hour + '小时' + min + '分钟';
	    }

	    function DateNow() {
	        var d = new Date();
	        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
	        return new Date(d);
	    }

	    function dateTrans(arrival) {
	        var d = new Date(arrival);
	        var year = d.getFullYear();
	        var mon = d.getMonth() + 1;
	        var date = d.getDate();
	        return year + '/' + mon + '/' + date;
	    }

	    function intToFloat(num) {
	        return (num / 100).toFixed(2);
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 1:
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },

/***/ 10:
/***/ function(module, exports) {

	module.exports = dust;

/***/ },

/***/ 32:
/***/ function(module, exports) {

	module.exports = (function(dust){dust.register("app\/view\/users\/_record-item",body_0);function body_0(chk,ctx){return chk.h("eq",ctx,{"else":body_1,"block":body_2},{"key":ctx.get(["recordCount"], false),"value":0},"h");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<a class=\"record-item-container\" href=\"#\"><form action=\"/users/record/detail\" method=\"post\"><input type=\"hidden\" name=\"detail_data\" value=\"").f(ctx.get(["json_data"], false),ctx,"h").w("\"></form><article><div class=\"left\"><div class=\"parkingPlace\">").f(ctx.get(["parkingplace"], false),ctx,"h").w("</div><div class=\"costTime\">").f(ctx.get(["costtime"], false),ctx,"h").w("</div></div><div class=\"right\"><div class=\"date\">").f(ctx.get(["date"], false),ctx,"h").w("</div><div class=\"carNumber\">").f(ctx.get(["carlicense"], false),ctx,"h").w("</div><div class=\"costMoney\">").f(ctx.get(["feed"], false),ctx,"h").w("</div></div></article>  </a>");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<p>暂无记录</p>");}body_2.__dustBody=!0;return body_0}(dust));

/***/ }

/******/ });