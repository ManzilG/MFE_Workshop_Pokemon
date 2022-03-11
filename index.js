window.onload = function () {
    const searchText = document.getElementById("search-input");
    const pokemon = document.getElementById("pokemon-image");
    const saveButton =  document.getElementById("save-button");
    let frontImage = "";
    let backImage = "";
    let currentImage = "";
    const savedData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : null;
    const savedInput = localStorage.getItem("input") ? localStorage.getItem("input") : null;
    const savedItems = localStorage.getItem("savedItems") ? JSON.parse(localStorage.getItem("savedItems")) : null;

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
                localStorage.setItem("data", JSON.stringify(data));
                localStorage.setItem("input", input);
                showPokemonImage(data);
                populatePokemonInfo(data);
                saveButton.onclick = () => {
                    storePokemon(data);
                }
            })
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

    const createImage = (data) => {
        let img = document.createElement('img');
        img.src = data.sprites.front_default;
        document.getElementById('pokemon-storage').appendChild(img);
        img.onclick = () => {
            showPokemonImage(data);
            populatePokemonInfo(data);
        }
    }

    const storePokemon = (data) => {
        createImage(data);
        let savedImages = JSON.parse(localStorage.getItem("savedItems"));
        savedImages.push(data);
        localStorage.setItem("savedItems", JSON.stringify(savedImages));
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

    if(savedData && savedInput) {
        searchText.value = savedInput;
        showPokemonImage(savedData);
        populatePokemonInfo(savedData);
        saveButton.onclick = () => storePokemon(savedData);

    }
    if(savedItems) {
        savedItems.forEach(savedItem => {
            createImage(savedItem);
        })

    }

}