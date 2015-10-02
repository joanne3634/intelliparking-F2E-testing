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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, wx) {



	    // wx.ready(function(){
	    
	       // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	    // });
	    //
	    //wx.error(function(res){
	    //
	    //    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	    //
	    //});
	    //
	    //wx.scanQRCode({
	    //    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	    //    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	    //    success: function (res) {
	    //        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
	    //    }
	    //});
	    //
	    //
	    ////判断当前客户端版本是否支持指定JS接口
	    //
	    //wx.checkJsApi({
	    //    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	    //    success: function(res) {
	    //        // 以键值对的形式返回，可用的api值true，不可用为false
	    //        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	    //    }
	    //});
	    //
	    //
	    ////获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	    //
	    //wx.onMenuShareTimeline({
	    //    title: '', // 分享标题
	    //    link: '', // 分享链接
	    //    imgUrl: '', // 分享图标
	    //    success: function () {
	    //        // 用户确认分享后执行的回调函数
	    //    },
	    //    cancel: function () {
	    //        // 用户取消分享后执行的回调函数
	    //    }
	    //});
	    //
	    ////获取“分享给朋友”按钮点击状态及自定义分享内容接口
	    //
	    //wx.onMenuShareAppMessage({
	    //    title: '', // 分享标题
	    //    desc: '', // 分享描述
	    //    link: '', // 分享链接
	    //    imgUrl: '', // 分享图标
	    //    type: '', // 分享类型,music、video或link，不填默认为link
	    //    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    //    success: function () {
	    //        // 用户确认分享后执行的回调函数
	    //    },
	    //    cancel: function () {
	    //        // 用户取消分享后执行的回调函数
	    //    }
	    //});
	    //
	    ////获取“分享到QQ”按钮点击状态及自定义分享内容接口
	    //
	    //wx.onMenuShareQQ({
	    //    title: '', // 分享标题
	    //    desc: '', // 分享描述
	    //    link: '', // 分享链接
	    //    imgUrl: '', // 分享图标
	    //    success: function () {
	    //        // 用户确认分享后执行的回调函数
	    //    },
	    //    cancel: function () {
	    //        // 用户取消分享后执行的回调函数
	    //    }
	    //});
	    //
	    ////获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
	    //
	    //wx.onMenuShareWeibo({
	    //    title: '', // 分享标题
	    //    desc: '', // 分享描述
	    //    link: '', // 分享链接
	    //    imgUrl: '', // 分享图标
	    //    success: function () {
	    //        // 用户确认分享后执行的回调函数
	    //    },
	    //    cancel: function () {
	    //        // 用户取消分享后执行的回调函数
	    //    }
	    //});
	    //
	    ////获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
	    //
	    //wx.onMenuShareQZone({
	    //    title: '', // 分享标题
	    //    desc: '', // 分享描述
	    //    link: '', // 分享链接
	    //    imgUrl: '', // 分享图标
	    //    success: function () {
	    //        // 用户确认分享后执行的回调函数
	    //    },
	    //    cancel: function () {
	    //        // 用户取消分享后执行的回调函数
	    //    }
	    //});
	    //
	    //
	    ////获取地理位置接口
	    //
	    //wx.getLocation({
	    //    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
	    //    success: function (res) {
	    //        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
	    //        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
	    //        var speed = res.speed; // 速度，以米/每秒计
	    //        var accuracy = res.accuracy; // 位置精度
	    //    }
	    //});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = wx;

/***/ }
/******/ ]);