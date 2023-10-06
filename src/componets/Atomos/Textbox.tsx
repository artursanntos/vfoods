import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useState, useRef } from 'react';

interface TextboxProps {
    type: string;
    label: string | undefined;
    parentCallback: (data: string) => void;
    currentValue?: string;
}

export default function Textbox({ label, type, parentCallback, currentValue }: TextboxProps) {

    const [eyeState, setEyeState] = useState(false)
    const inputRef = useRef(null)

    const toggleShow = () => {
        if (inputRef.current.type == 'password') {
            setEyeState(true)
            inputRef.current.type = 'text'
        } else {
            setEyeState(false)
            inputRef.current.type = 'password'
        }
    }

    if (type == "descricao") {
        return (
            <textarea placeholder={label}
                rows={8}
                className="w-full px-5 py-3 rounded-17 border border-vermelho placeholder:text-cinza-500 placeholder:font-bold placeholder:self-star"
                onChange={(e) => parentCallback(e.target.value)}
                value={currentValue}
            />
        )
    } else if (type == "password")  {
        return (
            <div className='flex flex-row w-full border bg-white border-vermelho h-[3.1rem] rounded-17'>
                <input placeholder={label}
                    type={type}
                    ref={inputRef}
                    className="w-[22.5rem] h-[2.75] px-5 py-3 border-hidden focus:outline-none outline-none outline-0 rounded-17 placeholder:text-cinza-500 placeholder:font-bold"
                    onChange={(e) => parentCallback(e.target.value)}
                    value={currentValue}
                />
                <button onClick={toggleShow} className='flex items-center justify-center hover:scale-105 w-[2rem] '>
                    {eyeState ? <VscEyeClosed/> : <VscEye/>}
                </button>
            </div>
        )
    } else {
        return (
            <input placeholder={label}
                type={type}
                className="w-full px-5 py-3 rounded-17 border border-vermelho placeholder:text-cinza-500 placeholder:font-bold"
                onChange={(e) => parentCallback(e.target.value)}
                value={currentValue}
            />
        )
    }

}