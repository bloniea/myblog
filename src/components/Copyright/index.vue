<template>
  <footer class="copyright">
    ©{{year}} bloniea. All rights reserved.
  </footer>
</template>

<script setup>
import { ref } from '@vue/reactivity'

const nowYear = new Date().getFullYear()
const year = ref(0)
year.value = nowYear > 2022 ? 2022 + '-' + nowYear : 2022
</script>

<style lang="stylus" scoped>
.copyright {
  background rgba(255, 255, 255, 0.6)
  padding 10px
  text-align center
}
</style>
