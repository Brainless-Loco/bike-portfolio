import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Home from './Components/Home/Home';
import CreditDiv from './Components/CreditDiv/CreditDiv';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { Box } from '@mui/material';

function App() {
  return (
    <Box>
      <Router>
        <div className="scroll-up-btn">
          <i className="fas fa-angle-up"></i>
        </div>
        <ScrollToTop />
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/* <Route path={["/Contact-us" , "/join-us" , "/Join-BIKE","/Latest"]} exact element={<ContactUs/>}/> */}
        </Routes>
        <Footer/>
        <CreditDiv/>
      </Router>
      
    </Box>
  );
}

export default App;
