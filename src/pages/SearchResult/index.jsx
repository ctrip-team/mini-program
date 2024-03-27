import { View, Text, ScrollView, GridView } from "@tarojs/components";
import React, { useState, useEffect } from "react";
import Taro, { getCurrentInstance, useReachBottom } from "@tarojs/taro";
import IndexListItem from "../../components/IndexListItem/index";
import { AtSearchBar } from "taro-ui";
import "./index.scss";

export default function SearchResult() {

  //获取传递的参数
  let params = getCurrentInstance().router.params
  let searchKey = params.searchKey
  console.log(searchKey)

  //判定是否到达底部
  const [noData, setNoData] = useState(false)
  //页面加载判定
  const [showEnd, setShowEnd] = useState(false)
  //搜索框
  const [value, setValue] = useState(searchKey)
  //页面数据
  const [listData, setListData] = useState([])

  useEffect(() => {
    Taro.request({
      url: 'http://127.0.0.1:3000/api/searchTitle',
      data: {
        searchKey: searchKey
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
    if (listData.length == 0) {
      setShowEnd(true)
    }
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

  console.log(listData);
  return (
    <>
      <View onClick={toSearchPage}>
        <AtSearchBar
          value={value}
          onChange={(value) => onChange(value)}
          disabled
        />
      </View>
      <ScrollView className='indexScrollViewArea' scrollY >
        {
          showEnd && (
            <View className="noneRs">
              <Text>暂无符合条件的结果~</Text>
            </View>
          )
        }
        {
          <GridView type='masonry' mainAxisGap='10' crossAxisGap='5'>
            {
              listData && listData.map((item, index) => (
                <IndexListItem props={{ imgsrc: item.imgsrc, title: item.title, avatar: item.avatar, username: item.username, readnum: item.readnum, id: item.id }} />
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
    </>
  )
}