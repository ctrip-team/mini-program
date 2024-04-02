import React, { useState, useEffect } from "react";
import './index.scss';
import { View, Text } from '@tarojs/components';
import Taro from "@tarojs/taro";

export default function InfoData() {
  const [views, setViews] = React.useState(0)
  const [travels, setTravels] = React.useState(0)

  let showReadNum = 0

  useEffect(() => {
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/mydata`,
      data: {
        id: Taro.getStorageSync('user').user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 2000) {
          setViews(res.data.data.totalView)
          setTravels(res.data.data.totalTravel)
        }
        else {
          console.log("网络请求失败")
          Taro.showToast({
            Title: '网络请求失败,请检查网络设置！',
            icon: 'none',
          })
        }
      },
      fail: function (res) {
        console.log("网络失败")
      }
    })
  }, [])

  return (
    <>
      <View className="dataContainer">
        <View className="dataItem">
          <Text className="dataNum">
            {
              views >= 10000 ? showReadNum = (views / 10000).toFixed(1) + '万' : views
            }
          </Text>
          <Text className="dataText">浏览量</Text>
        </View>
        <View className="dataItem">
          <Text className="dataNum">{travels}</Text>
          <Text className="dataText">游记数</Text>
        </View>
      </View>
    </>
  )
}