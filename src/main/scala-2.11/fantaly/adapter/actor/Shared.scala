package fantaly.adapter.actor

import akka.actor._

case class Get(name: Symbol)
case class Set(name: Symbol, value: Any)

class Shared extends Actor {
  var obj: Map[Symbol, Any] = Map()

  override def receive = {
    case Get(name) =>
      if (!obj.contains(name)) sys.error(s"Not Initialized: ${name}")
      sender() ! obj(name)
    case Set(name, value) =>
      obj = obj.updated(name, value)
  }
}

trait UsesShared {
  val shared: ActorRef
}
