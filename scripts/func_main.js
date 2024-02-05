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

function SetImage(img, endereco){
    img.onload = function() {
        img.width= this.width;
        img.height= this.height;
    };
    img.src = endereco;
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
    teclado["ArrowUp"]=false;
    teclado["ArrowDown"]=false;
    teclado["ArrowRight"]=false;
    teclado["ArrowLeft"]=false;
}

function drawInGrid(item){
    if(!(item instanceof player)){
        context.fillStyle="brown";
        for(let i = 0; i < item.length;i++){
            context.fillRect(item[i].x*RESIZE,item[i].y*RESIZE,RESIZE,RESIZE);

        }
    }
    else{
        context.fillStyle = item.cor;
        context.fillRect(item.x*RESIZE,item.y*RESIZE,item.larg*RESIZE,item.larg*RESIZE);
    }

}

function clear(){
    context.fillStyle="white";
    context.fillRect(0,0,w_border,h_border);
}

function drawdir(p){
        context.beginPath();
        context.strokeStyle = "rgb(44, 222, 92)";
        context.lineWidth = 1;
        context.moveTo( (p.x+p.larg/2)*RESIZE, (p.y+p.larg/2)*RESIZE);
        context.lineTo((p.x+p.larg/2)*RESIZE+Math.cos(p.ang)*30,(p.y+p.larg/2)*RESIZE+Math.sin(p.ang)*30);
        context.stroke();
}


function movimento(movel, up, left, down, right){
    let x=movel.x;
    let y=movel.y;
    
    if(teclado[left]){
        movel.ang-=movel.torque;

        if(movel.ang<0) movel.ang += Math.PI*2;
    }

    if(teclado[right]){
        movel.ang+=movel.torque;

        if(movel.ang>=Math.PI*2) movel.ang = movel.ang % (Math.PI*2);
    }
    
    if(teclado[up]){
        movel.x += movel.vel*Math.cos(movel.ang);

        if((i=colisao(movel,blocks))!=-1){
            movel.x = x;
            movel.x += dist(movel.x, movel.larg, blocks[i].x, 1);
        }
        movel.y += movel.vel*Math.sin(movel.ang);
        if((i=colisao(movel,blocks))!=-1){
            movel.y = y;
            movel.y += dist(movel.y, movel.larg, blocks[i].y, 1);
        }
    }

    if(teclado[down]){
        movel.x-= movel.vel*Math.cos(movel.ang);

        if((i=colisao(movel,blocks))!=-1){
            movel.x=x;
            movel.x += dist(movel.x, movel.larg, blocks[i].x, 1);
        }
        movel.y-= movel.vel*Math.sin(movel.ang);
        if((i=colisao(movel,blocks))!=-1){
            movel.y = y;
            movel.y += dist(movel.y, movel.larg, blocks[i].y, 1);
        }

    }

    /*
           if(teclado[up]&&movel.vel<MAXVEL){
        movel.vel += movel.ace;

    }

    if(teclado[down]&&movel.vel>-MAXVEL){
        movel.vel-= movel.ace;
    }

    movel.x += movel.vel*Math.cos(movel.ang);

    if((i=colisao(movel,blocks))!=-1){
        movel.x = x;
        //movel.x += dist(movel.x, movel.larg, blocks[i].x, 1);
    }
    movel.y += movel.vel*Math.sin(movel.ang);
    
    if((i=colisao(movel,blocks))!=-1){
        movel.y = y;
        //movel.y += dist(movel.y, movel.larg, blocks[i].y, 1);
    }

    if(movel.vel>0)
       movel.vel -= movel.ace/3
    else if(movel.vel<0)
       movel.vel += movel.ace/3
    */
}