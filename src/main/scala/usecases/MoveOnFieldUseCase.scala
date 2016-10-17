package fantaly.usecases

import com.scalawarrior.scalajs.createjs.Sprite
import fantaly.entities._
import fantaly.entities.repositories._
import fantaly.utils.Types._
import fantaly.utils._

case class FieldDTO(offset: (Int,Int), tiles: Seq[Sprite])

trait MoveOnFieldUseCase extends UseCase[Unit, FieldDTO] with UsesFieldRepository {
  val dv = 4

  private def fromDirection(d: Direction): (Int,Int) = {
    d match {
      case North => (0,dv)
      case East => (-dv,0)
      case South => (0,-dv)
      case West => (dv,0)
    }
  }

  private def onMove(f: FieldDTO => Option[FieldDTO]): Port[FieldDTO] = {
    onTick { x =>
      val field = fieldRepository.find
      if (field.state == SMove) f(x) else None
    }
  }

  override def execute(x: Unit): Port[FieldDTO] = {
    onInit {
      val Field(map,size,_,_) = fieldRepository.find

      val ts = for {
        ix <- 0 until size._1
        iy <- 0 until size._2
      } yield {
        val t = Resource.maptip.clone()
        t.x = ix * Resource.boxSize
        t.y = iy * Resource.boxSize
        t.gotoAndStop(map((ix,iy)).toString)
        t
      }

      val offset =
        (Resource.windowSize._1 / 2 - Resource.boxSize / 2,
         Resource.windowSize._2 / 2 - Resource.boxSize / 2)

      FieldDTO(offset,ts)
    } ~
    onKeyDirection { dir =>
      val f = fieldRepository.find
      val move = this.fromDirection(dir)

      fieldRepository.store(f.update(
        state = SMove,
        smove = f.smove.update(move = move)
      ))
      None
    } ~
    onMove { dto =>
      val f = fieldRepository.find
      if (f.smove.step % (Resource.boxSize / dv) == 0) {
        fieldRepository.store(f.update(
          state = SNone,
          smove = f.smove.update(step = 0, move = (0,0))
        ))
        None
      } else {
        dto match {
          case FieldDTO(offset,ts) => {
            val (ox,oy) = offset
            val (mx,my) = f.smove.move

            fieldRepository.store(f.update(
              smove = f.smove.update(
                step = f.smove.step + 1
              )
            ))

            Some(FieldDTO((ox+mx, oy+my), ts))
          }
        }
      }
    }
  }
}

trait UsesMoveOnFieldUseCase {
  val moveOnFieldUseCase: MoveOnFieldUseCase
}
