import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CourseItem from "./CourseItem";

const CoursesSection = ({ courses }) => {
  return (
    <Box>
      {Object.keys(courses).map((year) => (
        <Box key={year} sx={{ mb: 3 }}>
          <Typography variant="h5"
            sx={{
              mb: 2,
              pb: 1,
              borderBottom: "2px solid #1976d2",
              display: "inline-block",
              width:'100%'
            }}>
            {year}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, width:'100%' }}>
            {courses[year].map((course, index) => (
              <CourseItem key={index} course={course} />
            ))}
            {courses[year].map((course, index) => (
              <CourseItem key={index} course={course} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CoursesSection;
