module Util where

import Prelude
import Data.Array (concatMap, (..))
import Math (abs)
import Data.Int (ceil)

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

mapEscapeValueToColor :: Number -> Number -> String
mapEscapeValueToColor escapeCount val =
  "rgb(" <> red <> "," <> green <> "," <> blue <> ")"
  where
    zeroToOne = val / escapeCount
    normalize = show <<< ceil <<< abs
    red = normalize (zeroToOne*66.0 - 66.0)
    green = normalize (zeroToOne*215.0 - 215.0)
    blue = normalize (zeroToOne*244.0 - 244.0) 