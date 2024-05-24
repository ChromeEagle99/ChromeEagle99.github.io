let cols, rows;
let grid;
let startNode, endNode;
let openSet = [];
let closedSet = [];
let path = [];
let algorithm = 'dijkstra';
let w, h;
let searchInProgress = false;
let speed = 50;
let pathFound = false;
let setStartMode = false;
let setEndMode = false;

const colors = {
    default: [255, 255, 255],
    wall: [0, 0, 0],
    start: [0, 255, 0],
    end: [255, 0, 0],
    open: [0, 255, 255],
    closed: [255, 0, 255],
    path: [0, 0, 255],
    finalPath: [255, 255, 0]
};

function setup() {
    let canvas = createCanvas(windowWidth - 40, windowHeight - 200);
    canvas.parent('interactivecanvasPlaceholder');
    initializeGrid();
}

function draw() {
    background(255);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }

    // Avoid resetting the state of cells that are part of the final path
    if (!pathFound || searchInProgress) {
        for (let cell of closedSet) {
            if (cell.state !== 'finalPath') {
                cell.setState('closed');
            }
        }

        for (let cell of openSet) {
            if (cell.state !== 'finalPath') {
                cell.setState('open');
            }
        }
    }

    if (searchInProgress) {
        if (frameCount % int(100 / speed) === 0) {
            if (algorithm === 'dijkstra') {
                dijkstraStep();
            } else if (algorithm === 'a_star') {
                aStarStep();
            }
        }
    }

    if (pathFound && !searchInProgress) {
        for (let cell of openSet) {
            if (cell.state !== 'finalPath') {
                cell.setState('open');
            }
        }
    }

    // Ensure start and end nodes are always correct
    startNode.color = colors.start;
    endNode.color = colors.end;
}

function mousePressed() {
    if (searchInProgress) return;

    let i = floor(mouseX / w);
    let j = floor(mouseY / h);

    if (i >= 0 && i < cols && j >= 0 && j < rows) {
        let cell = grid[i][j];
        if (setStartMode && !cell.isEnd) {
            setStartNode(cell);
        } else if (setEndMode && !cell.isStart) {
            setEndNode(cell);
        } else if (!cell.isStart && !cell.isEnd) {
            cell.wall = !cell.wall;
            cell.setState(cell.wall ? 'wall' : 'default');
        }
    }
}

function setStartNode(cell) {
    startNode.isStart = false;
    startNode.setState('default');
    startNode = cell;
    startNode.isStart = true;
    startNode.setState('start');
    setStartMode = false;
    document.getElementById('setStartButton').classList.remove('active-button');
}

function setEndNode(cell) {
    endNode.isEnd = false;
    endNode.setState('default');
    endNode = cell;
    endNode.isEnd = true;
    endNode.setState('end');
    setEndMode = false;
    document.getElementById('setEndButton').classList.remove('active-button');
}

function toggleSetStart() {
    setStartMode = !setStartMode;
    setEndMode = false;
    document.getElementById('setStartButton').classList.toggle('active-button', setStartMode);
    document.getElementById('setEndButton').classList.remove('active-button');
}

function toggleSetEnd() {
    setEndMode = !setEndMode;
    setStartMode = false;
    document.getElementById('setEndButton').classList.toggle('active-button', setEndMode);
    document.getElementById('setStartButton').classList.remove('active-button');
}

function windowResized() {
    resizeCanvas(windowWidth - 40, windowHeight - 200);
    initializeGrid();
}

function initializeGrid() {
    cols = Math.floor((windowWidth - 40) / 20); // 20 is an arbitrary cell size
    rows = Math.floor((windowHeight - 200) / 20); // Adjust based on desired cell size
    w = width / cols;
    h = height / rows;

    grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    startNode = grid[0][0];
    endNode = grid[cols - 1][rows - 1];
    startNode.wall = false;
    endNode.wall = false;
    startNode.isStart = true;
    endNode.isEnd = true;
    startNode.state = 'start';
    endNode.state = 'end';
}

function selectAlgorithm(algo) {
    algorithm = algo;
}

function startPathfinding() {
    resetPathfinding();
    searchInProgress = true;
    pathFound = false;
}

function resetGrid() {
    initializeGrid();
    resetPathfinding();
    searchInProgress = false;
    pathFound = false;
}

function clearOpenClosed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].state === 'open' || grid[i][j].state === 'closed' || grid[i][j].state === 'path' || grid[i][j].state === 'finalPath') {
                grid[i][j].state = 'default';
                grid[i][j].color = colors.default;
                grid[i][j].shrink = false;
                grid[i][j].pathAnimating = false;
                grid[i][j].targetSize = w;
                grid[i][j].size = w;
            }
        }
    }
    openSet = [];
    closedSet = [];
    path = [];
    pathFound = false;
}

function clearAll() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].state = 'default';
            grid[i][j].color = colors.default;
            grid[i][j].wall = false;
            grid[i][j].shrink = false;
            grid[i][j].pathAnimating = false;
            grid[i][j].targetSize = w;
            grid[i][j].size = w;
            grid[i][j].isStart = false;
            grid[i][j].isEnd = false;
        }
    }
    startNode.state = 'default';
    endNode.state = 'default';
    startNode = grid[0][0];
    endNode = grid[cols - 1][rows - 1];
    startNode.isStart = true;
    endNode.isEnd = true;
    startNode.state = 'start';
    endNode.state = 'end';
    openSet = [];
    closedSet = [];
    path = [];
    pathFound = false;
    searchInProgress = false;
    settingStart = true; // Reset to setting start position
}

function resetPathfinding() {
    openSet = [];
    closedSet = [];
    path = [];
    openSet.push(startNode);
}

function updateSpeed(value) {
    speed = value;
}
