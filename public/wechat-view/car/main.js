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
/***/ function(module, exports) {

	function validateCarCreate(){
	    var form_valid = (document.getElementById('CarNumber').value);
	    // /* 不足5位 */
	    if(form_valid.length != 5){
	        Alert.render('请输入正确的手机号码','好的');
	        return false;
	    }
	    /* 车牌已被绑定 */
	    if(form_valid.length != 5){
	        Confirm.render('该车牌号已被其他帐号添加,您可以进行车牌认证以找回',null,null,'redirect',document.location.origin+'/CarAuth.html','稍後认证','马上认证');
	        return false;
	    }
	    return true;
	}   

	function validateCarDelete(form){
	    // console.log( form.carLicense.value );
	    Confirm.render('确定要删除这个车牌信息吗？','delete_car_license',form.carLicense.value,null,null,'确定','取消');
	    return false;
	}

/***/ }
/******/ ]);