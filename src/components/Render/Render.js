import React from 'react';
import { Grid, Container } from '@material-ui/core';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const Render = () => {
  const classes = useStyles();
  const imageData = useSelector((state) => state.image);
  return (
    <Container maxWidth='lg'>
      <Grid className={classes.renderArea}>
        <Grid item xs={12}>
          {imageData.length > 1 ? (
            imageData[0].map((image) => (
              <img src={image.source} alt={image.alt} className={classes.img} />
            ))
          ) : (
            <p>Awaiting Results...</p>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Render;
