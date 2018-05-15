import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as otherAction from '@/actions/other';

const TabBar = (location, cb) => {require.ensure([], require => {cb(null, require('~/TabBar').default)})}; //主页Tab
const GoodsDetail = (location, cb) => {require.ensure([], require => {cb(null, require('~/GoodsDetail').default)})}; //商品详情
const Order = (location, cb) => {require.ensure([], require => {cb(null, require('~/Order').default)})}; //订单
const AddAddress = (location, cb) => {require.ensure([], require => {cb(null, require('~/AddAddress').default)})};//新增收获地址
const ManageAddress = (location, cb) => {require.ensure([], require => {cb(null, require('~/ManageAddress').default)})};//管理收获地址
const ManageAddressCanBack = (location, cb) => {require.ensure([], require => {cb(null, require('~/ManageAddressCanBack').default)})};//管理收获地址->可返回
const OrderBuy = (location, cb) => {require.ensure([], require => {cb(null, require('~/OrderBuy').default)})};//订单确认页面
const OrderBuyPay = (location, cb) => {require.ensure([], require => {cb(null, require('~/OrderBuyPay').default)})};//订单确认支付页面
const OrderPayResult = (location, cb) => {require.ensure([], require => {cb(null, require('~/OrderPayResult').default)})};//订单确认支付结果页面  和下面的一样
const PayResult = (location, cb) => {require.ensure([], require => {cb(null, require('~/PayResult').default)})};//订单支付结果页面 用这个 和上面一样
const MyOrder = (location, cb) => {require.ensure([], require => {cb(null, require('~/MyOrder').default)})};//我的订单
const OrderDetail = (location, cb) => {require.ensure([], require => {cb(null, require('~/OrderDetail').default)})};//订单详情
const BindAccount = (location, cb) => {require.ensure([], require => {cb(null, require('~/BindAccount').default)})};//绑定账号
const BindAccount2 = (location, cb) => {require.ensure([], require => {cb(null, require('~/BindAccount/index1.js').default)})};//绑定账号
const ManageAccount = (location, cb) => {require.ensure([], require => {cb(null, require('~/ManageAccount').default)})};//账号管理
const changeBind = (location, cb) => {require.ensure([], require => {cb(null, require('~/ManageAccount/changeBind').default)})};//账号管理
const changeBind2 = (location, cb) => {require.ensure([], require => {cb(null, require('~/ManageAccount/changeBind2').default)})};//账号管理
const changePassword = (location, cb) => {require.ensure([], require => {cb(null, require('~/ManageAccount/changePassword').default)})};//账号管理
const MyWallet = (location, cb) => {require.ensure([], require => {cb(null, require('~/MyWallet').default)})};//我的钱包
const WalletFull = (location, cb) => {require.ensure([], require => {cb(null, require('~/WalletFull').default)})};//钱包充值
const WalletPayResult = (location, cb) => {require.ensure([], require => {cb(null, require('~/WalletPayResult').default)})};//钱包充值
const MyBank = (location, cb) => {require.ensure([], require => {cb(null, require('~/MyBank').default)})};//我的银行卡
const TradingRecord = (location, cb) => {require.ensure([], require => {cb(null, require('~/TradingRecord').default)})};//我的银行卡
const Deposit = (location, cb) => {require.ensure([], require => {cb(null, require('~/Deposit').default)})};//提现
const DepositResult = (location, cb) => {require.ensure([], require => {cb(null, require('~/DepositResult').default)})};//提现
const PaySet = (location, cb) => {require.ensure([], require => {cb(null, require('~/PaySet').default)})};//支付设置
const PasswordSet = (location, cb) => {require.ensure([], require => {cb(null, require('~/PaySet/passwordSet').default)})};//支付设置 修改密码
const keyboard1 = (location, cb) => {require.ensure([], require => {cb(null, require('~/PaySet/keyboard1').default)})};//支付设置 键盘1
const keyboard2 = (location, cb) => {require.ensure([], require => {cb(null, require('~/PaySet/keyboard2').default)})};//支付设置 键盘2
const keyboard3 = (location, cb) => {require.ensure([], require => {cb(null, require('~/PaySet/keyboard3').default)})};//支付设置 键盘3
const MyCollection = (location, cb) => {require.ensure([], require => {cb(null, require('~/MyCollection').default)})};//我的收藏
const MyBonus = (location, cb) => {require.ensure([], require => {cb(null, require('~/MyBonus').default)})};//我的积分
const RecommendBonus = (location, cb) => {require.ensure([], require => {cb(null, require('~/RecommendBonus').default)})};//推荐积分
const MyQRCode = (location, cb) => {require.ensure([], require => {cb(null, require('~/MyQRCode').default)})};//我的二维码
const RecommendOrder = (location, cb) => {require.ensure([], require => {cb(null, require('~/RecommendOrder').default)})};//推荐订单
const RecommendOrderRepresent = (location, cb) => {require.ensure([], require => {cb(null, require('~/RecommendOrder/RecommendOrderRepresent').default)})};//推荐订单-代表
const MyCustomer = (location, cb) => {require.ensure([], require => {cb(null, require('~/MyCustomer').default)})};//我的客户
const Chat = (location, cb) => {require.ensure([], require => {cb(null, require('~/Chat').default)})};//聊天室
const DealSuccess = (location, cb) => {require.ensure([], require => {cb(null, require('~/DealSuccess').default)})};//交易成功页面
const ArticleDetail = (location, cb) => {require.ensure([], require => {cb(null, require('~/ArticleDetail').default)})};//首页专栏详情页
const ZouJinShangEr = (location, cb) => {require.ensure([], require => {cb(null, require('~/ZouJinShangEr').default)})};//首页走进上儿
const ShangErYanJiuYuan = (location, cb) => {require.ensure([], require => {cb(null, require('~/ShangErYanJiuYuan').default)})};//上儿研究院
const ShangErZhuanJia = (location, cb) => {require.ensure([], require => {cb(null, require('~/ShangErZhuanJia').default)})};// 上儿专家委员会
const SuZuFeiXueYuan = (location, cb) => {require.ensure([], require => {cb(null, require('~/SuZuFeiXueYuan').default)})};// 苏祖斐学院
const KePuJY = (location, cb) => {require.ensure([], require => {cb(null, require('~/KePuJY').default)})};// 科普教育
const Drawback = (location, cb) => {require.ensure([], require => {cb(null, require('~/Drawback').default)})};//申请退款
const DrawbackDetail = (location, cb) => {require.ensure([], require => {cb(null, require('~/DrawbackDetail').default)})};//申请退款详情页
const ApplyBackLogisticsEdit = (location, cb) => {require.ensure([], require => {cb(null, require('~/ApplyBackLogistics/apply').default)})};//退货物流信息编辑页
const ApplyBackLogistics = (location, cb) => {require.ensure([], require => {cb(null, require('~/ApplyBackLogistics/').default)})};//退货物流信息展示页
const CheckLogistics = (location, cb) => {require.ensure([], require => {cb(null, require('~/CheckLogistics/').default)})};//查看发货物流
const WalletPay = (location, cb) => {require.ensure([], require => {cb(null, require('~/WalletPay').default)})};//钱包充值 支付页
const ExpertChat = (location, cb) => {require.ensure([], require => {cb(null, require('~/ExpertChat').default)})};//专家咨询
const Evaluation = (location, cb) => {require.ensure([], require => {cb(null, require('~/Evaluation').default)})};//评价显示页面
const Evaluate = (location, cb) => {require.ensure([], require => {cb(null, require('~/Evaluate').default)})};//评价
const AfterSale = (location, cb) => {require.ensure([], require => {cb(null, require('~/AfterSale').default)})};//退款列表
const OldAccount = (location, cb) => {require.ensure([], require => {cb(null, require('~/OldAccount').default)})};//老用户登录
const ComingSoon = (location, cb) => {require.ensure([], require => {cb(null, require('~/ComingSoon').default)})};//敬请期待
const goChat = (location, cb) => {require.ensure([], require => {cb(null, require('~/goChat').default)})};//判断聊天室去向
const IntegralMall = (location, cb) => {require.ensure([], require => {cb(null, require('~/IntegralMall').default)})};//积分商城首页
const FriendsHelp = (location, cb) => {require.ensure([], require => {cb(null, require('~/FriendsHelp').default)})};//好友助力
const FriendsHelpShare = (location, cb) => {require.ensure([], require => {cb(null, require('~/FriendsHelpShare').default)})};//好友助力分享页
const ZhuLiRank = (location, cb) => {require.ensure([], require => {cb(null, require('~/ZhuLiRank').default)})};//助力排行榜
const GuanZhuPage = (location, cb) => {require.ensure([], require => {cb(null, require('~/GuanZhuPage').default)})};//关注页
const ExchangeRecord = (location, cb) => {require.ensure([], require => {cb(null, require('~/ExchangeRecord').default)})};//兑换记录
const MallDetail = (location, cb) => {require.ensure([], require => {cb(null, require('~/MallDetail').default)})};//商品详情
const DuiHuanPage = (location, cb) => {require.ensure([], require => {cb(null, require('~/DuiHuanPage').default)})};//兑换成功页

