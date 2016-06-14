import React from 'react';
import LocaleUtils from "react-day-picker/moment";
import 'moment/locale/zh-cn';
import DayPicker from 'react-day-picker';
export default class Calendar extends React.Component{
	constructor(props){
		super(props);
		this.state={title:props.title,current:null};
	}
	componentDidUpdate(){
		document.querySelector('.DayPicker-Caption').innerHTML=this.props.myTitle;
	}
	renderDay(d){
		//console.log(arguments)
		//this.setState({title:+new Date()})
		let cls = 'normal';
		let _this = this;
		let wq = ''
		_this.props.list.forEach((item,index)=>{
			if(index+1 == d.getDate()){
				if(item <128){
					if(item >0){//工作日
						cls += " ok";
					}
					if(item == 3){
						//外勤
						wq=<i>外</i>
					}
				}else{
					cls += " error";
				}

			}
		});
		if(d.getDate() == +new Date()){
			cls+='now';
		}
		return <div className={cls}>{d.getDate()}{wq}</div>;
	}
    onMonthChange(d){
		let now = new Date(d)
		let dateStr=now.getFullYear()+"年"+now.getMonth()+"月"
    	this.setState({title:dateStr})
    	this.props.parentCallback(now);
    }
    onDayClick(e,d,obj){
    	console.log(arguments)
    	if(this.state.current){
    		this.state.current.elem.className=this.state.current.elem.className.replace('focus','');
    	}
    	e.target.className+=" focus";
    	this.setState({current:{elem:e.target,date:d}});
    	this.props.parentDayClick(d);
    }
	render(){
		return (
			<div>
				<DayPicker
					onMonthChange = {this.onMonthChange.bind(this)}
					renderDay = {this.renderDay.bind(this)}
					localeUtils={LocaleUtils}
					locale="zh_cn"
					onDayClick={this.onDayClick.bind(this)} 
		          />
		    </div>
			);
	}
}