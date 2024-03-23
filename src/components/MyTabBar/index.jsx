import React, { useState } from 'react'
import { AtTabBar } from 'taro-ui'



export default function MyTabBar() {
  // const [current, setCurrent] = useState(0)
  // function handleClick(value) {
  //   setCurrent(value)
  // }

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
      // onClick={handleClick()}
      // current={setCurrent(current)}
      />
    </>
  )
}
