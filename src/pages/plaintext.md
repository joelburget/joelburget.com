---
layout: post
title: Programmer Tooling Beyond Plain Text
category: post
published: May 5, 2015
description: Programmer Tooling Beyond Plain Text
permalink: /plaintext
---

# Programmer Tooling Beyond Plain Text

This is a companion to my post on the [expression problem and tables](/the-expression-problem-and-tables/). In this post I explore ways we can benefit from manipulating rich representations of programs (structural editing).

## Reading and Writing

Let's go through a few examples of constructs our hypothetical language could include to make reading and writing easier.

### Math Notation

Mathematical notation has evolved over centuries. It's the best way to read and write mathematical concepts, so even though these both express the same thing, the second is *vastly* more readable.

```python
x = symbol('x')

Integral((x**4 + x**2*exp(x) - x**2 - 2*x*exp(x) - 2*x -
    exp(x))*exp(x)/((x - 1)**2*(x + 1)**2*(exp(x) + 1)), x)
```

<p id="katex-integral"></p>

### Tables

Tables are the best way to represent some (most?) types of data. Spreadsheets are ubiquitous and used by millions of people who wouldn't consider themselves programmers.

In [*the expression problem and tables*](/the-expression-problem-and-tables/) I talked about some ways they'd be useful additions to the programming language itself.

### Images, Colors, Numbers, Etc

One more example. Khan Academy's Programming platform shows off what can be done with very concrete data types like images, colors, and numbers. Try changing the color, position, or image in the sample below.

<script src="http://www.khanacademy.org/computer-programming/image-color-demo/6690729609658368/embed.js?editor=yes&amp;buttons=yes&amp;author=yes&amp;embed=yes"></script>

