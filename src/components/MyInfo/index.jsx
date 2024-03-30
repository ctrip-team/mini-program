import React from "react";
import { Button, Text, View } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtAvatar } from 'taro-ui'
import Taro from "@tarojs/taro";

export default function MyInfo() {
  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    const user = Taro.getStorageSync('user')
    setMyInfo(user)
  }, [])

  function logOut() {
    Taro.removeStorageSync('user')
    Taro.reLaunch({
      url: '/pages/my/my'
    })
  }

  return (
    <>
      <AtAvatar circle image={myInfo.image_url}></AtAvatar>
      <View>{myInfo.username}</View>
      <Button onClick={logOut}>退出登录</Button>
    </>
  )

}