import React, { useState, useEffect, useRef, useCallback } from "react";
import { collection, getDocs, orderBy, query, limit, startAfter } from "firebase/firestore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../../Utils/Firebase";
import ActivityModal from './../../Components/Modal/ActivityModal';
import SingleActivity from './../../Components/Activities/SignleActivity';
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const LatestActivities = ({setNonHomePath}) => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const observerTarget = useRef(null);

  const {activityID} = useParams()

  const ITEMS_PER_PAGE = 15;

  useEffect(()=>{
    if(activityID) {
      setSelectedActivity(activities.find((activity) => activity.id === activityID))
    }
  },[activityID, activities])

  useEffect(() => {
    setNonHomePath(true)
    const fetchActivities = async () => {
      const q = query(collection(db, "Activities"), orderBy("activityDate", "desc"), limit(ITEMS_PER_PAGE));
      const snapshot = await getDocs(q);
      const activityData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setActivities(activityData);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === ITEMS_PER_PAGE);
    };

    fetchActivities();
  }, [setNonHomePath]);

  const fetchMoreActivities = useCallback(async () => {
    if (loading || !hasMore || !lastDoc) return;
    
    setLoading(true);
    try {
      const q = query(
        collection(db, "Activities"),
        orderBy("activityDate", "desc"),
        startAfter(lastDoc),
        limit(ITEMS_PER_PAGE)
      );
      const snapshot = await getDocs(q);
      const activityData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      setActivities((prev) => [...prev, ...activityData]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching more activities:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastDoc]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMoreActivities();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchMoreActivities, hasMore, loading]);

  return (
    <Box sx={{ paddingTop: "110px", paddingX: "5%",paddingBottom:'50px', minHeight:'50vh' }}>
      <Helmet>
        <title>Latest Activities | BIKE Lab</title>
        <meta name="description" content="Latest BIKE Lab related activities from the University of Chittagong." />
      </Helmet>
      <Typography variant="h2" sx={{ color: "#0c2461" }} gutterBottom>
        Latest Activities
      </Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center">
        {activities.map((activity) => (
          <SingleActivity key={activity.id} activity={activity} onOpenModal={setSelectedActivity} />
        ))}
      </Stack>

      {/* Loading indicator */}
      <Box ref={observerTarget} sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        {loading && <CircularProgress />}
      </Box>

      {/* Activity Modal */}
      {selectedActivity && <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />}
    </Box>
  );
};

export default LatestActivities;
