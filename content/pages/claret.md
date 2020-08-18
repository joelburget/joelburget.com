---
layout: post
title: Syn / CLaReT
category: post
date: 2018-09-16
description: Syn / CLaReT
permalink: /claret
listed: False
---

Richard J. Boulton

## Syn

(1996)

## Abstract

> A language called Syn is described in which all aspects of context-free syntax can be specified without redundancy. The language is essentially an extended BNF grammar. Unusual features include high-level constructs for specifying lexical aspects of a language and specification of precedence by textual order. A system has been implemented for generating lexers, parsers, pretty-printers and abstract syntax tree representations from a Syn specification

Functions:

> A function application begins with a `#` followed by an identifer and arguments in parentheses... The use of the sharp sign (`#`) distinguishes lexical names and function names from user identifiers.

```
#quote(l, r)
#escape_quote(l, e, r)
#doubleup_quote(l, r)
#nested_quote(l, r)
#quote_in_line(l, r)
#escape_quote_in_line(l, e, r)
#doubleup_quote_in_line(l, r)
#nested_quote_in_line(l, r)
```

There are four kinds of syntactic category definition: for data-carrying terminals, for sets of fixed terminals, for non-terminals, and for aliases.

Terminals:

```
string
character
boolean
natural
integer
rational
real
```

> The remainder of each alternative of the non-terminal definitions consists of nested boxes, i.e. items of the form `[<...> ...]`. Stripping out the boxes would leave a linear sequence of terminals and non-terminals much as in BNF. The boxes perform two functions: they specify how the language is to be pretty-printed, and they also allow sequences of terminals and non-terminals to be optional or repeated.

layout specifications

> A format, then is either a terminal (a string constant possibly annotated by an associativity), a non-terminal (an identifier), or a box (denoted by square brackets).

```
<h h>
<v i,v>
<hv h,i,v>
<hov h,i,v>
```

* `h`: positioned on the same line, separated by `h` spaces
* `v`: vertical layout separated by `v` lines, the second and later lines indented by `i` spaces
* `hv`: horizontal-vertical: as many objects as possible should be placed on one line, and a new line begun when there is no more space, with an indentation of `i`
* `hov`: horizontal-or-vertical: all objects should go on one line or they should be formatted vertically

> The main limitation of Syn seems to be in its inability to
> sensitive features such as user-defined infix operators. Nor is it suitable for
> languages that use formatting information such as indentation to determine block
> structure and the like.

## CLaReT

(1996)

## Abstract

> A tool to support formal reasoning about computer languages and specific language texts is described. The intention is to provide a tool that can build a formal reasoning system in a mechanical theorem prover from two specifications, one for the syntax of the language and one for the semantics. A parser, pretty-printer and internal representations are generated from the former. Logical representations of syntax and semantics, and associated theorem proving tools, are generated from the combination of the two specifications. The main aim is to eliminate tedious work from the task of prototyping a reasoning tool for a computer language, but the abstract specifications of the language also assist the automation of proof.

## Intro

> Increasingly the embedding technique is being applied to industrial-strength computer languages. This creates problems akin to those arising when trying to write a large program in an assembly language -- the level of description is too low. Generating an embedding is tedious and error-prone.

CLaReT = "Computer Language Reasoning Tool"

Implemented in Standard ML

## Example

```
com ::= (Skip) "skip"
      | (Assign) [<hv 1,3,0> [<h 1> name ":="] iexp]
      | (If) [<hov 1,0,0> [<h 1> "if" bexp]
                          [<h 1> "then" com]
                          [<h 1> "else" com]?]
      | (While) [<hov 1,3,0> [<h 1> "while" bexp "do"] com]
      | (Block) [<hov 1,3,0> "begin" ([<h 0> com ";"]* com) <1,0,0> "end"];
```

* Where everything in angle brackets is formatting information.
* The number and type of subtrees are deduced from the non-terminals
* The precedence of nonterminals is specified implicitly by textual ordering
  via dependency analysis

The snippet corresponds to this ML datatype:

```
datatype com
  = Skip
  | Assign of name * iexp
  | If of bexp * com * com option 􏰡
  | While of bexp * com
  | Block of com list
```

## Denotational Semantics

> `<<...>>` denotes a meta-variable which ranges over a syntactic category.

```
[| Skip |] == ();;
[| Assign(<<name>>,<<iexp |] == !<<name>> <- [|<<iexp>>|];;
[| If(<<bexp>>,<<com.1>>,{}) |] ==
  if [|<<bexp>>|] then [|<<com.1>> |] else ();;
[| While(<<bexp>>,<<com.1>>,{<<com.2>>}) |] ==
  if [|<<bexp>>|]
  then ([|<<com>>|]; [| While(<<bexp>>,<<com>>) |])
  else ();;
[| Block(<<[coms]>>) |] == ([|<<coms>>|]; ());;
```

## Related Work

[Invertible Syntax Descriptions: Unifying Parsing and Pretty Printing](http://www.mathematik.uni-marburg.de/~rendel/rendel10invertible.pdf)

### [The PMS and ISP descriptive systems for computer structures](/claret/pms-isp.pdf)

Maybe useful as prior work for describing low-level systems. Otherwise not interesting.
