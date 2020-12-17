class Player{

  constructor(Username){
    this.username = Username;
    this.hand = []; //holds the action card in the Players's hand
    this.godTiles = []; //godTiles[0] === left God Tile, godTiles[1] == right God Tile
    this.turn = false;
  }

  buzzer(Phase, tilesInUse, Players,Deck){
    var playableTiles = [];
    for(var i = 0; i < this.godTiles.length; i++){
      var status = this.godTiles[i].checkPlayable(Phase, tilesInUse, this.isTurn());
      if(status){
        if(this.godTiles[i].id === 5 && Deck.deck.length < 4)
          continue;
        else
          playableTiles.push(this.godTiles[i]);
      }
    }

    if(playableTiles.length > 0){
      //random choice, use or not use their godTile
      var choice = this.getRandomIndex(2);
      if(choice === 0){ //bot does not play tile
        return;
      }

      if(choice === 1){ //bot choose a random tile to play
        var randomChoice = this.getRandomIndex(playableTiles.length);
        var chosenTile = playableTiles[randomChoice];
        if(chosenTile.getIsUsed())
          return;
        else{
          console.log(this.getUsername(),"used",chosenTile.getName()+"\'s Power!")
          chosenTile.playTile(Phase, tilesInUse, Players, Deck);
          return;
        }
      }
    }
    else {
      return;
    }

  }

  getUsername(){
      return this.username;
  }

  addGodTile(GodTile){
    this.godTiles.push(GodTile);
    GodTile.setLoc(this.username);
  }

  addActionCard(ActionCard){ //running into conflict where location of actionCard is not being set properly, needs review
    this.hand.push(ActionCard);
    ActionCard.setLoc(this.username);
  }

  getActionCard(id){
    for(var i = 0; i < hand.length; i++){
        if(this.hand[i].getID() === id)
          return this.hand[i];
    }
  }

  getHand(){
    return this.hand;
  }

  getGodTile(side){
      return this.godTiles[side];
  }

  removeActionCard(id){
    var removedCard;
    for(var i = 0; i < this.hand.length; i++){
        if(this.hand[i].getID() === id){
          removedCard = this.hand[i];
          this.hand[i].setLoc("Discard");
          this.hand = this.hand.filter(item => item !== this.hand[i]);
        }
    }
    return removedCard;
  }

  removeHand(){
    var removed = [];
    for(var i = this.hand.length - 1; i > -1; i--){
      removed.push(this.hand[i]);
      this.hand[i].setLoc("Discard");
      this.hand.pop();
    }
    return removed
  }

  getPlayableCards(GodsInGame){
    var playableCards = [];
    var gods = [];
    for(var i = 0; i < GodsInGame.length; i++)
    {
      if(GodsInGame[i].getID() === 8 && GodsInGame[i].getIsUsed())
        continue;
      else
        gods.push(GodsInGame[i]);
    }
    for(var i = 0; i < this.hand.length; i++){
      if(this.hand[i].identifyTargets(gods).length != 0)
        playableCards.push(this.hand[i]);

    }
    return playableCards;
  }

  isTurn(){
    return this.turn;
  }

  setTurn(){
    this.turn != this.turn;
  }

  getLeftGodTile(){
    return this.godTiles[0];
  }

  getRightGodTile(){
    return this.godTiles[1];
  }

  getRandomIndex(range){
    return Math.floor(Math.random() * range);
  }

  renew(){
    console.log("Choosing a card to pass to the Player to the left")
    var randomCard = this.getRandomIndex(this.hand.length);
    if(this.hand.length === 0)
      console.log("hand is empty")
    var cardToPass = this.removeActionCard(this.hand[randomCard].getID());
    console.log("Card to pass to the left is:", cardToPass);
    return cardToPass;
  }

  gamePlay(GodsInGame, Deck, Players){ //have to add a buzzer call for RYMON whenver an action card that targets him is used
      var playableCards = this.getPlayableCards(GodsInGame);
      for(var i = 0; i < playableCards.length; i++){
        if(playableCards[i].getID() === 14 && Deck.glory === Deck.infamy){
          playableCards = playableCards.filter(item => item != playableCards[i]);
          break;
        }
      }
      if(playableCards.length > 0){

          //code will need to be changed to be able to take userInput on Selection of Card
        var randomIndex = this.getRandomIndex(playableCards.length);
        console.log("Chosen card to play is:",playableCards[randomIndex]);
        var targets = playableCards[randomIndex].identifyTargets(GodsInGame);
        //end of needed to be changed code

        var initial, destination, nextDestination;

          if(playableCards[randomIndex].getID() === 11){ //requires 3 targets

            //this section requires user choice
            console.log("Choose left or right GodTile");
            initial = targets[this.getRandomIndex(targets.length)];
            console.log("Chosen Tile is:",initial.getName());
            console.log("Tile before action:");
            console.log("   Glory:",initial.getGlory());
            console.log("   Infamy:",initial.getInfamy());
            //end of first choice


            var possibleDest = GodsInGame.filter(item => item !== initial);
            var initialLength = possibleDest.length;
            for(var i = 0; i < initialLength; i++){
              possibleDest = possibleDest.filter(item => item != this.godTiles[0]);
              if (possibleDest.length != initialLength)
                break;
              possibleDest = possibleDest.filter(item => item != this.godTiles[1]);
              if (possibleDest.length != initialLength)
                break;
            }


            //requires second input
            console.log("Choose destination for Glory");
            destination = possibleDest[this.getRandomIndex(possibleDest.length)];
            console.log("Chosen Tile is:",destination.getName());
            console.log("Tile before action:");
            console.log("   Glory:",destination.getGlory());
            console.log("   Infamy:",destination.getInfamy());
            //end of second input


            possibleDest = possibleDest.filter(item => item != destination);


            //requires third input
            console.log("Choose destination for Infamy");
            nextDestination = possibleDest[this.getRandomIndex(possibleDest.length)];
            console.log("Chosen Tile is:",nextDestination.getName());
            console.log("Tile before action:");
            console.log("   Glory:",nextDestination.getGlory());
            console.log("   Infamy:",nextDestination.getInfamy());
            //end of third input

            var rymon;
            var rymonExists = false;
            for(var i = 0; i < GodsInGame.length; i++){
                if(GodsInGame[i].getID() === 9){
                  rymon = GodsInGame[i];
                  rymonExists = true;
                }
            }

            if(rymonExists){
              for(var i = 0; i < Players.length; i++){ //this is just to check if Players wants to use rymon...such a headache
                if(Players[i].getUsername() === rymon.getLoc() && (destination.getLoc() === rymon.getLoc() || nextDestination.getLoc() === rymon.getLoc())){
                  playableCards[randomIndex].setLoc(Players[i].getUsername);
                      var targets = playableCards[randomIndex].identifyTargets(GodsInGame);
                      if(targets.length > 0 && !rymon.getIsUsed())
                        Players[i].buzzer("During Action", targets, Players, Deck);
                      else
                        break;

                      if(rymon.getIsUsed()){
                        console.log(Players[i].getUsername(),"decided to use RYMON!")
                        initial = targets[this.getRandomIndex(targets.length)];
                        console.log("Chosen Tile is:",initial.getName());
                        console.log("Tile before action:");
                        possibleDest.push(this.getRightGodTile());
                        possibleDest.push(this.getLeftGodTile());
                        possibleDest.push(destination);
                        possibleDest.push(nextDestination);
                        possibleDest = possibleDest.filter(item => item != Players[i].getLeftGodTile());
                        possibleDest = possibleDest.filter(item => item != Players[i].getRightGodTile());
                        console.log("   Glory:",initial.getGlory());
                        console.log("   Infamy:",initial.getInfamy());
                        destination = possibleDest[this.getRandomIndex(possibleDest.length)];
                        console.log("Chosen Tile is:",destination.getName());
                        console.log("Tile before action:");
                        console.log("   Glory:",destination.getGlory());
                        console.log("   Infamy:",destination.getInfamy());
                        nextDestination = possibleDest[this.getRandomIndex(possibleDest.length)];
                        console.log("Chosen Tile is:",nextDestination.getName());
                        console.log("Tile before action:");
                        console.log("   Glory:",nextDestination.getGlory());
                        console.log("   Infamy:",nextDestination.getInfamy());
                      }
                      break;
                    }
                  }
                }

            playableCards[randomIndex].playActionCard3(initial, destination, nextDestination, Deck);

            console.log(initial.getName(),"after action:");
            console.log("   Glory:",initial.getGlory());
            console.log("   Infamy:",initial.getInfamy());
            console.log(destination.getName(),"after action:");
            console.log("   Glory:",destination.getGlory());
            console.log("   Infamy:",destination.getInfamy());
            console.log(nextDestination.getName(),"after action:");
            console.log("   Glory:",nextDestination.getGlory());
            console.log("   Infamy:",nextDestination.getInfamy());
            Deck.discard.push(playableCards[randomIndex]);
            this.removeActionCard(playableCards[randomIndex].getID());
          }

          else if(playableCards[randomIndex].getID() === 2 || playableCards[randomIndex].getID() === 4 || playableCards[randomIndex].getID() === 6){ //requires 2 targets
            if(playableCards[randomIndex].getID() === 6){
              var infamyTargets = [];
              var gloryTargets = [];
              for(var i = 0; i < targets.length; i++){
                if(targets[i].getGlory() > 0){
                  gloryTargets.push(targets[i]);
                  }
                if(targets[i].getInfamy() > 0)
                  infamyTargets.push(targets[i]);
              }

              if(infamyTargets.length === 1 && gloryTargets.length > 1)
                gloryTargets = gloryTargets.filter(item => item != infamyTargets[0]);

              else if(infamyTargets.length > 1 && gloryTargets.length === 1)
                infamyTargets = infamyTargets.filter(item => item != gloryTargets[0]);
              //will change because we need to take in user input with glory targets
              console.log("choose target to gain Glory and lose Infamy");
              initial = infamyTargets[this.getRandomIndex(infamyTargets.length)];
              console.log("Chosen Tile is:",initial.getName());
              console.log("Tile before action:");
              console.log("   Glory:",initial.getGlory());
              console.log("   Infamy:",initial.getInfamy());
              //end of changes

              gloryTargets = gloryTargets.filter(item => item != initial);

            //will change based on user input
              console.log("choose target to gain Infamy and lose glory");
              destination = gloryTargets[this.getRandomIndex(gloryTargets.length)];
              console.log("Chosen Tile is:",destination.getName());
              console.log("Tile before action:");
              console.log("   Glory:",destination.getGlory());
              console.log("   Infamy:",destination.getInfamy());
              //will change based on user input

              var rymon;
              var rymonExists = false;
              for(var i = 0; i < GodsInGame.length; i++){
                  if(GodsInGame[i].getID() === 9){
                    rymon = GodsInGame[i];
                    rymonExists = true;
                  }
              }

              if(rymonExists){
                for(var i = 0; i < Players.length; i++){ //this is just to check if Players wants to use rymon...such a headache
                  if(Players[i].getUsername() === rymon.getLoc() && (destination.getLoc() === rymon.getLoc())){
                    playableCards[randomIndex].setLoc(Players[i].getUsername());
                        targets = playableCards[randomIndex].identifyTargets(GodsInGame);
                        if(targets.length > 0 && !rymon.getIsUsed())
                          Players[i].buzzer("During Action", targets, Players, Deck);
                        else
                          break;

                        if(rymon.getIsUsed()){
                          var infamyTargets = [];
                          var gloryTargets = [];
                          for(var j = 0; j < targets.length; j++){
                            if(targets[j].getGlory() > 0){
                              gloryTargets.push(targets[j]);
                              }
                            if(targets[j].getInfamy() > 0)
                              infamyTargets.push(targets[j]);
                          }
                          console.log(Players[i].getUsername(),"decided to use RYMON!")
                          initial = infamyTargets[this.getRandomIndex(infamyTargets.length)];
                          console.log("Chosen Tile to gain Glory and lose Infamy is:",initial.getName());
                          console.log("Tile before action:");
                          console.log("   Glory:",initial.getGlory());
                          console.log("   Infamy:",initial.getInfamy());
                          gloryTargets = gloryTargets.filter(item => item != initial);
                          destination = gloryTargets[this.getRandomIndex(gloryTargets.length)];
                          console.log("Chosen Tile gain Infamy and lose Glory is:",destination.getName());
                          console.log("   Glory:",destination.getGlory());
                          console.log("   Infamy:",destination.getInfamy());
                        }
                        break;
                      }
                    }
                  }

              playableCards[randomIndex].playActionCard2(initial,destination, Deck);
              console.log(initial.getName(),"after action:");
              console.log("   Glory:",initial.getGlory());
              console.log("   Infamy:",initial.getInfamy());
              console.log(destination.getName(),"after action:");
              console.log("   Glory:",destination.getGlory());
              console.log("   Infamy:",destination.getInfamy());
              Deck.discard.push(playableCards[randomIndex]);
              this.removeActionCard(playableCards[randomIndex].getID());
          }

          else{
            //to be changed, takes in first input
            var randomTarget = this.getRandomIndex(targets.length)
            initial = targets[randomTarget];
            console.log("Chosen Tile is:",initial.getName());
            console.log("   Glory:",initial.getGlory());
            console.log("   Infamy:",initial.getInfamy());
            //end of first input

            possibleDest = GodsInGame.filter(item => item !== initial);

            //choosing second destination, requires user input
            console.log("choosing random destination");
            destination = possibleDest[this.getRandomIndex(possibleDest.length)];
            console.log("Chosen Tile is:",destination.getName());
            console.log("Tile before action:");
            console.log("   Glory:",destination.getGlory());
            console.log("   Infamy:",destination.getInfamy());
            //end of second input

            for(var i = 0; i < Players.length; i++){ //this is just to check if Players wants to use rymon...such a headache
              if((Players[i].getLeftGodTile() === destination || Players[i].getRightGodTile() === destination || Players[i].getLeftGodTile() === initial || Players[i].getRightGodTile() === initial) && (Players[i].getLeftGodTile().getID() === 9  || Players[i].getRightGodTile().getID() === 9)){ //specific to Rymon
                if(!destination.getIsUsed()){
                  if(this.getLeftGodTile().getGlory() > 0 && playableCards[randomIndex].getID() === 4)
                    targets.push(this.getLeftGodTile());

                  else if(this.getLeftGodTile().getInfamy() > 0 && playableCards[randomIndex].getID() === 2)
                    targets.push(this.getLeftGodTile());

                  if(this.getRightGodTile().getGlory() > 0 && playableCards[randomIndex].getID() === 4)
                      targets.push(this.getRightGodTile());

                    else if(this.getRightGodTile().getInfamy() > 0 && playableCards[randomIndex].getID() === 2)
                      targets.push(this.getRightGodTile());


                  targets = targets.filter(item => item != Players[i].getLeftGodTile());
                  targets = targets.filter(item => item != Players[i].getRightGodTile());

                  if(targets.length > 1)
                    Players[i].buzzer("During Action", targets, Players, Deck);
                  else
                    break;
                  }

                  if((destination.getIsUsed() && destination.getID() === 9) || (initial.getIsUsed() && initial.getID() === 9)){ //Players decides to use Rymon
                    initial = targets[this.getRandomIndex(targets.length)];
                    possibleDest = GodsInGame.filter(item => item !== initial);
                    destination = possibleDest[this.getRandomIndex(possibleDest.length)];
                    console.log(Players[i].getUsername(),"decided to use RYMON!")
                    console.log("Chosen Tile to lose Infamy is:",initial.getName());
                    console.log("Tile before action:");
                    console.log("   Glory:",initial.getGlory());
                    console.log("   Infamy:",initial.getInfamy());
                    console.log("Chosen Tile gain Infamy is:",destination.getName());
                    console.log("Tile before action:");
                    console.log("   Glory:",destination.getGlory());
                    console.log("   Infamy:",destination.getInfamy());
                    break;
                  }
                }
              }

            playableCards[randomIndex].playActionCard2(initial,destination,Deck);
            console.log("initial Tile after action:");
            console.log("   Glory:",initial.getGlory());
            console.log("   Infamy:",initial.getInfamy());
            console.log("Destination Tile after action:");
            console.log("   Glory:",destination.getGlory());
            console.log("   Infamy:",destination.getInfamy());
            Deck.discard.push(playableCards[randomIndex]);
            this.removeActionCard(playableCards[randomIndex].getID());
          }
        }

        else{

          //userInput
          destination =  targets[this.getRandomIndex(targets.length)];
          console.log("Chosen Tile is",destination.getName());
          console.log("Tile before action:");
          console.log("   Glory:",destination.getGlory());
          console.log("   Infamy:",destination.getInfamy());
          for(var i = 0; i < Players.length; i++){ //this is just to check if Players wants to use rymon...such a headache
            if((Players[i].getLeftGodTile() === destination || Players[i].getRightGodTile() === destination) && (Players[i].getLeftGodTile().getID() === 9  || Players[i].getRightGodTile().getID() === 9)){ //specific to Rymon
              if(!destination.getIsUsed()){
                targets.push(this.getLeftGodTile());
                targets.push(this.getRightGodTile());
                targets = targets.filter(item => item != Players[i].getLeftGodTile());
                targets = targets.filter(item => item != Players[i].getRightGodTile());
                Players[i].buzzer("During Action", targets, Players, Deck);
                }

                if(((Players[i].getLeftGodTile() === destination) && Players[i].getLeftGodTile().getIsUsed()) || ((Players[i].getRightGodTile() === destination) && Players[i].getRightGodTile().getIsUsed() && (Players[i].getLeftGodTile().getID() === 9 || Players[i].getRightGodTile().getID() === 9))){ //Players decides to use Rymon
                  console.log(Players[i].getUsername(),"decided to use RYMON!");
                  destination = targets[this.getRandomIndex(targets.length)];
                  console.log("Chosen Tile is:",destination.getName());
                  console.log("Tile before action:");
                  console.log("   Glory:",destination.getGlory());
                  console.log("   Infamy:",destination.getInfamy());
                  break;
                }
              }
            }
          //end of user Input

          playableCards[randomIndex].playActionCard(destination, Deck);
          console.log("Tile after action:");
          console.log("   Glory:",destination.getGlory());
          console.log("   Infamy:",destination.getInfamy());
          Deck.discard.push(playableCards[randomIndex]);
          this.removeActionCard(playableCards[randomIndex].getID());
        }
        return true;
      }

    else{
      console.log("No Cards currently playable");
      return false;
    }
  }
}
