import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
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
    const q = query(collection(db, "Activities"), orderBy("activityDate", "desc"), limit(10)); // Get activities sorted by date
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
    <Box className="activities-container">
      <Typography variant="h4" sx={{ color: '#102772', fontWeight: 'bold' }} className="text-center py-2">Latest Activities</Typography>
      <Box className="py-1 activities-content" sx={{ height: '100%' }}>
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
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                padding: "0",
              }}
              contentArrowStyle={{ borderRight: "20px solid #fff" }}>
              <Link to={"/latest/" + activity.id} className="activity-card-link">
                <div className="activity-card-content">
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3, color: "#0c2461" }}>
                    {activity.title}
                  </Typography>
                  <Stack direction="row" flexWrap={'wrap'} spacing={1} gap={1} display={'flex'} sx={{ mt: 1.5 }}>
                    {activity.labels?.map((label, index) => (
                      <Chip key={index} label={label} color="primary" size="small" />
                    ))}
                  </Stack>
                </div>
              </Link>
              {/* <Typography variant="body2" sx={{ color: "gray" }}>
                {activity.shortDescription}
              </Typography> */}
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
