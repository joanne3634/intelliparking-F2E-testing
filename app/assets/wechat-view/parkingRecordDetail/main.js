var $ = require('jquery');
var dust = require('dust');

var template = require("wechat-view/parkingRecord/record-detail.dust");
dust.loadSource(template);
$.getJSON('/wechat-view/parkingRecord/detail').success(function(data){
    data.forEach(function(el){
        dust.render('app/view/wechat-view/parkingRecord/record-detail', el,function(err, html){
            $('#parkingRecordDetail-list')[0].insertAdjacentHTML('beforeend', html);
        })
    })
})
