package fantaly.adapters.interfaces

import org.scalajs.dom._

trait UsesKeys {
  var keys: List[Int] = List.fill(256)(0)

  document.onkeydown = (event: KeyboardEvent) => {
    this.keys = this.keys.updated(event.keyCode, this.keys(event.keyCode)+1)
  }
  document.onkeyup = (event: KeyboardEvent) => {
    this.keys = this.keys.updated(event.keyCode, 0)
  }
}
