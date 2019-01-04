const express=require('express');
const multer=require('multer');
const fs=require('fs');
const path1=require('path');
const bodyParser=require('body-parser');

let server=express();
server.listen(8080);

let multerObj=multer({dest:'./upload/'});
server.use(bodyParser.urlencoded({extended:false}));
server.use(multerObj.any());
server.post('/upload',(req,res,next)=>{
	/*[ { fieldname: 'f1',
		originalname: 'Chrysanthemum.jpg',
		encoding: '7bit',
		mimetype: 'image/jpeg',
		destination: './upload/',
		filename: 'dd859601f96cf25ca4f9532ae2d92ae0',
		path: 'upload\\dd859601f96cf25ca4f9532ae2d92ae0',
		size: 879394 } ]*/

	 let i=0;
	 _next();
	function _next() {
		let newName=req.files[i].path+path1.extname(req.files[i].originalname);
		fs.rename(req.files[i].path,newName,err=>{
			if(err){
				res.sendStatus(500,'rename error');
				res.end();
			}else{
				i++;
				if(req.files.length<=i){
					res.send('ok');
					res.end();
				}else {
					_next();
				}
			}
		})
	}
});
