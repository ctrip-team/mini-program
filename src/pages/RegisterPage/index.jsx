import React, { useState } from "react";
import { View, Button, Image, Text } from "@tarojs/components";
import { AtInput, AtForm } from 'taro-ui'
import Taro from "@tarojs/taro";
import './index.scss'
import loginBg from "../../assets/img/login_bg.png";
import { userRegisterAPI } from "../../apis/my";
import { showToast } from '../../utils/toast';

export default function RegisterPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [checkpassword, setCheckpassword] = useState('')

  //用户注册
  const userRegister = async (code) => {
    const data = {
      username: username,
      password: password,
      code: code,
    }
    const res = await userRegisterAPI(data)
    if (res.data.code == 2000) {
      Taro.redirectTo({
        url: '/pages/LoginPage/index'
      })
    }
    else if (res.data.code == 2002) {
      showToast('用户名已存在')
    }
    else {
      showToast('网络状况不佳，请检查网络设置')
    }
  }

  function register() {
    // 处理注册逻辑
    const regexOfUrn = /^.{4,12}$/
    const regexOfPwd = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/
    if (username === '' || password === '') {
      showToast('用户名或密码不能为空')
    }
    else if (!regexOfUrn.test(username)) {
      showToast('用户名长度应该在4-12个字符')
    }
    else if (!regexOfPwd.test(password)) {
      showToast('密码长度应该在6-12个字符且至少包含字母与数字')
    }
    else if (password !== checkpassword) {
      showToast('密码输入不一致，请检查后重新输入')
    }
    else {
      //先获取用户微信openid
      Taro.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            userRegister(res.code)
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
      <View className="registerTop">
        <Text className="registerTitle1">创建账户</Text>
        <Text className="registerTitle2">请按以下表格输入您的凭据:</Text>
      </View>
      <View className="registerBgI">
        <Image className="registerBg" src={loginBg} />
      </View>
      <View className="registerFormContainer">
        <AtForm>
          <Text className="registerText">用户名</Text>
          <AtInput
            name='username'
            type='text'
            placeholder='用户名长度不小于四个字符'
            value={username}
            onChange={(value) => setUsername(value)}
            className="registerInput"
          />
          <Text className="registerText">暗语</Text>
          <AtInput
            name='password'
            type='password'
            placeholder='密码长度不小于六个字符，至少包含字母和数字'
            value={password}
            onChange={(value) => setPassword(value)}
            className="registerInput"
          />
          <Text className="registerText">确认</Text>
          <AtInput
            name='password'
            type='password'
            placeholder='确认密码'
            value={checkpassword}
            onChange={(value) => setCheckpassword(value)}
          />
        </AtForm>
        <Button onClick={register} className="registerBtn">注册</Button>
        {/* <Button onClick={registerByWeChat} className="registerBtnWeChat">
          <Image src={'https://img.zcool.cn/community/016b02566588d16ac725b2c850390c.png@1280w_1l_2o_100sh.png'}></Image>
          微信快速注册
        </Button> */}
      </View>

    </>
  )
}