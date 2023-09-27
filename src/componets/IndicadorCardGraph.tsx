import Plot from 'react-plotly.js';

type IndicadorCardGraphProps = {
    indicador: {
        nome: string,
        meses: string[],
        meta: number[],
        supermeta: number[],
        desafio: number[]
    }
}

export default function IndicadorCardGraph({ indicador }: IndicadorCardGraphProps) {
    return (
        <button
            onClick={() => { console.log('clicou') }}
            className='border rounded-10 bg-white border-cinza-100 h-[23.125rem] w-[29.75rem] hover:border-[#7D55EF] hover:border-2'>

            <div className='flex flex-col justify-center items-center'>
                <h4 className='text-2xl font-bold mt-4'>
                    {indicador.nome}
                </h4>
                <div className='mb-4'>
                    <Plot
                        data={[
                            {
                                x: indicador.meses,
                                y: indicador.meta,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: '#E51110' },
                                name: "Meta",
                            },
                            {
                                x: indicador.meses,
                                y: indicador.supermeta,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: '#7D55EF' },
                                name: "Supermeta",
                            },
                            {
                                x: indicador.meses,
                                y: indicador.desafio,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: '#5EE0F1' },
                                name: "Desafio",
                            },
                        ]}
                        layout={{
                            width: 450,
                            height: 300,
                            showlegend: false,
                            yaxis: { showticklabels: false },
                            xaxis: { showgrid: false },
                            modebar: { remove: ["hoverCompareCartesian", "hovercompare", "lasso2d", "orbitRotation", "pan2d", "pan3d", "resetCameraDefault3d", "resetCameraLastSave3d", "resetGeo", "resetScale2d", "resetViewMapbox", "resetViews", "select2d", "sendDataToCloud", "tableRotation", "toImage", "toggleHover", "toggleSpikelines", "togglehover", "togglespikelines", "zoom2d", "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMapbox", "zoomOut2d", "zoomOutGeo", "zoomOutMapbox"] }
                        }}
                    />
                </div>
            </div>
        </button>
    );
}
