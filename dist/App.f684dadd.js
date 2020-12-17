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
})({"node_modules/symbol-observable/es/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

;
},{}],"node_modules/symbol-observable/es/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ponyfill = _interopRequireDefault(require("./ponyfill.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill.default)(root);
var _default = result;
exports.default = _default;
},{"./ponyfill.js":"node_modules/symbol-observable/es/ponyfill.js"}],"node_modules/redux/es/redux.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.createStore = createStore;
exports.__DO_NOT_USE__ActionTypes = void 0;

var _symbolObservable = _interopRequireDefault(require("symbol-observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

exports.__DO_NOT_USE__ActionTypes = ActionTypes;

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[_symbolObservable.default] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable.default] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */


function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}
},{"symbol-observable":"node_modules/symbol-observable/es/index.js"}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/immer/dist/immer.module.js":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.original = original;
exports.isDraft = isDraft;
exports.isDraftable = isDraftable;
exports.default = exports.immerable = exports.nothing = exports.Immer = exports.applyPatches = exports.setUseProxies = exports.setAutoFreeze = exports.produce = void 0;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var NOTHING = typeof Symbol !== "undefined" ? Symbol("immer-nothing") : defineProperty({}, "immer-nothing", true);
exports.nothing = NOTHING;
var DRAFTABLE = typeof Symbol !== "undefined" ? Symbol("immer-draftable") : "__$immer_draftable";
exports.immerable = DRAFTABLE;
var DRAFT_STATE = typeof Symbol !== "undefined" ? Symbol("immer-state") : "__$immer_state";

function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}

function isDraftable(value) {
  if (!value || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object") return false;
  if (Array.isArray(value)) return true;
  var proto = Object.getPrototypeOf(value);
  if (!proto || proto === Object.prototype) return true;
  return !!value[DRAFTABLE] || !!value.constructor[DRAFTABLE];
}

function original(value) {
  if (value && value[DRAFT_STATE]) {
    return value[DRAFT_STATE].base;
  } // otherwise return undefined

}

var assign = Object.assign || function assign(target, value) {
  for (var key in value) {
    if (has(value, key)) {
      target[key] = value[key];
    }
  }

  return target;
};

var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : typeof Object.getOwnPropertySymbols !== "undefined" ? function (obj) {
  return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
} : Object.getOwnPropertyNames;

function shallowCopy(base) {
  var invokeGetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (Array.isArray(base)) return base.slice();
  var clone = Object.create(Object.getPrototypeOf(base));
  ownKeys(base).forEach(function (key) {
    if (key === DRAFT_STATE) {
      return; // Never copy over draft state.
    }

    var desc = Object.getOwnPropertyDescriptor(base, key);

    if (desc.get) {
      if (!invokeGetters) {
        throw new Error("Immer drafts cannot have computed properties");
      }

      desc.value = desc.get.call(base);
    }

    if (desc.enumerable) {
      clone[key] = desc.value;
    } else {
      Object.defineProperty(clone, key, {
        value: desc.value,
        writable: true,
        configurable: true
      });
    }
  });
  return clone;
}

function each(value, cb) {
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      cb(i, value[i], value);
    }
  } else {
    ownKeys(value).forEach(function (key) {
      return cb(key, value[key], value);
    });
  }
}

function isEnumerable(base, prop) {
  return Object.getOwnPropertyDescriptor(base, prop).enumerable;
}

function has(thing, prop) {
  return Object.prototype.hasOwnProperty.call(thing, prop);
}

function is(x, y) {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
} // @ts-check


var descriptors = {}; // For nested produce calls:

var scopes = [];

var currentScope = function currentScope() {
  return scopes[scopes.length - 1];
};

function willFinalize(result, baseDraft, needPatches) {
  var scope = currentScope();
  scope.forEach(function (state) {
    return state.finalizing = true;
  });

  if (result === undefined || result === baseDraft) {
    if (needPatches) markChangesRecursively(baseDraft); // This is faster when we don't care about which attributes changed.

    markChangesSweep(scope);
  }
}

function createDraft(base, parent) {
  var isArray = Array.isArray(base);
  var draft = clonePotentialDraft(base);
  each(draft, function (prop) {
    proxyProperty(draft, prop, isArray || isEnumerable(base, prop));
  }); // See "proxy.js" for property documentation.

  var state = {
    scope: parent ? parent.scope : currentScope(),
    modified: false,
    finalizing: false,
    // es5 only
    finalized: false,
    assigned: {},
    parent: parent,
    base: base,
    draft: draft,
    copy: null,
    revoke: revoke,
    revoked: false // es5 only

  };
  createHiddenProperty(draft, DRAFT_STATE, state);
  state.scope.push(state);
  return draft;
}

function revoke() {
  this.revoked = true;
}

function source(state) {
  return state.copy || state.base;
}

function _get(state, prop) {
  assertUnrevoked(state);
  var value = source(state)[prop]; // Drafts are only created for proxyable values that exist in the base state.

  if (!state.finalizing && value === state.base[prop] && isDraftable(value)) {
    prepareCopy(state);
    return state.copy[prop] = createDraft(value, state);
  }

  return value;
}

function _set(state, prop, value) {
  assertUnrevoked(state);
  state.assigned[prop] = true;

  if (!state.modified) {
    if (is(source(state)[prop], value)) return;
    markChanged(state);
    prepareCopy(state);
  }

  state.copy[prop] = value;
}

function markChanged(state) {
  if (!state.modified) {
    state.modified = true;
    if (state.parent) markChanged(state.parent);
  }
}

function prepareCopy(state) {
  if (!state.copy) state.copy = clonePotentialDraft(state.base);
}

function clonePotentialDraft(base) {
  var state = base && base[DRAFT_STATE];

  if (state) {
    state.finalizing = true;
    var draft = shallowCopy(state.draft, true);
    state.finalizing = false;
    return draft;
  }

  return shallowCopy(base);
}

function proxyProperty(draft, prop, enumerable) {
  var desc = descriptors[prop];

  if (desc) {
    desc.enumerable = enumerable;
  } else {
    descriptors[prop] = desc = {
      configurable: true,
      enumerable: enumerable,
      get: function get$$1() {
        return _get(this[DRAFT_STATE], prop);
      },
      set: function set$$1(value) {
        _set(this[DRAFT_STATE], prop, value);
      }
    };
  }

  Object.defineProperty(draft, prop, desc);
}

function assertUnrevoked(state) {
  if (state.revoked === true) throw new Error("Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + JSON.stringify(source(state)));
} // This looks expensive, but only proxies are visited, and only objects without known changes are scanned.


function markChangesSweep(scope) {
  // The natural order of drafts in the `scope` array is based on when they
  // were accessed. By processing drafts in reverse natural order, we have a
  // better chance of processing leaf nodes first. When a leaf node is known to
  // have changed, we can avoid any traversal of its ancestor nodes.
  for (var i = scope.length - 1; i >= 0; i--) {
    var state = scope[i];

    if (state.modified === false) {
      if (Array.isArray(state.base)) {
        if (hasArrayChanges(state)) markChanged(state);
      } else if (hasObjectChanges(state)) markChanged(state);
    }
  }
}

function markChangesRecursively(object) {
  if (!object || (typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object") return;
  var state = object[DRAFT_STATE];
  if (!state) return;
  var base = state.base,
      draft = state.draft,
      assigned = state.assigned;

  if (!Array.isArray(object)) {
    // Look for added keys.
    Object.keys(draft).forEach(function (key) {
      // The `undefined` check is a fast path for pre-existing keys.
      if (base[key] === undefined && !has(base, key)) {
        assigned[key] = true;
        markChanged(state);
      } else if (!assigned[key]) {
        // Only untouched properties trigger recursion.
        markChangesRecursively(draft[key]);
      }
    }); // Look for removed keys.

    Object.keys(base).forEach(function (key) {
      // The `undefined` check is a fast path for pre-existing keys.
      if (draft[key] === undefined && !has(draft, key)) {
        assigned[key] = false;
        markChanged(state);
      }
    });
  } else if (hasArrayChanges(state)) {
    markChanged(state);
    assigned.length = true;

    if (draft.length < base.length) {
      for (var i = draft.length; i < base.length; i++) {
        assigned[i] = false;
      }
    } else {
      for (var _i = base.length; _i < draft.length; _i++) {
        assigned[_i] = true;
      }
    }

    for (var _i2 = 0; _i2 < draft.length; _i2++) {
      // Only untouched indices trigger recursion.
      if (assigned[_i2] === undefined) markChangesRecursively(draft[_i2]);
    }
  }
}

function hasObjectChanges(state) {
  var base = state.base,
      draft = state.draft; // Search for added keys. Start at the back, because non-numeric keys
  // are ordered by time of definition on the object.

  var keys = Object.keys(draft);

  for (var i = keys.length - 1; i >= 0; i--) {
    // The `undefined` check is a fast path for pre-existing keys.
    if (base[keys[i]] === undefined && !has(base, keys[i])) {
      return true;
    }
  } // Since no keys have been added, we can compare lengths to know if an
  // object has been deleted.


  return keys.length !== Object.keys(base).length;
}

function hasArrayChanges(state) {
  var draft = state.draft;
  if (draft.length !== state.base.length) return true; // See #116
  // If we first shorten the length, our array interceptors will be removed.
  // If after that new items are added, result in the same original length,
  // those last items will have no intercepting property.
  // So if there is no own descriptor on the last position, we know that items were removed and added
  // N.B.: splice, unshift, etc only shift values around, but not prop descriptors, so we only have to check
  // the last one

  var descriptor = Object.getOwnPropertyDescriptor(draft, draft.length - 1); // descriptor can be null, but only for newly created sparse arrays, eg. new Array(10)

  if (descriptor && !descriptor.get) return true; // For all other cases, we don't have to compare, as they would have been picked up by the index setters

  return false;
}

function createHiddenProperty(target, prop, value) {
  Object.defineProperty(target, prop, {
    value: value,
    enumerable: false,
    writable: true
  });
}

var legacyProxy = Object.freeze({
  scopes: scopes,
  currentScope: currentScope,
  willFinalize: willFinalize,
  createDraft: createDraft
}); // @ts-check
// For nested produce calls:

var scopes$1 = [];

var currentScope$1 = function currentScope() {
  return scopes$1[scopes$1.length - 1];
}; // Do nothing before being finalized.


function willFinalize$1() {}

function createDraft$1(base, parent) {
  var state = {
    // Track which produce call this is associated with.
    scope: parent ? parent.scope : currentScope$1(),
    // True for both shallow and deep changes.
    modified: false,
    // Used during finalization.
    finalized: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned: {},
    // The parent draft state.
    parent: parent,
    // The base state.
    base: base,
    // The base proxy.
    draft: null,
    // Any property proxies.
    drafts: {},
    // The base copy with any updated values.
    copy: null,
    // Called by the `produce` function.
    revoke: null
  };

  var _ref = Array.isArray(base) ? Proxy.revocable([state], arrayTraps) : Proxy.revocable(state, objectTraps),
      revoke = _ref.revoke,
      proxy = _ref.proxy;

  state.draft = proxy;
  state.revoke = revoke;
  state.scope.push(state);
  return proxy;
}

var objectTraps = {
  get: get$1,
  has: function has$$1(target, prop) {
    return prop in source$1(target);
  },
  ownKeys: function ownKeys$$1(target) {
    return Reflect.ownKeys(source$1(target));
  },
  set: set$1,
  deleteProperty: deleteProperty,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  defineProperty: function defineProperty() {
    throw new Error("Object.defineProperty() cannot be used on an Immer draft"); // prettier-ignore
  },
  getPrototypeOf: function getPrototypeOf(target) {
    return Object.getPrototypeOf(target.base);
  },
  setPrototypeOf: function setPrototypeOf() {
    throw new Error("Object.setPrototypeOf() cannot be used on an Immer draft"); // prettier-ignore
  }
};
var arrayTraps = {};
each(objectTraps, function (key, fn) {
  arrayTraps[key] = function () {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});

arrayTraps.deleteProperty = function (state, prop) {
  if (isNaN(parseInt(prop))) {
    throw new Error("Immer only supports deleting array indices"); // prettier-ignore
  }

  return objectTraps.deleteProperty.call(this, state[0], prop);
};

arrayTraps.set = function (state, prop, value) {
  if (prop !== "length" && isNaN(parseInt(prop))) {
    throw new Error("Immer only supports setting array indices and the 'length' property"); // prettier-ignore
  }

  return objectTraps.set.call(this, state[0], prop, value);
};

function source$1(state) {
  return state.copy || state.base;
}

function get$1(state, prop) {
  if (prop === DRAFT_STATE) return state;
  var drafts = state.drafts; // Check for existing draft in unmodified state.

  if (!state.modified && has(drafts, prop)) {
    return drafts[prop];
  }

  var value = source$1(state)[prop];
  if (state.finalized || !isDraftable(value)) return value; // Check for existing draft in modified state.

  if (state.modified) {
    // Assigned values are never drafted. This catches any drafts we created, too.
    if (value !== state.base[prop]) return value; // Store drafts on the copy (when one exists).

    drafts = state.copy;
  }

  return drafts[prop] = createDraft$1(value, state);
}

function set$1(state, prop, value) {
  if (!state.modified) {
    // Optimize based on value's truthiness. Truthy values are guaranteed to
    // never be undefined, so we can avoid the `in` operator. Lastly, truthy
    // values may be drafts, but falsy values are never drafts.
    var isUnchanged = value ? is(state.base[prop], value) || value === state.drafts[prop] : is(state.base[prop], value) && prop in state.base;
    if (isUnchanged) return true;
    markChanged$1(state);
  }

  state.assigned[prop] = true;
  state.copy[prop] = value;
  return true;
}

function deleteProperty(state, prop) {
  // The `undefined` check is a fast path for pre-existing keys.
  if (state.base[prop] !== undefined || prop in state.base) {
    state.assigned[prop] = false;
    markChanged$1(state);
  }

  if (state.copy) delete state.copy[prop];
  return true;
}

function getOwnPropertyDescriptor(state, prop) {
  var owner = source$1(state);
  var desc = Reflect.getOwnPropertyDescriptor(owner, prop);

  if (desc) {
    desc.writable = true;
    desc.configurable = !Array.isArray(owner) || prop !== "length";
  }

  return desc;
}

function markChanged$1(state) {
  if (!state.modified) {
    state.modified = true;
    state.copy = assign(shallowCopy(state.base), state.drafts);
    state.drafts = null;
    if (state.parent) markChanged$1(state.parent);
  }
}

var modernProxy = Object.freeze({
  scopes: scopes$1,
  currentScope: currentScope$1,
  willFinalize: willFinalize$1,
  createDraft: createDraft$1
});

function generatePatches(state, basePath, patches, inversePatches) {
  Array.isArray(state.base) ? generateArrayPatches(state, basePath, patches, inversePatches) : generateObjectPatches(state, basePath, patches, inversePatches);
}

function generateArrayPatches(state, basePath, patches, inversePatches) {
  var base = state.base,
      copy = state.copy,
      assigned = state.assigned;
  var minLength = Math.min(base.length, copy.length); // Look for replaced indices.

  for (var i = 0; i < minLength; i++) {
    if (assigned[i] && base[i] !== copy[i]) {
      var path = basePath.concat(i);
      patches.push({
        op: "replace",
        path: path,
        value: copy[i]
      });
      inversePatches.push({
        op: "replace",
        path: path,
        value: base[i]
      });
    }
  } // Did the array expand?


  if (minLength < copy.length) {
    for (var _i = minLength; _i < copy.length; _i++) {
      patches.push({
        op: "add",
        path: basePath.concat(_i),
        value: copy[_i]
      });
    }

    inversePatches.push({
      op: "replace",
      path: basePath.concat("length"),
      value: base.length
    });
  } // ...or did it shrink?
  else if (minLength < base.length) {
      patches.push({
        op: "replace",
        path: basePath.concat("length"),
        value: copy.length
      });

      for (var _i2 = minLength; _i2 < base.length; _i2++) {
        inversePatches.push({
          op: "add",
          path: basePath.concat(_i2),
          value: base[_i2]
        });
      }
    }
}

function generateObjectPatches(state, basePath, patches, inversePatches) {
  var base = state.base,
      copy = state.copy;
  each(state.assigned, function (key, assignedValue) {
    var origValue = base[key];
    var value = copy[key];
    var op = !assignedValue ? "remove" : key in base ? "replace" : "add";
    if (origValue === value && op === "replace") return;
    var path = basePath.concat(key);
    patches.push(op === "remove" ? {
      op: op,
      path: path
    } : {
      op: op,
      path: path,
      value: value
    });
    inversePatches.push(op === "add" ? {
      op: "remove",
      path: path
    } : op === "remove" ? {
      op: "add",
      path: path,
      value: origValue
    } : {
      op: "replace",
      path: path,
      value: origValue
    });
  });
}

function applyPatches(draft, patches) {
  for (var i = 0; i < patches.length; i++) {
    var patch = patches[i];
    var path = patch.path;

    if (path.length === 0 && patch.op === "replace") {
      draft = patch.value;
    } else {
      var base = draft;

      for (var _i3 = 0; _i3 < path.length - 1; _i3++) {
        base = base[path[_i3]];
        if (!base || (typeof base === "undefined" ? "undefined" : _typeof(base)) !== "object") throw new Error("Cannot apply patch, path doesn't resolve: " + path.join("/")); // prettier-ignore
      }

      var key = path[path.length - 1];

      switch (patch.op) {
        case "replace":
        case "add":
          // TODO: add support is not extensive, it does not support insertion or `-` atm!
          base[key] = patch.value;
          break;

        case "remove":
          if (Array.isArray(base)) {
            if (key !== base.length - 1) throw new Error("Only the last index of an array can be removed, index: " + key + ", length: " + base.length); // prettier-ignore

            base.length -= 1;
          } else {
            delete base[key];
          }

          break;

        default:
          throw new Error("Unsupported patch operation: " + patch.op);
      }
    }
  }

  return draft;
}

function verifyMinified() {}

var configDefaults = {
  useProxies: typeof Proxy !== "undefined" && typeof Reflect !== "undefined",
  autoFreeze: typeof process !== "undefined" ? "development" !== "production" : verifyMinified.name === "verifyMinified",
  onAssign: null,
  onDelete: null,
  onCopy: null
};

var Immer = function () {
  function Immer(config) {
    classCallCheck(this, Immer);
    assign(this, configDefaults, config);
    this.setUseProxies(this.useProxies);
    this.produce = this.produce.bind(this);
  }

  createClass(Immer, [{
    key: "produce",
    value: function produce(base, recipe, patchListener) {
      var _this = this; // curried invocation


      if (typeof base === "function" && typeof recipe !== "function") {
        var defaultBase = recipe;
        recipe = base; // prettier-ignore

        return function () {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultBase;
          return _this.produce(base, function (draft) {
            var _recipe;

            return (_recipe = recipe).call.apply(_recipe, [draft, draft].concat(args));
          });
        };
      } // prettier-ignore


      {
        if (typeof recipe !== "function") throw new Error("if first argument is not a function, the second argument to produce should be a function");
        if (patchListener !== undefined && typeof patchListener !== "function") throw new Error("the third argument of a producer should not be set or a function");
      }
      var result = void 0; // Only create proxies for plain objects/arrays.

      if (!isDraftable(base)) {
        result = recipe(base);
        if (result === undefined) return base;
      } // The given value must be proxied.
      else {
          this.scopes.push([]);
          var baseDraft = this.createDraft(base);

          try {
            result = recipe.call(baseDraft, baseDraft);
            this.willFinalize(result, baseDraft, !!patchListener); // Never generate patches when no listener exists.

            var patches = patchListener && [],
                inversePatches = patchListener && []; // Finalize the modified draft...

            if (result === undefined || result === baseDraft) {
              result = this.finalize(baseDraft, [], patches, inversePatches);
            } // ...or use a replacement value.
            else {
                // Users must never modify the draft _and_ return something else.
                if (baseDraft[DRAFT_STATE].modified) throw new Error("An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft."); // prettier-ignore
                // Finalize the replacement in case it contains (or is) a subset of the draft.

                if (isDraftable(result)) result = this.finalize(result);

                if (patchListener) {
                  patches.push({
                    op: "replace",
                    path: [],
                    value: result
                  });
                  inversePatches.push({
                    op: "replace",
                    path: [],
                    value: base
                  });
                }
              }
          } finally {
            this.currentScope().forEach(function (state) {
              return state.revoke();
            });
            this.scopes.pop();
          }

          patchListener && patchListener(patches, inversePatches);
        } // Normalize the result.


      return result === NOTHING ? undefined : result;
    }
  }, {
    key: "setAutoFreeze",
    value: function setAutoFreeze(value) {
      this.autoFreeze = value;
    }
  }, {
    key: "setUseProxies",
    value: function setUseProxies(value) {
      this.useProxies = value;
      assign(this, value ? modernProxy : legacyProxy);
    }
  }, {
    key: "applyPatches",
    value: function applyPatches$$1(base, patches) {
      // Mutate the base state when a draft is passed.
      if (isDraft(base)) {
        return applyPatches(base, patches);
      } // Otherwise, produce a copy of the base state.


      return this.produce(base, function (draft) {
        return applyPatches(draft, patches);
      });
    }
    /**
     * @internal
     * Finalize a draft, returning either the unmodified base state or a modified
     * copy of the base state.
     */

  }, {
    key: "finalize",
    value: function finalize(draft, path, patches, inversePatches) {
      var _this2 = this;

      var state = draft[DRAFT_STATE];

      if (!state) {
        if (Object.isFrozen(draft)) return draft;
        return this.finalizeTree(draft);
      } // Never finalize drafts owned by an outer scope.


      if (state.scope !== this.currentScope()) {
        return draft;
      }

      if (!state.modified) return state.base;

      if (!state.finalized) {
        state.finalized = true;
        this.finalizeTree(state.draft, path, patches, inversePatches);

        if (this.onDelete) {
          // The `assigned` object is unreliable with ES5 drafts.
          if (this.useProxies) {
            var assigned = state.assigned;

            for (var prop in assigned) {
              if (!assigned[prop]) this.onDelete(state, prop);
            }
          } else {
            var base = state.base,
                copy = state.copy;
            each(base, function (prop) {
              if (!has(copy, prop)) _this2.onDelete(state, prop);
            });
          }
        }

        if (this.onCopy) this.onCopy(state); // Nested producers must never auto-freeze their result,
        // because it may contain drafts from parent producers.

        if (this.autoFreeze && this.scopes.length === 1) {
          Object.freeze(state.copy);
        }

        if (patches) generatePatches(state, path, patches, inversePatches);
      }

      return state.copy;
    }
    /**
     * @internal
     * Finalize all drafts in the given state tree.
     */

  }, {
    key: "finalizeTree",
    value: function finalizeTree(root, path, patches, inversePatches) {
      var _this3 = this;

      var state = root[DRAFT_STATE];

      if (state) {
        if (!this.useProxies) {
          state.finalizing = true;
          state.copy = shallowCopy(state.draft, true);
          state.finalizing = false;
        }

        root = state.copy;
      }

      var onAssign = this.onAssign;

      var finalizeProperty = function finalizeProperty(prop, value, parent) {
        if (value === parent) {
          throw Error("Immer forbids circular references");
        } // The only possible draft (in the scope of a `finalizeTree` call) is the `root` object.


        var inDraft = !!state && parent === root;

        if (isDraft(value)) {
          value = // Patches are never generated for assigned properties.
          patches && inDraft && !state.assigned[prop] ? _this3.finalize(value, path.concat(prop), patches, inversePatches) // prettier-ignore
          : _this3.finalize(value); // Preserve non-enumerable properties.

          if (Array.isArray(parent) || isEnumerable(parent, prop)) {
            parent[prop] = value;
          } else {
            Object.defineProperty(parent, prop, {
              value: value
            });
          } // Unchanged drafts are never passed to the `onAssign` hook.


          if (inDraft && value === state.base[prop]) return;
        } // Unchanged draft properties are ignored.
        else if (inDraft && is(value, state.base[prop])) {
            return;
          } // Search new objects for unfinalized drafts. Frozen objects should never contain drafts.
          else if (isDraftable(value) && !Object.isFrozen(value)) {
              each(value, finalizeProperty);
            }

        if (inDraft && onAssign) {
          onAssign(state, prop, value);
        }
      };

      each(root, finalizeProperty);
      return root;
    }
  }]);
  return Immer;
}();

exports.Immer = Immer;
var immer = new Immer();
/**
 * The `produce` function takes a value and a "recipe function" (whose
 * return value often depends on the base state). The recipe function is
 * free to mutate its first argument however it wants. All mutations are
 * only ever applied to a __copy__ of the base state.
 *
 * Pass only a function to create a "curried producer" which relieves you
 * from passing the recipe function every time.
 *
 * Only plain objects and arrays are made mutable. All other objects are
 * considered uncopyable.
 *
 * Note: This function is __bound__ to its `Immer` instance.
 *
 * @param {any} base - the initial state
 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
 * @param {Function} patchListener - optional function that will be called with all the patches produced here
 * @returns {any} a new state, or the initial state if nothing was modified
 */

var produce = immer.produce;
/**
 * Pass true to automatically freeze all copies created by Immer.
 *
 * By default, auto-freezing is disabled in production.
 */

exports.produce = produce;
var setAutoFreeze = immer.setAutoFreeze.bind(immer);
/**
 * Pass true to use the ES2015 `Proxy` class when creating drafts, which is
 * always faster than using ES5 proxies.
 *
 * By default, feature detection is used, so calling this is rarely necessary.
 */

exports.setAutoFreeze = setAutoFreeze;
var setUseProxies = immer.setUseProxies.bind(immer);
/**
 * Apply an array of Immer patches to the first argument.
 *
 * This function is a producer, which means copy-on-write is in effect.
 */

exports.setUseProxies = setUseProxies;
var applyPatches$1 = immer.applyPatches.bind(immer);
exports.applyPatches = applyPatches$1;
var _default = produce;
exports.default = _default;
},{"process":"node_modules/process/browser.js"}],"node_modules/boardgame.io/dist/esm/turn-order-d7fe23d9.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.B = _getPrototypeOf;
exports.C = _assertThisInitialized;
exports.D = _toConsumableArray;
exports.I = InitTurnOrderState;
exports.J = _objectWithoutProperties;
exports.K = _objectSpread2;
exports.U = UpdateTurnOrderState;
exports._ = _createClass;
exports.a = SetActivePlayersEvent;
exports.b = SetActivePlayers;
exports.c = UpdateActivePlayersOnceEmpty;
exports.e = error;
exports.i = info;
exports.p = alea;
exports.w = _classCallCheck;
exports.x = _inherits;
exports.y = _defineProperty;
exports.z = _possibleConstructorReturn;
exports.v = exports.u = exports.t = exports.s = exports.r = exports.q = exports.o = exports.n = exports.m = exports.l = exports.k = exports.j = exports.h = exports.g = exports.f = exports.d = exports.T = exports.S = exports.R = exports.P = exports.N = exports.M = exports.H = exports.G = exports.F = exports.E = exports.A = void 0;

var _immer = _interopRequireDefault(require("immer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray2(arr) { return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread2(); }

function _nonIterableSpread2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray2(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _ownKeys(Object(source), true).forEach(function (key) { _defineProperty2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function __defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass2(Constructor, protoProps, staticProps) { if (protoProps) __defineProperties(Constructor.prototype, protoProps); if (staticProps) __defineProperties(Constructor, staticProps); return Constructor; }

function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var MAKE_MOVE = 'MAKE_MOVE';
exports.M = MAKE_MOVE;
var GAME_EVENT = 'GAME_EVENT';
exports.G = GAME_EVENT;
var REDO = 'REDO';
exports.m = REDO;
var RESET = 'RESET';
exports.R = RESET;
var SYNC = 'SYNC';
exports.k = SYNC;
var UNDO = 'UNDO';
exports.l = UNDO;
var UPDATE = 'UPDATE';
exports.j = UPDATE;
var PLUGIN = 'PLUGIN';
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */

exports.P = PLUGIN;

var makeMove = function makeMove(type, args, playerID, credentials) {
  return {
    type: MAKE_MOVE,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.o = makeMove;

var gameEvent = function gameEvent(type, args, playerID, credentials) {
  return {
    type: GAME_EVENT,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Generate an automatic game event that is a side-effect of a move.
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.g = gameEvent;

var automaticGameEvent = function automaticGameEvent(type, args, playerID, credentials) {
  return {
    type: GAME_EVENT,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    },
    automatic: true
  };
};

var sync = function sync(info) {
  return {
    type: SYNC,
    state: info.state,
    log: info.log,
    initialState: info.initialState,
    clientOnly: true
  };
};
/**
 * Used to update the Redux store's state in response to
 * an action coming from another player.
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta.
 */


exports.s = sync;

var update = function update(state, deltalog) {
  return {
    type: UPDATE,
    state: state,
    deltalog: deltalog,
    clientOnly: true
  };
};
/**
 * Used to reset the game state.
 * @param {object} state - The initial state.
 */


exports.H = update;

var reset = function reset(state) {
  return {
    type: RESET,
    state: state,
    clientOnly: true
  };
};
/**
 * Used to undo the last move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.r = reset;

var undo = function undo(playerID, credentials) {
  return {
    type: UNDO,
    payload: {
      type: null,
      args: null,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Used to redo the last undone move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.u = undo;

var redo = function redo(playerID, credentials) {
  return {
    type: REDO,
    payload: {
      type: null,
      args: null,
      playerID: playerID,
      credentials: credentials
    }
  };
};
/**
 * Allows plugins to define their own actions and intercept them.
 */


exports.q = redo;

var plugin = function plugin(type, args, playerID, credentials) {
  return {
    type: PLUGIN,
    payload: {
      type: type,
      args: args,
      playerID: playerID,
      credentials: credentials
    }
  };
};

var ActionCreators = /*#__PURE__*/Object.freeze({
  makeMove: makeMove,
  gameEvent: gameEvent,
  automaticGameEvent: automaticGameEvent,
  sync: sync,
  update: update,
  reset: reset,
  undo: undo,
  redo: redo,
  plugin: plugin
});
/**
 * Moves can return this when they want to indicate
 * that the combination of arguments is illegal and
 * the move ought to be discarded.
 */

exports.A = ActionCreators;
var INVALID_MOVE = 'INVALID_MOVE';
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Plugin that allows using Immer to make immutable changes
 * to G by just mutating it.
 */

exports.h = INVALID_MOVE;
var ImmerPlugin = {
  name: 'plugin-immer',
  fnWrap: function fnWrap(move) {
    return function (G, ctx) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var isInvalid = false;
      var newG = (0, _immer.default)(G, function (G) {
        var result = move.apply(void 0, [G, ctx].concat(args));

        if (result === INVALID_MOVE) {
          isInvalid = true;
          return;
        }

        return result;
      });
      if (isInvalid) return INVALID_MOVE;
      return newG;
    };
  }
};

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  exports.B = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof2(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
} // Inlined version of Alea from https://github.com/davidbau/seedrandom.

/*
 * Copyright 2015 David Bau.
 *
 * Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software
 * and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall
 * be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */


function Alea(seed) {
  var me = this,
      mash = Mash();

  me.next = function () {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32

    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  }; // Apply the seeding algorithm from Baagoe.


  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);

  if (me.s0 < 0) {
    me.s0 += 1;
  }

  me.s1 -= mash(seed);

  if (me.s1 < 0) {
    me.s1 += 1;
  }

  me.s2 -= mash(seed);

  if (me.s2 < 0) {
    me.s2 += 1;
  }

  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function mash(data) {
    data = data.toString();

    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}

function alea(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.quick = prng;

  if (state) {
    if (_typeof(state) == 'object') copy(state, xg);

    prng.state = function () {
      return copy(xg, {});
    };
  }

  return prng;
}
/**
 * Random
 *
 * Calls that require a pseudorandom number generator.
 * Uses a seed from ctx, and also persists the PRNG
 * state in ctx so that moves can stay pure.
 */


var Random = /*#__PURE__*/function () {
  /**
   * constructor
   * @param {object} ctx - The ctx object to initialize from.
   */
  function Random(state) {
    _classCallCheck(this, Random); // If we are on the client, the seed is not present.
    // Just use a temporary seed to execute the move without
    // crashing it. The move state itself is discarded,
    // so the actual value doesn't matter.


    this.state = state;
    this.used = false;
  }

  _createClass(Random, [{
    key: "isUsed",
    value: function isUsed() {
      return this.used;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
    /**
     * Generate a random number.
     */

  }, {
    key: "_random",
    value: function _random() {
      this.used = true;
      var R = this.state;
      var fn;

      if (R.prngstate === undefined) {
        // No call to a random function has been made.
        fn = new alea(R.seed, {
          state: true
        });
      } else {
        fn = new alea('', {
          state: R.prngstate
        });
      }

      var number = fn();
      this.state = _objectSpread2({}, R, {
        prngstate: fn.state()
      });
      return number;
    }
  }, {
    key: "api",
    value: function api() {
      var random = this._random.bind(this);

      var SpotValue = {
        D4: 4,
        D6: 6,
        D8: 8,
        D10: 10,
        D12: 12,
        D20: 20
      }; // Generate functions for predefined dice values D4 - D20.

      var predefined = {};

      var _loop = function _loop(key) {
        var spotvalue = SpotValue[key];

        predefined[key] = function (diceCount) {
          if (diceCount === undefined) {
            return Math.floor(random() * spotvalue) + 1;
          } else {
            return _toConsumableArray(new Array(diceCount).keys()).map(function () {
              return Math.floor(random() * spotvalue) + 1;
            });
          }
        };
      };

      for (var key in SpotValue) {
        _loop(key);
      }

      return _objectSpread2({}, predefined, {
        /**
         * Roll a die of specified spot value.
         *
         * @param {number} spotvalue - The die dimension (default: 6).
         * @param {number} diceCount - number of dice to throw.
         *                             if not defined, defaults to 1 and returns the value directly.
         *                             if defined, returns an array containing the random dice values.
         */
        Die: function Die(spotvalue, diceCount) {
          if (spotvalue === undefined) {
            spotvalue = 6;
          }

          if (diceCount === undefined) {
            return Math.floor(random() * spotvalue) + 1;
          } else {
            return _toConsumableArray(new Array(diceCount).keys()).map(function () {
              return Math.floor(random() * spotvalue) + 1;
            });
          }
        },

        /**
         * Generate a random number between 0 and 1.
         */
        Number: function Number() {
          return random();
        },

        /**
         * Shuffle an array.
         *
         * @param {Array} deck - The array to shuffle. Does not mutate
         *                       the input, but returns the shuffled array.
         */
        Shuffle: function Shuffle(deck) {
          var clone = deck.slice(0);
          var srcIndex = deck.length;
          var dstIndex = 0;
          var shuffled = new Array(srcIndex);

          while (srcIndex) {
            var randIndex = srcIndex * random() | 0;
            shuffled[dstIndex++] = clone[randIndex];
            clone[randIndex] = clone[--srcIndex];
          }

          return shuffled;
        },
        _obj: this
      });
    }
  }]);

  return Random;
}();
/**
 * Generates a new seed from the current date / time.
 */


Random.seed = function () {
  return (+new Date()).toString(36).slice(-10);
};
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


var RandomPlugin = {
  name: 'random',
  noClient: function noClient(_ref) {
    var api = _ref.api;
    return api._obj.isUsed();
  },
  flush: function flush(_ref2) {
    var api = _ref2.api;
    return api._obj.getState();
  },
  api: function api(_ref3) {
    var data = _ref3.data;
    var random = new Random(data);
    return random.api();
  },
  setup: function setup(_ref4) {
    var game = _ref4.game;
    var seed = game.seed;

    if (seed === undefined) {
      seed = Random.seed();
    }

    return {
      seed: seed
    };
  }
};
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Events
 */

var Events = /*#__PURE__*/function () {
  function Events(flow, playerID) {
    _classCallCheck2(this, Events);

    this.flow = flow;
    this.playerID = playerID;
    this.dispatch = [];
  }
  /**
   * Attaches the Events API to ctx.
   * @param {object} ctx - The ctx object to attach to.
   */


  _createClass2(Events, [{
    key: "api",
    value: function api(ctx) {
      var _this = this;

      var events = {
        _obj: this
      };
      var phase = ctx.phase,
          turn = ctx.turn;

      var _iterator = _createForOfIteratorHelper(this.flow.eventNames),
          _step;

      try {
        var _loop2 = function _loop2() {
          var key = _step.value;

          events[key] = function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            _this.dispatch.push({
              key: key,
              args: args,
              phase: phase,
              turn: turn
            });
          };
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return events;
    }
  }, {
    key: "isUsed",
    value: function isUsed() {
      return this.dispatch.length > 0;
    }
    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */

  }, {
    key: "update",
    value: function update(state) {
      for (var i = 0; i < this.dispatch.length; i++) {
        var item = this.dispatch[i]; // If the turn already ended some other way,
        // don't try to end the turn again.

        if (item.key === 'endTurn' && item.turn !== state.ctx.turn) {
          continue;
        } // If the phase already ended some other way,
        // don't try to end the phase again.


        if ((item.key === 'endPhase' || item.key === 'setPhase') && item.phase !== state.ctx.phase) {
          continue;
        }

        var action = automaticGameEvent(item.key, item.args, this.playerID);
        state = _objectSpread(_objectSpread({}, state), this.flow.processEvent(state, action));
      }

      return state;
    }
  }]);

  return Events;
}();
/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


var EventsPlugin = {
  name: 'events',
  noClient: function noClient(_ref5) {
    var api = _ref5.api;
    return api._obj.isUsed();
  },
  dangerouslyFlushRawState: function dangerouslyFlushRawState(_ref6) {
    var state = _ref6.state,
        api = _ref6.api;
    return api._obj.update(state);
  },
  api: function api(_ref7) {
    var game = _ref7.game,
        playerID = _ref7.playerID,
        ctx = _ref7.ctx;
    return new Events(game.flow, playerID).api(ctx);
  }
};
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * List of plugins that are always added.
 */

var DEFAULT_PLUGINS = [ImmerPlugin, RandomPlugin, EventsPlugin];
/**
 * Allow plugins to intercept actions and process them.
 */

var ProcessAction = function ProcessAction(state, action, opts) {
  opts.game.plugins.filter(function (plugin) {
    return plugin.action !== undefined;
  }).filter(function (plugin) {
    return plugin.name === action.payload.type;
  }).forEach(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name] || {
      data: {}
    };
    var data = plugin.action(pluginState.data, action.payload);
    state = _objectSpread(_objectSpread({}, state), {}, {
      plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty2({}, name, _objectSpread(_objectSpread({}, pluginState), {}, {
        data: data
      })))
    });
  });
  return state;
};
/**
 * The API's created by various plugins are stored in the plugins
 * section of the state object:
 *
 * {
 *   G: {},
 *   ctx: {},
 *   plugins: {
 *     plugin-a: {
 *       data: {},  // this is generated by the plugin at Setup / Flush.
 *       api: {},   // this is ephemeral and generated by Enhance.
 *     }
 *   }
 * }
 *
 * This function takes these API's and stuffs them back into
 * ctx for consumption inside a move function or hook.
 */


exports.n = ProcessAction;

var EnhanceCtx = function EnhanceCtx(state) {
  var ctx = _objectSpread({}, state.ctx);

  var plugins = state.plugins || {};
  Object.entries(plugins).forEach(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        name = _ref9[0],
        api = _ref9[1].api;

    ctx[name] = api;
  });
  return ctx;
};
/**
 * Applies the provided plugins to the given move / flow function.
 *
 * @param {function} fn - The move function or trigger to apply the plugins to.
 * @param {object} plugins - The list of plugins.
 */


exports.E = EnhanceCtx;

var FnWrap = function FnWrap(fn, plugins) {
  var reducer = function reducer(acc, _ref10) {
    var fnWrap = _ref10.fnWrap;
    return fnWrap(acc);
  };

  return [].concat(DEFAULT_PLUGINS, _toConsumableArray2(plugins)).filter(function (plugin) {
    return plugin.fnWrap !== undefined;
  }).reduce(reducer, fn);
};
/**
 * Allows the plugin to generate its initial state.
 */


exports.F = FnWrap;

var Setup = function Setup(state, opts) {
  [].concat(DEFAULT_PLUGINS, _toConsumableArray2(opts.game.plugins)).filter(function (plugin) {
    return plugin.setup !== undefined;
  }).forEach(function (plugin) {
    var name = plugin.name;
    var data = plugin.setup({
      G: state.G,
      ctx: state.ctx,
      game: opts.game
    });
    state = _objectSpread(_objectSpread({}, state), {}, {
      plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty2({}, name, {
        data: data
      }))
    });
  });
  return state;
};
/**
 * Invokes the plugin before a move or event.
 * The API that the plugin generates is stored inside
 * the `plugins` section of the state (which is subsequently
 * merged into ctx).
 */


exports.t = Setup;

var Enhance = function Enhance(state, opts) {
  [].concat(DEFAULT_PLUGINS, _toConsumableArray2(opts.game.plugins)).filter(function (plugin) {
    return plugin.api !== undefined;
  }).forEach(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name] || {
      data: {}
    };
    var api = plugin.api({
      G: state.G,
      ctx: state.ctx,
      data: pluginState.data,
      game: opts.game,
      playerID: opts.playerID
    });
    state = _objectSpread(_objectSpread({}, state), {}, {
      plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty2({}, name, _objectSpread(_objectSpread({}, pluginState), {}, {
        api: api
      })))
    });
  });
  return state;
};
/**
 * Allows plugins to update their state after a move / event.
 */


exports.d = Enhance;

var Flush = function Flush(state, opts) {
  // Note that we flush plugins in reverse order, to make sure that plugins
  // that come before in the chain are still available.
  [].concat(DEFAULT_PLUGINS, _toConsumableArray2(opts.game.plugins)).reverse().forEach(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name] || {
      data: {}
    };

    if (plugin.flush) {
      var newData = plugin.flush({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
      state = _objectSpread(_objectSpread({}, state), {}, {
        plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty2({}, plugin.name, {
          data: newData
        }))
      });
    } else if (plugin.dangerouslyFlushRawState) {
      state = plugin.dangerouslyFlushRawState({
        state: state,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      }); // Remove everything other than data.

      var data = state.plugins[name].data;
      state = _objectSpread(_objectSpread({}, state), {}, {
        plugins: _objectSpread(_objectSpread({}, state.plugins), {}, _defineProperty2({}, plugin.name, {
          data: data
        }))
      });
    }
  });
  return state;
};
/**
 * Allows plugins to indicate if they should not be materialized on the client.
 * This will cause the client to discard the state update and wait for the
 * master instead.
 */


exports.f = Flush;

var NoClient = function NoClient(state, opts) {
  return [].concat(DEFAULT_PLUGINS, _toConsumableArray2(opts.game.plugins)).filter(function (plugin) {
    return plugin.noClient !== undefined;
  }).map(function (plugin) {
    var name = plugin.name;
    var pluginState = state.plugins[name];

    if (pluginState) {
      return plugin.noClient({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
    }

    return false;
  }).some(function (value) {
    return value === true;
  });
};
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


exports.N = NoClient;
var production = "development" === 'production';
var logfn = production ? function () {} : console.log;
var errorfn = console.error;

function info(msg) {
  logfn("INFO: ".concat(msg));
}

function error(error) {
  errorfn('ERROR:', error);
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Event to change the active players (and their stages) in the current turn.
 */


function SetActivePlayersEvent(state, _playerID, arg) {
  return _objectSpread(_objectSpread({}, state), {}, {
    ctx: SetActivePlayers(state.ctx, arg)
  });
}

function SetActivePlayers(ctx, arg) {
  var _prevActivePlayers = ctx._prevActivePlayers;
  var activePlayers = {};
  var _nextActivePlayers = null;
  var _activePlayersMoveLimit = {};

  if (Array.isArray(arg)) {
    // support a simple array of player IDs as active players
    var value = {};
    arg.forEach(function (v) {
      return value[v] = Stage.NULL;
    });
    activePlayers = value;
  } else {
    // process active players argument object
    if (arg.next) {
      _nextActivePlayers = arg.next;
    }

    if (arg.revert) {
      _prevActivePlayers = _prevActivePlayers.concat({
        activePlayers: ctx.activePlayers,
        _activePlayersMoveLimit: ctx._activePlayersMoveLimit,
        _activePlayersNumMoves: ctx._activePlayersNumMoves
      });
    } else {
      _prevActivePlayers = [];
    }

    if (arg.currentPlayer !== undefined) {
      ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, ctx.currentPlayer, arg.currentPlayer);
    }

    if (arg.others !== undefined) {
      for (var i = 0; i < ctx.playOrder.length; i++) {
        var id = ctx.playOrder[i];

        if (id !== ctx.currentPlayer) {
          ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, id, arg.others);
        }
      }
    }

    if (arg.all !== undefined) {
      for (var _i2 = 0; _i2 < ctx.playOrder.length; _i2++) {
        var _id = ctx.playOrder[_i2];
        ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, _id, arg.all);
      }
    }

    if (arg.value) {
      for (var _id2 in arg.value) {
        ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, _id2, arg.value[_id2]);
      }
    }

    if (arg.moveLimit) {
      for (var _id3 in activePlayers) {
        if (_activePlayersMoveLimit[_id3] === undefined) {
          _activePlayersMoveLimit[_id3] = arg.moveLimit;
        }
      }
    }
  }

  if (Object.keys(activePlayers).length == 0) {
    activePlayers = null;
  }

  if (Object.keys(_activePlayersMoveLimit).length == 0) {
    _activePlayersMoveLimit = null;
  }

  var _activePlayersNumMoves = {};

  for (var _id4 in activePlayers) {
    _activePlayersNumMoves[_id4] = 0;
  }

  return _objectSpread(_objectSpread({}, ctx), {}, {
    activePlayers: activePlayers,
    _activePlayersMoveLimit: _activePlayersMoveLimit,
    _activePlayersNumMoves: _activePlayersNumMoves,
    _prevActivePlayers: _prevActivePlayers,
    _nextActivePlayers: _nextActivePlayers
  });
}
/**
 * Update activePlayers, setting it to previous, next or null values
 * when it becomes empty.
 * @param ctx
 */


function UpdateActivePlayersOnceEmpty(ctx) {
  var _ctx = ctx,
      activePlayers = _ctx.activePlayers,
      _activePlayersMoveLimit = _ctx._activePlayersMoveLimit,
      _activePlayersNumMoves = _ctx._activePlayersNumMoves,
      _prevActivePlayers = _ctx._prevActivePlayers;

  if (activePlayers && Object.keys(activePlayers).length == 0) {
    if (ctx._nextActivePlayers) {
      ctx = SetActivePlayers(ctx, ctx._nextActivePlayers);
      var _ctx2 = ctx;
      activePlayers = _ctx2.activePlayers;
      _activePlayersMoveLimit = _ctx2._activePlayersMoveLimit;
      _activePlayersNumMoves = _ctx2._activePlayersNumMoves;
      _prevActivePlayers = _ctx2._prevActivePlayers;
    } else if (_prevActivePlayers.length > 0) {
      var lastIndex = _prevActivePlayers.length - 1;
      var _prevActivePlayers$la = _prevActivePlayers[lastIndex];
      activePlayers = _prevActivePlayers$la.activePlayers;
      _activePlayersMoveLimit = _prevActivePlayers$la._activePlayersMoveLimit;
      _activePlayersNumMoves = _prevActivePlayers$la._activePlayersNumMoves;
      _prevActivePlayers = _prevActivePlayers.slice(0, lastIndex);
    } else {
      activePlayers = null;
      _activePlayersMoveLimit = null;
    }
  }

  return _objectSpread(_objectSpread({}, ctx), {}, {
    activePlayers: activePlayers,
    _activePlayersMoveLimit: _activePlayersMoveLimit,
    _activePlayersNumMoves: _activePlayersNumMoves,
    _prevActivePlayers: _prevActivePlayers
  });
}
/**
 * Apply an active player argument to the given player ID
 * @param {Object} activePlayers
 * @param {Object} _activePlayersMoveLimit
 * @param {String} playerID The player to apply the parameter to
 * @param {(String|Object)} arg An active player argument
 */


function ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, playerID, arg) {
  if (_typeof2(arg) !== 'object' || arg === Stage.NULL) {
    arg = {
      stage: arg
    };
  }

  if (arg.stage !== undefined) {
    activePlayers[playerID] = arg.stage;
    if (arg.moveLimit) _activePlayersMoveLimit[playerID] = arg.moveLimit;
  }
}
/**
 * Converts a playOrderPos index into its value in playOrder.
 * @param {Array} playOrder - An array of player ID's.
 * @param {number} playOrderPos - An index into the above.
 */


