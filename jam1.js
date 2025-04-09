let playerPos = null;
let targetPos = null;
let playerVel = null;
let walls = [];
let particles = [];
let currentLevel = 0;
let score = 0;

// Definição dos levels do jogo, cada level contém um conjunto de paredes
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
    { pos: { x: 650, y: 0.8 }, width: 20, height: 0.2, isHeightPercentage: true },
    { pos: { x: 850, y: 0.25 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 900, y: 0.10 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 1050, y: 0.11 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 1100, y: 0.12 }, width: 20, height: 1, isHeightPercentage: true },
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
    { pos: { x: 750, y: 0.6 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 850, y: 0.1 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 950, y: 0.2 }, width: 20, height: 0.8, isHeightPercentage: true },
    { pos: { x: 1050, y: 0.09 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 1110, y: 0.4 }, width: 20, height: 0.4, isHeightPercentage: true },
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
    { pos: { x: 850, y: 0.3 }, width: 20, height: 0.6, isHeightPercentage: true },
    { pos: { x: 950, y: 0.09 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 1000, y: 0.3 }, width: 20, height: 0.9, isHeightPercentage: true },
    { pos: { x: 1050, y: 0.04 }, width: 20, height: 0.1, isHeightPercentage: true },
    { pos: { x: 1100, y: 0.3 }, width: 20, height: 0.4, isHeightPercentage: true },
  ],
  [
    { pos: { x: 0, y: 0 }, width: 1, height: 20, isWidthPercentage: true },
    { pos: { x: 0, y: 0.98 }, width: 0.95, height: 20, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 0, y: 0 }, width: 20, height: 1, isHeightPercentage: true },
    { pos: { x: 0.98, y: 0 }, width: 20, height: 1, isWidthPercentage: true, isHeightPercentage: true },
    { pos: { x: 150, y:  0 }, width: 20, height: 0.4, isHeightPercentage: true },
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
    { pos: { x: 300, y: 0 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 420, y: 0.5 }, width: 20, height: 0.5, isHeightPercentage: true },
    { pos: { x: 520, y: 0 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 620, y: 0.3 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 720, y: 0 }, width: 20, height: 0.6, isHeightPercentage: true },
    { pos: { x: 820, y: 0.5 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 180, y: 0.6 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 280, y: 0.7 }, width: 20, height: 0.3, isHeightPercentage: true },
    { pos: { x: 880, y: 0.7 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 980, y: 0.09 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 1080, y: 0.2 }, width: 20, height: 0.9, isHeightPercentage: true },
    { pos: { x: 1180, y: 0.2 }, width: 20, height: 0.4, isHeightPercentage: true },
    { pos: { x: 1280, y: 0.2 }, width: 20, height: 0.6, isHeightPercentage: true },
  ]
];

// Configuração inicial do jogo
function setup() {
  createCanvas(windowWidth, windowHeight); // Cria o canvas com o tamanho da janela
  playerPos = createVector(50, height / 2); // Define a posição inicial do jogador
  targetPos = createVector(width - 60, height - 20); // Define a posição do alvo
  loadLevel(currentLevel); // Carrega o nível inicial
  score = 0; // Inicializa a pontuação
}

