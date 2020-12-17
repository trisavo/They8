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
})({"gameBoard.js":[function(require,module,exports) {
//sets name of users
var ELEMENTS_TO_HIDE_ON_LOAD = ['swordIcon', 'selectedCard', 'descriptionBox', 'actionButton1', 'actionButton2', 'actionButton3', 'playButton1', 'playButton2', 'cancelButton1', 'cancelButton2', 'startIconPlayerLeft', 'startIconPlayerRight', 'startIconPlayerBottom', 'infamyP1T1', 'gloryP1T1', 'infamyP1T2', 'gloryP1T2', 'infamyP2T1', 'gloryP2T1', 'infamyP2T2', 'gloryP2T2', 'infamyP3T1', 'gloryP3T1', 'infamyP3T2', 'gloryP3T2', 'poetryBar', 'poetry'];
var PLAYED_CARD_ID = "";
var ELEMENTS_TO_CHANGE_ON_TARGET_1 = ['targetButton2'];
var ELEMENTS_TO_CHANGE_ON_TARGET_2 = ['targetButton3'];
var ELEMENTS_TO_CHANGE_ON_TARGET_3 = ['targetButton4'];
var ELEMENTS_TO_CHANGE_ON_TARGET_4 = ['targetButton5'];
var ELEMENTS_TO_CHANGE_ON_TARGET_5 = ['targetButton6'];
var ELEMENTS_TO_CHANGE_ON_TARGET_6 = ['targetButton1'];
var ELEMENTS_TO_CHANGE_ON_TARGET2_1 = ['target2Button2'];
var ELEMENTS_TO_CHANGE_ON_TARGET2_2 = ['target2Button3'];
var ELEMENTS_TO_CHANGE_ON_TARGET2_3 = ['target2Button4'];
var ELEMENTS_TO_CHANGE_ON_TARGET2_4 = ['target2Button5'];
var ELEMENTS_TO_CHANGE_ON_TARGET2_5 = ['target2Button6'];
var ELEMENTS_TO_CHANGE_ON_TARGET2_6 = ['target2Button1'];
var VISIBLE_OPACITY = '0.6';

var setElementIsVisible = function setElementIsVisible(elementId, isVisible) {
  return document.getElementById(elementId).style.visibility = isVisible ? "visible" : "hidden";
};

var setElementHtml = function setElementHtml(elementId, html) {
  return document.getElementById(elementId).innerHTML = html;
};

var loadPage = function loadPage() {
  ELEMENTS_TO_HIDE_ON_LOAD.forEach(function (elementId) {
    return setElementIsVisible(elementId, false);
  });
  updateTimer();
};

var updatePlayedCard = function updatePlayedCard(sourceId) {
  if (sourceId == "actionButton1") {
    PLAYED_CARD_ID = "player1Card1";
  }

  if (sourceId == "actionButton2") {
    PLAYED_CARD_ID = "player1Card2";
  }

  if (sourceId == "actionButton3") {
    PLAYED_CARD_ID = "player1Card3";
  }
};

var updateTimer = function updateTimer() {
  timer = document.getElementById("timer");

  if (timer.innerHTML == 0) {
    timer.innerHTML = 60;
    setElementIsVisible("timer", true);
    setElementIsVisible("swordIcon", false);
  } else {
    if (timer.innerHTML == 1) {
      setElementIsVisible("timer", false);
      setElementIsVisible("swordIcon", true);
    }

    timer.innerHTML = timer.innerHTML - 1;
  }

  if (timer.innerHTML <= 10) {
    timer.style.color = "red";
  } else {
    timer.style.color = "black";
  }

  setTimeout(updateTimer, 1000);
};

var showSliderValue = function showSliderValue(value) {
  return setElementHtml('sliderValue', value);
};

var showName = function showName() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'NAME';
  return setElementHtml('actionCardName', name);
};

var hideName = function hideName() {
  return setElementHtml('actionCardName', '');
};

var showDescription = function showDescription() {
  var description = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'DESCRIPTION';
  setElementIsVisible("descriptionBox", true);
  setElementHtml('actionCardDescription', description);
};

var hideDescription = function hideDescription() {
  setElementIsVisible("descriptionBox", false);
  setElementHtml('actionCardDescription', '');
  setElementHtml('actionCardName', '');
};

var showActionButtons = function showActionButtons(id) {
  if (id == "player1Card1") {
    setElementIsVisible("actionButton1", true);
  } else if (id == "player1Card2") {
    setElementIsVisible("actionButton2", true);
  } else if (id == "player1Card3") {
    setElementIsVisible("actionButton3", true);
  }
};

var showTargetButtons = function showTargetButtons(id) {
  if (id == "player1Tile1") {
    ELEMENTS_TO_CHANGE_ON_TARGET_1.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  } else if (id == "player1Tile2") {
    ELEMENTS_TO_CHANGE_ON_TARGET_2.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  } else if (id == "player2Tile1") {
    ELEMENTS_TO_CHANGE_ON_TARGET_3.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  }

  if (id == "player2Tile2") {
    ELEMENTS_TO_CHANGE_ON_TARGET_4.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  } else if (id == "player3Tile1") {
    ELEMENTS_TO_CHANGE_ON_TARGET_5.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  } else if (id == "player3Tile2") {
    ELEMENTS_TO_CHANGE_ON_TARGET_6.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  }
};

var showSecondTargetButtons = function showSecondTargetButtons(id) {
  if (id == "player1Tile1") {
    ELEMENTS_TO_CHANGE_ON_TARGET2_1.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  } else if (id == "player1Tile2") {
    ELEMENTS_TO_CHANGE_ON_TARGET2_2.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  } else if (id == "player2Tile1") {
    ELEMENTS_TO_CHANGE_ON_TARGET2_3.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  }

  if (id == "player2Tile2") {
    ELEMENTS_TO_CHANGE_ON_TARGET2_4.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  } else if (id == "player3Tile1") {
    ELEMENTS_TO_CHANGE_ON_TARGET2_5.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  } else if (id == "player3Tile2") {
    ELEMENTS_TO_CHANGE_ON_TARGET2_6.forEach(function (elementId) {
      return setElementIsVisible(elementId, true);
    });
  }
};

document.addEventListener('input', function (event) {
  if (event.target.id !== 'colors') return;
  var color = event.target.value;
  var p2NameColor = document.getElementById("player2Name").style.color;
  var p3NameColor = document.getElementById("player3Name").style.color;

  if (color == p2NameColor || color == p3NameColor) {
    // this check does not work
    console.alert("Sorry, this color is taken by another player");
    return;
  }

  var playerName = document.getElementById("player1Name");
  var tile1 = document.getElementById("player1Tile1");
  var tile2 = document.getElementById("player1Tile2");

  if (color == "green") {
    var _setColor = rgb(34, 136, 51);
  } else if (color == "blue") {
    var _setColor2 = rgb(51, 187, 238);
  } else if (color == "red") {
    var _setColor3 = rgb(204, 51, 17);
  } else if (color == "purple") {
    var _setColor4 = rgb(238, 51, 119);
  }

  playerName.style.color = setColor; //setColor var does not work

  tile1.style.borderColor = setColor;
  tile2.style.borderColor = setColor;
}, false);

var showPoetry = function showPoetry() {
  poetry = document.getElementById("poetry");
  poetry.innerHTML = "Poetry"; // set to actual poetry here

  setElementIsVisible("poetryBar", true);
  setElementIsVisible("poetry", true);
};

var enlargeCard = function enlargeCard() {
  var selectedCard = document.getElementById("selectedCard");
  selectedCard.src = document.getElementById(PLAYED_CARD_ID).src;
  console.log(PLAYED_CARD_ID);
  selectedCard.style.visibility = "visible";
  setElementIsVisible("actionButton1", false);
  setElementIsVisible("actionButton2", false);
  setElementIsVisible("actionButton3", false);
  showPoetry();
  setTimeout(setElementIsVisible, 3000, "selectedCard", false);
  setTimeout(setElementIsVisible, 3000, "poetryBar", false);
  setTimeout(setElementIsVisible, 3000, "poetry", false);
}; // Hides the enlarged card and puts card in discard pile when card is played
// The player cancels the selected action card
// This function will show the "play tile?" play button for playing
// a God tile. It is not played immediatly bc it can only be played once.


var showTileButton = function showTileButton(isTile1) {
  var tile = document.getElementById(isTile1 ? 'player1Tile1' : 'player1Tile2');

  if (tile.style.opacity === VISIBLE_OPACITY) {
    return;
  }

  setElementIsVisible(isTile1 ? 'playButton1' : 'playButton2', true);
  setElementIsVisible(isTile1 ? 'cancelButton1' : 'cancelButton2', true);
}; // Plays the tile, making it slightly see-through indicating it has been used


var playTile = function playTile(isTile1) {
  var tile = document.getElementById(isTile1 ? 'player1Tile1' : 'player1Tile2');
  tile.style.opacity = VISIBLE_OPACITY;
  setElementIsVisible(isTile1 ? 'cancelButton1' : 'cancelButton2', false);
  setElementIsVisible(isTile1 ? 'playButton1' : 'playButton2', false);
}; // The player cancels their choice to play the God tile


var cancelTile = function cancelTile(isTile1) {
  // TODO: Do we need to set the tile's opacity back to !VISIBLE_OPACITY?
  setElementIsVisible(isTile1 ? 'cancelButton1' : 'cancelButton2', false);
  setElementIsVisible(isTile1 ? 'playButton1' : 'playButton2', false);
};

document.addEventListener("click", function (evt) {
  var card1 = document.getElementById("player1Card1");
  var card2 = document.getElementById("player1Card2");
  var card3 = document.getElementById("player1Card3");
  var c = evt.target; // clicked element

  do {
    if (c == card1 || c == card2 || c == card3) {
      // This is a click inside a card. Do nothing, just return.
      return;
    } // Go up the DOM


    c = c.parentNode;
  } while (c); // This is a click outside.


  setElementIsVisible("actionButton1", false);
  setElementIsVisible("actionButton2", false);
  setElementIsVisible("actionButton3", false);
  return;
}); //nav bar settings modalbutton

var gear = document.querySelector('.settings');
var modelbg1 = document.querySelector('.settingsmodal');
gear.addEventListener('click', function () {
  modelbg1.style.display = "flex";
});
document.querySelector('.closeSettings').addEventListener('click', function () {
  modelbg1.style.display = "none";
}); //nav bar home modalbutton

var home = document.querySelector('.quit');
modelbg = document.querySelector('.homemodal');
home.addEventListener('click', function () {
  modelbg.style.display = "flex";
  modelbg1.style.display = "none";
});
document.querySelector('.no').addEventListener('click', function () {
  modelbg.style.display = "none";
});
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","gameBoard.js"], null)
//# sourceMappingURL=/gameBoard.86b08cf7.js.map