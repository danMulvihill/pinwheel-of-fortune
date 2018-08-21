
var answers = [
    {
        ans: "Don't eat yellow snow",
        hint: "Childish winter wisdom"
    },{
        ans: "Chocolate Chip Cookies",
        hint: "a sweet treat",
    },{
        ans: "Buckingham Palace",
        hint: "a big house"
    },{
        ans: "Eleanor Roosevelt",
        hint: "first lady"
    },{
        ans: "George Washington Carver",
        hint: "famous agronomist"
    },{
        ans: "Australian Outback",
        hint: "a hot dry place"
    },{
        ans: "Paper, Scissors, Rock",
        hint: "a handy game"
    },{
        ans: "It's raining cats and dogs",
        hint: "Figurative condition"
    },{
        ans: "Genetically Modified Organisms",
        hint: "conversation starter, if you want a tense debate"
    },{
        ans: "Sharknado",
        hint: "movie title"
    },{
        ans: "Mt. Kilimanjaro",
        hint: "inactive volcano"
    },{
        ans: "San Francisco",
        hint: "El pastor de pájaros"
    },{
        ans: "The Wonderful Wizard of Oz",
        hint: "old children's book"
    },{
        ans: "Greenwich Mean Time",
        hint: "an aide for navigation"
    },{
        ans: "Umbrella",
        hint: "What goes up when the rain comes down?"
    },{
        ans: "It was framed",
        hint: "Riddle: why did the photo go to jail?"
    },{
        ans: "Beware of meat twice boil'd, and an old foe reconcil'd.",
        hint: "Quote from Poor Richard's Almanack"
    },{
        ans: "Sister Rosetta Tharpe",
        hint: "first rock-and-roll singer"
    },{
        ans: "They're both in the middle of water",
        hint: "How is an island like the letter T?"
    },{
        ans: "Enceladus",
        hint: "a moon of Saturn (or Athena's foe)"
    },{
        ans: "Pinwheel",
        hint: "a toy"
    },{
        ans: "Fortune",
        hint: "A type of cookie"
    },{
        ans: "For sale: Baby shoes. never worn.",
        hint: "short story by Hemingway"
    }
]

setTimeout(function(){
    $('.modal').fadeIn().fadeOut(3000);
}, 3000)

setTimeout(function(){
    $('.p').fadeIn(1000);
    $('.w').fadeOut(1000);
}, 1000)

//start the game - global variables

//get the score
var score = Cookies.get('score');

if(!score){
    Cookies.set("score", 0);

}
console.log(Cookies.get('score'))
if(score<0){
    document.querySelector("#score").classList.add("in-the-red");
}

console.log($);
console.log($.ajax())
//get answers and hint;
$(document).ready(
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "pof.json",
        success: function(res){
          console.log("ajax data: "+res)
        }
      }) //end ajax
)


var rand = Math.floor(Math.random()*answers.length);
var answer = answers[rand].ans;
var hint = answers[rand].hint
var score = Cookies.get('score');

answer = answer.toUpperCase().split('');
var lettersGuessed = [];
var status = "still playing";



var getPhrase = function () {
    let display = ''
    //console.log(answer)
    for (let i = 0; i<answer.length; i++){
        if (lettersGuessed.includes(answer[i]) || answer[i] === ' ' || answer[i] === "'" || answer[i] ==","|| answer[i] =="."||answer[i]==":" ){
            display += answer[i]
        } else {
            display += '_'
        }
    }
    //console.ilog(display)
    return display
}

var getHint= function(){
    return hint;
}

var getScore = function () {
    Cookies.set("score", score)
        if (score>0){
            return "You win $"+score+"00";
        }else if(score<0){
            return "You owe us $"+Math.abs(score)+"00"
        }else{
            return ""
        }
        
}


var makeGuess = function (guess) {
   
    guess = guess.toUpperCase()
    var isUnique = !lettersGuessed.includes(guess)
    var isWrong = !answer.includes(guess)
    var isVowel = guess == 'A' || guess=='E'||guess=='I'||guess=='O'||guess=='U';
 
    if (status !== 'still playing') {
        return
    }

    if (isUnique) {
        lettersGuessed.push(guess)
        document.querySelector("#tried").style.visibility = "visible";
        document.querySelector("#tried span").textContent = lettersGuessed.sort();
        score=parseInt(score)+1;
    }
  
    if(isWrong && isVowel){
        score = score;
    }else if(isUnique && isVowel){

        score = parseInt(score)-2;
        console.log(score)
    }
    

    if (isUnique && isWrong) {
        console.log(score)
        score = parseInt(score)-3;
        console.log(score)
    }
    
    //calculate status:

    phraseArray = phraseEl.textContent.split("");
    phraseEmpty = !phraseArray.includes("_");
    
    
    if (score<0){
        document.querySelector("#score").classList.add("in-the-red");
    }else{
        document.querySelector("#score").classList.remove("in-the-red");
    }
    
    if (phraseEmpty) {
        location.reload();
    } else {
        status = 'still playing'
    }
}




const phraseEl = document.querySelector('#phrase-board');
const scoreEl = document.querySelector('#score');
var hintEl = document.querySelector('#hint');


phraseEl.textContent = getPhrase();
hintEl.textContent = getHint();
scoreEl.textContent = getScore();

window.addEventListener('keypress', function (e) {
    
    var guess = e.key;
    if(e.key === "Enter"){
        location.reload();
        return false;

    }
    if(e.key === " " || e.key == /[0-9]/){
        
        return false;
    }
    makeGuess(guess);
    phraseEl.textContent = getPhrase();
    scoreEl.textContent = getScore();
})


document.querySelector(".redo").addEventListener("click", function(){
  location.reload()
})

