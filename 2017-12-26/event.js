const Event=require('events').EventEmitter;

let event=new Event();

//监听
event.on('text',(a,b)=>{
	console.log('接收到了一个事件',a,b);
});
event.on('text',(a,b)=>{
	console.log('接收到了一个事件',a,b);
});
//触发
let res=event.emit('text',2,3);
console.log(res); //true 代表有人接收了

