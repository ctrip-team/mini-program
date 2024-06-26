import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Textarea, Input, Button, Form, ScrollView } from '@tarojs/components'
import { AtIcon, AtDivider } from 'taro-ui'
import ImagePicker from '../../components/ImagePicker'
import VideoPicker from '../../components/VideoPicker'
import './index.scss'
import { deleteAllImagesAPI, getTravelAPI, updatePosterAPI, updateTextAPI, updateVideoAPI } from '../../apis/travel'
import { showToast } from '../../utils/toast'


export default function EditPage() {
    const router = useRouter()
    const { travel_id } = router.params
    const [editTravel, setEditTravel] = useState({})
    const [imageCount, setImageCount] = useState(0)
    const [imageFiles, setImageFiles] = useState([])
    const [haveImage, sethaveImage] = useState(false)
    const [haveVideo, sethaveVideo] = useState(false)
    const [tempVideoPath, setTempVideoPath] = useState('')
    const [tempPoster, setTempPoster] = useState('')

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    useEffect(() => {
        async function getTravel() {
            const res = await getTravelAPI(travel_id)
            const { travel } = res.data
            setEditTravel(travel)
            setFormData({ title: travel.title, content: travel.content })
            if (travel.video_url) {
                sethaveVideo(true)
                setTempVideoPath(travel.video_url)
                setTempPoster(travel.poster)
                setImageCount(1)
            } else {
                sethaveImage(true)
                setImageFiles(travel.imgs)
                setImageCount(travel.imgs.length)
            }
        }
        getTravel()
    }, [])

    // 验证是否符合发布标准
    const handleValidation = (values) => {
        if (imageCount === 0) {
            showToast('至少选择上传一张图片或一个视频哦~')
            return false
        }
        const { travelTitle, travelContent } = values
        if (travelTitle.trim() === '') {
            showToast('标题不能为空哦~')
            return false
        } else if (travelContent.trim() === '') {
            showToast('游记内容不能为空哦~')
            return false
        }

        return true
    }

    // 封装uploadFile
    const uploadFile = (path, index) => {
        return new Promise((resolve, reject) => {
            Taro.uploadFile({
                url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/uploadImages/${editTravel.travel_id}`,
                filePath: path,
                name: 'image',
                formData: {
                    'order': index
                },
                success: resolve,
                fail: reject
            })
        })
    }

    const uploadUrl = (url, index) => {
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${process.env.TARO_APP_HOST}:${process.env.TARO_APP_PORT}/api/travel/updateOrder`,
                data: {
                    travel_id: editTravel.travel_id,
                    url,
                    order: index,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: resolve,
                fail: reject
            })
        })
    }

    // 上传所有图片
    const updateImages = () => {
        console.log('看一下什么情况', imageFiles);
        let uploadPromises = []
        imageFiles.forEach((item, index) => {
            if (editTravel.imgs.includes(item)) {
                console.log('index', index);
                uploadPromises.push(uploadUrl(item, index))
            }
            else {
                uploadPromises.push(uploadFile(item, index))
            }
        })
        Promise.all(uploadPromises)
            .then(res => {
                console.log('所有图片成功上传');
            }).catch(err => {
                console.log('上传失败');
            })
    }

    // 文字和图片分开上传
    const updateText = async ({ travelTitle, travelContent }) => {
        const richContent = travelContent.replace(/\n/g, '<br>');
        if (!(editTravel.title === travelTitle && editTravel.content === richContent)) {
            await updateTextAPI(editTravel.travel_id, travelTitle, richContent)
        }
    }

    const updateVideo = async () => {
        const res = await updateVideoAPI(editTravel.travel_id, tempVideoPath)
        console.log('更新视频', res.data);
    }

    const updatePoster = async () => {
        const res = await updatePosterAPI(editTravel.travel_id, tempPoster)
        console.log('更新poster', res.data);
    }

    const deleteAllImages = async () => {
        const res = await deleteAllImagesAPI(editTravel.travel_id)
        console.log('删除所有图片url', res.data);
    }

    // 处理编辑
    const handleSubmit = (e) => {
        e.preventDefault()
        // 验证通过
        if (handleValidation(e.detail.value)) {
            const requestTask = updateText(e.detail.value)
            requestTask.then(res => {
                if (haveImage) {
                    // 更新前应该把之前的都删除
                    deleteAllImages()
                    updateImages()
                } else {
                    if (editTravel.video_url !== tempVideoPath) {
                        updateVideo()
                        updatePoster()
                    }
                }
            })
            showToast('更新成功')
        }
    }

    const handleInputChange = (e, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: e.detail.value
        });
    };

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

                <ScrollView
                    className='media-scrollview'
                    scrollX
                    scrollLeft
                    scrollWithAnimation
                >
                    <View className='media-container at-row'>
                        {!haveVideo && <ImagePicker imageCount={imageCount} setImageCount={setImageCount} imageFiles={imageFiles} setImageFiles={setImageFiles} sethaveImage={sethaveImage} />}
                        {!haveImage && <VideoPicker sethaveVideo={sethaveVideo} haveVideo={haveVideo} tempVideoPath={tempVideoPath} setTempVideoPath={setTempVideoPath} setImageCount={setImageCount} tempPoster={tempPoster} setTempPoster={setTempPoster} />}
                    </View>

                </ScrollView >


                <AtDivider height={50} />

                <Form onSubmit={handleSubmit}>
                    <Input type='text' name='travelTitle' className='travelTitle' placeholder='为你的游记起一个标题吧~' maxlength={30} value={formData.title} onInput={(e) => handleInputChange(e, 'title')} />
                    <AtDivider height={50} />

                    <Textarea
                        name='travelContent'
                        placeholder='分享你的游记内容，最多3000字'
                        style='background:#fff;width:100%;height:200px;'
                        maxlength={3000}
                        value={formData.content.replace(/<br>/g, "\n")}
                        onInput={(e) => handleInputChange(e, 'content')}
                    />
                    <AtDivider height={50} />

                    <Button formType='submit' size='mini' className='publish-btn'>确认编辑</Button>
                </Form>
            </View>
        </>
    )
}
