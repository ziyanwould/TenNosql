/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var bodyParser = require('body-parser');

var DB=require('../modules/db.js');  /*引入DB数据库*/

router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.get('/',function(req,res){
    
    res.render('user/user');

})

router.get('/pay',function(req,res){
    res.render('user/pay');

})

router.post('/price',function(req,res){

    var price=req.body.price;
    console.log('price',price)
    var money =parseFloat(req.session.userinfo.money)+parseFloat(price);
    let id = req.session.userinfo._id
    console.log('money',money,id)

    DB.upDate('user',{"_id":new DB.ObjectID(id)},{money},(err,data)=>{
        if(err){
            console.log("失败！！！")
        }else{
            res.send('成功')
        }
        //console.log(data)
    })
    //res.render('user/pay');

})

router.get('/yue',function(req,res){
    DB.find('user',{"username":req.session.userinfo.username},(err,data)=>{

        //console.log(data);
        res.render('user/yue',{
            money:data[0].money
        });
    
    

})
})


module.exports = router;   /*暴露这个 router模块*/