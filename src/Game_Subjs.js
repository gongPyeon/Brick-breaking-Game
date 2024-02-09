const audio = new Audio();
audio.src = "bgm/Game.mp3";

$(document).ready(function(){

    let bgmlocal,curcur;
    let cookies = getCookies();
    if (document.cookie == "") {
        bgmlocal = parseInt(localStorage.getItem('bgmlocal'))
        curcur = parseInt(localStorage.getItem('curcur'))
        console.log(localStorage)
    } else {
        bgmlocal = parseInt(cookies['bgmlocal']);
        curcur = parseInt(cookies['curcur']);
        console.log(document.cookie)
    }

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
})

//ctx field
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
//startBtn field
const startBtn = document.getElementById("gamestart");
startBtn.onclick = gamestart;

//ball settings
let ballR = 20;
let x = WIDTH / 2;
let y = HEIGHT - 30;
const SPDINIT = 4;
let dx = 4;
let dy = -4;
const cHIMG = new Image();
cHIMG.src = "img/catball.png"

//paddle field
const padHEIGHT = 10;
let padWIDTH = 100;
let paddleX = (WIDTH - padWIDTH) / 2;
const paddleY = HEIGHT - padHEIGHT - 30;
const padINITSPEED = 6;
let paddleSpeed = padINITSPEED;
const padIMG = new Image();
padIMG.src = "img/paddle.png"
const mjIMG = new Image();
mjIMG.src = "img/PullManju.png"

//brick field
const brkINITROW = 3;
const brkCOLCOUNT = 8;
const brkTOP = 30;
const brkLEFT = 30;
const brkPADDING = 20;
const brkLEVEL = 10;
const brkHeight = (HEIGHT - brkTOP - padHEIGHT) / brkLEVEL - brkPADDING;
const brkWidth = (WIDTH - 2 * brkLEFT) / brkCOLCOUNT - brkPADDING; //140(width 960)

//brick settings
let brkRowCount = brkINITROW;
let bricks = [];
const BRKIMGS = ["normal_closed.png", "normal_opened.png", "crystal_closed.png", "crystal_opened.png",
    "item_closed.png", "item_opened.png"
]
const BRKIMGS_CLOSED = [new Image(), new Image(), new Image()];
const BRKIMGS_OPENED = [new Image(), new Image(), new Image()];
for (let i = 0; i < BRKIMGS_CLOSED.length; i++) {
    BRKIMGS_CLOSED[i].src = "img/chest_" + BRKIMGS[i * 2]
    BRKIMGS_OPENED[i].src = "img/chest_" + BRKIMGS[i * 2 + 1]
}
const COLORBRK = []


//input setting
let rightPressed = false;
let leftPressed = false;

//level setting
// const levelStage = ["SubStage1.png", "SubStage2.png", "SubStage3.png"]
const levelBgColor = ["#202332", "#202e31", "#312120"]
const levelStage = ["sub1.png", "sub2.png", "sub3.png"]
const levelCrystal = ["Crystal1.png", "Crystal2.png", "Crystal3.png"]
const levelSpeedAddBricks = [7 * 1000, 6 * 1000, 5 * 1000]
const levelLimitAddBricks = [20, 23, 28]
const levelPaddleWidth = [150, 125, 100]
let curLevel = 2; //현재 레벨 0~2(1단계~3단계)
let game = 1; //게임 시작여부 0-False / 1-True
let aB;
let dG; //addBricks(10초단위로 새로운 블럭 생성 인터벌) / drawGame(매 0.01초 화면 draw)
const StageImg = new Image();
StageImg.src = "img/" + levelStage[curLevel]; // 난이도 영향
// const AnimateImg = new Image(); AnimateImg.src = "img/Crystal"+11*(curLevel+1)+".gif"; // 난이도 영향

//item setting
const CrystalImg = new Image();
CrystalImg.src = "img/" + levelCrystal[curLevel]; // 난이도 영향
const LadderImg = new Image();
LadderImg.src = "img/BridgeBasic.png"
const ITEMSIZE = 70;
const CRYCOUNT = document.getElementById("cry-count");
const LADCOUNT = document.getElementById("lad-count");
let cntCrysInHand; //손안의 크리스탈 갯수
let cntCRYS = 0; //점수 크리스탈 갯수
let cntLADD = 0; //점수 사다리 갯수
let cntLadderInHand; //손안의 사다리 갯수

//Item UI
const HEADER = document.querySelector("header")
const DOCCRYSIMG = document.querySelector("#check-cry .mini")
    // DOCCRYSIMG.src = "img/"+levelCrystal[curLevel];//               난이도 영향

let cookies = getCookies()
let C1 = cookies['C1']

// gamestart()
//난이도 설정
let linkVar = location.href.split('?')
curLevel = parseInt(linkVar[1]); //링크값으로 난이도 전달
if (isNaN(curLevel)) curLevel = 2;
StageImg.src = "img/" + levelStage[curLevel]
CrystalImg.src = "img/" + levelCrystal[curLevel]
DOCCRYSIMG.src = "img/" + levelCrystal[curLevel]
let prebg = document.getElementById("prebg");prebg.src = "img/" + levelStage[curLevel];
HEADER.style.backgroundColor = levelBgColor[curLevel]
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// ctx.drawImage(StageImg, 0, 0, WIDTH, HEIGHT); //drawbackground Img

