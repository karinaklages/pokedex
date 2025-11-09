// ---------------------
// Variables
// ---------------------

let index = 0;
let currentPokemonIndex = 0;

const BASE_URL = "https://pokeapi.co/api/v2/";

let loadedPokemon = [];


// ---------------------
// Functions
// ---------------------

function init() {
    fetchPokemon();
    renderPokemon();
}

// async function fetchPokemon() {
//     const response = await fetch(BASE_URL + "pokemon?limit=30&offset=0");
//     const data = await response.json();
//     loadedPokemon = data.results;
//     console.log("Pokémon geladen:", loadedPokemon);
// }

// async function fetchPokemon() {
//     const response = await fetch(BASE_URL + "pokemon/1/");
//     const data = await response.json();
//     loadedPokemon = [data];
//     console.log(loadedPokemon);
// }

async function fetchPokemon() {
    try {
        const response = await fetch(BASE_URL + "pokemon?limit=30&offset=0");
        const data = await response.json();

        const detailPromises = data.results.map(p => fetch(p.url).then(res => res.json()));

        loadedPokemon = await Promise.all(detailPromises);
        console.log(loadedPokemon);
        renderPokemon();
    } catch (error) {
        console.error(error);
    }
}

// showLoadingSpinner()

// await

// disabledloadingSpinner()
// renderPokemon() 

function renderPokemon() {
    const pokemonContent = document.getElementById("mainCardArea");
    pokemonContent.innerHTML = "";

    for (let index = 0; index < loadedPokemon.length; index++) {
        pokemonContent.innerHTML += getPokemonCard(index);
    }
}


// ---------------------
// Dialog / Detail Card
// ---------------------

function renderDialog(index) {
    const placeDialog = document.getElementById("pokemonDialog")
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
  document.querySelectorAll('.content').forEach(element => element.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}