package fantaly.adapters.interfaces

import com.scalawarrior.scalajs.createjs._

trait UsesStage {
  val stage: Stage = new Stage("canvas")
}
