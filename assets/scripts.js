var apiKey = 'qQ7VYpNGk9n2b33tvNje8yNmYVxLsQo7SoYhZ7PPmLYKMhOLC2';
//remove before commit
var secretKey = '';
var inputEl = $("#animal-name");
var buttonEl = $("#searchAnimal");
var resultsEl = $("#result-content");
var breedSearchEl = $(".breedSearch")
var seeSavedResultsEl = $("#seeStoredResults")

// $('.dropdown-trigger').dropdown();

//'https://api.petfinder.com/v2/animals?type=' + animal + '&status=' + city,

//This function will handle grabbing the animal input. It will use and event handler to search on click.
var searchHandler = function(event){
    event.preventDefault();
    var animalInput = inputEl.val().trim();

    if (animalInput){
        petSearch(animalInput)
    }else{
        //add error handler
    }
}
buttonEl.on('click', searchHandler)

//pet search grabs the animal input from the animal input function and pulls data for the animal type 
var petSearch = function (animal){
    var petFinderURL = 'https://api.petfinder.com/v2/oauth2/token';
    fetch(petFinderURL, {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + secretKey,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        console.log('token', data);
    
        return fetch('https://api.petfinder.com/v2/animals?type=' + animal, {
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    
    }).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        // Log the pet data
        console.log('pets', data);
        $("#result-content").empty();
        var animalArray = data.animals;
        for (var i=0; i<animalArray.length; i++){
            var breed = data.animals[i].breeds.primary;
            var name  = data.animals[i].name;
            var status = data.animals[i].status;
            var image = data.animals[i].photos[0];
            var url = data.animals[i].url;
            renderResults(breed, name, status, image, url);
        }

        // wikiSearch(breed)
    
    }).catch(function (err) {
    
        // Log any errors
        console.log('something went wrong', err);
    
    }); 
}


//wiki function take the breen from the previous data query and searches for it in wikipedia 
function wikiSearch(searchTerm) {
    var wikiURL = 'https://en.wikipedia.org/w/rest.php/v1/page/'+searchTerm;
    fetch(wikiURL)
        .then(function(response){
        response.json()
    .then(function(data) {
        console.log(data);
        var breedSearch = data.source;
        console.log(breedSearch)
        //html element, like <p> and we add text content 

    })
    })
    .catch(function (error) {
        alert('Unable to connect to location services');
    })
}

function renderResults(breed, name, status, image, url){
    var resultsCard = document.createElement('div');
    resultsCard.classList.add('card')

    var resultsBody = document.createElement('div');
    resultsBody.classList.add('card-body')
    resultsCard.append(resultsBody);

    var adoptionButton = document.createElement('link');
    adoptionButton.setAttribute('src', url);
    adoptionButton.setAttribute('data-link', url)

    var animalName = document.createElement('h3');
    animalName.setAttribute("data-name", name)
    animalName.textContent = name;

    var animalImage = document.createElement('img');
    animalImage.textContent = image;

    var animalBreed = document.createElement('button');
    animalBreed.setAttribute("class", "breedSearch")
    animalBreed.setAttribute("data-breed", breed)
    animalBreed.textContent = breed;

    var adoptionStatus = document.createElement('h4');
    adoptionStatus.textContent = status; 
    
    var saveButton = document.createElement('button');
    saveButton.setAttribute("data-save", "save")
    saveButton.innerHTML = "SAVE"



    resultsEl.append(resultsCard)
    resultsBody.append(adoptionButton, animalName, animalBreed, adoptionStatus, saveButton)
}

var storedPets = []
var breedSearchHandler = function(event){
    var breedText = event.target.dataset.breed;
    var savebutton = event.target.dataset.save;
    var adoptionLink = event.target.dataset.link
    if (savebutton === "save"){
        var petInfo = event.target.parentNode.firstChild.dataset.link;
        console.log(petInfo)
        storedPets.push(petInfo);
        localStorage.setItem("savePets", JSON.stringify(storedPets));
    }else{
        wikiSearch(breedText);
    }
}

function getStorePets(){
    $("#seeStoredResults").empty();
    var savedResults = JSON.parse(localStorage.getItem("savePets"))
    console.log(savedResults)
    var savedResultsCard = document.createElement('div');
    savedResultsCard.classList.add('card')
    seeSavedResultsEl.append(savedResultsCard)

    var savedresultsBody = document.createElement('div');
    savedresultsBody.classList.add('card-body')
    savedResultsCard.append(savedresultsBody);
    var savedName = document.createElement('button');
    savedresultsBody.append(savedName)
    savedName.innerHTML = savedResults;   
}

$("#result-content").on('click', breedSearchHandler);
$("#loadPets").on('click', getStorePets);



