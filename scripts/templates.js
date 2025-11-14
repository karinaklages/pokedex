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
    ice: "#e0eaeaff",
    dragon: "#b9d2d3",
    dark: "#c7c7c7ff",
    steel: "#e0e0e0",
    flying: "#e0e5f5"
};

function getPokemonCard(index, pokemon) {
    const backgroundColor = colorType[pokemon.types[0].type.name] || "#c6c5a6";

    return `
        <div class="main-card" tabindex="0" onclick="openDialog(${index})" style="background-color: ${backgroundColor}">
            <div class="pokemon-number"><span>#${pokemon.id}</span></div>
            <div id="pokemonImgMainCard">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="Pokémon Illustration">
            </div>
            <h2 class="pokemon-name-main-card">${pokemon.name}</h2>
            <div class="type-area" id="typeArea">
                <button class="pokemon-type-button">${pokemon.types[0].type.name}</button>
                ${
                    pokemon.types[1]
                    ? `<button class="pokemon-type-button">${pokemon.types[1].type.name}</button>`
                    : ""
                }
            </div>
        </div>
    `;
}

function getDialogTemplate(pokemon) {
    const backgroundColor = colorType[pokemon.types[0].type.name] || "#c6c5a6";

    return `
        <div class="detail-card-background" style="background-color: ${backgroundColor}">
            <div class="close-area">
                <img class="close-button" src="./assets/icons/closed.png" alt="Close Dialog" aria-label="Close button" onclick="closeDialog()">
            </div>
            <div class="pokemon-number-detail-card"><span>#${pokemon.id}</span></div>
            <h2 class="pokemon-name-detail-card">${pokemon.name}</h2>
            <div id="pokemonImgDetailCard">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="Pokémon Illustration">
            </div>
            <div class="type-area-detail-card">
                <button class="pokemon-type-button">${pokemon.types[0].type.name}</button>
                ${
                    pokemon.types[1]
                    ? `<button class="pokemon-type-button">${pokemon.types[1].type.name}</button>`
                    : ""
                }
            </div>
            <div class="arrow-area">
                <img class="arrow-icon" src="./assets/icons/arrow-back.png" alt="Backward Click" aria-label="Backward button" onclick="prevPokemon()">
                <img class="arrow-icon" src="./assets/icons/arrow-forward.png" alt="Forward Click" aria-label="Forward button" onclick="nextPokemon()">
            </div>
            <div class="white-area"></div>
        </div>

        <div class="menu-detail-card">
            <ul>
                <li><button onclick="showTabContentDetailCard('about')">About</button></li>
                <li><button onclick="showTabContentDetailCard('stats')">Stats</button></li>
                <li><button onclick="showTabContentDetailCard('speciesDetails')">Species Details</button></li>
            </ul>
        </div>

        <div id="about" class="tab-content content active">
            <table>
                <tr>
                    <th>Experience</th>
                    <td>${pokemon.base_experience}</td>
                </tr>
                <tr>
                    <th>Height</th>
                    <td>${pokemon.height} dm</td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td>${pokemon.weight} kg</td>
                </tr>
                <tr>
                    <th>Best Ability</th>
                    <td>${pokemon.abilities[0].ability.name
                        .split('-')
                        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                        .join('-')}
                    </td>
                </tr>
                <tr>
                    <th>Top Move</th>
                    <td>${pokemon.moves[0].move.name
                        .split('-')
                        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                        .join('-')}
                    </td>
                </tr>
            </table>
        </div>

        <div id="stats" class="tab-content progress-wrapper content">
            <div class="class-bar">
                <div class="bar-info">
                    <span>HP</span>
                </div>
                <div class="progress-bar">
                    <span class="hp">${pokemon.stats[0].base_stat}</span>
                </div>
            </div>
            <div class="class-bar">
                <div class="bar-info">
                    <span>Attack</span>
                </div>
                <div class="progress-bar">
                    <span class="attack">${pokemon.stats[1].base_stat}</span>
                </div>
            </div>
            <div class="class-bar">
                <div class="bar-info">
                    <span>Defense</span>
                </div>
                <div class="progress-bar">
                    <span class="defense">${pokemon.stats[2].base_stat}</span>
                </div>
            </div>
            <div class="class-bar">
                <div class="bar-info">
                    <span>Special Attack</span>
                </div>
                <div class="progress-bar">
                    <span class="special-attack">${pokemon.stats[3].base_stat}</span>
                </div>
            </div>
            <div class="class-bar">
                <div class="bar-info">
                    <span>Special Defense</span>
                </div>
                <div class="progress-bar">
                    <span class="special-defense">${pokemon.stats[4].base_stat}</span>
                </div>
            </div>
        </div>

        <div id="speciesDetails" class="tab-content content">
            <table>
                <tr>
                    <th>Color</th>
                    <td id="color"></td>
                </tr>
                <tr>
                    <th>Habitat</th>
                    <td id="habitat"></td>
                </tr>
                <tr>
                    <th>Shape</th>
                    <td id="shape"></td>
                </tr>
                <tr>
                    <th>Base Happiness</th>
                    <td id="baseHappiness"></td>
                </tr>
                <tr>
                    <th>Capture Rate</th>
                    <td id="captureRate"></td>
                </tr>
            </table>   
        </div>
    `;
}







