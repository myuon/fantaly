package fantaly.entities.repositories

import fantaly.entities._

trait Repository[E <: Entity[_]] {
  def findByID(key: E#ID): E = find
  def find: E = sys.error("Not implemented")

  def store(value: E): Unit
}
