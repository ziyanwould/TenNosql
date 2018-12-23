/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

router.get('/',function(req,res){
    res.render('user/user');

})

router.get('/pay',function(req,res){
    res.render('user/pay');

})

router.get('/yue',function(req,res){
    res.render('user/yue');

})


module.exports = router;   /*暴露这个 router模块*/