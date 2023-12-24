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
        context.fillRect(array[i].x*RESIZE,array[i].y*RESIZE,RESIZE,RESIZE);

    }
}

function draw(coisa){
    context.fillStyle = coisa.cor;
    context.fillRect(coisa.x*RESIZE,coisa.y*RESIZE,coisa.larg*RESIZE,coisa.alt*RESIZE);
}

function clear(){
    context.fillStyle="white";
    context.fillRect(0,0,w_border,h_border);
}

function drawdir(p){
    context.fillStyle="red"
    context.fillRect(
        (p.x+p.larg/2-5/RESIZE)*RESIZE+Math.cos((p.ang*Math.PI)/180)*15,
        (p.y+p.alt/2-5/RESIZE)*RESIZE+Math.sin((p.ang*Math.PI)/180)*15,
        10,10);
        context.fillStyle="pink"
        context.fillRect(
            (p.x+p.larg/2)*RESIZE+Math.cos((p.ang*Math.PI)/180)*30,
            (p.y+p.alt/2)*RESIZE+Math.sin((p.ang*Math.PI)/180)*30,
            1,1);
}

function movimento(movel){
    let x=movel.x;
    let y=movel.y;
    
    if(teclado["a"]||teclado["A"]){
        movel.ang-=movel.torque;
        if(movel.ang<0)movel.ang+=360;
    }
    if(teclado["d"]||teclado["D"]){
        movel.ang+=movel.torque;
        if(movel.ang>=360)movel.ang=movel.ang%360;
    }
    if(teclado["s"]||teclado["S"]){
        movel.x-= movel.vel*Math.cos((movel.ang*Math.PI)/180);
        if((i=colisao(movel,blocks))!=-1){
            movel.x=x;
            movel.x+=dist(movel.x,movel.larg,blocks[i].x,1);
        }
        movel.y-= movel.vel*Math.sin((movel.ang*Math.PI)/180);
        if((i=colisao(movel,blocks))!=-1){
            movel.y=y;
            movel.y+=dist(movel.y,movel.alt,blocks[i].y,1);
        }
    }
    if(teclado["w"]||teclado["W"]){
        movel.x+= movel.vel*Math.cos((movel.ang*Math.PI)/180);
        if((i=colisao(movel,blocks))!=-1){
            movel.x=x;
            movel.x+=dist(movel.x,movel.larg,blocks[i].x,1);
        }
        movel.y+= movel.vel*Math.sin((movel.ang*Math.PI)/180);
        if((i=colisao(movel,blocks))!=-1){
            movel.y=y;
            movel.y+=dist(movel.y,movel.alt,blocks[i].y,1);
        }
    }
}