
//sets name of users

const ELEMENTS_TO_HIDE_ON_LOAD = [
  'swordIcon',
  'selectedCard',
  'descriptionBox',
  'actionButton1',
  'actionButton2',
  'actionButton3',
  'playButton1',
  'playButton2',
  'startIconPlayerLeft',
  'startIconPlayerRight',
  'startIconPlayerBottom',
  'infamyP1T1', 'gloryP1T1',
  'infamyP1T2', 'gloryP1T2',
  'infamyP2T1', 'gloryP2T1',
  'infamyP2T2', 'gloryP2T2',
  'infamyP3T1', 'gloryP3T1',
  'infamyP3T2', 'gloryP3T2',
  'usedP1T1', 'usedP1T2',
  'poetryBar', 'poetry',
  'passButton1', 'passButton2', 'passButton3',
];


//start player logic

var startArr=[
	'startIconPlayerLeft',
	'startIconPlayerRight',
	'startIconPlayerBottom'
];


const ELEMENTS_TO_CHANGE_FOR_SHOWSCORES = [
	'scoreBoxPairT',
	'scoreBoxPairL',
	'scoreBoxPairR',
	'scorePairT',
	'scorePairL',
	'scorePairR',
	'smallScorePairTL',
	'smallScorePairTR',
	'smallScorePairLL',
	'smallScorePairLR',
	'smallScorePairRL',
	'smallScorePairRR',
];


const ELEMENTS_TO_CHANGE_ON_TARGET_1 = [
  'targetButton1'
];

const ELEMENTS_TO_CHANGE_ON_TARGET_2 = [
  'targetButton2'
];

const ELEMENTS_TO_CHANGE_ON_TARGET_3 = [
  'targetButton3'
];
const ELEMENTS_TO_CHANGE_ON_TARGET_4 = [
  'targetButton4'
];

const ELEMENTS_TO_CHANGE_ON_TARGET_5 = [
  'targetButton5'
];

const ELEMENTS_TO_CHANGE_ON_TARGET_6 = [
  'targetButton6'
];

const ELEMENTS_TO_CHANGE_ON_TARGET2_1 = [
  'target2Button1'
];

const ELEMENTS_TO_CHANGE_ON_TARGET2_2 = [
  'target2Button2'
];

const ELEMENTS_TO_CHANGE_ON_TARGET2_3 = [
  'target2Button3'
];
const ELEMENTS_TO_CHANGE_ON_TARGET2_4 = [
  'target2Button4'
];

const ELEMENTS_TO_CHANGE_ON_TARGET2_5 = [
  'target2Button5'
];

const ELEMENTS_TO_CHANGE_ON_TARGET2_6 = [
  'target2Button6'
];

var GAME_STAGE = "";
var PLAYED_CARD_ID = "";
var TILE_AFFECTED_ID = "";
const VISIBLE_OPACITY = '0.3';
var TURN_TIMER = 60;
var CURRENT_TIMER = 5;
const green = "#228833";
const red = "#cc3311";
const blue = "#33bbee";
const purple = "#723e73";
var showingDescPlayedCard = false;


const setElementIsVisible = (elementId, isVisible) => document.getElementById(elementId).style.visibility = isVisible ? "visible" : "hidden";
const setElementHtml = (elementId, html) => document.getElementById(elementId).innerHTML = html;

const loadPage = () => {
	ELEMENTS_TO_HIDE_ON_LOAD.forEach((elementId) => setElementIsVisible(elementId, false));
  document.getElementById(startArr[getRandomInt(3)]).style.visibility="visible";
  //start player show
};

const setGameStage = (stage) => {
	GAME_STAGE = stage;
	console.log(GAME_STAGE);
}

const setPlayerColors = (c) => {
	if(c == red)
	{
		document.getElementById("player3Tile1").style.borderColor = green;
		document.getElementById("player3Tile2").style.borderColor = green;
		document.getElementById("player3Name").style.color = green;
	}
	else if(c == blue)
	{
		document.getElementById("player2Tile1").style.borderColor = green;
		document.getElementById("player2Tile2").style.borderColor = green;
		document.getElementById("player2Name").style.color = green;
	}
}

const setTurnTime = (t) =>{
  	TURN_TIMER = t;
}

