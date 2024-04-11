import { View, Swiper, SwiperItem } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import './index.scss'
import { showToast } from '../../utils/toast'


export default function VideoPage() {
    const router = useRouter()
    const { travel_id } = router.params
    const [travels, setTravels] = useState([])
    const swiperCurrent = useRef(0)
    const videoRefs = useRef({})
    // 获取视频
    useEffect(() => {
        Taro.request({
            url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/getVideos`,
            data: { travel_id },
            method: 'POST',
            success: function (res) {
                setTravels(res.data.travels)
            },
            fail: function (res) {
                showToast('网络状况不佳，请检查网络设置')
            }
        })
    }, [])

    const changeVideo = (e) => {
        // 向下滑动
        if (e.detail.current > swiperCurrent.current) {
            videoRefs.current[e.detail.current].play()
            videoRefs.current[e.detail.current - 1].pause()
        } else {
            videoRefs.current[e.detail.current].play()
            videoRefs.current[e.detail.current + 1].pause()
        }
        swiperCurrent.current = e.detail.current
    }
    return (
        <View className='swiper-container'>
            <Swiper
                className='video-swiper'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                vertical
                onChange={changeVideo}
                scrollWithAnimation={true}
            >
                {
                    travels.map((travel, index) => (
                        <SwiperItem key={travel.travel_id}>
                            <VideoPlayer travel={travel} index={index} ref={ref => videoRefs.current[index] = ref} />
                        </SwiperItem>
                    ))
                }
            </Swiper>
        </View>
    )
}