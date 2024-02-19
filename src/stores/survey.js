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
      if (question.icon === '') question.errors['icon'] = { message: 'Es requerido seleccionar un icono' }
      if (question.typeRating === 'range' && question.range === 0) question.errors['range'] = { message: 'Es requerido seleccionar un rango' }
      if (question.typeRating === 'options' && existEmptyOptions(question.options)) {
        question.errors['options'] = { message: 'Es requerido completar las opciones' }
      }
      // eslint-disable-next-line no-unused-vars
      for (const property in question.errors) {
        hasErrors = true
      }
    })
    return hasErrors
  }

  const existEmptyOptions = (options) => {
    let isEmpty = false
    options.forEach((option) => { if (option === '') isEmpty = true })
    return isEmpty
  }
  const validateSurvey = () => {
    survey.value.forEach((question) => {
      if (!question.isRequired) return
      question.errors = []
      if (question.typeRating === 'open' && question.response === '') question.errors['open'] = { message: 'Es requerido contestar la pregunta' }
      if (question.typeRating === 'range' && question.response === '') question.errors['range'] = { message: 'Es requerido seleccionar un rango' }
      if (question.typeRating === 'closed' && question.response === '') question.errors['closed'] = { message: 'Es requerido seleccionar una opcion' }
      if (question.typeRating === 'options' && question.response === '') question.errors['options'] = { message: 'Es requerido seleccionar una opcion' }
    })
    console.log(survey.value)
  }

  const setSurveyInfoToEdit = () => {
    if (survey.value.length) {
      survey.value.forEach((question) => {
        question.response = ''
        question.errors = []
      })
      customQuestions.value = [...survey.value]
      return
    }
    customQuestions.value = []
  }
  const setCustomQuestions = () => {
    const questions = [
      {
        icon: "star",
        isCountForEvaluation: false,
        isRequired: true,
        options: ['', '', '', ''],
        question: "¿En qué medida está satisfecho con el contenido de este sitio web? Escala de respuestas: De 1 a 5, de muy insatisfecho a muy satisfecho",
        range: 5,
        response: "",
        typeRating: "range",
        errors: []
      },
      {
        question: "¿Ha encontrado la información que buscaba?",
        isRequired: true,
        isCountForEvaluation: false,
        typeRating: "closed",
        icon: "star",
        range: 0,
        options: ["","","",""],
        errors: [],
        response: ""
      },
      {
        question: "La página web me facilitó encontrar lo que buscaba. Escala de respuestas: 1 a 5; Muy en desacuerdo a Muy de acuerdo",
        isRequired: false,
        isCountForEvaluation: false,
        typeRating: "range",
        icon: "face-smile-beam",
        range: 5,
        options: ["","","",""],
        errors: [],
        response: ""
      },
      {
        question: "¿Qué más podemos hacer para ayudarle a tomar una decisión?",
        isRequired: true,
        isCountForEvaluation: false,
        typeRating: "open",
        icon: "face-smile-beam",
        range: 0,
        options: ["","","",""],
        errors: [],
        response: ""
      },
      {
        question: "¿Con qué frecuencia utiliza productos de eClock?",
        isRequired: false,
        isCountForEvaluation: false,
        typeRating: "options",
        icon: "star",
        range: 0,
        options: [
            "Diaria",
            "Semanal",
            "Mensual",
            "Cada 6 meses"
        ],
        errors: [],
        response: ""
      }
      
    ]
    customQuestions.value = questions
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
        errors: [],
        response: ''
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
      survey.value = [...customQuestions.value]
      customQuestions.value = []
    },
    validateSurvey,
    setSurveyInfoToEdit,
    setCustomQuestions
  }
})