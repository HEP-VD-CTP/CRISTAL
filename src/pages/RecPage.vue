<template>
  <q-page v-if="!store.recNext" class="flex flex-center" style="border:0px solid red">
    <div class="bg-grey-1 q-pa-md" style="border:0px solid blue;min-width: 500px;">
      <h6 class="q-pa-none q-mb-md q-mt-none q-ml-none q-mr-none text-center">Sélection des paramètres</h6>

      <q-separator />

      <div class="q-mt-md">
        Type de feuille:
        <q-radio dark v-model="store.recType" val="QCM102" label="QCM102" color="red" keep-color @click="maxInput = 102" />
        <q-radio dark v-model="store.recType" val="QCMDC30" label="QCMDC30" color="red" keep-color @click="maxInput = 30" />
      </div>
      
      <div class="q-mt-md">
        Nombre de questions à traiter:
        <q-input
          v-model.number="store.nbAnswers"
          type="number"
          style="max-width: 200px"
          :min="1"
          :max="maxInput"
        />
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
  
  <q-page class="q-pa-xs" v-else-if="store.recNext && store.recType == 'QCM102'">
    <div class="q-mt-md">
      <q-btn 
        unelevated
        v-for="scan in store.QCM102Final?.scans || []" 
        :flat="store.selectedQCM102?.sheet!=scan.sheet"
        @click="store.selectedQCM102?.sheet==scan.sheet ? store.selectedQCM102 = null : store.selectedQCM102 = scan"
        :color="scan.answers.slice(0, store.nbAnswers).includes('.') || !numbers.includes(scan.form) ? 'deep-orange' : 'positive'">
        {{ scan.sheet }} 
      </q-btn>
    </div>
    
    <template v-if="!store.selectedQCM102">
      <div class="text-center bg-red q-mt-xl" style="border:1px solid red; color: white; font-weight: bold;">
        Veuillez sélectionner une feuille pour afficher les résultats
      </div>
    </template>
    <template v-else>
      <div class="q-mt-md text-center bg-red" style="border:1px solid red; color: white; font-weight: bold;">
        Questionnaire à choix multiple - 102 questions - max 9 choix
      </div>

      <div>
        <table style="width:100px">
          <tbody>
            
            <tr>
              <td style="border:0" rowspan="2">Matricule <b>{{ store.selectedQCM102?.id }}</b></td>
              <td style="border:0" rowspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forme:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td class="inttertd" style="color:red" v-for="j in letters">{{ j }}</td>
            </tr>
            
            <tr>
              <td class="inttertd" v-for="j in 4">
                <q-btn 
                  @click="store.selectedQCM102 && (store.selectedQCM102.form = j.toString())"
                  unelevated 
                  :color="store.selectedQCM102?.form === j.toString() ? 'red' : 'grey-3'" 
                  class="q-ml-xs q-mr-xs" 
                  size="xs" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <table class="q-mt-lg q-mb-md">
        <tbody>
          <tr v-for="i in range(1, 15)">
            <td><QCM102Cell :i="i" /></td>
            <td><QCM102Cell :i="i+15" /></td>
            <td><QCM102Cell :i="i+30" /></td>
          </tr>
        </tbody>
        <tbody style="border-top:10px solid black">
          <tr v-for="i in range(46, 64)">
            <td><QCM102Cell :i="i" /></td>
            <td><QCM102Cell :i="i+19" /></td>
            <td><QCM102Cell :i="i+38" /></td>
          </tr>
        </tbody>
      </table>
    </template>
  </q-page>

  <q-footer elevated class="bg-grey-1">
    <q-toolbar>
      <q-btn v-if="store.recNext" label="Retour" color="primary" @click="previous()" />
      <q-space />
      <q-btn v-if="!store.recNext" label="Vérifier les données" color="primary" @click="next()" />
      <q-btn v-if="store.recNext" label="Exporter les données" color="primary" @click="exportData()" />
    </q-toolbar>
  </q-footer>
</template>
  
<script setup lang="ts">
import { CristalStore, type QCM102, type QCM102Scan } from 'stores/CristalStore'
import { readAFile, parseQCM102 } from 'stores/lib'
import { useQuasar, QVueGlobals } from 'quasar'
import { ref } from 'vue'
import QCM102Cell from 'src/components/QCM102Cell.vue'

const letters = ref(["A", "B", "C", "D"])
const numbers = ref(["1", "2", "3", "4"])
const maxInput = ref(102)

const store = CristalStore()
const q: QVueGlobals = useQuasar()

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, k) => start + k)
}

async function next(){
  if (!store.recAFile || !store.recVFile)
    return q.dialog({
      title: 'Erreur',
      message: 'Veuillez sélectionner les deux fichiers avant de continuer.',
      ok: true
    })  
  

  if (store.recType === 'QCM102'){
    store.QCM102A = parseQCM102(await readAFile(store.recAFile))
    console.log('QCM102A loaded:')
    console.log(store.QCM102A)
    
    console.log('QCM102V loaded:')
    store.QCM102V = parseQCM102(await readAFile(store.recVFile))
    console.log(store.QCM102V)

    // parse to see errors
    const final: QCM102 = {
      reference: store.QCM102A?.reference,
      type: 'QCM102',
      scans: []
    }

    const scansA = store.QCM102A?.scans || []
    const scansV = store.QCM102V?.scans || []

    for (let i = 0; i < scansA.length; i++) {
      const scan: QCM102Scan = {
        id: scansA[i]?.id || 'XXXXXX',
        form: scansA[i]?.form || '.',
        sheet: scansA[i]?.sheet || 'XXXX',
        answers: []
      }

      if (scan.form == '.')
        scan.form = ''

      for (let j = 0; j < (scansA[i]?.answers.length || 0); j++){
        if (scansA[i]?.answers[j] === scansV[i]?.answers[j])
          scan.answers.push(scansA[i]?.answers[j] || '.')
        else 
          scan.answers.push(".") // mark as error
      }

      final.scans.push(scan)
    }

    store.QCM102Final = final

  } 
  
  store.recNext = true
}

function previous(){
  store.QCM102Final = null
  store.selectedQCM102 = null
  store.recNext = false
} 

function exportData() {
  console.log(`Exporting data...`)

  // first make sure that all data are correct
  if (store.recType === 'QCM102'){
    if (!checkQCM102Data()){
      return q.dialog({
        title: 'Erreur',
        message: 'Les données contiennent des erreurs. Veuillez les corriger avant d\'exporter.',
        ok: true
      })  
    }

    // export the qcm102 data
    let finalData = ``
    for (const scan of store.QCM102Final?.scans || []) 
      finalData += `${scan.id.padStart(6, '0')} ${scan.form} ${scan.sheet} ${(scan.answers.slice(0, store.nbAnswers).join('')).padEnd(102, '0')}\n`

    console.log(finalData )
    // download
    const blob = new Blob([finalData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export_qcm102.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

}

function checkQCM102Data(): boolean {
  if (!store.QCM102Final)
    return false

  for (const scan of store.QCM102Final.scans) {
    if (scan.answers.slice(0, store.nbAnswers).includes('.')) 
      return false
    
    if (!numbers.value.includes(scan.form))
      return false
    
  }

  return true
}


</script>

<style setup>

table {
  width: 100%;
  border-collapse: collapse;
}
td, th {
  border: 1px solid black;
}
table, td, th {
  padding: 0 !important;
}
</style>