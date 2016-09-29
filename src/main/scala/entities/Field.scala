package fantaly.entities

sealed trait State
case object SNone extends State
case object SMove extends State

case class SmoothMove(offset: (Int,Int), step: Int, move: (Int,Int)) {
  def update(offset: (Int,Int) = this.offset, step: Int = this.step, move: (Int,Int) = this.move): SmoothMove =
    SmoothMove(offset, step, move)
}

case class Field(currentMap: Map[(Int,Int), Int],
                 state: State,
                 smove: SmoothMove)
  extends Entity[Unique] {

  def update(currentMap: Map[(Int,Int), Int] = this.currentMap, state: State = this.state, smove: SmoothMove = this.smove): Field =
    Field(currentMap, state, smove)
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

