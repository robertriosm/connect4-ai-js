function scorePosition(board, playerId) {
  let score = 0;

  // Horizontal score
  for (let row of board) {
    for (let col = 0; col < 4; col++) {
      let window = row.slice(col, col + 4);
      score += evaluateWindow(window, playerId);
    }
  }

  // Vertical score
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      let window = [];
      for (let i = 0; i < 4; i++) {
        window.push(board[row + i][col]);
      }
      score += evaluateWindow(window, playerId);
    }
  }

  // Diagonal score (positive slope)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      let window = [];
      for (let i = 0; i < 4; i++) {
        window.push(board[row + i][col + i]);
      }
      score += evaluateWindow(window, playerId);
    }
  }

  // Diagonal score (negative slope)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      let window = [];
      for (let i = 0; i < 4; i++) {
        window.push(board[row + 3 - i][col + i]);
      }
      score += evaluateWindow(window, playerId);
    }
  }

  return score;
}

function evaluateWindow(window, playerId) {
  let score = 0;
  let opponentId = 3 - playerId;

  if (window.filter((cell) => cell === playerId).length === 4) {
    score += 100;
  } else if (
    window.filter((cell) => cell === playerId).length === 3 &&
    window.filter((cell) => cell === 0).length === 1
  ) {
    score += 5;
  } else if (
    window.filter((cell) => cell === playerId).length === 2 &&
    window.filter((cell) => cell === 0).length === 2
  ) {
    score += 2;
  }

  if (
    window.filter((cell) => cell === opponentId).length === 3 &&
    window.filter((cell) => cell === 0).length === 1
  ) {
    score -= 4;
  }

  // Additional condition to detect winning moves
  if (
    window.filter((cell) => cell === opponentId).length === 0 &&
    window.filter((cell) => cell === 0).length === 1
  ) {
    score += 50;
  }

  return score;
}

function isTerminalNode(board) {
  // Check if the game is over
  for (let row of board) {
    if (
      row.slice(0, 4).toString() === "1,1,1,1" ||
      row.slice(0, 4).toString() === "2,2,2,2"
    ) {
      return true;
    }
  }

  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      const columnValues = [
        board[row][col],
        board[row + 1][col],
        board[row + 2][col],
        board[row + 3][col],
      ];
      if (
        columnValues.toString() === "1,1,1,1" ||
        columnValues.toString() === "2,2,2,2"
      ) {
        return true;
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const diagonalValues = [
        board[row][col],
        board[row + 1][col + 1],
        board[row + 2][col + 2],
        board[row + 3][col + 3],
      ];
      if (
        diagonalValues.toString() === "1,1,1,1" ||
        diagonalValues.toString() === "2,2,2,2"
      ) {
        return true;
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const diagonalValues = [
        board[row + 3][col],
        board[row + 2][col + 1],
        board[row + 1][col + 2],
        board[row][col + 3],
      ];
      if (
        diagonalValues.toString() === "1,1,1,1" ||
        diagonalValues.toString() === "2,2,2,2"
      ) {
        return true;
      }
    }
  }

  // Check if the board is full
  for (let row of board) {
    if (row.includes(0)) {
      return false;
    }
  }
  return true;
}

function getValidMoves(board) {
  let validMoves = [];
  for (let col = 0; col < 7; col++) {
    if (board[0][col] === 0) {
      validMoves.push(col);
    }
  }
  return validMoves;
}

function isWin(board, playerId) {
  // Check horizontal
  for (let row of board) {
    for (let col = 0; col < 4; col++) {
      if (
        row[col] === playerId &&
        row[col + 1] === playerId &&
        row[col + 2] === playerId &&
        row[col + 3] === playerId
      ) {
        return true;
      }
    }
  }

  // Check vertical
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        board[row][col] === playerId &&
        board[row + 1][col] === playerId &&
        board[row + 2][col] === playerId &&
        board[row + 3][col] === playerId
      ) {
        return true;
      }
    }
  }

  // Check positive slope diagonal
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        (board[row][col] === playerId &&
          board[row + 1][col + 1] === playerId &&
          board[row + 2][col + 2] === playerId &&
          board[row + 3][col + 3] === playerId) ||
        (col + 4 < 7 &&
          row - 3 >= 0 &&
          board[row][col + 1] === playerId &&
          board[row - 1][col + 2] === playerId &&
          board[row - 2][col + 3] === playerId &&
          board[row - 3][col + 4] === playerId)
      ) {
        return true;
      }
    }
  }

  // Check negative slope diagonal
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        (board[row + 3][col] === playerId &&
          board[row + 2][col + 1] === playerId &&
          board[row + 1][col + 2] === playerId &&
          board[row][col + 3] === playerId) ||
        (col + 4 < 7 &&
          row + 4 < 6 &&
          board[row + 3][col + 1] === playerId &&
          board[row + 2][col + 2] === playerId &&
          board[row + 1][col + 3] === playerId &&
          board[row][col + 4] === playerId)
      ) {
        return true;
      }
    }
  }

  return false;
}

function minMax(board, depth, maximizingPlayer, playerId) {
  const validMoves = getValidMoves(board);

  if (depth === 0 || isTerminalNode(board)) {
    if (isTerminalNode(board)) {
      if (isWin(board, playerId)) {
        return [null, Infinity];
      } else if (isWin(board, 3 - playerId)) {
        return [null, -Infinity];
      } else {
        return [null, 0];
      }
    } else {
      return [null, scorePosition(board, playerId)];
    }
  }

  if (maximizingPlayer) {
    let maxValue = -Infinity;
    let bestMove = validMoves[0];
    for (let move of validMoves) {
      const newBoard = board.map((row) => [...row]);
      dropPiece(newBoard, move, playerId);
      const newScore = minMax(newBoard, depth - 1, false, playerId)[1];
      if (newScore > maxValue) {
        maxValue = newScore;
        bestMove = move;
      }
    }
    return [bestMove, maxValue];
  } else {
    let minValue = Infinity;
    let bestMove = validMoves[0];
    for (let move of validMoves) {
      const newBoard = board.map((row) => [...row]);
      dropPiece(newBoard, move, 3 - playerId);
      const newScore = minMax(newBoard, depth - 1, true, playerId)[1];
      if (newScore < minValue) {
        minValue = newScore;
        bestMove = move;
      }
    }
    return [bestMove, minValue];
  }
}

function dropPiece(board, col, playerId) {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === 0) {
      board[row][col] = playerId;
      break;
    }
  }
}

function makeMove(gameboard, playerId) {
  const board = gameboard.map((row) => [...row]);
  const depth = 4; // Adjust the depth of the min-max algorithm as needed
  return minMax(board, depth, true, playerId)[0];
}

module.exports = {
  makeMove,
};
