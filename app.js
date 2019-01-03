

const express = require('express');
const app = express();

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

//使用ejs模板引擎 默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态目录
app.use(express.static('public'));

/*权限判断*/
app.use(function(req,res,next){
    console.log(req.url);
    //next();
    if(req.url=='/login/delu' || req.url=='/login/doLogin' || req.url=='/'){
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
app.use('/',index);
app.get('*',(req,res)=>{
    res.render('404');
})
app.listen(80,'114.116.109.133')
