define(['jquery'], function($) {

    var dust = require('dust');
    require('lib/dust_helpers.js')(dust);
    require('dust_helpers.js')(dust);

    // $.getJSON('/users/paychoice').then(function(data) {
    //     var template = require("users/_paychoice-car-license.dust");
    //     if (data.status == 404) {
    //         data.total = 0;
    //     }

    //     if (data.total == 1) {
    //         // alert('redirect to payment page');
    //         var pay = {
    //             detail_data: JSON.stringify(data.IpsParkingRecords[0])
    //         }
    //         $.post("/users/pay", pay);
    //         // .done(function(response) {
    //         //     console.log('done!!!!  ');
    //         // }).fail(function(response) {
    //         //     console.log('fail');
    //         // })
    //             /*  one car: directly go to payment page */
    //             // var carlicenseId = data[0]['carLicenses'][0]['carlicenseId'];
    //             // document.location = 'pay?carlicenseId=' + carlicenseId;
    //     } else {

    //         /*    Xcar: button link to the car-adding page     */
    //         /*    cars: button for chooseing which car to pay  */
    //         for (var key in data.IpsParkingRecords) {
    //             data.IpsParkingRecords[key]['json_data'] = JSON.stringify(data.IpsParkingRecords[key]);
    //         }
    //         var insert_data = {
    //             "carCount": data.total,
    //             "carLicenses": data.IpsParkingRecords
    //         }
    //         dust.render('app/view/users/_paychoice-car-license', insert_data, function(err, html) {
    //             $('#payChoiceContent')[0].insertAdjacentHTML('beforeend', html);
    //         })
    //     }
    // })
    // if("#CarNumber")
    $(document).on('click', ".payChoice-link", function(e) {
        // request.post('/users/pay').form({key:'value'})
        $(this)[0].childNodes[1].submit(); // form 
    });
});