// function getDialogTemplate(index) {
//     const backgroundColor = colorType[loadedPokemon[index].types[0].type.name] || "#c6c5a6";

//     return `
//         <div class="detail-card-background" style="background-color: ${backgroundColor}">
//             <div class="close-area">
//                 <img class="close-button" src="./assets/icons/closed.png" alt="Close Dialog" aria-label="Close button" onclick="closeDialog()">
//             </div>
//             <div class="pokemon-number-detail-card"><span>#${loadedPokemon[index].id}</span></div>
//             <h2 class="pokemon-name-detail-card">${loadedPokemon[index].name}</h2>
//             <div id="pokemonImgDetailCard">
//                 <img src="${loadedPokemon[index].sprites.other["official-artwork"].front_default}" alt="Pokémon Illustration">
//             </div>
//             <div class="type-area-detail-card">
//                 <button class="pokemon-type-button">${loadedPokemon[index].types[0].type.name}</button>
//                 ${
//                     loadedPokemon[index].types[1]
//                     ? `<button class="pokemon-type-button">${loadedPokemon[index].types[1].type.name}</button>`
//                     : ""
//                 }
//             </div>
//             <div class="arrow-area">
//                 <img class="arrow-icon" src="./assets/icons/arrow-back.png" alt="Backward Click" aria-label="Backward button" onclick="prevPokemon()">
//                 <img class="arrow-icon" src="./assets/icons/arrow-forward.png" alt="Forward Click" aria-label="Forward button" onclick="nextPokemon()">
//             </div>
//             <div class="white-area"></div>
//         </div>

//         <div class="menu-detail-card">
//             <ul>
//                 <li><button onclick="showTabContentDetailCard('about')">About</button></li>
//                 <li><button onclick="showTabContentDetailCard('stats')">Stats</button></li>
//                 <li><button onclick="showTabContentDetailCard('speciesDetails')">Species Details</button></li>
//             </ul>
//         </div>

//         <div id="about" class="tab-content content active">
//             <table>
//                 <tr>
//                     <th>Experience</th>
//                     <td>${loadedPokemon[index].base_experience}</td>
//                 </tr>
//                 <tr>
//                     <th>Height</th>
//                     <td>${loadedPokemon[index].height} dm</td>
//                 </tr>
//                 <tr>
//                     <th>Weight</th>
//                     <td>${loadedPokemon[index].weight} kg</td>
//                 </tr>
//                 <tr>
//                     <th>Best Ability</th>
//                     <td>${loadedPokemon[index].abilities[0].ability.name
//                         .split('-')
//                         .map(part => part.charAt(0).toUpperCase() + part.slice(1))
//                         .join('-')}
//                     </td>
//                 </tr>
//                 <tr>
//                     <th>Top Move</th>
//                     <td>${loadedPokemon[index].moves[0].move.name
//                         .split('-')
//                         .map(part => part.charAt(0).toUpperCase() + part.slice(1))
//                         .join('-')}
//                     </td>
//                 </tr>
//             </table>
//         </div>

//         <div id="stats" class="tab-content progress-wrapper content">
//             <div class="class-bar">
//                 <div class="bar-info">
//                     <span>HP</span>
//                 </div>
//                 <div class="progress-bar">
//                     <span class="hp">${loadedPokemon[index].stats[0].base_stat}</span>
//                 </div>
//             </div>
//             <div class="class-bar">
//                 <div class="bar-info">
//                     <span>Attack</span>
//                 </div>
//                 <div class="progress-bar">
//                     <span class="attack">${loadedPokemon[index].stats[1].base_stat}</span>
//                 </div>
//             </div>
//             <div class="class-bar">
//                 <div class="bar-info">
//                     <span>Defense</span>
//                 </div>
//                 <div class="progress-bar">
//                     <span class="defense">${loadedPokemon[index].stats[2].base_stat}</span>
//                 </div>
//             </div>
//             <div class="class-bar">
//                 <div class="bar-info">
//                     <span>Special Attack</span>
//                 </div>
//                 <div class="progress-bar">
//                     <span class="special-attack">${loadedPokemon[index].stats[3].base_stat}</span>
//                 </div>
//             </div>
//             <div class="class-bar">
//                 <div class="bar-info">
//                     <span>Special Defense</span>
//                 </div>
//                 <div class="progress-bar">
//                     <span class="special-defense">${loadedPokemon[index].stats[4].base_stat}</span>
//                 </div>
//             </div>
//         </div>

//         <div id="speciesDetails" class="tab-content content">
//             <table>
//                 <tr>
//                     <th>Color</th>
//                     <td id="color"></td>
//                 </tr>
//                 <tr>
//                     <th>Habitat</th>
//                     <td id="habitat"></td>
//                 </tr>
//                 <tr>
//                     <th>Shape</th>
//                     <td id="shape"></td>
//                 </tr>
//                 <tr>
//                     <th>Base Happiness</th>
//                     <td id="baseHappiness"></td>
//                 </tr>
//                 <tr>
//                     <th>Capture Rate</th>
//                     <td id="captureRate"></td>
//                 </tr>
//             </table>   
//         </div>
//     `;
// }