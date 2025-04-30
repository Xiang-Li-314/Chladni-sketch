/* Chladni pattern — bare-bones version */
let particles = [];
const NUM_PARTICLES = 10000;

/* mode indices and node threshold */
const m = 5;          // change these integers for other modes
const n = 13;
const threshold = 0.05;

function setup() {
  createCanvas(500, 500);
  strokeWeight(1);
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);
  for (const p of particles) {
    p.update();
    p.display();
  }
}

/* rectangular-plate Chladni formula */
function chladni(x, y) {
  return cos(n * PI * x) * cos(m * PI * y) -
         cos(m * PI * x) * cos(n * PI * y);
}
