interface TextboxProps {
    type: string;
    label: string | undefined;
}

export default function Textbox({ label, type }: TextboxProps) {

    if (type == "descricao") {
        return (
            <textarea placeholder={label}
            rows={8}
            className="w-full px-5 py-3 rounded-17 border border-vermelho placeholder:text-cinza-300 placeholder:font-bold placeholder:self-star"
            />
        )
    } else {
        return (
            <input placeholder={label}
            type={type}
            className="w-full px-5 py-3 rounded-17 border border-vermelho placeholder:text-cinza-300 placeholder:font-bold"
            />
        )
    }
    
}