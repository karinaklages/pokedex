let loadedPokemon = [];


function init() {
    
}


function openDialog() {
    const dialog = document.getElementById("pokemonDialog");
    dialog.showModal();
    document.body.style.overflow = "hidden";
}

function closeDialog() {
    document.getElementById("pokemonDialog").close();
    document.body.style.overflow = "";
}