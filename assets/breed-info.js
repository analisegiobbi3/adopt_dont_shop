var textArea = $('#breed-area');
var breedInfo = []

breedInfo.push(JSON.parse(localStorage.getItem('storedBreed')));
var breedwikiurl = JSON.parse(localStorage.getItem('storedbreedurl'));
// console.log(breedInfo[0]);
console.log(breedwikiurl)

textArea.text(breedInfo);

