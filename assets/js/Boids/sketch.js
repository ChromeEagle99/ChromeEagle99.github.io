

// Declare global variables at the top
let enablePerching = false;
let enableWind = false;
let flock = [];
let predator;

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Event listeners for checkboxes
document.getElementById('perch-toggle').addEventListener('change', function() {
    togglePerching(this.checked);
});
document.getElementById('clear-predators').addEventListener('click', clearPredators);

function mousePressed() {
    // Create a new predator at the mouse location
    let newPredator = new Predator(mouseX, mouseY);
    flock.push(newPredator);  // Assuming all boids, including predators, are in the same array
}

function touchStarted() {
    let newPredator = new Predator(mouseX, mouseY);
    flock.push(newPredator);
    return false; // Prevent default behavior like scrolling and zooming
}

function windowResized() {
    let canvasSize = min(windowWidth, windowHeight) - 5;
    resizeCanvas(canvasSize, canvasSize);
}

function togglePerching(isChecked) {
    enablePerching = isChecked; // Set perching based on checkbox state
}

function clearPredators() {
    flock = flock.filter(boid => !boid.isPredator);
}

function setup() {
	let canvasSize = min(windowWidth, windowHeight) - 5;
    createCanvas(windowWidth - 20, windowHeight - 5);
	
    flock = [];  // Holds both predators and regular boids
    // Optionally add an initial predator
	for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
    let initialPredator = new Predator(random(width), random(height));
    flock.push(initialPredator);
}

function draw() {
    background(51);
    for (let boid of flock) {
		boid.perched = enablePerching;
        boid.edges();
        boid.flock(flock);  // Ensure your flock method appropriately handles different boid types
        boid.update();
        boid.show();
    }
}
