const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const Game = {

}

function alien(alienType){
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.rect(300,300, 25,25);

    ctx.fill();
    ctx.closePath();
    this.shot = function(){
        console.log('exploded!')
    }
}

function defender(){
    this.draw = function(location){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.rect(location,580,75,20);
        ctx.fill();
        ctx.closePath();
    }

    this.move = function(input){

    }
}

function bullet(){

}

a1 = new alien(1);
d = new defender

d.draw(200);