window.onload = function () {
    const searchText = document.getElementById("search-input");
    const pokemon = document.getElementById("pokemon-image");
    const saveButton =  document.getElementById("save-button");
    let frontImage = "";
    let backImage = "";
    let currentImage = "";

    searchText.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            fetchData(searchText.value);
        }

        document.getElementById("pokemon-display")
    });

    const fetchData = (input) => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + input)
            .then(response => response.json())
            .then(data => {
                showPokemonImage(data);
                populatePokemonInfo(data);
                saveButton.onclick = () => {
                    storePokemon(data);
                }
            })
    }

    pokemon.onclick = () => {
        if (currentImage === frontImage) {
            currentImage = backImage;
            pokemon.src = backImage;
        } else {
            currentImage = frontImage;
            pokemon.src = currentImage;
        }
    }

    const populatePokemonInfo = (data) => {
        const pokemonInfo = document.getElementById("pokemon-info");
        pokemonInfo.innerHTML = "Name : " + data.name + " Weight : " + data.weight
            + " ID : " + data.id + " Height : " + data.height;
    }

    const showPokemonImage = (data) => {
        frontImage = data.sprites.front_default;
        backImage = data.sprites.back_default;
        currentImage = frontImage;
        document.getElementById("pokemon-image").src = currentImage;

    }

    const storePokemon = (data) => {
        let img = document.createElement('img');
        img.src = data.sprites.front_default;
        document.getElementById('pokemon-storage').appendChild(img);

        img.onclick = () => {
            showPokemonImage(data);
            populatePokemonInfo(data);
        }
    }

}