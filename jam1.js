// Declare all global variables at the top
let playerPos = null; // Initialize as null, will be set in setup()
let targetPos = null; // Initialize as null, will be set in setup()
let playerVel = null;
let walls = [];
let particles = [];
let currentLevel = 0;
let score = 0; // Variável para armazenar o score

// Define levels without using createVector() in the global scope
// Use plain objects with x, y coordinates, and convert to vectors later
const levels = [
  [
    { pos: { x: 0, y: 0 }, width: 1, height: 20, isWidthPercentage: true },
    { pos: { x: 0, y: 0.98 }, width: 0.95, height: 20, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 0, y: 0 }, width: 20, height: 1, isHeightPercentage: true },
    { pos: { x: 0.98, y: 0 }, width: 20, height: 1, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 100, y: 0 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 100, y: 0.6 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 200, y: 0.2 }, width: 0.3, height: 20, isWidthPercentage: true },
    { pos: { x: 300, y: 0.4 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 400, y: 0 }, width: 20, height: 0.6, isHeightPercentage: true },
    { pos: { x: 500, y: 0.6 }, width: 0.3, height: 20, isWidthPercentage: true },
    { pos: { x: 600, y: 0.2 }, width: 20, height: 0.6, isHeightPercentage: true },
    { pos: { x: 150, y: 0.3 }, width: 0.2, height: 20, isWidthPercentage: true },
    { pos: { x: 250, y: 0.7 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 700, y: 0 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 800, y: 0.5 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 650, y: 0.7 }, width: 20, height: 0.3, isHeightPercentage: true },
  ],
  [
    { pos: { x: 0, y: 0 }, width: 1, height: 20, isWidthPercentage: true },
    { pos: { x: 0, y: 0.98 }, width: 0.95, height: 20, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 0, y: 0 }, width: 20, height: 1, isHeightPercentage: true },
    { pos: { x: 0.98, y: 0 }, width: 20, height: 1, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 150, y: 0 }, width: 20, height: 0.7, isHeightPercentage: true },
    { pos: { x: 250, y: 0.3 }, width: 0.4, height: 20, isWidthPercentage: true },
    { pos: { x: 350, y: 0.5 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 450, y: 0 }, width: 20, height: 0.8, isHeightPercentage: true },
    { pos: { x: 0.72, y: 0.6 }, width: 0.2, height: 20, isWidthPercentage: true },
    { pos: { x: 550, y: 0.2 }, width: 20, height: 0.6, isHeightPercentage: true },
    { pos: { x: 650, y: 0.4 }, width: 20, height: 0.4, isHeightPercentage: true },
  ],
  [
    { pos: { x: 0, y: 0 }, width: 1, height: 20, isWidthPercentage: true },
    { pos: { x: 0, y: 0.98 }, width: 0.95, height: 20, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 0, y: 0 }, width: 20, height: 1, isHeightPercentage: true },
    { pos: { x: 0.98, y: 0 }, width: 20, height: 1, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 100, y: 0 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 200, y: 0.3 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 300, y: 0 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 400, y: 0.5 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 500, y: 0.2 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 600, y: 0 }, width: 20, height: 0.6, isHeightPercentage: true },
    { pos: { x: 700, y: 0.4 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 800, y: 0 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 250, y: 0.6 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 350, y: 0.7 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 450, y: 0.3 }, width: 20, height: 0.4, isHeightPercentage: true },
  ],
  [
    { pos: { x: 0, y: 0 }, width: 1, height: 20, isWidthPercentage: true },
    { pos: { x: 0, y: 0.98 }, width: 0.95, height: 20, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 0, y: 0 }, width: 20, height: 1, isHeightPercentage: true },
    { pos: { x: 0.98, y: 0 }, width: 20, height: 1, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 150, y: 0 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 250, y: 0.5 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 350, y: 0 }, width: 20, height: 0.6, isHeightPercentage: true },
    { pos: { x: 450, y: 0.3 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 550, y: 0 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 650, y: 0.6 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 750, y: 0 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 200, y: 0.7 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 300, y: 0.4 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 400, y: 0.6 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 500, y: 0.4 }, width: 20, height: 0.4, isHeightPercentage: true },
  ],
  [
    { pos: { x: 0, y: 0 }, width: 1, height: 20, isWidthPercentage: true },
    { pos: { x: 0, y: 0.98 }, width: 0.95, height: 20, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 0, y: 0 }, width: 20, height: 1, isHeightPercentage: true },
    { pos: { x: 0.98, y: 0 }, width: 20, height: 1, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 120, y: 0 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 220, y: 0.4 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 320, y: 0 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 420, y: 0.5 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 520, y: 0 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 620, y: 0.3 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 720, y: 0 }, width: 20, height: 0.6, isHeightPercentage: true },
    { pos: { x: 820, y: 0.5 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 180, y: 0.6 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 280, y: 0.7 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 380, y: 0.2 }, width: 20, height: 0.4, isHeightPercentage: true },
  ],
];

