export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/my',
    'pages/DetailPage/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#333",
    selectedColor: "#ff0000",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/icon/index.png",
        selectedIconPath: "assets/icon/index.png"
      },
      {
        pagePath: "pages/my/my",
        text: "我的",
        iconPath: "assets/icon/my.png",
        selectedIconPath: "assets/icon/my.png"
      },
    ],
  },
})
