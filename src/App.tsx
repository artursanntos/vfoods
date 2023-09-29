import Home from "./pages/Home"
import Indicators from "./pages/Indicators"
import Login from "./pages/Login"
import Ranking from "./pages/Ranking"
import Profile from "./pages/Profile"
import NewIndicator from "./pages/NewIndicator"
import IndicatorPage from "./pages/IndicatorPage"
import NewCollaborator from "./pages/NewCollaborator"
import Collaborator from "./pages/Collaborator"
import { Route, Routes } from "react-router-dom"
import { VfoodsProvider } from "./contexts/VfoodsContext"

function App() {
  

    return (
        <>
            <VfoodsProvider>
                <Routes>
                
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/indicators" element={<Indicators/>}/>
                    <Route path="/indicators/new_indicator" element={<NewIndicator/>}/>
                    <Route path="/indicators/:id"  element={<IndicatorPage/>}/>
                    <Route path="/ranking" element={<Ranking/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/new_collaborator" element={<NewCollaborator/>}/>
                    <Route path="/profile/pdf"/>
                    <Route path="/collaborators/:id" element={<Collaborator/>}/>
                    <Route path="/collabotarors/:id/pdf"/>

                </Routes>
            </VfoodsProvider>
            
        </>


    )
}

export default App
