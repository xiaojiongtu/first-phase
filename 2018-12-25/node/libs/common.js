Buffer.prototype.split=Buffer.prototype.split||function(spliter){
	let b1=this;
	let result=[];
	let n;
	while ((n=b1.indexOf(spliter))!=-1){
		let res1=b1.slice(0,n);
		let res2=b1.slice(n+spliter.length);
		result.push(res1);
		b1=res2;
	}
	result.push(b1);//最后要把自己push到数组

	return result;
};

exports.parseInfo=function (str) {
	let arr=str.split('; ');//[ 'Content-Disposition: form-data', 'name="user" ' ]
	let json={};
	let arr2=[];

	arr.forEach(item=>{
		let a=item.split('\r\n');
		arr2=arr2.concat(a);
	});
	arr2.forEach(item=>{
		let [key,value]=item.split('=');
		console.log(key ,value);
		if(!value){
			json[key]=value;
		}else{
			json[key]=value.substring(1,value.length-1);
		}
	});
	return json;
};

