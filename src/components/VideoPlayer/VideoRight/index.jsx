import { Button, View, Label } from '@tarojs/components'
import Taro, { useShareAppMessage } from '@tarojs/taro'
import React from 'react'
import { AtAvatar, AtIcon } from 'taro-ui'
import './index.scss'
function VideoRight({ user, color, travel }) {

    const toUserPage = () => {
        Taro.navigateTo({
            url: `/pages/HomePage/index?user_id=${user.user_id}`
        })
    }

    useShareAppMessage((res) => {
        if (res.from === 'button') {
            console.log(res.target)
        }
        return {
            title: travel.title,
            path: `/pages/VideoPage/index?travel_id=${travel.travel_id}`,
        }
    })
    return (
        <View className='video-right'>
            <View onClick={toUserPage}>
                <AtAvatar circle image={user.avatar} size='small'></AtAvatar>
            </View>
            <View className='icon-wrap'>
                <AtIcon value='heart' size='30' color={color}></AtIcon>
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

            <Label className='example-body__label' for='share'>
                <AtIcon value='share' size='30' color='#fff'></AtIcon>
            </Label>
            <Button openType='share' size='mini' id="share"></Button>
        </View >
    )
}

export default VideoRight