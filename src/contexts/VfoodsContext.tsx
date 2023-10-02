import { createContext, SetStateAction, useState, Dispatch, ReactNode, useEffect } from 'react';
import { collaboratorType, indicatorType, managerType, metasMesIndicadorType } from '../types';
import axios from 'axios';

interface VfoodsContextType {
  allCollaborators: collaboratorType[];
  setAllCollab: Dispatch<SetStateAction<collaboratorType[]>>
  allIndicators: indicatorType[];
  setAllIndicators: Dispatch<SetStateAction<indicatorType[]>>
  manager: managerType;
  setManager: Dispatch<SetStateAction<managerType>>
  metasSemestre: metasMesIndicadorType[];
  setMetasSemestre: Dispatch<SetStateAction<metasMesIndicadorType[]>>
  getCurrentManager: (id: string) => void;
  getCollaborators: (manager: managerType) => void;
  getIndicators: (manager: managerType) => void;
  getMetasSemestre: (indicador: indicatorType) => void;
}

interface VfoodsProviderProps {
  children: ReactNode
}

export const VfoodsContext = createContext({} as VfoodsContextType);

export function VfoodsProvider({ children }: VfoodsProviderProps) {
  const [allCollaborators, setAllCollab] = useState<collaboratorType[]>([])
  const [allIndicators, setAllIndicators] = useState<indicatorType[]>([])
  const [metasSemestre, setMetasSemestre] = useState<metasMesIndicadorType[]>([])
  const [manager, setManager] = useState<managerType>({} as managerType)

  const getCurrentManager = async () => {
    //  TODO: get manager id from backend
    const tempId = 'artur@gmail.com'
    try {
      const url = 'http://localhost:3000/gestor/' + tempId

      const response = axios.get(url)

      const man = (await response).data

      setManager(man)
      getCollaborators(man)
      getIndicators(man)
      

    } catch (error) {
      console.log(error)
    }
  }

  const getCollaborators = async (manager: managerType) => {
    const urlEmail = manager.email
    try {
      const url = 'http://localhost:3000/gestor/colaboradores/' + urlEmail
      const response = axios.get(url)

      const collab = (await response).data
      setAllCollab(collab)
      console.log(allCollaborators)

    } catch (error) {
      console.log(error)
    }
  }

  const getIndicators = async (manager: managerType) => {
    const urlID = manager.id
    try {
      const url = 'http://localhost:3000/indicador/' + urlID
      const response = axios.get(url)

      const ind = (await response).data
      setAllIndicators(ind)
      console.log(allIndicators)

    } catch (error) {
      console.log(error)
    }
  }

  const getMetasSemestre = async (indicador: indicatorType) => {
    
    try {
  
        const url = 'http://localhost:3000/metas-mes-indicador/' + indicador.id
        const response = axios.get(url)

        const metas = (await response).data
        setMetasSemestre([metas])
        console.log(metasSemestre)
        return metasSemestre;

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getCurrentManager()
  }, [])
  

  return (
    <VfoodsContext.Provider value={{ allCollaborators, setAllCollab, allIndicators, setAllIndicators, manager, setManager, metasSemestre, setMetasSemestre, getCurrentManager, getCollaborators, getIndicators, getMetasSemestre}}>
      {children}
    </VfoodsContext.Provider>
  )

}