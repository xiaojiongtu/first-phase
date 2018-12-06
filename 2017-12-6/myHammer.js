class  myHammer{
	constructor(obj,options){
		this.eventQueue=[];
		this.start_time=0;
		this.timer=null;
		 //前面的this是obj,后面的this指的是hammer对象
		obj.addEventListener('touchstart',this._start.bind(this),false );
		obj.addEventListener('touchmove',this._move.bind(this),false );
		obj.addEventListener('touchend',this._end.bind(this),false );
	}
  on(name,fn){
		this.eventQueue.push({name,fn});
	    return this;
  }
	_start(){
		//记录一个时间
		this.start_time=Date.now();
		//press
		clearTimeout(this.timer);
		this.timer=setTimeout(function () {
            this._trigger_event('press');
		}.bind(this),false)
	}
	_move(){}
	_end(){
		if(Date.now()-this.start_time<=250){
			 clearTimeout(this.imer);
			 this._trigger_event('tap')
		}
	}
	_trigger_event(name){
		this.eventQueue.forEach(item=>{
			if(item.name==name){
				item.fn();
			}
		})
	}
}
