 const express=require('express');
 const bodyParser=require('body-parser');
 const cookieParser=require('cookie-parser');
 const cookieSess=require('cookie-session');
 const consolidate=require('consolidate');
 const ejs=require('ejs');
 const mysql=require('mysql');
 const multer=require('multer');
 const config=require('./config');

 //创建服务器
 let server=express();
 server.listen(config.port);

 //连接数据库
  let db=mysql.createPool({host:config.mysql_host,user:config.mysql_user,password:config.mysql_password,port:config.mysql_port,database:config.mysql_dbname})

 //中间件
 //普通post数据
 server.use(bodyParser.urlencoded({extended:false}));

  //文件post
  let multerObj=multer({dest:'./upload'});
  server.use(multerObj.any());

 //cookie
server.use(cookieParser(require('./secret/cookie_key')));

 //session
server.use(cookieSess({
	keys:require('./secret/session_key')
})) ;

 //模板
 //1.选择一种模板引擎
 server.engine('html', consolidate.ejs);
 //2.指定模板文件的扩展名
 server.set('view engine', 'ejs');
 //3.指定模板文件的路径
 server.set('views', './template');

 //处理请求

 server.use('/admin/',require('./routers/admin'));
 server.use('/',require('./routers/www'));

 //静态文件
 server.use(express.static('./www/'));




