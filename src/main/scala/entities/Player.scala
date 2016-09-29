package fantaly.entities

import fantaly.utils.Types._

case class Player(pos: (Int,Int),
                  direction: Direction,
                  keys: List[Int])
  extends Entity[Unique]
