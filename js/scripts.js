//All images found on https://www.iconfinder.com
let emoji = ["Emoji_0.svg", "Emoji_1.svg", "Emoji_2.svg", "Emoji_3.svg", "Emoji_4.svg", "Emoji_5.svg", "Emoji_6.svg", "Emoji_7.svg",
            "Emoji_0.svg", "Emoji_1.svg", "Emoji_2.svg", "Emoji_3.svg", "Emoji_4.svg", "Emoji_5.svg", "Emoji_6.svg", "Emoji_7.svg"];

let xmas = ["xmas_0.svg", "xmas_1.svg", "xmas_2.svg", "xmas_3.svg", "xmas_4.svg", "xmas_5.svg", "xmas_6.svg", "xmas_7.svg",
            "xmas_0.svg", "xmas_1.svg", "xmas_2.svg", "xmas_3.svg", "xmas_4.svg", "xmas_5.svg", "xmas_6.svg", "xmas_7.svg"];

let fruit = ["fruit_0.svg", "fruit_1.svg", "fruit_2.svg", "fruit_3.svg", "fruit_4.svg", "fruit_5.svg", "fruit_6.svg", "fruit_7.svg",
            "fruit_0.svg", "fruit_1.svg", "fruit_2.svg", "fruit_3.svg", "fruit_4.svg", "fruit_5.svg", "fruit_6.svg", "fruit_7.svg"];

let social = ["social_media_0.svg", "social_media_1.svg", "social_media_2.svg", "social_media_3.svg",
          "social_media_4.svg", "social_media_5.svg", "social_media_6.svg", "social_media_7.svg",
          "social_media_0.svg", "social_media_1.svg", "social_media_2.svg", "social_media_3.svg",
          "social_media_4.svg", "social_media_5.svg", "social_media_6.svg", "social_media_7.svg"];

let cards = shuffle(emoji);
let card1 = "";
let card2 = "";
let counter = 0;
let moves_counter = 0;
let minutes = 0;
let seconds = 0;
let timerStarted = false;
let stopWatch;
let waitAmoment = 0;
let delay;

const container = document.getElementById("container");
const popup = document.getElementById("popup");
const button_container = document.getElementById("button_container");
const display_counter = document.getElementById("moves_counter");
const timer = document.getElementById("timer");
const stars = document.getElementById("stars");
const end_stars = document.getElementById("end_stars");

container.addEventListener("click", cardClicked);
popup.addEventListener("click", actionPopup);
button_container.addEventListener("click", actionButtons);
restart();

/**
 * @description Represents shuffling the cards
 * @constructor
 * @param {array} a - "a" can be any of the predefined arrays: emoji, xmas, fruit, social
 * depending on the user's selection
 * @returns {array}  Same values of original array but shuffled.
 */
function shuffle(a) {
  const newShuffle = new Array(16);
  for (let i = 15; i >= 0; i--) {
    const j = getRandomPosition(i + 1);
    if (typeof newShuffle[j] === 'undefined') {
      newShuffle[j] = a[i];
    } else {
      //random position was already taken
      //Find a new position!
      for (let k = 15; k >= 0; k--) {
        if (typeof newShuffle[k] === 'undefined') {
          newShuffle[k] = a[i];
          break;
        }
      }
    }
  }
  return newShuffle;
}

/**
 * @description Mathamatical function that calculates a random number.
 * @param {int} max - The random number will be <==  max
 * @returns {int}  A random number that will be used as the new index to insert value into shuffled array.
 */
