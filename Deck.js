class Deck {
  constructor(type) {
    //console.log(cards);
    this.deck = [];
    this.discard = [];
    this.infamy = 15;
    this.glory = 15;

    if (type === "godTile") {
      const cardArr = tiles;

      for (let i = 0; i < cardArr.length; i++) {
        const card = new GodTile(cardArr[i]);
        this.deck.push(card);
        this.glory = 15;
        this.infamy = 15;
      }
    }
    else if (type === "ActionCards") {
      const cardArr = cards;

      for (let i = 0; i < cardArr.length; i++) {
        const card = new ActionCard(cardArr[i]);
        //console.log(card);
        this.deck.push(card);
      }
    }

  }

  shuffle() {
    this.deck.sort(() => Math.random() - 0.5);
  }

  reuse(){
    for(var i = 0; i < this.discard.length; i++)
      this.deck.push(this.discard[i]);
    delete this.discard;
    this.discard = [];
    for(var i = 0; i < 100; i++)
      this.shuffle();
  }

  displayCurrentDeck(){
    console.log("Displaying Current Deck");
    for(var i = 0; i < this.deck.length; i++)
      console.log(this.deck[i].getName());
  }

  deal(numberDealt, Players, type) {
      if(type === "ActionCards"){ //means we are working with action cards
       for(var i = 0; i < Players.length * numberDealt; i++){
         var num = ((i%Players.length)+1).toString();
         Players[i%Players.length].addActionCard(this.deck[0]);
         this.deck = this.deck.filter(item => item !== this.deck[0])
         if(this.deck.length === 0)
          this.reuse();
       }
     }

     else if(type === "GodTiles"){ //means we are working with GodTiles, done only once
       for(var i = 0; i < Players.length * numberDealt; i++){
         Players[i%Players.length].addGodTile(this.deck[0]);
         this.deck = this.deck.filter(item => item !== this.deck[0])
         if(this.deck.length === 0)
            break;
       }
     }

     else{ //means we are working with action cards
      for(var i = 0; i < Players.length * numberDealt; i++){
        var num = ((i%Players.length)+1).toString();
        this.deck[0].setLoc("Player"+num.toString()); //need to adjust to take in usernames instead of manual input
        Players[i%Players.length].addActionCard(this.deck[0]);
        this.deck = this.deck.filter(item => item !== this.deck[0])
        if(this.deck.length === 0)
         break;
      }
    }
  }

  getCard(index) {
    var card = this.deck[index];
    this.deck = this.deck.filter(item => item !== this.deck[index])
    return card;
  }

}
