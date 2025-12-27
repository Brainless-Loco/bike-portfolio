import React, { useState, useEffect, useRef, useCallback } from "react";
import { collection, getDocs, orderBy, query, limit, startAfter } from "firebase/firestore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import { db } from "../../Utils/Firebase";
import ActivityModal from './../../Components/Modal/ActivityModal';
import SingleActivity from './../../Components/Activities/SignleActivity';
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const LatestActivities = ({setNonHomePath}) => {
  const [activities, setActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const observerTarget = useRef(null);

  const {activityID} = useParams()

  const ITEMS_PER_PAGE = 15;
  const TAGS_TO_SHOW = 10;

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
      setAllActivities(activityData);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === ITEMS_PER_PAGE);
      
      // Extract all unique tags
      const tagsSet = new Set();
      activityData.forEach((activity) => {
        activity.labels?.forEach((label) => tagsSet.add(label));
      });
      setAvailableTags(Array.from(tagsSet).sort());
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
      
      setAllActivities((prev) => [...prev, ...activityData]);
      filterAndSetActivities(selectedTags, [...activities, ...activityData]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching more activities:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastDoc, activities, selectedTags]);

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

  const filterAndSetActivities = (tags, activitiesToFilter) => {
    if (tags.length === 0) {
      setActivities(activitiesToFilter);
    } else {
      const filtered = activitiesToFilter.filter((activity) =>
        tags.some((tag) => activity.labels?.includes(tag))
      );
      setActivities(filtered);
    }
  };

  const handleTagToggle = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    filterAndSetActivities(newSelectedTags, allActivities);
  };

  return (
    <Box sx={{ paddingTop: "110px", paddingX: "5%",paddingBottom:'50px', minHeight:'50vh' }}>
      <Helmet>
        <title>Latest Activities | BIKE Lab</title>
        <meta name="description" content="Latest BIKE Lab related activities from the University of Chittagong." />
      </Helmet>
      <Typography variant="h2" sx={{ color: "#0c2461", mb: 3 }} gutterBottom>
        Latest Activities
      </Typography>

      {/* Tag Filter */}
      {availableTags.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: '600', color: '#0c2461' }}>
            Filter by Tags:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
            {availableTags.slice(0, tagsExpanded ? availableTags.length : TAGS_TO_SHOW).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagToggle(tag)}
                variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                color={selectedTags.includes(tag) ? "primary" : "default"}
                sx={{
                  backgroundColor: selectedTags.includes(tag) ? '#0c2461' : 'transparent',
                  color: selectedTags.includes(tag) ? '#fff' : '#0c2461',
                  borderColor: '#0c2461',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: selectedTags.includes(tag) ? '#0a1d47' : 'rgba(12, 36, 97, 0.1)',
                  }
                }}
              />
            ))}
          </Stack>
          
          {/* Show More / Show Less Button */}
          {availableTags.length > TAGS_TO_SHOW && (
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: '#0c2461',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'inline-block',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
              onClick={() => setTagsExpanded(!tagsExpanded)}
            >
              {tagsExpanded ? `Show less (${TAGS_TO_SHOW})` : `Show more (+${availableTags.length - TAGS_TO_SHOW})`}
            </Typography>
          )}
        </Box>
      )}

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
