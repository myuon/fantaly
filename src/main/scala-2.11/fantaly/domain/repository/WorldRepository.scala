package fantaly.domain.repository

import akka.util.Timeout
import fantaly.domain._

import scala.concurrent.Future

trait WorldRepository {
  def init(): World
  def load()(implicit timeout: Timeout): Future[World]
  def store(w: World): Unit
}

trait UsesWorldRepository {
  val worldRepository: WorldRepository
}
