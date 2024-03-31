import React, { useState } from "react";
import './index.scss';
import { Button, View } from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import ImagePicker from "../../components/ImagePicker"
import Taro from "@tarojs/taro";

export default function InfoPage() {
  // const [file, setFile] = useState([])
  const [imageCount, setImageCount] = useState(0)
  const [imageFiles, setImageFiles] = useState([])
  const [haveImage, sethaveImage] = useState(false)

  function updateAvatar() {
    if (file.length === 0) {
      Taro
    }
  }

  return (
    <>
      <View>
        {/* <AtImagePicker
          count={1}
          files={file}
          onChange={(file) => setFile(file)}
        /> */}
        <ImagePicker imageCount={imageCount} setImageCount={setImageCount} imageFiles={imageFiles} setImageFiles={setImageFiles} sethaveImage={sethaveImage} />
        <Button onClick={updateAvatar}>上传新头像</Button>
      </View>
    </>
  )
}