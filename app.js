const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");
const back = document.getElementById("jsRollback");

const INITAIL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

let restore_array =[];
let index = -1;

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

function stopPainting(event){
    painting = false;
                
                        if(event.type== 'mouseup'){
                                restore_array.push(ctx.getImageData(0,0,canvas.width, canvas.height));
                                index += 1;
                                console.log(restore_array);
                        }
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(mode.innerText == "PAINT"){
        if(!painting){
            ctx.beginPath();
            ctx.moveTo(x,y);
                    console.log(event.type);
        } else {
            ctx.lineTo(x,y);
            ctx.stroke();
                    console.log(event.type);
        }

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
     }
     else if (mode.innerText == "FILL"){
         mode.innerText = "PAINT";
     }
   

 }

function handleCanvasClick(){
    if(mode.innerText == "FILL"){
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
  } // 우클릭 방지

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

function removePaint(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function leavePainting(){
    if(painting == true){
        restore_array.push(ctx.getImageData(0,0,canvas.width, canvas.height));
        index += 1;
        painting = false;
        console.log(restore_array);
    }

}


function undo_last(){
    if(index <=0){
        removePaint();
    }else{
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index],0,0);
    }
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //click
    canvas.addEventListener("mouseup", stopPainting); //click ofƒ
    canvas.addEventListener("mouseleave", leavePainting); //이건 그림 그릴수 있느 ㄴ공간을 나갔을때 ? 
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
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

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }
 

if(clear){
    clear.addEventListener("click", removePaint);
}

if(back){
    back.addEventListener("click", undo_last);
}

