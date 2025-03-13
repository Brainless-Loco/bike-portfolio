import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const TermsOfUse = () => {
  return (
    <Box className="border p-3 my-3 bg-white rounded shadow">
      <Typography variant="h6" style={{ color: "#0c2461" }}>
        Terms of Use – BIKE Lab
      </Typography>
      <Divider sx={{ marginY: "10px" }} />
      <Typography variant="body2" textAlign={"justify"}>
        BIKE Lab is committed to protecting your personal data in accordance
        with applicable data protection laws. Any personal information collected
        and stored in our database will be handled confidentially and used
        solely for research and recruitment purposes within BIKE Lab.
      </Typography>
      <Typography variant="body2" textAlign={"justify"} className="mt-2">
        By submitting your information, you consent to its processing in
        compliance with relevant data protection regulations. Your data will not
        be shared with third parties without your explicit consent, except as
        required by law.
      </Typography>
      <Typography variant="body2" textAlign={"justify"} className="mt-2">
        For inquiries regarding data protection and privacy, please contact BIKE
        Lab's administration.
      </Typography>
    </Box>
  );
};

export default TermsOfUse;