const Login = (location, cb) => {require.ensure([], require => {cb(null, require('~/Login').default)})};
const Forget = (location, cb) => {require.ensure([], require => {cb(null, require('~/Forget').default)})};
const Signup = (location, cb) => {require.ensure([], require => {cb(null, require('~/Signup').default)})};
const SignupNext = (location, cb) => {require.ensure([], require => {cb(null, require('~/Signup/next').default)})};

class Routers extends Component {

	componentDidMount(){
		// 获取用户信息
		_fetch(url.userInfo)
			.then(data =>{
				this.props.changeUser(data)
			})
	}
	setTitleAndShare = (title)=>{
		document.title = title
	}
	render() {

		return (
			<Router history={browserHistory}>
				<Route path='/' getComponent={TabBar} onEnter={()=>this.setTitleAndShare('商城首页')}></Route>
				<Route path='/gerenzhongxin' getComponent={TabBar} onEnter={()=>this.setTitleAndShare('个人中心')}></Route>
				<Route path='/GoodsDetail/:id' getComponent={GoodsDetail} onEnter={()=>this.setTitleAndShare('商品详情')}></Route>
				<Route path='/Order/:items' getComponent={Order} onEnter={()=>this.setTitleAndShare('提交订单')}></Route>
				<Route path='/AddAddress' getComponent={AddAddress} onEnter={()=>this.setTitleAndShare('新增地址')}></Route>
				<Route path='/ManageAddress' getComponent={ManageAddress} onEnter={()=>this.setTitleAndShare('管理地址')}></Route>
				<Route path='/ManageAddressCanBack' getComponent={ManageAddressCanBack} onEnter={()=>this.setTitleAndShare('管理地址')}></Route>
				<Route path='/OrderBuy/:order_no' getComponent={OrderBuy} onEnter={()=>this.setTitleAndShare('确认订单')}></Route>
				<Route path='/OrderBuyPay' getComponent={OrderBuyPay} onEnter={()=>this.setTitleAndShare('订单支付')}></Route>
				<Route path='/OrderPayResult' getComponent={OrderPayResult} onEnter={()=>this.setTitleAndShare('支付结果')}></Route>
				<Route path='/PayResult' getComponent={PayResult} onEnter={()=>this.setTitleAndShare('支付结果')}></Route>
				<Route path='/MyOrder/:id' getComponent={MyOrder} onEnter={()=>this.setTitleAndShare('我的订单')}></Route>
				<Route path='/OrderDetail/:order_no' getComponent={OrderDetail} onEnter={()=>this.setTitleAndShare('订单详情')}></Route>
				<Route path='/BindAccount' getComponent={BindAccount} onEnter={()=>this.setTitleAndShare('绑定账号')}></Route>
				<Route path='/BindAccount2' getComponent={BindAccount2} onEnter={()=>this.setTitleAndShare('绑定账号')}></Route>
				<Route path='/ManageAccount' getComponent={ManageAccount} onEnter={()=>this.setTitleAndShare('管理账号')}></Route>
				<Route path='/changeBind' getComponent={changeBind} onEnter={()=>this.setTitleAndShare('更改绑定')}></Route>
				<Route path='/changeBind2' getComponent={changeBind2} onEnter={()=>this.setTitleAndShare('更改绑定')}></Route>
				<Route path='/changePassword' getComponent={changePassword} onEnter={()=>this.setTitleAndShare('修改密码')}></Route>
				<Route path='/MyWallet'>
					<IndexRoute  getComponent={MyWallet} onEnter={()=>this.setTitleAndShare('我的钱包')}></IndexRoute>
					<Route path='WalletFull' getComponent={WalletFull} onEnter={()=>this.setTitleAndShare('钱包充值')}></Route>
					<Route path='WalletPay' getComponent={WalletPay} onEnter={()=>this.setTitleAndShare('钱包支付')}></Route>
					<Route path='WalletPayResult' getComponent={WalletPayResult} onEnter={()=>this.setTitleAndShare('支付结果')}></Route>
					<Route path='Deposit' getComponent={Deposit} onEnter={()=>this.setTitleAndShare('钱包提现')}></Route>
					<Route path='DepositResult' getComponent={DepositResult} onEnter={()=>this.setTitleAndShare('提现结果')}></Route>
					<Route path='MyBank' getComponent={MyBank} onEnter={()=>this.setTitleAndShare('我的银行卡')}></Route>
					<Route path='TradingRecord' getComponent={TradingRecord} onEnter={()=>this.setTitleAndShare('交易记录')}></Route>
					<Route path='PaySet'>
						<IndexRoute  getComponent={PaySet} onEnter={()=>this.setTitleAndShare('支付设置')}></IndexRoute>
						<Route path='PasswordSet' getComponent={PasswordSet} onEnter={()=>this.setTitleAndShare('密码设置')}></Route>
						<Route path='keyboard1' getComponent={keyboard1} onEnter={()=>this.setTitleAndShare('安全键盘')}></Route>
						<Route path='keyboard2' getComponent={keyboard2} onEnter={()=>this.setTitleAndShare('安全键盘')}></Route>
						<Route path='keyboard3' getComponent={keyboard3} onEnter={()=>this.setTitleAndShare('安全键盘')}></Route>
					</Route>
				</Route>
				<Route path='/MyCollection' getComponent={MyCollection} onEnter={()=>this.setTitleAndShare('我的收藏')}></Route>
				<Route path='/MyBonus' getComponent={MyBonus} onEnter={()=>this.setTitleAndShare('我的积分')}></Route>
				<Route path='/RecommendBonus' getComponent={RecommendBonus} onEnter={()=>this.setTitleAndShare('推荐积分')}></Route>
				<Route path='/MyQRCode' getComponent={MyQRCode} onEnter={()=>this.setTitleAndShare('我的二维码')}></Route>
				<Route path='/RecommendOrder' getComponent={RecommendOrder} onEnter={()=>this.setTitleAndShare('推荐订单')}></Route>
				<Route path='/RecommendOrderRepresent' getComponent={RecommendOrderRepresent} onEnter={()=>this.setTitleAndShare('推荐订单')}></Route>
				<Route path='/MyCustomer'>
					<IndexRoute  getComponent={MyCustomer} onEnter={()=>this.setTitleAndShare('我的客户')}></IndexRoute>
					<Route path='Chat' getComponent={Chat} onEnter={()=>this.setTitleAndShare('聊天室')}></Route>
				</Route>
				<Route path='/DealSuccess' getComponent={DealSuccess} onEnter={()=>this.setTitleAndShare('交易成功')}></Route>

				<Route path='/ZouJinShangEr' getComponent={ZouJinShangEr} onEnter={()=>this.setTitleAndShare('走进上儿')}></Route>
				<Route path='/ShangErYanJiuYuan' getComponent={ShangErYanJiuYuan} onEnter={()=>this.setTitleAndShare('上儿研究院')}></Route>
				<Route path='/ShangErZhuanJia' getComponent={ShangErZhuanJia} onEnter={()=>this.setTitleAndShare('上儿专家')}></Route>
				<Route path='/SuZuFeiXueYuan' getComponent={SuZuFeiXueYuan} onEnter={()=>this.setTitleAndShare('苏祖斐学院')}></Route>

				<Route path='/KePuJY' getComponent={KePuJY} onEnter={()=>this.setTitleAndShare('科普教育')}>
					<Route path=':id' getComponent={ArticleDetail} onEnter={()=>this.setTitleAndShare('文章详情')}></Route>
				</Route>

				<Route path='/Drawback' getComponent={Drawback} onEnter={()=>this.setTitleAndShare('退货')}></Route>
				<Route path='/DrawbackDetail/:refund_id' getComponent={DrawbackDetail} onEnter={()=>this.setTitleAndShare('退货详情')}></Route>
				<Route path='/ApplyBackLogisticsEdit' getComponent={ApplyBackLogisticsEdit} onEnter={()=>this.setTitleAndShare('编辑物流')}></Route>
				<Route path='/ApplyBackLogistics' getComponent={ApplyBackLogistics} onEnter={()=>this.setTitleAndShare('物流')}></Route>
				<Route path='/CheckLogistics' getComponent={CheckLogistics} onEnter={()=>this.setTitleAndShare('物流')}></Route>
				<Route path='/ExpertChat' getComponent={ExpertChat} onEnter={()=>this.setTitleAndShare('聊天室')}></Route>
				<Route path='/goChat' getComponent={goChat} onEnter={()=>this.setTitleAndShare('聊天室')}></Route>
				<Route path='/Evaluation/:id' getComponent={Evaluation} onEnter={()=>this.setTitleAndShare('商品评价')}></Route>
				<Route path='/Evaluate' getComponent={Evaluate} onEnter={()=>this.setTitleAndShare('商品评价')}></Route>
				<Route path='/AfterSale' getComponent={AfterSale} onEnter={()=>this.setTitleAndShare('退货列表')}></Route>
				<Route path='/OldAccount' getComponent={OldAccount} onEnter={()=>this.setTitleAndShare('账户绑定')}></Route>
				<Route path='/ComingSoon' getComponent={ComingSoon} onEnter={()=>this.setTitleAndShare('敬请期待')}></Route>
				<Route path='/IntegralMall' getComponent={IntegralMall} onEnter={()=>this.setTitleAndShare('积分商城')}></Route>
				<Route path='/FriendsHelp' getComponent={FriendsHelp} onEnter={()=>this.setTitleAndShare('好友助力')}></Route>
				<Route path='/FriendsHelpShare/:token' getComponent={FriendsHelpShare} onEnter={()=>this.setTitleAndShare('好友助力')}></Route>
				<Route path='/ZhuLiRank' getComponent={ZhuLiRank} onEnter={()=>this.setTitleAndShare('助力排行榜')}></Route>
				<Route path='/GuanZhuPage' getComponent={GuanZhuPage} onEnter={()=>this.setTitleAndShare('关注上儿')}></Route>
				<Route path='/ExchangeRecord' getComponent={ExchangeRecord} onEnter={()=>this.setTitleAndShare('兑换记录')}></Route>
				<Route path='/MallDetail/:id(/:record)' getComponent={MallDetail} onEnter={()=>this.setTitleAndShare('商品详情')}></Route>
				<Route path='/DuiHuanPage/:id' getComponent={DuiHuanPage} onEnter={()=>this.setTitleAndShare('兑换成功')}></Route>
				
				<Route path='/Login' getComponent={Login} onEnter={()=>this.setTitleAndShare('用户登录')}></Route>
				<Route path='/Forget' getComponent={Forget} onEnter={()=>this.setTitleAndShare('忘记密码')}></Route>
				<Route path='/Signup' getComponent={Signup} onEnter={()=>this.setTitleAndShare('用户注册')}></Route>
				<Route path='/SignupNext' getComponent={SignupNext} onEnter={()=>this.setTitleAndShare('完善资料')}></Route>

			</Router>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(otherAction, dispatch)

export default connect(null, mapDispatchToProps)(Routers);

