
function rayCasting(p){
    let i=0;
    let partition=Math.ceil(1000/fov);
    for(let angle = p.ang-fov/2; angle<p.ang+fov/2; angle++){

        Draw_lines(rayCast(angle, p),p,partition,i);
        i++;
    }
}

function rayCast(ang, p){

    let ray = new obj(p.x+(p.larg/2),p.y+(p.alt)/2);
    let ray1 = new obj(0,0);
    let ray2 = new obj(0,0);
    let dir = [1,1];
    let sobra = [ (Math.trunc(ray.x)+1)-ray.x, (Math.trunc(ray.y)+1)-ray.y]

    if(ang>=360)ang=ang%360;//ajustes sobre o angulo de entrada
    else if(ang<0)ang+=360;
    if(ang==0||ang==90||ang==180||ang==270)ang+=0.1;

    if(ang>90&&ang<270){//ajustes de direção
        dir[0] = -1;
        sobra[0] = ray.x-Math.trunc(ray.x);
        ray1.x = Math.trunc(ray.x); }
    else{
        sobra[0] = Math.trunc(ray.x)+1-ray.x;
        ray1.x = ray.x+sobra[0]; }

    if(ang>=180){ //ajustes de direção
        dir[1] = -1;
        sobra[1] = ray.y-Math.trunc(ray.y);
        ray2.y = Math.trunc(ray.y); }
    else{
        sobra[1] = Math.trunc(ray.y)+1-ray.y;
        ray2.y = Math.trunc(ray.y)+1; }

//raio 1 lançado
    ray1.y = ray.y + dir[0]*sobra[0]*Math.tan(ang*Math.PI/180);
    for(;!(colisao_ponto(ray1,blocks)||ray1.x>20||ray1.x<0||ray1.y>20||ray1.y<0);){
        ray1.x += dir[0];
        ray1.y += dir[0]*Math.tan(ang*Math.PI/180)
}
//raio 2 lançado
    ray2.x = ray.x + dir[1]*sobra[1]/Math.tan(ang*Math.PI/180);
    for(;!(colisao_ponto(ray2,blocks)||ray2.x>16||ray2.x<0||ray2.y>16||ray2.y<0);){
        ray2.x += dir[1]/Math.tan(ang*Math.PI/180)
        ray2.y += dir[1];
    }
    //context.fillStyle="rgb(0,0,0)"
    //context.fillRect(ray1.x*RESIZE,ray1.y*RESIZE,5,5);
    //context.fillStyle="rgb(0,255,0)"
    //context.fillRect(ray2.x*RESIZE,ray2.y*RESIZE,5,5);

    if(distance(ray.x,ray.y,ray1.x,ray1.y) < distance(ray.x,ray.y,ray2.x,ray2.y)){
        //draw_ray(ray1, p)
        return ray1
    }
    else{
        //draw_ray(ray2, p)
        return ray2
    }

}

function Draw_lines(ray,p,Llenght,i){
    let dist = distance(p.x+p.larg/2, p.y+p.alt/2, ray.x,ray.y);
    //let dist = (ray.x - p.x+p.larg/64) * Math.cos(p.ang*Math.PI/180) + (ray.y - p.y+p.alt/64) * Math.sin(p.ang*Math.PI/180);
    let cor = 255/(dist);
    if(cor>200)cor=200;
    if(cor<0)cor=0;
    context.fillStyle="rgb("+ (ray.x*16) +"," + cor +","+ (ray.y*16) +")"
    context.fillRect(movTelaX+i*Llenght,movTelaY+ h_border/2-(h_border/(dist*2)),Llenght,(h_border/dist));
}

function skyground(){
    context.fillStyle="rgb(0,30,50)";
    context.fillRect(movTelaX, movTelaY + h_border/2, 1080, h_border/2);
    context.fillStyle="rgb(50,0,100)";
    context.fillRect(movTelaX, movTelaY, 1080, h_border/2);
}

function draw_ray(ray, p){
    context.beginPath();
    context.strokeStyle = "green";
    context.lineWidth = 1;
    context.moveTo((p.x+p.larg/2)*RESIZE, (p.y+p.alt/2)*RESIZE);
    context.lineTo(ray.x*RESIZE,ray.y*RESIZE);
    context.stroke();
}