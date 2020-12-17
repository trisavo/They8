
var ActionDeck;
var Players = [];
var GodDeck;

function createDeck(){
  console.log("CREATING DECK OF ACTION CARDS");
  ActionDeck = new Deck("ActionCards");
  console.log("DISPLAYING CARDS IN ACTION DECK");
  for(var i = 0; i < ActionDeck.deck.length; i++)
    console.log(i+1+".", ActionDeck.deck[i].getName());

}

function shuffleDeck(){
  console.log("SHUFFLING DECK");
  ActionDeck.shuffle();
  console.log("DISPLAYING SHUFFLED DECK")
  for(var i = 0; i < ActionDeck.deck.length; i++)
    console.log(i+1+".", ActionDeck.deck[i].getName());

}

function createTiles(){
  console.log("CREATING GOD TILES")
  GodDeck = new Deck("godTile");
  console.log("SHUFFLING TILES");
  GodDeck.shuffle();
  console.log("DISPLAYING SHUFFLED TILES")
  for(var i = 0; i < GodDeck.deck.length; i++)
    console.log(i+1+".", GodDeck.deck[i].getName());
}

function addPlayer(){
  if(Players.length === 4)
    console.log("Maximum number of Players already reached");
//if theres no players, default is 2
  else if(Players.length === 0){
    for(var i = 0; i < 2; i++){
      console.log("Adding Player...")
      Players.push(new Player("Player" + (Players.length+1).toString()));
    }
  }

  else {
    console.log("Adding Player...");
    Players.push(new Player("Player" + (Players.length+1).toString()));
  }

  console.log("Current Players:");
  for(var i = 0; i < Players.length; i++)
    console.log(Players[i].getUsername());
}

function distributeTiles(){
  if(Players.length === 0){
    console.log("No Players are in the game!")
    return;
  }
  console.log("ADDING 2 GOD TILES TO ALL PLAYERS");
  GodDeck.deal(2,Players,"GodTiles");
  console.log("Deleting unused God Tiles from Game...")
  delete GodDeck;
  GodDeck = new Deck();
  for(var i = 0; i < Players.length; i++){
    console.log(Players[i].getUsername()+"\'s God Tiles:");
    console.log(" Left God Tile:",Players[i].getLeftGodTile());
    Players[i].getLeftGodTile().setInfamy(0);
    Players[i].getLeftGodTile().setGlory(0);
    console.log(" Right God Tile:",Players[i].getRightGodTile());
    Players[i].getRightGodTile().setInfamy(0);
    Players[i].getRightGodTile().setGlory(0);
    GodDeck.deck.push(Players[i].getLeftGodTile());
    GodDeck.deck.push(Players[i].getRightGodTile());
  }
}

function dealHand(){
  if(Players.length === 0){
    console.log("No Players are in the game!")
    return;
  }
  console.log("ADDING 3 ACTION CARDS TO EACH PLAYER'S HAND");
  ActionDeck.deal(3,Players,"ActionCards");
  for(var i = 0; i < Players.length; i++){
      console.log(Players[i].getUsername()+"\'s hand:")
      var currHand =  Players[i].getHand();
      for(var j = 0; j < currHand.length; j++)
        console.log(currHand[j]);
  }
  console.log("Checking that drawn cards are removed from deck");
  for(var i = 0; i < ActionDeck.deck.length; i++)
    console.log(ActionDeck.deck[i]);
}

function removeAllHands(){
  console.log("REMOVING ALL CARDS FROM ALL PLAYERS HANDS AND PUSHING THEM BACK ONTO DECK")
  if(Players.length === 0){
    console.log("There are no players in the game!");
    return;
  }
  for(var i = 0; i < Players.length; i++){
    console.log(Players[i].getUsername()+"\'s hand:")
    if(Players[i].getHand().length === 0){
      console.log("No cards in hand to Remove!")
      return;
    }
    var removed = Players[i].removeHand();
    for(var j = 0; j < removed.length; j++)
      ActionDeck.deck.push(removed[j]);
    console.log(Players[i].getHand());
  }
  console.log("SHUFFLING DECK OF ACTION CARDS");
  ActionDeck.shuffle();
  console.log("CHECKING THAT ACTION CARDS PLACED BACK INTO ACTION DECK AFTER REMOVAL")
  for(var i = 0; i < ActionDeck.deck.length; i++){
    ActionDeck.deck[i].setLoc("Deck");
    console.log(i+1+".",ActionDeck.deck[i])
  }
}

