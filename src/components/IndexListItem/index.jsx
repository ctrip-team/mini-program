import React from 'react'
import { View, Text, Image, } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default function IndexListItem({ props }) {

  function getDetail() {
    //增加阅读量
    Taro.request({
      url: 'http://127.0.0.1:3000/api/addReadNum',
      method: 'POST',
      data: {
        id: props.id,
        readnum: props.readnum + 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("增加成功")
      },
      fail: function (res) {
        console.log("网络失败")
      }
    })
    // 跳转到详情页
    Taro.navigateTo({
      url: '/pages/DetailPage/index'
    })
  }

  return (
    <View className='listItemContainer' onClick={getDetail}>
      <Image className='listItemImage' src={props.imgsrc}></Image>
      <Text className='listItemTitle'>{props.title}</Text>
      <View className='listItemInfo'>
        <View className='listItemInfo-left'>
          <AtAvatar circle image={props.avatar} className='listItemAvatar'></AtAvatar>
          <Text className='listItemUsername'>{props.username}</Text>
        </View>
        <View className='listItemInfo-right'>
          <AtIcon value='eye' size='20' color='#ccc'></AtIcon>
          <Text className='listItemUsername'>{
            props.readnum >= 10000 ? props.readnum = (props.readnum / 10000).toFixed(1) + '万' : props.readnum
          }</Text>
        </View>
      </View>
    </View>
  )
}
