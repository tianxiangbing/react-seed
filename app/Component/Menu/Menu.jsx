// import {Component} from 'react';
import React from 'react';
let {Component} = React;
import Styles from './_Menu.scss';

export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state={openMore:false};
    }
    openMoreMenu(){
        this.setState({openMore:!this.state.openMore});
    }
    render(){
        return (
        <div className="menu">
            <i className="iconfont icon-203 foward" onClick={()=>history.back()}/>
            {this.props.children}
            <i className="iconfont icon-caidan1 more" onClick={this.openMoreMenu.bind(this)}/>
            {
           this.state.openMore? <div className="more-menu">
                 <div className="item">菜单一</div>
            </div>:undefined
           }
        </div>
        )
    }
}