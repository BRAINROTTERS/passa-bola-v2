import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import Footer from "./components/Footer";
import SobreContato from "./routes/SobreContato";
import { Routes, Route } from "react-router-dom";
import Copa from "./routes/Copa";
import Home from "./routes/Home"; 

function App() {
  return (
    <div className="font-sans">
       <Navbar/>
        <main className="flex-grow">
          <Routes>
          
            <Route path="/" element={<Home />} />       
            <Route path="/home" element={<Home />} />
            <Route path="/sobrecontato" element={<SobreContato />} />
            <Route path="/copa" element={<Copa />} />

          </Routes>
          
        </main>
        
        
       
        <Footer />
    </div>
  );
}

export default App;
