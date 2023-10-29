import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function ToolCard({ tool }) {
  return (
    <Card>
      <CardActionArea component={Link} to={tool.link}>
      <CardContent sx={{minHeight: (theme) => theme.spacing(25)}}>
          <Typography variant='h6' component='div' gutterBottom>
            {tool.name}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {tool.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ToolCard;