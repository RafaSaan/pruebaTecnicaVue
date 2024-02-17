import { ref } from 'vue'

export const useSurvey = ()=> {
  const survey = ref([])

  const addQuestion = ()=> {
    if (survey.value.length >= 5) return 
    const customQuestion = {
      question: '',
      isRequired: false,
      isCountForEvaluation: false,
      typeRating: '',
      icon: '',
      range: 0,
      options: []
    }
    survey.value.push(customQuestion)
  }
  const removeQuestion = (index)=> {
    survey.value.splice(index, 1)
  }

  return {
    survey,
    addQuestion,
    removeQuestion
  }
}