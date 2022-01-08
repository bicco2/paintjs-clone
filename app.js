const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");

console.log(colors);

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "##2c2c2c";
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
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //click
    canvas.addEventListener("mouseup", stopPainting); //click off
    canvas.addEventListener("mouseleave", stopPainting); //이건 그림 그릴수 있느 ㄴ공간을 나갔을때 ? 
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColor));
