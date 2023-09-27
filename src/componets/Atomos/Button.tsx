interface ButtonProps {
    label: string;
    color: string;
}

export default function Button({ label, color }: ButtonProps) {

    const styles = `px-12 py-3 rounded-17 text-white ${color === 'preto' ? 'bg-preto hover:bg-cinza-800' : 'bg-vermelho hover:bg-vermelho-700'}`;

    return (
        <button className={styles}>
            {label}
        </button>
    )
}