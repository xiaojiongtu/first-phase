const fs=require('fs');

fs.stat('./server.js',(err,stat)=>{
	if(err){
		console.log('读文件出错')
	}else {
		console.log(stat)
	}
})
