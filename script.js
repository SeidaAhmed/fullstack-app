// Gameboard module
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const setMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const getBoard = () => board;

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { setMark, getBoard, reset };
})();

// Player factory
const Player = (name, mark) => {
  return { name, mark };
};

// DisplayController module
const DisplayController = (() => {
  const boardDiv = document.getElementById("gameBoard");
  const resultDiv = document.getElementById("result");

  const render = (board) => {
    boardDiv.innerHTML = "";
    board.forEach((mark, index) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.textContent = mark;
      square.addEventListener("click", () => GameController.playRound(index));
      boardDiv.appendChild(square);
    });
  };

  const showResult = (message) => {
    resultDiv.textContent = message;
  };

  const reset = () => {
    resultDiv.textContent = "";
  };

  return { render, showResult, reset };
})();

// GameController module
const GameController = (() => {
  let player1;
  let player2;
  let currentPlayer;

  const startGame = () => {
    const p1Name = document.getElementById("player1").value || "Player 1";
    const p2Name = document.getElementById("player2").value || "Player 2";
    player1 = Player(p1Name, "X");
    player2 = Player(p2Name, "O");
    currentPlayer = player1;
    Gameboard.reset();
    DisplayController.reset();
    DisplayController.render(Gameboard.getBoard());
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = (board) => {
    const winConditions = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // columns
      [0,4,8],[2,4,6]          // diagonals
    ];
    for (const [a,b,c] of winConditions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const checkTie = (board) => board.every(square => square !== "");

  const playRound = (index) => {
    if (Gameboard.setMark(index, currentPlayer.mark)) {
      DisplayController.render(Gameboard.getBoard());

      if (checkWin(Gameboard.getBoard())) {
        DisplayController.showResult(`${currentPlayer.name} wins!`);
        return;
      }
      if (checkTie(Gameboard.getBoard())) {
        DisplayController.showResult("It's a tie!");
        return;
      }

      switchPlayer();
    }
  };

  return { startGame, playRound };
})();

// Event listeners
document.getElementById("startBtn").addEventListener("click", GameController.startGame);
document.getElementById("restartBtn").addEventListener("click", GameController.startGame);

// Initialize empty board
DisplayController.render(Gameboard.getBoard());
