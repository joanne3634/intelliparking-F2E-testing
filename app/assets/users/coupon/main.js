define(['jquery'], function($) {

    var dust = require('dust');
    var template = require("users/_coupon-item.dust");
    
    $.getJSON('/wechat-view/coupons').success(function(data) {
        data.forEach(function(el) {
            dust.render('app/view/users/_coupon-item', el, function(err, html) {
                if (el['usedStatus']) {
                    $('#coupon-list-history')[0].insertAdjacentHTML('beforeend', html);
                } else {
                    $('#coupon-list-use')[0].insertAdjacentHTML('beforeend', html);
                }
            })
        })
    })

    $('#ControlTab0').on('click', function() {
        $("#ControlTab1").removeClass("active");
        $("#ControlTab0").addClass("active");
        document.getElementById("Tab1").style.display = "none";
        document.getElementById("Tab0").style.display = "block";
    })

    $('#ControlTab1').on('click', function() {
        $("#ControlTab0").removeClass("active");
        $("#ControlTab1").addClass("active");
        document.getElementById("Tab0").style.display = "none";
        document.getElementById("Tab1").style.display = "block";
    })
});