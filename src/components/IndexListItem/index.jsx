import React, { useState } from 'react'
import { View, Text, Image, } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default function IndexListItem({ props }) {

  function getDetail() {
    console.log(props.id)
    // 跳转到详情页
    Taro.navigateTo({
      // url: '/pages/detail/index?id=' + props.id,
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
          <Text className='listItemUsername'>{props.readnum}</Text>
        </View>
      </View>
    </View>
  )
}
