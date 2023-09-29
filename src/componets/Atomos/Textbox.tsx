interface TextboxProps {
    type: string;
    label: string | undefined;
    parentCallback: (data: string) => void;
    currentValue?: string;
}

export default function Textbox({ label, type, parentCallback, currentValue }: TextboxProps) {


    if (type == "descricao") {
        return (
            <textarea placeholder={label}
                rows={8}
                className="w-full px-5 py-3 rounded-17 border border-vermelho placeholder:text-cinza-500 placeholder:font-bold placeholder:self-star"
                onChange={(e) => parentCallback(e.target.value)}
                value={currentValue}
            />
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