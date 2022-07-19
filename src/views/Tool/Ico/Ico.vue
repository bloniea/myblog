<template>
  <div class="ico">
    <h3>
      <i class="iconfont iconshandian"></i>在线图片转ico
      <span> (仅限火狐的半成品，比想象中麻烦，阿晴增强后再管了,轮子多)</span>
    </h3>
    <div class="upload">
      <el-icon class="el-icon--upload" size="40px"><upload-filled /></el-icon>
      <el-image v-if="imgVal" :src="imgVal" fit="cover"></el-image>
      <div class="file">
        <input type="file" accept="image/*" @change="changeEvent" />
      </div>
    </div>
    <div class="tip" v-if="tip">{{ tip }}</div>
    <div class="input">
      <el-select v-model="size">
        <el-option
          v-for="item in sizes"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button @click="submit">转换</el-button>
    </div>
    <div class="result">
      <div class="image" v-if="imgUrl">
        <el-image :src="imgUrl.url" alt="" />
        <div class="size">{{ imgUrl.size }}×{{ imgUrl.size }}</div>
        <el-button @click="download">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from '@vue/reactivity'
const tip = ref('')
const imgVal = ref()
const imgUrl = ref('')
const size = ref(16)
const sizes = ref([16, 32, 48, 128, 256])
const changeEvent = (e) => {
  tip.value = ''
  console.log(e)
  let files = e.target.files
  if (files && files.length > 0) {
    let file = files[0]
    if (!/image/.test(file.type)) {
      e.target.value = ''
      tip.value = '请选择图片文件'
      imgVal.value = ''
      return
    }
    if (file.size > 1024 * 1024 * 5) {
      e.target.value = ''
      tip.value = '图片不能大于5mb'
      imgVal.value = ''
      return
    }

    let URL = window.URL || window.webkitURL
    // 通过 file 生成目标 url
    let imgURL = URL.createObjectURL(file)
    imgVal.value = imgURL
  }
}
const blobCallback = () => {
  return (b) => {
    imgUrl.value = {
      size: size.value,
      url: window.URL.createObjectURL(b),
    }
  }
}

const createIco = (imgURL) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = document.createElement('img')
  img.src = imgURL
  img.onload = () => {
    canvas.width = size.value
    canvas.height = size.value
    const imgRes = getImgSize(img)
    ctx.drawImage(
      img,
      imgRes.x,
      imgRes.y,
      imgRes.size,
      imgRes.size,
      0,
      0,
      canvas.width,
      canvas.width
    )
    canvas.toBlob(
      blobCallback('ico'),
      'image/vnd.microsoft.icon',
      '-moz-parse-options:format=bmp;bpp=32'
    )
  }
}
const getImgSize = (img) => {
  let x, y, size
  if (img.width <= img.height) {
    x = 0
    y = (img.height - img.width) / 2
    size = img.width
  } else {
    x = (img.width - img.height) / 2
    y = 0
    size = img.height
  }
  return { x, y, size }
}
const submit = () => {
  if (!imgVal.value) return
  createIco(imgVal.value)
}
const download = () => {
  const a = document.createElement('A')
  a.download = 'favicon' + '.ico'
  a.href = imgUrl.value.url
  a.click()
}
</script>

<style lang="stylus">
@import './Ico.styl'
</style>
