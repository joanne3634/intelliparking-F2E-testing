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

	function CustomAlert(){
		this.render = function(dialog,check){
			var winW = window.innerWidth;
		    var winH = window.innerHeight;
			var dialogoverlay = document.getElementById('dialogoverlay');
		    var dialogbox = document.getElementById('dialogbox');
			dialogoverlay.style.display = "block";
		    dialogoverlay.style.height = winH+"px";
			dialogbox.style.left = (winW/2) - (280 * .5)+"px";
		    dialogbox.style.top = "100px";
		    dialogbox.style.display = "block";
			document.getElementById('dialogboxhead').innerHTML = "eGo提示";
		    document.getElementById('dialogboxbody').innerHTML = dialog;
			document.getElementById('dialogboxfoot').innerHTML = '<button class="ui button alert" onclick="Alert.ok()">'+check+'</button>';
		}
		this.ok = function(){
			document.getElementById('dialogbox').style.display = "none";
			document.getElementById('dialogoverlay').style.display = "none";
		}
	}

	function CustomAlertURL(){
		this.render = function(dialog,check,op,url){
			var winW = window.innerWidth;
		    var winH = window.innerHeight;
			var dialogoverlay = document.getElementById('dialogoverlay');
		    var dialogbox = document.getElementById('dialogbox');
			dialogoverlay.style.display = "block";
		    dialogoverlay.style.height = winH+"px";
			dialogbox.style.left = (winW/2) - (280 * .5)+"px";
		    dialogbox.style.top = "100px";
		    dialogbox.style.display = "block";
			document.getElementById('dialogboxhead').innerHTML = "eGo提示";
		    document.getElementById('dialogboxbody').innerHTML = dialog;
			document.getElementById('dialogboxfoot').innerHTML = '<button class="ui button alert" onclick="Alert.ok(\''+op+'\',\''+url+'\')">'+check+'</button>';
		}
		this.ok = function(op,url){
			if( op == "redirect" ){
				document.location = url;
			}
			document.getElementById('dialogbox').style.display = "none";
			document.getElementById('dialogoverlay').style.display = "none";
		}
	}

	var Alert = new CustomAlert();
	var AlertURL = new CustomAlertURL();

	function deletePost(id){
		// Run Ajax request here to delete post from database
		document.body.removeChild(document.getElementById(id));
	}

	function CustomConfirm(){
			this.render = function(dialog,op_l,id,op_r,url,left,right){
			var winW = window.innerWidth;
		    var winH = window.innerHeight;
			var dialogoverlay = document.getElementById('dialogoverlay');
		    var dialogbox = document.getElementById('dialogbox');
			dialogoverlay.style.display = "block";
		    dialogoverlay.style.height = winH+"px";
			dialogbox.style.left = (winW/2) - (280 * .5)+"px";
		    dialogbox.style.top = "100px";
		    dialogbox.style.display = "block";
			
			document.getElementById('dialogboxhead').innerHTML = "eGo提示";
		    document.getElementById('dialogboxbody').innerHTML = dialog;
			document.getElementById('dialogboxfoot').innerHTML = '<button class="ui button confirm" onclick="Confirm.yes(\''+op_l+'\',\''+id+'\')">'+left+'</button> <button class="ui button confirm" onclick="Confirm.no(\''+op_r+'\',\''+url+'\')">'+right+'</button>';
		}
		this.no = function(op,url){
			if( op == "redirect" ){
				document.location = url;
			}
			document.getElementById('dialogbox').style.display = "none";
			document.getElementById('dialogoverlay').style.display = "none";
		}
		this.yes = function(op,id){
			if(op == "delete_car_license"){
				deletePost(id);
			}
			document.getElementById('dialogbox').style.display = "none";
			document.getElementById('dialogoverlay').style.display = "none";
		}
	}
	var Confirm = new CustomConfirm();


/***/ }
/******/ ]);