import * as _ from "lodash";

declare var Haste: any;

const window_size = [640, 480];
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
    this.container.x = 0;
    this.container.y = 0;
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

class Game {
  board: Board;

  stage: createjs.Stage;
  haste: any = {};
  keys: boolean[] = [];

  constructor() {
    this.stage = new createjs.Stage("canvas");
    this.board = new Board();

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
    let t = new createjs.Graphics();
    t.beginFill(createjs.Graphics.getRGB(255,200,200));
    t.drawRect(1, 1, box_size-1, box_size-1);

    let tile = new createjs.Shape(t);

    for (const ix of _.range(window_size[0] / box_size)) {
      for (const iy of _.range(window_size[1] / box_size)) {
        let tileClone = tile.clone();
        tileClone.x = ix * box_size;
        tileClone.y = iy * box_size;

        this.board.container.addChild(tileClone);
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
