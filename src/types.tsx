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

  export interface metasMesIndicadorType {
    id: string;
    mes_ano: string;//DateTime
    //exemplo de representacao na requisicao: "2020-03-01T00:00:00.000Z"
    //ATENCAO: Sempre usar esta configuracao, alterando apenas o mes e ano
    totalColabBateramMeta: number;
    totalColabBateramSuperMeta: number;
    totalColabBateramDesafio: number;
    totalColab: number;
    idIndicador: string;
  }

  export interface colaboratorIndicatorType {
    id: string;
    mes_ano: Date;
    meta: number;
    superMeta: number;
    desafio: number;
    peso: number;
    resultado: number;
    notaIndicador: number;
    idColaborador: string;
    idIndicador: string;
  }