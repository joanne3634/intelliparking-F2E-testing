var $ = require('jquery');
var dust = require('dust');

var template = require("wechat-view/parkingRecord/record-item.dust");
dust.loadSource(template);
$.getJSON('/wechat-view/parkingRecord/record').success(function(data){
    data.forEach(function(el){
        dust.render('app/view/wechat-view/parkingRecord/record-item', el,function(err, html){
            $('body')[0].insertAdjacentHTML('beforeend', html);
        })
    })
})
