package fantaly.adapter.controller

import akka.pattern._
import akka.util.Timeout
import org.scalajs.dom.ext._
import fantaly.usecase._
import fantaly.adapter.actor._
import fantaly.adapter.presenter._

import scala.concurrent._

trait ScreenMode
case object WorldMapMode extends ScreenMode

case class ElementDTO(mode: ScreenMode, position: (Int,Int))

trait MoveOnWorldController extends UsesMoveOnWorldUseCase with UsesWorldPresenter with UsesManager {
  def execute()(implicit timeout: Timeout, ec: ExecutionContext): Future[Unit] = {
    def iter(eventDTO: EventDTO)(f: EventType => Future[Any]): Future[Unit] = {
      eventDTO match {
        case Nil => Future.successful(())
        case Cons(x,xs) => f(x) flatMap { _ => iter(xs)(f) }
      }
    }

    manager ? OnInit(worldPresenter.init) flatMap { (_: Any) =>
      iter(moveOnWorldUseCase.execute()) {
        case Init(callback) =>
          manager ? OnInit(_ => callback)
        case EventKeyLR(callback) =>
          manager ? OnKeyDown { keys =>
            if (keys(KeyCode.Right) > 0) callback(CaseR)
            if (keys(KeyCode.Left) > 0) callback(CaseL)
          }
        case Draw(callback) =>
          manager ? OnTick { stage =>
            callback() foreach { position =>
              worldPresenter.execute(stage, ElementDTO(WorldMapMode, position))
            }
          }
      }
    }
  }
}

trait UsesMoveOnWorldController {
  val moveOnWorldController: MoveOnWorldController
}

