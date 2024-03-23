import { View, Text, ScrollView, Swiper, SwiperItem, Image, Button, RichText } from '@tarojs/components'
import { useShareAppMessage } from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'
import { AtAvatar, AtIcon } from 'taro-ui'
import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  });
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


  return (
    <>
      <View className='detail-header at-row at-row__align--center'>
        <AtAvatar circle image='./logo.png'></AtAvatar>
        <Text className='detail-username'>hyperyz</Text>
      </View>
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
            circular
          >
            <SwiperItem>
              <Image
                mode='widthFix'
                style='width:100%'
                src='./1.jpg'
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                mode='widthFix'
                style='width:100%'
                src='./2.jpg'
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                mode='widthFix'
                style='width:100%'
                src='./1.jpg'
              />
            </SwiperItem>
          </Swiper>
          <RichText nodes={'<h1>这是富文本标题</h1><br><p>这是富文本区域</p>'}></RichText>

        </ScrollView>
      </View>
      <View className='detail-footer at-row at-row__align--center at-row__justify--between'>
        <AtIcon value='heart' size='30' color='#000'></AtIcon>
        <Button className='shareButton' size='mini' openType='share'>分享</Button>
      </View>
    </>
  )
}
