package fantaly.usecases

import fantaly.utils.Types._

trait Port {
  def ~(that: Port): Port = Append(this, that)
}
case class Append(x: Port, y: Port) extends Port

case class Init(callback: Unit) extends Port
case class Tick(callback: Unit) extends Port
case class KeyEvent(callback: Keys => Unit) extends Port
case class KeyDirection(callback: Direction => Unit) extends Port

trait EventHandlers {
  final def onInit(f: Unit): Port = Init(f)
  final def onTick(f: Unit): Port = Tick(f)
  final def onKeyEvent(f: Keys => Unit): Port = KeyEvent(f)
  final def onKeyDirection(f: Direction => Unit): Port = KeyDirection(f)
}
