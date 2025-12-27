import React from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

export default function PartnerModal({ open, handleClose, partner }) {

  const navigate = useNavigate();
  const onClose = () => {
    handleClose();
    navigate('/partners');
  }

  
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
      {/* Close Button - Fixed at top right corner of modal */}
      {/* <IconButton ... removed */}

      <Box sx={{
        bgcolor: 'white', p: 3, width: '85%', height: '90vh', overflowY: 'auto',
        borderRadius: 2, boxShadow: 3, position: 'relative'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          {partner.partnerTitle}
        </Typography>
        <Box className="ql-editor">
          <Typography variant="body1" component="div" sx={{ mb: 2, height: '80%' }} dangerouslySetInnerHTML={{ __html: partner.longDescription }} />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={onClose} variant='contained'>Close</Button>
        </Box>
      </Box>
    </Modal>
  )
}
