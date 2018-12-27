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
            console.log("登录次数",data[0].number)
            req.session.userinfo=data[0];
            if(data[0].number==0 || data[0].number==undefined){
                res.redirect('/login'); 
            }else{
                DB.upDate('user',{"_id":new DB.ObjectID(req.session.userinfo._id)},{
                   
                    number:(parseInt(data[0].number)+1)
                },(err,data)=>{
                    if(!err){
                        console.log("用户信息更新")
                    }
                })
                res.redirect('/user');  /*登录成功跳转到用户中心*/
            }
           
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

router.post('/chaPhone',(req,res)=>{
    let phone  =req.body.phone;
    console.log("phone",phone)
    DB.find('user',{phone:phone},(err,data)=>{
       // console.log("phone信息",data)
       if(data.length>0){
           res.send("已存在")
       }else{
           DB.upDate('user',{"_id":new DB.ObjectID(req.session.userinfo._id)},{phone:phone},(err,data)=>{
            if(!err){
               console.log("添加成功")
            }  
           })
           res.send("未添加")
       }
    })
})


router.post('/adduser',(req,res)=>{
    let mess = req.body;
    console.log("mess",mess)
    DB.find('che',{che:mess.che},(err,data)=>{
        if(data.length>0){
            res.send('车牌已存在')
        }else{
            req.app.locals['userinfo.name']=mess.name
            DB.upDate('user',{"_id":new DB.ObjectID(req.session.userinfo._id)},{
                name:mess.name,
                sex:mess.sex,
                number:1
            },(err,data)=>{
                if(!err){
                    console.log("用户信息更新")
                }
            })

            DB.add('che',{
                che:mess.che,
                username:req.session.userinfo.username
            },(err,data)=>{
                if(!err){
                    console.log("增加车牌成功")
                }
            })

            res.send("更新完毕")
        }
    })
})

module.exports = router;   /*暴露这个 router模块*/