let particles = [];
const NUM_PARTICLES = 1000;
let m = 1, n = 1;            // now mutable
const threshold = 0.05;

let mInput, nInput;

function setup() {
    createCanvas(200, 200);
    strokeWeight(1);
  
    // create m input
    mInput = createInput(m.toString(), 'number')
              .style('width','50px')
              .position(10, 10)        // ← place at (10,10)
              .input(updateModes);
  
    // create n input
    nInput = createInput(n.toString(), 'number')
              .style('width','50px')
              .position(70, 10)        // ← place just to the right
              .input(updateModes);
  
    // init particles …
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push(new Particle());
    }
  }

function updateModes() {
  // read & clamp the inputs
  const mi = parseInt(mInput.value(), 10);
  const ni = parseInt(nInput.value(), 10);

  // only overwrite if it really is a number
  if (!isNaN(mi)) m = mi;
  if (!isNaN(ni)) n = ni;

  // kick every particle so pattern reorganizes
  for (let p of particles) {
    p.velocity = p5.Vector.random2D().mult(random(2, 5));
  }
}

function draw() {
  background(0);
  for (let p of particles) {
    p.update();
    p.display();
  }
}

// your existing Particle class stays exactly the same…

function chladni(x, y) {
  return cos(n * PI * x) * cos(m * PI * y) -
         cos(m * PI * x) * cos(n * PI * y);
}
