function createMap(){
    let array = []

    for(let i = 0; i<16; i++){
        array.push(new obj(i,0))
    }
    for(let i = 0; i<16; i++){
        array.push(new obj(0,i))
    }
    for(let i = 0; i<16; i++){
        array.push(new obj(16,i))
    }
    for(let i = 0; i<=16; i++){
        array.push(new obj(i,16))
    }
    for(let i = 6; i<=16; i++){
        array.push(new obj(i,10))
    }

    array.push(new obj(3,3))
    array.push(new obj(3,5))
    array.push(new obj(5,3))


    array.push(new obj(14,3))
    array.push(new obj(12,3))
    array.push(new obj(10,3))
    array.push(new obj(14,5))
    //array.push(new obj(12,5))
    array.push(new obj(10,5))
    array.push(new obj(14,7))
    array.push(new obj(12,7))
    array.push(new obj(10,7))

    return array
}

function teclas(){
    teclado["a"]=false;
    teclado["w"]=false;
    teclado["s"]=false;
    teclado["d"]=false;
    teclado["A"]=false;
    teclado["W"]=false;
    teclado["S"]=false;
    teclado["D"]=false;

}
function drawInGrid(array){
    context.fillStyle="brown";
    for(let i = 0; i < array.length;i++){
        context.fillRect(array[i].x*32,array[i].y*32,32,32);

    }
}
function draw(coisa){
    context.fillStyle="yellow"
    context.fillRect(coisa.x*32,coisa.y*32,coisa.larg,coisa.alt);
}
function clear(){
    context.fillStyle="white";
    context.fillRect(0,0,w_border,h_border);
}
function drawdir(){
    context.fillStyle="red"
    context.fillRect(
        p1.x*32+(p1.larg/2-5)+Math.cos((p1.ang*Math.PI)/180)*15,
        p1.y*32+(p1.alt/2-5)+Math.sin((p1.ang*Math.PI)/180)*15,
        10,10);
}

function movimento(movel){
    let x=movel.x;
    let y=movel.y;
    let colisor;

    if(teclado["a"]||teclado["A"]){
        movel.ang-=movel.torque;
    }
    if(teclado["d"]||teclado["D"]){
        movel.ang+=movel.torque;
    }
    if(teclado["s"]||teclado["S"]){
        movel.x-= movel.vel*Math.cos((movel.ang*Math.PI)/180);
        if((i=colisao(p1,blocks))!=-1){
            movel.x=x;
            movel.x+=dist(movel.x,movel.larg,blocks[i].x,1);
        }
        movel.y-= movel.vel*Math.sin((movel.ang*Math.PI)/180);
        if((i=colisao(p1,blocks))!=-1){
            movel.y=y;
            movel.y+=dist(movel.y,movel.alt,blocks[i].y,1);
        }
    }
    if(teclado["w"]||teclado["W"]){
        movel.x+= movel.vel*Math.cos((movel.ang*Math.PI)/180);
        if((i=colisao(p1,blocks))!=-1){
            movel.x=x;
            movel.x+=dist(movel.x,movel.larg,blocks[i].x,1);
        }
        movel.y+= movel.vel*Math.sin((movel.ang*Math.PI)/180);
        if((i=colisao(p1,blocks))!=-1){
            movel.y=y;
            movel.y+=dist(movel.y,movel.alt,blocks[i].y,1);
        }
    }

    return movel;
}

function colisao(movel,obj_lista){
    return obj_lista.findIndex((o) => 
        ((movel.x>o.x&&movel.x<o.x+1)
            ||
        (movel.x+(movel.larg/32)>o.x&&movel.x+(movel.larg/32)<o.x+1)
        )
        &&
        ((movel.y>o.y&&movel.y<o.y+1)
            ||
        (movel.y+(movel.alt/32)>o.y&&movel.y+(movel.alt/32)<o.y+1)
        )
    );
}
function colisao_ponto(movel,obj_lista){
    let num = obj_lista.findIndex((a) => 
        (movel.x>a.x&&movel.x<a.x+1)
        &&
        (movel.y>a.y&&movel.y<a.y+1)
    );
    if(num==-1)return false;
    return true;
}
function dist(x1,l1,x2,l2){
    return x2+l2*Number(x2<x1)-(x1+(l1/32)*Number(x2>=x1))
}

function rayCasting(){
    let i=0;
    let partition=Math.ceil(1000/fov);
    for(let angle = p1.ang-fov/2; angle<p1.ang+fov/2; angle++){
        Draw_lines(rayCast(angle),partition,i);
        i++;
    }

}
function rayCast(ang){
    let ray = new theRay(p1.x+(p1.larg/64),p1.y+(p1.alt)/64,ang);

    context.fillStyle="green";
    while(!colisao_ponto(ray,blocks)){
        ray.x += ray.vel*Math.cos((ray.ang*Math.PI)/180);
        ray.y += ray.vel*Math.sin((ray.ang*Math.PI)/180);
        context.fillRect(ray.x*32,ray.y*32,1,1);
    }
    //return Math.sqrt(Math.pow(ray.x-p1.x,2)+Math.pow(ray.y-p1.y,2));
    return Math.cos(((p1.ang-ray.ang)*Math.PI)/180)*Math.sqrt(Math.pow(ray.x-p1.x,2)+Math.pow(ray.y-p1.y,2));
}

function Draw_lines(dist,Llenght,i){
    let cor = 255/(dist);
    if(cor>200)cor=200;
    if(cor<0)cor=0;
    context.fillStyle="rgb(0,"+cor+",0)"
    context.fillRect(movTela+i*Llenght,h_border/2-(h_border/(dist*2)),Llenght,(h_border/dist));

}
function skyground(){
    context.fillStyle="rgb(0,30,50)";
    context.fillRect(movTela,h_border/2,1000,movTela/2);
    context.fillStyle="rgb(50,0,100)";
    context.fillRect(movTela,0,1000,movTela/2);
}