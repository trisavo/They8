class GodTile{
  constructor(JSONCard) {
    this.id = JSONCard.id;
    this.name = JSONCard.name;
    this.img = JSONCard.img;
    this.desc = JSONCard.desc;
    this.location = JSONCard.location;
      this.glory = 0;
      this.infamy = 0;
      this.IsUsed = false;
     }

  getName(){
    return this.name;
  }

  getID(){
    return this.id;
  }

  getImg(){
    return this.name;
  }

  getDesc(){
    return this.desc;
  }

  getLoc(){
    return this.location;
  }

  setLoc(loc){
    this.location = loc;
  }

  getGlory(){
    return this.glory;
  }

  setGlory(newGlo){
    if(this.id === 8 && this.getIsUsed()){
      console.log("PRAXIS IS IMMUNE")
      return;
    }
    this.glory = newGlo;

    if(this.glory < 0)
      this.glory = 0;
    else if(this.glory > 15)
      this.glory = 15;
  }

  getScore(){
    return this.glory*2-this.infamy;
  }

  getInfamy(){
    return this.infamy;
  }

  setInfamy(newInf){
    if(this.id === 8 && this.getIsUsed()){
      console.log("PRAXIS IS IMMUNE!")
      return;
    }
    this.infamy = newInf;

    if(this.infamy < 0)
      this.infamy = 0;
    else if(this.infamy > 15)
      this.infamy = 15;
  }

  getIsUsed(){
    return this.IsUsed;
  }

  setIsUsed(){
    if(this.id === 8 && this.getIsUsed()){
      console.log("PRAXIS IS IMMUNE!")
      return;
    }
    else{
      this.IsUsed = !this.IsUsed;
      if(this.IsUsed) //if the God Tile has been used
        this.infamy+=1;
      else //if the God Tile has been set back to False
        this.setInfamy(this.infamy-1);
    }
  }

  getLoc(){
    return this.location;
  }

  pickRandom(range){
    return Math.floor(Math.random()*range);
  }

  checkPlayable(Phase, tilesInUse, status){
    if(this.isUsed)
      return false;
    switch(Phase){
        case "Start":
          if(this.id === 8 || this.id === 2 && !this.getIsUsed())
            return true;

          else if(this.id === 3 && !this.getIsUsed()){
            var targets = [];
            for(var i = 0; i < tilesInUse.length; i++){
              if(tilesInUse[i].getGlory() > 4)
                targets.push(tilesInUse[i]);
              }
            //display targets, this block is subject to change
            if(targets.length != 0)
              return true;
            else
              return false;
          }

          else if(this.id === 7 && !this.getIsUsed()){//PITON
            var targets = [];
            for(var i = 0; i < tilesInUse.length; i++){
              if(!tilesInUse[i].getIsUsed() && tilesInUse[i].getID() != this.id)
                if(tilesInUse[i].checkPlayable(Phase, tilesInUse, status))
                  targets.push(tilesInUse[i]);
              }
          if(targets.length > 0)
            return true;
          else
            return false;
          }
          break;
        case "Before Player Action":
          if(this.id === 1 || this.id === 2 && !this.getIsUsed()){
            return true;
          }
          else if(this.id === 5 && !this.getIsUsed()){
            if(status) //if the player has already gone
              return false;
            else //if it is before the current player's turn
              return true;
          }

          else if(this.id === 3 && !this.getIsUsed()){
            var targets = [];
            for(var i = 0; i < tilesInUse.length; i++){
              if(tilesInUse[i].getGlory() > 4)
                targets.push(tilesInUse[i]);
              }
            //display targets, this block is subject to change
            if(targets.length != 0)
              return true;
            else
            return false;
          }
          else if(this.id === 7 && !this.getIsUsed()){//PITON
            var targets = [];
            for(var i = 0; i < tilesInUse.length; i++){
              if(tilesInUse[i].getID() != this.id){
                if(tilesInUse[i].checkPlayable(Phase, tilesInUse, status))
                  targets.push(tilesInUse[i]);
                }
              }
          if(targets.length > 0)
            return true;
          else
            return false;
          }
          else {
            return false;
          }
          break;
        case "During Action":
          if(this.id === 9)
            return true;

          else if(this.id === 7 && !this.getIsUsed()){//PITON
            var targets = [];
            for(var i = 0; i < tilesInUse.length; i++){
              if(!tilesInUse[i].getIsUsed() && tilesInUse[i].getID() != this.id)
                if(tilesInUse[i].checkPlayable(Phase, tilesInUse, status))
                  targets.push(tilesInUse[i]);
              }
          if(targets.length > 0)
            return true;
          else
            return false;
          }
          break;

        case "Renewal":
          if(this.id === 6 || this.id === 4 || this.id === 2 && !this.getIsUsed())
            return true;

          else if(this.id === 3 && !this.getIsUsed()){
            var targets = [];
            for(var i = 0; i < tilesInUse.length; i++){
              if(tilesInUse[i].getGlory() > 4)
                targets.push(tilesInUse[i]);
              }
            //display targets, this block is subject to change
            if(targets.length != 0)
              return true;
            else
            return false;
          }

          else if(this.id === 7 && !this.getIsUsed()){//PITON
            var targets = [];
            for(var i = 0; i < tilesInUse.length; i++){
              if(!tilesInUse[i].getIsUsed() && tilesInUse[i].getID() != this.id)
                if(tilesInUse[i].checkPlayable(Phase, tilesInUse, status))
                  targets.push(tilesInUse[i]);
              }
          if(targets.length > 0)
            return true;
          else
            return false;
          }
          break;
        default:
          return false;
          break;
  }
  return false;
}

playTile(Phase,inGameTiles,Players,currDeck){
  switch(this.id){
          case 8: //PRAXIS
              this.setIsUsed();
              return;
              break;

          case 9: //RYMON
            this.setIsUsed();
            return;
            break;

          case 1: //ANATOC
              var playerHands = new Deck("none");
              var playerHandLength = [];
              console.log("Player's old Hands are:")

              for(var i = 0; i < Players.length; i++){
                var oldHand = Players[i].getHand();
                console.log(Players[i].getUsername()+"\'s old hand:")
                for(var j = 0; j < oldHand.length; j++)
                  console.log(oldHand[j]);
                playerHandLength.push(oldHand.length);
              }

              for(var i = 0; i < Players.length; i++){ //pushing all cards onto deck
                var removed = Players[i].removeHand();
                for(var j = 0; j < removed.length; j++)
                  playerHands.deck.push(removed[j]);
              }

              playerHands.shuffle(); //shuffling all of their hands
              for(var i = 0 ; i < Players.length; i++){
                for(var j = 0; j < playerHandLength[i]; j++)
                  Players[i].addActionCard(playerHands.getCard(0));
              }
              console.log("Player's new Hands are:")

              for(var i = 0; i < Players.length; i++){
                var newHand = Players[i].getHand();
                console.log(Players[i].getUsername()+"\'s new hand:")
                for(var j = 0; j < newHand.length; j++)
                  console.log(newHand[j]);
              }
              this.setIsUsed();
              return;
              break;

            case 5://ENDYMINA
              for(var i = 0; i < Players.length; i++){
                if(this.getLoc() === Players[i].getUsername() && !Players[i].isTurn()){
                    console.log(Players[i].getUsername()+"\'s previous hand");
                    for(var j = 0; j < Players[i].getHand().length; j++)
                      console.log(Players[i].getHand()[j]);
                    if(currDeck.deck.length < 2)
                      currDeck.reuse();
                    Players[i].addActionCard(currDeck.getCard(0));
                    Players[i].addActionCard(currDeck.getCard(0));
                    console.log(Players[i].getUsername()+"\'s new hand",Players[i].getHand());


                    //to be changed once finalize user choices
                    var chosenCard1 = Players[i].getHand()[this.pickRandom(Players[i].getHand().length)];
                    //rest of code should be good



                    var removedCard = Players[i].removeActionCard(chosenCard1.getID());
                    console.log("Removed Card:", removedCard.getName());
                    currDeck.discard.push(removedCard);

                    //to be changed once finalize user choices
                    var chosenCard2 = Players[i].getHand()[this.pickRandom(Players[i].getHand().length)];
                    //rest of code should be good

                    var removedCard2 = Players[i].removeActionCard(chosenCard2.getID());
                    currDeck.discard.push(removedCard2);
                    console.log("Removed Card:", removedCard2.getName());
                    console.log(Players[i].getUsername()+"\'s new hand");
                    for(var j = 0; j < Players[i].getHand().length; j++)
                      console.log(Players[i].getHand()[j]);
                    this.setIsUsed();
                    return;
                }
              }
                break;

            case 2://ARISTIPHANE
                //have player pick two godTiles from godTiles
                var randomIndex = this.pickRandom(inGameTiles.length)
                var chosenTile = inGameTiles[randomIndex];
                console.log("First tile to swap is", chosenTile.getName());
                var possTiles = inGameTiles.filter(item => item != chosenTile);
                var randomIndex = this.pickRandom(possTiles.length);
                var nextTile = possTiles[randomIndex];
                console.log("Second tile to swap is", nextTile.getName());
                //end of user Selection

                //swapping Glory
                var temp = nextTile.getGlory();
                nextTile.glory = chosenTile.getGlory();
                chosenTile.glory = temp;
                //swapping Infamy
                var temp = nextTile.getInfamy();
                nextTile.infamy = chosenTile.getInfamy();
                chosenTile.infamy = temp;
                console.log(chosenTile.getName(),"infamy and glory are now:")
                console.log("   infamy:",chosenTile.getInfamy());
                console.log("   glory:",chosenTile.getGlory());
                console.log(nextTile.getName(),"infamy and glory are now:")
                console.log("   infamy:",nextTile.getInfamy());
                console.log("   glory:",nextTile.getGlory());
                this.setIsUsed();
                return;
                break;

            case 3://CASSANA
              var targets = [];
              for(var i = 0; i < inGameTiles.length; i++){
                if(inGameTiles[i].getGlory() > 4)
                  targets.push(inGameTiles[i]);
                }
              //display targets, this block is subject to change
              if(targets.length != 0){

                //picking random choice
                var randomTarget = this.pickRandom(targets.length);
                //end of random choice
                console.log("Chosen tile to gain glory is:", targets[randomTarget].getName());
                console.log("   infamy:",targets[randomTarget].getInfamy());
                console.log("   glory:",targets[randomTarget].getGlory());
                targets[randomTarget].glory = targets[randomTarget].getGlory()+1;
                console.log("Chosen tile to gain glory after effect is:", targets[randomTarget].getName());
                console.log("   infamy:",targets[randomTarget].getInfamy());
                console.log("   glory:",targets[randomTarget].getGlory());
                this.setIsUsed();
                currDeck.glory-=1;
                console.log("Current Supply:")
                console.log("   infamy:",currDeck.infamy);
                console.log("   glory:",currDeck.glory);
              }
              return;
              break;

          case 7://PITON
             var targets = [];
             for(var i = 0; i < inGameTiles.length; i++){
               this.id = inGameTiles[i].getID();
               if(this.checkPlayable(Phase,inGameTiles,true))
                 targets.push(inGameTiles[i]);
               }
              targets = targets.filter(item => item != this);
             if(targets.length != 0){

               //picking random choice, this should be the player's choice
                var randomTarget = this.pickRandom(targets.length);
                //end of to be changed code

                console.log(this.getLoc(),"chose to use",targets[randomTarget].getName()+"\'s power");
                this.id = targets[randomTarget].getID();
                this.playTile(Phase,inGameTiles,Players,currDeck) //recursive call with new id to use power of chosen Tile
               }
               return;
                 break;


            case 6://NANOS, IMPLEMENTED IN GAME LOOP
              this.setIsUsed();
              return;
              break;

            case 4://CYMELE
              for(var i = 0; i < Players.length; i++){
                if(this.getLoc() === Players[i].getUsername()){
                  var toDisplay = [];
                  currDeck.reuse();
                  for(var j = 0; j < 4; j++)
                    toDisplay.push(currDeck.getCard(0));
                  console.log("cards to pick from are:");
                  for(var j = 0; j < toDisplay.length; j++)
                    console.log(toDisplay[j]);
                  //display cards somehow, this part will be changed once we figure out how to display and log user choice
                  var chosenCard = toDisplay[this.pickRandom(toDisplay.length)];
                  toDisplay = toDisplay.filter(item => item != chosenCard);
                  console.log(Players[i].getUsername(),"chose to add", chosenCard.getName(),"to their hand");
                  //end of unfinalized code

                  Players[i].addActionCard(chosenCard);
                  console.log("adding cards back to deck...")
                  for(var j = 0; j < toDisplay.length; j++){
                    console.log(toDisplay[j]);
                    var card = toDisplay[j];
                    currDeck.deck.push(card);
                  }
                  currDeck.shuffle();
                  this.setIsUsed();
                  return;
                }
              }
              return;
              break;

          default:
            return;
            break;
          }
        }
    }
