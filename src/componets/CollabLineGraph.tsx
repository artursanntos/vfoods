import { useContext, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { CollaboratorContext } from '../contexts/ColaboratorContext';



type LineGraphProps = {
    msdamInd: [][]
    // msdamInd significa Meta, Super-meta, Desafio, Ano, Mês por Indicadores
    /*
    mmsdInd: {
        esses valores sao referentes a um indicador

        mmsdInd[X][0] = meta: number[], quantidade de metas batidas daquele mes
        mmsdInd[X][1] = supermeta: number[], quantidade de super-metas batidas daquele mes
        mmsdInd[X][2] = desafio: number[], quantidade de desafios batidos daquele mes
        mmsdInd[X][3] = ano: number[] valor do ano
        mmsdInd[X][4] = mes: number[] valor do mes
    }
    */
}

export default function LineGraph({ msdamInd }: LineGraphProps) {
    
    const { loadGraph, setLoadGraph } = useContext(CollaboratorContext);
    const [ array, setArray ] = useState<number[][]>([])
    const [meta, setMeta] = useState<number[]>([]);
    const [supermeta, setSupermeta] = useState<number[]>([]);
    const [desafio, setDesafio] = useState<number[]>([]);
    const [meses, setMeses] = useState<number[]>([]);

    const extractMeta = (type: number): number[] => {
        let meta: number[] = [];
          // for each of the lists, add the first element to the meta list
          for (let i = 0; i < array.length; i++) {
            if (array[i].length != 0) {
                meta.push((array[i][type] * 100) as unknown as number);
              } 
          }
          //console.log(meta);
          return meta;
    }

    const extractMeses = (): number[] => {
        let meses: number[] = [];
          // for each of the lists, add the first element to the meta list
          for (let i = 0; i < array.length; i++) {
            if (array[i].length != 0) {
                meses.push(array[i][4] as unknown as number);
              } 
          }
          //console.log(meses);
          return meses;
    }
    
    useEffect(() => {
        setArray(msdamInd);
        setLoadGraph(false);
    }, [loadGraph])

    useEffect(() => {
        setMeta(extractMeta(0));
        setSupermeta(extractMeta(1));
        setDesafio(extractMeta(2));
        setMeses(extractMeses());
    }, [array])

    return (
        <Plot
            data={[
                
                {
                    x: meses,      //mese_ano
                    y: meta,      //metas
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#5EE0F1' },
                    //line: { shape: 'spline', smoothing: 1.4},
                    name: "Meta",
                },
                {
                    x: meses,      //mese_ano
                    y: supermeta,      //super-metas
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#7D55EF' },
                    // line: { shape: 'spline', smoothing: 1.4},
                    name: "Supermeta",
                },
                {
                    x: meses,      //mese_ano
                    y: desafio,      //desafios
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#E51110' },
                    //line: { shape: 'spline', smoothing: 1.4},
                    name: "Desafio",
                },
            ]}
            layout={{
                width: 450,
                height: 300,
                showlegend: true,
                yaxis: { showticklabels: true, title: { text: 'Quantidade (%)' } },
                xaxis: { showgrid: true, tickmode: 'linear', dtick: 1, title: { text: 'Mês' } },
                modebar: { remove: ["hoverCompareCartesian", "hovercompare", "lasso2d", "orbitRotation", "pan2d", "pan3d", "resetCameraDefault3d", "resetCameraLastSave3d", "resetGeo", "resetScale2d", "resetViewMapbox", "resetViews", "select2d", "sendDataToCloud", "tableRotation", "toImage", "toggleHover", "toggleSpikelines", "togglespikelines", "zoom2d", "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMapbox", "zoomOut2d", "zoomOutGeo", "zoomOutMapbox"] }
            }}
        />
    );
}
