import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Home from './Pages/Home/Home';
import CreditDiv from './Components/CreditDiv/CreditDiv';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Researches from './Pages/Researches/Researches';
import Teaching from './Pages/Teaching/Teaching';

function App() {
  // console log using jQuery
  const [scrolled, setScrolled] = useState(false);
  
  const [nonHomePath, setNonHomePath] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <Box>
      <Router>
        <div className={`scroll-up-btn ${scrolled && " scroll-up-btn-show"}`}  onClick={scrollToTop}>
          <i className="fas fa-angle-up"></i>
        </div>
        <ScrollToTop />
        <Header isScrolled={scrolled} nonHomePath={nonHomePath}/>
        <Routes>
          <Route path="/" element={<Home setNonHomePath={setNonHomePath}/>}/>
          <Route path="/Researches" element={<Researches setNonHomePath={setNonHomePath}/>}/>
          <Route path="/Teaching" element={<Teaching setNonHomePath={setNonHomePath}/>}/>
          {/* <Route path={["/Contact-us" , "/join-us" , "/Join-BIKE","/Latest"]} exact element={<ContactUs/>}/> */}
        </Routes>
        <Footer/>
        <CreditDiv/>
      </Router>
      
    </Box>
  );
}

export default App;
