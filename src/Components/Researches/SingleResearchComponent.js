import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleResearchComponent({ research }) {
    return (
        <Card key={research.id} sx={{ bgcolor: '#fff',  borderRadius: 2, boxShadow: 3, width: '90%' }}>
            <CardContent>
                <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} flexWrap={'wrap'}>
                    <Link to={"/Publications/" + research.id}>
                        <Typography variant="subtitle1" lineHeight={1.1} color="#0c2461" fontWeight={600}>{research.title} </Typography>
                    </Link>  &nbsp; | &nbsp; 
                    <a href={research.publisher.externalLink} target='__blank'>
                        <Typography variant="subtitle1" lineHeight={1.1} color="#0d86d1" fontWeight={600}> {research.publisher.title}
                        </Typography>
                    </a>
                </Box>

                <Typography variant="subtitle2" color="textSecondary">
                    {new Date(research.publicationDate?.seconds * 1000).toDateString()}
                </Typography>

                <Typography variant="body2">
                    {research.authors.map((author, index) => (
                        <span key={index}>
                            {author.id ? (
                                <Link to={'/Team/' + author.id}>
                                    {author.name}
                                </Link>
                            ) : (
                                author.name
                            )}
                            {index < research.authors.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </Typography>
                {/* <Typography variant="body2">{
                    research.otherInfo.length>300? research.otherInfo.substring(0,300)+"...":research.otherInfo
                    }</Typography> */}
                {/* <Link to={"/Publications/" + research.id} >
                    <Typography color="#0c2461" fontWeight={700}>Details</Typography>

                </Link> */}
            </CardContent>
        </Card>
    )
}
