// Variables

let index = 0;
let offset = 30;
let limit = 30;
let currentPokemonId = 0;
let loadedPokemon = [];

const BASE_URL = "https://pokeapi.co/api/v2/";


// Functions

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("searchInput");

    input.addEventListener("input", function () {
        const txt = this.value.trim();
        document.getElementById("submitButton").disabled = txt.length < 3;
    });
});

async function init() {
    await fetchPokemon();
    renderPokemon(loadedPokemon);
}

async function fetchPokemon() {
    try {
        showLoadingSpinner()
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await fetch(BASE_URL + "pokemon?limit=30&offset=0");
        const data = await response.json();
        const detailPromises = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
        loadedPokemon = await Promise.all(detailPromises);
        renderPokemon(loadedPokemon);
    } catch (error) {   
        console.error(error);
    } finally {
        hideLoadingSpinner();
    }
}

function isPokemonInArray(pokemonName) {
    return loadedPokemon.some(pokemon => pokemon.name.toLowerCase() === pokemonName.toLowerCase());
}

function filterNewPokemon(pokemonArray) {
    return pokemonArray.filter(pokemon => !isPokemonInArray(pokemon.name));
}

async function loadMorePokemon() {
    try {
        showLoadingSpinner()
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await fetch(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const detailPromises = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
        const newPokemon = await Promise.all(detailPromises);
        const uniquePokemon = filterNewPokemon(newPokemon);
        loadedPokemon.push(...uniquePokemon);
        renderPokemon(loadedPokemon);
        offset += limit;
    } catch (error) {   
        console.error(error);
    } finally {
        hideLoadingSpinner();
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

function renderPokemon(pokemonArray) {
    const pokemonContent = document.getElementById("mainCardArea");
    pokemonContent.innerHTML = "";
    for (let index = 0; index < pokemonArray.length; index++) {
        const pokemon = pokemonArray[index];
        const cardHTML = getPokemonCard(pokemon.id, pokemon);
        pokemonContent.innerHTML += cardHTML;
    }
}

function searchPokemonByName() {
    const searchInput = document.getElementById("searchInput").value;
    const lowerInput = searchInput.toLowerCase().trim();
    document.getElementById("submitButton").disabled = true;
    if (lowerInput.length > 0 && lowerInput.length < 3) {
        document.getElementById("alert").classList.remove('d_none');
        filterAndRenderPokemon(lowerInput);
        return;
    }
    document.getElementById("alert").classList.add('d_none');
    filterAndRenderPokemon(lowerInput);
}

function checkInput(element) {
    if (element.value.trim() === "") {
        window.location.href = "index.html";
    }
}

function filterAndRenderPokemon(lowerInput) {
    let filterArray;
    if (!lowerInput) {
        filterArray = loadedPokemon;
        document.getElementById("alert").classList.add('d_none');
    } else {
        filterArray = loadedPokemon.filter(pokemon =>
            pokemon.name.toLowerCase().includes(lowerInput)
        );
        document.getElementById("alert").classList.remove('d_none');
    }
    if (filterArray.length === 0) {
        document.getElementById("alert").classList.remove('d_none');
    } else {
        document.getElementById("alert").classList.add('d_none');
    }
    renderPokemon(filterArray);
}