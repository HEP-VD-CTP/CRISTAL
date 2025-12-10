<template>
  
  <div  :class="`row justify-between q-pa-none ${store.selectedQCM102?.answers[i-1] === '.' ? 'bg-red-1' : ''}`">
    <div class="bg-dark text-white text-bold q-px-xs self-start">
      {{ i }} 
    </div>
    <div class="q-pa-xs">
      <table>
        <tbody>
        
          <tr>
            <td class="inttertd" style="color:red" v-for="j in 9">{{ j }}</td>
          </tr>
          
          <tr>
            <td class="inttertd" v-for="j in 9">
              <q-btn
                :disable="!disabled" 
                @click="store.selectedQCM102 && (store.selectedQCM102.answers[i-1] = j.toString())"
                unelevated 
                :color="store.selectedQCM102?.answers[i-1] === j.toString() ? 'red' : 'grey-3'" 
                class="q-ml-xs q-mr-xs" 
                size="xs"/>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { CristalStore } from 'stores/CristalStore'
  import { computed, ref, type Ref } from 'vue'

  const props =defineProps<{ i: number }>()

  const store = CristalStore()

  const disabled = computed(() => props.i <= store.nbAnswers)
</script>

<style setup>

.inttertd {
  border: 0px solid black;
  text-align: center;
}
</style>