import Taro from '@tarojs/taro'
import { View } from "@tarojs/components"
import { AtSearchBar } from 'taro-ui'
import React, { useState } from 'react'
import './index.scss'

export default function IndexSearchBar() {
  const [queryKey, setQueryKey] = useState("");

  return (
    <View className='searchBar'>
      <AtSearchBar
        onActionClick={() => {
          console.log('click111');
          // Taro.navigateTo({ url: `/sub-query-pages/goods-list/index?searchKey=${queryKey}` });
        }}
        focus={true}
        value={queryKey}
        placeholder="请输入搜索条件"
        onChange={(value) => {
          setQueryKey(value);
        }}
      />
    </View>
  )
}