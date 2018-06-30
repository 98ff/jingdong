var express=require("express");
var app=express();
app.use(express.static("www"));
var fs=require("fs");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

var tel=[];
var tell='';
var code='';
app.get("/one",function (req,res) {
    var fileNames="users/"+req.query.list + ".txt";    
    console.log(req.query)
    fs.exists(fileNames,function (ex) {
        if(ex){
            res.json({
                info:"用户已存在",
                code:1,
            })
        }
    })
})
app.post("/two",function (req,res) {
    // use.push(req.body.user)
    // pas.push(req.body.password)
    var fileName="users/"+req.body.user + ".txt";
    var fileNames="users/"+req.body.tell + ".txt";
    
    fs.exists("users",function(exists){
        if(exists){
            fs.exists(fileName,function(exists2){
                if(exists2){
                    res.status(200).json({
                        info:"用户已存在",
                        code:1,
                    })
                }else{
                    // 写入文件
                    writeFile();
                }
            })
        }else{
            fs.mkdir("users",function(err){
                if(err){
                    res.status(200).json({
                        info:"创建users文件夹失败，系统错误",
                        code:2,
                    })
                }else{
                    // 写入文件
                    writeFile();
                }
            })
        }
    })
    function writeFile(){
        fs.writeFile(fileName,JSON.stringify(req.body),function(err){
            if(err){
                res.status(200).json({
                    info:"用户注册失败，系统错误",
                    code:3,
                })
            }else{
                res.status(200).json({
                    info:"注册成功",
                    code:0,
                });
                fs.writeFile(fileNames,JSON.stringify(req.body.tell),function(){})
            }
        });
    }
})

app.post("/dl",function (req,res){
    var fileName="users/" +req.body.user + ".txt";
        fs.exists(fileName,function (ex){
            if(ex){
                // 存在
                // 读取这个文件，把该用户的密码读取出来
                fs.readFile(fileName,function(err,data){
                    var data=data.toString();
                    data=JSON.parse(data);
                    if(data.password==req.body.password){
                        var date=new Date();    
                        date.setMonth(date.getMonth()+1);
                        res.cookie("user",req.body.user,date);
                        // 比较该用户密码和前端传进的密码是否一致
                        res.status(200).json({
                            info:"登录成功",
                            code:0
                        })
                    }else{
                        res.status(200).json({
                            info:"密码错误,请重新登录",
                            code:2
                        })
                    }
                })
            }else{
                res.status(200).json({
                    info:"该用户不存在",
                    code:1,
                })
            }
        })
})














app.listen(3000, function() {
    console.log("服务器开启中......");
});