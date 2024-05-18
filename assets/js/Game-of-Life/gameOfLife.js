let cols, rows;
let currentBoard, nextBoard;
let resolution = 20;
let isPaused = true;
let canvas;
let speed = 10;
let wrapEdges = true;

function setup() {
  // Set initial values from the input fields
  resolution = parseInt(document.getElementById('grid-size').value);
  rows = parseInt(document.getElementById('rows').value);
  cols = parseInt(document.getElementById('cols').value);

  createCanvasGrid();

  document.getElementById('apply-settings').addEventListener('click', () => {
    resolution = parseInt(document.getElementById('grid-size').value);
    rows = parseInt(document.getElementById('rows').value);
    cols = parseInt(document.getElementById('cols').value);
    createCanvasGrid();
  });

  document.getElementById('start').addEventListener('click', () => {
    isPaused = false;
  });

  document.getElementById('pause').addEventListener('click', () => {
    isPaused = true;
  });

  document.getElementById('next-step').addEventListener('click', () => {
    if (isPaused) {
      computeNextGeneration();
      drawGrid();
    }
  });

  document.getElementById('spawn-glider').addEventListener('click', spawnGlider);

  document.getElementById('speed').addEventListener('input', (event) => {
    speed = parseInt(event.target.value);
    document.getElementById('speed-value').textContent = speed;
    frameRate(speed);
  });

  document.getElementById('toggle-edges').addEventListener('click', () => {
    wrapEdges = !wrapEdges;
    document.getElementById('toggle-edges').textContent = wrapEdges ? 'Toggle Edge Behavior: Wrap Around' : 'Toggle Edge Behavior: Dead Edges';
  });

  frameRate(speed);  // Set initial frame rate
}

function createCanvasGrid() {
  if (canvas) {
    canvas.remove();
  }
  canvas = createCanvas(cols * resolution, rows * resolution);
  canvas.parent('canvas-container');
  currentBoard = create2DArray(cols, rows);
  nextBoard = create2DArray(cols, rows);
  initializeBoard();
  drawGrid();
}

function initializeBoard() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
    }
  }
}

function draw() {
  if (!isPaused) {
    computeNextGeneration();
  }
  drawGrid();
  highlightCell();
}

function drawGrid() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * resolution;
      const y = j * resolution;
      if (currentBoard[i][j] == 1) {
        fill(0);
      } else {
        fill(255);
      }
      stroke(0);
      rect(x, y, resolution - 1, resolution - 1);
    }
  }
}

function computeNextGeneration() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = currentBoard[i][j];
      let neighbors = countNeighbors(currentBoard, i, j);

      if (state == 0 && neighbors == 3) {
        nextBoard[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        nextBoard[i][j] = 0;
      } else {
        nextBoard[i][j] = state;
      }
    }
  }

  let temp = currentBoard;
  currentBoard = nextBoard;
  nextBoard = temp;
}

function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function countNeighbors(board, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      let col = x + i;
      let row = y + j;
      if (wrapEdges) {
        col = (col + cols) % cols;
        row = (row + rows) % rows;
      } else {
        if (col < 0 || col >= cols || row < 0 || row >= rows) {
          continue;
        }
      }
      sum += board[col][row];
    }
  }
  return sum;
}

function mousePressed() {
  const col = Math.floor(mouseX / resolution);
  const row = Math.floor(mouseY / resolution);
  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    currentBoard[col][row] = currentBoard[col][row] ? 0 : 1;
    drawGrid();
  }
}

function highlightCell() {
  const col = Math.floor(mouseX / resolution);
  const row = Math.floor(mouseY / resolution);
  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    fill(200);
    stroke(0);
    rect(col * resolution, row * resolution, resolution - 1, resolution - 1);
  }
}

function spawnGlider() {
  const midX = Math.floor(cols / 2);
  const midY = Math.floor(rows / 2);
  currentBoard[midX][midY] = 1;
  currentBoard[midX + 1][midY] = 1;
  currentBoard[midX + 2][midY] = 1;
  currentBoard[midX + 2][midY - 1] = 1;
  currentBoard[midX + 1][midY - 2] = 1;
  drawGrid();
}