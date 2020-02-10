var numberToGuess = Math.floor(Math.random()*99) + 1;
var guesses = document.querySelector("#guesses");
var lastResult = document.querySelector("#lastResult");
var lowOrHi = document.querySelector("#lowOrHi");
var guessSubmit = document.querySelector(".guessSubmit");
var guessField = document.querySelector(".guessField");
var guessCount = 1;
var resetButton = document.querySelector("#reset");
resetButton.style.display = 'none';

var winTally = 0;
var lossTally = 0;

function checkGuess(){
    var userGuess = Number(guessField.value);
    
    if ( isNaN(userGuess) ){
        alert('Please only enter numbers between 1 and 99 inclusive');
        return;
    }
    
    if ( userGuess > 99 || userGuess < 1 ){
        alert('Please only enter numbers between 1 and 99 inclusive');
        return;
    }
    
    if ( guessCount === 1 ){
        guesses.innerHTML = 'Previous guesses: ';
    }
    guesses.innerHTML += userGuess + ' ';
    
    if ( userGuess === numberToGuess ){
        lastResult.innerHTML = 'Congratulations! You got it right!';
        winTally += 1;
        lastResult.style.backgroundColor = 'green';
        lowOrHi.innerHTML = '';
        setGameOver();
    } else if ( guessCount === 7 ){
        lastResult.innerHTML = 'Sorry, you lost!';
        lossTally += 1;
        setGameOver();
    }
    else {
        lastResult.innerHTML = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if ( userGuess < numberToGuess ){
            lowOrHi.innerHTML = 'Last guess was too low!';
        }else if ( userGuess > numberToGuess ){
            lowOrHi.innerHTML = 'Last guess was too high!';
        }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
}
guessSubmit.addEventListener('click', checkGuess);

function setTallys(){
    document.getElementById("winTally").innerHTML = winTally;
    document.getElementById("lossTally").innerHTML = lossTally;
    document.getElementById("totalTally").innerHTML = winTally + lossTally;
}

function setGameOver(){
    setTallys();
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton.style.display = 'inline';
    resetButton.addEventListener('click', resetGame);
}

function resetGame(){
    guessCount = 1;
    
    var resetParas = document.querySelectorAll('.resultParas p');
    for ( var i = 0; i < resetParas.length; i++ ){
        resetParas[i].textContent = '';
    }
    
    resetButton.style.display = 'none';
    
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    
    lastResult.style.backgroundColor = 'white';
    
    numberToGuess = Math.floor(Math.random()*99) + 1;
}