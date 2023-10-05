import { useContext, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { CollaboratorContext } from '../contexts/ColaboratorContext';



type HomePageLineGraphProps = {
    msdamInd: [][]
    
}

export default function HomePageLineGraph({ msdamInd }: HomePageLineGraphProps) {
    
    const { loadGraph, setLoadGraph } = useContext(CollaboratorContext);
    const [ arrayValues, setArrayValues ] = useState<number[][]>([])
    const [ arrayDates, setArrayDates ] = useState<number[]>([]);
    const [ arrayMetas, setArrayMetas ] = useState<number[]>([]);
    const [ arraySuperMetas, setArraySuperMetas ] = useState<number[]>([]);
    const [ arrayDesafios, setArrayDesafios ] = useState<number[]>([]);
    
    function sortByDatesAndReorder(dates: string[], numbers: number[]): [string[], number[]] {
        // Zip the dates with their respective numbers
        const zippedData = dates.map((date, index) => ({
          date,
          number: numbers[index],
        }));
      
        // Sort the zipped data by dates
        zippedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
        // Unzip the sorted data into separate date and number arrays
        const sortedDates = zippedData.map((item) => item.date);
        const sortedNumbers = zippedData.map((item) => item.number);
      
        return [sortedDates, sortedNumbers];
    }

    const parseDate = (date: string): number => {
        // i want to return just the month number (1-12)
        const month = date.split('-')[1];
        //console.log(parseInt(month));
        return parseInt(month);

    }

    // a function that gets a list of months and calls parseDate on each of them
    const parseDates = (dates: string[]): number[] => {
        let parsedDates: number[] = [];
        for (let i = 0; i < dates.length; i++) {
            parsedDates.push(parseDate(dates[i]));
        }
        return parsedDates;
    }


    useEffect(() => {
        console.log(msdamInd[0]);
        
        console.log(sortByDatesAndReorder(msdamInd[0], msdamInd[1]));
        setArrayDates(parseDates(sortByDatesAndReorder(msdamInd[0], msdamInd[1])[0]));
        setArrayMetas(sortByDatesAndReorder(msdamInd[0], msdamInd[1])[1]);
        setArraySuperMetas(sortByDatesAndReorder(msdamInd[0], msdamInd[2])[1]);
        setArrayDesafios(sortByDatesAndReorder(msdamInd[0], msdamInd[3])[1]);
        
        setLoadGraph(false);
    }, [loadGraph])

    return (
        <>
        {!loadGraph &&
            <Plot
                data={[
                    
                    {
                        x: [1,2,3,4,5,6,76,],      //mese_ano
                        y: arrayMetas,      //metas
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: '#5EE0F1' },
                        //line: { shape: 'spline', smoothing: 1.4},
                        name: "Meta",
                    },
                    {
                        x: [1,2,3,4,5,6,76,],      //mese_ano
                        y: arraySuperMetas,      //super-metas
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: '#7D55EF' },
                        // line: { shape: 'spline', smoothing: 1.4},
                        name: "Supermeta",
                    },
                    {
                        x: [1,2,3,4,5,6,76,],      //mese_ano
                        y: arrayDesafios,      //desafios
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
                    yaxis: { showticklabels: true, title: { text: 'Quantidade' }},
                    xaxis: { showgrid: true, tickmode: 'linear', dtick: 1, title: { text: 'Mês' } },
                    modebar: { remove: ["hoverCompareCartesian", "hovercompare", "lasso2d", "orbitRotation", "pan2d", "pan3d", "resetCameraDefault3d", "resetCameraLastSave3d", "resetGeo", "resetScale2d", "resetViewMapbox", "resetViews", "select2d", "sendDataToCloud", "tableRotation", "toImage", "toggleHover", "toggleSpikelines", "togglespikelines", "zoom2d", "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMapbox", "zoomOut2d", "zoomOutGeo", "zoomOutMapbox"] }
                }}
            />
        }
        {!arrayDates && !arrayValues &&
        <p>Carregando...</p>} 
        </>
        
        
    );
}

//sortByDatesAndReorder(arrayDates, arrayValues[0]);

/* */