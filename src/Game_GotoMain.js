let linkVar = location.href.split('?')
curLevel = parseInt(linkVar[1]); //링크값으로 난이도 전달
if (isNaN(curLevel)) curLevel = 2;
const levelCrystal = ["Crystal1.png", "Crystal2.png", "Crystal3.png"]
const DOCCRYSIMG = document.querySelector("#check-cry .mini");DOCCRYSIMG.src = "img/" + levelCrystal[curLevel]

const levelBgColor = ["#202332", "#202e31", "#312120"]
const HEADER = document.querySelector("header")
HEADER.style.backgroundColor = levelBgColor[curLevel]

const CrystalImg = new Image();CrystalImg.src = "img/" + levelCrystal[curLevel]; // 난이도 영향

const CRYCOUNT = document.getElementById("cry-count");
const LADCOUNT = document.getElementById("lad-count");
CRYCOUNT.innerHTML = localStorage.getItem("CRT");
LADCOUNT.innerHTML = localStorage.getItem("LD");

let ani = document.getElementById("animation")
ani.src = "img/Crystal" + 11 * (curLevel + 1) + ".gif"
ani.style.display = "block";

$(document).ready(function() {
    $('body').fadeOut(2000, function() {
        location.href = 'Game_Main(' + (curLevel + 1) + ').html'
    });
});

