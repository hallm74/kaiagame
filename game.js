// Game state
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

// Shape and color combinations
const shapes = [
    { shape: 'circle', color: '#FF0000', name: '●' },      // red
    { shape: 'square', color: '#0000FF', name: '■' },      // blue
    { shape: 'circle', color: '#FFFF00', name: '●' },      // yellow
    { shape: 'square', color: '#000000', name: '■' },      // black
    { shape: 'circle', color: '#00FF00', name: '●' },      // green
    { shape: 'square', color: '#FF8800', name: '■' }       // orange
];

// Initialize game
function initGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    canFlip = true;
    
    // Update score
    document.getElementById('matches').textContent = matchedPairs;
    
    // Create pairs of cards
    const cardPairs = [...shapes, ...shapes];
    
    // Shuffle cards
    cardPairs.sort(() => Math.random() - 0.5);
    
    // Create card elements
    cardPairs.forEach((cardData, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.shape = cardData.shape;
        card.dataset.color = cardData.color;
        
        // Back of card (question mark)
        const back = document.createElement('div');
        back.className = 'back';
        back.textContent = '?';
        
        // Front of card (shape)
        const front = document.createElement('div');
        front.className = 'front';
        
        const shapeDiv = document.createElement('div');
        shapeDiv.className = `shape ${cardData.shape}`;
        shapeDiv.style.backgroundColor = cardData.color;
        
        if (cardData.shape === 'circle') {
            shapeDiv.textContent = '';
        } else if (cardData.shape === 'square') {
            shapeDiv.textContent = '';
        }
        
        front.appendChild(shapeDiv);
        card.appendChild(back);
        card.appendChild(front);
        
        // Add click event
        card.addEventListener('click', () => flipCard(card));
        
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

// Flip card
function flipCard(card) {
    // Check if can flip
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    // Flip the card
    card.classList.add('flipped');
    flippedCards.push(card);
    
    // Check for match when 2 cards are flipped
    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();
    }
}

// Check if cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    const match = card1.dataset.shape === card2.dataset.shape && 
                  card1.dataset.color === card2.dataset.color;
    
    if (match) {
        // Match found!
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            matchedPairs++;
            document.getElementById('matches').textContent = matchedPairs;
            canFlip = true;
            
            // Check if game is won
            if (matchedPairs === shapes.length) {
                setTimeout(() => {
                    alert('🎉 You won! Great job!');
                }, 500);
            }
        }, 500);
    } else {
        // No match, flip back
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Restart game
document.getElementById('restart-btn').addEventListener('click', initGame);

// Start game on load
initGame();
