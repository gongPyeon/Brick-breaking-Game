const audio = new Audio();
audio.src = "bgm/Store.mp3";
var blue; //파란색 보석 개수
var green; //초록색 보석 개수
var red; //빨간색 보석 개수

$(document).ready(function() {
    blue = $("#blue"); //요소 가져오기
    green = $("#green");
    red = $("#red");
    score = $("#score");

    let C1, C2, C3, TOTAL;
    let check1, check2, check3, check4
    let check1Yes, check2Yes, check3Yes, check4Yes
    let bgmlocal,curcur
    let cookies = getCookies();
    if (document.cookie == "") {
        C1 = parseInt(localStorage.getItem('C1'))
        C2 = parseInt(localStorage.getItem('C2'))
        C3 = parseInt(localStorage.getItem('C3'))
        TOTAL = parseInt(localStorage.getItem('TOTAL'))
        check1 = parseInt(localStorage.getItem('check1'))
        check2 = parseInt(localStorage.getItem('check2'))
        check3 = parseInt(localStorage.getItem('check3'))
        check4 = parseInt(localStorage.getItem('check4'))
        check1Yes = parseInt(localStorage.getItem('check1Yes'))
        check2Yes = parseInt(localStorage.getItem('check2Yes'))
        check3Yes = parseInt(localStorage.getItem('check3Yes'))
        check4Yes = parseInt(localStorage.getItem('check4Yes'))
        bgmlocal = parseInt(localStorage.getItem('bgmlocal'))
        curcur = parseInt(localStorage.getItem('curcur'))
        console.log(localStorage)
    } else {
        C1 = parseInt(cookies['C1']); //쿠키 가져오기
        C2 = parseInt(cookies['C2']);
        C3 = parseInt(cookies['C3']);
        TOTAL = parseInt(cookies['TOTAL']);
        check1 = parseInt(cookies['check1']);
        check2 = parseInt(cookies['check2']);
        check3 = parseInt(cookies['check3']);
        check4 = parseInt(cookies['check4']);
        check1Yes = parseInt(cookies['check1Yes']);
        check2Yes = parseInt(cookies['check2Yes']);
        check3Yes = parseInt(cookies['check3Yes']);
        check4Yes = parseInt(cookies['check4Yes']);
        bgmlocal = parseInt(cookies['bgmlocal']);
        curcur = parseInt(cookies['curcur']);
        console.log(document.cookie)
    }
    
    blue.text(C1);
    green.text(C2);
    red.text(C3);
    score.text(TOTAL);

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


    if (check1 == 1) { //구매 완료:1 , 즉 구매한 아이템일 경우
        $("#itemBox1>img:first").attr("src", "img/I1.png");
        $("#itemBox1>img:first").css({ cursor: "pointer", backgroundColor: "lightgray" });
       if(check1Yes == 1){ //착용 상태:1 , 상점을 벗어나기 전 아이템 착용 유무 확인
            $("#item1").fadeIn("slow");
        }else{
             $("#item1").fadeOut("slow");
        }
    }

    if (check2 == 1) {
        $("#itemBox1>img:last").attr("src", "img/I2.png");
        $("#itemBox1>img:last").css({ cursor: "pointer", backgroundColor: "lightgray" });
        if(check2Yes == 1){
            $("#item2").fadeIn("slow");
        }else{
            $("#item2").fadeOut("slow");
        }
    }

    if (check3 == 1) {
        $("#itemBox2>img:first").attr("src", "img/I3.png");
        $("#itemBox2>img:first").css({ cursor: "pointer", backgroundColor: "lightgray" });
        if(check3Yes == 1){
            $("#item3").fadeIn("slow");
        }else{
            $("#item3").fadeOut("slow");
        }
    }

    if (check4 == 1) {
        $("#itemBox2>img:last").attr("src", "img/I4.png");
        $("#itemBox2>img:last").css({ cursor: "pointer", backgroundColor: "lightgray" });
        if(check4Yes == 1){
            $("#item4").fadeIn("slow");
        }else{
            $("#item4").fadeOut("slow");
        }
    }

    $("#itemBox1>img:first").click(function() { //안경을 선택했을 떄
        if (check1 == 1) { //구매한 물품인지 확인한다
            if(check1Yes == 1){ //착용상태일 경우
                $("#item1").fadeOut("slow"); //착용X
                check1Yes = 0;  //착용 상태값 변경
                localStorage.setItem("check1Yes",check1Yes); // 저장
            }else{
                $("#item1").fadeIn("slow"); 
                check1Yes = 1;
                localStorage.setItem("check1Yes",check1Yes);
            }
        } else {
            show_form(); //구매할건지 알림창을 띄운다
            $("#yes").unbind("click").bind("click", function() { //yes를 클릭한 경우(클릭 버블링 현상 해결-unbind, bind사용)
                if (C1 >= 5) { //가지고 있는 보석의 개수가 해당 아이템을 구매할 때 필요한 보석의 개수보다 같거나 클 경우
                    C1 = C1 - 5;
                    localStorage.setItem("C1", C1); //localStorage
                    blue.text(C1);

                    check1 = 1;
                    localStorage.setItem("check1",check1);
                    check1Yes = 1;
                    localStorage.setItem("check1Yes",check1Yes);

                    $("#itemBox1>img:first").attr("src", "img/I1.png"); //선명한 디자인으로 바꾼다
                    $("#itemBox1>img:first").css({ cursor: "pointer", backgroundColor: "lightgray" }); //cursor와 배경색을 바꾼다
                    $("#item1").fadeIn("slow");
                    $("#check").fadeOut("slow"); //알림창 없어지기
                } else {
                    $("#check").fadeOut("slow"); //아무것도 적용하지 않고 알림창을 없앤다
                }
            })
            $("#no").click(function() {
                $("#check").fadeOut("slow"); //아무것도 적용하지 않고 알림창을 없앤다
            })
        }
    })

    //나머지 구현방식은 위 주석과 동일
    $("#itemBox1>img:last").click(function() {
        if (check2 == 1) {
            if(check2Yes == 1){
                $("#item2").fadeOut("slow");
                check2Yes = 0;
                localStorage.setItem("check2Yes",check2Yes);
            }else{
                $("#item2").fadeIn("slow");
                check2Yes = 1;
                localStorage.setItem("check2Yes",check2Yes);
            }
        } else {
            show_form();
            $("#yes").unbind("click").bind("click", function() {
                if (C2 >= 5) {
                    C2 = C2 - 5;
                    localStorage.setItem("C2", C2);
                    green.text(C2);

                    check2 = 1;
                    localStorage.setItem("check2",check2);
                    check2Yes = 1;
                    localStorage.setItem("check2Yes",check2Yes); //왜 밖으로 빼면 nan이지?

                    $("#itemBox1>img:last").attr("src", "img/I2.png");
                    $("#itemBox1>img:last").css({ cursor: "pointer", backgroundColor: "lightgray" });
                    $("#item2").fadeIn("slow");
                    $("#check").fadeOut("slow");
                } else {
                    $("#check").fadeOut("slow");
                }
            })
            $("#no").click(function() {
                $("#check").fadeOut("slow");
            })
        }
    })
    $("#itemBox2>img:first").click(function() {
        if (check3 == 1) {
            if(check3Yes == 1){
                $("#item3").fadeOut("slow");
                check3Yes = 0;
                localStorage.setItem("check3Yes",check3Yes);
            }else{
                $("#item3").fadeIn("slow");
                check3Yes = 1;
                localStorage.setItem("check3Yes",check3Yes);
            }
        } else {
            show_form();
            $("#yes").unbind("click").bind("click", function() {
                if (C2 >= 7) {
                    C2 = C2 - 7;
                    localStorage.setItem("C2", C2);
                    green.text(C2);

                    check3 = 1;
                    localStorage.setItem("check3",check3);
                    check3Yes = 1;
                    localStorage.setItem("check3Yes",check3Yes);

                    $("#itemBox2>img:first").attr("src", "img/I3.png");
                    $("#itemBox2>img:first").css({ cursor: "pointer", backgroundColor: "lightgray" });
                    $("#item3").fadeIn("slow");
                    $("#check").fadeOut("slow");
                } else {
                    $("#check").fadeOut("slow");
                }
            })
            $("#no").click(function() {
                $("#check").fadeOut("slow");
            })
        }
    })
    $("#itemBox2>img:last").click(function() {
        if (check4 == 1) {
            if(check4Yes == 1){
                $("#item4").fadeOut("slow");
                check4Yes = 0;
                localStorage.setItem("check4Yes",check4Yes);
            }else{
                $("#item4").fadeIn("slow");
                check4Yes = 1;
                localStorage.setItem("check4Yes",check4Yes);
            }
        } else {
            show_form();
            $("#yes").unbind("click").bind("click", function() {
                if (C3 >= 5) {
                    C3 = C3 - 5;
                    localStorage.setItem("C3", C3);
                    red.text(C3);

                    check4 = 1;
                    localStorage.setItem("check4",check4);
                    check4Yes = 1;
                    localStorage.setItem("check4Yes",check4Yes);

                    $("#itemBox2>img:last").attr("src", "img/I4.png");
                    $("#itemBox2>img:last").css({ cursor: "pointer", backgroundColor: "lightgray" });
                    $("#item4").fadeIn("slow");
                    $("#check").fadeOut("slow");
                } else {
                    $("#check").fadeOut("slow");
                }
            })
            $("#no").click(function() {
                $("#check").fadeOut("slow");
            })
        }
    })

    //악세서리와 옷 둘중 하나의 카테고리를 선택하는 부분
    $("#etc").css({ backgroundColor: "#FFD95A" });
    $("#etc+img").click(function() { //악세서리를 택했을때
        $("#itemBox2").css({ display: "none" }); //옷 카테고리 박스를 숨기기
        $("#itemBox1").css({ display: "block" }); //악세서리 카테고리 박스 보이기
        $("#clothes").css({ backgroundColor: "#FFF8DE" }); //선택하지 않은(옷카테고리) 품목 색깔 지정
        $("#etc").css({ backgroundColor: "#FFD95A" }); //선택한(악세서리 카테고리) 품목 색깔 지정
    })

    $("#clothes+img").click(function() { //위와 동일
        $("#itemBox2").css({ display: "block" });
        $("#itemBox1").css({ display: "none" });
        $("#etc").css({ backgroundColor: "#FFF8DE" });
        $("#clothes").css({ backgroundColor: "#FFD95A" });
    })

});

function show_form() { //구매 유무 알림창을 띄운다
    // $("#check").addClass("check");
    change_position($(".popup"));
    $("#check").fadeIn("slow");
}

function change_position(obj) { // 해당사이트의 정가운데 오도록 배치한다
    var l = ($(window).width() - obj.width()) / 2;
    var t = ($(window).height() - obj.height()) / 2;
    obj.css({ top: t, left: l });
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