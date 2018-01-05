
let url={}  //导出url
let __host__ = '';
let __host1__ = '';
let _dev_api = false
global._dev_api = _dev_api

if(process.env.NODE_ENV == 'development'){
	if(_dev_api){
		__host__= 'http://scnc.mdslife.com/api/v1/'
		__host1__ = 'http://scnc.mdslife.com/'
	}else{
		__host__= 'https://m.scnc-sh.com/api/v1/'
		__host1__ = 'https://m.scnc-sh.com/'
	}
	
}else{
	__host__= location.origin+'/api/v1/'
	__host1__ = location.origin+'/'
}

Object.defineProperties(url, {
	get_qrcode_img:{value: __host1__ + `wechats/get_qrcode_img`},  //获取用二维码
	binding:{value: __host__ + 'users/binding'},  //获取用token
	home: {value: __host__ + 'home.jbuilder'},  //主页  get
	products: {value:(id)=>__host__ + `products/${id}.jbuilder`}, //详情页  get
	recommend: {value:(id)=> __host__ + `products/${id}/recommend.jbuilder`}, //详情页推荐列表 get
	collect:{value:(id)=> __host__ + `products/${id}/collect`}, //商品收藏  post
	classify:{value: __host__ + 'categories.jbuilder'}, //商品分类 get
	classify_detail:{value: (id)=>__host__ + `categories/${id}.jbuilder`}, //商品分类对应商品 get
	collections:{value: __host__ + `collections`}, //所有收藏商品 get
	cart: {value: __host__ + 'cart'}, //查看购物车 get
	clearCart:{value: __host__ + 'cart/del_cart'}, //清空购物车 DELETE
	addCart:{value: __host__ + 'cart/add_cart'}, // 添加购物车 POST
	addresses:{value: __host__ + 'addresses'}, // 获取地址信息 get
	addresses_default:{value: (id)=>__host__ + `addresses/${id}/default`}, // 设置默认地址 PUT
	addresses_del:{value: (id)=>__host__ + `addresses/${id}/del_addr`}, // 删除收获地址 DELETE
	pay:{value: (id)=>__host1__ + `pays/${id}/pay`}, // 支付
	addresses_add:{value: __host__ + 'addresses'}, // 新增收获地址 POST
	shippings:{value: __host__ + 'shippings'}, // 获取快递方式 get
	shipping_types:{value: __host__ + `shipping_types`}, // 获取配送类型 get
	orders:{value: __host__ + 'orders'}, // 提交订单 POST
	check_mobile:{value: __host__ + 'users/check_mobile'}, // 检查手机号是否可以绑定 get
	send_code:{value: __host__ + `users/send_code`}, // 发送验证码->绑定手机号 get
	binding_user:{value: __host__ + 'users/binding_user'}, // 绑定新手机号 POST
	binding_mobile:{value: __host__ + 'users/binding_mobile'}, // 换绑手机号 POST
	modify_password:{value: __host__ + 'users/modify_password'}, // 用户修改密码 POST
	balance:{value: __host__ + 'users/balance'}, // 获取钱包余额 get
	bank_cards:{value: __host__ + 'bank_cards'}, // 获取我的银行卡列表 get
	update_bank_card:{value: __host__ + 'bank_cards/update_bank_card'}, //  更改/新增银行卡信息 POST
	search_bank_types:{value: __host__ + `bank_cards/search_bank_types`}, // 搜索银行类型列表 get
	userInfo:{value: __host__ + 'users/info'}, // 获取用户信息 get
	trade_logs:{value: __host__ + 'trade_logs'}, // 获取钱包交易记录 get
	set_pay_password:{value: __host__ + 'users/set_pay_password'}, // 设置支付密码 POST
	check_pay_password:{value: __host__ + 'users/check_pay_password'}, // 验证原支付密码 POST
	point_logs:{value: __host__ + `point_logs`}, // 积分详情列表 get
	point_logs_month:{value: __host__ + `point_logs/month`}, // 积分详情列表查询 get
	myOrder:{value:__host__ + `orders.jbuilder`}, //我的订单 get
	del_order:{value:__host__ + `orders/del_order`}, //取消订单 FORM
	refunds_reasons:{value:__host__ + `refunds/reasons`}, //退款原因 get
	create_refund:{value:__host__ + `refunds/create_refund`}, //申请退款 FORM
	get_refund:{value:__host__ + `refunds/get_refund`}, //申请退款详情 FORM
	cancel_refund:{value:__host__ + `refunds/cancel_refund`}, //撤销申请 FORM
	confirm_receive:{value:__host__ + `orders/confirm_receive`}, //确认收货 FORM
	create_payment:{value:__host__ + `payments/create_payment`}, //创建支付 FORM
	use_balance:{value:__host__ + `users/use_balance`}, //余额支付 FORM
	get_trace:{value:__host__ + `shippings/get_trace`}, //查看物流信息 get
	withdraws:{value:__host__ + `users/withdraws`}, //钱包提现 FORM
	get_subjects:{value:__host__ + `articles/get_subjects`},//文章栏目 get
	get_articles:{value:__host__ + `articles/get_articles`}, //文章列表 get
	article_detail:{value: (id)=> __host__ + `articles/${id}/detail`}, //文章详情 get
	my_customer:{value: __host__ + `users/my_customer`}, //我的客户 get
	get_conversation:{value: __host__ + `conversations/get_conversation`}, //获取聊天室 get
	read_message:{value: __host__ + `messages/read_message`}, //设置消息已读 get
	get_expert_conversation:{value: __host__ + `conversations/get_expert_conversation`}, //获取专家聊天室 get
	refund_shipment:{value: __host__ + `shippings/refund_shipment`}, //退货物流信息
	save_comments:{value: __host__ + `comments/save_comments`}, //上传评论
	home_search:{value: __host__ + 'home/search'}, //首页搜索
	get_hot_keyword:{value: __host__ + 'home/get_hot_keyword'}, //首页搜索热词
	get_my_refund:{value: __host__ + 'refunds/get_my_refunds'}, //退货列表
	login:{value: __host__ + 'users/login'}, //用户登录
	share:{value: __host1__ +'wechats/share_config'}, //微信分享
	my_doctor_relations:{value: __host__ + 'users/my_doctor_relations'}, //获取医生客户
	get_product_comments:{value: __host__ + 'comments/get_product_comments'}, //查询评论
	pre_order:{value: __host__ + 'orders/pre_order'}, //结算接口
	get_order_info:{value: __host__ + 'orders/get_order_info'}, //选择支付页面
	scnc_users:{value: __host__ + 'scnc_users'}, //获取用户
	chat_enable:{value: __host__ + 'users/chat_enable'}, //设置聊天权限
	get_message:{value: __host__ + 'messages/get_message'}, //获取回话的最近消息
	get_unread_messages:{value: __host__ + 'messages/get_unread_messages'}, //获取未读消息
	alipay:{value: (id)=>__host1__ + `pays/${id}/alipay`}, //支付宝链接
});

export default url

