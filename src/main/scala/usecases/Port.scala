package fantaly.usecases

import fantaly.utils.Types._

trait Port[O] {
  def ~(that: Port[O]): Port[O] = Append(this, that)
}
case class Append[O](x: Port[O], y: Port[O]) extends Port[O]

case class Init[O](callback: O) extends Port[O]
case class Tick[O](callback: O => Option[O]) extends Port[O]
case class KeyEvent[O](callback: Keys => O) extends Port[O]
case class KeyDirection[O](callback: Direction => Option[O]) extends Port[O]

trait EventHandlers {
  final def onInit[O](f: O): Port[O] = Init(f)
  final def onTick[O](f: O => Option[O]): Port[O] = Tick(f)
  final def onKeyEvent[O](f: Keys => O): Port[O] = KeyEvent(f)
  final def onKeyDirection[O](f: Direction => Option[O]): Port[O] = KeyDirection(f)
}
