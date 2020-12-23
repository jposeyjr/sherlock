import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    width: 400,
    flex: 1,
  },
  submit: {
    padding: 10,
    marginTop: theme.spacing(2),
  },
}));
