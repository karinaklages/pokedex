function renderDialog(index) {
    const placeDialog = document.getElementById("pokemonDialog")
    placeDialog.innerHTML = "";
    placeDialog.innerHTML += getDialogTemplate(index);
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
    document.querySelectorAll('.content').forEach(element => element.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}