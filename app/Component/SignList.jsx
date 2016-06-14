import React from 'react';
import Config from 'config';

let {Component} = React;
export default class SignList extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		//alert(JSON.stringify(this.props.recordList) )
	}
	formatTime(time){
		let timeStr = new Date(time);
		timeStr = ("0"+timeStr.getHours()).slice(-2)+' : '+("0"+timeStr.getMinutes()).slice(-2);
		return timeStr;
	}
	showImage(position,arr){
		Config.native('showImage',{position:position,picsArr:arr});
	}
	renderImg(item){
		let arr =[];
		if(typeof item.images=="string"){
			//alert(item.images)
			arr=JSON.parse(item.images.replace(/\\/gi,''))
		}else if(typeof item.images=="object"){
			arr=item.images;
		}
		return (arr).map((img,index)=>{
			return <img src={img} onClick={this.showImage.bind(this,index,arr)}/>
		})
	}
	render(){
		return (
				<div>
					<div className="listSign">
					{
						(this.props.recordList||[]).map((item)=>{
							return (
								<div className={"item "+item.className}>
									<div className="time">{this.formatTime(item.time)}</div>
									<div className="desc">
										<div className="title">{item.title}</div>
										<div className="position"><i className="iconfont icon-qiandaodingwei"/>{item.shortPlaceName}</div>
										{
											(()=>{
												if(item.type==2||item.type==1){
													return <div className="remark">{item.remark}</div>
												}
											})()
										}
										<div className="imgList">
										{
											this.renderImg(item)
										}
										</div>
									</div>
								</div>
								)
						})
					}
					</div>
					<div className="nodata">{this.props.showText}</div>
				</div>
				)
	}
}