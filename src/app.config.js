export default defineAppConfig({
  pages: [
    'pages/PublishPage/index',
    'pages/index/index',
    'pages/my/my',
    'pages/DetailPage/index',
    'pages/MyTravals/index',
    'pages/Add/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    // navigationStyle: 'custom',
  },
  tabBar: {
    color: "#333",
    selectedColor: "#007bff",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/icon/index.png",
        selectedIconPath: "assets/icon/index_select.png"
      },
      {
        pagePath: 'pages/Add/index',
        iconPath: "assets/icon/add.png",
      },
      {
        pagePath: "pages/my/my",
        text: "我的",
        iconPath: "assets/icon/my.png",
        selectedIconPath: "assets/icon/my_select.png"
      },
    ],
  },

})
