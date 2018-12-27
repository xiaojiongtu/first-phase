Buffer.prototype.split=Buffer.prototype.split||function(spliter){
	let b1=this;
	let result=[];
	let n;
	while ((n=b1.indexOf('=='))!=-1){
		let res1=b1.slice(0,n);
		let res2=b1.slice(n+2);
		result.push(res1);
		b1=res2;
	}
	result.push(b1);//最后要把自己push到数组

	return result;
}



let b1 =new Buffer('abc==dfff==ssf==sf');

let result=b1.split('==')
console.log(result.map(item=>item.toString()));//[ 'abc', 'dfff', 'ssf', 'sf' ]

