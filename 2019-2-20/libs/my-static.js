const fs=require('fs');
const assert=require('assert');
module.exports=function (root) {
	//断言
	assert(root,'root is required');
	assert(typeof root==='string','root must be a string');
	return async (ctx)=>{
		ctx.response.body=await new Promise(function (resolve,reject) {
			fs.readFile(`${root}${ctx.request.path}`,(err,data)=>{
				if(err){
					console.log(err);
					reject(err)
				}else {
					resolve(data.toString());
					// console.log(data.toString())
				}
			})
		})
	}
}
