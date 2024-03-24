import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { usePageScroll, useReachBottom } from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.scss'
import IndexListItem from '../../components/IndexListItem'
import IndexSearchBar from '../../components/IndexSearchBar'

export default function Index() {
  const data = [
    {
      id: 1,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 2,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 3,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 4,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 5,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 6,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 7,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 8,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 9,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
  ]
  //页面数据
  const [listData, setListData] = useState([])
  //监听页面滚动
  const [pageScrollValue, setPageScrollValue] = useState(0)
  //判定是否显示回顶按钮
  const [isGoingToUp, setIsGoingToUp] = useState(false)
  //判定是否到达底部
  const [isEnd, setIsEnd] = useState(false)
  //页面加载判定
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //获取接口数据

    setListData(data)
    setIsLoading(false)
  }, [])

  useLoad(() => {
    console.log('Page loaded.')
  })

  useReachBottom(() => {
    console.log('onReachBottom')
    setIsEnd(true)
  })

  //监测用户页面滑动
  usePageScroll((res) => {
    // console.log(res.scrollTop)
    if (res.scrollTop > 200) {
      setIsGoingToUp(true)
    }
    else {
      setIsGoingToUp(false)
    }
  })

  function goToTop() {
    Taro.pageScrollTo({ scrollTop: 0 })
  }

  return (
    <>
      <IndexSearchBar />
      {
        isGoingToUp ? <View className="toUpButton" onClick={goToTop}>
          <Text className='toUpBtnInner'>↑</Text>
        </View> : <></>
      }
      <ScrollView className='indexScrollViewArea' scrollX scrollWithAnimation scrollTop={0}>
        {
          isLoading ? <View className='indexLoading'>加载中...</View> :
            listData.map((item, index) => (
              <IndexListItem props={{ imgsrc: item.imgsrc, title: item.title, avatar: item.avatar, username: item.username, readnum: item.readnum, id: item.id }} />
            ))
        }
      </ScrollView>
      {
        isEnd ? <View className='indexEndText'>已经到底部了....</View> : <></>
      }
    </>
  )
}
