import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { collaboratorType, indicatorType, managerType } from '../types';

interface CartContextType {
  collaborator: collaboratorType[];
  setCollab: Dispatch<SetStateAction<collaboratorType[]>>
  indicator: indicatorType[];
  setIndicator: Dispatch<SetStateAction<indicatorType[]>>
  manager: managerType[];
  setManager: Dispatch<SetStateAction<managerType[]>>
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: CartProviderProps) {
  const [collaborator, setCollab] = useState<collaboratorType[]>([])
  const [indicator, setIndicator] = useState<indicatorType[]>([])
  const [manager, setManager] = useState<managerType[]>([])
  
  return (
      <CartContext.Provider value={{ collaborator, setCollab, indicator, setIndicator, manager, setManager }}>
          {children}
      </CartContext.Provider>
  )

}