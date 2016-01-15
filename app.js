/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Game = __webpack_require__(1);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	    'use strict';
	
	    document.addEventListener('DOMContentLoaded', function () {
	        new _Game2.default().run();
	    }, false);
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	/// <reference path="Vendor/p2.d.ts" />
	var Game = (function () {
	    function Game() {
	    }
	    Game.prototype.run = function () {
	        this.setupWorld();
	        this.setupRenderer();
	        this.createTracks();
	    };
	    Game.prototype.setupRenderer = function () {
	        var game = this;
	        var renderer = new p2.WebGLRenderer(function () {
	            this.setWorld(game.world);
	        });
	        renderer.on('dropBody', this.onDrop.bind(this));
	    };
	    Game.prototype.setupWorld = function () {
	        this.world = new p2.World({ gravity: [0, 0] });
	        this.world.solver.iterations = 100;
	        this.world.on('postStep', this.postStep, this);
	    };
	    Game.prototype.postStep = function () {
	        this.world.bodies.forEach(function (body) {
	            body.velocity = [0, 0];
	            body.angularVelocity = 0;
	        });
	    };
	    Game.prototype.createTracks = function () {
	        this.createShortStraight();
	        this.createShortStraight();
	        this.createShortStraight();
	        this.createShortStraight();
	        this.createShortStraight();
	        this.createMiddleStraight();
	        this.createMiddleStraight();
	        this.createMiddleStraight();
	        this.createMiddleStraight();
	        this.createMiddleStraight();
	        this.createLongStraight();
	        this.createLongStraight();
	        this.createLongStraight();
	        this.createLongStraight();
	        this.createLongStraight();
	        //this.createCurve();
	    };
	    Game.prototype.createShortStraight = function () {
	        this.createTrack([
	            [-0.1, -0.2],
	            [0.1, -0.2],
	            [0.1, 0.2],
	            [-0.1, 0.2],
	        ], [0, 0.2], [0, -0.2]);
	    };
	    Game.prototype.createMiddleStraight = function () {
	        this.createTrack([
	            [-0.1, -0.3],
	            [0.1, -0.3],
	            [0.1, 0.3],
	            [-0.1, 0.3],
	        ], [0, 0.3], [0, -0.3]);
	    };
	    Game.prototype.createLongStraight = function () {
	        this.createTrack([
	            [-0.1, -0.4],
	            [0.1, -0.4],
	            [0.1, 0.4],
	            [-0.1, 0.4],
	        ], [0, 0.4], [0, -0.4]);
	    };
	    Game.prototype.createCurve = function () {
	        this.createTrack([
	            [-3.5, -0.2],
	            [2.5, 2.2],
	            [3.5, 0.8],
	            [-3.5, -2.2],
	        ], [0, 0.4], [0, -0.4]);
	    };
	    Game.prototype.createTrack = function (path, pin, hole) {
	        var track = new p2.Body({ mass: 0.1, position: [this.world.bodies.length / 5, 0] });
	        var shape = new p2.Convex({ vertices: path });
	        track.addShape(shape);
	        track.addShape(new p2.Circle({ radius: 0.05 }), pin);
	        track.pin = pin;
	        track.hole = hole;
	        track.collisionResponse = false;
	        this.world.addBody(track);
	    };
	    Game.prototype.onDrop = function (event) {
	        var draggedBody = event.body;
	        if (draggedBody.pinJoint !== undefined)
	            return;
	        for (var i = 0; i < this.world.bodies.length; i++) {
	            var body = this.world.bodies[i];
	            if (!draggedBody.overlaps(body)) {
	                continue;
	            }
	            if (body.holeJoint !== undefined) {
	                continue;
	            }
	            if (draggedBody.holeJoint !== undefined && draggedBody.holeJoint == body) {
	                continue;
	            }
	            this.createJoint(draggedBody, body);
	            return;
	        }
	    };
	    Game.prototype.createJoint = function (bodyA, bodyB) {
	        bodyA.pinJoint = bodyB;
	        bodyB.holeJoint = bodyA;
	        var constraint = new p2.RevoluteConstraint(bodyA, bodyB, { localPivotA: bodyA.pin, localPivotB: bodyB.hole });
	        constraint.setLimits(-Math.PI / 16, Math.PI / 16);
	        this.world.addConstraint(constraint);
	    };
	    return Game;
	})();
	exports.__esModule = true;
	exports["default"] = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map