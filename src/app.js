import { Provider } from 'vedux';
import store from './store';
import compareVersion from './utils/version-compare';

const config = Provider(store)({
  onLaunch() {
    console.log('OnLaunch');

    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  // getUserInfo(cb) {
  // 	if (this.globalData.userInfo) {
  // 		typeof cb === 'function' && cb(this.globalData.userInfo);
  // 	} else {
  // 		// 调用登录接口
  // 		wx.login({
  // 			success: () => {
  // 				wx.getUserInfo({
  // 					success: (res) => {
  // 						this.globalData.userInfo = res.userInfo;
  // 						typeof cb === 'function' && cb(this.globalData.userInfo);
  // 					},
  // 				});
  // 			},
  // 		});
  // 	}
  // },
  globalData: {
		isHeaderShare: false, // 是否分享场景进来，给自定义导航栏使用
  },
	onShow(params) {
		// 以下是自定义导航栏使用代码，主要是导航栏高度，由于点菜页等page最顶层是绝对定位，需要此高度数据
		// 当是以下场景值时，判断是分享或模板消息场景，导航栏会变化。1007、1008、1014，参考：https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html
		this.globalData.isHeaderShare =
			[1007, 1008, 1014].indexOf(params.scene) >= 0;
		try {
			const {
				statusBarHeight,
				version,
				system,
				SDKVersion,
				windowHeight,
				screenHeight,
				screenWidth,
			} = wx.getSystemInfoSync();
			const isiOS = system.indexOf('iOS') > -1;
			let navHeight;
			if (!isiOS) {
				navHeight = 48;
			} else {
				navHeight = 44;
			}
			this.globalData.system = {
				version,
				SDKVersion,
				statusBarHeight,
				navHeight,
				windowHeight,
				screenHeight,
				screenWidth,
				isShowNavBar: compareVersion(SDKVersion, '2.5.2'), // 微信版本7.0.0页面配置custom不生效，对应基础版本为2.5.2，兼容开发者工具
			};
		} catch (error) {
			console.log('获取用户设备信息失败，状态栏可能不生效');
			// owl.error.pushError({
			// 	content: { message: `获取用户设备信息失败，状态栏可能不生效|${error}` },
			// 	category: 'jsError',
			// 	level: 'warn',
			// 	sec_category: '获取用户设备信息失败',
			// });
		}
	}
});

App(config);
