---
layout: post
title: data, type, newtype, instance, class
category: post
date: 2011-02-26
description: what I was confused about when first learning haskell
permalink: /data-newtype-instance-class
listed: true
---

# data, type, newtype, instance, class

One of the first things to confuse me about Haskell was the number of keywords related to types. The five (I know, 5 isn't <i>that</i> many) I've counted in Haskell 98 are `data`, `type`, `newtype`, `instance`, and `class`. I was unable to find a comprehensive discussion of what each of them means and how they are related to each other. I'll break these keywords up linto 2 related sets. `data`, `type`, and `newtype` are all ways to declare a new type. `instance` and `class` are slightly different. Let's take a closer look at them.

## data, type, newtype

`data` is used to declare a new algebraic data type. We can use it to create a boolean or, in this case, the maybe monad:

```haskell
data Bool = True | False
data Maybe a = Nothing | Just a
```

`type` is used to create an alias for an algebraic data type. A good example of this is included in the Prelude:

```haskell
type String = [Char]
```

`newtype` acts similarly to `type` with a syntax akin to `data`. Thus we can write the following:

``` haskell
newtype Radius = Radius Double
data Diameter = Diameter Double
```

Okay, so what's the difference between newtype and data? Three things (that I'm aware of):

* `newtype` can only have a single constructor taking a single argument.
* `newtype` creates a strict value constructor and `type` creates a lazy one (see <a href="#ref1">[1]</a>).
* `newtype` introduces no runtime overhead.

## class, instance

A typeclass is a way to guarantee that a type implements certain functions (or data). A type is declared to implement the functions using the keyword `instance`. An example will be helpful:

```haskell
--Normally I would use Double, but Int's will be easier to read
type Point = (Int, Int)
data Triangle = Triangle Point Point Point deriving (Show)
data Square = Square Point Point Point Point deriving (Show)

class Shape a where
  rotate :: a -> a
  simple :: a

instance Shape Triangle where
  rotate (Triangle x y z) = Triangle z x y
  simple = Triangle (0, 0) (1, 0) (0, 1)

instance Shape Square where
  rotate (Square w x y z) = Square z w x y
  simple = Square (0, 0) (1, 0) (1, 1) (0, 1)
```

As you can see, we first define 3 simple types. Next, the "`class Shape ...`" bit, that's the typeclass definition. All we're doing is telling the compiler what must be defined for an instance of `Shape`. With the `instance` keyword, we make our classes instances of `Shape` by defining the necessary stuff (i.e. rotate and simple). Let's try it in GHCi:

```
Prelude> :l shape.hs
[1 of 1] Compiling Main.             ( shape.hs, interpreted )
*Main> simple :: Square
Square (0,0) (1,0) (1,1) (0,1)
*Main> rotate it
Square (0,1) (0,0) (1,0) (1,1)
*Main> simple :: Triangle
Triangle (0,0) (1,0) (0,1)
*Main> rotate it
Triangle (0,1) (0,0) (1,0)
*Main> rotate it
Triangle (1,0) (0,1) (0,0)
```

Cool! Because `Square` and `Triangle` instantiate `Shape`, we know that we can call rotate on them. That's all a typeclass does. I tend to think of them as an interface or a contract.

## Summary

Remember, `data`, `type` and `newtype` are about making types. `instance` and `class` are about making typeclasses.

PS, there's another keyword, `deriving`, that could fit in this discussion. It seems less confusing to <em>me</em>, so I won't cover it.

## Further reading

* <a name="ref1">[1]</a> <a href="http://www.haskell.org/haskellwiki/Newtype">More on newtype, with good examples.</a>
* <a name="ref2">[2]</a> <a href="http://www.haskell.org/haskellwiki/OOP_vs_type_classes">OOP vs typeclasses</a>
