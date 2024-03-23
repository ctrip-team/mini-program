import { View, ScrollView } from '@tarojs/components'
import Taro, { useReachBottom } from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import React, { useState } from 'react'
import './index.scss'
import MyTabBar from '../../components/MyTabBar'
import IndexListItem from '../../components/IndexListItem'


export default function Index() {
  const [listData, setListData] = useState([])
  useLoad(() => {
    console.log('Page loaded.')
    const data = [] //获取接口数据

    setListData(data)
  })

  const [queryValue, setQueryValue] = useState('')



  return (
    <>
      <AtSearchBar
        actionName='搜一下'
        value={queryValue}
        onChange={value => setQueryValue(value)}
        onActionClick={() => {
          // 处理搜索逻辑
          console.log('执行搜索操作');
        }}
      />
      <ScrollView className='indexScrollViewArea' scrollX scrollWithAnimation='true'>
        {
          listData.map((item, index) => {
            <IndexListItem imgsrc={item.imgsrc} title={item.title} avatar={item.avatar} username={item.username} readnum={item.readnum} id={item.id} />
          })
        }
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
