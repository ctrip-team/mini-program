import { View, Text, ScrollView, Swiper, SwiperItem, Button, RichText } from '@tarojs/components'
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import './index.scss'
function VideoPage() {
    return (
        <View className='swiper-container'>
            <Swiper
                className='video-swiper'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                vertical
            >
                <SwiperItem>
                    <VideoPlayer />
                </SwiperItem>

                <SwiperItem>
                    <VideoPlayer />
                </SwiperItem>
            </Swiper>
        </View>

    )
}

export default VideoPage