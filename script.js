// Variables

let index = 0;
let offset = 0;
let limit = 30;
let currentPokemonIndex = 0;
let loadedPokemon = [];

const BASE_URL = "https://pokeapi.co/api/v2/";


// Functions

async function init() {
    await fetchPokemon();
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
        showLoadingSpinner()
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await fetch(BASE_URL + "pokemon?limit=30&offset=0");
        const data = await response.json();
        const detailPromises = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
        loadedPokemon = await Promise.all(detailPromises);
        console.log(loadedPokemon);
        hideLoadingSpinner();
        renderPokemon();
    } catch (error) {   
        console.error(error);
    } 
}

function isPokemonInArray(pokemonName) {
    return loadedPokemon.some(pokemon => pokemon.name === pokemonName);
}

function filterNewPokemon(pokemonArray) {
    return pokemonArray.filter(pokemon => !isPokemonInArray(pokemon.name));
}

async function loadMorePokemon() {
    try {
        showLoadingSpinner()
        const response = await fetch(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const detailPromises = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
        const newPokemon = await Promise.all(detailPromises);
        const uniquePokemon = filterNewPokemon(newPokemon);
        loadedPokemon.push(...uniquePokemon);
        // console.log(loadedPokemon);
        hideLoadingSpinner();
        renderPokemon();
        offset += limit;
    } catch (error) {   
        console.error(error);
    } 
}

function showLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.remove('hidden');
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.add('hidden');
    }
}

function renderPokemon() {
    const pokemonContent = document.getElementById("mainCardArea");
    pokemonContent.innerHTML = "";

    for (let index = 0; index < loadedPokemon.length; index++) {
        pokemonContent.innerHTML += getPokemonCard(index);
    }
}