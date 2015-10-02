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


	    $.getJSON('/users/coupon').then(function(data) {
	        var template = __webpack_require__(14);
	        data.forEach(function(el) {
	            var insert_data = {
	                title: el.instances[0].title,
	                description: el.instances[0].description,
	                status: el.instances[0].status, //issued|claimed|expired|used 
	                expiredAt: dateTrans(el.instances[0].expiredAt)
	            }
	            dust.render('app/view/users/_coupon-item', insert_data, function(err, html) {
	                if (insert_data['status'] != 'claimed') {
	                    $('#coupon-list-history')[0].insertAdjacentHTML('beforeend', html);
	                } else {
	                    $('#coupon-list-use')[0].insertAdjacentHTML('beforeend', html);
	                }
	            })
	        })
	    })

	    function dateTrans(expiredAt) {
	        var d = new Date(expiredAt);
	        var year = d.getFullYear();
	        var mon = d.getMonth();
	        var date = d.getDate();
	        var h_m_s = d.toString().split(" ")[4];
	        return year + '/' + mon + '/' + date + ' ' + h_m_s;
	    }

	    $('#ControlTab0').on('click', function() {
	        $("#ControlTab1").removeClass("active");
	        $("#ControlTab0").addClass("active");
	        document.getElementById("Tab1").style.display = "none";
	        document.getElementById("Tab0").style.display = "block";
	    })

	    $('#ControlTab1').on('click', function() {
	        $("#ControlTab0").removeClass("active");
	        $("#ControlTab1").addClass("active");
	        document.getElementById("Tab0").style.display = "none";
	        document.getElementById("Tab1").style.display = "block";
	    })
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

/***/ 14:
/***/ function(module, exports) {

	module.exports = (function(dust){dust.register("app\/view\/users\/_coupon-item",body_0);function body_0(chk,ctx){return chk.w("<div class=\"card\"><a href=\"#\"><div class=\"content\"><div class=\"card-img\"><img src=\"/images/kuogo_logo.png\"></div><div class=\"header ").h("ne",ctx,{"block":body_1},{"key":ctx.get(["status"], false),"value":"claimed"},"h").w("\">").f(ctx.get(["title"], false),ctx,"h").w("</div><div class=\"description ").h("ne",ctx,{"block":body_2},{"key":ctx.get(["status"], false),"value":"claimed"},"h").w("\">").f(ctx.get(["description"], false),ctx,"h").w("</div><div class=\"meta ").h("ne",ctx,{"block":body_3},{"key":ctx.get(["status"], false),"value":"claimed"},"h").w("\">").h("eq",ctx,{"block":body_4},{"key":ctx.get(["status"], false),"value":"claimed"},"h").h("eq",ctx,{"block":body_5},{"key":ctx.get(["status"], false),"value":"expired"},"h").h("eq",ctx,{"block":body_6},{"key":ctx.get(["status"], false),"value":"used"},"h").w("</div></div></a></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w(" used-gray ");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w(" used-gray ");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w(" content-red ");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w(" 失效时间: ").f(ctx.get(["expiredAt"], false),ctx,"h").w(" ");}body_4.__dustBody=!0;function body_5(chk,ctx){return chk.w(" 已失效 ");}body_5.__dustBody=!0;function body_6(chk,ctx){return chk.w(" 已使用 ");}body_6.__dustBody=!0;return body_0}(dust));

/***/ }

/******/ });