type ButtonSBProps = {
    pathIcon:string;
    buttonText:string;
    //selected:boolean;
    //esse atributo deixa o botao selecionado, para indicar que já está na página que o motão levaria
}

export function ButtonSB(props:ButtonSBProps){
    return (
        
        <button className="flex w-48 items-center py-2 px-2 border border-branco rounded-10 bg-branco hover:bg-azul hover:border-azul hover:font-semibold ease-in-out duration-150">
            <img src={props.pathIcon} className="mr-6 w-6"></img>
            <span className="button-text text-base">{props.buttonText}</span>
        </button>
        
    );
}