package fantaly.adapter.repository

import fantaly.adapter.actor._
import fantaly.domain._
import fantaly.domain.repository._
import akka.pattern._
import akka.util.Timeout

import scala.concurrent.Future

trait WorldRepositoryWithShared extends WorldRepository with UsesShared {
  override def init(): World = {
    val w = World(Position(0,0))
    shared ! Set('world, w)
    w
  }
  override def load()(implicit timeout: Timeout): Future[World] = {
    (shared ? Get('world)).mapTo[World]
  }
  override def store(w: World): Unit = shared ! Set('world, w)
}
