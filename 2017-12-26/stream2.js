const fs=require('fs');

let rs=fs.createReadStream('www/1.txt');
let ws=fs.createWriteStream('www/3.txt');

rs.pipe(ws);

rs.on('error',err=>{
	console.log('读取失败')
});
rs.on('data',data=>{
	console.log(data);
})
rs.on('end',()=>{
	console.log('结束')
})
ws.on('error',err=>{
	console.log('写入失败')
})

ws.on('finish',()=>{
	console.log('写入完成')
})
