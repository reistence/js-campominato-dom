// bombs [] = 16 rndnrs in range 1 to sqauresNR;
// nobombs[] = numbersArray.length - bombs;
// score = each non-bomb square clicked;

// if user click on a bombs
//        square becomes red
// else
//        square becomes blue

//EXTRA
// once triggered a bomb, match stops + other bombs exposed

const playBtn = document.getElementById("play");
const row = document.querySelector(".row");
const scoreMessage = document.getElementById("score-message");
let numbersArray;
let bombsArray = [];
let thisSquare;
let score = 0;
let message = "";
// play btn
playBtn.addEventListener("click", function () {
  row.innerHTML = "";
  message = "";
  scoreMessage.classList.remove("visible");
  //grab option value from DOM
  let difficulty = document.getElementById("difficulty").value;
  console.log(difficulty, typeof difficulty);
  // If an option is selected uptade the number of Squares to be displayed accordingly
  let squaresNr;
  if (difficulty === "easy") {
    squaresNr = 100;
  } else if (difficulty === "medium") {
    squaresNr = 81;
  } else if (difficulty === "difficult") {
    squaresNr = 49;
  }

  // generate an array of given number size (1-100/1-81/1-49)

  numbersArray = generateOrderedArray(squaresNr);

  // genrate array of 16 bombs
  bombsArray = generateRandomOrderArray(squaresNr);
  console.log(bombsArray);

  // create a square element for each iteration
  for (let i = 0; i < numbersArray.length; i++) {
    const thisNr = numbersArray[i];
    thisSquare = createSquare(thisNr);
    // add eventlistener to each square
    thisSquare.addEventListener("click", squareClicked);
    // put the squares into .row
    row.append(thisSquare);
    // display modes classes
    if (difficulty === "easy") {
      thisSquare.classList.add("easy");
    } else if (difficulty === "medium") {
      thisSquare.classList.add("medium");
    } else if (difficulty === "difficult") {
      thisSquare.classList.add("difficult");
    }
  }
});

// FUNCTIONs
/**
 * Description generate an array of ascending numbers from 1 to a given lenght
 * @param {number} arrayLength
 * @returns {array}
 */
function generateOrderedArray(arrayLength) {
  const array = [];
  for (let i = 1; i <= arrayLength; i++) {
    array.push(i);
  }
  return array;
}

/**
 * Description create a div with the class .square and put a certain number in it
 * @param {number} innerNumber
 * @returns {Element} Square
 */
function createSquare(innerNumber) {
  const newSquare = document.createElement("div");
  newSquare.classList.add("square");
  newSquare.innerHTML = innerNumber;
  return newSquare;
}

/**
 * Description Generate rnd nr in range min to max (included)
 * @param {number} min
 * @param {number} max
 * @returns {number} rnd integer
 */
function generateRndNr(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Description: generate an array of rnd nrs in range from 1 to arrayLength without clone nrs
 * @param {number} arrayLength
 * @returns {Array} array of rnd nrs
 */
function generateRandomOrderArray(arrayLength) {
  const numbersArray = [];
  while (numbersArray.length < 16) {
    const rndNumber = generateRndNr(1, arrayLength);
    if (!numbersArray.includes(rndNumber)) {
      numbersArray.push(rndNumber);
    }
  }
  return numbersArray;
}

/**
 * Description returns the innerhtml content (as a number) of a given element
 * and changes its background color to lightblue in the DOM
 *
 * @returns {number}
 */
function squareClicked() {
  const clickedNr = parseInt(this.innerHTML);
  console.log(clickedNr);
  if (bombsArray.includes(clickedNr)) {
    this.classList.add("bomb");
    let square = document.getElementsByClassName("square");

    //check other bombs
    for (let i = 0; i < square.length; i++) {
      // if square.innerhtml is in bombsArray, all these elements get the class bomb
      if (bombsArray.includes(parseInt(square[i].innerHTML))) {
        square[i].classList.add("bomb");
      }
    }

    // show the score and the outcome of match
    message = `Game Over! You lost, Your score is ${score}`;
    scoreMessage.innerHTML = message;
    scoreMessage.classList.add("visible");
    console.log(message);
  } else {
    this.classList.add("active");
    score++;
    console.log(score);
    // if user gets correctly all the attempts
    if (score === numbersArray.length - bombsArray.length) {
      // show the score(max score possible) and the outcome of match
      message = `Congratulations! You won, Your score is ${score}`;
      console.log(message);
      scoreMessage.innerHTML = message;
      scoreMessage.classList.add("visible");
    }
  }
}
