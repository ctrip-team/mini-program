import React, { useState, useEffect } from "react";
import './index.scss';
import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";

export default function InfoFunction() {
  // 判断是否登录
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (Taro.getStorageSync('user')) {
      setIsLogin(true)
    }
  }, [])

  // 跳转我的游记
  function toMyTravels() {
    Taro.navigateTo({
      url: '/pages/MyTravels/index'
    })
  }

  // 跳转个人信息
  function toMyInfo() {
    Taro.navigateTo({
      url: '/pages/InfoPage/index'
    })
  }

  return (
    <>
      <View className={isLogin ? "functionContainer" : "functionContainerNL"}>
        <View className="title">常用功能</View>
        <View className="InnerContainer">
          <View className="functionItem" onClick={toMyTravels}>
            <AtIcon value='image' size='30' color='#67BCEF' className="functionIcon"></AtIcon>
            <Text className="functionText">我的游记</Text>
          </View>
          <View className="functionItem" onClick={toMyInfo}>
            <AtIcon value='user' size='30' color='#F00' className="functionIcon"></AtIcon>
            <Text className="functionText">个人信息</Text>
          </View>
        </View>
      </View>
    </>
  )
}