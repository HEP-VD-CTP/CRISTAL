import { QCM102, type MyFile } from 'stores/CristalStore'

export async function readAFile(file: MyFile): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file)
      return reject('No file provided')

    const reader = new FileReader()

    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    
    // @ts-ignore
    reader.readAsText(file)
  })
}


export function parseQCM102(content: string): QCM102 {
  const lines = (content ?? '').split('\n')
  const line0 = lines[0]?.split(' ') ?? []

  const scans: QCM102 = {
    reference: line0[0] ?? 'UNKNOWN',
    type: "QCM102",
    scans: []
  }

  for (const line of lines) {
    if (!line.trim()) 
      continue; // Skip empty lines

    const parts = line.split(' ') 

    const id = parts[2] ?? ''
    const form = parts[3] ?? ''
    const sheet = parts[4] ?? ''
    const answers = (parts[5] ?? '').replaceAll('\r', '').replaceAll('\n', '').split('')

    scans.scans.push({
      id,
      form,
      sheet,
      answers
    })    
  }

  return scans
}