import React from 'react'
import Link from 'gatsby-link'
import { injectGlobal } from "emotion"

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
      <li>twitter: <a href="https://twitter.com/dino_joel">dino_joel</a></li>
      <li>email: <a href="mailto:joelburget@gmail.com">joelburget@gmail.com</a></li>
    </ul>
  </footer>
);

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        className="host"
      >
        {nav}
        {children()}
        {this.props.location.pathname != "/" && footer}
      </div>
    )
  }
}

export default Template

injectGlobal`
hr {
  margin: 2em 0;
}
.host {
  margin: 0 auto;
  padding: 40px 20px;
  line-height: 2;
  max-width: 900px;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera San;
  text-rendering: geometricPrecision;
}
nav {
  margin-bottom: 80px;
  font-size: 14px;
}

nav ul {
  display: flex;
  padding: 0; /* remove left padding */
}

nav li {
  list-style-type: none;
}

h1, h2, h3 {
  font-weight: 700;
  color: #000;
}
h1 {
  font-size: 16px;
}
h2 {
  font-size: 14px;
}
h3 {
  font-size: 13px;
}
h1::before {
  content: '# ';
  color: rgba(0, 0, 0, 0.5);

}
h2::before {
  content: '## ';
  color: rgba(0, 0, 0, 0.5);
}
h3::before {
  content: '### ';
  color: rgba(0, 0, 0, 0.5);
}
p {
  padding-bottom: 2em;
}
p, li {
  color: #424242;
  font-size: 13px;
  line-height: 22px;
}

em::before, em::after {
  content: '/';
  color: rgba(0, 0, 0, 0.5);
}

strong::before, strong::after {
  content: '*';
  color: rgba(0, 0, 0, 0.5);
}

del::before, del::after {
  content: '~';
  color: rgba(0, 0, 0, 0.5);
}

li > p {
}

/* not sure if a good idea / used? */
u::before, u::after {
  content: '_';
  color: rgba(0, 0, 0, 0.5);
}
/*
li {
  fontSize: 13px;
}
*/
`;
