document.getElementById('new-game').addEventListener('click', () => {
    alert('Started a new game!');
});

function navigateToPage(page) {
    window.location.href = window.location.origin + "/" + page;
}