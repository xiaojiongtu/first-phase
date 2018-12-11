class Button extends Sprite{
	 constructor(drawNormal,drawActive, width, height,x=0,y=0,rotation=0){
		super(drawNormal, width, height,x,y,rotation);
		 this.drawNormal=drawNormal;
		 this.drawActive=drawActive;
		 this.downAtme=false;
	}
	down(x,y){
	 	if(this.inRect(x,y)){
           this.setDrawRect(this.drawActive);
           this.downAtme=true;
		}else {
	 		this.downAtme=false;
		}
	}
	up(x,y){
	 	this.setDrawRect(this.drawNormal);
	 	if(this.inRect(x,y)&&this.downAtme){
           //触发onclick
			this.onclick&&this.onclick();
		}
	}

}
