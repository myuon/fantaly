package fantaly.adapters.dbs

import fantaly.entities._
import fantaly.entities.repositories.FieldRepository

class FieldRepositoryOnMemory extends FieldRepository {
  val _array = List(
    List(0,0,1,0,3,3,3,3,3,3),
    List(1,1,0,1,3,3,3,3,3,3),
    List(3,3,3,3,4,4,4,4,4,4)
  )
  val size = (this._array.head.length, this._array.length)

  var field: Field = Field(Field.fromList(_array), size, SNone, SmoothMove(0, (0,0)))

  override def find: Field = this.field
  override def store(value: Field): Unit = {
    this.field = value
  }
}

trait FieldRepositoryImpl {
  val fieldRepository: FieldRepository = new FieldRepositoryOnMemory
}
