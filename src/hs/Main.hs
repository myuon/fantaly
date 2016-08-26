{-# LANGUAGE DataKinds, TypeOperators, FlexibleContexts #-}
module Main where

import Control.Monad
import Data.Function (on)
import Data.List (sortBy)
import qualified Data.Map as M
import Lens.Family2
import Lens.Family2.Unchecked
import MakeLense

data Vec a = Vec a a deriving (Eq, Ord, Show)

_x :: Lens' (Vec a) a
_x = lens (\(Vec x _) -> x) (\(Vec _ y) x -> Vec x y)

_y :: Lens' (Vec a) a
_y = lens (\(Vec _ y) -> y) (\(Vec x _) y -> Vec x y)

type Field = UnionT '[
  "_array" :< M.Map (Vec Int) Int,
  "_size" :< Vec Int
  ]

_array :: Has (Union xs) "_array" out => Lens' (Union xs) out; _array = lenses (Name :: Name "_array")
_size :: Has (Union xs) "_size" out => Lens' (Union xs) out; _size = lenses (Name :: Name "_size")

defField :: [(Vec Int, Int)] -> Field
defField m =
  let keys = fmap fst m in
  sinsert (Tag $ M.fromList m) $
  sinsert (Tag $ Vec (maximum $ fmap (^._x) keys) (maximum $ fmap (^._y) keys)) $
  Union HNil

draw :: Field -> IO ()
draw f = do
  forM_ (sortBy (compare `on` snd) [(x,y) | x <- [0..f^._size^._x], y <- [0..f^._size^._y]]) $ \(x,y) -> do
    putChar $ head $ show $ (f^._array) M.! Vec x y
    when (x == f^._size^._x) $ putChar '\n'

  return ()

main :: IO ()
main = do
  draw $ defField [
    (Vec 0 0, 0), (Vec 1 0, 1), (Vec 2 0, 2),
    (Vec 0 1, 3), (Vec 1 1, 4), (Vec 2 1, 5),
    (Vec 0 2, 6), (Vec 1 2, 7), (Vec 2 2, 8)
    ]
