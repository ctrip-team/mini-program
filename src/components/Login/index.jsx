import React from "react";
import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

export default function Login() {
  function toLogin() {
    Taro.navigateTo({
      url: '/pages/LoginPage/index'
    })
  }

  function toRegister() {
    Taro.navigateTo({
      url: '/pages/RegisterPage/index'
    })
  }

  return (
    <>
      <View className="LoginContainer">
        <View className="title">登录，记录美好</View>
        <Button onClick={toLogin} className="loginBtn">登录</Button>
        <Button onClick={toRegister} className="registerBtn">注册</Button>
      </View>

    </>
  )
}