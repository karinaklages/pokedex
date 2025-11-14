function renderDialog(index) {
    const placeDialog = document.getElementById("pokemonDialog");
    placeDialog.innerHTML = "";
    const pokemon = loadedPokemon[index]; 
    placeDialog.innerHTML += getDialogTemplate(pokemon);
}

function openDialog(index) {
    currentPokemonIndex = index;
    renderDialog(currentPokemonIndex);
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
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    if(id === 'speciesDetails') {
        const index = currentPokemonIndex;
        loadPokemonSpeciesDetails(index);
    }
}

async function loadPokemonSpeciesDetails(index) {
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