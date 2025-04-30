/* Minimal particle that roams a rectangular Chladni field */
class Particle {
    constructor() {
      this.position     = createVector(random(width), random(height));
      this.velocity     = p5.Vector.random2D();
      this.acceleration = createVector();
      this.maxSpeed     = 2;
      this.maxForce     = 0.1;
    }
  
    /* wrap around canvas edges */
    edges() {
      if (this.position.x > width)  this.position.x = 0;
      if (this.position.x < 0)      this.position.x = width;
      if (this.position.y > height) this.position.y = 0;
      if (this.position.y < 0)      this.position.y = height;
    }
  
    /* steer according to Chladni field value */
    seek() {
      const x  = map(this.position.x, 0, width,  -1, 1);
      const y  = map(this.position.y, 0, height, -1, 1);
      const val = chladni(x, y);
  
      let target = this.position.copy();
      if (abs(val) > threshold) {
        target.x += random(-3, 3);
        target.y += random(-3, 3);
      }
  
      const desired  = p5.Vector.sub(target, this.position).setMag(this.maxSpeed);
      const steering = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
      return steering;
    }
  
    update() {
      this.acceleration.add(this.seek());
      this.velocity.add(this.acceleration).limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.edges();
    }
  
    display() {
      stroke(255);
      point(this.position.x, this.position.y);
    }
  }
  