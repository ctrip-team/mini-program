import React from 'react'
import { View, Text, Image, } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default function IndexListItem({ props }) {

  let showReadNum = 0

  function getDetail() {
    //增加阅读量
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/addReadNum`,
      method: 'POST',
      data: {
        id: props.id,
        readnum: props.readnum + 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 2000) {
          console.log("增加成功")
        }
        else {
          console.log("增加失败")
        }
      },
      fail: function (res) {
        console.log("网络失败")
      }
    })
    // 跳转到详情页
    Taro.navigateTo({
      url: `/pages/DetailPage/index?travel_id=${props.id}`
    })
  }

  return (
    <View className='listItemContainer' onClick={getDetail}>
      {
        props.videosrc ? <Video
          id='video'
          src={props.videosrc}
          initialTime={0}
          controls={false}
          autoplay={false}
          loop={false}
          muted={false}
        /> : <Image className='listItemImage' src={props.imgsrc}></Image>
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
            props.readnum >= 10000 ? showReadNum = (props.readnum / 10000).toFixed(1) + '万' : props.readnum
          }</Text>
        </View>
      </View>
    </View>
  )
}