function getCurrentPlayer(playOrder, playOrderPos) {
  // convert to string in case playOrder is set to number[]
  return playOrder[playOrderPos] + '';
}
/**
 * Called at the start of a turn to initialize turn order state.
 *
 * TODO: This is called inside StartTurn, which is called from
 * both UpdateTurn and StartPhase (so it's called at the beginning
 * of a new phase as well as between turns). We should probably
 * split it into two.
 */


function InitTurnOrderState(state, turn) {
  var G = state.G,
      ctx = state.ctx;
  var ctxWithAPI = EnhanceCtx(state);
  var order = turn.order;

  var playOrder = _toConsumableArray2(new Array(ctx.numPlayers)).map(function (_, i) {
    return i + '';
  });

  if (order.playOrder !== undefined) {
    playOrder = order.playOrder(G, ctxWithAPI);
  }

  var playOrderPos = order.first(G, ctxWithAPI);

  var posType = _typeof2(playOrderPos);

  if (posType !== 'number') {
    error("invalid value returned by turn.order.first \u2014 expected number got ".concat(posType, " \u201C").concat(playOrderPos, "\u201D."));
  }

  var currentPlayer = getCurrentPlayer(playOrder, playOrderPos);
  ctx = _objectSpread(_objectSpread({}, ctx), {}, {
    currentPlayer: currentPlayer,
    playOrderPos: playOrderPos,
    playOrder: playOrder
  });
  ctx = SetActivePlayers(ctx, turn.activePlayers || {});
  return ctx;
}
/**
 * Called at the end of each turn to update the turn order state.
 * @param {object} G - The game object G.
 * @param {object} ctx - The game object ctx.
 * @param {object} turn - A turn object for this phase.
 * @param {string} endTurnArg - An optional argument to endTurn that
                                may specify the next player.
 */


function UpdateTurnOrderState(state, currentPlayer, turn, endTurnArg) {
  var order = turn.order;
  var G = state.G,
      ctx = state.ctx;
  var playOrderPos = ctx.playOrderPos;
  var endPhase = false;

  if (endTurnArg && endTurnArg !== true) {
    if (_typeof2(endTurnArg) !== 'object') {
      error("invalid argument to endTurn: ".concat(endTurnArg));
    }

    Object.keys(endTurnArg).forEach(function (arg) {
      switch (arg) {
        case 'remove':
          currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
          break;

        case 'next':
          playOrderPos = ctx.playOrder.indexOf(endTurnArg.next);
          currentPlayer = endTurnArg.next;
          break;

        default:
          error("invalid argument to endTurn: ".concat(arg));
      }
    });
  } else {
    var ctxWithAPI = EnhanceCtx(state);
    var t = order.next(G, ctxWithAPI);

    var type = _typeof2(t);

    if (t !== undefined && type !== 'number') {
      error("invalid value returned by turn.order.next \u2014 expected number or undefined got ".concat(type, " \u201C").concat(t, "\u201D."));
    }

    if (t === undefined) {
      endPhase = true;
    } else {
      playOrderPos = t;
      currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
    }
  }

  ctx = _objectSpread(_objectSpread({}, ctx), {}, {
    playOrderPos: playOrderPos,
    currentPlayer: currentPlayer
  });
  return {
    endPhase: endPhase,
    ctx: ctx
  };
}
/**
 * Set of different turn orders possible in a phase.
 * These are meant to be passed to the `turn` setting
 * in the flow objects.
 *
 * Each object defines the first player when the phase / game
 * begins, and also a function `next` to determine who the
 * next player is when the turn ends.
 *
 * The phase ends if next() returns undefined.
 */


var TurnOrder = {
  /**
   * DEFAULT
   *
   * The default round-robin turn order.
   */
  DEFAULT: {
    first: function first(G, ctx) {
      return ctx.turn === 0 ? ctx.playOrderPos : (ctx.playOrderPos + 1) % ctx.playOrder.length;
    },
    next: function next(G, ctx) {
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },

  /**
   * RESET
   *
   * Similar to DEFAULT, but starts from 0 each time.
   */
  RESET: {
    first: function first() {
      return 0;
    },
    next: function next(G, ctx) {
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },

  /**
   * CONTINUE
   *
   * Similar to DEFAULT, but starts with the player who ended the last phase.
   */
  CONTINUE: {
    first: function first(G, ctx) {
      return ctx.playOrderPos;
    },
    next: function next(G, ctx) {
      return (ctx.playOrderPos + 1) % ctx.playOrder.length;
    }
  },

  /**
   * ONCE
   *
   * Another round-robin turn order, but goes around just once.
   * The phase ends after all players have played.
   */
  ONCE: {
    first: function first() {
      return 0;
    },
    next: function next(G, ctx) {
      if (ctx.playOrderPos < ctx.playOrder.length - 1) {
        return ctx.playOrderPos + 1;
      }
    }
  },

  /**
   * CUSTOM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase.
   *
   * @param {Array} playOrder - The play order.
   */
  CUSTOM: function CUSTOM(_playOrder) {
    return {
      playOrder: function playOrder() {
        return _playOrder;
      },
      first: function first() {
        return 0;
      },
      next: function next(G, ctx) {
        return (ctx.playOrderPos + 1) % ctx.playOrder.length;
      }
    };
  },

  /**
   * CUSTOM_FROM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase to a value specified by a field
   * in G.
   *
   * @param {string} playOrderField - Field in G.
   */
  CUSTOM_FROM: function CUSTOM_FROM(playOrderField) {
    return {
      playOrder: function playOrder(G) {
        return G[playOrderField];
      },
      first: function first() {
        return 0;
      },
      next: function next(G, ctx) {
        return (ctx.playOrderPos + 1) % ctx.playOrder.length;
      }
    };
  }
};
exports.T = TurnOrder;
var Stage = {
  NULL: null
};
exports.S = Stage;
var ActivePlayers = {
  /**
   * ALL
   *
   * The turn stays with one player, but any player can play (in any order)
   * until the phase ends.
   */
  ALL: {
    all: Stage.NULL
  },

  /**
   * ALL_ONCE
   *
   * The turn stays with one player, but any player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every player in the game.
   */
  ALL_ONCE: {
    all: Stage.NULL,
    moveLimit: 1
  },

  /**
   * OTHERS
   *
   * The turn stays with one player, and every *other* player can play (in any order)
   * until the phase ends.
   */
  OTHERS: {
    others: Stage.NULL
  },

  /**
   * OTHERS_ONCE
   *
   * The turn stays with one player, and every *other* player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every *other* player in the game.
   */
  OTHERS_ONCE: {
    others: Stage.NULL,
    moveLimit: 1
  }
};
exports.v = ActivePlayers;
},{"immer":"node_modules/immer/dist/immer.module.js"}],"node_modules/boardgame.io/dist/esm/reducer-186c7602.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.C = CreateGameReducer;
exports.P = ProcessGameConfig;

