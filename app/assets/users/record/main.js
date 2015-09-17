define(['jquery'], function($) {
    var dust = require('dust');
    var template = require("users/_record-item.dust");
    $.getJSON('/wechat-view/parkingRecord/record').success(function(data) {
        data.forEach(function(el) {
            dust.render('app/view/users/_record-item', el, function(err, html) {
                $('body')[0].insertAdjacentHTML('beforeend', html);
            })
        })
    })
});