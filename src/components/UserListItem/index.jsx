import React from "react";
import './index.scss';
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar } from "taro-ui";


export default function UserListItem({ props }) {
  return (
    <View>
      <View>
        <AtAvatar circle image={props.avatar}></AtAvatar>
        <Text>{props.username}</Text>
      </View>
      <View>
        <View>浏览量<Text>{props.views}</Text></View>
        <View>游记<Text>{props.travelnum}</Text></View>
      </View>
    </View>
  )
}