var $ = require('jquery');
var dust = require('dust');

var template = require("wechat-view/paychoice/car-license.dust");
dust.loadSource(template);
$.getJSON('/wechat-view/paychoice/license').success(function(data) {
	if( data[0]['carCount'] == 1 ){ 
		/*	one car: directly go to payment page */
		var carlicenseId = data[0]['carLicenses'][0]['carlicenseId'];
		document.location = 'ParkingPayment.html?carlicenseId='+carlicenseId;
	}else{ 
		 
		 /*	  Xcar: button link to the car-adding page 	   */	
		 /*	  cars: button for chooseing which car to pay  */
	    dust.render('app/view/wechat-view/paychoice/car-license', data[0], function(err, html) {
	        $('#payChoiceContent')[0].insertAdjacentHTML('beforeend', html);
	    })
	}		
})

