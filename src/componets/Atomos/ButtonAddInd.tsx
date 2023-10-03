import { Link } from "react-router-dom";

interface ButtonAddIndProps {
    label1: string;
    label2: string;
    pagina: string;
}
     
export default function ButtonAddInd({ label1, label2, pagina }: ButtonAddIndProps) {

    const styles = `flex px-5 pb-6 rounded-17 text-white ${pagina === 'perfilGestor' ? 'bg-preto hover:bg-black w-1/6' : 'bg-[#363636] hover:bg-[#282828] w-1/3'}`;
    const stylePlus = `text-9xl ${pagina === 'perfilGestor' ? 'text-white' : 'text-vermelho'}`;

    return (
        <Link to={"/indicators"}>
        <button className={styles}>
            <div className={stylePlus}>
                +
            </div> 
            <div>
                <div className='pt-5 text-xl font-bold'>
                    {label1}
                </div >
                <div className='text-xm pt-3'>
                    {label2}
                </div>  
            </div>
        </button>             
        </Link>
        
    )
}