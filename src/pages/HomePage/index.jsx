import { View, Text, ScrollView, GridView } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import "./index.scss";
import { AtAvatar } from 'taro-ui'
import Taro from "@tarojs/taro";
import MyInfoListItem from "../../components/MyInfoListItem";

export default function HomePage() {
  const [travelList, setTravelList] = useState([])
  const [views, setViews] = useState(0)
  const [travels, setTravels] = useState(0)
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/infodata`,
      data: {
        id: Taro.getStorageSync('user').user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 2000) {
          setTravelList(res.data.data.travelList)
          setViews(res.data.data.totalView)
          setTravels(res.data.data.totalTravel)
        }
        else {
          console.log("网络请求失败")
          Taro.showToast({
            Title: '网络请求失败,请检查网络设置！',
            icon: 'none',
          })
        }
      },
      fail: function (res) {
        console.log("网络失败")
      }
    })
    setUserInfo(Taro.getStorageSync('user'))
  }, [])

  return (
    <View className="homePage">
      <View className="homePageHeader">
        <View className="infoAndData">
          <View className="person">
            <AtAvatar circle image={userInfo.avatar}></AtAvatar>
            <Text className="infoName">{userInfo.username}</Text>
          </View>
          <View className="infoData">
            <View className="infoText">创作<Text className="infoNum">{travels}</Text></View>
            <View className="infoText">浏览<Text className="infoNum">{views}</Text></View>
          </View>
        </View>
      </View>
      <View className="travelsView">
        <View className="travelsTitle">全部动态</View>
        <ScrollView scrollY className="homeScrollViewArea">
          <GridView type='masonry' mainAxisGap='10' crossAxisGap='5'>
            {
              travelList ? travelList.map((item, index) => (
                <MyInfoListItem props={{ videosrc: item.video_url, poster: item.poster, imgsrc: item.image_url, title: item.title, readnum: item.views, id: item.travel_id }} />
              )) : <View className="noneView">还没有任何游记创作哦~</View>
            }
          </GridView>
          <View className="endView">已经到底了哦~</View>
        </ScrollView>
      </View>
    </View>
  )
}