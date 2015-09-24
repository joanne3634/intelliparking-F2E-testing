define(['jquery'], function($) {
    var dust = require('dust');
    var template = require("users/_record-detail.dust");
    var data = JSON.parse($('#data').val());
    var el = {
        parkingRecord_id: data['@rid'],
        carlicense: data['plate_no'],
        parkinglot: data['parkingLot']['name'],
        entranceTimeStamp: dateTrans(data['arrival']),
        parkingTime: CostTime(data['departure'], data['arrival']),
        payment: data['amount'],
        coupon_amount: data['discount'],
        payment_total: data['charge']
    }
    dust.render('app/view/users/_record-detail', el, function(err, html) {
        $('#parkingRecordDetail-list')[0].insertAdjacentHTML('beforeend', html);
    })

    function dateTrans(arrival) {
        var d = new Date(arrival);
        var year = d.getFullYear();
        var mon = d.getMonth();
        var date = d.getDate();
        var hour = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();

        return year + '/' + mon + '/' + date+' '+hour+':'+min+':'+sec;
    }
    function CostTime(departure, arrival) {
        var d = new Date((departure - arrival));
        var hour = d.getHours();
        var min = d.getMinutes();
        return hour + '小时' + min + '分钟';
    }

});