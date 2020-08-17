import React from 'react'
import Link from 'gatsby-link'

const nav = (
  <nav>
    <ul>
      <li><Link to="/">joelburget.com</Link></li>
      <li style={{margin: '0 2em 0 1em'}}>(<a href="https://github.com/joelburget/blog">src</a>)</li>
      <li><Link to="/posts">/posts</Link></li>
    </ul>
    <hr />
  </nav>
);

const footer = (
  <footer>
    <hr />
    <h2>Get in Touch</h2>
    <ul>
      <li>github: <a href="https://github.com/joelburget">joelburget</a></li>
      <li>twitter: <a href="https://twitter.com/dino_joel">@dino_joel</a></li>
      <li>email: <a href="mailto:joelburget@gmail.com">joelburget@gmail.com</a></li>
    </ul>
  </footer>
);

export default ({ children, location }) => (
  <div
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
    className="host"
  >
    {nav}
    {children}
    {location.pathname != "/" && footer}
  </div>
)
