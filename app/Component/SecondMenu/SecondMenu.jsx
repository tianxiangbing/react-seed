import React from 'react';
let {Component} = React;
import Styles from './_SecondMenu.scss';
import {Link} from 'react-router';
import Dialog from 'Component/Dialog/Dialog';
export default class SecondMenu extends Component{
	constructor(props){
		super(props);
		this.state={dialog:0};
	}
    checkLogin(e){
        console.log(e)
        e.preventDefault();
		this.setState({dialog:{msg:'请先登录',type:'alert',show:true,buttons:<a onClick={this.jumpLogin.bind(this)}>确定</a>}});
		return false;
    }
    jumpLogin(){
        location.href="#list";
    }
    callback(){
        this.setState({dialog:0});
    }
	renderDialog(){
		console.log(this.state.dialog)
		return <Dialog stage={this} {...this.state.dialog} callback={this.callback.bind(this)}/>
	}
    render(){
        return (
            <div className="menu-list">
                <Link to="/"><i className="iconfont icon-shouye"/>首页</Link>
                <Link to="shop" onClick={this.checkLogin.bind(this)}><i className="iconfont icon-shouye2"/>商城</Link>
                <Link to="list"><i className="iconfont icon-caidan"/>记录</Link>
                {this.state.dialog?this.renderDialog():undefined}
            </div>
        )
    }
}