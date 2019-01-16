const crypto=require('crypto');
const uuid=require('uuid/v4');

module.exports={
	md5(str){
		//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
      let md5=crypto.createHash('md5');
      md5.update(str);
      return md5.digest('hex');
	},
	uuid(){
       return uuid().replace(/\-/g,'');
	}
};
