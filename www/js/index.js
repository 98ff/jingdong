$("header ul .xl").hover(function(){
    $(this).css({
        "backgroundColor":"white",
    })
    $(this).find(".sa").css("display","block")
},function () {
    $(this).css({
        "backgroundColor":"#e3e4e5",
    });
    $(this).find(".sa").css("display","none")
})


var index = 0;
var t = setInterval(nextImg,2000);

function a(){
    $('.content .pic a').eq(index)
    .show()	
    .siblings()	
    .hide();		

    $('.indicator span').eq(index)    
    .addClass('active')
    .siblings().removeClass()   
}

function nextImg(){
    index++;
    if(index==$('.content .pic a').length){
        index=0;
    }
    a();
}
$('.next').click(function(){
    nextImg();
})
function prevImg(){
    index--;
    if(index<0){
        index=$('.pic a').length-1;
    }
    a();
}
$('.prev').click(function(){
    prevImg();
})
$('.prev').hover(function(){
    clearInterval(t);
    index = $(this).index()
    a()
},function(){			
    t=setInterval(nextImg,2000)
})

$('.next').hover(function(){
    clearInterval(t);
    index = $(this).index()
    a()
},function(){
    t=setInterval(nextImg,2000)
})

$('.indicator span').hover(function(){
    clearInterval(t);
    index = $(this).index()
    a()
    
},function(){
    t=setInterval(nextImg,2000)
})


$(".midd span").on("mouseover",function (e) {
    $(this).css("borderBottom","2px solid red")
    .siblings().css("border","none");
})
$(".midd span").eq(0).on("mouseover",function () {
    $(".midd ul").eq(1).css("display","none")
    $(".midd ul").eq(0).css("display","block")
})
$(".midd span").eq(1).on("mouseover",function () {
    $(".midd ul").eq(0).css("display","none")
    $(".midd ul").eq(1).css("display","block")
})

var s=60;
var m=59;
setInterval(function time(){
    s--;
    // console.log(s)
    if(s<0){
        s=59
    }
    s = s < 10 ? '0' + s : s;
    $(".ms .three").text(s);
} ,1000);
setInterval(function time(){
    m--;
    console.log(m);
    if(m<0){
        m=0;
    }
    m = m < 10 ? '0' + m : m;
    $(".ms .two").text(m);
} ,60000);






var listdataOne = [];
    $(document).ready(function () {
        $.getJSON({
            url: 'js/list.json',
            success: function (data) {
                var str = '';
                listdataOne = data;
                // console.log(listdataOne);
                listdataOne.forEach(function (e) {
                    var some = '';
                    var d = e.content.length;
                    var s = '';
                    for (var i = 0; i < d; i++) {
                        s += ('<a href="">' + e.content[i] + '</a>')
                        if (i != (d - 1)) {
                            s += "/";
                        }
                    }
                    some += ('<li>' + s + "<section class='list'></section>" + '</li>');
                    str += some;
                })
                $(".nav>.left").html('<ul>' + str + '</ul>');
            }
        })
    })

    $(document).ready(function(){
        $.ajax({
            url:"js/lunbo.json",
            success:function(data){
                // console.log(data);
                $(".list").each(function (i,e) {
                    var s1='';
                    var s2='';
                    var s3='';
                    var s4='';
                    // console.log(i);
                    data[i].top.forEach(function(e){
                        // console.log(e);
                        s1+= "<li>"+ e +' > '+"</li>"
                    })

                    data[i].two.forEach(function(e,h){
                        s2 +="<dt>"+ e +' > '+"</dt>" ;
                        data[i].content[h].forEach(function(e){

                            s2+="<dd>"+e+"</dd>";
                        }) 
                        s3 +="<dl>"+s2+"</dl>"
                        s4+=s3;
                        s3='';
                        s2='';
                        
                    });
                    
                    
                    var str='<div class="list_left"><div class="top"><ul>'+ s1 +'</ul></div>'+"<div class='bottom'>"+ s4+" </div>"
                    +'</div><div class="list_right"></div>'
                    $(this).html(str);
                })
                $(".list_right").each(function (i,e) {
                    $(this).html("<div class='imgboxs'>1</div><div class='imgbox'><img src='"+data[i].imgs[0] +"' alt=''></div><div class='imgbox'><img src='"+data[i].imgs[1] +"' alt=''></div>");
                    var str2='';
                    data[i].img.forEach(function (e) {  
                        str2+="<img src='"+ e +"'>"
                    })
                    $(this).children(".imgboxs").html(str2);
                
                })
            }
        })
    })
// $("[aria-label=Go to slide 5]").css("display","none")