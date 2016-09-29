package fantaly.utils

import scala.scalajs.js.annotation.JSName
import com.scalawarrior.scalajs.createjs._
import scala.scalajs.js

@js.native
@JSName("createjs.Ticker")
object TickerExt extends Ticker {
  def addEventListener(`type`: String, listener: js.Function1[Object, Boolean], useCapture: Boolean): js.Function = js.native
  def addEventListener(`type`: String, listener: js.Any, useCapture: Boolean): Object = js.native
}
