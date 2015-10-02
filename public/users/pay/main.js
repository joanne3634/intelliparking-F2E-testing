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
	    var data = JSON.parse($('#data').val());
	    var charge = data['charge'] > 0 ? data['charge'] : 0;

	    function render(paid) {
	        var template = __webpack_require__(19);
	        var coupon_amount = 0;

	        $.getJSON('/users/wallet').success(function(w) {
	            // console.log(data.balance);
	            // intToFloat(data['amount'] - paid - coupon_amount)

	            var el = {
	                wallet: intToFloat(w.balance),
	                hide_data: $('#data').val(),
	                cpiid: $('#cpiid').val(),
	                cptid: $('#cptid').val(),
	                carlicense: data['plate_no'],
	                entranceTimeStamp: dateTrans(data['arrival']),
	                parkingTime: CostTime(DateNow(), data['arrival']),
	                payment: intToFloat(data['amount']),
	                overTime: false,
	                coupon_amount: intToFloat(coupon_amount),
	                paid: intToFloat(paid), // 已經支付
	                paidStatus: paid ? true : false, // true: 已經支付 
	                checkBoxDisabled: false, //true: 不允許使用者按  
	                payment_total: positive(intToFloat(data['amount'] - paid - coupon_amount))
	            }
	            $.post("/users/coupon/detail", {
	                "cptid": $('#cptid').val(),
	                "cpiid": $('#cpiid').val()
	            }).done(function(response) {
	                if (response.coupons.status && response.coupons.status == 200) {
	                    coupon_amount = response.coupons.instance.effects[0].value;
	                } else {
	                    coupon_amount = 0;
	                }
	                el['coupon_amount'] = intToFloat(coupon_amount);
	                el['payment_total'] = positive(intToFloat(data['amount'] - paid - coupon_amount));
	                el['checkBoxDisabled'] = parseFloat(el['wallet']) < parseFloat(el['payment_total']) ? true : false;
	                dust.render('app/view/users/_parkingPayment-item', el, function(err, html) {
	                    $('body').html(html);
	                    $('#amount_total').val(data['amount'] - paid - coupon_amount);
	                })
	            });
	        })
	    }

	    function wallet_disable(balance, amount) {
	        if (parseFloat(balance) < parseFloat(amount)) {
	            $(".checkbox-label").addClass("disabled");
	            document.getElementById('wallet-use-check').disabled = true;
	        } else {
	            $(".checkbox-label").removeClass("disabled");
	            document.getElementById('wallet-use-check').disabled = false;
	        }
	    }

	    function checkOrderType() {
	        return ($('#wallet-use-check').is(":checked") || $('#amount_total').val() == 0) ? 1 : 2;
	    }

	    $(document).on('click', "#PayToLeave", function(e) {
	        console.log("submit ==================== ");

	        var payData = {
	            parking_record: data['id'],
	            order_type: checkOrderType(),
	            coupon_instance: $('#cpiid').val() == 0 || !$('#cpiid').val() ? null : $('#cpiid').val(),
	            amount: $('#amount_total').val()
	        }

	        console.log('payData:' + payData);

	        $.post("/users/wallet/pay", payData).done(function(response) {
	             console.log('done!!!!  ');
	             console.log(response);
	             if( payData.order_type == 2){
	                document.location = response.url;
	             }
	             $('#couponDiv').hide();
	             $('#couponDivPaid').show();
	             $('#PayToLeave').attr('disabled', true);
	             $('.checkbox').hide();
	             $('#amount_total_title').text('支付金額');

	         }).fail(function(response) {
	             console.log(response);
	             console.log('fail');
	         })
	     // {
	            //     "tx_type": "1",
	            //     "title": "国购广场-停车场 停车费用",
	            //     "amount": -400,
	            //     "balance": 400,
	            //     "updated_at": 1443560556808,
	            //     "created_at": 1443560556808,
	            //     "@type": "d",
	            //     "@class": "IpsPurchaseTransaction",
	            //     "@rid": "#49:4",
	            //     "rid": "#49:4",
	            //     "_id": "#49:4",
	            //     "id": "49:4"
	            // }
	    });

	    // 優惠券 
	    $(document).on('click', ".payChoice-link", function(e) {
	        $(this)[0].childNodes[0].submit(); // form 
	    });

	    function dateTrans(arrival) {
	        var d = new Date(arrival);
	        var year = d.getFullYear();
	        var mon = d.getMonth() + 1;
	        var date = d.getDate();
	        var h_m_s = d.toString().split(" ")[4];
	        return year + '/' + mon + '/' + date + ' ' + h_m_s;
	    }

	    function DateNow() {
	        var d = new Date();
	        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
	        return new Date(d);
	    }

	    function CostTime(departure, arrival) {
	        var d = new Date((departure - arrival));
	        var hour = d.getHours();
	        var min = d.getMinutes();
	        return hour + '小时' + min + '分钟';
	    }

	    function intToFloat(num) { return (num / 100).toFixed(2); }

	    function positive(num) { return num < 0 ? 0 : num; }

	    render(charge);
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

