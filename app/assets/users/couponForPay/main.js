define(['jquery'], function($) {
    var dust = require('dust');
    var template = require("users/_payment.dust");
    $.getJSON('/wechat-view/coupons').success(function(data) {
        data.forEach(function(el) {
            dust.render('app/view/users/_payment', el, function(err, html) {
                if (!el['usedStatus']) {
                    $('#payment-coupons-list')[0].insertAdjacentHTML('beforeend', html);
                }
            })
        })
    })
});