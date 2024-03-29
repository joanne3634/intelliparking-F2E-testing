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

	    /* 車牌輸入強迫轉成大寫 */
	    $('#CarNumber').keyup(function() {
	        this.value = this.value.toUpperCase();
	    });
	    /* 新增車輛 */
	    $('#CarCreateForm').on('submit', function(e) {
	        e.preventDefault();
	        var data = $(this).serializeArray();

	        /* 不足5位 限制數字以及英文 */
	        var CarNumber = document.getElementById('CarNumber').value;
	        if (!/[0-9A-Z]{5}/.test(CarNumber) || data[0].name == 'car_number' || data[1].name  == 'car_number' ) {
	            Alert('请输入正确的车牌号', '好的');
	            return false;
	        }

	        $.post("/users/car", data).done(function(response) {
	            var cars = response.cars;

	            // If the operation is done successfully, 200 is returned.
	            // If the operation is rejected due to unauthorized, 401 is returned.
	            // The car is owned by others, 403 is returned.
	            // Such car already exist., 409 is returned.
	           
	            if (cars.status == 401) {
	                Alert('您尚未登入', '好的');
	                return false;
	            }
	            if (cars.status == 403) {
	                ConfirmCarBindingStatus('该车牌号已被其他帐号添加,您可以进行车牌认证以找回', '稍後认证', '马上认证');
	                return false;
	            }
	            if (cars.status == 409) { /* check 綁定狀況 先不管是否為自己車輛皆為這個提示 */
	                Alert('此車牌已在您的列表', '好的');
	                return false;
	            }
	            var insert_data = {
	                "serial": data[2].value,
	                "registeredArea": data[0].value + data[1].value,
	                "id": cars.id
	            };
	            dust.render('app/view/users/_car-license', insert_data, function(err, html) {
	                $('#car-licenses')[0].insertAdjacentHTML('beforeend', html);
	            })

	        }).fail(function(response) {
	            if (response.error) {
	                Alert(response.error, '好的');
	            }
	        });
	    });
	    /* 刪除車輛 */
	    $(document).on('submit', ".ui.form.delete", function(e) {
	        e.preventDefault();
	        ConfirmDelete('确定要删除这个车牌信息吗？', '确定', '取消', $(this).context.id);
	    });

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
	        $('#dialogboxfoot').html('<button id="AlertButton" class="normal-close ui button alert">' + check + '</button>');
	    }

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
	        $('#dialogboxfoot').html('<button id="ConfirmLeftButton" class="normal-close ui button confirm" >' + left + '</button> <button id="ConfirmRightButton" class="ui button confirm">' + right + '</button>');
	    }

	    function ConfirmDelete(dialog, left, right, id) {
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
	        $('#dialogboxfoot').html('<input type="hidden" id="delete_hidden" value="' + id + '"><button id="DeleteConfirmLeftButton" class="ui button confirm" >' + left + '</button> <button id="DeleteConfirmRightButton" class="normal-close ui button confirm">' + right + '</button>');
	    }
	    $(document).on('click', ".normal-close ", function(e) {
	        document.getElementById('dialogbox').style.display = "none";
	        document.getElementById('dialogoverlay').style.display = "none";
	    })
	    $(document).on('click', "#ConfirmRightButton", function(e) {
	        document.location = document.location.origin + '/users/carAuth';
	        document.getElementById('dialogbox').style.display = "none";
	        document.getElementById('dialogoverlay').style.display = "none";
	    })

	    $(document).on('click', "#DeleteConfirmLeftButton", function(e) {
	        deletePost(document.getElementById('delete_hidden').value);
	        document.getElementById('dialogbox').style.display = "none";
	        document.getElementById('dialogoverlay').style.display = "none";
	    })

	    function deletePost(id) {
	        var data = 'id=' + id;
	        $.post("/users/car/delete", data).done(function(response) {
	            var delete_car = response.delete_car;

	            // If the operation is done successfully, 200 is returned.
	            // If the format of car ID (i.e cid) is incorrect, 400 is returned.
	            // If the operation is rejected due to unauthorized, 401 is returned.
	            // If the client has no permission to do this operation, 403 is returned.
	            // If no such car is found with the specified resource ID, 404 is returned.

	            if (delete_car.status == 400) {
	                Alert('車輛格式錯誤', '好的');
	                return false;
	            }
	            if (delete_car.status == 401) {
	                Alert('您尚未登入', '好的');
	                return false;
	            }
	            if (delete_car.status == 403) {
	                Alert('您沒有執行此動作的權限', '好的');
	                return false;
	            }
	            if (delete_car.status == 404) { /* check 綁定狀況 */
	                Alert('無此綁定車輛', '好的');
	                return false;
	            }

	        }).fail(function(response) {
	            if (response.error) {
	                Alert(response.error, '好的');
	            }
	        });

	        var node = document.getElementById('car-licenses');
	        for (var i = 0; i < node.childElementCount; i++) {
	            if (node.childNodes[i].id == id) {
	                node.removeChild(node.childNodes[i]);
	            }
	        }
	    }
	    /* render 車輛列表 */
	    var dust = __webpack_require__(10);
	    $('#car-licenses').html({}); //先清空
	    $.getJSON('/users/car').then(function(data) {
	        var template = __webpack_require__(11);
	        data.forEach(function(el) {
	            dust.render('app/view/users/_car-license', el, function(err, html) {
	                $('#car-licenses')[0].insertAdjacentHTML('beforeend', html);
	            })
	        })
	    })

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	module.exports = dust;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = (function(dust){dust.register("app\/view\/users\/_car-license",body_0);function body_0(chk,ctx){return chk.w("<form method=\"post\" action=\"/users/car/delete\" class=\"ui form delete\" id=\"").f(ctx.get(["id"], false),ctx,"h").w("\"><div class=\"fields\"><input readonly=\"\" type=\"text\" name=\"carLicense\" value=\"").f(ctx.get(["registeredArea"], false),ctx,"h").w(" ").f(ctx.get(["serial"], false),ctx,"h").w("\"><button class=\"ui button car-delete\" type=\"submit\">删除</button></div></form>");}body_0.__dustBody=!0;return body_0}(dust));

/***/ }
/******/ ]);