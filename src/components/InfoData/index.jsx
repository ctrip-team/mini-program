import React, { useState, useEffect } from "react";
import './index.scss';
import { View, Text } from '@tarojs/components';
import Taro from "@tarojs/taro";
import { getInfoDataAPI } from '../../apis/my';
import { showToast } from '../../utils/toast'

export default function InfoData() {
  const [views, setViews] = React.useState(0)
  const [travels, setTravels] = React.useState(0)

  let showReadNum = 0

  const getInfoData = async () => {
    const data = {
      id: Taro.getStorageSync('user').user_id
    }
    const res = await getInfoDataAPI(data)
    if (res.data.code == 2000) {
      setViews(res.data.data.totalView)
      setTravels(res.data.data.totalTravel)
    }
    else {
      showToast('网络请求失败,请检查网络设置！')
    }
  }

  useEffect(() => {
    getInfoData()
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