function removeSingleCard(){
  console.log("TESTING TO REMOVE ONE CARD IN HAND")
  if(Players.length === 0){
    console.log("There are no players in the game!");
    return;
  }
  for(var i = 0; i < Players.length; i++){
    if(Players[i].getHand().length === 0){
      console.log("No cards in hand to Remove!")
      return;
    }
    var removedCard = Players[i].removeActionCard(Players[i].getHand()[0].getID());
    console.log(Players[i].getUsername() + "\'s hand after card removal");
    console.log(Players[i].getHand());
    console.log("removed card",removedCard,"from", Players[i].getUsername());
    console.log("adding card back to Action Deck");
    removedCard.setLoc("Deck");
    ActionDeck.deck.push(removedCard);
    // Removes an element from the document


  }
  ActionDeck.shuffle();
  console.log("DISPLAYING DECK TO CHECK REMOVED CARDS PLACED CORRECTLY");
  console.log(ActionDeck.deck);
}

function checkPlayableActions(){
  if(Players.length === 0){
    console.log("No Players are in the game!")
    return;
  }
  for(var i = 0; i < Players.length; i++){
    console.log(Players[i].getUsername()+"\'s hand:")
    if(Players[i].getHand().length === 0){
      console.log("No cards in hand to check!")
      return;
    }
  }
  console.log("Creating list of all God Tiles in use...")
  var tilesInUse = [];
  for(var i = 0; i < Players.length; i++){
    tilesInUse.push(Players[i].getLeftGodTile());
    tilesInUse.push(Players[i].getRightGodTile());
  }
  console.log(tilesInUse);
  console.log("Checking playable cards in all player hands...")
  for(var i = 0; i < Players.length; i++){
    console.log(Players[i].getUsername() + "\'s playable Action Cards:");
    var playableCards = Players[i].getPlayableCards(tilesInUse);
    for(var j = 0; j < playableCards.length; j++)
      console.log(playableCards[j]);
  }

}

function playerAction(){
  if(Players.length === 0){
    console.log("No Players are in the game!")
    return;
  }
  console.log("Playing a card from each player's hand...");
  var discard = [];
  for(var i = 0; i < Players.length; i++){
      console.log(Players[i].getUsername()+"\'s turn");
      if(!Players[i].gamePlay(GodDeck.deck,ActionDeck)){
          console.log("No cards Playable, discarding and drawing new hand...");
          var toDiscard = Players[i].removeHand();
          for(var j = 0; j < toDiscard.length; j++)
            ActionDeck.discard.push(toDiscard[j]);
          var tempList = [];
          tempList.push(Players[i]);
          ActionDeck.deal(3,tempList,"ActionCards");
          console.log("current player's new hand:")
          console.log(Players[i].getHand());
          console.log("checking that drawn cards removed from deck...");
          console.log(ActionDeck.displayCurrentDeck());
          Players[i].gamePlay(GodDeck.deck,ActionDeck);
      }
      console.log("End of",Players[i].getUsername()+"\'s turn")
      console.log("New supply is:")
      console.log("Glory:", ActionDeck.glory);
      console.log("Infamy:", ActionDeck.infamy);
  }
  console.log("Final Glory:", ActionDeck.glory);
  console.log("Final Infamy:", ActionDeck.infamy);
  console.log("Displaying GodTiles to check all Scores...")
  console.log(GodDeck.deck);
  renewal();
}

