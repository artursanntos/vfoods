import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { collaboratorType, indicatorType, managerType } from '../types';

interface VfoodsContextType {
  collaborator: collaboratorType[];
  setCollab: Dispatch<SetStateAction<collaboratorType[]>>
  indicator: indicatorType[];
  setIndicator: Dispatch<SetStateAction<indicatorType[]>>
  manager: managerType[];
  setManager: Dispatch<SetStateAction<managerType[]>>
}

interface VfoodsProviderProps {
  children: ReactNode
}

export const VfoodsContext = createContext({} as VfoodsContextType);

export function VfoodsProvider({ children }: VfoodsProviderProps) {
  const [collaborator, setCollab] = useState<collaboratorType[]>([])
  const [indicator, setIndicator] = useState<indicatorType[]>([])
  const [manager, setManager] = useState<managerType[]>([])
  
  return (
      <VfoodsContext.Provider value={{ collaborator, setCollab, indicator, setIndicator, manager, setManager }}>
          {children}
      </VfoodsContext.Provider>
  )

}