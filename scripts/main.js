let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let h_border = canvas.height;
let w_border = canvas.width;

//inicial settings
const RESIZE= 32;
const A = Math.PI/180;


let teclado=[]; teclas();
let frames=16;
let fov= 90*A;
let res=1;


let blocks = createMap();
let p1 = new player(12,12,24,24,"yellow");
//let p2 = new player(8,12,32,32, "red");

setInterval(function(){
    clear();
    //drawInGrid(blocks);
    //draw(p1);
    //draw(p2);
    
    movimento(p1);
    //movimento(p2);
    
    rayCasting(p1, 0, 0, w_border, h_border, fov, res );
}, frames);

document.addEventListener('keydown', (event) => {
    teclado[event.key] = true;

    if(event.key=="o")fov += A;
    else if(event.key=="p")fov -= A;
    console.log("FOV:"+fov)
    console.log("RES:"+res)

    if(event.key=="k")res += 1;
    else if(event.key=="l")if(res>1)res -= 1;
 });
 
document.addEventListener('keyup', (event) => {
    teclado[event.key]=false;  
 });