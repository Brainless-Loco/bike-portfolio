import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Typography, Chip, Stack, Box } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { db } from "../../../Utils/Firebase";

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
    <Box>
      <Typography variant="h5" className="text-center py-5">Latest Activities</Typography>
        <VerticalTimeline>
        {activities.map((activity, index) => (
            <VerticalTimelineElement
            key={activity.id}
            date={activity.activityDate?.toDate().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            icon={<CalendarMonthIcon />}
            position={index % 2 === 0 ? "right" : "left"} // Alternate positions
            contentStyle={{
                background: "#fff",
                color: "#000",
                boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
                borderRadius: "10px",
            }}
            contentArrowStyle={{ borderRight: "7px solid #2196F3" }}
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
  );
};

export default ActivitiesTimeline;
