import { Link } from "react-router-dom";

interface ButtonAddColabProps {
    label1: string;
    label2: string;
}
     
export default function ButtonAddColab({ label1, label2 }: ButtonAddColabProps) {

    const styles = `flex px-5 pb-6 rounded-17 text-white bg-vermelho hover:bg-vermelho-700 w-1/6`;
    const stylePlus = ``;

    return (
        <Link to={"/new_collaborator"}>
        <button className={styles}>
            <div className='pt-10 pr-2'>
                <img src='src\assets\personWhite.png' className='w-20'></img>
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