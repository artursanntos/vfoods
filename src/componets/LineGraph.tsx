import Plot from 'react-plotly.js';



type LineGraphProps = {
    mmsdInd: [][]
    // mmsdInd significa Meses, Mestas, Super-metas, Desafios por Indicadores
    /*
    mmsdInd: {
        esses valores sao referentes a um indicador
        mmsdInd[0] = mese_ano: string[], todos o meses_anos
        mmsdInd[1] = meta: number[],  valor de metas batidas de cada mes
        mmsdInd[2] = supermeta: number[], valor de super-metas batidas de cada mes
        mmsdInd[3] = desafio: number[] valor de metas batidas de cada mes
    }
    */
}

export default function LineGraph({ mmsdInd }: LineGraphProps) {
    
    //console.log(mmsdInd)
    
    return (
        <Plot
            data={[
                {
                    x: mmsdInd[0],      //mese_ano
                    y: mmsdInd[1],      //metas
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#5EE0F1' },
                    name: "Meta",
                },
                {
                    x: mmsdInd[0],      //mese_ano
                    y: mmsdInd[2],      //super-metas
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#7D55EF' },
                    name: "Supermeta",
                },
                {
                    x: mmsdInd[0],      //mese_ano
                    y: mmsdInd[3],      //desafios
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#E51110' },
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
