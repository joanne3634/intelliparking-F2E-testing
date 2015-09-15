var $ = require('jquery');
var dust = require('dust');


var template = require("wechat-view/paychoice/car-license.dust");
dust.loadSource(template);
$.getJSON('/wechat-view/paychoice/license').success(function(data) {
    data.forEach(function(el) {
        dust.render('app/view/wechat-view/paychoice/car-license', el, function(err, html) {
            $('#CarLicense')[0].insertAdjacentHTML('beforeend', html);
        })
    })
})


var template = require("wechat-view/paychoice/carnumbers.dust");
dust.loadSource(template);
$.getJSON('/wechat-view/paychoice/carnumbers').success(function(data) {
    data.forEach(function(el) {
        dust.render('app/view/wechat-view/paychoice/carnumbers', el, function(err, html) {
            $('#CarNumber')[0].insertAdjacentHTML('beforeend', html);
        })
    })
})