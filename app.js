window.onload = main;

function main() {
    let canvasSize = 500;
    const cellSize = 5;
    const boardSize = (canvasSize / cellSize);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    init(canvas, ctx, canvasSize);
    var board = new Array(boardSize);

    for (var i = 0; i < boardSize; i++) {
        board[i] = new Array(boardSize);
    }
    for (let x = 2; x < boardSize - 2; x++) {
        for (let y = 2; y < boardSize - 2; y++) {
            // board[x][y] = false;
            if (Math.floor(Math.random() * 10) == 1) {
                board[x][y] = true;
            } else
                board[x][y] = false;
        }
    }
    document.getElementById("Ark").onclick = () => makeArk(board);
    setInterval(() => loop(boardSize, canvas, ctx, cellSize, canvasSize, board), 1);
}

function loop(boardSize, canvas, ctx, cellSize, canvasSize, board) {
    // console.log("started loop")
    var boardCheck = new Array(boardSize);
    for (var l = 0; l < boardSize; l++) {
        boardCheck[l] = new Array(boardSize);
    }
    //ctx.clearRect(0, 0, boardSize, boardSize);
    for (let i = 1; i < boardSize - 1; i++) {
        for (let j = 1; j < boardSize - 1; j++) {
            let result = checkNeighbors(board, i, j);
            if (result <= 1 || result >= 4) {
                boardCheck[i][j] = false;
            } else if (result == 3) {
                boardCheck[i][j] = true;
            } else {
                boardCheck[i][j] = board[i][j];
            }
        }
    }
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            board[x][y] = boardCheck[x][y];
        }
    }
    drawBoard(board, ctx, cellSize, boardSize);
}

function drawBoard(board, ctx, cellSize, boardSize) {
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            if (board[x][y]) {
                ctx.fillStyle = '#b381ff';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            } else {
                ctx.fillStyle = '#ffd981';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

function checkNeighbors(board, cord1, cord2) {
    let r = cord1 - 1
    let c = cord2 - 1
    let result = 0;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (x != 1 || y != 1) {
                if (board[r + x][c + y])
                    result++;
            }
        }
    }
    // console.log(result);
    return result;
}

function makeArk(board) {
    let x = 5;
    let y = 5;
    board[(x + 6)][y + 28] = true;
    board[(x + 7)][y + 28] = true;
    board[(x + 8)][y + 29] = true;
    board[(x + 8)][y + 30] = true;
    board[(x + 9)][y + 31] = true;
    board[(x + 10)][y + 31] = true;
    board[(x + 11)][y + 31] = true;
    board[(x + 12)][y + 31] = true;
    board[(x + 33)][y + 3] = true;
    board[(x + 33)][y + 7] = true;
    board[(x + 34)][y + 4] = true;
    board[(x + 34)][y + 6] = true;
    board[(x + 35)][y + 5] = true;
    board[(x + 35)][y + 8] = true;
    board[(x + 36)][y + 8] = true;
    board[(x + 37)][y + 8] = true;
}

function init(canvas, ctx, size) {
    ctx.fillStyle = 'black';
    canvas.width = size;
    canvas.height = size;
    ctx.fillRect(0, 0, size, size);
}