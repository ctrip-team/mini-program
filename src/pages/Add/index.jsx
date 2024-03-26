import React from "react";
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import Taro from "@tarojs/taro";

export default function Add() {
  Taro.hideTabBar(); // 隐藏底部导航栏
  useLoad(() => {
    console.log('Page loaded.')
  })
  // 模拟页面加载
  return (
    <View>add</View>
  )
}