<template>
  <nav>
    <div class="nav">
      <div class="title">
        bloniea
      </div>
      <!-- pc导航菜单 -->
      <div class="nav-names">
        <ul>

          <li
            v-for="menu in menus"
            :key="menu.id"
            @click="toPage(menu.name)"
          >
            <i :class="'iconfont'+' '+menu.icon"></i>{{menu.label}}
          </li>

        </ul>
      </div>
      <!-- app导航菜单 -->
      <div
        class="nav-names-app"
        v-if="navNameShow"
      >
        <ul>
          <li
            v-for="menu in menus"
            :key="menu.id"
            @click="toPage(menu.name)"
          >
            <i :class="'iconfont'+' '+menu.icon"></i>{{menu.label}}
          </li>
        </ul>
      </div>
      <!-- 菜单显示按钮和搜索按钮 -->
      <div class="option">
        <div
          class="btns"
          v-if="searchShow"
        ><i
            class="iconfont iconcaidan"
            @click="navNameShow = !navNameShow"
          ></i>
          <i
            class="iconfont iconsearch"
            @click="searchShow=false"
          ></i>

        </div>

        <div
          class="search-box"
          v-else
        >
          <input
            type="text"
            class="search-input"
          >
          <span
            class="cancel"
            @click="searchShow=true"
          >取消</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const search = ref('')
const searchShow = ref(true)
const menus = reactive([
  { id: 1, label: '主页', name: 'home', icon: 'iconhome' },
  // { id: 2, label: '归档', icon: 'iconapple' },
  { id: 3, label: '分类', name: 'categories', icon: 'icon14' },
  // { id: 4, label: '标签', icon: 'iconpen' },
  { id: 5, label: '友链', name: 'categories', icon: 'iconlove' },
  { id: 6, label: '关于', name: 'categories', icon: 'iconguanyu' }
])
const navNameShow = ref(false)

// 路由跳转
const route = useRouter()
const toPage = (name) => {
  route.push('/' + name)
}

</script>

<style lang='styl' scoped>
@import './index.styl';
</style>
