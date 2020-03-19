$(document).ready(function () {

    var characters = {

        'Batman' : {
            name: "Batman",
            hp: 150,
            ap: 17,
            cap: 20,
            image: "assets/images/batman.png"
        },

        'Nightwing' : {
            name: "Nightwing",
            hp: 120,
            ap: 11,
            cap: 15,
            image: "assets/images/nightwing.png"
        },

        'Joker' : {
            name: "Joker",
            hp: 140,
            ap: 10,
            cap: 19,
            image: "assets/images/joker.png"
        },

        'Deathstroke' : {
            name: "Deathstroke",
            hp: 160,
            ap: 14,
            cap: 23,
            image: "assets/images/deathstroke.png"
        },

        'Bane' : {
            name: "Bane",
            hp: 180,
            ap: 15,
            cap: 25,
            image: "assets/images/batman.png"
        },
    };
    console.log(characters);
    
    function render(char, area){
        var charDiv = $("<div class='character' data-name'>" + char.name +"'>");
        var charName = $("<div class= 'character-name'>").text(char.name);
        var charImage = $("<img alt ='image' class 'character-image'>").attr("src", char.imageUrl);
        var charHp = $("<div classes='character-hp'>").text(char.hp);
        charDiv.append(charName).append(charImage).append (charHp);
        $(area).append(charDiv);
    };
    
    });

