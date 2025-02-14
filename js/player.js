let players = [];

function navigateToPage(page) {
    if (players.length != 0) {
        shufflePlayers();
        localStorage.setItem("players", JSON.stringify(players));
        window.location.href = page;
    }
}

function shufflePlayers() {
    for (let i = players.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Get a random index
        [players[i], players[j]] = [players[j], players[i]]; // Swap elements
    }
}

function addPlayer() {
    let nameInput = document.getElementById("playerName");
    let name = nameInput.value.trim();

    if (name === "") return; // Prevent adding empty names

    let playerList = document.getElementById("playerList");

    // Create a div for the player
    let playerDiv = document.createElement("div");
    playerDiv.classList.add("player");

    // Create span for player name
    let nameBox = document.createElement("input");
    nameBox.className = "nameBox"
    nameBox.value = nameInput.value;
    nameBox.textContent = name;
    nameBox.readOnly = true;

    // Create remove button
    let removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.onclick = function () {
        playerList.removeChild(playerDiv);
        players = players.filter(item => item !== nameBox.value);
    };

    // Append name and button to div
    playerDiv.appendChild(nameBox);
    playerDiv.appendChild(removeButton);

    // Append div to player list
    playerList.appendChild(playerDiv);

    // Add player to the players list
    players.push(nameBox.value)

    // Clear input field
    nameInput.value = "";
    nameInput.focus();
}