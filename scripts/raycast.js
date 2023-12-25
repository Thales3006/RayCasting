
function rayCasting(p, x, y, width, height, fov, res){
    let i=0;
    let vezes= width/res;
    let dif = fov/vezes;

    if(res<0)res=1;

    skyground(x, y, width, height);
    for(let angle = p.ang-fov/2; i < vezes; angle += dif, i++){

        Draw_lines(rayCast(angle, p), p, x, y, res, width, height, i);

    }
}

function rayCast(ang, p){

    let ray = new obj(p.x+(p.larg/2),p.y+(p.alt)/2);
    let ray1 = new obj(0,0);
    let ray2 = new obj(0,0);
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
        //sobra[0] = Math.floor(ray.x)+1-ray.x;
        ray1.x = ray.x+sobra[0]; 
    }

    if(ang >= Math.PI){ //ajustes de direção
        dir[1] = -1;
        sobra[1] = ray.y-Math.floor(ray.y);
        ray2.y = Math.floor(ray.y); 
    }
    else{
        //sobra[1] = Math.floor(ray.y)+1-ray.y;
        ray2.y = Math.floor(ray.y)+1; 
    }

//raio 1 lançado
    ray1.y = ray.y + dir[0]*sobra[0]*Math.tan(ang);
    for(;!(colisao_ponto(ray1,blocks)||ray1.x>20||ray1.x<0||ray1.y>20||ray1.y<0);){
        ray1.x += dir[0];
        ray1.y += dir[0]*Math.tan(ang)
}
//raio 2 lançado
    ray2.x = ray.x + dir[1]*sobra[1]/Math.tan(ang);
    for(;!(colisao_ponto(ray2,blocks)||ray2.x>16||ray2.x<0||ray2.y>16||ray2.y<0);){
        ray2.x += dir[1]/Math.tan(ang)
        ray2.y += dir[1];
    }

    if(distance(ray.x,ray.y,ray1.x,ray1.y) < distance(ray.x,ray.y,ray2.x,ray2.y)){
        //draw_ray(ray1, p)
        return ray1
    }
    else{
        //draw_ray(ray2, p)
        return ray2
    }

}

function Draw_lines(ray, p, x, y, Llenght, width, height, i){
    let sobra = 0;
    if( (i+1)*Llenght > width )sobra = (i+1)*Llenght - width;

    let dist = distance(p.x+p.larg/2, p.y+p.alt/2, ray.x,ray.y);
    //let dist = (ray.x - p.x+p.larg/2) * Math.cos(p.ang) + (ray.y - p.y+p.alt/2) * Math.sin(p.ang);
    let cor = 255/(dist);
    let tam = height / dist;
    let imgOffSet;
    if(ray.x-Math.floor(ray.x)==0){
        imgOffSet = ray.y-Math.floor(ray.y);
    }
    else{
        imgOffSet = ray.x-Math.floor(ray.x);
    }


    if(cor>200)cor=200;
    if(cor<0)cor=0;
    context.fillStyle="rgb("+ cor +"," + cor +","+ cor +")";

        //if(height > tam)
            context.drawImage(textura, Math.floor(imgOffSet*textura.width),0, res,textura.height, x+i*Llenght,y+ height/2-tam/2, Llenght-sobra,tam);
            //context.fillRect(x+i*Llenght, y+ height/2-tam/2, Llenght - sobra, tam);
        //else
            //context.drawImage(textura,   imgOffSet*w_img, h_img/2-dist*height/2,   w_img/100, dist*height,   x+i*Llenght, y,   Llenght - sobra, height);
            //context.fillRect(x+i*Llenght, y, Llenght - sobra, height); 
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
    context.moveTo((p.x+p.larg/2)*RESIZE, (p.y+p.alt/2)*RESIZE);
    context.lineTo(ray.x*RESIZE,ray.y*RESIZE);
    context.stroke();
}