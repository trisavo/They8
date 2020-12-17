//main loop

class Game{

  constructor(Players){
    //Game setup
      this.Deck;
      this.tiles;
      this.Players = [];
      this.createDeck();
      this.createTiles();
      for(var i = 0; i < 100; i++)
        this.shuffleDeck();

      for(var i = 0 ; i < Players.length; i++){
        this.Players.push(new Player(Players[i].getUsername()));
        console.log("added",this.Players[i].getUsername(),"to the game.");
      }

      this.distributeTiles();
      for(var i = 0; i < this.tiles.deck.length; i++){
        this.tiles.deck[i].setInfamy(0);
        this.tiles.deck[i].setGlory(0);
      }

      this.dealHand();
      //end of Game Setup
      var roundNum = 1;
      //core LOOP
      while(this.Deck.infamy > 0 && this.Deck.glory > 0){
          //Start of round
          var length = 0;
          for(var i = 0; i < this.Players.length; i++){
            length += this.Players[i].getHand().length;
          }
          length+= this.Deck.deck.length;
          // if(length != 16){
          //   console.log("ERROR, ACTIONCARD OBJECT REMOVED")
          //   return;
          // }

          for(var i = 0; i < this.Players.length; i++){
            this.Players[i].buzzer("Start", this.tiles.deck, this.Players, this.Deck);
          }
          console.log("\n\n\n\n\nEnd of Buzzer Round...\n\n\n\n\n");

          if(this.Deck.infamy <= 0 || this.Deck.glory <= 0)
            break;
          else{
            console.log("\n\n\n\n\n ROUND",roundNum);
            roundNum+=1;
            this.round();
          }
        }

      //game end
      console.log("Creating Pairs...")
      var Pairs = new Array(this.Players.length);
      for(var i = 0 ; i < Pairs.length; i++){
        Pairs[i] = new Array(2);
      }

      for(var i = 0; i < this.Players.length; i++){
        if(i === this.Players.length-1){ //last index
          Pairs[i][0] = this.Players[i].getLeftGodTile();
          Pairs[i][1] = this.Players[0].getRightGodTile();
        }
        else{
          Pairs[i][0] = this.Players[i].getLeftGodTile();
          Pairs[i][1] = this.Players[i+1].getRightGodTile();
        }
        var number = i + 1;
        console.log("Pair",number + ".", Pairs[i]);
      }

      console.log("Calculating winner...")
      this.calculateWinner(Pairs);
      console.log("end of game");
  }

  calculateWinner(Pairs){
      var WinningPair = 0; //holds an index
      var WinningPairScore = -1000; //holds scores
      for(var i = 0 ; i < Pairs.length; i++){
        var curPairScore = Pairs[i][0].getScore() + Pairs[i][1].getScore();
        if(curPairScore > WinningPairScore){
          WinningPair = i;
          WinningPairScore = curPairScore
      }
      else if(curPairScore === WinningPairScore){ //tied score
        console.log("tied score, calculating winner...");
        var curGloryScore = 2*(Pairs[i][0].getGlory() + Pairs[i][1].getGlory());
        var winningGloryScore = 2*(Pairs[WinningPair][0].getGlory() + Pairs[WinningPair][1].getGlory());

        if(curGloryScore > WinningPairScore){
            console.log("changing winner...")
            WinningPair = i;
            WinningPairScore = curPairScore;
            continue;
        }

        else if(curGloryScore < WinningPairScore)
          continue;

        else if(curGloryScore === winningGloryScore){ //tied glory score
            console.log("tied glory score, calculating winner...")
            var highestAlph1, highestAlph2;
            if(Pairs[WinningPair][0].getID() > Pairs[WinningPair][1].getID())
              highestAlph1 = Pairs[WinningPair][1];
            else
              highestAlph1 = Pairs[WinningPair][0];
            if(Pairs[i][0].getID() > Pair[i][1].getID())
                highestAlph2 = Pairs[i][1];
            else
                highestAlph2 = Pairs[i][0];
            if(highestAlph1 > highestAlph2){
              WinningPair = i;
              WinningPairScore = curPairScore;
            }
            else if(highestAlph1 < highestAlph2)
              continue;
          }
      }
    }

    var Winner;
    var WinnerScore;

    if(Pairs[WinningPair][0].getScore() < Pairs[WinningPair][1].getScore()){
      Winner = Pairs[WinningPair][0].getLoc();
      WinnerScore = Pairs[WinningPair][0].getScore()
      console.log("Winner is", Winner, "with score of", WinnerScore,"on tile", Pairs[WinningPair][0].getName());
	  //showGameWinner(false, Winner, "", WinnerScore, Pairs[WinningPair][0].getName());
    }
    else if(Pairs[WinningPair][0].getScore() === Pairs[WinningPair][1].getScore()){
        console.log("Same score in pair, recalculating...")
        var loc1;
        var loc2;
        var FirstTile = Pairs[WinningPair][0];
        console.log(FirstTile.getName());
        var SecondTile = Pairs[WinningPair][1];
        console.log(SecondTile.getName());
        for(var i = 0; i < this.Players.length; i++){
          if(this.Players[i].getLeftGodTile() === FirstTile)
            loc1 = this.Players[i].getRightGodTile();
          else if(this.Players[i].getRightGodTile() === SecondTile)
            loc2 = this.Players[i].getLeftGodTile();
        }
        console.log(loc1.getName());
        console.log(loc2.getName());

        if(loc1.getScore() > loc2.getScore()){
          Winner = loc1.getLoc();
          WinnerScore = loc1.getScore()
          console.log("Winner is", Winner, "with score of", WinnerScore,"on tile", loc1.getName());
		  //showGameWinner(false, Winner, "", WinnerScore, loc1.getName());
        }

        else if(loc1.getScore() === loc2.getScore()){
          console.log("There was a tie between", loc1.getLoc(),"and",loc2.getLoc(), "with a tied score of", loc1.getScore());
		  //showGameWinner(true, loc1.getLoc(), loc2.getLoc(), loc1.getScore(), "");
        }

        else{
          Winner = loc2.getLoc();
          WinnerScore = loc2.getScore()
          console.log("Winner is", Winner, "with score of", WinnerScore,"on tile", loc2.getName());
		  //showGameWinner(false, Winner, "", WinnerScore, loc2.getName());
        }
    }
    else {
      Winner = Pairs[WinningPair][1].getLoc();
      WinnerScore = Pairs[WinningPair][1].getScore()
      console.log("Winner is", Winner, "with score of", WinnerScore,"on tile", Pairs[WinningPair][1].getName());
	  //showGameWinner(false, Winner, "", WinnerScore, Pairs[WinningPair][1].getName());
    }
    return Winner;
  }

