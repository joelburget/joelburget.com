---
layout: post
title: The Third Age of Computing is Dependently Typed
category: post
published: April 14, 2015
description: The Third Age of Computing is Dependently Typed
permalink: /third-age-dependently-typed
---

# The Third Age of Computing is Dependently Typed

I just got back from hearing [r0ml](https://twitter.com/r0ml) speak at Recurse Center on *Third Age of Computing: Immutability*. Here's the abstract:

> We are entering the third age of computing. The first age was the beginning of the software revolution. Computers were expensive, programmers were few, there was no software. The first age was characterized by the importance of writing programs; and the main concern was efficiency. The technological culture to enable this was the algorithm.

> The second age of computing was the Cambrian explosion of software. Computers became inexpensive, there were millions of programmers, there was lots of software. This age was characterized by concerns of productivity and adoption ("ease of use"). The technological culture to enable this was scripting languages. Software invaded every nook and cranny of the world.

> We are transitioning to the third age. Computers are becoming embedded. Everybody is learning to program. Software is everywhere. The concern shifts to security and reliability. The technological culture to enable this is immutability.

R0ml argued for Haskell as the harbinger of the dawning third age. I agree that Haskell is symbolically important as an uncompromising example of the kind of language we'll be using in the future. *However*, I think third-age programming languages will be dependently typed. This may even be their defining feature.

<div class="aside" markdown="1">

Note, I won't be covering [dependent types](http://jozefg.bitbucket.org/posts/2014-08-25-dep-types-part-1.html) in this post. It's encouraged but not strictly necessary to understand them.

</div>


## Program Correctness

This is the most obvious advantage to dependent types. They allow us to embed a proof of correctness in our program. It's even possible to script these proofs so the computer does most of the work (searching for a proof).

This material is well covered elsewhere. See Adam Chlipala's [Certified Programming with Dependent Types](http://adam.chlipala.net/cpdt/), or languages like [Agda](http://wiki.portal.chalmers.se/agda/pmwiki.php) and [Idris](http://www.idris-lang.org/).

## Efficiency

Dependent types are all about giving the compiler more information about your program so it can give you more in return. Since it knows *everything* about your program, there are some interesting optimization possibilities. I'll quote from [Edwin Brady's thesis](http://eb.host.cs.st-andrews.ac.uk/writings/thesis.pdf).

It's possible to do away with runtime checks (like bounds checks):

> we have no need to check for unmatched patterns; there can be no error case

And we can tell when computation is unnecessary:

> In imperative and simply typed functional languages, sophisticated techniques are necessary
to apply dead code elimination ... In our setting, with full inductive families,
the compile-time approach is even simpler

Data structures can be transformed to more efficient equivalent forms:

> we have seen transformation rules inserted into the compilation process to translate
the unary definition of N into a GMP based implementation of big numbers.

>  an implementation of Vect may, for example, simply be an appropriate sized block
of memory

I don't know of too much research in this area besides Edwin's. Send me some links if you now more. In particular I'm interested in proving the efficiency of programs. How reasonable is it to attach proofs of worst case runtime to programs. Can we prove the absence of timing attacks in crypto code?


## Writing Programs for You

This is my absolute favorite feature. Giving the compiler more information about your program continues to yield dividends.

Dependent types almost *force* us to adopt interactive programming because their types are unwieldy.

> Interactive programming shortens the feedback loop, and it makes types a positive input to the pro- gramming process, not just a means to police its output.

But in doing so they enable a powerful new way of programming, from [Epigram: Practical Programming with Dependent Types](http://cs.ru.nl/~freek/courses/tt-2010/tvftl/epigram-notes.pdf):

> You don’t have to be content with giving orders to the computer and keeping your ideas to yourself. What has become practical is a notion of program as *effective explanation*, rather than merely an effective procedure.

This means letting the computer do the mundane work, giving it hints about how to proceed, then nudging it along when it gets stuck.


## Signatures / Stability

R0ml mentioned that when writing Haskell programs his approach to code reuse is to download the source code he would like to reuse, then *copy and paste* the parts he wants into his program. No Joke. I understand where he's coming from - Haskell builds are prone to breakage - but that is *not* okay. We have packages for a reason:

* What if you need code from several modules? You need to jump around finding all the definitions you need.
* Worse, what if the copied code relies on another package? Or ten? Now you need to download those as well.
* Copy-and-paste is error prone.

This is a task we should automate. We *need* to automate.

R0ml's problem is that software updates are fragile. A couple reasons for this can be solved with the right type system.

### 1. Module Signatures

[Module signatures](http://plv.mpi-sws.org/backpack/backpack-paper.pdf) can guarantee the module you're linking with exports *exactly* what you expect. You no longer have to worry about a type signature changing or a function being removed.

### 2. Implementation Changes

"Okay," you say, "but what if a bug is introduced, breaking my program?" Then there's ambiguity baked into the program. A well-written program has types documenting the intention of all of its functionality. It's been *proven* correct.

## Conclusion

According to r0ml we're at the dawn of the third age of computing. The need for security and reliability compels us to embrace static types for stronger guarantees about our programs.

I assert that we're racing towards a more specific endpoint - dependent types. They hold answers to many of r0ml's questions. In particular, dependent types allow one to prove programs correct, achieve certain optimizations for free, work together with the compiler to write programs, and insulate oneself from package update instability.

By the way, I'm working on a project to implement these ideas, called [Pigment](https://github.com/joelburget/pigment). It's based on Epigram, but with a modern UI running in the browser.
