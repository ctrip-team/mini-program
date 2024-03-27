import { View, Button } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtSearchBar } from 'taro-ui'

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
      const newHistory = []
      if (history) {
        const newHistory = [...history, queryKey]
        setHistory(newHistory)
      }
      else {
        const newHistory = [queryKey]
        setHistory(newHistory)
      }
      Taro.setStorageSync({ key: 'historySearch', data: newHistory })
      Taro.redirectTo({ url: `/pages/SearchResult/index?searchKey=${queryKey}` })
      setQueryKey('')
    }
  }

  function historySearch(text) {
    console.log(text)
  }

  console.log(history);


  return (
    <>
      <AtSearchBar
        value={queryKey}
        onChange={(value) => onChange(value)}
        onActionClick={() => toSearchResult()}
        onConfirm={() => toSearchResult()}
        placeholder="关键词/标题/博客主/标签"
      />
      <View></View>
      <View>
        <View>历史搜索</View>
        {
          history ? history.map((item, index) => {
            console.log(item);
            <Button type='primary' size='30' onClick={((item) => historySearch(item))}>{item}</Button>
          }) : <></>
        }
      </View>
    </>
  )
}