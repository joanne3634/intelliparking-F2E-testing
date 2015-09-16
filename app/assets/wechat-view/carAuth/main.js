var $ = require('jquery');

$('#CarCreateForm').on('submit', function(e) {
    e.preventDefault();

    var CarNumber = document.getElementById('CarNumber').value;
    /* 不足5位 限制數字以及大寫英文*/
    if (!/[0-9A-Za-z]{5}/.test(CarNumber)) {
        Alert('请输入正确的车牌号', '好的');
        return false;
    }
    /* 车牌已被绑定 */
    // if(form_valid.length != 5){
    //     Confirm('该车牌号已被其他帐号添加,您可以进行车牌认证以找回','稍後认证','马上认证');
    //     return false;
    // }

    var f = document.CarCreateForm;
    if ( f.carlicensePhoto.value.length == 0 ){
        Alert('请上传车牌照片。', '好的');
        return false;
    }
    if ( f.carDrivePhoto.value.length == 0 ){
        Alert('请上传机动车行驶证照片。', '好的');
        return false;
    }

    // todo: 後端判斷
    var submitStatus = true;

    if (submitStatus) {
        AlertURL('提交成功,我们将尽快帮您进行处理,请随时关注进度。', '好的');
        return false;
    } else {
        Alert('提交失败,请尝试重新上传照片後再次提交。', '好的');
        return false;
    }
});


function Alert(dialog, check) {
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH + "px";
    dialogbox.style.left = (winW / 2) - (280 * .5) + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    $('#dialogboxhead').html("eGo提示");
    $('#dialogboxbody').html(dialog);
    $('#dialogboxfoot').html('<button id="AlertButton" class="ui button alert">' + check + '</button>');
}
$(document).on('click', "#AlertButton", function(e) {
    e.preventDefault();
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
});

function AlertURL(dialog, check) {
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH + "px";
    dialogbox.style.left = (winW / 2) - (280 * .5) + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    $('#dialogboxhead').html("eGo提示");
    $('#dialogboxbody').html(dialog);
    $('#dialogboxfoot').html('<button id="AlertURLButton" class="ui button alert" >' + check + '</button>');
}

$(document).on('click', "#AlertURLButton", function(e) {
    document.location = document.location.origin + '/carAuth.html';
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
});

function Confirm(dialog, left, right) {
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH + "px";
    dialogbox.style.left = (winW / 2) - (280 * .5) + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";

    $('#dialogboxhead').html("eGo提示");
    $('#dialogboxbody').html(dialog);
    $('#dialogboxfoot').html('<button id="CustomConfirmLeftButton" class="ui button confirm" >' + left + '</button> <button id="CustomConfirmRightButton" class="ui button confirm">' + right + '</button>');
}

$(document).on('click', "#CustomConfirmLeftButton", function(e) {
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
});
$(document).on('click', "#CustomConfirmRightButton", function(e) {
    document.location = document.location.origin + '/carAuth.html';
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
});