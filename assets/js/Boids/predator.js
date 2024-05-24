class Predator extends Boid {
    constructor(x, y) {
        super(x, y);  // Call the parent constructor, assuming Boid can take initial positions
        this.isPredator = true;  // Specific flag for predators
		this.auraRadius = 0;  // Starting radius of the aura
        this.auraGrowthRate = 0.5;  // How fast the aura grows
        this.auraMaxSize = 20;  // Maximum size of the aura
		this.auraGrowing = true;  // Is the aura currently growing?
    }

    // Override the show method to display the predator differently if needed
    show() {
        stroke(255, 0, 0);  // Red color for the predator
        strokeWeight(8);
        point(this.position.x, this.position.y);
		
		// Draw the aura
        noFill();
        strokeWeight(2);
        stroke(255, 100, 100, 150);  // Slightly transparent
        ellipse(this.position.x, this.position.y, this.auraRadius * 2, this.auraRadius * 2); // Diameter needs to be twice the radius

        // Update the aura's size
        if (this.auraGrowing) {
            this.auraRadius += this.auraGrowthRate;
            if (this.auraRadius >= this.auraMaxSize) {
                this.auraGrowing = false;  // Start shrinking
            }
        } else {
            this.auraRadius -= this.auraGrowthRate;
            if (this.auraRadius <= 0) {
                this.auraGrowing = true;  // Start growing
            }
        }
    }
	
	update() {
        // super.update();  // Call the update method from Boid class
        // Aura update logic is handled in show to keep graphics updates consolidated
    }
}