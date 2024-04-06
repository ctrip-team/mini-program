import Taro from '@tarojs/taro'

// 获取单个游记的详情
export function getTravelAPI(travel_id) {
    return Taro.request({
        url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/getById`,
        data: { travel_id },
        method: 'POST',
    })
}

// 更新游记文本
export function updateTextAPI(travel_id, title, content) {
    return Taro.request({
        url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/updateText`,
        data: { travel_id, title, content },
        method: 'POST',
    })
}

// 更新游记视频
export function updateVideoAPI(travel_id, tempVideoPath) {
    return Taro.uploadFile({
        url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/updateVideo/${travel_id}`,
        filePath: tempVideoPath,
        name: 'video',
    })
}

export function updatePosterAPI(travel_id, tempPoster) {
    return Taro.uploadFile({
        url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/updatePoster/${travel_id}`,
        filePath: tempPoster,
        name: 'poster',
    })
}