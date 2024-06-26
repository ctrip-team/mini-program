import { View, Video } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { AtIcon } from 'taro-ui'
import VideoRight from './VideoRight'
import VideoBottom from './VideoBottom'
import './index.scss'
import { getByIdAPI } from '../../apis/user'

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

    const getById = async () => {
        const data = {
            user_id: travel.user_id
        }
        const res = await getByIdAPI(data)
        if (res.data.code == 2000) {
            setUser(res.data.user)
        }
    }

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
                setColor('red')
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