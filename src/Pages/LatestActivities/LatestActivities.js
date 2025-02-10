import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { db } from "../../Utils/Firebase";
import ActivityModal from './../../Components/Modal/ActivityModal';
import SingleActivity from './../../Components/Activities/SignleActivity';
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const LatestActivities = ({setNonHomePath}) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const {activityID} = useParams()

  useEffect(()=>{
    if(activityID) {
      setSelectedActivity(activities.find((activity) => activity.id === activityID))
    }
  },[activityID, activities])

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
      <Helmet>
        <title>Latest Activities | BIKE Lab</title>
        <meta name="description" content="Latest BIKE Lab related activities from the University of Chittagong." />
      </Helmet>
      <Typography variant="h3" sx={{ color: "blue" }} gutterBottom>
        Latest Activities
      </Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center">
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
