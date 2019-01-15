const express=require('express');
let admin_router=express.Router();
admin_router.get('/',(req,res)=>{
	res.send('admin');
	res.end();
});
module.exports=admin_router;
