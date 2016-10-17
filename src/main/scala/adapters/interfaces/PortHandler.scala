package fantaly.adapters.interfaces

import com.scalawarrior.scalajs.createjs._
import fantaly.usecases._
import fantaly.utils.Types._
import fantaly.utils._
import org.scalajs.dom
import org.scalajs.dom.KeyboardEvent
import org.scalajs.dom.ext.KeyCode

object PortHandler {
  // これだとPortHandlerを実行するControllerごとに異なるkeysが生成・管理されるので🙅
  // やはりactorか…？ それかこの機構自体をexternal interface層に埋め込めない？
  var keys: Keys = List.fill(256)(0)

  private def dir2KeyMap[O](f: Direction => Option[O]): Keys => Option[O] = { km =>
    if (km(KeyCode.Up) > 0) f(North)
    if (km(KeyCode.Right) > 0) f(East)
    if (km(KeyCode.Down) > 0) f(South)
    if (km(KeyCode.Left) > 0) f(West)
    None
  }

  def map[O](p: Port[O])(f: Port[O] => Port[O]): Port[O] = {
    p match {
      case Append(x,y) => Append(map(x)(f), map(y)(f))
      case z => f(z)
    }
  }

  def run[O](p: Port[O]): Unit = {
    p match {
      case Append(x,y) => this.run(x); this.run(y)
      case Init(f) => f
      case KeyEvent(f) => {
        val onkeydown =
          if (Ticker.hasEventListener("onkeydown") == false) {
            (event: KeyboardEvent) => {
              this.keys = this.keys.updated(event.keyCode, this.keys(event.keyCode) + 1)
              f
            }
          } else {
            (event: KeyboardEvent) => {
              println("keydown!")
              Ticker.dispatchEvent(new Event("onkeydown", false, false))
              f
            }
          }

        TickerExt.addEventListener("onkeydown", onkeydown, false)

        if (Ticker.hasEventListener("onkeyup") == false) {
          val onkeyup = (event: KeyboardEvent) => {
            this.keys = this.keys.updated(event.keyCode, 0)
          }

          TickerExt.addEventListener("onkeyup", onkeyup, false)
        }
      }
      case KeyDirection(f) => {
        this.run(KeyEvent(dir2KeyMap(f)))
      }
      case Tick(f) => {
        val g = Ticker.dispatchEvent(new Event("tick", false, false))
        val tick = g;f
        TickerExt.addEventListener("tick", tick, false)
      }
    }
  }
}
