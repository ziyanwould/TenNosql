const express = require('express');
var proxyMiddleWare= require('http-proxy-middleware');
var app = express();
var proxyPath = "http://ons.me";//目标后端服务地址
var proxyOption ={
    target:proxyPath,
    changeOrigoin:true,
    ws: true,
    pathRewrite: { '^/api': '/' }
};
app.use(express.static(__dirname + "public"));
app.use("/api",proxyMiddleWare(proxyOption));
app.listen(8003);//4000是我要启动的端口
