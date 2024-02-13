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

function enemigos(array){
    array.push(new Enemy(4.5,5,0.5,"imgs/guy.png"))
    array.push(new Enemy(6,5,0.5,"imgs/guy.png"))
    array.push(new Enemy(4.5,7,0.5,"imgs/guy.png"))
    array.push(new Enemy(8,8,0.5,"imgs/guy.png"))
    array.push(new Enemy(14,8.5,0.5,"imgs/guy.png"))
    array.push(new Enemy(12.5,5.4,0.5,"imgs/guy.png"))
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
    if(item[0] instanceof Player ||item[0] instanceof Particle || item[0] instanceof Enemy){
        if(item[0] instanceof Player)
            context.fillStyle = "pink";
        else if(item[0] instanceof Particle)
            context.fillStyle = "yellow";
        else if(item[0] instanceof Enemy)
            context.fillStyle = "red";

        for(let i = 0; i < item.length;i++){
            context.fillStyle = item[i].cor;
            context.fillRect(item[i].x*RESIZE,item[i].y*RESIZE,item[i].larg*RESIZE,item[i].larg*RESIZE);
        }
    }
    else if(item[0] instanceof obj){
        context.fillStyle="brown";
        for(let i = 0; i < item.length;i++){
            context.fillRect(item[i].x*RESIZE,item[i].y*RESIZE,RESIZE,RESIZE);

        }
    }
}

function clear(){
    context.fillStyle="white";
    context.fillRect(0,0,w_border,h_border);
}

function drawdir(array){
    array.forEach( p => {
        context.beginPath();
        context.strokeStyle = "rgb(44, 222, 92)";
        context.lineWidth = 1;
        context.moveTo( (p.x+p.larg/2)*RESIZE, (p.y+p.larg/2)*RESIZE);
        context.lineTo((p.x+p.larg/2)*RESIZE+Math.cos(p.ang)*30,(p.y+p.larg/2)*RESIZE+Math.sin(p.ang)*30);
        context.stroke();
    });
}

function particlemov(particles){
    particles.forEach( (item,index) => {
        x = item.x;
        y = item.y;

        item.x += item.vel*Math.cos(item.ang);

        if((i=colisao(item,blocks))!=-1){
            particles.splice(index,1)
        }
        else if((i=colisao_entidade(item,entidades.player))!=-1){   
            entidades.player.splice(i,1)
        }
        else if((i=colisao_entidade(item,entidades.enemy))!=-1){   
            entidades.enemy.splice(i,1)
        }
        
        item.y += item.vel*Math.sin(item.ang);

        if((i=colisao(item,blocks))!=-1){
            particles.splice(index,1)
        }
        else if((i=colisao_entidade(item,entidades.player))!=-1){
            entidades.player.splice(i,1)
        }
        else if((i=colisao_entidade(item,entidades.enemy))!=-1){   
            entidades.enemy.splice(i,1)
        }
    })
}

function movimento(movel, up, left, down, right,shoot){
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
        else if((i=colisao_entidade(movel,entidades.player))!=-1){   
            movel.x = x;
            movel.x += dist(movel.x, movel.larg, entidades.player[i].x, entidades.player[i].larg);
        }
        else if((i=colisao_entidade(movel,entidades.enemy))!=-1){   
            movel.x = x;
            movel.x += dist(movel.x, movel.larg, entidades.enemy[i].x, entidades.enemy[i].larg);
        }
        
        movel.y += movel.vel*Math.sin(movel.ang);
        if((i=colisao(movel,blocks))!=-1){
            movel.y = y;
            movel.y += dist(movel.y, movel.larg, blocks[i].y, 1);
        }
        else if((i=colisao_entidade(movel,entidades.player))!=-1){
            movel.y = y;
            movel.y += dist(movel.y, movel.larg, entidades.player[i].y, entidades.player[i].larg);
        }
        else if((i=colisao_entidade(movel,entidades.enemy))!=-1){   
            movel.x = x;
            movel.x += dist(movel.x, movel.larg, entidades.enemy[i].x, entidades.enemy[i].larg);
        }
    }

    if(teclado[down]){
        movel.x-= movel.vel*Math.cos(movel.ang);

        if((i=colisao(movel,blocks))!=-1){
            movel.x=x;
            movel.x += dist(movel.x, movel.larg, blocks[i].x, 1);
        }
        if((i=colisao_entidade(movel,entidades.player))!=-1){   
            movel.x = x;
            movel.x += dist(movel.x, movel.larg, entidades.player[i].x, entidades.player[i].larg);
        }

        movel.y-= movel.vel*Math.sin(movel.ang);
        if((i=colisao(movel,blocks))!=-1){
            movel.y = y;
            movel.y += dist(movel.y, movel.larg, blocks[i].y, 1);
        }
        if((i=colisao_entidade(movel,entidades.player))!=-1){
            movel.y = y;
            movel.y += dist(movel.y, movel.larg, entidades.player[i].y, entidades.player[i].larg);
        }
    }

    if(teclado[shoot]){
        if(!movel.atirou){
            new Particle(movel.x+movel.larg/2+Math.cos(movel.ang)*movel.larg-0.2/2, movel.y+movel.larg/2+Math.sin(movel.ang)*movel.larg-0.2/2, 0.1, movel.ang, "imgs/tiro.bmp")
            movel.atirou=true;
            setTimeout( () => movel.atirou = false, 500);
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