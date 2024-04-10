# 旅游日记平台

## 简介

本项目基于 Taro 实现了微信小程序版本的旅游日记平台。

## 快速开始

`npm install`安装所有依赖

`npm run dev:weapp`运行小程序

## 项目概览

### 1.首页

- 首页展示瀑布流游记卡片列表，下拉到底无限滚动。
- 点击图文游记卡片可跳转至详情页。
- 点击视频游记卡片可跳转至视频页。
- 点击上方搜索可跳转至搜索页。

<img src="assets/a043be45750177f34219ee12ea01a39d.jpg" alt="a043be45750177f34219ee12ea01a39d"  width="150" height="300"/>

#### 1.1 详情页

- 详情页展示用户基本信息，可滑动的图文，下方可以进行点赞和分享。
- 点击用户头像可跳转至用户个人主页。

<img src="assets/fd0534fc73dec0d5f22e4e22219dd521.jpg" alt="fd0534fc73dec0d5f22e4e22219dd521"  width="150" height="300" />

### 1.2 视频页

- 视频页自动播放视频，提供可滑动的无限视频流，可双击点赞和分享。
- 点击用户头像或用户名可跳转至用户个人主页。

<img src="assets/f2859887e053d9e8771e48ce3289a948.jpg" alt="f2859887e053d9e8771e48ce3289a948"  width="150" height="300" />

#### 1.3 搜索页

- 搜索页根据关键词进行检索，展示有关的卡片列表以及用户信息。
- 搜索历史可保留可删除。
- 点击搜索记录可以直接跳转到对应搜索结果页。

<img src="assets/43103c9359d1762ea7c8cd7a13eb6426.jpg" alt="43103c9359d1762ea7c8cd7a13eb6426"  width="150" height="300" />

### 2.发布页

- 未登录会跳转到登录页
- 发布页只可发布图片或者视频，且标题、内容为必填
- 发布后可跳转至我的游记页

<img src="assets/7addda9effed1fbc1bf40930adc21cd5.jpg" alt="7addda9effed1fbc1bf40930adc21cd5"  width="150" height="300" />

### 3.我的页

- 我的页展示用户昵称和头像、用户发布的游记数和总浏览量
- 提供我的游记页、个人信息页、个人主页的跳转

<img src="assets/308a59fbb96b130a7977973dd04d7cfd.jpg" alt="308a59fbb96b130a7977973dd04d7cfd"  width="150" height="300" />

### 3.1 我的游记页

- 我的游记页展示用户所有（未删除）的游记列表，并显示游记状态
- 支持用户对游记进行编辑、删除
- 提供发布页、编辑页的跳转

<img src="assets/40c0404763dc2e819e6c0ffadf7c52ea.jpg" alt="40c0404763dc2e819e6c0ffadf7c52ea"  width="150" height="300" />

### 3.2 编辑页

- 支持用户对视频、图文进行更改

<img src="assets/10e9ac39c71f41fcc9cb3827f2f29829.jpg" alt="10e9ac39c71f41fcc9cb3827f2f29829"  width="150" height="300" />

### 3.3 个人信息页

- 个人信息页支持用户对头像、昵称、密码进行编辑修改

<img src="assets/e56f2d8f2e4d43a7461208efe11c1353.jpg" alt="e56f2d8f2e4d43a7461208efe11c1353"  width="150" height="300" />

### 3.4 个人主页

- 个人主页展示用户基本信息和动态信息

<img src="assets/9df726e9844a970aaceb2fa1c88bd505.jpg" alt="9df726e9844a970aaceb2fa1c88bd505"  width="150" height="300" />

### 4.登录注册页

- 用户进行登录注册

<img src="assets/4ee718f68d76ad9d0ef4264116e1c057.jpg" alt="4ee718f68d76ad9d0ef4264116e1c057" width="150" height="300" /><img src="assets/fab8cd1481ac3d0b3ca551869cc757c9.jpg" alt="fab8cd1481ac3d0b3ca551869cc757c9" width="150" height="300" />