function pause() {
    document.getElementById("start").style.display = "none"
    let popup = document.getElementById("pause")
    if (game) {
        popup.style.display = "block";
        game = 0;
        clearInterval(aB);
        clearInterval(dG);
    } else {
        popup.style.display = "none";
        game = 1;
        aB = setInterval(addBricks, levelSpeedAddBricks[curLevel]);
        dG = setInterval(draw, 10);
    }
}

// function displayPopup() {
//     let popup = document.querySelector(".popup")
//     if (popup.style.display === "none") {
//         popup.style.display = "block";
//     } else {
//         popup.style.display = "none";
//     }
// }

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

function randChest() {
    let rand = Math.random();
    if (rand > 0.85) return 2;
    else if (rand > 0.7) return 3;
    else return 1;
}

function gamestart() {
    document.getElementById("start").style.display = "none"
    prebg.style.display = "none";
        // if(game){
        //   gameover();
        // }else{
    brkRowCount = brkINITROW;
    bricks = [];
    for (let c = 0; c < brkCOLCOUNT; c++) {
        bricks[c] = [];
        for (let r = 0; r < brkRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: randChest() };
            const brickX = c * (brkWidth + brkPADDING) + brkLEFT;
            const brickY = r * (brkHeight + brkPADDING) + brkTOP;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
        }
    }
    dx = SPDINIT;
    dy = -SPDINIT;
    cntCRYS = 0;
    cntCrysInHand = 0;
    cntLADD = 0;
    cntLadderInHand = 0;
    padWIDTH = levelPaddleWidth[curLevel]
    aB = setInterval(addBricks, levelSpeedAddBricks[curLevel]);
    dG = setInterval(draw, 10);
    game = 1;
    // }
}

function gameover() {
    clearInterval(aB);
    clearInterval(dG);
    document.cookie = "L=" + cntLADD
    document.cookie = "CRT=" + cntCRYS
    localStorage.setItem("LD", cntLADD)
    localStorage.setItem("CRT", cntCRYS)
    // ctx.drawImage(AnimateImg,0,0);
    // animate()
    // setTimeout(loadnext, 2000)
    location.href = "Game_GotoMain.html?"+curLevel;
    game = 0;
}

// function loadnext() {
//     location.href = 'Game_Main(' + (curLevel + 1) + ').html'
// }

// function animate() {
//     let ani = document.getElementById("animation")
//     ani.src = "img/Crystal" + 11 * (curLevel + 1) + ".gif"
//     ani.style.display = "block";
//     setTimeout(pocket, 900, ani)
// }

// function pocket(ani) {
//     $("#mj").fadeIn()
//     $("#pocket").fadeIn()
//     ani.style.display = "none";
//     $("#mj").animate({ "left": 1000 })
//     $("#pocket").animate({ "left": 1000 })
// }

function drawBall() {
    ctx.drawImage(cHIMG, x - ballR, y - ballR, ballR * 2, ballR * 2)
    if (cntCrysInHand) {
        ctx.drawImage(CrystalImg, x - ITEMSIZE *5/8, y, ITEMSIZE * 3/4, ITEMSIZE * 3/4)
    }
    if (cntLadderInHand) {
        ctx.drawImage(LadderImg, x + ballR * 2 - ITEMSIZE / 2, y + ITEMSIZE/8, ITEMSIZE /2, ITEMSIZE /2)
    }
}

// function drawRect(x, y, w, h, color) {
//     ctx.beginPath();
//     ctx.rect(x, y, w, h);
//     ctx.fillStyle = color;
//     ctx.fill();
//     ctx.closePath();
// }

function drawPaddle() {
    ctx.drawImage(mjIMG, paddleX + padWIDTH * 0.8, paddleY - padHEIGHT * 4, ITEMSIZE * 1.2, ITEMSIZE * 1.2)
    ctx.drawImage(padIMG, paddleX - padWIDTH * 0.1, paddleY - padHEIGHT * 2, padWIDTH * 1.2, padHEIGHT * 6)
        // drawRect(paddleX, paddleY, padWIDTH, padHEIGHT, "#0095DD")
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(StageImg, 0, 0, WIDTH, HEIGHT); //drawbackground Img
    //drawElement
    drawBricks();
    drawBall();
    paddleShift();
    drawPaddle();
    collision();
    CRYCOUNT.innerHTML = cntCRYS;
    LADCOUNT.innerHTML = cntLADD;
    x += dx;
    y += dy;
}

