const express=require('express');

let router=express.Router();

router.get('/',(req,res)=>{
	res.send('www');
	res.end();
});
module.exports=router;
