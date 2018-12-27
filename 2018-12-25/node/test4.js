let str='Content-Disposition: form-data; name="user" ';
let arr=str.split('; ');//[ 'Content-Disposition: form-data', 'name="user" ' ]
let json={};
arr.forEach(item=>{
	let [key,value]=item.split('=')
	console.log(key ,value)
	json[key]=value
})
console.log(json);
