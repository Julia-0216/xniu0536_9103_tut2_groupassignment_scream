//Random Shape class
class randomShape {
  constructor(type) {
    this.type = type;
    this.x = random(0.8);
    this.y = random(0.8);

    this.size = random(0.08, 0.25);

    //low-saturation red-brown tones
    let baseR = random(120, 200);
    let baseG = baseR - random(30, 80);
    let baseB = random(20, 60);
    this.color = [baseR, baseG, baseB];

    this.scale = 1;
  }

  display(scale) {
    this.scale = scale;
    fill(this.color[0], this.color[1], this.color[2], 140);
    noStroke();

    let minDimension = min(width, height); 

    let size = this.size * minDimension;

    size = size * this.scale;

    let x = this.x * width;
    let y = this.y * height;

    // Draw the shape
    switch (this.type) {
      case "circle":
        ellipse(x, y, size, size);
        break;
      case "square":
        push();
        rectMode(CENTER);
        rect(x, y, size, size);
        pop();
        break;
    }
  }
}

// Array to hold the shapes
let shapes = [];

// audio setup
let song;
let analyser;
let fft;
let volume = 1.0;
let pan = 0.0;

// FFT setup
let numBins = 128;
let smoothing = 0.4;

// load audio
function preload() {
  song = loadSound('Gyorgy LigetiAtmospheres.wav'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // amplitude analyser
  analyser = new p5.Amplitude();
  analyser.setInput(song);

  // FFT for frequency analysis
  fft = new p5.FFT(smoothing, numBins);
  song.connect(fft);

  // draw random shapes 
  for (let i = 0; i < numBins; i++) {
    let shapeType = Math.random() > 0.5 ? "circle" : "square";
    shapes.push(new randomShape(shapeType));
  }

  // button setup
  let button = createButton('Play / Pause');
  button.position(20, 20);
  button.mousePressed(togglePlay);
}

// toggle playback
function togglePlay() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.loop();
    song.setVolume(volume);
    song.pan(pan);
  }
}

// mouseMoved volume and pan control
function mouseMoved() {
  volume = map(mouseY, 0, height, 1, 0, true);
  song.setVolume(volume);

  pan = map(mouseX, 0, width, -1, 1, true);
  song.pan(pan);
}

function draw() {
  background(0);

  //audio amplitude rms
  let rms = analyser.getLevel();

  // FFT
  let spectrum = fft.analyze();

  drawSky(rms);
  drawWater(rms);
  drawBridge();
  drawBGPeople();
  drawScreamingPeople(rms, spectrum);

  // use the spectrum to control the scale of each random shape
  for (let i = 0; i < shapes.length && i < spectrum.length; i++) {
    let scale = spectrum[i] / 255;
    shapes[i].display(scale);
  }

  // volume and pan text
  fill(255);
  textSize(14);
  text("Volume: " + volume.toFixed(2), 20, 60);
  text("Pan: " + pan.toFixed(2), 20, 80);

}

// drawing functions
function drawSky(rms) {

  //map rms tp a movement factor
  let skyFactor = map(rms, 0, 0.3, 0.8, 3.8, true);

  // Orange and yellow wavy bands
  for (let i = 0; i < height * 0.4; i += 15) {

    // Add audio factor to the main waves
    let wave = sin(i * 0.05) * 50 * skyFactor;
    let wave2 = cos(i * 0.08) * 30 * skyFactor;

    // Orange to yellow gradient
    let r = 255 - i * 0.2 + sin(i * 0.1) * 20;
    let g = 150 + i * 0.3 + cos(i * 0.15) * 15;

    noStroke();
    //little change with skyFactor
    fill(r, g, 0, 140 + skyFactor * 40);

    // Draw wavy bands using rectangles
    for (let x = 0; x < width; x += 5) {
      let y = i
        + sin(x * 0.01 + i * 0.05) * 30 * skyFactor
        + sin(x * 0.02 + i * 0.1) * 20 * skyFactor
        + wave + wave2;

      rect(x, y, 5, 20);
    }
  }
}

function drawWater(rms) {
  //map rms for water
  let waterFactor = map(rms, 0, 0.3, 0.8, 2.5, true);

  // Dark swirling blues and purples
  for (let i = height * 0.4; i < height * 0.7; i += 12) {
    let wave = sin(i * 0.1) * 40 * waterFactor;
    let wave2 = cos(i * 0.15) * 30 * waterFactor;

    // More color variation
    let r = 20 + sin(i * 0.2) * 10;
    let g = 30 + i * 0.3 + cos(i * 0.25) * 15 + waterFactor * 5;
    let b = 60 + i * 0.2 + sin(i * 0.3) * 20 + waterFactor * 10;

    fill(r, g, b, 140 + waterFactor * 20);
    noStroke();

    // Draw wavy water using rectangles
    for (let x = 0; x < width; x += 3) {
      let y = i
        + sin(x * 0.02 + i * 0.1) * 25 * waterFactor
        + sin(x * 0.03 + i * 0.2) * 15 * waterFactor
        + cos(x * 0.015 + i * 0.12) * 10 * waterFactor
        + wave + wave2;

      rect(x, y, 3, height - y);
    }
  }
}

