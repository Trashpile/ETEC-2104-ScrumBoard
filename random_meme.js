/**
 Michael McMullen User Story 3
"As a user I would like to be able to be shown a random meme from the repository"
Cos- Have a "random" button that would randomly pick a meme from the repository and display it to the user. 

Claimed: Mark Schueler
 */

var button = document.getElementById("random_button");
var list_of_memes = ["ref to meme 1", "ref to meme 2", "ref to meme 3", "ref to meme 4", "ref to meme 5"];

button.onclick = function() {
    alert(list_of_memes[Math.floor(Math.random() * list_of_memes.length)]); //Randomly choose a meme from the list of them and display it
};
    //Alert displays text not images, but it's proof of concept

    /**
    psuedo code for when we implement image functionality:

    <HTML>
        <img id="randomMeme"/>

    <JavaScript>
    function RandomMemeGenerator () {
        var meme = [list of memes URLS];
        var image = memes[Math.floor(Math.random()*memes.length)]; Obtains a random meme
        
        return image;
    }

    function ShowMeme () {
        var MemeToHtml = document.getElementById("randomMeme");
        MemeToHtml.src = getRandomMemeGenerator(); 

    }

    ShowMeme;

     */