let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let h_border = canvas.height;
let w_border = canvas.width;

//inicial settings
const RESIZE= 16;
const A = Math.PI/180;


let teclado=[]; teclas();
let frames=16;
let venceu = false;

let fov= 90*A;
let res=1;

let blocks = createMap();
let entidades={
    player:[],
    particle:[],
    enemy:[]
};

let p1 = new Player(12,12,0.6,0,"imgs/ambaba.bmp");
let p2 = new Player(8,12,0.5,0,"imgs/ambaba.bmp");
let p3 = new Player(8,15,0.5,0,"imgs/cachorro.png");

enemigos(entidades.enemy);


let textura = new Image();
SetImage(textura, "./imgs/parede.bmp");

window.alert("Mate tudo e todos")

setInterval(function(){
    clear();

    movimento(p1,"w","a","s","d"," ");
    movimento(p1,"W","A","S","D","");
    movimento(p2,"ArrowUp","ArrowLeft","ArrowDown","ArrowRight","");
    movimento(p3,"y","g","h","j","");

    particlemov(entidades.particle)

    vision(p1, entidades, 0, 0, w_border, h_border, fov, res )

    drawInGrid(blocks);
    drawInGrid(entidades.player);
    drawInGrid(entidades.enemy);
    drawInGrid(entidades.particle);
    drawdir(entidades.player);
    drawdir(entidades.enemy);

    if(entidades.enemy.length==0 && entidades.player.length<=1 && venceu == false){
        window.alert("Parabéns!\n Você matou tudo e todos!")
        venceu = true;
    }

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