function drawBridge() {
  // Bridge from left middle to bottom middle
  let startX = 0;
  let startY = height * 0.4;
  let endX = width * 0.8;
  let endY = height;
  
  // Calculate distance and angle
  let bridgeLength = dist(startX, startY, endX, endY);
  let angle = atan2(endY - startY, endX - startX);
  
  push();
  translate(startX, startY);
  rotate(angle);
  
  // Bridge surface
  fill(80, 40, 20, 200);
  noStroke();
  rect(10, 10, bridgeLength, 500);
  rect(-100, -50, bridgeLength + 300, 30);
  rect(-100, 50, bridgeLength + 300, 30);
  rect(-100, 150, bridgeLength + 300, 30);
  rect(-100, 250, bridgeLength + 300, 30);

  // Bridge railings
  stroke(100, 50, 30);
  strokeWeight(4);
  for (let x = 0; x < bridgeLength; x += 20) {
    line(x, 10, x, -20);
  }

  fill("white")
  rect(-100, 100, bridgeLength + 300, 30);
  rect(-100, 200, bridgeLength + 300, 30);
  rect(-100, -40, bridgeLength + 300, 10);

  pop();
}

function drawBGPeople() {
  fill(20, 30, 50);
  noStroke();

  // First people
  let fig1X = width * 0.1;
  let fig1Y = height * 0.5 + (height * 0.5) * 0.2;
  ellipse(fig1X, fig1Y, 40, 80);
  ellipse(fig1X, fig1Y - 40, 30, 40); 
  ellipse(fig1X, fig1Y - 45, 50, 10); 
  ellipse(fig1X - 8, fig1Y + 40, 10, 60); 
  ellipse(fig1X + 6, fig1Y + 40, 10, 60); 
  
  // Second people
  let fig2X = width * 0.05;
  let fig2Y = height * 0.5 + (height * 0.5) * 0.1;
  ellipse(fig2X, fig2Y, 35, 75);
  ellipse(fig2X, fig2Y - 35, 28, 38);
  ellipse(fig2X, fig2Y - 40, 48, 8);
  ellipse(fig2X - 5, fig2Y + 35, 8, 50);
  ellipse(fig2X + 5, fig2Y + 35, 8, 50);
}

function drawScreamingPeople(rms, spectrum) {
  // Map RMS to shock intensity
  let shock = map(rms, 0, 0.3, 0, 1.5, true);

  push();

  // Slight vertical shake
  let yShake = shock * 10 * sin(frameCount * 0.3);
  translate(width * 0.5, height * 0.85 + yShake);

  // FFT spectrum ring around the people
  if (spectrum && spectrum.length > 0) {
    push();
    // Head center
    translate(0, -60);

    let minDimension = min(width, height);
    let circleRadius = minDimension / 10;
    let maxRectLength = minDimension / 12;
    let bins = spectrum.length;

    // Use HSB for the spectrum bars
    colorMode(HSB, 255);

    for (let i = 0; i < bins; i++) {
      let angle = map(i, 0, bins, 0, TWO_PI);
      let amp = spectrum[i];
      let rectHeight = map(amp, 0, 255, 0, maxRectLength);

      push();
      rotate(angle);
      fill(map(i, 0, bins, 0, 255), 255, 255, 200);
      rect(0, circleRadius, minDimension / (bins * 2), rectHeight);
      pop();
    }

    colorMode(RGB, 255);

    pop();
  }

  // Body
  fill(30, 40, 60);
  noStroke();
  ellipse(0, 20, 80, 200);
  
  // Head
  fill(200, 220, 150);
  ellipse(0, -60, 70, 90);
  
  // Eyes
  fill(20);
  ellipse(-15, -70, 12, 15);
  ellipse(15, -70, 12, 15);
  
  // Mouth bigger when louder
  fill(40, 30, 20);
  let baseMouthW = 18;
  let baseMouthH = 30;
  let mouthW = baseMouthW + rms * 40;
  let mouthH = baseMouthH + rms * 120;
  ellipse(0, -40, mouthW, mouthH);
  
  // Hands on head
  fill(200, 220, 150);
  ellipse(-45, -75, 25, 40);
  ellipse(45, -75, 25, 40);
  
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
