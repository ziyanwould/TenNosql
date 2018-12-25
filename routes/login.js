/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var bodyParser = require('body-parser');
var md5=require('md5-node'); /*md5加密*/
var DB=require('../modules/db.js');  /*引入DB数据库*/

router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.get('/',function(req,res){
    res.render('login/login');

})

/**start */
//处理登录的业务逻辑
router.post('/doLogin',function(req,res){


    var username=req.body.username;
    var password=md5(req.body.password);  /*要对用户输入的密码加密*/

    //1.获取数据
    //2.连接数据库查询数据
    DB.find('user',{
        username:username,
        password:password
    },function(err,data){
        if(data.length>0){
            console.log('登录成功');
            //保存用户信息
            req.session.userinfo=data[0];
            res.redirect('/user');  /*登录成功跳转到商品列表*/
        }else{
            //console.log('登录失败');
            res.send("<script>alert('登录失败');location.href='/admin/login'</script>");
        }
    })



})


router.get('/loginOut',function(req,res){


    //销毁session

    req.session.destroy(function(err){

        if(err){
            console.log(err);
        }else{
            res.redirect('/login/delu');
        }
    })
})


/**end */
router.get('/card',function(req,res){
    res.render('login/card');

})

router.get('/loginSuccess',function(req,res){
    res.render('login/loginSuccess');

})

router.get('/delu',function(req,res){
    res.render('login/delu');

})

module.exports = router;   /*暴露这个 router模块*/