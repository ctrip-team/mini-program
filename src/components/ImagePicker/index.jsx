import { View, Image, Text, ScrollView, Canvas } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'
export default function index({ imageCount, setImageCount, imageFiles, setImageFiles, sethaveImage }) {

    const handleAddImage = () => {
        Taro.chooseImage({
            count: 9, // 一次最多可选照片数量
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: async function (res) {
                var tempFilePaths = res.tempFilePaths

                // 压缩图片
                const compressImages = []
                for (const item of tempFilePaths) {
                    let imgInfo = await getImgInfo(item);
                    let ctxInfo = await compressImage(imgInfo);
                    compressImages.push(ctxInfo.tempFilePath);
                }

                setImageCount(imageCount + res.tempFilePaths.length)
                // setImageFiles([...imageFiles, ...tempFilePaths])
                setImageFiles([...imageFiles, ...compressImages])
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

    const compressImage = async (file, config = { maxWidth: 1024, maxHeight: 768 }) => {
        try {
            let ctxInfo = await new Promise((resolve, reject) => {
                let width = file.width
                let height = file.height

                if (width > config.maxWidth) {
                    const ratio = config.maxWidth / width
                    width = config.maxWidth
                    height = height * ratio
                }
                if (height > config.maxHeight) {
                    const ratio = config.maxHeight / height
                    width = width * ratio
                    height = config.maxHeight
                }

                const query = Taro.createSelectorQuery()
                let dom = query.select(`#compressCanvas`)
                dom.fields({ node: true, size: true })
                    .exec((res) => {
                        const canvas = res[0].node
                        const ctx = canvas.getContext('2d')

                        // 根据设备像素比处理尺寸 = 大小 * 设备像素
                        const dpr = Taro.getSystemInfoSync().pixelRatio
                        canvas.width = width * dpr
                        canvas.height = height * dpr
                        ctx.scale(dpr, dpr)

                        let img = canvas.createImage();
                        img.src = file.path; // 给图片添加路径
                        //图片加载完毕
                        img.onload = function () {
                            // 将图片绘制到 canvas
                            ctx.drawImage(img, 0, 0, width, height)
                            // 生成图片
                            Taro.canvasToTempFilePath({
                                canvas,
                                x: 0,
                                y: 0,
                                destWidth: width,
                                destHeight: height,
                                success(res) {
                                    resolve(res); // 生成临时文件路径
                                }
                            })
                        }
                    })
            })
            return ctxInfo
        } catch (err) { console.log(err); }
    }

    const getImgInfo = async (tempFilePath) => {
        try {
            let image = await new Promise((resolve, reject) => {
                Taro.getImageInfo({
                    src: tempFilePath,
                    success(res) {
                        let imgInfo = {
                            type: res.type,
                            height: res.height,
                            width: res.width,
                            path: res.path
                        }
                        resolve(imgInfo)
                    },
                    fail(err) {
                        reject(err)
                    }
                })
            })
            return image
        } catch (err) { console.log(err); }
    }

    return (
        <>
            <View>
                <Canvas id="compressCanvas" class="canvas-compress" type="2d" />
            </View>
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
