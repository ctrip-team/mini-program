import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'

import './index.scss'
function VideoRight() {

    const toUserPage = () => {
        console.log('跳转到主页');
        // Taro.navigateTo({
        //     url: `/pages/HomePage/index?user_id=${travel.user_id}`
        // })
    }

    return (
        <View className='video-bottom'>
            <View onClick={toUserPage}>@hyperyz</View>
            <View className='video-title'>我是好标题我是好标题我是好标题我是好标题我是好标题我是好标题</View>
        </View >
    )
}

export default VideoRight