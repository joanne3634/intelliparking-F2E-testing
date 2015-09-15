var $ = require('jquery');
var dust = require('dust');

var template = require("wechat-view/coupons/payment.dust");
dust.loadSource(template);
$.getJSON('/wechat-view/coupons/parkingPayment').success(function(data){
    data.forEach(function(el){
        dust.render('app/view/wechat-view/coupons/payment', el,function(err, html){
            $('#payment-coupons-list')[0].insertAdjacentHTML('beforeend', html);
        })
    })
})