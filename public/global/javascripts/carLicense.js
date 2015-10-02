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

	$.fn.click = function(listener) {
	    return this.each(function() {
	        var $this = $(this);
	        $this.on('vclick', listener);
	    });
	};

	jQuery(document).ready(function($) {

	    //$('select.dropdown').dropdown(); //Start of車牌介面
	    $(".ui.dropdown.selection").click(function(event) {
	        if ($(".default.text").text().length >= 2) {
	            $("#Sheng").show();
	            $("#mask").show().css('height', $(window).height());
	            return;
	        }
	        if ($(".default.text").text().length == 1) {
	            $("#Sheng").hide();
	            $("#Abc").show();
	            $("#mask").show().css('height', $(window).height());
	            return;
	        }
	    });

	    $("#mask").click(function(event) {
	        $("#Sheng").hide();
	        $("#Abc").hide();
	        $(this).hide();
	    });

	    $("#Sheng fieldset label").mousedown(function(event) {
	        $(this).addClass("active").siblings().removeClass('active');
	        $(this).find('input#'+$(this)[0].htmlFor).attr('checked', 'checked');
	        $(".default.text").text($(this).text());
	        $("#Sheng").hide();
	        $("#Abc").show();
	    });

	    $("#Abc fieldset label").mousedown(function(event) {
	        $(this).addClass("active").siblings().removeClass('active');
	        $(this).find('input#'+$(this)[0].htmlFor).attr('checked', 'checked');
	        var getAbc = $(this).text();
	        $(".default.text").append(getAbc);
	        $("#Abc").hide();
	        $("#mask").hide();
	    });

	    $("#CarNumber,#ValidateCode,#GetCode,#Phone").click(function(event) {
	        $("#Sheng").hide();
	        $("#Abc").hide();
	        $("#mask").hide();
	    });
	    //End of 車牌介面
	});


/***/ }
/******/ ]);