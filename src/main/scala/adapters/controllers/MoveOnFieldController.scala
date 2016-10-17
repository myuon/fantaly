package fantaly.adapters.controllers

import com.scalawarrior.scalajs.createjs._
import fantaly.adapters.dbs._
import fantaly.adapters.interfaces._
import fantaly.usecases._

trait IMoveOnFieldController extends Controller with UsesMoveOnFieldUseCase {
  val stage: Stage = new Stage("canvas")
  val container: Container = new Container()

  def adjustContainerOffset(dto: FieldDTO): Unit = {
    val FieldDTO((x,y), _) = dto
    container.x = x
    container.y = y
  }

  override def execute(): Unit = {
    val p = PortHandler.map(moveOnFieldUseCase.execute()) { _ match {
      case Init(f) => {
        val dto@FieldDTO(_, tiles) = f
        this.adjustContainerOffset(dto)
        stage.addChild(container)
        tiles foreach { this.container.addChild(_) }
        Init(dto)
      }
      case Tick(f) => Tick { x =>
        val y = f(x)
        y foreach adjustContainerOffset
        y
      }
      case z => z
    } }

    PortHandler.run(p)
  }
}

object MoveOnFieldController extends IMoveOnFieldController {
  val moveOnFieldUseCase = new MoveOnFieldUseCase with FieldRepositoryImpl
}
