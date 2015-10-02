define(['jquery'], function($) {
    var dust = require('dust');
    var template = require("users/_record-item.dust");
    $.getJSON('/users/record/list').then(function(data) {
        data.history.forEach(function(el) {
            if (el['charge'] != 0) {
                var insert_data = {
                    json_data: JSON.stringify(el),
                    number: el['pid'],
                    parkingplace: el['parking_lot']['name'],
                    costtime: CostTime(!el['departure'] ? DateNow() : el['departure'], el['arrival']),
                    date: dateTrans(el['arrival']),
                    carlicense: el['plate_no'],
                    feed: '¥' + intToFloat(el['charge'])
                }
                dust.render('app/view/users/_record-item', insert_data, function(err, html) {
                    $('#record-container')[0].insertAdjacentHTML('beforeend', html);
                })
            }
        })
        if ($('#record-container').is(':empty')) {
            $('#record-container').text('暂无记录 ');
        }
    })


    $(document).on('click', ".record-item-container", function(e) {
        $(this)[0].childNodes[0].submit();
    });

    function CostTime(departure, arrival) {
        var d = new Date((departure - arrival));
        var hour = d.getHours();
        var min = d.getMinutes();
        return hour + '小时' + min + '分钟';
    }

    function DateNow() {
        var d = new Date();
        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
        return new Date(d);
    }

    function dateTrans(arrival) {
        var d = new Date(arrival);
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var date = d.getDate();
        return year + '/' + mon + '/' + date;
    }

    function intToFloat(num) {
        return (num / 100).toFixed(2);
    }
});