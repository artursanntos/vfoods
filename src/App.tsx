import Base from "./pages/Base"
import Indicators from "./pages/Indicators"
import { Route, Routes } from "react-router-dom"

function App() {
  

    return (
        <>
            <Routes>
                
                <Route path="/" element={<Base/>}/>
                <Route path="/indicators" element={<Indicators/>}/>

            </Routes>
            
        </>


    )
}

export default App
