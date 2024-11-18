export interface RecordInterface {
  diagnosis: string
  content: string
  doctorsName: string
  hospitalName: string
  labResults: LabResultInterface
  generalReport: GeneralReportInterface
  images?: File[]
  date: Date
}

export interface LabResultInterface {
  testName: string
  referenceRange: string
  units: string
  comments: string
}

export interface GeneralReportInterface {
  heartBeat: string
  bloodPressure: string
  sugarLevel: string
  haemoglobin: string
}

export interface UploadImageInterface {
  image: File
}