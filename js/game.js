const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const Game = {
    logicboard: [],
    init: function(){

    },
    animate: function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player.draw();
        a1.location[0] +=1;
        a1.draw();
        window.requestAnimationFrame(Game.animate);
    },
    populateBoard: function (){

    },
    updateBoard: function (){

    }
}

function alien1(){
    this.location = [300,300];
    this.logic1 = [
    [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,0,0,1,1,0,0,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,0,0,1,1,1,0,0,0],
    [0,0,1,1,0,0,1,1,0,0,1,1,0,0],
    [0,0,0,1,1,0,0,0,0,1,1,0,0,0]
    ]

    this.logic2 = [
    [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,0,0,1,1,0,0,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,0,0,1,1,1,0,0,0],
    [0,0,0,1,1,0,1,1,0,1,1,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,1,1,0]
    ]
    this.draw = (location) => {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.rect(this.location[0],this.location[1], 25,25);

        ctx.fill();
        ctx.closePath();
    }

    this.shot = function(){
        console.log('exploded!')
    }
}

function alien2(){
    this.logic1 = [
        [0,0,0,1,0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,0,0,0,0],
        [0,0,1,1,0,1,1,1,0,1,1,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,0,1,1,1,1,1,1,1,0,1,0,0],
        [0,1,0,1,0,0,0,0,0,1,0,1,0,0],
        [0,0,0,0,1,1,0,1,1,0,0,0,0,0],
    ]
    this.logic2 = [
        [0,0,0,1,0,0,0,0,0,1,0,0,0,0],
        [0,1,0,0,1,0,0,0,1,0,0,1,0,0],
        [0,1,0,1,1,1,1,1,1,1,0,1,0,0],
        [0,1,1,1,0,1,1,1,0,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,0,1,0,0,0,0,0,1,0,0,0,0],
        [0,0,1,0,0,0,0,0,0,0,1,0,0,0]
    ]
}

function alien3(){
    this.logic1 = [
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
        [0,0,0,1,1,0,1,1,0,1,1,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,1,1,0,1,0,0,0,0],
        [0,0,0,1,0,1,0,0,1,0,1,0,0,0]
    ]
    this.logic2 = [
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
        [0,0,0,1,1,0,1,1,0,1,1,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,0,0,1,0,1,1,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,1,0,0,0],
        [0,0,0,0,1,0,0,0,0,1,0,0,0,0]
    ]
}
function defender(){
    this.location = canvas.width/2;

    this.draw = function(){
        ctx.clearRect(0,579,600,21);
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.rect(this.location,580,75,20);
        ctx.fill();
        ctx.closePath();
    };

    this.move = function(key){
        switch (key) {
            case 'ArrowLeft':
                this.location -= 10;
            break;

            case 'ArrowRight':
                this.location += 10;
            break;
        }
    }
    this.shoot = () => {
        alert('fire!');
    }
}

function bullet(){

    this.fire = function(){

    }
}

document.addEventListener('keydown',(e) =>{
    let key = e.key;

    if (key === 'ArrowLeft' || key === 'ArrowRight'|| key === ' '){
        if(key === ' '){
            player.shoot();
        }else player.move(key);
    }

})

function drawAlien(){
    if (counter == 25){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        renderAlien(a1, startLocation, 72, 3, 'orange');
        renderAlien(a2, startLocation, 36, 3, 'green');
        renderAlien(a3, startLocation, 0, 3, 'blue');

        if(startLocation >= 500){moveDirection = 0}
        if(startLocation <= 0)(moveDirection =1)
        if(moveDirection){startLocation += 8}
        else{startLocation -= 8};
    }
    player.draw();
    counter++;
    window.requestAnimationFrame(drawAlien);
}

function renderAlien(alien, locx, locy, pixel, color){
    ctx.beginPath();
    for(let i = 0; i < 8; i++){
        for (let j = 0; j < 14; j++){
            if(animationState){
                if(alien.logic1[i][j]){
                    ctx.rect(locx, locy, pixel,pixel);
                }
            }else{
                if(alien.logic2[i][j]){
                    ctx.rect(locx, locy, pixel,pixel);
                }               
            }
            locx +=pixel;
        }
        locy += pixel;
        locx = startLocation;
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    animationState  = !animationState;
    counter = -1;
}

var moveDirection = 1;
var a1 = new alien1();
var a2 = new alien2();
var a3 = new alien3();
let animationState = 1;
let startLocation = 0;
let counter = 0;

const player = new defender 
window.requestAnimationFrame(drawAlien);