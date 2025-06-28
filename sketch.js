// Variáveis para as imagens
let imgMilho, imgPao;
let imgVaca, imgLeite;
let imgMacieira, imgCestaFrutas;

// Variáveis para os sons
let soundAcerto, soundErro;

// Array para armazenar os pares de itens
let items = [];

// Variáveis para o item arrastado
let itemArrastado = null;
let offsetX, offsetY; // Deslocamento do mouse em relação ao canto superior esquerdo da imagem

// Variável para a pontuação
let score = 0;
const TOTAL_PARES = 3; // Número total de pares para completar o jogo

// Variáveis para controlar o feedback visual de acerto
let feedbackAcertoAtivo = false;
let feedbackAcertoTempo = 0;
let feedbackAcertoItem1 = null;
let feedbackAcertoItem2 = null;
const FEEDBACK_DURACAO = 60; // Duração do feedback em frames (aprox. 1 segundo a 60fps)

// Variável de estado do jogo: 'start', 'playing', 'finished'
let gameState = 'start'; // O jogo começa no estado 'start'

// Variáveis para os botões e elemento de instruções HTML
let startButton;    // Botão para iniciar o jogo
let restartButton;  // Botão para reiniciar o jogo
let instructionsElement; // Referência ao elemento de instruções no HTML


// Função preload() - Carrega os recursos antes do setup()
function preload() {
    // Carrega as imagens
    imgMilho = loadImage('assets/milho.png');
    imgPao = loadImage('assets/pao.png');
    imgVaca = loadImage('assets/vaca.png');
    imgLeite = loadImage('assets/leite.png');
    imgMacieira = loadImage('assets/macieira.png');
    imgCestaFrutas = loadImage('assets/cesta_frutas.png');

    // Carrega os sons
    soundAcerto = loadSound('assets/acerto.mp3');
    soundErro = loadSound('assets/erro.mp3');
}

// Função setup() - Configura o ambiente uma vez no início
function setup() {
    createCanvas(800, 600); // Cria um canvas de 800x600 pixels

    // Obtém a referência para o elemento de instruções no HTML
    instructionsElement = document.getElementById('instructions');

    // Cria o botão de iniciar (inicialmente visível)
    startButton = createButton('Iniciar Jogo');
    startButton.position(width / 2 - startButton.width / 2, height / 2 + 50);
    startButton.mousePressed(startGame);
    startButton.class('game-button'); // Adiciona uma classe para estilização
    startButton.show(); // Garante que o botão esteja visível

    // O botão de reiniciar será criado e gerenciado no momento certo
    restartButton = null;

    // Inicializa o jogo (resetando para o estado inicial de itens, mas não o gameState)
    initializeItems();
}

