$(document).ready(function () {

    var characters = {

        "Batman": {
            name: "Batman",
            hp: 170,
            ap: 14,
            cap: 17,
            image: "assets/images/batman"
        },

        "Nightwing": {
            name: "Nightwing",
            hp: 160,
            ap: 11,
            cap: 18,
            image: "assets/images/nightwing"
        },

        'Joker': {
            name: "Joker",
            hp: 155,
            ap: 10,
            cap: 20,
            image: "assets/images/joker"
        },

        'Deathstroke': {
            name: "Deathstroke",
            hp: 165,
            ap: 13,
            cap: 22,
            image: "assets/images/deathstroke"
        },

        'Bane': {
            name: "Bane",
            hp: 250,
            ap: 15,
            cap: 30,
            image: "assets/images/bane"
        }
    };

    var hero;
    var chosenEnemy;
    var chosenEnemyIndex = 0;
    var enemies = [];
    var victories = 0;
    var turn = 1;

    function load(char, area) {
        str = char.name.replace(/\s+/g, '');
        var charDiv = $("<div class='character' id='" + char.name + "'/div>");
        var charName = $("<p class='name' /p>").text(char.name);
        var charImage = $("<img class='charPic' id='" + str.toLowerCase() + "'>").attr("src", char.image + ".png");
        var charHP = $("<p class='hitPoints' /p>").text(char.hp);
        charDiv.append(charName).append(charImage).append(charHP);
        $(area).append(charDiv);

        if (area === "#character-choice") {
            charDiv.addClass("choice");
        }
        else {
            charDiv.removeClass("choice");
        }
        if (area === "#enemies") {
            charDiv.addClass("enemy");
        }
        if (area === "#defender") {
            charDiv.addClass("defender");
            var title = $("<h1>");
            title.text("Defender");
            $(area).prepend(title);
        }
        if (area === "#character") {
            charDiv.addClass("user-character");
            var title = $("<h1>");
            title.text("Your Character");
            $(area).prepend(title);
        }
    }

    for (var key in characters) {
        if (characters.hasOwnProperty(key)) {
            load(characters[key], "#character-choice");
        }
    }

    $(document).on('click', '.choice', function () {

        var name = $(this).attr("id");

        if (name !== hero) {
            for (var key in characters) {
                if (key === name) {
                    hero = characters[key];
                }
                else {
                    enemies.push(characters[key]);
                }
            }
            $("#character-choice").empty();
            load(hero, '#character');

            for (var i = 0; i < enemies.length; i++) {
                load(enemies[i], '#enemies');
            }
        }
    });

    $(document).on('click', '.enemy', function () {

        var name = $(this).attr("id");

        if ($('#defender').children().length === 0) {
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].name === name) {
                    chosenEnemy = enemies[i];
                    chosenEnemyIndex = i;
                }
            }
            enemies.splice(chosenEnemyIndex, 1);
            load(chosenEnemy, "#defender");
            $("#attack").css("visibility", "visible");
            $("#enemies").empty();
            for (var i = 0; i < enemies.length; i++) {
                load(enemies[i], '#enemies');
            }
        }
    });

    $(document).on('click', '#attack', function () {

        $("#message").text("You attacked " + chosenEnemy.name + " for " + (hero.ap * turn) + " damage.");
        $("#message").append("<br>")
        chosenEnemy.hp = (chosenEnemy.hp - (hero.ap * turn));

        if (chosenEnemy.hp > 0) {
            $("#defender").empty();
            load(chosenEnemy, "#defender");

            $("#message").append(chosenEnemy.name + " attacked you back for " + chosenEnemy.cap + " damage.");

            hero.hp = (hero.hp - chosenEnemy.cap);

            $("#character").empty();
            load(hero, "#character");

            if (hero.hp <= 0) {
                $("#attack").remove();
                $("#message").empty();
                $("#message").text("You Lose! Try Again!!!");
                $("#message").append($('<br> <button>Restart</button>').click(function () {
                    location.reload();
                }));
            }
        } else {
            $("#attack").css("visibility", "hidden");
            $("#defender").empty();
            $("#message").empty();
            victories++;
            if (victories === 4) {
                $("#attack").remove();
                $("#character").remove();
                $("#enemies").remove();
                $("#enemy-choice").remove();
                $("#message").text("You Win! GAME OVER!!!");
                $("#message").append($('<br> <button>Restart</button>').click(function () {
                    location.reload();
                }));
                
            }
            else {
                $("#message").append("You Defeated " + chosenEnemy.name + ".");
                $("#message").append('<br>', "Select a new Enemy.");
                $("#character").empty();
                load(hero, "#character");
                $("#enemies").empty();
                for (var i = 0; i < enemies.length; i++) {
                    load(enemies[i], '#enemies');
                }
            }
        }
        turn++;
       
    });
});