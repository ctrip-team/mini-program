import { View, Text, Button } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtSearchBar, AtIcon } from 'taro-ui'
import "./index.scss";

export default function SearchPage() {
  //输入框值
  const [queryKey, setQueryKey] = useState('')
  const [history, setHistory] = useState([])

  useEffect(() => {
    try {
      var value = Taro.getStorageSync('historySearch')
      console.log(value);
      if (value) {
        setHistory(value)
      }
    } catch (e) {
      console.log("不存在历史数据")
    }
  }, [])

  function onChange(value) {
    setQueryKey(value)
    console.log(value)
  }

  function toSearchResult() {
    if (queryKey.trim() === '') {
      Taro.showToast({ title: '搜索内容不能为空哦~', icon: 'none' })
      return
    }
    else {
      let newHistory = []
      if (history) {
        newHistory = history.filter((item) => {
          return queryKey !== item
        })
        newHistory = [queryKey, ...newHistory]
        setHistory(newHistory)
      }
      else {
        newHistory = [queryKey]
        setHistory(newHistory)
      }
      Taro.setStorage({ key: 'historySearch', data: newHistory })
      Taro.redirectTo({ url: `/pages/SearchResult/index?searchKey=${queryKey}` })
      setQueryKey('')
    }
  }

  //移除全部搜索记录
  function removeAllHistory() {
    Taro.setStorageSync('historySearch', [])
    setHistory([])
  }

  //搜索记录点击跳转
  function toSearchHistory(item) {
    Taro.redirectTo({ url: `/pages/SearchResult/index?searchKey=${item}` })
  }

  return (
    <>
      <View>
        <AtSearchBar
          value={queryKey}
          onChange={(value) => onChange(value)}
          onActionClick={() => toSearchResult()}
          onConfirm={() => toSearchResult()}
          placeholder="关键词/标题/博客主"
          focus
        />
        <View className="historyArea">
          <Text className="historyTitle">
            <Text>历史搜索</Text>
          </Text>
          <View className="trashBtn" onClick={removeAllHistory}>
            <AtIcon value='trash' size='20' color='#ccc'></AtIcon>
          </View>
          <View className="historyView">
            {
              history ? history.map((item, index) => (
                <View className="historyItem" onClick={() => { toSearchHistory(item) }}>{item}</View>
              )) : <></>
            }
          </View>
        </View>
      </View>

    </>
  )
}