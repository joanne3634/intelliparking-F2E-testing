define(['jquery'], function($) {
    var dust = require('dust');
    var template = require("users/_record-detail.dust");
    var data = JSON.parse($('#data').val());
    var el = {
        parkingRecord_id: data['pid'],
        carlicense: data['plate_no'],
        parkinglot: data['parking_lot']['name'],
        entranceTimeStamp: dateTrans(data['arrival']),
        parkingTime: CostTime(!data['departure'] ? DateNow(): data['departure'], data['arrival']),
        payment: intToFloat(data['amount']),
        coupon_amount: intToFloat(data['discount']),
        payment_total: intToFloat(data['charge'])
    }
    dust.render('app/view/users/_record-detail', el, function(err, html) {
        $('#parkingRecordDetail-list')[0].insertAdjacentHTML('beforeend', html);
    })

    function dateTrans(arrival) {
        var d = new Date(arrival);
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var date = d.getDate();
        var h_m_s = d.toString().split(" ")[4];
        return year + '/' + mon + '/' + date + ' ' + h_m_s;
    }
    function DateNow(){
        var d = new Date();
        d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
        return new Date(d);
    }
    function CostTime(departure, arrival) {
        var d = new Date((departure - arrival));
        var hour = d.getHours();
        var min = d.getMinutes();
        return hour + '小时' + min + '分钟';
    }
    function intToFloat(num) {
        return (num / 100).toFixed(2);
    }

});