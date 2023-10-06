import Plot from "react-plotly.js"

type PizzaGraphProps = {
    meta: number;
    supermeta: number;
    desafio: number;
    naoAtingiu: number;
}

export default function PizzaGraph({ meta, supermeta, desafio, naoAtingiu }: PizzaGraphProps) {
    //console.log("PIZZA -- ", meta, supermeta, desafio, naoAtingiu)
    
    var data = [
        {
            values: [meta, supermeta, desafio, naoAtingiu],
            labels: ['Meta', 'Supermeta', 'Desafio', 'Não atingiu a meta'],
            marker: {
                colors: ['#5EE0F1', '#7D55EF', '#E51110', '#C4C4C4'],
            },
            type: "pie",
            hoverinfo: 'label+value',
        },
    ];

    return (
        <Plot
            data={data as any}
            layout={{ width: 400, height: 400 }} />
    )
}
