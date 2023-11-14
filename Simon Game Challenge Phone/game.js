var buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var level =0;
var started = false;

if(!started){
  $("#level-title").text("Press Anywhere on screen to start.");
}

$(document).click(function(){
  if(!started){
    started=true;
    nextSequence();
  }
});

$(".btn").click(function(){
  var userClicked = $(this).attr("id");
  playSound(userClicked);
  userClickedPattern.push(userClicked);
  animatePress(userClicked);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currLvl){
  if(userClickedPattern[currLvl]===gamePattern[currLvl]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game over Press anywhere to restart the game.");
    startOver();
    playSound("wrong");
  }
}

function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}

function animatePress(name){
  $("#"+name).addClass("pressed");
  setTimeout(function(){
    $("#"+name).removeClass("pressed");
  },200)
}

function nextSequence(){
  userClickedPattern= [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}