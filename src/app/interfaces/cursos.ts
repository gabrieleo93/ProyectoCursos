export interface Cursos {
  idCurso?: number
  nombreCurso: string
  proveedor: string
  urlCurso: string
  tipoCurso: string
  clasificacionFinal?: number// Agregar esta línea
  precio?: number
}
