import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';
// eslint-disable-next-line
import PartnerItem from '../../Components/Partners/PartnerItem';
import { Helmet } from 'react-helmet';

const Partners = ({setNonHomePath}) => {
  // eslint-disable-next-line
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
    <Box sx={{ paddingTop: '110px', paddingX: '5%' }}>
      <Helmet>
        <title>Partners | BIKE Lab</title>
      </Helmet>
      <Typography variant="h2" sx={{ color: '#0c2461' }} gutterBottom>
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
