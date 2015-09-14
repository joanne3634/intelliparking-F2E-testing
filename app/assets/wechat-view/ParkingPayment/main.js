var $ = require('jquery');
var dust = require('dust');

var template = require("wechat-view/parkingPayment/parkingPayment-item.dust");
dust.loadSource(template);
$.getJSON('/wechat-view/parkingPayment').success(function(data){
    data.forEach(function(el){
        dust.render('app/view/wechat-view/parkingPayment/parkingPayment-item', el,function(err, html){
            $('body')[0].insertAdjacentHTML('beforeend', html);
        })
    })
})
