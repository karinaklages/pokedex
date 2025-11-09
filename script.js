// Variables

let index = 0;
let currentPokemonIndex = 0;

let loadedPokemon = [];


// Functions

function init() {
    
}

function renderDialog(index) {
    let placeDialog = document.getElementById("pokemonDialog")
    placeDialog.innerHTML = "";
    placeDialog.innerHTML += dialogTemplate(index);
}

function openDialog() {
    const dialog = document.getElementById("pokemonDialog");
    dialog.showModal();
    document.body.style.overflow = "hidden";
}

function closeDialog() {
    document.body.style.overflow = "";
    document.getElementById("pokemonDialog").close();
}

function nextPokemon() {
    currentPokemonIndex = (currentPokemonIndex + 1 ) % loadedPokemon.length;
    renderDialog(currentPokemonIndex);
}

function prevPokemon() {
    currentPokemonIndex = (currentPokemonIndex - 1 + loadedPokemon.length) % loadedPokemon.length;
    renderDialog(currentPokemonIndex);
}

function showTabContentDetailCard(id) {
  document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}