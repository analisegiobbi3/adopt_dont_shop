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