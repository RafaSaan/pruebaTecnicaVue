<template>
  <div class="updateOrCreateView">
    <div class="headerUpdateOrCreate">
      <div class="">
        <p>En esta seccion podras adaptar preguntas con tus preferencias,
          para que tus clientes cuenten su experiencia
        </p>
        <p>(Limite 5 preguntas)</p>
      </div>
      <div class="headerOptions">
        <div class="actionButton setButton" v-if="canSetQuestions" @click="store.setCustomQuestions">
          <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
          Set
        </div>
        <div class="actionButton" @click="saveSurvey">
          <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
          Guardar
        </div>
        <div class="actionButton cancelButton" @click="emit('cancel')">
          <font-awesome-icon :icon="['fas', 'xmark']"/>
          Cancelar
        </div>
      </div>
    </div>
    <div class="actionButton" @click="store.addQuestion()" :class="store.customQuestions.length >= 5 ? 'disableBtn' : ''">
      <font-awesome-icon :icon="['fas', 'plus']"/>
      Agregar
    </div>

    <div class="customQuestion" v-for="question, index in store.customQuestions" :key="index">
      <div class="questionContainer">
        <div class="questionInputContainer">
          <input type="text" :id="'question' + index" class="questionInput"  v-model="question.question">
          <span class="errorMessage" v-if="store.error('question', question.errors).hasError">{{ store.error('question', question.errors).message }}</span>
        </div>
        <font-awesome-icon :icon="['fas', 'trash']" class="deleteIcon" size="lg" @click="store.removeQuestion(index)"/>
      </div>
      <div class="defaultChecks">
        <div class="checkContainer">
          <input type="checkbox" :id="'isRequired' + index" v-model="question.isRequired">
          <label :for="'isRequired' + index">Pregunta obligatoria</label>
        </div>
        <div class="checkContainer">
          <input type="checkbox" :id="'countForEvaluation' + index" v-model="question.isCountForEvaluation">
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
          <span class="errorMessage" v-if="store.error('typeRating', question.errors).hasError">{{ store.error('typeRating', question.errors).message }}</span>
        </div>

        <div class="">
          <span class="ratingTitle">¿Que icono te gustaria?</span>
          <div class="typeRatingContainer">
            <div class="typeRating">
              <input type="radio" :id="'start'+index" value="star" v-model="question.icon"/>
              <label :for="'start'+index">
                <font-awesome-icon :icon="['fas', 'star']" :style="{ color: '#F7D345' }" size="lg"/>
              </label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'smile'+index" value="face-smile-beam" v-model="question.icon"/>
              <label :for="'smile'+index">
                <font-awesome-icon :icon="['fas', 'face-smile-beam']" :style="{ color: '#F7D345' }" size="lg"/>
              </label>
            </div>
          </div>
          <span class="errorMessage" v-if="store.error('icon', question.errors).hasError">{{ store.error('icon', question.errors).message }}</span>
        </div>

        <div class="" v-if="question.typeRating === 'range'">
          <span class="ratingTitle">Rango máximo</span>
          <div class="typeRatingContainer">
            <div class="typeRating">
              <input type="radio" :id="'numberFive'+index" :value="5" v-model="question.range"/>
              <label :for="'numberFive'+index">5</label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'numberFour'+index" :value="4" v-model="question.range"/>
              <label :for="'numberFour'+index">4</label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'numberThree'+index" :value="3" v-model="question.range"/>
              <label :for="'numberThree'+index">3</label>
            </div>
            <div class="typeRating">
              <input type="radio" :id="'numberTwo'+index" :value="2" v-model="question.range"/>
              <label :for="'numberTwo'+index">2</label>
            </div>
          </div>
          <span class="errorMessage" v-if="store.error('range', question.errors).hasError">{{ store.error('range', question.errors).message }}</span>
        </div>

        <div class="" v-if="question.typeRating === 'options'">
          <span class="ratingTitle">Opciones</span>
          <div class="typeRatingContainer customOptionContainer">
            <input type="text" :id="'optionOne'+index" class="questionInput optionInput" placeholder="Opción 1" v-model="question.options[0]">
            <input type="text" :id="'optionTwo'+index" class="questionInput optionInput" placeholder="Opción 2" v-model="question.options[1]">
            <input type="text" :id="'optionThree'+index" class="questionInput optionInput" placeholder="Opción 3" v-model="question.options[2]">
            <input type="text" :id="'optionFour'+index" class="questionInput optionInput" placeholder="Opción 4" v-model="question.options[3]">
          </div>
          <span class="errorMessage" v-if="store.error('options', question.errors).hasError">{{ store.error('options', question.errors).message }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useSurveyStore } from '@/stores/survey';
import { onMounted, ref } from 'vue';

const store = useSurveyStore()
const emit = defineEmits(['cancel']);
const canSetQuestions = ref(false)

onMounted(() => {
  store.setSurveyInfoToEdit()
  // en el destroy se sebe quitar el commando
  document.addEventListener('keydown', keyListener);

})

function keyListener (e) {
  if (e.key === 'a' && e.ctrlKey) {
    e.preventDefault();
    canSetQuestions.value = !canSetQuestions.value
  }
}

function saveSurvey() {
  if (!store.customQuestions.length) return
  const hasErrors = store.validateCustomQuestions()
  if (hasErrors) return
  else {
    store.saveSurvey()
    emit('cancel')
  }
}

</script>

<style scoped>
.questionInputContainer {
  display: flex;
  flex-direction: column;
}
.errorMessage {
  color: #ff0000;
  font-size: 12px;
  margin: 0 .5rem;
}
.updateOrCreateView {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  max-height: 78vh;
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
.headerUpdateOrCreate {
  font-size: 14px;
  color: #67748e;
  display: flex;
  justify-content: space-between;
}
.headerOptions {
  display: flex;
  gap: 1rem;
}
.customQuestion {
  margin: 1.5rem 0;
  color: #000;
}
.questionInput {
  background-color: #F6F8FA;
  border: none;
  height: 2.5rem;
  border-radius: .5rem;
  padding: 1rem;
  width: 400px;
}
.questionContainer {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.deleteIcon {
  cursor: pointer;
}
.deleteIcon:hover {
  color: rgb(255, 0, 0);
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
.checkContainer > input {
  accent-color: #6becb4;
}
.ratingTitle {
  font-weight: 600;
  font-size: 16px;
}
.customOptionsContainer {
  display: flex;
  gap: 1rem;
}
.optionInput {
  width: 150px;
}
.disableBtn {
  cursor: not-allowed;
  background-color: #929292;
}
.cancelButton {
  background-color: #929292;
}
.separate {
  margin: 0 1rem;
  margin-bottom: .6rem;
  border: .1px solid #e4e4e4;
}
.setButton {
  background-color: rgb(120, 137, 232);
}

@media (max-width: 1500px) {
  .typeRatingContainer {
    gap: 1rem;
  }
}
@media (max-width: 1320px) {
  .customOptionsContainer {
    flex-direction: column;
  }
}
@media (max-width: 700px) {
  .customOptionContainer {
    flex-wrap: wrap;
  }
}
@media (max-width: 600px) {
  .headerUpdateOrCreate {
    flex-direction: column;
    margin-bottom: 1rem;
  }
}
@media (max-width: 500px) {
  .questionInput {
    width: 270px;
  }
  .optionInput {
    width: 145px;
  }
}
</style>