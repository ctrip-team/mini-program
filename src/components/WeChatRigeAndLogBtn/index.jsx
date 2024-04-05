import React, { useState } from "react";
import { Button } from "@tarojs/components";
import './index.scss'
import Taro from "@tarojs/taro";

export default function WeChatRigeAndLogBtn() {

  function registerByWeChat() {
    // 可以通过 Taro.getSetting 先查询一下用户是否授权
    Taro.getSetting({
      success: function (res) {
        Taro.authorize({
          scope: 'scope.userInfo',
          success: function () {
            if (res.authSetting['scope.userInfo']) {
              // 用户已经授权过，可以直接获取用户信息
              getUserInfo();

            } else {
              // 用户未授权，需要弹出授权窗口
              showAuthModal();
            }
          }
        })
      }
    })
  }

  const showAuthModal = () => {
    Taro.showModal({
      title: '授权提示',
      content: '需要获取您的用户信息',
      confirmText: '去授权',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 用户点击确认，打开授权设置页面
          openSetting();
        }
      }
    });
  };

  const openSetting = () => {
    // Taro.openSetting：调起客户端小程序设置界面，返回用户设置的操作结果。设置界面只会出现小程序已经向用户请求过的权限。
    Taro.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 用户授权成功，可以获取用户信息
          getUserInfo()
        } else {
          // 用户拒绝授权，提示授权失败
          Taro.showToast({
            title: '授权失败',
            icon: 'none'
          });
        }
      }
    });
  };

  const getUserInfo = () => {
    Taro.getUserInfo({
      success: function (res) {
        console.log(147852);
        //获取哦open_id
        getOpenId(res.userInfo.nickName, res.userInfo.avatarUrl)

        // var userInfo = res.userInfo
        // var nickName = userInfo.nickName
        // var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
      },
      complete: function () {
        console.log(25369);
      }
    })
  };

  function getOpenId(username, avatar) {
    Taro.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          Taro.request({
            url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/getOpenId`,
            data: {
              code: res.code
            },
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if (res.data.code == 2000) {
                // setOpenId(res.data.data)
                isExist(res.data.data, username, avatar)
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

  function isExist(openId, username, avatar) {
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/queryIsExit`,
      data: {
        openId: openId
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 2000) {
          // loginProcess(openId)
          Taro.setStorageSync('user', res.data.data)
          Taro.reLaunch({
            url: '/pages/my/my'
          })
        }
        else if (res.data.code == 2001) {
          registerProcess(username, avatar, openId)
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


  function registerProcess(username, avatar, openId) {
    //发起网络请求
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/registerByWeChat`,
      data: {
        username: username,
        password: '123456x',
        avatar: avatar,
        openId: openId
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 2000) {
          const mydata = {
            username: username,
            password: '123456x',
            avatar: avatar,
            user_id: openId
          }
          Taro.setStorageSync('user', mydata)
          Taro.reLaunch({
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

  function loginByWeChat() {
    registerByWeChat()
  }

  return (
    <>
      <Button onClick={loginByWeChat} className="loginBtnWeChat">微信快捷登录/注册</Button>
    </>
  )
}
