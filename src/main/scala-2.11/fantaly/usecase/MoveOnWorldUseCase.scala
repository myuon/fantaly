package fantaly.usecase

import fantaly.domain._
import fantaly.domain.repository.UsesWorldRepository
import akka.util.Timeout

import scala.concurrent.{ExecutionContext, Future}

trait EventDTO {
  def #:(that: EventType): EventDTO = Cons(that, this)
}
case object Nil extends EventDTO
case class Cons(head: EventType, tail: EventDTO) extends EventDTO

trait EventType
case class EventKeyLR(callback: LR => Unit) extends EventType
case class Draw(callback: Unit => Future[(Int,Int)]) extends EventType
case class Init(callback: Unit) extends EventType

trait LR
case object CaseL extends LR
case object CaseR extends LR

trait MoveOnWorldUseCase extends UsesWorldRepository {
  def execute()(implicit timeout: Timeout, ec: ExecutionContext): EventDTO = {
    Init {
      worldRepository.init()
    } #:
    EventKeyLR {
      _ match {
        case CaseL =>
          for {
            World(pos) <- worldRepository.load()
          } yield {
            worldRepository.store(World(Position(pos.x - 4, pos.y)))
          }
        case CaseR =>
          for {
            World(pos) <- worldRepository.load()
          } yield {
            worldRepository.store(World(Position(pos.x + 4, pos.y)))
          }
      }
    } #:
    Draw { _ =>
      for {
        World(pos) <- worldRepository.load()
      } yield (pos.x, pos.y)
    } #:
    Nil
  }
}

trait UsesMoveOnWorldUseCase {
  val moveOnWorldUseCase: MoveOnWorldUseCase
}
