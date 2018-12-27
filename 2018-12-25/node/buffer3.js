let a=new Buffer('abc');
let b=new Buffer('def');
let c=Buffer.concat([a,b]);
console.log(c);//<Buffer 61 62 63 64 65 66> ,十六进制的61就是97 就是ASC码的a
console.log( typeof (a+b))//string 类型