// Função draw() - Desenha os elementos na tela continuamente
function draw() {
    drawBackgroundGradient(); // Desenha o gradiente de fundo a cada frame

    // Oculta/mostra o placar conforme o estado do jogo
    document.getElementById('game-info').style.display = (gameState === 'playing' || gameState === 'finished') ? 'block' : 'none';

    // Lógica principal do jogo baseada no estado
    if (gameState === 'start') {
        // Esconde o botão de reiniciar se por algum motivo estiver visível
        if (restartButton) restartButton.hide();
        startButton.show(); // Garante que o botão de início esteja visível

        // Desenha a tela de início
        fill(60, 120, 0); // Verde mais escuro para o título
        textSize(40);
        textAlign(CENTER);
        text("Bem-vindo(a) ao Campo & Cidade!", width / 2, height / 2 - 100);
        
        fill(50); // Cor mais escura para o texto narrativo
        textSize(20);
        text("Explore a fascinante conexão entre o campo e a cidade.", width / 2, height / 2 - 30);
        text("Arraste e conecte os produtos rurais aos seus destinos urbanos.", width / 2, height / 2);
        
        instructionsElement.innerText = "Clique em 'Iniciar Jogo' para começar a aventura!";

    } else if (gameState === 'playing') {
        startButton.hide(); // Esconde o botão de início
        if (restartButton) restartButton.hide(); // Esconde o botão de reiniciar

        // Desenha a divisão campo/cidade
        stroke(150);
        line(width / 2, 0, width / 2, height);
        textAlign(CENTER);
        textSize(24);
        fill(100, 150, 50); // Verde para o campo
        text("CAMPO", width / 4, 30);
        fill(50, 100, 150); // Azul para a cidade
        text("CIDADE", width * 3 / 4, 30);

        // Desenha todos os itens
        for (let i = 0; i < items.length; i++) {
            items[i].display();
        }

        // Gerencia o feedback visual de acerto
        if (feedbackAcertoAtivo) {
            feedbackAcertoTempo++;
            if (feedbackAcertoTempo < FEEDBACK_DURACAO) {
                // Efeito de brilho/animação nos itens conectados
                push(); // Salva o estado atual de desenho
                noFill();
                strokeWeight(4);
                stroke(255, 255, 0, map(feedbackAcertoTempo, 0, FEEDBACK_DURACAO, 255, 0)); // Amarelo com transparência decrescente
                rectMode(CENTER);
                rect(feedbackAcertoItem1.x + feedbackAcertoItem1.w / 2, feedbackAcertoItem1.y + feedbackAcertoItem1.h / 2, feedbackAcertoItem1.w + 10, feedbackAcertoItem1.h + 10, 5);
                rect(feedbackAcertoItem2.x + feedbackAcertoItem2.w / 2, feedbackAcertoItem2.y + feedbackAcertoItem2.h / 2, feedbackAcertoItem2.w + 10, feedbackAcertoItem2.h + 10, 5);
                pop(); // Restaura o estado de desenho
            } else {
                feedbackAcertoAtivo = false;
                feedbackAcertoTempo = 0;
                feedbackAcertoItem1 = null;
                feedbackAcertoItem2 = null;
            }
        }

        // Atualiza a instrução
        instructionsElement.innerText = "Arraste um item do campo para o correspondente na cidade.";
        
    } else if (gameState === 'finished') {
        startButton.hide(); // Esconde o botão de início

        // Desenha a tela de vitória
        fill(0, 150, 0); // Verde escuro
        textSize(48);
        text("Parabéns! Você conectou o campo e a cidade!", width / 2, height / 2 - 50);
        textSize(24);
        text("Sua pontuação: " + score + " de " + TOTAL_PARES, width / 2, height / 2);

        // Desenha o botão de reiniciar
        if (restartButton) { // Garante que o botão existe
             restartButton.show(); // Torna o botão visível
             instructionsElement.innerText = "Clique em 'Reiniciar' para jogar novamente.";
        }
    }

    // Atualiza a pontuação no HTML
    document.getElementById('score').innerText = score;
}

// Função para desenhar o gradiente de fundo
function drawBackgroundGradient() {
    let c1 = color(135, 206, 250); // Azul claro para o céu (topo)
    let c2 = color(100, 150, 50);  // Verde campo (base)

    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(0, y, width, y);
    }
}


// Classe para representar um item no jogo
class Item {
    constructor(img, name, type, x, y, w, h, isConnected) {
        this.img = img;
        this.name = name;
        this.type = type; // "campo" ou "cidade"
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.originalX = x; // Para retornar à posição original se não houver match
        this.originalY = y;
        this.isConnected = isConnected; // Se o item já foi conectado corretamente
    }

    // Método para exibir o item
    display() {
        // Verifica se o item arrastado é o próprio item atual para não desenhar duas vezes
        if (!this.isConnected && this !== itemArrastado) { 
            image(this.img, this.x, this.y, this.w, this.h);

            // Efeito de hover para itens do campo não conectados
            if (this.type === "campo" && this.isOver() && itemArrastado === null) {
                this.highlight();
            }
        } else if (this.isConnected) {
            // Se estiver conectado, desenha em uma posição fixa para o feedback e clareza
            image(this.img, this.x, this.y, this.w, this.h);
        }
        // Se for o item arrastado, ele será desenhado por último, por cima de tudo
    }

