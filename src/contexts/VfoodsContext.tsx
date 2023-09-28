import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { collaboratorType, indicatorType, managerType } from '../types';

interface VfoodsContextType {
  allCollaborators: collaboratorType[];
  setAllCollab: Dispatch<SetStateAction<collaboratorType[]>>
  allIndicators: indicatorType[];
  setAllIndicators: Dispatch<SetStateAction<indicatorType[]>>
  manager: managerType[];
  setManager: Dispatch<SetStateAction<managerType[]>>
}

interface VfoodsProviderProps {
  children: ReactNode
}

export const VfoodsContext = createContext({} as VfoodsContextType);

export function VfoodsProvider({ children }: VfoodsProviderProps) {
  const [allCollaborators, setAllCollab] = useState<collaboratorType[]>([])
  const [allIndicators, setAllIndicators] = useState<indicatorType[]>([])
  const [manager, setManager] = useState<managerType[]>([])
  
  return (
      <VfoodsContext.Provider value={{ allCollaborators, setAllCollab, allIndicators, setAllIndicators, manager, setManager }}>
          {children}
      </VfoodsContext.Provider>
  )

}