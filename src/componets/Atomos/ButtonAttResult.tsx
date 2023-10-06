interface ButtonAttResultProps {
    label: string;
}

export default function ButtonAttResult({ label }: ButtonAttResultProps) {

    const styles = ` bg-slate-50 drop-shadow-md items-center px-4 py-1 rounded-17 font-light`;
    return (
        <button className={styles}>
            {label}
        </button>
    )
}