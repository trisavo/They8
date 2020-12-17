class ActionCard{
  constructor(JSONCard) {
    this.id = JSONCard.id;
    this.name = JSONCard.name;
    this.img = JSONCard.img;
    this.desc = JSONCard.desc;
    this.acttext = JSONCard.acttext;
    this.target = JSONCard.target;
    this.location = JSONCard.location;
    this.isPlayer = false;
  }


  getID(){
    return this.id;
  }

  getName(){
    return this.name;
  }

  getIMG(){
    return this.img;
  }

  getDesc(){
    return this.desc;
  }

  getLoc(){
    return this.location;
  }

  setLoc(newLoc){
    this.location = newLoc;
  }

  getAction(){
    return this.acttext;
  }

  getTarget(){
    return this.target;
  }

  identifySecondTargets(firstT, GodTiles){
    var targets = [];
    if(this.id === 4 || this.id === 2){
      console.log("gODTILES" + GodTiles);
      for(var i = 0; i < GodTiles.length; i++){
        console.log("FIRST" + firstT);
        if((GodTiles[i].location != firstT.location))
          targets.push(GodTiles[i]);
        }

        return targets;
    }
    else if(this.id === 6){
      for(var i = 0; i < GodTiles.length; i++){
        console.log("FIRST" + firstT);
        if((GodTiles[i].location != firstT.location && GodTiles[i].name != firstT.name  && GodTiles[i].infamy>0))
          targets.push(GodTiles[i]);
        }

        return targets;
    }
    else if(this.id === 11){
      for(var i = 0; i < GodTiles.length; i++){
        console.log("FIRST" + firstT);
        if(GodTiles[i].location != firstT.location)
          targets.push(GodTiles[i]);
        }

        return targets;
    }
    return targets;
  }

  identifyThirdTargets(secondT, GodTiles){
    var targets = [];
      for(var i = 0; i < GodTiles.length; i++){
        console.log("FIRST" + firstT);
        if((GodTiles[i].location != secondT.location))
          targets.push(GodTiles[i]);
        }

        return targets;
    }


  identifyTargets(godDeck){
    var GodTiles = godDeck;
    var targets = [];

      if(this.id === 1 || this.id === 4){
        for(var i = 0; i < GodTiles.length; i++){
          if((GodTiles[i].glory > 0) && (GodTiles[i].location != this.location))
            targets.push(GodTiles[i]);
          }

          return targets;
        }

      else if(this.id === 2 || this.id === 9){
        for(var i = 0; i < GodTiles.length; i++){
          if((GodTiles[i].getInfamy() > 0) && (GodTiles[i].location != this.location))
            targets.push(GodTiles[i]);
          }
          return targets;
        }

      else if(this.id === 3 || this.id === 5 || this.id === 7 || this.id === 8 || this.id === 10 || this.id === 15 || this.id === 16){
        for(var i = 0; i < GodTiles.length; i++){
          if((GodTiles[i].getLoc() != this.getLoc()))
            targets.push(GodTiles[i]);
          }
        if((this.id === 3 || this.id === 16) && godDeck.infamy < 2){
          targets = [];
        }
        if((this.id === 5 || this.id === 15) && godDeck.glory < 2){
          targets = [];
        }
          return targets;
        }


      else if(this.id === 6){
        var gloryTargets = [];
        var infamyTargets = [];
        for(var i = 0; i < GodTiles.length; i++){
          if((GodTiles[i].getGlory() > 0) || (GodTiles[i].getInfamy() > 0) && (GodTiles[i].getLoc() != this.location))
              targets.push(GodTiles[i]);

          if((GodTiles[i].getGlory() > 0) && (GodTiles[i].getLoc() != this.location))
            gloryTargets.push(GodTiles[i]);

          if((GodTiles[i].getInfamy() > 0) && (GodTiles[i].getLoc() != this.location))
            infamyTargets.push(GodTiles[i]);
          }

        if(targets.length < 2 || gloryTargets.length < 1 || infamyTargets.length < 1){
          var none = [];
          return none;
        }

        else
          return targets;
      }

      else if(this.id === 11){
        for(var i = 0; i < GodTiles.length; i++){
          if(GodTiles[i].getLoc() === this.getLoc() && (GodTiles[i].glory > 0) && GodTiles[i].infamy > 0)
            targets.push(GodTiles[i]);
          }

          return targets;
        }
        else if(this.id === 13){
          for(var i = 0; i < GodTiles.length; i++){
            if(GodTiles[i].getLoc() != this.getLoc() && (GodTiles[i].glory > 0) && GodTiles[i].infamy > 0)
              targets.push(GodTiles[i]);
            }

            return targets;
        }

      else if(this.id === 13){
          for(var i = 0; i < GodTiles.length; i++){
            if(GodTiles[i].getLoc() != this.getLoc() && (GodTiles[i].getGlory() > 0) && GodTiles[i].getInfamy() > 0)
              targets.push(GodTiles[i]);
            }
            return targets;
          }

      else if(this.id === 12){
        for(var i = 0; i < GodTiles.length; i++){
          if((GodTiles[i].getLoc() === this.getLoc() && GodTiles[i].getIsUsed()))
            targets.push(GodTiles[i]);
          }
          return targets;
        }

      else if(this.id === 14)
        return GodTiles;

      else
        return targets;
    }

    playActionCard3(Origin, gloryTarget, infamyTarget, Deck){
        if(this.id === 11){
          Origin.setInfamy(Origin.getInfamy()-1);
          Origin.setGlory(Origin.getGlory()-1);
          gloryTarget.setGlory(gloryTarget.getGlory()+1);
          infamyTarget.setInfamy(infamyTarget.getInfamy()+1);
        }
    }

    playActionCard2(Origin, Destination, Deck){
      if(this.id === 6){
        //intial is glory, destination is infamy
        Origin.glory = Origin.glory + 1; //gains Glory
        Origin.infamy = Origin.infamy -1; //loses Infamy
        Destination.glory = Destination.glory - 1; //loses glory
        Destination.infamy= Destination.infamy + 1; //gains Infamy
      }

      else if(this.id === 2){
        Origin.setInfamy(Origin.getInfamy()-1);
        Destination.setInfamy(Destination.getInfamy()+1);
      }

      else if(this.id === 4){
        Origin.setGlory(Origin.getGlory()-1);
        Destination.setGlory(Destination.getGlory()+1);
      }
    }

    playActionCard(Destination, Deck){
      switch(this.id){
        case 1:
          Destination.glory = Destination.glory -1;;
          Deck.infamy = Deck.infamy+1;
          this.location = "Deck";
          break;
        case 3:
          if(Deck.infamy === 1){
            Destination.setInfamy(Destination.getInfamy()+1);
            Deck.infamy = Deck.infamy-1;
          }
          else{
            Destination.setInfamy(Destination.getInfamy()+2);
            Deck.infamy = Deck.infamy-2;
          }
          break;
        case 5:
          if(Deck.glory === 1){
            Destination.glory+=2;
            Deck.glory-=1;
            return;
          }
          Destination.glory+=2;
          Deck.glory-=2;
          break;
        case 7:
          Destination.glory +=1;
          Destination.infamy +=1;
          Deck.infamy--;
          Deck.glory--;
          break;
        case 8:
          Destination.setGlory(Destination.getGlory()+1);
          Deck.glory = Deck.glory - 1;
          break;
        case 9:
          Destination.setInfamy(Destination.getInfamy()-1);
          Deck.infamy = Deck.infamy+1;
          break;
        case 10:
          Destination.setInfamy(Destination.getInfamy()+1);
          Deck.infamy = Deck.infamy - 1;
          break;
        case 12:
          Destination.setIsUsed();
          if(Deck.infamy === 1){
            Deck.infamy = Deck.infamy-1;
            Destination.setInfamy(Destination.getInfamy()+1);
            return;
          }
          Destination.setInfamy(Destination.getInfamy()+2);
          Deck.infamy = Deck.infamy-2;
          break;
        case 13:
          Destination.setGlory(Destination.getGlory()-1);
          Destination.setInfamy(Destination.getInfamy()-1);
          Deck.glory = Deck.glory + 1;
          Deck.infamy = Deck.infamy + 1;
          break;
        case 14:
          if(Deck.glory > Deck.infamy){
            Destination.setInfamy(Destination.getInfamy()+1);
            Deck.infamy = Deck.infamy-1;
          }
          else{
            Destination.setGlory(Destination.getGlory()+1);
            Deck.glory = Deck.glory - 1;
          }
          break;
        case 15:
          if(Deck.glory === 1){
            Destination.setGlory(Destination.getGlory()+1);
            Deck.glory =  Deck.glory-1;
          }
          else{
            Destination.setGlory(Destination.getGlory()+2);
            Deck.glory = Deck.glory - 2;
          }
          Destination.setInfamy(Destination.getInfamy()+1);
          Deck.infamy = Deck.infamy - 1;
          break;
        case 16:
          if(Deck.infamy === 1){
            Destination.setInfamy(Destination.getInfamy()+1);
            Deck.infamy = Deck.infamy - 1;
          }
          else{
            Destination.setInfamy(Destination.getInfamy()+2);
            Deck.infamy = Deck.infamy - 2;
          }
          Destination.setGlory(Destination.getGlory()+1);
          Deck.glory = Deck.glory - 1;
          break;
        default:
          break;
      }
    }
}
