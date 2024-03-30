import { View, Text, Image, Button } from "@tarojs/components";
import React, { useState } from "react";
import { AtIcon } from 'taro-ui'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import "./index.scss";
import Taro from "@tarojs/taro";

export default function TravalListItem({ props }) {
  const [isdelOpened, setIsdelOpened] = useState(false);

  let status = props.status;
  function toEdit() {
    console.log("编辑" + props.id);
    Taro.switchTab({
      url: `/pages/PublishPage/index?travel_id=${props.id}`
    })
  }

  function toDelete() {
    console.log("删除" + props.id);
    Taro.request({
      url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/my/deltravel`,
      method: 'POST',
      data: {
        travel_id: props.id,
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
    Taro.navigateTo({
      url: `/pages/DetailPage/index?travel_id=${props.id}`
    })
  }

  return (
    <>
      {
        isdelOpened && (<AtModal isOpened onClose={() => { setIsdelOpened(false) }} closeOnClickOverlay>
          <AtModalContent>
            您确定删除该游记吗？
          </AtModalContent>
          {/* onConfirm={toDelete} onCancel={cancelModel} */}
          <AtModalAction >
            <Button onClick={cancelModel}>取消</Button>
            <Button onClick={toDelete}>确定</Button>
          </AtModalAction>
        </AtModal>)
      }
      <View className="TravalListItemContianer" onClick={toDetailPage}>
        <View className="upHalfOfItem">
          <Image className="image" src={props.imgsrc} />
          <View className="rightOfUp">
            <Text className="title">{props.title}</Text>
            <Text className="description">{props.content}</Text>
          </View>
        </View>
        <View className="lineHr"></View>
        <View className="downHalfOfItem">
          {
            status == 2 ?
              <>
                <View className="leftOfDown">
                  <AtIcon value='check-circle' size='20' color='green'></AtIcon>
                  <Text>已发布</Text>
                </View>
                <View className="rightOfDown">
                  <Button className="deleBtn" onClick={() => { setIsdelOpened(true) }}>删除</Button>
                </View>
              </>
              : <></>
          }
          {
            status == 1 ?
              <>
                <View className="leftOfDown">
                  <AtIcon value='bell' size='20' color='orange'></AtIcon>
                  <Text>审核中</Text>
                </View>
                <View className="rightOfDown">
                  <Button className="editBtn" onClick={toEdit}>编辑</Button>
                  <Button className="deleBtn" onClick={() => { setIsdelOpened(true) }}>删除</Button>
                </View>
              </>
              : <></>
          }
          {
            status == 0 ?
              <>
                <View className="leftOfDown">
                  <AtIcon value='close-circle' size='20' color='red'></AtIcon>
                  <Text>未通过</Text>
                </View>
                <View className="rightOfDown">
                  <Button className="editBtn" onClick={toEdit}>修改</Button>
                  <Button className="deleBtn" onClick={() => { setIsdelOpened(true) }}>删除</Button>
                </View>
              </>
              : <></>
          }
        </View>
      </View>
    </>

  )
}