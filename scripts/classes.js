class obj{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

class entity extends obj{
    constructor(x,y,larg,ang,cor,img, lista){
        super(x,y);
        this.larg=larg;
        this.cor=cor;
        this.ang=ang;

        this.img = new Image();
        SetImage(this.img, img);

        switch(lista){
            case 0: entidades.player.push(this); this.vel = 0.1; break;
            case 1: entidades.enemy.push(this); this.vel = 0.1; break;
            case 2: entidades.particle.push(this);this.vel = 0.3; break;
        }
    }
    torque = 2*A;
    ace = 0.001;
    atirou = false;
}


class Ray extends obj{
    constructor(x, y){
        super(x,y)
    }
    dist = 0;
    pos = 0;
}

class Sprite{
    constructor(larg,img,dist,ang){
        this.larg = larg;
        this.img = img;
        this.dist = dist;
        this.ang = ang;

    }
}