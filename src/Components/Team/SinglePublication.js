import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react'
import { Link } from 'react-router-dom'

export default function SinglePublication({publication, id}) {
    return (
        <Card key={publication.id} sx={{ width: "90%", }}>
            <CardContent>
                <Typography variant="subtitle1" fontWeight={600} component={Link} to={`/Publications/${publication.id}`} textDecoration="none" color="#0c2461" lineHeight={1} >
                    {publication.title}
                </Typography>
                <Typography my={0} py={0} variant="body2" sx={{ color: "gray" }}>
                    {new Date(publication.publicationDate?.seconds * 1000).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </Typography>

                <Typography variant="body2">
                    {publication.authors.map((author, index) => (
                        <React.Fragment key={author.id}>
                            <Link to={`/Team/${author.id}`} style={{ fontWeight: author.id === id ? 700 : "normal" }} >
                                {author.name}
                            </Link>
                            {index < publication.authors.length - 1 && ", "}
                        </React.Fragment>
                    ))}
                </Typography>
            </CardContent>
        </Card>
    )
}
