<script setup>
import { RouterView } from 'vue-router'
import MainNavbar from '@/components/MainNavbar.vue';

</script>

<template>
  <div class="styleBackground"></div>
  <MainNavbar/>
  <div class="mainDisplay">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.styleBackground {
  min-height: 300px;
  position: absolute;
  width: 100%;
  background-color: #2dce89;
}
.mainDisplay {
  z-index: 999;
  width: 100%;
  min-height: 90vh;
  margin-right: 1rem;
}
@media (max-width: 1000px) {
  .mainDisplay {
    margin: 0;
    padding: .5rem;
  }
}
</style>
