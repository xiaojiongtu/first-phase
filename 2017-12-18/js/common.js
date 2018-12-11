let _imgs=null;
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
