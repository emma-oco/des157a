(function(){
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    const gameData = {
        dice: ['card1.png', 'card2.png', 'card3.png', 
               'card4.png', 'card5.png', 'card6.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29 
    };


    const pass = new Audio('sounds/Pass.m4a');
    const zero = new Audio('sounds/Zero.m4a');
    const startSound = new Audio('sounds/Start.m4a');
    const win = new Audio('sounds/Win.m4a');
    startGame.addEventListener('mousedown', function () {
        startSound.play();
    });

    startGame.addEventListener('click', function () {

        gameData.index = Math.round(Math.random());
        console.log(gameData.index);
        
        gameControl.innerHTML = '<h2>The Game Has Started</h2>';
        gameControl.innerHTML += '<button id = "quit">Wanna Quit</button>';

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });

        /* console.log('set up the turn'); */
        setUpTurn();
    });

    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]
        }</p>`;
        actionArea.innerHTML = '<button id = "roll">Roll the Dice</button>';
        document.querySelector('#roll').addEventListener('click',function(){
            /* console.log('Roll the Dice!'); */
            throwDice ()
        });
    }

    function throwDice (){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6)+1;
        gameData.roll2 = Math.floor(Math.random() * 6)+1;
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="images/${gameData.dice[gameData.roll1-1]}"> 
                           <img src="images/${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //If two ones are rolled
        if(gameData.rollSum === 2){
            game.innerHTML += '<p>snake eyes!</p>';
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            gameData.score[gameData.index] = 0;
            zero.play();

            // show current score
            showCurrentScore ();
            setTimeout(setUpTurn, 2000);
    }
    //If one 1 was rolled
    else if(gameData.roll1 === 1 || gameData.roll2 === 1){
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        game.innerHTML += `<p>One of your rolls was a one. Switching to player ${gameData.players[gameData.index]}</p>`;
        pass.play();

        setTimeout(setUpTurn, 2000);
    }
    //If no ones were rolled
    else{
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
        actionArea.innerHTML = '<button id = "rollagain">Roll Again</button> <button id = "pass">Pass</button>';

        document.querySelector('#rollagain').addEventListener('click',function(){
            throwDice();
        });

        document.querySelector('#pass').addEventListener('click', function(){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setUpTurn();
            
        });
        checkWinningCondition();
    }
    
}

function checkWinningCondition() {
	if (gameData.score[gameData.index] > gameData.gameEnd) {
		score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
        win.play();

		actionArea.innerHTML = '';
		document.querySelector('#quit').innerHTML = 'Start a New Game?';
	} else {
		showCurrentScore ();
	}
}

function showCurrentScore (){
    score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}: ${gameData.score[0]}</strong> and <strong> ${gameData.players[1]}: ${gameData.score[1]}</strong></p>`;
}



})();