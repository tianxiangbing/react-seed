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
import Config from 'config';
import cookie from 'react-cookie';
let {Component}= React;
import Dialog from '../../Component/Dialog';

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={corpList:[],currCorp:{},expand:false,dialog:0};
	}
	renderDialog(){
		console.log(this.state.dialog)
		return <Dialog stage={this} {...this.state.dialog}/>
	}
	openDialog(){
		this.setState({dialog:{msg:'你好',type:'alert',show:true}});
	}
	hideDialog(){
		this.setState({dialog:0})
	}
	render(){
		return (
			<div>
				<a href="#" onClick={this.openDialog.bind(this)}>点我</a>
                {this.state.dialog?this.renderDialog():undefined}
			</div>
			)
	}
}