const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var invaderSprites = new Image();
var defenderSprite = new Image();
invaderSprites.src = "images/aliens.png";
defenderSprite.src = "images/ship.png";

const Game = {
    logicboard: [],
    pixelSize: 3,
    gridWidth: Math.floor(canvas.width/3),
    gridHeight: Math.floor(canvas.height/3),
    playState: true,
    hashkey: (p) => {
        let hash = p.y* Game.gridWidth + p.x;
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

    collisionHandler: function(){
        //check each alien if it has collided with a bullet. Check each barrier. Check player for bullet collisions
        horde.checkCollision();
    }
}
function alien(alienType, x, y){
    this.alienType = alienType;
    this.location = new Point(x,y);
    this.size = [14,8];
    this.destroyed = false;
    if (alienType === 1){
        this.color = 'orange';
        this.logic = [
            [
                [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
                [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
                [0,1,1,1,0,0,1,1,0,0,1,1,1,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
                [0,0,0,1,1,1,0,0,1,1,1,0,0,0],
                [0,0,1,1,0,0,1,1,0,0,1,1,0,0],
                [0,0,0,1,1,0,0,0,0,1,1,0,0,0]
            ],
        
            [
                [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
                [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
                [0,1,1,1,0,0,1,1,0,0,1,1,1,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
                [0,0,0,1,1,1,0,0,1,1,1,0,0,0],
                [0,0,0,1,1,0,1,1,0,1,1,0,0,0],
                [0,1,1,0,0,0,0,0,0,0,0,1,1,0]
            ]
        ]
    }else if(alienType === 2){
        this.color = 'green';
        this.logic = [
            [
                [0,0,0,1,0,0,0,0,0,1,0,0,0,0],
                [0,0,0,0,1,0,0,0,1,0,0,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,0,0,0,0],
                [0,0,1,1,0,1,1,1,0,1,1,0,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,0,0],
                [0,1,0,1,1,1,1,1,1,1,0,1,0,0],
                [0,1,0,1,0,0,0,0,0,1,0,1,0,0],
                [0,0,0,0,1,1,0,1,1,0,0,0,0,0],
            ],
            [
                [0,0,0,1,0,0,0,0,0,1,0,0,0,0],
                [0,1,0,0,1,0,0,0,1,0,0,1,0,0],
                [0,1,0,1,1,1,1,1,1,1,0,1,0,0],
                [0,1,1,1,0,1,1,1,0,1,1,1,0,0],
                [0,1,1,1,1,1,1,1,1,1,1,1,0,0],
                [0,0,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,1,0,0,0,0],
                [0,0,1,0,0,0,0,0,0,0,1,0,0,0]
            ]
        ]
    }else{
        this.color = 'blue';
        this.logic = [
            [
                [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
                [0,0,0,1,1,0,1,1,0,1,1,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,0,0,0,1,0,0,1,0,0,0,0,0],
                [0,0,0,0,1,0,1,1,0,1,0,0,0,0],
                [0,0,0,1,0,1,0,0,1,0,1,0,0,0]
            ],
            [
                [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
                [0,0,0,1,1,0,1,1,0,1,1,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,0,0,1,0,1,1,0,1,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,0,1,0,0,0,0,1,0,0,0,0]
            ]
        ]
    }
    this.withinHitbox = function(obj){
        if(!this.destroyed){
            if(obj.location.x >= this.location.x && obj.location.x <= this.location.x + (this.size[0]*Game.pixelSize)){
                if(obj.location.y >= this.location.y && obj.location.y <= this.location.y + (this.size[1]*Game.pixelSize)){
                    return true;
                }
            }
        }
    }

}

const horde = {
    aliens: [[],[],[],[],[]],
    movementdirection: 1,
    animationState: 1,
    bottom: 0,
    sideSpacing: 15 * Game.pixelSize,
    topSpacing: 14 * Game.pixelSize,
    location: new Point(0,50),
    
    populate: function(){
        for(let i = 1; i <= 10; i++) {
            this.aliens[0].push(new alien(3, this.location.x + (this.sideSpacing * i), this.location.y));
            this.aliens[1].push(new alien(2, this.location.x + (this.sideSpacing * i) , this.location.y + (this.topSpacing)));
            this.aliens[2].push(new alien(2, this.location.x + (this.sideSpacing * i) , this.location.y + (2 * this.topSpacing)));
            this.aliens[3].push(new alien(1, this.location.x + (this.sideSpacing * i) , this.location.y + (3 * this.topSpacing)));
            this.aliens[4].push(new alien(1, this.location.x + (this.sideSpacing * i) , this.location.y + (4 * this.topSpacing)));
        }

        this.bottom = this.getLength() + this.location.y;   
    },
    draw: function(){
        this.aliens.forEach((row)=>{
            row.forEach((alien) => {
                if(!alien.destroyed){
                    renderShapeFromLogic(alien.logic[this.animationState], alien.location.x, alien.location.y, 3, alien.color);
                }
            })
        })
    },
    move: function(){
        if(this.getRight() >= canvas.width){this.movementdirection = 0}
        if(this.getLeft() <= 0){
            this.movementdirection = 1
        }
        this.animationState = this.animationState ? 0:1;
        
        if(this.aliens.length > 0){
            this.aliens.forEach((row)=>{
                row.forEach((alien) => {
                    if(alien.location !== null){
                        if(this.movementdirection){alien.location.x += 6}
                        else{alien.location.x -= 6};
                    }
                })
            })

            this.location.x = this.aliens[0][0].location.x;
            this.location.y = this.aliens[0][0].location.y;
        }
    },
    getRight: function(){
        let right = Math.max(...Array.from(this.aliens, a => a[a.length - 1].location.x));
        return right + horde.sideSpacing; 
    },
    getLength: function(){
        return 1 + this.aliens.length * this.topSpacing;
    },
    getLeft: function(){
        let left = Array.from(this.aliens, x => x[0].location.x)
        return Math.min(...left);
    },
    checkCollision: function(){
        //add a check to see if the bullet is within the bounds of the horde before checking each individual alien!
        for(let i = 0; i < this.aliens.length; i++){
            for(let j = 0; j < this.aliens[i].length; j++){
                if(this.aliens[i][j].withinHitbox(player.Bullet)){
                    if (this.aliens[i].length === 1) this.aliens.splice(i,1)
                    else this.aliens[i].splice(j,1);
                    this.bottom = this.getLength() + this.location.y;
                    player.Bullet.display = false;
                    player.Bullet.location.y = player.location.y
                    return;
                }
            }
        }
    }
}

function Point(x,y){
    this.x = x;
    this.y = y;

    this.convertToGrid = () => {
        return[this.x/Game.pixelSize, this.y/Game.pixelSize];
    }
}

horde.populate();


function ufo(){
    this.location = 0;
    this.size = [16,7];
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
    this.size = [13,8]
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
    this.Bullet = new bullet('player');

    this.shoot = () => {
        if(!this.Bullet.display){
            this.Bullet.display = true;
            this.Bullet.location.x = this.location + this.size[0]/2;
            this.Bullet.location.y = canvas.height - 25;            
        }

    }
    this.explode = () => {
        
    }
}

function bullet(shooter){
    this.type = shooter === 'player' ? 1 : 0;
    this.display = false;
    this.location = new Point(0,0);
    this.speed = 4 * Game.pixelSize;

    this.move = function(){
        if(this.type == 1){
            this.location.y -= this.speed;
        }else this.location.y += this.speed;
    }
    this.draw = () =>{
        ctx.beginPath();
        ctx.fillRect(this.location.x, this.location.y, Game.pixelSize, Game.pixelSize * 2);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
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
    if(player.Bullet.display){
        player.Bullet.move();
        player.Bullet.draw();
        if(player.Bullet.location.y < 0){
            player.Bullet.display = false;
        }
    }
    player.draw();   
    Game.collisionHandler();
    if(Game.playState){ 
        window.requestAnimationFrame(gameLoop);
    }
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
let counter = 0;

const player = new defender 
window.requestAnimationFrame(gameLoop);

//key listeners. Checks for keyup/keydown to smooth out player animations.
document.addEventListener('keydown',(e) =>{
    let key = e.key;

    if (Game.playState && key === 'ArrowLeft' || key === 'ArrowRight'|| key === ' ' || key === 'ArrowUp'){
        e.preventDefault();
        if(key === ' ' || key === 'ArrowUp'){
            player.shoot();
        }else player.keyPressed = key;
    }

    //pauses the game. 
    if(key ==='p') {
        if(!Game.playState)window.requestAnimationFrame(gameLoop);
        Game.playState = !Game.playState;
    }
})
document.addEventListener('keyup', (e) => {
    let key = e.key;

    if(key === 'ArrowLeft' || key === 'ArrowRight'){
        player.keyPressed = null;
    }
})