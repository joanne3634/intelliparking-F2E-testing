define(['jquery'], function($) {
    var dust = require('dust');
    require('lib/dust_helpers.js')(dust);
    require('dust_helpers.js')(dust);
    var template = require("users/_paychoice-car-license.dust");
    dust.loadSource(template);
    $.getJSON('/wechat-view/paychoice/license').success(function(data) {
        if (data[0]['carCount'] == 1) {
            /*	one car: directly go to payment page */
            var carlicenseId = data[0]['carLicenses'][0]['carlicenseId'];
            document.location = 'pay?carlicenseId=' + carlicenseId;
        } else {

            /*	  Xcar: button link to the car-adding page 	   */
            /*	  cars: button for chooseing which car to pay  */
            dust.render('app/view/users/_paychoice-car-license', data[0], function(err, html) {
                $('#payChoiceContent')[0].insertAdjacentHTML('beforeend', html);
            })
        }
    })
});