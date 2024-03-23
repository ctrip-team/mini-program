import { View, ScrollView } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import React, { useState } from 'react'
import './index.scss'
import MyTabBar from '../../components/MyTabBar'
import IndexListItem from '../../components/IndexListItem'


export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const [queryValue, setQueryValue] = useState('')

  return (
    <>
      <ScrollView className='indexScrollViewArea' scrollX>
        <AtSearchBar
          value={queryValue}
          onChange={value => setQueryValue(value)}
          onActionClick={() => {
            // 处理搜索逻辑
            console.log('执行搜索操作');
          }}
        />
        <IndexListItem />
        <IndexListItem />
        <IndexListItem />
        <IndexListItem />
        <IndexListItem />
        <IndexListItem />
      </ScrollView>
      <MyTabBar />
    </>
  )
}
