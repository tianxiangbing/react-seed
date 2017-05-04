/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com
 * User: 田想兵
 * Date: 2016-05-30
 * Time: 10:27:55
 * Contact: 55342775@qq.com
 */
import React from 'react';
import {Link} from 'react-router';
import Config from 'config';
let {Component}= React;
import Styles from './_App.scss';
import Menu from 'Component/Menu/Menu';
import SecondMenu from 'Component/SecondMenu/SecondMenu';

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={dialog:0};
	}
	render(){
		return (
			<div>
				<Menu>首页</Menu>
				<SecondMenu/>
			</div>
			)
	}
}