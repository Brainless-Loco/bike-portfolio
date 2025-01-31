import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import CoursesSection from "../../Components/Teaching/CoursesSection";

const Teaching = ({setNonHomePath}) => {
  const [activeTab, setActiveTab] = useState("statement"); // "statement" or "courses"
  const [teachingStatement, setTeachingStatement] = useState("");
  const [courses, setCourses] = useState({});

  useEffect(() => {
    setNonHomePath(true)
    // Fetch Teaching Statement
    const fetchTeachingStatement = async () => {
      const docRef = doc(db, "BasicInfo", "TeachingStatement");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTeachingStatement(docSnap.data().statement || "");
      }
    };

    // Fetch Courses & Group by YearTitle
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "TeachingCourses"));
      const groupedCourses = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const year = data.yearTitle || "Unknown Year";
        
        if (!groupedCourses[year]) {
          groupedCourses[year] = [];
        }
        groupedCourses[year].push(data);
      });

      setCourses(groupedCourses);
    };

    fetchTeachingStatement();
    fetchCourses();
    
    // eslint-disable
  }, [setNonHomePath]);

  return (
    <Box sx={{ paddingTop: "100px", paddingX: "5%" }}>
      <Typography variant="h3" sx={{ color: "blue" }} gutterBottom>
        Teaching
      </Typography>

      {/* Tabs */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, justifyContent:'center' }}>
        <Button
          onClick={() => setActiveTab("statement")}
          sx={{
            color: activeTab === "statement" ? "blue" : "black",
            fontWeight: "bold",
            fontSize: "20px",
            borderBottom: activeTab === "statement" ? "3px solid blue" : "none",
            borderRadius: 0,
            pb: 1,
          }}
        >
          Teaching Statement
        </Button>
        <Button
          onClick={() => setActiveTab("courses")}
          sx={{
            color: activeTab === "courses" ? "blue" : "black",
            fontWeight: "bold",
            fontSize: "20px",
            borderBottom: activeTab === "courses" ? "3px solid blue" : "none",
            borderRadius: 0,
            pb: 1,
          }}
        >
          Courses & Others
        </Button>
      </Box>

      {/* Content */}
      {activeTab === "statement" ? (
        <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2, my:5 }}>
          <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: teachingStatement }} />
        </Box>
      ) : (
        <CoursesSection courses={courses} /> // Using the CoursesSection component here
      )}
    </Box>
  );
};

export default Teaching;