  createDeck(){
    console.log("CREATING DECK OF ACTION CARDS");
    this.Deck = new Deck("ActionCards");
  }

  shuffleDeck(){
    this.Deck.shuffle();
  }

  createTiles(){
    console.log("CREATING GOD TILES")
    this.tiles = new Deck("godTile");
    console.log("SHUFFLING TILES");
    this.tiles.shuffle();
  }

  distributeTiles(){
    console.log("ADDING 2 GOD TILES TO ALL PLAYERS");
    this.tiles.deal(2,this.Players,"GodTiles");
    console.log("Deleting unused God Tiles from Game...")
    delete this.tiles;
    this.tiles = new Deck();
    for(var i = 0; i < this.Players.length; i++){
      console.log(this.Players[i].getUsername()+"\'s God Tiles:");
      this.Players[i].getLeftGodTile().setInfamy(0);
      this.Players[i].getLeftGodTile().setGlory(0);
      this.Players[i].getRightGodTile().setInfamy(0);
      this.Players[i].getRightGodTile().setGlory(0);
      console.log(" Left God Tile:",this.Players[i].getLeftGodTile().getName());
      console.log(" Right God Tile:",this.Players[i].getRightGodTile().getName());
      this.tiles.deck.push(this.Players[i].getLeftGodTile());
      this.tiles.deck.push(this.Players[i].getRightGodTile());
    }
  }

  dealHand(){
    console.log("ADDING 3 ACTION CARDS TO EACH PLAYER'S HAND");
    this.Deck.deal(3,this.Players,"ActionCards");
    for(var i = 0; i < this.Players.length; i++){
        console.log(this.Players[i].getUsername()+"\'s hand:")
        var currHand =  this.Players[i].getHand();
        for(var j = 0; j < currHand.length; j++)
          console.log(currHand[j]);
    }
    console.log("Checking that drawn cards are removed from deck");
    for(var i = 0; i < this.Deck.deck.length; i++)
      console.log(this.Deck.deck[i]);
    console.log("\n\n\n\n\n\n");
  }

  round(){
    console.log("Playing a card from each player's hand...");
    var discard = [];
    for(var i = 0; i < this.Players.length; i++){
        this.Players[i].setTurn();

        for(var j = 0; j < this.Players.length; j++)
          this.Players[j].buzzer("Before Player Action",this.tiles.deck,this.Players,this.Deck);
        console.log("\n\n\n\n\nEnd of Buzzer Round...\n\n\n\n\n");

        if(this.Deck.infamy <= 0 || this.Deck.glory <= 0)
            return;

        console.log(this.Players[i].getUsername()+"\'s turn:");
        if(!this.Players[i].gamePlay(this.tiles.deck,this.Deck,this.Players)){
            console.log("No cards Playable, discarding and drawing new hand...");
            var toDiscard = this.Players[i].removeHand();
            for(var j = 0; j < toDiscard.length; j++)
              this.Deck.discard.push(toDiscard[j]);
            var tempList = [];
            tempList.push(this.Players[i]);
            this.Deck.deal(3,tempList,"ActionCards");
            console.log("current player's new hand:")
            console.log(this.Players[i].getHand());
            this.Players[i].gamePlay(this.tiles.deck,this.Deck,this.Players);
        }
        console.log("End of",this.Players[i].getUsername()+"\'s turn")
        console.log("New supply is:")
        console.log("Glory:", this.Deck.glory);
        console.log("Infamy:", this.Deck.infamy,"\n\n\n\n\n\n\n\n");
        if(this.Deck.infamy === 0 || this.Deck.glory === 0)
          return;
        else if(this.Deck.infamy > 15)
          this.Deck.infamy = 15
        else if(this.Deck.glory > 15)
          this.Deck.glory = 15
    }
    console.log("Final Glory:", this.Deck.glory);
    console.log("Final Infamy:", this.Deck.infamy);
    console.log("Displaying GodTiles to check all Scores...")
    for(var i = 0; i < this.tiles.deck.length; i++){
      console.log(this.tiles.deck[i].getName());
      console.log("   Glory:", this.tiles.deck[i].getGlory());
      console.log("   Infamy:", this.tiles.deck[i].getInfamy());
    }
    this.renewal();
  }

