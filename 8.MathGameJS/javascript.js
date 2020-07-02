var playing = false;
var score;
var action;
var time;
var answer;
document.getElementById("startReset").onclick = function (){
    if (playing) {
        location.reload();
    } else {
        playing = true;
        score=0;
        updateScore();
        block("time");
        time = 60;
        document.getElementById("count").innerHTML = time;
        hide("gameOver");
        document.getElementById("startReset").innerHTML = "Reset Game";

        startCountDown();
        //generate qa
        questions();

    }
}
//start counter
function startCountDown(){
    action = setInterval(function(){
        time -= 1;
        document.getElementById("count").innerHTML = time;
        if (time==0){
            clearInterval(action);
            block("gameOver");
            hide("time");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    }, 1000)
}
//hide certain element
function hide(id){
    document.getElementById(id).style.display = "none";
}
//show certain element
function block(id){
    document.getElementById(id).style.display = "block";
}

function questions(){
    var x = 1 + Math.floor(Math.random() * 10)
    var y = 1 + Math.floor(Math.random() * 10)
    answer = x*y
    document.getElementById("question").innerHTML = x + "x" + y;
    var position = 1 + Math.floor(Math.random() * 4)
    document.getElementById("box"+position).innerHTML = answer;
    for (i=1; i<5; i++){
        if(i!=position){
            var notAnswer;
            var arr = [answer];
            do {
                notAnswer = (1 + Math.floor(Math.random() * 10)) * (1 + Math.floor(Math.random() * 10));
                window.console.log("box" + i, notAnswer)
            } while (arr.indexOf(notAnswer)>-1);
            arr.push(notAnswer);
            document.getElementById("box"+i).innerHTML = notAnswer;
        }
    }
    window.console.log(answer)
}

function updateScore(){
    for (i=0; i<document.getElementsByClassName("scoreValue").length; i++){
        document.getElementsByClassName("scoreValue")[i].innerHTML = score;
    }
}


for (k=1;k<5;k++){
    document.getElementById("box"+k).onclick = function(){
    if (playing){
        if(this.innerHTML == answer){
            score += 1;
            updateScore();
            hide("wrong");
            block("correct");
            setTimeout(function(){hide("correct")}, 1000);
            questions();
        } else {
            hide("correct");
            block("wrong");
            setTimeout(function(){hide("wrong")}, 1000);
        }}}};