const setTurnTimer = (t) => {
  CURRENT_TIMER = t;
  console.log("TURN TIMER " + CURRENT_TIMER);
}

var updateTimer = setInterval(function(){
	let timer = document.getElementById("timer");
	let sword = document.getElementById("swordIcon");
	if(timer.innerHTML == 0 || timer.innerHTML == "")
	{
		timer.innerHTML = CURRENT_TIMER;
		timer.style.visibility = "visible";
		sword.style.visibility = "hidden";
	}
	else
	{
		if(timer.innerHTML == 1)
		{
			timer.style.visibility = "hidden";
			sword.style.visibility = "visible";
		}
		timer.innerHTML = timer.innerHTML - 1;
	}
	if(timer.innerHTML <= 10)
	{
		timer.style.color = "red";
	}
	else
	{
		timer.style.color = "black";
	}
}, 1000);


const updatePlayedCard = (sourceId) =>
{
	if(sourceId == "actionButton1")
	{
		PLAYED_CARD_ID = "player1Card1";
	}
	else if(sourceId == "actionButton2")
	{
		PLAYED_CARD_ID = "player1Card2";
	}
	else if(sourceId == "actionButton3")
	{
		PLAYED_CARD_ID = "player1Card3";
	}
	showDescription(getCardFromID(PLAYED_CARD_ID, ActionDeck).acttext);
	showName(getCardFromID(PLAYED_CARD_ID, ActionDeck).name);
	changeShowDescPlayedCard();
};

const updateTileAffected = (id) =>
{
	if(id == "targetButton1" || id == "player2Tile2")
	{
		TILE_AFFECTED_ID = "player2Tile2";
	}
	else if(id == "targetButton2" || id == "player1Tile1")
	{
		TILE_AFFECTED_ID = "player1Tile1";
	}
	else if(id == "targetButton3" || id == "player1Tile2")
	{
		TILE_AFFECTED_ID = "player1Tile2";
	}
	else if(id == "targetButton4" || id == "player3Tile1")
	{
		TILE_AFFECTED_ID = "player3Tile1";
	}
	else if(id == "targetButton5" || id == "player2Tile1")
	{
		TILE_AFFECTED_ID = "player2Tile1";
	}
	else if(id == "targetButton6" || id == "player3Tile2")
	{
		TILE_AFFECTED_ID = "player3Tile2";
	}
};

const changeShowDescPlayedCard = () => showingDescPlayedCard = !showingDescPlayedCard;
const showSliderValue = (value) => setElementHtml('sliderValue', value);


const showName = (name = 'NAME') => {
	if(showingDescPlayedCard)
		return;
	if(document.getElementById("selectedCard").style.visibility != "visible")
	{
		setElementHtml('actionCardName', name);
	}
};

const hideName = () => {
	if(showingDescPlayedCard)
		return;
	setElementHtml('actionCardName', '');
}
const showDescription = (description = 'DESCRIPTION') =>
{
	if(showingDescPlayedCard)
		return;
	if(document.getElementById("selectedCard").style.visibility != "visible")
	{
		setElementIsVisible("descriptionBox", true);
		setElementHtml('actionCardDescription', description);
	}
};

const hideDescription = () =>
{
	if(showingDescPlayedCard)
		return;
	setElementIsVisible("descriptionBox", false);
	setElementHtml('actionCardDescription', '');
	setElementHtml('actionCardName', '');
};


const showActionButtons = (id) => {
	if(showingDescPlayedCard)
	{
		return;
	}
	let card = document.getElementById(id);
	if(card.style.visibility == "hidden" || card.style.opacity == VISIBLE_OPACITY)
		return;
	if(id == "player1Card1")
	{
		setElementIsVisible("actionButton1", true);
	}
	else if(id == "player1Card2")
	{
		setElementIsVisible("actionButton2", true);
	}
	else if(id == "player1Card3")
	{
		setElementIsVisible("actionButton3", true);
	}
};

const showTargetButtons = (id) => {
	if(id == "player2Tile2")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET_1.forEach((elementId) => setElementIsVisible(elementId, true));
	}
	else if(id == "player1Tile1")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET_2.forEach((elementId) => setElementIsVisible(elementId, true));
	}
	else if(id == "player1Tile2")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET_3.forEach((elementId) => setElementIsVisible(elementId, true));
	}
  if(id == "player3Tile1")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET_4.forEach((elementId) => setElementIsVisible(elementId, true));
	}
	else if(id == "player2Tile1")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET_5.forEach((elementId) => setElementIsVisible(elementId, true));
	}
	else if(id == "player3Tile2")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET_6.forEach((elementId) => setElementIsVisible(elementId, true));
	}
};

