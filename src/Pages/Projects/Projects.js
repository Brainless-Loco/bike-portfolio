import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import ProjectModal from "../../Components/Modal/ProjectModal";
import SingleProject from "../../Components/Projects/SingleProject";
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
    <Box sx={{ paddingTop: "100px", paddingX: "5%" }}>
      <Typography variant="h4" sx={{ color: "blue" }} gutterBottom>
        Research Projects
      </Typography>

      <Box className="d-flex flex-wrap" gap={5}>
        {projects.map((project) => (
          <SingleProject key={project.title} project={project} setSelectedProject={(e)=>{setSelectedProject(e)}}/>
        ))}
      </Box>

      {/* Project Details Modal */}
        {open && <ProjectModal open={open} project={selectedProject} handleClose={() => {setOpen(false); setSelectedProject(null);}} />}
    </Box>
  );
};

export default Projects;
