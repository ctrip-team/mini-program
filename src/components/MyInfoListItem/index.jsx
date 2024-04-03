import React from 'react'
import { View, Text, Image, } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default function MyInfoListItem({ props }) {

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
        'content-type': 'application/json'
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
        props.videosrc ?
          <View>
            <Image className='listItemImage' src={props.poster}></Image>
            <AtIcon value='video' size='15' color='#000' className='videoIcon'></AtIcon>
          </View>
          : <Image className='listItemImage' src={props.imgsrc}></Image>
      }
      <View className='listItemInfo-right'>
        <AtIcon value='eye' size='15' color='#fff'></AtIcon>
        <Text className='listItemUsername'>{
          props.readnum >= 10000 ? showReadNum = (props.readnum / 10000).toFixed(1) + '万' : props.readnum
        }</Text>
      </View>
      <Text className='listItemTitle'>{props.title}</Text>
    </View>
  )
}