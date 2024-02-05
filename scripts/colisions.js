function colisao(movel,obj_lista){
    return obj_lista.findIndex((o) => colisao_area(movel, movel.larg, o, 1) );
}

function colisao_area(p1,l1,p2,l2){
        return p1.x < p2.x+l2 && p1.x+l1 > p2.x && p1.y < p2.y+l2 && p1.y+l1 > p2.y
}

function colisao_ponto(movel,obj_lista){
    let num = obj_lista.findIndex((a) => 
        (movel.x>=a.x&&movel.x<=a.x+1)
        &&
        (movel.y>=a.y&&movel.y<=a.y+1)
    );
    if(num==-1)return false;
    return true;
}

function dist(x1,l1,x2,l2){
    return x2+l2*Number(x2<x1)-(x1+(l1)*Number(x2>=x1))
}

function distance(x0,y0,x,y){
    return Math.sqrt( Math.pow(x0-x, 2) + Math.pow(y0-y, 2) )
}
