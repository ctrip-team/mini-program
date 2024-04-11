import React, { useState, useEffect } from "react";
import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./my.scss";
import Login from "../../components/Login";
import MyInfo from "../../components/MyInfo";
import InfoData from "../../components/InfoData";
import InfoFunction from "../../components/InfoFunction";


export default function My() {

  // 判断是否登录
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = Taro.getStorageSync('user')
    if (user) {
      setIsLogin(true)
    }
  }, [])

  //登出
  function logOut() {
    Taro.removeStorageSync('user')
    Taro.reLaunch({
      url: '/pages/my/my'
    })
  }

  return (
    <>
      <View className='myPage'>
        <View>
          {
            isLogin ? <MyInfo /> : <Login />
          }
        </View>
        {
          isLogin && <InfoData />
        }
        <InfoFunction />
        {
          isLogin && <Button onClick={logOut} className="logOutBtn">退出登录</Button>
        }
      </View>
    </>
  )
}