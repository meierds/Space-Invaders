const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var invaderSprites = new Image();
var defenderSprite = new Image();
invaderSprites.src = "images/aliens.png";
defenderSprite.src = "images/ship.png";

const Game = {
    logicboard: [],
    hashkey: (p) => {
        let hash = p.y* Game.columns + p.x;
        return hash;
    },
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

function ufo(){
    this.location = 0;
    this.direction = 0;
    this.draw = function(){
        renderShapeFromLogic(alienShip.logic,alienShip.location,0,3,'red');
    }
    this.move = function(){
        ctx.clearRect(0, 0, canvas.width, 21);
        if(this.direction) this.location -= 3;
        else this.location += 3;
        if(this.location >= 950) this.direction = 1;
        if(this.location <= 10) this.direction = 0;
    }
    this.logic = [
        [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0]
    ]
}
function defender(){
    this.logic = [
        [0,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
    
    this.location = canvas.width/2;
    this.image = defenderSprite;
    this.keyPressed = null;

    this.draw = function(){
        ctx.clearRect(0,canvas.height - 25, canvas.width, 25);
        ctx.drawImage(this.image,this.location, canvas.height - 25,39,24);
    };

    this.move = function(key){
        switch (key) {
            case 'ArrowLeft':
                this.location -= 5;
            break;

            case 'ArrowRight':
                this.location += 5;
            break;
            default:
        }
    }
    this.shoot = () => {
        console.log('fire!');
    }
    this.explode = () => {
        
    }
}

function bullet(shooter, x, y){
    this.type = shooter === 'player' ? 1 : 0;

    this.location = y;
    this.x = x;
    
    this.move = function(){
        
    }
}



function gameLoop(){
    counter++;
    ctx.clearRect(0,0,canvas.width, canvas.height)
    if (counter == 15){
        horde.move();
        counter = 0;
    }
    alienShip.move();
    horde.draw();
    alienShip.draw();
    if(player.keyPressed){
        player.move(player.keyPressed);
    }

    player.draw();    
    window.requestAnimationFrame(gameLoop);
}

function renderShapeFromLogic(logicGrid, locx, locy, pixelSize, color){
    let start = locx;

    ctx.beginPath();
    for(let i = 0; i < logicGrid.length; i++){
        for(let j = 0; j < logicGrid[0].length; j++){
            if(logicGrid[i][j]){
                ctx.rect(locx,locy,pixelSize,pixelSize);
            }
            locx += pixelSize;
        }
    locy += pixelSize;
    locx = start;
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

}

var moveDirection = 1;

var alienShip = new ufo();
let animationState = 1;
let startLocation = 0;
let counter = 0;

const player = new defender 
window.requestAnimationFrame(gameLoop);

//key listeners. Checks for keyup/keydown to smooth out player animations.
document.addEventListener('keydown',(e) =>{
    let key = e.key;

    if (key === 'ArrowLeft' || key === 'ArrowRight'|| key === ' '){
        if(key === ' '){
            player.shoot();
        }else player.keyPressed = key;
    }

})
document.addEventListener('keyup', (e) => {
    let key = e.key;

    if(key === 'ArrowLeft' || key === 'ArrowRight'){
        player.keyPressed = null;
    }
})