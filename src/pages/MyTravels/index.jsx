import React, { useState, useEffect } from "react";
import { Text, ScrollView, View } from "@tarojs/components";
import TravalListItem from "../../components/TravalListItem";
import { useReachBottom } from "@tarojs/taro";
import "./index.scss";
import Taro from "@tarojs/taro";
import { AtIcon } from 'taro-ui';
import { getUserTravelsAPI } from '../../apis/my';
import { showToast } from '../../utils/toast';

export default function MyTravals() {
  //判定是否到达底部
  const [isEnd, setIsEnd] = useState(false)
  //页面加载判定
  const [isLoading, setIsLoading] = useState(true)
  //存储数据
  const [listData, setListData] = useState([])

  var user = Taro.getStorageSync('user')


  //获取用户游记
  const getUserTravels = async () => {
    const data = {
      user_id: user.user_id
    }
    const res = await getUserTravelsAPI(data)
    if (res.data.code == 2000) {
      setIsLoading(false)
      setListData(res.data.data)
      if (res.data.data.length <= 3 && res.data.data.length > 0) {
        setIsEnd(true)
      }
    }
    else if (res.data.code == 2001) {
      setIsLoading(false)
      setIsEnd(true)
    }
    else {
      console.log("网络请求失败")
      setIsLoading(false)
      showToast('网络请求失败')
    }
  }

  useEffect(() => {
    try {
      if (user) {
        //获取接口数据
        getUserTravels()
      }
      else {
        setIsLoading(false)
        showToast('您还未登录，即将跳转登录页')
        //去往登录页
        setTimeout(function () {
          Taro.redirectTo({ url: '/pages/LoginPage/index' })
        }, 500)
      }
    } catch (e) {
      console.log(e);
      console.log("不存在历史数据")
    }
  }, [])

  useReachBottom(() => {
    console.log('onReachBottom')
    setIsEnd(true)
  })

  function toAdd() {
    Taro.switchTab({ url: `/pages/PublishPage/index` })
  }

  if (isLoading) {
    return <AtIcon value='loading-2' size='35' color='#ccc' className="loadingIcon"></AtIcon>
  }

  return (
    <>
      <View className="myTravelPage">
        <View className="addBtn" onClick={toAdd}>
          <Text className="addBtn_text">+</Text>
        </View>
        <ScrollView className="Travals_scrollView">
          {
            listData && listData.map((item, index) => (
              <TravalListItem props={{ travel_id: item.travel_id, poster_url: item.poster_url, image_url: item.image_url, title: item.title, content: item.content, status: item.status, video_url: item.video_url, reason: item.reason }} />
            ))
          }
          {
            isEnd ? <View className='indexEndText'>没有更多游记咯~  快去发布新游记吧(*^▽^*)</View> : <View className='indexEndText'>加载中...</View>
          }
        </ScrollView>
      </View>
    </>
  )
}