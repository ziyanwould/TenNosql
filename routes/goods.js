/*二级路由*/
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Goods=require('../modules/goods');
//链接数据库
mongoose.connect('mongodb://114.215.86.207:27017/dumall');
//监听数据库是否链接成功
mongoose.connection.on("connected",function(){
	   console.log('mongoose connect success');
})
mongoose.connection.on("error",function(){
	   console.log('mongoose connect success');
})
mongoose.connection.on("disconnected",function(){
	   console.log('mongoose connect success');
})
router.get("/",function(req,res,next){
	Goods.find({},function(err,doc){
		if(err){
			res.json({
				status:'1',
				meg:err.message
			})
		}else{
			res.json({
				status:'0',
				msg:'',
				result:{
					count:doc.length,
					list:doc
				}
			})
		}
	})
})
module.exports=router
