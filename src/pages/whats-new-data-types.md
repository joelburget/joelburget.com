---
layout: post
title: What's new since "The algebra (and calculus!) of algebraic data types"?
category: post
date: 2018-09-09
description: What's new since *The algebra (and calculus!) of algebraic data types*?
permalink: /what-new-data-types
listed: False
---

In June 2015, I published [*The algebra (and calculus!) of algebraic data types*](https://codewords.recurse.com/issues/three/algebra-and-calculus-of-algebraic-data-types) in [Code Words](https://codewords.recurse.com/). I saw it on Hacker News yesterday and thought now would be a good time to revisit the post. There's a lot I didn't have space to cover in the original or didn't know.

This post ends up looking like a grab-bag of links.

## Bottoms

One thing I complete skipped talking about in the original article is [*bottom*](https://en.wikibooks.org/wiki/Haskell/Denotational_semantics#%E2%8A%A5_Bottom), the undefined value, which complicates the story. Naively, you'd expect there to be one function of type `forall a. a -> a`, right? The definition must be `\a -> a`, right?, Well, in Haskell, `undefined` also has this type, so there are two inhabitants. There's a lot more to say on this subject but that's for another time.

## Brzozowski derivative

This is an algorithm to compute the derivative of a regular expression, meaning the set of all strings obtainable from a string by removing a prefix.

Quoting [Julia Evans](https://jvns.ca/blog/2016/04/25/how-regular-expressions-go-fast/):

> Let's say we have a regular expression which is supposed to match the strings ('a', 'abab', 'aaaabb', 'bbc').
>
> The derivative of those strings with respect to 'a' is ('', 'bab', 'aaabb') -- you strip off the a from every string.

What good is this? See Matt Might on [parsing with derivatives](http://matt.might.net/articles/parsing-with-derivatives/).

## Stackoverflow

Conor McBride compiled [a book of his Stack Overflow answers](https://personal.cis.strath.ac.uk/conor.mcbride/so-pigworker.pdf). I'll include the titles to whet your appetite:

    6. Differential Calculus for Types
    6.1 Find the preceding element of an element in list
    6.2 Splitting a List
    6.3 nub as a List Comprehension
    6.4 How to make a binary tree zipper an instance of Comonad?
    6.5 What’s the absurd function in Data.Void useful for?
    6.6 Writing cojoin or cobind for n-dimensional grids
    6.6.1 Cursors in Lists
    6.6.2 Composing Cursors, Transposing Cursors?
    6.6.3 Hancock’s Tensor Product
    6.6.4 InContext for Tensor Products
    6.6.5 Naperian Functors
    6.7 Zipper Comonads, Generically
    6.8 Traversable and zippers: necessity and sufficiency
    6.9 How to write this (funny filter) function idiomatically?
    6.10 Computing a term of a list depending on all previous terms
    6.11 Reasonable Comonad implementations (for nonempty lists)
    6.12 Representable (or Naperian) Functors
    6.13 Tries as Naperian Functors; Matching via their Derivatives

Additionally, here are some more relevant answers (also by Conor).

* [Is there a non-trivial type which is equal to its own derivative?](https://cs.stackexchange.com/q/75896/41069). Some comments here also hint at a link to combinatorial species.
* [What is the logarithm or root operation in type-space?](https://cstheory.stackexchange.com/q/17006/4126)
* [Why do we need containers?](https://stackoverflow.com/a/34346484/383958)

## Other

Joseph Abrahamson on [The Types of Data](https://github.com/tel/old-blog/blob/master/_posts/2014-07-23-types_of_data.md)
  ([comments](https://www.reddit.com/r/haskell/comments/2bj7it/let_me_tell_you_about_the_types_of_data/cj5y701/))

## Discussions

There's been discussion on:

1. [Hacker News (3 years ago)](https://news.ycombinator.com/item?id=9775467)
2. [Hacker News (yesterday)](https://news.ycombinator.com/item?id=17942112)
3. [Reddit (1 year ago)](https://www.reddit.com/r/compsci/comments/6nbnf3/the_algebra_and_calculus_of_algebraic_data_types/)

### Comments worth reading:

#### [tel on June 25, 2015](https://news.ycombinator.com/item?id=9777809)

> A nice algebraic law that holds in data types is

    a -> (b, c) = (a -> b, a -> c)
    (b * c)^a = b^a * c^a

> This is useful as common argument factoring and can optimize repeated function calls.
> Another is the famous

     (c^b)^a = c^(b * a)
     a -> b -> c = (a, b) -> c

> Which is curry/uncurry or the "product/exponential adjunction" in category theory.
> Finally, consider

    a^b * a^c = a^(b + c)
    (b -> a, c -> a) = Either b c -> a

> Which essentially says that given a tuple of functions we can choose which one we want to evaluate. Choose b and c to be unit and notice that `() -> a` is essentially `a` (after all, a^1 = a) and you'll have

    a * a = a^2
    (a, a) = Bool -> a

> Which is the seed of a useful way of memorizing pure functions (look up memo-combinators for many more details).

#### [gjm11 on June 25, 2015](https://news.ycombinator.com/item?id=9777123)

A few remarks on this stuff.
1. Very closely related is the pure-mathematical technique of *generating functions*, where you take a sequence (let's say the Fibonacci sequence 0,1,1,2,3,5,8,13,...) and use its elements as coefficients in a power series (0+1x+1x^2+2x^3+3x^4+5x^5+8x^6+13x^7+...) and then notice that (e.g.) shifting the sequence by 1 is the same as multiplying by x, so if F is the series for (f(n)) then x.F is the series for (f(n-1)) and x^2.F is the series for (f(n-2)) apart from some corrections for very small n, which gets you F=(x+x^2)F+x or F = x/(1-x-x^2), and now you can factorize that quadratic and write F in the form p/(1-ax)+q/(1-bx) which immediately gets you an explicit formula for the Fibonacci numbers (the one with all the sqrt(5)s in it).

So let's translate this into algebraic data types. We get

    F(x) = x + x F(x) + x^2 F(x)
    data FibTree a = Leaf a | Pair a (FibTree a) | Triple a a (FibTree a)

and the number of FibTrees with n "a"s in is exactly the nth Fibonacci number.

(There is a theoretically important data structure called a *Fibonacci heap*, but I don't believe there is any connection between these and these "Fibonacci trees" other than that in both cases there is something you can count with Fibonacci numbers.)

2. Suppose you consider a rather boring binary-tree type like this:

    data Tree = Leaf | Pair Tree Tree

whose corresponding identity is T = 1+T^2, or T^2-T+1=0. If you're a mathematician you will quickly see that the solutions (in the complex numbers!) of this are sixth roots of unity; that is, they have T^6=1. This clearly can't hold in terms of types (it would mean an equivalence between 6-tuples of trees and objects of the "unit type", there being only one such object), but it turns out that T^7=T is "true"; you can find an explicit construction for it on page 3 of http://arxiv.org/abs/math/9405205 if you like.

#### [vajrabum 3 days ago](https://news.ycombinator.com/item?id=17943253)

That's fun and a bit surprising, but maybe it shouldn't be. I'm reminded that Dana Scott with Christopher Strachey showed that by using lattices or complete partial orders with a bit of topology to model graphs of possible computations of a program you could, just as in analysis, define least upper and lower bounds and a notion of continuity to derive a construction of limit for a computation which is analogous to a limit in analysis. They called this model a domain. That bit of of math is the basis of denotational semantics of programming languages and is necessary because sets are largely sufficient as the basis for algebra and analysis but not for programs which have evils like partial functions, side effects and variable assignment. I believe that Christopher Strachey with Scott also introduced the formal notions of sum, product and recusive types. They also showed how definitions or models of recursive types and functions could be well founded through their construction of limits on domains. An early tech report on it can be found here:

https://www.cs.ox.ac.uk/files/3228/PRG06.pdf

and here's a more recent free book from David Schmidt on the topic:

http://people.cs.ksu.edu/~schmidt/text/DenSem-full-book.pdf

#### [hiker 3 days ago](https://news.ycombinator.com/item?id=17943383)

`Void` being the uninhabited type, in the light of the Curry-Howard isomorphism stands for a false proposition.
`a -> Void` get interpreted as "not a" or "from a follows contradiction" or equivalently "a is uninhabited". Combinatorially it's `0 ^ a` which for non-empty a is zero but is equal to 1 when a is empty (0^0=1). In other words there are no functions of type `a -> Void` for non-empty a and there's exactly one such function for uninhabited a (id :: Void -> Void).

`Void -> a` is interpreted "from falsehood, anything (follows)" https://en.wikipedia.org/wiki/Principle_of_explosion. Combinatorially a^0 = 1 for all a so there's exactly one such function. An easy way to define it is by induction on Void (which has no cases and you're done).

#### [jcreed 1 year ago](https://www.reddit.com/r/compsci/comments/6nbnf3/the_algebra_and_calculus_of_algebraic_data_types/dk8zzc2/)

If you think this kind of thing is fun, there's quite a few relatively accessible papers in the academic literature that are great to explore for more details.

McBride's "The Derivative of a Regular Type is its Type of One-Hole Contexts" http://strictlypositive.org/diff.pdf is a good place to start.

Wilf has an entire book "Generatingfunctionology" if you want more straight combinatorics (https://www.math.upenn.edu/~wilf/gfology2.pdf)

Paykin et al. ("choose your own derivative" https://www.cis.upenn.edu/~jpaykin/papers/psf_choose_2016.pdf) show how derivatives are useful in event-deriven concurrent programming.
