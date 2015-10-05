define(['jquery'], function($) {
    var dust = require('dust');
    var hidden_data = JSON.parse($('#data').val());

    var template = require("users/_payment.dust");
    $.getJSON('/users/coupon').success(function(data) {
        console.log(data);
        data.forEach(function(el) {
            if (el.instances[0].status == 'claimed') {
                var insert_data = {
                    cptid: el.coupon.id,
                    cpiid: el.instances[0].id,
                    title: el.instances[0].title,
                    description: el.instances[0].description,
                    status: el.instances[0].status, //issued|claimed|expired|used 
                    expiredAt: dateTrans(el.instances[0].expiredAt),
                    hide_data: JSON.stringify(hidden_data)
                }
                dust.render('app/view/users/_payment', insert_data, function(err, html) {
                    $('#payment-coupons-list')[0].insertAdjacentHTML('beforeend', html);
                })
            }
        })
    })
    $(document).on('click', ".payChoice-link", function(e) {
        // request.post('/users/pay').form({key:'value'})
        $(this)[0].childNodes[1].submit(); // form 
    });

    function dateTrans(expiredAt) {
        var d = new Date(expiredAt);
        var year = d.getFullYear();
        var mon = d.getMonth()+1;
        var date = d.getDate();
        var h_m_s = d.toString().split(" ")[4];
        return year + '/' + mon + '/' + date + ' ' + h_m_s;
    }
});