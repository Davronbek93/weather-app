import React from 'react';
import { Route, Link as RouterLink} from "react-router-dom";

import Block from '../Components/Block';
import withRoot from '../withRoot';


import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


import data from '../Utils/RawData';
import token from "../secret/token";


const useStyles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  ling: {
    textDecoration: 'none'
  }
});


class Blocks extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    }
  }
  //1568732400
  componentDidMount(){
    /*setTimeout(()=>{
      this.setState({
        items: data,
        isLoaded: true,
      });
    }, 1000);*/

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Tashkent,uz&APPID=${token}`)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        let res = [];
        data.list.map((item)=>{
          const day_of_the_week = new Date(item.dt * 1000).getUTCDay();
          //console.log(day_of_the_week);
          const t = res.findIndex(({day})=> day === day_of_the_week);
          if(t > -1){
            res[t].details.push(item);
          } else {
            res.push({
              day: new Date(item.dt * 1000).getDay(),
              details: [item]
            });
          }
        });
        console.log(res);
        this.setState({
          isLoaded: true,
          items: res
        })
      })
      .catch(console.log);
  }

  render(){
    const classes = this.props.classes;
    const { isLoaded } = this.state;
    const { items } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={2} justify="center">
          {isLoaded? items.slice(0, 5).map((value, index) => (
            <Grid key={index} item>
              <Paper >
                <Link to={`/${index}`} component={RouterLink}>
                  {<Block data={value}/>}
                  {console.log(value)}
                </Link>
              </Paper>
            </Grid>
          )) : <div><CircularProgress className={classes.progress} /></div>}
        </Grid>
      </div>
    )
  }
}

export default withRoot(withStyles(useStyles)(Blocks));