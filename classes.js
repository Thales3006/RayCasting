class obj{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}
class player extends obj{
    constructor(x,y,larg,alt){
        super(x,y);
        this.larg=larg;
        this.alt=alt;
    }
    ang=0;
    torque=2;
    vel=0.1;
}

class theRay extends obj{
    constructor(x,y,ang){
        super(x,y);
        this.ang=ang;
    }
    vel=0.1;
}