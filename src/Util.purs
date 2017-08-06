module Util where

import Prelude
import Data.Array (concatMap, (..))
import Math (abs, ceil)

pixels :: Int -> Int -> Array { x :: Int, y :: Int }
pixels width height = concatMap buildRow (0..(height - 1))
  where
    buildRow y = map (buildColumn y) (0..(width - 1))
    buildColumn y x = { x, y }

-- Canvas width -> Complex plane width -> complex plane left coord -> pixel x -> real part of c
computeRealPartFromX :: Number -> Number -> Number -> Number -> Number
computeRealPartFromX canvasWidth complexPlaneWidth complexPlaneLeftEdgeCoord x =
  ((x / canvasWidth) * complexPlaneWidth) + complexPlaneLeftEdgeCoord

computeImaginaryPartFromY :: Number -> Number -> Number -> Number -> Number
computeImaginaryPartFromY canvasHeight complexPlaneHeight complexPlaneBottomEdgeCoord y =
  ((y / canvasHeight) * complexPlaneHeight) + complexPlaneBottomEdgeCoord

mapEscapeValueToColor :: Number -> Number -> Number
mapEscapeValueToColor escapeCount val =
  ceil $ abs ((val / escapeCount) * 255.0 - 255.0)