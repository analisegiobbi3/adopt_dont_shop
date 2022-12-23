var textArea = $('#breed-area');
var breedInfo = []

breedInfo.push(JSON.parse(localStorage.getItem('storedBreed')));
// console.log(breedInfo[0]);
var breedSplit = breedInfo[0].split("{{");
console.log(breedSplit);

textArea.text(breedInfo);