function getRandomPosition(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * @description The function that is called when any card in the grid container is clicked on
 * @param {event object} evt - From the event object the function will know the id of the element that
 * was clicked on.
 * @returns {nothing} The function includes  return statements mainly to stop and not continue when
 * certain conditions are met.  e.g.  The user was won, the id isNaN
 */
function cardClicked(evt) {
  //Is timer running?? If not start it!
  if (!timerStarted) {
    restart();
    timerStarted = true;
    startTimer();
  }
  //increment the counter and display to the user.
  moves_counter++;
  display_counter.textContent = moves_counter;

  //What card was clicked?  Get the ID
  let id = parseInt(evt.target.id);
  if (isNaN(id)) { /// Invalid ID -- get OUT!
    //This happens when the same card was clicked again.
    return;
  }

  if (card1 === "") {

    card1 = id;
    toggleClass(card1, "show__card"); //Add the class that flips the card
    toggleClass(`img_${card1}`, "image__hide"); //Remove the class that hides the card
  } else if (card2 === "") {
    card2 = id;
    toggleClass(card2, "show__card");
    toggleClass(`img_${card2}`, "image__hide"); //Remove the class that hides the card
  }

  if (card1 !== card2 && cards[card1] === cards[card2]) {
    //We Have a MATCH!!
    counter++;
    toggleClass(card1, "correct");
    toggleClass(card2, "correct");
    card1 = "";
    card2 = "";

    if (counter === 8) { //We have a winner!! Game over! 8 matches!
      //Stop Timer!!!
      clearTimeout(stopWatch);
      timerStarted = false;
      //pause a little and then Show the popup!
      pause();
    }
    return;
  }

  if (card1 !== "" && card2 !== "") {
    //NO MATCH!!
    toggleClass(card1, "incorrect");
    toggleClass(card2, "incorrect");

    toggleClass(card1, "show__card");
    toggleClass(card2, "show__card");
    //pause a little to show the cards and then flip them over.
    pause();
  }
}

/**
 * @description Creates a new IMG element
 * @param {int} key - The key is the index of the image file name, which will create the src/path to the image.
 * @returns {element} Returns a new IMG element.
 */
function getImage(key) {
  let element = document.createElement("IMG");
  let path = `img/${cards[key]}`;
  element.setAttribute("src", path);
  element.setAttribute("class", "image__show image__hide");
  element.setAttribute("id", `img_${key}`);
  return element;
}

/**
 * @description Toggles a class for an element
 * @param {string} id - Represents the ID to the element whose class we want to toggle
 * @param {string} classname - Represents the classname of the class we want to toggle
 */
function toggleClass(id, classname) {
  let element = document.getElementById(id);
  element.classList.toggle(classname);
}

/**
 * @description Represents the incorrect selections of the user and the cards flipping back down
 *
 */
function flipCards() {
  if (card1 !== "" && card2 !== "") {
    toggleClass(`img_${card1}`, "image__hide");
    toggleClass(`img_${card2}`, "image__hide");

    toggleClass(card1, "incorrect");
    toggleClass(card2, "incorrect");

    card1 = "";
    card2 = "";
  }
}

/**
 * @description The function that is called when the popup window is clicked (close button or play again button)
 * @param {event object} evt - From the event object the function will know the id of the element that
 * was clicked on.
 */
function actionPopup(evt) {
  let id = evt.target.id;
  if (id === "close_window") {
    popup.classList.toggle("hide", true);
  } else if (id === "play_again") {
    //remove existing cards!
    restart(); //Clear everything and restart the game
    popup.classList.toggle("hide", true);
  }
}

/**
 * @description Resets all parameters to start a new game.
 */
function restart() {
  //Stop Timer if it's running!
  if (timerStarted) {
    clearTimeout(stopWatch);
    timerStarted = false;
  }
  removeCards();
  cards = shuffle(cards);
  placeCards();
  card1 = "";
  card2 = "";
  counter = 0;
  moves_counter = 0;
  minutes = 0;
  seconds = 0;
  display_counter.textContent = moves_counter;
  timer.textContent = "00:00";
  stars.textContent = getStarValue(1);
}

/**
 * @description A popup window that is displayed to the user once he/she has won
 */
function showPopup() {
  const moves = document.getElementById("moves");
  const stars = document.getElementById("stars");
  const encourage = document.getElementById("encourage");
  const end_time = document.getElementById("end_time");
  let str = "Woohoo!" //Default text;

  if (moves_counter < 17) {
    str = "AWESOME!  Perfect Score!";
  } else if (moves_counter < 19) {
    str = "AWESOME!  Almost Perfect Score!";
  } else if (moves_counter > 40) {
    str = "You're an AWESOME tester!";
  }

  moves.textContent = moves_counter;
  encourage.textContent = str;
  end_time.textContent = getTime(minutes, seconds, 1);
  end_stars.textContent = getStarValue();
  popup.classList.toggle("hide", false);
}

/**
 * @description Removes the existing images/cards from the div container.
 */
function removeCards() {
  for (let i = 0; i < 16; i++) {
    let divElement = document.getElementById(i);
    divElement.textContent = "";
    divElement.classList.toggle("correct", false); //Remove the "correct" class
  }
}

/**
 * @description Places the cards down for a new game after cards have been shuffled.
 */
function placeCards() {
  for (let i = 0; i < 16; i++) {
    document.getElementById(i).appendChild(getImage(i));
  }
}

/**
 * @description The function that is called when an element is clicked on:
 * 1. Select deck button,
 * 2. Radio button selection
 * 3. Reset button.
 * @param {event object} evt - From the event object the function will know the ID or NAME of the element that
 * was clicked on.
 */
function actionButtons(evt) {
  let id = evt.target.id;
  let name = evt.target.name;
  //console.log(`id = ${id}`);
  if (id === "select_deck") {
    const e = document.getElementById("radio_container");
    e.classList.toggle("hide");
  } else if (id === "reset_button") { //The reset button will select the default deck "emoji" & reset the game
    const inputs = document.getElementsByName("deck");
    for (let input of inputs) {
      let value = input.value;
      if (value === "emoji") {
        input.checked = true;
      }
    }
    cards = emoji;
    restart();
  } else if (name === "deck") {
    const inputs = document.getElementsByName("deck");
    for (let input of inputs) {
      if (input.checked) {
        let value = input.value;
        //console.log(`value = ${value}`);
        switch (value) {
          case "fruit":
            cards = fruit;
            break;
          case "xmas":
            cards = xmas;
            break;
          case "social":
            cards = social;
            break;
          default:
            cards = emoji;
        }
      }
    }
    restart();
  }
}

/**
 * @description Represents the stopwatch and every second displays to the user the time passed
 */
function startTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  timer.textContent = getTime(minutes, seconds, 0);
  stars.textContent = getStarValue();
  stopWatch = setTimeout(startTimer, 1000);
}

