<template>
  <div class="qrcode">
    <h3><i class="iconfont iconshandian"></i>在线生成二维码</h3>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">内容</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-input v-model="qrData.url"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">图片地址</div>
      </el-col>
      <el-col :span="20">
        <!-- <div class="grid-content">
          <el-input v-model="qrData.img_url"></el-input>
        </div> -->
        <el-tabs v-model="qrData.activeName" type="card" @tab-click="tabClick">
          <el-tab-pane label="url" name="url">
            <el-input v-model="qrData.imgUrl"></el-input>
          </el-tab-pane>
          <el-tab-pane label="图片上传" name="upload">
            <div class="image-box">
              <el-icon>
                <plus />
              </el-icon>
              <el-image
                v-if="qrData.base64Url"
                :src="qrData.base64Url"
                class="upload_img"
                fit="cover"
              ></el-image>
              <input type="file" class="upload-img" @change="uploadImage" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">外边距</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-input
            type="number"
            v-model="qrData.margin"
            class="margin"
          ></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">宽度</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-input
            type="number"
            v-model="qrData.width"
            class="margin"
          ></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">边框色</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-color-picker v-model="qrData.borderColor" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">边框宽度</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-input class="borderW" type="number" v-model="qrData.borderW" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">前景色</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-color-picker v-model="qrData.dark" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">背景色</div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-color-picker v-model="qrData.light" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content">
          <el-button @click="createQrcode">生成</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="qrcode-image">
      <canvas ref="qrcode"></canvas>
    </div>
    <div class="btn" v-if="qrData.qrcodeShow">
      <el-button @click="saveQrcode">保存二维码</el-button>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, onMounted, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
// import { reactive } from "@vue/reactivity";
import QRCode from 'qrcode'

const { proxy } = getCurrentInstance()
const qrData = reactive({
  dark: '#000000',
  light: '#ffffff',
  margin: 3,
  url: 'https://bloniea.xyz/',
  width: 400,
  imgUrl: '',
  img_url: '',
  base64Url: '',
  borderColor: '#ffffff',
  borderW: 1,
  activeName: 'url',
  file: '',
  qrcodeShow: false,
})
qrData.img_url = qrData.imgUrl
// 生成二维码
const createQrcode = () => {
  const elemt = proxy.$refs.qrcode
  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.3,
    margin: qrData.margin,
    color: {
      dark: qrData.dark,
      light: qrData.light,
    },
    width: qrData.width <= 100 ? 100 : qrData.width,
  }

  QRCode.toDataURL(elemt, qrData.url, opts, function (err, url) {
    if (err) throw err
    qrData.qrcodeShow = true
    if (qrData.img_url) {
      const ctx = elemt.getContext('2d')
      const img = document.createElement('img')
      img.src = qrData.img_url
      img.onload = function () {
        qrData.width = qrData.width <= 100 ? 100 : qrData.width
        let sx = img.width > img.height ? (img.width - img.height) / 2 : 0,
          sy = img.height > img.width ? (img.height - img.width) / 2 : 0,
          swidth = img.width > img.height ? img.height : img.width,
          sheight = img.height > img.width ? img.width : img.height,
          x = qrData.width / 2 - qrData.width / 4 / 2,
          y = qrData.width / 2 - qrData.width / 4 / 2,
          width = qrData.width / 4,
          height = qrData.width / 4
        ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
        ctx.strokeStyle = qrData.borderColor
        ctx.lineWidth = qrData.borderW
        ctx.strokeRect(x, y, width, height)
      }
    }
  })
}

const tabClick = (tab, event) => {
  if (tab.props.name == 'url') {
    qrData.img_url = qrData.imgUrl
  }
  if (tab.props.name == 'upload') {
    qrData.img_url = qrData.base64Url
  }
}
// 图片预览
const uploadImage = (e) => {
  // console.log(e.target.value)
  const file = e.target.files[0]
  if (/image/.test(file.type)) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      qrData.base64Url = reader.result
      // console.log(reader.result)
      e.target.value = null
    }
  }
}
// 保存二维码
const saveQrcode = () => {
  console.log(proxy.$refs.qrcode)
  const url = proxy.$refs.qrcode.toDataURL('image/png')
  const oA = document.createElement('a')
  oA.download = '二维码'
  oA.href = url
  document.body.appendChild(oA)
  oA.click()
  oA.remove()
}
watch(
  () => qrData.base64Url,
  (url) => (qrData.img_url = url)
)
watch(
  () => qrData.imgUrl,
  (url) => (qrData.img_url = url)
)
</script>

<style lang="stylus" scoped>
.qrcode {
  .margin, .borderW {
    width 20%
  }
  .qrcode-image {
    canvas {
      margin 0 auto
      display block
    }
  }
  .upload_img {
    width 200px
    height 200px
    position absolute
    top 0
    left 0
  }
  .el-tab-pane {
    .image-box {
      border 1px dashed #ccc
      width 200px
      height 200px
      position relative
      .el-icon {
        width 100%
        height 100%
        font-size 30px
        color $baseColor
      }
      .upload-img {
        width 100%
        height 100%
        position absolute
        left 0
        top 0
        opacity 0
        cursor $my-cursor-pointer
        >>> input {
          width 200px
          height 200px
        }
      }
    }
  }
  .btn .el-button {
    margin 0 auto
    display block
    margin-top 10px
  }
   :deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
    border-bottom-color $baseColor
  }
  :deep(.el-tabs__item.is-active) {
    color $baseColor
  }
  :deep(.el-tabs__item:hover) {
    color $baseColor
  }
}
</style>
