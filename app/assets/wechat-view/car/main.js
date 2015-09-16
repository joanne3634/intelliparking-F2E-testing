var $ = require('jquery');
var dust = require('dust');

var template = require("wechat-view/car/car-license.dust");
dust.loadSource(template);
$.getJSON('/wechat-view/car/carlicense').success(function(data){
    data.forEach(function(el){
        dust.render('app/view/wechat-view/car/car-license', el,function(err, html){
            $('#car-licenses')[0].insertAdjacentHTML('beforeend', html);
        })
    })
})

$('#CarCreateForm').on('submit',function(e){
    e.preventDefault();

    var CarNumber = document.getElementById('CarNumber').value;
    
    /* 不足5位 限制數字以及大寫英文 */
    if( !/[0-9A-Z]{5}/.test( CarNumber ) ){
        Alert('请输入正确的车牌号','好的');
        return false;
    }

    /* 车牌已被绑定 */
    var carLicenseBindingStatus = true;

    if( carLicenseBindingStatus ){
        ConfirmCarBindingStatus('该车牌号已被其他帐号添加,您可以进行车牌认证以找回','稍後认证','马上认证');
        return false;
    }
});  

$('.ui.form.delete').on('submit',function(e){
    e.preventDefault();

    // console.log( form.carLicense.value );
    ConfirmDelete('确定要删除这个车牌信息吗？','确定','取消');
    return false;
});

function Alert(dialog,check){
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH+"px";
    dialogbox.style.left = (winW/2) - (280 * .5)+"px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    $('#dialogboxhead').html("eGo提示");
    $('#dialogboxbody').html(dialog);
    $('#dialogboxfoot').html('<button id="AlertButton" class="ui button alert">'+check+'</button>');
}
$(document).on('click', "#AlertButton", function(e){
    e.preventDefault();
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
})

function ConfirmCarBindingStatus (dialog,left,right){
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH+"px";
    dialogbox.style.left = (winW/2) - (280 * .5)+"px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    
    $('#dialogboxhead').html("eGo提示");
    $('#dialogboxbody').html(dialog);
    $('#dialogboxfoot').html('<button id="ConfirmLeftButton" class="ui button confirm" >'+left+'</button> <button id="ConfirmRightButton" class="ui button confirm">'+right+'</button>');
}

$(document).on('click', "#ConfirmLeftButton", function(e){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
})
$(document).on('click', "#ConfirmRightButton", function(e){
    document.location = document.location.origin+'/wechat-view/carAuth';
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
})

function ConfirmDelete(dialog,left,right){
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH+"px";
    dialogbox.style.left = (winW/2) - (280 * .5)+"px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    
    $('#dialogboxhead').html("eGo提示");
    $('#dialogboxbody').html(dialog);
    $('#dialogboxfoot').html('<button id="DeleteConfirmLeftButton" class="ui button confirm" >'+left+'</button> <button id="DeleteConfirmRightButton" class="ui button confirm">'+right+'</button>');
}

$(document).on('click', "#DeleteConfirmLeftButton", function(e){
    // todo : 跟後端接 刪除車牌 
    document.location = window.location.href ;
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
})
$(document).on('click', "#DeleteConfirmRightButton", function(e){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
})

