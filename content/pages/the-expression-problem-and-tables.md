---
layout: post
title: The Expression Problem and Tables
category: post
date: 2015-03-02
description: The Expression Problem and Tables
permalink: /the-expression-problem-and-tables
listed: true
---

# The Expression Problem and Tables

## The Expression Problem

The expression problem is a well known problem in programming language theory dealing with the expressivity of a programming language. In this post I'll examine its impact on functional and object-oriented code, then talk about solving the problem in a language with tables as a programmable entity.

Say you have some data, like Animals. And some actions that they can perform. We want to implement both actions for both animals.

|       |   cat   |   fox   |
|-------|---------|---------|
| sound |  {...}  |  {...}  |
| eat   |  {...}  |  {...}  |

The expression problem asks what facilities the language provides to deal with this table. Here's Philip Wadler's [original statement](http://homepages.inf.ed.ac.uk/wadler/papers/expression/expression.txt) of the problem.

> The Expression Problem is a new name for an old problem.  The goal is
> to define a datatype by cases, where one can add new cases to the
> datatype and new functions over the datatype, without recompiling
> existing code, and while retaining static type safety (e.g., no
> casts).

Let's take a look at two how the object-oriented and functional styles cope with the expression problem.


### Object-Oriented

Object-oriented languages primarily look at the data ("objects"). We say that a *__cat__ can eat* or a *__fox__ can make a sound*.

```java
class Cat {
    def sound {...}
    def eat {...}
}

class Fox {
    def sound {...}
    def eat {...}
}
```

We're implicitly filling in columns of a table.

<table class="oo-table">
 <thead>
 <tr>
  <td></td>
  <th><code>{"class Cat {"}</code></th>
  <th><code>{"class Fox {"}</code></th>
 </tr>
 </thead>
 <tfoot>
 <tr>
 <td></td>
 <td>}</td>
 <td>}</td>
 </tr>
 </tfoot>
 <tbody>
 <tr>
  <td><code>sound</code></td>
  <td><pre><code>{"    def sound {...}"}</code></pre></td>
  <td><pre><code>{"    def sound {...}"}</code></pre></td>
 </tr>
 <tr>
  <td><code>eat</code></td>
  <td><pre><code>{"    def eat {...}"}</code></pre></td>
  <td><pre><code>{"    def eat {...}"}</code></pre></td>
 </tr>
 </tbody>
</table>


It's relatively easy to add a new datatype (ie a column). It's all contained in a new class declaration.

```java
class Bat {
    def sound {...}
    def eat {...}
}
```

<table class="oo-table">
 <thead>
 <tr>
  <td></td>
  <th class="existing"><code>{"class Cat {"}</code></th>
  <th class="existing"><code>{"class Fox {"}</code></th>
  <th class="modified"><code>{"class Bat {"}</code></th>
 </tr>
 </thead>
 <tfoot>
 <tr>
 <td></td>
 <td class="existing">}</td>
 <td class="existing">}</td>
 <td class="modified">}</td>
 </tr>
 </tfoot>
 <tbody>
 <tr>
  <td><code>sound</code></td>
  <td class="existing"><pre><code>{"    def sound {...}"}</code></pre></td>
  <td class="existing"><pre><code>{"    def sound {...}"}</code></pre></td>
  <td class="modified"><pre><code>{"    def sound {...}"}</code></pre></td>
 </tr>
 <tr>
  <td><code>eat</code></td>
  <td class="existing"><pre><code>{"    def eat {...}"}</code></pre></td>
  <td class="existing"><pre><code>{"    def eat {...}"}</code></pre></td>
  <td class="modified"><pre><code>{"    def eat {...}"}</code></pre></td>
 </tr>
 </tbody>
</table>


To add a new action (ie a row) is more difficult. We need to open up all the objects (columns) to modify them.

