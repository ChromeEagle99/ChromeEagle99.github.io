// Boid class definition encapsulating all behaviors of a boid
class Boid {
	// Initialize position, velocity, and acceleration vectors
    constructor(x = random(width), y = random(height)) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;
        this.perched = false;
        this.perchTime = 0;
    }

	// Handle boid appearing on the opposite side when it goes off canvas
    edges() {
        if (this.position.x > width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
    }

	// Alignment behavior: steer towards average heading of local flockmates
    align(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = this.position.dist(other.position);
            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 25;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = this.position.dist(other.position);
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = this.position.dist(other.position);
            if (other != this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    avoidPredator(predator) {
        let perceptionRadius = 100;
        let steering = createVector();
        let d = this.position.dist(predator.position);
        if (d < perceptionRadius) {
            steering = p5.Vector.sub(this.position, predator.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

	perch() {
		if (this.position.y > height - 50 && !this.perched) {
			this.velocity.mult(0);
			this.perched = true;
			this.perchTime = millis();
		}
	}

	takeOff() {
		if (this.perched && millis() - this.perchTime > 5000) { // Change 5000 to another value if needed
			this.perched = false;
			this.velocity = p5.Vector.random2D();
			this.velocity.setMag(random(2, 4));
		}
	}

    flock(boids) {
        let alignment = this.align(boids);
        let separation = this.separation(boids);
        let cohesion = this.cohesion(boids);
        let predatorAvoidance = createVector();

        // Check each boid if it's a predator and calculate avoidance
        for (let other of boids) {
            if (other.isPredator && other !== this) {
                let avoidance = this.avoidPredator(other);
                predatorAvoidance.add(avoidance);
            }
        }

        separation.mult(1.5);
        cohesion.mult(1.0);
        alignment.mult(1.0);
        predatorAvoidance.mult(2.0);  // Adjust multiplier as needed

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        this.acceleration.add(predatorAvoidance);
    }

    update() {
        if (!this.perched) {
            this.position.add(this.velocity);
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
            this.acceleration.mult(0);
        }
    }

    show() {
        if (this.isPredator) {
            stroke(255, 0, 0);  // Red color for the predator
        } else {
			// Set the thickness and color for the velocity line
			strokeWeight(2);
            stroke(255);  // White color for other boids
			line(this.position.x, this.position.y, this.position.x + this.velocity.x * 5, this.position.y + this.velocity.y * 5);
        }
		strokeWeight(8);
        // Draw the boid as a point
        point(this.position.x, this.position.y);        
    }
}