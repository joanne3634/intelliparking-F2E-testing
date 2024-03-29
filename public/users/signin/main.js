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
	    
	    $('#RegisterForm').on('submit', function(e) {

	        /* 手机号码錯誤 */
	        var Phone = document.getElementById('Phone').value;

	        if ($.trim(Phone) === "") {
	            Alert('手机不能为空', '好的');
	            e.preventDefault();
	            return false;
	        } else if (Phone.length !== 11) {
	            Alert('手机号码不能小于11位', '好的');
	            e.preventDefault();
	            return false;
	        } else if (!/^(1[^012][0-9]{9})$/i.test(Phone)) {
	            Alert('手机号码格式不正确', '好的');
	            e.preventDefault();
	            return false;
	        }

	        var validateCode = document.getElementById('ValidateCode');
	        var validateCodeStatus = true; // TODO: connect API 

	        /* 驗證碼錯誤 */
	        if (!validateCodeStatus) {
	            Alert('请输入正确的驗證码', '好的');
	            return false;
	        }

	        // TODO [ 註冊成功 | 關注公眾號 ] => 優惠券*1 
	        //      已註冊未綁定 => 綁定 優惠券*1 
	        //      未註冊 => 註冊且綁定 優惠券*2  
	        //      [ 註冊成功 ] => 錢包 +$5 

	    });

	    var c = 60;
	    var t;

	    $(document).on('click', "#GetCode", function(e) {
	        // TODO : connect API for get validation code 
	        // code validation time : 10 min
	           var Phone = document.getElementById('Phone').value;

	        if ($.trim(Phone) === "") {
	            Alert('手机不能为空', '好的');
	        } else if (Phone.length !== 11) {
	            Alert('手机号码不能小于11位', '好的');
	        } else if (!/^(1[^012][0-9]{9})$/i.test(Phone)) {
	            Alert('手机号码格式不正确', '好的');
	        }
	            var otpData = {
	                "type": "sms",
	                "target": Phone
	            }
	            console.log(otpData);
	            $.post("/users/otp",otpData).done(function(response) {
	                console.log(response);
	            })
	            

	        timedCount();
	    })

	    function timedCount() {
	        document.getElementById('GetCode').innerHTML = c + '秒';
	        document.getElementById('GetCode').disabled = true;
	        c--;
	        t = setTimeout(function() {
	            timedCount();
	        }, 1000);
	        if (c < 0) {
	            stopCount();
	        }
	    }

	    function stopCount() {
	        c = 60;
	        document.getElementById('GetCode').disabled = false;
	        setTimeout("document.getElementById('GetCode').innerHTML='获取验证码'", 0);
	        clearTimeout(t);
	    }
	     function phoneValidate(phone) {
	        if ($.trim(phone) === "") {
	            Alert('手机不能为空', '好的');
	            return false;
	        } else if (phone.length < 11) {
	            Alert('手机号码不能小于11位', '好的');
	            return false;
	        } else if (!/^(1[^012][0-9]{9})$/i.test(phone)) {
	            Alert('手机号码格式不正确', '好的');
	            return false;
	        }
	    }

	    function Alert(dialog, check) {
	        var winW = window.innerWidth;
	        var winH = window.innerHeight;
	        var dialogoverlay = document.getElementById('dialogoverlay');
	        var dialogbox = document.getElementById('dialogbox');
	        dialogoverlay.style.display = "block";
	        dialogoverlay.style.height = winH + "px";
	        dialogbox.style.left = (winW / 2) - (280 * .5) + "px";
	        dialogbox.style.top = "100px";
	        dialogbox.style.display = "block";
	        $('#dialogboxhead').html("一哥提示");
	        $('#dialogboxbody').html(dialog);
	        $('#dialogboxfoot').html('<button id="AlertButton" class="ui button alert">' + check + '</button>');
	    }
	    $(document).on('click', "#AlertButton", function(e) {
	        e.preventDefault();
	        document.getElementById('dialogbox').style.display = "none";
	        document.getElementById('dialogoverlay').style.display = "none";
	    })

	    function ConfirmCarBindingStatus(dialog, left, right) {
	        var winW = window.innerWidth;
	        var winH = window.innerHeight;
	        var dialogoverlay = document.getElementById('dialogoverlay');
	        var dialogbox = document.getElementById('dialogbox');
	        dialogoverlay.style.display = "block";
	        dialogoverlay.style.height = winH + "px";
	        dialogbox.style.left = (winW / 2) - (280 * .5) + "px";
	        dialogbox.style.top = "100px";
	        dialogbox.style.display = "block";

	        $('#dialogboxhead').html("一哥提示");
	        $('#dialogboxbody').html(dialog);
	        $('#dialogboxfoot').html('<button id="ConfirmLeftButton" class="ui button confirm" >' + left + '</button> <button id="ConfirmRightButton" class="ui button confirm">' + right + '</button>');
	    }

	    $(document).on('click', "#ConfirmLeftButton", function(e) {
	        document.getElementById('dialogbox').style.display = "none";
	        document.getElementById('dialogoverlay').style.display = "none";
	    })
	    $(document).on('click', "#ConfirmRightButton", function(e) {
	        document.location = document.location.origin + '/wechat-view/carAuth';
	        document.getElementById('dialogbox').style.display = "none";
	        document.getElementById('dialogoverlay').style.display = "none";
	    })
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ }
/******/ ]);