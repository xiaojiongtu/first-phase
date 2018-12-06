const express=require('express');
const multer=require('multer');

let multerObj=multer({dest: './www/upload/'});
let server=express();
server.use(express.static("www"));

server.listen(8090);

server.use(multerObj.any());
server.post('/upload', function (req, res){
	console.log(req.files);
	res.send('ok');
});
