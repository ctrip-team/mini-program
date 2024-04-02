import { View } from '@tarojs/components'
import React from 'react'
import { AtAvatar, AtIcon } from 'taro-ui'

import './index.scss'
function VideoRight() {
    return (
        <View className='video-right'>
            <AtAvatar circle image='http://localhost:3000/avatars/IQYbFvnU7x0a9e0948c9372988a2a86ef1f35453292f.png' size='small'></AtAvatar>
            <AtIcon value='heart' size='30' color='#fff'></AtIcon>
            <View class="number">
                123
            </View>
            <AtIcon value='message' size='30' color='#fff'></AtIcon>

            <View class="number">
                521
            </View>
            <AtIcon value='star' size='30' color='#fff'></AtIcon>

            <View class="number">
                521
            </View>
            <AtIcon value='share' size='30' color='#fff'></AtIcon>

        </View >
    )
}

export default VideoRight