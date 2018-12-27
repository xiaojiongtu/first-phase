const http=require('http');
const url=require('url');
const querystring=require('querystring');
const common=require('./libs/common');
const fs=require('fs');
const uuid=require('uuid/v4');
const path=require('path');


let server=http.createServer((req,res)=>{
	//接受get
	let {query,pathname}=url.parse(req.url,true);

	//post 请求,此data是二进制数据
	let aBuffer=[];
	req.on('data',data=>{
		aBuffer.push(data);
	});
	req.on('end',()=>{
		let data=Buffer.concat(aBuffer);
		//formdata
		console.log(req.headers['content-type']);
		if(req.headers['content-type'].indexOf('multipart/form-data')==0){

			let post={};
			let files={};
			//提取分隔符
          const boundary='--'+req.headers['content-type'].split(';')[1].split('=')[1];
          //第一步，用分隔符切割data
          let arr=data.split(boundary);

          //第二步、扔掉头尾(<>、<--\r\n>)
			arr.shift();//删掉头部
	        arr.pop();//删掉尾部

			//第三步、每一项的头尾扔掉(\r\n....\r\n)
			arr=arr.map(item=>item.slice(2,item.length-2));
			console.log(arr.map(item=>'"'+item.toString()+'"'));
			//第四步、找第一个"\r\n\r\n"，一切两半——前一半:信息，后一半:数据
            arr.forEach(item=>{
                let n=item.indexOf('\r\n\r\n');
                let info=item.slice(0,n);
                let data=item.slice(n+4);
                info=info.toString();

                let total=0;
                let complete=0;
                if(info.indexOf('\r\n')==-1){  //只有一行普通的数据
                	let key=common.parseInfo(info).name;
                	let val=data.toString();  //因为是普通数据，所以可以直接toString;
					post[key]=val;
				}else{  //两行------》文件型数据
                	total++;
                   let json=common.parseInfo(info);
                   let key=json.name;
                   let name=json.filename;
                   let type=json['Content-Type'];
                   let value=data;
                   let filepath=`upload/${uuid().replace(/\-/g,'')}${path.extname(name)}`;
                   files[key]={name,type,filepath};
                   fs.writeFile(filepath,data,err=>{
                   	if(err){
						console.log('文件写入失败')
					}else {
						console.log("写入完成");
						complete++;
					}
				   });
				}
			})
		}else{   //urlencoded
			let post=querystring.parse(data.toString());
		}
	})
}).listen(8080);
