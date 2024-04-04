import { View, Video, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default function VideoPicker({ sethaveVideo, haveVideo, tempVideoPath, setTempVideoPath, setImageCount, tempPoster, setTempPoster }) {


    const handleAddVideo = () => {
        Taro.chooseMedia({
            mediaType: ['video'],
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: (res) => {
                setTempPoster(res.tempFiles[0].thumbTempFilePath)
                setTempVideoPath(res.tempFiles[0].tempFilePath)
                sethaveVideo(true)
                setImageCount(1)
            }
        })
    }

    const handlePlay = () => {
        const videoContext = Taro.createVideoContext('previewVideo')
        videoContext.requestFullScreen()
        videoContext.play()
    }
    return (
        <>

            {tempVideoPath &&
                <Video
                    className='show-video'
                    id='previewVideo'
                    onClick={handlePlay}
                    src={tempVideoPath}
                    poster={tempPoster}
                    initialTime={0}
                    controls={true}
                    autoplay={false}
                    loop={false}
                    muted={false}
                    direction={0}
                />
            }
            {!haveVideo &&
                <View className='add-video' onClick={handleAddVideo}>
                    <AtIcon value='video' size='20'></AtIcon>
                    <Text>选择视频</Text>
                </View>
            }
        </>
    )
}
