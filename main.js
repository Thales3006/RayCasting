let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let h_border = canvas.height;
let w_border = canvas.width;

//inicial settings
context.fillStyle = "rgb(255,255,255)";
context.fillRect(0,0,w_border,h_border);

let teclado=[]; teclas();
let frames=16;
let fov=90;
const movTela= 544;

let blocks = createMap();
let p1 = new player(12,12,24,24);


setInterval(function(){
    clear();
    drawInGrid(blocks);
    draw(p1);
    drawdir();
    
    movimento(p1);
    
    skyground();
    rayCasting();
}, frames);

document.addEventListener('keydown', (event) => {
    teclado[event.key] = true;
 });
 
document.addEventListener('keyup', (event) => {
    teclado[event.key]=false;  
 });