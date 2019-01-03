const querystring=require('querystring');
exports.urlencoded=function(req,res,next){
	//处理post数据
	let str='';
	req.on('data',data=>{
		str+=data;
	});
	req.on('end',()=>{
		let data=querystring.parse(str);
		req.body=data;
		next();
	})
}
