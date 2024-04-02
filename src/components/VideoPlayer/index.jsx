import { View, Text, ScrollView, Swiper, SwiperItem, Image, Button, Video } from '@tarojs/components'
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { AtAvatar, AtIcon } from 'taro-ui'
import VideoRight from './VideoRight'
import VideoBottom from './VideoBottom'
import './index.scss'

function VideoPlayer() {

    const video = Taro.createVideoContext('video')
    // video.play()
    return (
        <View className='video-wrap'>
            <Video
                id='video'
                className='video-player'
                src='http://localhost:3000/videos/BiR1hM53Kwny2ca905ce620b1241b726bc41dcff44e0.mp4'
                // poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                initialTime={0}
                controls={true}
                autoplay={false}
                loop={false}
                muted={false}
            />
            <VideoRight />
            <VideoBottom />
        </View>
    )
}

export default VideoPlayer