package fantaly.adapters.dbs

import fantaly.entities.Field
import fantaly.entities.repositories.FieldRepository

class FieldRepositoryOnMemory extends FieldRepository {
  var field: Field = sys.error("not initialized")

  override def find: Field = this.field
  override def store(value: Field): Unit = {
    this.field = value
  }
}

trait FieldRepositoryImpl {
  val fieldRepository: FieldRepository = new FieldRepositoryOnMemory
}
