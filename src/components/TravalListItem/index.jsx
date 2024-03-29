import { View, Text, Image, Button } from "@tarojs/components";
import React, { useState } from "react";
import { AtIcon } from 'taro-ui'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import "./index.scss";

export default function TravalListItem({ props }) {
  const [isdelOpened, setIsdelOpened] = useState(false);

  let status = props.status;
  function toEdit() {
    console.log("编辑" + props.id);
  }

  function toDelete() {
    console.log("删除" + props.id);
    Taro.request({
      url: 'http://127.0.0.1:3000/api/my/deltravals',
      method: 'POST',
      data: {
        id: props.id,
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

  return (
    <>
      {
        isdelOpened && (<AtModal isOpened onClose={() => { setIsdelOpened(false) }} closeOnClickOverlay>
          <AtModalContent>
            您确定删除该游记吗？
          </AtModalContent>
          <AtModalAction onConfirm={toDelete} onCancel={cancelModel}>
            <Button>取消</Button>
            <Button >确定</Button>
          </AtModalAction>
        </AtModal>)
      }
      <View className="TravalListItemContianer">
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