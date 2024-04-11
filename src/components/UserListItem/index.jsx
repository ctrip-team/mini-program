import React from "react";
import './index.scss';
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar } from "taro-ui";


export default function UserListItem({ props }) {
  // 处理浏览量，超过1万显示为万
  let showReadNum = 0

  // 跳转至用户主页
  function toUserHomePage() {
    Taro.navigateTo({
      url: `/pages/HomePage/index?user_id=${props.user_id}`
    })
  }

  return (
    <View className="UserInfoContainer">
      <View className="UserInfoAvatar" onClick={toUserHomePage}>
        <AtAvatar circle image={props.avatar} size="large"></AtAvatar>
      </View>
      <View className="UserInfomation" onClick={toUserHomePage}>
        <Text className="UserInfoName">{props.username}</Text>
        <View className="UserInfoData">
          <View className="DataView">浏览量<Text className="UserInfoText">{props.views >= 10000 ? showReadNum = (props.views / 10000).toFixed(1) + '万' : props.views}</Text></View>
          <View className="DataView">游记<Text className="UserInfoText">{props.travelnum}</Text></View>
        </View>
      </View>
    </View>
  )
}