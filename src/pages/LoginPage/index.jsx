import React, { useState } from "react";
import { View, Button, Image, Text } from "@tarojs/components";
import { AtInput, AtForm } from 'taro-ui'
import Taro from "@tarojs/taro";
import "./index.scss";
import loginBg from "../../assets/img/login_bg.png";
import WeChatRigeAndLogBtn from "../../components/WeChatRigeAndLogBtn";
import { userLoginAPI } from "../../apis/my";
import { showToast } from '../../utils/toast'

export default function LoginPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // 登录接口
  const Login = async () => {
    const data = {
      username,
      password,
    }
    const res = await userLoginAPI(data)
    if (res.data.code == 2000) {
      Taro.setStorageSync('user', res.data.data[0])
      Taro.reLaunch({
        url: '/pages/my/my'
      })
    }
    else if (res.data.code == 2001) {
      Taro.showToast({
        title: '用户名或密码错误',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      showToast('网络状况不佳，请检查网络设置')
    }
  }

  function login() {
    // 处理登录逻辑
    const regexOfPwd = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/
    if (username === '' || password === '') {
      showToast('用户名或密码不能为空~')
    }
    else if (!regexOfPwd.test(password)) {
      showToast('密码长度应该在6-12个字符且至少包含字母与数字~')
    }
    else {
      Login()
    }
  }


  function toRegister() {
    Taro.redirectTo({
      url: '/pages/RegisterPage/index'
    })
  }

  return (
    <>
      <View className="loginPage">
        <View className="loginTop">
          <Text className="loginTitle1">欢迎回来</Text>
          <Text className="loginTitle2">请按以下表格输入您的凭据:</Text>
        </View>
        <View className="loginBgI">
          <Image className="loginBg" src={loginBg} />
        </View>
        <View className="loginFormContainer">
          <AtForm>
            <Text className="loginText">用户名</Text>
            <AtInput
              name='username'
              type='text'
              placeholder='请输入您的用户名'
              value={username}
              onChange={(value) => setUsername(value)}
              className="loginInput"
            />
            <Text className="loginText">暗语</Text>
            <AtInput
              name='password'
              type='password'
              placeholder='请输入您的密码'
              value={password}
              onChange={(value) => setPassword(value)}
            />
          </AtForm>
          <Button onClick={login} className="loginBtn">登录</Button>
          <WeChatRigeAndLogBtn />
        </View>
        <View className="registerView" onClick={toRegister}>
          <Text className="registerText1">还没有账户吗?</Text>
          <Text className="registerText2">立即注册</Text>
        </View>
      </View>
    </>
  )
}