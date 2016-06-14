/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com
 * User: 田想兵
 * Date: 2016-05-30
 * Time: 10:27:55
 * Contact: 55342775@qq.com
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router'

import Styles from './_App.scss';
import App from './page/App/App';
import Record from './page/Record/Record';
import Fieldsign from './page/Fieldsign/Fieldsign';
import SelectArea from './page/SelectArea/SelectArea';
import OrtAnomalie from './page/OrtAnomalie/OrtAnomalie';
/*var scale = 1 / devicePixelRatio;
	document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
*/
//document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/record" component={Record}/>
    <Route path="/fieldsign" component={Fieldsign}/>
    <Route path="/selectarea" component={SelectArea}/>
    <Route path="/ortanomalie" component={OrtAnomalie}/>
  </Router>
), document.getElementById('app'))
