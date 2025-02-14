class Card {
    constructor(number, type, title) {
        this.number = number;
        this.type = type;
        this.title = title;
        this.setDesc();
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

    setDesc() {
        const descRed = 
        [
            "Drick potten",
            "Jannar bestämmer \n(regel ändring)",
            "Kom ut ur fängelse kort \n(byts in för att slippa 1 shot)",
            "Alla andra får shotta 4 cl (slipper nästa runda)",
            "2 klunkar",
            "4 klunkar",
            "Schack om tjack. / spela Hi/Lo mot valfri motståndare om 1 shot",
            "Spela Black Jack mot huset, förloraren får shotta",
            "Ge ut 1 shot till valfri spelare",
            "Ta 1 shot",
            "Häll lite i potten",
            "Häll lite i potten",
            "Häll lite i potten"
        ]
        const descBlack = 
        [
            "Drick potten",
            "Jannar bestämmer \n(regel ändring)",
            "Kom ut ur fängelse kort \n(byts in för att slippa 1 shot)",
            "Alla andra får shotta 4 cl (slipper nästa runda)",
            "2 klunkar",
            "4 klunkar",
            "Schack om tjack. / spela Hi/Lo mot valfri motståndare om 1 shot",
            "Spela Black Jack mot huset, förloraren får shotta",
            "Ge ut 1 shot till valfri spelare",
            "Ta 1 shot",
            "Häll lite i potten",
            "Häll lite i potten",
            "Häll lite i potten"
        ]

        // RED
        if (this.type === "Heart" || this.type === "Square") {
            this.desc = descRed[this.number - 1];
        // BLACK
        } else {
            this.desc = descBlack[this.number - 1];
        }
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
let players = JSON.parse(localStorage.getItem("players")) || [];
hideDesc()

function startGame() {
    playerCount = 0;
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
    hideButton();
}

function getNextPlayer() {
    if (playerCount > players.length - 1) {
        playerCount = 0;
    }
    document.getElementById("player").innerText = players[playerCount];
    playerCount++;
}

function displayCardBack() {
    const gameDiv = document.getElementById("game");
    document.getElementById("desc").style.visibility = "hidden";
    gameDiv.innerHTML = "";
    let cardBack = document.createElement("div");
    cardBack.className = "card back";
    cardBack.onclick = displayNextCard;
    gameDiv.appendChild(cardBack);
}

function displayNextCard() {
    getNextPlayer()
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
        showDesc()
        document.getElementById("desc").innerText = card.desc
        cardDiv.onclick = displayNextCard;
        gameDiv.appendChild(cardDiv);
    } else {
        document.getElementById("player").innerText = "GG";
        document.getElementById("desc").innerText = "<p>No more cards left.</p>";
        hideDesc()
        showButton();
    }
}

function updateCardsLeft(count) {
    document.getElementById("cardsLeft").innerText = count + "/52";
}

function hideDesc() {
    document.getElementById("desc").style.visibility = "hidden";
    document.getElementById("desc").style.height = "0px";
}

function showDesc() {
    document.getElementById("desc").style.visibility = "visible";
    document.getElementById("desc").style.height = "70px";
}

function showButton() {
    const button = document.getElementById('start-btn');
    button.style.visibility = 'visible';
}

function hideButton() {
    const button = document.getElementById('start-btn');
    button.style.visibility = 'hidden';
}