{-# LANGUAGE DataKinds, TypeOperators, FlexibleContexts, PackageImports, StandaloneDeriving, GeneralizedNewtypeDeriving #-}
{-# LANGUAGE IncoherentInstances #-}
module Main where

import Haste
import Haste.JSON
import Haste.Serialize
import Haste.Foreign hiding (toObject)
import Control.Monad
import "mtl" Control.Monad.State
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
  sinsert (Tag $ Vec ((1 +) $ maximum $ fmap (^._x) keys) ((1 + ) $ maximum $ fmap (^._y) keys)) $
  Union HNil

draw :: Field -> IO ()
draw f = do
  forM_ (sortBy (compare `on` snd) [(x,y) | x <- [0..f^._size^._x - 1], y <- [0..f^._size^._y - 1]]) $ \(x,y) -> do
    putChar $ head $ show $ (f^._array) M.! Vec x y
    when (x == f^._size^._x) $ putChar '\n'

  return ()

newtype FieldJSON = FieldJSON Field deriving (Show)

instance Serialize FieldJSON where
  toJSON (FieldJSON f) =
    let Vec w h = f^._size in
    toJSON $ chunksOf w $ fmap (\(x,y) -> (f^._array) M.! Vec x y) [(x,y) | x <- [0..w-1], y <- [0..h-1]]

    where
      chunksOf :: Int -> [a] -> [[a]]
      chunksOf n [] = []
      chunksOf n xs = take n xs : chunksOf n (drop n xs)

instance ToAny FieldJSON where
  toAny = toObject . toJSON

type Game = UnionT '[
  "field" :< FieldJSON
  ]

field :: Has (Union xs) "field" out => Lens' (Union xs) out; field = lenses (Name :: Name "field")

newtype GameJSON = GameJSON Game deriving (Show)

instance Serialize GameJSON where
  toJSON (GameJSON game) = toJSON game

tick :: StateT Game IO ()
tick = return ()

liftJS :: Serialize a => StateT a IO () -> String -> IO String
liftJS m s = let Just x = fromString s in show <$> liftJSON m x where
  liftJSON :: Serialize a => StateT a IO () -> JSON -> IO JSON
  liftJSON m json = let Right x = fromJSON json in toJSON <$> execStateT m x

main :: IO ()
main = do
  f <- return $ FieldJSON $ defField [
    (Vec 0 0, 0), (Vec 1 0, 1), (Vec 2 0, 2), (Vec 3 0, 4),
    (Vec 0 1, 3), (Vec 1 1, 4), (Vec 2 1, 5), (Vec 3 1, 1),
    (Vec 0 2, 6), (Vec 1 2, 7), (Vec 2 2, 8), (Vec 3 2, 0)
    ]

  export (toJSString "tick") $ liftJS tick
  export (toJSString "defField") $ f
