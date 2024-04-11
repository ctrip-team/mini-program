import React, { useEffect, useState } from "react";
import { Button, View, Form, Input, Image, Text } from "@tarojs/components";
import { AtAvatar } from 'taro-ui'
import Taro from "@tarojs/taro";
import './index.scss';
import loginBg from "../../assets/img/login_bg.png";
import { showToast } from '../../utils/toast'

export default function InfoPage() {
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isUpload, setIsUpload] = useState(false)

  useEffect(() => {
    if (!Taro.getStorageSync('user')) {
      Taro.redirectTo({
        url: '/pages/LoginPage/index'
      })
    }
  }, [])


  function chooseAvatar() {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        setAvatar(tempFilePaths[0])
        setIsUpload(true)
      }
    })
  }

  function handleSubmit(e) {
    updateInfo(e.detail.value);
  }

  function updateInfo({ username, password }) {
    if (isUpload) {
      Taro.uploadFile({
        url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/user/update`,
        filePath: avatar,
        name: 'avatar',
        formData: {
          username,
          password,
          userId: user.user_id
        },
        success(res) {
          showToast('更新成功')
          Taro.setStorageSync('user', JSON.parse(res.data).user)
          setUser(JSON.parse(res.data).user)
        }
      })
    }
    else {
      if (username === user.username && password === user.password) {
        showToast('保存成功')
      } else {
        Taro.request({
          url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/user/updateInfo`,
          method: 'POST',
          data: {
            username,
            password,
            userId: user.user_id
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            Taro.setStorageSync('user', res.data.user)
            setUser(res.data.user)
          }
        })
      }
    }
  }

  function handleUsernameInput(e) {
    setUsername(e.detail.value)
  }

  function handlePasswordInput(e) {
    setPassword(e.detail.value)
  }

  useEffect(() => {
    const currentUser = Taro.getStorageSync('user')
    setUser(currentUser)
    setAvatar(currentUser.avatar)
    setUsername(currentUser.username)
    setPassword(currentUser.password)
  }, [])

  return (
    <>
      <View className="loginBgI">
        <Image className="loginBg" src={loginBg} />
      </View>
      <View className="loginTop">
        <Text className="loginTitle1">编辑信息</Text>
        <Text className="loginTitle2">请在以下表格编辑您的凭据:</Text>
      </View>
      <View className="userInfo-container">
        {/* 头像 */}
        <View className="user-avatar" onClick={chooseAvatar} >
          <AtAvatar circle image={avatar} size="large" />
        </View>

        {/* 用户名&密码 */}
        <Form onSubmit={handleSubmit} className="user-info-form">
          <View className="info-wrap">
            <View className="info" >
              <Text>用户名</Text>
              <Input type='text' placeholder='用户名' name='username' value={username} onInput={handleUsernameInput} />
            </View>
          </View>

          <View className="info-wrap">
            <View className="info">
              <Text>密码</Text>
              <Input type='text' placeholder='密码' name='password' value={password} onInput={handlePasswordInput} />
            </View>
          </View>

          <View className="save-button">
            <Button formType='submit'>保存编辑</Button>
          </View>
        </Form >
      </View>
    </>
  )
}