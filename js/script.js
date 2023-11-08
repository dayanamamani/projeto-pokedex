//Variaveis globais nome, numero(id), imagem, 

const pokemonName = document.querySelector(".pokemon_name");
const pokemonId = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const pokemonData = document.querySelector(".pokemon_data");

//variaveis dos botões prev e next
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 0;

//capturar o nome e numero do pokemon

const input = document.querySelector(".input_search")

const form = document.querySelector(".form")

form.addEventListener("submit", (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

//conectando com a API 

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    
    if (APIResponse.status === 200) {

        const data = await APIResponse.json();
        return data;
        
    } 

};

//Renderizar os dados do Pokemon

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Carregando...";
    pokemonId.innerHTML = "";

    const data = await fetchPokemon(pokemon)

      if ( data ) {

    pokemonName.innerHTML = data.name;
    pokemonId.textContent = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];

    input.value=""
    
    searchPokemon=data.id;
        
    } 
    else {

        pokemonName.innerHTML = "Não encontrado :( ";
        pokemonData.style = `left: 4.5rem;
                             color: red;   `
        
        input.value = "";

        pokemonImage.src = "";
        
    }

    console.log(data)

};

//Eventos dos botões prev e next

btnNext.addEventListener("click", () => {

    searchPokemon += 1
    renderPokemon(searchPokemon)

});

btnPrev.addEventListener("click", () => {

    if (searchPokemon > 1) {

      searchPokemon -= 1
    renderPokemon(searchPokemon)  

    }

});

renderPokemon(9);

