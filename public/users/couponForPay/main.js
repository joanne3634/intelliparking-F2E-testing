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
	    var hidden_data = JSON.parse($('#data').val());

	    var template = __webpack_require__(16);
	    $.getJSON('/users/coupon').success(function(data) {
	        console.log(data);
	        data.forEach(function(el) {
	            if (el.instances[0].status == 'claimed') {
	                var insert_data = {
	                    cptid: el.coupon.id,
	                    cpiid: el.instances[0].id,
	                    title: el.instances[0].title,
	                    description: el.instances[0].description,
	                    status: el.instances[0].status, //issued|claimed|expired|used 
	                    expiredAt: dateTrans(el.instances[0].expiredAt),
	                    hide_data: JSON.stringify(hidden_data)
	                }
	                dust.render('app/view/users/_payment', insert_data, function(err, html) {
	                    $('#payment-coupons-list')[0].insertAdjacentHTML('beforeend', html);
	                })
	            }
	        })
	    })
	    $(document).on('click', ".payChoice-link", function(e) {
	        // request.post('/users/pay').form({key:'value'})
	        $(this)[0].childNodes[1].submit(); // form 
	    });

	    function dateTrans(expiredAt) {
	        var d = new Date(expiredAt);
	        var year = d.getFullYear();
	        var mon = d.getMonth();
	        var date = d.getDate();
	        var h_m_s = d.toString().split(" ")[4];
	        return year + '/' + mon + '/' + date + ' ' + h_m_s;
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

/***/ 16:
/***/ function(module, exports) {

	module.exports = (function(dust){dust.register("app\/view\/users\/_payment",body_0);function body_0(chk,ctx){return chk.w("<div class=\"card\"><a href=\"#\" class=\"payChoice-link\">  <form action=\"/users/pay\" method=\"post\"><input type=\"hidden\" name=\"detail_data\" value=\"").f(ctx.get(["hide_data"], false),ctx,"h").w("\"><input type=\"hidden\" name=\"cptid\" value=\"").f(ctx.get(["cptid"], false),ctx,"h").w("\"><input type=\"hidden\" name=\"cpiid\" value=\"").f(ctx.get(["cpiid"], false),ctx,"h").w("\"></form><div class=\"content\"><div class=\"card-img\"><img src=\"/images/kuogo_logo.png\"></div><div class=\"header\">").f(ctx.get(["title"], false),ctx,"h").w("</div><div class=\"description\">").f(ctx.get(["description"], false),ctx,"h").w("</div><div class=\"meta\">失效时间: ").f(ctx.get(["expiredAt"], false),ctx,"h").w("</div></div></a></div>");}body_0.__dustBody=!0;return body_0}(dust));

/***/ }

/******/ });