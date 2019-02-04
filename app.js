

const express = require('express');
const app = express();
var path = require('path');
var fs = require('fs');

//使用nodejs自带的http、https模块
var http = require('http');
var https = require('https');
//保存用户信息
const session = require("express-session");
//配置中间件 固定格式
app.use(session({
    secret:'my cat',
    resave:false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30
    },
    rolling:true
}))

//引入模板

let login =require('./routes/login.js');
let che =require('./routes/che.js');
let index =require('./routes/index.js');
let user =require('./routes/user.js')
let goods = require('./routes/goods');
let api = require('./routes/api.js');

//使用ejs模板引擎 默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态目录
app.use(express.static('public'));

/*权限判断*/
app.use(function(req,res,next){
    console.log(req.url);
    var reg=/^\/api.*$/;   /*定义验证表达式*/
  
    //next();
    if(req.url=='/login/delu' || req.url=='/login/doLogin' || req.url=='/' ||  reg.test(req.url) ){
        next();

    }else{

        if(req.session.userinfo&&req.session.userinfo.username!=''){   /*判断有没有登录*/

            //app.locals  全局
            //
            //req.app.locals  /*请求的全局*/

           
            req.app.locals['userinfo']=req.session.userinfo;   /*配置全局变量  可以在任何模板里面使用*/
            next();
        }else{
            res.redirect('/login/delu')
        }
    }

})

app.use('/che',che);
app.use('/login',login);
app.use('/user',user);
app.use('/goods', goods);
app.use('/api', api);
app.use('/',index);
app.get('*',(req,res)=>{
    res.render('404');
})
// app.listen(8080)
//根据项目的路径导入生成的证书文件
var privateKey  = fs.readFileSync(path.join(__dirname, './private.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, './file.crt'), 'utf8');
var credentials = {key: privateKey, cert: certificate};
 
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
 
//可以分别设置http、https的访问端口号
var PORT = 8000;
var SSLPORT = 8001;
 
//创建http服务器
httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
 
//创建https服务器
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
 
//可以根据请求判断是http还是https
// app.get('/', function (req, res) {
//     if(req.protocol === 'https') {
//         res.status(200).send('This is https visit!');
//     }
//     else {
//         res.status(200).send('This is http visit!');
//     }
// });