<table class="oo-table">
 <thead>
 <tr>
  <td></td>
  <th class="existing"><code>{"class Cat {"}</code></th>
  <th class="existing"><code>{"class Fox {"}</code></th>
 </tr>
 </thead>
 <tfoot>
 <tr>
 <td></td>
 <td class="existing">{"}"}</td>
 <td class="existing">{"}"}</td>
 </tr>
 </tfoot>
 <tbody>
 <tr>
  <td><code>sound</code></td>
  <td class="existing"><pre><code>{"    def sound {...}"}</code></pre></td>
  <td class="existing"><pre><code>{"    def sound {...}"}</code></pre></td>
 </tr>
 <tr>
  <td><code>eat</code></td>
  <td class="existing"><pre><code>{"    def eat {...}"}</code></pre></td>
  <td class="existing"><pre><code>{"    def eat {...}"}</code></pre></td>
 </tr>
 <tr>
  <td><code>attack</code></td>
  <td class="modified"><pre><code>{"    def attack {...}"}</code></pre></td>
  <td class="modified"><pre><code>{"    def attack {...}"}</code></pre></td>
 </tr>
 </tbody>
</table>

Not a big deal when there are only two classes, but the point is we need to find and modify each class implementing this interface. The implementations are spread across space, likely in different files. The difficulty is not in the *amount* of code being written, but how many distinct places one must edit.

Perhaps more importantly, since we spend more time reading than writing code, how many places must you look to understand a concept. If I want to to understand what it means to be a `Cat`, I look at the `Cat` class. But there's no single place where I can understand what it means to `eat`.


### Functional

Functional languages start from functions. *__sound__ applies to cats and foxes*.

```haskell
data Animal = Cat | Fox | Bat

sound :: Animal -> Sound
sound Cat = {...}
sound Fox = {...}
sound Bat = {...}

eat :: Animal -> Action
eat = {...}
```

<table class="fp-table">
 <thead>
  <tr>
   <th></th>
   <th><code>Cat</code></th>
   <th><code>Fox</code></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><code>sound</code></td>
   <td><code>{"Cat -> {...}"}</code></td>
   <td><code>{"Fox -> {...}"}</code></td>
  </tr>
  <tr>
   <td><code>eat</code></td>
   <td><code>{"Cat -> {...}"}</code></td>
   <td><code>{"Fox -> {...}"}</code></td>
  </tr>
 </tbody>
</table>

It's relatively easy to add a new function.

```haskell
attack :: Animal -> Action
attack Cat = {...}
attack Fox = {...}
attack Bat = {...}
```

<table class="fp-table">
 <thead>
  <tr>
   <th></th>
   <th><code>Cat</code></th>
   <th><code>Fox</code></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td class="existing"><code>sound</code></td>
   <td class="existing"><code>{"Cat -> {}"}</code></td>
   <td class="existing"><code>{"Fox -> {}"}</code></td>
  </tr>
  <tr>
   <td class="existing"><code>eat</code></td>
   <td class="existing"><code>{"Cat -> {}"}</code></td>
   <td class="existing"><code>{"Fox -> {}"}</code></td>
  </tr>
  <tr>
   <td class="modified"><code>attack</code></td>
   <td class="modified"><code>{"Cat -> {}"}</code></td>
   <td class="modified"><code>{"Fox -> {}"}</code></td>
  </tr>
 </tbody>
</table>

But it's difficult to add a new data constructor.

```haskell
data Animal = Cat | Fox | Bat | Dog

sound :: Animal -> Sound
sound Cat = {...}
sound Fox = {...}
sound Bat = {...}
sound Dog = {...}

eat = {...}
```

<table class="fp-table">
 <thead>
  <tr>
   <th></th>
   <th class="existing"><code>Cat</code></th>
   <th class="existing"><code>Fox</code></th>
   <th class="modified"><code>Bat</code></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><code>sound</code></td>
   <td class="existing"><code>{"Cat -> {...}"}</code></td>
   <td class="existing"><code>{"Fox -> {...}"}</code></td>
   <td class="modified"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td><code>eat</code></td>
   <td class="existing"><code>{"Cat -> {...}"}</code></td>
   <td class="existing"><code>{"Fox -> {...}"}</code></td>
   <td class="modified"><code>{"Bat -> {...}"}</code></td>
  </tr>
 </tbody>
</table>

We need to open up the implementation of *every* function dealing with the `Animal` datatype. Which, again, may be spread across different files.

Both approaches work well only half the time when editing objects and actions they perform.


