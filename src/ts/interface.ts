/// <reference path="../../node_modules/@types/createjs/index.d.ts" />
import * as createjs from "createjs";

function initialize() {
  let stage = new createjs.Stage("canvas");

  let circle = new createjs.Shape();
  circle.graphics.beginFill("red").drawCircle(0, 0, 40);
  circle.x = circle.y = 50;
  stage.addChild(circle);
  stage.update();

  let square = new createjs.Shape();
  square.graphics.drawRect(150, 250, 50, 50);
  stage.addChild(square);
  stage.update();
}

(<any>window).initialize = initialize;
