---
layout: post
title: KhanQuest and the Healthy Hackathon
category: post
published: 2014-07-21
description: KhanQuest and the Healthy Hackathon
permalink: /healthy-hackathon
listed: false
---
# KhanQuest and the Healthy Hackathon

Over the past four days I participated in the Khan Academy 2014 Healthy Hackathon, where my team worked on a gamified version of Khan Academy called [KhanQuest](https://github.com/Khan/KhanQuest).

Aside: The *Healthy Hackathon* is like any other hackathon in that you get the chance to work on something you wouldn't normally get to. The big innovation in a *healthy* hackathon is that you don't stay up all night or drink even one Red Bull. "Healthy" meals are provided and hackers are kicked out between midnight and 9:30 the next morning.

## The Idea

![](/media/img/healthy-hackathon/opening.png)

Khan Academy pays pretty close attention to engagement - there's a data science team and a (small) growth team. There have been several dashboards charting our usage numbers over the past few years.

Unfortunately no amount of tweaks will make a student genuinely interested in using a website that their teacher is forcing them to use.

Our plan was to take Khan Academy's content and embed it in a game that's worth playing. The game is a fantasy rpg with gameplay similar to Final Fantasy (so I'm told). There's strategy, exploration, levelling up, interesting decisions, and *math*.

## Mapping Between KA and KhanQuest

![](/media/img/healthy-hackathon/acquire.png)

A lot of thought has been poured into the content and structure of Khan Academy and its pedagogy. We wanted to create a tight mapping between the original website and the game so we could reuse as much of that work as possible.

* The entire game corresponds to a mission on KA. I think we used [sixth grade math](https://www.khanacademy.org/mission/cc-sixth-grade-math).
* Skills on KA (e.g. finding the area of a polygon) and spells in KhanQuest are equivalent.
    + Learning and mastering spells in the game should transfer to progress on KA.
    + Different subjects correspond to different types of spells. Sixth grade math includes some arithmetic (arcane spells), geometry (fire), and algebra (frost). To complete the game you need to master all of them, just like you need to learn each branch of math to complete sixth grade.
* Practice tasks and random encounters are equivalent.
    + They're focused on a single skill, on KA you would earn "practiced" while in the game you could learn a new spell.
    + Right now there's a 1/20 chance of a random encounter *on every step* in the levels that include them. You could encounter ten creatures on a level or none. We should find a better mechanic so the encounters are more regular (i.e. you have a random encounter every 20 +/- rand(5) steps).
* Mastery tasks and boss battles are equivalent.
    + You need to context switch between different skills / use different spells.
    + Note that due to choosing your own spells, in the game you have more input on the problems you do in a task. It would make sense to have to use one of each type of spell to defeat a boss, but as far as I know we didn't get as far as figuring out how to make you practice exactly the skills you should review in a mastery task.
* You're incentivized to review skills because spells grow in power the longer you go without using them - so you'll want to go back and occasionally use the spells you learned long ago.
    + We need to figure out how quickly spells grow more powerful over time to incentivize the right behavior. This balancing is really difficult to get right.

## Building a Game in a Weekend

![](/media/img/healthy-hackathon/enemies.png)

... is *really* difficult!

I expected building the game engine to be difficult, and it was, but the surprising thing for me was the incredible amount of non-coding work there was. Finding and editing art, creating maps, playing through over and over, writing narration, coming up with spells.

## Making an Experience Anyone Would Enjoy

We wanted to build a game that would be appealing to both boys and girls. I think it's fair to say that we failed by making yet another fantasy game. There's some serious work left to come up with a more universally appealing premise.

We were somewhat limited by the art we could find freely available online. We ended up reusing art from [Valyria Tear](https://github.com/Bertram25/ValyriaTear) and [Battle for Wesnoth](http://www.wesnoth.org/). Both projects are *awesome* and had the best art we could find. Unfortunately as a result we were more or less forced to make a fantasy game.

We took at least one step to make it *not so bad*. The default character is a female <s>mage</s> grocery girl.

## Playing the Game

![](/media/img/healthy-hackathon/snow.png)

The version of the game we demoed is [online](http://khan.github.io/KhanQuest/).

This version of the game is incredibly easy to break, in fact our demo was carefully rehearsed to avoid all of the pitfalls (as a hackathon demo should be).

Some things to look out for:

* It's not hard to break out of the map.
* It's possible to leave the cottage without getting the first spell, and you can't get back into the cottage, which makes it very difficult to battle later enemies without any spells.
* You can still battle after your death.
* You can walk over trees.
* If you don't close all the dialogs you may get an error. Or you may get one anyway.

We only had four days, don't judge us too harshly!

Even if / when we improve the game I'm going to leave this version the same. I'm proud of what we did on only four days - warts and all.

## Conclusion

![](/media/img/healthy-hackathon/battle.png)

Building KhanQuest was the most fun I've had at work since I can remember. It turns out building a game with a small team is a blast. So is doing work that you care about and you think might make a difference!

Shout out to [Zach](https://github.com/zgotsch), [Charlie](http://www.princeton.edu/~crmarsh/khanquest/), [Desmond](http://desmondbrand.com/), [Jack](https://github.com/jacktoole1), [Michelle](https://twitter.com/himichelletodd), and [Elizabeth](http://www.elizabethylin.com/about/) for making a killer temporary game studio.
