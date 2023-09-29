import Plot from 'react-plotly.js';
//import { metasMesIndicadorType } from '../types';


type LineGraphProps = {
    indicador: {
        meses: string[],
        meta: number[],
        supermeta: number[],
        desafio: number[]
    }
}

export default function LineGraph({ indicador }: LineGraphProps) {
    return (
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
    );
}
