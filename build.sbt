enablePlugins(ScalaJSPlugin)

name := "fantaly"

version := "1.0"

scalaVersion := "2.11.8"

resolvers += "amateras-repo" at "http://amateras.sourceforge.jp/mvn/"

libraryDependencies += "com.scalawarrior" %%% "scalajs-createjs" % "0.0.2"

libraryDependencies += "org.scala-js" %%% "scalajs-dom" % "0.8.1"
