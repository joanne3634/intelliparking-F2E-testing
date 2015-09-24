define(['jquery'], function($) {
    var dust = require('dust');

    var template = require("users/_parkingPayment-item.dust");
    $.getJSON('/wechat-view/parkingPayment').success(function(data) {
            data.forEach(function(el) {
                dust.render('app/view/users/_parkingPayment-item', el, function(err, html) {
                    $('body')[0].insertAdjacentHTML('beforeend', html);
                })
            })
        })


    // wallet-use-check
    // TODO 接 餘額API 若餘額不足disabled 此勾選欄位 
    $.getJSON('/wechat-view/wallet-remain').success(function(data) {
        if (Number(data[0]['amount']) < 0) {
            $(".checkbox-label").addClass("disabled");
            document.getElementById('wallet-use-check').disabled = true;
        } else {
        	$(".checkbox-label").removeClass("disabled");
            document.getElementById('wallet-use-check').disabled = false;
        }
        $("#wallet-remain").append(data[0]['amount']);
    })

    // TODO 付費離場 
    //      A. if 勾選使用餘額且餘額充足 then 從錢包扣除 
    // 		B. if 未勾選使用餘額 then 呼叫微信支付付費 
});