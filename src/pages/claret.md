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

## Abstract

> A language called Syn is described in which all aspects of context-free syntax can be specified without redundancy. The language is essentially an extended BNF grammar. Unusual features include high-level constructs for specifying lexical aspects of a language and specification of precedence by textual order. A system has been implemented for generating lexers, parsers, pretty-printers and abstract syntax tree representations from a Syn specification

Functions:

```
􏱃quote􏰖l 􏰙r 􏰗
􏱃escape􏱀quote􏰖l 􏰙e􏰙r 􏰗 􏱃doubleup􏱀quote􏰖l 􏰙r 􏰗 􏱃nested􏱀quote􏰖l 􏰙r 􏰗 􏱃quote􏱀in􏱀line􏰖l 􏰙r 􏰗 􏱃escape􏱀quote􏱀in􏱀line􏰖l 􏰙e􏰙r 􏰗 􏱃doubleup􏱀quote􏱀in􏱀line􏰖l 􏰙r 􏰗 􏱃nested􏱀quote􏱀in􏱀line􏰖l 􏰙r 􏰗
```

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

layout specifications

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

## CLaReT

## Abstract

> A tool to support formal reasoning about computer languages and specific language texts is described. The intention is to provide a tool that can build a formal reasoning system in a mechanical theorem prover from two specifications, one for the syntax of the language and one for the semantics. A parser, pretty-printer and internal representations are generated from the former. Logical representations of syntax and semantics, and associated theorem proving tools, are generated from the combination of the two specifications. The main aim is to eliminate tedious work from the task of prototyping a reasoning tool for a computer language, but the abstract specifications of the language also assist the automation of proof.

## Excerpts

> Increasingly the embedding technique is being applied to industrial-strength computer languages. This creates problems akin to those arising when trying to write a large program in an assembly language -- the level of description is too low. Generating an embedding is tedious and error-prone.

CLaReT = "Computer Language Reasoning Tool"

Implemented in Standard ML
