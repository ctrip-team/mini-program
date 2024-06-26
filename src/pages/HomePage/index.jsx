import { View, Text, ScrollView, GridView, Image } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import "./index.scss";
import { AtAvatar } from 'taro-ui'
import Taro from "@tarojs/taro";
import MyInfoListItem from "../../components/MyInfoListItem";
import NoneImage from "../../assets/img/none.jpg";
import { getHomePageDataAPI } from '../../apis/my';
import { showToast } from '../../utils/toast'

export default function HomePage() {
  //游记列表数据
  const [travelList, setTravelList] = useState([])
  //浏览量
  const [views, setViews] = useState(0)
  //创作量
  const [travels, setTravels] = useState(0)
  //用户信息
  const [userInfo, setUserInfo] = useState({})

  //浏览量
  let showReadNum = 0

  //获取个人主页数据
  const getHomePageData = async () => {
    const data = {
      id: Taro.getCurrentInstance().router.params.user_id
    }
    const res = await getHomePageDataAPI(data)
    if (res.data.code == 2000) {
      setTravelList(res.data.data.travelList)
      setViews(res.data.data.totalView)
      setTravels(res.data.data.totalTravel)
      setUserInfo(res.data.data.userInfo)
    }
    else {
      showToast('网络请求失败,请检查网络设置！')
    }
  }

  useEffect(() => {
    getHomePageData()
  }, [])

  return (
    <View className="homePage">
      <View className="homePageHeader">
        <View className="infoAndData">
          <View className="person">
            <AtAvatar circle image={userInfo.avatar} className="avatar"></AtAvatar>
            <Text className="infoName">{userInfo.username}</Text>
          </View>
          <View className="infoData">
            <View className="infoText">创作<Text className="infoNum">{travels}</Text></View>
            <View className="infoText">
              浏览
              <Text className="infoNum">
                {
                  views >= 10000 ? showReadNum = (views / 10000).toFixed(1) + '万' : views
                }
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="travelsView">
        {
          travelList.length ?
            <>
              <View className="travelsTitle">全部动态</View>
              <View className="travelsList">
                <ScrollView scrollY className="homeScrollViewArea">
                  <GridView type='masonry' mainAxisGap='10' crossAxisGap='5'>
                    {
                      travelList.map((item, index) => (
                        <MyInfoListItem props={{ video_url: item.video_url, poster_url: item.poster_url, image_url: item.image_url, title: item.title, views: item.views, travel_id: item.travel_id }} />
                      ))
                    }
                  </GridView>
                </ScrollView>
              </View>
            </> : <></>
        }
        {
          travelList.length ?
            <View className="endView">已经到底了哦~</View> :
            <View className="noneView">
              <Image src={NoneImage} className="noneViewIcon"></Image>
              <Text>这个号很神秘，没有留下什么印记~</Text>
            </View>
        }
      </View>
    </View>
  )
}