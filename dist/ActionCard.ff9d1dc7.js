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
})({"ActionCard.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ActionCard = /*#__PURE__*/function () {
  function ActionCard(JSONCard) {
    _classCallCheck(this, ActionCard);

    this.id = JSONCard.id;
    this.name = JSONCard.name;
    this.img = JSONCard.img;
    this.desc = JSONCard.desc;
    this.acttext = JSONCard.acttext;
    this.target = JSONCard.target;
    this.location = JSONCard.location;
    this.isPlayer = false;
  }

  _createClass(ActionCard, [{
    key: "getID",
    value: function getID() {
      return this.id;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "getIMG",
    value: function getIMG() {
      return this.img;
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
    value: function setLoc(newLoc) {
      this.location = newLoc;
    }
  }, {
    key: "getAction",
    value: function getAction() {
      return this.acttext;
    }
  }, {
    key: "getTarget",
    value: function getTarget() {
      return this.target;
    } //  playActionCard(target, godDeck){
    //	target.infamy +=1;
    //	target.glory +=1;
    //	godDeck.infamy -=1;
    //	godDeck.glory -=1;
    //  updateGI();
    //  hideTargets();
    //  this.location = "Deck";
    //this.isPlayer = true;
    //reverseCard("player1Card1");
    //  }

  }, {
    key: "identifyTargets",
    value: function identifyTargets(GodTiles) {
      var targets = [];

      if (this.id === 1 || this.id === 4) {
        for (var i = 0; i < GodTiles.length; i++) {
          if (GodTiles[i].getGlory() > 0 && GodTiles[i].getLoc() != this.getLoc()) targets.push(GodTiles[i]);
        }

        if (this.id === 4 && targets.length < 2) targets = [];
        return targets;
      } else if (this.id === 2 || this.id === 9) {
        for (var i = 0; i < GodTiles.length; i++) {
          if (GodTiles[i].getInfamy() > 0 && GodTiles[i].getLoc() != this.getLoc()) targets.push(GodTiles[i]);
        }

        if (this.id === 2 && targets.length < 2) targets = [];
        return targets;
      } else if (this.id === 3 || this.id === 5 || this.id === 7 || this.id === 8 || this.id === 10 || this.id === 15 || this.id === 16) {
        for (var i = 0; i < GodTiles.length; i++) {
          if (GodTiles[i].getLoc() != this.getLoc()) targets.push(GodTiles[i]);
        }

        return targets;
      } else if (this.id === 6) {
        //need to add more specific cases
        var gloryTargets = [];
        var infamyTargets = [];

        for (var i = 0; i < GodTiles.length; i++) {
          if (GodTiles[i].getGlory() > 0 || GodTiles[i].getInfamy() > 0) targets.push(GodTiles[i]);
        }

        for (var i = 0; i < targets.length; i++) {
          if (targets[i].getGlory > 0) gloryTargets.push(targets[i]);
          if (targets[i].getInfamy > 0) infamyTargets.push(targets[i]);
        }

        if (targets.length < 1 || gloryTargets.length < 0 || infamyTargets.length < 0) targets = [];
        return targets;
      } else if (this.id === 11 || this.id === 13) {
        for (var i = 0; i < GodTiles.length; i++) {
          if (GodTiles[i].getLoc() === this.getLoc() && GodTiles[i].getGlory() > 0 && GodTiles[i].getInfamy() > 0) targets.push(GodTiles[i]);
        }

        return targets;
      } else if (this.id === 12) {
        for (var i = 0; i < GodTiles.length; i++) {
          if (GodTiles[i].getLoc() === this.getLoc() && GodTiles[i].getIsUsed()) targets.push(GodTiles[i]);
        }

        return targets;
      } else if (this.id === 14) return GodTiles;else return targets;
    }
  }, {
    key: "playActionCard3",
    value: function playActionCard3(Origin, gloryTarget, infamyTarget, Deck) {
      if (this.id === 11) {
        Origin.setInfamy(Origin.getInfamy() - 1);
        Origin.setGlory(Origin.getGlory() - 1);
        gloryTarget.setGlory(gloryTarget.getGlory() + 1);
        infamyTarget.setInfamy(infamyTarget.setInfamy() + 1);
      }
    }
  }, {
    key: "playActionCard2",
    value: function playActionCard2(Origin, Destination, Deck) {
      if (this.id === 6) {
        //intial is glory, destination is infamy
        Origin.setGlory(Origin.getGlory() + 1); //gains Glory

        Origin.setInfamy(Origin.getInfamy() - 1); //loses Infamy

        Destination.setGlory(Destination.getGlory() - 1); //loses glory

        Destination.setInfamy(Destination.getInfamy() + 1); //gains Infamy
      } else if (this.id === 2) {
        Origin.setInfamy(Origin.getInfamy() - 1);
        Destination.setInfamy(Destination.getInfamy() + 1);
      } else if (this.id === 4) {
        Origin.setGlory(Origin.getGlory() - 1);
        Destination.setGlory(Destination.getGlory() + 1);
      }
    }
  }, {
    key: "playActionCard",
    value: function playActionCard(Destination, Deck) {
      switch (this.id) {
        case 1:
          Destination.setGlory(Destination.getGlory() - 1);
          Deck.glory = Deck.glory + 1;
          break;

        case 3:
          Destination.setInfamy(Destination.getInfamy() + 2);
          Deck.infamy = Deck.infamy - 2;
          break;

        case 5:
          Destination.setGlory(Destination.getGlory() + 2);
          Deck.glory = Deck.glory - 2;
          break;

        case 7:
          Destination.setGlory(Destination.getGlory() + 1);
          Destination.setInfamy(Destination.getInfamy() + 1);
          Deck.infamy = Deck.infamy - 1;
          Deck.glory = Deck.glory - 1;
          break;

        case 8:
          Destination.setGlory(Destination.getGlory() + 1);
          Deck.glory = Deck.glory - 1;
          break;

        case 9:
          Destination.setInfamy(Destination.getInfamy() - 1);
          Deck.infamy = Deck.infamy + 1;
          break;

        case 10:
          Destination.setInfamy(Destination.getInfamy() + 1);
          Deck.infamy = Deck.infamy - 1;
          break;

        case 12:
          Destination.setIsUsed();
          Destination.setInfamy(Destination.getInfamy() + 2);
          break;

        case 13:
          Destination.setGlory(Destination.getGlory() - 1);
          Destination.setInfamy(Destination.getInfamy() - 1);
          Deck.glory = Deck.glory + 1;
          Deck.infamy = Deck.infamy + 1;
          break;

        case 14:
          if (Deck.glory > Deck.infamy) {
            Destination.setInfamy(Destination.getInfamy() + 1);
            Deck.infamy = Deck.infamy - 1;
          } else {
            Destination.setGlory(Destination.getGlory() + 1);
            Deck.glory = Deck.glory - 1;
          }

          break;

        case 15:
          Destination.setGlory(Destination.getGlory() + 2);
          Destination.setInfamy(Destination.getInfamy() + 1);
          Deck.glory = Deck.glory - 2;
          Deck.infamy = Deck.infamy - 1;
          break;

        case 16:
          Destination.setGlory(Destination.getGlory() + 1);
          Destination.setInfamy(Destination.getInfamy() + 2);
          Deck.infamy = Deck.infamy - 2;
          Deck.glory = Deck.glory - 1;
          break;

        default:
          break;
      }
    }
  }]);

  return ActionCard;
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ActionCard.js"], null)
//# sourceMappingURL=/ActionCard.ff9d1dc7.js.map