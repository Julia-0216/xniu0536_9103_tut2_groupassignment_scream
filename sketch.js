function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  drawSky();

  drawWater();

  drawBridge();

  drawBGPeople();

  drawScreamingPeople();
}

function drawSky() {
  // Orange and yellow wavy bands
  for (let i = 0; i < height * 0.4; i += 15) {
    let wave = sin(i * 0.05) * 50;
    let wave2 = cos(i * 0.08) * 30;
    // Orange to yellow gradient
    let r = 255 - i * 0.2 + sin(i * 0.1) * 20;
    let g = 150 + i * 0.3 + cos(i * 0.15) * 15;
    fill(r, g, 0, 180);
    noStroke();
    // Draw wavy bands using rectangles
    for (let x = 0; x < width; x += 5) {
      let y = i + sin(x * 0.01 + i * 0.05) * 30 + sin(x * 0.02 + i * 0.1) * 20 + wave + wave2;
      rect(x, y, 5, 20);
    }
  }
}

function drawWater() {
  // Dark swirling blues and purples
  for (let i = height * 0.4; i < height * 0.7; i += 12) {
    let wave = sin(i * 0.1) * 40;
    let wave2 = cos(i * 0.15) * 30;
    // More color variation
    let r = 20 + sin(i * 0.2) * 10;
    let g = 30 + i * 0.3 + cos(i * 0.25) * 15;
    let b = 60 + i * 0.2 + sin(i * 0.3) * 20;
    fill(r, g, b, 160);
    noStroke();
    // Draw wavy water using rectangles
    for (let x = 0; x < width; x += 3) {
      let y = i + sin(x * 0.02 + i * 0.1) * 25 + sin(x * 0.03 + i * 0.2) * 15 + cos(x * 0.015 + i * 0.12) * 10 + wave + wave2;
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


function drawScreamingPeople() {
  push();
  translate(width * 0.5, height * 0.85);
  
  noFill();
  
  // Scream effect
  noFill();
  stroke(255, 200, 100, 100);
  strokeWeight(3);
  ellipse(0, -60, 120, 150);
  ellipse(0, -60, 180, 220);
  ellipse(0, -60, 240, 290);
  ellipse(0, -60, 300, 360);
  
  // Scream effect 2
  stroke(255, 150, 50, 80);
  strokeWeight(2);
  ellipse(0, -60, 150, 180);
  ellipse(0, -60, 210, 250);
  ellipse(0, -60, 270, 320);

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
  
  // Mouth
  fill(40, 30, 20);
  ellipse(0, -40, 35, 50);
  
  // Hands on head
  fill(200, 220, 150);
  ellipse(-45, -75, 25, 40);
  ellipse(45, -75, 25, 40);
  
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}