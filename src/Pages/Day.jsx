import React from 'react'
import Graph from '../Components/Graph';
import data from '../Utils/RawData';
import withRoot from '../withRoot';
import token from '../secret/token';

import CircularProgress from '@material-ui/core/CircularProgress';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles/';


const styles = theme => ({
  root: {
    flexGrow: 1,
    minWidth: 1100,
  },
  header: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    backgroundColor: '#2061A2',
    color: 'white',
  },
  title: {
    fontSize: 14,
  },
  media: {
    height: 100,
    width: 100,
    paddingTop: '5%',
    paddingLeft: '5%'
  },
  data: {
    paddingTop: 30,
    paddingLeft: 60,
    backgroundColor: '#2061A2',
    color: 'white',
  },
  graph: {
    marginLeft: 20,
    marginTop: 5
  }
});

class Days extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      items: [],
      data: {
        date: null,
        temp: {
          day: "",
          night: "",
        },
        weather: null,
        desc: null
      },
      isLoaded: false
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    const data = {
      date: null,
      temp: {
        day: "",
        night: "",
      },
      weather: null,
      desc: null
    };
    const max = {
      date: null,
      temp: {
        day: -273,
        night: "",
      },
      weather: null,
      desc: null
    };

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Tashkent,uz&APPID=${token}`)
      .then(res => {
        //console.log(res);
        return res.json();
      })
      .then((res) => {
        let temporary = [], items = [];
        res.list.map((item)=>{
          const day_of_the_week = new Date(item.dt * 1000).getUTCDay();
          //console.log(day_of_the_week);
          const t = temporary.findIndex(({day})=> day === day_of_the_week);
          if(t > -1){
            temporary[t].details.push(item);
          } else {
            temporary.push({
              day: new Date(item.dt * 1000).getDay(),
              details: [item]
            });
          }
        });
        temporary[id].details.map(item =>{
          items.push({
            date: new Date(item.dt * 1000),
            value: (item.main.temp - 273).toFixed(0)
          });
          if(new Date(item.dt * 1000).getUTCHours() === 12){
            data.date = item.dt * 1000;
            data.temp.day = (item.main.temp - 273).toFixed(0);
            data.weather = item.weather[0].main;
            data.desc = item.weather[0].description;
          } else if(new Date(item.dt* 1000).getUTCHours() === 0){
            data.temp.night = (item.main.temp - 273).toFixed(0);
          }
          if(max.temp.day < (item.main.temp - 273).toFixed(0)){
            max.date = item.dt * 1000;
            max.temp.day = (item.main.temp - 273).toFixed(0);
            max.weather = item.weather[0].main;
            max.desc = item.weather[0].description;
          }
        });
        if(!data.temp.day){
          data.date = max.date;
          data.temp.day = max.temp.day;
          data.temp.night = max.temp.night;
          data.weather = max.weather;
          data.desc = max.desc;
        }
        console.log(items);
        this.setState({
          isLoaded: true,
          data,
          items
        });
      })
      .catch(console.log);
  }
  render(){
    const days = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const { isLoaded, items } = this.state;

    //const {desc, temp, weather} = data[id];
    //console.log(data);
    //const { date, temp, weather, desc } = data;
    const { date, temp, weather, desc } = this.state.data;

    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={8}>
            <Paper className={classes.header}><h2>Weather forecast for {days[new Date(date).getDay()]}</h2></Paper>
          </Grid>
          { isLoaded ?
            <Grid item xs={8} >
              <Paper className={classes.data}>
                <Grid container direction="row" justify="flex-start">
                  <Grid item xs={2}>
                    <Typography className={classes.title} gutterBottom>
                      {desc}
                    </Typography>
                    <CardMedia
                      className={classes.media}
                      image={'/static/images/'+weather+'.png'}
                    />
                    <Typography variant="h6" component="p">
                      Day: {temp.day}°
                    </Typography>
                    <Typography variant="body1" component="p">
                      Night: {temp.night ? temp.night + "°" : "-"}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.graph}>
                    <Graph data={items} width={580} height={258} margin={{top: 20, left:40, right:40, bottom:50}}/>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            :
            <Grid item xs={8} >
              <CircularProgress />
            </Grid>
          }
        </Grid>
      </div>
    )
  }
}


export default withRoot(withStyles(styles)(Days));
