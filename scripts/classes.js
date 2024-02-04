class obj{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

class player extends obj{
    constructor(x,y,larg,alt,cor,img){
        super(x,y);
        this.larg=larg/32;
        this.alt=alt/32;
        this.cor=cor;

        this.img = new Image();
        SetImage(this.img, img);

        entidades.player.push(this);
    }
    ang = 0;
    torque = 2*A;
    vel = 0.1;
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