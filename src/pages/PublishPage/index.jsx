import { View, Textarea, Input, Button, Form, Text } from '@tarojs/components'
import { AtIcon, AtDivider } from 'taro-ui'
import ImagePicker from '../../components/ImagePicker'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'
import { useState } from 'react'

export default function Index() {

  const [imageCount, setImageCount] = useState(0)
  const [imageFiles, setImageFiles] = useState([])


  // 验证是否符合发布标准
  const handleValidation = (values) => {
    if (imageCount === 0) {
      Taro.showToast({
        title: '至少选择上传一张图片',
        icon: "none",
        duration: 2000
      })
      return false
    }
    const { travelTitle, travelContent } = values
    if (travelTitle.trim() === '') {
      Taro.showToast({
        title: '标题不能为空哦~',
        icon: "none",
        duration: 2000
      })
      return false
    } else if (travelContent.trim() === '') {
      Taro.showToast({
        title: '游记内容不能为空哦~',
        icon: "none",
        duration: 2000
      })
      return false
    }

    return true
  }

  // 封装uploadFile
  const uploadFile = (path, travel_id) => {
    return new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: `http://127.0.0.1:3000/api/travel/uploadImages/${travel_id}`,
        filePath: path,
        name: 'image',
        success: resolve,
        fail: reject
      })
    })
  }

  // 上传所有图片
  const uploadImages = (travel_id) => {
    let uploadPromises = []
    imageFiles.forEach(item => {
      uploadPromises.push(uploadFile(item, travel_id))
    })
    Promise.all(uploadPromises)
      .then(res => {
        console.log('所有图片成功上传');
      }).catch(err => {
        console.log('上传失败');
      })
  }

  // 文字和图片分开上传
  const uploadTitleAndContent = ({ travelTitle, travelContent }) => {
    return Taro.request({
      url: 'http://127.0.0.1:3000/api/travel/uploadText',
      method: 'POST',
      data: {
        title: travelTitle,
        content: travelContent
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
  // 处理发布
  const handleSubmit = (e) => {
    e.preventDefault()

    // 验证通过
    if (handleValidation(e.detail.value)) {
      const requestTask = uploadTitleAndContent(e.detail.value)
      requestTask.then(res => {
        uploadImages(res.data.travel_id)
      })
    }
  }


  return (
    <>
      <View className='publish-container'>
        <View className='at-row at-row__justify--between at-row__align--center'>
          <View className='at-row at-row__align--center'>
            <AtIcon value='image' size='30'></AtIcon>
            <View>游记图片</View>
          </View>
          <View>{imageCount}</View>
        </View>
        <ImagePicker imageCount={imageCount} setImageCount={setImageCount} imageFiles={imageFiles} setImageFiles={setImageFiles} />
        <AtDivider />

        <Form onSubmit={handleSubmit}>
          <Input type='text' name='travelTitle' className='travelTitle' placeholder='为你的游记起一个标题吧~' focus maxlength={30} />
          <AtDivider />

          <Textarea
            name='travelContent'
            placeholder='分享你的游记内容，最多3000字'
            style='background:#fff;width:100%;height:80px;'
            autoFocus
            maxlength={3000}
          />
          <AtDivider />

          <Button formType='submit' size='mini' className='publish-btn'>确认发布</Button>
        </Form>
      </View>
    </>
  )
}
