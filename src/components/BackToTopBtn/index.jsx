import { View, Text } from "@tarojs/components";
import React from "react";
import { AtIcon } from 'taro-ui'

export default function BackToTopBtn() {
  return (
    <View className="toUpButton">
      <Text>↑</Text>
      <Text>回顶部</Text>
    </View>
  )
}