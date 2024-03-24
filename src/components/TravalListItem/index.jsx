import { View, Text, Image, Button } from "@tarojs/components";
import React from "react";
import { AtIcon } from 'taro-ui'
import "./index.scss";

export default function TravalListItem({ props }) {
  let status = props.status;
  function toEdit() {
    console.log("编辑" + props.id);
  }

  function toDelete() {
    console.log("删除" + props.id);
  }

  return (
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
                <Button className="deleBtn" onClick={toDelete}>删除</Button>
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
                <Button className="deleBtn" onClick={toDelete}>删除</Button>
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
                <Button className="editBtn" onClick={toEdit}>编辑</Button>
                <Button className="deleBtn" onClick={toDelete}>删除</Button>
              </View>
            </>
            : <></>
        }
      </View>
    </View>
  )
}