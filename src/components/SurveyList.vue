<template>
  <div class="surveyListContainer">
    <div class="surveyHeader">
      <p>{{isOpenCreateOrUpdateSurvey ? 'Personaliza tus preguntas' : 'Preguntas'}}</p>
      <div class="surveyOptions">
        <div class="actionButton" v-if="store.survey.length && !isOpenCreateOrUpdateSurvey" @click="store.validateSurvey()">
          <font-awesome-icon
              :icon="['fas', 'paper-plane']"
              :style="{ color: '#fff' }"
            />
            Validar
        </div>
        <div class="actionButton" v-if="store.survey.length && !isOpenCreateOrUpdateSurvey" @click="openCreateOrUpdate">
          <font-awesome-icon
              :icon="['fas', 'pen']"
              :style="{ color: '#fff' }"
            />
            Editar
        </div>
      </div>
    </div>

    <TransitionGroup name="slide-fade">
      <UpdateOrCreateSurvey v-if="isOpenCreateOrUpdateSurvey" @cancel="cancelCreateOrUpdate"/>
      <div class="withoutTasksContainer" v-if="!isOpenCreateOrUpdateSurvey && !store.survey.length">
        <div class="addQuestionBtn" @click="openCreateOrUpdate">
          <font-awesome-icon
            :icon="['fas', 'plus']"
            :style="{ color: '#000' }" size="3x"/>
        </div>
        <div class="addBtnInfo">
          <p>No existen preguntas</p>
          <p>De click para agregar una nueva pregunta</p>
        </div>
      </div>

      <div class="surveyList" v-if="!isOpenCreateOrUpdateSurvey && store.survey.length">
        <div class="questionItem" v-for="question, index in store.survey" :key="index">
          <span class="questionText">{{ index+1 + '.-' + question.question }}</span>
          <div class="openQuestionContainer">
            <input
              type="text"
              :id="'questionSurvey' + index"
              class="questionInput"
              v-model="question.response"
              :class="question.response !== '' ? 'openInputComplete' : ''"
              v-if="question.typeRating === 'open'"
              :placeholder="question.question"
            >
            <span class="errorMessage" v-if="store.error('open', question.errors).hasError">{{ store.error('open', question.errors).message }}</span>
          </div>

          <div class="">
            <div class="closedOption" v-if="question.typeRating === 'closed'">
              <div
                class="itemToSelect"
                :class="question.response === 'si' ? 'itemSelected' : ''"
                @click="question.response = 'si'">
                  Si
              </div>
              <div
                class="itemToSelect"
                :class="question.response === 'no' ? 'itemSelected' : ''"
                @click="question.response = 'no'">
                No
              </div>
            </div>
            <span class="errorMessage" v-if="store.error('closed', question.errors).hasError">{{ store.error('closed', question.errors).message }}</span>
          </div>

          <div class="">
            <div class="rangeOptions" v-if="question.typeRating === 'range'">
              <div
              class="rangeItem"
              v-for="range, index in question.range"
              :key="index"
              :class="question.response === index + 1 ? 'itemSelected' : ''"
              @click="question.response = index+1">
                  {{ index + 1 }}
              </div>
            </div>
            <span class="errorMessage" v-if="store.error('range', question.errors).hasError">{{ store.error('range', question.errors).message }}</span>
          </div>

          <div class="">
            <div class="rangeOptions optionsContainer" v-if="question.typeRating === 'options'">
              <div
              class="optionItem rangeItem"
              v-for="option, index in question.options"
              :key="index"
              :class="question.response === option ? 'itemSelected' : ''"
              @click="question.response = option">
                  {{ option }}
              </div>
            </div>
            <span class="errorMessage" v-if="store.error('options', question.errors).hasError">{{ store.error('options', question.errors).message }}</span>
          </div>
        </div>
      </div>
    </TransitionGroup>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import UpdateOrCreateSurvey from './UpdateOrCreateSurvey.vue';
import { useSurveyStore } from '@/stores/survey';

const store = useSurveyStore()
const isOpenCreateOrUpdateSurvey = ref(false)

function cancelCreateOrUpdate() {
  isOpenCreateOrUpdateSurvey.value = false
}
function openCreateOrUpdate() {
  isOpenCreateOrUpdateSurvey.value = true
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.surveyListContainer {
  background-color: #fff;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1.5rem;
  min-height: 60vh;
  max-height: 85vh;
}
.surveyHeader {
  display: flex;
  justify-content: space-between;
}
.surveyHeader > p{
  font-size: 20px;
  font-weight: 600;
  color: #000;
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
.questionText {
  font-size: 16px;
  font-weight: 600;
  margin: .3rem 0;
}
.questionInput {
  background-color: #F6F8FA;
  border: none;
  height: 2.5rem;
  border-radius: .5rem;
  padding: 1rem;
  width: 350px;
}
.questionInput:focus-within {
  border: 1px solid #2dce89;
}
.questionInput:focus {
  outline: none;
}
.questionItem {
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  color: #000;
}
.itemToSelect {
  background: #F6F8FA;
  height: 30px;
  width: 100px;
  border-radius: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}
.closedOption {
  display: flex;
  gap: 1.5rem;
}
.openInputComplete {
  border: 1px solid #2dce89;
}
.rangeOptions {
  display: flex;
  gap: 2rem;
}
.rangeItem {
  width: 35px;
  height: 35px;
  border-radius: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #F6F8FA;
  font-size: 16px;
  font-weight: 500;
}
.optionItem {
  width: auto;
  height: auto;
  padding: .5rem;
}
.itemSelected {
  background-color: #2dce89;
  color: #fff;
}
.errorMessage {
  color: #ff0000;
  font-size: 12px;
  margin: 0 .5rem;
}
.openQuestionContainer {
  display: flex;
  flex-direction: column;
}
@media (max-width: 1000px) {
  .surveyListContainer {
    max-height: unset;
  }
}
@media (max-width: 500px) {
  .optionsContainer {
    flex-wrap: wrap;
    gap: .5rem;
  }
}
@media (max-width: 400px) {
  .questionInput {
    width: 300px;
  }
}
</style>