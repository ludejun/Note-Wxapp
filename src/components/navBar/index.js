const app = getApp();

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		styleType: {
			type: String,
			value: 'black',
		},
		title: {
			type: String,
			value: '',
		},
		background: {
			type: String,
			value: '#fff',
		},
		// homeIcon: {
		// 	type: String,
		// 	value: '',
		// },
		// returnIcon: {
		// 	type: String,
		// 	value: '',
		// }
	},
	attached() {
		this.setNavSize();
		this.setNavShow();
	},
	data: {
		onlyHome: false,
		onlyBack: false,
		isShow: true,
	},
	methods: {
		// 通过获取系统信息计算导航栏高度
		setNavSize() {
			// const {
			//   statusBarHeight,
			//   version,
			//   system,
			//   SDKVersion,
			//   windowHeight,
			//   screenHeight,
			// } = wx.getSystemInfoSync();
			// const isiOS = system.indexOf('iOS') > -1;
			// let navHeight;
			// if (!isiOS) {
			//   navHeight = 48;
			// } else {
			//   navHeight = 44;
			// }
			const {
				statusBarHeight,
				navHeight,
				screenWidth,
				isShowNavBar,
			} = app.globalData.system;
			this.setData({
				status: statusBarHeight || 20,
				navHeight: navHeight || 44,
				isShow: isShowNavBar === undefined ? true : isShowNavBar,
				titleWidth: screenWidth - (96 * 2),
			});
		},
		// 控制导航栏是否显示
		setNavShow() {
			const routes = getCurrentPages();
			// 当页面栈只有一个，且不是首页，不区分分享或消息模板场景
			if (routes.length === 1 && routes[0].route !== 'pages/index/index') {
				this.setData({
					onlyHome: true,
				});
			} else if (!app.globalData.isHeaderShare && routes.length > 1) {
				// 只要不是分享或消息模板场景就显示返回按钮
				this.setData({
					onlyBack: true,
				});
			}
			// // 回首页按钮曝光埋点
			// const { onlyHome, onlyBack } = this.data;
			// if ((!onlyHome && !onlyBack) || onlyHome) {
			// 	lxMge.view({ val_bid: 'b_waimai_vbpy7cx9_mv' });
			// }
		},
		// 返回事件
		back() {
			wx.navigateBack({
				delta: 1,
			});
			this.triggerEvent('back', { back: 1 });
		},
		home() {
			// lxMge.click({
			// 	val_bid: 'b_waimai_vbpy7cx9_mc',
			// });
			wx.switchTab({ url: '/pages/index/index' });
			this.triggerEvent('home', {});
		},
	},
});
