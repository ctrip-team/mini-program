import Taro from '@tarojs/taro'

// 获取单个游记的详情
export function getByIdAPI(data) {
  return Taro.request({
    url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/user/getById`,
    data: data,
    method: 'POST',
  })
}