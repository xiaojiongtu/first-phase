class MyScroll{
	constructor(selector,options={}){
		  //处理默认参数
		this.eventQueue=[];//事件队列
		function defaultValues(options,defaults) {
                  for(let name in defaults){
                  	if(typeof options[name]=='undefined'){
                  		options[name]=defaults[name];
					}
				  }
		      }
		defaultValues(options,{
			bounce:true,
			bounceTime:600,
			scrollY:true,
			scrollX:true,
			freeScroll:false,
			directionLockThreshold:5
		});

		//选出父级

		let aParent=Array.from(document.querySelectorAll(selector)).forEach(parent=>{
			//加事件
			let child=parent.children[0];
			if (!child) return;
             child.addEventListener('touchstart',start,false);
             child.addEventListener('touchmove',move,false);
             child.addEventListener('touchend',end,false);

             let startX=0,startY=0;//起始位置 手指的
             let disX=0,disY=0;//起始距离 ,就是手指离这个物体边缘的距离
             let dire='';//方向
			 let _this=this;
			 let firstMove;
			 let translateX=options.scrollX;
             let translateY=options.scrollY;//所有的滚动都是通过translate来完成
			 child.style.transform=`translateX(${translateX}px) translateY(${translateY}px)`;
			function start(e) {
				startX=e.targetTouches[0].clientX;
               startY=e.targetTouches[0].clientY;
               disX=startX-translateX;
               disY=startY-translateY;
               dire='';//每次start的时候方向要重置
				//有木有用户监听
				_this.eventQueue.forEach(json=>{
					if(json.type=='beforeScrollStart'){
                        json.fn();//如果有人监听就触发fn
					}
				});
				firstMove=true;
			}

			function move(e) {
				if(firstMove){
					firstMove=false;
					_this.eventQueue.forEach(json=>{
						if(json.type=='scrollStart'){
							json.fn();//如果有人监听就触发fn
						}
					});
				}
				if(!dire){
               	   if(Math.abs(e.targetTouches[0].clientX-startX)>=options.directionLockThreshold){
               	   	   dire='x';
				   }
				   if(Math.abs(e.targetTouches[0].clientY-startY)>=options.directionLockThreshold){
               	   	 dire='y';
				   }
					console.log(dire);
				}else {
               	//方向已经确定了,具体拖拽
				   if(options.freeScroll||dire=='x'){
					   translateX=e.targetTouches[0].clientX-disX;
				   }
				  if(options.freeScroll||dire=='y'){
					  translateY=e.targetTouches[0].clientY-disY;
					  console.log(translateY);
				  }
					child.style.transform=`translateX(${translateX}px) translateY(${translateY}px)`;
				}
			 }
			function end(e) {
               if(translateX>0){
               	translateX=0;
			   }
			   if(translateX<parent.offsetWidth-child.offsetWidth){
               	   translateX=parent.offsetWidth-child.offsetWidth
			   }
				if(translateY>0){
					translateY=0;
				}
				if(translateY<parent.offsetHeight-child.offsetHeight){
					translateY=parent.offsetHeight-child.offsetHeight
				}
				//有没有用户需要监听
				_this.x=translateX;
				_this.y=translateY;
				//有木有用户监听
				_this.eventQueue.forEach(json=>{
					if(json.type=='scroll'){
						json.fn();//如果有人监听就触发fn
					}
				});
				child.style.transition=`${options.bounceTime}ms all ease`;
				child.style.transform=`translateX(${translateX}px) translateY(${translateY}px)`;
				child.addEventListener('transitionend',tend,false);

               function tend() {
				   child.style.transition='';
				   child.removeEventListener('transitionend',tend,false);
				   //有木有用户监听
				   _this.eventQueue.forEach(json=>{
					   if(json.type=='scrollEnd'){
						   json.fn();//如果有人监听就触发fn
					   }
				   });
			   }
			}
		})

	}
	on(name,fn){
		this.eventQueue.push({type: name, fn});
	}
	beforeScrollStart(fn){
		this.eventQueue.push({type: 'beforeScrollStart', fn});
	}

}
