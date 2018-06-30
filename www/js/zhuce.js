// $(".form-Two input").on("input",function(){
//     // if(){
//     //     console.log(123)
//     // }
// })
$(".form-Two input").eq(0).on("change",function () {
    if(re1.test($(this).val())){
        $(".form-Two span").eq(0).text("")
    }else{
        $(".form-Two span").eq(0).text("长度只能在4-20个字符之间")
    }
})
$(".form-Two input").eq(1).on("change",function () {
    if(re2.test($(this).val())){
        $(".form-Two span").eq(1).text("")
    }else{
        $(".form-Two span").eq(1).text("长度只能在6-20个字符之间")
    }
    if($(this).val()==$(".form-Two input").eq(2).val()){
        $(".form-Two span").eq(2).text("")        
    }
})
$(".form-Two input").eq(2).on("change",function () {
    if($(this).val()==$(".form-Two input").eq(1).val()){
        $(".form-Two span").eq(2).text("")
    }else{
        $(".form-Two span").eq(2).text("两次密码不一致")
    }
})
$(".form-Two input").eq(3).on("change",function () {
    if(re3.test($(this).val())){
        $(".form-Two span").eq(3).text("")
    }else{
        $(".form-Two span").eq(3).text("邮箱格式错误")
    }
})
var re1 = /^[\u4E00-\u9FA5a-zA-Z0-9_-]{4,10}$/
var re2 = /^[a-zA-Z0-9_-]{6,20}$/
var re3=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
$(".form-Two .hq").click(function(e){
    function getCode() {
        var str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        var strs=str.split("").sort(function() {
            return Math.random() - 0.5;
        }).slice(0, 4).join("");
        console.log(strs);
        $(".five input").on("input",function () {
            console.log($(".five input").val()==strs)
            if($(".five input").val()==strs){
                $("[type=submit]").removeAttr("disabled");
            }
        })
    }
    if(re1.test($("[name=user]").val()) && re2.test($("[name=password]").val()) && re3.test($("[type=email]").val()) && $("[name=password]").val()==$("[name=passwordTo]").val()){   
        getCode(); 
    }   
})
var user='';
var password='';
$(".form-Two .tj").click(function(e){
    e.preventDefault();
    user=$("[name=user]").val();
    password=$("[name=password]").val();
    $.post({
        url:"/two",
        data:{
            tell:tell,
            user:user,
            password:password,
        },
        success:function(data){
            if(data.code==0){
                $("nav").css("display","none");
                $("main").css("display","block");
                $("main p").text("恭喜您"+user);
            }else{
                alert(data.info);
            }
        }
    })
   
})