// Variables-->

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = true;
var flag = true;
var clickCount = 0;

// Start-->

$(document).keypress(function() {
  if (started) {

    started = false;
    $("#level-title").text("Level " + level);
    nextSequence();

  }

})

// UserPattern-->

$(".btn").click(function() {
  clickCount++;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playsound(userChosenColour);
  animatePress(userChosenColour);

  checkUserPattern(clickCount);

});

// CheckPattern-->

function checkUserPattern(index) {

  if (userClickedPattern[index - 1] !== gamePattern[index - 1]) {
    flag = false;
  }

  if (flag == false) {
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    startOver();
  }

  if (index == level) {
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
    clickCount = 0;
  }

}

// GetNextSequenceColor-->

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}

// PlaySound-->

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animations-->

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

// Restart-->

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = true;
  flag = true;
  clickCount = 0;
}