var _turnOrderD7fe23d = require("./turn-order-d7fe23d9.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Flow
 *
 * Creates a reducer that updates ctx (analogous to how moves update G).
 */
function Flow(_ref) {
  var moves = _ref.moves,
      phases = _ref.phases,
      endIf = _ref.endIf,
      onEnd = _ref.onEnd,
      turn = _ref.turn,
      events = _ref.events,
      plugins = _ref.plugins,
      disableUndo = _ref.disableUndo;

  // Attach defaults.
  if (moves === undefined) {
    moves = {};
  }

  if (events === undefined) {
    events = {};
  }

  if (plugins === undefined) {
    plugins = [];
  }

  if (phases === undefined) {
    phases = {};
  }

  if (!endIf) endIf = function endIf() {
    return undefined;
  };
  if (!onEnd) onEnd = function onEnd(G) {
    return G;
  };
  if (!turn) turn = {};

  var phaseMap = _objectSpread({}, phases);

  if ('' in phaseMap) {
    (0, _turnOrderD7fe23d.e)('cannot specify phase with empty name');
  }

  phaseMap[''] = {};
  var moveMap = {};
  var moveNames = new Set();
  var startingPhase = null;
  Object.keys(moves).forEach(function (name) {
    return moveNames.add(name);
  });

  var HookWrapper = function HookWrapper(fn) {
    var withPlugins = (0, _turnOrderD7fe23d.F)(fn, plugins);
    return function (state) {
      var ctxWithAPI = (0, _turnOrderD7fe23d.E)(state);
      return withPlugins(state.G, ctxWithAPI);
    };
  };

  var TriggerWrapper = function TriggerWrapper(endIf) {
    return function (state) {
      var ctxWithAPI = (0, _turnOrderD7fe23d.E)(state);
      return endIf(state.G, ctxWithAPI);
    };
  };

  var wrapped = {
    onEnd: HookWrapper(onEnd),
    endIf: TriggerWrapper(endIf)
  };

  for (var phase in phaseMap) {
    var conf = phaseMap[phase];

    if (conf.start === true) {
      startingPhase = phase;
    }

    if (conf.moves !== undefined) {
      for (var _i = 0, _Object$keys = Object.keys(conf.moves); _i < _Object$keys.length; _i++) {
        var move = _Object$keys[_i];
        moveMap[phase + '.' + move] = conf.moves[move];
        moveNames.add(move);
      }
    }

    if (conf.endIf === undefined) {
      conf.endIf = function () {
        return undefined;
      };
    }

    if (conf.onBegin === undefined) {
      conf.onBegin = function (G) {
        return G;
      };
    }

    if (conf.onEnd === undefined) {
      conf.onEnd = function (G) {
        return G;
      };
    }

    if (conf.turn === undefined) {
      conf.turn = turn;
    }

    if (conf.turn.order === undefined) {
      conf.turn.order = _turnOrderD7fe23d.T.DEFAULT;
    }

    if (conf.turn.onBegin === undefined) {
      conf.turn.onBegin = function (G) {
        return G;
      };
    }

    if (conf.turn.onEnd === undefined) {
      conf.turn.onEnd = function (G) {
        return G;
      };
    }

    if (conf.turn.endIf === undefined) {
      conf.turn.endIf = function () {
        return false;
      };
    }

    if (conf.turn.onMove === undefined) {
      conf.turn.onMove = function (G) {
        return G;
      };
    }

    if (conf.turn.stages === undefined) {
      conf.turn.stages = {};
    }

    for (var stage in conf.turn.stages) {
      var stageConfig = conf.turn.stages[stage];

      var _moves = stageConfig.moves || {};

      for (var _i2 = 0, _Object$keys2 = Object.keys(_moves); _i2 < _Object$keys2.length; _i2++) {
        var _move = _Object$keys2[_i2];
        var key = phase + '.' + stage + '.' + _move;
        moveMap[key] = _moves[_move];
        moveNames.add(_move);
      }
    }

    conf.wrapped = {
      onBegin: HookWrapper(conf.onBegin),
      onEnd: HookWrapper(conf.onEnd),
      endIf: TriggerWrapper(conf.endIf)
    };
    conf.turn.wrapped = {
      onMove: HookWrapper(conf.turn.onMove),
      onBegin: HookWrapper(conf.turn.onBegin),
      onEnd: HookWrapper(conf.turn.onEnd),
      endIf: TriggerWrapper(conf.turn.endIf)
    };
  }

  function GetPhase(ctx) {
    return ctx.phase ? phaseMap[ctx.phase] : phaseMap[''];
  }

  function OnMove(s) {
    return s;
  }

  function Process(state, events) {
    var phasesEnded = new Set();
    var turnsEnded = new Set();

    for (var i = 0; i < events.length; i++) {
      var _events$i = events[i],
          fn = _events$i.fn,
          arg = _events$i.arg,
          rest = _objectWithoutProperties(_events$i, ["fn", "arg"]); // Detect a loop of EndPhase calls.
      // This could potentially even be an infinite loop
      // if the endIf condition of each phase blindly
      // returns true. The moment we detect a single
      // loop, we just bail out of all phases.


      if (fn === EndPhase) {
        turnsEnded.clear();
        var _phase = state.ctx.phase;

        if (phasesEnded.has(_phase)) {
          var ctx = _objectSpread(_objectSpread({}, state.ctx), {}, {
            phase: null
          });

          return _objectSpread(_objectSpread({}, state), {}, {
            ctx: ctx
          });
        }

        phasesEnded.add(_phase);
      } // Process event.


      var next = [];
      state = fn(state, _objectSpread(_objectSpread({}, rest), {}, {
        arg: arg,
        next: next
      }));

      if (fn === EndGame) {
        break;
      } // Check if we should end the game.


      var shouldEndGame = ShouldEndGame(state);

      if (shouldEndGame) {
        events.push({
          fn: EndGame,
          arg: shouldEndGame,
          turn: state.ctx.turn,
          phase: state.ctx.phase,
          automatic: true
        });
        continue;
      } // Check if we should end the phase.


      var shouldEndPhase = ShouldEndPhase(state);

      if (shouldEndPhase) {
        events.push({
          fn: EndPhase,
          arg: shouldEndPhase,
          turn: state.ctx.turn,
          phase: state.ctx.phase,
          automatic: true
        });
        continue;
      } // Check if we should end the turn.


      if (fn === OnMove) {
        var shouldEndTurn = ShouldEndTurn(state);

        if (shouldEndTurn) {
          events.push({
            fn: EndTurn,
            arg: shouldEndTurn,
            turn: state.ctx.turn,
            phase: state.ctx.phase,
            automatic: true
          });
          continue;
        }
      }

      events.push.apply(events, next);
    }

    return state;
  } ///////////
  // Start //
  ///////////


  function StartGame(state, _ref2) {
    var next = _ref2.next;
    next.push({
      fn: StartPhase
    });
    return state;
  }

  function StartPhase(state, _ref3) {
    var next = _ref3.next;
    var G = state.G,
        ctx = state.ctx;
    var conf = GetPhase(ctx); // Run any phase setup code provided by the user.

    G = conf.wrapped.onBegin(state);
    next.push({
      fn: StartTurn
    });
    return _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx
    });
  }

  function StartTurn(state, _ref4) {
    var currentPlayer = _ref4.currentPlayer;
    var G = state.G,
        ctx = state.ctx;
    var conf = GetPhase(ctx); // Initialize the turn order state.

    if (currentPlayer) {
      ctx = _objectSpread(_objectSpread({}, ctx), {}, {
        currentPlayer: currentPlayer
      });

      if (conf.turn.activePlayers) {
        ctx = (0, _turnOrderD7fe23d.b)(ctx, conf.turn.activePlayers);
      }
    } else {
      // This is only called at the beginning of the phase
      // when there is no currentPlayer yet.
      ctx = (0, _turnOrderD7fe23d.I)(state, conf.turn);
    }

    var turn = ctx.turn + 1;
    ctx = _objectSpread(_objectSpread({}, ctx), {}, {
      turn: turn,
      numMoves: 0,
      _prevActivePlayers: []
    });
    G = conf.turn.wrapped.onBegin(_objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx
    }));

    var _undo = disableUndo ? [] : [{
      G: G,
      ctx: ctx
    }];

    return _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx,
      _undo: _undo,
      _redo: []
    });
  } ////////////
  // Update //
  ////////////


  function UpdatePhase(state, _ref5) {
    var arg = _ref5.arg,
        next = _ref5.next,
        phase = _ref5.phase;
    var conf = GetPhase({
      phase: phase
    });
    var _state = state,
        ctx = _state.ctx;

    if (arg && arg.next) {
      if (arg.next in phaseMap) {
        ctx = _objectSpread(_objectSpread({}, ctx), {}, {
          phase: arg.next
        });
      } else {
        (0, _turnOrderD7fe23d.e)('invalid phase: ' + arg.next);
        return state;
      }
    } else if (conf.next !== undefined) {
      ctx = _objectSpread(_objectSpread({}, ctx), {}, {
        phase: conf.next
      });
    } else {
      ctx = _objectSpread(_objectSpread({}, ctx), {}, {
        phase: null
      });
    }

    state = _objectSpread(_objectSpread({}, state), {}, {
      ctx: ctx
    }); // Start the new phase.

    next.push({
      fn: StartPhase
    });
    return state;
  }

  function UpdateTurn(state, _ref6) {
    var arg = _ref6.arg,
        currentPlayer = _ref6.currentPlayer,
        next = _ref6.next;
    var _state2 = state,
        G = _state2.G,
        ctx = _state2.ctx;
    var conf = GetPhase(ctx); // Update turn order state.

    var _UpdateTurnOrderState = (0, _turnOrderD7fe23d.U)(state, currentPlayer, conf.turn, arg),
        endPhase = _UpdateTurnOrderState.endPhase,
        newCtx = _UpdateTurnOrderState.ctx;

    ctx = newCtx;
    state = _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx
    });

    if (endPhase) {
      next.push({
        fn: EndPhase,
        turn: ctx.turn,
        phase: ctx.phase
      });
    } else {
      next.push({
        fn: StartTurn,
        currentPlayer: ctx.currentPlayer
      });
    }

    return state;
  }

  function UpdateStage(state, _ref7) {
    var arg = _ref7.arg,
        playerID = _ref7.playerID;

    if (typeof arg === 'string') {
      arg = {
        stage: arg
      };
    }

    var ctx = state.ctx;
    var _ctx = ctx,
        activePlayers = _ctx.activePlayers,
        _activePlayersMoveLimit = _ctx._activePlayersMoveLimit,
        _activePlayersNumMoves = _ctx._activePlayersNumMoves;

    if (arg.stage) {
      if (activePlayers === null) {
        activePlayers = {};
      }

      activePlayers[playerID] = arg.stage;
      _activePlayersNumMoves[playerID] = 0;

      if (arg.moveLimit) {
        if (_activePlayersMoveLimit === null) {
          _activePlayersMoveLimit = {};
        }

        _activePlayersMoveLimit[playerID] = arg.moveLimit;
      }
    }

    ctx = _objectSpread(_objectSpread({}, ctx), {}, {
      activePlayers: activePlayers,
      _activePlayersMoveLimit: _activePlayersMoveLimit,
      _activePlayersNumMoves: _activePlayersNumMoves
    });
    return _objectSpread(_objectSpread({}, state), {}, {
      ctx: ctx
    });
  } ///////////////
  // ShouldEnd //
  ///////////////


  function ShouldEndGame(state) {
    return wrapped.endIf(state);
  }

  function ShouldEndPhase(state) {
    var conf = GetPhase(state.ctx);
    return conf.wrapped.endIf(state);
  }

  function ShouldEndTurn(state) {
    var conf = GetPhase(state.ctx); // End the turn if the required number of moves has been made.

    var currentPlayerMoves = state.ctx.numMoves || 0;

    if (conf.turn.moveLimit && currentPlayerMoves >= conf.turn.moveLimit) {
      return true;
    }

    return conf.turn.wrapped.endIf(state);
  } /////////
  // End //
  /////////


  function EndGame(state, _ref8) {
    var arg = _ref8.arg,
        phase = _ref8.phase;
    state = EndPhase(state, {
      phase: phase
    });

    if (arg === undefined) {
      arg = true;
    }

    state = _objectSpread(_objectSpread({}, state), {}, {
      ctx: _objectSpread(_objectSpread({}, state.ctx), {}, {
        gameover: arg
      })
    }); // Run game end hook.

    var G = wrapped.onEnd(state);
    return _objectSpread(_objectSpread({}, state), {}, {
      G: G
    });
  }

  function EndPhase(state, _ref9) {
    var arg = _ref9.arg,
        next = _ref9.next,
        turn = _ref9.turn,
        automatic = _ref9.automatic;
    // End the turn first.
    state = EndTurn(state, {
      turn: turn,
      force: true
    });
    var G = state.G;
    var ctx = state.ctx;

    if (next) {
      next.push({
        fn: UpdatePhase,
        arg: arg,
        phase: ctx.phase
      });
    } // If we aren't in a phase, there is nothing else to do.


    if (ctx.phase === null) {
      return state;
    } // Run any cleanup code for the phase that is about to end.


    var conf = GetPhase(ctx);
    G = conf.wrapped.onEnd(state); // Reset the phase.

    ctx = _objectSpread(_objectSpread({}, ctx), {}, {
      phase: null
    }); // Add log entry.

    var action = (0, _turnOrderD7fe23d.g)('endPhase', arg);
    var logEntry = {
      action: action,
      _stateID: state._stateID,
      turn: state.ctx.turn,
      phase: state.ctx.phase
    };

    if (automatic) {
      logEntry.automatic = true;
    }

    var deltalog = [].concat(_toConsumableArray(state.deltalog), [logEntry]);
    return _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx,
      deltalog: deltalog
    });
  }

  function EndTurn(state, _ref10) {
    var arg = _ref10.arg,
        next = _ref10.next,
        turn = _ref10.turn,
        force = _ref10.force,
        automatic = _ref10.automatic,
        playerID = _ref10.playerID;

    // This is not the turn that EndTurn was originally
    // called for. The turn was probably ended some other way.
    if (turn !== state.ctx.turn) {
      return state;
    }

    var G = state.G,
        ctx = state.ctx;
    var conf = GetPhase(ctx); // Prevent ending the turn if moveLimit hasn't been reached.

    var currentPlayerMoves = ctx.numMoves || 0;

    if (!force && conf.turn.moveLimit && currentPlayerMoves < conf.turn.moveLimit) {
      (0, _turnOrderD7fe23d.i)("cannot end turn before making ".concat(conf.turn.moveLimit, " moves"));
      return state;
    } // Run turn-end triggers.


    G = conf.turn.wrapped.onEnd(state);

    if (next) {
      next.push({
        fn: UpdateTurn,
        arg: arg,
        currentPlayer: ctx.currentPlayer
      });
    } // Reset activePlayers.


    ctx = _objectSpread(_objectSpread({}, ctx), {}, {
      activePlayers: null
    }); // Remove player from playerOrder

    if (arg && arg.remove) {
      playerID = playerID || ctx.currentPlayer;
      var playOrder = ctx.playOrder.filter(function (i) {
        return i != playerID;
      });
      var playOrderPos = ctx.playOrderPos > playOrder.length - 1 ? 0 : ctx.playOrderPos;
      ctx = _objectSpread(_objectSpread({}, ctx), {}, {
        playOrder: playOrder,
        playOrderPos: playOrderPos
      });

      if (playOrder.length === 0) {
        next.push({
          fn: EndPhase,
          turn: ctx.turn,
          phase: ctx.phase
        });
        return state;
      }
    } // Add log entry.


    var action = (0, _turnOrderD7fe23d.g)('endTurn', arg);
    var logEntry = {
      action: action,
      _stateID: state._stateID,
      turn: state.ctx.turn,
      phase: state.ctx.phase
    };

    if (automatic) {
      logEntry.automatic = true;
    }

    var deltalog = [].concat(_toConsumableArray(state.deltalog || []), [logEntry]);
    return _objectSpread(_objectSpread({}, state), {}, {
      G: G,
      ctx: ctx,
      deltalog: deltalog,
      _undo: [],
      _redo: []
    });
  }

  function EndStage(state, _ref11) {
    var arg = _ref11.arg,
        next = _ref11.next,
        automatic = _ref11.automatic,
        playerID = _ref11.playerID;
    playerID = playerID || state.ctx.currentPlayer;
    var ctx = state.ctx;
    var _ctx2 = ctx,
        activePlayers = _ctx2.activePlayers,
        _activePlayersMoveLimit = _ctx2._activePlayersMoveLimit;
    var playerInStage = activePlayers !== null && playerID in activePlayers;

    if (!arg && playerInStage) {
      var _conf = GetPhase(ctx);

      var _stage = _conf.turn.stages[activePlayers[playerID]];
      if (_stage && _stage.next) arg = _stage.next;
    }

    if (next && arg) {
      next.push({
        fn: UpdateStage,
        arg: arg,
        playerID: playerID
      });
    } // If player isn’t in a stage, there is nothing else to do.


    if (!playerInStage) return state; // Remove player from activePlayers.

    activePlayers = Object.keys(activePlayers).filter(function (id) {
      return id !== playerID;
    }).reduce(function (obj, key) {
      obj[key] = activePlayers[key];
      return obj;
    }, {});

    if (_activePlayersMoveLimit) {
      // Remove player from _activePlayersMoveLimit.
      _activePlayersMoveLimit = Object.keys(_activePlayersMoveLimit).filter(function (id) {
        return id !== playerID;
      }).reduce(function (obj, key) {
        obj[key] = _activePlayersMoveLimit[key];
        return obj;
      }, {});
    }

    ctx = (0, _turnOrderD7fe23d.c)(_objectSpread(_objectSpread({}, ctx), {}, {
      activePlayers: activePlayers,
      _activePlayersMoveLimit: _activePlayersMoveLimit
    })); // Add log entry.

    var action = (0, _turnOrderD7fe23d.g)('endStage', arg);
    var logEntry = {
      action: action,
      _stateID: state._stateID,
      turn: state.ctx.turn,
      phase: state.ctx.phase
    };

    if (automatic) {
      logEntry.automatic = true;
    }

    var deltalog = [].concat(_toConsumableArray(state.deltalog || []), [logEntry]);
    return _objectSpread(_objectSpread({}, state), {}, {
      ctx: ctx,
      deltalog: deltalog
    });
  }
  /**
   * Retrieves the relevant move that can be played by playerID.
   *
   * If ctx.activePlayers is set (i.e. one or more players are in some stage),
   * then it attempts to find the move inside the stages config for
   * that turn. If the stage for a player is '', then the player is
   * allowed to make a move (as determined by the phase config), but
   * isn't restricted to a particular set as defined in the stage config.
   *
   * If not, it then looks for the move inside the phase.
   *
   * If it doesn't find the move there, it looks at the global move definition.
   *
   * @param {object} ctx
   * @param {string} name
   * @param {string} playerID
   */


  function GetMove(ctx, name, playerID) {
    var conf = GetPhase(ctx);
    var stages = conf.turn.stages;
    var activePlayers = ctx.activePlayers;

    if (activePlayers && activePlayers[playerID] !== undefined && activePlayers[playerID] !== _turnOrderD7fe23d.S.NULL && stages[activePlayers[playerID]] !== undefined && stages[activePlayers[playerID]].moves !== undefined) {
      // Check if moves are defined for the player's stage.
      var _stage2 = stages[activePlayers[playerID]];
      var _moves2 = _stage2.moves;

      if (name in _moves2) {
        return _moves2[name];
      }
    } else if (conf.moves) {
      // Check if moves are defined for the current phase.
      if (name in conf.moves) {
        return conf.moves[name];
      }
    } else if (name in moves) {
      // Check for the move globally.
      return moves[name];
    }

    return null;
  }

  function ProcessMove(state, action) {
    var conf = GetPhase(state.ctx);
    var move = GetMove(state.ctx, action.type, action.playerID);
    var shouldCount = !move || typeof move === 'function' || move.noLimit !== true;
    var _state3 = state,
        ctx = _state3.ctx;
    var _activePlayersNumMoves = ctx._activePlayersNumMoves;
    var playerID = action.playerID;
    var numMoves = state.ctx.numMoves;

    if (shouldCount) {
      if (playerID == state.ctx.currentPlayer) {
        numMoves++;
      }

      if (ctx.activePlayers) _activePlayersNumMoves[playerID]++;
    }

    state = _objectSpread(_objectSpread({}, state), {}, {
      ctx: _objectSpread(_objectSpread({}, ctx), {}, {
        numMoves: numMoves,
        _activePlayersNumMoves: _activePlayersNumMoves
      })
    });

    if (ctx._activePlayersMoveLimit && _activePlayersNumMoves[playerID] >= ctx._activePlayersMoveLimit[playerID]) {
      state = EndStage(state, {
        playerID: playerID,
        automatic: true
      });
    }

    var G = conf.turn.wrapped.onMove(state);
    state = _objectSpread(_objectSpread({}, state), {}, {
      G: G
    });
    var events = [{
      fn: OnMove
    }];
    return Process(state, events);
  }

  function SetStageEvent(state, playerID, arg) {
    return Process(state, [{
      fn: EndStage,
      arg: arg,
      playerID: playerID
    }]);
  }

  function EndStageEvent(state, playerID) {
    return Process(state, [{
      fn: EndStage,
      playerID: playerID
    }]);
  }

  function SetPhaseEvent(state, _playerID, newPhase) {
    return Process(state, [{
      fn: EndPhase,
      phase: state.ctx.phase,
      turn: state.ctx.turn,
      arg: {
        next: newPhase
      }
    }]);
  }

  function EndPhaseEvent(state) {
    return Process(state, [{
      fn: EndPhase,
      phase: state.ctx.phase,
      turn: state.ctx.turn
    }]);
  }

  function EndTurnEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndTurn,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      arg: arg
    }]);
  }

  function PassEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndTurn,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      force: true,
      arg: arg
    }]);
  }

  function EndGameEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndGame,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      arg: arg
    }]);
  }

  var eventHandlers = {
    endStage: EndStageEvent,
    setStage: SetStageEvent,
    endTurn: EndTurnEvent,
    pass: PassEvent,
    endPhase: EndPhaseEvent,
    setPhase: SetPhaseEvent,
    endGame: EndGameEvent,
    setActivePlayers: _turnOrderD7fe23d.a
  };
  var enabledEventNames = [];

  if (events.endTurn !== false) {
    enabledEventNames.push('endTurn');
  }

  if (events.pass !== false) {
    enabledEventNames.push('pass');
  }

  if (events.endPhase !== false) {
    enabledEventNames.push('endPhase');
  }

  if (events.setPhase !== false) {
    enabledEventNames.push('setPhase');
  }

  if (events.endGame !== false) {
    enabledEventNames.push('endGame');
  }

  if (events.setActivePlayers !== false) {
    enabledEventNames.push('setActivePlayers');
  }

  if (events.endStage !== false) {
    enabledEventNames.push('endStage');
  }

  if (events.setStage !== false) {
    enabledEventNames.push('setStage');
  }

  function ProcessEvent(state, action) {
    var _action$payload = action.payload,
        type = _action$payload.type,
        playerID = _action$payload.playerID,
        args = _action$payload.args;

    if (eventHandlers.hasOwnProperty(type)) {
      var eventArgs = [state, playerID].concat(args);
      return eventHandlers[type].apply({}, eventArgs);
    }

    return state;
  }

  function IsPlayerActive(_G, ctx, playerID) {
    if (ctx.activePlayers) {
      return playerID in ctx.activePlayers;
    }

    return ctx.currentPlayer === playerID;
  }

  return {
    ctx: function ctx(numPlayers) {
      return {
        numPlayers: numPlayers,
        turn: 0,
        currentPlayer: '0',
        playOrder: _toConsumableArray(new Array(numPlayers)).map(function (_d, i) {
          return i + '';
        }),
        playOrderPos: 0,
        phase: startingPhase,
        activePlayers: null
      };
    },
    init: function init(state) {
      return Process(state, [{
        fn: StartGame
      }]);
    },
    isPlayerActive: IsPlayerActive,
    eventHandlers: eventHandlers,
    eventNames: Object.keys(eventHandlers),
    enabledEventNames: enabledEventNames,
    moveMap: moveMap,
    moveNames: _toConsumableArray(moveNames.values()),
    processMove: ProcessMove,
    processEvent: ProcessEvent,
    getMove: GetMove
  };
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


function IsProcessed(game) {
  return game.processMove !== undefined;
}
/**
 * Helper to generate the game move reducer. The returned
 * reducer has the following signature:
 *
 * (G, action, ctx) => {}
 *
 * You can roll your own if you like, or use any Redux
 * addon to generate such a reducer.
 *
 * The convention used in this framework is to
 * have action.type contain the name of the move, and
 * action.args contain any additional arguments as an
 * Array.
 */


function ProcessGameConfig(game) {
  // The Game() function has already been called on this
  // config object, so just pass it through.
  if (IsProcessed(game)) {
    return game;
  }

  if (game.name === undefined) game.name = 'default';
  if (game.disableUndo === undefined) game.disableUndo = false;
  if (game.setup === undefined) game.setup = function () {
    return {};
  };
  if (game.moves === undefined) game.moves = {};
  if (game.playerView === undefined) game.playerView = function (G) {
    return G;
  };
  if (game.plugins === undefined) game.plugins = [];
  game.plugins.forEach(function (plugin) {
    if (plugin.name === undefined) {
      throw new Error('Plugin missing name attribute');
    }

    if (plugin.name.includes(' ')) {
      throw new Error(plugin.name + ': Plugin name must not include spaces');
    }
  });

  if (game.name.includes(' ')) {
    throw new Error(game.name + ': Game name must not include spaces');
  }

  var flow = Flow(game);
  return _objectSpread(_objectSpread({}, game), {}, {
    flow: flow,
    moveNames: flow.moveNames,
    pluginNames: game.plugins.map(function (p) {
      return p.name;
    }),
    processMove: function processMove(state, action) {
      var moveFn = flow.getMove(state.ctx, action.type, action.playerID);

      if (IsLongFormMove(moveFn)) {
        moveFn = moveFn.move;
      }

      if (moveFn instanceof Function) {
        var fn = (0, _turnOrderD7fe23d.F)(moveFn, game.plugins);

        var ctxWithAPI = _objectSpread(_objectSpread({}, (0, _turnOrderD7fe23d.E)(state)), {}, {
          playerID: action.playerID
        });

        var args = [];

        if (action.args !== undefined) {
          args = args.concat(action.args);
        }

        return fn.apply(void 0, [state.G, ctxWithAPI].concat(_toConsumableArray(args)));
      }

      (0, _turnOrderD7fe23d.e)("invalid move object: ".concat(action.type));
      return state.G;
    }
  });
}

function IsLongFormMove(move) {
  return move instanceof Object && move.move !== undefined;
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Returns true if a move can be undone.
 */


var CanUndoMove = function CanUndoMove(G, ctx, move) {
  function HasUndoable(move) {
    return move.undoable !== undefined;
  }

  function IsFunction(undoable) {
    return undoable instanceof Function;
  }

  if (!HasUndoable(move)) {
    return true;
  }

  if (IsFunction(move.undoable)) {
    return move.undoable(G, ctx);
  }

  return move.undoable;
};
/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 */


function CreateGameReducer(_ref12) {
  var game = _ref12.game,
      isClient = _ref12.isClient;
  game = ProcessGameConfig(game);
  /**
   * GameReducer
   *
   * Redux reducer that maintains the overall game state.
   * @param {object} state - The state before the action.
   * @param {object} action - A Redux action.
   */

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case _turnOrderD7fe23d.G:
        {
          state = _objectSpread(_objectSpread({}, state), {}, {
            deltalog: []
          }); // Process game events only on the server.
          // These events like `endTurn` typically
          // contain code that may rely on secret state
          // and cannot be computed on the client.

          if (isClient) {
            return state;
          } // Disallow events once the game is over.


          if (state.ctx.gameover !== undefined) {
            (0, _turnOrderD7fe23d.e)("cannot call event after game end");
            return state;
          } // Ignore the event if the player isn't active.


          if (action.payload.playerID !== null && action.payload.playerID !== undefined && !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
            (0, _turnOrderD7fe23d.e)("disallowed event: ".concat(action.payload.type));
            return state;
          } // Execute plugins.


          state = (0, _turnOrderD7fe23d.d)(state, {
            game: game,
            isClient: false,
            playerID: action.payload.playerID
          }); // Process event.

          var newState = game.flow.processEvent(state, action); // Execute plugins.

          newState = (0, _turnOrderD7fe23d.f)(newState, {
            game: game,
            isClient: false
          });
          return _objectSpread(_objectSpread({}, newState), {}, {
            _stateID: state._stateID + 1
          });
        }

      case _turnOrderD7fe23d.M:
        {
          state = _objectSpread(_objectSpread({}, state), {}, {
            deltalog: []
          }); // Check whether the move is allowed at this time.

          var move = game.flow.getMove(state.ctx, action.payload.type, action.payload.playerID || state.ctx.currentPlayer);

          if (move === null) {
            (0, _turnOrderD7fe23d.e)("disallowed move: ".concat(action.payload.type));
            return state;
          } // Don't run move on client if move says so.


          if (isClient && move.client === false) {
            return state;
          } // Disallow moves once the game is over.


          if (state.ctx.gameover !== undefined) {
            (0, _turnOrderD7fe23d.e)("cannot make move after game end");
            return state;
          } // Ignore the move if the player isn't active.


          if (action.payload.playerID !== null && action.payload.playerID !== undefined && !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
            (0, _turnOrderD7fe23d.e)("disallowed move: ".concat(action.payload.type));
            return state;
          } // Execute plugins.


          state = (0, _turnOrderD7fe23d.d)(state, {
            game: game,
            isClient: isClient,
            playerID: action.payload.playerID
          }); // Process the move.

          var G = game.processMove(state, action.payload); // The game declared the move as invalid.

          if (G === _turnOrderD7fe23d.h) {
            (0, _turnOrderD7fe23d.e)("invalid move: ".concat(action.payload.type, " args: ").concat(action.payload.args));
            return state;
          } // Create a log entry for this move.


          var logEntry = {
            action: action,
            _stateID: state._stateID,
            turn: state.ctx.turn,
            phase: state.ctx.phase
          };

          if (move.redact === true) {
            logEntry.redact = true;
          }

          var _newState = _objectSpread(_objectSpread({}, state), {}, {
            G: G,
            deltalog: [logEntry],
            _stateID: state._stateID + 1
          }); // Some plugin indicated that it is not suitable to be
          // materialized on the client (and must wait for the server
          // response instead).


          if (isClient && (0, _turnOrderD7fe23d.N)(_newState, {
            game: game
          })) {
            return state;
          }

          state = _newState; // If we're on the client, just process the move
          // and no triggers in multiplayer mode.
          // These will be processed on the server, which
          // will send back a state update.

          if (isClient) {
            state = (0, _turnOrderD7fe23d.f)(state, {
              game: game,
              isClient: true
            });
            return state;
          }

          var prevTurnCount = state.ctx.turn; // Allow the flow reducer to process any triggers that happen after moves.

          state = game.flow.processMove(state, action.payload);
          state = (0, _turnOrderD7fe23d.f)(state, {
            game: game
          }); // Update undo / redo state.
          // Only update undo stack if the turn has not been ended

          if (state.ctx.turn === prevTurnCount && !game.disableUndo) {
            state._undo = state._undo.concat({
              G: state.G,
              ctx: state.ctx,
              moveType: action.payload.type
            });
          } // Always reset redo stack when making a move


          state._redo = [];
          return state;
        }

      case _turnOrderD7fe23d.R:
      case _turnOrderD7fe23d.j:
      case _turnOrderD7fe23d.k:
        {
          return action.state;
        }

      case _turnOrderD7fe23d.l:
        {
          if (game.disableUndo) {
            (0, _turnOrderD7fe23d.e)("Undo is not enabled");
            return state;
          }

          var _state4 = state,
              _undo = _state4._undo,
              _redo = _state4._redo;

          if (_undo.length < 2) {
            return state;
          }

          var last = _undo[_undo.length - 1];
          var restore = _undo[_undo.length - 2]; // Only allow undoable moves to be undone.

          var lastMove = game.flow.getMove(restore.ctx, last.moveType, action.payload.playerID);

          if (!CanUndoMove(state.G, state.ctx, lastMove)) {
            return state;
          }

          return _objectSpread(_objectSpread({}, state), {}, {
            G: restore.G,
            ctx: restore.ctx,
            _undo: _undo.slice(0, _undo.length - 1),
            _redo: [last].concat(_toConsumableArray(_redo))
          });
        }

      case _turnOrderD7fe23d.m:
        {
          var _state5 = state,
              _undo2 = _state5._undo,
              _redo2 = _state5._redo;

          if (game.disableUndo) {
            (0, _turnOrderD7fe23d.e)("Redo is not enabled");
            return state;
          }

          if (_redo2.length == 0) {
            return state;
          }

          var first = _redo2[0];
          return _objectSpread(_objectSpread({}, state), {}, {
            G: first.G,
            ctx: first.ctx,
            _undo: [].concat(_toConsumableArray(_undo2), [first]),
            _redo: _redo2.slice(1)
          });
        }

      case _turnOrderD7fe23d.P:
        {
          return (0, _turnOrderD7fe23d.n)(state, action, {
            game: game
          });
        }

      default:
        {
          return state;
        }
    }
  };
}
},{"./turn-order-d7fe23d9.js":"node_modules/boardgame.io/dist/esm/turn-order-d7fe23d9.js"}],"node_modules/flatted/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = exports.parse = exports.default = void 0;

var Flatted = function (Primitive, primitive) {
  /*!
   * ISC License
   *
   * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */
  var Flatted = {
    parse: function parse(text) {
      var input = JSON.parse(text, Primitives).map(primitives);
      var value = input[0];
      return typeof value === 'object' && value ? revive(input, new Set(), value) : value;
    },
    stringify: function stringify(value) {
      for (var firstRun, known = new Map(), input = [], output = [], i = +set(known, input, value), replace = function (key, value) {
        if (firstRun) return firstRun = !firstRun, value;

        switch (typeof value) {
          case 'object':
            if (value === null) return value;

          case primitive:
            return known.get(value) || set(known, input, value);
        }

        return value;
      }; i < input.length; i++) {
        firstRun = true;
        output[i] = JSON.stringify(input[i], replace);
      }

      return '[' + output.join(',') + ']';
    }
  };
  return Flatted;

  function revive(input, parsed, output) {
    return Object.keys(output).reduce(function (output, key) {
      var value = output[key];

      if (value instanceof Primitive) {
        var tmp = input[value];

        if (typeof tmp === 'object' && !parsed.has(tmp)) {
          parsed.add(tmp);
          output[key] = revive(input, parsed, tmp);
        } else {
          output[key] = tmp;
        }
      }

      return output;
    }, output);
  }

  function set(known, input, value) {
    var index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  }

  function primitives(value) {
    return value instanceof Primitive ? Primitive(value) : value;
  }

  function Primitives(key, value) {
    return typeof value === primitive ? new Primitive(value) : value;
  }
}(String, 'string');

var _default = Flatted;
exports.default = _default;
const parse = Flatted.parse;
exports.parse = parse;
const stringify = Flatted.stringify;
exports.stringify = stringify;
},{}],"node_modules/boardgame.io/dist/esm/ai-11415cb8.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S = Step;
exports.a = Simulate;
exports.R = exports.M = exports.B = void 0;

var _turnOrderD7fe23d = require("./turn-order-d7fe23d9.js");

