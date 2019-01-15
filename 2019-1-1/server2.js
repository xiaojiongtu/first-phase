const express=require('express');
const consolidate=require('consolidate');

let server=express();
server.listen(8080);

//1.选择一种模板引擎
server.engine('html',consolidate.ejs);

//2.指定模板文件的扩展名
server.set('view engine','ejs');

//3.指定模板文件的路径
server.set('views','./template');

server.get('/',(req,res)=>{
      res.render('1',{arr:[2,3,4,5]})
});