    // Novo método para destacar o item (efeito hover)
    highlight() {
        push(); // Salva o estado atual de desenho
        noFill();
        strokeWeight(3); // Espessura da borda
        stroke(0, 150, 255); // Cor azul vibrante para o destaque
        rect(this.x, this.y, this.w, this.h, 5); // Desenha um retângulo ao redor do item com cantos arredondados
        pop(); // Restaura o estado de desenho
    }

    // Método para verificar se o mouse está sobre o item
    isOver() {
        return mouseX > this.x && mouseX < this.x + this.w &&
               mouseY > this.y && mouseY < this.y + this.h;
    }
}

// Função mousePressed() - Lida com o clique do mouse
function mousePressed() {
    if (gameState === 'playing') {
        for (let i = items.length - 1; i >= 0; i--) { // Itera de trás para frente para pegar o item de cima
            let item = items[i];
            if (item.type === "campo" && !item.isConnected && item.isOver()) {
                itemArrastado = item;
                offsetX = mouseX - itemArrastado.x;
                offsetY = mouseY - itemArrastado.y;
                // Move o item arrastado para o final do array para que seja desenhado por cima
                items.splice(i, 1);
                items.push(itemArrastado); // Agora o item arrastado está no final do array e será desenhado por último
                break;
            }
        }
    }
}

// Função mouseDragged() - Lida com o arrastar do mouse
function mouseDragged() {
    if (gameState === 'playing' && itemArrastado != null) {
        itemArrastado.x = mouseX - offsetX;
        itemArrastado.y = mouseY - offsetY;
    }
}

// Função mouseReleased() - Lida com a soltura do mouse
function mouseReleased() {
    if (gameState === 'playing' && itemArrastado != null) {
        let matched = false;
        for (let i = 0; i < items.length; i++) {
            let targetItem = items[i];
            // Verifica se é um item da cidade, não conectado e se o item arrastado está sobre ele
            if (targetItem.type === "cidade" && !targetItem.isConnected &&
                dist(itemArrastado.x + itemArrastado.w / 2, itemArrastado.y + itemArrastado.h / 2,
                     targetItem.x + targetItem.w / 2, targetItem.y + targetItem.h / 2) < 50) { // Distância de colisão

                // Verifica se os nomes correspondem (lógica de match)
                if ((itemArrastado.name === "milho" && targetItem.name === "pao") ||
                    (itemArrastado.name === "vaca" && targetItem.name === "leite") ||
                    (itemArrastado.name === "macieira" && targetItem.name === "cesta_frutas")) {
                    
                    // Match correto!
                    itemArrastado.isConnected = true;
                    targetItem.isConnected = true;
                    score++;
                    soundAcerto.play(); // Toca som de acerto

                    // Ativa o feedback visual de acerto
                    feedbackAcertoAtivo = true;
                    feedbackAcertoTempo = 0;
                    feedbackAcertoItem1 = itemArrastado;
                    feedbackAcertoItem2 = targetItem;

                    // Posiciona os itens conectados no centro da área de match (opcional, para visualização)
                    let centroY = (targetItem.y + targetItem.h / 2); // Pega o Y do item da cidade
                    
                    // Ajuste de posições para centralizar pares conectados no meio da tela
                    itemArrastado.x = width / 2 - itemArrastado.w - 15; // 15 pixels de espaçamento
                    itemArrastado.y = centroY - itemArrastado.h / 2;
                    targetItem.x = width / 2 + 15;
                    targetItem.y = centroY - targetItem.h / 2;

                    matched = true;

                    // Verifica se o jogo terminou
                    if (score === TOTAL_PARES) {
                        gameState = 'finished';
                        // Cria o botão de reiniciar no HTML
                        restartButton = createButton('Reiniciar Jogo');
                        // Posiciona o botão centralizado horizontalmente e abaixo da mensagem
                        restartButton.position(width / 2 - restartButton.width / 2, height / 2 + 50);
                        restartButton.mousePressed(resetGame);
                        restartButton.class('game-button'); // Adiciona uma classe para estilização
                        restartButton.show(); // Garante que o botão esteja visível
                    }

                    break;
                }
            }
        }

        if (!matched) {
            // Se não houve match, retorna o item para a posição original
            itemArrastado.x = itemArrastado.originalX;
            itemArrastado.y = itemArrastado.originalY;
            soundErro.play(); // Toca som de erro
        }
        itemArrastado = null; // Reseta o item arrastado
    }
}

