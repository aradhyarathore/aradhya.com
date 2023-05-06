function webCreatorCheck(res){
    console.log(res);
    if (!res.success){
        location.replace(global("owner_website_url")+"/creator/dashboard");
    }
}

if  (window.location.href.indexOf("/edit/") > -1) {
    if  (window.location.href.indexOf("/?session_token=") > -1) {
        var session_token = window.location.href.substring(window.location.href.indexOf("/?session_token=") + 16);
        setCookie("session_token",session_token,30,window.location.hostname);
    }
    if (!getCookie("session_token")){
        location.replace(global("owner_website_url")+"/creator/dashboard");
    }
    var data = {function_name:"webCreatorCheck",session_token:getCookie("session_token"),website_id:$("input[name='website_id']").val(),call_from:"frontend"};
    rawAjax(data);
    $.getScript(global("owner_website_url")+"/creator/admin/js/icons.js"); 
    $.getScript(global("owner_website_url")+"/creator/admin/js/upload_image.js");  
    $.getScript(global("owner_website_url")+"/creator/admin/js/editor.js");       
}

function getWebsiteWorksForFrontend(res){
    for (var i = 0; i < res.data.works.length; i++){
        var markup = '<div class="card"> <div class="card__header"> <img src="'+res.data.works[i].image+'" style="height: 200px" alt="card__image" class="card__image" width="600"> </div> <div class="card__body"> <h4>'+res.data.works[i].title+'</h4> <p>'+res.data.works[i].content.replace(/<[^>]+>/g, "").substring(0, 150)+'</p> </div> <div class="card__footer"> <div class="custom_user"> <div class="user__info"> <a href="/'+res.data.works[i].path+'" class="custom_button">Read More</a> </div> </div> </div> </div>';
        $(".custom_container").append(markup);
    }
    $("#show_more").html('<div id="show_more" style="text-align:center"><a onclick="printWebsiteWorks('+res.data.skip+');" id="print_website_works" class="custom_button green">View More</a></div>');
}
if  (window.location.href.indexOf("/works/") > -1) {
    $("#print_website_works").click();
}
function printWebsiteWorks(skip){
    var data = {function_name:"getWebsiteWorksForFrontend",website_name:global("creator_website_name"),call_from:"frontend",controller_name:"ViewController",skip:skip};
    rawAjax(data);
}
function addToCart(e){
    e.preventDefault();
    if ($("input[name=website_id]").val() && $("input[name=work_id]").val()) {
        var cart = JSON.stringify({website_id:$("input[name=website_id]").val(), work_id:$("input[name=work_id]").val(), work_quantity:1,work_title:$("input[name=work_title]").val(), work_price:$("input[name=work_price]").val()});
        setCookie("cart",cart,30);
        window.location.assign("/checkout/");
    }
}
if  (window.location.href.indexOf("/checkout/") > -1) {
    if (!getCookie("cart")){
        window.location.assign("/");
    }
    var cart = JSON.parse(getCookie("cart"));
    var markup = '<h2>'+ cart.work_title +'</h2> <h3>Quantity: 1</h3> <h3>Price: '+ cart.work_price +'</h3> <hr> <h3>Total Cost: '+ cart.work_price +'</h3>';
    $("#work_details").append(markup);
}
if  (window.location.href.indexOf("/checkout/?status=paid") > -1) {
    var markup = '<h2>Order Successfully Placed</h2>';
    $("#checkout_form").html(markup);
    deleteCookie("cart");

}
function showPaymentGateways(){
    $("#billing").hide();
    $("#payment_gateways").show();
}
function createOrder(res){
    if (res.data[0].payment){
        var payment = JSON.parse(res.data[0].payment);
        if (payment.gateway == "cod"){
            var markup = '<h2>Order Successfully Placed</h2>';
            $("#checkout_form").html(markup);
            deleteCookie("cart");
        } else {
            window.location.assign("/order/"+payment.gateway+"/"+res.data[0].id);
        }
    }
}