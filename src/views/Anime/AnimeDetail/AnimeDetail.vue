<template>
  <Loading v-if="loading"></Loading>
  <div class="anime-detail" v-else>
    <MyContainer>
      <div class="video-warpper" id="video-warpper">
        <video
          ref="myVideo"
          controls
          preload="auto"
          playsinline="false"
          webkit-playsinline="false"
          x5-video-player-type="h5-page"
          crossorigin="anonymous"
        >
          <source
            :src="anime.list.content[episodesIndex].episode"
            type="video/mp4"
          />

          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading
            to a web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank"
              >supports HTML5 video</a
            >
          </p>
        </video>
        <transition name="title">
          <div class="video-title-top" v-if="controlShow">
            <div class="video-title">
              第{{ episodesIndex + 1 }}集 -
              {{ anime.list.content[episodesIndex].title }}
            </div>
          </div>
        </transition>
        <transition name="i">
          <div class="fast" v-if="fastShow">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 13.333l-9.223 6.149A.5.5 0 0 1 2 19.066V4.934a.5.5 0 0 1 .777-.416L12 10.667V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832l-10.599 7.066a.5.5 0 0 1-.777-.416v-5.733z"
                />
              </svg>
            </i>
            <span class="label">×3加速播放</span>
          </div>
        </transition>
        <transition name="i">
          <div class="slide" v-if="slideShow">
            <div v-if="slideLeftShow">
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 13.333l-9.223 6.149A.5.5 0 0 1 2 19.066V4.934a.5.5 0 0 1 .777-.416L12 10.667V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832l-10.599 7.066a.5.5 0 0 1-.777-.416v-5.733z"
                  />
                </svg>
              </i>
              <span class="time">{{ getTime(videoTime) }}</span
              >`
            </div>
            <div v-else>
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 10.667l9.223-6.149a.5.5 0 0 1 .777.416v14.132a.5.5 0 0 1-.777.416L12 13.333v5.733a.5.5 0 0 1-.777.416L.624 12.416a.5.5 0 0 1 0-.832l10.599-7.066a.5.5 0 0 1 .777.416v5.733z"
                  />
                </svg>
              </i>
              <span class="time">{{ getTime(videoTime) }}</span
              >`
            </div>
          </div>
        </transition>
        <transition name="i">
          <div class="volume" v-if="volumeShow">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm13.517 4.134l-1.416-1.416A8.978 8.978 0 0 0 21 12a8.982 8.982 0 0 0-3.304-6.968l1.42-1.42A10.976 10.976 0 0 1 23 12c0 3.223-1.386 6.122-3.594 8.134zm-3.543-3.543l-1.422-1.422A3.993 3.993 0 0 0 16 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0 1 18 12c0 1.842-.83 3.49-2.137 4.591z"
                />
              </svg>
            </i>
            <span class="label">{{ volumeVal }}</span>
          </div>
        </transition>
      </div>
      <div class="title">安达与岛村</div>
      <el-tabs type="border-card">
        <el-tab-pane label="剧情概要">
          <div class="pane1">
            <div class="right">
              <MdToHtml :html="anime.list.generalize"></MdToHtml>
            </div>
            <div class="left">
              <el-image :src="anime.list.img_url" fit="cover"> </el-image>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="视频选集">
          <div class="pane2">
            <el-button
              v-for="(item, i) in anime.list.content"
              :key="item._id"
              @click="switchEpisode(i)"
              :class="episodesIndex == i ? 'active' : ''"
              >第{{ i + 1 }}集 - {{ item.title }}</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </MyContainer>
    <Comment
      @saveComment="saveComment"
      :comments="anime.comments"
      :total="commentTatol"
      @loadAdd="loadAdd"
      :btnLoading="commentBtnLoading"
      :addLoading="commentAddLoading"
    ></Comment>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from '@vue/runtime-core'
