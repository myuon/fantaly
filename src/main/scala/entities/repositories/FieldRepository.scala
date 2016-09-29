package fantaly.entities.repositories

import fantaly.entities._

trait FieldRepository extends Repository[Field] {
  override def find: Field
  override def store(value: Field): Unit
}

trait UsesFieldRepository {
  val fieldRepository: FieldRepository
}
