let playerPos; // Vetor para a posição do jogador
let targetPos; // Vetor para a posição do alvo (fenda)
let playerVel; // Vetor para a velocidade do jogador
let walls = []; // Array de paredes do labirinto
let particles = []; // Array de partículas ao redor da fenda

function setup() {
  createCanvas(windowWidth, windowHeight); // Define a tela cheia
  playerPos = createVector(50, height / 2); // Posição inicial do jogador (próxima à esquerda)
  targetPos = createVector(width - 40, height - 40); // Fenda no canto inferior direito

  // Define as paredes do labirinto, representadas por retângulos com posição e tamanho
  walls = [
    { pos: createVector(0, 0), width: width, height: 20 },
    { pos: createVector(0, height - 20), width: width - 60, height: 20 },
    { pos: createVector(0, 0), width: 20, height: height },
    { pos: createVector(width - 20, 0), width: 20, height: height },
    { pos: createVector(100, 0), width: 20, height: height * 0.4 },
    { pos: createVector(100, height * 0.6), width: 20, height: height * 0.4 },
    { pos: createVector(200, height * 0.2), width: width * 0.3, height: 20 },
    { pos: createVector(300, height * 0.4), width: 20, height: height * 0.5 },
    { pos: createVector(400, 0), width: 20, height: height * 0.6 },
    { pos: createVector(500, height * 0.6), width: width * 0.3, height: 20 },
    { pos: createVector(600, height * 0.2), width: 20, height: height * 0.6 },
    { pos: createVector(150, height * 0.3), width: width * 0.2, height: 20 },
    { pos: createVector(250, height * 0.7), width: 20, height: height * 0.3 },
    { pos: createVector(width - 200, height * 0.1), width: 20, height: height * 0.6 },
    { pos: createVector(width - 250, height * 0.7), width: width * 0.15, height: 20 },
    { pos: createVector(width - 300, height * 0.4), width: 20, height: height * 0.45 },
    { pos: createVector(width - 350, height * 0.85), width: width * 0.15, height: 20 },
    { pos: createVector(width - 400, 0), width: 20, height: height * 0.65 },
    { pos: createVector(width - 100, height * 0.6), width: width * 0.08, height: 20 },
    { pos: createVector(width - 150, height * 0.8), width: 20, height: height * 0.15 },
  ];
}

function draw() {
  background(173, 216, 230); // Cor do fundo (céu)

  // Efeito de mudança de cor quando o jogador está perto da fenda
  let distToTarget = dist(playerPos.x, playerPos.y, targetPos.x, targetPos.y); // Distância entre o jogador e a fenda
  if (distToTarget < 200) {
    let colorShift = map(distToTarget, 0, 200, 0, 50); // Escurece a tela conforme se aproxima
    tint(0, 0, 0, colorShift); // Aplica a cor escura sobre a tela
  }

  // Desenha a fenda com efeito pulsante e brilho
  drawTargetEffect();

  // Desenha as paredes do labirinto
  fill(255, 99, 71); // Cor vermelha para as paredes
  for (let wall of walls) {
    rect(wall.pos.x, wall.pos.y, wall.width, wall.height); // Desenha retângulos para as paredes
  }

  // Partículas ao redor da fenda
  spawnParticles(); // Cria novas partículas
  updateParticles(); // Atualiza a posição das partículas

  // Movimento do jogador em direção ao mouse
  let mousePos = createVector(mouseX, mouseY); // Obtém a posição do mouse
  playerVel = mousePos.copy().sub(playerPos); // Calcula a direção e velocidade
  playerVel.normalize().mult(100 * (deltaTime / 1000)); // Normaliza e ajusta a velocidade do jogador
  playerPos.add(playerVel); // Atualiza a posição do jogador

  // Desenha o jogador
  fill(255, 215, 0); // Cor amarela para o jogador
  let angle = playerVel.heading(); // Obtém a direção do movimento do jogador
  push();
  translate(playerPos.x, playerPos.y); // Move o jogador para sua posição
  rotate(angle); // Rotaciona o jogador na direção do movimento
  triangle(-20, -10, -20, 10, 20, 0); // Desenha o jogador como um triângulo
  pop();

  // Verifica colisão com as paredes
  for (let wall of walls) {
    if (
      playerPos.x - 20 < wall.pos.x + wall.width && // Verifica se o jogador colidiu com a parede
      playerPos.x + 20 > wall.pos.x &&
      playerPos.y - 10 < wall.pos.y + wall.height &&
      playerPos.y + 10 > wall.pos.y
    ) {
      playerPos.set(50, height / 2); // Reinicia o jogador ao ponto inicial em caso de colisão
      break;
    }
  }

  // Verifica se o jogador alcançou a fenda
  if (
    playerPos.x + 20 >= targetPos.x &&
    playerPos.y + 10 >= targetPos.y &&
    playerPos.x - 20 <= targetPos.x + 20 &&
    playerPos.y - 10 <= targetPos.y + 20
  ) {
    nextLevel(); // Avança para o próximo nível (ou reinicia o jogo)
  }
}

