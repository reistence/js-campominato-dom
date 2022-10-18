const playBtn = document.getElementById("play");
const row = document.querySelector(".row");

// play btn
playBtn.addEventListener("click", function () {
  row.innerHTML = "";
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
  let numbersArray;
  numbersArray = generateOrderedArray(squaresNr);

  // create a square element for each iteration
  for (let i = 0; i < numbersArray.length; i++) {
    const thisNr = numbersArray[i];
    const thisSquare = createSquare(thisNr);
    // add eventlistener to each square
    thisSquare.addEventListener("click", SquareClickMessage);
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
 * Description returns the innerhtml content (as a number) of a given element
 * and changes its background color to lightblue in the DOM
 * @returns {number}
 */
function SquareClickMessage() {
  const clickedNr = parseInt(this.innerHTML);
  console.log(clickedNr);
  this.classList.add("active");
}
