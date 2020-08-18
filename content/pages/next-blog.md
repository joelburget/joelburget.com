---
category: post
title: next blog
permalink: /next-blog
date: 2017-05-17
listed: true
---
# Blogging with next.js
For a long time I've wanted to blog more regularly, but haven't been able to update my website. Which I mean literally. It had bitrotted to the point where I couldn't remember how to build and update it anymore.
Then when I saw the [next.js announcement](https://zeit.co/blog/next) I knew it could get me unstuck. The same day I pushed the [first commit](https://github.com/joelburget/blog.next/commit/3b727b82c48b3d073b70522ed10c6bfa6ce3db61) in what is now my blog (that you're reading on).
## Getting Started
Next is a triumph of convention over configuration. To make a home page it's as simple as creating [`pages/index.js`](https://github.com/joelburget/blog.next/blob/master/pages/index.js) which exports a function returning its content. Same for the [page you're reading](https://github.com/joelburget/blog.next/blob/master/pages/next-blog.js). Styling is simple with [styled-jsx](https://github.com/zeit/styled-jsx). For the first time ever I have an SSL certificate (because it's built-in so I didn't have to figure it out myself).
Next provides server-rendering of my pages and page pre-fetching. Making this work with markdown was a line or five of [configuration](https://github.com/joelburget/blog.next/blob/master/components/Wrapper.js#L10).
GA integration also easy
Embedding js easy, don't have to webpack
## What's Missing
The biggest drawback: I just introduced a bunch of dead links to the web. [joelburget.com/plaintext](https://s3-us-west-1.amazonaws.com/joelburget.com/plaintext/index.html) is still sitting, unstyled, in an s3 bucket, as are a bunch of other pages. I'm planning to bring them back soon, but it's a lot of work for the ones that included javascript.
Writing in just markdown. With next, pages are defined by placing a `.js` file in the `pages` directory. I'm writing in markdown, so my js file just wraps the markdown content.
RSS. Automatic feed generation would be 👌🏻.
AMP. As a blog this is just a collection of static pages, which should make it easy to AMP. But it's more work than just a meta tag. You need to swap in tags like `<amp-img>` for `<img>`, make sure you're not using [disallowed styles](https://www.ampproject.org/docs/guides/responsive/style_pages) , etc. More work than I'm prepared to do for what's essentially just a nice-to-have. There's an [open issue](https://github.com/zeit/next.js/issues/744) on the next repo to add an AMP example, after which the biggest remaining unknown is creating valid AMP content from markdown.
Comments. I don't have them but vaguely want them.
Maintenance. This setup is rather minimal, but as soon as I start adding some of these features I'm going to be burdened with maintenance. I'd rather reuse someone else's work. A couple potential candidates: Guillermo Rauch has also been blogging on next with an [open source setup](https://github.com/rauchg/blog), which I'm hoping will evolve into a framework. There's also a site generator called [hokusai](https://github.com/rtsao/hokusai) I've been keeping an eye on. This one shares a lot of the same tech we're using, but isn't targeted at next / now. I'm sure I can learn from both but am still waiting for someone to build the perfect next blogging framework.
## Conclusion
Not everything is perfect, but next has been a great 80 / 20 solution to get me blogging again.
