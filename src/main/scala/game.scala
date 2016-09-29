package fantaly

import com.scalawarrior.scalajs.createjs._

import scala.scalajs.js
import scala.scalajs.js.annotation.JSName
import org.scalajs.dom.ext._
import org.scalajs.dom
import org.scalajs.dom.KeyboardEvent

@js.native
@JSName("createjs.Ticker")
object TickerExt extends Ticker {
  def addEventListener(`type`: String, listener: js.Function1[Object, Boolean], useCapture: Boolean): js.Function = js.native
  def addEventListener(`type`: String, listener: js.Any, useCapture: Boolean): Object = js.native
}

trait Direction
case object North extends Direction
case object East extends Direction
case object South extends Direction
case object West extends Direction

class Board {
  trait State
  case object SNone extends State
  case object SMove extends State

  val dv = 4

  val container: Container = {
    val c = new Container()
    c.x = Resource.windowSize._1 / 2 - Resource.boxSize / 2
    c.y = Resource.windowSize._1 / 2 - Resource.boxSize / 2
    c
  }

  var move: (Int,Int) = (0,0)
  var state: State = SNone
  var step: Int = 0

  def slide(): Unit = {
    this.container.x += this.move._1
    this.container.y += this.move._2
    this.step += 1
  }

  def setMove(dir: Direction): Unit = {
    if (this.state == SNone) {
      dir match {
        case North => this.move = (0,dv)
        case East => this.move = (-dv,0)
        case South => this.move = (0,-dv)
        case West => this.move = (dv,0)
      }

      this.state = SMove
      this.slide()
    }
  }

  def tick() = {
    if (this.step % (Resource.boxSize / dv) == 0) {
      this.state = SNone
      this.move = (0,0)
      this.step = 0
    } else {
      this.slide()
    }
  }
}

object Resource {
  val windowSize = (320, 240)
  val boxSize = 32

  val maptip = {
    val sheet = new SpriteSheet(js.Dictionary(
      "images" -> js.Array("img/private/Dungeon_A4_Freem7.png"),
      "frames" -> js.Dictionary(
        "width" -> boxSize,
        "height" -> boxSize
      )
    ))
    new Sprite(sheet)
  }
}

class Game {
  val stage: Stage = new Stage("canvas")
  val board: Board = new Board()
  var keys: List[Boolean] = List.fill(256)(false)

  def init(): Unit = {
    this.tiling()
    this.stage.addChild(this.board.container)
    this.stage.update()

    dom.document.onkeydown = (event: KeyboardEvent) => {
      this.keys = this.keys.updated(event.keyCode, true)
    }
    dom.document.onkeyup = (event: KeyboardEvent) => {
      this.keys = this.keys.updated(event.keyCode, false)
    }
  }

  val _array = List(
    List(0,0,1,0,3,3,3,3,3,3),
    List(1,1,0,1,3,3,3,3,3,3),
    List(3,3,3,3,4,4,4,4,4,4)
  )

  val wSize = (this._array.head.length, this._array.length)

  val array: Map[Tuple2[Int,Int],Int] = {
    val g = for {
      (xs,iy) <- _array.zipWithIndex
      (x,ix) <- xs.zipWithIndex
    } yield {
      (ix,iy) -> x
    }

    g.toMap
  }

  def tiling(): Unit = {
    for {
      ix <- 0 until wSize._1
      iy <- 0 until wSize._2
    } yield {
      val t = Resource.maptip.clone()
      t.x = ix * Resource.boxSize
      t.y = iy * Resource.boxSize
      val v = this.array((ix,iy))
      t.gotoAndStop(v.toString)

      this.board.container.addChild(t)
    }
  }

  def tick: Object => Boolean = (obj) => {
    this.board.tick()

    if (this.keys(KeyCode.Left)) this.board.setMove(West)
    if (this.keys(KeyCode.Up)) this.board.setMove(North)
    if (this.keys(KeyCode.Right)) this.board.setMove(East)
    if (this.keys(KeyCode.Down)) this.board.setMove(South)

    this.stage.update()
    true
  }

  def run(): Unit = {
    this.init()
    Ticker.setFPS(30)
    TickerExt.addEventListener("tick", this.tick, false)
  }
}

object Main extends js.JSApp {
  def main(): Unit = {
    val game = new Game()
    game.run()
  }
}
