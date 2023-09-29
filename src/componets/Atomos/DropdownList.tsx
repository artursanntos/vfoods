import Dropdown from 'react-dropdown'
import { useEffect, useState } from 'react';

interface DropdownProps {
    label: string | undefined;
    options: string[];
    parentCallback: (data: string) => void;
    defaultValue?: string;
}

export default function DropdownList({label, options, parentCallback, defaultValue}: DropdownProps) {

    const [isExpanded, setIsExpanded] = useState(false);

    const placeholderStyles = () => {
        if (isExpanded) {
            return "w-full px-5 py-[0.9rem] rounded-17 text-cinza-500 font-bold self-star rounded-b-17 border-b border-vermelho"
        } else {
            return "w-full px-5 py-[0.9rem] rounded-17 text-cinza-500 font-bold self-star rounded-b-17"
        }  
    };

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const handleSelect = (option: any) => {
        parentCallback(option.value);
    };

    useEffect(() => {
        placeholderStyles();
    }, [isExpanded])

    return(
        <>
            <div onClick={handleExpand}>
                <Dropdown options={options} onChange={handleSelect}
                placeholder={label}
                className='border border-vermelho rounded-17 text-cinza-500 font-bold hover:cursor-pointer'
                placeholderClassName={placeholderStyles()}
                menuClassName='w-full rounded-b-17 divide-y divide-vermelho text-cinza-500 font-bold text-center'
                arrowClassName="bg-preto"
                value={defaultValue}
                />
            </div>
            
        </>
        
    )
}