function drawBricks() {
    for (let c = 0; c < brkCOLCOUNT; c++) {
        for (let r = 0; r < brkRowCount; r++) {
            const BRK = bricks[c][r];
            if (BRK.status) {
                // drawRect(BRK.x, BRK.y, brkWidth, brkHeight, "#0095DD");
                ctx.drawImage(BRKIMGS_CLOSED[BRK.status - 1], BRK.x, BRK.y, brkWidth, brkHeight)
            }
            // else{drawRect(BRK.x, BRK.y, brkWidth, brkHeight, "#FF0000");}
        }
    }
}
//adding bricks every 10 sec
function addBricks() {
    brkRowCount++;
    if (brkRowCount > levelLimitAddBricks[curLevel] + brkINITROW - 1) gameover() //한계시간초과시 게임종료(165초가량)
    const nbricks = [];
    for (let c = 0; c < brkCOLCOUNT; c++) {
        nbricks[c] = [];
        for (let r = 0; r < brkRowCount; r++) {
            const brickX = c * (brkWidth + brkPADDING) + brkLEFT;
            const brickY = r * (brkHeight + brkPADDING) + brkTOP;
            nbricks[c][r] = { x: 0, y: 0, status: randChest() };
            if (r != 0) { nbricks[c][r] = bricks[c][r - 1] } //새로운 블럭이 아니면 기존블럭에서 가져오기
            if (brickY + brkHeight > paddleY && nbricks[c][r].status) gameover() //살아있는 벽돌이 바닥을 뚫도록 내려가면 게임종료
            nbricks[c][r].x = brickX;
            nbricks[c][r].y = brickY;
        }
    }
    bricks = nbricks;
}
//animation item in chest 
function itemInChest(brkx, brky, item, time) {
    ctx.drawImage(item, brkx, brky, ITEMSIZE, ITEMSIZE)
    if (time > 0) setTimeout(itemInChest, 10, brkx, brky - 1, item, time - 1)
}
//collision with chest
function openChest(BRK) {
    ctx.drawImage(BRKIMGS_OPENED[BRK.status - 1], BRK.x, BRK.y, brkWidth, brkHeight)
    if (BRK.status == 2) {
        cntCrysInHand++;
        itemInChest(BRK.x + brkWidth / 2 - ITEMSIZE / 2, BRK.y + ITEMSIZE / 4, CrystalImg, 10)
    } else if (BRK.status == 3) {
        cntLadderInHand++;
        itemInChest(BRK.x + brkWidth / 2 - ITEMSIZE / 2, BRK.y + ITEMSIZE / 4, LadderImg, 10)
    }
    BRK.status = 0;
}

function collision() {
    //collision with outline
    if (x + dx > WIDTH - ballR || x + dx < ballR) {
        dx = -dx;
        if (x > WIDTH - ballR) x = WIDTH - ballR;
        if (x < ballR) x = ballR;
    }
    if (y + dy > HEIGHT - ballR) {
        // dx = Math.abs(dx) / dx * SPDINIT; //속도 초기화
        // cntCrysInHand = 0;
        // cntLadderInHand = 0;
        gameover();
        dy = -SPDINIT;
    }
    if(y + dy < ballR)  dy = Math.abs(dy);
    //collision with bricks
    for (let c = 0; c < brkCOLCOUNT; c++) {
        for (let r = 0; r < brkRowCount; r++) {
            const BRK = bricks[c][r];
            if (BRK.status) {
                let collX = (x + dx + ballR >= BRK.x && x + dx - ballR <= BRK.x + brkWidth);
                let collY = (y + dy + ballR >= BRK.y && y + dy - ballR <= BRK.y + brkHeight);
                if (collX && collY) {
                    openChest(BRK);
                    if (x + ballR < BRK.x || x - ballR > BRK.x + brkWidth) dx = -dx;
                    if (y + ballR < BRK.y || y - ballR > BRK.y + brkHeight) dy = -dy;
                }
            }
        }
    }
    //collision with paddle
    let collX = (x + dx + ballR >= paddleX && x + dx - ballR <= paddleX + padWIDTH);
    let collY = (y + dy + ballR >= paddleY && y + dy - ballR <= paddleY + padHEIGHT);
    if (collX && collY) {
        if (cntCrysInHand) {
            cntCRYS += cntCrysInHand;
            cntCrysInHand = 0;
        }
        if (cntLadderInHand) {
            cntLADD += cntLadderInHand;
            cntLadderInHand = 0;
        }
        // if(y+ ballR < paddleY || y - ballR > paddleY + padHEIGHT) dy = -dy;
        if (rightPressed) { dx = (dx > 0) ? dx : -dx } else if (leftPressed) { dx = (dx < 0) ? dx : -dx }
        if (dy > 0) {
            dx = dx * (1 + 0.01 * (curLevel))
            dy = dy ** (1 + 0.0005 * (curLevel))
        }
        dy = -Math.abs(dy);
        if (x + ballR < paddleX || x - ballR > paddleX + padWIDTH) dx = -dx;
    }
}
//paddle movement
function paddleShift() {
    if (rightPressed) {
        paddleX += paddleSpeed;
        if (paddleX + padWIDTH >= WIDTH) paddleX = WIDTH - padWIDTH
    } else if (leftPressed) {
        paddleX -= paddleSpeed;
        if (paddleX <= 0) paddleX = 0
    }
}

//input process
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key === "Escape") {
        pause();
    }
    // console.log(e.key)
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < WIDTH) {
        paddleX = relativeX - padWIDTH/2;
    }
}