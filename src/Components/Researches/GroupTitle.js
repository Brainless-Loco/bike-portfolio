import Typography from '@mui/material/Typography';
import React from 'react'

export default function GroupTitle({publicationType}) {
    return (
        <Typography
            variant="h5"
            color="#0c2461"
            fontWeight={600}
            sx={{
                mb: 2, pb: 1, borderBottom: "2px solid #0c2461", display: "inline-block", width: '100%'
            }}
        >
            {publicationType}
        </Typography>
    )
}
