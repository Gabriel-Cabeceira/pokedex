const pokemonList = document.getElementById('pokemonList')
const pokemonCardContent = document.getElementById('pokemonCardContent') //seleciona o card do detalhe do pokemon
const loadMore = document.getElementById('loadMore')
const maxRecords = 151 // Limit the first generetion of Pokemons, 
const limit = 6 //Limit at each page loaded
let offset = 0






function pokeCardInteraction(){
    for (let i = 1; i <= maxRecords; i++) {

        const pokemonCardInt = document.getElementById(i)
        const hiddenInfo = document.getElementById('pokemon' + i)

        pokemonCardInt.addEventListener('click', () => {

            pokemonCardInt.classList.toggle('active')
            pokemonCardInt.classList.toggle('pokemon')
            pokemonCardInt.classList.toggle('pokemonCardConfig')
            hiddenInfo.classList.toggle('extraDetailsHide')           
        })
    }
}




function loadPokemonItens(offset, limit){   //Add Pokemon Lists HTML dynamically

        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {   
        const newHtml = pokemons.map((pokemon) => `
            <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

            <article class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </article>

            <article class="extraDetailsHide" id="pokemon${pokemon.number}">
                <ol class="typesDetailed">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <div class="caracteristcs">
                    <div>
                        <h1 class="pokemonCaracteristic">Altura</h1>
                        <span>${pokemon.height / 10} M</span>
                    </div>

                    <div>
                        <h1 class="pokemonCaracteristic">Peso</h1>
                        <span>${pokemon.weight / 10} Kg</span>   
                    </div>

                    <div class="backButton">
                        <button type="button">Voltar</button>
                    </div>
                </div>    
            </article>
            
            </li>
    
        `).join('')
        pokemonList.innerHTML += newHtml

        pokeCardInteraction()

    })

}
loadPokemonItens(offset, limit)




loadMore.addEventListener('click', () => {
    offset += limit
    const qtdRecords = offset + limit
    if (qtdRecords >= maxRecords){  //Load pokemons limiting when it reaches the maximum in maxRecords
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    }
    else{
        loadPokemonItens(offset, limit)
    }  
})


