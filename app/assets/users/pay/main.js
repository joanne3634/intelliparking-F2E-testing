define(['jquery'], function($) {
    var dust = require('dust');
    var data = JSON.parse($('#data').val());
    var charge = data['charge'] > 0 ? data['charge'] : 0;

    function render(paid) {
        var template = require("users/_parkingPayment-item.dust");
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
});