import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
// import ProjectModal from "../../Components/Modal/ProjectModal";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
const Projects = ({ setNonHomePath }) => {
  // eslint-disable-next-line
  const [projects, setProjects] = useState([]);
  // eslint-disable-next-line
  const [selectedProject, setSelectedProject] = useState(null);
  // eslint-disable-next-line
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "Projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData.sort((a, b)=>a.topic.localeCompare(b.topic)));
    };

    setNonHomePath(true)
    fetchProjects();
  }, [setNonHomePath]);


  // useEffect(() => {
  //   if (selectedProject) {
  //     setOpen(true)
  //   } else {
  //     setOpen(false)
  //   }
  // }, [selectedProject])

  return (
    <Box sx={{ paddingY: "100px", minHeight: '50vh', paddingX: "5%" }}>
      <Helmet>
        <title>Projects | BIKE Lab</title>
        <meta name="description" content="Research projects from the BIKE Lab." />
      </Helmet>
      <Typography variant="h2" sx={{ color: "#0c2461" }} gutterBottom>
        Research Projects
      </Typography>
      <Typography variant="subtitle2" className="mb-5 text-justify">
        At BIKE Lab, we are actively engaged in a variety of research projects spanning multiple domains. Our work is organized into distinct topics, each contributing to advancements in its respective field. Below, you will find an overview of our ongoing research projects, categorized by topic. Each topic includes specific subtopics, along with the team members who are actively involved in these initiatives. Through collaboration and innovation, our researchers are dedicated to pushing the boundaries of knowledge and developing impactful solutions.
      </Typography>

      {/* <Box className="d-flex flex-wrap" gap={5}> */}
        {/* {projects.map((project) => (
          <SingleProject key={project.title} project={project} setSelectedProject={(e)=>{setSelectedProject(e)}}/>
        ))} */}
        {/* <Typography variant="h4">To be Updated...</Typography> */}
      {/* </Box> */}

      {projects.map((project) => (
        <Box key={project.id} className="mb-5">
          {/* Project Topic */}
          <Typography variant="h5" color="#0c2461" sx={{ borderBottom: "3px solid #0c2461", pb: 1, mb: 2 }}>
            {project.topic}
          </Typography>

          {/* Project Description */}
          <Typography variant="body1" className="mb-3">
            {project.description}
          </Typography>

          {/* Subtopics List */}
          <ul style={{ listStyle: 'square' }}>
            {project.topics.map((subtopic, index) => (
              <li key={index} className="mb-1">
                <span style={{ fontWeight: "bold" }}>{subtopic.name}</span>{" "}
                (<span>
                  {subtopic.associatedMembers.map((member, i) => (
                    <React.Fragment key={member.id}>
                      <Link to={`/Team/${member.id}`} className="text-decoration-none">
                        {member.name}
                      </Link>
                      {i < subtopic.associatedMembers.length - 1 ? ", " : ""}
                    </React.Fragment>
                  ))}
                </span>)
              </li>
            ))}
          </ul>
        </Box>
      ))}

      {/* Project Details Modal */}
      {/* {open && <ProjectModal open={open} project={selectedProject} handleClose={() => {setOpen(false); setSelectedProject(null);}} />} */}
    </Box>
  );
};

export default Projects;
