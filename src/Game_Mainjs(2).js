const audio = new Audio();
audio.src = "bgm/Game.mp3";

var finishLadder = false;
var finishCheck = false;
var crystal;
var ladder;
var total;

var C2, CRT, LD, TOTAL;
var bgmlocal,curcur;
var cookies = getCookies();
if (document.cookie == "") {
  C2 = parseInt(localStorage.getItem('C2'));
  CRT = parseInt(localStorage.getItem('CRT'));
  LD = parseInt(localStorage.getItem('LD'));
  TOTAL = parseInt(localStorage.getItem('TOTAL'));
  bgmlocal = parseInt(localStorage.getItem('bgmlocal'));
  curcur = parseInt(localStorage.getItem('curcur'));
} else {
  C2 = parseInt(cookies['C2']); //쿠키 가져오기
  CRT = parseInt(cookies['CRT']);
  LD = parseInt(cookies['LD']);
  TOTAL = parseInt(cookies['TOTAL']);
  bgmlocal = parseInt(cookies['bgmlocal']);
  curcur = parseInt(cookies['curcur']);
}

$(document).ready(function() {
   if(bgmlocal==0){
        audio.pause();
    }else{
         audio.play();
         audio.autoplay = true;
         audio.loop = true;
    }

    if(curcur==1){
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

  crystal = $("#cry-count");
  ladder = $("#lad-count");
  total = $("#total-count");
  crystal.text(CRT);
  ladder.text(LD);
  total.text(TOTAL);
  if(LD >= 9) 
    setTimeout(function() { MG(); }, 1000);
  else{
    change_position($(".pop"));
    $("#check3").css({"display" : "block"});
    $("#check3-NONE").css({"display" : "block"});
  }
});

function MG() {
  finishLadder = false;
  finishCheck = false;
  LD = LD - 9;
  ladder.text(LD);
  localStorage.setItem("LD", LD);

  var playingZone = $("#playing-zone");
  var image = $("#moveIMG");
  var targetLeft = playingZone.width() - image.width();
  var targetElement = document.getElementById("playing-zone");
  var count = 0;
  var check;

  $(document).keydown(function(event) {
    if (event.which === 32) {
      event.preventDefault();
      image.stop();
      count++;

      if (count == 1) {
        var newImage = document.getElementById("moveIMG1");
        newImage.style.display = "block";
        moveImage($("#moveIMG1"));
        $(document).keydown(function(event) {
          if (event.which == 32) {
            event.preventDefault();
            $("#moveIMG1").stop();
          }
        });
      }

      if (count == 2) {
        var newImage = document.getElementById("moveIMG2");
        newImage.style.display = "block";
        moveImage($("#moveIMG2"));
        $(document).keydown(function(event) {
          if (event.which == 32) {
            event.preventDefault();
            $("#moveIMG2").stop();
          }
        });
      }

      if (count == 3) {
        var newImage = document.getElementById("moveIMG3");
        newImage.style.display = "block";
        moveImage($("#moveIMG3"));
        $(document).keydown(function(event) {
          if (event.which == 32) {
            event.preventDefault();
            $("#moveIMG3").stop();
          }
        });
      }

      if (count == 4) {
        var newImage = document.getElementById("moveIMG4");
        newImage.style.display = "block";
        moveImage($("#moveIMG4"));
        $(document).keydown(function(event) {
          if (event.which == 32) {
            event.preventDefault();
            $("#moveIMG4").stop();
          }
        });
      }

      if (count == 5) {
        var newImage = document.getElementById("moveIMG5");
        newImage.style.display = "block";
        moveImage($("#moveIMG5"));
        $(document).keydown(function(event) {
          if (event.which == 32) {
            event.preventDefault();
            $("#moveIMG5").stop();
          }
        });
      }

      if (count == 6) {
        var newImage = document.getElementById("moveIMG6");
        newImage.style.display = "block";
        moveImage($("#moveIMG6"));
        $(document).keydown(function(event) {
          if (event.which == 32) {
            event.preventDefault();
            $("#moveIMG6").stop();
          }
        });
      }

      if (count == 7) {
        var newImage = document.getElementById("moveIMG7");
        newImage.style.display = "block";
        moveImage($("#moveIMG7"));
        $(document).keydown(function(event) {
          if (event.which == 32) {
            event.preventDefault();
            $("#moveIMG7").stop();
          }
        });
      }

      if (count == 8) {
        var newImage = document.getElementById("moveIMG8");
        newImage.style.display = "block";
        moveImage($("#moveIMG8"));
        finishLadder = true;
        $(document).keydown(function(event) {
          if (event.which == 32) {
            event.preventDefault();
            $("#moveIMG8").stop();
          }
        });
      }
    }
  });

  moveImage(image);
  function moveImage(x) {
    x.animate({ left: targetLeft }, 3000, "linear");
  }  
}

function goStore(){
  if(finishCheck == true){
    change_position($(".pop"));
    $("#check1").css({"display" : "block"});
    $("#check1-YES").css({"display" : "block"});
  }else{
    change_position($(".pop"));
    $("#check1").css({"display" : "block"});
    $("#check1-NO").css({"display" : "block"});
  }
}

function goSelect(){
  if(finishCheck == true){
    change_position($(".pop"));
    $("#check1").css({"display" : "block"});
    $("#check1-SELECT").css({"display" : "block"});
  }else{
    change_position($(".pop"));
    $("#check1").css({"display" : "block"});
    $("#check1-NO").css({"display" : "block"});
  }
}

function finalCheck(){
  if(finishLadder == true){
    var r0 = parseInt($("#moveIMG").css("left"));
    var r1 = parseInt($("#moveIMG1").css("left"));
    var r2 = parseInt($("#moveIMG2").css("left"));
    var r3 = parseInt($("#moveIMG3").css("left"));
    var r4 = parseInt($("#moveIMG4").css("left"));
    var r5 = parseInt($("#moveIMG5").css("left"));
    var r6 = parseInt($("#moveIMG6").css("left"));
    var r7 = parseInt($("#moveIMG7").css("left"));
    var r8 = parseInt($("#moveIMG8").css("left"));

    if(500 > r0 || r0 > 700){
      change_position($(".pop"));
      $("#check2").css({"display" : "block"});
      $("#check2-NO").css({"display" : "block"});
    }else if(500 > r1 || r1 > 700){
      change_position($(".pop"));
      $("#check2").css({"display" : "block"});
      $("#check2-NO").css({"display" : "block"});
    }else if(500 > r2 || r2 > 700){
      change_position($(".pop"));
      $("#check2").css({"display" : "block"});
      $("#check2-NO").css({"display" : "block"});
    }else if(500 > r3 || r3 > 700){
      change_position($(".pop"));
      $("#check2").css({"display" : "block"});
      $("#check2-NO").css({"display" : "block"});
    }else if(500 > r4 || r4 > 700){
      change_position($(".pop"));
      $("#check2").css({"display" : "block"});
      $("#check2-NO").css({"display" : "block"});
    }else if(500 > r5 || r5 > 700){
      change_position($(".pop"));
      $("#check2").css({"display" : "block"});
      $("#check2-NO").css({"display" : "block"});
    }else if(500 > r6 || r6 > 700){
      change_position($(".pop"));
      $("#check2").css({"display" : "block"});
      $("#check2-NO").css({"display" : "block"});
    }else if(500 > r7 || r7 > 700){
      change_position($(".pop"));
      $("#check2").css({"display" : "block"});
      $("#check2-NO").css({"display" : "block"});
    }else if(500 > r8 || r8 > 700){
      change_position($(".pop"));
      $("#check2").css({"display" : "block"});
      $("#check2-NO").css({"display" : "block"});
    }else{
      runManju(); 
      if(CRT >= 3){
        C2 = C2 + 3;
        TOTAL = TOTAL + 3;
        CRT = CRT - 3;
        crystal.text(CRT);
        total.text(TOTAL);
        localStorage.setItem("CRT", CRT);
        localStorage.setItem("C2", C2);
        localStorage.setItem("TOTAL", TOTAL);
        change_position($(".pop"));
        $("#check2").css({"display" : "block"});
        $("#check2-YES").css({"display" : "block"});
      }else{
        C2 = C2 + CRT;
        TOTAL = TOTAL + CRT;
        CRT = 0;
        crystal.text(CRT);
        total.text(TOTAL);
        localStorage.setItem("CRT", CRT);
        localStorage.setItem("C2", C2);
        localStorage.setItem("TOTAL", TOTAL);
        change_position($(".pop"));
        $("#check3").css({"display" : "block"});
        $("#check3-AUTO").css({"display" : "block"});
      }
    }
  }
  else {
    change_position($(".pop"));
    $("#check1").css({"display" : "block"});
    $("#check1-NO").css({"display" : "block"});
  }
  finishCheck = true;
}
  

function resetMG(){
  if(finishCheck == true){
    var reset = $(".IMG");
    reset.css("display", "none");
    reset.css("left", "0");

    var freset = $("#moveIMG");
    freset.css("display", "block");
    freset.css("left", "0");
 
    var cat = $("#hiddenManju");
    cat.css("display", "none");
    cat.css("left", "700px");

    if(LD >= 9){
      change_position($(".pop"));
      $("#check3").css({"display" : "block"});
      $("#check3-YES").css({"display" : "block"});
      setTimeout(function() { displayevent(); }, 1000);
      setTimeout(function() { MG(); }, 3000);
    }
    else {
      change_position($(".pop"));
      $("#check3").css({"display" : "block"});
      $("#check3-NO").css({"display" : "block"});
    }
  } else {
    change_position($(".pop"));
    $("#check1").css({"display" : "block"});
    $("#check1-NO").css({"display" : "block"});
  }
}

function runManju(){
  var cat = $("#hiddenManju");
  cat.css("display", "block");
  cat.animate({ bottom: '+=2px' }, 500);
  cat.animate({ top: '0' });
}

function getCookies() {
    let cookies = document.cookie.split(';') //';'를 기준으로 cookie string 데이터를 array로 나누어서 저장
    var cookieObj = {}
    for (let i = cookies.length - 1; i >= 0; i--) {
        let cookie = cookies[i].trim() //cookie의 i번째 인덱스를 앞 뒤 공백 제거후 cuki에 저장
        let separatorIndex = cookie.indexOf('=')
        let name = cookie.substring(0, separatorIndex)
        let value = cookie.substring(separatorIndex + 1)
        cookieObj[name] = value
    }
    return cookieObj
}

function displayevent(){
    $(".pop").css({"display" : "none"});
    $(".pDetail").css({"display" : "none"});
}

function change_position(obj) {
    var l = ($(window).width() - obj.width()) / 2;
    var t = ($(window).height() - obj.height()) / 2;
    obj.css({ top: t, left: l });
}