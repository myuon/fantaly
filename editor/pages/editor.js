function extend(itrf, part) {
    return $.extend(itrf, part);
}
const window_size = [480, 360];
$("#canvas").attr("width", window_size[0]);
$("#canvas").attr("height", window_size[1]);
const box_size = 32;
var KeyName;
(function (KeyName) {
    KeyName[KeyName["KeySpace"] = 32] = "KeySpace";
    KeyName[KeyName["KeyLeft"] = 37] = "KeyLeft";
    KeyName[KeyName["KeyUp"] = 38] = "KeyUp";
    KeyName[KeyName["KeyRight"] = 39] = "KeyRight";
    KeyName[KeyName["KeyDown"] = 40] = "KeyDown";
})(KeyName || (KeyName = {}));
var BoardConst;
(function (BoardConst) {
    BoardConst.dv = 4;
})(BoardConst || (BoardConst = {}));
class Board {
    constructor(w, h) {
        this.move = [0, 0];
        this.state = "none";
        this.step = 0;
        this.slide = () => {
            this.container.x += this.move[0];
            this.container.y += this.move[1];
            this.step += 1;
        };
        this.setMove = (dir) => {
            if (this.state == "moving")
                return;
            if (dir == "north") {
                this.move = [0, BoardConst.dv];
            }
            else if (dir == "east") {
                this.move = [-BoardConst.dv, 0];
            }
            else if (dir == "south") {
                this.move = [0, -BoardConst.dv];
            }
            else if (dir == "west") {
                this.move = [BoardConst.dv, 0];
            }
            this.state = "moving";
            this.slide();
        };
        this.tick = () => {
            if (this.step % (box_size / BoardConst.dv) == 0) {
                this.state = "none";
                this.move = [0, 0];
                this.step = 0;
            }
            else {
                this.slide();
            }
        };
        this.container = new createjs.Container();
        this.container.setBounds(0, 0, w * box_size, h * box_size);
        this.container.x = window_size[0] / 2 - box_size / 2;
        this.container.y = window_size[1] / 2 - box_size / 2;
    }
}
class Resource {
    constructor() {
        let sheet = new createjs.SpriteSheet({
            images: ["../../pages/img/private/Dungeon_A4_Freem7.png"],
            frames: { width: box_size, height: box_size }
        });
        this.maptip = new createjs.Sprite(sheet);
    }
}
const wx = 30;
const wy = 20;
let array2D = (size) => {
    let arr = new Array();
    for (let x of _.range(size[1])) {
        arr[x] = _.fill(new Array(size[0]), null);
    }
    return arr;
};
class Game {
    constructor(refMI) {
        this.haste = {};
        this.keys = [];
        this.field = array2D([wx, wy]);
        this.tiling = () => {
            let tile = new createjs.Graphics();
            tile.beginFill(createjs.Graphics.getRGB(220, 220, 220));
            tile.drawRect(0, 0, box_size - 1, box_size - 1);
            this.stage.clear();
            for (const iy of _.range(wy)) {
                for (const ix of _.range(wx)) {
                    if (iy in this.field && ix in this.field[iy] && this.field[iy][ix]) {
                        let t = this.resource.maptip.clone();
                        t.x = ix * box_size;
                        t.y = iy * box_size;
                        let v = this.field[iy][ix];
                        t.gotoAndStop(v[1] * this.refMapImage.state.bitmap.getBounds().width / box_size + v[0]);
                        this.board.container.addChild(t);
                    }
                    else {
                        let t = new createjs.Shape(tile);
                        t.x = ix * box_size;
                        t.y = iy * box_size;
                        this.board.container.addChild(t);
                    }
                }
            }
        };
        this.tick = () => {
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
            if (this.keys[KeyName.KeySpace]) {
                console.log(this.field.map(x => x.toString()));
            }
            this.stage.update();
        };
        this.clicked = (obj) => {
            let tx = Math.floor((obj.stageX - this.board.container.x) / box_size);
            let ty = Math.floor((obj.stageY - this.board.container.y) / box_size);
            this.field[ty][tx] = this.refMapImage.state.select;
            this.tiling();
        };
        this.run = () => {
            createjs.Ticker.addEventListener("tick", this.tick);
            this.stage.addEventListener('click', this.clicked);
            createjs.Ticker.setFPS(30);
        };
        this.stage = new createjs.Stage("canvas");
        this.board = new Board(wx, wy);
        this.resource = new Resource();
        this.refMapImage = refMI;
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
}
;
class MapImage extends React.Component {
    constructor() {
        super();
        this.addClickEvent = (bmp) => {
            bmp.addEventListener('click', (obj) => {
                let tx = Math.floor(obj.stageX / box_size);
                let ty = Math.floor(obj.stageY / box_size);
                this.setState((state, _) => extend(state, {
                    select: [tx, ty]
                }));
            });
        };
        this.state = {
            bitmap: null,
            loaded: false,
            select: [0, 0]
        };
    }
    componentDidMount() {
        let queue = new createjs.LoadQueue(false);
        queue.addEventListener('fileload', (obj) => {
            if (obj.item.type === createjs.LoadQueue.IMAGE) {
                obj.result.crossOrigin = "Anonymous";
                let bmp = new createjs.Bitmap(obj.result);
                this.addClickEvent(bmp);
                this.stage = new createjs.Stage("canvas-map-image");
                this.stage.addChild(bmp);
                this.setState((state, _) => extend(state, {
                    bitmap: bmp,
                    loaded: true
                }));
            }
        });
        queue.addEventListener('complete', (_) => {
            this.stage.update();
        });
        queue.loadManifest([
            { id: 'image', src: this.props.url },
        ]);
        createjs.Ticker.addEventListener('tick', () => {
        });
    }
    render() {
        if (this.stage) {
            let g = new createjs.Graphics();
            g.beginStroke("#ff0000");
            g.drawRect(this.state.select[0] * box_size, this.state.select[1] * box_size, box_size, box_size);
            let tile = new createjs.Shape(g);
            this.stage.clear();
            this.stage.addChild(this.state.bitmap);
            this.stage.addChild(tile);
            this.stage.update();
        }
        return (React.createElement("canvas", {id: "canvas-map-image", width: this.state.loaded && this.state.bitmap.getBounds().width, height: this.state.loaded && this.state.bitmap.getBounds().height}));
    }
}
function initialize() {
    let mapImage = ReactDOM.render(React.createElement(MapImage, {url: "../../pages/img/private/Dungeon_A4_Freem7.png"}), document.getElementById('map-image'));
    let game = new Game(mapImage);
    game.run();
}
initialize();
