import React from 'react';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Blocks from '../Containers/Blocks';
import {makeStyles} from "@material-ui/core/styles/index";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={1} >
        <Grid item xs={12}>
          <Paper className={classes.header}><h2>Weather forecast</h2></Paper>
        </Grid>
      </Grid>
      <Blocks/>
    </div>
  );
}