function setup() {
  createCanvas(windowWidth, windowHeight); // Define a tela cheia
  playerPos = createVector(50, height / 2); // Posição inicial do jogador
  targetPos = createVector(width - 40, height - 40); // Inicializamos targetPos aqui
  loadLevel(currentLevel); // Carrega o nível inicial
  score = 0; // Inicializa o score
}

function draw() {
  background(25, 25, 78); // Cor do fundo (céu)

  let distToTarget = dist(playerPos.x, playerPos.y, targetPos.x, targetPos.y);
  if (distToTarget < 200) {
    let colorShift = map(distToTarget, 0, 200, 0, 50);
    tint(0, 0, 0, colorShift);
  }

  drawTargetEffect();
  fill(47, 79, 79); // Cor das paredes
  for (let wall of walls) {
    rect(wall.pos.x, wall.pos.y, wall.width, wall.height);
  }

  spawnParticles();
  updateParticles();

  let mousePos = createVector(mouseX, mouseY);
  playerVel = mousePos.copy().sub(playerPos);
  playerVel.normalize().mult(100 * (deltaTime / 1000));
  playerPos.add(playerVel);

  fill(255, 215, 0); // Cor do jogador
  let angle = playerVel.heading();
  push();
  translate(playerPos.x, playerPos.y);
  rotate(angle);
  triangle(-20, -10, -20, 10, 20, 0);
  pop();

  for (let wall of walls) {
    if (
      playerPos.x - 20 < wall.pos.x + wall.width &&
      playerPos.x + 20 > wall.pos.x &&
      playerPos.y - 10 < wall.pos.y + wall.height &&
      playerPos.y + 10 > wall.pos.y
    ) {
      playerPos.set(50, height / 2); // Reinicia ao colidir
      break;
    }
  }

  if (
    playerPos.x + 20 >= targetPos.x &&
    playerPos.y + 10 >= targetPos.y &&
    playerPos.x - 20 <= targetPos.x + 20 &&
    playerPos.y - 10 <= targetPos.y + 20
  ) {
    nextLevel(); // Avança para o próximo nível
  }

  // Exibir o score e o nível na tela
  fill(255); // Cor do texto (branco)
  textSize(24); // Tamanho do texto
  textAlign(LEFT, TOP); // Alinhamento do texto (esquerda, topo)
  text(`Score: ${score}`, 10, 10); // Exibe o score no canto superior esquerdo
  text(`Level: ${currentLevel + 1}`, 10, 40); // Exibe o nível abaixo do score
}

function drawTargetEffect() {
  push();
  translate(targetPos.x + 10, targetPos.y + 10);
  let time = millis() * 0.001;
  let size = 20 + 10 * sin(time * 2);
  let glow = map(sin(time * 3), -1, 1, 100, 255);
  fill(255, 255, 0, glow);
  ellipse(0, 0, size, size);
  pop();
}

function spawnParticles() {
  let numParticles = 5;
  if (frameCount % 5 === 0) {
    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle());
    }
  }
}

function createParticle() {
  let angle = random(TWO_PI);
  let speed = random(1, 3);
  let pos = createVector(targetPos.x + 10, targetPos.y + 10);
  let vel = createVector(cos(angle) * speed, sin(angle) * speed);
  return { pos, vel };
}

function updateParticles() {
  fill(255, 215, 0, 150);
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.pos.add(p.vel);
    ellipse(p.pos.x, p.pos.y, 5, 5);
    if (dist(p.pos.x, p.pos.y, playerPos.x, playerPos.y) < 20) {
      particles.splice(i, 1); // Remove a partícula
      score += 1; // Incrementa o score
    }
  }
}

function loadLevel(levelIndex) {
  walls = levels[levelIndex].map(wall => {
    let posX = wall.pos.x;
    let posY = wall.pos.y;
    let wallWidth = wall.width;
    let wallHeight = wall.height;

    if (wall.isWidthPercentage) {
      posX = wall.pos.x * width;
      wallWidth = wall.width * width;
    }
    if (wall.isHeightPercentage) {
      posY = wall.pos.y * height;
      wallHeight = wall.height * height;
    }

    return {
      pos: createVector(posX, posY),
      width: wallWidth,
      height: wallHeight
    };
  });

  for (let wall of walls) {
    if (wall.width > width) wall.width = width;
    if (wall.height > height) wall.height = height;
  }
}

function nextLevel() {
  currentLevel = (currentLevel + 1) % levels.length;
  playerPos.set(50, height / 2);
  particles = [];
  score = 0; // Reinicia o score ao passar de nível (opcional, pode remover se quiser acumular)
  loadLevel(currentLevel);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (targetPos) {
    targetPos.set(width - 40, height - 40);
  }
  loadLevel(currentLevel);
}