import { View, Text, ScrollView, GridView } from '@tarojs/components'
import Taro, { useReachBottom } from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.scss'
import IndexListItem from '../../components/IndexListItem'
import IndexSearchBar from '../../components/IndexSearchBar'
import { AtSearchBar } from 'taro-ui'

export default function Index() {

  //页面数据
  const [listData, setListData] = useState([])
  //后续页面数据
  const [nextListData, setNextListData] = useState([])
  //监听页面滚动
  const [pageScrollValue, setPageScrollValue] = useState(0)
  //判定是否到达底部
  const [noData, setNoData] = useState(false);
  //页面加载判定
  const [showLoading, setShowLoading] = useState(false);
  //搜索框
  const [value, setValue] = useState('')


  useEffect(() => {
    //获取接口数据
    Taro.request({
      url: 'http://127.0.0.1:3000/api/index',
      data: {
        page: 1,
        pageSize: 8
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        setListData(res.data)
      },
      fail: function (res) {
        console.log("网络失败")
      }
    })

  }, [])

  useLoad(() => {
    console.log('Page loaded.')
  })

  useReachBottom(() => {
    console.log('onReachBottom')
    // 异步加载数据
    if (listData.length >= 100) {
      setNoData(true)
    }
    else {
      setShowLoading(true);
      setTimeout(() => {
        Taro.request({
          url: 'http://127.0.0.1:3000/api/index',
          data: {
            page: 1,
            pageSize: 8
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            setNextListData(res.data)
            setListData((prevDataList) => [...prevDataList, ...nextListData]);
          },
          fail: function (res) {
            console.log("网络失败")
            Taro.showToast({
              title: '网络状况不佳，请检查网络设置',
              icon: 'error',
              duration: 2000
            })
          }
        })
      }, 200);
      setShowLoading(false);
      setNextListData([])
    }
  })

  //搜索框响应
  function onChange(value) {
    setValue(value)
    console.log(value)
  }

  function toSearchPage() {
    Taro.navigateTo({
      url: '/pages/SearchPage/index'
    })
  }

  return (
    <>
      <View onClick={toSearchPage}>
        <AtSearchBar
          value={value}
          onChange={(value) => onChange(value)}
          disabled
          placeholder='搜索关键词/标题/博客主'
        />
      </View>
      <ScrollView className='indexScrollViewArea' scrollY >
        {
          <GridView type='masonry' mainAxisGap='10' crossAxisGap='5'>
            {
              listData.map((item, index) => (
                <IndexListItem props={{ imgsrc: item.imgsrc, title: item.title, avatar: item.avatar, username: item.username, readnum: item.readnum, id: item.id }} />
              ))
            }
          </GridView>
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