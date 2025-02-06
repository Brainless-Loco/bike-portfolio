import { useEffect } from "react";
// import { doc, getDoc, getFirestore } from "firebase/firestore";
import Box from '@mui/material/Box';
// import { app } from "../../Utils/Firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import rudraImage from '../../Images/rudranath.jpg'

const Director = ({ setNonHomePath }) => {
  // const [description, setDescription] = useState("");

  // const db = getFirestore(app)

  useEffect(() => {
    // const fetchDescription = async () => {
    //   const docRef = doc(db, "BasicInfo", "director-info");
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     setDescription(docSnap.data().description); // Set HTML content
    //   }
    // };
    setNonHomePath(true)
    // fetchDescription();
    // eslint-disable-next-line
  }, [setNonHomePath]);

  return (
    <Box paddingX={3} paddingY={15}>
      <Typography variant="h2" color="#0c2461" gutterBottom>
        Director of BIKE Lab
      </Typography>

      <Card className="bg-light text-dark p-3 rounded">
        <Box sx={{objectFit:'contain', height:'350px',textAlign:'center', overflow:'hidden'}}>
          <img
            alt="Dr. Rudra Pratap Deb Nath"
            src={rudraImage}
            style={{borderRadius:'10px',height:'100%' }}
          />
        </Box>
        <CardContent>
          <Typography variant="h3" fontWeight={600} className="mb-2" color="#0c2461">
            Dr. Rudra Pratap Deb Nath
          </Typography>
          <Typography fontWeight={600} className="fw-bold">Associate Professor, Department of Computer Science and Engineering, University of Chittagong</Typography>
          <Typography fontWeight={600} className="fw-bold">Director, BIKE: Big Data, Information, and Knowledge Engineering Lab</Typography>
          <Typography fontWeight={600}>PhD (AAU, Denmark) | PhD (UPC, Spain) | M.Engg. (TUT, Japan) | B.Sc (CU, Bangladesh)</Typography>
          <Typography fontWeight={600}>Fellowship: MEXT, Erasmus Mundus</Typography>
          <Typography fontWeight={600}>H-Index: 13</Typography>

          <Typography variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Contact Information</Typography>
          <Typography ml={2}><strong>Office:</strong> Room no. 308, IT Building, CSE, CU</Typography>
          <Typography ml={2}><strong>Email:</strong> rudra@cu.ac.bd</Typography>
          <Typography ml={2}><strong>Phone:</strong> +8801778155342</Typography>
          <Typography ml={2}>
            <strong>Know More:</strong> <Link href="https://sites.google.com/cu.ac.bd/rudranath" className="text-primary">Click here</Link>
          </Typography>

          <Typography variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Research Domains</Typography>
          <Typography ml={2}>
            Artificial Intelligence, Big Data, Linked Data, Business Intelligence, Semantic Web, Semantic Integration and ETL,
            Knowledge Graph Exploration, Data Science and Engineering, Affective Computing.
          </Typography>

          <Typography variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Biography</Typography>
          <List className="ps-3">
            <ListItem> • &nbsp; <b>2021 - Present:</b> &nbsp; Associate Professor, University of Chittagong</ListItem>
            <ListItem> • &nbsp; <b>2014 - 2021:</b> &nbsp; Assistant Professor, University of Chittagong</ListItem>
            <ListItem> • &nbsp; <b>2020 - 2021:</b> &nbsp; PostDoc, Aalborg University, Denmark</ListItem>
            <ListItem> • &nbsp; <b>2014 - 2020:</b> &nbsp; PhD Employee, Aalborg University, Denmark</ListItem>
            <ListItem> • &nbsp; <b>2018 - 2020:</b> &nbsp; Research Assistant, Aalborg University, Denmark</ListItem>
            <ListItem> • &nbsp; <b>2016 - 2017:</b> &nbsp; Visiting Researcher, UPC, Spain</ListItem>
            <ListItem> • &nbsp; <b>2013 - 2014:</b> &nbsp; Lecturer, University of Chittagong</ListItem>
            <ListItem> • &nbsp; <b>2010 - 2012:</b> &nbsp; Master of Engineering, Toyohashi University of Technology, Japan</ListItem>
          </List>

          <Typography  variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Publications</Typography>
          <Typography ml={2}>
            Dr. Nath has published in Q1/A* journals/conferences such as{" "}
            <em>Information Systems, TheWebConf (WWW), Semantic Web Journal, IJIM-Data Insights, IEEE Access, DOLAP</em>, and more.
          </Typography>

          <Typography  variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Personal Interests</Typography>
          <Typography ml={2}>
            Self Exploration and Realization, Singing, Instrument Playing, Dancing (Salsa, Bachata, Zouk, Kizomba, Cha cha cha), Karate, and Cooking.
          </Typography>

          <Typography  variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Open for Research Collaboration!</Typography>
          <Typography ml={2} variant="subtitle1" fontWeight={600}>Feel free to reach out.</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Director;
