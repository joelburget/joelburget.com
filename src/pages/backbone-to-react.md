---
layout: post
title: Backbone to React
category: post
date: 2013-08-28
description: My talk at Hack Reactor about Khan Academy's transition from Backbone to React
permalink: /backbone-to-react
---

<div style="height: 17px;"></div>

Previously: [First Reactions](/react/)

Hack Reactor
============

On Friday I spoke at [Hack Reactor](http://hackreactor.com/) - a programming
bootcamp designed to jump start your web development career in 12 weeks. It
looks *intense* - you work 9 - 8, six days a week. Thanks to the team there for
bringing me in to speak!

I talked for about 45 mins about Khan Academy's transition from [Backbone
Views](http://backbonejs.org/#View) to
[React](http://facebook.github.io/react/). I'll skip over the technical intro
to React, since the [official docs](http://facebook.github.io/react/docs/) do a
better job than I could.

Discovering React
=================

Transitioning to React is a process we began about 4 1/2 months ago, very soon
after React was released by Facebook. I had just begun project "Hercules" -
bringing user-submitted clarifications to our videos - and was struggling to do
it using our existing toolchain with Backbone views and Handlebars templates.

At the same time my coworker [Ben Alpert](http://benalpert.com/) was just
beginning a project of his own on "Perseus" (notice how wonderful our project
names are). We both started working in React independently. I don't know how
Alpert felt but I was certainly encouraged by knowing that he found React
valuable.

<img src="/media/img/monkeys.gif" id="monkeys">

Here's a demo Alpert threw together while working on Perseus.  Notice how the
left side is smooth, while the right side jumps?

The right side is pre-React version of Perseus, where the entire thing, [fancy
math](https://github.com/Khan/KaTeX) and
[all](https://github.com/Khan/perseus), is re-rendered on every keyup. Now the
left side is the post-React version which is fast because it avoids
re-rendering the math on every keyup.

The hard work of figuring out what to render is all done by React. The
component just specifies that it needs text followed by three math components,
then React steps in and is smart enough to avoid duplicating the work it's
already done. In fact, React tries to compute the smallest set of changes it
has to make when mutating the DOM. It would be possible to use a backbone
plugin or our own data-binding, but React does that already.

<img src="/media/img/deleteprops.png" style="float: left; margin: 5px 20px 40px 0;" />

Because of React we no longer have to use Handlebars templates, which is a good
move for our codebase. Handlebars forces almost all of the logic out of your
templates, so you end up with properties like `isComment`, `isQuestion`, etc,
when you should really just have one property, `type`, that's either
`"question"` or `"comment"`. In React you can use any valid js expression
(because it's js!), so we were able to delete all those unnecessary computed
properties. I could go on for days about the advantages I see in React - just
ask me for more if you're not already bored out of your mind.

<h1 style="clear: both;">Attack Vector</h1>

How did we get the rest of the team to adopt React? Using interns as an attack
vector! Most full-time devs had already been working on their existing projects
for a while and weren't looking to try something new at the time, but our class
of summer interns was just arriving. For whatever reason, a lot of them decided
to try React for their projects. Then mentors became exposed through code
reviews or otherwise touching the new code. In this way React knowledge
diffused to almost the whole team over the summer.

Since the first React checkin on June 5, we've somehow managed to accumulate
23500 lines of jsx (React-flavored js) code. Which is terrifying in a way -
that's a lot of code - but also really exciting that it was picked up so
quickly.

We held three meetings about how we should proceed with React. At the first two
we decided to continue experimenting with React and deferred a final decision
on whether to adopt it. At the third we adopted the policy that new code should
be written in React.

I'm excited that we were able to start nudging code quality forward. However,
we still have a lot of work to do! One of the selling points of this transition
is adopting a uniform frontend style. We're trying to upgrade all the code from
(really old) pure jQuery and (regular old) Backbone views / Handlebars to shiny
React. At the moment all we've done is introduce more fragmentation. We won't
be gratuitously updating working code (if it ain't broke, don't fix it), but
are seeking out parts of the codebase where we can shoot two birds with one
stone by rewriting in React while fixing bugs or adding functionality.

Slides
======

These are probably of no use to you, save for the awesome dinosaur pictures.

<script async class="speakerdeck-embed" data-id="b3b220501fd6013114a30a360350e1fc" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
