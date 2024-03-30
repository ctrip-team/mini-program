import React from "react";
import { Button } from "@tarojs/components";
import Taro from "@tarojs/taro";

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
      <Button onClick={toLogin}>登录</Button>
      <Button onClick={toRegister}>注册</Button>
    </>
  )
}