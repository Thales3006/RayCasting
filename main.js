let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let h_border = canvas.height;
let w_border = canvas.width;

//inicial settings

let teclado=[]; teclas();
let frames=16;
let fov=90;
let res=1;
const movTelaX= 0;
const movTelaY= 0;
const RESIZE= 32;

let blocks = createMap();
let p1 = new player(12,12,24,24,"yellow");
//let p2 = new player(8,12,32,32, "red");

setInterval(function(){
    clear();
    drawInGrid(blocks);
    draw(p1);
    //draw(p2);
    
    movimento(p1);
    //movimento(p2);
    
    skyground();
    rayCasting(p1);
}, frames);

document.addEventListener('keydown', (event) => {
    teclado[event.key] = true;
 });
 
document.addEventListener('keyup', (event) => {
    teclado[event.key]=false;  
 });