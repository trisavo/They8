
class Deck {


  constructor(type) {
    //////console.log(cards);
    this.deck = [];
		this.InPlay;



    if (type === "godTile") {
      const cardArr = tiles;

      for (let i = 0; i < cardArr.length; i++) {
        const card = new GodTile(cardArr[i]);
        //////console.log(cardArr[i]);
        this.deck.push(card);
        this.glory = 15;
        this.infamy = 15;
      }
    } else if (type === "ActionCards") {
      const cardArr = cards;

      for (let i = 0; i < cardArr.length; i++) {
        const card = new ActionCard(cardArr[i]);
        //////console.log(card);
        this.deck.push(card);
      }
    }

    //////console.log(this.deck);
  }
	shuffle() {
    this.deck.sort(() => Math.random() - 0.5);
  }

	setInPlay(ID){
		//console.log("ININPLAY");
		this.InPlay = ID;
	}

	resetInPlay(){
		this.InPlay;
	}
  deal(numberDealt) {
    //////console.log("DEAL " + numberDealt);

    for (let i = 0; i < numberDealt - 1; i = i + 3) {
      //////console.log(this.deck[i]);
      this.deck[i].location = "player1";
      this.deck[i + 1].location = "player2";
      this.deck[i + 2].location = "player3";
    }

    return this;
  }

  getCard(index) {
    return this[index];
  }

//  drawCard(player){

//  }
}
 //////console.log(ActionDeck.deck);

 var ActionDeck = new Deck("ActionCards");
 ActionDeck.shuffle();
 ActionDeck = ActionDeck.deal(9);

 var j = 1
 for(var i = 0; i<=6; i+=3){
 x = document.getElementById(ActionDeck.deck[i].location + "Card" + (j));
 //////console.log(ActionDeck.deck[i].location + "Card" + (j));
 j++;
 x.src = ("./images/"+ ActionDeck.deck[i].img);
 }


 var godDeck = new Deck("godTile");
 godDeck.shuffle();
 godDeck.deal(6);

 var j = 1;
 for(var i = 0; i<4; i+=3){
 x = document.getElementById(godDeck.deck[i].location + "Tile" + (j));
 //////console.log(godDeck.deck[i].location + "Tile" + (j));
 j++;
 x.src = ("./images/"+ godDeck.deck[i].img);
 }

 var j = 1;
 for(var i = 1; i<5; i+=3){
 x = document.getElementById(godDeck.deck[i].location + "Tile" + (j));
 //////console.log(godDeck.deck[i].location + "Tile" + (j));
 j++;
 x.src = ("./images/"+ godDeck.deck[i].img);
 }

 var j = 1;
 for(var i = 2; i<6; i+=3){
 x = document.getElementById(godDeck.deck[i].location + "Tile" + (j));
 //////console.log(godDeck.deck[i].location + "Tile" + (j));
 j++;
 x.src = ("./images/"+ godDeck.deck[i].img);
 }


 function getCardFromImg(imgsrc, deck){
	//console.log("INGETCARDFROMIMG");
	 //////console.log(deck.deck);
		 for(const card of deck.deck){

			 //////console.log("CARD" + card);
			 if(card.img.slice(-9) == imgsrc.slice(-9)){
				 //////console.log(card.acttext);
				 return card;

			 }
		 }

		 return "none";
 }

 function identifyPlayable(className){
	 //console.log("INIDENTIFYTARGETS")
 	var x = document.getElementsByClassName(className);
 	var i;
 	for(i = 0; i<x.length; i++){
 		var imgsrc = x[i].src;
 		var card1 = getCardFromImg(imgsrc, ActionDeck);
 		var thisTar = card1.identifyTargets(godDeck.deck);
 		if(thisTar[0] === undefined){
 			x[i].style.opacity = "0.3";
 		}
 	}
 }



 function getImgFromCard(card){
	 //console.log('INGETIMGFROMCARD');
	 return "./images/" + card.img;
 }

function getCardFromID(ID, deck){
	//console.log("INGETCARDFROMID");
	var someimage = document.getElementById(ID).src;
	////console.log(someimage);
////console.log("CARD" + getCardFromImg(someimage, ActionDeck).name);
return (getCardFromImg(someimage, deck));
}

function getIDFromCard(card){

}

