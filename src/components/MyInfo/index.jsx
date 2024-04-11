import React, { useState, useEffect } from "react";
import { Button, Text, View } from "@tarojs/components";
import { AtAvatar } from 'taro-ui'
import Taro, { useDidShow } from "@tarojs/taro";
import "./index.scss";

export default function MyInfo() {
  // 用户信息
  const [myInfo, setMyInfo] = useState({});

  // 及时渲染更改信息
  useDidShow(() => {
    setMyInfo(Taro.getStorageSync('user'))
  })

  useEffect(() => {
    setMyInfo(Taro.getStorageSync('user'))
  }, [])

  // 跳转到个人主页
  function toHomePage() {
    Taro.navigateTo({ url: `/pages/HomePage/index?user_id=${myInfo.user_id}` })
  }


  return (
    <>
      <View className="infoContainer">
        <AtAvatar circle image={myInfo.avatar} className="infoAvatar" size="large"></AtAvatar>
        <Text className="infoName">{myInfo.username}</Text>
        <Button className="infoBtn" onClick={toHomePage}>个人主页</Button>
      </View>
    </>
  )

}