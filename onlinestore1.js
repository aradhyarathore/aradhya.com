function rawAjax(data){  
    $.ajax({
        url: "/creator/api/v1",
        type:'POST',
        data: data,
            success: function(response) {
                var res = JSON.parse(response);
                window[data.function_name](res);
            }
    });
}
function formAjax(e,form){
    e.preventDefault();
    if ($(form).attr("action")&&($(form).attr("action")=="delete"||$(form).attr("action")=="reset")){
        if (!confirm("Do you want to "+$(form).attr("action")+"?")){
            return false;
        }
    }
    if ($(form).attr("function_name") != "signup"  && $(form).attr("function_name") != "login"  && $(form).attr("controller_name") != "ActionController"){
        if (!getCookie("session_token")){
            var markup = '<div class="alert alert-danger" role="alert">Login Expired. Relogin please.</div>';
            return $("#notice").html(markup);
        }
    }  
    var formdata = new FormData(form);
    if ($(form).attr("function_name") == "signup" && getCookie("http_referer")){
        formdata.append("http_referer", getCookie("http_referer"));
    } else if ($(form).attr("function_name") != "login" && $(form).attr("controller_name") != "ActionController"){
        formdata.append("session_token", getCookie("session_token"));
    }
    formdata.append("controller_name", $(form).attr("controller_name"));
    var function_name = $(form).attr("function_name");
    formdata.append("function_name", function_name);
    if ($(form).attr("notice_div")){
        var notice_div = "#"+$(form).attr("notice_div");
    } else {
        var notice_div = "#notice";
    }
    $(notice_div).empty();
    $.ajax({
        url: "/creator/api/v1",
        type:'POST',
        data: formdata,
        cache:false,
        contentType: false,
        processData: false,

        beforeSend: function(){
            $(notice_div).html("<img src='/creator/admin/img/loaderbar.gif' style='width:100%;height:20px;'>");
        },
        success: function(response) { 
            var res = JSON.parse(response);
            if (res.success){
                if (!$(form).attr("after_reset")){
                    $(form).trigger('reset');
                }
                var markup = '<div class="alert alert-success" role="alert">'+res.message+'</div>';
            } else {
                var markup = '<div class="alert alert-danger" role="alert">'+res.error+'</div>';
            }
            $(notice_div).html(markup);
            
            if (res.data){
                window[function_name](res);
            }
        }
    });
}