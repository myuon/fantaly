package fantaly

import java.util.concurrent.TimeUnit
import akka.actor._
import akka.pattern._
import akka.util.Timeout
import fantaly.adapter.actor._
import fantaly.adapter.controller._
import fantaly.adapter.presenter.{UsesWorldPresenter, WorldPresenter}
import fantaly.adapter.repository.WorldRepositoryWithShared
import fantaly.domain.repository.{UsesWorldRepository, WorldRepository}
import fantaly.usecase.{MoveOnWorldUseCase, UsesMoveOnWorldUseCase}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.scalajs.js._

object Instances {
  val actor = ActorSystem("actor-system")
  val managerActor = actor.actorOf(Props[Manager])
  val sharedActor = actor.actorOf(Props[Shared])

  trait MixInManager extends UsesManager {
    val manager: ActorRef = managerActor
  }

  trait MixInShared extends UsesShared {
    val shared: ActorRef = sharedActor
  }

  // actor以外が揃っているときはOK、みたいなかきかたはできない？
  // trait -> traitの実装 -> actorの実装 という風になるので...
  trait MixInWorldRepository extends UsesWorldRepository {
    val worldRepository = WorldRepositoryImpl
  }

  object WorldRepositoryImpl extends WorldRepository
    with WorldRepositoryWithShared with MixInShared

  trait MixInWorldUseCase extends UsesMoveOnWorldUseCase {
    override val moveOnWorldUseCase: MoveOnWorldUseCase = MoveOnWorldUseCaseImpl
  }

  object MoveOnWorldUseCaseImpl extends MoveOnWorldUseCase
    with MixInWorldRepository

  trait MixInWorldPresenter extends UsesWorldPresenter {
    override val worldPresenter: WorldPresenter = WorldPresenterImpl
  }

  object WorldPresenterImpl extends WorldPresenter
    with MixInManager

  object MoveOnWorldController extends MoveOnWorldController
    with MixInWorldUseCase
    with MixInManager
    with MixInWorldPresenter
}

object Main extends JSApp {
  def main() = {
    implicit val timeout = Timeout(5000, TimeUnit.MILLISECONDS)

    Instances.MoveOnWorldController.execute() onSuccess { case () =>
      Instances.managerActor ! Run
    }
  }
}
