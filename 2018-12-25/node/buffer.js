const fs=require('fs');
fs.readFile('a.jpg',(err,data)=>{
	if(err){
		console.log('出错了');
	}else{
		var str=data.toString();

		fs.writeFile('b.jpg',str,err=>{
			if(err){
				console.log('写错了')
			}else {
				console.log('写完了')
			}
		})
	}
})
