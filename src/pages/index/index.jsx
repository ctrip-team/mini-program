import { View, Text, ScrollView, GridView, CustomWrapper } from '@tarojs/components'
import Taro, { useReachBottom } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.scss'
import IndexListItem from '../../components/IndexListItem'
import { AtSearchBar } from 'taro-ui'
import _ from 'lodash';
import { getIndexDataAPI } from '../../apis/index'
import { showToast } from '../../utils/toast'
// import { VirtualWaterfall } from '@tarojs/components-advanced'


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

  //首页获取数据
  const getIndexData = async () => {
    const res = await getIndexDataAPI()
    if (res.data.code == 2000) {
      listData.length ? setListData([...listData, ...res.data.data]) : setListData(res.data.data)
    }
    else {
      showToast('网络请求失败,请检查网络设置！')
    }
  }

  useEffect(() => {
    console.log(Taro.getSystemInfoSync().windowHeight)
    console.log(Taro.getSystemInfoSync().windowWidth)
    //获取接口数据
    getIndexData()
  }, [])

  function getNextData() {
    //限制数据，防止崩溃
    if (listData.length >= 500) {
      setNoData(true)
    }
    else {
      setShowLoading(true);
      getIndexData()
      setShowLoading(false);
    }
  }

  useReachBottom(() => {
    console.log('onReachBottom')
    throttledFetchData()
  })

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
        {/* <VirtualWaterfall
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
        /> */}

        {
          <CustomWrapper>
            <GridView type='masonry' mainAxisGap='10' crossAxisGap='5'>
              {
                listData.map((item, index) => (
                  <IndexListItem props={{ video_url: item.video_url, poster_url: item.poster_url, image_url: item.image_url, title: item.title, avatar: item.avatar, username: item.username, views: item.views, travel_id: item.travel_id }} />
                ))
              }
            </GridView>
          </CustomWrapper>
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