const showSecondTargetButtons = (id) => {
	if(id == "player2Tile2")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET2_1.forEach((elementId) => setElementIsVisible(elementId, true));
	}
	else if(id == "player1Tile1")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET2_2.forEach((elementId) => setElementIsVisible(elementId, true));
	}
	else if(id == "player1Tile2")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET2_3.forEach((elementId) => setElementIsVisible(elementId, true));
	}
  if(id == "player3Tile1")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET2_4.forEach((elementId) => setElementIsVisible(elementId, true));
	}
	else if(id == "player2Tile1")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET2_5.forEach((elementId) => setElementIsVisible(elementId, true));
	}
	else if(id == "player3Tile2")
	{
		ELEMENTS_TO_CHANGE_ON_TARGET2_6.forEach((elementId) => setElementIsVisible(elementId, true));
	}
};

const passCard = (cardId) => {
	//let cardId = "";
	if(cardId == "passButton1")
	{
		cardId = "player1Card1";
    renewalPassCard(cardId, getCardFromID(cardId, ActionDeck));
	}
	else if(cardId == "passButton2")
	{
		cardId = "player1Card2";
    renewalPassCard(cardId, getCardFromID(cardId, ActionDeck));

	}
	else if(cardId == "passButton3")
	{
		cardId = "player1Card3";
    renewalPassCard(cardId, getCardFromID(cardId, ActionDeck));

	}
	let cardToPass = document.getElementById(cardId);
	cardToPass.style.visibility = "hidden";
	let selectedCard = document.getElementById("selectedCard");
	selectedCard.src = cardToPass.src;
	selectedCard.style.visibility = "visible";
	setElementIsVisible("passButton1", false);
	setElementIsVisible("passButton2", false);
	setElementIsVisible("passButton3", false);


	let god1 = getCardFromID("player2Tile1", godDeck);
	let god2 = getCardFromID("player2Tile2", godDeck);
	if(god1.getID() == 6 && god1.getIsUsed())
	{
		setTimeout(animatePassCardRight, 1000);
	}
	else if(god2.getID() == 6 && god2.getIsUsed())
	{
		setTimeout(animatePassCardRight, 1000);
	}
	else
	{
		setTimeout(animatePassCardLeft, 1000);
	}

}

const animatePassCardLeft = () => {
	var elem = document.getElementById("selectedCard");
	elem.style.opacity = 1.0;
	var topPos = 290;
	var leftPos = 590;
	var id = setInterval(frame, 10);
	function frame() {
		if (leftPos <= 50) {
			clearInterval(id);
			setElementIsVisible("selectedCard", false);
			elem.style.left = '590px';
			elem.style.top = '290px';
			elem.style.opacity = 1;
		} else {
			leftPos -= 10;
			topPos -= 4;
			elem.style.left = leftPos + 'px';
			elem.style.top = topPos + 'px';
			elem.style.opacity *= 0.97;
		}
	}
}

const animatePassCardRight = () => {
	var elem = document.getElementById("selectedCard");
	elem.style.opacity = 1.0;
	var topPos = 290;
	var leftPos = 590;
	var id = setInterval(frame, 10);
	function frame() {
		if (leftPos >= 1150) {
			clearInterval(id);
			setElementIsVisible("selectedCard", false);
			elem.style.left = '590px';
			elem.style.top = '290px';
			elem.style.opacity = 1;
		} else {
			leftPos += 10;
			topPos -= 4;
			elem.style.left = leftPos + 'px';
			elem.style.top = topPos + 'px';
			elem.style.opacity *= 0.97;
		}
	}
}

const showScores = () => {
	let checkBox = document.getElementById("showScores");
	if(checkBox.checked)
	{
		ELEMENTS_TO_CHANGE_FOR_SHOWSCORES.forEach((elementId) => setElementIsVisible(elementId, true));
	}
	else {
		ELEMENTS_TO_CHANGE_FOR_SHOWSCORES.forEach((elementId) => setElementIsVisible(elementId, false));
	}
	
}

