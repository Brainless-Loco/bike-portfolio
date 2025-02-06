import { useState, useEffect } from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import ProjectModal from "../../Components/Modal/ProjectModal";
import SingleProject from "../../Components/Projects/SingleProject";
import { Helmet } from "react-helmet";
const Projects = ({setNonHomePath}) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "Projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    };

    setNonHomePath(true)
    fetchProjects();
  }, [setNonHomePath]);


  useEffect(()=>{
    if(selectedProject){
      setOpen(true)
    }else{
      setOpen(false)
    }
  },[selectedProject])

  return (
    <Box sx={{ paddingY: "100px", minHeight:'50vh', paddingX: "5%" }}>
      <Helmet>
        <title>Projects | BIKE Lab</title>
      </Helmet>
      <Typography variant="h4" sx={{ color: "blue" }} gutterBottom>
        Research Projects
      </Typography>

      <Box className="d-flex flex-wrap" gap={5}>
        {/* {projects.map((project) => (
          <SingleProject key={project.title} project={project} setSelectedProject={(e)=>{setSelectedProject(e)}}/>
        ))} */}
        <Typography variant="h4">To be Updated...</Typography>
      </Box>

      {/* Project Details Modal */}
        {open && <ProjectModal open={open} project={selectedProject} handleClose={() => {setOpen(false); setSelectedProject(null);}} />}
    </Box>
  );
};

export default Projects;
