import {combineReducers} from 'redux';

import tabBar from './tabBar';
import _search from './search';
import other from './other'
import cart from './cart';
import classify from './classify';
import order from './order';
import addAddress from './addAddress';
import manageAddress from './manageAddress';
import bindAccount from './bindAccount';
import manageAccount from './manageAccount';
import walletFull from './walletFull';
import myBank from './myBank';
import paySet from './paySet';
import drawBack from './drawBack';
import applyBackLogistics from './applyBackLogistics';
import shipping from './shipping';
import evaluate from './evaluate';

const reducersApp = combineReducers({
	tabBar,
	_search, //搜索
	cart, //购物列表
	other, //商品详情
	classify, //分类
	order, //确认订单
	addAddress, //新增收获地址
	manageAddress, //管理收获地址
	bindAccount, //账号绑定
	manageAccount, //账号管理
	walletFull, //钱包充值
	myBank, //我的银行卡
	paySet, //支付设置
	drawBack, //申请退款表单
	applyBackLogistics, //退货物流
	shipping, //查看物流
	evaluate, //评论
});

export default reducersApp;
