export interface Cursos {
  id: string;
  nombre: string
  proveedor:string
  url:string
  inicio?:Date
  fin?:Date
  tipo:string
  calificacion?: number
  titulo?:File | null
  UserId: string

}
