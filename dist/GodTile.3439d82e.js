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
})({"GodTile.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GodTile = /*#__PURE__*/function () {
  function GodTile(JSONCard) {
    _classCallCheck(this, GodTile);

    this.id = JSONCard.id;
    this.name = JSONCard.name;
    this.img = JSONCard.img;
    this.desc = JSONCard.desc;
    this.location = JSONCard.location;
    this.glory = 1;
    this.infamy = 2;
    this.IsUsed = false;
  }

  _createClass(GodTile, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "getID",
    value: function getID() {
      return this.id;
    }
  }, {
    key: "getImg",
    value: function getImg() {
      return this.name;
    }
  }, {
    key: "getDesc",
    value: function getDesc() {
      return this.desc;
    }
  }, {
    key: "getLoc",
    value: function getLoc() {
      return this.location;
    }
  }, {
    key: "setLoc",
    value: function setLoc(loc) {
      this.location = loc;
    }
  }, {
    key: "getGlory",
    value: function getGlory() {
      return this.glory;
    }
  }, {
    key: "setGlory",
    value: function setGlory(newGlo) {
      if (this.id === 8 && this.getIsUsed()) return;
      this.glory = newGlo;
    }
  }, {
    key: "getScore",
    value: function getScore() {
      return this.glory * 2 - this.infamy;
    }
  }, {
    key: "getInfamy",
    value: function getInfamy() {
      return this.infamy;
    }
  }, {
    key: "setInfamy",
    value: function setInfamy(newInf) {
      if (this.id === 8 && this.getIsUsed()) return;
      this.infamy = newInf;
    }
  }, {
    key: "getIsUsed",
    value: function getIsUsed() {
      return this.IsUsed;
    }
  }, {
    key: "setIsUsed",
    value: function setIsUsed() {
      if (this.id === 8 && this.getIsUsed()) return;
      this.IsUsed = !this.IsUsed;
      if (this.IsUsed) //if the God Tile has been used
        this.setInfamy(this.Infamy++);else //if the God Tile has been set back to False
        this.setInfamy(this.Infamy--);
    }
  }, {
    key: "getLoc",
    value: function getLoc() {
      return this.location;
    }
  }, {
    key: "pickRandom",
    value: function pickRandom(range) {
      return Math.floor(Math.random() * range);
    }
  }, {
    key: "playTile",
    value: function playTile(Phase, inGameTiles, Players, Deck) {
      //may very likely have to pass in an instance of Game
      if (this.getIsUsed()) return;

      switch (Phase) {
        case "Start":
          //PRAXIS
          this.setIsUsed();
          return;

        case "Before Player Action":
          if (this.id === 1) {
            //ANATOC
            var playerHands = new Deck("none");

            for (var i = 0; i < Players.length; i++) {
              //pushing all cards onto deck
              var removed = Players[i].removeHand();

              for (var j = 0; j < removed.length; j++) {
                playerHands.deck.push(removed[j]);
              }
            }

            playerHands.shuffle(); //shuffling all of their hands

            playerHands.deal(3, Players, "ActionCards");
            this.setIsUsed();
          } else if (this.id === 5) {
            //ENDYMINA
            for (var i = 0; i < Players.length; i++) {
              if (this.getLoc() === Player[i].getUsername() && !Player[i].getTurn()) {
                Player[i].addActionCard(Deck.getCard(0));
                Player[i].addActionCard(Deck.getCard(0)); //to be changed once finalize user choices

                var chosenCard1 = Player[i].getHand()[pickRandom(Player[i].getHand().length)]; //rest of code should be good

                var removedCard = Player[i].removeCard(chosenCard.getID());
                console.log("Removed Card:", removedCard);
                Player[i].addActionCard(chosenCard1); //to be changed once finalize user choices

                var chosenCard2 = Player[i].getHand()[pickRandom(Player[i].getHand().length)]; //rest of code should be good

                removedCard = Player[i].removeCard(chosenCard.getID());
                console.log("Removed Card:", removedCard);
                Player[i].addActionCard(chosenCard2);
                this.setIsUsed();
                return;
              }
            }
          }

          break;

        case "Renewal":
          if (this.id === 6) {
            //NANOS, IMPLEMENTED IN GAME LOOP
            this.setIsUsed();
          } else if (this.id === 4) {
            //CYMELE
            for (var i = 0; i < Players.length; i++) {
              if (this.getLoc() === Players[i].getUsername()) {
                var toDisplay = [];

                for (var i = 0; i < 4; i++) {
                  toDisplay.push(Deck.getIndex(0));
                } //display cards somehow, this part will be changed once we figure out how to display and log user choice


                var chosenCard = toDisplay[pickRandom(4)]; //end of unfinalized code

                Player[i].addActionCard(chosenCard);

                for (var j = 0; j < toDisplay.length; j++) {
                  Deck.deck.push(toDisplay[0]);
                  toDisplay = toDisplay.filter(function (item) {
                    return item !== toDisplay[0];
                  });
                }

                this.setIsUsed();
                return;
              }
            }
          }

          break;

        default:
          if (this.id === 2) {
            //ARISTIPHANE
            var nextTile, chosenTile; //have player pick two godTiles from godTiles

            chosenTile = inGameTiles[pickRandom(inGameTiles.length)];

            do {
              nextTile = inGameTiles[pickRandom(inGameTiles.length)];
            } while (nextTile === chosenTile); //end of user Selection
            //swapping Glory


            var temp = nextTile.getGlory();
            nextTile.setGlory(chosenTile.getGlory());
            chosenTile.setGlory(temp); //swapping Infamy

            var temp = nextTile.getInfamy();
            nextTile.setInfamy(chosenTile.getInfamy());
            chosenTile.setInfamy(temp);
            this.setIsUsed();
            return;
          } else if (this.id === 3) {
            //CASSANA
            var targets = [];

            for (var i = 0; i < inGameTiles.length; i++) {
              if (inGameTiles[i].getGlory() > 4) targets.push(inGameTiles[i]);
            } //display targets, this block is subject to change


            if (targets.length != 0) {
              //picking random choice
              var randomTarget = pickRandom(targets.length); //end of random choice

              targets[randomTarget].setGlory(targets[randomTarget].getGlory + 1);
              this.setIsUsed();
            }

            return;
          } else if (this.id === 7) {
            //PITON
            var targets = [];

            for (var i = 0; i < inGameTiles.length; i++) {
              if (!inGameTiles[i].getIsUsed()) targets.push(inGameTiles[i]);
            }

            if (targets.length != 0) {
              //picking random choice, this should be the player's choice
              var randomTarget = pickRandom(targets.length); //end of to be changed code

              console.log("chose to use", targets[randomTarget].getName() + "\'s power");
              this.id = targets[randomTarget].getID();
              this.playTile(Phase, inGameTiles, Players, Deck); //recursive call with new id to use power of chosen Tile

              this.id = 7;
            }

            return;
          } else if (this.id === 9) {//RYMON
            //need to do a check within the game in order to call the method, will have to add buzzer for user at the moment in which actionCard is Played
          }

          break;
      }
    }
  }]);

  return GodTile;
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","GodTile.js"], null)
//# sourceMappingURL=/GodTile.3439d82e.js.map