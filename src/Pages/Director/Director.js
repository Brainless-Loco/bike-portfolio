import { useEffect } from "react";
// import { doc, getDoc, getFirestore } from "firebase/firestore";
import Box from '@mui/material/Box';
// import { app } from "../../Utils/Firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import rudraImage from '../../Images/rudranath.jpg'
import { Helmet } from "react-helmet";
import './Director.css'
import AuthorPublications from "../../Components/Team/AuthorPublications";

const Director = ({ setNonHomePath }) => {
  // const [description, setDescription] = useState("");

  // const db = getFirestore(app)

  useEffect(() => {
    setNonHomePath(true)
    // fetchDescription();
    // eslint-disable-next-line
  }, [setNonHomePath]);

  return (
    <Box paddingX={3} paddingY={13}>
      <Helmet>
        <title>Director | BIKE Lab</title>
        <meta name="description" content="Dr. Rudra Pratap Deb Nath, Director of BIKE Lab at CSE CU is a distinguished asscoiate professor in the field of computer science and engineering. He is known for his contributions in the fields of big data, information, and knowledge engineering." />
      </Helmet>
      <Typography variant="h2" color="#0c2461" gutterBottom>
        Director of BIKE Lab
      </Typography>

      <Card className="bg-light text-dark p-3 rounded">

        <CardContent>
          <Box alignItems={'center'} className="d-flex flex-wrap-reverse flex-md-wrap justify-content-between">
            <Box className="col-12 col-md-7">
              <Typography variant="h3" fontWeight={600} className="mb-2" color="#0c2461">
                Dr. Rudra Pratap Deb Nath
              </Typography>
              <Typography fontWeight={600} className="fw-bold">Professor, Department of Computer Science and Engineering, University of Chittagong</Typography>
              <Typography fontWeight={600} className="fw-bold">Director, BIKE: Big Data, Information, and Knowledge Engineering Lab</Typography>
              <Typography fontWeight={600}>PhD (AAU, Denmark) | PhD (UPC, Spain) | M.Engg. (TUT, Japan) | B.Sc (CU, Bangladesh)</Typography>
              <Typography fontWeight={600}>Fellowship: MEXT, Erasmus Mundus</Typography>
              <Typography fontWeight={600}>H-Index: <a href={"https://scholar.google.com/citations?user=TkQGAWoAAAAJ&hl=en&oi=ao"}>13</a></Typography>
              <Box display={"flex"} gap={2} flexWrap={'wrap'} className="pt-2">
                <a className="py-2 px-3 rounded border border-primary" href={`https://scholar.google.com/citations?user=TkQGAWoAAAAJ&hl=en&oi=ao`}>Google Scholar</a>
                <a className="py-2 px-3 rounded border border-primary" href={`https://sites.google.com/cu.ac.bd/rudranath/home?authuser=0`}>Google Site</a>
                <a className="py-2 px-3 rounded border border-primary" href={`mailto::rudra@cu.ac.bd`}>Email</a>

              </Box>

            </Box>
            <Box className="col-12 col-md-4">
              <Box sx={{ objectFit: 'contain', height: '300px', textAlign: 'center', overflow: 'hidden' }}>
                <img
                  alt="Dr. Rudra Pratap Deb Nath"
                  src={rudraImage}
                  style={{ borderRadius: '10px', height: '100%' }}
                />
              </Box>
            </Box>
          </Box>



          <Typography variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Contact Information</Typography>
          <Typography ml={2}><strong>Office:</strong> Room no. 308, IT Building, CSE, CU</Typography>
          <Typography ml={2}><strong>Email:</strong> rudra@cu.ac.bd</Typography>
          <Typography ml={2}><strong>Phone:</strong> +8801778155342</Typography>
          <Typography ml={2}>
            <strong>Know More:</strong> <Link href="https://sites.google.com/cu.ac.bd/rudranath" className="text-primary">Click here</Link>
          </Typography>

          <Typography variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Short Bio</Typography>
          <Typography ml={2} fontSize={20} lineHeight={1.8} textAlign={"justify"}>
            Dr. Rudra Pratap Deb Nath is working as a Professor in the <a className="shortBioLinks textUnderLine" href="https://cu.ac.bd/cse/">Department of Computer Science and Engineering</a> at <a className="shortBioLinks textUnderLine" href="https://cu.ac.bd/">University of Chittagong</a>, Chattogram Bangladesh and the director of <span className="shortBioLinks" style={{ color: "#0c2461", textDecoration: "none" }} >BIKE: Big Data, Information, and Knowledge Engineering Lab</span>.<br /><br />

            He earned his Ph.D. titles from <a href="https://www.cs.aau.dk/" className="shortBioLinks textUnderLine">Aalborg University, Denmark</a> and <a href="https://www.essi.upc.edu/dtim/" className="shortBioLinks textUnderLine"> Universitat Politècnica de Catalunya (UPC), Spain</a> with the prestigious <span className="colorTomato fontBold">Erasmus Mundus Scholarship</span> under the consortium of <a className="shortBioLinks textUnderLine" href="https://it4bi-dc.ulb.ac.be/">IT4BI-DC: Information Technology for Business Intelligence Doctoral College</a>. His Ph.D. thesis title is <a className="shortBioLinks textUnderLine" href="https://vbn.aau.dk/en/publications/aspects-of-semantic-etl">"Aspects of Semantic ETL"</a>, where they proposed and developed an ontology-based semantic ETL tool that integrates semantic and non-semantic data into a semantic data warehouse and enables OLAP queries on it. He did his Master of Engineering in Toyohashi University of Technology Japan with the prestigious <span className="colorTomato fontBold">MEXT scholarship</span>. <br /> <br />

            <span className="colorBase1 fontBold textUnderLine">Nature:</span> As a person, he is disciplined, professional, honest, humble, and friendly.<br /> <br />

            <span className="colorBase1 fontBold textUnderLine">Hobby and Interest:</span> Self Exploration and Realization, Singing, Instrument Playing, Dancing (Mostly Latin American styles: Salsa, Bachata, Zouk, Kizomba, Cha cha cha, and contemporary), Karate, and Cooking.
          </Typography>

          <Typography variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Research Domain</Typography>
          <Typography ml={2} fontSize={20} lineHeight={1.8} textAlign={"justify"}>
            Dr. Nath's research covers Artificial Intelligence, Big Data, Linked Data, Business Intelligence, Semantic Web, Semantic Integration and ETL, Knowledge Graph Exploration, Data Science and Engineering, and Affective Computing.<br /><br />

            He has several publications in Q1/A* journal/conferences like Information Systems, TheWebConf (previously known as WWW), Semantic Web Journal, IJIM-Data Insights, IEEE Access, DOLAP (co-located with CIKM), etc.</Typography>


          <Typography variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Publications</Typography>
          <AuthorPublications id="WxR2AUEaLR7ahERkLifC" />
          <Typography variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Short Biography</Typography>
          <Typography ml={2} fontSize={20} lineHeight={1.8} textAlign={"justify"}>
            <ul style={{ listStyle: 'square' }}>
              <li>
                <span className="fontBold colorBase1">2026- till date:</span>Professor in Computer Science and Engineering Department, University of Chittagong, Bangladesh
              </li>
              <li>
                <span className="fontBold colorBase1">2021- 2026:</span> Associate Professor in Computer Science and Engineering Department, University of Chittagong, Bangladesh
              </li>
              <li>
                <span className="fontBold colorBase1">2014-2021:</span> Assistant Professor in Computer Science and Engineering Department, University of Chittagong, Bangladesh (most of the time was on study leave)
              </li>
              <li>
                <span className="fontBold colorBase1">2020-2021:</span> PostDoc in Department of Planning, Aalborg University, Denmark
              </li>
              <li>
                <span className="fontBold colorBase1">2014-2020:</span> PhD Employee in Computer Science Department at Aalborg University, Denmark
                (<span className="colorTomato fontBold">Erasmus Mundus Scholarship</span>)
              </li>
              <li>
                <span className="fontBold colorBase1">2018-2020:</span> Research Assistant in Department of Computer Science, Aalborg University, Denmark
              </li>
              <li>
                <span className="fontBold colorBase1">2016-2017:</span> Visiting Researcher in Department of Service and Information System Engineering, Universitat Politècnica de Catalunya (UPC), Spain
              </li>
              <li>
                <span className="fontBold colorBase1">2013-2014:</span> Lecturer in Computer Science and Engineering Department, University of Chittagong, Bangladesh
              </li>
              <li>
                <span className="fontBold colorBase1">2010-2012:</span> Master of Engineering in Computer Science and Engineering Department, Toyohashi University of Technology, Japan
                (<span className="colorTomato fontBold">MEXT Scholarship</span>)
              </li>
              <li>
                <span className="fontBold colorBase1">2010-2010:</span> Lecturer in Computer Science (BBA section), Cantonment Public College, Bangladesh
              </li>
              <li>
                <span className="fontBold colorBase1">2004-2009:</span> B.Sc. in Computer Science and Engineering, University of Chittagong, Bangladesh
              </li>
            </ul>
          </Typography>


          {/* <Typography variant="h6" color="white" px={2} py={1} bgcolor={"#0c2461"} className="mt-3 mb-1 rounded">Publications</Typography>
          <Typography ml={2}>
            Dr. Nath has published in Q1/A* journals/conferences such as{" "}
            <em>Information Systems, TheWebConf (WWW), Semantic Web Journal, IJIM-Data Insights, IEEE Access, DOLAP</em>, and more.
          </Typography> */}

        </CardContent>
      </Card>
    </Box>
  );
};

export default Director;
