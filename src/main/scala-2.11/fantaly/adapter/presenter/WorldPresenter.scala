package fantaly.adapter.presenter

import fantaly.adapter.actor._
import fantaly.adapter.controller.ElementDTO
import com.scalawarrior.scalajs.createjs._

trait WorldPresenter extends UsesManager {
  val chara = new Text("@", "sans-serif 50px", "#000")

  def init(stage: Stage): Unit = {
    chara.x = 100
    chara.y = 20
    stage.addChild(chara)
  }

  def execute(stage: Stage, elem: ElementDTO): Unit = {
    chara.x = elem.position._1
    chara.y = elem.position._2
  }
}

trait UsesWorldPresenter {
  val worldPresenter: WorldPresenter
}
