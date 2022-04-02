const canvas = document.querySelector(".jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

const INITIAL_COLOR = "#2c2c2c";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function startPainting(){
  painting = true;
}

function stopPainting(){
  painting = false;
}

function onMousemove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  }else{
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

function onMousedown(event){
  stopPainting();
}


function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) { 
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";   
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 700, 700);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "download_image";
  link.click();
}


function onMouseleave(event){
  painting = false;
} 

if(canvas){
  canvas.addEventListener("mousemove", onMousemove); // 마우스의 움직임을 인식
  canvas.addEventListener("mousedown", startPainting); // 마우스를 누를 때만 그리기
  canvas.addEventListener("mouseup", stopPainting); // 마우스를 때면 그리기 ㄴㄴ
  canvas.addEventListener("mouseleave", stopPainting); // 캔버스 밖으로 나가면 ㄴㄴ
  canvas.addEventListener("click", handleCanvasClick); // 채우기 사용할 때 씀
  canvas.addEventListener("contextmenu", handleCM); // 우클릭방지
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}