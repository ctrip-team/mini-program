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
        id: props.travel_id,
        readnum: props.views + 1
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
          <Image className='listItemImage' src={props.poster_url}></Image>

          : <Image className='listItemImage' src={props.image_url}></Image>
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