/**
 * @description Formats the time to display it "pretty" to the user.
 * @param {min} represents the minutes
 * @param {sec} represents the seconds
 * @param {format} a flag set to return a certain format for the popup close_window
 * @returns the time formatted.
 */
function getTime(min, sec, format) {

  let s = sec < 10 ? `0${sec}` : `${sec}`;
  let m = min < 10 ? `0${min}` : `${min}`;
  let str = `${m}:${s}`;

  if (format === 1) {
    str = `${m} minutes & ${s} seconds`;
    if (min === 0) {
      str = `${s} seconds`;
    }
  }
  return str;
}
/**
 * @description Star score depending on the number of moves.
 * @returns the star display depending on the number of moves.
 */
function getStarValue() {
  let star3 = `☆☆☆`;
  let star2 = `☆☆`;
  let star1 = `☆`;
  let starValue = "";

  if (moves_counter < 31) {
    starValue = star3;
  } else if (moves_counter < 43) {
    starValue = star2;
  } else {
    starValue = star1;
  }

  return starValue;
}

/**
 * @description represents a pause allowing the user to view the cards
 * before they are flippled back down.  Also pauses before displaying the
 * popup window.
 */
function pause() {
  waitAmoment++;
  if (waitAmoment === 2) {
    clearTimeout(delay);
    waitAmoment = 0;
    if (counter === 8) {
      showPopup();
    } else {
      flipCards();
    }
  } else {
    delay = setTimeout(pause, 1000);
  }
}
