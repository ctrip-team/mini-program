import { View, Text, ScrollView, Swiper, SwiperItem, Image, Button, Video } from '@tarojs/components'
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro'
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { AtAvatar, AtIcon } from 'taro-ui'
import VideoRight from './VideoRight'
import VideoBottom from './VideoBottom'
import './index.scss'

const VideoPlayer = forwardRef(function ({ travel, index }, ref) {

    const [isPlay, setIsPlay] = useState(false)
    const [autoPlay, setAutoPlay] = useState(false)
    const [videoContext, setVideoContext] = useState(null)
    const [user, setUser] = useState(null)
    const [color, setColor] = useState('#fff')
    const doubleClick = useRef(true)
    const timer = useRef(null)

    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
        play: () => {
            videoContext.play()
            setIsPlay(true)
        },
        pause: () => {
            videoContext.pause();
            setIsPlay(false)
        }
    }));

    useEffect(() => {
        Taro.request({
            url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/user/getById`,
            method: 'POST',
            data: {
                user_id: travel.user_id
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log('看看用户', res.data.user);
                setUser(res.data.user)
            },
            fail: function (res) {
                console.log("网络失败")
            }
        })
        if (index === 0) {
            setAutoPlay(true)
            setIsPlay(true)
        }
        setVideoContext(Taro.createVideoContext(`videoPlayer${travel.travel_id}`))
    }, [])

    const playOrPause = (e) => {
        clearTimeout(timer.current)
        doubleClick.current = !doubleClick.current
        timer.current = setTimeout(() => {
            if (doubleClick.current) {
                doubleClick.current = false
                setColor('pink')
            } else {
                if (isPlay) {
                    videoContext.pause()
                    setIsPlay(false)
                } else {
                    videoContext.play()
                    setIsPlay(true)
                }
            }
            doubleClick.current = true
        }, 200)
    }


    return (
        <>
            <View className='video-wrap'>
                {!isPlay && <AtIcon value='play' size='60' color='#F00' className='playIcon'></AtIcon>}
                <Video
                    id={`videoPlayer${travel.travel_id}`}
                    className='video-player'
                    src={travel.video_url}
                    // poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                    initialTime={0}
                    controls={false}
                    showCenterPlayBtn={false}
                    autoplay={autoPlay}
                    loop={true}
                    muted={false}
                    showFullscreenBtn={false}
                    onClick={playOrPause}
                />
                {user && <VideoRight user={user} color={color} travel={travel} />}
                {user && <VideoBottom user={user} title={travel.title} />}
            </View>
        </>
    )
})

export default VideoPlayer