class Fish extends Sprite{
	//宽高不用给，给类型内部判断是哪种类型的鱼
	constructor(type,x=0,y=0,rotation=0){
		if(type>5||type<1){
			throw new Error("unknow type")
		}
		const SIZE=[
			null,
			{w:55,h:37},
			{w:78,h:64},
			{w:72,h:56},
			{w:77,h:59},
			{w:107,h:122},

		];
		//父类相关
		super(_imgs[`fish${type}`],SIZE[type].w,SIZE[type].h,x,y,rotation);
		//子类相关
		this.type=type;
		//当前哪一帧
		this.currentFrame=0;
		this.MAX_FRAME=4;
	}
	nextFrame(){
		this.currentFrame++;
		if(this.currentFrame>=this.MAX_FRAME){
			this.currentFrame=0;
		}
		this.sy=this.height*this.currentFrame;
	}
}
