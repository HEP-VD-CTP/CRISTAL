<template>
  <q-layout view="lHh Lpr lFf">


    <q-drawer v-model="drawer" 
      show-if-above 
      :mini="miniState" 
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      behavior="desktop"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        
        <q-list class="bg-primary">
          <q-item clickable v-ripple @click="store.page=null">
            <q-item-section avatar>
              <q-icon color="white" name="mdi-diamond-stone" />
            </q-item-section>

            <q-item-section class="text-white">
              <q-item-label>CRISTAL</q-item-label>
              <q-item-label class="text-white" caption>Haute Ecole Pédagogique Vaud</q-item-label>
            </q-item-section>
            
          </q-item>
        </q-list>
        
        <q-list>
          <q-item clickable v-ripple @click="store.page='rec'" :active="store.page==='rec'">
            <q-item-section avatar>
              <q-icon name="mdi-source-merge" />
            </q-item-section>

            <q-item-section>
              Réconciliation des données
            </q-item-section>
          </q-item>
        </q-list>


      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <template v-if="!store.page">
        <lander />
      </template>
      <template v-else-if="store.page==='rec'">
        <recPage />
      </template>

    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { CristalStore } from 'stores/CristalStore'

import lander from 'src/components/lander.vue'
import recPage from 'src/pages/RecPage.vue'

const store = CristalStore()

const drawer: Ref<boolean> = ref(true)
const miniState: Ref<boolean> = ref(true)




</script>
