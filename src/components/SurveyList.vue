<template>
  <div class="surveyList">
    <div class="surveyHeader">
      <p>{{isOpenCreateOrUpdateSurvey ? 'Personaliza tus preguntas' : 'Preguntas'}}</p>
      <div class="surveyOptions">
        <div class="actionButton" @click="isOpenCreateOrUpdateSurvey = false">
          <font-awesome-icon
              :icon="['fas', 'pen']"
              :style="{ color: '#fff' }"
            />
            Editar
        </div>
      </div>
    </div>

    <UpdateOrCreateSurvey v-if="isOpenCreateOrUpdateSurvey"/>
    <div class="withoutTasksContainer" v-if="!isOpenCreateOrUpdateSurvey && !store.survey.length">
      <div class="addQuestionBtn" @click="isOpenCreateOrUpdateSurvey = true">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          :style="{ color: '#000' }" size="3x"/>
      </div>
      <div class="addBtnInfo">
        <p>No existen preguntas</p>
        <p>De click para agregar una nueva pregunta</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import UpdateOrCreateSurvey from './UpdateOrCreateSurvey.vue';
import { useSurveyStore } from '@/stores/survey'

const store = useSurveyStore()
const isOpenCreateOrUpdateSurvey = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.surveyList {
  background-color: #fff;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 3rem;
  min-height: 60vh;
}
.surveyHeader {
  display: flex;
  justify-content: space-between;
}
.surveyHeader > p{
  font-size: 20px;
  font-weight: 600;
}
.surveyOptions {
  display: flex;
  gap: 1rem;
}
.actionButton {
  background-color: #2dce89;
  width: 90px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  gap: 5px;
}
.withoutTasksContainer {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.addQuestionBtn {
  border: 3px dashed #000;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 1rem;
  cursor: pointer;
}
.addBtnInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #67748e;
  font-size: 15px;
  margin-top: .5rem;
}
</style>