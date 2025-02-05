import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Typography, Chip, Stack, Box } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { db } from "../../../Utils/Firebase";
import { Link } from "react-router-dom";
import './ActivitiesTimeline.css'

const ActivitiesTimeline = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Activities"), orderBy("activityDate", "desc")); // Get activities sorted by date
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedActivities = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(fetchedActivities);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <Box sx={{ backgroundColor: 'transparent', height: '100%' }}>
      <Typography variant="h4" sx={{ color: '#102772', fontWeight: 'bold' }} className="text-center py-2">Latest Activities</Typography>
      <Box className="pt-2 pb-2" sx={{ height: '100%' }}>
        <VerticalTimeline>
          {activities.map((activity, index) => (
            <VerticalTimelineElement
              key={activity.id}
              date={activity.activityDate?.toDate().toLocaleDateString("en-US", { day: 'numeric', month: "short", year: "numeric" })}
              icon={<CalendarMonthIcon sx={{ color: '#102772' }} />}
              position={index % 2 === 0 ? "right" : "left"} // Alternate positions
              iconStyle={{ backgroundColor: 'white', }}
              contentStyle={{
                background: "#fff",
                color: "#102772",
                boxShadow: "3px 3px 10px rgba(0,0,0,0.5)",
                borderRadius: "10px",
              }}
              contentArrowStyle={{ borderRight: "20px solid #102772" }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {activity.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 2 }}>
                {activity.labels?.map((label, index) => (
                  <Chip key={index} label={label} color="primary" />
                ))}
              </Stack>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {activity.shortDescription}
              </Typography>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </Box>
      <Box className="text-center py-5" >
        <Link to="/Latest" className="see-more-button">See More</Link>
      </Box>
    </Box>
  );
};

export default ActivitiesTimeline;
