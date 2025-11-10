const colorType = {
    grass: "#c4dfc1",
    fire: "#eabaaf",
    water: "#ccd8e8",
    bug: "#dfd8ca",
    normal: "#c6c5a6",
    poison: "#d4c1dd",
    electric: "#eadda2",
    ground: "#d7c183",
    fairy: "#efdad9",
    fighting: "#f2cb9d",
    psychic: "#e2c6d0",
    rock: "#c9c0b4",
    ghost: "#acaccd",
    ice: "#e0efefff",
    dragon: "#b9d2d3",
    dark: "#c7c7c7ff",
    steel: "#e0e0e0",
    flying: "#e0e5f5"
};


function getPokemonCard(index) {
    const backgroundColor = colorType[loadedPokemon[index].types[0].type.name] || "#c6c5a6";

    return `
        <div class="main-card" tabindex="0" onclick="openDialog()" style="background-color: ${backgroundColor}">
            <div class="pokemon-number"><span>#${loadedPokemon[index].id}</span></div>
            <div id="pokemonImgMainCard">
                <img src="${loadedPokemon[index].sprites.other["official-artwork"].front_default}" alt="Pokémon Illustration">
            </div>
            <h2 class="pokemon-name-main-card">${loadedPokemon[index].name}</h2>
            <div class="type-area" id="typeArea">
                <button class="pokemon-type-button">${loadedPokemon[index].types[0].type.name}</button>
                ${
                    loadedPokemon[index].types[1]
                    ? `<button class="pokemon-type-button">${loadedPokemon[index].types[1].type.name}</button>`
                    : ""
                }
            </div>
        </div>
    `;
}

// ${loadedPokemon[index].sprites.other.home.front_shiny}


// function dialogTemplate(index) {
//     return `
//     `;
// }