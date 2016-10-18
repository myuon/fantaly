package fantaly.adapter.actor

import akka.actor._
import com.scalawarrior.scalajs.createjs._
import fantaly.util._
import org.scalajs.dom
import org.scalajs.dom.KeyboardEvent

case class OnInit(callback: Stage => Unit)
case class OnTick(callback: Stage => Unit)
case class OnKeyDown(callback: Map[Int,Int] => Unit)
case object GetKeys
case object Run

class Manager extends Actor {
  var keys: Map[Int,Int] = {
    val g = for {
      i <- 0 to 255
    } yield (i,0)

    g.toMap
  }
  val stage: Stage = new Stage("canvas")

  var inits: List[Stage => Unit] = List()
  var onkeydowns: List[Map[Int,Int] => Unit] = List()
  var ticks: List[Stage => Unit] = List()

  override def receive = {
    case OnInit(callback) =>
      inits = callback +: inits
      sender() ! ()
    case OnTick(callback) =>
      ticks = callback +: ticks
      sender() ! ()
    case OnKeyDown(callback) =>
      onkeydowns = callback +: onkeydowns
      sender() ! ()
    case GetKeys =>
      sender() ! keys

    case Run =>
      dom.onkeydown = { (event: KeyboardEvent) =>
        keys = keys.updated(event.keyCode, keys(event.keyCode) + 1)
        onkeydowns.foreach(f => f(keys))
      }
      dom.onkeyup = { (event: KeyboardEvent) =>
        keys = keys.updated(event.keyCode, 0)
      }

      inits foreach { init => init(stage) }
      ticks foreach { tick => TickerExt.addEventListener("tick", () => tick(stage), false) }

      Ticker.setFPS(30)
      TickerExt.addEventListener("tick", () => stage.update(), false)
      sender() ! ()
  }
}

trait UsesManager {
  val manager: ActorRef
}
