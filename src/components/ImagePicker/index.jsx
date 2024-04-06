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
                console.log('res', res);
                var tempFilePaths = res.tempFilePaths

                // 压缩图片
                const compressImages = []
                for (const item of tempFilePaths) {
                    let imgInfo = await getImgInfo(item);
                    console.log('imgInfo', imgInfo);
                    let ctxInfo = await compressImage(imgInfo);
                    console.log('ctxInfo', ctxInfo);
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
                // 获取图片原始宽高
                let width = file.width
                let height = file.height

                // 计算图片当前大小和目标大小的比例：目标大小 / 图片当前大小
                // 根据比例调整图片的尺寸：
                // 新宽度 = 原始宽度 * √(目标大小 / 图片当前大小) 
                // 新高度 = 原始高度 * √(目标大小 / 图片当前大小)
                // 宽高同比例调整
                // 宽度 > 最大限宽 -> 重置尺寸
                if (width > config.maxWidth) {
                    const ratio = config.maxWidth / width
                    width = config.maxWidth
                    height = height * ratio
                }
                // 高度 > 最大限高度 -> 重置尺寸
                if (height > config.maxHeight) {
                    const ratio = config.maxHeight / height
                    width = width * ratio
                    height = config.maxHeight
                }

                // 获取canvas元素
                const query = Taro.createSelectorQuery()
                let dom = query.select(`#compressCanvas`)
                dom.fields({ node: true, size: true })
                    .exec((res) => {
                        // Canvas 对象
                        const canvas = res[0].node
                        // 渲染上下文
                        const ctx = canvas.getContext('2d')

                        // 根据设备像素比处理尺寸 = 大小 * 设备像素
                        const dpr = Taro.getSystemInfoSync().pixelRatio
                        canvas.width = width * dpr
                        canvas.height = height * dpr
                        ctx.scale(dpr, dpr)

                        //创建img对象
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
