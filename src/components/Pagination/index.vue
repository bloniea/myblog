<template>
  <div class="pagination">
    <div
      class="prev"
      @click="prev"
      v-if="prevShow"
    >prev</div>
    <div
      class="next"
      @click="next"
      v-if="nextShow"
    >next</div>
  </div>
</template>

<script  setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  pagenum: Number,
  pagesize: Number,
  total: Number
})
const prevShow = ref(true)
const nextShow = ref(true)
const myemit = defineEmits(['changePage'])
// 初始化

const pageInit = () => {
  const pagenum = props.pagenum,
    total = props.total,
    pagesize = props.pagesize
  if (pagenum <= 1) {
    prevShow.value = false
  }
  if ((pagenum * pagesize) >= total) {
    nextShow.value = false
  }
}
onMounted(() => {
  pageInit()
})

// 上一页
const prev = () => {
  let pagenum = props.pagenum
  pagenum -= 1
  if (pagenum <= 1) {
    pagenum = 1
    prevShow.value = false
  }
  myemit('changePage', pagenum)
}
// 下一页
const next = () => {
  let pagenum = props.pagenum,
    total = props.total,
    pagesize = props.pagesize
  pagenum += 1
  if ((pagenum * pagesize) >= total) {
    nextShow.value = false
  }
  // console.log(pagenum * pagesize, total)
  myemit('changePage', pagenum)
}

</script>

<style lang="stylus" scoped>
.pagination {
  display flex
  justify-content center
  margin 20px 0
  div {
    padding 15px 30px
    // margin 10px
    background #CD93E4
    color #fff
    cursor pointer
    transition all 0.3s
    &:hover {
      background pink
    }
  }
}
</style>