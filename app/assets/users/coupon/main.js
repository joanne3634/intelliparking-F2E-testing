define(['jquery'], function($) {

    var dust = require('dust');


    $.getJSON('/users/coupon').then(function(data) {
        var template = require("users/_coupon-item.dust");
        data.forEach(function(el) {
            var insert_data = {
                title: el.instances[0].title,
                description: el.instances[0].description,
                status: el.instances[0].status, //issued|claimed|expired|used 
                expiredAt: dateTrans(el.instances[0].expiredAt)
            }
            dust.render('app/view/users/_coupon-item', insert_data, function(err, html) {
                if (insert_data['status'] != 'claimed') {
                    $('#coupon-list-history')[0].insertAdjacentHTML('beforeend', html);
                } else {
                    $('#coupon-list-use')[0].insertAdjacentHTML('beforeend', html);
                }
            })
        })
    })

    function dateTrans(expiredAt) {
        var d = new Date(expiredAt);
        var year = d.getFullYear();
        var mon = d.getMonth();
        var date = d.getDate();
        var h_m_s = d.toString().split(" ")[4];
        return year + '/' + mon + '/' + date + ' ' + h_m_s;
    }

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