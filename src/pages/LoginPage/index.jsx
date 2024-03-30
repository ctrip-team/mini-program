import React, { useState } from "react";
import { Button } from "@tarojs/components";
import { AtInput, AtForm } from 'taro-ui'
import Taro from "@tarojs/taro";

export default function LoginPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function login() {
    // 处理登录逻辑
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
    else {
      Taro.request({
        url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/login`,
        data: {
          username: username,
          password: password
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 2000) {
            Taro.setStorageSync('user', res.data.data[0])
            Taro.switchTab({
              url: '/pages/my/my'
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
  }

  return (
    <>
      <AtForm>
        <AtInput
          name='username'
          title='用户名'
          type='text'
          placeholder='请输入您的用户名'
          value={username}
          onChange={(value) => setUsername(value)}
        />
        <AtInput
          name='password'
          title='密码'
          type='password'
          placeholder='请输入您的密码'
          value={password}
          onChange={(value) => setPassword(value)}
        />
      </AtForm>
      <Button onClick={login}>登录</Button>
    </>
  )
}