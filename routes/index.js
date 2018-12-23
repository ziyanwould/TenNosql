/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

router.get('/address',function(req,res){
    res.render('address');

})

router.get('/list',function(req,res){
    res.render('list');

})

module.exports = router;   /*暴露这个 router模块*/