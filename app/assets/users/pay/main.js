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
});