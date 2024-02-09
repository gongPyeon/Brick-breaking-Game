var check1=0;
var check2=0;
var check3=0;
var check4=0;
var check1Yes=0;
var check2Yes=0;
var check3Yes=0;
var check4Yes=0;
var context;
const audio = new Audio();
audio.src = "bgm/Store.mp3";

$(document).ready(function(){

	//창 크기 정 가운데 고정
	window.focus();
	// window.moveTo(300,300);
	window.resizeTo(1000,800);

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

	//HOVER 이벤트
	$("#level1").mouseover(
		function(){
			//적용
			$("#level1 img").animate({marginLeft : "-=20px"});
			$("#stage1").css({"opacity" : "1"});

	});
	$("#level1").mouseout(
		function(){
			//해제
			$("#level1 img").animate({marginLeft : "+=20px"});
			$("#stage1").css({"opacity" : "0.5"});
		})
	
	
	
	$("#level2").mouseover(
		function(){
			//적용
			$("#level2 img").animate({marginLeft : "-=20px"});
			$("#stage2").css({"opacity" : "1"});

	});
	$("#level2").mouseout(
		function(){
			//해제
			$("#level2 img").animate({marginLeft : "+=20px"});
			$("#stage2").css({"opacity" : "0.5"});
		})

	$("#level3").mouseover(
		function(){
			//적용
			$("#level3 img").animate({marginLeft : "-=20px"});
			$("#stage3").css({"opacity" : "1"});

	});
	$("#level3").mouseout(
		function(){
			//해제
			$("#level3 img").animate({marginLeft : "+=20px"});
			$("#stage3").css({"opacity" : "0.5"});
		})

	//CLICK 이벤트
	$("#level1").click(
		function(){
			change_position($(".popup"));
			$("#s1").css({"display" : "block"});
		});
	$("#level2").click(
		function(){
			change_position($(".popup"));
			$("#s2").css({"display" : "block"});
		});
	$("#level3").click(
		function(){
			change_position($(".popup"));
			$("#s3").css({"display" : "block"});
		});


});
function displayevent(){
		$("#s1").css({"display" : "none"});
		$("#s2").css({"display" : "none"});
		$("#s3").css({"display" : "none"});
	}

function change_position(obj) {
    var l = ($(window).width() - obj.width()) / 2;
    var t = ($(window).height() - obj.height()) / 2;
    obj.css({ top: t, left: l });
}