export interface collaboratorType {
    idColab: string
    nameColab: string
    image:string
    email: string
    phone: string
    position: string
    adress: string
    cep: string
    admissioDate: Date
    managerColab: string
  }
  
  export interface indicatorType {
    idInd: string
    nameInd: string
    measure: string
    description: string
    deadline: Date
    managerInd: string
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