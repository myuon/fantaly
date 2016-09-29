package fantaly.usecases.player

import fantaly.entities._
import fantaly.entities.repositories._
import fantaly.usecases._
import fantaly.utils._, Types._

trait MoveOnFieldUseCase extends UseCase[Unit] with UsesFieldRepository {
  val dv = 4

  private def fromDirection(d: Direction): (Int,Int) = {
    d match {
      case North => (0,dv)
      case East => (-dv,0)
      case South => (0,-dv)
      case West => (dv,0)
    }
  }

  private def onMove(f: Unit): Port = {
    onTick {
      val f = fieldRepository.find
      if (f.state == SMove) f
    }
  }

  override def execute(x: Unit): Port = {
    onInit {
      val f = fieldRepository.find
      val offset =
        (Resource.windowSize._1 / 2 - Resource.boxSize / 2,
         Resource.windowSize._2 / 2 - Resource.boxSize / 2)

      fieldRepository.store(f.update(smove = f.smove.update(offset = offset)))
    } ~
    onKeyDirection { dir =>
      val f = fieldRepository.find
      val move = this.fromDirection(dir)

      fieldRepository.store(f.update(
        state = SMove,
        smove = f.smove.update(move = move)
      ))
    } ~
    onMove {
      val f = fieldRepository.find
      if (f.smove.step % (Resource.boxSize / dv) == 0) {
        fieldRepository.store(f.update(
          state = SNone,
          smove = f.smove.update(step = 0, move = (0,0))
        ))
      } else {
        val (ox,oy) = f.smove.offset

        fieldRepository.store(f.update(
          smove = f.smove.update(
            offset = (ox + f.smove.move._1, oy + f.smove.move._2),
            step = f.smove.step + 1
          )
        ))
      }
    }
  }
}

trait UsesMoveOnFieldUseCase {
  val moveOnFieldUseCase: MoveOnFieldUseCase
}
