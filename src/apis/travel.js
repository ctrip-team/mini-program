import Taro from '@tarojs/taro'

// 获取单个游记的详情
export function getTravelAPI(travel_id) {
    return Taro.request({
        url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/getById`,
        data: { travel_id },
        method: 'POST',
    })
}

// 更新游记的
export function updateTextAPI(travel_id, title, content) {
    return Taro.request({
        url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/updateText`,
        data: { travel_id, title, content },
        method: 'POST',
    })
}