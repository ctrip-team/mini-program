import Taro from '@tarojs/taro'
import { View, Input, Button } from "@tarojs/components"
import React, { useState } from 'react'
import './index.scss'

export default function IndexSearchBar() {
  const [queryKey, setQueryKey] = useState("")

  function handleInput(e) {
    setQueryKey(e.target.value)
  }

  function handleSubmit() {
    console.log(queryKey)
    console.log('click222')
    if (queryKey.trim() === '') {
      Taro.showToast({ title: '搜索内容不能为空哦~', icon: 'none' })
      return
    }
    else {
      Taro.navigateTo({ url: `/pages/SearchResult/index?searchKey=${queryKey}` })
      setQueryKey("")
    }
  }


  return (
    <View className='searchBar'>
      <Input type='text' placeholder='请输入搜索内容' maxLength='25' className='searchInput' value={queryKey} onInput={handleInput} onConfirm={handleSubmit} />
      <Button className='searchBtn' onClick={handleSubmit}>
        搜索
      </Button>
    </View>
  )
}