var _reducer186c = require("./reducer-186c7602.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Base class that bots can extend.
 */
var Bot = /*#__PURE__*/function () {
  function Bot(_ref) {
    var enumerate = _ref.enumerate,
        seed = _ref.seed;

    _classCallCheck(this, Bot);

    this.enumerateFn = enumerate;
    this.seed = seed;
    this.iterationCounter = 0;
    this._opts = {};
  }

  _createClass(Bot, [{
    key: "addOpt",
    value: function addOpt(_ref2) {
      var key = _ref2.key,
          range = _ref2.range,
          initial = _ref2.initial;
      this._opts[key] = {
        range: range,
        value: initial
      };
    }
  }, {
    key: "getOpt",
    value: function getOpt(key) {
      return this._opts[key].value;
    }
  }, {
    key: "setOpt",
    value: function setOpt(key, value) {
      if (key in this._opts) {
        this._opts[key].value = value;
      }
    }
  }, {
    key: "opts",
    value: function opts() {
      return this._opts;
    }
  }, {
    key: "enumerate",
    value: function enumerate(G, ctx, playerID) {
      var actions = this.enumerateFn(G, ctx, playerID);
      return actions.map(function (a) {
        if ('payload' in a) {
          return a;
        }

        if ('move' in a) {
          return (0, _turnOrderD7fe23d.o)(a.move, a.args, playerID);
        }

        if ('event' in a) {
          return (0, _turnOrderD7fe23d.g)(a.event, a.args, playerID);
        }
      });
    }
  }, {
    key: "random",
    value: function random(arg) {
      var number;

      if (this.seed !== undefined) {
        var r = null;

        if (this.prngstate) {
          r = new _turnOrderD7fe23d.p('', {
            state: this.prngstate
          });
        } else {
          r = new _turnOrderD7fe23d.p(this.seed, {
            state: true
          });
        }

        number = r();
        this.prngstate = r.state();
      } else {
        number = Math.random();
      }

      if (arg) {
        if (Array.isArray(arg)) {
          var id = Math.floor(number * arg.length);
          return arg[id];
        } else {
          return Math.floor(number * arg);
        }
      }

      return number;
    }
  }]);

  return Bot;
}();
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * The number of iterations to run before yielding to
 * the JS event loop (in async mode).
 */


exports.B = Bot;
var CHUNK_SIZE = 25;
/**
 * Bot that uses Monte-Carlo Tree Search to find promising moves.
 */

var MCTSBot = /*#__PURE__*/function (_Bot) {
  _inherits(MCTSBot, _Bot);

  var _super = _createSuper(MCTSBot);

  function MCTSBot(_ref3) {
    var _this;

    var enumerate = _ref3.enumerate,
        seed = _ref3.seed,
        objectives = _ref3.objectives,
        game = _ref3.game,
        iterations = _ref3.iterations,
        playoutDepth = _ref3.playoutDepth,
        iterationCallback = _ref3.iterationCallback;

    _classCallCheck(this, MCTSBot);

    _this = _super.call(this, {
      enumerate: enumerate,
      seed: seed
    });

    if (objectives === undefined) {
      objectives = function objectives() {
        return {};
      };
    }

    _this.objectives = objectives;

    _this.iterationCallback = iterationCallback || function () {};

    _this.reducer = (0, _reducer186c.C)({
      game: game
    });
    _this.iterations = iterations;
    _this.playoutDepth = playoutDepth;

    _this.addOpt({
      key: 'async',
      initial: false
    });

    _this.addOpt({
      key: 'iterations',
      initial: typeof iterations === 'number' ? iterations : 1000,
      range: {
        min: 1,
        max: 2000
      }
    });

    _this.addOpt({
      key: 'playoutDepth',
      initial: typeof playoutDepth === 'number' ? playoutDepth : 50,
      range: {
        min: 1,
        max: 100
      }
    });

    return _this;
  }

  _createClass(MCTSBot, [{
    key: "createNode",
    value: function createNode(_ref4) {
      var state = _ref4.state,
          parentAction = _ref4.parentAction,
          parent = _ref4.parent,
          playerID = _ref4.playerID;
      var G = state.G,
          ctx = state.ctx;
      var actions = [];
      var objectives = [];

      if (playerID !== undefined) {
        actions = this.enumerate(G, ctx, playerID);
        objectives = this.objectives(G, ctx, playerID);
      } else if (ctx.activePlayers) {
        for (var _playerID in ctx.activePlayers) {
          actions = actions.concat(this.enumerate(G, ctx, _playerID));
          objectives = objectives.concat(this.objectives(G, ctx, _playerID));
        }
      } else {
        actions = actions.concat(this.enumerate(G, ctx, ctx.currentPlayer));
        objectives = objectives.concat(this.objectives(G, ctx, ctx.currentPlayer));
      }

      return {
        state: state,
        parent: parent,
        parentAction: parentAction,
        actions: actions,
        objectives: objectives,
        children: [],
        visits: 0,
        value: 0
      };
    }
  }, {
    key: "select",
    value: function select(node) {
      // This node has unvisited children.
      if (node.actions.length > 0) {
        return node;
      } // This is a terminal node.


      if (node.children.length == 0) {
        return node;
      }

      var selectedChild = null;
      var best = 0.0;

      var _iterator = _createForOfIteratorHelper(node.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          var childVisits = child.visits + Number.EPSILON;
          var uct = child.value / childVisits + Math.sqrt(2 * Math.log(node.visits) / childVisits);

          if (selectedChild == null || uct > best) {
            best = uct;
            selectedChild = child;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return this.select(selectedChild);
    }
  }, {
    key: "expand",
    value: function expand(node) {
      var actions = node.actions;

      if (actions.length == 0 || node.state.ctx.gameover !== undefined) {
        return node;
      }

      var id = this.random(actions.length);
      var action = actions[id];
      node.actions.splice(id, 1);
      var childState = this.reducer(node.state, action);
      var childNode = this.createNode({
        state: childState,
        parentAction: action,
        parent: node
      });
      node.children.push(childNode);
      return childNode;
    }
  }, {
    key: "playout",
    value: function playout(_ref5) {
      var _this2 = this;

      var state = _ref5.state;
      var playoutDepth = this.getOpt('playoutDepth');

      if (typeof this.playoutDepth === 'function') {
        playoutDepth = this.playoutDepth(state.G, state.ctx);
      }

      var _loop = function _loop(i) {
        var _state = state,
            G = _state.G,
            ctx = _state.ctx;
        var playerID = ctx.currentPlayer;

        if (ctx.activePlayers) {
          playerID = Object.keys(ctx.activePlayers)[0];
        }

        var moves = _this2.enumerate(G, ctx, playerID); // Check if any objectives are met.


        var objectives = _this2.objectives(G, ctx, playerID);

        var score = Object.keys(objectives).reduce(function (score, key) {
          var objective = objectives[key];

          if (objective.checker(G, ctx)) {
            return score + objective.weight;
          }

          return score;
        }, 0.0); // If so, stop and return the score.

        if (score > 0) {
          return {
            v: {
              score: score
            }
          };
        }

        if (!moves || moves.length == 0) {
          return {
            v: undefined
          };
        }

        var id = _this2.random(moves.length);

        var childState = _this2.reducer(state, moves[id]);

        state = childState;
      };

      for (var i = 0; i < playoutDepth && state.ctx.gameover === undefined; i++) {
        var _ret = _loop(i);

        if (_typeof(_ret) === "object") return _ret.v;
      }

      return state.ctx.gameover;
    }
  }, {
    key: "backpropagate",
    value: function backpropagate(node) {
      var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      node.visits++;

      if (result.score !== undefined) {
        node.value += result.score;
      }

      if (result.draw === true) {
        node.value += 0.5;
      }

      if (node.parentAction && result.winner === node.parentAction.payload.playerID) {
        node.value++;
      }

      if (node.parent) {
        this.backpropagate(node.parent, result);
      }
    }
  }, {
    key: "play",
    value: function play(state, playerID) {
      var _this3 = this;

      var root = this.createNode({
        state: state,
        playerID: playerID
      });
      var numIterations = this.getOpt('iterations');

      if (typeof this.iterations === 'function') {
        numIterations = this.iterations(state.G, state.ctx);
      }

      var getResult = function getResult() {
        var selectedChild = null;

        var _iterator2 = _createForOfIteratorHelper(root.children),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var child = _step2.value;

            if (selectedChild == null || child.visits > selectedChild.visits) {
              selectedChild = child;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        var action = selectedChild && selectedChild.parentAction;
        var metadata = root;
        return {
          action: action,
          metadata: metadata
        };
      };

      return new Promise(function (resolve) {
        var iteration = function iteration() {
          for (var i = 0; i < CHUNK_SIZE && _this3.iterationCounter < numIterations; i++) {
            var leaf = _this3.select(root);

            var child = _this3.expand(leaf);

            var result = _this3.playout(child);

            _this3.backpropagate(child, result);

            _this3.iterationCounter++;
          }

          _this3.iterationCallback({
            iterationCounter: _this3.iterationCounter,
            numIterations: numIterations,
            metadata: root
          });
        };

        _this3.iterationCounter = 0;

        if (_this3.getOpt('async')) {
          var asyncIteration = function asyncIteration() {
            if (_this3.iterationCounter < numIterations) {
              iteration();
              setTimeout(asyncIteration, 0);
            } else {
              resolve(getResult());
            }
          };

          asyncIteration();
        } else {
          while (_this3.iterationCounter < numIterations) {
            iteration();
          }

          resolve(getResult());
        }
      });
    }
  }]);

  return MCTSBot;
}(Bot);
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Bot that picks a move at random.
 */


exports.M = MCTSBot;

var RandomBot = /*#__PURE__*/function (_Bot2) {
  _inherits(RandomBot, _Bot2);

  var _super2 = _createSuper(RandomBot);

  function RandomBot() {
    _classCallCheck(this, RandomBot);

    return _super2.apply(this, arguments);
  }

  _createClass(RandomBot, [{
    key: "play",
    value: function play(_ref6, playerID) {
      var G = _ref6.G,
          ctx = _ref6.ctx;
      var moves = this.enumerate(G, ctx, playerID);
      return Promise.resolve({
        action: this.random(moves)
      });
    }
  }]);

  return RandomBot;
}(Bot);
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Make a single move on the client with a bot.
 *
 * @param {...object} client - The game client.
 * @param {...object} bot - The bot.
 */


exports.R = RandomBot;

function Step(_x, _x2) {
  return _Step.apply(this, arguments);
}
/**
 * Simulates the game till the end or a max depth.
 *
 * @param {...object} game - The game object.
 * @param {...object} bots - An array of bots.
 * @param {...object} state - The game state to start from.
 */


function _Step() {
  _Step = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client, bot) {
    var state, playerID, _yield$bot$play, action, metadata, a;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            state = client.store.getState();
            playerID = state.ctx.currentPlayer;

            if (state.ctx.activePlayers) {
              playerID = Object.keys(state.ctx.activePlayers)[0];
            }

            _context.next = 5;
            return bot.play(state, playerID);

          case 5:
            _yield$bot$play = _context.sent;
            action = _yield$bot$play.action;
            metadata = _yield$bot$play.metadata;

            if (!action) {
              _context.next = 12;
              break;
            }

            a = _objectSpread(_objectSpread({}, action), {}, {
              payload: _objectSpread(_objectSpread({}, action.payload), {}, {
                metadata: metadata
              })
            });
            client.store.dispatch(a);
            return _context.abrupt("return", a);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _Step.apply(this, arguments);
}

function Simulate(_x3) {
  return _Simulate.apply(this, arguments);
}

function _Simulate() {
  _Simulate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref7) {
    var game, bots, state, depth, reducer, metadata, iter, playerID, bot, t;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            game = _ref7.game, bots = _ref7.bots, state = _ref7.state, depth = _ref7.depth;
            if (depth === undefined) depth = 10000;
            reducer = (0, _reducer186c.C)({
              game: game
            });
            metadata = null;
            iter = 0;

          case 5:
            if (!(state.ctx.gameover === undefined && iter < depth)) {
              _context2.next = 19;
              break;
            }

            playerID = state.ctx.currentPlayer;

            if (state.ctx.activePlayers) {
              playerID = Object.keys(state.ctx.activePlayers)[0];
            }

            bot = bots instanceof Bot ? bots : bots[playerID];
            _context2.next = 11;
            return bot.play(state, playerID);

          case 11:
            t = _context2.sent;

            if (t.action) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("break", 19);

          case 14:
            metadata = t.metadata;
            state = reducer(state, t.action);
            iter++;
            _context2.next = 5;
            break;

          case 19:
            return _context2.abrupt("return", {
              state: state,
              metadata: metadata
            });

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _Simulate.apply(this, arguments);
}
},{"./turn-order-d7fe23d9.js":"node_modules/boardgame.io/dist/esm/turn-order-d7fe23d9.js","./reducer-186c7602.js":"node_modules/boardgame.io/dist/esm/reducer-186c7602.js"}],"node_modules/boardgame.io/dist/esm/Debug-b191d299.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.D = void 0;

var _turnOrderD7fe23d = require("./turn-order-d7fe23d9.js");

var _flatted = require("flatted");

var _ai11415cb = require("./ai-11415cb8.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function noop() {}

var identity = function identity(x) {
  return x;
};

function assign(tar, src) {
  // @ts-ignore
  for (var k in src) {
    tar[k] = src[k];
  }

  return tar;
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
}

function subscribe(store, callback) {
  var unsub = store.subscribe(callback);
  return unsub.unsubscribe ? function () {
    return unsub.unsubscribe();
  } : unsub;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, fn) {
  return definition[1] ? assign({}, assign(ctx.$$scope.ctx, definition[1](fn ? fn(ctx) : {}))) : ctx.$$scope.ctx;
}

function get_slot_changes(definition, ctx, changed, fn) {
  return definition[1] ? assign({}, assign(ctx.$$scope.changed || {}, definition[1](fn ? fn(changed) : {}))) : ctx.$$scope.changed || {};
}

function exclude_internal_props(props) {
  var result = {};

  for (var k in props) {
    if (k[0] !== '$') result[k] = props[k];
  }

  return result;
}

var is_client = typeof window !== 'undefined';
var now = is_client ? function () {
  return window.performance.now();
} : function () {
  return Date.now();
};
var raf = is_client ? function (cb) {
  return requestAnimationFrame(cb);
} : noop;
var tasks = new Set();
var running = false;

function run_tasks() {
  tasks.forEach(function (task) {
    if (!task[0](now())) {
      tasks.delete(task);
      task[1]();
    }
  });
  running = tasks.size > 0;
  if (running) raf(run_tasks);
}

function loop(fn) {
  var task;

  if (!running) {
    running = true;
    raf(run_tasks);
  }

  return {
    promise: new Promise(function (fulfil) {
      tasks.add(task = [fn, fulfil]);
    }),
    abort: function abort() {
      tasks.delete(task);
    }
  };
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}

function stop_propagation(fn) {
  return function (event) {
    event.stopPropagation(); // @ts-ignore

    return fn.call(this, event);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else node.setAttribute(attribute, value);
}

function to_number(value) {
  return value === '' ? undefined : +value;
}

function children(element) {
  return Array.from(element.childNodes);
}

function set_data(text, data) {
  data = '' + data;
  if (text.data !== data) text.data = data;
}

function set_input_value(input, value) {
  if (value != null || input.value) {
    input.value = value;
  }
}

function select_option(select, value) {
  for (var i = 0; i < select.options.length; i += 1) {
    var option = select.options[i];

    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
}

function select_value(select) {
  var selected_option = select.querySelector(':checked') || select.options[0];
  return selected_option && selected_option.__value;
}

function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}

function custom_event(type, detail) {
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

var stylesheet;
var active = 0;
var current_rules = {}; // https://github.com/darkskyapp/string-hash/blob/master/index.js

function hash(str) {
  var hash = 5381;
  var i = str.length;

  while (i--) {
    hash = (hash << 5) - hash ^ str.charCodeAt(i);
  }

  return hash >>> 0;
}

function create_rule(node, a, b, duration, delay, ease, fn) {
  var uid = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var step = 16.666 / duration;
  var keyframes = '{\n';

  for (var p = 0; p <= 1; p += step) {
    var t = a + (b - a) * ease(p);
    keyframes += p * 100 + "%{".concat(fn(t, 1 - t), "}\n");
  }

  var rule = keyframes + "100% {".concat(fn(b, 1 - b), "}\n}");
  var name = "__svelte_".concat(hash(rule), "_").concat(uid);

  if (!current_rules[name]) {
    if (!stylesheet) {
      var style = element('style');
      document.head.appendChild(style);
      stylesheet = style.sheet;
    }

    current_rules[name] = true;
    stylesheet.insertRule("@keyframes ".concat(name, " ").concat(rule), stylesheet.cssRules.length);
  }

  var animation = node.style.animation || '';
  node.style.animation = "".concat(animation ? "".concat(animation, ", ") : "").concat(name, " ").concat(duration, "ms linear ").concat(delay, "ms 1 both");
  active += 1;
  return name;
}

function delete_rule(node, name) {
  node.style.animation = (node.style.animation || '').split(', ').filter(name ? function (anim) {
    return anim.indexOf(name) < 0;
  } // remove specific animation
  : function (anim) {
    return anim.indexOf('__svelte') === -1;
  } // remove all Svelte animations
  ).join(', ');
  if (name && ! --active) clear_rules();
}

function clear_rules() {
  raf(function () {
    if (active) return;
    var i = stylesheet.cssRules.length;

    while (i--) {
      stylesheet.deleteRule(i);
    }

    current_rules = {};
  });
}

var current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

function createEventDispatcher() {
  var component = current_component;
  return function (type, detail) {
    var callbacks = component.$$.callbacks[type];

    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      var event = custom_event(type, detail);
      callbacks.slice().forEach(function (fn) {
        fn.call(component, event);
      });
    }
  };
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

function getContext(key) {
  return get_current_component().$$.context.get(key);
}

var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

function flush() {
  var seen_callbacks = new Set();

  do {
    // first, call beforeUpdate functions
    // and update components
    while (dirty_components.length) {
      var component = dirty_components.shift();
      set_current_component(component);
      update(component.$$);
    }

    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    } // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (var i = 0; i < render_callbacks.length; i += 1) {
      var callback = render_callbacks[i];

      if (!seen_callbacks.has(callback)) {
        callback(); // ...so guard against infinite loops

        seen_callbacks.add(callback);
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
}

function update($$) {
  if ($$.fragment) {
    $$.update($$.dirty);
    run_all($$.before_update);
    $$.fragment.p($$.dirty, $$.ctx);
    $$.dirty = null;
    $$.after_update.forEach(add_render_callback);
  }
}

var promise;

function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(function () {
      promise = null;
    });
  }

  return promise;
}

function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event("".concat(direction ? 'intro' : 'outro').concat(kind)));
}

var outroing = new Set();
var outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

var null_transition = {
  duration: 0
};

function create_bidirectional_transition(node, fn, params, intro) {
  var config = fn(node, params);
  var t = intro ? 0 : 1;
  var running_program = null;
  var pending_program = null;
  var animation_name = null;

  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }

  function init(program, duration) {
    var d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d: d,
      duration: duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }

  function go(b) {
    var _ref = config || null_transition,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? 0 : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? 300 : _ref$duration,
        _ref$easing = _ref.easing,
        easing = _ref$easing === void 0 ? identity : _ref$easing,
        _ref$tick = _ref.tick,
        tick = _ref$tick === void 0 ? noop : _ref$tick,
        css = _ref.css;

    var program = {
      start: now() + delay,
      b: b
    };

    if (!b) {
      // @ts-ignore todo: improve typings
      program.group = outros;
      outros.r += 1;
    }

    if (running_program) {
      pending_program = program;
    } else {
      // if this is an intro, and there's a delay, we need to do
      // an initial tick and/or apply CSS animation immediately
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }

      if (b) tick(0, 1);
      running_program = init(program, duration);
      add_render_callback(function () {
        return dispatch(node, b, 'start');
      });
      loop(function (now) {
        if (pending_program && now > pending_program.start) {
          running_program = init(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, 'start');

          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
          }
        }

        if (running_program) {
          if (now >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, 'end');

            if (!pending_program) {
              // we're done
              if (running_program.b) {
                // intro — we can tidy up immediately
                clear_animation();
              } else {
                // outro — needs to be coordinated
                if (! --running_program.group.r) run_all(running_program.group.c);
              }
            }

            running_program = null;
          } else if (now >= running_program.start) {
            var p = now - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }

        return !!(running_program || pending_program);
      });
    }
  }

  return {
    run: function run(b) {
      if (is_function(config)) {
        wait().then(function () {
          // @ts-ignore
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },
    end: function end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}

var globals = typeof window !== 'undefined' ? window : global;

function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;

  while (i--) {
    var o = levels[i];
    var n = updates[i];

    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (var _key in n) {
        if (!accounted_for[_key]) {
          update[_key] = n[_key];
          accounted_for[_key] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (var _key2 in o) {
        accounted_for[_key2] = 1;
      }
    }
  }

  for (var _key3 in to_null_out) {
    if (!(_key3 in update)) update[_key3] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
}

function mount_component(component, target, anchor) {
  var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      on_mount = _component$$$.on_mount,
      on_destroy = _component$$$.on_destroy,
      after_update = _component$$$.after_update;
  fragment.m(target, anchor); // onMount happens before the initial afterUpdate

  add_render_callback(function () {
    var new_on_destroy = on_mount.map(run).filter(is_function);

    if (on_destroy) {
      on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }

    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  if (component.$$.fragment) {
    run_all(component.$$.on_destroy);
    component.$$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    component.$$.on_destroy = component.$$.fragment = null;
    component.$$.ctx = {};
  }
}

function make_dirty(component, key) {
  if (!component.$$.dirty) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty = blank_object();
  }

  component.$$.dirty[key] = true;
}

function init(component, options, instance, create_fragment, not_equal, prop_names) {
  var parent_component = current_component;
  set_current_component(component);
  var props = options.props || {};
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props: prop_names,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty: null
  };
  var ready = false;
  $$.ctx = instance ? instance(component, props, function (key, ret) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ret;

    if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
      if ($$.bound[key]) $$.bound[key](value);
      if (ready) make_dirty(component, key);
    }

    return ret;
  }) : props;
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment($$.ctx);

  if (options.target) {
    if (options.hydrate) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment.l(children(options.target));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }

  set_current_component(parent_component);
}

var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck(this, SvelteComponent);
  }

  _createClass(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set() {// overridden by instance, if it has props
    }
  }]);

  return SvelteComponent;
}();

var subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */

function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var stop;
  var subscribers = [];

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;

        for (var i = 0; i < subscribers.length; i += 1) {
          var s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return function () {
      var index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}

function cubicOut(t) {
  var f = t - 1.0;
  return f * f * f + 1.0;
}

function fly(node, _ref2) {
  var _ref2$delay = _ref2.delay,
      delay = _ref2$delay === void 0 ? 0 : _ref2$delay,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === void 0 ? 400 : _ref2$duration,
      _ref2$easing = _ref2.easing,
      easing = _ref2$easing === void 0 ? cubicOut : _ref2$easing,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? 0 : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? 0 : _ref2$y,
      _ref2$opacity = _ref2.opacity,
      opacity = _ref2$opacity === void 0 ? 0 : _ref2$opacity;
  var style = getComputedStyle(node);
  var target_opacity = +style.opacity;
  var transform = style.transform === 'none' ? '' : style.transform;
  var od = target_opacity * (1 - opacity);
  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(t, u) {
      return "\n\t\t\ttransform: ".concat(transform, " translate(").concat((1 - t) * x, "px, ").concat((1 - t) * y, "px);\n\t\t\topacity: ").concat(target_opacity - od * u);
    }
  };
}
/* src/client/debug/Menu.svelte generated by Svelte v3.12.1 */


function add_css() {
  var style = element("style");
  style.id = 'svelte-19bfq8g-style';
  style.textContent = ".menu.svelte-19bfq8g{display:flex;margin-top:-10px;flex-direction:row;border:1px solid #ccc;border-radius:5px 5px 0 0;height:25px;line-height:25px;margin-right:-500px;transform-origin:bottom right;transform:rotate(-90deg) translate(0, -500px)}.menu-item.svelte-19bfq8g{line-height:25px;cursor:pointer;background:#fefefe;color:#555;padding-left:15px;padding-right:15px;text-align:center}.menu-item.svelte-19bfq8g:last-child{border-radius:0 5px 0 0}.menu-item.svelte-19bfq8g:first-child{border-radius:5px 0 0 0}.menu-item.active.svelte-19bfq8g{cursor:default;font-weight:bold;background:#ddd;color:#555}.menu-item.svelte-19bfq8g:hover{background:#ddd;color:#555}";
  append(document.head, style);
}

function get_each_context(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.key = list[i][0];
  child_ctx.label = list[i][1].label;
  return child_ctx;
} // (55:2) {#each Object.entries(panes).reverse() as [key, {label}


function create_each_block(ctx) {
  var div,
      t0_value = ctx.label + "",
      t0,
      t1,
      dispose;

  function click_handler() {
    return ctx.click_handler(ctx);
  }

  return {
    c: function c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      attr(div, "class", "menu-item svelte-19bfq8g");
      toggle_class(div, "active", ctx.pane == ctx.key);
      dispose = listen(div, "click", click_handler);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
    },
    p: function p(changed, new_ctx) {
      ctx = new_ctx;

      if (changed.panes && t0_value !== (t0_value = ctx.label + "")) {
        set_data(t0, t0_value);
      }

      if (changed.pane || changed.panes) {
        toggle_class(div, "active", ctx.pane == ctx.key);
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      dispose();
    }
  };
}

function create_fragment(ctx) {
  var div;
  var each_value = Object.entries(ctx.panes).reverse();
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  return {
    c: function c() {
      div = element("div");

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].c();
      }

      attr(div, "class", "menu svelte-19bfq8g");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }
    },
    p: function p(changed, ctx) {
      if (changed.pane || changed.panes) {
        each_value = Object.entries(ctx.panes).reverse();

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(changed, child_ctx);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      destroy_each(each_blocks, detaching);
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  var pane = $$props.pane,
      panes = $$props.panes;
  var dispatch = createEventDispatcher();

  var click_handler = function click_handler(_ref3) {
    var key = _ref3.key;
    return dispatch('change', key);
  };

  $$self.$set = function ($$props) {
    if ('pane' in $$props) $$invalidate('pane', pane = $$props.pane);
    if ('panes' in $$props) $$invalidate('panes', panes = $$props.panes);
  };

  return {
    pane: pane,
    panes: panes,
    dispatch: dispatch,
    click_handler: click_handler
  };
}

var Menu = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(Menu, _SvelteComponent);

  var _super = _createSuper(Menu);

  function Menu(options) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this);
    if (!document.getElementById("svelte-19bfq8g-style")) add_css();
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, ["pane", "panes"]);
    return _this;
  }

  return Menu;
}(SvelteComponent);
/* src/client/debug/main/Hotkey.svelte generated by Svelte v3.12.1 */


function add_css$1() {
  var style = element("style");
  style.id = 'svelte-1olzq4i-style';
  style.textContent = ".key.svelte-1olzq4i{display:flex;flex-direction:row;align-items:center}.key-box.svelte-1olzq4i{cursor:pointer;min-width:10px;padding-left:5px;padding-right:5px;height:20px;line-height:20px;text-align:center;border:1px solid #ccc;box-shadow:1px 1px 1px #888;background:#eee;color:#444}.key-box.svelte-1olzq4i:hover{background:#ddd}.key.active.svelte-1olzq4i .key-box.svelte-1olzq4i{background:#ddd;border:1px solid #999;box-shadow:none}.label.svelte-1olzq4i{margin-left:10px}";
  append(document.head, style);
} // (77:2) {#if label}


