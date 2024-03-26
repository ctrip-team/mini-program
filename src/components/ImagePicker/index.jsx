import { View, Image, Text, ScrollView } from '@tarojs/components'
import { AtIcon, AtGrid } from 'taro-ui'
import './index.scss'
import Taro from '@tarojs/taro'
import { useState } from 'react'
export default function index() {

    const [imageFiles, setImageFiles] = useState([])
    const [imageCount, setImageCount] = useState(0)
    const handleAddImage = () => {
        Taro.chooseImage({
            count: 9, // 一次最多可选照片数量
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                console.log('res', res);
                var tempFilePaths = res.tempFilePaths
                setImageCount(imageCount + res.tempFilePaths.length)
                setImageFiles([...imageFiles, ...tempFilePaths])
            }
        })
    }

    // 删除图片
    const handleDeleteImage = (index) => {
        setImageFiles(imageFiles.filter((_, idx) => idx !== index))
        setImageCount(imageCount - 1)
    }

    // 预览图片
    const previewImage = (currentUrl) => {
        Taro.previewImage({
            current: currentUrl,
            urls: imageFiles
        })
    }
    return (
        <>
            <View className='at-row at-row__justify--between at-row__align--center'>
                <View className='at-row at-row__align--center'>
                    <AtIcon value='image' size='30'></AtIcon>
                    <View>游记图片</View>
                </View>
                <View>{imageCount}</View>
            </View>
            <ScrollView
                className='image-scrollview'
                scrollX
                scrollLeft
                scrollWithAnimation
            >
                <View className='add-image-container at-row'>
                    {imageFiles.map((item, index) => {
                        return (
                            <View className='image-box' key={index}>
                                <Image src={item} className='image-size' onClick={() => previewImage(item)}></Image>
                                <AtIcon className='delete-image' value='close-circle' size='20' onClick={() => handleDeleteImage(index)}></AtIcon>
                            </View>
                        )
                    })}
                    <View className='add-image' onClick={handleAddImage}>
                        <AtIcon value='image' size='20'></AtIcon>
                        <Text>添加图片</Text>
                    </View>
                </View>
            </ScrollView >
        </>
    )
}
