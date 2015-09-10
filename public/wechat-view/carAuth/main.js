function validateCarCreate(){
    var form_valid = (document.getElementById('CarNumber').value);
    // /* 不足5位 */
    if(form_valid.length != 5){
        Alert.render('请输入正确的手机号码','好的');
        return false;
    }
    /* 车牌已被绑定 */
    if(form_valid.length != 5){
        Confirm.render('该车牌号已被其他帐号添加,您可以进行车牌认证以找回',null,null,'redirect',document.location.origin+'/CarAuth.html','稍後认证','马上认证');
        return false;
    }
    return true;
}   

function carLicenseAuth(form){
    // TODO 
    var submitStatus = true;

    if( submitStatus ){
        AlertURL.render('提交成功,我们将尽快帮您进行处理,请随时关注进度。','好的','redirect',document.location.origin+'/afterCarAuth.html');
    }else{
        Alert.render('提交失败,请尝试重新上传照片後再次提交。','好的');
    }
    return false;
}