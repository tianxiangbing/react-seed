# React seed [![Build Status](https://travis-ci.org/badsyntax/react-seed.svg?branch=master)](https://travis-ci.org/badsyntax/react-seed)

A boilerplate for building React apps with ES6 and webpack.

## What you get

* React 15.0.1
* ES6, ES7 & JSX to ES5 via babel
* webpack with react hot loader, and other useful loaders
* [Local CSS](https://github.com/webpack/css-loader#local-scope)


## Getting started

### Installing with git

```bash
git clone --depth=1 https://github.com/tianxiangbing/react-seed.git my-project
```

### Installing with yeoman

1. `npm install i`
3. `npm start`  动态部署
4. `npm test`	联调模式
5. `webpack -p`	打包发布



## Examples

### Writing components:

```js
// Filename: Menu.jsx

'use strict';

import styles from './_Menu.scss';
import React from 'react';
import MenuItem from './MenuItem';

let { Component, PropTypes } = React;

export default class Menu extends Component {

  static defaultProps = {
    items: []
  };

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <ul className={styles.menu}>
        {this.props.items.map((item) => {
          return (<MenuItem item={item} />);
        }, this)}
      </ul>
    );
  }
}
```

###Writing tests:

```js
// Filename: __tests__/Menu-test.jsx

'use strict';

import React from 'react/addons';
import { expect } from 'chai';

import Menu from '../Menu.jsx';
import MenuItem from '../MenuItem.jsx';

// Here we create a mocked MenuItem component.
class MockedMenuItem extends MenuItem {
  render() {
    return (
      <li className={'mocked-menu-item'}>{this.props.item.label}</li>
    );
  }
}

## Sass, CSS & webpack

`import` Sass and CSS files from within your JavaScript component files:

```js
// Filename: app.jsx
import 'normalize.css/normalize.css';
import styles from './scss/app.scss';
```
