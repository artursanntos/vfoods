import { createContext, SetStateAction, useState, Dispatch, ReactNode, useEffect } from 'react';
import { collaboratorType, indicatorType, managerType, metasMesIndicadorType } from '../types';
import axios from 'axios';
import Api from '../Api';

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
      const url = 'gestor/' + tempId

      // const response = axios.get(url)

      Api.get(url).then(response => {
        const man = response.data
        setManager(man)
        getCollaborators(man)
        getIndicators(man)
      })
      /*
      console.log(manager);
      console.log(allCollaborators);
      console.log(allIndicators);
      */
    } catch (error) {
      console.log(error)
    }
  }

  const getCollaborators = async (manager: managerType) => {
    const urlEmail = manager.email
    try {
      const url = 'gestor/colaboradores/' + urlEmail
      //const response = axios.get(url)
      Api.get(url).then(response => {
        const collab = response.data
        setAllCollab(collab)
        console.log(allCollaborators);
      })

    } catch (error) {
      console.log(error)
    }
  }

  const getIndicators = async (manager: managerType) => {
    const urlID = manager.id
    try {
      const url = 'indicador/' + urlID

      Api.get(url).then(response => {
        // console.log(response)
        const ind = response.data
        setAllIndicators(ind)
        // console.log(allIndicators);
        
      })

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <VfoodsContext.Provider value={{ allCollaborators, setAllCollab, allIndicators, setAllIndicators, manager, setManager, metasSemestre, setMetasSemestre, getCurrentManager, getCollaborators, getIndicators, getMetasSemestre}}>
      {children}
    </VfoodsContext.Provider>
  )

}