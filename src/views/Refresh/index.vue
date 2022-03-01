<template>
  <div>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()
const path = localStorage.getItem('path')
if (path) {
  router.push(path)
} else {
  router.push({ name: 'Home' })
}

</script>

<style scoped>

</style>