const showPoetry = () => {
	poetry = document.getElementById("poetry");
	playedCard = document.getElementById(PLAYED_CARD_ID);
	tileAffected = document.getElementById(TILE_AFFECTED_ID);
	poetry.innerHTML = getCardFromImg(playedCard.src, ActionDeck).desc + "\xa0";
	poetry.innerHTML += getCardFromImg(playedCard.src, ActionDeck).name + " ";
	poetry.innerHTML += getCardFromImg(tileAffected.src, godDeck).name + ". ";
	
	var elem = document.getElementById("poetry");
	//elem.style.bottom = '120px';
	setElementIsVisible("poetryBar", true);
	setElementIsVisible("poetry", true);
	var pos = 500;
	var id = setInterval(frame, 8);
	function frame() {
		if (pos == -100) {
			clearInterval(id);
			setElementIsVisible("poetryBar", false);
			setElementIsVisible("poetry", false);
		} else {
			pos -= 1;
			elem.style.left = pos + 'px';
		}
	}
};

const enlargeCard = () => {
	let selectedCard = document.getElementById("selectedCard");
	selectedCard.src = document.getElementById(PLAYED_CARD_ID).src;
	selectedCard.style.visibility = "visible";

    setElementIsVisible("actionButton1", false);
	setElementIsVisible("actionButton2", false);
	setElementIsVisible("actionButton3", false);

	checkBox = document.getElementById("showPoetry");
	if(checkBox.checked == true)
	{
		showPoetry();
		setTimeout(animateDiscard, 4800);
	}
	else
	{
		setTimeout(animateDiscard, 1000);
	}
};

const animateDiscard = () => {
	var elem = document.getElementById("selectedCard");
	elem.style.opacity = 1.0;
	var topPos = 290;
	var leftPos = 590;
	var id = setInterval(frame, 10);
	function frame() {
		if (leftPos >= 1150) {
			clearInterval(id);
			setElementIsVisible("selectedCard", false);
			elem.style.left = '590px';
			elem.style.top = '290px';
			elem.style.opacity = 1;
		} else {
			leftPos += 10;
			elem.style.left = leftPos + 'px';
			elem.style.top = topPos + 'px';
			elem.style.opacity *= 0.97;
		}
	}
};


// Hides the enlarged card and puts card in discard pile when card is played

// The player cancels the selected action card

// This function will show the "play tile?" play button for playing
// a God tile. It is not played immediatly bc it can only be played once.

const showTileButton = (isTile1) => {
  const tile = document.getElementById(isTile1 ? 'player1Tile1' : 'player1Tile2');

  if (tile.style.opacity === VISIBLE_OPACITY || showingDescPlayedCard) {
    return;
  }

  setElementIsVisible(isTile1 ? 'playButton1' : 'playButton2', true);
};

// Plays the tile, making it slightly see-through indicating it has been used

const playTile = (isTile1) => {
  const tile = document.getElementById(isTile1 ? 'player1Tile1' : 'player1Tile2');

  tile.style.opacity = VISIBLE_OPACITY;

  setElementIsVisible(isTile1 ? 'playButton1' : 'playButton2', false);
  setElementIsVisible(isTile1 ? 'usedP1T1' : 'usedP1T2', true);

	var god = getCardFromImg(document.getElementById(isTile1 ? 'player1Tile1' : 'player1Tile2').src, godDeck);
	god.setIsUsed();
	updateScore();
};

// The player cancels their choice to play the God tile

const cancelTile = (isTile1) => {
  // TODO: Do we need to set the tile's opacity back to !VISIBLE_OPACITY?

  setElementIsVisible(isTile1 ? 'playButton1' : 'playButton2', false);
};


