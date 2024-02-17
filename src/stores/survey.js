import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSurveyStore = defineStore('survey', () => {
  const survey = ref([])
  const customQuestions = ref([])

  const validateCustomQuestions = ()=> {
    let hasErrors = false
    customQuestions.value.forEach((question) => {
      question.errors = []
      if (question.question === '') question.errors['question'] = { message: 'Es requerido agregar una pregunta' }
      if (question.typeRating === '') question.errors['typeRating'] = { message: 'Es requerido agregar un tipo de calificacion' }
      if (question.typeRating === 'range' && question.icon === '') question.errors['icon'] = { message: 'Es requerido seleccionar un icono' }
      if (question.typeRating === 'range' && question.range === 0) question.errors['range'] = { message: 'Es requerido seleccionar un rango' }
      if (question.typeRating === 'options' && (question.options[0] === '' || question.options[1] === '' || question.options[2] === '' || question.options[3] === '' ))
      { question.errors['options'] = { message: 'Es requerido completar las opciones' } }
      if (question.errors['question'] || question.errors['typeRating'] || question.errors['icon'] || question.errors['range'] || question.errors['options']){
        hasErrors = true
      }
    })
    return hasErrors
  }

  return {
    survey,
    customQuestions,
    // actions
    addQuestion() {
      if (customQuestions.value.length >= 5) return
      const customQuestion = {
        question: '',
        isRequired: false,
        isCountForEvaluation: false,
        typeRating: '',
        icon: '',
        range: 0,
        options: ['','','',''],
        errors: []
      }
      customQuestions.value.push(customQuestion)
    },
    removeQuestion(index) {
      customQuestions.value.splice(index, 1)
    },
    resetQuestions() {
      customQuestions.value = []
    },
    validateCustomQuestions,
    error(key,questionErrors) {
      if (key in questionErrors) {
        return { message: questionErrors[key]['message'], hasError: true }
      }
      return { message: '', hasError: false }
    },
    saveSurvey() {
      survey.value = customQuestions.value
    }

  }
})