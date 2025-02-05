import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';
import PartnerItem from '../../Components/Partners/PartnerItem';

const Partners = ({setNonHomePath}) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    setNonHomePath(true)
    const fetchPartners = async () => {
      const querySnapshot = await getDocs(collection(db, 'Partners'));
      const partnersData = [];
      
      querySnapshot.forEach((doc) => {
        partnersData.push(doc.data());
      });

      setPartners(partnersData);
    };

    fetchPartners();
  }, [setNonHomePath]);

  return (
    <Box sx={{ paddingTop: '100px', paddingX: '5%' }}>
      <Typography variant="h4" sx={{ color: 'blue' }} gutterBottom>
        Our Partners
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, minHeight:'250px' }}>
        {/* {partners.map((partner, index) => (
          <PartnerItem key={index} partner={partner} />
        ))} */}
        <Typography variant="h4">To be updated soon...</Typography>
      </Box>
    </Box>
  );
};

export default Partners;
