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

function getComputerMove(surroundingIndices) {
  let randomIndex, rowComp, colComp;
  do {
    randomIndex = Math.floor(
      Math.random() * surroundingIndices.length
    );
    rowComp = surroundingIndices[randomIndex][0];
    colComp = surroundingIndices[randomIndex][1];
  } while (moveMatrix[rowComp][colComp] != 0);
  return [rowComp, colComp];
}

function getSurroundingIndices(matrix, row, col) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Possible directions (up, down, left, right, and diagonals)
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const surroundingIndices = [];

  directions.forEach((direction) => {
    const [dr, dc] = direction;
    const newRow = row + dr;
    const newCol = col + dc;

    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols
    ) {
      surroundingIndices.push([newRow, newCol]);
    }
  });

  return surroundingIndices;
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

    let surroundingIndices = getSurroundingIndices(
      moveMatrix,
      row,
      col
    );
    let [rowComp, colComp] = getComputerMove(surroundingIndices);

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
