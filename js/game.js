/*add to Game object: collision detection, remove from each  individual object. 
    add initialization conditions in an init function, remove global objects.
    add images to image handler
    remove hashkey/logic board
    (eventually) add in powerups?
*/

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var invaderSprites = new Image();
var defenderSprite = new Image();
invaderSprites.src = "images/aliens.png";
defenderSprite.src = "images/ship.png";
var explosionSprite = new Image();
explosionSprite.src = "images/explosions.png"


const Game = {
    logicboard: [],
    soundHandler: {
        explodeySound: new Audio("sounds/invaderkilled.wav"),
        gameplay: [new Audio("sounds/background1.wav"),new Audio("sounds/background2.wav"),new Audio("sounds/background3.wav"),new Audio("sounds/background4.wav")],
        shoot: new Audio("sounds/shoot.wav"),
        playerDeath: new Audio('sounds/player_death.wav'),
        backgroundCounter: 0,
        playBackground: function(){
            this.gameplay[this.backgroundCounter].play();
            this.backgroundCounter++;
            if(this.backgroundCounter === 4) this.backgroundCounter = 0;
        }
    },
    imgHandler: {
        bulletSprite: new Image()
    },
    counter: 0,
    pixelSize: 3,
    gridWidth: Math.floor(canvas.width/3),
    gridHeight: Math.floor(canvas.height/3),
    playState: true,
    explosionHandler: [],
    barriers: [new barrier(Math.floor((canvas.width - ((22 *  3) * 3))/ 3)), new barrier(this.barrierSpacing * 2), new barrier(this.barrierSpacing * 3)],

    init: function(){
        this.imgHandler.bulletSprite.src = "images/invader_bomb.png";
        let spacing = canvas.width/4 ;

        this.barriers.forEach((barrier, i) => {
            barrier.location.x = spacing * (i+ 1) - this.barriers[0].logic[0].length * this.pixelSize;
        })
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
        if(player.Bullet.location.y > Game.barriers[0].location.y){
            Game.barriers.forEach((barrier) => {
                if(this.withinHitbox(player.Bullet, barrier)){
                    if(barrier.destroy(player.Bullet.location.x, player.Bullet.location.y)) {
                        player.Bullet.display = false;
                        player.Bullet.location.y = -25;
                    }
                }
            })
        }
        if(!horde.checkCollision()){
            alienShip.checkCollision();
        }

        horde.bullets.forEach((bullet) =>{
            if(bullet.display && bullet.location.y > Game.barriers[0].location.y - 6){
                if(player.withinHitbox(bullet)){
                    this.playState = false;
                }
                
                this.barriers.forEach((barrier) => {
                    if(this.withinHitbox(bullet, barrier)){
                        if(barrier.destroy(bullet.location.x, bullet.location.y)) bullet.display = false;
                    }
                })
            }
        })
    },
    roll: function(chance){
        if(Math.random() > 1 - chance) return true;
        else return false;
    },
    randomDecisions: function(){
        if(alienShip.display === false){
            if(this.roll(.025)){
                alienShip.display = true;
                alienShip.location.x = 1;
            }
        }
        horde.bullets.forEach((bullet) => {
            if(bullet.display === false){
                if(this.roll(.12)) horde.shoot();
            }
        })
    },

    withinHitbox: function(obj1, obj2){
        if(obj1.location.x >= obj2.location.x && obj1.location.x <= obj2.location.x + (obj2.size[0]*Game.pixelSize)){
            if(obj1.location.y >= obj2.location.y && obj1.location.y <= obj2.location.y + (obj2.size[1]*Game.pixelSize)){
                return true;
            }
        }
        return false;
    }
    
}

Game.init();

function alien(alienType, x, y){
    this.alienType = alienType;
    this.location = new Point(x,y);
    this.size = [14,8];

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
        if(obj.location.x >= this.location.x && obj.location.x <= this.location.x + (this.size[0]*Game.pixelSize)){
            if(obj.location.y >= this.location.y && obj.location.y <= this.location.y + (this.size[1]*Game.pixelSize)){
                return true;
            }
        }
    }
    this.explode =  function(){
        let key = 0;
        switch (this.color){
            case 'orange':
                key = 4;
            break;
            case 'green':
                key = 2;
            break;
            case 'blue':
                key = 3;
            break;
            default:
                key = 0;
        }
        Game.explosionHandler.push(new explosion(key, this.location,this.size[0] *Game.pixelSize,this.size[1]* Game.pixelSize))
    }

}

