import Taro from '@tarojs/taro'

// 获取首页首次加载的数据
export function getIndexDataAPI() {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/index`,
  })
}


//获取搜素页数据
export function getSearchDataAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/searchTitle`,
    method: 'POST',
    data: data,
  })
}

//获取搜素页用户数据
export function getUserSearchDataAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/searchUser`,
    method: 'POST',
    data: data,
  })
}