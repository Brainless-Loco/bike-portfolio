import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Box, Typography, Stack } from "@mui/material";
import { db } from "../../Utils/Firebase";
import ActivityModal from './../../Components/Modal/ActivityModal';
import SingleActivity from './../../Components/Activities/SignleActivity';

const LatestActivities = ({setNonHomePath}) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    setNonHomePath(true)
    const fetchActivities = async () => {
      const q = query(collection(db, "Activities"), orderBy("activityDate", "desc"));
      const snapshot = await getDocs(q);
      const activityData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setActivities(activityData);
    };

    fetchActivities();
  }, [setNonHomePath]);

  return (
    <Box sx={{ paddingTop: "100px", paddingX: "5%",paddingBottom:'50px', minHeight:'50vh' }}>
      <Typography variant="h3" sx={{ color: "blue" }} gutterBottom>
        Latest Activities
      </Typography>
      <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="space-between">
        {activities.map((activity) => (
          <SingleActivity key={activity.id} activity={activity} onOpenModal={setSelectedActivity} />
        ))}
      </Stack>

      {/* Activity Modal */}
      {selectedActivity && <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />}
    </Box>
  );
};

export default LatestActivities;
