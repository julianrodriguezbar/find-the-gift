const canvas= document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load',startGame)

function startGame(){
    let canvasSize;
    let wHeight = window.innerHeight;
    let wWidth = window.innerWidth;
    


    (wHeight < wWidth)
        ? canvasSize = wHeight * 0.75
        : canvasSize = wWidth * 0.75;

    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('Height',canvasSize);

    const elementSize= canvasSize/10;
    game.fillText (emojis['X'],100,100);
    

}

