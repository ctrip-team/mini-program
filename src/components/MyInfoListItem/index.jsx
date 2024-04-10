import React from 'react'
import { View, Text, Image, } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default function MyInfoListItem({ props }) {

  let showReadNum = 0

  const addReadNum = async () => {
    const data = {
      id: props.travel_id,
      readnum: props.views + 1
    }
    const res = await addReadNumAPI(data)
    console.log(res)
  }

  function getDetail() {
    //增加阅读量
    addReadNum()
    // 跳转到详情页
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
    <View className='listItemContainer' onClick={getDetail}>
      {
        props.video_url ?
          <Image className='listItemImage' src={props.poster_url} mode='widthFix'></Image>
          : <Image className='listItemImage' src={props.image_url} mode='widthFix'></Image>
      }
      <View className='listItemInfo-right'>
        {
          props.video_url ? <AtIcon value='video' size='15' color='#fff' className='videoIcon'></AtIcon> : <></>
        }
        <AtIcon value='eye' size='15' color='#fff'></AtIcon>
        <Text className='listItemUsername'>
          {
            props.views >= 10000 ? showReadNum = (props.views / 10000).toFixed(1) + '万' : props.views
          }
        </Text>
      </View>
      <Text className='listItemTitle'>{props.title}</Text>
    </View>
  )
}