import Loading from '@/components/Loading/index.vue'
import { getAnimeApi, getCommentsApi } from '@/comm/fetch'
import { addCommentApi } from '@/comm/oauthFetch'
import { useRoute, useRouter } from 'vue-router'
import MyContainer from '@/components/MyContainer/index.vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { useStore } from 'vuex'
const route = useRoute()
const router = useRouter()
const loading = ref(true)

const anime = reactive({
  list: '',
  comments: [],
})

// 获取评论
const commentTatol = ref(0)
const commentBtnLoading = ref(false)
const commentAddLoading = ref(false)
const store = new useStore()
const commentReq = reactive({
  pagenum: 1,
  pagesize: 10,
  orderBy: -1,
})
// 获取评论
const getComments = async () => {
  const loadingInstance = ElLoading.service({
    target: '.comments',
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  const res = await getCommentsApi(route.query.id, commentReq)
  if (res.status === 200 && res.ok) {
    anime.comments = res.data.data
    commentTatol.value = res.data.total
  }
  loadingInstance.close()
}
const getAddComments = async () => {
  commentAddLoading.value = true
  const res = await getCommentsApi(data.id, commentReq)
  if (res.status === 200 && res.ok) {
    commentAddLoading.value = false
    const resData = res.data.data
    anime.comments = [...data.comments, ...res.data.data]
    commentTatol.value = res.data.total
  }
}
// 获取存在vuex的用户信息
const user = computed(() => store.state.userinfo)
// 提交评论
const saveComment = async (val) => {
  const req = {
    article_id: route.query.id,
    user_id: user.value._id,
    content: val.content,
  }

  if (val.to_comment_id) req.to_comment_id = val.to_comment_id
  commentBtnLoading.value = true
  const res = await addCommentApi(req)
  if (res.status === 200 && res.ok) {
    commentBtnLoading.value = false
    ElMessage.success('评论成功')
    store.commit('setCommentIsNull', true)
    if (anime.comments.length == commentTatol.value) {
      // data.comments.push(res.data.data)
      anime.comments.unshift(res.data.data)
      commentTatol.value++
    }
  } else {
    commentBtnLoading.value = false
    ElMessage.error('提交超时')
  }
}

const loadAdd = () => {
  commentReq.pagenum++
  getAddComments()
}

// 根据传过来的id获取动漫信息
const getAnime = async () => {
  const id = route.query.id
  console.log(route.query.id)
  if (id) {
    loading.value = true
    const res = await getAnimeApi(id)
    if (res.status == 200 && res.ok) {
      anime.list = res.data.data
      loading.value = false
      nextTick(() => {
        initPlur()
        getComments()
      })
    } else {
      router.push({ name: 'NotFound' })
    }
  } else {
    router.push({ name: 'NotFound' })
  }
}
getAnime()
// 表示第几集
const episodesIndex = ref(0)
// 获取保存的集数
const setEpisodesIndex = () => {
  const loachEpisodesIndex = window.localStorage.getItem(
    anime.list._id + '-index'
  )
  if (
    loachEpisodesIndex &&
    Number(loachEpisodesIndex) == Number(loachEpisodesIndex)
  ) {
    return Number(loachEpisodesIndex)
  } else {
    return 0
  }
}

const controlShow = ref(true)
const setVideoTitle = () => {
  player.value.on('controlsshown', () => {
    controlShow.value = true
  })
  player.value.on('controlshidden', () => {
    controlShow.value = false
  })
}

// videojs 实例
const player = ref('')
// video dom
const myVideo = ref(null)
const initPlur = async () => {
  episodesIndex.value = setEpisodesIndex()
  // 初始化plyr video
  player.value = new Plyr(myVideo.value, {
    keyboard: { focused: false, global: true },
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'settings',
      'fullscreen',
      'airplay',
    ],
    settings: ['speed'],
    fullscreen: {
      enabled: true,
      fallback: true,
      iosNative: false,
      container: '.video-warpper',
    },
    ratio: '16:9',
    // invertTime: false,
    // debug: true,
  })
  player.value.on('ready', plyrReady)
  // 播放结束自动进入下一集
  player.value.on('ended', () => {
    if (localStorage.getItem(`${anime.list._id + episodesIndex.value}`)) {
      localStorage.removeItem(`${anime.list._id + episodesIndex.value}`)
      nextEpisode()
    }
  })
  // 保存进度
  player.value.on('timeupdate', () => {
    localStorage.setItem(
      anime.list._id + episodesIndex.value,
      player.value.currentTime
    )
  })
}
const videoPlay = () => {
  player.value.play()
}

// plyr 视频播放器就绪

const plyrReady = () => {
  const controlBar = document.getElementsByClassName('plyr__controls')[0]

  // 下一集按钮
  const nextBnt = document.createElement('button')
  nextBnt.className = 'next-btn plyr__controls__item plyr__control'
  nextBnt.innerHTML = `<svg t="1657133031100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3098" width="200" height="200"><path d="M922.069625 477.9341L472.652621 151.089311a43.342807 43.342807 0 0 0-68.847075 35.055725V328.665491L159.636492 151.089311a43.364482 43.364482 0 0 0-68.847076 35.055725v653.682354a43.350032 43.350032 0 0 0 68.847076 35.062951L403.805546 697.328611v142.498779a43.364482 43.364482 0 0 0 68.847075 35.062951l449.417004-326.837565a43.342807 43.342807 0 0 0 0-70.118676z" fill="" p-id="3099"></path></svg>`
  const progressControl = document.getElementsByClassName(
    'plyr__progress__container'
  )[0]
  controlBar.insertBefore(nextBnt, progressControl)
  nextBnt.addEventListener('click', () => {
    nextEpisode()
  })
  // 空格切换播放，禁用默认滚动
  document.body.addEventListener('keydown', (e) => {
    if (e.code && e.code === 'Space') {
      const buttons = document.getElementsByTagName('button')
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].blur()
      }
      e.preventDefault()
      if (player.value.paused) {
        player.value.play()
      } else {
        player.value.pause()
      }
    }
  })

  // 设置video标题
  setVideoTitle()

  plyrTouch()
  videoPlay()
  // 获取播放进度
  player.value.on('loadeddata', () => {
    const currentTime = localStorage.getItem(
      `${anime.list._id}${episodesIndex.value}`
    )
    if (currentTime && Number(currentTime) == Number(currentTime)) {
      player.value.currentTime = Number(currentTime)
    }
  })

  // player.value.on('waiting', () => {
  //   console.log('waiting')
  // })
  // player.value.on('playing', () => {
  //   console.log('playing')
  // })
}
// 选集
const switchEpisode = (i) => {
  episodesIndex.value = i
  pluyrSwitchEpisode()
  window.localStorage.setItem(anime.list._id + '-index', episodesIndex.value)
}
// 下一集
const nextEpisode = () => {
  if (episodesIndex.value >= anime.list.content.length - 1) {
    episodesIndex.value = 0
  } else {
    episodesIndex.value = episodesIndex.value + 1
  }
  window.localStorage.setItem(anime.list._id + '-index', episodesIndex.value)
  pluyrSwitchEpisode()
}
// 换集
const pluyrSwitchEpisode = async () => {
  player.value.source = {
    type: 'video',
    sources: [
      {
        src: anime.list.content[episodesIndex.value].episode,
        type: 'video/mp4',
      },
    ],
  }
}

