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

	var $ = __webpack_require__(1);

	// submit 
	$('#RegisterForm').on('submit',function(e){
	    e.preventDefault();
	    
	    /* 手机号码錯誤 */
	    var phoneStatus = true;
	    if( !phoneStatus ){
	        Alert('请输入正确的手机号码','好的');
	        return false;
	    }

	    var validateCode = document.getElementById('ValidateCode');
	    var validateCodeStatus = true;
	    /* 驗證碼錯誤 */
	    if( !validateCodeStatus ){
	        Alert('请输入正确的驗證码','好的');
	        return false;
	    }

	    /* 車牌已綁定 */
	    // var carLicenseBindingStatus = true;

	    // if( carLicenseBindingStatus ){
	    //     ConfirmCarBindingStatus('该车牌号已被其他帐号添加,您可以进行车牌认证以找回','稍後认证','马上认证');
	    //     return false;
	    // }

	    var registerStatus = true; 
	    if( registerStatus ){
	        //TODO: redirect to wechat-login page 
	    }

	});

	function Alert(dialog,check){
	    var winW = window.innerWidth;
	    var winH = window.innerHeight;
	    var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
	    dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.left = (winW/2) - (280 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "block";
	    $('#dialogboxhead').html("eGo提示");
	    $('#dialogboxbody').html(dialog);
	    $('#dialogboxfoot').html('<button id="AlertButton" class="ui button alert">'+check+'</button>');
	}
	$(document).on('click', "#AlertButton", function(e){
	    e.preventDefault();
	    document.getElementById('dialogbox').style.display = "none";
	    document.getElementById('dialogoverlay').style.display = "none";
	})

	function ConfirmCarBindingStatus (dialog,left,right){
	    var winW = window.innerWidth;
	    var winH = window.innerHeight;
	    var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
	    dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.left = (winW/2) - (280 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "block";
	    
	    $('#dialogboxhead').html("eGo提示");
	    $('#dialogboxbody').html(dialog);
	    $('#dialogboxfoot').html('<button id="ConfirmLeftButton" class="ui button confirm" >'+left+'</button> <button id="ConfirmRightButton" class="ui button confirm">'+right+'</button>');
	}

	$(document).on('click', "#ConfirmLeftButton", function(e){
	    document.getElementById('dialogbox').style.display = "none";
	    document.getElementById('dialogoverlay').style.display = "none";
	})
	$(document).on('click', "#ConfirmRightButton", function(e){
	    document.location = document.location.origin+'/wechat-view/carAuth';
	    document.getElementById('dialogbox').style.display = "none";
	    document.getElementById('dialogoverlay').style.display = "none";
	})


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ }
/******/ ]);