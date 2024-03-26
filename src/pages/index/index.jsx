import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { usePageScroll, useReachBottom } from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'
import React, { useState, useEffect, useRef } from 'react'
import './index.scss'
import IndexListItem from '../../components/IndexListItem'
import IndexSearchBar from '../../components/IndexSearchBar'

export default function Index() {
  let data1 = [
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
  ]

  let data2 = [
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
    {
      id: 10,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 11,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 12,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 13,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 14,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
    {
      id: 15,
      title: '丽江三天两晚双人游',
      avatar: 'https://jdc.jd.com/img/200',
      username: 'admin',
      readnum: 666,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739'
    },
  ]


  //页面数据
  const [listData, setListData] = useState([])
  //后续页面数据
  const [nextListData, setNextListData] = useState([])
  //监听页面滚动
  const [pageScrollValue, setPageScrollValue] = useState(0)
  //判定是否显示回顶按钮
  const [showButton, setShowButton] = useState(false)
  //判定是否到达底部
  const [noData, setNoData] = useState(false);
  //页面加载判定
  const [showLoading, setShowLoading] = useState(false);


  useEffect(() => {
    //获取接口数据

    setListData(data1)
    setNextListData(data2)

  }, [])

  useLoad(() => {
    console.log('Page loaded.')
  })

  useReachBottom(() => {
    console.log('onReachBottom')

  })

  //监测用户页面滑动
  usePageScroll((res) => {
    if (res.scrollTop >= 200 && !showButton) {
      setShowButton(true)
    }
    else if (res.scrollTop < 200 && showButton) {
      setShowButton(false)
    }
    // setPageScrollValue(res.scrollTop)
  })

  function onPullDownRefresh() {
    // 滚动到距离底部 50px 时触发加载更多数据

    // 模拟加载数据
    // 模拟异步加载数据
    if (nextListData.length == 0) {
      setNoData(true)
    }
    else {
      setShowLoading(true);
      setTimeout(() => {
        setListData((prevDataList) => [...prevDataList, ...nextListData]);
        setShowLoading(false);
      }, 1000);
      setNextListData([])
    }

  }


  function goToTop() {
    Taro.pageScrollTo({ scrollTop: 0 })
  }

  return (
    <>
      <IndexSearchBar />
      {/* {
        <View className={`back-to-top-button ${showButton ? 'show' : ''}`} onClick={goToTop}>
          <Text className='toUpBtnInner'>↑</Text>
        </View>
      } */}
      {/* scrollTop={0}scrollWithAnimation */}
      <ScrollView className='indexScrollViewArea' scrollY lowerThreshold={50} onScrollToLower={onPullDownRefresh}>

        {
          listData.map((item, index) => (
            <IndexListItem props={{ imgsrc: item.imgsrc, title: item.title, avatar: item.avatar, username: item.username, readnum: item.readnum, id: item.id }} />
          ))
        }
        {
          showLoading && (
            <View className="loading">
              <Text className='indexEndText'>加载中...</Text>
            </View>
          )
        }
        {
          noData && (
            <View className="no-data">
              <Text className='indexEndText'>已经到底部了....</Text>
            </View>
          )
        }
      </ScrollView>
    </>
  )
}