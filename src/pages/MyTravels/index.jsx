import React, { useState, useEffect } from "react";
import { Text, ScrollView, View } from "@tarojs/components";
import TravalListItem from "../../components/TravalListItem";
import { useReachBottom } from "@tarojs/taro";
import "./index.scss";
import Taro from "@tarojs/taro";

export default function MyTravals() {
  //判定是否到达底部
  const [isEnd, setIsEnd] = useState(false)
  //页面加载判定
  const [isLoading, setIsLoading] = useState(true)
  //存储数据
  const [listData, setListData] = useState([])
  //页面无数据判定
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    try {
      var user = Taro.getStorageSync('user')
      console.log('user', user);
      if (user) {
        //获取接口数据
        Taro.request({
          url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/mytravels`,
          data: {
            user_id: user.user_id,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.code == 2000) {
              console.log("网络请求成功")
              setIsLoading(false)
              setListData(res.data.data)
              if (res.data.data.length <= 3 && res.data.data.length > 0) {
                setIsEnd(true)
              }
              if (res.data.data.length == 0) {
                setIsEmpty(true)
              }
            }
            else {
              console.log("网络请求失败")
              setIsLoading(false)
              Taro.showToast({
                title: '网络请求失败',
                icon: 'none'
              })
            }
          },
          fail: function (res) {
            console.log("网络失败")
          }
        })
      }
      else {
        setIsLoading(false)
        Taro.showToast({
          title: '您还未登录，即将跳转登录页',
          icon: 'none'
        })
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
    return <View>加载中...</View>
  }

  return (
    <>
      <View className="addBtn" onClick={toAdd}>
        <Text className="addBtn_text">+</Text>
      </View>
      <ScrollView className="Travals_scrollView">
        {
          listData && listData.map((item, index) => (
            <TravalListItem props={{ id: item.travel_id, imgsrc: item.image_url, title: item.title, content: item.content, status: item.status, videosrc: item.video_url, reason: item.reason }} />
          ))
        }
        {
          isEnd ? <View className='indexEndText'>没有更多游记咯~  快去发布新游记吧(*^▽^*)</View> : <View className='indexEndText'>加载中...</View>
        }
        {
          isEmpty && <View className='indexNoneText'>还没有游记哦~  快去发布新游记吧(*^▽^*)</View>
        }
      </ScrollView>

    </>
  )
}