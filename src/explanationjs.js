var context;
var i = 1;
var crystal1 = new Image();
crystal1.src = "img/Crystal1.png";
var crystal2 = new Image();
crystal2.src = "img/Crystal2.png";
var crystal3 = new Image();
crystal3.src = "img/Crystal3.png";
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
	
	$("#close").click(function(){
		$("#init").css({"display" : "none"});
		$("#close").css({"display" : "none"});
		$("#initexplainbutton_ok").css({"display" : "none"});
		$("#initexplainbutton_ok2").css({"display" : "none"});
		$("#initexplainbutton_space").css({"display" : "none"});
		$(".c").css({"display" : "none"});
	})
	$("#second").click(function(){
		//$("#initexplainbutton_ok").css({"display" : "block"});
		$("#close").css({"display" : "block"});
		$("#init").css({"display" : "block"});
		$("#one").css({"display" : "block"});
		$("#two").css({"display" : "none"});
		$("#three").css({"display" : "none"});

		$("#one").text(" <서브게임>");
		$("#one").append("<br><br><p> ♧ 자유롭게 튕기는 만쥬의 손으로 보물상자를 열어, '사다리'와 '보석'을 수집하는 게임입니다. ♧</p><br>");
		$("#one").append("<br><p> 시간이 지날수록 위에서부터 보물상자가 쌓입니다.  </p><br>");
		$("#one").append("<br><p> 제한시간이 지나거나 보물상자/손이 바닥에 닿으면 메인게임으로 넘어갑니다.  </p><br>");
		$("#one").append("<br><p>보물상자를 열어 나온 아이템은 만쥬가 가져온 주머니에 넣어야 획득할 수 있습니다. </p><br><p> 만쥬의 손은 주머니와 닿는순간의 이동방향으로 다시 튕길 수 있습니다. 마우스를 움직여서 조절해보세요.</p>");
		$("#one").append("<br><p> ※ 난이도에 따라 모을 수 있는 보석의 색깔이 달라지며, 주머니의 크기와 보물상자가 쌓이는 속도와 공의 속도가 달라집니다 ※  </p><br>");
	})

	$("#first").click(function(){
		$("#initexplainbutton_space").css({"display" : "block"});
		$("#initexplainbutton_space").css({"left" : "460px",  "top" : "437px"});
		$("#initexplainbutton_ok2").css({"display" : "block"});
		$("#initexplainbutton_ok2").css({"left" : "530px", "top" : "535px"});
		$("#close").css({"display" : "block"});
		$("#init").css({"display" : "block"});
		$("#one").css({"display" : "block"});
		$("#two").css({"display" : "none"});
		$("#three").css({"display" : "none"});

		$("#one").text("<메인게임> ");
		$("#one").append("<br><br><p> ♧ 자유롭게 튕기는 만쥬의 손으로 보물상자를 열어, '사다리'와 '보석'을 수집하는 게임입니다. ♧<p><br>");
		$("#one").append("<br><p> 메인 게임 1회당 사용하는 사다리의 개수는 9개이며, 서브 게임에서 획득한 사다리의 개수에서 차감됩니다. </p>");
		$("#one").append("<br><p> 메인 게임 1회당 가져갈 수 있는 보석의 수는 최대 3개이고, 보석이 3개 미만일 때 가진 보석을 가져갈 수 있습니다. </p> ")
		$("#one").append("<br><pre>날라오는 사다리는                </pre><p> 를 눌러서 멈추게 할 수 있습니다. 그렇게 9개의 사다리를 모두 배경화면 속 노란선 위에 쌓고 확인 버튼을 클릭하면 보석을 가지고 탈출할 수 있습니다.</p>");
		$("#one").append("<br><pre>스테이지마다 사다리의 속도는 다르며, 반드시 사다</pre><pre>리 9개를 노란선 위에 쌓고               버튼을 클릭해</pre><pre>야만 기타 동작을 시행할 수 있습니다.</pre>");
		$("#one").append("<p>서브게임에서 획득한 보석을 모두 가지고 탈출하면 다음 난이도로 자동 연결됩니다.</p> ")
	 
	})

	$("#third").click(function(){
		$(".c").css({"display" : "block"});
		$("#close").css({"display" : "block"});
		$("#init").css({"display" : "block"});
		$("#one").css({"display" : "block"});
		$("#two").css({"display" : "none"});
		$("#three").css({"display" : "none"});

		$("#one").text(" <상점> ");
		$("#one").append("<br><br><p> ♧ 메인 게임에서 가지고 탈출한 보석을 통해 만쥬를 꾸밀 수 있는 아이템을 구매할 수 있습니다. ♧ </p>");
		$("#one").append("<br><p> 아이템에 따라 필요한 보석의 종류와 수가 다릅니다.</p><br><br><br><br><p> 스테이지에 따라 필요한 종류의 보석을 모을 수 있습니다.<br>구매를 하면 해당 보석의 개수가 차감됩니다.<br>또한, 상점에선 지금까지 모은 보석의 종류별 개수와 총 점수를 볼 수 있습니다. 총 점수는 누적된 보석 개수와 같습니다. <br><br>만쥬를 꾸며보세요!</p>");
		
	})

});

function post(){
	i = i +1;
	if (i >= 11)
		i -= 10;
	var str = "img/scene" + i + ".png";
	$("#story img").attr("src",str);

	var str2 = "img/scene" + i + "_" + i + ".png";
	$("#texts img").attr("src",str2);

	
}
function pre(){
	i = i -1;
	if (i <= 1)
		i = 10;
	var str = "img/scene" + i + ".png";
	$("#story img").attr("src",str);

	var str2 = "img/scene" + i + "_" + i + ".png";
	$("#texts img").attr("src",str2);
}
