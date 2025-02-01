class Card {
    constructor(number, type, title, desc) {
        this.number = number;
        this.type = type;
        this.title = title;
        this.desc = desc;
        this.setSuit();
        this.setColor();
        this.setRank();
    }
    
    setColor() {
        if (this.type === "Heart" || this.type === "Square") {
            this.color = "red";
        } else {
            this.color = "black";
        }
    }
    
    setSuit() {
        const suits = { "Heart": "♥", "Square": "♦", "Clove": "♣", "Spade": "♠" };
        this.suit = suits[this.type] || "";
    }
    
    setRank() {
        const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        this.rank = ranks[this.number - 1];
    }
}

class CardDeck {
    constructor() {
        this.deck = [];
    }

    addCard(card) {
        this.deck.push(card);
    }

    shuffleDeck() {
        this.deck.sort(() => Math.random() - 0.5);
    }

    drawCard() {
        return this.deck.length ? this.deck.pop() : null;
    }

    cardsLeft() {
        return this.deck.length;
    }
}

let deck;
let firstCard = true;
let totalCards = 52;

function startGame() {
    totalCards = 52;
    firstCard = true
    deck = new CardDeck();
    let suits = ["Heart", "Square", "Clove", "Spade"];
    for (let i = 1; i <= 13; i++) {
        suits.forEach(suit => {
            deck.addCard(new Card(i, suit, "Title " + i, "Description of card " + i));
        });
    }
    deck.shuffleDeck();
    updateCardsLeft(totalCards);
    displayCardBack();
}

function displayCardBack() {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = "";
    let cardBack = document.createElement("div");
    cardBack.className = "card back";
    cardBack.onclick = displayNextCard;
    gameDiv.appendChild(cardBack);
}

function displayNextCard() {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = "";
    let card = deck.drawCard();
    if (firstCard) {
        firstCard = false;
    } else {
        totalCards--;
    }
    updateCardsLeft(totalCards);
    if (card) {
        let cardDiv = document.createElement("div");
        cardDiv.className = "card " + card.color;
        cardDiv.innerHTML = `
            <div class="top-left">${card.rank} ${card.suit}</div>
            <div class="center">${card.suit}</div>
            <div class="bottom-right">${card.rank} ${card.suit}</div>
        `;
        cardDiv.onclick = displayNextCard;
        gameDiv.appendChild(cardDiv);
    } else {
        
        gameDiv.innerHTML = "<p>No more cards left.</p>";
    }
}

function updateCardsLeft(count) {
    document.getElementById("cardsLeft").innerText = count + "/52";
}