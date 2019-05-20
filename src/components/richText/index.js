Component({
  properties: {
    placeholder: {
      type: String,
      value: '开始笔记...',
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    formats: {},
    fontSizeShow: false,
    colorShow: false,
    backgroundColorShow: false,
  },
  lifetimes: {
    created() {
      console.log(6666, this);
    },
  },

  methods: {
    onStatusChange(e) {
      const formats = e.detail;
      this.setData({ formats });
    },
    onEditorReady() {
      const that = this;
      wx.createSelectorQuery()
        .in(this)
        .select('#editor')
        .context(function(res) {
          if (res.context) {
            that.editorCtx = res.context;
          } else {
            that.editorCtx = {};
          }
        })
        .exec();
    },
    onInputChange: e => console.log('input change', e),
    undo() {
      this.editorCtx.undo();
    },
    redo() {
      this.editorCtx.redo();
    },
    format(e) {
      const { name, value } = e.target.dataset;
      if (!name) return;
      // console.log('format', name, value)
      this.editorCtx.format(name, value);
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function() {
          console.log('insert divider success');
        },
      });
    },
    clear() {
      this.editorCtx.clear({
        success: function(res) {
          console.log('clear success');
        },
      });
    },

    removeFormat() {
      this.editorCtx.removeFormat();
    },

    insertImage() {
      const that = this;
      wx.chooseImage({
        count: 1,
        success: function(res) {
          const tempFilePaths = res.tempFilePaths;
          // // todo 上传图片，上传服务器地址，附加信息user等
          // wx.uploadFile({
          // 	url: 'https://example.weixin.qq.com/upload', // todo 仅为示例，非真实的接口地址
          // 	filePath: tempFilePaths[0],
          // 	name: 'file',
          // 	formData: {
          // 		user: 'test' // todo
          // 	},
          // 	success(res) {
          // 		const {data:{url}} = res;
          // 		if (url) {
          // 			that.editorCtx.insertImage({
          // 				src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',
          // 				data: {
          // 					id: 'abcd',
          // 					role: 'god'
          // 				},
          // 				success: function () {
          // 					console.log('insert image success')
          // 				}
          // 			})
          // 		}
          // 	},
          // 	fail() {
          // 		// todo 给出弹窗：上传失败，请检查网络并重试
          // 		console.log('上传失败，请检查网络并重试');
          // 	}
          // })
					// todo 只是保证demo可用，后续应使用上面代码上传服务器再插入，此段作废
          that.editorCtx.insertImage({
            src:
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',
            data: {
              id: 'abcd',
              role: 'god',
            },
            success: function() {
              console.log('insert image success');
            },
          });
        },
      });
    },
    // 字体大小更改
    onFontSizeSelect(e) {
      const { value } = e.target.dataset;
      this.editorCtx.format('fontSize', `${value}px`);
      this.setData({
        fontSizeShow: false,
      });
    },
    onColorSelect(e) {
      const { value } = e.target.dataset;
      this.editorCtx.format('color', value);
      this.setData({
        colorShow: false,
      });
    },
    onBackgroundColorSelect(e) {
      const { value } = e.target.dataset;
      this.editorCtx.format('backgroundColor', value);
      this.setData({
        backgroundColorShow: false,
      });
    },
    // 控制各选择器的显示
    toggleSelector(e) {
      const { selector } = e.target.dataset;
      const key = `${selector}Show`;
      this.setData({
        [key]: !this.data[key],
      });
    },

		// 保存笔记
		onSaveContext() {
    	this.editorCtx.getContents({
				success({delta, html, text}) {
					console.log(9999, delta, html, text);
				},
				fail() {
					// todo
				}
			});
		}
  },
});