  renewal(){
    console.log("Beginning Renewal Phase...");
    for(var i = 0 ; i < this.Players.length; i++){
      console.log(this.Players[i].getUsername()+"\'s hand:")
      console.log(this.Players[i].getHand());
    }
    //checking if Nanos is in the game
    var currentStatus = false;
    var NanosStatus = false;
    var cymeleStatus = false;
    var currentStatus2 = false;
    var playerName;
    var playerNumber;

    for(var i = 0; i < this.tiles.deck.length; i++){ //getting the current status of nanos
      if(this.tiles.deck[i].getID() === 6){
          currentStatus = this.tiles.deck[i].getIsUsed();
          playerName = this.tiles.deck[i].getLoc();
      }
      else if(this.tiles.deck[i].getID() === 4)
          currentStatus2 = this.tiles.deck[i].getIsUsed();

    }

    for(var i = 0; i < this.Players.length; i++){ //calling player buzzer
      this.Players[i].buzzer("Renewal",this.tiles.deck,this.Players,this.Deck);
      if(this.Players[i].getLeftGodTile().getID() === 4 || this.Players[i].getRightGodTile().getID() === 4){
        if(i - 1 < 0)
          playerNumber = this.Players.length - 1;
        else
          playerNumber = i - 1;
      }
    }
    console.log("\n\n\n\n\nEnd of Buzzer Round...\n\n\n\n\n");
      for(var i = 0; i < this.tiles.deck.length; i++){ //getting the current status of nanos
        if(this.tiles.deck[i].getID() === 6)
            NanosStatus = this.tiles.deck[i].getIsUsed();
        else if(this.tiles.deck[i].getID() === 4)
            cymeleStatus = this.tiles.deck[i].getIsUsed();
      }

    var cardsToPass = [];

      for(var i = 0; i < this.Players.length; i++){
        if(NanosStatus === true && currentStatus != NanosStatus && (this.Players[i].getUsername() === playerName)){
          //if nanos has just been used
          continue;
        }
        else{
          console.log(this.Players[i].getUsername()+"\'s turn to choose card to pass...")
          cardsToPass.push(this.Players[i].renew());
        }
      }

      for(var i = 0; i < this.Players.length; i++){
          if(NanosStatus === true && currentStatus != NanosStatus && (this.Players[i].getUsername() === playerName)){
            console.log("removing recently added card from hand");
            var removedCard = this.Players[i].removeActionCard(this.Players[i].hand[this.Players[i].hand.length-1].getID())
            this.Players[i].removeActionCard(removedCard.getID());
            if(i === this.Players.length-1){
              this.Players[0].addActionCard(removedCard);
              console.log("added",removedCard.getName(),"to",this.Players[0].getUsername()+"\'s hand")
            }
            else{
              this.Players[i+1].addActionCard(removedCard);
              console.log("added",removedCard.getName(),"to",this.Players[i+1].getUsername()+"\'s hand");
            }
          }

          else{
            if(i + 1 === this.Players.length){
              console.log("Pushing onto",this.Players[0].getUsername()+"\'s hand...")
              this.Players[0].addActionCard(cardsToPass[0]);
              console.log("added",cardsToPass[0].getName(),"to",this.Players[0].getUsername()+"\'s hand")
            }
            else{
              console.log("Pushing onto",this.Players[i+1].getUsername()+"\'s hand...")
              this.Players[i+1].addActionCard(cardsToPass[0]);
              console.log("added",cardsToPass[0].getName(),"to",this.Players[i+1].getUsername()+"\'s hand")
          }
            cardsToPass.shift();
          }
          this.Players[i].setTurn();
      }

      console.log("Setting new player order...")
      var prevStartPlayer = this.Players[0];
      this.Players.shift();
      this.Players.push(prevStartPlayer);

      console.log("moving discard pile to Deck and shuffling...");
      this.Deck.reuse();
      console.log("Dealing one card from deck to all players...")
      if(cymeleStatus === true && currentStatus2 != cymeleStatus)
        this.Deck.deal(1,this.Players.filter(item => item != this.Players[playerNumber]),"ActionCards");
      else
        this.Deck.deal(1,this.Players,"ActionCards");
      console.log("Displaying new player hands");
      for(var i = 0; i < this.Players.length; i++)
        console.log(this.Players[i].getUsername(),":",this.Players[i].getHand());
    }
}
