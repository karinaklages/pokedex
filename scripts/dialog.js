function renderDialog(id) {
    const placeDialog = document.getElementById("pokemonDialog");
    placeDialog.innerHTML = "";
    const pokemon = loadedPokemon.find(pokemon => pokemon.id === id);
    placeDialog.innerHTML += getDialogTemplate(pokemon);
}

function getArrowHTML(currentId) {
    const currentIndex = loadedPokemon.findIndex(p => p.id === currentId);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === loadedPokemon.length - 1;
    const leftArrow = !isFirst 
        ? `<div class="arrow-left"><img class="arrow-icon" src="./assets/icons/arrow-back.png" alt="Backward Click" onclick="prevPokemon()"></div>` 
        : `<div class="arrow-left"></div>`;
    const rightArrow = !isLast
        ? `<div class="arrow-right"><img class="arrow-icon" src="./assets/icons/arrow-forward.png" alt="Forward Click" onclick="nextPokemon()"></div>` 
        : `<div class="arrow-right"></div>`;
    return leftArrow + rightArrow;
}

function openDialog(id) {
    currentPokemonId = id;
    renderDialog(currentPokemonId);
    const dialog = document.getElementById("pokemonDialog");
    dialog.showModal();
    document.body.style.overflow = "hidden";
}

function closeDialog() {
    document.body.style.overflow = "";
    document.getElementById("pokemonDialog").close();
}

dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
});

function closeDialog() {
    dialog.close();
}

function nextPokemon() {
    const currentIndex = loadedPokemon.findIndex(pokemon => pokemon.id === currentPokemonId);
    if (currentIndex < loadedPokemon.length - 1) {
        currentPokemonId = loadedPokemon[currentIndex + 1].id;
        renderDialog(currentPokemonId);
    }
}

function prevPokemon() {
    const currentIndex = loadedPokemon.findIndex(pokemon => pokemon.id === currentPokemonId);
    if (currentIndex > 0) {
        currentPokemonId = loadedPokemon[currentIndex - 1].id;
        renderDialog(currentPokemonId);
    }
}

function showTabContentDetailCard(id) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'speciesDetails') {
        const index = currentPokemonId;
        loadPokemonSpeciesDetails(index);
    }
}

async function loadPokemonSpeciesDetails(id) {
    const index = loadedPokemon.findIndex(p => p.id === id);
    if (index === -1) return;
    const nameOrId = loadedPokemon[index].id;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameOrId}/`);
    const data = await response.json();
    const speciesDetails = [ data.color.name, data.habitat?.name ?? '-', data.shape?.name ?? '-', data.base_happiness, data.capture_rate ];
    document.getElementById('color').textContent = speciesDetails[0].split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
    document.getElementById('habitat').textContent = speciesDetails[1].split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
    document.getElementById('shape').textContent = speciesDetails[2].split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
    document.getElementById('baseHappiness').textContent = speciesDetails[3];
    document.getElementById('captureRate').textContent = speciesDetails[4];
    loadedPokemon[index].speciesDetails = speciesDetails;
}
