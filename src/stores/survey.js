import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSurveyStore = defineStore('survey', () => {
  const survey = ref([])

  return {
    survey,
    setQuestion(question) {
      survey.value.push(question)
    }
  }
})