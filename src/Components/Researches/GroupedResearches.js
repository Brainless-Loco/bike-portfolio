import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import GroupTitle from './GroupTitle';
import SingleResearchComponent from './SingleResearchComponent';

export default function GroupedResearches({ publicationType, items }) {
    const [visibleCount, setVisibleCount] = useState(3);
    
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };
    
    return (
        <Box key={publicationType} sx={{ my: 4 }}>
            <GroupTitle publicationType={publicationType} />
            {items.length === 0 ? (
                <Box textAlign="center" sx={{ my: 2 }}>No Publications found.</Box>
            ) : (
                <>
                    <Box className="d-flex flex-wrap justify-content-center" gap={1}>
                        {items.slice(0, visibleCount).map((research, index) => (
                            <SingleResearchComponent key={index} research={research} />
                        ))}
                    </Box>
                    {visibleCount < items.length && (
                        <Box textAlign="center" sx={{ mt: 2 }}>
                            <Button variant="outlined" sx={{borderWidth:2, fontWeight:600, color:'#0c2461', borderColor:'#0c2461'}} onClick={handleLoadMore}>
                                Load More
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}
