let selector;
let paused;
let cleared;
let logged;
let drawNum;
let boardOriginal;
let skip;
let checkSkip;
window.onload = main;
function main() {
    let canvasSize = 4500;
    const cellSize = 4;
    selector = document.getElementById('selector');
    paused = document.getElementById('paused');
    cleared = document.getElementById('clear');
    logged = document.getElementById('log');
    skip = document.getElementById('skipAmount');
    drawNum = skip.value;
    checkSkip = skip.value;
    const boardSize = (canvasSize / cellSize);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', (e) => mouseClick(e, board, ctx, cellSize), false);
    init(canvas, ctx, canvasSize);
    var board = new Array(boardSize);
    boardOriginal = new Array(boardSize);
    for (var i = 0; i < boardSize; i++) {
        boardOriginal[i] = new Array(boardSize);
    }
    for (i = 0; i < boardSize; i++) {
        board[i] = new Array(boardSize);
    }
    var boardCheck = new Array(boardSize);
    for (var l = 0; l < boardSize; l++) {
        boardCheck[l] = new Array(boardSize);
    }
    for (let x = 2; x < boardSize - 2; x++) {
        for (let y = 2; y < boardSize - 2; y++) {
            board[x][y] = false;
            boardOriginal[x][y] = false;
        }
    }
    logged.onclick = () => log(board, boardSize);
    cleared.onclick = () => clear(board, boardSize, ctx, canvasSize);
    setInterval(() => loop(boardSize, canvas, ctx, cellSize, canvasSize, board, boardCheck), 1);
}
function loop(boardSize, canvas, ctx, cellSize, canvasSize, board, boardCheck) {
    if (checkSkip != skip.value) {
        drawNum = skip.value;
        checkSkip = skip.value;
    }
    if (!paused.checked) {
        // console.log("started loop")
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
    }
    if (drawNum == 0) {
        drawNum = skip.value;
        drawBoard(board, ctx, cellSize, boardSize, canvasSize);
    }
    drawNum--;
}
function mouseClick(e, board, ctx, cellSize, boardSize) {
    var mouseX, mouseY;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    var gridX = Math.floor(mouseX / cellSize);
    var gridY = Math.floor(mouseY / cellSize);
    makeOnClick(gridX, gridY, board, boardSize);
}
function drawBoard(board, ctx, cellSize, boardSize, canvasSize) {
    //ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            if (boardOriginal[x][y] != board[x][y]) {
                if (board[x][y]) {
                    ctx.fillStyle = '#302BA3';
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
                else {
                    ctx.fillStyle = '#FFFC24';
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    }
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            boardOriginal[x][y] = board[x][y];
        }
    }
}
function log(board, boardSize) {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++)
            if (board[i][j])
                console.log("board[gridX + " + i + "][gridY + " + j + "] = true;");
    }
}
function makeSpaceship(gridX, gridY, board) {
    board[gridX + 0][gridY + 39] = true;
    board[gridX + 1][gridY + 37] = true;
    board[gridX + 1][gridY + 38] = true;
    board[gridX + 1][gridY + 40] = true;
    board[gridX + 1][gridY + 41] = true;
    board[gridX + 4][gridY + 36] = true;
    board[gridX + 4][gridY + 37] = true;
    board[gridX + 4][gridY + 38] = true;
    board[gridX + 4][gridY + 40] = true;
    board[gridX + 4][gridY + 41] = true;
    board[gridX + 4][gridY + 42] = true;
    board[gridX + 5][gridY + 36] = true;
    board[gridX + 5][gridY + 37] = true;
    board[gridX + 5][gridY + 41] = true;
    board[gridX + 5][gridY + 42] = true;
    board[gridX + 6][gridY + 32] = true;
    board[gridX + 6][gridY + 33] = true;
    board[gridX + 6][gridY + 34] = true;
    board[gridX + 6][gridY + 44] = true;
    board[gridX + 6][gridY + 45] = true;
    board[gridX + 6][gridY + 46] = true;
    board[gridX + 8][gridY + 32] = true;
    board[gridX + 8][gridY + 34] = true;
    board[gridX + 8][gridY + 44] = true;
    board[gridX + 8][gridY + 46] = true;
    board[gridX + 9][gridY + 34] = true;
    board[gridX + 9][gridY + 35] = true;
    board[gridX + 9][gridY + 43] = true;
    board[gridX + 9][gridY + 44] = true;
    board[gridX + 10][gridY + 34] = true;
    board[gridX + 10][gridY + 44] = true;
    board[gridX + 11][gridY + 33] = true;
    board[gridX + 11][gridY + 34] = true;
    board[gridX + 11][gridY + 44] = true;
    board[gridX + 11][gridY + 45] = true;
    board[gridX + 12][gridY + 34] = true;
    board[gridX + 12][gridY + 44] = true;
    board[gridX + 13][gridY + 34] = true;
    board[gridX + 13][gridY + 37] = true;
    board[gridX + 13][gridY + 41] = true;
    board[gridX + 13][gridY + 44] = true;
    board[gridX + 14][gridY + 34] = true;
    board[gridX + 14][gridY + 37] = true;
    board[gridX + 14][gridY + 41] = true;
    board[gridX + 14][gridY + 44] = true;
    board[gridX + 15][gridY + 32] = true;
    board[gridX + 15][gridY + 34] = true;
    board[gridX + 15][gridY + 35] = true;
    board[gridX + 15][gridY + 43] = true;
    board[gridX + 15][gridY + 44] = true;
    board[gridX + 15][gridY + 46] = true;
    board[gridX + 16][gridY + 31] = true;
    board[gridX + 16][gridY + 33] = true;
    board[gridX + 16][gridY + 45] = true;
    board[gridX + 16][gridY + 47] = true;
    board[gridX + 18][gridY + 33] = true;
    board[gridX + 18][gridY + 45] = true;
    board[gridX + 19][gridY + 33] = true;
    board[gridX + 19][gridY + 45] = true;
    board[gridX + 20][gridY + 33] = true;
    board[gridX + 20][gridY + 45] = true;
    board[gridX + 21][gridY + 32] = true;
    board[gridX + 21][gridY + 33] = true;
    board[gridX + 21][gridY + 45] = true;
    board[gridX + 21][gridY + 46] = true;
    board[gridX + 22][gridY + 32] = true;
    board[gridX + 22][gridY + 33] = true;
    board[gridX + 22][gridY + 45] = true;
    board[gridX + 22][gridY + 46] = true;
    board[gridX + 23][gridY + 33] = true;
    board[gridX + 23][gridY + 35] = true;
    board[gridX + 23][gridY + 36] = true;
    board[gridX + 23][gridY + 37] = true;
    board[gridX + 23][gridY + 41] = true;
    board[gridX + 23][gridY + 42] = true;
    board[gridX + 23][gridY + 43] = true;
    board[gridX + 23][gridY + 45] = true;
    board[gridX + 24][gridY + 35] = true;
    board[gridX + 24][gridY + 36] = true;
    board[gridX + 24][gridY + 37] = true;
    board[gridX + 24][gridY + 41] = true;
    board[gridX + 24][gridY + 42] = true;
    board[gridX + 24][gridY + 43] = true;
    board[gridX + 25][gridY + 35] = true;
    board[gridX + 25][gridY + 36] = true;
    board[gridX + 25][gridY + 42] = true;
    board[gridX + 25][gridY + 43] = true;
    board[gridX + 26][gridY + 34] = true;
    board[gridX + 26][gridY + 35] = true;
    board[gridX + 26][gridY + 43] = true;
    board[gridX + 26][gridY + 44] = true;
    board[gridX + 27][gridY + 36] = true;
    board[gridX + 27][gridY + 42] = true;
    board[gridX + 28][gridY + 33] = true;
    board[gridX + 28][gridY + 45] = true;
    board[gridX + 29][gridY + 33] = true;
    board[gridX + 29][gridY + 34] = true;
    board[gridX + 29][gridY + 44] = true;
    board[gridX + 29][gridY + 45] = true;
    board[gridX + 31][gridY + 32] = true;
    board[gridX + 31][gridY + 34] = true;
    board[gridX + 31][gridY + 35] = true;
    board[gridX + 31][gridY + 43] = true;
    board[gridX + 31][gridY + 44] = true;
    board[gridX + 31][gridY + 46] = true;
    board[gridX + 32][gridY + 31] = true;
    board[gridX + 32][gridY + 34] = true;
    board[gridX + 32][gridY + 35] = true;
    board[gridX + 32][gridY + 43] = true;
    board[gridX + 32][gridY + 44] = true;
    board[gridX + 32][gridY + 47] = true;
    board[gridX + 33][gridY + 30] = true;
    board[gridX + 33][gridY + 34] = true;
    board[gridX + 33][gridY + 35] = true;
    board[gridX + 33][gridY + 43] = true;
    board[gridX + 33][gridY + 44] = true;
    board[gridX + 33][gridY + 48] = true;
    board[gridX + 34][gridY + 31] = true;
    board[gridX + 34][gridY + 47] = true
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
function makeArk(gridX, gridY, board) {
    board[(gridX + 6)][gridY + 28] = true;
    board[(gridX + 7)][gridY + 28] = true;
    board[(gridX + 8)][gridY + 29] = true;
    board[(gridX + 8)][gridY + 30] = true;
    board[(gridX + 9)][gridY + 31] = true;
    board[(gridX + 10)][gridY + 31] = true;
    board[(gridX + 11)][gridY + 31] = true;
    board[(gridX + 12)][gridY + 31] = true;
    board[(gridX + 33)][gridY + 3] = true;
    board[(gridX + 33)][gridY + 7] = true;
    board[(gridX + 34)][gridY + 4] = true;
    board[(gridX + 34)][gridY + 6] = true;
    board[(gridX + 35)][gridY + 5] = true;
    board[(gridX + 35)][gridY + 8] = true;
    board[(gridX + 36)][gridY + 8] = true;
    board[(gridX + 37)][gridY + 8] = true;
}
function makeWarning(board, boardSize) {
    for (let x = 2; x < board.length - 2; x++) {
        for (let y = 2; y < board.length - 2; y++) {
            board[x][y] = true;
        }
    }
}
function decodeRLE(rle, board, gridX, gridY) {
    // let lines = rle.split("\n");
    // let first = lines[0].replace( /\s/g, '');
    // let width = first.split(",")[0].substring(2);
    // let height = first.split(",")[1].substring(2);
    let cells = [];
    let x = 0;
    let y = 0;
    let runCount = 1;
    let cellInfo = rle.replace( /\s/g, '');
    // let cellInfo = lines.slice(1).join().replace( /\s/g, '');
    for (let i = 0; i < cellInfo.length; i++) {
    if (cellInfo[i] == "b") {
        x += runCount;
        console.log(runCount+"b");
        runCount = 1;
    } else if (cellInfo[i] == "o") {
        for (let z = 0; z < runCount; z++) {
        console.log("adding: " + x + ", " + y);
        cells.push([x, y])
        x++;
        }
        runCount = 1;
        console.log(runCount+"o");
    } else if (cellInfo[i] == "$") {
        x = 0;
        y += runCount;
        runCount = 1;
        console.log("$");
    } else if (isNumber(cellInfo[i])) {
        let j = i+1;
        let originalI = i;
        while (isNumber(cellInfo[j])) {
        j++;
        i++;
        }
        runCount = parseInt(cellInfo.substring(originalI, j));
        //console.log(cellInfo.substring(i+1))
        console.log(parseInt(cellInfo.substring(originalI, j)));
    }
    }
    console.log(cells);
    cell2Board(cells, board, gridX, gridY);
}
function cell2Board(cells, board, gridX, gridY) {
    let newArray;
    for (let i = 0; i < cells.length; i++) {
        newArray = cells[i];
        console.log(newArray[0] + " " + newArray[1]);
        board[newArray[0] + gridX][newArray[1] + gridY] = true;
    }
}
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}
function init(canvas, ctx, size) {
    ctx.fillStyle = '#FFFC24';
    canvas.width = size;
    canvas.height = size;
    //ctx.fillRect(0, 0, size, size);
}
function clear(board, boardSize, ctx, canvasSize) {
    console.log("cleaerd")
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            board[x][y] = false;
            boardOriginal[x][y] = false;
        }
    }
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}
function makeOnClick(gridX, gridY, board, boardSize) {
    // console.log ("gone in here");
    if (selector.value == 0)
        board[gridX][gridY] = !board[gridX][gridY];
    else if (selector.value == 1)
        makeArk(gridX - 20, gridY - 20, board);
    else if (selector.value == 2)
        makeSpaceship(gridX, gridY - 39, board)
    else if (selector.value == 3)
        makeWarning(board, boardSize)
    else if (selector.value == 4) {
        decodeRLE(document.getElementById("decoder").value, board, gridX, gridY);
    }

}