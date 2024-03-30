import React, { useState, useEffect } from "react";
import { Button, View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./my.scss";
import Login from "../../components/Login";
import MyInfo from "../../components/MyInfo";


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
  }, [])

  return (
    isLogin ? <MyInfo /> : <Login />
  )
}