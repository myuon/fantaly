package fantaly.adapters.interfaces

import fantaly.usecases._
import fantaly.utils.Types._
import fantaly.utils._
import org.scalajs.dom
import org.scalajs.dom.KeyboardEvent
import org.scalajs.dom.ext.KeyCode

object PortHandler {
  var inits: Seq[Unit] = Seq()
  var ticks: Seq[Unit] = Seq()
  var keyEvents: Seq[Keys => Unit] = Seq()
  var keys: Keys = List.fill(256)(0)

  private def dir2KeyMap(f: Direction => Unit): Keys => Unit = { km =>
    if (km(KeyCode.Up) > 0) f(North)
    if (km(KeyCode.Right) > 0) f(East)
    if (km(KeyCode.Down) > 0) f(South)
    if (km(KeyCode.Left) > 0) f(West)
  }

  final def register(p: Port): Unit = {
    p match {
      case Init(f) => f +: this.inits
      case Tick(f) => f +: this.ticks
      case KeyEvent(f) => f +: this.keyEvents
      case KeyDirection(f) => dir2KeyMap(f) +: this.keyEvents
      case Append(x,y) => register(x); register(y)
    }
  }

  final def run(): Unit = {
    this.inits.foreach { (f: Unit) => f }
    this.ticks.foreach { (f: Unit) => TickerExt.addEventListener("tick",f,false) }

    dom.document.onkeydown = (event: KeyboardEvent) => {
      this.keys = this.keys.updated(event.keyCode, this.keys(event.keyCode) + 1)
      this.keyEvents.foreach { f => f(this.keys) }
    }
    dom.document.onkeyup = (event: KeyboardEvent) => {
      this.keys = this.keys.updated(event.keyCode, 0)
    }
  }
}
