import { View, Text, ScrollView, GridView, Button } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import Taro, { getCurrentInstance, useReachBottom } from "@tarojs/taro";
import IndexListItem from "../../components/IndexListItem/index";
import UserListItem from "../../components/UserListItem";
import { AtSearchBar, AtIcon } from "taro-ui";
import { getSearchDataAPI, getUserSearchDataAPI } from '../../apis/index'
import "./index.scss";
import _ from 'lodash';
import { showToast } from '../../utils/toast';


export default function SearchResult() {

  //获取传递的参数
  let params = getCurrentInstance().router.params
  let searchKey = params.searchKey

  //判定是否到达底部
  const [noData, setNoData] = useState(false)
  //页面无数据判定
  const [showEnd, setShowEnd] = useState(false)
  //搜索框
  const [value, setValue] = useState(searchKey)
  //页面数据
  const [listData, setListData] = useState([])
  //搜索模式
  const [searchMode, setSearchMode] = useState(false)
  //数据页数
  const [dataPage, setDataPage] = useState(0)

  // 设置节流间隔为 500 毫秒  
  const throttledFetchData = _.throttle(getNextData, 500);

  //获取全部结果数据
  const getSearchData = async () => {
    const data = {
      searchKey: searchKey,
      dataPage: dataPage * 10
    }
    const res = await getSearchDataAPI(data)
    if (res.data.code === 2000) {
      console.log(res.data.data);
      listData.length ? setListData([...listData, ...res.data.data]) : setListData(res.data.data)
      setDataPage(dataPage + 1)
    }
    else if (res.data.code == 2001) {
      setListData([])
      setShowEnd(true)
    }
    else if (res.statusCode == 429) {
      showToast('请求频繁，请稍后再试')
    }
    else {
      showToast('获取结果失败,请检查网络设置')
    }
  }

  //获取用户结果数据
  const getUserSearchData = async () => {
    const data = {
      searchKey: searchKey,
    }
    const res = await getUserSearchDataAPI(data)
    if (res.data.code == 2000) {
      setListData(res.data.data)
    }
    else if (res.data.code == 2001) {
      setListData([])
      setShowEnd(true)
    }
    else if (res.statusCode == 429) {
      showToast('请求频繁，请稍后再试')
    }
    else {
      showToast('获取结果失败,请检查网络设置')
    }
  }

  useEffect(() => {
    getFirstData()
  }, [])

  useReachBottom(() => {
    if (!searchMode && listData.length < 10) {
      setNoData(true)
    }
    else if (!searchMode && listData.length >= 10) {
      throttledFetchData()
    }
    else if (searchMode) {
      setNoData(true)
    }
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

  function getFirstData() {
    setListData([])
    setShowEnd(false)
    setNoData(false)
    setSearchMode(false)
    getSearchData()
  }

  function getNextData() {
    getSearchData()
  }


  function getUserResult() {
    setShowEnd(false)
    setNoData(false)
    setSearchMode(true)
    setDataPage(0)
    getUserSearchData()
  }

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
          <View className={`typeBtn ${searchMode === false ? 'selected' : ''}`} onClick={getFirstData}>全部</View>
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