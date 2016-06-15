//import 'whatwg-fetch';
import qwest from  'qwest';

import '../Page/App/_App.scss';
import '../Component/_Dialog.scss';

import cookie from 'react-cookie';
import './bridge';
/*window.setSmallMap=(d)=>{
	alert(JSON.parse(d).lng)
}*/
let Config = {
	ajax: function(url,param) {
		//测试
		//cookie.save('userId','82977736', { path: '/' });
		var args = Array.prototype.slice.call(arguments, 0);
		args[0] = "/mock/"+ args[0]+".json";
		/*if(typeof args[1]=="string"){
			args[0]+="?"+args[1];
			args.pop();
		}*/
		args[0]=this.makeUrl(url,param);
		/*return fetch.apply(null,args).then((response) => {
			return response.json()
		});*/
		let method = 'get';
		let data = {}
		typeof param=="string" ?null:data=param ;
		let t = null;
		if(typeof args[1]=="object"){
			method = args[1].method.toLowerCase()
			//alert(JSON.stringify(args[1].body))
			data = JSON.parse(args[1].body);
			//alert(JSON.stringify(data))
			t = args[1].headers? {dataType:"json"}:null;
			if(args[1].urlParam){
				args[0]+="&"+args[1].urlParam;
			}
			method='post'
		}
		//qwest.setDefaultDataType('json');
		return qwest[method](args[0],data,t).then((res,data)=>{
			return data;
		})
	},
	makeUrl:function(key,param){
		//alert(document.cookie)
		CONFIG.domain=CONFIG.domain||"http://10.1.40.6/";
		var domain = CONFIG.domain+'signin/api/';
		var orgId = cookie.load('orgId') || localStorage.getItem('orgId');
		/*if(typeof param != "string"){
			param='?debug=true&uid='+cookie.load('userId')+'&orgId='+orgId;
		}else{
			param='?debug=true&uid='+cookie.load('userId')+'&orgId='+orgId+"&"+param;
		}*/
		if(typeof param != "string"){
			param='?orgId='+orgId;
		}else{
			param='?orgId='+orgId+"&"+param;
		}
		switch(key){
			case "getDaySign":{
				return domain+'get/historyOfDay.json'+param
				break;
			}
		}
	},
	native: function(method, data) {
		//window.locateIOS&&window.locateIOS();
		let isAndr = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
		let orgId = localStorage.getItem('orgId');
		let orgName = localStorage.getItem('orgName');
		var t = null;
		switch(method){
			case "getPosition":{
				window.setSmallMap =function(data){
		            data = JSON.parse(data);
		            let result ={
		            	code :200,
		            	data:[data.lng,data.lat]
		            };
		            if(data.lng == '' || data.lng == '0.0'){
		            	result.code = 500;
		            }
		            t && t.call(null,result)
				};
				if(!isAndr){
					window.locateIOS&&locateIOS();
				}else{
					window.Native_Bridge_uban.onJsCall('setSmallMap','locate');
				}
				return {
					then:function(f){
						t =f;
					}
				}
				break;
			}
			default:{
				setTimeout(()=>{
					window.JSBridge.requestHybrid({
	                    method: method,
	                    data: data,
	                    callback: function (result) {
	                        t && t(result)
	                    }
	                });
				},0)
				return {
					then:function(f){
						t =f;
					}
				}
				break;
			}
		}

		return fetch("/mock/" + method + ".json").then((response) => {
			return response.json()
		});
	}
}
export default Config;