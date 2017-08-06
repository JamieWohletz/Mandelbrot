(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Util = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by psc-bundle 0.11.4
var PS = {};
(function(exports) {
    "use strict";

  exports.arrayApply = function (fs) {
    return function (xs) {
      var result = [];
      var n = 0;
      for (var i = 0, l = fs.length; i < l; i++) {
        for (var j = 0, k = xs.length; j < k; j++) {
          result[n++] = fs[i](xs[j]);
        }
      }
      return result;
    };
  };
})(PS["Control.Apply"] = PS["Control.Apply"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var Semigroupoid = function (compose) {
      this.compose = compose;
  };
  var semigroupoidFn = new Semigroupoid(function (f) {
      return function (g) {
          return function (x) {
              return f(g(x));
          };
      };
  });
  var compose = function (dict) {
      return dict.compose;
  };
  exports["Semigroupoid"] = Semigroupoid;
  exports["compose"] = compose;
  exports["semigroupoidFn"] = semigroupoidFn;
})(PS["Control.Semigroupoid"] = PS["Control.Semigroupoid"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var Control_Semigroupoid = PS["Control.Semigroupoid"];        
  var Category = function (Semigroupoid0, id) {
      this.Semigroupoid0 = Semigroupoid0;
      this.id = id;
  };
  var id = function (dict) {
      return dict.id;
  };
  var categoryFn = new Category(function () {
      return Control_Semigroupoid.semigroupoidFn;
  }, function (x) {
      return x;
  });
  exports["Category"] = Category;
  exports["id"] = id;
  exports["categoryFn"] = categoryFn;
})(PS["Control.Category"] = PS["Control.Category"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var Control_Category = PS["Control.Category"];
  var flip = function (f) {
      return function (b) {
          return function (a) {
              return f(a)(b);
          };
      };
  };
  exports["flip"] = flip;
})(PS["Data.Function"] = PS["Data.Function"] || {});
(function(exports) {
    "use strict";

  exports.arrayMap = function (f) {
    return function (arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };
})(PS["Data.Functor"] = PS["Data.Functor"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Functor"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Function = PS["Data.Function"];
  var Data_Unit = PS["Data.Unit"];        
  var Functor = function (map) {
      this.map = map;
  };
  var map = function (dict) {
      return dict.map;
  };                                                                                             
  var functorArray = new Functor($foreign.arrayMap);
  exports["Functor"] = Functor;
  exports["map"] = map;
  exports["functorArray"] = functorArray;
})(PS["Data.Functor"] = PS["Data.Functor"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Control.Apply"];
  var Control_Category = PS["Control.Category"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];        
  var Apply = function (Functor0, apply) {
      this.Functor0 = Functor0;
      this.apply = apply;
  }; 
  var applyArray = new Apply(function () {
      return Data_Functor.functorArray;
  }, $foreign.arrayApply);
  var apply = function (dict) {
      return dict.apply;
  };
  exports["Apply"] = Apply;
  exports["apply"] = apply;
  exports["applyArray"] = applyArray;
})(PS["Control.Apply"] = PS["Control.Apply"] || {});
(function(exports) {
    "use strict";

  exports.arrayBind = function (arr) {
    return function (f) {
      var result = [];
      for (var i = 0, l = arr.length; i < l; i++) {
        Array.prototype.push.apply(result, f(arr[i]));
      }
      return result;
    };
  };
})(PS["Control.Bind"] = PS["Control.Bind"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Control.Bind"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Category = PS["Control.Category"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Unit = PS["Data.Unit"];        
  var Bind = function (Apply0, bind) {
      this.Apply0 = Apply0;
      this.bind = bind;
  }; 
  var bindArray = new Bind(function () {
      return Control_Apply.applyArray;
  }, $foreign.arrayBind);
  var bind = function (dict) {
      return dict.bind;
  };
  exports["Bind"] = Bind;
  exports["bind"] = bind;
  exports["bindArray"] = bindArray;
})(PS["Control.Bind"] = PS["Control.Bind"] || {});
(function(exports) {
    "use strict";

  //------------------------------------------------------------------------------
  // Array creation --------------------------------------------------------------
  //------------------------------------------------------------------------------

  exports.range = function (start) {
    return function (end) {
      var step = start > end ? -1 : 1;
      var result = [];
      var i = start, n = 0;
      while (i !== end) {
        result[n++] = i;
        i += step;
      }
      result[n] = i;
      return result;
    };
  };
})(PS["Data.Array"] = PS["Data.Array"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var otherwise = true;
  exports["otherwise"] = otherwise;
})(PS["Data.Boolean"] = PS["Data.Boolean"] || {});
(function(exports) {
    "use strict";

  exports.refEq = function (r1) {
    return function (r2) {
      return r1 === r2;
    };
  };
})(PS["Data.Eq"] = PS["Data.Eq"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Eq"];
  var Data_Unit = PS["Data.Unit"];
  var Data_Void = PS["Data.Void"];        
  var Eq = function (eq) {
      this.eq = eq;
  };                                    
  var eqInt = new Eq($foreign.refEq);
  var eq = function (dict) {
      return dict.eq;
  };
  exports["Eq"] = Eq;
  exports["eq"] = eq;
  exports["eqInt"] = eqInt;
})(PS["Data.Eq"] = PS["Data.Eq"] || {});
(function(exports) {
    "use strict";

  exports.topInt = 2147483647;
  exports.bottomInt = -2147483648;
})(PS["Data.Bounded"] = PS["Data.Bounded"] || {});
(function(exports) {
    "use strict";

  exports.unsafeCompareImpl = function (lt) {
    return function (eq) {
      return function (gt) {
        return function (x) {
          return function (y) {
            return x < y ? lt : x === y ? eq : gt;
          };
        };
      };
    };
  };
})(PS["Data.Ord.Unsafe"] = PS["Data.Ord.Unsafe"] || {});
(function(exports) {
    "use strict";

  exports.showIntImpl = function (n) {
    return n.toString();
  };
})(PS["Data.Show"] = PS["Data.Show"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Show"];     
  var Show = function (show) {
      this.show = show;
  };                                                 
  var showInt = new Show($foreign.showIntImpl);
  var show = function (dict) {
      return dict.show;
  };
  exports["Show"] = Show;
  exports["show"] = show;
  exports["showInt"] = showInt;
})(PS["Data.Show"] = PS["Data.Show"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var Data_Eq = PS["Data.Eq"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Show = PS["Data.Show"];        
  var LT = (function () {
      function LT() {

      };
      LT.value = new LT();
      return LT;
  })();
  var GT = (function () {
      function GT() {

      };
      GT.value = new GT();
      return GT;
  })();
  var EQ = (function () {
      function EQ() {

      };
      EQ.value = new EQ();
      return EQ;
  })();
  exports["LT"] = LT;
  exports["GT"] = GT;
  exports["EQ"] = EQ;
})(PS["Data.Ordering"] = PS["Data.Ordering"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Ord.Unsafe"];
  var Data_Ordering = PS["Data.Ordering"];        
  var unsafeCompare = $foreign.unsafeCompareImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value);
  exports["unsafeCompare"] = unsafeCompare;
})(PS["Data.Ord.Unsafe"] = PS["Data.Ord.Unsafe"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Ord"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Function = PS["Data.Function"];
  var Data_Ord_Unsafe = PS["Data.Ord.Unsafe"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Ring = PS["Data.Ring"];
  var Data_Semiring = PS["Data.Semiring"];
  var Data_Unit = PS["Data.Unit"];
  var Data_Void = PS["Data.Void"];        
  var Ord = function (Eq0, compare) {
      this.Eq0 = Eq0;
      this.compare = compare;
  };                                
  var ordInt = new Ord(function () {
      return Data_Eq.eqInt;
  }, Data_Ord_Unsafe.unsafeCompare);
  var compare = function (dict) {
      return dict.compare;
  };
  exports["Ord"] = Ord;
  exports["compare"] = compare;
  exports["ordInt"] = ordInt;
})(PS["Data.Ord"] = PS["Data.Ord"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Bounded"];
  var Data_Ord = PS["Data.Ord"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Unit = PS["Data.Unit"];        
  var Bounded = function (Ord0, bottom, top) {
      this.Ord0 = Ord0;
      this.bottom = bottom;
      this.top = top;
  };
  var top = function (dict) {
      return dict.top;
  };                                                 
  var boundedInt = new Bounded(function () {
      return Data_Ord.ordInt;
  }, $foreign.bottomInt, $foreign.topInt);
  var bottom = function (dict) {
      return dict.bottom;
  };
  exports["Bounded"] = Bounded;
  exports["bottom"] = bottom;
  exports["top"] = top;
  exports["boundedInt"] = boundedInt;
})(PS["Data.Bounded"] = PS["Data.Bounded"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var Control_Alt = PS["Control.Alt"];
  var Control_Alternative = PS["Control.Alternative"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Bind = PS["Control.Bind"];
  var Control_Category = PS["Control.Category"];
  var Control_Extend = PS["Control.Extend"];
  var Control_Monad = PS["Control.Monad"];
  var Control_MonadZero = PS["Control.MonadZero"];
  var Control_Plus = PS["Control.Plus"];
  var Data_Bounded = PS["Data.Bounded"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Functor_Invariant = PS["Data.Functor.Invariant"];
  var Data_Monoid = PS["Data.Monoid"];
  var Data_Ord = PS["Data.Ord"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Show = PS["Data.Show"];
  var Data_Unit = PS["Data.Unit"];
  var Prelude = PS["Prelude"];        
  var Nothing = (function () {
      function Nothing() {

      };
      Nothing.value = new Nothing();
      return Nothing;
  })();
  var Just = (function () {
      function Just(value0) {
          this.value0 = value0;
      };
      Just.create = function (value0) {
          return new Just(value0);
      };
      return Just;
  })();
  var maybe = function (v) {
      return function (v1) {
          return function (v2) {
              if (v2 instanceof Nothing) {
                  return v;
              };
              if (v2 instanceof Just) {
                  return v1(v2.value0);
              };
              throw new Error("Failed pattern match at Data.Maybe line 220, column 1 - line 220, column 22: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
          };
      };
  };
  var fromMaybe = function (a) {
      return maybe(a)(Control_Category.id(Control_Category.categoryFn));
  };
  exports["Nothing"] = Nothing;
  exports["Just"] = Just;
  exports["fromMaybe"] = fromMaybe;
  exports["maybe"] = maybe;
})(PS["Data.Maybe"] = PS["Data.Maybe"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Array"];
  var Control_Alt = PS["Control.Alt"];
  var Control_Alternative = PS["Control.Alternative"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Bind = PS["Control.Bind"];
  var Control_Category = PS["Control.Category"];
  var Control_Lazy = PS["Control.Lazy"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Control_Monad_Rec_Class = PS["Control.Monad.Rec.Class"];
  var Control_Monad_ST = PS["Control.Monad.ST"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Array_ST = PS["Data.Array.ST"];
  var Data_Array_ST_Iterator = PS["Data.Array.ST.Iterator"];
  var Data_Boolean = PS["Data.Boolean"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Foldable = PS["Data.Foldable"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_HeytingAlgebra = PS["Data.HeytingAlgebra"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_NonEmpty = PS["Data.NonEmpty"];
  var Data_Ord = PS["Data.Ord"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Ring = PS["Data.Ring"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Semiring = PS["Data.Semiring"];
  var Data_Traversable = PS["Data.Traversable"];
  var Data_Tuple = PS["Data.Tuple"];
  var Data_Unfoldable = PS["Data.Unfoldable"];
  var Partial_Unsafe = PS["Partial.Unsafe"];
  var Prelude = PS["Prelude"];
  var concatMap = Data_Function.flip(Control_Bind.bind(Control_Bind.bindArray));
  exports["concatMap"] = concatMap;
  exports["range"] = $foreign.range;
})(PS["Data.Array"] = PS["Data.Array"] || {});
(function(exports) {
    "use strict";

  // module Data.Int

  exports.fromNumberImpl = function (just) {
    return function (nothing) {
      return function (n) {
        /* jshint bitwise: false */
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };

  exports.toNumber = function (n) {
    return n;
  };
})(PS["Data.Int"] = PS["Data.Int"] || {});
(function(exports) {
  /* globals exports */
  "use strict";         

  exports.infinity = Infinity;
})(PS["Global"] = PS["Global"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Global"];
  exports["infinity"] = $foreign.infinity;
})(PS["Global"] = PS["Global"] || {});
(function(exports) {
    "use strict";

  // module Math

  exports.abs = Math.abs;

  exports.ceil = Math.ceil;
})(PS["Math"] = PS["Math"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Math"];
  exports["abs"] = $foreign.abs;
  exports["ceil"] = $foreign.ceil;
})(PS["Math"] = PS["Math"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Int"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Boolean = PS["Data.Boolean"];
  var Data_Bounded = PS["Data.Bounded"];
  var Data_Eq = PS["Data.Eq"];
  var Data_HeytingAlgebra = PS["Data.HeytingAlgebra"];
  var Data_Int_Bits = PS["Data.Int.Bits"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_Ord = PS["Data.Ord"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Ring = PS["Data.Ring"];
  var Data_Show = PS["Data.Show"];
  var Global = PS["Global"];
  var $$Math = PS["Math"];
  var Prelude = PS["Prelude"];      
  var fromNumber = $foreign.fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
  var unsafeClamp = function (x) {
      if (x === Global.infinity) {
          return 0;
      };
      if (x === -Global.infinity) {
          return 0;
      };
      if (x >= $foreign.toNumber(Data_Bounded.top(Data_Bounded.boundedInt))) {
          return Data_Bounded.top(Data_Bounded.boundedInt);
      };
      if (x <= $foreign.toNumber(Data_Bounded.bottom(Data_Bounded.boundedInt))) {
          return Data_Bounded.bottom(Data_Bounded.boundedInt);
      };
      if (Data_Boolean.otherwise) {
          return Data_Maybe.fromMaybe(0)(fromNumber(x));
      };
      throw new Error("Failed pattern match at Data.Int line 65, column 1 - line 70, column 43: " + [ x.constructor.name ]);
  };               
  var ceil = function ($15) {
      return unsafeClamp($$Math.ceil($15));
  };
  exports["ceil"] = ceil;
  exports["fromNumber"] = fromNumber;
})(PS["Data.Int"] = PS["Data.Int"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Array = PS["Data.Array"];
  var Data_EuclideanRing = PS["Data.EuclideanRing"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Int = PS["Data.Int"];
  var Data_Ring = PS["Data.Ring"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Semiring = PS["Data.Semiring"];
  var Data_Show = PS["Data.Show"];
  var $$Math = PS["Math"];
  var Prelude = PS["Prelude"];        
  var pixels = function (width) {
      return function (height) {
          var buildColumn = function (y) {
              return function (x) {
                  return {
                      x: x, 
                      y: y
                  };
              };
          };
          var buildRow = function (y) {
              return Data_Functor.map(Data_Functor.functorArray)(buildColumn(y))(Data_Array.range(0)(width - 1 | 0));
          };
          return Data_Array.concatMap(buildRow)(Data_Array.range(0)(height - 1 | 0));
      };
  };
  var mapEscapeValueToColor = function (escapeCount) {
      return function (val) {
          var zeroToOne = val / escapeCount;
          var normalize = function ($0) {
              return Data_Show.show(Data_Show.showInt)(Data_Int.ceil($$Math.abs($0)));
          };
          var red = normalize(zeroToOne * 66.0 - 66.0);
          var green = normalize(zeroToOne * 215.0 - 215.0);
          var blue = normalize(zeroToOne * 244.0 - 244.0);
          return "rgb(" + (red + ("," + (green + ("," + (blue + ")")))));
      };
  };
  var computeRealPartFromX = function (canvasWidth) {
      return function (complexPlaneWidth) {
          return function (complexPlaneLeftEdgeCoord) {
              return function (x) {
                  return (x / canvasWidth) * complexPlaneWidth + complexPlaneLeftEdgeCoord;
              };
          };
      };
  };
  var computeImaginaryPartFromY = function (canvasHeight) {
      return function (complexPlaneHeight) {
          return function (complexPlaneBottomEdgeCoord) {
              return function (y) {
                  return (y / canvasHeight) * complexPlaneHeight + complexPlaneBottomEdgeCoord;
              };
          };
      };
  };
  exports["computeImaginaryPartFromY"] = computeImaginaryPartFromY;
  exports["computeRealPartFromX"] = computeRealPartFromX;
  exports["mapEscapeValueToColor"] = mapEscapeValueToColor;
  exports["pixels"] = pixels;
})(PS["Util"] = PS["Util"] || {});
module.exports = PS["Util"];

},{}]},{},[1])(1)
});