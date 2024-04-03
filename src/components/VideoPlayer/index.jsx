import { View, Text, ScrollView, Swiper, SwiperItem, Image, Button, Video } from '@tarojs/components'
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { AtAvatar, AtIcon } from 'taro-ui'
import VideoRight from './VideoRight'
import VideoBottom from './VideoBottom'
import './index.scss'
import { useRef } from 'react'

function VideoPlayer() {
    const videoRef = useRef(null)
    const [isPlay, setIsPlay] = useState(true)
    const [videoContext, setVideoContext] = useState(null)
    useEffect(() => {
        setVideoContext(Taro.createVideoContext(videoRef.current))
    })
    const playOrPause = () => {
        console.log('videoContext', videoContext);
        videoContext.pause()
        // if (isPlay) {
        //     video.pause()
        //     setIsPlay(false)
        // } else {
        //     video.play()
        //     setIsPlay(true)
        // }
    }
    return (

        <View className='video-wrap' onClick={playOrPause}>
            <Video
                ref={videoRef}
                id='videoPlayer'
                className='video-player'
                src='http://localhost:3000/videos/BiR1hM53Kwny2ca905ce620b1241b726bc41dcff44e0.mp4'
                // poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                initialTime={0}
                controls={true}
                autoplay={true}
                loop={true}
                muted={false}
                showFullscreenBtn={false}
                onClick={playOrPause}
            />
            <VideoRight />
            <VideoBottom />
        </View>
    )
}

export default VideoPlayer