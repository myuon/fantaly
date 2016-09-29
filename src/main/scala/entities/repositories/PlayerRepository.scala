package fantaly.entities.repositories

import fantaly.entities._

trait PlayerRepository extends Repository[Player] {
  override def find: Player
  override def store(value: Player): Unit
}

trait UsesPlayerRepository {
  val playerRepository: PlayerRepository
}
