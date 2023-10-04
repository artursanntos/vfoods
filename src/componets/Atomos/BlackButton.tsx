interface BlackButtonProps {
    title: string;
    helpText: string;
    icon: JSX.Element;
    onClickFunc?: () => void;
}

export default function BlackButton({ title, helpText, icon, onClickFunc }: BlackButtonProps) {

    const handleClick = () => {
        if (onClickFunc) {
            onClickFunc();
        }
        
    };

    return (
        <div onClick={() => handleClick()} className="flex items-center justify-center pr-10 pl-8 py-4 gap-10 hover:cursor-pointer hover:scale-[1.01] ease-in-out duration-100 bg-cinza-700 rounded-17 max-w-[22rem] max-h-[8.75rem] h-[8.75rem]">
            {icon}
            <div>
                <p className="font-bold text-branco text-sm mb-3">{title}</p>
                <p className="text-branco text-xs">{helpText}</p>
            </div>
        </div>
    )
}