/// <reference path="../../node_modules/@types/createjs/index.d.ts" />
import * as _ from "lodash";

declare var Haste: any;

const window_size = [320, 240];
const box_size = 32;

enum KeyName {
  KeyLeft = 37,
  KeyUp,
  KeyRight,
  KeyDown
}

namespace BoardConst {
  export const dv = 4;
}

class Board {
  container: createjs.Container;
  move: [number, number] = [0,0];
  state: "none" | "moving" = "none"
  step: number = 0;

  constructor() {
    this.container = new createjs.Container();
    this.container.x = window_size[0] / 2 - box_size / 2;
    this.container.y = window_size[1] / 2 - box_size / 2;
  }

  slide = () => {
    this.container.x += this.move[0];
    this.container.y += this.move[1];
    this.step += 1;
  }

  setMove = (dir: "north" | "east" | "south" | "west") => {
    if (this.state == "moving") return;

    if (dir == "north") {
      this.move = [0,BoardConst.dv];
    } else if (dir == "east") {
      this.move = [-BoardConst.dv,0];
    } else if (dir == "south") {
      this.move = [0,-BoardConst.dv];
    } else if (dir == "west") {
      this.move = [BoardConst.dv,0];
    }

    this.state = "moving";
    this.slide();
  }

  tick = () => {
    if (this.step % (box_size / BoardConst.dv) == 0) {
      this.state = "none";
      this.move = [0,0];
      this.step = 0;
    } else {
      this.slide();
    }
  }
}

class Resource {
  maptip: createjs.Sprite;

  constructor() {
    let sheet = new createjs.SpriteSheet({
      // images: ["img/private/Dungeon_A4_Freem7.png"],
      images: ["img/room_map.png"],
      frames: {width: box_size, height: box_size}
    });
    this.maptip = new createjs.Sprite(sheet);
  }
}

class Game {
  stage: createjs.Stage;
  board: Board;
  resource: Resource;
  haste: any = {};
  keys: boolean[] = [];

  constructor() {
    this.stage = new createjs.Stage("canvas");
    this.board = new Board();
    this.resource = new Resource();

    this.tiling();
    this.stage.addChild(this.board.container);
    this.stage.update();

    document.onkeydown = (event) => {
      this.keys[event.keyCode] = true;
    };
    document.onkeyup = (event) => {
      delete this.keys[event.keyCode];
    };
  }

  tiling = () => {
    for (const iy of _.range(Haste.defField.length)) {
      for (const ix of _.range(Haste.defField[0].length)) {
        let t = this.resource.maptip.clone();
        t.x = ix * box_size;
        t.y = iy * box_size;
        let v = Haste.defField[iy][ix];
        t.gotoAndStop(v);

        this.board.container.addChild(t);
      }
    }
  }

  tick = () => {
    this.board.tick();

    if (this.keys[KeyName.KeyLeft]) {
      this.board.setMove("west");
    }
    if (this.keys[KeyName.KeyUp]) {
      this.board.setMove("north");
    }
    if (this.keys[KeyName.KeyRight]) {
      this.board.setMove("east");
    }
    if (this.keys[KeyName.KeyDown]) {
      this.board.setMove("south");
    }

    this.stage.update();
  }

  run = () => {
    createjs.Ticker.addEventListener("tick", this.tick);
    createjs.Ticker.setFPS(30);
  }
}

function initialize() {
  let game = new Game();
  game.run();
}

(<any>window).initialize = initialize;
