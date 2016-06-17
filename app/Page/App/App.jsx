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
		localStorage.removeItem('outInfo');
		super(props);
		this.isLocated = 0;
		this.action = 0;
		this .signType = 0;
		this.state={corpList:[],currCorp:{},expand:false,dialog:0};
	}
	componentWillMount(){
	}
	getQuery(name, type, win) {
        var reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|$|#)", "i");
        win = win || window;
        var Url = win.location.href;
        var u, g, StrBack = '';
        if (type == "#") {
            u = Url.split("#");
        } else {
            u = Url.split("?");
        }
        if (u.length == 1) {
            g = '';
        } else {
            g = u[1];
        }
        if (g != '') {
            let gg = g.split(/&|#/);
            var MaxI = gg.length;
            let str = arguments[0] + "=";
            for (let i = 0; i < MaxI; i++) {
                if (gg[i].indexOf(str) == 0) {
                    StrBack = gg[i].replace(str, "");
                    break;
                }
            }
        }
        return decodeURI(StrBack);
    }

	initCorp(){
		Config.native("getorglist")/*.then((res)=>{
			console.log(res)
			return res.data;
		})*/.then((data)=>{
			data = data.data;
			this.setState({corpList:data});
			if(this.getQuery('orgId')){
				cookie.save('orgId',this.getQuery('orgId'),{ path: '/' });
				localStorage.setItem('orgId',this.getQuery('orgId'));
			}
			let orgId= localStorage.getItem('orgId');
			let currCorp = {};
			if(orgId && orgId !="undefined"){
				data.forEach((item)=>{
					if(orgId==item.orgId){
						currCorp = item;
						//this.setState({currCorp:item});
					}
				})
			}else{
				currCorp = data[0];
				//this.setState({currCorp:data[0]});
			}
			//this.setState({currCorp:currCorp});
			this.select(currCorp);
		});
	}
	componentDidMount(){
		let _this = this;
		this.initCorp();
	}
	componentWillUnmount() {
	}
	select(obj){
		this.state.currCorp=obj;
		this.setState({currCorp:obj,expand:false});
		//cookie.save('orgId', obj.orgId, { path: '/' });
		localStorage.setItem('orgId',obj.orgId);
		localStorage.setItem('orgName',obj.orgName);
		this.bindSign();
		this.updateTime();
	}
	expandOrg(){
		this.setState({expand:!this.state.expand});
	}

	hideOrgList(){
		this.setState({expand:false})
	}
	hideSign(){
		this.setState({isShowSign:false});
	}
	renderDialog(){
		console.log(this.state.dialog)
		return <Dialog stage={this} {...this.state.dialog}/>
	}
	
	hideDialog(){
		this.setState({dialog:0})
	}
	
	render(){
		return (
			<div className="body">
				<Helmet title="审批"/>
				<div className="header">
					<div className="orgInfo">
					{
						(()=>{
							if(this.state.corpList.length >1){
								return (<div className="focusorg" onClick={this.expandOrg.bind(this)}>{this.state.currCorp.orgName} <i className={this.state.expand?"triangle up":"triangle down"}/></div>);
							}else{
								return (<div className="focusorg">{this.state.currCorp.orgName}</div>);
							}
						})()
					}
						<div className={this.state.expand?"orgList":"orgList hide"}>
						{
							(this.state.corpList||[]).map((item)=>{
								return <div className={item.orgId==this.state.currCorp.orgId?"focusorg":""} onClick={this.select.bind(this,item)}>{item.orgName}</div>
							})
						}
						</div>
					</div>
					{
					this.state.expand?
					<div className="mask" onClick={this.hideOrgList.bind(this)}>
					</div>:null
					}
				</div>
				<div className="menu">
				<a><i className="iconfont icon-111"/>待我审批</a>
				<a><i className="iconfont icon-112"/>我发起的</a>
				</div>
                {this.state.dialog?this.renderDialog():undefined}
			</div>
			)
	}
}