import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import './index.scss'
function VideoRight({ user, title }) {
    const toUserPage = () => {
        Taro.navigateTo({
            url: `/pages/HomePage/index?user_id=${user.user_id}`
        })
    }
    return (
        <View className='video-bottom'>
            <View onClick={toUserPage}>{`@${user.username}`}</View>
            <View className='video-title'>{title}</View>
        </View >
    )
}

export default VideoRight