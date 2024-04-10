import Taro from '@tarojs/taro'

export function showToast(title) {
  Taro.showToast({
    title: title,
    icon: 'none',
    duration: 2000
  });
}