/***/ 19:
/***/ function(module, exports) {

	module.exports = (function(dust){dust.register("app\/view\/users\/_parkingPayment-item",body_0);function body_0(chk,ctx){return chk.s(ctx.get(["hide_data"], false),ctx,{"block":body_1},{}).s(ctx.get(["cptid"], false),ctx,{"block":body_2},{}).s(ctx.get(["cpiid"], false),ctx,{"block":body_3},{}).w("<div class=\"ui relaxed divided list\"><div class=\"item\"><div class=\"content\"><div class=\"title\">车牌号码</div><div class=\"value large\">").f(ctx.get(["carlicense"], false),ctx,"h").w("</div></div></div><div class=\"item\"><div class=\"content\"><div class=\"title\">进场时间</div><div class=\"value\">").f(ctx.get(["entranceTimeStamp"], false),ctx,"h").w("</div></div></div><div class=\"item\"><div class=\"content\"><div class=\"title\">停车时长</div><div class=\"value\">").f(ctx.get(["parkingTime"], false),ctx,"h").w("</div></div></div><div class=\"item\"><div class=\"content\"><div class=\"title\">统计费用</div><div class=\"value red\"><span class=\"yen\">￥</span>").f(ctx.get(["payment"], false),ctx,"h").w("</div></div></div><div class=\"item\" id=\"couponDivPaid\" ").nx(ctx.get(["paidStatus"], false),ctx,{"block":body_4},{}).w("><div class=\"content\"><div class=\"title\">用优惠券</div><div class=\"value green\"><span class=\"minus\">-</span><span class=\"yen\">￥</span>").f(ctx.get(["coupon_amount"], false),ctx,"h").w("</div></div></div><div class=\"item edit\" id=\"couponDiv\" ").x(ctx.get(["paidStatus"], false),ctx,{"block":body_5},{}).w("><a href=\"#\" class=\"payChoice-link\"><form action=\"/users/coupon/pay\" method=\"post\"><input type=\"hidden\" name=\"h\" value=\"").f(ctx.get(["hide_data"], false),ctx,"h").w("\"></form><div class=\"content\"><div class=\"title\">用优惠券<span class=\"gray\">点击修改<i class=\"fa fa-angle-right fa-lg\"></i></span></div><div class=\"value green\"><span class=\"minus\">-</span><span class=\"yen\">￥</span>").f(ctx.get(["coupon_amount"], false),ctx,"h").w("</div></div></a></div><div class=\"item\"><div class=\"content\"><div class=\"title\" id=\"amount_total_title\">").x(ctx.get(["paidStatus"], false),ctx,{"else":body_6,"block":body_7},{}).w("</div><div class=\"value red large\"><span class=\"yen\">￥</span>").x(ctx.get(["paidStatus"], false),ctx,{"else":body_8,"block":body_9},{}).w("</div></div></div><div class=\"item\" ").x(ctx.get(["paidStatus"], false),ctx,{"block":body_10},{}).w("  ><div class=\"ui checkbox\"><input type=\"checkbox\" name=\"balance\" id=\"wallet-use-check\" ").x(ctx.get(["checkBoxDisabled"], false),ctx,{"block":body_11},{}).w("><label class=\"checkbox-label ").x(ctx.get(["checkBoxDisabled"], false),ctx,{"block":body_12},{}).w("\" id=\"checkbox-label\">使用馀额( 当前馀额: <i class=\"fa fa-jpy\"></i><span id=\"wallet-remain\">").f(ctx.get(["wallet"], false),ctx,"h").w("</span> )</label></div></div></div><input type=\"hidden\" id=\"amount_total\"><button id=\"PayToLeave\" class=\"fluid ui button button-green\" ").x(ctx.get(["paidStatus"], false),ctx,{"block":body_13},{}).w(" >付费离场</button><p class=\"hint\">付费结束後未在15分钟内驶离停车场可能产生额外费用喔!</p>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<input type=\"hidden\" id=\"data\" name=\"d\" value=\"").f(ctx.get(["hide_data"], false),ctx,"h").w("\">");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<input type=\"hidden\" id=\"cptid\" name=\"cptid\" value=\"").f(ctx.get(["cptid"], false),ctx,"h").w("\">");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<input type=\"hidden\" id=\"cpiid\" name=\"cpiid\" value=\"").f(ctx.get(["cpiid"], false),ctx,"h").w("\">");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w("style=\"display: none;\"");}body_4.__dustBody=!0;function body_5(chk,ctx){return chk.w("style=\"display: none;\"");}body_5.__dustBody=!0;function body_6(chk,ctx){return chk.w("结算金额");}body_6.__dustBody=!0;function body_7(chk,ctx){return chk.w("支付金额");}body_7.__dustBody=!0;function body_8(chk,ctx){return chk.f(ctx.get(["payment_total"], false),ctx,"h");}body_8.__dustBody=!0;function body_9(chk,ctx){return chk.f(ctx.get(["paid"], false),ctx,"h");}body_9.__dustBody=!0;function body_10(chk,ctx){return chk.w("style=\"display: none;\"");}body_10.__dustBody=!0;function body_11(chk,ctx){return chk.w("disabled");}body_11.__dustBody=!0;function body_12(chk,ctx){return chk.w("disabled");}body_12.__dustBody=!0;function body_13(chk,ctx){return chk.w("disabled");}body_13.__dustBody=!0;return body_0}(dust));

/***/ }

/******/ });