function create_if_block(ctx) {
  var div, t;
  return {
    c: function c() {
      div = element("div");
      t = text(ctx.label);
      attr(div, "class", "label svelte-1olzq4i");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p: function p(changed, ctx) {
      if (changed.label) {
        set_data(t, ctx.label);
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}

function create_fragment$1(ctx) {
  var div1, div0, t0, t1, dispose;
  var if_block = ctx.label && create_if_block(ctx);
  return {
    c: function c() {
      div1 = element("div");
      div0 = element("div");
      t0 = text(ctx.value);
      t1 = space();
      if (if_block) if_block.c();
      attr(div0, "class", "key-box svelte-1olzq4i");
      attr(div1, "class", "key svelte-1olzq4i");
      toggle_class(div1, "active", ctx.active);
      dispose = [listen(window, "keydown", ctx.Keypress), listen(div0, "click", ctx.Activate)];
    },
    m: function m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, t0);
      append(div1, t1);
      if (if_block) if_block.m(div1, null);
    },
    p: function p(changed, ctx) {
      if (changed.value) {
        set_data(t0, ctx.value);
      }

      if (ctx.label) {
        if (if_block) {
          if_block.p(changed, ctx);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (changed.active) {
        toggle_class(div1, "active", ctx.active);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(div1);
      }

      if (if_block) if_block.d();
      run_all(dispose);
    }
  };
}

function instance$1($$self, $$props, $$invalidate) {
  var $disableHotkeys;
  var value = $$props.value,
      _$$props$onPress = $$props.onPress,
      onPress = _$$props$onPress === void 0 ? null : _$$props$onPress,
      _$$props$label = $$props.label,
      label = _$$props$label === void 0 ? null : _$$props$label,
      _$$props$disable = $$props.disable,
      disable = _$$props$disable === void 0 ? false : _$$props$disable;

  var _getContext = getContext('hotkeys'),
      disableHotkeys = _getContext.disableHotkeys;

  component_subscribe($$self, disableHotkeys, function ($$value) {
    $disableHotkeys = $$value;
    $$invalidate('$disableHotkeys', $disableHotkeys);
  });
  var active = false;

  function Deactivate() {
    $$invalidate('active', active = false);
  }

  function Activate() {
    $$invalidate('active', active = true);
    setTimeout(Deactivate, 200);

    if (onPress) {
      setTimeout(onPress, 1);
    }
  }

  function Keypress(e) {
    if (!$disableHotkeys && !disable && !e.ctrlKey && !e.metaKey && e.key == value) {
      e.preventDefault();
      Activate();
    }
  }

  $$self.$set = function ($$props) {
    if ('value' in $$props) $$invalidate('value', value = $$props.value);
    if ('onPress' in $$props) $$invalidate('onPress', onPress = $$props.onPress);
    if ('label' in $$props) $$invalidate('label', label = $$props.label);
    if ('disable' in $$props) $$invalidate('disable', disable = $$props.disable);
  };

  return {
    value: value,
    onPress: onPress,
    label: label,
    disable: disable,
    disableHotkeys: disableHotkeys,
    active: active,
    Activate: Activate,
    Keypress: Keypress
  };
}

var Hotkey = /*#__PURE__*/function (_SvelteComponent2) {
  _inherits(Hotkey, _SvelteComponent2);

  var _super2 = _createSuper(Hotkey);

  function Hotkey(options) {
    var _this2;

    _classCallCheck(this, Hotkey);

    _this2 = _super2.call(this);
    if (!document.getElementById("svelte-1olzq4i-style")) add_css$1();
    init(_assertThisInitialized(_this2), options, instance$1, create_fragment$1, safe_not_equal, ["value", "onPress", "label", "disable"]);
    return _this2;
  }

  return Hotkey;
}(SvelteComponent);
/* src/client/debug/main/InteractiveFunction.svelte generated by Svelte v3.12.1 */


function add_css$2() {
  var style = element("style");
  style.id = 'svelte-1mppqmp-style';
  style.textContent = ".move.svelte-1mppqmp{display:flex;flex-direction:row;cursor:pointer;margin-left:10px;color:#666}.move.svelte-1mppqmp:hover{color:#333}.move.active.svelte-1mppqmp{color:#111;font-weight:bold}.arg-field.svelte-1mppqmp{outline:none;font-family:monospace}";
  append(document.head, style);
}

function create_fragment$2(ctx) {
  var div, span0, t0, t1, span1, t3, span2, t4, span3, dispose;
  return {
    c: function c() {
      div = element("div");
      span0 = element("span");
      t0 = text(ctx.name);
      t1 = space();
      span1 = element("span");
      span1.textContent = "(";
      t3 = space();
      span2 = element("span");
      t4 = space();
      span3 = element("span");
      span3.textContent = ")";
      attr(span2, "class", "arg-field svelte-1mppqmp");
      attr(span2, "contenteditable", "");
      attr(div, "class", "move svelte-1mppqmp");
      toggle_class(div, "active", ctx.active);
      dispose = [listen(span2, "blur", ctx.Deactivate), listen(span2, "keypress", stop_propagation(keypress_handler)), listen(span2, "keydown", ctx.OnKeyDown), listen(div, "click", ctx.Activate)];
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, span0);
      append(span0, t0);
      append(div, t1);
      append(div, span1);
      append(div, t3);
      append(div, span2);
      ctx.span2_binding(span2);
      append(div, t4);
      append(div, span3);
    },
    p: function p(changed, ctx) {
      if (changed.name) {
        set_data(t0, ctx.name);
      }

      if (changed.active) {
        toggle_class(div, "active", ctx.active);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      ctx.span2_binding(null);
      run_all(dispose);
    }
  };
}

var keypress_handler = function keypress_handler() {};

function instance$2($$self, $$props, $$invalidate) {
  var Activate = $$props.Activate,
      Deactivate = $$props.Deactivate,
      name = $$props.name,
      active = $$props.active;
  var span;
  var dispatch = createEventDispatcher();

  function Submit() {
    try {
      var value = span.innerText;
      var argArray = new Function("return [".concat(value, "]"))();
      dispatch('submit', argArray);
    } catch (error) {
      dispatch('error', error);
    }

    $$invalidate('span', span.innerText = '', span);
  }

  function OnKeyDown(e) {
    if (e.key == 'Enter') {
      e.preventDefault();
      Submit();
    }

    if (e.key == 'Escape') {
      e.preventDefault();
      Deactivate();
    }
  }

  afterUpdate(function () {
    if (active) {
      span.focus();
    } else {
      span.blur();
    }
  });

  function span2_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](function () {
      $$invalidate('span', span = $$value);
    });
  }

  $$self.$set = function ($$props) {
    if ('Activate' in $$props) $$invalidate('Activate', Activate = $$props.Activate);
    if ('Deactivate' in $$props) $$invalidate('Deactivate', Deactivate = $$props.Deactivate);
    if ('name' in $$props) $$invalidate('name', name = $$props.name);
    if ('active' in $$props) $$invalidate('active', active = $$props.active);
  };

  return {
    Activate: Activate,
    Deactivate: Deactivate,
    name: name,
    active: active,
    span: span,
    OnKeyDown: OnKeyDown,
    span2_binding: span2_binding
  };
}

var InteractiveFunction = /*#__PURE__*/function (_SvelteComponent3) {
  _inherits(InteractiveFunction, _SvelteComponent3);

  var _super3 = _createSuper(InteractiveFunction);

  function InteractiveFunction(options) {
    var _this3;

    _classCallCheck(this, InteractiveFunction);

    _this3 = _super3.call(this);
    if (!document.getElementById("svelte-1mppqmp-style")) add_css$2();
    init(_assertThisInitialized(_this3), options, instance$2, create_fragment$2, safe_not_equal, ["Activate", "Deactivate", "name", "active"]);
    return _this3;
  }

  return InteractiveFunction;
}(SvelteComponent);
/* src/client/debug/main/Move.svelte generated by Svelte v3.12.1 */


function add_css$3() {
  var style = element("style");
  style.id = 'svelte-smqssc-style';
  style.textContent = ".move-error.svelte-smqssc{color:#a00;font-weight:bold}.wrapper.svelte-smqssc{display:flex;flex-direction:row;align-items:center}";
  append(document.head, style);
} // (65:2) {#if error}


function create_if_block$1(ctx) {
  var span, t;
  return {
    c: function c() {
      span = element("span");
      t = text(ctx.error);
      attr(span, "class", "move-error svelte-smqssc");
    },
    m: function m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p: function p(changed, ctx) {
      if (changed.error) {
        set_data(t, ctx.error);
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}

function create_fragment$3(ctx) {
  var div1, div0, t0, t1, current;
  var hotkey = new Hotkey({
    props: {
      value: ctx.shortcut,
      onPress: ctx.Activate
    }
  });
  var interactivefunction = new InteractiveFunction({
    props: {
      Activate: ctx.Activate,
      Deactivate: ctx.Deactivate,
      name: ctx.name,
      active: ctx.active
    }
  });
  interactivefunction.$on("submit", ctx.Submit);
  interactivefunction.$on("error", ctx.Error);
  var if_block = ctx.error && create_if_block$1(ctx);
  return {
    c: function c() {
      div1 = element("div");
      div0 = element("div");
      hotkey.$$.fragment.c();
      t0 = space();
      interactivefunction.$$.fragment.c();
      t1 = space();
      if (if_block) if_block.c();
      attr(div0, "class", "wrapper svelte-smqssc");
    },
    m: function m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      mount_component(hotkey, div0, null);
      append(div0, t0);
      mount_component(interactivefunction, div0, null);
      append(div1, t1);
      if (if_block) if_block.m(div1, null);
      current = true;
    },
    p: function p(changed, ctx) {
      var hotkey_changes = {};
      if (changed.shortcut) hotkey_changes.value = ctx.shortcut;
      hotkey.$set(hotkey_changes);
      var interactivefunction_changes = {};
      if (changed.name) interactivefunction_changes.name = ctx.name;
      if (changed.active) interactivefunction_changes.active = ctx.active;
      interactivefunction.$set(interactivefunction_changes);

      if (ctx.error) {
        if (if_block) {
          if_block.p(changed, ctx);
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(hotkey.$$.fragment, local);
      transition_in(interactivefunction.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(hotkey.$$.fragment, local);
      transition_out(interactivefunction.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div1);
      }

      destroy_component(hotkey);
      destroy_component(interactivefunction);
      if (if_block) if_block.d();
    }
  };
}

function instance$3($$self, $$props, $$invalidate) {
  var shortcut = $$props.shortcut,
      name = $$props.name,
      fn = $$props.fn;

  var _getContext2 = getContext('hotkeys'),
      disableHotkeys = _getContext2.disableHotkeys;

  var error$1 = '';
  var active = false;

  function Activate() {
    disableHotkeys.set(true);
    $$invalidate('active', active = true);
  }

  function Deactivate() {
    disableHotkeys.set(false);
    $$invalidate('error', error$1 = '');
    $$invalidate('active', active = false);
  }

  function Submit(e) {
    $$invalidate('error', error$1 = '');
    Deactivate();
    fn.apply(this, e.detail);
  }

  function Error(e) {
    $$invalidate('error', error$1 = e.detail);
    (0, _turnOrderD7fe23d.e)(e.detail);
  }

  $$self.$set = function ($$props) {
    if ('shortcut' in $$props) $$invalidate('shortcut', shortcut = $$props.shortcut);
    if ('name' in $$props) $$invalidate('name', name = $$props.name);
    if ('fn' in $$props) $$invalidate('fn', fn = $$props.fn);
  };

  return {
    shortcut: shortcut,
    name: name,
    fn: fn,
    error: error$1,
    active: active,
    Activate: Activate,
    Deactivate: Deactivate,
    Submit: Submit,
    Error: Error
  };
}

var Move = /*#__PURE__*/function (_SvelteComponent4) {
  _inherits(Move, _SvelteComponent4);

  var _super4 = _createSuper(Move);

  function Move(options) {
    var _this4;

    _classCallCheck(this, Move);

    _this4 = _super4.call(this);
    if (!document.getElementById("svelte-smqssc-style")) add_css$3();
    init(_assertThisInitialized(_this4), options, instance$3, create_fragment$3, safe_not_equal, ["shortcut", "name", "fn"]);
    return _this4;
  }

  return Move;
}(SvelteComponent);
/* src/client/debug/main/Controls.svelte generated by Svelte v3.12.1 */


function add_css$4() {
  var style = element("style");
  style.id = 'svelte-1x2w9i0-style';
  style.textContent = "li.svelte-1x2w9i0{list-style:none;margin:none;margin-bottom:5px}";
  append(document.head, style);
}

function create_fragment$4(ctx) {
  var section, li0, t0, li1, t1, li2, t2, li3, current;
  var hotkey0 = new Hotkey({
    props: {
      value: "1",
      onPress: ctx.client.reset,
      label: "reset"
    }
  });
  var hotkey1 = new Hotkey({
    props: {
      value: "2",
      onPress: ctx.Save,
      label: "save"
    }
  });
  var hotkey2 = new Hotkey({
    props: {
      value: "3",
      onPress: ctx.Restore,
      label: "restore"
    }
  });
  var hotkey3 = new Hotkey({
    props: {
      value: ".",
      disable: true,
      label: "hide"
    }
  });
  return {
    c: function c() {
      section = element("section");
      li0 = element("li");
      hotkey0.$$.fragment.c();
      t0 = space();
      li1 = element("li");
      hotkey1.$$.fragment.c();
      t1 = space();
      li2 = element("li");
      hotkey2.$$.fragment.c();
      t2 = space();
      li3 = element("li");
      hotkey3.$$.fragment.c();
      attr(li0, "class", "svelte-1x2w9i0");
      attr(li1, "class", "svelte-1x2w9i0");
      attr(li2, "class", "svelte-1x2w9i0");
      attr(li3, "class", "svelte-1x2w9i0");
      attr(section, "id", "debug-controls");
      attr(section, "class", "controls");
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      append(section, li0);
      mount_component(hotkey0, li0, null);
      append(section, t0);
      append(section, li1);
      mount_component(hotkey1, li1, null);
      append(section, t1);
      append(section, li2);
      mount_component(hotkey2, li2, null);
      append(section, t2);
      append(section, li3);
      mount_component(hotkey3, li3, null);
      current = true;
    },
    p: function p(changed, ctx) {
      var hotkey0_changes = {};
      if (changed.client) hotkey0_changes.onPress = ctx.client.reset;
      hotkey0.$set(hotkey0_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(hotkey0.$$.fragment, local);
      transition_in(hotkey1.$$.fragment, local);
      transition_in(hotkey2.$$.fragment, local);
      transition_in(hotkey3.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(hotkey0.$$.fragment, local);
      transition_out(hotkey1.$$.fragment, local);
      transition_out(hotkey2.$$.fragment, local);
      transition_out(hotkey3.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(section);
      }

      destroy_component(hotkey0);
      destroy_component(hotkey1);
      destroy_component(hotkey2);
      destroy_component(hotkey3);
    }
  };
}

function instance$4($$self, $$props, $$invalidate) {
  var client = $$props.client;

  function Save() {
    // get state to persist and overwrite deltalog, _undo, and _redo
    var state = client.getState();
    var json = (0, _flatted.stringify)(_objectSpread(_objectSpread({}, state), {}, {
      _undo: [],
      _redo: [],
      deltalog: []
    }));
    window.localStorage.setItem('gamestate', json);
    window.localStorage.setItem('initialState', (0, _flatted.stringify)(client.initialState));
  }

  function Restore() {
    var gamestateJSON = window.localStorage.getItem('gamestate');
    var initialStateJSON = window.localStorage.getItem('initialState');

    if (gamestateJSON !== null && initialStateJSON !== null) {
      var gamestate = (0, _flatted.parse)(gamestateJSON);
      var initialState = (0, _flatted.parse)(initialStateJSON);
      client.store.dispatch((0, _turnOrderD7fe23d.s)({
        state: gamestate,
        initialState: initialState
      }));
    }
  }

  $$self.$set = function ($$props) {
    if ('client' in $$props) $$invalidate('client', client = $$props.client);
  };

  return {
    client: client,
    Save: Save,
    Restore: Restore
  };
}

var Controls = /*#__PURE__*/function (_SvelteComponent5) {
  _inherits(Controls, _SvelteComponent5);

  var _super5 = _createSuper(Controls);

  function Controls(options) {
    var _this5;

    _classCallCheck(this, Controls);

    _this5 = _super5.call(this);
    if (!document.getElementById("svelte-1x2w9i0-style")) add_css$4();
    init(_assertThisInitialized(_this5), options, instance$4, create_fragment$4, safe_not_equal, ["client"]);
    return _this5;
  }

  return Controls;
}(SvelteComponent);
/* src/client/debug/main/PlayerInfo.svelte generated by Svelte v3.12.1 */


function add_css$5() {
  var style = element("style");
  style.id = 'svelte-6sf87x-style';
  style.textContent = ".player-box.svelte-6sf87x{display:flex;flex-direction:row}.player.svelte-6sf87x{cursor:pointer;text-align:center;width:30px;height:30px;line-height:30px;background:#eee;border:3px solid #fefefe;box-sizing:content-box}.player.current.svelte-6sf87x{background:#555;color:#eee;font-weight:bold}.player.active.svelte-6sf87x{border:3px solid #ff7f50}";
  append(document.head, style);
}

function get_each_context$1(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.player = list[i];
  return child_ctx;
} // (49:2) {#each players as player}


function create_each_block$1(ctx) {
  var div,
      t0_value = ctx.player + "",
      t0,
      t1,
      dispose;

  function click_handler() {
    return ctx.click_handler(ctx);
  }

  return {
    c: function c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      attr(div, "class", "player svelte-6sf87x");
      toggle_class(div, "current", ctx.player == ctx.ctx.currentPlayer);
      toggle_class(div, "active", ctx.player == ctx.playerID);
      dispose = listen(div, "click", click_handler);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
    },
    p: function p(changed, new_ctx) {
      ctx = new_ctx;

      if (changed.players && t0_value !== (t0_value = ctx.player + "")) {
        set_data(t0, t0_value);
      }

      if (changed.players || changed.ctx) {
        toggle_class(div, "current", ctx.player == ctx.ctx.currentPlayer);
      }

      if (changed.players || changed.playerID) {
        toggle_class(div, "active", ctx.player == ctx.playerID);
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      dispose();
    }
  };
}

function create_fragment$5(ctx) {
  var div;
  var each_value = ctx.players;
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  return {
    c: function c() {
      div = element("div");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      attr(div, "class", "player-box svelte-6sf87x");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].m(div, null);
      }
    },
    p: function p(changed, ctx) {
      if (changed.players || changed.ctx || changed.playerID) {
        each_value = ctx.players;

        var _i7;

        for (_i7 = 0; _i7 < each_value.length; _i7 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i7);

          if (each_blocks[_i7]) {
            each_blocks[_i7].p(changed, child_ctx);
          } else {
            each_blocks[_i7] = create_each_block$1(child_ctx);

            each_blocks[_i7].c();

            each_blocks[_i7].m(div, null);
          }
        }

        for (; _i7 < each_blocks.length; _i7 += 1) {
          each_blocks[_i7].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      destroy_each(each_blocks, detaching);
    }
  };
}

function instance$5($$self, $$props, $$invalidate) {
  var ctx = $$props.ctx,
      playerID = $$props.playerID;
  var dispatch = createEventDispatcher();

  function OnClick(player) {
    if (player == playerID) {
      dispatch("change", {
        playerID: null
      });
    } else {
      dispatch("change", {
        playerID: player
      });
    }
  }

  var players;

  var click_handler = function click_handler(_ref4) {
    var player = _ref4.player;
    return OnClick(player);
  };

  $$self.$set = function ($$props) {
    if ('ctx' in $$props) $$invalidate('ctx', ctx = $$props.ctx);
    if ('playerID' in $$props) $$invalidate('playerID', playerID = $$props.playerID);
  };

  $$self.$$.update = function () {
    var $$dirty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      ctx: 1
    };

    if ($$dirty.ctx) {
      $$invalidate('players', players = ctx ? _toConsumableArray(Array(ctx.numPlayers).keys()).map(function (i) {
        return i.toString();
      }) : []);
    }
  };

  return {
    ctx: ctx,
    playerID: playerID,
    OnClick: OnClick,
    players: players,
    click_handler: click_handler
  };
}

var PlayerInfo = /*#__PURE__*/function (_SvelteComponent6) {
  _inherits(PlayerInfo, _SvelteComponent6);

  var _super6 = _createSuper(PlayerInfo);

  function PlayerInfo(options) {
    var _this6;

    _classCallCheck(this, PlayerInfo);

    _this6 = _super6.call(this);
    if (!document.getElementById("svelte-6sf87x-style")) add_css$5();
    init(_assertThisInitialized(_this6), options, instance$5, create_fragment$5, safe_not_equal, ["ctx", "playerID"]);
    return _this6;
  }

  return PlayerInfo;
}(SvelteComponent);
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


function AssignShortcuts(moveNames, eventNames, blacklist) {
  var shortcuts = {};
  var events = {};

  for (var name in moveNames) {
    events[name] = name;
  }

  for (var _name in eventNames) {
    events[_name] = _name;
  }

  var taken = {};

  for (var i = 0; i < blacklist.length; i++) {
    var c = blacklist[i];
    taken[c] = true;
  } // Try assigning the first char of each move as the shortcut.


  var t = taken;
  var canUseFirstChar = true;

  for (var _name2 in events) {
    var shortcut = _name2[0];

    if (t[shortcut]) {
      canUseFirstChar = false;
      break;
    }

    t[shortcut] = true;
    shortcuts[_name2] = shortcut;
  }

  if (canUseFirstChar) {
    return shortcuts;
  } // If those aren't unique, use a-z.


  t = taken;
  var next = 97;
  shortcuts = {};

  for (var _name3 in events) {
    var _shortcut = String.fromCharCode(next);

    while (t[_shortcut]) {
      next++;
      _shortcut = String.fromCharCode(next);
    }

    t[_shortcut] = true;
    shortcuts[_name3] = _shortcut;
  }

  return shortcuts;
}
/* src/client/debug/main/Main.svelte generated by Svelte v3.12.1 */


function add_css$6() {
  var style = element("style");
  style.id = 'svelte-1vg2l2b-style';
  style.textContent = ".json.svelte-1vg2l2b{font-family:monospace;color:#888}label.svelte-1vg2l2b{font-weight:bold;font-size:1.1em;display:inline}h3.svelte-1vg2l2b{text-transform:uppercase}li.svelte-1vg2l2b{list-style:none;margin:none;margin-bottom:5px}.events.svelte-1vg2l2b{display:flex;flex-direction:column}.events.svelte-1vg2l2b button.svelte-1vg2l2b{width:100px}.events.svelte-1vg2l2b button.svelte-1vg2l2b:not(:last-child){margin-bottom:10px}";
  append(document.head, style);
}

function get_each_context$2(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.name = list[i][0];
  child_ctx.fn = list[i][1];
  return child_ctx;
} // (85:2) {#each Object.entries(client.moves) as [name, fn]}


function create_each_block$2(ctx) {
  var li, t, current;
  var move = new Move({
    props: {
      shortcut: ctx.shortcuts[ctx.name],
      fn: ctx.fn,
      name: ctx.name
    }
  });
  return {
    c: function c() {
      li = element("li");
      move.$$.fragment.c();
      t = space();
      attr(li, "class", "svelte-1vg2l2b");
    },
    m: function m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      append(li, t);
      current = true;
    },
    p: function p(changed, ctx) {
      var move_changes = {};
      if (changed.client) move_changes.shortcut = ctx.shortcuts[ctx.name];
      if (changed.client) move_changes.fn = ctx.fn;
      if (changed.client) move_changes.name = ctx.name;
      move.$set(move_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(li);
      }

      destroy_component(move);
    }
  };
} // (96:2) {#if client.events.endTurn}


function create_if_block_2(ctx) {
  var button, dispose;
  return {
    c: function c() {
      button = element("button");
      button.textContent = "End Turn";
      attr(button, "class", "svelte-1vg2l2b");
      dispose = listen(button, "click", ctx.click_handler);
    },
    m: function m(target, anchor) {
      insert(target, button, anchor);
    },
    d: function d(detaching) {
      if (detaching) {
        detach(button);
      }

      dispose();
    }
  };
} // (99:2) {#if ctx.phase && client.events.endPhase}


function create_if_block_1(ctx) {
  var button, dispose;
  return {
    c: function c() {
      button = element("button");
      button.textContent = "End Phase";
      attr(button, "class", "svelte-1vg2l2b");
      dispose = listen(button, "click", ctx.click_handler_1);
    },
    m: function m(target, anchor) {
      insert(target, button, anchor);
    },
    d: function d(detaching) {
      if (detaching) {
        detach(button);
      }

      dispose();
    }
  };
} // (102:2) {#if ctx.activePlayers && client.events.endStage}


function create_if_block$2(ctx) {
  var button, dispose;
  return {
    c: function c() {
      button = element("button");
      button.textContent = "End Stage";
      attr(button, "class", "svelte-1vg2l2b");
      dispose = listen(button, "click", ctx.click_handler_2);
    },
    m: function m(target, anchor) {
      insert(target, button, anchor);
    },
    d: function d(detaching) {
      if (detaching) {
        detach(button);
      }

      dispose();
    }
  };
}

function create_fragment$6(ctx) {
  var section0,
      h30,
      t1,
      t2,
      section1,
      h31,
      t4,
      t5,
      section2,
      h32,
      t7,
      t8,
      section3,
      h33,
      t10,
      div,
      t11,
      t12,
      t13,
      section4,
      label0,
      t15,
      pre0,
      t16_value = JSON.stringify(ctx.G, null, 2) + "",
      t16,
      t17,
      section5,
      label1,
      t19,
      pre1,
      t20_value = JSON.stringify(SanitizeCtx(ctx.ctx), null, 2) + "",
      t20,
      current;
  var controls = new Controls({
    props: {
      client: ctx.client
    }
  });
  var playerinfo = new PlayerInfo({
    props: {
      ctx: ctx.ctx,
      playerID: ctx.playerID
    }
  });
  playerinfo.$on("change", ctx.change_handler);
  var each_value = Object.entries(ctx.client.moves);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var if_block0 = ctx.client.events.endTurn && create_if_block_2(ctx);
  var if_block1 = ctx.ctx.phase && ctx.client.events.endPhase && create_if_block_1(ctx);
  var if_block2 = ctx.ctx.activePlayers && ctx.client.events.endStage && create_if_block$2(ctx);
  return {
    c: function c() {
      section0 = element("section");
      h30 = element("h3");
      h30.textContent = "Controls";
      t1 = space();
      controls.$$.fragment.c();
      t2 = space();
      section1 = element("section");
      h31 = element("h3");
      h31.textContent = "Players";
      t4 = space();
      playerinfo.$$.fragment.c();
      t5 = space();
      section2 = element("section");
      h32 = element("h3");
      h32.textContent = "Moves";
      t7 = space();

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].c();
      }

      t8 = space();
      section3 = element("section");
      h33 = element("h3");
      h33.textContent = "Events";
      t10 = space();
      div = element("div");
      if (if_block0) if_block0.c();
      t11 = space();
      if (if_block1) if_block1.c();
      t12 = space();
      if (if_block2) if_block2.c();
      t13 = space();
      section4 = element("section");
      label0 = element("label");
      label0.textContent = "G";
      t15 = space();
      pre0 = element("pre");
      t16 = text(t16_value);
      t17 = space();
      section5 = element("section");
      label1 = element("label");
      label1.textContent = "ctx";
      t19 = space();
      pre1 = element("pre");
      t20 = text(t20_value);
      attr(h30, "class", "svelte-1vg2l2b");
      attr(h31, "class", "svelte-1vg2l2b");
      attr(h32, "class", "svelte-1vg2l2b");
      attr(h33, "class", "svelte-1vg2l2b");
      attr(div, "class", "events svelte-1vg2l2b");
      attr(label0, "class", "svelte-1vg2l2b");
      attr(pre0, "class", "json svelte-1vg2l2b");
      attr(label1, "class", "svelte-1vg2l2b");
      attr(pre1, "class", "json svelte-1vg2l2b");
    },
    m: function m(target, anchor) {
      insert(target, section0, anchor);
      append(section0, h30);
      append(section0, t1);
      mount_component(controls, section0, null);
      insert(target, t2, anchor);
      insert(target, section1, anchor);
      append(section1, h31);
      append(section1, t4);
      mount_component(playerinfo, section1, null);
      insert(target, t5, anchor);
      insert(target, section2, anchor);
      append(section2, h32);
      append(section2, t7);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(section2, null);
      }

      insert(target, t8, anchor);
      insert(target, section3, anchor);
      append(section3, h33);
      append(section3, t10);
      append(section3, div);
      if (if_block0) if_block0.m(div, null);
      append(div, t11);
      if (if_block1) if_block1.m(div, null);
      append(div, t12);
      if (if_block2) if_block2.m(div, null);
      insert(target, t13, anchor);
      insert(target, section4, anchor);
      append(section4, label0);
      append(section4, t15);
      append(section4, pre0);
      append(pre0, t16);
      insert(target, t17, anchor);
      insert(target, section5, anchor);
      append(section5, label1);
      append(section5, t19);
      append(section5, pre1);
      append(pre1, t20);
      current = true;
    },
    p: function p(changed, ctx) {
      var controls_changes = {};
      if (changed.client) controls_changes.client = ctx.client;
      controls.$set(controls_changes);
      var playerinfo_changes = {};
      if (changed.ctx) playerinfo_changes.ctx = ctx.ctx;
      if (changed.playerID) playerinfo_changes.playerID = ctx.playerID;
      playerinfo.$set(playerinfo_changes);

      if (changed.shortcuts || changed.client) {
        each_value = Object.entries(ctx.client.moves);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context$2(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(changed, child_ctx);

            transition_in(each_blocks[_i10], 1);
          } else {
            each_blocks[_i10] = create_each_block$2(child_ctx);

            each_blocks[_i10].c();

            transition_in(each_blocks[_i10], 1);

            each_blocks[_i10].m(section2, null);
          }
        }

        group_outros();

        for (_i10 = each_value.length; _i10 < each_blocks.length; _i10 += 1) {
          out(_i10);
        }

        check_outros();
      }

      if (ctx.client.events.endTurn) {
        if (!if_block0) {
          if_block0 = create_if_block_2(ctx);
          if_block0.c();
          if_block0.m(div, t11);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (ctx.ctx.phase && ctx.client.events.endPhase) {
        if (!if_block1) {
          if_block1 = create_if_block_1(ctx);
          if_block1.c();
          if_block1.m(div, t12);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (ctx.ctx.activePlayers && ctx.client.events.endStage) {
        if (!if_block2) {
          if_block2 = create_if_block$2(ctx);
          if_block2.c();
          if_block2.m(div, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if ((!current || changed.G) && t16_value !== (t16_value = JSON.stringify(ctx.G, null, 2) + "")) {
        set_data(t16, t16_value);
      }

      if ((!current || changed.ctx) && t20_value !== (t20_value = JSON.stringify(SanitizeCtx(ctx.ctx), null, 2) + "")) {
        set_data(t20, t20_value);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(controls.$$.fragment, local);
      transition_in(playerinfo.$$.fragment, local);

      for (var _i11 = 0; _i11 < each_value.length; _i11 += 1) {
        transition_in(each_blocks[_i11]);
      }

      current = true;
    },
    o: function o(local) {
      transition_out(controls.$$.fragment, local);
      transition_out(playerinfo.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        transition_out(each_blocks[_i12]);
      }

      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(section0);
      }

      destroy_component(controls);

      if (detaching) {
        detach(t2);
        detach(section1);
      }

      destroy_component(playerinfo);

      if (detaching) {
        detach(t5);
        detach(section2);
      }

      destroy_each(each_blocks, detaching);

      if (detaching) {
        detach(t8);
        detach(section3);
      }

      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();

      if (detaching) {
        detach(t13);
        detach(section4);
        detach(t17);
        detach(section5);
      }
    }
  };
}

function SanitizeCtx(ctx) {
  var r = {};

  for (var key in ctx) {
    if (!key.startsWith('_')) {
      r[key] = ctx[key];
    }
  }

  return r;
}

function instance$6($$self, $$props, $$invalidate) {
  var client = $$props.client;
  var shortcuts = AssignShortcuts(client.moves, client.events, 'mlia');
  var playerID = client.playerID;
  var ctx = {};
  var G = {};
  client.subscribe(function (state) {
    if (state) {
      $$invalidate('G', G = state.G);
      $$invalidate('ctx', ctx = state.ctx);
    }

    $$invalidate('playerID', playerID = client.playerID);
  });

  var change_handler = function change_handler(e) {
    return client.updatePlayerID(e.detail.playerID);
  };

  var click_handler = function click_handler() {
    return client.events.endTurn();
  };

  var click_handler_1 = function click_handler_1() {
    return client.events.endPhase();
  };

  var click_handler_2 = function click_handler_2() {
    return client.events.endStage();
  };

  $$self.$set = function ($$props) {
    if ('client' in $$props) $$invalidate('client', client = $$props.client);
  };

  return {
    client: client,
    shortcuts: shortcuts,
    playerID: playerID,
    ctx: ctx,
    G: G,
    change_handler: change_handler,
    click_handler: click_handler,
    click_handler_1: click_handler_1,
    click_handler_2: click_handler_2
  };
}

var Main = /*#__PURE__*/function (_SvelteComponent7) {
  _inherits(Main, _SvelteComponent7);

  var _super7 = _createSuper(Main);

  function Main(options) {
    var _this7;

    _classCallCheck(this, Main);

    _this7 = _super7.call(this);
    if (!document.getElementById("svelte-1vg2l2b-style")) add_css$6();
    init(_assertThisInitialized(_this7), options, instance$6, create_fragment$6, safe_not_equal, ["client"]);
    return _this7;
  }

  return Main;
}(SvelteComponent);
/* src/client/debug/info/Item.svelte generated by Svelte v3.12.1 */


function add_css$7() {
  var style = element("style");
  style.id = 'svelte-13qih23-style';
  style.textContent = ".item.svelte-13qih23{padding:10px}.item.svelte-13qih23:not(:first-child){border-top:1px dashed #aaa}.item.svelte-13qih23 div.svelte-13qih23{float:right;text-align:right}";
  append(document.head, style);
}

function create_fragment$7(ctx) {
  var div1,
      strong,
      t0,
      t1,
      div0,
      t2_value = JSON.stringify(ctx.value) + "",
      t2;
  return {
    c: function c() {
      div1 = element("div");
      strong = element("strong");
      t0 = text(ctx.name);
      t1 = space();
      div0 = element("div");
      t2 = text(t2_value);
      attr(div0, "class", "svelte-13qih23");
      attr(div1, "class", "item svelte-13qih23");
    },
    m: function m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, strong);
      append(strong, t0);
      append(div1, t1);
      append(div1, div0);
      append(div0, t2);
    },
    p: function p(changed, ctx) {
      if (changed.name) {
        set_data(t0, ctx.name);
      }

      if (changed.value && t2_value !== (t2_value = JSON.stringify(ctx.value) + "")) {
        set_data(t2, t2_value);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(div1);
      }
    }
  };
}

function instance$7($$self, $$props, $$invalidate) {
  var name = $$props.name,
      value = $$props.value;

  $$self.$set = function ($$props) {
    if ('name' in $$props) $$invalidate('name', name = $$props.name);
    if ('value' in $$props) $$invalidate('value', value = $$props.value);
  };

  return {
    name: name,
    value: value
  };
}

var Item = /*#__PURE__*/function (_SvelteComponent8) {
  _inherits(Item, _SvelteComponent8);

  var _super8 = _createSuper(Item);

  function Item(options) {
    var _this8;

    _classCallCheck(this, Item);

    _this8 = _super8.call(this);
    if (!document.getElementById("svelte-13qih23-style")) add_css$7();
    init(_assertThisInitialized(_this8), options, instance$7, create_fragment$7, safe_not_equal, ["name", "value"]);
    return _this8;
  }

  return Item;
}(SvelteComponent);
/* src/client/debug/info/Info.svelte generated by Svelte v3.12.1 */


function add_css$8() {
  var style = element("style");
  style.id = 'svelte-1yzq5o8-style';
  style.textContent = ".gameinfo.svelte-1yzq5o8{padding:10px}";
  append(document.head, style);
} // (17:2) {#if $client.isMultiplayer}


function create_if_block$3(ctx) {
  var span, t, current;
  var item0 = new Item({
    props: {
      name: "isConnected",
      value: ctx.$client.isConnected
    }
  });
  var item1 = new Item({
    props: {
      name: "isMultiplayer",
      value: ctx.$client.isMultiplayer
    }
  });
  return {
    c: function c() {
      span = element("span");
      item0.$$.fragment.c();
      t = space();
      item1.$$.fragment.c();
    },
    m: function m(target, anchor) {
      insert(target, span, anchor);
      mount_component(item0, span, null);
      append(span, t);
      mount_component(item1, span, null);
      current = true;
    },
    p: function p(changed, ctx) {
      var item0_changes = {};
      if (changed.$client) item0_changes.value = ctx.$client.isConnected;
      item0.$set(item0_changes);
      var item1_changes = {};
      if (changed.$client) item1_changes.value = ctx.$client.isMultiplayer;
      item1.$set(item1_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(item0.$$.fragment, local);
      transition_in(item1.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(item0.$$.fragment, local);
      transition_out(item1.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(span);
      }

      destroy_component(item0);
      destroy_component(item1);
    }
  };
}

function create_fragment$8(ctx) {
  var section, t0, t1, t2, current;
  var item0 = new Item({
    props: {
      name: "gameID",
      value: ctx.client.gameID
    }
  });
  var item1 = new Item({
    props: {
      name: "playerID",
      value: ctx.client.playerID
    }
  });
  var item2 = new Item({
    props: {
      name: "isActive",
      value: ctx.$client.isActive
    }
  });
  var if_block = ctx.$client.isMultiplayer && create_if_block$3(ctx);
  return {
    c: function c() {
      section = element("section");
      item0.$$.fragment.c();
      t0 = space();
      item1.$$.fragment.c();
      t1 = space();
      item2.$$.fragment.c();
      t2 = space();
      if (if_block) if_block.c();
      attr(section, "class", "gameinfo svelte-1yzq5o8");
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      mount_component(item0, section, null);
      append(section, t0);
      mount_component(item1, section, null);
      append(section, t1);
      mount_component(item2, section, null);
      append(section, t2);
      if (if_block) if_block.m(section, null);
      current = true;
    },
    p: function p(changed, ctx) {
      var item0_changes = {};
      if (changed.client) item0_changes.value = ctx.client.gameID;
      item0.$set(item0_changes);
      var item1_changes = {};
      if (changed.client) item1_changes.value = ctx.client.playerID;
      item1.$set(item1_changes);
      var item2_changes = {};
      if (changed.$client) item2_changes.value = ctx.$client.isActive;
      item2.$set(item2_changes);

      if (ctx.$client.isMultiplayer) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
        } else {
          if_block = create_if_block$3(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(section, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(item0.$$.fragment, local);
      transition_in(item1.$$.fragment, local);
      transition_in(item2.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(item0.$$.fragment, local);
      transition_out(item1.$$.fragment, local);
      transition_out(item2.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(section);
      }

      destroy_component(item0);
      destroy_component(item1);
      destroy_component(item2);
      if (if_block) if_block.d();
    }
  };
}

function instance$8($$self, $$props, $$invalidate) {
  var $client;
  var client = $$props.client;
  component_subscribe($$self, client, function ($$value) {
    $client = $$value;
    $$invalidate('$client', $client);
  });

  $$self.$set = function ($$props) {
    if ('client' in $$props) $$invalidate('client', client = $$props.client);
  };

  return {
    client: client,
    $client: $client
  };
}

var Info = /*#__PURE__*/function (_SvelteComponent9) {
  _inherits(Info, _SvelteComponent9);

  var _super9 = _createSuper(Info);

  function Info(options) {
    var _this9;

    _classCallCheck(this, Info);

    _this9 = _super9.call(this);
    if (!document.getElementById("svelte-1yzq5o8-style")) add_css$8();
    init(_assertThisInitialized(_this9), options, instance$8, create_fragment$8, safe_not_equal, ["client"]);
    return _this9;
  }

  return Info;
}(SvelteComponent);
/* src/client/debug/log/TurnMarker.svelte generated by Svelte v3.12.1 */


function add_css$9() {
  var style = element("style");
  style.id = 'svelte-6eza86-style';
  style.textContent = ".turn-marker.svelte-6eza86{display:flex;justify-content:center;align-items:center;grid-column:1;background:#555;color:#eee;text-align:center;font-weight:bold;border:1px solid #888}";
  append(document.head, style);
}

function create_fragment$9(ctx) {
  var div, t;
  return {
    c: function c() {
      div = element("div");
      t = text(ctx.turn);
      attr(div, "class", "turn-marker svelte-6eza86");
      attr(div, "style", ctx.style);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p: function p(changed, ctx) {
      if (changed.turn) {
        set_data(t, ctx.turn);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}

function instance$9($$self, $$props, $$invalidate) {
  var turn = $$props.turn,
      numEvents = $$props.numEvents;
  var style = "grid-row: span ".concat(numEvents);

  $$self.$set = function ($$props) {
    if ('turn' in $$props) $$invalidate('turn', turn = $$props.turn);
    if ('numEvents' in $$props) $$invalidate('numEvents', numEvents = $$props.numEvents);
  };

  return {
    turn: turn,
    numEvents: numEvents,
    style: style
  };
}

var TurnMarker = /*#__PURE__*/function (_SvelteComponent10) {
  _inherits(TurnMarker, _SvelteComponent10);

  var _super10 = _createSuper(TurnMarker);

  function TurnMarker(options) {
    var _this10;

    _classCallCheck(this, TurnMarker);

    _this10 = _super10.call(this);
    if (!document.getElementById("svelte-6eza86-style")) add_css$9();
    init(_assertThisInitialized(_this10), options, instance$9, create_fragment$9, safe_not_equal, ["turn", "numEvents"]);
    return _this10;
  }

  return TurnMarker;
}(SvelteComponent);
/* src/client/debug/log/PhaseMarker.svelte generated by Svelte v3.12.1 */


function add_css$a() {
  var style = element("style");
  style.id = 'svelte-1t4xap-style';
  style.textContent = ".phase-marker.svelte-1t4xap{grid-column:3;background:#555;border:1px solid #888;color:#eee;text-align:center;font-weight:bold;padding-top:10px;padding-bottom:10px;text-orientation:sideways;writing-mode:vertical-rl;line-height:30px;width:100%}";
  append(document.head, style);
}

function create_fragment$a(ctx) {
  var div,
      t_value = ctx.phase || '' + "",
      t;
  return {
    c: function c() {
      div = element("div");
      t = text(t_value);
      attr(div, "class", "phase-marker svelte-1t4xap");
      attr(div, "style", ctx.style);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p: function p(changed, ctx) {
      if (changed.phase && t_value !== (t_value = ctx.phase || '' + "")) {
        set_data(t, t_value);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}

function instance$a($$self, $$props, $$invalidate) {
  var phase = $$props.phase,
      numEvents = $$props.numEvents;
  var style = "grid-row: span ".concat(numEvents);

  $$self.$set = function ($$props) {
    if ('phase' in $$props) $$invalidate('phase', phase = $$props.phase);
    if ('numEvents' in $$props) $$invalidate('numEvents', numEvents = $$props.numEvents);
  };

  return {
    phase: phase,
    numEvents: numEvents,
    style: style
  };
}

var PhaseMarker = /*#__PURE__*/function (_SvelteComponent11) {
  _inherits(PhaseMarker, _SvelteComponent11);

  var _super11 = _createSuper(PhaseMarker);

  function PhaseMarker(options) {
    var _this11;

    _classCallCheck(this, PhaseMarker);

    _this11 = _super11.call(this);
    if (!document.getElementById("svelte-1t4xap-style")) add_css$a();
    init(_assertThisInitialized(_this11), options, instance$a, create_fragment$a, safe_not_equal, ["phase", "numEvents"]);
    return _this11;
  }

  return PhaseMarker;
}(SvelteComponent);
/* src/client/debug/log/CustomPayload.svelte generated by Svelte v3.12.1 */


function create_fragment$b(ctx) {
  var div, t;
  return {
    c: function c() {
      div = element("div");
      t = text(ctx.custompayload);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}

function instance$b($$self, $$props, $$invalidate) {
  var payload = $$props.payload;
  var custompayload = payload !== undefined ? JSON.stringify(payload, null, 4) : '';

  $$self.$set = function ($$props) {
    if ('payload' in $$props) $$invalidate('payload', payload = $$props.payload);
  };

  return {
    payload: payload,
    custompayload: custompayload
  };
}

var CustomPayload = /*#__PURE__*/function (_SvelteComponent12) {
  _inherits(CustomPayload, _SvelteComponent12);

  var _super12 = _createSuper(CustomPayload);

  function CustomPayload(options) {
    var _this12;

    _classCallCheck(this, CustomPayload);

    _this12 = _super12.call(this);
    init(_assertThisInitialized(_this12), options, instance$b, create_fragment$b, safe_not_equal, ["payload"]);
    return _this12;
  }

  return CustomPayload;
}(SvelteComponent);
/* src/client/debug/log/LogEvent.svelte generated by Svelte v3.12.1 */


function add_css$b() {
  var style = element("style");
  style.id = 'svelte-10wdo7v-style';
  style.textContent = ".log-event.svelte-10wdo7v{grid-column:2;cursor:pointer;overflow:hidden;display:flex;flex-direction:column;justify-content:center;background:#fff;border:1px dotted #ccc;border-left:5px solid #ccc;padding:5px;text-align:center;color:#888;font-size:14px;min-height:25px;line-height:25px}.log-event.svelte-10wdo7v:hover{border-style:solid;background:#eee}.log-event.pinned.svelte-10wdo7v{border-style:solid;background:#eee;opacity:1}.player0.svelte-10wdo7v{border-left-color:#ff851b}.player1.svelte-10wdo7v{border-left-color:#7fdbff}.player2.svelte-10wdo7v{border-left-color:#0074d9}.player3.svelte-10wdo7v{border-left-color:#39cccc}.player4.svelte-10wdo7v{border-left-color:#3d9970}.player5.svelte-10wdo7v{border-left-color:#2ecc40}.player6.svelte-10wdo7v{border-left-color:#01ff70}.player7.svelte-10wdo7v{border-left-color:#ffdc00}.player8.svelte-10wdo7v{border-left-color:#001f3f}.player9.svelte-10wdo7v{border-left-color:#ff4136}.player10.svelte-10wdo7v{border-left-color:#85144b}.player11.svelte-10wdo7v{border-left-color:#f012be}.player12.svelte-10wdo7v{border-left-color:#b10dc9}.player13.svelte-10wdo7v{border-left-color:#111111}.player14.svelte-10wdo7v{border-left-color:#aaaaaa}.player15.svelte-10wdo7v{border-left-color:#dddddd}";
  append(document.head, style);
} // (122:2) {:else}


function create_else_block(ctx) {
  var current;
  var custompayload = new CustomPayload({
    props: {
      payload: ctx.payload
    }
  });
  return {
    c: function c() {
      custompayload.$$.fragment.c();
    },
    m: function m(target, anchor) {
      mount_component(custompayload, target, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      var custompayload_changes = {};
      if (changed.payload) custompayload_changes.payload = ctx.payload;
      custompayload.$set(custompayload_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(custompayload.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(custompayload.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(custompayload, detaching);
    }
  };
} // (120:2) {#if payloadComponent}


function create_if_block$4(ctx) {
  var switch_instance_anchor, current;
  var switch_value = ctx.payloadComponent;

  function switch_props(ctx) {
    return {
      props: {
        payload: ctx.payload
      }
    };
  }

  if (switch_value) {
    var switch_instance = new switch_value(switch_props(ctx));
  }

  return {
    c: function c() {
      if (switch_instance) switch_instance.$$.fragment.c();
      switch_instance_anchor = empty();
    },
    m: function m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      var switch_instance_changes = {};
      if (changed.payload) switch_instance_changes.payload = ctx.payload;

      if (switch_value !== (switch_value = ctx.payloadComponent)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          switch_instance.$$.fragment.c();
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }

      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
}

function create_fragment$c(ctx) {
  var div1,
      div0,
      t0_value = ctx.action.payload.type + "",
      t0,
      t1,
      t2_value = ctx.args.join(',') + "",
      t2,
      t3,
      t4,
      current_block_type_index,
      if_block,
      current,
      dispose;
  var if_block_creators = [create_if_block$4, create_else_block];
  var if_blocks = [];

  function select_block_type(changed, ctx) {
    if (ctx.payloadComponent) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(null, ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      div1 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = text("(");
      t2 = text(t2_value);
      t3 = text(")");
      t4 = space();
      if_block.c();
      attr(div1, "class", "log-event player" + ctx.playerID + " svelte-10wdo7v");
      toggle_class(div1, "pinned", ctx.pinned);
      dispose = [listen(div1, "click", ctx.click_handler), listen(div1, "mouseenter", ctx.mouseenter_handler), listen(div1, "mouseleave", ctx.mouseleave_handler)];
    },
    m: function m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, t0);
      append(div0, t1);
      append(div0, t2);
      append(div0, t3);
      append(div1, t4);
      if_blocks[current_block_type_index].m(div1, null);
      current = true;
    },
    p: function p(changed, ctx) {
      if ((!current || changed.action) && t0_value !== (t0_value = ctx.action.payload.type + "")) {
        set_data(t0, t0_value);
      }

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(changed, ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(changed, ctx);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(div1, null);
      }

      if (changed.pinned) {
        toggle_class(div1, "pinned", ctx.pinned);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div1);
      }

      if_blocks[current_block_type_index].d();
      run_all(dispose);
    }
  };
}

function instance$c($$self, $$props, $$invalidate) {
  var logIndex = $$props.logIndex,
      action = $$props.action,
      pinned = $$props.pinned,
      payload = $$props.payload,
      payloadComponent = $$props.payloadComponent;
  var dispatch = createEventDispatcher();
  var args = action.payload.args || [];
  var playerID = action.payload.playerID;

  var click_handler = function click_handler() {
    return dispatch('click', {
      logIndex: logIndex
    });
  };

  var mouseenter_handler = function mouseenter_handler() {
    return dispatch('mouseenter', {
      logIndex: logIndex
    });
  };

  var mouseleave_handler = function mouseleave_handler() {
    return dispatch('mouseleave');
  };

  $$self.$set = function ($$props) {
    if ('logIndex' in $$props) $$invalidate('logIndex', logIndex = $$props.logIndex);
    if ('action' in $$props) $$invalidate('action', action = $$props.action);
    if ('pinned' in $$props) $$invalidate('pinned', pinned = $$props.pinned);
    if ('payload' in $$props) $$invalidate('payload', payload = $$props.payload);
    if ('payloadComponent' in $$props) $$invalidate('payloadComponent', payloadComponent = $$props.payloadComponent);
  };

  return {
    logIndex: logIndex,
    action: action,
    pinned: pinned,
    payload: payload,
    payloadComponent: payloadComponent,
    dispatch: dispatch,
    args: args,
    playerID: playerID,
    click_handler: click_handler,
    mouseenter_handler: mouseenter_handler,
    mouseleave_handler: mouseleave_handler
  };
}

var LogEvent = /*#__PURE__*/function (_SvelteComponent13) {
  _inherits(LogEvent, _SvelteComponent13);

  var _super13 = _createSuper(LogEvent);

  function LogEvent(options) {
    var _this13;

    _classCallCheck(this, LogEvent);

    _this13 = _super13.call(this);
    if (!document.getElementById("svelte-10wdo7v-style")) add_css$b();
    init(_assertThisInitialized(_this13), options, instance$c, create_fragment$c, safe_not_equal, ["logIndex", "action", "pinned", "payload", "payloadComponent"]);
    return _this13;
  }

  return LogEvent;
}(SvelteComponent);
/* node_modules/svelte-icons/components/IconBase.svelte generated by Svelte v3.12.1 */


function add_css$c() {
  var style = element("style");
  style.id = 'svelte-c8tyih-style';
  style.textContent = "svg.svelte-c8tyih{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}";
  append(document.head, style);
} // (18:2) {#if title}


function create_if_block$5(ctx) {
  var title_1, t;
  return {
    c: function c() {
      title_1 = svg_element("title");
      t = text(ctx.title);
    },
    m: function m(target, anchor) {
      insert(target, title_1, anchor);
      append(title_1, t);
    },
    p: function p(changed, ctx) {
      if (changed.title) {
        set_data(t, ctx.title);
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(title_1);
      }
    }
  };
}

function create_fragment$d(ctx) {
  var svg, if_block_anchor, current;
  var if_block = ctx.title && create_if_block$5(ctx);
  var default_slot_template = ctx.$$slots.default;
  var default_slot = create_slot(default_slot_template, ctx, null);
  return {
    c: function c() {
      svg = svg_element("svg");
      if (if_block) if_block.c();
      if_block_anchor = empty();
      if (default_slot) default_slot.c();
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", ctx.viewBox);
      attr(svg, "class", "svelte-c8tyih");
    },
    l: function l(nodes) {
      if (default_slot) default_slot.l(svg_nodes);
    },
    m: function m(target, anchor) {
      insert(target, svg, anchor);
      if (if_block) if_block.m(svg, null);
      append(svg, if_block_anchor);

      if (default_slot) {
        default_slot.m(svg, null);
      }

      current = true;
    },
    p: function p(changed, ctx) {
      if (ctx.title) {
        if (if_block) {
          if_block.p(changed, ctx);
        } else {
          if_block = create_if_block$5(ctx);
          if_block.c();
          if_block.m(svg, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (default_slot && default_slot.p && changed.$$scope) {
        default_slot.p(get_slot_changes(default_slot_template, ctx, changed, null), get_slot_context(default_slot_template, ctx, null));
      }

      if (!current || changed.viewBox) {
        attr(svg, "viewBox", ctx.viewBox);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(svg);
      }

      if (if_block) if_block.d();
      if (default_slot) default_slot.d(detaching);
    }
  };
}

function instance$d($$self, $$props, $$invalidate) {
  var _$$props$title = $$props.title,
      title = _$$props$title === void 0 ? null : _$$props$title,
      viewBox = $$props.viewBox;
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;

  $$self.$set = function ($$props) {
    if ('title' in $$props) $$invalidate('title', title = $$props.title);
    if ('viewBox' in $$props) $$invalidate('viewBox', viewBox = $$props.viewBox);
    if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
  };

  return {
    title: title,
    viewBox: viewBox,
    $$slots: $$slots,
    $$scope: $$scope
  };
}

var IconBase = /*#__PURE__*/function (_SvelteComponent14) {
  _inherits(IconBase, _SvelteComponent14);

  var _super14 = _createSuper(IconBase);

  function IconBase(options) {
    var _this14;

    _classCallCheck(this, IconBase);

    _this14 = _super14.call(this);
    if (!document.getElementById("svelte-c8tyih-style")) add_css$c();
    init(_assertThisInitialized(_this14), options, instance$d, create_fragment$d, safe_not_equal, ["title", "viewBox"]);
    return _this14;
  }

  return IconBase;
}(SvelteComponent);
/* node_modules/svelte-icons/fa/FaArrowAltCircleDown.svelte generated by Svelte v3.12.1 */
// (4:8) <IconBase viewBox="0 0 512 512" {...$$props}>


function create_default_slot(ctx) {
  var path;
  return {
    c: function c() {
      path = svg_element("path");
      attr(path, "d", "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z");
    },
    m: function m(target, anchor) {
      insert(target, path, anchor);
    },
    d: function d(detaching) {
      if (detaching) {
        detach(path);
      }
    }
  };
}

function create_fragment$e(ctx) {
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 512 512"
  }, ctx.$$props];
  var iconbase_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }

  var iconbase = new IconBase({
    props: iconbase_props
  });
  return {
    c: function c() {
      iconbase.$$.fragment.c();
    },
    m: function m(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      var iconbase_changes = changed.$$props ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(ctx.$$props)]) : {};
      if (changed.$$scope) iconbase_changes.$$scope = {
        changed: changed,
        ctx: ctx
      };
      iconbase.$set(iconbase_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(iconbase, detaching);
    }
  };
}

function instance$e($$self, $$props, $$invalidate) {
  $$self.$set = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  return _defineProperty({
    $$props: $$props
  }, "$$props", $$props = exclude_internal_props($$props));
}

var FaArrowAltCircleDown = /*#__PURE__*/function (_SvelteComponent15) {
  _inherits(FaArrowAltCircleDown, _SvelteComponent15);

  var _super15 = _createSuper(FaArrowAltCircleDown);

  function FaArrowAltCircleDown(options) {
    var _this15;

    _classCallCheck(this, FaArrowAltCircleDown);

    _this15 = _super15.call(this);
    init(_assertThisInitialized(_this15), options, instance$e, create_fragment$e, safe_not_equal, []);
    return _this15;
  }

  return FaArrowAltCircleDown;
}(SvelteComponent);
/* src/client/debug/mcts/Action.svelte generated by Svelte v3.12.1 */


function add_css$d() {
  var style = element("style");
  style.id = 'svelte-1a7time-style';
  style.textContent = "div.svelte-1a7time{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:500px}";
  append(document.head, style);
}

function create_fragment$f(ctx) {
  var div, t;
  return {
    c: function c() {
      div = element("div");
      t = text(ctx.text);
      attr(div, "alt", ctx.text);
      attr(div, "class", "svelte-1a7time");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p: function p(changed, ctx) {
      if (changed.text) {
        set_data(t, ctx.text);
        attr(div, "alt", ctx.text);
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}

function instance$f($$self, $$props, $$invalidate) {
  var action = $$props.action;
  var text;

  $$self.$set = function ($$props) {
    if ('action' in $$props) $$invalidate('action', action = $$props.action);
  };

  $$self.$$.update = function () {
    var $$dirty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      action: 1
    };

    if ($$dirty.action) {
      {
        var _action$payload = action.payload,
            type = _action$payload.type,
            args = _action$payload.args;
        var argsFormatted = (args || []).join(',');
        $$invalidate('text', text = "".concat(type, "(").concat(argsFormatted, ")"));
      }
    }
  };

  return {
    action: action,
    text: text
  };
}

var Action = /*#__PURE__*/function (_SvelteComponent16) {
  _inherits(Action, _SvelteComponent16);

  var _super16 = _createSuper(Action);

  function Action(options) {
    var _this16;

    _classCallCheck(this, Action);

    _this16 = _super16.call(this);
    if (!document.getElementById("svelte-1a7time-style")) add_css$d();
    init(_assertThisInitialized(_this16), options, instance$f, create_fragment$f, safe_not_equal, ["action"]);
    return _this16;
  }

  return Action;
}(SvelteComponent);
/* src/client/debug/mcts/Table.svelte generated by Svelte v3.12.1 */


function add_css$e() {
  var style = element("style");
  style.id = 'svelte-ztcwsu-style';
  style.textContent = "table.svelte-ztcwsu{font-size:12px;border-collapse:collapse;border:1px solid #ddd;padding:0}tr.svelte-ztcwsu{cursor:pointer}tr.svelte-ztcwsu:hover td.svelte-ztcwsu{background:#eee}tr.selected.svelte-ztcwsu td.svelte-ztcwsu{background:#eee}td.svelte-ztcwsu{padding:10px;height:10px;line-height:10px;font-size:12px;border:none}th.svelte-ztcwsu{background:#888;color:#fff;padding:10px;text-align:center}";
  append(document.head, style);
}

function get_each_context$3(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.child = list[i];
  child_ctx.i = i;
  return child_ctx;
} // (86:2) {#each children as child, i}


function create_each_block$3(ctx) {
  var tr,
      td0,
      t0_value = ctx.child.value + "",
      t0,
      t1,
      td1,
      t2_value = ctx.child.visits + "",
      t2,
      t3,
      td2,
      t4,
      current,
      dispose;
  var action = new Action({
    props: {
      action: ctx.child.parentAction
    }
  });

  function click_handler() {
    return ctx.click_handler(ctx);
  }

  function mouseout_handler() {
    return ctx.mouseout_handler(ctx);
  }

  function mouseover_handler() {
    return ctx.mouseover_handler(ctx);
  }

  return {
    c: function c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      t2 = text(t2_value);
      t3 = space();
      td2 = element("td");
      action.$$.fragment.c();
      t4 = space();
      attr(td0, "class", "svelte-ztcwsu");
      attr(td1, "class", "svelte-ztcwsu");
      attr(td2, "class", "svelte-ztcwsu");
      attr(tr, "class", "svelte-ztcwsu");
      toggle_class(tr, "clickable", ctx.children.length > 0);
      toggle_class(tr, "selected", ctx.i === ctx.selectedIndex);
      dispose = [listen(tr, "click", click_handler), listen(tr, "mouseout", mouseout_handler), listen(tr, "mouseover", mouseover_handler)];
    },
    m: function m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      append(td1, t2);
      append(tr, t3);
      append(tr, td2);
      mount_component(action, td2, null);
      append(tr, t4);
      current = true;
    },
    p: function p(changed, new_ctx) {
      ctx = new_ctx;

      if ((!current || changed.children) && t0_value !== (t0_value = ctx.child.value + "")) {
        set_data(t0, t0_value);
      }

      if ((!current || changed.children) && t2_value !== (t2_value = ctx.child.visits + "")) {
        set_data(t2, t2_value);
      }

      var action_changes = {};
      if (changed.children) action_changes.action = ctx.child.parentAction;
      action.$set(action_changes);

      if (changed.children) {
        toggle_class(tr, "clickable", ctx.children.length > 0);
      }

      if (changed.selectedIndex) {
        toggle_class(tr, "selected", ctx.i === ctx.selectedIndex);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(action.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(action.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(tr);
      }

      destroy_component(action);
      run_all(dispose);
    }
  };
}

function create_fragment$g(ctx) {
  var table, thead, t_5, tbody, current;
  var each_value = ctx.children;
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  return {
    c: function c() {
      table = element("table");
      thead = element("thead");
      thead.innerHTML = "<th class=\"svelte-ztcwsu\">Value</th> <th class=\"svelte-ztcwsu\">Visits</th> <th class=\"svelte-ztcwsu\">Action</th>";
      t_5 = space();
      tbody = element("tbody");

      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        each_blocks[_i13].c();
      }

      attr(table, "class", "svelte-ztcwsu");
    },
    m: function m(target, anchor) {
      insert(target, table, anchor);
      append(table, thead);
      append(table, t_5);
      append(table, tbody);

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].m(tbody, null);
      }

      current = true;
    },
    p: function p(changed, ctx) {
      if (changed.children || changed.selectedIndex) {
        each_value = ctx.children;

        var _i15;

        for (_i15 = 0; _i15 < each_value.length; _i15 += 1) {
          var child_ctx = get_each_context$3(ctx, each_value, _i15);

          if (each_blocks[_i15]) {
            each_blocks[_i15].p(changed, child_ctx);

            transition_in(each_blocks[_i15], 1);
          } else {
            each_blocks[_i15] = create_each_block$3(child_ctx);

            each_blocks[_i15].c();

            transition_in(each_blocks[_i15], 1);

            each_blocks[_i15].m(tbody, null);
          }
        }

        group_outros();

        for (_i15 = each_value.length; _i15 < each_blocks.length; _i15 += 1) {
          out(_i15);
        }

        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;

      for (var _i16 = 0; _i16 < each_value.length; _i16 += 1) {
        transition_in(each_blocks[_i16]);
      }

      current = true;
    },
    o: function o(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i17 = 0; _i17 < each_blocks.length; _i17 += 1) {
        transition_out(each_blocks[_i17]);
      }

      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(table);
      }

      destroy_each(each_blocks, detaching);
    }
  };
}

function instance$g($$self, $$props, $$invalidate) {
  var root = $$props.root,
      _$$props$selectedInde = $$props.selectedIndex,
      selectedIndex = _$$props$selectedInde === void 0 ? null : _$$props$selectedInde;
  var dispatch = createEventDispatcher();
  var parents = [];
  var children = [];

  function Select(node, i) {
    dispatch('select', {
      node: node,
      selectedIndex: i
    });
  }

  function Preview(node, i) {
    if (selectedIndex === null) {
      dispatch('preview', {
        node: node
      });
    }
  }

  var click_handler = function click_handler(_ref6) {
    var child = _ref6.child,
        i = _ref6.i;
    return Select(child, i);
  };

  var mouseout_handler = function mouseout_handler(_ref7) {
    var i = _ref7.i;
    return Preview(null);
  };

  var mouseover_handler = function mouseover_handler(_ref8) {
    var child = _ref8.child,
        i = _ref8.i;
    return Preview(child);
  };

  $$self.$set = function ($$props) {
    if ('root' in $$props) $$invalidate('root', root = $$props.root);
    if ('selectedIndex' in $$props) $$invalidate('selectedIndex', selectedIndex = $$props.selectedIndex);
  };

  $$self.$$.update = function () {
    var $$dirty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      root: 1,
      parents: 1
    };

    if ($$dirty.root || $$dirty.parents) {
      {
        var t = root;
        $$invalidate('parents', parents = []);

        while (t.parent) {
          var parent = t.parent;
          var _t$parentAction$paylo = t.parentAction.payload,
              type = _t$parentAction$paylo.type,
              args = _t$parentAction$paylo.args;
          var argsFormatted = (args || []).join(',');
          var arrowText = "".concat(type, "(").concat(argsFormatted, ")");
          parents.push({
            parent: parent,
            arrowText: arrowText
          });
          t = parent;
        }

        parents.reverse();
        $$invalidate('children', children = _toConsumableArray(root.children).sort(function (a, b) {
          return a.visits < b.visits ? 1 : -1;
        }).slice(0, 50));
      }
    }
  };

  return {
    root: root,
    selectedIndex: selectedIndex,
    children: children,
    Select: Select,
    Preview: Preview,
    click_handler: click_handler,
    mouseout_handler: mouseout_handler,
    mouseover_handler: mouseover_handler
  };
}

var Table = /*#__PURE__*/function (_SvelteComponent17) {
  _inherits(Table, _SvelteComponent17);

  var _super17 = _createSuper(Table);

  function Table(options) {
    var _this17;

    _classCallCheck(this, Table);

    _this17 = _super17.call(this);
    if (!document.getElementById("svelte-ztcwsu-style")) add_css$e();
    init(_assertThisInitialized(_this17), options, instance$g, create_fragment$g, safe_not_equal, ["root", "selectedIndex"]);
    return _this17;
  }

  return Table;
}(SvelteComponent);
/* src/client/debug/mcts/MCTS.svelte generated by Svelte v3.12.1 */


function add_css$f() {
  var style = element("style");
  style.id = 'svelte-1f0amz4-style';
  style.textContent = ".visualizer.svelte-1f0amz4{display:flex;flex-direction:column;align-items:center;padding:50px}.preview.svelte-1f0amz4{opacity:0.5}.icon.svelte-1f0amz4{color:#777;width:32px;height:32px;margin-bottom:20px}";
  append(document.head, style);
}

function get_each_context$4(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.node = list[i].node;
  child_ctx.selectedIndex = list[i].selectedIndex;
  child_ctx.i = i;
  return child_ctx;
} // (50:4) {#if i !== 0}


function create_if_block_2$1(ctx) {
  var div, current;
  var arrow = new FaArrowAltCircleDown({});
  return {
    c: function c() {
      div = element("div");
      arrow.$$.fragment.c();
      attr(div, "class", "icon svelte-1f0amz4");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      mount_component(arrow, div, null);
      current = true;
    },
    i: function i(local) {
      if (current) return;
      transition_in(arrow.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(arrow.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      destroy_component(arrow);
    }
  };
} // (61:6) {:else}


function create_else_block$1(ctx) {
  var current;

  function select_handler_1() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key4 = 0; _key4 < _len; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return (_ctx = ctx).select_handler_1.apply(_ctx, [ctx].concat(args));
  }

  var table = new Table({
    props: {
      root: ctx.node,
      selectedIndex: ctx.selectedIndex
    }
  });
  table.$on("select", select_handler_1);
  return {
    c: function c() {
      table.$$.fragment.c();
    },
    m: function m(target, anchor) {
      mount_component(table, target, anchor);
      current = true;
    },
    p: function p(changed, new_ctx) {
      ctx = new_ctx;
      var table_changes = {};
      if (changed.nodes) table_changes.root = ctx.node;
      if (changed.nodes) table_changes.selectedIndex = ctx.selectedIndex;
      table.$set(table_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(table, detaching);
    }
  };
} // (57:6) {#if i === nodes.length - 1}


function create_if_block_1$1(ctx) {
  var current;

  function select_handler() {
    var _ctx2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key5 = 0; _key5 < _len2; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return (_ctx2 = ctx).select_handler.apply(_ctx2, [ctx].concat(args));
  }

  function preview_handler() {
    var _ctx3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key6 = 0; _key6 < _len3; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return (_ctx3 = ctx).preview_handler.apply(_ctx3, [ctx].concat(args));
  }

  var table = new Table({
    props: {
      root: ctx.node
    }
  });
  table.$on("select", select_handler);
  table.$on("preview", preview_handler);
  return {
    c: function c() {
      table.$$.fragment.c();
    },
    m: function m(target, anchor) {
      mount_component(table, target, anchor);
      current = true;
    },
    p: function p(changed, new_ctx) {
      ctx = new_ctx;
      var table_changes = {};
      if (changed.nodes) table_changes.root = ctx.node;
      table.$set(table_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(table, detaching);
    }
  };
} // (49:2) {#each nodes as { node, selectedIndex }


function create_each_block$4(ctx) {
  var t, section, current_block_type_index, if_block1, current;
  var if_block0 = ctx.i !== 0 && create_if_block_2$1();
  var if_block_creators = [create_if_block_1$1, create_else_block$1];
  var if_blocks = [];

  function select_block_type(changed, ctx) {
    if (ctx.i === ctx.nodes.length - 1) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(null, ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      if (if_block0) if_block0.c();
      t = space();
      section = element("section");
      if_block1.c();
    },
    m: function m(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert(target, t, anchor);
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;
    },
    p: function p(changed, ctx) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(changed, ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(changed, ctx);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];

        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        }

        transition_in(if_block1, 1);
        if_block1.m(section, null);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function d(detaching) {
      if (if_block0) if_block0.d(detaching);

      if (detaching) {
        detach(t);
        detach(section);
      }

      if_blocks[current_block_type_index].d();
    }
  };
} // (69:2) {#if preview}


function create_if_block$6(ctx) {
  var div, t, section, current;
  var arrow = new FaArrowAltCircleDown({});
  var table = new Table({
    props: {
      root: ctx.preview
    }
  });
  return {
    c: function c() {
      div = element("div");
      arrow.$$.fragment.c();
      t = space();
      section = element("section");
      table.$$.fragment.c();
      attr(div, "class", "icon svelte-1f0amz4");
      attr(section, "class", "preview svelte-1f0amz4");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      mount_component(arrow, div, null);
      insert(target, t, anchor);
      insert(target, section, anchor);
      mount_component(table, section, null);
      current = true;
    },
    p: function p(changed, ctx) {
      var table_changes = {};
      if (changed.preview) table_changes.root = ctx.preview;
      table.$set(table_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(arrow.$$.fragment, local);
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(arrow.$$.fragment, local);
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      destroy_component(arrow);

      if (detaching) {
        detach(t);
        detach(section);
      }

      destroy_component(table);
    }
  };
}

function create_fragment$h(ctx) {
  var div, t, current;
  var each_value = ctx.nodes;
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var if_block = ctx.preview && create_if_block$6(ctx);
  return {
    c: function c() {
      div = element("div");

      for (var _i18 = 0; _i18 < each_blocks.length; _i18 += 1) {
        each_blocks[_i18].c();
      }

      t = space();
      if (if_block) if_block.c();
      attr(div, "class", "visualizer svelte-1f0amz4");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);

      for (var _i19 = 0; _i19 < each_blocks.length; _i19 += 1) {
        each_blocks[_i19].m(div, null);
      }

      append(div, t);
      if (if_block) if_block.m(div, null);
      current = true;
    },
    p: function p(changed, ctx) {
      if (changed.nodes) {
        each_value = ctx.nodes;

        var _i20;

        for (_i20 = 0; _i20 < each_value.length; _i20 += 1) {
          var child_ctx = get_each_context$4(ctx, each_value, _i20);

          if (each_blocks[_i20]) {
            each_blocks[_i20].p(changed, child_ctx);

            transition_in(each_blocks[_i20], 1);
          } else {
            each_blocks[_i20] = create_each_block$4(child_ctx);

            each_blocks[_i20].c();

            transition_in(each_blocks[_i20], 1);

            each_blocks[_i20].m(div, t);
          }
        }

        group_outros();

        for (_i20 = each_value.length; _i20 < each_blocks.length; _i20 += 1) {
          out(_i20);
        }

        check_outros();
      }

      if (ctx.preview) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
        } else {
          if_block = create_if_block$6(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;

      for (var _i21 = 0; _i21 < each_value.length; _i21 += 1) {
        transition_in(each_blocks[_i21]);
      }

      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i22 = 0; _i22 < each_blocks.length; _i22 += 1) {
        transition_out(each_blocks[_i22]);
      }

      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
    }
  };
}

function instance$h($$self, $$props, $$invalidate) {
  var metadata = $$props.metadata;
  var nodes = [];
  var preview = null;

  function SelectNode(_ref9, i) {
    var node = _ref9.node,
        selectedIndex = _ref9.selectedIndex;
    $$invalidate('preview', preview = null);
    $$invalidate('nodes', nodes[i].selectedIndex = selectedIndex, nodes);
    $$invalidate('nodes', nodes = [].concat(_toConsumableArray(nodes.slice(0, i + 1)), [{
      node: node
    }]));
  }

  function PreviewNode(_ref10, i) {
    var node = _ref10.node;
    $$invalidate('preview', preview = node);
  }

  var select_handler = function select_handler(_ref11, e) {
    var i = _ref11.i;
    return SelectNode(e.detail, i);
  };

  var preview_handler = function preview_handler(_ref12, e) {
    var i = _ref12.i;
    return PreviewNode(e.detail);
  };

  var select_handler_1 = function select_handler_1(_ref13, e) {
    var i = _ref13.i;
    return SelectNode(e.detail, i);
  };

  $$self.$set = function ($$props) {
    if ('metadata' in $$props) $$invalidate('metadata', metadata = $$props.metadata);
  };

  $$self.$$.update = function () {
    var $$dirty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      metadata: 1
    };

    if ($$dirty.metadata) {
      {
        $$invalidate('nodes', nodes = [{
          node: metadata
        }]);
      }
    }
  };

  return {
    metadata: metadata,
    nodes: nodes,
    preview: preview,
    SelectNode: SelectNode,
    PreviewNode: PreviewNode,
    select_handler: select_handler,
    preview_handler: preview_handler,
    select_handler_1: select_handler_1
  };
}

var MCTS = /*#__PURE__*/function (_SvelteComponent18) {
  _inherits(MCTS, _SvelteComponent18);

  var _super18 = _createSuper(MCTS);

  function MCTS(options) {
    var _this18;

    _classCallCheck(this, MCTS);

    _this18 = _super18.call(this);
    if (!document.getElementById("svelte-1f0amz4-style")) add_css$f();
    init(_assertThisInitialized(_this18), options, instance$h, create_fragment$h, safe_not_equal, ["metadata"]);
    return _this18;
  }

  return MCTS;
}(SvelteComponent);
/* src/client/debug/log/Log.svelte generated by Svelte v3.12.1 */


function add_css$g() {
  var style = element("style");
  style.id = 'svelte-1pq5e4b-style';
  style.textContent = ".gamelog.svelte-1pq5e4b{display:grid;grid-template-columns:30px 1fr 30px;grid-auto-rows:auto;grid-auto-flow:column}";
  append(document.head, style);
}

function get_each_context$5(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.phase = list[i].phase;
  child_ctx.i = i;
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.action = list[i].action;
  child_ctx.payload = list[i].payload;
  child_ctx.i = i;
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.turn = list[i].turn;
  child_ctx.i = i;
  return child_ctx;
} // (137:4) {#if i in turnBoundaries}


function create_if_block_1$2(ctx) {
  var current;
  var turnmarker = new TurnMarker({
    props: {
      turn: ctx.turn,
      numEvents: ctx.turnBoundaries[ctx.i]
    }
  });
  return {
    c: function c() {
      turnmarker.$$.fragment.c();
    },
    m: function m(target, anchor) {
      mount_component(turnmarker, target, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      var turnmarker_changes = {};
      if (changed.renderedLogEntries) turnmarker_changes.turn = ctx.turn;
      if (changed.turnBoundaries) turnmarker_changes.numEvents = ctx.turnBoundaries[ctx.i];
      turnmarker.$set(turnmarker_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(turnmarker.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(turnmarker.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(turnmarker, detaching);
    }
  };
} // (136:2) {#each renderedLogEntries as { turn }


function create_each_block_2(ctx) {
  var if_block_anchor, current;
  var if_block = ctx.i in ctx.turnBoundaries && create_if_block_1$2(ctx);
  return {
    c: function c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m: function m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      if (ctx.i in ctx.turnBoundaries) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
        } else {
          if_block = create_if_block_1$2(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (if_block) if_block.d(detaching);

      if (detaching) {
        detach(if_block_anchor);
      }
    }
  };
} // (142:2) {#each renderedLogEntries as { action, payload }


function create_each_block_1(ctx) {
  var current;
  var logevent = new LogEvent({
    props: {
      pinned: ctx.i === ctx.pinned,
      logIndex: ctx.i,
      action: ctx.action,
      payload: ctx.payload
    }
  });
  logevent.$on("click", ctx.OnLogClick);
  logevent.$on("mouseenter", ctx.OnMouseEnter);
  logevent.$on("mouseleave", ctx.OnMouseLeave);
  return {
    c: function c() {
      logevent.$$.fragment.c();
    },
    m: function m(target, anchor) {
      mount_component(logevent, target, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      var logevent_changes = {};
      if (changed.pinned) logevent_changes.pinned = ctx.i === ctx.pinned;
      if (changed.renderedLogEntries) logevent_changes.action = ctx.action;
      if (changed.renderedLogEntries) logevent_changes.payload = ctx.payload;
      logevent.$set(logevent_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(logevent.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(logevent.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(logevent, detaching);
    }
  };
} // (154:4) {#if i in phaseBoundaries}


function create_if_block$7(ctx) {
  var current;
  var phasemarker = new PhaseMarker({
    props: {
      phase: ctx.phase,
      numEvents: ctx.phaseBoundaries[ctx.i]
    }
  });
  return {
    c: function c() {
      phasemarker.$$.fragment.c();
    },
    m: function m(target, anchor) {
      mount_component(phasemarker, target, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      var phasemarker_changes = {};
      if (changed.renderedLogEntries) phasemarker_changes.phase = ctx.phase;
      if (changed.phaseBoundaries) phasemarker_changes.numEvents = ctx.phaseBoundaries[ctx.i];
      phasemarker.$set(phasemarker_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(phasemarker.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(phasemarker.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      destroy_component(phasemarker, detaching);
    }
  };
} // (153:2) {#each renderedLogEntries as { phase }


function create_each_block$5(ctx) {
  var if_block_anchor, current;
  var if_block = ctx.i in ctx.phaseBoundaries && create_if_block$7(ctx);
  return {
    c: function c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m: function m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      if (ctx.i in ctx.phaseBoundaries) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
        } else {
          if_block = create_if_block$7(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (if_block) if_block.d(detaching);

      if (detaching) {
        detach(if_block_anchor);
      }
    }
  };
}

function create_fragment$i(ctx) {
  var div, t0, t1, current, dispose;
  var each_value_2 = ctx.renderedLogEntries;
  var each_blocks_2 = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks_2[i], 1, 1, function () {
      each_blocks_2[i] = null;
    });
  };

  var each_value_1 = ctx.renderedLogEntries;
  var each_blocks_1 = [];

  for (var _i23 = 0; _i23 < each_value_1.length; _i23 += 1) {
    each_blocks_1[_i23] = create_each_block_1(get_each_context_1(ctx, each_value_1, _i23));
  }

  var out_1 = function out_1(i) {
    return transition_out(each_blocks_1[i], 1, 1, function () {
      each_blocks_1[i] = null;
    });
  };

  var each_value = ctx.renderedLogEntries;
  var each_blocks = [];

  for (var _i24 = 0; _i24 < each_value.length; _i24 += 1) {
    each_blocks[_i24] = create_each_block$5(get_each_context$5(ctx, each_value, _i24));
  }

  var out_2 = function out_2(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  return {
    c: function c() {
      div = element("div");

      for (var _i25 = 0; _i25 < each_blocks_2.length; _i25 += 1) {
        each_blocks_2[_i25].c();
      }

      t0 = space();

      for (var _i26 = 0; _i26 < each_blocks_1.length; _i26 += 1) {
        each_blocks_1[_i26].c();
      }

      t1 = space();

      for (var _i27 = 0; _i27 < each_blocks.length; _i27 += 1) {
        each_blocks[_i27].c();
      }

      attr(div, "class", "gamelog svelte-1pq5e4b");
      toggle_class(div, "pinned", ctx.pinned);
      dispose = listen(window, "keydown", ctx.OnKeyDown);
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);

      for (var _i28 = 0; _i28 < each_blocks_2.length; _i28 += 1) {
        each_blocks_2[_i28].m(div, null);
      }

      append(div, t0);

      for (var _i29 = 0; _i29 < each_blocks_1.length; _i29 += 1) {
        each_blocks_1[_i29].m(div, null);
      }

      append(div, t1);

      for (var _i30 = 0; _i30 < each_blocks.length; _i30 += 1) {
        each_blocks[_i30].m(div, null);
      }

      current = true;
    },
    p: function p(changed, ctx) {
      if (changed.turnBoundaries || changed.renderedLogEntries) {
        each_value_2 = ctx.renderedLogEntries;

        var _i31;

        for (_i31 = 0; _i31 < each_value_2.length; _i31 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i31);

          if (each_blocks_2[_i31]) {
            each_blocks_2[_i31].p(changed, child_ctx);

            transition_in(each_blocks_2[_i31], 1);
          } else {
            each_blocks_2[_i31] = create_each_block_2(child_ctx);

            each_blocks_2[_i31].c();

            transition_in(each_blocks_2[_i31], 1);

            each_blocks_2[_i31].m(div, t0);
          }
        }

        group_outros();

        for (_i31 = each_value_2.length; _i31 < each_blocks_2.length; _i31 += 1) {
          out(_i31);
        }

        check_outros();
      }

      if (changed.pinned || changed.renderedLogEntries) {
        each_value_1 = ctx.renderedLogEntries;

        var _i32;

        for (_i32 = 0; _i32 < each_value_1.length; _i32 += 1) {
          var _child_ctx = get_each_context_1(ctx, each_value_1, _i32);

          if (each_blocks_1[_i32]) {
            each_blocks_1[_i32].p(changed, _child_ctx);

            transition_in(each_blocks_1[_i32], 1);
          } else {
            each_blocks_1[_i32] = create_each_block_1(_child_ctx);

            each_blocks_1[_i32].c();

            transition_in(each_blocks_1[_i32], 1);

            each_blocks_1[_i32].m(div, t1);
          }
        }

        group_outros();

        for (_i32 = each_value_1.length; _i32 < each_blocks_1.length; _i32 += 1) {
          out_1(_i32);
        }

        check_outros();
      }

      if (changed.phaseBoundaries || changed.renderedLogEntries) {
        each_value = ctx.renderedLogEntries;

        var _i33;

        for (_i33 = 0; _i33 < each_value.length; _i33 += 1) {
          var _child_ctx2 = get_each_context$5(ctx, each_value, _i33);

          if (each_blocks[_i33]) {
            each_blocks[_i33].p(changed, _child_ctx2);

            transition_in(each_blocks[_i33], 1);
          } else {
            each_blocks[_i33] = create_each_block$5(_child_ctx2);

            each_blocks[_i33].c();

            transition_in(each_blocks[_i33], 1);

            each_blocks[_i33].m(div, null);
          }
        }

        group_outros();

        for (_i33 = each_value.length; _i33 < each_blocks.length; _i33 += 1) {
          out_2(_i33);
        }

        check_outros();
      }

      if (changed.pinned) {
        toggle_class(div, "pinned", ctx.pinned);
      }
    },
    i: function i(local) {
      if (current) return;

      for (var _i34 = 0; _i34 < each_value_2.length; _i34 += 1) {
        transition_in(each_blocks_2[_i34]);
      }

      for (var _i35 = 0; _i35 < each_value_1.length; _i35 += 1) {
        transition_in(each_blocks_1[_i35]);
      }

      for (var _i36 = 0; _i36 < each_value.length; _i36 += 1) {
        transition_in(each_blocks[_i36]);
      }

      current = true;
    },
    o: function o(local) {
      each_blocks_2 = each_blocks_2.filter(Boolean);

      for (var _i37 = 0; _i37 < each_blocks_2.length; _i37 += 1) {
        transition_out(each_blocks_2[_i37]);
      }

      each_blocks_1 = each_blocks_1.filter(Boolean);

      for (var _i38 = 0; _i38 < each_blocks_1.length; _i38 += 1) {
        transition_out(each_blocks_1[_i38]);
      }

      each_blocks = each_blocks.filter(Boolean);

      for (var _i39 = 0; _i39 < each_blocks.length; _i39 += 1) {
        transition_out(each_blocks[_i39]);
      }

      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      destroy_each(each_blocks_2, detaching);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      dispose();
    }
  };
}

function instance$i($$self, $$props, $$invalidate) {
  var $client;
  var client = $$props.client;
  component_subscribe($$self, client, function ($$value) {
    $client = $$value;
    $$invalidate('$client', $client);
  });

  var _getContext3 = getContext('secondaryPane'),
      secondaryPane = _getContext3.secondaryPane;

  var initialState = client.getInitialState();
  var _$client = $client,
      log = _$client.log;
  var pinned = null;

  function rewind(logIndex) {
    var state = initialState;

    for (var i = 0; i < log.length; i++) {
      var _log$i = log[i],
          action = _log$i.action,
          automatic = _log$i.automatic;

      if (!automatic) {
        state = client.reducer(state, action);
      }

      if (action.type == _turnOrderD7fe23d.M) {
        if (logIndex == 0) {
          break;
        }

        logIndex--;
      }
    }

    return {
      G: state.G,
      ctx: state.ctx
    };
  }

  function OnLogClick(e) {
    var logIndex = e.detail.logIndex;
    var state = rewind(logIndex);
    var renderedLogEntries = log.filter(function (e) {
      return e.action.type == _turnOrderD7fe23d.M;
    });
    client.overrideGameState(state);

    if (pinned == logIndex) {
      $$invalidate('pinned', pinned = null);
      secondaryPane.set(null);
    } else {
      $$invalidate('pinned', pinned = logIndex);
      var metadata = renderedLogEntries[logIndex].action.payload.metadata;

      if (metadata) {
        secondaryPane.set({
          component: MCTS,
          metadata: metadata
        });
      }
    }
  }

  function OnMouseEnter(e) {
    var logIndex = e.detail.logIndex;

    if (pinned === null) {
      var state = rewind(logIndex);
      client.overrideGameState(state);
    }
  }

  function OnMouseLeave() {
    if (pinned === null) {
      client.overrideGameState(null);
    }
  }

  function Reset() {
    $$invalidate('pinned', pinned = null);
    client.overrideGameState(null);
    secondaryPane.set(null);
  }

  onDestroy(Reset);

  function OnKeyDown(e) {
    // ESC.
    if (e.keyCode == 27) {
      Reset();
    }
  }

  var renderedLogEntries;
  var turnBoundaries = {};
  var phaseBoundaries = {};

  $$self.$set = function ($$props) {
    if ('client' in $$props) $$invalidate('client', client = $$props.client);
  };

  $$self.$$.update = function () {
    var $$dirty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      $client: 1,
      log: 1,
      renderedLogEntries: 1
    };

    if ($$dirty.$client || $$dirty.log || $$dirty.renderedLogEntries) {
      {
        $$invalidate('log', log = $client.log);
        $$invalidate('renderedLogEntries', renderedLogEntries = log.filter(function (e) {
          return e.action.type == _turnOrderD7fe23d.M;
        }));
        var eventsInCurrentPhase = 0;
        var eventsInCurrentTurn = 0;
        $$invalidate('turnBoundaries', turnBoundaries = {});
        $$invalidate('phaseBoundaries', phaseBoundaries = {});

        for (var i = 0; i < renderedLogEntries.length; i++) {
          var _renderedLogEntries$i = renderedLogEntries[i],
              action = _renderedLogEntries$i.action,
              payload = _renderedLogEntries$i.payload,
              turn = _renderedLogEntries$i.turn,
              phase = _renderedLogEntries$i.phase;
          eventsInCurrentTurn++;
          eventsInCurrentPhase++;

          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].turn != turn) {
            $$invalidate('turnBoundaries', turnBoundaries[i] = eventsInCurrentTurn, turnBoundaries);
            eventsInCurrentTurn = 0;
          }

          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].phase != phase) {
            $$invalidate('phaseBoundaries', phaseBoundaries[i] = eventsInCurrentPhase, phaseBoundaries);
            eventsInCurrentPhase = 0;
          }
        }
      }
    }
  };

  return {
    client: client,
    pinned: pinned,
    OnLogClick: OnLogClick,
    OnMouseEnter: OnMouseEnter,
    OnMouseLeave: OnMouseLeave,
    OnKeyDown: OnKeyDown,
    renderedLogEntries: renderedLogEntries,
    turnBoundaries: turnBoundaries,
    phaseBoundaries: phaseBoundaries
  };
}

var Log = /*#__PURE__*/function (_SvelteComponent19) {
  _inherits(Log, _SvelteComponent19);

  var _super19 = _createSuper(Log);

  function Log(options) {
    var _this19;

    _classCallCheck(this, Log);

    _this19 = _super19.call(this);
    if (!document.getElementById("svelte-1pq5e4b-style")) add_css$g();
    init(_assertThisInitialized(_this19), options, instance$i, create_fragment$i, safe_not_equal, ["client"]);
    return _this19;
  }

  return Log;
}(SvelteComponent);
/* src/client/debug/ai/Options.svelte generated by Svelte v3.12.1 */


var Object_1 = globals.Object;

function add_css$h() {
  var style = element("style");
  style.id = 'svelte-7cel4i-style';
  style.textContent = "label.svelte-7cel4i{font-weight:bold;color:#999}.option.svelte-7cel4i{margin-bottom:20px}.value.svelte-7cel4i{font-weight:bold}input[type='checkbox'].svelte-7cel4i{vertical-align:middle}";
  append(document.head, style);
}

function get_each_context$6(ctx, list, i) {
  var child_ctx = Object_1.create(ctx);
  child_ctx.key = list[i][0];
  child_ctx.value = list[i][1];
  return child_ctx;
} // (39:4) {#if value.range}


function create_if_block_1$3(ctx) {
  var span,
      t0_value = ctx.values[ctx.key] + "",
      t0,
      t1,
      input,
      input_min_value,
      input_max_value,
      dispose;

  function input_change_input_handler() {
    ctx.input_change_input_handler.call(input, ctx);
  }

  return {
    c: function c() {
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      input = element("input");
      attr(span, "class", "value svelte-7cel4i");
      attr(input, "type", "range");
      attr(input, "min", input_min_value = ctx.value.range.min);
      attr(input, "max", input_max_value = ctx.value.range.max);
      dispose = [listen(input, "change", input_change_input_handler), listen(input, "input", input_change_input_handler), listen(input, "change", ctx.OnChange)];
    },
    m: function m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      insert(target, t1, anchor);
      insert(target, input, anchor);
      set_input_value(input, ctx.values[ctx.key]);
    },
    p: function p(changed, new_ctx) {
      ctx = new_ctx;

      if ((changed.values || changed.bot) && t0_value !== (t0_value = ctx.values[ctx.key] + "")) {
        set_data(t0, t0_value);
      }

      if (changed.values || changed.Object || changed.bot) set_input_value(input, ctx.values[ctx.key]);

      if (changed.bot && input_min_value !== (input_min_value = ctx.value.range.min)) {
        attr(input, "min", input_min_value);
      }

      if (changed.bot && input_max_value !== (input_max_value = ctx.value.range.max)) {
        attr(input, "max", input_max_value);
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(span);
        detach(t1);
        detach(input);
      }

      run_all(dispose);
    }
  };
} // (44:4) {#if typeof value.value === 'boolean'}


function create_if_block$8(ctx) {
  var input, dispose;

  function input_change_handler() {
    ctx.input_change_handler.call(input, ctx);
  }

  return {
    c: function c() {
      input = element("input");
      attr(input, "type", "checkbox");
      attr(input, "class", "svelte-7cel4i");
      dispose = [listen(input, "change", input_change_handler), listen(input, "change", ctx.OnChange)];
    },
    m: function m(target, anchor) {
      insert(target, input, anchor);
      input.checked = ctx.values[ctx.key];
    },
    p: function p(changed, new_ctx) {
      ctx = new_ctx;
      if (changed.values || changed.Object || changed.bot) input.checked = ctx.values[ctx.key];
    },
    d: function d(detaching) {
      if (detaching) {
        detach(input);
      }

      run_all(dispose);
    }
  };
} // (35:0) {#each Object.entries(bot.opts()) as [key, value]}


function create_each_block$6(ctx) {
  var div,
      label,
      t0_value = ctx.key + "",
      t0,
      t1,
      t2,
      t3;
  var if_block0 = ctx.value.range && create_if_block_1$3(ctx);
  var if_block1 = typeof ctx.value.value === 'boolean' && create_if_block$8(ctx);
  return {
    c: function c() {
      div = element("div");
      label = element("label");
      t0 = text(t0_value);
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      t3 = space();
      attr(label, "class", "svelte-7cel4i");
      attr(div, "class", "option svelte-7cel4i");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);
      append(div, label);
      append(label, t0);
      append(div, t1);
      if (if_block0) if_block0.m(div, null);
      append(div, t2);
      if (if_block1) if_block1.m(div, null);
      append(div, t3);
    },
    p: function p(changed, ctx) {
      if (changed.bot && t0_value !== (t0_value = ctx.key + "")) {
        set_data(t0, t0_value);
      }

      if (ctx.value.range) {
        if (if_block0) {
          if_block0.p(changed, ctx);
        } else {
          if_block0 = create_if_block_1$3(ctx);
          if_block0.c();
          if_block0.m(div, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (typeof ctx.value.value === 'boolean') {
        if (if_block1) {
          if_block1.p(changed, ctx);
        } else {
          if_block1 = create_if_block$8(ctx);
          if_block1.c();
          if_block1.m(div, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
}

function create_fragment$j(ctx) {
  var each_1_anchor;
  var each_value = ctx.Object.entries(ctx.bot.opts());
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
  }

  return {
    c: function c() {
      for (var _i40 = 0; _i40 < each_blocks.length; _i40 += 1) {
        each_blocks[_i40].c();
      }

      each_1_anchor = empty();
    },
    m: function m(target, anchor) {
      for (var _i41 = 0; _i41 < each_blocks.length; _i41 += 1) {
        each_blocks[_i41].m(target, anchor);
      }

      insert(target, each_1_anchor, anchor);
    },
    p: function p(changed, ctx) {
      if (changed.Object || changed.bot || changed.values) {
        each_value = ctx.Object.entries(ctx.bot.opts());

        var _i42;

        for (_i42 = 0; _i42 < each_value.length; _i42 += 1) {
          var child_ctx = get_each_context$6(ctx, each_value, _i42);

          if (each_blocks[_i42]) {
            each_blocks[_i42].p(changed, child_ctx);
          } else {
            each_blocks[_i42] = create_each_block$6(child_ctx);

            each_blocks[_i42].c();

            each_blocks[_i42].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i42 < each_blocks.length; _i42 += 1) {
          each_blocks[_i42].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function d(detaching) {
      destroy_each(each_blocks, detaching);

      if (detaching) {
        detach(each_1_anchor);
      }
    }
  };
}

function instance$j($$self, $$props, $$invalidate) {
  var bot = $$props.bot;
  var values = {};

  for (var _i43 = 0, _Object$entries = Object.entries(bot.opts()); _i43 < _Object$entries.length; _i43++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i43], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    $$invalidate('values', values[key] = value.value, values);
  }

  function OnChange() {
    for (var _i44 = 0, _Object$entries2 = Object.entries(values); _i44 < _Object$entries2.length; _i44++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i44], 2),
          _key7 = _Object$entries2$_i[0],
          _value = _Object$entries2$_i[1];

      bot.setOpt(_key7, _value);
    }
  }

  function input_change_input_handler(_ref14) {
    var key = _ref14.key;
    values[key] = to_number(this.value);
    $$invalidate('values', values);
    $$invalidate('Object', Object);
    $$invalidate('bot', bot);
  }

  function input_change_handler(_ref15) {
    var key = _ref15.key;
    values[key] = this.checked;
    $$invalidate('values', values);
    $$invalidate('Object', Object);
    $$invalidate('bot', bot);
  }

  $$self.$set = function ($$props) {
    if ('bot' in $$props) $$invalidate('bot', bot = $$props.bot);
  };

  return {
    bot: bot,
    values: values,
    OnChange: OnChange,
    Object: Object,
    input_change_input_handler: input_change_input_handler,
    input_change_handler: input_change_handler
  };
}

var Options = /*#__PURE__*/function (_SvelteComponent20) {
  _inherits(Options, _SvelteComponent20);

  var _super20 = _createSuper(Options);

  function Options(options) {
    var _this20;

    _classCallCheck(this, Options);

    _this20 = _super20.call(this);
    if (!document.getElementById("svelte-7cel4i-style")) add_css$h();
    init(_assertThisInitialized(_this20), options, instance$j, create_fragment$j, safe_not_equal, ["bot"]);
    return _this20;
  }

  return Options;
}(SvelteComponent);
/* src/client/debug/ai/AI.svelte generated by Svelte v3.12.1 */


function add_css$i() {
  var style = element("style");
  style.id = 'svelte-hsd9fq-style';
  style.textContent = "li.svelte-hsd9fq{list-style:none;margin:none;margin-bottom:5px}h3.svelte-hsd9fq{text-transform:uppercase}label.svelte-hsd9fq{font-weight:bold;color:#999}input[type='checkbox'].svelte-hsd9fq{vertical-align:middle}";
  append(document.head, style);
}

function get_each_context$7(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.bot = list[i];
  return child_ctx;
} // (193:4) {:else}


function create_else_block$2(ctx) {
  var p0, t_1, p1;
  return {
    c: function c() {
      p0 = element("p");
      p0.textContent = "No bots available.";
      t_1 = space();
      p1 = element("p");
      p1.innerHTML = "\n\t\t\t        Follow the instructions\n\t\t\t        <a href=\"https://boardgame.io/documentation/#/tutorial?id=bots\" target=\"_blank\">\n\t\t\t          here</a>\n\t\t\t        to set up bots.\n\t\t\t      ";
    },
    m: function m(target, anchor) {
      insert(target, p0, anchor);
      insert(target, t_1, anchor);
      insert(target, p1, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(p0);
        detach(t_1);
        detach(p1);
      }
    }
  };
} // (191:4) {#if client.multiplayer}


function create_if_block_5(ctx) {
  var p;
  return {
    c: function c() {
      p = element("p");
      p.textContent = "The bot debugger is only available in singleplayer mode.";
    },
    m: function m(target, anchor) {
      insert(target, p, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
} // (145:2) {#if client.game.ai && !client.multiplayer}


function create_if_block$9(ctx) {
  var section0,
      h30,
      t1,
      li0,
      t2,
      li1,
      t3,
      li2,
      t4,
      section1,
      h31,
      t6,
      select,
      t7,
      show_if = Object.keys(ctx.bot.opts()).length,
      t8,
      if_block1_anchor,
      current,
      dispose;
  var hotkey0 = new Hotkey({
    props: {
      value: "1",
      onPress: ctx.Reset,
      label: "reset"
    }
  });
  var hotkey1 = new Hotkey({
    props: {
      value: "2",
      onPress: ctx.Step,
      label: "play"
    }
  });
  var hotkey2 = new Hotkey({
    props: {
      value: "3",
      onPress: ctx.Simulate,
      label: "simulate"
    }
  });
  var each_value = Object.keys(ctx.bots);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
  }

  var if_block0 = show_if && create_if_block_4(ctx);
  var if_block1 = (ctx.botAction || ctx.iterationCounter) && create_if_block_1$4(ctx);
  return {
    c: function c() {
      section0 = element("section");
      h30 = element("h3");
      h30.textContent = "Controls";
      t1 = space();
      li0 = element("li");
      hotkey0.$$.fragment.c();
      t2 = space();
      li1 = element("li");
      hotkey1.$$.fragment.c();
      t3 = space();
      li2 = element("li");
      hotkey2.$$.fragment.c();
      t4 = space();
      section1 = element("section");
      h31 = element("h3");
      h31.textContent = "Bot";
      t6 = space();
      select = element("select");

      for (var _i45 = 0; _i45 < each_blocks.length; _i45 += 1) {
        each_blocks[_i45].c();
      }

      t7 = space();
      if (if_block0) if_block0.c();
      t8 = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      attr(h30, "class", "svelte-hsd9fq");
      attr(li0, "class", "svelte-hsd9fq");
      attr(li1, "class", "svelte-hsd9fq");
      attr(li2, "class", "svelte-hsd9fq");
      attr(h31, "class", "svelte-hsd9fq");
      if (ctx.selectedBot === void 0) add_render_callback(function () {
        return ctx.select_change_handler.call(select);
      });
      dispose = [listen(select, "change", ctx.select_change_handler), listen(select, "change", ctx.ChangeBot)];
    },
    m: function m(target, anchor) {
      insert(target, section0, anchor);
      append(section0, h30);
      append(section0, t1);
      append(section0, li0);
      mount_component(hotkey0, li0, null);
      append(section0, t2);
      append(section0, li1);
      mount_component(hotkey1, li1, null);
      append(section0, t3);
      append(section0, li2);
      mount_component(hotkey2, li2, null);
      insert(target, t4, anchor);
      insert(target, section1, anchor);
      append(section1, h31);
      append(section1, t6);
      append(section1, select);

      for (var _i46 = 0; _i46 < each_blocks.length; _i46 += 1) {
        each_blocks[_i46].m(select, null);
      }

      select_option(select, ctx.selectedBot);
      insert(target, t7, anchor);
      if (if_block0) if_block0.m(target, anchor);
      insert(target, t8, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      if (changed.bots) {
        each_value = Object.keys(ctx.bots);

        var _i47;

        for (_i47 = 0; _i47 < each_value.length; _i47 += 1) {
          var child_ctx = get_each_context$7(ctx, each_value, _i47);

          if (each_blocks[_i47]) {
            each_blocks[_i47].p(changed, child_ctx);
          } else {
            each_blocks[_i47] = create_each_block$7(child_ctx);

            each_blocks[_i47].c();

            each_blocks[_i47].m(select, null);
          }
        }

        for (; _i47 < each_blocks.length; _i47 += 1) {
          each_blocks[_i47].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (changed.selectedBot) select_option(select, ctx.selectedBot);
      if (changed.bot) show_if = Object.keys(ctx.bot.opts()).length;

      if (show_if) {
        if (if_block0) {
          if_block0.p(changed, ctx);
          transition_in(if_block0, 1);
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t8.parentNode, t8);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (ctx.botAction || ctx.iterationCounter) {
        if (if_block1) {
          if_block1.p(changed, ctx);
        } else {
          if_block1 = create_if_block_1$4(ctx);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(hotkey0.$$.fragment, local);
      transition_in(hotkey1.$$.fragment, local);
      transition_in(hotkey2.$$.fragment, local);
      transition_in(if_block0);
      current = true;
    },
    o: function o(local) {
      transition_out(hotkey0.$$.fragment, local);
      transition_out(hotkey1.$$.fragment, local);
      transition_out(hotkey2.$$.fragment, local);
      transition_out(if_block0);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(section0);
      }

      destroy_component(hotkey0);
      destroy_component(hotkey1);
      destroy_component(hotkey2);

      if (detaching) {
        detach(t4);
        detach(section1);
      }

      destroy_each(each_blocks, detaching);

      if (detaching) {
        detach(t7);
      }

      if (if_block0) if_block0.d(detaching);

      if (detaching) {
        detach(t8);
      }

      if (if_block1) if_block1.d(detaching);

      if (detaching) {
        detach(if_block1_anchor);
      }

      run_all(dispose);
    }
  };
} // (162:8) {#each Object.keys(bots) as bot}


function create_each_block$7(ctx) {
  var option,
      t_value = ctx.bot + "",
      t;
  return {
    c: function c() {
      option = element("option");
      t = text(t_value);
      option.__value = ctx.bot;
      option.value = option.__value;
    },
    m: function m(target, anchor) {
      insert(target, option, anchor);
      append(option, t);
    },
    p: noop,
    d: function d(detaching) {
      if (detaching) {
        detach(option);
      }
    }
  };
} // (168:4) {#if Object.keys(bot.opts()).length}


function create_if_block_4(ctx) {
  var section, h3, t1, label, t3, input, t4, current, dispose;
  var options = new Options({
    props: {
      bot: ctx.bot
    }
  });
  return {
    c: function c() {
      section = element("section");
      h3 = element("h3");
      h3.textContent = "Options";
      t1 = space();
      label = element("label");
      label.textContent = "debug";
      t3 = space();
      input = element("input");
      t4 = space();
      options.$$.fragment.c();
      attr(h3, "class", "svelte-hsd9fq");
      attr(label, "class", "svelte-hsd9fq");
      attr(input, "type", "checkbox");
      attr(input, "class", "svelte-hsd9fq");
      dispose = [listen(input, "change", ctx.input_change_handler), listen(input, "change", ctx.OnDebug)];
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      append(section, h3);
      append(section, t1);
      append(section, label);
      append(section, t3);
      append(section, input);
      input.checked = ctx.debug;
      append(section, t4);
      mount_component(options, section, null);
      current = true;
    },
    p: function p(changed, ctx) {
      if (changed.debug) input.checked = ctx.debug;
      var options_changes = {};
      if (changed.bot) options_changes.bot = ctx.bot;
      options.$set(options_changes);
    },
    i: function i(local) {
      if (current) return;
      transition_in(options.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      transition_out(options.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(section);
      }

      destroy_component(options);
      run_all(dispose);
    }
  };
} // (177:4) {#if botAction || iterationCounter}


function create_if_block_1$4(ctx) {
  var section, h3, t1, t2;
  var if_block0 = ctx.progress && ctx.progress < 1.0 && create_if_block_3(ctx);
  var if_block1 = ctx.botAction && create_if_block_2$2(ctx);
  return {
    c: function c() {
      section = element("section");
      h3 = element("h3");
      h3.textContent = "Result";
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      attr(h3, "class", "svelte-hsd9fq");
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      append(section, h3);
      append(section, t1);
      if (if_block0) if_block0.m(section, null);
      append(section, t2);
      if (if_block1) if_block1.m(section, null);
    },
    p: function p(changed, ctx) {
      if (ctx.progress && ctx.progress < 1.0) {
        if (if_block0) {
          if_block0.p(changed, ctx);
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          if_block0.m(section, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (ctx.botAction) {
        if (if_block1) {
          if_block1.p(changed, ctx);
        } else {
          if_block1 = create_if_block_2$2(ctx);
          if_block1.c();
          if_block1.m(section, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(section);
      }

      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
} // (180:6) {#if progress && progress < 1.0}


function create_if_block_3(ctx) {
  var progress_1;
  return {
    c: function c() {
      progress_1 = element("progress");
      progress_1.value = ctx.progress;
    },
    m: function m(target, anchor) {
      insert(target, progress_1, anchor);
    },
    p: function p(changed, ctx) {
      if (changed.progress) {
        progress_1.value = ctx.progress;
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(progress_1);
      }
    }
  };
} // (184:6) {#if botAction}


function create_if_block_2$2(ctx) {
  var li0,
      t0,
      t1,
      t2,
      li1,
      t3,
      t4_value = JSON.stringify(ctx.botActionArgs) + "",
      t4;
  return {
    c: function c() {
      li0 = element("li");
      t0 = text("Action: ");
      t1 = text(ctx.botAction);
      t2 = space();
      li1 = element("li");
      t3 = text("Args: ");
      t4 = text(t4_value);
      attr(li0, "class", "svelte-hsd9fq");
      attr(li1, "class", "svelte-hsd9fq");
    },
    m: function m(target, anchor) {
      insert(target, li0, anchor);
      append(li0, t0);
      append(li0, t1);
      insert(target, t2, anchor);
      insert(target, li1, anchor);
      append(li1, t3);
      append(li1, t4);
    },
    p: function p(changed, ctx) {
      if (changed.botAction) {
        set_data(t1, ctx.botAction);
      }

      if (changed.botActionArgs && t4_value !== (t4_value = JSON.stringify(ctx.botActionArgs) + "")) {
        set_data(t4, t4_value);
      }
    },
    d: function d(detaching) {
      if (detaching) {
        detach(li0);
        detach(t2);
        detach(li1);
      }
    }
  };
}

function create_fragment$k(ctx) {
  var section, current_block_type_index, if_block, current, dispose;
  var if_block_creators = [create_if_block$9, create_if_block_5, create_else_block$2];
  var if_blocks = [];

  function select_block_type(changed, ctx) {
    if (ctx.client.game.ai && !ctx.client.multiplayer) return 0;
    if (ctx.client.multiplayer) return 1;
    return 2;
  }

  current_block_type_index = select_block_type(null, ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c: function c() {
      section = element("section");
      if_block.c();
      dispose = listen(window, "keydown", ctx.OnKeyDown);
    },
    m: function m(target, anchor) {
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;
    },
    p: function p(changed, ctx) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(changed, ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(changed, ctx);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(section, null);
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(section);
      }

      if_blocks[current_block_type_index].d();
      dispose();
    }
  };
}

function instance$k($$self, $$props, $$invalidate) {
  var client = $$props.client;

  var _getContext4 = getContext('secondaryPane'),
      secondaryPane = _getContext4.secondaryPane;

  var bots = {
    'MCTS': _ai11415cb.M,
    'Random': _ai11415cb.R
  };
  var debug = false;
  var progress = null;
  var iterationCounter = 0;
  var metadata = null;

  var iterationCallback = function iterationCallback(_ref16) {
    var c = _ref16.iterationCounter,
        numIterations = _ref16.numIterations,
        m = _ref16.metadata;
    $$invalidate('iterationCounter', iterationCounter = c);
    $$invalidate('progress', progress = c / numIterations);
    metadata = m;

    if (debug && metadata) {
      secondaryPane.set({
        component: MCTS,
        metadata: metadata
      });
    }
  };

  function OnDebug() {
    if (debug && metadata) {
      secondaryPane.set({
        component: MCTS,
        metadata: metadata
      });
    } else {
      secondaryPane.set(null);
    }
  }

  var bot;

  if (client.game.ai) {
    $$invalidate('bot', bot = new _ai11415cb.M({
      game: client.game,
      enumerate: client.game.ai.enumerate,
      iterationCallback: iterationCallback
    }));
    bot.setOpt('async', true);
  }

  var selectedBot;
  var botAction;
  var botActionArgs;

  function ChangeBot() {
    var botConstructor = bots[selectedBot];
    $$invalidate('bot', bot = new botConstructor({
      game: client.game,
      enumerate: client.game.ai.enumerate,
      iterationCallback: iterationCallback
    }));
    bot.setOpt('async', true);
    $$invalidate('botAction', botAction = null);
    metadata = null;
    secondaryPane.set(null);
    $$invalidate('iterationCounter', iterationCounter = 0);
  }

  function Step$1() {
    return _Step$.apply(this, arguments);
  }

  function _Step$() {
    _Step$ = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var t;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              $$invalidate('botAction', botAction = null);
              metadata = null;
              $$invalidate('iterationCounter', iterationCounter = 0);
              _context2.next = 5;
              return (0, _ai11415cb.S)(client, bot);

            case 5:
              t = _context2.sent;

              if (t) {
                $$invalidate('botAction', botAction = t.payload.type);
                $$invalidate('botActionArgs', botActionArgs = t.payload.args);
              }

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _Step$.apply(this, arguments);
  }

  function Simulate() {
    var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
    var sleepTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    $$invalidate('botAction', botAction = null);
    metadata = null;
    $$invalidate('iterationCounter', iterationCounter = 0);

    var step = /*#__PURE__*/function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var i, action;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < iterations)) {
                  _context.next = 12;
                  break;
                }

                _context.next = 4;
                return (0, _ai11415cb.S)(client, bot);

              case 4:
                action = _context.sent;

                if (action) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("break", 12);

              case 7:
                _context.next = 9;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, sleepTimeout);
                });

              case 9:
                i++;
                _context.next = 1;
                break;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function step() {
        return _ref17.apply(this, arguments);
      };
    }();

    return step();
  }

  function Exit() {
    client.overrideGameState(null);
    secondaryPane.set(null);
    $$invalidate('debug', debug = false);
  }

  function Reset() {
    client.reset();
    $$invalidate('botAction', botAction = null);
    metadata = null;
    $$invalidate('iterationCounter', iterationCounter = 0);
    Exit();
  }

  function OnKeyDown(e) {
    // ESC.
    if (e.keyCode == 27) {
      Exit();
    }
  }

  onDestroy(Exit);

  function select_change_handler() {
    selectedBot = select_value(this);
    $$invalidate('selectedBot', selectedBot);
    $$invalidate('bots', bots);
  }

  function input_change_handler() {
    debug = this.checked;
    $$invalidate('debug', debug);
  }

  $$self.$set = function ($$props) {
    if ('client' in $$props) $$invalidate('client', client = $$props.client);
  };

  return {
    client: client,
    bots: bots,
    debug: debug,
    progress: progress,
    iterationCounter: iterationCounter,
    OnDebug: OnDebug,
    bot: bot,
    selectedBot: selectedBot,
    botAction: botAction,
    botActionArgs: botActionArgs,
    ChangeBot: ChangeBot,
    Step: Step$1,
    Simulate: Simulate,
    Reset: Reset,
    OnKeyDown: OnKeyDown,
    select_change_handler: select_change_handler,
    input_change_handler: input_change_handler
  };
}

var AI = /*#__PURE__*/function (_SvelteComponent21) {
  _inherits(AI, _SvelteComponent21);

  var _super21 = _createSuper(AI);

  function AI(options) {
    var _this21;

    _classCallCheck(this, AI);

    _this21 = _super21.call(this);
    if (!document.getElementById("svelte-hsd9fq-style")) add_css$i();
    init(_assertThisInitialized(_this21), options, instance$k, create_fragment$k, safe_not_equal, ["client"]);
    return _this21;
  }

  return AI;
}(SvelteComponent);
/* src/client/debug/Debug.svelte generated by Svelte v3.12.1 */


function add_css$j() {
  var style = element("style");
  style.id = 'svelte-1h5kecx-style';
  style.textContent = ".debug-panel.svelte-1h5kecx{position:fixed;color:#555;font-family:monospace;display:flex;flex-direction:row;text-align:left;right:0;top:0;height:100%;font-size:14px;box-sizing:border-box;opacity:0.9}.pane.svelte-1h5kecx{flex-grow:2;overflow-x:hidden;overflow-y:scroll;background:#fefefe;padding:20px;border-left:1px solid #ccc;box-shadow:-1px 0 5px rgba(0, 0, 0, 0.2);box-sizing:border-box;width:280px}.secondary-pane.svelte-1h5kecx{background:#fefefe;overflow-y:scroll}.debug-panel.svelte-1h5kecx button, select{cursor:pointer;outline:none;background:#eee;border:1px solid #bbb;color:#555;padding:3px;border-radius:3px}.debug-panel.svelte-1h5kecx button{padding-left:10px;padding-right:10px}.debug-panel.svelte-1h5kecx button:hover{background:#ddd}.debug-panel.svelte-1h5kecx button:active{background:#888;color:#fff}.debug-panel.svelte-1h5kecx section{margin-bottom:20px}";
  append(document.head, style);
} // (112:0) {#if visible}


function create_if_block$a(ctx) {
  var div1, t0, div0, t1, div1_transition, current;
  var menu = new Menu({
    props: {
      panes: ctx.panes,
      pane: ctx.pane
    }
  });
  menu.$on("change", ctx.MenuChange);
  var switch_value = ctx.panes[ctx.pane].component;

  function switch_props(ctx) {
    return {
      props: {
        client: ctx.client
      }
    };
  }

  if (switch_value) {
    var switch_instance = new switch_value(switch_props(ctx));
  }

  var if_block = ctx.$secondaryPane && create_if_block_1$5(ctx);
  return {
    c: function c() {
      div1 = element("div");
      menu.$$.fragment.c();
      t0 = space();
      div0 = element("div");
      if (switch_instance) switch_instance.$$.fragment.c();
      t1 = space();
      if (if_block) if_block.c();
      attr(div0, "class", "pane svelte-1h5kecx");
      attr(div1, "class", "debug-panel svelte-1h5kecx");
    },
    m: function m(target, anchor) {
      insert(target, div1, anchor);
      mount_component(menu, div1, null);
      append(div1, t0);
      append(div1, div0);

      if (switch_instance) {
        mount_component(switch_instance, div0, null);
      }

      append(div1, t1);
      if (if_block) if_block.m(div1, null);
      current = true;
    },
    p: function p(changed, ctx) {
      var menu_changes = {};
      if (changed.pane) menu_changes.pane = ctx.pane;
      menu.$set(menu_changes);
      var switch_instance_changes = {};
      if (changed.client) switch_instance_changes.client = ctx.client;

      if (switch_value !== (switch_value = ctx.panes[ctx.pane].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          switch_instance.$$.fragment.c();
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div0, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }

      if (ctx.$secondaryPane) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
        } else {
          if_block = create_if_block_1$5(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div1, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(menu.$$.fragment, local);
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      transition_in(if_block);
      add_render_callback(function () {
        if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, {
          x: 400
        }, true);
        div1_transition.run(1);
      });
      current = true;
    },
    o: function o(local) {
      transition_out(menu.$$.fragment, local);
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      transition_out(if_block);
      if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, {
        x: 400
      }, false);
      div1_transition.run(0);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div1);
      }

      destroy_component(menu);
      if (switch_instance) destroy_component(switch_instance);
      if (if_block) if_block.d();

      if (detaching) {
        if (div1_transition) div1_transition.end();
      }
    }
  };
} // (118:4) {#if $secondaryPane}


function create_if_block_1$5(ctx) {
  var div, current;
  var switch_value = ctx.$secondaryPane.component;

  function switch_props(ctx) {
    return {
      props: {
        metadata: ctx.$secondaryPane.metadata
      }
    };
  }

  if (switch_value) {
    var switch_instance = new switch_value(switch_props(ctx));
  }

  return {
    c: function c() {
      div = element("div");
      if (switch_instance) switch_instance.$$.fragment.c();
      attr(div, "class", "secondary-pane svelte-1h5kecx");
    },
    m: function m(target, anchor) {
      insert(target, div, anchor);

      if (switch_instance) {
        mount_component(switch_instance, div, null);
      }

      current = true;
    },
    p: function p(changed, ctx) {
      var switch_instance_changes = {};
      if (changed.$secondaryPane) switch_instance_changes.metadata = ctx.$secondaryPane.metadata;

      if (switch_value !== (switch_value = ctx.$secondaryPane.component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          switch_instance.$$.fragment.c();
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function d(detaching) {
      if (detaching) {
        detach(div);
      }

      if (switch_instance) destroy_component(switch_instance);
    }
  };
}

function create_fragment$l(ctx) {
  var if_block_anchor, current, dispose;
  var if_block = ctx.visible && create_if_block$a(ctx);
  return {
    c: function c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
      dispose = listen(window, "keypress", ctx.Keypress);
    },
    m: function m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p: function p(changed, ctx) {
      if (ctx.visible) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
        } else {
          if_block = create_if_block$a(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function o(local) {
      transition_out(if_block);
      current = false;
    },
    d: function d(detaching) {
      if (if_block) if_block.d(detaching);

      if (detaching) {
        detach(if_block_anchor);
      }

      dispose();
    }
  };
}

function instance$l($$self, $$props, $$invalidate) {
  var $secondaryPane;
  var client = $$props.client;
  var panes = {
    main: {
      label: 'Main',
      shortcut: 'm',
      component: Main
    },
    log: {
      label: 'Log',
      shortcut: 'l',
      component: Log
    },
    info: {
      label: 'Info',
      shortcut: 'i',
      component: Info
    },
    ai: {
      label: 'AI',
      shortcut: 'a',
      component: AI
    }
  };
  var disableHotkeys = writable(false);
  var secondaryPane = writable(null);
  component_subscribe($$self, secondaryPane, function ($$value) {
    $secondaryPane = $$value;
    $$invalidate('$secondaryPane', $secondaryPane);
  });
  setContext('hotkeys', {
    disableHotkeys: disableHotkeys
  });
  setContext('secondaryPane', {
    secondaryPane: secondaryPane
  });
  var pane = 'main';

  function MenuChange(e) {
    $$invalidate('pane', pane = e.detail);
  }

  var visible = true;

  function Keypress(e) {
    // Toggle debugger visibilty
    if (e.key == '.') {
      $$invalidate('visible', visible = !visible);
      return;
    } // Set displayed pane


    if (!visible) return;
    Object.entries(panes).forEach(function (_ref18) {
      var _ref19 = _slicedToArray(_ref18, 2),
          key = _ref19[0],
          shortcut = _ref19[1].shortcut;

      if (e.key == shortcut) {
        $$invalidate('pane', pane = key);
      }
    });
  }

  $$self.$set = function ($$props) {
    if ('client' in $$props) $$invalidate('client', client = $$props.client);
  };

  return {
    client: client,
    panes: panes,
    secondaryPane: secondaryPane,
    pane: pane,
    MenuChange: MenuChange,
    visible: visible,
    Keypress: Keypress,
    $secondaryPane: $secondaryPane
  };
}

var Debug = /*#__PURE__*/function (_SvelteComponent22) {
  _inherits(Debug, _SvelteComponent22);

  var _super22 = _createSuper(Debug);

  function Debug(options) {
    var _this22;

    _classCallCheck(this, Debug);

    _this22 = _super22.call(this);
    if (!document.getElementById("svelte-1h5kecx-style")) add_css$j();
    init(_assertThisInitialized(_this22), options, instance$l, create_fragment$l, safe_not_equal, ["client"]);
    return _this22;
  }

  return Debug;
}(SvelteComponent);

exports.D = Debug;
},{"./turn-order-d7fe23d9.js":"node_modules/boardgame.io/dist/esm/turn-order-d7fe23d9.js","flatted":"node_modules/flatted/esm/index.js","./ai-11415cb8.js":"node_modules/boardgame.io/dist/esm/ai-11415cb8.js"}],"node_modules/boardgame.io/dist/esm/initialize-f1052b38.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I = InitializeGame;

var _turnOrderD7fe23d = require("./turn-order-d7fe23d9.js");

var _reducer186c = require("./reducer-186c7602.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Creates the initial game state.
 */
function InitializeGame(_ref) {
  var game = _ref.game,
      numPlayers = _ref.numPlayers,
      setupData = _ref.setupData;
  game = (0, _reducer186c.P)(game);

  if (!numPlayers) {
    numPlayers = 2;
  }

  var ctx = game.flow.ctx(numPlayers);
  var state = {
    // User managed state.
    G: {},
    // Framework managed state.
    ctx: ctx,
    // Plugin related state.
    plugins: {}
  }; // Run plugins over initial state.

  state = (0, _turnOrderD7fe23d.t)(state, {
    game: game
  });
  state = (0, _turnOrderD7fe23d.d)(state, {
    game: game,
    playerID: undefined
  });
  var enhancedCtx = (0, _turnOrderD7fe23d.E)(state);
  state.G = game.setup(enhancedCtx, setupData);

  var initial = _objectSpread(_objectSpread({}, state), {}, {
    // List of {G, ctx} pairs that can be undone.
    _undo: [],
    // List of {G, ctx} pairs that can be redone.
    _redo: [],
    // A monotonically non-decreasing ID to ensure that
    // state updates are only allowed from clients that
    // are at the same version that the server.
    _stateID: 0
  });

  initial = game.flow.init(initial);
  initial = (0, _turnOrderD7fe23d.f)(initial, {
    game: game
  });
  return initial;
}
},{"./turn-order-d7fe23d9.js":"node_modules/boardgame.io/dist/esm/turn-order-d7fe23d9.js","./reducer-186c7602.js":"node_modules/boardgame.io/dist/esm/reducer-186c7602.js"}],"node_modules/boardgame.io/dist/esm/client-051f8c0a.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.C = Client;

var _redux = require("redux");

var _turnOrderD7fe23d = require("./turn-order-d7fe23d9.js");

var _reducer186c = require("./reducer-186c7602.js");

var _DebugB191d = require("./Debug-b191d299.js");

var _initializeF1052b = require("./initialize-f1052b38.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * createDispatchers
 *
 * Create action dispatcher wrappers with bound playerID and credentials
 */
function createDispatchers(storeActionType, innerActionNames, store, playerID, credentials, multiplayer) {
  return innerActionNames.reduce(function (dispatchers, name) {
    dispatchers[name] = function () {
      var assumedPlayerID = playerID; // In singleplayer mode, if the client does not have a playerID
      // associated with it, we attach the currentPlayer as playerID.

      if (!multiplayer && (playerID === null || playerID === undefined)) {
        var state = store.getState();
        assumedPlayerID = state.ctx.currentPlayer;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      store.dispatch(_turnOrderD7fe23d.A[storeActionType](name, args, assumedPlayerID, credentials));
    };

    return dispatchers;
  }, {});
} // Creates a set of dispatchers to make moves.


var createMoveDispatchers = createDispatchers.bind(null, 'makeMove'); // Creates a set of dispatchers to dispatch game flow events.

var createEventDispatchers = createDispatchers.bind(null, 'gameEvent'); // Creates a set of dispatchers to dispatch actions to plugins.

var createPluginDispatchers = createDispatchers.bind(null, 'plugin');
/**
 * Implementation of Client (see below).
 */

var _ClientImpl = /*#__PURE__*/function () {
  function _ClientImpl(_ref) {
    var _this = this;

    var game = _ref.game,
        debug = _ref.debug,
        numPlayers = _ref.numPlayers,
        multiplayer = _ref.multiplayer,
        gameID = _ref.gameID,
        playerID = _ref.playerID,
        credentials = _ref.credentials,
        enhancer = _ref.enhancer;

    _classCallCheck(this, _ClientImpl);

    this.game = (0, _reducer186c.P)(game);
    this.playerID = playerID;
    this.gameID = gameID;
    this.credentials = credentials;
    this.multiplayer = multiplayer;
    this.debug = debug;
    this.gameStateOverride = null;
    this.subscribers = {};
    this._running = false;
    this.reducer = (0, _reducer186c.C)({
      game: this.game,
      isClient: multiplayer !== undefined
    });
    this.initialState = null;

    if (!multiplayer) {
      this.initialState = (0, _initializeF1052b.I)({
        game: this.game,
        numPlayers: numPlayers
      });
    }

    this.reset = function () {
      _this.store.dispatch((0, _turnOrderD7fe23d.r)(_this.initialState));
    };

    this.undo = function () {
      _this.store.dispatch((0, _turnOrderD7fe23d.u)(_this.playerID, _this.credentials));
    };

    this.redo = function () {
      _this.store.dispatch((0, _turnOrderD7fe23d.q)(_this.playerID, _this.credentials));
    };

    this.store = null;
    this.log = [];
    /**
     * Middleware that manages the log object.
     * Reducers generate deltalogs, which are log events
     * that are the result of application of a single action.
     * The master may also send back a deltalog or the entire
     * log depending on the type of request.
     * The middleware below takes care of all these cases while
     * managing the log object.
     */

    var LogMiddleware = function LogMiddleware(store) {
      return function (next) {
        return function (action) {
          var result = next(action);
          var state = store.getState();

          switch (action.type) {
            case _turnOrderD7fe23d.M:
            case _turnOrderD7fe23d.G:
              {
                var deltalog = state.deltalog;
                _this.log = [].concat(_toConsumableArray(_this.log), _toConsumableArray(deltalog));
                break;
              }

            case _turnOrderD7fe23d.R:
              {
                _this.log = [];
                break;
              }

            case _turnOrderD7fe23d.j:
              {
                var id = -1;

                if (_this.log.length > 0) {
                  id = _this.log[_this.log.length - 1]._stateID;
                }

                var _deltalog = action.deltalog || []; // Filter out actions that are already present
                // in the current log. This may occur when the
                // client adds an entry to the log followed by
                // the update from the master here.


                _deltalog = _deltalog.filter(function (l) {
                  return l._stateID > id;
                });
                _this.log = [].concat(_toConsumableArray(_this.log), _toConsumableArray(_deltalog));
                break;
              }

            case _turnOrderD7fe23d.k:
              {
                _this.initialState = action.initialState;
                _this.log = action.log || [];
                break;
              }
          }

          return result;
        };
      };
    };
    /**
     * Middleware that intercepts actions and sends them to the master,
     * which keeps the authoritative version of the state.
     */


    var TransportMiddleware = function TransportMiddleware(store) {
      return function (next) {
        return function (action) {
          var baseState = store.getState();
          var result = next(action);

          if (!('clientOnly' in action)) {
            _this.transport.onAction(baseState, action);
          }

          return result;
        };
      };
    };
    /**
     * Middleware that intercepts actions and invokes the subscription callback.
     */


    var SubscriptionMiddleware = function SubscriptionMiddleware() {
      return function (next) {
        return function (action) {
          var result = next(action);

          _this.notifySubscribers();

          return result;
        };
      };
    };

    if (enhancer !== undefined) {
      enhancer = (0, _redux.compose)((0, _redux.applyMiddleware)(SubscriptionMiddleware, TransportMiddleware, LogMiddleware), enhancer);
    } else {
      enhancer = (0, _redux.applyMiddleware)(SubscriptionMiddleware, TransportMiddleware, LogMiddleware);
    }

    this.store = (0, _redux.createStore)(this.reducer, this.initialState, enhancer);
    this.transport = {
      isConnected: true,
      onAction: function onAction() {},
      subscribe: function subscribe() {},
      subscribeGameMetadata: function subscribeGameMetadata() {},
      connect: function connect() {},
      disconnect: function disconnect() {},
      updateGameID: function updateGameID() {},
      updatePlayerID: function updatePlayerID() {}
    };

    if (multiplayer) {
      // typeof multiplayer is 'function'
      this.transport = multiplayer({
        gameKey: game,
        game: this.game,
        store: this.store,
        gameID: gameID,
        playerID: playerID,
        gameName: this.game.name,
        numPlayers: numPlayers
      });
    }

    this.createDispatchers();
    this.transport.subscribeGameMetadata(function (metadata) {
      _this.gameMetadata = metadata;
    });
    this._debugPanel = null;
  }

  _createClass(_ClientImpl, [{
    key: "notifySubscribers",
    value: function notifySubscribers() {
      var _this2 = this;

      Object.values(this.subscribers).forEach(function (fn) {
        return fn(_this2.getState());
      });
    }
  }, {
    key: "overrideGameState",
    value: function overrideGameState(state) {
      this.gameStateOverride = state;
      this.notifySubscribers();
    }
  }, {
    key: "start",
    value: function start() {
      this.transport.connect();
      this._running = true;
      var debugImpl = null;

      if ("development" !== 'production') {
        debugImpl = _DebugB191d.D;
      }

      if (this.debug && this.debug !== true && this.debug.impl) {
        debugImpl = this.debug.impl;
      }

      if (debugImpl !== null && this.debug !== false && this._debugPanel == null && typeof document !== 'undefined') {
        var target = document.body;

        if (this.debug && this.debug !== true && this.debug.target !== undefined) {
          target = this.debug.target;
        }

        if (target) {
          this._debugPanel = new debugImpl({
            target: target,
            props: {
              client: this
            }
          });
        }
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.transport.disconnect();
      this._running = false;

      if (this._debugPanel != null) {
        this._debugPanel.$destroy();

        this._debugPanel = null;
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(fn) {
      var _this3 = this;

      var id = Object.keys(this.subscribers).length;
      this.subscribers[id] = fn;
      this.transport.subscribe(function () {
        return _this3.notifySubscribers();
      });

      if (this._running || !this.multiplayer) {
        fn(this.getState());
      } // Return a handle that allows the caller to unsubscribe.


      return function () {
        delete _this3.subscribers[id];
      };
    }
  }, {
    key: "getInitialState",
    value: function getInitialState() {
      return this.initialState;
    }
  }, {
    key: "getState",
    value: function getState() {
      var state = this.store.getState();

      if (this.gameStateOverride !== null) {
        state = this.gameStateOverride;
      } // This is the state before a sync with the game master.


      if (state === null) {
        return state;
      } // isActive.


      var isActive = true;
      var isPlayerActive = this.game.flow.isPlayerActive(state.G, state.ctx, this.playerID);

      if (this.multiplayer && !isPlayerActive) {
        isActive = false;
      }

      if (!this.multiplayer && this.playerID !== null && this.playerID !== undefined && !isPlayerActive) {
        isActive = false;
      }

      if (state.ctx.gameover !== undefined) {
        isActive = false;
      } // Secrets are normally stripped on the server,
      // but we also strip them here so that game developers
      // can see their effects while prototyping.


      var G = this.game.playerView(state.G, state.ctx, this.playerID); // Combine into return value.

      return _objectSpread(_objectSpread({}, state), {}, {
        G: G,
        log: this.log,
        isActive: isActive,
        isConnected: this.transport.isConnected
      });
    }
  }, {
    key: "createDispatchers",
    value: function createDispatchers() {
      this.moves = createMoveDispatchers(this.game.moveNames, this.store, this.playerID, this.credentials, this.multiplayer);
      this.events = createEventDispatchers(this.game.flow.enabledEventNames, this.store, this.playerID, this.credentials, this.multiplayer);
      this.plugins = createPluginDispatchers(this.game.pluginNames, this.store, this.playerID, this.credentials, this.multiplayer);
    }
  }, {
    key: "updatePlayerID",
    value: function updatePlayerID(playerID) {
      this.playerID = playerID;
      this.createDispatchers();
      this.transport.updatePlayerID(playerID);
      this.notifySubscribers();
    }
  }, {
    key: "updateGameID",
    value: function updateGameID(gameID) {
      this.gameID = gameID;
      this.createDispatchers();
      this.transport.updateGameID(gameID);
      this.notifySubscribers();
    }
  }, {
    key: "updateCredentials",
    value: function updateCredentials(credentials) {
      this.credentials = credentials;
      this.createDispatchers();
      this.notifySubscribers();
    }
  }]);

  return _ClientImpl;
}();
/**
 * Client
 *
 * boardgame.io JS client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} gameID - The gameID that you want to connect to.
 * @param {...object} playerID - The playerID associated with this client.
 * @param {...string} credentials - The authentication credentials associated with this client.
 *
 * Returns:
 *   A JS object that provides an API to interact with the
 *   game by dispatching moves and events.
 */


function Client(opts) {
  return new _ClientImpl(opts);
}
},{"redux":"node_modules/redux/es/redux.js","./turn-order-d7fe23d9.js":"node_modules/boardgame.io/dist/esm/turn-order-d7fe23d9.js","./reducer-186c7602.js":"node_modules/boardgame.io/dist/esm/reducer-186c7602.js","./Debug-b191d299.js":"node_modules/boardgame.io/dist/esm/Debug-b191d299.js","./initialize-f1052b38.js":"node_modules/boardgame.io/dist/esm/initialize-f1052b38.js"}],"node_modules/boardgame.io/dist/esm/client.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Client", {
  enumerable: true,
  get: function () {
    return _client051f8c0a.C;
  }
});

require("redux");

require("./turn-order-d7fe23d9.js");

require("immer");

require("./reducer-186c7602.js");

require("./Debug-b191d299.js");

require("flatted");

require("./ai-11415cb8.js");

var _client051f8c0a = require("./client-051f8c0a.js");

require("./initialize-f1052b38.js");
},{"redux":"node_modules/redux/es/redux.js","./turn-order-d7fe23d9.js":"node_modules/boardgame.io/dist/esm/turn-order-d7fe23d9.js","immer":"node_modules/immer/dist/immer.module.js","./reducer-186c7602.js":"node_modules/boardgame.io/dist/esm/reducer-186c7602.js","./Debug-b191d299.js":"node_modules/boardgame.io/dist/esm/Debug-b191d299.js","flatted":"node_modules/flatted/esm/index.js","./ai-11415cb8.js":"node_modules/boardgame.io/dist/esm/ai-11415cb8.js","./client-051f8c0a.js":"node_modules/boardgame.io/dist/esm/client-051f8c0a.js","./initialize-f1052b38.js":"node_modules/boardgame.io/dist/esm/initialize-f1052b38.js"}],"src/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.They8 = void 0;
var They8 = {
  setup: function setup() {
    return {
      cells: Array(9).fill(null)
    };
  },
  moves: {
    clickCell: function clickCell(G, ctx, id) {
      G.cells[id] = ctx.currentPlayer;
    }
  }
};
exports.They8 = They8;
},{}],"src/App.js":[function(require,module,exports) {
"use strict";

var _client = require("boardgame.io/client");

var _Game = require("./Game");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var They8Client = function They8Client() {
  _classCallCheck(this, They8Client);

  this.client = (0, _client.Client)({
    game: _Game.They8
  });
  this.client.start();
};

var app = new They8Client();
},{"boardgame.io/client":"node_modules/boardgame.io/dist/esm/client.js","./Game":"src/Game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/App.js"], null)
//# sourceMappingURL=/App.f684dadd.js.map