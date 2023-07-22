import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";

const App = () => {
  
  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;