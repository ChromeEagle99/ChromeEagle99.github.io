function aStarStep() {
    if (openSet.length > 0) {
        let current = openSet[0];
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].f < current.f) {
                current = openSet[i];
            }
        }

        if (current === endNode) {
            let temp = current;
            path = [];
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            searchInProgress = false;
            pathFound = true;
            animatePath();
            return;
        }

        openSet = openSet.filter(node => node !== current);
        closedSet.push(current);

        let neighbors = current.neighbors;
        for (let neighbor of neighbors) {
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + 1;
                let newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }
                if (newPath) {
                    neighbor.h = heuristic(neighbor, endNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
    } else {
        searchInProgress = false;
    }
}

function heuristic(a, b) {
    // Manhattan distance
    return abs(a.i - b.i) + abs(a.j - b.j);
}

function animatePath() {
    let delay = 0;
    for (let i = path.length - 1; i >= 0; i--) {
        setTimeout(() => {
            path[i].setState('path');
            setTimeout(() => {
                path[i].setState('finalPath');
            }, 500); // Delay for final color
        }, delay);
        delay += 100; // Adjust the delay as needed for animation timing
    }
}
