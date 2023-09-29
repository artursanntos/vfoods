import { createContext, SetStateAction, useState, Dispatch, ReactNode, useEffect } from 'react';
import { collaboratorType, indicatorType, managerType } from '../types';
import axios from 'axios';

interface VfoodsContextType {
  allCollaborators: collaboratorType[];
  setAllCollab: Dispatch<SetStateAction<collaboratorType[]>>
  allIndicators: indicatorType[];
  setAllIndicators: Dispatch<SetStateAction<indicatorType[]>>
  manager: managerType;
  setManager: Dispatch<SetStateAction<managerType>>
  getCurrentManager: (id: string) => void;
}

interface VfoodsProviderProps {
  children: ReactNode
}

export const VfoodsContext = createContext({} as VfoodsContextType);

export function VfoodsProvider({ children }: VfoodsProviderProps) {
  const [allCollaborators, setAllCollab] = useState<collaboratorType[]>([])
  const [allIndicators, setAllIndicators] = useState<indicatorType[]>([])
  const [manager, setManager] = useState<managerType>({} as managerType)

  const getCurrentManager = async () => {
    //  TODO: get manager id from backend
    const tempId = 'artur@gmail.com'
    try {
        const url = 'http://localhost:3000/gestor/' + tempId


        const response = axios.get(url)
        // make sure response is correct
        // console.log(response) 
        setManager((await response).data)
        // make sure manager is updated
        //console.log(manager);
        
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getCurrentManager()
  }, [])
  
  return (
      <VfoodsContext.Provider value={{ allCollaborators, setAllCollab, allIndicators, setAllIndicators, manager, setManager, getCurrentManager }}>
          {children}
      </VfoodsContext.Provider>
  )

}