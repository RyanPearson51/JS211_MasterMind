'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  let solutionArray = solution.split('');
  let guessArray = guess.split('');

  let correctLetterLocations = 0;
  for (let i = 0; i<solutionArray.length; i++)
  if (solutionArray[i] == guessArray[i]){
    correctLetterLocations++;
    solutionArray[i] = null;
  }

  let correctLetters = 0;
  for(let i=0; i<solutionArray.length; i++){
    let targetIndex = solutionArray.indexOf(guessArray[i]);
    if(targetIndex > -1){
      correctLetters++;
      solutionArray[targetIndex] = null;
    }
  }

  let hintString = correctLetterLocations.toString() + '-' + correctLetters.toString();
  return hintString;
  
}
let continueGame;
const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  let hint = generateHint(guess);
    let guessHint = `guess ${board.length+1}: ${guess} : ${hint}`
    board.push(guessHint);
  if (guess == solution) {
    console.log('You guessed it!');
    console.log(`guess ${board.length+1} was the correct answer! (${solution})`)
    console.log(board)
    continueGame = false;
    return 'You guessed it!';
  } else {
    console.log('guess again!')
  }
  if (board.length === 10) {
    console.log('game over! you ran out of turns');
    console.log(`the correct answer was '${solution}'`)
    continueGame = false;
  } else{
    console.log('guess again!')
  }
}


const getPrompt = () =>  {
  console.log('make your 4 letter guess')
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    if(continueGame == false){
      console.log('game over!');
      return;
    }
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}