$.fn.click = function(listener) {
    return this.each(function() {
        var $this = $(this);
        $this.on('vclick', listener);
    });
};

jQuery(document).ready(function($) {

    //$('select.dropdown').dropdown(); //Start of車牌介面
    $(".ui.dropdown.selection").click(function(event) {
        if ($(".default.text").text().length >= 2) {
            $("#Sheng").show();
            $("#mask").show().css('height', $(window).height());
            return;
        }
        if ($(".default.text").text().length == 1) {
            $("#Sheng").hide();
            $("#Abc").show();
            $("#mask").show().css('height', $(window).height());
            return;
        }
    });

    $("#mask").click(function(event) {
        $("#Sheng").hide();
        $("#Abc").hide();
        $(this).hide();
    });

    $("#Sheng fieldset label").mousedown(function(event) {
        $(this).addClass("active").siblings().removeClass('active');
        $(this).find('input#'+$(this)[0].htmlFor).attr('checked', 'checked');
        $(".default.text").text($(this).text());
        $("#Sheng").hide();
        $("#Abc").show();
    });

    $("#Abc fieldset label").mousedown(function(event) {
        $(this).addClass("active").siblings().removeClass('active');
        $(this).find('input#'+$(this)[0].htmlFor).attr('checked', 'checked');
        var getAbc = $(this).text();
        $(".default.text").append(getAbc);
        $("#Abc").hide();
        $("#mask").hide();
    });

    $("#CarNumber,#ValidateCode,#GetCode,#Phone").click(function(event) {
        $("#Sheng").hide();
        $("#Abc").hide();
        $("#mask").hide();
    });
    //End of 車牌介面
});
