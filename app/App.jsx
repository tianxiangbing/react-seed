/*
 * Created with Sublime Text 3.
 * github: https://github.com/tianxiangbing/react-seed
 * User: 田想兵
 * Date: 2016-05-30
 * Time: 10:27:55
 * Contact: 55342775@qq.com
 */
import React, { Component } from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router'

import Styles from './_App.scss';
import App from './page/App/App';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'))
