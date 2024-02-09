const audio = new Audio();
audio.src = "bgm/Game.mp3";
$(document).ready(function(){
	//창 크기 정 가운데 고정
	window.focus();

	window.resizeTo(1000,800);


	$("#white").mouseover(function(){
		$("#UsermouseChange").fadeIn(2000);
	});

	//마우스 커서 js 코드//
	const newCursor = document.getElementById("cur");
	let posX = 0;
	let posY = 0;

	$("#cur2").click(function(){ //cur2 (노란색 마우스 이미지 클릭시 발생)
		localStorage.setItem("curcur",1); //1 : 노란색 마우스 
		$("body").css({"cursor" : "none"});
		$(".cursor").css({"display" : "block" , "pointer-events" : "none"});
		document.body.onmousemove = function(e){


			posX =e.clientX + "px";
			posY =e.clientY + "px";


			newCursor.style.left = posX;
			newCursor.style.top = posY;
		}
	});

	$("#cur1").click(function(){ //cur1 (흰색 마우스 이미지 클릭시 발생
		localStorage.setItem("curcur", 0); //0 : 흰색 마우스
		$("body").css({"cursor" : "default"});
		$(".cursor").css({"display" : "none"});
	
	});

	//bgm js//
	$("#sound1").click(function(){
		audio.play();
		$("#bgm").loop = true;//반복재생 가능
		localStorage.setItem("bgmlocal",1); //1 : play되고 있는 중
	});
	$("#sound2").click(function(){
		audio.pause();
		$("#bgm").muted = true;
		localStorage.setItem("bgmlocal",0);//0 : play 안되고 있는 중
	})

});