// Função para embaralhar a posição dos itens de um tipo específico
function shuffleItems(type) {
    let itemsToShuffle = items.filter(item => item.type === type);
    
    // Cria um array de posições Y disponíveis para o tipo
    let availableYPositions = [];
    let initialYPositions = [100, 250, 400]; // Posições Y iniciais predefinidas
    
    // Filtra apenas as posições Y dos itens que não estão conectados para não mexer nos que já foram acertados
    let currentOccupiedY = items.filter(item => item.type === type && item.isConnected).map(item => item.y);
    let potentialYPositions = initialYPositions.filter(y => !currentOccupiedY.includes(y));

    // Embaralha as posições Y disponíveis
    for (let i = potentialYPositions.length - 1; i > 0; i--) {
        const j = floor(random() * (i + 1));
        [potentialYPositions[i], potentialYPositions[j]] = [potentialYPositions[j], potentialYPositions[i]];
    }

    // Atribui as novas posições aos itens
    let shuffleIndex = 0;
    for (let i = 0; i < itemsToShuffle.length; i++) {
        if (!itemsToShuffle[i].isConnected) { // Só embaralha se não estiver conectado
            itemsToShuffle[i].y = potentialYPositions[shuffleIndex];
            itemsToShuffle[i].originalY = potentialYPositions[shuffleIndex]; // Atualiza a posição original também
            shuffleIndex++;
        }
    }
}

// Função para inicializar/reinicializar a lista de itens
function initializeItems() {
    items = []; // Limpa o array de itens
    // Recria os objetos dos itens
    items.push(new Item(imgMilho, "milho", "campo", 100, 100, 100, 100, false));
    items.push(new Item(imgPao, "pao", "cidade", 600, 100, 100, 100, false));
    items.push(new Item(imgVaca, "vaca", "campo", 100, 250, 100, 100, false));
    items.push(new Item(imgLeite, "leite", "cidade", 600, 250, 100, 100, false));
    items.push(new Item(imgMacieira, "macieira", "campo", 100, 400, 100, 100, false));
    items.push(new Item(imgCestaFrutas, "cesta_frutas", "cidade", 600, 400, 100, 100, false));
    
    // Embaralha as posições dos itens
    shuffleItems("campo");
    shuffleItems("cidade");
}

// Função para iniciar o jogo (chamada pelo botão de início)
function startGame() {
    gameState = 'playing'; // Muda o estado para 'playing'
    score = 0; // Zera a pontuação
    startButton.hide(); // Esconde o botão de início
    initializeItems(); // Re-inicializa os itens para uma nova partida
}


// Função para reiniciar o jogo (chamada pelo botão de reiniciar)
function resetGame() {
    score = 0; // Zera a pontuação
    gameState = 'playing'; // Define o estado do jogo para 'playing'
    if (restartButton) { // Se o botão de reiniciar já existe, esconde-o
        restartButton.hide();
    }
    initializeItems(); // Re-inicializa os itens
    instructionsElement.innerText = "Arraste um item do campo para o correspondente na cidade.";
}