import Taro from '@tarojs/taro'

// 用户登录
export function userLoginAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/login`,
    method: 'POST',
    data: data,
  })
}

// 用户注册
export function userRegisterAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/register`,
    method: 'POST',
    data: data,
  })
}

// 获取用户游记
export function getUserTravelsAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/mytravels`,
    data: data,
  })
}

// 获取个人主页数据
export function getHomePageDataAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/infodata`,
    data: data,
  })
}