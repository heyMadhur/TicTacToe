
// Variables
let winMatch = false;
let drawMatch = false;
let box = Array.from(document.getElementsByClassName('box'));
let turn = 'X';
let turnFor = document.getElementById('turn-element');
let victoryDance = document.getElementById('victoryDance');
let vicVidShower = "off";
let yeah = new Audio('../audios/yeah.mp3')
let ting = new Audio('../audios/ting.mp3');
let aww = new Audio('../audios/aww.mp3');
let matchResult = document.getElementById('matchResult');
let winningOutcomes = [
  { arr: [1, 2, 3] },
  { arr: [4, 5, 6] },
  { arr: [7, 8, 9] },
  { arr: [1, 4, 7] },
  { arr: [2, 5, 8] },
  { arr: [3, 6, 9] },
  { arr: [1, 5, 9] },
  { arr: [3, 5, 7] }
]



// Functions
function reset() {
  for (let i = 1; i < 10; i++) {
    document.getElementById(i).textContent = "";
  }

  winMatch = false;
  matchResult.style.height = 0;
  turn = 'X'
  box.forEach(e => {

    document.getElementById(e.getAttribute('id')).style = "transparent";
    document.getElementById(e.getAttribute('id')).style.color = "black";
  })

  turnFor.textContent = "Turn for X";
  victoryDance.style.opacity = 0;
  victoryDance.pause();
  yeah.pause();
}

function toggleVicVid() {
  vicVidShower = (vicVidShower == 'on') ? 'off' : 'on';
  document.getElementById('vicVidToggle').innerText = "Victory Vid " + vicVidShower;
}

function winThings(i) {
  console.log("inside")
  winMatch = true;

  winningOutcomes[i].arr.forEach(e => {
    document.getElementById(e).style.backgroundColor = "#4f4f4f";
    document.getElementById(e).style.color = "yellow";

  })

  turnFor.textContent = "";
  document.getElementById('result-text').textContent = "Winner is " + turn
  matchResult.style.height = 7 + "rem";
  if (vicVidShower == 'on') {
    victoryDance.style.opacity = 0.9
    victoryDance.currentTime = 0;
    victoryDance.play();
  }
  else {
    yeah.currentTime = 0;
    yeah.play();
  }
}

function drawThings() {
  aww.play();
  turnFor.textContent = "";
  document.getElementById('result-text').textContent = "Match Draw"
  matchResult.style.height = 8 + "rem";
}

function changeTurn() {
  return (turn == 'X') ? 'O' : 'X';
}

function checkDraw() {
  for (let i = 1; i < 10; i++) {
    if (document.getElementById(i).textContent == "") {
      drawMatch = false;
      return;
    }
  }
  drawThings();
  return true;
}

function checkWin() {
  for (let i = 0; i < winningOutcomes.length; i++) {
    if (document.getElementById(winningOutcomes[i].arr[0]).textContent == turn && document.getElementById(winningOutcomes[i].arr[1]).textContent == turn && document.getElementById(winningOutcomes[i].arr[2]).textContent == turn) {
      winThings(i);
    }
  }
}

function boxValue(value) {
  if (document.getElementById(value).textContent == "" && winMatch == false) {
    document.getElementById(value).textContent = turn;
    ting.play();
    checkWin();
    if (winMatch == false) {
      checkDraw();
      turn = changeTurn();
      turnFor.textContent = "Turn for " + turn;
    }
  }
}



// Events
victoryDance.addEventListener('ended', () => {
  victoryDance.style.opacity = 0;
})

// Enter X or O in box

let e = 1;
box.forEach(element => {
  element.setAttribute('id', e);
  element.setAttribute('onclick', 'boxValue(id)');
  e++;
})



