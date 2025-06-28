# Projeto Agrinho 2024: Campo & Cidade - Conectando Pontos

**Hashtag:** #agrinho

## Visão Geral do Projeto

Este projeto, desenvolvido para o concurso Agrinho 2024, é um jogo interativo em P5.js que celebra a **conexão essencial entre o campo e a cidade**. O objetivo é que os jogadores aprendam de forma lúdica sobre a origem de diversos produtos, associando elementos do ambiente rural aos seus correspondentes no ambiente urbano.

## Tema: Festejando a Conexão Campo Cidade

Nosso jogo destaca como a vida na cidade depende diretamente dos recursos e da produção do campo. Através de uma experiência visual e sonora, queremos conscientizar sobre a importância da agricultura, da pecuária e da natureza para o nosso dia a dia na cidade.

## Como Jogar

O jogo apresenta itens do campo à esquerda e itens da cidade à direita. Sua tarefa é:
1.  **Arrastar** um item do campo (por exemplo, uma vaca) para o seu item correspondente na cidade (o leite).
2.  Ao conectar corretamente um par, você receberá um **feedback visual e sonoro** de acerto.
3.  Se a conexão estiver incorreta, o item retornará à sua posição original, e um som de erro será reproduzido.
4.  Conecte todos os **3 pares** para completar o jogo e celebrar a conexão campo-cidade!

## Critérios Avaliativos e Implementação

Este projeto foi desenvolvido com foco nos seguintes critérios do concurso Agrinho:

### Complexidade e Estrutura
* **Funções Básicas:** Utiliza `setup()` e `draw()` para organização do fluxo principal.
* **Variáveis (`let`):** Emprega variáveis para gerenciamento de estado do jogo (`gameState`, `score`), itens (`items`), e controle de interação (`itemArrastado`, `offsetX`, `offsetY`).
* **Condicionais (`if`):** Usado extensivamente para lógica de jogo (verificação de acertos, transição de estados, efeitos visuais).
* **Loops (`for`):** Utilizado para iterar sobre a lista de itens e para o desenho do gradiente de fundo.
* **Funções de Eventos:** `mousePressed()`, `mouseDragged()`, `mouseReleased()` para interatividade de arrastar e soltar.
* **Código Modularizado:** A lógica é organizada em funções menores (`drawBackgroundGradient`, `shuffleItems`, `initializeItems`, `startGame`, `resetGame`) e uma `class Item` para representar os objetos do jogo.
* **Cálculos Dinâmicos:** Funções P5.js como `dist()` (para detecção de colisão), `map()` e `lerpColor()` (para o gradiente de fundo e efeitos visuais) são utilizadas para criar comportamentos dinâmicos.

### Interatividade e Funcionamento
* **Funcionalidade sem erros:** O jogo é projetado para ser fluido e responsivo.
* **Diversas Interações:** Arrastar e soltar, efeito de "hover" nos itens do campo, feedback visual de acerto (brilho) e sonoro (acerto/erro).
* **Experiência Contínua e Intuitiva:** A transição entre a tela de início, o jogo e a tela de vitória/reinício é suave, com instruções claras.
* **Instruções/Dicas Visuais e Sonoras:** Texto no HTML, textos na tela inicial e sons de acerto/erro guiam o usuário. O efeito de "hover" é uma dica visual sobre itens arrastáveis.

### Criatividade e Originalidade
* **Recursos Autorais/Livres:**
    * **Visuais:** As imagens dos itens foram obtidas do Pixabay ([https://pixabay.com/](https://pixabay.com/)) sob licença que permite uso gratuito. O gradiente de fundo é 100% autoral, criado via código.
    * **Sonoros:** Os efeitos de som de acerto e erro foram obtidos do Freesound ([https://freesound.org/](https://freesound.org/)) sob licença Creative Commons Zero (CC0), que permite uso livre.
        * Som de Acerto: [Link do Freesound](https://freesound.org/people/LittleRobotSoundFactory/sounds/270315/)
        * Som de Erro: [Link do Freesound](https://freesound.org/people/LittleRobotSoundFactory/sounds/270327/)
* **Interações Criativas:** O efeito de brilho ao acertar e o hover sutil enriquecem a experiência.
* **Estética e Narrativa:** O fundo gradiente simboliza a união campo-cidade. A tela de início e as mensagens no HTML criam uma narrativa que envolve o jogador no tema proposto.

### Organização e Documentação
* **Código Organizado:** Código com espaçamento e indentação claros.
* **Comentários Explicativos:** Seções relevantes do código possuem comentários para facilitar o entendimento.
* **Nomes Descritivos:** Variáveis, funções e classes possuem nomes que indicam claramente sua finalidade (`gameState`, `itemArrastado`, `drawBackgroundGradient`).
* **Estrutura Modular:** O projeto é dividido em `index.html`, `sketch.js` e `style.css`, com funções e classes bem definidas para facilitar manutenção e atualização.

## Créditos e Ferramentas Utilizadas

* **P5.js:** Biblioteca JavaScript para programação criativa.
* **P5.js Web Editor:** Ambiente de desenvolvimento utilizado.
* **GitHub:** Plataforma para controle de versão e publicação do projeto.
* **Imagens:** Pixabay (conforme links no código e documentação interna).
* **Sons:** Freesound (conforme links e licenças detalhadas acima).

## Como Testar o Projeto

1.  Acesse o link do repositório no GitHub.
2.  Clique no arquivo `index.html`.
3.  Você pode baixar o projeto e abri-lo localmente no seu navegador, ou se preferir, usar um servidor local.

---

Este `README.md` cobre todos os pontos exigidos e mais. Lembre-se de **substituir os placeholders e links** com os links reais se eles mudarem.

Você está pronto para os passos de publicação no GitHub e a criação deste `README.md`? Se tiver qualquer dúvida sobre o GitHub, posso te ajudar!
