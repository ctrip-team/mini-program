import { View, ScrollView, Textarea, Input, Button, Form } from '@tarojs/components'
import { AtImagePicker, AtDivider } from 'taro-ui'
import ImagePicker from '../../components/ImagePicker'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'
import { useState } from 'react'

export default function Index() {
  Taro.hideTabBar(); // 隐藏底部导航栏
  const [files, setFiles] = useState([])

  useLoad(() => {
    console.log('Page loaded.')
  })

  const handleChange = (imgs) => {
    setFiles(imgs)
  }

  const handleValidation = (values) => {
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

  // 处理发布
  const handleSubmit = (e) => {
    e.preventDefault()

    if (handleValidation(e.detail.value)) {
      // 验证通过
      console.log('这里处理发布', e);
      console.log('数据', e.detail.value);
    }
  }
  return (
    <>
      <View className='publish-container'>
        <ImagePicker />
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
