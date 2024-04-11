import React from 'react'
import { View, Text, Image, } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'
import { addReadNumAPI } from '../../apis/index'

export default function IndexListItem({ props, id }) {

  // 处理阅读量显示
  let showReadNum = 0

  // 增加阅读量
  const addReadNum = async () => {
    const data = {
      id: props.travel_id,
      readnum: props.views + 1
    }
    const res = await addReadNumAPI(data)
  }

  // 跳转到详情页
  function getDetail() {
    addReadNum()
    // 跳转到对应详情页
    if (props.video_url) {
      Taro.navigateTo({
        url: `/pages/VideoPage/index?travel_id=${props.travel_id}`
      })
    }
    else {
      Taro.navigateTo({
        url: `/pages/DetailPage/index?travel_id=${props.travel_id}`
      })
    }
  }

  return (
    <View id={id} className='listItemContainer' onClick={getDetail}>
      {
        props.video_url ?
          <View>
            <Image className='listItemImage' src={props.poster_url} lazyLoad='true' mode='widthFix'></Image>
            <View className='listItemIcon'>
              <AtIcon value='play' size='10' color='#fff' className='playIcon'></AtIcon>
            </View>
          </View>
          : <Image className='listItemImage' src={props.image_url} lazyLoad='true' mode='widthFix'></Image>
      }
      <Text className='listItemTitle'>{props.title}</Text>
      <View className='listItemInfo'>
        <View className='listItemInfo-left'>
          <AtAvatar circle image={props.avatar} className='listItemAvatar'></AtAvatar>
          <Text className='listItemUsername'>{props.username}</Text>
        </View>
        <View className='listItemInfo-right'>
          <AtIcon value='eye' size='20' color='#ccc'></AtIcon>
          <Text className='listItemUsername'>{
            props.views >= 10000 ? showReadNum = (props.views / 10000).toFixed(1) + '万' : props.views
          }</Text>
        </View>
      </View>
    </View>
  )
}
