define(['jquery'], function($) {
    var dust = require('dust');
    var template = require("users/_record-item.dust");
    $.getJSON('/users/record/list').then(function(data) {
        data.history.forEach(function(el) {
            var insert_data = {
            	json_data: JSON.stringify(el),
                number: el['@rid'],
                parkingplace: el['parkingLot']['name'],
                costtime: CostTime(el['departure'], el['arrival']),
                date: dateTrans(el['arrival']),
                carlicense: el['plate_no'],
                feed: '¥' + el['charge']
            }
            dust.render('app/view/users/_record-item', insert_data, function(err, html) {
                $('body')[0].insertAdjacentHTML('beforeend', html);
            })
        })
    })
    $(document).on('click', "form", function(e) {
        $(this).submit();
    });

    function CostTime(departure, arrival) {
        var d = new Date((departure - arrival));
        var hour = d.getHours();
        var min = d.getMinutes();
        return hour + '小时' + min + '分钟';
    }

    function dateTrans(arrival) {
        var d = new Date(arrival);
        var year = d.getFullYear();
        var mon = d.getMonth();
        var date = d.getDate();
        return year + '/' + mon + '/' + date;
    }
});