function removeBorders(){
	//console.log('IMREMOVEBORDERS');
	var x = document.getElementsByClassName("pairL tile");
	var i;
	for(i = 0; i<x.length; i++){
		x[i].style.boxShadow = "";
		x[i].style.opacity = "";
	}
	var x = document.getElementsByClassName("pairR tile");
	var i;
	for(i = 0; i<x.length; i++){
		x[i].style.boxShadow = "";
		x[i].style.opacity ="";
	}
	var x = document.getElementsByClassName("pairT tile");
	var i;
	for(i = 0; i<x.length; i++){
		x[i].style.boxShadow = "";
		x[i].style.opacity ="";
	}
}
function addBorder(array){
	//console.log("INADDBORDER");

	var x = document.getElementsByClassName("pairL tile");
	////console.log("ARRAY" + array);
	////console.log("X" + x);
	var i;
	for (i = 0; i < x.length; i++) {
		var imgsrc = x[i].src;
		var card = getCardFromImg(imgsrc, godDeck);
		if(array.includes(card)){
			//console.log("ID" + x[i].id);
			x[i].style.boxShadow = "0px 0px 12px 10px #C5B358";
			showTargetButtons(x[i].id);

		}
		else{
			x[i].style.opacity = "0.3";
		}
	}
	var x = document.getElementsByClassName("pairR tile");
	var i;
	for (i = 0; i < x.length; i++) {
		var imgsrc = x[i].src;
		var card = getCardFromImg(imgsrc, godDeck);
		if(array.includes(card)){
			//console.log("ID" + x[i].id);

			x[i].style.boxShadow = "0px 0px 12px 10px #C5B358";
				showTargetButtons(x[i].id);
		}
		else{
			x[i].style.opacity = "0.3";
		}
	}
	var x = document.getElementsByClassName("pairT tile");
	var i;
	for (i = 0; i < x.length; i++) {
		var imgsrc = x[i].src;
		var card = getCardFromImg(imgsrc, godDeck);
		if(array.includes(card)){
			//console.log("ID" + x[i].id);
			x[i].style.boxShadow = "0px 0px 12px 10px #C5B358";
			showTargetButtons(x[i].id);
		}
		else{
			x[i].style.opacity = "0.3";
		}
	}
}

function updateSupply(){
	var inf = godDeck.infamy;
	var glo = godDeck.glory;
	var x = document.getElementsByClassName("infamyScore");
	x[0].innerHTML = inf;
	var x = document.getElementsByClassName("gloryScore");
	x[0].innerHTML = glo;
}

function updateGI(){
 var god = getCardFromImg(document.getElementById("player1Tile1").src, godDeck);
 var inf = god.infamy;
 document.getElementById("infamyP1T1").innerHTML = inf;
 document.getElementById("infamyP1T1").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player2Tile1").src, godDeck);
 var inf = god.infamy;
 document.getElementById("infamyP2T1").innerHTML = inf;
 document.getElementById("infamyP2T1").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player3Tile1").src, godDeck);
 var inf = god.infamy;
 document.getElementById("infamyP3T1").innerHTML = inf;
 document.getElementById("infamyP3T1").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player1Tile2").src, godDeck);
 var inf = god.infamy;
 document.getElementById("infamyP1T2").innerHTML = inf;
 document.getElementById("infamyP1T2").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player2Tile2").src, godDeck);
 var inf = god.infamy;
 document.getElementById("infamyP2T2").innerHTML = inf;
 document.getElementById("infamyP2T2").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player3Tile2").src, godDeck);
 var inf = god.infamy;
 document.getElementById("infamyP3T2").innerHTML = inf;
 document.getElementById("infamyP3T2").style.fontSize = "xx-large";

 var god = getCardFromImg(document.getElementById("player1Tile1").src, godDeck);
 var glo = god.glory;
 document.getElementById("gloryP1T1").innerHTML = glo;
 document.getElementById("gloryP1T1").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player2Tile1").src, godDeck);
 var glo = god.glory;
 document.getElementById("gloryP2T1").innerHTML = glo;
 document.getElementById("gloryP2T1").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player3Tile1").src, godDeck);
 var glo = god.glory;
 ////console.log("GLOE" + god.glory);
 document.getElementById("gloryP3T1").innerHTML = glo;
 document.getElementById("gloryP3T1").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player1Tile2").src, godDeck);
 var glo = god.glory;
 document.getElementById("gloryP1T2").innerHTML = glo;
 document.getElementById("gloryP1T2").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player2Tile2").src, godDeck);
 var glo = god.glory;
 document.getElementById("gloryP2T2").innerHTML = glo;
 document.getElementById("gloryP2T2").style.fontSize = "xx-large";
 var god = getCardFromImg(document.getElementById("player3Tile2").src, godDeck);
 var glo = god.glory;
 document.getElementById("gloryP3T2").innerHTML = glo;
 document.getElementById("gloryP3T2").style.fontSize = "xx-large";

}
updateGI();

function hideTargets(){
	////console.log('INHIDETARGETS');
	var x = document.getElementsByClassName("targetButton");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
}

function setSupply(){

}

