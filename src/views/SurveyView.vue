<template>
  <div>
    <p class="viewTitle">
      Preguntas Personalizadas
    </p>
    <SurveyList/>
  </div>
</template>

<script setup>
import SurveyList from '@/components/SurveyList.vue';
</script>

<style scoped>
.viewTitle {
  font-size: 20px;
  font-weight: 600;
  margin-top: 1rem;
  color: #fff;
}
@media (max-width: 1000px) {
  .viewTitle {
    margin-top: 0;
  }
}
</style>