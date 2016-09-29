package fantaly.usecases

trait UseCase[I] extends EventHandlers {
  def execute(x: I): Port
}
