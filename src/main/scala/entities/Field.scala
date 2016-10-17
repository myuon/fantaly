package fantaly.entities

sealed trait State
case object SNone extends State
case object SMove extends State

case class SmoothMove(step: Int, move: (Int,Int)) {
  def update(step: Int = this.step, move: (Int,Int) = this.move): SmoothMove =
    SmoothMove(step, move)
}

case class Field(currentMap: Map[(Int,Int), Int],
                 size: (Int,Int),
                 state: State,
                 smove: SmoothMove)
  extends Entity[Unique] {

  def update(currentMap: Map[(Int,Int), Int] = this.currentMap, size: (Int,Int) = this.size, state: State = this.state, smove: SmoothMove = this.smove): Field =
    Field(currentMap, size, state, smove)
}

object Field {
  def fromList(xss: List[List[Int]]): Map[(Int,Int), Int] = {
    val g = for {
      (xs,iy) <- xss.zipWithIndex
      (x,ix) <- xs.zipWithIndex
    } yield {
      (ix,iy) -> x
    }

    g.toMap
  }
}

