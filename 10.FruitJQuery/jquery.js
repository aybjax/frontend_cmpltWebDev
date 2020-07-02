var playing = false;
var score;
var life = 3
var jemis = ["apple", "banana", "cherries", "grapes", "mango",
            "orange", "peach", "pear", "watermelon"];
var xLoc;
var step;
var action;
var fruit;
for (i=0; i<jemis.length; i++){
    jemis[i] = "images/jemis/" + jemis[i] + ".png"
}
$(function(){
    $("#startReset").click(function(){
        if (playing){
            location.reload();
        } else {
            $(".hidden").hide();
            playing = true;
            score = 0;
            $(".scoreValue").html(score);
            $("#life").show();
            life = 3;
            addHearts(life);
            $("#startReset").html("Reset");
            fruitFall();
        }
    });


function addHearts(life){
    $("#life").html("")
    for (i=0; i<life; i++){
        $("#life").append('<img src="images/heart.png" class="heart">')
    }
}

function fruitFall(){
        initFruit();
        action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        //window.console.log($("#fruit1").position().top + step);
        if ($("#fruit1").position().top > $("#question").height()){
            $("#fall")[0].play();
            window.console.log("fall")
            if (life > 1){
                life--;
                addHearts(life);
                initFruit();
            } else {
                life--;
                playing = false;
                addHearts(life);
                gameOver();
                $("#startReset").html("Start Game");
                $("#life").hide();
                $(".scoreValue").html(score);
                $("#gameOver").show();
                stopGame();
            };
        }
    }, 10);
}


$("#fruit1").mouseover(function(){
    score++;
    $(".scoreValue").html(score);
    // document.getElementsByTagName("audio").play();
    // document.getElementById("#audio").play();
    $("audio")[0].play();
    $("#fruit1").hide("explode", 200);
    $("#fruit1").attr("src", "");
    stopGame();
    a = setTimeout(fruitFall, 600);
})


function initFruit(){
    $("#fruit1").show();
    fruit = jemis[Math.floor(Math.random()*jemis.length)];
    $("#fruit1").attr({src:fruit});
    xLoc = Math.floor(Math.random()*900);
    $("#fruit1").css({"left":xLoc,"top":-120});
    step = 1 + Math.round(3*Math.random());
    window.console.log("Fruit initialized...");

    window.console.log("   ", xLoc);
}

function gameOver(){
    $(".score").html(score)
    $("life").hide();
}

function stopGame(){
    clearInterval(action);
}











});