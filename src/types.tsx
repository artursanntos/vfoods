export interface collaboratorType {
    id: string
    nome: string
    senha: string
    imagem:string
    email: string
    telefone: string
    cargo: string
    data_admissao: Date
    idGestor: string
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
    nome: string
    email: string
    area: string
    imagem: string
    senha: string
  }