const horde = {
    aliens: [],
    moveSpeed: 20,
    movementdirection: 1,
    directionFlag: false,
    moveDistance: Game.pixelSize * 4,
    animationState: 1,
    bottom: 0,
    sideSpacing: 14 * Game.pixelSize,
    topSpacing: 14 * Game.pixelSize,
    location: new Point(0,50),
    exlosion: [],

    populate: function(){
        this.aliens = [[],[],[],[],[]];
        this.location.x = 0;
        this.movementdirection = 1;
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
        //toggles the animationstate and movement direction when conditions are right.
        if((this.getRight() >= canvas.width || this.getLeft() <= 0) && !this.directionFlag) this.directionFlag = true;
        else this.directionFlag = false;

        this.animationState = this.animationState ? 0 : 1;
        
        if(this.aliens.length > 0){
            if(!this.directionFlag){
                this.aliens.forEach((row)=>{
                    row.forEach((alien) => {
                        if(this.movementdirection){alien.location.x += this.moveDistance}
                        else{alien.location.x -= this.moveDistance};
                    })
                })

                this.location.x = this.aliens[0][0].location.x;
                this.location.y = this.aliens[0][0].location.y;
            }else this.switchDirection();
        }
    },
    getRight: function(){
        let right = Math.max(...Array.from(this.aliens, a => a[a.length - 1].location.x));
        return right + horde.sideSpacing; 
    },
    getLength: function(){
        return this.aliens.length * this.topSpacing;
    },
    getLeft: function(){
        let left = Array.from(this.aliens, x => x[0].location.x)
        return Math.min(...left);
    },
    switchDirection: function(){
        this.aliens.forEach((row)=>{
            row.forEach((alien) => {
                alien.location.y += this.moveDistance*2;
            })
        })

        this.movementdirection = this.movementdirection ? 0 : 1;

        this.location.x = this.aliens[0][0].location.x;
        this.location.y = this.aliens[0][0].location.y;
    },
    checkCollision: function(){
        //add a check to see if the bullet is within the bounds of the horde before checking each individual alien!
        for(let i = 0; i < this.aliens.length; i++){
            for(let j = 0; j < this.aliens[i].length; j++){
                if(this.aliens[i][j].withinHitbox(player.Bullet)){
                    this.aliens[i][j].explode();
                    
                    if (this.aliens[i].length === 1) this.aliens.splice(i,1)
                    else this.aliens[i].splice(j,1);
                    this.bottom = this.getLength() + this.location.y;
                    player.Bullet.display = false;
                    player.Bullet.location.y = player.location.y;
                    return true;
                }
            }
        }

        return false;
    },

    bullets: [new bullet('alien'), new bullet('alien'), new bullet('alien')],

    shoot: function(){
        let count = 0;
        let flag = false;

        do {
            if(!this.bullets[count].display){
                this.bullets[count].display = true;
                this.bullets[count].location = this.getRandomAlien();
                this.bullets[count].location.x += (Math.random() * this.aliens[0][0].size[0]) * Game.pixelSize;
                this.bullets[count].location.y += this.aliens[0][0].size[1] * Game.pixelSize;
                flag = true;
            }
            count++;
        } while(count < this.bullets.length && !flag)
    }, 

    getRandomAlien: function(){
        let row = Math.floor(Math.random() * (this.aliens.length));
        let col = Math.floor(Math.random() * (this.aliens[row].length));

        return new Point(this.aliens[row][col].location.x, this.aliens[row][col].location.y);
    }
}

function Point(x,y){
    this.x = x;
    this.y = y;

    this.convertToGrid = () => {
        return[this.x/Game.pixelSize, this.y/Game.pixelSize];
    }
}

function barrier(x){
    this.location = new Point(x,canvas.height - 25 - 30 - (16 * 3));
    this.size = [22,16];
    this.removalSize = 1;
    this.logic = [
        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1]
    ];
    this.color = 'green';
    this.draw = function(){
        renderShapeFromLogic(this.logic,this.location.x, this.location.y, Game.pixelSize, this.color)
    }
    this.destroy = function(collidedObjX, collidedObjY){
        let xIndex = Math.floor((collidedObjX - this.location.x)/Game.pixelSize);
        let directionFlag = collidedObjY > this.location.y + 20 ? 1 : 0;
        let foundFlag = false;
        let yIndex;

        //finds the yIndex of the next in tact piece of the barrier at a given x location.
        if(directionFlag){
            for(let i = this.logic.length - 1; i >= 0; i--){
                if(this.logic[i][xIndex] && !foundFlag){
                    yIndex = i - 2;
                    foundFlag = true;
                }
            }
        }else{
            for(let i = 0; i < this.logic.length; i++){
                if(this.logic[i][xIndex] && !foundFlag){
                    yIndex = i;
                    foundFlag = true;
                }
            }
        }

        //creates the destruction pattern if a piece of barrier was found
        if(foundFlag){
            for(let i = 0; i < 3; i++){
                for(let j = -this.removalSize; j < this.removalSize; j++){
                    if(yIndex + i >= 0 && yIndex + i < 16 && xIndex + j >= 0 && xIndex + j < 22)
                    this.logic[yIndex + i][xIndex + j] = 0;
                }
            }
            return true;
        }
        else return false;
    }

    this.checkCollision
}

