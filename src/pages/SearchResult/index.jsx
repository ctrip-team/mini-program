import { View, Text, ScrollView, GridView, Button } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import Taro, { getCurrentInstance, useReachBottom } from "@tarojs/taro";
import IndexListItem from "../../components/IndexListItem/index";
import UserListItem from "../../components/UserListItem";
import { AtSearchBar, AtIcon } from "taro-ui";
import "./index.scss";

export default function SearchResult() {

  //获取传递的参数
  let params = getCurrentInstance().router.params
  let searchKey = params.searchKey

  //判定是否到达底部
  const [noData, setNoData] = useState(false)
  //页面加载判定
  const [showEnd, setShowEnd] = useState(false)
  //搜索框
  const [value, setValue] = useState(searchKey)
  //页面数据
  const [listData, setListData] = useState([])
  //搜索模式
  const [searchMode, setSearchMode] = useState(false)

  useEffect(() => {
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/searchTitle`,
      data: {
        searchKey: searchKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 2000) {
          setListData(res.data.data)
        }
        else if (res.data.code == 2001) {
          setShowEnd(true)
        }
        else {
          console.log("请求失败")
          Taro.showToast({
            title: '获取结果失败,请检查网络设置',
            icon: 'none',
          })
        }
      },
      fail: function (res) {
        console.log("网络失败")
      }
    })
  }, [])

  useReachBottom(() => {
    setNoData(true)
  })

  //搜索框响应
  function onChange(value) {
    setValue(value)
    console.log(value)
  }

  function toSearchPage() {
    Taro.redirectTo({
      url: '/pages/SearchPage/index'
    })
  }

  function getAllResult() {
    setShowEnd(false)
    setNoData(false)
    setSearchMode(false)
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/searchTitle`,
      data: {
        searchKey: searchKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 2000) {
          setListData(res.data.data)
        }
        else if (res.data.code == 2001) {
          setListData([])
          setShowEnd(true)
        }
        else {
          console.log("请求失败")
          Taro.showToast({
            title: '获取结果失败,请检查网络设置',
            icon: 'none',
          })
        }
      },
      fail: function (res) {
        console.log("网络失败")
      }
    })
  }

  function getUserResult() {
    setShowEnd(false)
    setNoData(false)
    setSearchMode(true)
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/index/searchUser`,
      data: {
        searchKey: searchKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 2000) {
          setListData(res.data.data)
        }
        else if (res.data.code == 2001) {
          setListData([])
          setShowEnd(true)
        }
        else {
          console.log("请求失败")
          Taro.showToast({
            title: '获取结果失败,请检查网络设置',
            icon: 'none',
          })
        }
      },
      fail: function (res) {
        console.log("网络失败")
      }
    })
  }

  const renderBorder = () => {
    if (!searchMode) {
      return <div className="border-under" id="border-under-all" />;
    }
    else {
      return <div className="border-under" id="border-under-user" />;
    }
  };

  return (
    <>
      <View className="page">
        <View onClick={toSearchPage}>
          <AtSearchBar
            value={value}
            onChange={(value) => onChange(value)}
            disabled
          />
        </View>
        <View className="searchTypeSelectBtn">
          <View className={`typeBtn ${searchMode === false ? 'selected' : ''}`} onClick={getAllResult}>全部</View>
          <View className={`typeBtn ${searchMode === true ? 'selected' : ''}`} onClick={getUserResult}>用户</View>
        </View>
        {
          searchMode ?
            <ScrollView className='indexScrollViewAreaOfUser' scrollY>
              {
                showEnd && (
                  <View className="noneRs">
                    <AtIcon value='file-generic' size='50' color='#ccc' className="noneRsIcon"></AtIcon>
                    <Text>暂无符合条件的结果</Text>
                  </View>
                )
              }
              {
                <GridView type='masonry' mainAxisGap='2' crossAxisCount="1" crossAxisGap='0'>
                  {
                    listData && listData.map((item, index) => (
                      <UserListItem props={{ avatar: item.avatar, username: item.username, views: item.total_views, user_id: item.user_id, travelnum: item.total_travels }} />
                    ))
                  }
                </GridView>
              }
              {
                noData && (
                  <View className="no-data">
                    <Text className='indexEndText'>已经到底部了....</Text>
                  </View>
                )
              }
            </ScrollView>
            :
            <ScrollView className='indexScrollViewArea' scrollY>
              {
                showEnd && (
                  <View className="noneRs">
                    <AtIcon value='file-generic' size='50' color='#ccc' className="noneRsIcon"></AtIcon>
                    <Text>暂无符合条件的结果</Text>
                  </View>
                )
              }
              {
                <GridView type='masonry' mainAxisGap='10' crossAxisGap='5' crossAxisCount="2">
                  {
                    listData && listData.map((item, index) => (
                      <IndexListItem props={{ poster_url: item.poster_url, video_url: item.video_url, image_url: item.image_url, title: item.title, avatar: item.avatar, username: item.username, views: item.views, travel_id: item.travel_id }} />
                    ))
                  }
                </GridView>
              }
              {
                noData && (
                  <View className="no-data">
                    <Text className='indexEndText'>已经到底部了....</Text>
                  </View>
                )
              }
            </ScrollView>
        }
      </View>
    </>
  )
}