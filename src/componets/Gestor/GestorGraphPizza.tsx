import Plot from "react-plotly.js"

type GestorGraphPizzaProps = {
    meta: number;
    supermeta: number;
    desafio: number;
}

export default function GestorGraphPizza({ meta, supermeta, desafio }: GestorGraphPizzaProps) {
    var data = [
        {
            values: [meta, supermeta, desafio],
            labels: ['Meta', 'Supermeta', 'Desafio'],
            marker: {
                colors: ['#5EE0F1', '#7D55EF', '#E51110']
            },
            type: "pie",
            hoverinfo: 'label+percent',
        },
    ];

    return (
        <Plot
            data={data as any}
            layout={{ width: 400, height: 400 }} />
    )
}
