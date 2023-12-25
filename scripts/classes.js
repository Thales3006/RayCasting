class obj{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

class player extends obj{
    constructor(x,y,larg,alt,cor){
        super(x,y);
        this.larg=larg/32;
        this.alt=alt/32;
        this.cor=cor;
    }
    ang = 0;
    torque = 2*A;
    vel = 0.1;
}

class block extends obj{
    constructor(x, y, texture){
        super(x,y);
        this.texture = texture;
    }
}