const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITAIL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);
ctx.strokeStyle = INITAIL_COLOR;
ctx.fillStyle = INITAIL_COLOR;

ctx.lineWidth = 2.5; 

let painting = false;

function onMouseDown(event){
    painting = true;
}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }

  // console.log(x,y);
}

function handleColor(event){
   ctx.strokeStyle = event.target.style.backgroundColor;
   ctx.fillStyle = ctx.strokeStyle;

}

function handleRange(event){
    ctx.lineWidth = (event.target.value);
 }

 function changeMode(){
     if(mode.innerText == "PAINT"){
         mode.innerText = "FILL";
         
        //mode change code
     }
     else{
         mode.innerText = "PAINT";
     }

 }

function handleCanvasClick(){
    if(mode.innerText == "FILL"){
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //click
    canvas.addEventListener("mouseup", stopPainting); //click off
    canvas.addEventListener("mouseleave", stopPainting); //이건 그림 그릴수 있느 ㄴ공간을 나갔을때 ? 
    canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColor)
);

if(range){
    range.addEventListener("input", handleRange);
}
if(mode){
    mode.addEventListener("click", changeMode);
}