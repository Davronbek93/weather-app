import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Pages/Home';
import Day from './Pages/Day';

import Container from '@material-ui/core/Container';
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

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div>
        <Container className={classes.root}>
          <Route exact path="/" component={Home} />
          <FadingRoute path="/:id" component={Day}/>
        </Container>
      </div>
    </Router>
  );
}


const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={routeProps => (
      <Component {...routeProps}/>
  )}/>
);


export default App;
