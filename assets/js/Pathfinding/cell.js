class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
        this.previous = undefined;
        this.wall = false;
        this.state = 'default';
        this.size = w; // Initial size
        this.targetSize = w;
        this.lerpFactor = 0.1; // Speed of interpolation
        this.shrink = false;
        this.color = colors[this.state];
        this.targetColor = this.color;
        this.pathAnimating = false;
        this.isStart = false;
        this.isEnd = false;
        this.prevState = 'default';

        if (random(1) < 0.3 && !(this.i === 0 && this.j === 0) && !(this.i === cols - 1 && this.j === rows - 1)) {
            this.wall = true;
            this.state = 'wall';
            this.color = colors.wall;
        }
    }

    show() {
        fill(this.color[0], this.color[1], this.color[2]);
        stroke(0);
        rectMode(CENTER);
        rect(this.i * w + w / 2, this.j * h + h / 2, this.size, this.size);

        if (this.shrink) {
            this.size = lerp(this.size, this.targetSize, this.lerpFactor);
            if (abs(this.size - this.targetSize) < 0.1) {
                this.size = this.targetSize;
                this.shrink = false;
            }
        }

        if (this.pathAnimating) {
            this.color = [
                lerp(this.color[0], this.targetColor[0], this.lerpFactor),
                lerp(this.color[1], this.targetColor[1], this.lerpFactor),
                lerp(this.color[2], this.targetColor[2], this.lerpFactor)
            ];
            if (abs(this.color[0] - this.targetColor[0]) < 0.1 &&
                abs(this.color[1] - this.targetColor[1]) < 0.1 &&
                abs(this.color[2] - this.targetColor[2]) < 0.1) {
                this.pathAnimating = false;
                this.color = this.targetColor; // Ensure final color is set
            }
        }

        // Ensure start and end colors are always correct
        if (this.isStart) {
            this.color = colors.start;
        } else if (this.isEnd) {
            this.color = colors.end;
        }
    }

    setState(state) {
        // Prevent changing the state of start and end cells
        if (this.isStart || this.isEnd) {
            return;
        }

        this.prevState = this.state;
        this.state = state;
        if (state === 'open') {
            if (this.prevState !== 'open') {
                this.size = 1.5 * w;
            }
            this.targetSize = w;
            this.shrink = true;
            this.color = colors[state];
        } else if (state === 'path') {
            this.pathAnimating = true;
            this.size = w; // Keep the same size as normal cells
            this.color = [255, 255, 0]; // Initial yellow color for animation
            this.targetColor = colors.finalPath; // Final yellow color
        } else if (state === 'finalPath') {
            this.color = colors.finalPath;
            this.pathAnimating = false; // Ensure no further animation
        } else {
            this.color = colors[state];
        }
    }

    addNeighbors(grid) {
        if (this.i < cols - 1) {
            this.neighbors.push(grid[this.i + 1][this.j]);
        }
        if (this.i > 0) {
            this.neighbors.push(grid[this.i - 1][this.j]);
        }
        if (this.j < rows - 1) {
            this.neighbors.push(grid[this.i][this.j + 1]);
        }
        if (this.j > 0) {
            this.neighbors.push(grid[this.i][this.j - 1]);
        }
    }
}
