import { View } from '@tarojs/components'
import React from 'react'
import { AtAvatar, AtIcon } from 'taro-ui'
import './index.scss'
function VideoRight() {

    const toUserPage = () => {
        console.log('跳转到主页');
        // Taro.navigateTo({
        //     url: `/pages/HomePage/index?user_id=${travel.user_id}`
        // })
    }

    return (
        <View className='video-right'>
            <View onClick={toUserPage}>
                <AtAvatar circle image='http://localhost:3000/avatars/IQYbFvnU7x0a9e0948c9372988a2a86ef1f35453292f.png' size='small'></AtAvatar>
            </View>
            <View className='icon-wrap'>
                <AtIcon value='heart' size='30' color='#fff'></AtIcon>
                <View class="number">32</View>
            </View>

            <View className='icon-wrap'>
                <AtIcon value='message' size='30' color='#fff'></AtIcon>
                <View class="number">13</View>
            </View>

            <View className='icon-wrap'>
                <AtIcon value='star' size='30' color='#fff'></AtIcon>
                <View class="number">50</View>
            </View>

            <View className='icon-wrap'>
                <AtIcon value='share' size='30' color='#fff'></AtIcon>
            </View>
        </View >
    )
}

export default VideoRight