import { Route, Routes } from "react-router-dom";
import Landing from "../Landing";







export const App_Router = () => {
    
    return (
        <Routes>
          
          <Route path="/*" element={<Landing/>} />

          {/* <Route path="/politicas-privacidad" element={<PoliticasPrivacidad/>} />
          <Route path="/success" element={<FormSucces/>} />
          <Route path="/contactos" element={<LinkTree/>} /> */}

          
    
            
        </Routes>
    );
};