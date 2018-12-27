/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var DB=require('../modules/db.js');  /*引入DB数据库*/

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.get('/',function(req,res){
     //console.log('req.session',req.session)
     let saixun = 
    DB.find('che',{"username":req.session.userinfo.username},(err,data)=>{

        console.log(data);
        res.render('che/cheList',{
            list:data
        });
    })
  

})

router.get('/addChe',function(req,res){

    res.render('che/addche');

})

router.post('/aDche',(req,res)=>{
    
    let chepai=req.body.chepai;
    console.log("chepai",chepai)

    DB.find('che',{
      che:chepai
    },function(err,data){
        if(data.length>0){
            res.send('该车牌已经被添加');
           
        }else{
            DB.add('che',{
                che:chepai,
                username:req.session.userinfo.username
            },(err,data)=>{
               if(!err){
                 res.send('添加成功')
               }
            })
        }
    })


 
})

router.get('/cheDelte',(req,res)=>{
  
    let mess = req.query.id;
    DB.deleteThis('che',{"_id":new DB.ObjectID(mess)},err=>{
        if(err){
            res.send('删除失败');
        }else{
            res.send('删除成功');
        }

    })
    //console.log("删除的信息",mess)
  
})

module.exports = router;   /*暴露这个 router模块*/