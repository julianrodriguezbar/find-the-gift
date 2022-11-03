const canvas= document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector ('#up');
const btnDown = document.querySelector ('#down');
const btnLeft = document.querySelector ('#left');
const btnRight = document.querySelector ('#right');
const spanLives = document.querySelector ('#lives');
const spanTime = document.querySelector ('#time');
const spanRecord =  document.querySelector ('#record');
const result = document.querySelector ('#result');

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

let canvasSize;
let elementSize;
const playerPosition = {
    x: undefined ,
    y: undefined
}

let mapNumber = 0;
let lives = 3;
let timeStart; 
let timePlayer;
let timeInterval;

const giftPosition = {
    x: undefined,
    y: undefined
}

let enemyPositions = [];
function setCanvasSize (){
    
    let wHeight = window.innerHeight;
    let wWidth = window.innerWidth;
    


    (wHeight < wWidth)
        ? canvasSize = wHeight * 0.75
        : canvasSize = wWidth * 0.75;

    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('Height',canvasSize);

    elementSize= canvasSize/10;
    playerPosition.x=undefined;
    playerPosition.y=undefined;
    startGame();
}

function startGame(){

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    let map = maps[mapNumber];

    if (!map){
        gameWin();
        return;
        
    }

    if (!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime,100);
        showRecord();

    }
    const rows = map.trim().split ('\n');
    const mapRowsCol= rows.map(row => row.trim().split(''));
    game.clearRect(0,0,canvasSize, canvasSize);
    showLives();
    enemyPositions =[];
    mapRowsCol.forEach ((row,x) => {
        row.forEach ((col,y) => {
            const emoji = emojis[col];
            if (col == 'O' ){
                if (!playerPosition.x && !playerPosition.y){
                playerPosition.x = elementSize*(y+1);
                playerPosition.y = elementSize*(x+1)
                
            } 
        }
            else if (col == 'I') {
                giftPosition.x = elementSize*(y+1);
                giftPosition.y = elementSize*(x+1);
            

            }

            else if (col == 'X'){
                enemyPositions.push (
                    {
                        x: elementSize*(y+1),
                        y: elementSize*(x+1)
                    }
                )
            }
            
            game.fillText(emoji , elementSize*(y+1) , elementSize*(x+1));
  

        });

    });

    movePlayer();


}

function showTime() {
    spanTime.innerHTML = (Date.now() - timeStart)/1000;
    
}
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click',moveUp);
btnDown.addEventListener('click',moveDown);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click',moveRight);

function showRecord() {
    spanRecord.innerText = localStorage.getItem('record_time')
  
}

function movePlayer(){

    const giftColissionX = (playerPosition.x).toFixed(3) == giftPosition.x.toFixed(3);
    const giftColissionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftColission = giftColissionX && giftColissionY;
    if (giftColission){
        console.log ( "You pass the level");
        levelWin ();

    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX= enemy.x.toFixed(3) ==playerPosition.x.toFixed(3);
        const enemyCollisionY= enemy.y.toFixed(3) ==playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;

    })
    if (enemyCollision){
        console.log ( "Police has caught you");
        levelFail();
        

    }

    game.fillText (emojis['PLAYER'],playerPosition.x,playerPosition.y);
}

function levelFail() {
    lives --;
    if (lives <= 0) {
        mapNumber = 0;
        lives = 3;
        timeStart= undefined;
    }
   
   
        playerPosition.x=undefined;
        playerPosition.y=undefined;
        startGame();

    

    
}

function showLives(){
    spanLives.innerText = emojis['HEART'].repeat(lives);
}

function levelWin() {
    
    mapNumber+=1;
    startGame();
    
    
}

function gameWin(){
    result.innerHTML= "New record!!";
    clearInterval (timeInterval);
    const recordTime = localStorage.getItem ('record_time');
    const playerTime = Date.now()-timeStart;
    if (recordTime){
         console.log(recordTime, playerTime);
        if (recordTime > playerTime/1000){
            localStorage.setItem('record_time', playerTime/1000);
        } else {
            result.innerHTML= "Too slow"
        }
    } else {
        localStorage.setItem('record_time', playerTime/1000);
    }


}

function moveByKeys(event) {
    if (event.key=="ArrowUp") moveUp();
    else if (event.key=="ArrowRight") moveRight();
    else if (event.key=="ArrowLeft") moveLeft();
    else if (event.key=="ArrowDown") moveDown();
}

function moveUp() {
    

    if(playerPosition.y.toFixed(3) - elementSize.toFixed(3) <= 0 ) {
        console.log ('OUT');
    }
    else {
    playerPosition.y -= elementSize
    };
    startGame();
}

function moveDown() {
    if(playerPosition.y + elementSize > canvasSize ) {
        console.log ('OUT');
    }
    else {
    playerPosition.y += elementSize};
    startGame();
}

function moveLeft() {
    if(playerPosition.x.toFixed(3) - elementSize <= 0) {
        console.log ('OUT');
    }
    else {
    playerPosition.x -= elementSize};
    startGame();  
}

function moveRight() {
  
    if(playerPosition.x + elementSize > canvasSize) {
        console.log ('OUT');
    }
    else {
        playerPosition.x += elementSize};
    startGame();
}



