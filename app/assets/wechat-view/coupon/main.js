var $ = require('jquery');
var dust = require('dust');

var template = require("wechat-view/coupons/coupon-item.dust");
dust.loadSource(template);
$.getJSON('/wechat-view/coupons').success(function(data){
    data.forEach(function(el){
        dust.render('app/view/wechat-view/coupons/coupon-item', el,function(err, html){
            if(el['usedStatus']){
                $('#coupon-list-history')[0].insertAdjacentHTML('beforeend', html);
            }else{
                $('#coupon-list-use')[0].insertAdjacentHTML('beforeend', html);
            }
        })
    })
})

$('#ControlTab0').on('click', function(){
    removeClass(document.getElementById("ControlTab1"), "active");
    addClass(document.getElementById("ControlTab0"), "active");
    document.getElementById("Tab1").style.display = "none";
    document.getElementById("Tab0").style.display = "block";
})

$('#ControlTab1').on('click', function(){
    removeClass(document.getElementById("ControlTab0"), "active");
    addClass(document.getElementById("ControlTab1"), "active");
    document.getElementById("Tab0").style.display = "none";
    document.getElementById("Tab1").style.display = "block";
})

function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}