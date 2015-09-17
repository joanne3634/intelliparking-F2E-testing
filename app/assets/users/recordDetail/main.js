define(['jquery'], function($) {
    var dust = require('dust');
    var template = require("users/_record-detail.dust");
    $.getJSON('/wechat-view/parkingRecord/detail').success(function(data) {
        data.forEach(function(el) {
            dust.render('app/view/users/_record-detail', el, function(err, html) {
                $('#parkingRecordDetail-list')[0].insertAdjacentHTML('beforeend', html);
            })
        })
    })
});