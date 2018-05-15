/**
 * Created by mds on 17/10/24.
 */
import {Toast} from 'antd-mobile';
export default (config={})=>{
	let jsApiList =[
		"onMenuShareTimeline", //分享到朋友圈
		"onMenuShareAppMessage", //分享给朋友
		"onMenuShareQQ", //分享给QQ
		"onMenuShareWeibo", //分享到微博
		"onMenuShareQZone", //分享到QQ空间
		"startRecord",
		"stopRecord",
		"onVoiceRecordEnd",
		"playVoice",
		"uploadVoice"
	]
	let shareUrl = location.href
	_fetch(url.share,{url:location.href})
		.then(data=>{
			wx.config({
				//debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId,
				timestamp: String(data.timestamp),
				nonceStr: data.noncestr,
				signature: data.sign,
				jsApiList,
			});
			wx.ready(function(){
				//下面的key:value全部格式正确才会有效果
				//发送给朋友
				wx.onMenuShareAppMessage({
					title: config.title || '上海儿童营养中心', // 分享标题
					desc: config.desc || '上海儿童营养中心专注儿童营养健康60年', // 分享描述
					link: config.link || shareUrl, // 分享链接
					imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg', // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
						Toast.info('分享成功！', 2)
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						Toast.info('分享已取消！', 2)
					}
				});
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: config.title || '上海儿童营养中心',
					link: config.link || shareUrl,
					imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg',
					success: function () {
						// 用户确认分享后执行的回调函数
						Toast.info('分享成功！', 2)
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						Toast.info('分享已取消！', 2)
					}
				});
				//分享到QQ
				wx.onMenuShareQQ({
					title: config.title || '上海儿童营养中心',
					desc: config.desc || '上海儿童营养中心专注儿童营养健康60年',
					link: config.link || shareUrl,
					imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg',
					success: function () {
						// 用户确认分享后执行的回调函数
						Toast.info('分享成功！', 2)
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						Toast.info('分享已取消！', 2)
					}

				});
				//分享到QQ空间
				wx.onMenuShareQZone({
					title: config.title || '上海儿童营养中心',
					desc: config.desc || '上海儿童营养中心专注儿童营养健康60年',
					link: config.link || shareUrl,
					imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg',
					success: function () {
						// 用户确认分享后执行的回调函数
						Toast.info('分享成功！', 2)
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						Toast.info('分享已取消！', 2)
					}

				});
				//分享到腾讯微博
				wx.onMenuShareWeibo({
					title: config.title || '上海儿童营养中心',
					desc: config.desc || '上海儿童营养中心专注儿童营养健康60年',
					link: config.link || shareUrl,
					imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg',
					success: function () {
						// 用户确认分享后执行的回调函数
						Toast.info('分享成功！', 2)
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
						Toast.info('分享已取消！', 2)
					}
				});

			});

			wx.error(function(res){
				console.log('fail-----------',res)
				location.reload()
			});
		})
}