// Função principal de desenho, chamada a cada frame
function draw() {
  background(0);  // Cor do fundo

  // Calcula a distância entre o jogador e o alvo
  let distToTarget = dist(playerPos.x, playerPos.y, targetPos.x, targetPos.y);

  if (distToTarget < 200) {
    // Aplica um efeito visual baseado na proximidade do jogador ao alvo
    let colorShift = map(distToTarget, 0, 200, 0, 50);
    tint(0, 0, 0, colorShift);
  }

  drawTargetEffect(); // Desenha o efeito visual do alvo
  fill(100, 0, 0); // Cor das paredes
  for (let wall of walls) {
    rect(wall.pos.x, wall.pos.y, wall.width, wall.height);
  }

  spawnParticles(); // Gera novas partículas
  updateParticles(); // Atualiza as partículas existentes

  // Calcula a direção e velocidade do jogador com base na posição do mouse
  let mousePos = createVector(mouseX, mouseY);
  playerVel = mousePos.copy().sub(playerPos);
  playerVel.normalize().mult(200 * (deltaTime / 1000)); // Ajusta a velocidade com base no tempo
  playerPos.add(playerVel); // Atualiza a posição do jogador

  // Desenha o jogador como um triângulo rotacionado na direção do movimento
  fill(125); // Cor do jogador
  let angle = playerVel.heading();
  push();
  translate(playerPos.x, playerPos.y);
  rotate(angle);
  triangle(-20, -10, -20, 10, 20, 0);
  pop();

// Verifica colisões entre o jogador e as paredes
for (let wall of walls) {
  if (
    playerPos.x - 20 < wall.pos.x + wall.width &&
    playerPos.x + 20 > wall.pos.x &&
    playerPos.y - 10 < wall.pos.y + wall.height &&
    playerPos.y + 10 > wall.pos.y
  ) {
    playerPos.set(50, height / 2); // Reinicia a posição do jogador ao colidir
    break;
  }
}

// Verifica se o jogador alcançou o alvo
if (
  playerPos.x + 20 >= targetPos.x &&
  playerPos.y + 10 >= targetPos.y &&
  playerPos.x - 20 <= targetPos.x + 20 &&
  playerPos.y - 10 <= targetPos.y + 20
) {
  nextLevel(); // Avança para o próximo nível
}

// Exibe o score e o nível atual na tela
fill(255); // Cor do texto (branco)
textSize(24); // Tamanho do texto
textAlign(LEFT, TOP); // Alinhamento do texto
text(`Score: ${score}`, 10, 10); // Exibe o score
text(`Level: ${currentLevel + 1}`, 10, 40); // Exibe o nível
}

// Função para desenhar o efeito visual do alvo
function drawTargetEffect() {
push();
translate(targetPos.x + 10, targetPos.y + 10);
let time = millis() * 0.001; // Tempo em segundos
let size = 20 + 10 * sin(time * 2); // Tamanho pulsante
let glow = map(sin(time * 3), -1, 1, 100, 255); // Brilho pulsante
fill(255, glow);
ellipse(0, 0, size, size); // Desenha o alvo como um círculo
pop();
}

// Função para gerar novas partículas
function spawnParticles() {
let numParticles = 5; // Número de partículas geradas por vez
if (frameCount % 5 === 0) { // Gera partículas a cada 5 frames
  for (let i = 0; i < numParticles; i++) {
    particles.push(createParticle());
  }
}
}

// Função para criar uma nova partícula
function createParticle() {
let angle = random(TWO_PI); // Ângulo aleatório
let speed = random(1, 3); // Velocidade aleatória
let pos = createVector(targetPos.x + 10, targetPos.y + 10); // Posição inicial da partícula
let vel = createVector(cos(angle) * speed, sin(angle) * speed); // Velocidade da partícula
return { pos, vel }; // Retorna a partícula como um objeto
}

// Função para atualizar as partículas existentes
function updateParticles() {
fill(255, 150); // Cor das partículas
for (let i = particles.length - 1; i >= 0; i--) {
  let p = particles[i];
  p.pos.add(p.vel); // Atualiza a posição da partícula
  ellipse(p.pos.x, p.pos.y, 5, 5); // Desenha a partícula
  if (dist(p.pos.x, p.pos.y, playerPos.x, playerPos.y) < 20) {
    particles.splice(i, 1); // Remove a partícula se o jogador a coletar
    score += 1; // Incrementa o score
  }
}
}

// Função para carregar um nível específico
function loadLevel(levelIndex) {
walls = levels[levelIndex].map(wall => {
  let posX = wall.pos.x;
  let posY = wall.pos.y;
  let wallWidth = wall.width;
  let wallHeight = wall.height;

  // Ajusta as dimensões das paredes com base no tamanho da tela
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

// Garante que as paredes não ultrapassem os limites da tela
for (let wall of walls) {
  if (wall.width > width) wall.width = width;
  if (wall.height > height) wall.height = height;
}
}

// Função para avançar para o próximo nível
function nextLevel() {
currentLevel = (currentLevel + 1) % levels.length; // Avança para o próximo nível ou reinicia
playerPos.set(50, height / 2); // Reinicia a posição do jogador
particles = []; // Remove todas as partículas
score = 0; // Reinicia o score
loadLevel(currentLevel); // Carrega o próximo nível
}

// Função chamada ao redimensionar a janela
function windowResized() {
resizeCanvas(windowWidth, windowHeight); // Ajusta o tamanho do canvas
if (targetPos) {
  targetPos.set(width - 60, height - 20); // Reposiciona o alvo
}
loadLevel(currentLevel); // Recarrega o nível atual
}