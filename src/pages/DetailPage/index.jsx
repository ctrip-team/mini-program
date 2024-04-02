import { View, Text, ScrollView, Swiper, SwiperItem, Image, Button, RichText } from '@tarojs/components'
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { AtAvatar, AtIcon } from 'taro-ui'
import './index.scss'

export default function DetailPage() {

  const router = useRouter()
  const [travel, setTravel] = useState({})
  const [imageList, setImageList] = useState([])
  const [currentImage, setCurrentImage] = useState(1)
  const [reason, setReason] = useState(null)

  useEffect(() => {
    const { travel_id } = router.params
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/getById`,
      data: { travel_id },
      method: 'POST',
      success: function (res) {
        setTravel(res.data.travel)
        setImageList(res.data.travel.imgs)
        if (res.data.travel.status === '1') {
          setReason(res.data.travel.reason)
        }
      },
      fail: function (res) {
        console.log("网络失败")
        Taro.showToast({
          title: '网络状况不佳，请检查网络设置',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }, [])

  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
    }
  })

  const handleImageChange = (e) => {
    setCurrentImage(e.detail.current + 1)
  }

  const toUserPage = () => {
    Taro.navigateTo({
      url: '/pages/my/my'
    })
  }

  return (
    <>
      {/* 用户名和头像 */}
      <View className='detail-header at-row at-row__align--center' onClick={toUserPage}>
        <AtAvatar circle image={travel.avatar} size='small'></AtAvatar>
        <Text className='detail-username'>{travel.username}</Text>
      </View>

      {reason &&
        <View className='detail-reason'>
          <Text>{reason}</Text>
        </View>
      }

      <View className='detail-main'>
        <ScrollView
          className='detail-scrollView'
          scrollY
          scrollWithAnimation
          scrollTop={0}
        >
          <Swiper
            className='detail-swiper'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            onChange={handleImageChange}
          >
            {
              imageList.map(imageUrl => {
                return (
                  <SwiperItem>
                    <Image
                      mode='scaleToFill'
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                      src={imageUrl}
                    />
                  </SwiperItem>
                )
              })
            }
          </Swiper>

          <View className='image-counter'>
            {currentImage}/{imageList.length}
          </View>

          <View className='detail-richtext'>
            <RichText
              nodes={`
              <h3>${travel.title}</h3><br>
              ${travel.content}`}>
            </RichText>
          </View>

        </ScrollView>
      </View >

      <View className='detail-footer at-row at-row__align--center at-row__justify--between'>
        <AtIcon value='heart' size='30' color='#000'></AtIcon>
        <Button className='shareButton' size='mini' openType='share'>分享</Button>
      </View>
    </>
  )
}
