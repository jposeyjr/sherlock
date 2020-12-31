import { Link } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import useStyles from './styles';

const Nav = () => {
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <div className={classes.navbar}>
        <Link to='/' className={classes.link}>
          <h2>Home</h2>
        </Link>
        <Link to='/results' className={classes.link}>
          <h2>Results</h2>
        </Link>
      </div>
    </AppBar>
  );
};

export default Nav;
