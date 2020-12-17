var modalbutton=document.querySelector('.join');
var modelbg=document.querySelector('.joinmodal');
//join modal

var play=document.querySelector('.play');
var bgName=document.querySelector('.nameModal');
//name modal

//tutorial modal
var tutmodal=document.querySelector('.tutModal');
var tutDisplay=document.querySelector('.tutDisplay');

modalbutton.addEventListener('click',function(){
  modelbg.style.display="flex";
})

document.querySelector('.close').addEventListener('click',function(){
  modelbg.style.display="none";
})
//turns click to change display and close to revert display for join game

document.querySelector('.closeName').addEventListener('click',function(){
  bgName.style.display="none";
  errorPoint.style.display="none";
  errorMessage.style.display="none";
})

play.addEventListener('click',function(){
  bgName.style.display="flex";
})

//tutorial images modal




//puts the ! in a variable
var errorPoint=document.querySelector('.errorLength');
var errorMessage=document.querySelector('.errorText');


//loadName gets called at the beginning of gameboard.html
function loadName(){
  document.getElementById("player1Name").innerHTML=localStorage.getItem("userbase");
  // stores the name in a localstorage and sets it as player3 (hardcoded rn)
}

function loadColor(){

  document.getElementById("player1Tile1").style.borderColor=localStorage.getItem("usecol");
  document.getElementById("player1Tile2").style.borderColor=localStorage.getItem("usecol");
  document.getElementById("player1Name").style.color=localStorage.getItem("usecol");
  setPlayerColors(localStorage.getItem("usecol"));
}

function loadTimer(){
  document.getElementById("timer").innerHTML=5;
  setTurnTime(localStorage.getItem("usetime"));
  setTurnTimer(5);
}


//super long function for what happens when you click "confirm"
document.querySelector('.confirm').addEventListener('click',function(){
//once you click confirm the username value is checked
  var username=document.getElementById('username').value;
  //allC creates vairable of the entire select
  var allC=document.getElementById('sel userColor');
  //selectC saves what the user selected
  var selectC=allC.options[allC.selectedIndex].value;
  //timer stuff
  var allT=document.getElementById('sel turnTimer');
  //saves whatt the user selects for timer
  var selectT=allT.options[allT.selectedIndex].value;

  if (username.length > 10){
    //if username is greater than 8, teh ! appears
	EText = document.getElementById("errorText");
	EText.style.right = "15%";
    EText.innerHTML="Username can be no more than ten characters";
    errorPoint.style.display="flex";
    errorMessage.style.display="flex";

  }
  else if (username.length===0){
    errorPoint.style.display="flex";
	EText = document.getElementById("errorText");
	EText.style.right = "24%";
    EText.innerHTML="Please enter a username";
    errorMessage.style.display="flex";
  }
  else{
    //if username looks good, then close modal adn the error messages and load up the game
    //bgName.style.display="none";
    errorPoint.style.display="none";
    errorMessage.style.display="none";
    localStorage.setItem("userbase",username);
    localStorage.setItem("usecol",selectC);
    localStorage.setItem("usetime",selectT);
    //localStorage.setItem("tileTime", selectTi);

    event.preventDefault();
    //tutorial modal and it displays depending on clicking yes or no
    tutmodal.style.display="flex";
    document.querySelector('.tyes').addEventListener('click',function(){
      //bgName.style.display="none";
      tutmodal.style.display="none";
      tutDisplay.style.display="flex";

      document.querySelector('.closeTut').addEventListener('click',function(){
        tutDisplay.style.display="none";
        window.open('gameBoard.html','New Game','resizable,height=748,width=1366');
      })
      //function for changing images to be next with prev buttons

      //initialize classses
      var index=0;
      var tutNext=document.querySelector('.nextTut');
      var tutPrev=document.querySelector('.prevTut');
      tutNext.addEventListener('click', function(){
        index+=1;
        if (index > images.length - 1) {
         index = 0;
        }
        console.log("public/tutorial/Tutorial"+index+".JPG");
         document.getElementById('tutImg').src = "public/tutorial/Tutorial"+index+".JPG";
      });
      tutPrev.addEventListener('click',function(){
        index-=1;
        if (index < 0) {
         index = images.length - 1;
        }
        console.log("public/tutorial/Tutorial"+index+".JPG");
         document.getElementById('tutImg').src = "public/tutorial/Tutorial"+index+".JPG";
      });

    })
    //if pressed no for tutorial, load up game
    document.querySelector('.tno').addEventListener('click',function(){
      bgName.style.display="none";
      tutmodal.style.display="none";
      window.open('gameBoard.html','New Game','resizable,height=748,width=1366');
    })

}
})

//image  gallery functions
images=[1,2,3,4,5,6,7,8]
var index=0;

function nextImage() {
    index+=1;
    if (index > images.length - 1) {
     index = 0;
    }
    console.log("public/tutorial/Tutorial"+index+".JPG");
     document.getElementById('tutImg').src = "public/tutorial/Tutorial"+index+".JPG";

}
//'Previous' button


function prevImage(){
    index-=1;
    if (index < 0) {
     index = images.length - 1;
    }
    console.log("public/tutorial/Tutorial"+index+".JPG");
     document.getElementById('tutImg').src = "public/tutorial/Tutorial"+index+".JPG";

}