// 秒转分钟
const getTime = (time) => {
  let h = parseInt(time / 60 / 60)
  let eh = h < 10 ? '0' + h : h
  let m = parseInt((time / 60) % 60)
  m = m < 10 ? '0' + m : m
  let s = parseInt(time % 60)
  s = s < 10 ? '0' + s : s
  // 作为返回值返回
  return `${h >= 1 ? eh + ':' : ''}${m}:${s}`
}

// 移动端事件
const slideShow = ref(false)
const slideLeftShow = ref(false)
const fastShow = ref(false)
const volumeShow = ref(false)
const volumeVal = ref()
const videoTime = ref()
const top = ref(true)
const left = ref(true)
const plyrTouch = (e) => {
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    // console.log('shouji')
    let sx,
      ex,
      sy,
      ey,
      x = 5,
      y = 5,
      timer = null,
      volume
    const touchM = (me) => {
      ex = me.touches[0].clientX
      ey = me.touches[0].clientY
      let changeX = sx - ex
      let changeY = sy - ey
      if (timer) clearTimeout(timer)
      if (Math.abs(changeX) > Math.abs(changeY) && Math.abs(changeX) > x) {
        // console.log('左右')
        if (!left.value) return
        top.value = false
        slideShow.value = true
        let currentTime = player.value.currentTime
        let duration = player.value.duration

        if (changeX < 0) {
          // 右

          slideLeftShow.value = true
          let t = currentTime + Math.abs(changeX)
          videoTime.value = t >= duration ? duration : t
        } else if (changeX > 0) {
          slideLeftShow.value = false
          let t = currentTime - Math.abs(changeX)
          videoTime.value = t <= 0 ? 0 : t
          // 左
        }
      } else if (
        Math.abs(changeY) > Math.abs(changeX) &&
        Math.abs(changeY) > y
      ) {
        if (!top.value) return
        left.value = false
        volumeShow.value = true
        let h = me.touches[0].target.clientHeight
        if (changeY < 0) {
          // 下

          let newVolume = volume - Math.abs(changeY) / h
          let n = newVolume <= 0 ? 0 : newVolume
          player.value.volume = n
          volumeVal.value = parseInt(n * 100) + '%'
        } else if (changeY > 0) {
          // 上
          let newVolume = volume + Math.abs(changeY) / h
          let n = newVolume >= 1 ? 1 : newVolume
          player.value.volume = n
          volumeVal.value = parseInt(n * 100) + '%'
        }
      }
    }
    const touchS = (se) => {
      if (se.touches.length == 1) {
        sx = se.touches[0].clientX
        sy = se.touches[0].clientY
        ex = sx
        ey = sy
        volume = player.value.volume
        timer = setTimeout(() => {
          // 长按
          if (!player.value.paused) {
            player.value.speed = 3
            fastShow.value = true
          }

          player.value.off('touchmove', touchM)
        }, 500)
        player.value.on('touchmove', touchM)
      }
    }
    player.value.on('touchstart', touchS)
    player.value.on('touchend', () => {
      top.value = true
      left.value = true
      slideShow.value = false
      fastShow.value = false
      volumeShow.value = false
      if (timer) {
        player.value.speed = 1
        clearTimeout(timer)
      }
      if (videoTime.value) {
        // console.log(videoTime.value)
        player.value.currentTime = videoTime.value
        videoTime.value = null
      }
    })
    // 禁止移动端双击全屏
    player.value.eventListeners.forEach(function (eventListener) {
      if (eventListener.type === 'dblclick') {
        eventListener.element.removeEventListener(
          eventListener.type,
          eventListener.callback,
          eventListener.options
        )
      }
    })
    // 双击切换播放
    player.value.on('dblclick', () => {
      if (player.value.paused) {
        player.value.play()
      } else {
        player.value.pause()
      }
    })

    player.value.on('enterfullscreen', () => {
      let orientation =
        window.screen.orientation ||
        window.screen.mozOrientation ||
        window.screen.msOrientation
      if (orientation.lock) orientation.lock('landscape')
    })
    player.value.on('exitfullscreen', () => {})
  } else {
    //电脑
    // console.log('电脑')
  }
}
onBeforeUnmount(() => {
  if (player.value && player.value.destroy) {
    player.value.destroy()
  }
})

onMounted(() => {})
</script>

<style lang="stylus" scoped>
@import './AnimeDetail.styl'
</style>
