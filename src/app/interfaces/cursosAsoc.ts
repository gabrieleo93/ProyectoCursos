export interface CursosAsoc {
  id?: string
  nombreCurso: string
  proveedor:string
  urlCurso:string
  inicio?:Date
  fin?:Date
  tipoCurso:string
  calificacion?: number
  titulo?:File | null


}