// Função para desenhar a fenda com efeito pulsante e brilho
function drawTargetEffect() {
  push();
  translate(targetPos.x + 10, targetPos.y + 10); // Ajusta a posição da fenda
  let time = millis() * 0.001; // Tempo em milissegundos para a animação
  let size = 20 + 10 * sin(time * 2); // Tamanho da fenda varia com o tempo (efeito pulsante)
  let glow = map(sin(time * 3), -1, 1, 100, 255); // Intensidade do brilho da fenda
  fill(255, 255, 0, glow); // Cor amarela com brilho dinâmico
  ellipse(0, 0, size, size); // Desenha a fenda como um círculo
  pop();
}

// Função para criar novas partículas ao redor da fenda
function spawnParticles() {
  let numParticles = 5; // Número de partículas a serem geradas
  if (frameCount % 5 === 0) { // A cada 5 quadros, cria novas partículas
    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle()); // Cria partículas e adiciona ao array
    }
  }
}

// Função para criar uma partícula com posição e velocidade aleatórias
function createParticle() {
  let angle = random(TWO_PI); // Ângulo aleatório para a direção da partícula
  let speed = random(1, 3); // Velocidade aleatória para a partícula
  let pos = createVector(targetPos.x + 10, targetPos.y + 10); // Posição inicial da partícula
  let vel = createVector(cos(angle) * speed, sin(angle) * speed); // Velocidade da partícula
  return { pos, vel }; // Retorna o objeto partícula com posição e velocidade
}

// Função para atualizar a posição das partículas e desenhá-las
function updateParticles() {
  fill(255, 215, 0, 150); // Cor amarela para as partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i]; // Obtém a partícula
    p.pos.add(p.vel); // Atualiza a posição da partícula
    ellipse(p.pos.x, p.pos.y, 5, 5); // Desenha a partícula como um pequeno círculo
    if (dist(p.pos.x, p.pos.y, playerPos.x, playerPos.y) < 20) {
      particles.splice(i, 1); // Remove a partícula quando colide com o jogador
    }
  }
}

// Função chamada quando o jogador alcança a fenda (próximo nível)
function nextLevel() {
  playerPos.set(50, height / 2); // Reinicia a posição do jogador
  particles = []; // Limpa as partículas
}

// Função chamada quando o tamanho da janela é alterado
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Redimensiona a tela
  targetPos.set(width - 40, height - 40); // Ajusta a posição da fenda

  // Recria as paredes com os novos tamanhos
  walls = [
    { pos: createVector(0, 0), width: width, height: 20 },
    { pos: createVector(0, height - 20), width: width - 60, height: 20 },
    { pos: createVector(0, 0), width: 20, height: height },
    { pos: createVector(width - 20, 0), width: 20, height: height },
    { pos: createVector(100, 0), width: 20, height: height * 0.4 },
    { pos: createVector(100, height * 0.6), width: 20, height: height * 0.4 },
    { pos: createVector(200, height * 0.2), width: width * 0.3, height: 20 },
    { pos: createVector(300, height * 0.4), width: 20, height: height * 0.5 },
    { pos: createVector(400, 0), width: 20, height: height * 0.6 },
    { pos: createVector(500, height * 0.6), width: width * 0.3, height: 20 },
    { pos: createVector(600, height * 0.2), width: 20, height: height * 0.6 },
    { pos: createVector(150, height * 0.3), width: width * 0.2, height: 20 },
    { pos: createVector(250, height * 0.7), width: 20, height: height * 0.3 },
    { pos: createVector(width - 200, height * 0.1), width: 20, height: height * 0.6 },
    { pos: createVector(width - 250, height * 0.7), width: width * 0.15, height: 20 },
    { pos: createVector(width - 300, height * 0.4), width: 20, height: height * 0.45 },
    { pos: createVector(width - 350, height * 0.85), width: width * 0.15, height: 20 },
    { pos: createVector(width - 400, 0), width: 20, height: height * 0.65 },
    { pos: createVector(width - 100, height * 0.6), width: width * 0.08, height: 20 },
    { pos: createVector(width - 150, height * 0.8), width: 20, height: height * 0.15 },
  ];
}
