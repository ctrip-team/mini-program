import React, { useState } from "react";
import { View, Button, Image, Text } from "@tarojs/components";
import { AtInput, AtForm } from 'taro-ui'
import Taro from "@tarojs/taro";
import './index.scss'
import loginBg from "../../assets/img/login_bg.png";

export default function RegisterPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [checkpassword, setCheckpassword] = useState('')

  function register() {
    // 处理注册逻辑
    const regexOfUrn = /^.{4,12}$/
    const regexOfPwd = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/
    if (username === '' || password === '') {
      Taro.showToast({
        title: '用户名或密码不能为空~',
        icon: 'none'
      })
    }
    else if (!regexOfUrn.test(username)) {
      Taro.showToast({
        title: '用户名长度应该在4-12个字符',
        icon: 'none'
      })
    }
    else if (!regexOfPwd.test(password)) {
      Taro.showToast({
        title: '密码长度应该在6-12个字符且至少包含字母与数字',
        icon: 'none'
      })
    }
    else if (password !== checkpassword) {
      Taro.showToast({
        title: '密码输入不一致，请检查后重新输入',
        icon: 'none'
      })
    }
    else {
      //先获取用户微信openid
      Taro.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            Taro.request({
              url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/register`,
              data: {
                username: username,
                password: password,
                code: res.code
              },
              method: 'POST',
              success: function (res) {
                console.log(res.data)
                if (res.data.code == 2000) {
                  Taro.redirectTo({
                    url: '/pages/LoginPage/index'
                  })
                }
                else if (res.data.code == 2002) {
                  Taro.showToast({
                    title: '用户名已存在',
                    icon: 'none'
                  })
                }
                else {
                  console.log("网络请求失败")
                  Taro.showToast({
                    title: '网络状况不佳，请检查网络设置',
                    icon: 'none',
                    duration: 2000
                  })
                }

              },
              fail: function (res) {
                console.log("网络失败")
                Taro.showToast({
                  title: '网络状况不佳，请检查网络设置',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
          else {
            console.log(res.errMsg)
          }
        }
      })

    }
  }

  return (
    <>
      <View className="loginTop">
        <Text className="loginTitle1">创建账户</Text>
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
            placeholder='用户名长度不小于四个字符'
            value={username}
            onChange={(value) => setUsername(value)}
            className="loginInput"
          />
          <Text className="loginText">暗语</Text>
          <AtInput
            name='password'
            type='password'
            placeholder='密码长度不小于六个字符，至少包含字母和数字'
            value={password}
            onChange={(value) => setPassword(value)}
            className="loginInput"
          />
          <Text className="loginText">确认</Text>
          <AtInput
            name='password'
            type='password'
            placeholder='确认密码'
            value={checkpassword}
            onChange={(value) => setCheckpassword(value)}
          />
        </AtForm>
        <Button onClick={register} className="loginBtn">注册</Button>
      </View>

    </>
  )
}