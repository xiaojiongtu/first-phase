const express=require('express');
const consolidate=require('consolidate');


let server=express();
server.listen(8080);

//×
//server.use(consolidate);

//1.选择一种模板引擎
server.engine('html', consolidate.ejs);
//2.指定模板文件的扩展名
server.set('view engine', 'ejs');
//3.指定模板文件的路径
server.set('views', './template');

server.get('/', (req, res)=> {
	res.render('3', {arr: [
			{username:'blue',age:16,gender:'男'},
			{username:'blue1',age:13,gender:'男'},
			{username:'blue2',age:14,gender:'女'},
			{username:'blue3',age:12,gender:'男'},
		]})
})