## Tables

In both the object-oriented and functional code, we're implicitly filling the cells in a table. An object-oriented approach tends to focus on columns, while a fuctional approach tends to focus on rows.

Imagine using tables as a first-class programming interface, where you can scan the rows and columns or add new ones. You become empowered to see the table from the point of view of either the functional or object-oriented style, depending on what you're trying to understand.

<table class="table-table">
 <thead>
  <tr>
   <th></th>
   <th class="existing"><code>Cat</code></th>
   <th class="existing"><code>Fox</code></th>
   <th class="modified"><code>Bat</code></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><code>sound</code></td>
   <td class="existing"><code>{"Cat -> {...}"}</code></td>
   <td class="existing"><code>{"Fox -> {...}"}</code></td>
   <td class="modified"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td><code>eat</code></td>
   <td class="existing"><code>{"Cat -> {...}"}</code></td>
   <td class="existing"><code>{"Fox -> {...}"}</code></td>
   <td class="modified"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td><code>attack</code></td>
   <td class="modified"><code>{"Cat -> {...}"}</code></td>
   <td class="modified"><code>{"Fox -> {...}"}</code></td>
   <td class="modified"><code>{"Bat -> {...}"}</code></td>
  </tr>
 </tbody>
</table>

<p class="aside">
Aside: It's very important to understand that I'm not proposing to program this way in text files. It would be far too much work to maintain table layout manually. Rather, this type of editing can only be done in a richer environment.
</p>

Additionally, by treating the table as an object in our programming environment, we gain the power to query:

```query
> animals which eat
```

<table class="table-table">
 <thead>
  <tr>
   <th></th>
   <th class="no-hl"><code>Cat</code></th>
   <th class="no-hl"><code>Fox</code></th>
   <th class="no-hl"><code>Bat</code></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td class="no-hl"><code>sound</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="hl"><code>eat</code></td>
   <td class="hl"><code>{"Cat -> {...}"}</code></td>
   <td class="hl"><code>{"Fox -> {...}"}</code></td>
   <td class="hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="no-hl"><code>attack</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
 </tbody>
</table>

```query
> unimplemented cases
```

<table class="table-table">
 <thead>
  <tr>
   <th></th>
   <th class="no-hl"><code>Cat</code></th>
   <th class="no-hl"><code>Fox</code></th>
   <th class="no-hl"><code>Bat</code></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td class="no-hl"><code>sound</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="no-hl"><code>eat</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="no-hl"><code>attack</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
 </tbody>
</table>

## Richer Queries

To make this more interesting, say our environment also provides queryable metadata. It could conceivable provide info on:

* _who_ wrote a datatype or function
* _when_ it was first written and last modified
* usage information
* testing information

Then you could query interesting things, like:

```query
> functions written by me,
  with no tests,
  that have thrown an exception in production
```

<table class="table-table">
 <thead>
  <tr>
   <th></th>
   <th class="no-hl"><code>Cat</code></th>
   <th class="no-hl"><code>Fox</code></th>
   <th class="no-hl"><code>Bat</code></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td class="no-hl"><code>sound</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="modified"><code>eat</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="modified"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="no-hl"><code>attack</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
 </tbody>
</table>

```query
> implementations calling a deprecated function
```

<table class="table-table">
 <thead>
  <tr>
   <th></th>
   <th class="no-hl"><code>Cat</code></th>
   <th class="no-hl"><code>Fox</code></th>
   <th class="no-hl"><code>Bat</code></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td class="no-hl"><code>sound</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="no-hl"><code>eat</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="modified"><code>attack</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="modified"><code>{"Bat -> {...}"}</code></td>
  </tr>
 </tbody>
</table>

```query
> implementations marked TODO
```

<table class="table-table">
 <thead>
  <tr>
   <th></th>
   <th class="no-hl"><code>Cat</code></th>
   <th class="no-hl"><code>Fox</code></th>
   <th class="no-hl"><code>Bat</code></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td class="modified"><code>sound</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="modified"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="no-hl"><code>eat</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
  <tr>
   <td class="no-hl"><code>attack</code></td>
   <td class="no-hl"><code>{"Cat -> {...}"}</code></td>
   <td class="no-hl"><code>{"Fox -> {...}"}</code></td>
   <td class="no-hl"><code>{"Bat -> {...}"}</code></td>
  </tr>
 </tbody>
