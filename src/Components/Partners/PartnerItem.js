import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import PartnerModal from '../Modal/PartnerModal';

const PartnerItem = ({ partner }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 3,  width: '45%', marginBottom: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {partner.partnerTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
            {new Date(partner.startDateOfPartnership).toLocaleString('en-US', { month: 'short', year: 'numeric' })} 
            {' to '}
            {partner.endDateOfPartnership ? 
                new Date(partner.endDateOfPartnership).toLocaleString('en-US', { month: 'short', year: 'numeric' }) 
                : 'Present'}
            </Typography>

        {/* <Typography variant="body2" sx={{ mb: 2 }}>
          {partner.longDescription.substring(0, 100)}...
        </Typography> */}
        <Button variant="contained" onClick={handleOpen}>Read More</Button>
      </Box>
      

      {/* Modal for long description */}
      <PartnerModal open={open} handleClose={handleClose} partner={partner}/>
    </>
  );
};

export default PartnerItem;
