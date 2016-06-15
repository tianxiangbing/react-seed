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
import Helmet from "react-helmet";
//import Styles from './_App.scss';
import Config from 'config';
import cookie from 'react-cookie';
let {Component}= React;
//import 'whatwg-fetch';
import Dialog from '../../Component/Dialog';

export default class App extends Component{
	constructor(props){
		super(props)
		this.state={dialog:0};
	}
	componentWillMount(){
	}
	
	componentDidMount(){
		}
	componentWillUnmount() {
	}
	
	render(){
		return (
			<div className="body">
				<Helmet title="种子"/>
                {this.state.dialog?this.renderDialog():undefined}
			</div>
			)
	}
}