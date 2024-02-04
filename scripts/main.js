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
let entidades={
    player:[],
    particle:[],
    enemy:[]
};

let p1 = new player(12,12,24,24,"yellow","imgs/marcos.bmp");
let p2 = new player(8,12,15,15, "pink","imgs/nicoli.bmp");
let p3 = new player(8,15,15,10, "pink","imgs/cachorro.png");


let textura = new Image();
SetImage(textura, "./imgs/parede.bmp");


setInterval(function(){
    clear();

    movimento(p1,"w","s","d","a");
    movimento(p1,"W","S","D","A");
    movimento(p2,"ArrowUp","ArrowDown","ArrowRight","ArrowLeft");
    movimento(p3,"y","h","j","g");

    vision(p1, entidades, 0, 0, w_border, h_border, fov, res )

    //drawInGrid(blocks);
    draw2d(p1);
    draw2d(p2);
    draw2d(p3);
    drawdir(p1);
    drawdir(p2);
    drawdir(p3);

}, frames);



document.addEventListener('keydown', (event) => {
    teclado[event.key] = true;

    if(event.key=="o"){fov += A;console.log(fov)}
    else if(event.key=="p"){fov -= A;console.log(fov)}

    if(event.key=="k"){if(res>=textura.width)res = textura.width;else res += 1;console.log(res)}
    else if(event.key=="l"){if(res>1)res -= 1;console.log(res)}
 });
 
document.addEventListener('keyup', (event) => {
    teclado[event.key]=false;  
 });