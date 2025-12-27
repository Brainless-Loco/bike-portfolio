import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Home from './Pages/Home/Home';
import CreditDiv from './Components/CreditDiv/CreditDiv';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Teaching from './Pages/Teaching/Teaching';
import Partners from './Pages/Partners/Partners';
import LatestActivities from './Pages/LatestActivities/LatestActivities';
import TeamSection from './Pages/Team/TeamSection';
import Projects from './Pages/Projects/Projects';
import Director from './Pages/Director/Director';
import AuthorGraphVisualization from './Pages/AuthorGraph/AuthorGraphVisualization';
import Vacancies from './Pages/Vacancies/Vacancies';
import VacancyDetails from './Pages/Vacancies/VacancyDetails';
import ApplicationForm from './Pages/Apply/ApplicationForm';
import SubtopicDetails from './Pages/Projects/SubtopicDetails';
import Publications from './Pages/Publications/Publications';

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
        <div className={`scroll-up-btn ${scrolled && " scroll-up-btn-show"}`} onClick={scrollToTop}>
          <i className="fas fa-angle-up"></i>
        </div>
        <ScrollToTop />
        <Header isScrolled={scrolled} nonHomePath={nonHomePath} />
        <Routes>
          <Route path="/" element={<Home setNonHomePath={setNonHomePath} />} />
          <Route path="/home" element={<Home setNonHomePath={setNonHomePath} />} />

          <Route path="/publications" element={<Publications setNonHomePath={setNonHomePath} />} />
          <Route path="/publications/:publicationID" element={<Publications setNonHomePath={setNonHomePath} />} />

          <Route path="/teaching" element={<Teaching setNonHomePath={setNonHomePath} />} />
          <Route path="/partners" element={<Partners setNonHomePath={setNonHomePath} />} />
          <Route path="/latest" element={<LatestActivities setNonHomePath={setNonHomePath} />} />
          <Route path="/latest/:activityID" element={<LatestActivities setNonHomePath={setNonHomePath} />} />

          <Route path="/team" element={<TeamSection setNonHomePath={setNonHomePath} />} />
          <Route path="/team/:profileID" element={<TeamSection setNonHomePath={setNonHomePath} />} />

          <Route path="/projects" element={<Projects setNonHomePath={setNonHomePath} />} />
          <Route path="/projects/:topic_id" element={<Projects setNonHomePath={setNonHomePath} />} /> {/* Modal opens inside TopicsList */}
          <Route path="/projects/:topic_id/subtopics/:subtopic_id" element={<SubtopicDetails setNonHomePath={setNonHomePath} />} />
        


          <Route path="/vacancies" element={<Vacancies setNonHomePath={setNonHomePath} />} />
          <Route path="/vacancies/:id" element={<VacancyDetails setNonHomePath={setNonHomePath} />} />

          <Route path="/apply/:id" element={<ApplicationForm setNonHomePath={setNonHomePath} />} />

          <Route path="/director" element={<Director setNonHomePath={setNonHomePath} />} />
          <Route path="/authorgraph" element={<AuthorGraphVisualization setNonHomePath={setNonHomePath} />} />

          {/* <Route path={["/Contact-us" , "/join-us" , "/Join-BIKE","/Latest"]} exact element={<ContactUs/>}/> */}
        </Routes>
        <Footer />
        <CreditDiv />
      </Router>

    </Box>
  );
}

export default App;
