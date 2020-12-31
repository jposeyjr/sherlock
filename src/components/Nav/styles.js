import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: theme.spacing(1),
  },
  link: {
    '&:focus, &:hover, &:visited, &:link, &:active': {
      color: '#FFFFFF',
    },
  },
}));
