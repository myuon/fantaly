package fantaly.usecases

trait UseCase[I,O] extends EventHandlers {
  def execute(x: I): Port[O]
}
