import { View, Image, Text, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'
export default function index({ imageCount, setImageCount, imageFiles, setImageFiles, sethaveImage }) {

    const handleAddImage = () => {
        Taro.chooseImage({
            count: 9, // 一次最多可选照片数量
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                console.log('res', res);
                var tempFilePaths = res.tempFilePaths

                // 压缩图片
                tempFilePaths.forEach((item) => {
                    Taro.compressImage({
                        src: item, // 图片路径
                        quality: 10 // 压缩质量
                    })
                })
                setImageCount(imageCount + res.tempFilePaths.length)
                setImageFiles([...imageFiles, ...tempFilePaths])
                sethaveImage(true)
            }
        })
    }

    // 删除图片
    const handleDeleteImage = (index) => {
        setImageFiles(imageFiles.filter((_, idx) => idx !== index))
        if (imageCount === 1) {
            sethaveImage(false)
        }
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
            <View className='add-image-container'>
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
        </>
    )
}
