import { View, Text, Image, Button, RichText, Video } from "@tarojs/components";
import React, { useState } from "react";
import { AtIcon } from 'taro-ui'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtNoticebar } from "taro-ui"
import "./index.scss";
import Taro from "@tarojs/taro";

export default function TravalListItem({ props }) {
  const [isdelOpened, setIsdelOpened] = useState(false);

  let status = props.status;
  function toEdit() {
    console.log("编辑" + props.travel_id);
    Taro.navigateTo({
      url: `/pages/EditPage/index?travel_id=${props.travel_id}`
    })
  }

  function toDelete() {
    console.log("删除" + props.travel_id);
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/deltravel`,
      method: 'POST',
      data: {
        travel_id: props.travel_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        setIsdelOpened(false)
        Taro.showToast({
          title: '删除成功',
          icon: 'success',
        })
        Taro.reLaunch({
          url: '/pages/MyTravels/index'
        })
      },
      fail: function (res) {
        console.log("网络失败")
        setIsdelOpened(false)
        Taro.showToast({
          title: '删除失败',
          icon: 'error',
        })
      }
    })
  }

  function cancelModel() {
    console.log("取消");
    setIsdelOpened(false)
  }

  function toDetailPage() {
    if (props.video_url) {
      Taro.navigateTo({
        url: `/pages/VideoPage/index?travel_id=${props.travel_id}`
      })
    }
    else {
      Taro.navigateTo({
        url: `/pages/DetailPage/index?travel_id=${props.travel_id}`
      })
    }
  }

  return (
    <>
      {
        isdelOpened && (<AtModal isOpened onClose={() => { setIsdelOpened(false) }} closeOnClickOverlay>
          <AtModalContent>
            您确定删除该游记吗？
          </AtModalContent>
          <AtModalAction >
            <Button onClick={cancelModel}>取消</Button>
            <Button onClick={toDelete}>确定</Button>
          </AtModalAction>
        </AtModal>)
      }
      <View className="TravalListItemContianer">
        <View className="upHalfOfItem" onClick={toDetailPage}>
          {
            props.video_url ?
              <Image className='image' src={props.poster_url}></Image>
              : <Image className='image' src={props.image_url}></Image>
          }
          <View className="rightOfUp">
            <Text className="title">{props.title}</Text>
            <RichText className="description" nodes={props.content}></RichText>
          </View>
        </View>
        <View className="lineHr"></View>
        <View className="downHalfOfItem">
          <View className="leftOfDown">
            {
              status == 0 ?
                <>
                  <AtIcon value='bell' size='20' color='#fff' className="statusIcon-Auditing"></AtIcon>
                  <Text className="statusText-Auditing">审核中</Text>
                </> : (status == 1 ?
                  <>
                    <AtIcon value='close-circle' size='20' color='#fff' className="statusIcon-NoPass"></AtIcon>
                    <Text className="statusText-NoPass">未通过</Text>
                  </> :
                  <>
                    <AtIcon value='check-circle' size='20' color='#fff' className="statusIcon-Pass"></AtIcon>
                    <Text className="statusText-Pass">已发布</Text>
                  </>
                )
            }
          </View>
          <View className="rightOfDown">
            <View className="editBtn" onClick={toEdit}>
              <AtIcon value='edit' size='30' color='#6eabd4'></AtIcon>
            </View>
            <View className="deleBtn" onClick={() => { setIsdelOpened(true) }}>
              <AtIcon value='trash' size='30' color='#F00'></AtIcon>
            </View>
          </View>
        </View>
      </View>
    </>

  )
}