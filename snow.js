var $id = function(id){
    return document.getElementById(id);
}
var canvas;
var g;

var objectList;
var probability;
var TICK=1000/30;

var Ball = function(sx,sy){
    var x = sx;
    var y = sy;

    var speed = Math.floor(Math.random() * 5)+1;
    var swing = Math.floor(Math.random() * 3)+1;
    var r = Math.floor(Math.random() * 5)+1;

    this.move = function(){
        g.beginPath();
        g.fillStyle = "white";
        g.arc(x,y,r,0,Math.PI*2,false);
        g.fill();

        x = x + Math.sin((y + speed) * Math.PI/180)*swing;
        y = y + speed;

        if(y - r > canvas.height){
            return false;
        }
        return true;
    }
}

function addObject(obj){
    for(var i=0;i<objectList.length+1;i++){
        if(objectList[i] == null){
            objectList[i] = obj;
            break;
        }
    }
}

function reset(){
    g.clearRect(0,0,canvas.width,canvas.height);
    probability = 0.9;
    objectList=[];

}

function mainLoop(){
    g.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<objectList.length;i++){
        var obj=objectList[i];
        if(obj && !obj.move()){
            delete objectList[i];
        }
    }

    if(Math.random() > probability){
        addObject(new Ball(Math.random() * canvas.width,0-Math.random() * 200));
    }

    setTimeout(mainLoop,TICK);
}

window.onload = function(){
    canvas =$id("canvas");
    g = canvas.getContext("2d");

    reset();
    mainLoop();
}