function reverseCard(ID){
	//console.log("REVERSECARDTIMES");
	var x = document.getElementById(ID);
	x.src = "./images/back-action.jpg"
}


identifyPlayable("p1Card");

function updateScore(){
	var a = document.getElementById("smallScorePairLL");
	var ascore = getCardFromID("player2Tile2", godDeck).getScore();
	a.innerHTML = ("  " + ascore);
	a.style.fontSize = "x-large";
	a.style.textAlign = "center";
	var b = document.getElementById("smallScorePairLR");
	var bscore = getCardFromID("player1Tile1", godDeck).getScore();
	b.innerHTML = ("  " + bscore);
	b.style.fontSize = "x-large";
	b.style.textAlign = "center";
	var c = document.getElementById("scorePairL");
	c.innerHTML = ("  " + (bscore + ascore));
	c.style.fontSize = "xx-large";
	c.style.textAlign = "center";

	var a = document.getElementById("smallScorePairRL");
	var ascore = getCardFromID("player1Tile2", godDeck).getScore();
	a.innerHTML = ("  " + ascore);
	a.style.fontSize = "x-large";
	a.style.textAlign = "center";
	var b = document.getElementById("smallScorePairRR");
	var bscore = getCardFromID("player3Tile1", godDeck).getScore();
	b.innerHTML = ("  " + bscore);
	b.style.fontSize = "x-large";
	b.style.textAlign = "center";
	var c = document.getElementById("scorePairR");
	c.innerHTML = ("  " + (bscore + ascore));
	c.style.fontSize = "xx-large";
	c.style.textAlign = "center";

	var a = document.getElementById("smallScorePairTL");
	var ascore = getCardFromID("player2Tile1", godDeck).getScore();
	a.innerHTML = ("  " + ascore);
	a.style.fontSize = "x-large";
	a.style.textAlign = "center";
	var b = document.getElementById("smallScorePairTR");
	var bscore = getCardFromID("player3Tile2", godDeck).getScore();
	b.innerHTML = ("  " + bscore);
	b.style.fontSize = "x-large";
	b.style.textAlign = "center";
	var c = document.getElementById("scorePairT");
	c.innerHTML = ("  " + (bscore + ascore));
	c.style.fontSize = "xx-large";
	c.style.textAlign = "center";

}

function showSecondTargets(){
	var card = getCardFromID(ActionDeck.inPlay);
  var array = card.identifyTargets();

	var x = document.getElementsByClassName("pairL tile");
	////console.log("ARRAY" + array);
	////console.log("X" + x);
	var i;
	for (i = 0; i < x.length; i++) {
		var imgsrc = x[i].src;
		var card = getCardFromImg(imgsrc, godDeck);
		if(array.includes(card)){
			//console.log("ID" + x[i].id);
			x[i].style.boxShadow = "0px 0px 12px 10px #C5B358";
			showSecondTargetButtons(x[i].id);

		}
		else{
			x[i].style.opacity = "0.3";
		}
	}
	var x = document.getElementsByClassName("pairR tile");
	var i;
	for (i = 0; i < x.length; i++) {
		var imgsrc = x[i].src;
		var card = getCardFromImg(imgsrc, godDeck);
		if(array.includes(card)){
			//console.log("ID" + x[i].id);

			x[i].style.boxShadow = "0px 0px 12px 10px #C5B358";
				showSecondTargetButtons(x[i].id);
		}
		else{
			x[i].style.opacity = "0.3";
		}
	}
	var x = document.getElementsByClassName("pairT tile");
	var i;
	for (i = 0; i < x.length; i++) {
		var imgsrc = x[i].src;
		var card = getCardFromImg(imgsrc, godDeck);
		if(array.includes(card)){
			//console.log("ID" + x[i].id);
			x[i].style.boxShadow = "0px 0px 12px 10px #C5B358";
			showSecondTargetButtons(x[i].id);
		}
		else{
			x[i].style.opacity = "0.3";
		}
	}
}


var tar2;
var tar2ID;

function setSecondTarget1(){
  tar2 = getCardFromID("player3Tile2");
  tar2ID = "player3Tile2";
}
function setSecondTarget2(){
  tar2 = getCardFromID("player1Tile1");
  tar2ID = "player1Tile1";
}
function setSecondTarget3(){
  tar2 = getCardFromID("player1Tile2");
  tar2ID = "player1Tile2";
}
function setSecondTarget4(){
  tar2 = getCardFromID("player2Tile1");
  tar2ID = "player2Tile1";
}
function setSecondTarget5(){
  tar2 = getCardFromID("player3Tile1");
  tar2ID = "player3Tile1";
}
function setSecondTarget6(){
  tar2 = getCardFromID("player2Tile2");
  tar2ID = "player2Tile2";
}

