package fantaly.entities

trait Entity[EID] {
  type ID = EID
}

trait Unique
case object UniqueValue extends Unique

object Entity {
  implicit def uniqueInput[A](f: Unique => A): A = f(UniqueValue)
  implicit def asUniqueFunction[A](x: A): Unique => A = _ => x
}

