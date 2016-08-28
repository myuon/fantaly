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

class Game {
  board: createjs.Container;
  bdir: [number, number] = [0,0];
  bstate: "waiting" | "sliding" = "waiting";

  stage: createjs.Stage;
  haste: any = {};
  keys: boolean[] = [];

  constructor() {
    this.stage = new createjs.Stage("canvas");
    this.board = new createjs.Container();
    this.board.x = 0;
    this.board.y = 0;

    this.tiling();
    this.stage.addChild(this.board);
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

        this.board.addChild(tileClone);
      }
    }
  }

  tick = () => {
    const dv = 8;

    if (this.bstate == "sliding") {
      this.board.x += this.bdir[0];
      this.board.y += this.bdir[1];

      if (this.board.x % box_size == 0 && this.board.y % box_size == 0) {
        this.bstate = "waiting";
        this.bdir = [0,0];
      }
    } else {
      if (this.keys[KeyName.KeyLeft]) {
        this.bdir = [dv,0];
        this.bstate = "sliding";
      }
      if (this.keys[KeyName.KeyUp]) {
        this.bdir = [0,dv];
        this.bstate = "sliding";
      }
      if (this.keys[KeyName.KeyRight]) {
        this.bdir = [-dv,0];
        this.bstate = "sliding";
      }
      if (this.keys[KeyName.KeyDown]) {
        this.bdir = [0,-dv];
        this.bstate = "sliding";
      }
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
