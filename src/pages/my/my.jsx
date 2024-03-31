import React, { useState, useEffect } from "react";
import { Button, View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./my.scss";
import Login from "../../components/Login";
import MyInfo from "../../components/MyInfo";
import InfoData from "../../components/InfoData";
import InfoFunction from "../../components/InfoFunction";


export default function My() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const user = Taro.getStorageSync('user')
      if (user) {
        setIsLogin(true)
        // 清除监听器，防止重复设置状态  
        clearInterval(interval);
      }
    }, 300); // 每秒检查一次
    // 清除监听器  
    return () => clearInterval(interval);
  })

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