define(['jquery'], function($) {
    var dust = require('dust');
    require('lib/dust_helpers.js')(dust);
    require('dust_helpers.js')(dust);

    $.getJSON('/users/car').then(function(data) {
        var template = require("users/_paychoice-car-license.dust");
        console.log( data );
        if (data.length == 1) {
            alert('redirect to payment page');
            /*  one car: directly go to payment page */
            // var carlicenseId = data[0]['carLicenses'][0]['carlicenseId'];
            // document.location = 'pay?carlicenseId=' + carlicenseId;
        } else {

            /*    Xcar: button link to the car-adding page     */
            /*    cars: button for chooseing which car to pay  */
            var insert_data = {
                "carCount": data.length,
                "carLicenses":data
            }
            dust.render('app/view/users/_paychoice-car-license', insert_data, function(err, html) {
                $('#payChoiceContent')[0].insertAdjacentHTML('beforeend', html);
            })
        }
    })
});