This kind of direct manipulation / immediate feedback is invaluable for color selection and positioning (see also [Chrome Devtools](https://developer.chrome.com/devtools/docs/tips-and-tricks#elements)).

## Source Control

Let's look at a couple examples of source control handling plain text in a disappointing way. We'll use Python in these examples, though they apply to nearly every language.

We start with code to bill a customer.

```python
def calculateBill():
    pass

def calculateTax():
    return calculateBill() * taxRate
```

Now Alice refactors, renaming `calculateBill` to `billTotal`.

```diff
- def calculateBill():
+ def billTotal():
      pass

  def calculateTax():
- 	return calculateBill() * taxRate
+ 	return billTotal() * taxRate
```

But Bob simultaneously adds `calculateTip`.

```diff
  def calculateBill():
      pass

  def calculateTax():
      return calculateBill() * taxRate
+
+ def calculateTip():
+     return calculateBill() * 0.2
```

Now Bob merges Alice's changes. The merge succeeds, producing broken code on the last line.

```python
def billTotal():
    pass

def calculateTax():
    return billTotal() * taxRate

def calculateTip():
    # this should say "billTotal" instead of "calculateBill"
    return calculateBill() * 0.2
```

Why did the merge break? Because the merge tool has no way of knowing what the changes *mean*. It only sees Alice's intra-line changes and Bob's added lines. Since they don't touch the same code it's assumed they're safe.

<!--
* Alice changed line 1 from `def calculateBill():` to `def billTotal():` and line 5 from `    return calculateBill() * taxRate` to `	return billTotal() * taxRate`.
* Bill added lines 6 and 7:
      ```
      def calculateTip():
      return calculateBill() * 0.2
      ```
-->

On the other hand, when editing code structurally, the two changes can be expressed as:

* Alice: rename `calculateBill` to `billTotal`
* Bob: add `calculateTip`

The merge tool *knows all of this* and can be made smart enough to apply the rename operation *after* adding `calculateTip` (which references the old name).

I'm hopeful we can use a language aware [patch theory](http://en.wikibooks.org/wiki/Understanding_Darcs/Patch_theory) to find a sequence of patches (if this sequence exists) that can be safely applied to yield a working program.

In the move from text munging to structure manipulations, the intention in our actions becomes transparent to the the language / environment.

Another example:

We start with

```python
import X
```

Alice adds an import of `Y`.

```diff
  import X
+ import Y
```

Bob adds an import of `Z`.

```diff
  import X
+ import Z
```

Git can't handle this. It only knows that both Alice and Bob are modifying the same line. Because our hypothetical environment knows of the changes as "add import Y, add import Z" rather than "add second line, add second line", it can resolve them safely.

### Editor Integrations are Flaky

I love text editor integrations. They're [awesome](http://vimawesome.com/). But they seem to break all the time. Why? Because trying to make sense of your code *as you're writing it* is really, really hard.

Take this code for example:

```javascript
// working code

function foo() {
    foo("

// working code
```

With previously working code above and below, I start to declare `foo`. In the process I introduced unmatched '`{`'; `'('`; and `'"'`, and am referencing the not yet (fully) declared `foo`. This is routine editing, but it causes huge problems to tools like:

* typechecking
* go to source
* code folding
* autocomplete
* etc

Any of which require parsing (potentially incomplete) code.

## Forget Parsing

While we're at it, let's entirely avoid parsing.

Quoting someone much smarter than me, djb, on the [perils of parsing](http://cr.yp.to/qmail/qmailsec-20071101.pdf).

> I have discovered that there are two types of command
> interfaces in the world of computing: good interfaces and
> user interfaces.

> The essence of user interfaces is parsing: converting an
> unstructured sequence of commands, in a format usually
> determined more by psychology than by solid engineering,
> into structured data.

> When another programmer wants to talk to a user interface,
> he has to quote: convert his structured data into an
> unstructured sequence of commands that the parser will, he
> hopes, convert back into the original structured data.

> This situation is a recipe for disaster. The parser often
> has bugs: it fails to handle some inputs according to the
> documented interface. The quoter often has bugs: it produces
> outputs that do not have the right meaning. Only on
> rare joyous occasions does it happen that the parser and the
> quoter both misinterpret the interface in the same way.

By structurally editing programs, we entirely avoid parsing. This prevents two different classes of parse errors.

#### User Errors

For example,

```javascript
functoin() {} // I've probably done this 100 times
```

These are annoying but not especially important.

#### Implementation Errors

Less common, but arguably more important, are parser implementation errors. These are demoralizing and lead to distrust of the language itself.

There's one other benefit to structural editing I'd like to mention - the time saved from not writing and maintaining a parser at all.

## Sacrifices

As I'm trying to present an unbiased account of the benefits of structural editing, it's time to consider the downsides. Let's talk in generalities for a moment.

<div class="aside" markdown="1">

### Aside:

* Making your system better in one way *almost always* make it worse in another.
    - Examples:
        + Performance usually comes at the cost of simplicity (and therefore developer time and correctness).
        + You can have consistency, availability, or partition tolerance, but [not all three](http://en.wikipedia.org/wiki/CAP_theorem).
        + Immutable data structures have simpler semantics and can go back in time, but there are fundamental performance limitations.
        + etc.
    - The exceptions are exceedingly rare.
* When designing any system, take care to consider not only what you've won, but also what you've given up.
* Also: Make the same considerations for any system you're considering using.
  - Corollary: Be suspicious of any system claiming to be strictly better than what currently exists.
  - Second corollary: Be doubly suspicious if the creators of the system actually believe it's strictly better (ie. disregarding marketing, the engineers need to understand the tradeoffs they've made).
* Savor hard choices. Be decisive. A handful of small decisions guides the direction of your project.
    - Want a distributed database with consistent transactions? You need to grapple with the complexity of [PAXOS, GPS, and atomic clocks](http://research.google.com/archive/spanner.html)(!).
    - An [append-only database](http://blog.confluent.io/2015/03/04/turning-the-database-inside-out-with-apache-samza/) with streaming materialized views never loses data. You no longer have to worry corrupting data or migrating it, a huge win. But Postgres has been around for 20 years, and is stable, performant, and well understood.

</div>

So, what have we given up by moving away from plain text?

Graydon Hoare has some [thoughts on the matter](http://graydon2.dreamwidth.org/193447.html):

> text is the most powerful, useful, effective communication technology ever, period

Also,

> Text is the most socially useful communication technology. It works well in 1:1, 1:N, and M:N modes. It can be indexed and searched efficiently, even by hand. It can be translated. It can be produced and consumed at variable speeds. It is asynchronous. It can be compared, diffed, clustered, corrected, summarized and filtered algorithmically. It permits multiparty editing. It permits branching conversations, lurking, annotation, quoting, reviewing, summarizing, structured responses, exegesis, even fan fic. The breadth, scale and depth of ways people use text is unmatched by anything. There is no equivalent in any other communication technology for the social, communicative, cognitive and reflective complexity of a library full of books or an internet full of postings. Nothing else comes close.

Go read the [original](http://graydon2.dreamwidth.org/193447.html), it's short and powerful.

From a developer point of view, the biggest thing I can see that we're giving up is well-known, finely tuned tools (vim, grep, etc). These tools have had man-years of work put in, by *really* good developers.[^grep]

So, is giving up plain text worth it? Maybe not initially. We'll have to give up tools we've been using for years. They're comfortable and familiar, but they haven't changed much in years. It feels like we're approaching the limit of what can be done with the current generation of tooling. I can't see programmers 30 years from now programming in fundamentally the same way as we program today. The benefits of a richer representation are overwhelming.

[Darius Bacon](https://github.com/darius) also points out that there's a 50+ year history of structure editors. Why haven't they spread more and why would that change now? There is some folklore that in projects like the [Cornell Program Synthesizer](http://core.ac.uk/download/pdf/21750999.pdf), allowing programs to pass through illegal states makes editing much easier.

## Conclusion

Structured editing allows one to directly edit natural, intuitive representations of data. For example:

* Math
* Tables
* Images
* Colors
* Numbers

At the same time, editing *structures* rather than text makes the language environment more powerful. It makes the intention of our edits transparent, enabling more robust and composable changesets. We also avoid the need for parsing, which makes editor integrations simpler, removes an entire class of errors - syntax errors, and makes the language implementation simpler.

However, we need to give up the benefits of plain text files:

* Powerful, mature tools.
* Familiarity.
* etc.

## Next Time

Conspicuously missing from this post is discussion of how to *actually* edit structurally. I.E. how keypresses translate to editing actions. I have some ideas about this which I'll go over in a later post, along with we can avoid type errors at the same time.

[^grep]: see [why GNU grep is fast](https://lists.freebsd.org/pipermail/freebsd-current/2010-August/019310.html) for one example of the engineering poured in

<script src="/media/js/plaintext.js"></script>
