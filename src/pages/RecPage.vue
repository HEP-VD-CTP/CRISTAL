<template>
  <q-page class="flex flex-center" style="border:0px solid red">
    <div class="bg-grey-1 q-pa-md" style="border:0px solid blue;min-width: 500px;">
      <h6 class="q-pa-none q-mb-md q-mt-none q-ml-none q-mr-none text-center">Sélection des paramètres</h6>

      <q-separator />

      <div class="q-mt-md">
        Type de feuille:
        <q-radio dark v-model="store.recType" val="QCM102" label="QCM102" color="red" keep-color />
        <q-radio dark v-model="store.recType" val="QCMDC30" label="QCMDC30" color="red" keep-color />
      </div>
      
      <div class="q-mt-md">
        Fichier de lecture <b>A</b>:<br/>
        <q-file v-model="store.recAFile" label="Sélectionner le fichier de lecture A" accept=".txt">
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="store.recAFile = null" class="cursor-pointer" />
          </template>
        </q-file>
      </div>
      
      <div class="q-mt-lg">
        Fichier de vérification <b>V</b>:<br/>
        <q-file v-model="store.recVFile" label="Sélectionner le fichier de vérification V" accept=".txt">
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="store.recVFile = null" class="cursor-pointer" />
          </template>
        </q-file>
      </div>
    </div>
  </q-page>
  <q-footer elevated class="bg-grey-1">
    <q-toolbar>
      
      <q-space />
      <q-btn label="Suivant" color="primary" @click="next()" />
    </q-toolbar>
  </q-footer>
</template>
  
<script setup lang="ts">
import { CristalStore } from 'stores/CristalStore'
import { readAFile, parseQCM102 } from 'stores/lib'
import { useQuasar, QVueGlobals } from 'quasar'
import { ref } from 'vue'

const store = CristalStore()
const q: QVueGlobals = useQuasar()







async function next(){
  if (!store.recAFile || !store.recVFile)
    return q.dialog({
      title: 'Erreur',
      message: 'Veuillez sélectionner les deux fichiers avant de continuer.',
      ok: true
    })  
  

  const contentA = await readAFile(store.recAFile)
  parseQCM102(contentA)
  
}


</script>

<style setup>


</style>