const  express=require('express');
const bodyParser=require('./libs/mybodyparser');


let server=express();
server.listen(8080);

server.use(bodyParser.urlencoded);

server.post('/',(req,res)=>{
	console.log(req.body);
})
