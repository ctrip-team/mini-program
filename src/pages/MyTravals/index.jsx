import React, { useState, useEffect } from "react";
import { ScrollView, View } from "@tarojs/components";
import TravalListItem from "../../components/TravalListItem";
import { useReachBottom } from "@tarojs/taro";
import "./index.scss";

export default function MyTravals() {
  //测试数据
  const data = [
    {
      id: 1,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739',
      title: '测试标题测试标题测试标题测试标题测试标题测试标题',
      content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容',
      status: 0,
    },
    {
      id: 2,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739',
      title: '测试标题',
      content: '测试内容测试内容测试内容',
      status: 1,
    },
    {
      id: 3,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739',
      title: '测试标题',
      content: '测试内容测试内容测试内容',
      status: 2,
    },
    {
      id: 4,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739',
      title: '测试标题',
      content: '测试内容测试内容测试内容',
      status: 1,
    },
    {
      id: 5,
      imgsrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F1184429%2F6afcb2f884248d505f0f40c36f70401e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTE4NDQyOS82YWZjYjJmODg0MjQ4ZDUwNWYwZjQwYzM2ZjcwNDAxZS5qcGc%3D%2Fsign%2Ff37add58bebac2df4763c3d58c435bd9.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1713786862&t=7a04b13ed59ecf353068a96f8a0a7739',
      title: '测试标题',
      content: '测试内容测试内容测试内容',
      status: 0,
    },
  ]
  //判定是否到达底部
  const [isEnd, setIsEnd] = useState(false)
  //页面加载判定
  const [isLoading, setIsLoading] = useState(true)
  //存储数据
  const [listData, setListData] = useState([])

  useEffect(() => {
    //获取接口数据
    setListData(data)

    setIsLoading(false)
  }, [])

  useReachBottom(() => {
    console.log('onReachBottom')
    setIsEnd(true)
  })

  function toAdd() {
    // Taro.navigateTo({ url: '/pages/add/index' })
    console.log("adddddddd");
  }

  if (isLoading) {
    return <View>加载中...</View>
  }

  return (
    <>
      <View className="addBtn" onClick={toAdd}>
        +
      </View>
      <ScrollView>
        {
          listData.map((item, index) => (
            <TravalListItem props={{ id: item.id, imgsrc: item.imgsrc, title: item.title, content: item.content, status: item.status }} />
          ))
        }

      </ScrollView>
      {
        isEnd ? <View className='indexEndText'>没有更多游记咯~  快去发布新游记吧(*^▽^*)</View> : <View className='indexEndText'>加载中...</View>
      }
    </>
  )
}