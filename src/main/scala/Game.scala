package fantaly

import fantaly.adapters.controllers._
import fantaly.adapters.interfaces.PortHandler

import scala.scalajs.js

object Main extends js.JSApp {
  def main(): Unit = {
    MoveOnFieldController.execute()
  }
}
