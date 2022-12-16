
var apiKey = 'qQ7VYpNGk9n2b33tvNje8yNmYVxLsQo7SoYhZ7PPmLYKMhOLC2';
//remove before commit
var secretKey = '';

$('.dropdown-trigger').dropdown();


var petSearch = function (animal, city){
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
    
        return fetch('https://api.petfinder.com/v2/animals?type=' + animal + '&status=' + city, {
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
    
    }).catch(function (err) {
    
        // Log any errors
        console.log('something went wrong', err);
    
    });
    
}



var searchTerm = "chocolate lab"
var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=1&gsrsearch=' + searchTerm;

function wikiSearch() {
    fetch(wikiURL)
    .then(function(response){
    response.json()
    .then(function(data) {
    console.log(data);
    })
    })
    .catch(function (error) {
    alert('Unable to connect to location services');
    })
}
