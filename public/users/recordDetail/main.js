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
	    var template = __webpack_require__(34);
	    var data = JSON.parse($('#data').val());
	    var el = {
	        parkingRecord_id: data['pid'],
	        carlicense: data['plate_no'],
	        parkinglot: data['parking_lot']['name'],
	        entranceTimeStamp: dateTrans(data['arrival']),
	        parkingTime: CostTime(!data['departure'] ? DateNow(): data['departure'], data['arrival']),
	        payment: intToFloat(data['amount']),
	        coupon_amount: intToFloat(data['discount']),
	        payment_total: intToFloat(data['charge'])
	    }
	    dust.render('app/view/users/_record-detail', el, function(err, html) {
	        $('#parkingRecordDetail-list')[0].insertAdjacentHTML('beforeend', html);
	    })

	    function dateTrans(arrival) {
	        var d = new Date(arrival);
	        var year = d.getFullYear();
	        var mon = d.getMonth() + 1;
	        var date = d.getDate();
	        var h_m_s = d.toString().split(" ")[4];
	        return year + '/' + mon + '/' + date + ' ' + h_m_s;
	    }
	    function DateNow(){
	        var d = new Date();
	        d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
	        return new Date(d);
	    }
	    function CostTime(departure, arrival) {
	        var d = new Date((departure - arrival));
	        var hour = d.getHours();
	        var min = d.getMinutes();
	        return hour + '小时' + min + '分钟';
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

/***/ 34:
/***/ function(module, exports) {

	module.exports = (function(dust){dust.register("app\/view\/users\/_record-detail",body_0);function body_0(chk,ctx){return chk.w("<div class=\"item\"><div class=\"content\"><div class=\"title\">车牌号码</div><div class=\"value large\">").f(ctx.get(["carlicense"], false),ctx,"h").w("</div></div></div><div class=\"item\"><div class=\"content\"><div class=\"title\">停车场</div><div class=\"value\">").f(ctx.get(["parkinglot"], false),ctx,"h").w("</div></div></div><div class=\"item\"><div class=\"content\"><div class=\"title\">进场时间</div><div class=\"value\">").f(ctx.get(["entranceTimeStamp"], false),ctx,"h").w("</div></div></div><div class=\"item\"><div class=\"content\"><div class=\"title\">停车时长</div><div class=\"value\">").f(ctx.get(["parkingTime"], false),ctx,"h").w("</div></div></div><div class=\"item\"><div class=\"content\"><div class=\"title\">统计费用</div><div class=\"value red\"><span class=\"yen\">￥</span>").f(ctx.get(["payment"], false),ctx,"h").w("</div></div></div><div class=\"item\"><div class=\"content\"><div class=\"title\">用优惠券</div><div class=\"value green\"><span class=\"minus\">-</span><span class=\"yen\">￥</span>").f(ctx.get(["coupon_amount"], false),ctx,"h").w("</div></div></div><div class=\"item\"><div class=\"content\"><div class=\"title\">支付金额</div><div class=\"value red bold\"><span class=\"yen\">￥</span>").f(ctx.get(["payment_total"], false),ctx,"h").w("</div></div></div>");}body_0.__dustBody=!0;return body_0}(dust));

/***/ }

/******/ });