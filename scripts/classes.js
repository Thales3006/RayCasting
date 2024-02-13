class obj{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

class Player extends obj{
    constructor(x,y,larg,ang,cor,img){
        super(x,y);
        this.larg=larg;
        this.cor=cor;
        this.ang=ang;

        this.img = new Image();
        SetImage(this.img, img);

        entidades.player.push(this);
    }
    torque = 2*A;
    vel = 0.1;
    atirou = false;
}

class Particle extends obj{
    constructor(x,y,larg,ang,cor,img){
        super(x,y);
        this.larg=larg;
        this.cor=cor;
        this.ang=ang;

        this.img = new Image();
        SetImage(this.img, img);

        entidades.particle.push(this);
    }
    torque = 2*A;
    vel = 0.3;
}

class Enemy extends obj{
    constructor(x,y,larg,ang,cor,img){
        super(x,y);
        this.larg=larg;
        this.cor=cor;
        this.ang=ang;

        this.img = new Image();
        SetImage(this.img, img);

        entidades.enemy.push(this);
    }
    torque = 2*A;
    vel = 0.1;
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