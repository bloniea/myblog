<template>
  <div>

  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()
const keyword = route.query.keyword
// router.push({ name: 'SearchDetail', query: { keyword: keyword } })
router.replace({ name: 'SearchDetail', query: { keyword: keyword } })
</script>

<style scoped>

</style>