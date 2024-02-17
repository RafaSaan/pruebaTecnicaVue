<template>
  <div class="updateOrCreateView">
    <p>En esta seccion podras adaptar preguntas con tus preferencias,
      para que tus clientes cuenten su experiencia
    </p>
    <p>(Limite 5 preguntas)</p>
    <div class="actionButton" @click="addQuestion" :class="survey.length >= 5 ? 'disableBtn' : ''">
      <font-awesome-icon :icon="['fas', 'plus']" :style="{ color: '#fff' }"/>
      Agregar
    </div>
    <div class="customQuestion" v-for="question, index in survey" :key="index">
      <input type="text" :id="'question' + index" class="questionInput">
      <div class="defaultChecks">
        <div class="checkContainer">
          <input type="checkbox" :id="'isRequired' + index">
          <label :for="'isRequired' + index">Pregunta obligatoria</label>
        </div>
        <div class="checkContainer">
          <input type="checkbox" :id="'countForEvaluation' + index">
          <label :for="'countForEvaluation' + index">Esta pregunta contara en la evaluacion de tu colaborador</label>
        </div>
      </div>
      <div class="customOptionsContainer">
        <div class="">
          <span class="ratingTitle">Tipo de calificacion</span>
          <div class="typeRatingContainer">
            <div class="typeRating">
              <input type="radio" :id="'range' + index" value="range" v-model="question.typeRating"/>
              <label :for="'range' + index">De Rango</label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'closed' + index" value="closed" v-model="question.typeRating"/>
              <label :for="'closed' + index">Cerrada(Si o No)</label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'open' + index" value="open" v-model="question.typeRating"/>
              <label :for="'open' + index">Abierta</label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'options' + index" value="options" v-model="question.typeRating"/>
              <label :for="'options' + index">Opciones</label>
            </div>
          </div>
        </div>

        <div class="" v-if="question.typeRating === 'range'">
          <span class="ratingTitle">¿Que icono te gustaria?</span>
          <div class="typeRatingContainer">
            <div class="typeRating">
              <input type="radio" :id="'start'+index" value="star"/>
              <label :for="'start'+index">
                <font-awesome-icon :icon="['fas', 'star']" :style="{ color: '#000' }" size="lg"/>
              </label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'smile'+index" value="face-smile-beam"/>
              <label :for="'smile'+index">
                <font-awesome-icon :icon="['fas', 'face-smile-beam']" :style="{ color: '#000' }" size="lg"/>
              </label>
            </div>
          </div>
        </div>

        <div class="" v-if="question.typeRating === 'range'">
          <span class="ratingTitle">Rango máximo</span>
          <div class="typeRatingContainer">
            <div class="typeRating">
              <input type="radio" :id="'numberFive'+index" value="5"/>
              <label :for="'numberFive'+index">5</label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'numberFour'+index" value="4"/>
              <label :for="'numberFour'+index">4</label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'numberThree'+index" value="3"/>
              <label :for="'numberThree'+index">3</label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'numberTwo'+index" value="2"/>
              <label :for="'numberTwo'+index">2</label>
            </div>
          </div>
        </div>

        <div class="" v-if="question.typeRating === 'options'">
          <span class="ratingTitle">opciones</span>
          <div class="typeRatingContainer">
            <input type="text" :id="'optionOne'+index" class="questionInput optionInput" placeholder="Opción 1">
            <input type="text" :id="'optionTwo'+index" class="questionInput optionInput" placeholder="Opción 2">
            <input type="text" :id="'optionThree'+index" class="questionInput optionInput" placeholder="Opción 3">
            <input type="text" :id="'optionFour'+index" class="questionInput optionInput" placeholder="Opción 4">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const survey = ref([])
function addQuestion() {
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

</script>

<style scoped>
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
.customQuestion {
  margin: 1rem 0;
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
.defaultChecks {
  display: flex;
  gap: 2rem;
}
.checkContainer {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.typeRatingContainer {
  display: flex;
  gap: 2rem;
}
.typeRating {
  display: flex;
  align-items: center;
}
.typeRating > input {
  accent-color: #6becb4;
}
.ratingTitle {
  font-weight: 600;
  font-size: 16px;
}
.customOptionsContainer {
  display: flex;
  gap: 1.5rem;
}
.optionInput {
  width: 150px;
}
.disableBtn {
  cursor: not-allowed;
  background-color: #929292;
}
</style>