</table>


## Simulating Inheritance and Type Classes

Inheritance and type classes are both means of coping with the combinatorial explosion of table cells (as `n` datatypes and `m` operations on each requires `n*m` function implementations) by filling in cells automatically.

+ *Inheritance* provides free methods on your data, depending on what it *is*.
+ *Type classes* provide free functions available to any data instantiating a type class.

By making tables programmable - think spreadsheets - we can implement rules to simulate inheritance and type classes.

I've been thinking about what it might look like to simulate inheritance or type classes in this framework. Here's a sketch of the direction I'm going.

We have a few different tables - `animal`, `machine`, `inheritance`, and the `animal` / `machine` composite table.

First a couple tables implementing the operations for the parent class.

<div class="headed-table">

<table>
<thead>
<tr class="header">
<th align="left"></th>
<th align="left"><code>animal</code></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left"><code>sound</code></td>
<td align="left">{"{...}"}</td>
</tr>
<tr class="even">
<td align="left"><code>eat</code></td>
<td align="left">{"{...}"}</td>
</tr>
</tbody>
</table>
</div>

<div class="headed-table">

<table>
<thead>
<tr class="header">
<th align="left"></th>
<th align="left"><code>machine</code></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left"><code>power up</code></td>
<td align="left">{"{...}"}</td>
</tr>
<tr class="even">
<td align="left"><code>manufacture</code></td>
<td align="left">{"{...}"}</td>
</tr>
</tbody>
</table>
</div>

<p style="clear: both; padding-top: 2em;">Now a table specifying the inheritance pattern.</p>

|       |   `animal`   | `machine` | ... |
|-------|------------|---------|-----|
| `cat`   |     x      |         |     |
| `car`   |            |    x    |     |
| ...   |            |         |     |


Those three tables are the whole implementation. Let's look at a derived table of all animals and machines together.

#### `animal` / `machine`

|               |   `cat`    |   `car`     |
|---------------|----------|-----------|
| `sound`         | (animal) |           |
| `eat`           | (animal) |           |
| `power up`      |          | (machine) |
| `manufacture`   |          | (machine) |

Some benefits:

* It appeals to my "explicit is better" self to be able to just *see* what's
  going to be invoked, rather than having to understand the rules for [method dispatch](http://en.wikipedia.org/wiki/Dynamic_dispatch) like in today's languages.
* I can click any cell in the table and see:
    - The type of the function.
    - What implementations its neighbors use.
    - If there are any functions in scope with that type signature I could use.
* I can see patterns in the table.
* Filling in the table in a programmatic way allows me to use inheritance,
  typeclasses, or some new way of filling in implementations automatically.


## The Expression Problem and Testing

There's a related problem with testing. Given two orthogonal axes - code and tests - we need to decide how to lay them out. Most code I've worked with has had code in one file and tests in another:

```javascript
// code
function f() {...}
function g() {...}

// tests
function test_f() {...}
function test_g() {...}
```

Although I have seen code that does this all inline

```javascript
// f
function f() {...}
function test_f() {...}

// g
function g() {...}
function test_g() {...}
```

There are good arguments to be made for both styles. It's more important to note that they're both valid. Sometimes I want to see `f`{.javascript} and `g`{.javascript} at the same time. Sometimes I want to see `f`{.javascript} and `f_test`{.javascript} at the same time.

Let's solve this in the same way as the expression problem

|                | `f`      | `g`      |
|----------------|----------|----------|
| implementation | `f`      |    `g`   |
| test           | `f_test` | `g_test` |

Viewing a column I can see code and test together. Viewing a row I can see all code or all tests.


## Conclusion


The expression problem is really a layout problem. It's impossible to write a one-dimensional (plaintext) file such that data and actions are both immediate. Inheritance and typeclasses are useful, but they're really rules for building an implicit table.

My proposed solution is to change the constraints of the problem. By considering a richer representation of our program we gain the power to view it from multiple directions.
