var $ = require('jquery');

$.getJSON('/wechat-view/afterCarAuth').success(function(data) {
    $("#carLicense").append(data[0]['carlicense']); 
});