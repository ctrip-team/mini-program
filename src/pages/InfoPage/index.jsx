import React, { useEffect, useState } from "react";
import { Button, View, Form, Input, Image, Text } from "@tarojs/components";
import { AtAvatar } from 'taro-ui'
import Taro from "@tarojs/taro";
import './index.scss';

export default function InfoPage() {

  const user = Taro.getStorageSync('user')
  const [userAvatar, setUserAvatar] = useState('')

  function chooseAvatar() {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths', tempFilePaths);
        setUserAvatar(tempFilePaths[0])
      }
    })
  }

  function handleSubmit(e) {
    updateInfo(e.detail.value);
  }

  function updateInfo({ username, password }) {
    Taro.uploadFile({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/user/update`,
      filePath: userAvatar,
      name: 'avatar',
      formData: {
        username,
        password,
        userId: user.user_id
      },
      success(res) {
        const data = res.data
        console.log(data);
        Taro.showToast({
          title: '更新成功',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

  useEffect(() => {
    setUserAvatar(user.avatar)
  }, [])

  return (
    <>
      <View className="userInfo-container">

        {/* 头像 */}
        <View className="user-avatar" onClick={chooseAvatar} >
          <AtAvatar circle image={userAvatar} size="large" />
        </View>

        {/* 用户名&密码 */}
        <Form onSubmit={handleSubmit} className="user-info-form">
          <View className="info-wrap">
            <View className="info" >
              <Text>用户名</Text>
              <Input type='text' placeholder='用户名' name='username' value={user.username} />
            </View>
          </View>

          <View className="info-wrap">
            <View className="info">
              <Text>密码</Text>
              <Input type='text' placeholder='密码' name='password' value={user.password} />
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