function renewal(){
  console.log("Beginning Renewal Phase...");
  var cardsToPass = [];
  for(var i = 0; i < Players.length; i++){
    console.log(Players[i].getUsername()+"\'s turn to choose card to pass...")
    cardsToPass.push(Players[i].renew());
  }

  for(var i = 0; i < Players.length; i++){
    console.log("Pushing onto",Players[i].getUsername()+"\'s hand...")
    if(i + 1 === Players.length)
      Players[0].addActionCard(cardsToPass[0]);
    else
      Players[i+1].addActionCard(cardsToPass[0]);
    console.log("added",cardsToPass[0].getName(),"to",Players[i].getUsername()+"\'s hand")
    cardsToPass.shift();
  }

  console.log("Setting new player order...")
  var prevStartPlayer = Players[0];
  Players.shift();
  Players.push(prevStartPlayer);

  console.log("moving discard pile to Deck and shuffling...");
  ActionDeck.reuse();
  console.log("Dealing one card from deck to all players...")
  ActionDeck.deal(1,Players,"ActionCards");
  console.log("Displaying new player hands");
  for(var i = 0; i < Players.length; i++)
    console.log(Players[i].getUsername(),":",Players[i].getHand());
  console.log("Showing new deck...")
  ActionDeck.displayCurrentDeck();
}

function simulateGame(){
  if(Players.length === 0){
    console.log("No Players are in the game!")
    return;
  }
  var game = new Game(Players);
  delete game;
}

function runMultipleSimulations(){
  for(var i = 0 ; i < 10; i++)
    simulateGame();
}

function reset(){
  delete ActionDeck;
  Players = [];
  delete GodDeck;
  console.clear();

}


// idea: create a container of the position of the 3 possible positions, if playerid=1, then order is 1,2,3 if =2, then 2,3,1 and if=3, 3,1,2
//algorithm: istarting position and iterate through the end, and begin again at the start until the index is numPlayers | _ |


//adds all action cards dynammically and inserts divs

function addDivCard(playerNum,cardNum,location){

  for (var k=0;k<cardNum;k++){
    card=document.createElement('div');
    card.innerHTML= JSON.stringify(Players[playerNum].getHand()[k].name);
    document.getElementById('wrapper'+playerNum).appendChild(card);
    card.id=location+k;
    card.classList.add("flex");
    //document.getElementById(card.id).onclick = function() {myFunction(playerNum,k)};

}

  addClick(playerNum,cardNum,location);

}
function addClick(playerNum,cardNum,location){
  for (var n=0;n<playerNum;n++){
    for (var m=0;m<cardNum;m++){
      cardID=""+n+m;
      console.log(cardID);
      //document.getElementById(cardID).onclick=Players[playerNum].getHand()[cardNum].name;

    }
  }
}

//solution : go through each card and assign an onclick function

function myFunction(playerNum,num){
  console.log(Players[playerNum].getHand()[2].name);
  console.log(num);
}

//problem: i cannot change k to be dynamic and allocate it to each card. i can access each card on clicking
//but it won't reference the for loop gethand[k]
//i want to assign an onclick to each document that is the same as the name that the for loop is on



function player1(location){
  //dynamically adds divs to html

  document.getElementById('G1'+location).innerHTML=JSON.stringify(Players[0].getLeftGodTile().name)
  document.getElementById('G2'+location).innerHTML=JSON.stringify(Players[0].getRightGodTile().name)
  addDivCard(0,3,location);

}

function player2(location){
  document.getElementById('G1'+location).innerHTML=JSON.stringify(Players[1].getLeftGodTile().name)
  document.getElementById('G2'+location).innerHTML=JSON.stringify(Players[1].getRightGodTile().name)
  addDivCard(1,3,location);

}

function player3(location){
  document.getElementById('G1'+location).innerHTML=JSON.stringify(Players[2].getLeftGodTile().name)
  document.getElementById('G2'+location).innerHTML=JSON.stringify(Players[2].getRightGodTile().name)
  addDivCard(2,3,location);
}

function player1POV(){
  player1('1');
  player2('2');
  player3('3');

}

function player2POV(){
  player1('2');
  player2('3');
  player3('1');

}

function player3POV(){
  player1('3');
  player2('1');
  player3('2');

}

function Setup(){
  createDeck();
  shuffleDeck();
  createTiles();
  addPlayer();
  addPlayer();
  distributeTiles();
  dealHand();


}
