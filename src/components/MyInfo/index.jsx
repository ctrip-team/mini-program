import React, { useState, useEffect } from "react";
import { Button, Text, View } from "@tarojs/components";
import { AtAvatar } from 'taro-ui'
import Taro, { useDidShow } from "@tarojs/taro";
import "./index.scss";

export default function MyInfo() {
  const [myInfo, setMyInfo] = useState({});

  useDidShow(() => {
    setMyInfo(Taro.getStorageSync('user'))
  })

  useEffect(() => {
    setMyInfo(Taro.getStorageSync('user'))
  }, [])

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