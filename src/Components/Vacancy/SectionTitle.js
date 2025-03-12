import React from 'react'
import Typography from '@mui/material/Typography';

export default function SectionTitle({ title }) {
    return (
        <Typography variant="h5" fontWeight="bold" className="my-2 pb-2" color="#0c2461" style={{ borderColor: "#0c2461", borderBottom:'2px solid' }}>
            {title}
        </Typography>
    )
}
