import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'



export type MyFile = any[] | File | FileList | null | undefined

export type QCM102 = {
  reference: string,
  type: "QCM102",
  scans: Array<QCM102Scan>
}

export type QCM102Scan = {
  id: string,
  form: string,
  sheet: string
  answers: Array<string>
}

export const CristalStore = defineStore('cristal', () => {

  const page: Ref<"rec" | null> = ref("rec")

  const nbAnswers: Ref<number> = ref(30)

  const recStep: Ref<"home" | "analyze" | "export"> = ref("home")

  const recType: Ref<"QCM102"|"QCMDC30"> = ref("QCM102")
  const recAFile: Ref<MyFile> = ref(null)
  const recVFile: Ref<MyFile> = ref(null) 

  const QCM102A: Ref<QCM102 | null> = ref(null)
  const QCM102V: Ref<QCM102 | null> = ref(null)
  const QCM102Final: Ref<QCM102 | null> = ref(null)
  const selectedQCM102: Ref<QCM102Scan | null> = ref(null)
  
  const recNext: Ref<boolean> = ref(false)

  return {
    page,
    nbAnswers,
    recStep,
    recType,
    recAFile,
    recVFile,
    QCM102A,
    QCM102V,
    QCM102Final,
    selectedQCM102,
    recNext
  }
})
