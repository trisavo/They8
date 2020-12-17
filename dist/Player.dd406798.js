// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Player.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player(Username) {
    _classCallCheck(this, Player);

    this.username = Username;
    this.hand = []; //holds the action card in the Player's hand

    this.godTiles = []; //godTiles[0] === left God Tile, godTiles[1] == right God Tile

    this.turn = false;
  }

  _createClass(Player, [{
    key: "buzzer",
    value: function buzzer() {
      console.log("ACTIVATE YOUR GOD TILES"); //to be changed to a message statement that can be output to the user

      /*
          need to implement playTiles in GodTiles before running function
        */
    }
  }, {
    key: "getUsername",
    value: function getUsername() {
      return this.username;
    }
  }, {
    key: "addGodTile",
    value: function addGodTile(GodTile) {
      this.godTiles.push(GodTile);
      GodTile.setLoc(this.username);
    }
  }, {
    key: "addActionCard",
    value: function addActionCard(ActionCard) {
      //running into conflict where location of actionCard is not being set properly, needs review
      this.hand.push(ActionCard);
      ActionCard.setLoc(this.username);
    }
  }, {
    key: "getActionCard",
    value: function getActionCard(id) {
      for (var i = 0; i < hand.length; i++) {
        if (this.hand[i].getID() === id) return this.hand[i];
      }
    }
  }, {
    key: "getHand",
    value: function getHand() {
      return this.hand;
    }
  }, {
    key: "getGodTile",
    value: function getGodTile(side) {
      return this.godTiles[side];
    }
  }, {
    key: "removeActionCard",
    value: function removeActionCard(id) {
      var _this = this;

      var removedCard;

      for (var i = 0; i < this.hand.length; i++) {
        if (this.hand[i].getID() === id) {
          removedCard = this.hand[i];
          this.hand[i].setLoc("Discard");
          this.hand = this.hand.filter(function (item) {
            return item !== _this.hand[i];
          });
        }
      }

      return removedCard;
    }
  }, {
    key: "removeHand",
    value: function removeHand() {
      var removed = [];

      for (var i = this.hand.length - 1; i > -1; i--) {
        removed.push(this.hand[i]);
        this.hand[i].setLoc("Discard");
        this.hand.pop();
      }

      return removed;
    }
  }, {
    key: "getPlayableCards",
    value: function getPlayableCards(GodsInGame) {
      var playableCards = [];

      for (var i = 0; i < this.hand.length; i++) {
        if (this.hand[i].identifyTargets(GodsInGame).length != 0) playableCards.push(this.hand[i]);
      }

      return playableCards;
    }
  }, {
    key: "isTurn",
    value: function isTurn() {
      return this.turn;
    }
  }, {
    key: "setTurn",
    value: function setTurn() {
      this.turn != this.turn;
    }
  }, {
    key: "getLeftGodTile",
    value: function getLeftGodTile() {
      return this.godTiles[0];
    }
  }, {
    key: "getRightGodTile",
    value: function getRightGodTile() {
      return this.godTiles[1];
    }
  }, {
    key: "getRandomIndex",
    value: function getRandomIndex(range) {
      return Math.floor(Math.random() * range);
    }
  }, {
    key: "gamePlay",
    value: function gamePlay(GodsInGame, Deck) {
      var _this2 = this;

      var playableCards = this.getPlayableCards(GodsInGame);

      for (var i = 0; i < playableCards.length; i++) {
        if (playableCards[i].getID() === 14 && Deck.glory === Deck.infamy) {
          playableCards = playableCards.filter(function (item) {
            return item != playableCards[i];
          });
          break;
        }
      }

      console.log(playableCards);

      if (playableCards.length > 0) {
        //code will need to be changed to be able to take userInput on Selection of Card
        console.log("Randomly choosing a card to Play");
        var randomIndex = this.getRandomIndex(playableCards.length);
        console.log("Chosen card to play is:", playableCards[randomIndex]);
        var targets = playableCards[randomIndex].identifyTargets(GodsInGame); //end of needed to be changed code

        var initial, destination, nextDestination;

        if (playableCards[randomIndex].getID() === 11) {
          //requires 3 targets
          console.log("Entering 3 target selection..."); //this section requires user choice

          console.log("Choose left or right GodTile");
          initial = this.godTiles[this.getRandomIndex(2)];
          console.log("Chosen Tile is:", initial.getName());
          console.log("Tile before action:");
          console.log("   Glory:", initial.getGlory());
          console.log("   Infamy:", initial.getInfamy()); //end of first choice

          var possibleDest = GodsInGame.filter(function (item) {
            return item !== initial;
          });
          var initialLength = possibleDest.length;

          for (var i = 0; i < initialLength; i++) {
            possibleDest = possibleDest.filter(function (item) {
              return item != _this2.godTiles[0];
            });
            if (possibleDest.length != initialLength) break;
            possibleDest = possibleDest.filter(function (item) {
              return item != _this2.godTiles[1];
            });
            if (possibleDest.length != initialLength) break;
          } //requires second input


          console.log("Choose destination for Glory");
          destination = possibleDest[this.getRandomIndex(possibleDest.length)];
          console.log("Chosen Tile is:", destination.getName());
          console.log("Tile before action:");
          console.log("   Glory:", destination.getGlory());
          console.log("   Infamy:", destination.getInfamy()); //end of second input

          possibleDest = possibleDest.filter(function (item) {
            return item != destination;
          }); //requires third input

          console.log("Choose destination for Infamy");
          nextDestination = possibleDest[getRandomIndex(possibleDest.length)];
          console.log("Chosen Tile is:", nextDestination.getName());
          console.log("Tile before action:");
          console.log("   Glory:", nextDestination.getGlory());
          console.log("   Infamy:", nextDestination.getInfamy()); //end of third input

          playableCards[randomIndex].playActionCard3(initial, destination, nextDestination, Deck);
          console.log(initial.getName(), "after action:");
          console.log("   Glory:", initial.getGlory());
          console.log("   Infamy:", initial.getInfamy());
          console.log(destination.getName(), "after action:");
          console.log("   Glory:", destination.getGlory());
          console.log("   Infamy:", destination.getInfamy());
          console.log(nextDestination.getName(), "after action:");
          console.log("   Glory:", nextDestination.getGlory());
          console.log("   Infamy:", nextDestination.getInfamy());
          Deck.discard.push(playableCards[randomIndex]);
          this.removeActionCard(playableCards[randomIndex].getID());
        } else if (playableCards[randomIndex].getID() === 2 || playableCards[randomIndex].getID() === 4 || playableCards[randomIndex].getID() === 6) {
          //requires 2 targets
          console.log("Entering 2 target selection...");

          if (playableCards[randomIndex].getID() === 6) {
            console.log("using card with ID 6");
            var infamyTargets = [];
            var gloryTargets = [];

            for (var i = 0; i < targets.length; i++) {
              if (targets[i].getInfamy() > 0) infamyTargets.push(targets[i]);
              if (targets[i].getGlory() > 0) gloryTargets.push(targets[i]);
            }

            if (gloryTargets.length === 0 || infamyTargets.length === 0) {
              console.log("not enough targets in glory or infamy set of targets");
              return;
            } //will change because we need to take in user input with glory targets


            console.log("choose target to gain Glory and lose Infamy");
            initial = infamyTargets[this.getRandomIndex(infamyTargets.length)];
            console.log("Chosen Tile is:", initial.getName());
            console.log("Tile before action:");
            console.log("   Glory:", initial.getGlory());
            console.log("   Infamy:", initial.getInfamy()); //end of changes

            infamyTargets = infamyTargets.filter(function (item) {
              return item != initial;
            });

            if (infamyTargets.length === 0) {
              console.log("not enough targets in glory or infamy set of targets");
              return;
            } //will change based on user input


            console.log("choose target to gain Infamy and lose glory");
            destination = gloryTargets[this.getRandomIndex(gloryTargets.length)];
            console.log("Chosen Tile is:", destination.getName());
            console.log("Tile before action:");
            console.log("   Glory:", destination.getGlory());
            console.log("   Infamy:", destination.getInfamy()); //will change based on user input

            playableCards[randomIndex].playActionCard2(initial, destination, Deck);
            console.log(initial.getName(), "after action:");
            console.log("   Glory:", initial.getGlory());
            console.log("   Infamy:", initial.getInfamy());
            console.log(destination.getName(), "after action:");
            console.log("   Glory:", destination.getGlory());
            console.log("   Infamy:", destination.getInfamy());
            Deck.discard.push(playableCards[randomIndex]);
            this.removeActionCard(playableCards[randomIndex].getID());
          } else {
            console.log("using card with ID 2 or 4"); //to be changed, takes in first input

            var randomTarget = this.getRandomIndex(targets.length);
            initial = targets[randomTarget];
            console.log("Chosen Tile is:", initial.getName());
            console.log("   Glory:", initial.getGlory());
            console.log("   Infamy:", initial.getInfamy()); //end of first input

            possibleDest = GodsInGame.filter(function (item) {
              return item !== initial;
            }); //choosing second destination, requires user input

            console.log("choosing random destination");
            destination = possibleDest[this.getRandomIndex(possibleDest.length)];
            console.log("Chosen Tile is:", destination.getName());
            console.log("Tile before action:");
            console.log("   Glory:", destination.getGlory());
            console.log("   Infamy:", destination.getInfamy()); //end of second input

            playableCards[randomIndex].playActionCard2(initial, destination, Deck);
            console.log("initial Tile after action:");
            console.log("   Glory:", initial.getGlory());
            console.log("   Infamy:", initial.getInfamy());
            console.log("Destination Tile after action:");
            console.log("   Glory:", destination.getGlory());
            console.log("   Infamy:", destination.getInfamy());
            Deck.discard.push(playableCards[randomIndex]);
            this.removeActionCard(playableCards[randomIndex].getID());
          }
        } else {
          console.log("Entering 1 target selection..."); //userInput

          console.log("Choosing random target");
          destination = targets[this.getRandomIndex(targets.length)];
          console.log("Chosen Tile is", destination.getName());
          console.log("Tile before action:");
          console.log("   Glory:", destination.getGlory());
          console.log("   Infamy:", destination.getInfamy()); //end of user Input

          playableCards[randomIndex].playActionCard(destination, Deck);
          console.log("Tile after action:");
          console.log("   Glory:", destination.getGlory());
          console.log("   Infamy:", destination.getInfamy());
          Deck.discard.push(playableCards[randomIndex]);
          this.removeActionCard(playableCards[randomIndex].getID());
        }

        return true;
      } else {
        console.log("No Cards currently playable");
        return false;
      }
    }
  }]);

  return Player;
}();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49771" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Player.js"], null)
//# sourceMappingURL=/Player.dd406798.js.map