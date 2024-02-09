var context;
const audio = new Audio();
audio.src = "bgm/Store.mp3";

$(document).ready(function(){
	//창 크기 정 가운데 고정
	window.focus();
	// window.moveTo(300,300);
	window.resizeTo(1000,800);

	//change_position(p);
	//bgm 설정
	var bgmlocal = localStorage.getItem("bgmlocal");
	var curcur = localStorage.getItem("curcur");
	if(bgmlocal=="0"){
        audio.pause();
        $("#bgm").muted = true;
    }else{
         audio.play();
         $("#bgm").autoplay = true;
         $("#bgm").loop = true;
    }
    //cursor 설정
    if(curcur=="1"){
        const newCursor = document.getElementById("cur");
        let posX = 0;
        let posY = 0;
        
        $("body").css({"cursor" : "none"});
        $(".cursor").css({"display" : "block" , "pointer-events" : "none"});
        document.body.onmousemove = function(e){


            posX =e.clientX + "px";
            posY =e.clientY + "px";


            newCursor.style.left = posX;
            newCursor.style.top = posY;
        }
    }

	init();
});
function init(){
	context = document.getElementById("intro").getContext("2d");
	draw();
}
function draw(){
	context.clearRect(0,0,10000,800);
	context.fillStyle = "black";
	context.fillRect(0,0,10000,800);

	showtitle();
}
function showtitle(){

	$("#explanation").fadeOut(500);
	$("#explanation").fadeIn(500);

	$("#selectLevel").fadeOut(500);
	$("#selectLevel").fadeIn(500);

	$("#text1").fadeIn(1000);
	$("#text1").fadeOut(500);
	$("#text1").fadeIn(800);
	$("#text1").fadeOut(300);
	$("#text1").fadeIn(300);

}
function change_position(obj) {
    var l = ($(window).width() - obj.width()) / 2;
    var t = ($(window).height() - obj.height()) / 2;
    obj.css({ top: t, left: l });
}