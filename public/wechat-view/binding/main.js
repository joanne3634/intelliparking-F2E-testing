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

	jQuery(document).ready(function($) {


	     Alert.render('请输入正确的手机号码', 'Yes');
	    // Alert.render('请输入正确的验証码', 'Yes');
	    // Alert.render('请输入正确的车牌号', 'Yes');
	    // Alert.render('该车牌信息己被其他帐号添加，请在原帐号删除后，重新在此帐号添加。', 'Yes');
	    // Confirm.render('该车牌信息己被其他帐号添加，请在原帐号删除后，重新在此帐号添加。', null, null, '好的', '车牌认证');

	    // Confirm.render('该车牌信息己被其他帐号添加，请在原帐号删除后，重新在此帐号添加。', 'delete_car_license', 'id1', 'redirect', null, '好的', '车牌认证');

	});


/***/ }
/******/ ]);