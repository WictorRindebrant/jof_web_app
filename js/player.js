function navigateToPage(page) {
    window.location.href = page;
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
    };

    // Append name and button to div
    playerDiv.appendChild(nameBox);
    playerDiv.appendChild(removeButton);

    // Append div to player list
    playerList.appendChild(playerDiv);

    // Clear input field
    nameInput.value = "";
    nameInput.focus();
}