var express = require('express');
var router = express.Router();
var request = require('request');
router.get('/list', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   // console.log(req.body)
   console.log(req.query)

     request({
         url:'http://ons.me/tools/dropload/json.php?page='+req.query.page+'&size='+req.query.size,
         method:'GET',
         headers:{
            'Content-Type': 'application/json',
         },
        //  body: JSON.stringify({//body中放请求参数
        //     "reqType":0,
        //     "perception": {
        //         "inputText": {
        //             "text": req.body.info
        //         },
        //     },
        //     "userInfo": {
        //         "apiKey": "",
        //         "userId": req.body.userid
        //     }
        // })
     },function (error, response, body) {
                    if (!error&&response.statusCode == 200) {
                        console.error('101' + body);
                        res.send(body);
                    }
                })
       
});
module.exports=router