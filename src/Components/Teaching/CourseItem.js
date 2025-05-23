import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CourseItem = ({ course }) => {
  return (
    <Box sx={{ p: 2, bgcolor: '#fff', boxShadow: 3,  borderRadius: 2, width: "90%", mx:'auto' }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {course.courseTitle}
      </Typography>
      <Typography variant="body2">{course.shortDescription}</Typography>

      {/* External Links */}
      {course.externalLinks && course.externalLinks.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {course.externalLinks.map((link, idx) => (
            <Button
              key={idx}
              variant="contained"
              color="primary"
              size="small"
              sx={{ mt: 1, mr: 1 }}
              href={link.url}
              target="_blank"
            >
              {link.title}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CourseItem;
