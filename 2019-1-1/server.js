const express=require('express');

let server=express();
server.listen(8080);

let  router_user=express.Router();
 server.use('/user',router_user);

let  router_article=express.Router();
 server.use('/article',router_article);
