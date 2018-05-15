
export default async(url1 = '', params = {}, type = 'GET')=>{
	type = type.toUpperCase();
	let option = {}
	let str = '';

	//本地测试使用
	if(process.env.NODE_ENV == 'development'){
		if(_dev_api){
			//开发环境本地token
			localStorage.setItem('s_token','oC8jQwm0e_za5_1lKi57KDNHpmZc')
			//我：oC8jQwm0e_za5_1lKi57KDNHpmZc  营养师
			//HLL：oC8jQwkbMZP8XtFH3t3H0xMons_I 营养师
			//寒冰：oC8jQwugKmaM6Ibi6T5FtJMAGbtY
			//劳：oC8jQwqS_gbWPC0om8B4MXmV9vF8
		}else{
			//生产环境本地token
			localStorage.setItem('s_token','oGnc4wgPZaZjq94zrNMwzETF-Vgw')
			//我:oGnc4wjxj-8YECsCmsTJKw-eN9R4  消费者
			//劳：oGnc4wkenrk5SYcMsnVmk67I3z0E  营养师
			//落：oGnc4wuj_jEAMvrrPyj_iqH6GYW4 业务员
			//叶姐： oGnc4wqjhLidZKk-ba0jYcDH9F8g
			//飞羽：oGnc4wpNOQMRcKdWoYrHb2NM46Ps
		}
	}

	let token = localStorage.getItem('s_token')
	if(!token){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			await fetchJsonp(url.binding)
				.then((response)=>{
					return response.json()
				})
				.then((data)=>{
					localStorage.setItem('s_token',data.token)
					token = data.token
				})
		}
	}

	let tokenParams =Object.assign({token:token},params)
	//GET url
	if(type !== 'POST'){
		Object.keys(tokenParams).map((key)=>{
			str += key + '=' + tokenParams[key] + '&';
		})
		url1 = url1 + '?' + str.slice(0, -1)
	}
	//设置请求头
	if(type !== 'GET'){
		if(type == 'POST'){
			option = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(tokenParams)
			}
		}else if(type == 'UPLOAD'){  //formData形式上传图片不加content-type
			option = {
				method:'POST',
				body: params
			}
		}else{
			option = {
				method: type == 'FORM' ? 'POST' : type,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				},
				body: str.slice(0, -1)
			}
		}
	}

	//请求
	try {
		const response = await fetch(url1, option);
		const responseJson = await response.json();
		return responseJson
	} catch (error) {
		throw new Error(error)
	}
}
