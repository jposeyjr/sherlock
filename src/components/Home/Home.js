import React, { useState } from 'react';
import {
  TextField,
  IconButton,
  Container,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
const Home = () => {
  const [inputURL, setInputURL] = useState('');
  const [state, setState] = useState({
    checkedLink: false,
    checkedImage: false,
  });
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.checkedLink) {
      dispatch({ type: 'GET_LINKS' });
    }
    console.log('working', inputURL);
    setInputURL('');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Typography align='center' component='h1' variant='h5'>
        Sherlock Search
      </Typography>
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            name='url'
            autoComplete='off'
            id='url'
            autoFocus
            margin='normal'
            variant='outlined'
            required
            label='url'
            value={inputURL}
            onChange={(e) => setInputURL(e.target.value)}
            helperText='Please enter a sites URL'
          />
          <IconButton
            className={classes.submit}
            aria-label='submit'
            type='submit'
          >
            <SearchIcon />
          </IconButton>
          <FormGroup row>
            <Grid container>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedImage}
                      onChange={handleChange}
                      name='checkedImage'
                    />
                  }
                  label='Alt image search'
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='checkLink'
                      checked={state.checked}
                      onChange={handleChange}
                    />
                  }
                  label='Find all links'
                />
              </Grid>
            </Grid>
          </FormGroup>
        </form>
      </div>
    </Container>
  );
};

export default Home;
