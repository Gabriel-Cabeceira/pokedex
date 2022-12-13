const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')
const maxRecords = 151 // Limit the first generetion of Pokemons, 
const limit = 6 //Limit at each page loaded
let offset = 0



function loadPokemonItens(offset, limit){   //Add Pokemon Lists HTML dynamically

        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {   
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

            <article class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </article>
    
            </li>
    
        `).join('')
        pokemonList.innerHTML += newHtml
    
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

