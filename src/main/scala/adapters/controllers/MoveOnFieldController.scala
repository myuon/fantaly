package fantaly.adapters.controllers

import com.scalawarrior.scalajs.createjs._
import fantaly.adapters.dbs._
import fantaly.adapters.interfaces._
import fantaly.usecases._
import fantaly.usecases.player._

trait IMoveOnFieldController extends Controller with UsesMoveOnFieldUseCase {
  val container: Container = new Container()

  override def execute(): Unit = {
    PortHandler.register(moveOnFieldUseCase.execute())
    PortHandler.register(Tick {
    })
  }
}

object MoveOnFieldController extends IMoveOnFieldController {
  val moveOnFieldUseCase = new MoveOnFieldUseCase with FieldRepositoryImpl
}
