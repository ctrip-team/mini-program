import Taro from '@tarojs/taro'

//提示框封装
export function showToast(title) {
  Taro.showToast({
    title: title,
    icon: 'none',
    duration: 2000
  });
}