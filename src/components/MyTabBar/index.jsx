import React, { useState } from 'react'
import { AtTabBar } from 'taro-ui'



export default function MyTabBar() {
  const [indexCurrent, setIndexCurrent] = useState(0)
  function handleClick(value) {
    setIndexCurrent(value)
  }


  const tabList = [
    {
      title: '首页',
      iconType: 'list',
      pagePath: '/pages/index/index'
    },
    {
      title: '我的',
      iconType: 'user',
      pagePath: '/pages/index/index'
    },
  ]

  return (
    <>
      <AtTabBar
        fixed
        tabList={tabList}
        onClick={handleClick(1)}
        current={indexCurrent}
        className='tabbar'
      />
    </>
  )
}
