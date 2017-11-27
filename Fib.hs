module Fib
( fibTill
, fibInfinity
) where

fibs = 1 : 1 : zipWith (+) fibs (tail fibs)

fibTill :: Int -> [Int]
fibTill value = takeWhile (<=5) fibs

fibInfinity :: [Int]
fibInfinity = fibs