import React from 'react'
import { Box, Button, Typography, Modal } from '@mui/material';

export default function PartnerModal({open, handleClose, partner}) {
  return (
    <Modal
    open={open}
    onClose={handleClose}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
    <Box sx={{
      bgcolor: 'white', p: 3, width: '85%',  height: '90vh', overflowY: 'auto', 
      borderRadius: 2, boxShadow: 3}}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        {partner.partnerTitle}
      </Typography>
      <Typography variant="body1" component="div" sx={{ mb: 2, height:'80%' }} dangerouslySetInnerHTML={{ __html: partner.longDescription }} />
      <Box className={"text-right"}>
          <Button onClick={handleClose} variant='contained'>Close</Button>
      </Box>
    </Box>
  </Modal>
  )
}
