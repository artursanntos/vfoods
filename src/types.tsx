export interface collaboratorType {
    id: string
    name: string
    image:string
    email: string
    phone: string
    position: string
    address: string
    cep: string
    admissionDate: Date
    manager: string
  }
  
  export interface indicatorType {
    id: string
    nome: string
    unidade_medida: string
    descricao: string
    data_deadline: Date
    idGestor: string
  }
  
  export interface managerType {
    id: string
    name: string
    email: string
    area: string
    image: string
    password: string
    quantity: number
  }