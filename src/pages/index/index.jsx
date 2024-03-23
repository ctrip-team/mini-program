import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import MyTabBar from '../../components/TabBar'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <>
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    </>
  )
}
