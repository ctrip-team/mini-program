import React, { useState } from 'react'
import { View, Text, Image, } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import './index.scss'


export default function IndexListItem() {

  return (
    <View className='listItemContainer'>
      <Image></Image>
      <Text className='listItemTitle'>丽江三天两晚双人游</Text>
      <View className='listItemInfo'>
        <AtAvatar circle image='https://jdc.jd.com/img/200' className='listItemAvatar'></AtAvatar>
        <Text className='listItemUsername'>admin</Text>
      </View>
    </View>
  )
}