document.addEventListener("click", (evt) => {
    const card1 = document.getElementById("player1Card1");
	const card2 = document.getElementById("player1Card2");
	const card3 = document.getElementById("player1Card3");
	const tile1 = document.getElementById("player1Tile1");
	const tile2 = document.getElementById("player1Tile2");
    let c = evt.target; // clicked element
	console.log(card1.style.opacity);
	console.log(card2.style.opacity);
	console.log(card3.style.opacity);
	console.log(GAME_STAGE);
	if(GAME_STAGE == "ren")
	{
		ActionDeck.setCardPlay("card");
		console.log("here");
		return;
	}
    do {
        if (c == card1) {
			hidePlayButtons();
			if(card1.style.opacity != VISIBLE_OPACITY)
			{
				setElementIsVisible("actionButton1", true);
				console.log(GAME_STAGE);
			}
            return;
        }
		else if(c == card2)
		{
			hidePlayButtons();
			if(card2.style.opacity != VISIBLE_OPACITY)
			{
				setElementIsVisible("actionButton2", true);
				console.log(GAME_STAGE);
			}
			return;
		}
		else if(c == card3)
		{
			hidePlayButtons();
			if(card3.style.opacity != VISIBLE_OPACITY)
			{
				setElementIsVisible("actionButton3", true);
				console.log(GAME_STAGE);
			}
			return;
		}
		else if(c == tile1)
		{
			hidePlayButtons();
			if(tile1.style.opacity != VISIBLE_OPACITY)
				setElementIsVisible("playButton1", true);
			return;
		}
		else if(c == tile2)
		{
			hidePlayButtons();
			if(tile2.style.opacity != VISIBLE_OPACITY)
				setElementIsVisible("playButton2", true);
			return;
		}
        // Go up the DOM
        c = c.parentNode;
    } while (c);

    // This is a click outside.
	hidePlayButtons();
	return;
});

const hidePlayButtons = () => {
	setElementIsVisible("actionButton1", false);
	setElementIsVisible("actionButton2", false);
	setElementIsVisible("actionButton3", false);
	setElementIsVisible("playButton1", false);
	setElementIsVisible("playButton2", false);
}

const showGameWinner = (tie, winner, winner2, score, name) => {
	poetry = document.getElementById("poetry");
	if(tie)
	{
		poetry.innerHTML = "Tie game between " + winner + " " + winner2;
		poetry.innerhHTML += " with a score of " + score + "!";
	}
	else
	{
		poetry.innerHTML = "Winner is " + winner + " with " + score;
		poetry.innerHTML += " points on tile " + name + "!";
	}
	if(winner == document.getElementById("player1Name").innerHTML && !tie)
	{
		poetry.style.color = "#FFC107";
	}
	else
	{
		poetry.style.color = "#cc3311";
	}
	setElementIsVisible("poetryBar", true);
	setElementIsVisible("poetry", true);
}

//nav bar settings modalbutton

var gear=document.querySelector('.settings');
var modelbg1=document.querySelector('.settingsmodal');

gear.addEventListener('click',function(){
  modelbg1.style.display="flex";
})

document.querySelector('.closeSettings').addEventListener('click',function(){
  modelbg1.style.display="none";
})

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


//document.getElementById(startArr[1]).style.visibility="hidden";

document.getElementById(startArr[getRandomInt(3)]).style.visibility="visible";
console.log(startArr[getRandomInt(3)]);

////const setElementIsVisible = (elementId, isVisible) => document.getElementById(elementId).style.visibility = isVisible ? "visible" : "hidden";
//click for rulesImg

var rules=document.querySelector('.rules');
var rulesClose=document.querySelector('.closeRules');
var rulesImg=document.querySelector('.rulesImg');
var rulesNext=document.querySelector('.nextRules');
var rulesPrev=document.querySelector('.prevRules');
rules.addEventListener('click',function(){
  rulesImg.style.display="flex";
  rulesClose.style.display="flex";
  rulesNext.style.display="flex";


})

rulesClose.addEventListener('click',function(){
  rulesImg.style.display="none";
  rulesClose.style.display="none";
  rulesNext.style.display="none";
  rulesPrev.style.display="none";
})

rulesNext.addEventListener('click',function(){
  rulesImg.src="images/rules_2.JPG";
  rulesNext.style.display="none";
  rulesPrev.style.display="flex";
})

rulesPrev.addEventListener('click',function(){
  rulesImg.src="images/rules_1.JPG";
  rulesPrev.style.display="none";
  rulesNext.style.display="flex";
})

//nav bar home modalbutton

var home=document.querySelector('.quit');
modelbg=document.querySelector('.homemodal');

home.addEventListener('click',function(){
  modelbg.style.display="flex";
  modelbg1.style.display="none";
})

document.querySelector('.no').addEventListener('click',function(){
  modelbg.style.display="none";
})
