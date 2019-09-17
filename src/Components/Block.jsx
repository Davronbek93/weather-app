import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 200,
    backgroundColor: '#2061A2',
    color: 'white'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Block(props) {
  const days = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  //const {id, date, temp, weather, desc} = props.data;
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
  const classes = useStyles();
  console.log(props);
  props.data.details.map(item =>{
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
  console.log(data);
  const { date, temp, weather, desc } = data;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {days[new Date(date).getDay()]}
        </Typography>
        <Typography className={classes.title} gutterBottom>
          {desc}
        </Typography>
        <CardMedia
          className={classes.media}
          image={'/static/images/'+weather+'.png'}
        />
        <Typography variant="h6" component="p">
            {temp.day}°
        </Typography>
        <Typography variant="body1" component="p">
          {temp.night ? temp.night + "°" : "-"}
        </Typography>
      </CardContent>
    </Card>
  );
}