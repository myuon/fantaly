package fantaly.utils

import com.scalawarrior.scalajs.createjs._
import scala.scalajs.js

object Resource {
  val windowSize = (320,240)
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

object Types {
  type Keys = List[Int]

  sealed trait Direction
  case object North extends Direction
  case object East extends Direction
  case object South extends Direction
  case object West extends Direction
}
