import React from "react";
import { Button, Text, View } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtAvatar } from 'taro-ui'
import Taro from "@tarojs/taro";
import "./index.scss";

export default function MyInfo() {
  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    const user = Taro.getStorageSync('user')
    setMyInfo(user)
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