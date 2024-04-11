import Taro from '@tarojs/taro'

// 获取首页后续加载的数据
export function getIndexDataAPI() {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/index`,
  })
}

// 获取首页首次加载的数据
export function getIndexFirstDataAPI() {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/indexfirst`,
  })
}

//获取搜素页数据
export function getSearchDataAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/searchTitle`,
    data: data,
  })
}

//获取搜素页用户数据
export function getUserSearchDataAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/searchUser`,
    data: data,
  })
}

//增加游记浏览量
export function addReadNumAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/addReadNum`,
    method: 'POST',
    data: data,
  })
}