function resetSecondTarget(){
  tar2 = "";
  tar2ID = "";
}

function targetT1(){
	var current = getCardFromID(ActionDeck.InPlay, ActionDeck);
  if(current.id === 6 || current.id === 2 || current.id === 4){
    removeBorders();
    showSecondTargets();
    current.playActionCard(getCardFromID("player2Tile2", godDeck), tar2, godDeck);
    resetSecondTarget();
    hideTargets();
    document.getElementById(ActionDeck.InPlay).onmouseover = showDescription("");
  	reverseCard(ActionDeck.InPlay);
  	ActionDeck.resetInPlay();
  	setElementIsVisible("infamyP2T2", true);
  	setElementIsVisible("gloryP2T2", true);
    setElementIsVisible("infamyP"+ tar2ID.charAt(6) + "T" + tar2ID.charAt(11), true);
  	setElementIsVisible("gloryP"+ tar2ID.charAt(6) + "T" + tar2ID.charAt(11), true);
  	updateSupply();
  	removeBorders();
  	updateScore();
    updateGI();


  }
  else{
    //console.log("CURR" + current.name);
    current.playActionCard(getCardFromID("player2Tile2", godDeck), godDeck);
    //console.log("CALLING REVERSE");
    document.getElementById(ActionDeck.InPlay).onmouseover = showDescription("");

    reverseCard(ActionDeck.InPlay);
    ActionDeck.resetInPlay();
    setElementIsVisible("infamyP2T2", true);
    setElementIsVisible("gloryP2T2", true);
    updateSupply();
    removeBorders();
    updateScore();
  }

}

function targetT2(){
	var current = getCardFromID(ActionDeck.InPlay, ActionDeck);
	//console.log("CURR" + current.name);
	current.playActionCard(getCardFromID("player1Tile1", godDeck), godDeck);
	//console.log("CALLING REVERSE");

	reverseCard(ActionDeck.InPlay);
	document.getElementById(ActionDeck.InPlay).onmouseover = showDescription("");
	ActionDeck.resetInPlay();
	setElementIsVisible("infamyP1T1", true);
	setElementIsVisible("gloryP1T1", true);
	updateSupply();
	removeBorders();
	updateScore();

}
function targetT3(){
	var current = getCardFromID(ActionDeck.InPlay, ActionDeck);
	//console.log("CURR" + current.name);
	current.playActionCard(getCardFromID("player1Tile2", godDeck), godDeck);
	reverseCard(ActionDeck.InPlay);
	document.getElementById(ActionDeck.InPlay).onmouseover = showDescription("");
	ActionDeck.resetInPlay();
	setElementIsVisible("infamyP1T2", true);
	setElementIsVisible("gloryP1T2", true);
	updateSupply();
	removeBorders();
	updateScore();

}

function targetT4(){
	var current = getCardFromID(ActionDeck.InPlay, ActionDeck);
	//console.log("CURR" + current.name);
	current.playActionCard(getCardFromID("player3Tile1", godDeck), godDeck);
	//console.log("CALLING REVERSE");

	reverseCard(ActionDeck.InPlay);
	document.getElementById(ActionDeck.InPlay).onmouseover = showDescription("");
	ActionDeck.resetInPlay();
	setElementIsVisible("infamyP3T1", true);
	setElementIsVisible("gloryP3T1", true);
	updateSupply();
	removeBorders();
	updateScore();
}
function targetT5(){
	var current = getCardFromID(ActionDeck.InPlay, ActionDeck);
	//console.log("CURR" + current.name);
	current.playActionCard(getCardFromID("player2Tile1", godDeck), godDeck);
	//console.log("CALLING REVERSE");

	reverseCard(ActionDeck.InPlay);
	document.getElementById(ActionDeck.InPlay).onmouseover = showDescription("");
	ActionDeck.resetInPlay();
	setElementIsVisible("infamyP2T1", true);
	setElementIsVisible("gloryP2T1", true);
	updateSupply();
	removeBorders();
	updateScore();
}

function targetT6(){
	var current = getCardFromID(ActionDeck.InPlay, ActionDeck);
	//console.log("CURR" + current.name);
	current.playActionCard(getCardFromID("player3Tile2", godDeck), godDeck);
	//console.log("CALLING REVERSE");

	reverseCard(ActionDeck.InPlay);
	document.getElementById(ActionDeck.InPlay).onmouseover = showDescription("");
	ActionDeck.resetInPlay();
	setElementIsVisible("infamyP3T2", true);
	setElementIsVisible("gloryP3T2", true);
	updateSupply();
	removeBorders();
	updateScore();
}
