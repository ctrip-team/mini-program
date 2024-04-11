import Taro from '@tarojs/taro'
import { View, Input, Button } from "@tarojs/components"
import React, { useState } from 'react'
import './index.scss'
import _ from 'lodash';

export default function IndexSearchBar() {
  // 搜索值
  const [queryKey, setQueryKey] = useState("")

  // 设置防抖间隔为 500 毫秒  
  const debouncedFetchData = _.debounce(handleSubmit, 500);

  // 设置搜索值
  function handleInput(e) {
    setQueryKey(e.target.value)
  }

  // 搜索处理
  function handleSubmit() {
    if (queryKey.trim() === '') {
      Taro.showToast({ title: '搜索内容不能为空哦~', icon: 'none' })
      return
    }
    else {
      Taro.navigateTo({ url: `/pages/SearchResult/index?searchKey=${queryKey}` })
      setQueryKey("")
    }
  }

  // 搜索按钮防抖处理
  function toGetResult() {
    debouncedFetchData()
  }


  return (
    <View className='searchBar'>
      <Input type='text' placeholder='请输入搜索内容' maxLength='25' className='searchInput' value={queryKey} onInput={handleInput} onConfirm={handleSubmit} />
      <Button className='searchBtn' onClick={toGetResult}>
        搜索
      </Button>
    </View>
  )
}