function explosion(start,location, width, height){
    this.image = explosionSprite;
    this.sound = Game.soundHandler.explodeySound;
    this.soundPlayed = false;
    this.sy = 0;
    this.sheight = 64;
    this.swidth = 104;
    this.sx = start * this.swidth;
    this.dx = location.x;
    this.dy = location.y;
    this.dwidth = width;
    this.dheight = height;
    this.delay = 15;

    this.draw = function(){
        ctx.drawImage(this.image,this.sx, 0, this.swidth, this.sheight, this.dx, this.dy, this.dwidth,this.dheight);
    }

}

horde.populate();


function ufo(){
    this.location = new Point(0,0);
    this.size = [16,7];
    this.display = false;
    this.direction = 0;
    this.draw = function(){
        if(this.display) renderShapeFromLogic(this.logic,this.location.x,0,3,'red');
    }
    this.move = function(){
        if(this.display){
            //ctx.clearRect(0, 0, canvas.width, 21);
            if(this.direction) this.location.x -= 3;
            else this.location.x += 3;
            if(this.location.x >= 950 || this.location.x <= 0) this.direction = this.direction ? 0 : 1;
        }
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
    this.checkCollision = function(){
        if(this.withinHitbox(player.Bullet)){
            this.display = false;
            this.explode();
            this.location.x = -100;
        }
    }
    this.explode = function(){
        Game.explosionHandler.push(new explosion(1, this.location,this.size[0] * Game.pixelSize, this.size[1] * Game.pixelSize))
    }
    this.withinHitbox = function(obj){
        if(obj.location.x >= this.location.x && obj.location.x <= this.location.x + (this.size[0]*Game.pixelSize)){
            if(obj.location.y >= this.location.y && obj.location.y <= this.location.y + (this.size[1]*Game.pixelSize)){
                return true;
            }
        }
        return false;
    }
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
    
    this.location = new Point(canvas.width/2, canvas.height - 25);
    this.image = defenderSprite;
    this.keyPressed = null;

    this.draw = function(){
        ctx.drawImage(this.image,this.location.x, this.location.y,39,24);
    };

    this.move = function(key){
        switch (key) {
            case 'ArrowLeft':
                if(this.location.x >= 0){
                    this.location.x -= 5;
                }
            break;

            case 'ArrowRight':
                if(this.location.x + (this.size[0] * Game.pixelSize) <= canvas.width){
                    this.location.x += 5;
                }
            break;
            default:
        }
    }
    this.Bullet = new bullet('player');

    this.shoot = () => {
        if(!this.Bullet.display){
            Game.soundHandler.shoot.play();
            this.Bullet.display = true;
            this.Bullet.location.x = this.location.x + (this.size[0]/2 * Game.pixelSize);
            this.Bullet.location.y = this.location.y;            
        }

    }

    this.withinHitbox = function(obj){
        if(obj.location.x >= this.location.x && obj.location.x <= this.location.x + (this.size[0]*Game.pixelSize)){
            if(obj.location.y >= this.location.y && obj.location.y <= this.location.y + (this.size[1]*Game.pixelSize)){
                return true;
            }
        }
        return false;
    }

    this.explode = () => {
        
    }
}

function bullet(shooter){
    this.type = shooter === 'player' ? 1 : 0;
    this.display = false;
    this.location = new Point(-50,-50);
    this.speed = 4 * Game.pixelSize;

    this.move = function(){
        if(this.display){
            if(this.type == 1){
                this.location.y -= this.speed;
            }else this.location.y += this.speed;

            if(this.location.y > canvas.height || this.location.y < 0){
                this.display = false;
                this.location.x = -50;
                this.location.y = -50;
            }
        }
    }
    this.draw = () => {
        ctx.beginPath();
        ctx.rect(this.location.x, this.location.y, Game.pixelSize, Game.pixelSize * 2);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

function gameLoop(){
    Game.counter++;
    ctx.clearRect(0,0,canvas.width, canvas.height)
    if (Game.counter === horde.moveSpeed && horde.aliens.length >= 1){
        horde.move();
        Game.counter = 0;
        Game.soundHandler.playBackground();
        Game.randomDecisions();
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
    if(Game.explosionHandler.length > 0){
        Game.explosionHandler.forEach((e) => {
            if(!e.soundPlayed) e.sound.play();
            e.draw()
            if(--e.delay == 0) Game.explosionHandler.shift();
        });
    }

    Game.barriers.forEach((bar) => {
        bar.draw()
    })

    horde.bullets.forEach((bullet) => {
        if(bullet.display) {
            bullet.draw();
            bullet.move()
        }
    })
    player.draw(); 

    if(horde.aliens.length === 0){
        horde.populate();
    }
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

function renderShapeFromSprite(){
    ctx.drawImage();
}

var alienShip = new ufo();
Game.init();
const player = new defender(); 

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
