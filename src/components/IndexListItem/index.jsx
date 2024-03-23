import React, { useState } from 'react'
import { View, Text, Image, } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui'
import './index.scss'

export default function IndexListItem({ imgsrc, title, avatar, username, readnum, id }) {

  function getDetail(id) {
    console.log(id)
  }

  return (
    <View className='listItemContainer' onClick={getDetail}>
      <Image className='listItemImage' src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'></Image>
      <Text className='listItemTitle'>丽江三天两晚双人游</Text>
      <View className='listItemInfo'>
        <View className='listItemInfo-left'>
          <AtAvatar circle image='https://jdc.jd.com/img/200' className='listItemAvatar'></AtAvatar>
          <Text className='listItemUsername'>admin</Text>
        </View>
        <View className='listItemInfo-right'>
          <AtIcon value='eye' size='20' color='#ccc'></AtIcon>
          <Text className='listItemUsername'>666</Text>
        </View>
      </View>
    </View>
  )
}
