interface TextboxProps {

    label: string | undefined;
}

export default function Textbox({ label }: TextboxProps) {
    return (
        <input placeholder={label}
        className="w-full px-5 py-3 rounded-17 border border-vermelho placeholder:text-cinza-300 placeholder:font-bold"
        />
    )
}