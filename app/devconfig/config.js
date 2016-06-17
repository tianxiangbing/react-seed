//import 'whatwg-fetch';
import qwest from 'qwest';

import "cssconfig.js";

import cookie from 'react-cookie';
import './bridge';
/*window.setSmallMap=(d)=>{
	alert(JSON.parse(d).lng)
}*/
let Config = {
	ajaxList: {},
	ajax: function(url, param) {
		//测试
		//cookie.save('userId','82977736', { path: '/' });
		var args = Array.prototype.slice.call(arguments, 0);
		args[0] = "/mock/" + args[0] + ".json";
		/*if(typeof args[1]=="string"){
			args[0]+="?"+args[1];
			args.pop();
		}*/
		args[0] = this.makeUrl(url, param);
		/*return fetch.apply(null,args).then((response) => {
			return response.json()
		});*/
		let method = 'get';
		let data = {}
		typeof param == "string" ? null : data = param;
		let t = null;
		if (typeof args[1] == "object") {
			method = args[1].method.toLowerCase()
				//alert(JSON.stringify(args[1].body))
			data = JSON.parse(args[1].body);
			//alert(JSON.stringify(data))
			t = args[1].headers ? {
				dataType: "json"
			} : null;
			if (args[1].urlParam) {
				args[0] += "&" + args[1].urlParam;
			}
			method = 'post'
		}
		//qwest.setDefaultDataType('json');

		for (let key in this.ajaxList) {
			if (args[0] == this.ajaxList[key]) {
				console.log('loading...')
				return {
					then: function() {}
				}; //正在请求
			}
		}
		this.ajaxList[+new Date()] = args[0]
		this.deleteUrl();
		return qwest[method](args[0], data, t).then((res, data) => {
			for (let key in this.ajaxList) {
				if (args[0] == this.ajaxList[key]) {
					delete this.ajaxList[key];
				}
			}
			return data;
		})
	},
	deleteUrl: function() {
		setTimeout(function() {
			for (let key in this.ajaxList) {
				if (key + 1000 < +new Date()) {
					delete this.ajaxList[key];
				}
			}
		}, 1000)
	},
	makeUrl: function(key, param) {
		//alert(document.cookie)
		CONFIG.domain = CONFIG.domain || "http://10.1.40.6/";
		var domain = CONFIG.domain + 'signin/api/';
		var orgId = cookie.load('orgId') || localStorage.getItem('orgId');
		/*if(typeof param != "string"){
			param='?debug=true&uid='+cookie.load('userId')+'&orgId='+orgId;
		}else{
			param='?debug=true&uid='+cookie.load('userId')+'&orgId='+orgId+"&"+param;
		}*/
		if (typeof param != "string") {
			param = '?orgId=' + orgId;
		} else {
			param = '?orgId=' + orgId + "&" + param;
		}
		switch (key) {
			case "getDaySign":
				{
					return domain + 'get/historyOfDay.json' + param
					break;
				}
			case "getTime":
				{
					return domain + 'get/orgTime.json' + param
					break;
				}
			case "sign":
				{
					return domain + 'sign.json' + param
					break;
				}
			case 'upload':
				{
					return domain + 'upload/images.json' + param
					break;
				}
			case 'historyOfMonth':
				{
					return domain + 'get/historyOfMonth.json' + param
				}
			case 'historyOfDay':
				{
					//他人外勤
					return domain + 'get/other/out/historyOfDay.json' + param
				}
		}
	},
	native: function(method, data) {
		//window.locateIOS&&window.locateIOS();
		let isAndr = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
		let orgId = localStorage.getItem('orgId');
		let orgName = localStorage.getItem('orgName');
		var t = null;
		switch (method) {
			case "getPosition":
				{
					window.setSmallMap = function(data) {
						data = JSON.parse(data);
						let result = {
							code: 200,
							data: [data.lng, data.lat]
						};
						if (data.lng == '' || data.lng == '0.0') {
							result.code = 500;
						}
						t && t.call(null, result)
					};
					if (!isAndr) {
						window.locateIOS && locateIOS();
					} else {
						window.Native_Bridge_uban.onJsCall('setSmallMap', 'locate');
					}
					return {
						then: function(f) {
							t = f;
						}
					}
					break;
				}
			case 'getorglist':
				{
					window.indexBind = function(data) {
						data = JSON.parse(decodeURI(data));
						let result = {
							code: 200,
							data: data
						};
						t && t.call(null, result)
					};
					if (!isAndr) {
						window.getOrgIOS && window.getOrgIOS();
					} else {
						window.Native_Bridge_uban.onJsCall('indexBind', 'getOrginfo');
					}
					return {
						then: function(f) {
							t = f;
						}
					}
					break;
				}
			case 'selectPictures':
				{
					//window.selectPictureIOS&&window.selectPictureIOS(data.count,data.sum);
					window.selectPicturesFromJs = function(data) {
						data = JSON.parse(decodeURI(data));
						let result = {
							code: 200,
							data: data
						};
						t && t.call(null, result)
					};
					if (!isAndr) {
						window.selectPictureIOS && window.selectPictureIOS(data.count, data.sum);
					} else {
						window.Native_Bridge_uban.onJsCall('selectPicturesFromJs', 'selectPicture', data.count + "&" + data.sum);
					}
					return {
						then: function(f) {
							t = f;
						}
					}
					break;
				}
			case 'selectPeopleIOS':
				{
					//window.selectPeopleIOS&&window.selectPeopleIOS("500",localStorage.getItem('orgId'),localStorage.getItem('orgName'));
					window.selectPeopleFromJs = function(data) {
						data = JSON.parse(data);
						let result = {
							code: 200,
							data: data
						};
						t && t.call(null, result)
					};
					if (!isAndr) {
						window.selectPeopleIOS && window.selectPeopleIOS("500", orgId, orgName);
					} else {
						//alert("500&"+orgId+"&"+orgName)
						window.Native_Bridge_uban.onJsCall('selectPeopleFromJs', 'selectPeople', "500&" + orgId + "&" + orgName);
					}
					return {
						then: function(f) {
							t = f;
						}
					}
					break;
				}
			case 'showImage':
				{
					if (!isAndr) {
						window.viewPicturesIOS && window.viewPicturesIOS(data.position, JSON.stringify(data.picsArr));
					} else {
						location.href = 'uban://start/showImage?position=' + data.position + '&urls=' + JSON.stringify(data.picsArr);
					}
					return {
						then: function(f) {
							t = f;
						}
					}
					break;
				}
			default:
				{
					setTimeout(() => {
						window.JSBridge.requestHybrid({
							method: method,
							data: data,
							callback: function(result) {
								t && t(result)
							}
						});
					}, 0)
					return {
						then: function(f) {
							t = f;
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