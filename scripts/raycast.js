
function vision(p, entidade, x, y, width, height, fov, res){
    let lista = [];

    rayCasting(p, fov, width, res, lista);
    sprites(p, entidade.player, lista);
    sprites(p, entidade.particle, lista);
    sprites(p, entidade.enemy, lista);

    

    draw(lista, x, y, width, height, fov, res);

    //rayCasting(p, fov, width, res, lista);
}

function rayCasting(p, fov, width, res, lista){
    let i=0;
    let vezes= width/res;
    let dif = fov/vezes;

    if(res<0)res=1;

    for(let angle = p.ang-fov/2; i < vezes; angle += dif, i++){
        lista.push(rayCast(angle, p, i))
    }
}

function rayCast(ang, p, i){

    let ray = new Ray(p.x+(p.larg/2),p.y+(p.larg)/2);
    let ray1 = new Ray(0,0);
    let ray2 = new Ray(0,0);
    let dir = [1,1];
    let sobra = [ (Math.floor(ray.x)+1)-ray.x, (Math.floor(ray.y)+1)-ray.y]

    if(ang >= Math.PI*2) ang = ang % (Math.PI*2);//ajustes sobre o angulo de entrada
    else if(ang<0)ang+= Math.PI*2;

    if(ang > Math.PI/2 && ang < Math.PI*3/2){//ajustes de direção
        dir[0] = -1;
        sobra[0] = ray.x-Math.floor(ray.x);
        ray1.x = Math.floor(ray.x); 
    }
    else{
        ray1.x = ray.x+sobra[0]; 
    }

    if(ang >= Math.PI){ //ajustes de direção
        dir[1] = -1;
        sobra[1] = ray.y-Math.floor(ray.y);
        ray2.y = Math.floor(ray.y); 
    }
    else{
        ray2.y = Math.floor(ray.y)+1; 
    }
//raio 1 lançado
    ray1.y = ray.y + dir[0]*sobra[0]*Math.tan(ang);
    for(;!(colisao_ponto(ray1,blocks)||ray1.x>20||ray1.x<0||ray1.y>20||ray1.y<0);){
        ray1.x += dir[0];
        ray1.y += dir[0]*Math.tan(ang)
    }
    ray1.dist = distance(ray.x,ray.y,ray1.x,ray1.y)
//raio 2 lançado
    ray2.x = ray.x + dir[1]*sobra[1]/Math.tan(ang);
    for(;!(colisao_ponto(ray2,blocks)||ray2.x>16||ray2.x<0||ray2.y>16||ray2.y<0);){
        ray2.x += dir[1]/Math.tan(ang)
        ray2.y += dir[1];
    }
    ray2.dist = distance(ray.x,ray.y,ray2.x,ray2.y)

    if(ray1.dist < ray2.dist){
        //draw_ray(ray1, p)
        ray1.pos = i;
        return ray1
    }
    else{
        //draw_ray(ray2, p)
        ray2.pos = i;
        return ray2
    }

}

function draw(lista, x, y, width, height, fov, res){
    skyground(x, y, width, height);
    lista.sort((a,b) => b.dist - a.dist)

    let imgOffSet;
    let tam;

    lista.forEach(item => {
        tam = height/item.dist;

        if (item instanceof Ray){
            if(item.x==Math.floor(item.x)){
                imgOffSet = item.y - Math.floor(item.y);
            }
            else{
                imgOffSet = item.x - Math.floor(item.x);
            }
            context.drawImage(textura, Math.floor(imgOffSet*textura.width),0, res, textura.height, x + item.pos*res, y + height/2-tam/2, res,tam);
        }
        else{
            context.drawImage(item.img, 0,0, item.img.width,item.img.height, x + width/2+width*item.ang/fov - width/item.dist/4, y + height/2-tam/2, tam, tam);
        }

    });

}

function skyground(x, y, width, height){
    context.fillStyle="rgb(150, 117, 59)";//chao
    context.fillRect(x, y + height/2, width, height/2);

    context.fillStyle="rgb(79, 73, 70)";//ceu
    context.fillRect(x, y, width, height/2);
}

function draw_ray(ray, p){
    context.beginPath();
    context.strokeStyle = "green";
    context.lineWidth = 1;
    context.moveTo((p.x+p.larg/2)*RESIZE, (p.y+p.larg/2)*RESIZE);
    context.lineTo(ray.x*RESIZE,ray.y*RESIZE);
    context.stroke();
}

function sprites(p, entidade, lista){
    let x;
    let y;
    let dist;
    let ang;

    entidade.forEach(item => {
        if(p.x!=item.x||p.y!=item.y){
            x = ((item.x+item.larg/2) - (p.x+p.larg/2)) * Math.cos(-p.ang) - ((item.y+item.larg/2) - (p.y+p.larg/2)) * Math.sin(-p.ang);
            y = ((item.x+item.larg/2) - (p.x+p.larg/2)) * Math.sin(-p.ang) + ((item.y+item.larg/2) - (p.y+p.larg/2)) * Math.cos(-p.ang);
            dist = Math.sqrt(Math.pow(x,2)+Math.pow(y,2))

            ang = Math.atan2(y,x)

            lista.push(new Sprite(item.larg, item.img, dist, ang));
        }
    });
}

