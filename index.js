import checkWin from "./maxRegion.js";

const boxes = document.querySelectorAll(".box");
const newButton = document.querySelector(".new-game-btn");
const footer = document.querySelector("footer");

let currentPlayer = "X";
let moveCount = 0;

let moveMatrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const playerMap = {
  X: 1,
  O: -1,
};

function switchCurrentPlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
}

function randomBox() {
  return Math.floor(Math.random() * 9);
}

function appendSpan(box) {
  let span = document.createElement("span");
  span.textContent = `${currentPlayer}`;
  span.classList.add("box-span");
  if (!box.firstChild) box.appendChild(span);
}

function validClick(box) {
  return Boolean(!box.firstChild);
}

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (!validClick(box)) return;
    if (checkWin(moveMatrix, playerMap[currentPlayer])) return;

    appendSpan(box);

    let [row, col] = box.id.split("-").map(Number);
    moveMatrix[row][col] = playerMap[currentPlayer];
    moveCount++;

    if (checkWin(moveMatrix, playerMap[currentPlayer])) {
      footer.textContent = `${currentPlayer} Wins!`;
      return;
    }
    if (moveCount == 9) {
      console.log("Cat Game");
      return;
    }
    switchCurrentPlayer();

    let random, rowComp, colComp;
    do {
      random = randomBox();
      rowComp = Math.floor(random / 3);
      colComp = random % 3;
    } while (moveMatrix[rowComp][colComp] != 0);

    appendSpan(document.getElementById(`${rowComp}-${colComp}`));
    moveMatrix[rowComp][colComp] = playerMap[currentPlayer];
    moveCount++;
    if (checkWin(moveMatrix, playerMap[currentPlayer])) {
      footer.textContent = `${currentPlayer} Wins!`;
      return;
    }
    switchCurrentPlayer();
  });
});

newButton.addEventListener("click", function () {
  boxes.forEach((box) => {
    if (box.firstChild) {
      box.removeChild(box.firstChild);
    }
  });

  moveMatrix = moveMatrix.map((innerArr) =>
    innerArr.map((el) => 0)
  );

  currentPlayer = "X";
  moveCount = 0;

  footer.textContent = ``;
});
