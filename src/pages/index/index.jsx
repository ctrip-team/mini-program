import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.scss'
import IndexListItem from '../../components/IndexListItem'
import { AtSearchBar } from 'taro-ui'
import _ from 'lodash';
import { VirtualWaterfall } from '@tarojs/components-advanced'

export default function Index() {

  //页面数据
  const [listData, setListData] = useState([])
  //判定是否到达底部
  const [noData, setNoData] = useState(false);
  //页面加载判定
  const [showLoading, setShowLoading] = useState(false);
  //搜索框
  const [value, setValue] = useState('')

  // 设置节流间隔为 500 毫秒  
  const throttledFetchData = _.throttle(getNextData, 500);

  useEffect(() => {
    console.log(Taro.getSystemInfoSync().windowHeight)
    console.log(Taro.getSystemInfoSync().windowWidth)
    //获取接口数据
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/index`,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 2000) {
          setListData(res.data.data)
        }
        else {
          console.log("网络请求失败")
          Taro.showToast({
            Title: '网络请求失败,请检查网络设置！',
            icon: 'none',
          })
        }

      },
      fail: function (res) {
        console.log(res);
        console.log("网络失败")
      }
    })
  }, [])


  function getNextData() {
    //限制数据，防止崩溃
    if (listData.length >= 500) {
      setNoData(true)
    }
    else {
      setShowLoading(true);
      Taro.request({
        url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/index`,
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 2000) {
            setListData((prevDataList) => [...prevDataList, ...res.data.data]);
          }
          else if (res.statusCode == 429) {
            Taro.showToast({
              title: '请求频繁，请稍后再试',
              icon: 'none',
              duration: 2000
            })
          }
          else {
            console.log("网络请求失败")
            Taro.showToast({
              title: '网络状况不佳，请检查网络设置',
              icon: 'none',
              duration: 2000
            })
          }

        },
        fail: function (res) {
          console.log(res);
          console.log("网络失败")
          Taro.showToast({
            title: '网络状况不佳，请检查网络设置',
            icon: 'none',
            duration: 2000
          })
        }
      })
      setShowLoading(false);
    }
  }

  function onScrollLower() {
    throttledFetchData()
  }

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
      <ScrollView className='indexScrollViewArea'>
        <VirtualWaterfall
          height={800}
          width={'100%'}
          item={({ data, id, index }) => {
            return <IndexListItem id={id} props={data[index]} />;
          }}
          itemData={listData}
          itemCount={listData.length}
          unlimitedSize
          column={2}
          lowerThreshold={100}
          onScrollToLower={onScrollLower}
          placeholderCount={10}
          overscanDistance={100}
          enhanced
        />
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