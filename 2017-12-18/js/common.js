let _imgs=null;
const _resources={
	fish1: 'img/fish1.png',
	fish2: 'img/fish2.png',
	fish3: 'img/fish3.png',
	fish4: 'img/fish4.png',
	fish5: 'img/fish5.png',
	coin1: 'img/coinAni1.png',
	cannon1: 'img/cannon1.png',
	cannon2: 'img/cannon2.png',
	cannon3: 'img/cannon3.png',
	cannon4: 'img/cannon4.png',
	cannon5: 'img/cannon5.png',
	cannon6: 'img/cannon6.png',
	cannon7: 'img/cannon7.png',
	tower:'img/bottom.png'
}
function loadImages(json,fn) {
	let res={};
	let total=0;
	let complete=0;
	for(let name in json){
		total++;
		let oImg=new Image();
		res[name]=oImg;
		oImg.onload=function () {
			complete++;
			if (total==complete){
				_imgs=res;
				fn();
			}
		}
		oImg.onerror =function () {
			alert("图片加载失败"+oImg.src);
		}
		oImg.src=json[name];
	}
}
function d2a(n) {
	return n*Math.PI/180
}
function a2d(n) {
	return n*180/Math.PI
}
