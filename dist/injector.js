(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["injector"] = factory();
	else
		root["injector"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Simple dependency injector.
 * @constructor
 */
var Injector = function Injector() {
    var disableOutput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this.disableOutput = disableOutput;
    this.components = {
        injector: this
    };
};

/**
 * Registers prepared component or constructor.
 * @param name Name of the component.
 * @param constructor Prepared component or constructor.
 */
Injector.prototype.register = function (name, constructor) {
    if (!this.disableOutput) {
        console.log("[" + new Date() + "]", "[Injector]", "Registering '" + name + "' component.");
    }
    this.components[name] = constructor;
};

/**
 * Resolves component and registers it.
 * @param name Name of the service.
 * @param constructor Prepared component or constructor.
 * @param params Extra parameters for constructor.
 */
Injector.prototype.registerService = function (name, constructor, params) {
    var service = this.resolve(constructor, params);
    if (!this.disableOutput) {
        console.log("[" + new Date() + "]", "[Injector]", "Registering '" + name + "' service.");
    }
    this.components[name] = service;
};
Injector.prototype.registerUtility = function (name, constructor, params) {
    var service = this.resolve(constructor, params);
    if (!this.disableOutput) {
        console.log("[" + new Date() + "]", "[Injector]", "Registering '" + name + "' utility.");
    }
    this.components[name] = service;
};

/**
 * Resolves constructor into prepared component.
 * @param constructor Prepared component or constructor.
 * @returns {*}
 */
Injector.prototype.resolve = function (constructor, params) {
    var _this = this;

    // If constructor is an object returning it
    if ((typeof constructor === "undefined" ? "undefined" : _typeof(constructor)) === "object") {
        return constructor;
    }
    // If constructor is an string returning registered component
    if (typeof constructor === "string") {
        if (this.components[constructor] === undefined) {
            throw "Cannot resolve '" + constructor + "' dependency.";
        }
        return this.resolve(this.components[constructor]);
    }
    // If constructor is a function resolving it
    if (typeof constructor === "function") {
        if (!constructor.prototype.dependencies) {
            throw "Define dependencies for one of registered classes.";
        }
        var dependencies = {};
        constructor.prototype.dependencies.forEach(function (dependency) {
            if (_this.components[dependency] === undefined) {
                throw "Cannot resolve '" + dependency + "' dependency.";
            }
            dependencies[dependency] = _this.resolve(_this.components[dependency]);
        });
        return new constructor(dependencies, params);
    }
    throw "Cannot resolve dependency.";
};

/* harmony default export */ __webpack_exports__["default"] = (Injector);

/***/ })
/******/ ]);
});
//# sourceMappingURL=injector.js.map