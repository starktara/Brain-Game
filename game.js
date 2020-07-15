var tileColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(startSound);

function startSound(){
    if(!started){
        $("#level-title").text("Here We Go");
        playSound("start game");
        setTimeout(gameSequence,5450);
        started = true;
    }   
}

$(".button").click(handleClick);

function handleClick(event){
    var userClickedColor = event.target.id;
    userClickedPattern.push(userClickedColor);

    playSound(userClickedColor);
    animateColor(userClickedColor);

    checkAnswer(userClickedPattern.length-1);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              gameSequence();
            }, 1000);
          }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html("Game Over!!! <br> Score: " + ((level-1)*10) + "<br> Press Any Key To Start");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);

        startOver();
    }
    
}

function gameSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level" + level);

    var tileNum = Math.floor(Math.random()* 4);
    var randomTileChosen = tileColors[tileNum];
    gamePattern.push(randomTileChosen);

    $("#"+randomTileChosen).fadeOut(100).fadeIn(100);
    playSound(randomTileChosen);
}

function playSound(Name){
    var audio = new Audio("sounds/"+Name+".mp3");
    audio.play();
}

function animateColor(tilecolor){
    $("#" + tilecolor).addClass("pressed");
    setTimeout(function(){
        $("#" + tilecolor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

$(".instruction").click(function(){
    document.querySelector("#pop").classList.toggle("show");
})