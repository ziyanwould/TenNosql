

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

//使用ejs模板引擎 默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态目录
app.use(express.static('public'));


app.use('/che',che);
app.use('/login',login);
app.use('/user',user);
app.use('/',index);
app.get('*',(req,res)=>{
    res.render('404');
})
app.listen(2019)