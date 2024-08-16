import { Progress, Heading, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PlantWarnings = ({ user }) => {
  const [alerts, setAlerts] = useState([]);
  const [currWeather, setWeather] = useState({})

  const decideWarning = (alert) => {
    // make sure your sprouts are nice and cozy
    console.log(alert, 'alert in func')
    if (alert.toLowerCase().includes('freeze') || alert.toLowerCase().includes('chill')) { // too cold
      return 'Make sure your sprouts are cozy during this cold time.'
    } else if (alert.toLowerCase().includes('heat')) { // too hot
      return 'Your sprouts may be more thirsty than usual today. Give \'em some shade if needed.'
    } else if (alert.toLowerCase().includes('flood')) {
      return 'Make sure your outdoor sprouts don\'t float away.'
    }
  }

  const getWarnings = () => {
    if (user.longitude !== 147.3534 && user.latitude !== 64.7552) {
        console.log('beiung used TOKEN')
        axios.post(`/plants/warnings/${user.id}`)
        .then(({data}) => {
            console.log('lots of data', data, data.currentConditions.conditions);
            setAlerts(data.alerts)
            // setWeather(data.currentConditions)
        });
    }
  };

  useEffect(() => {
    getWarnings();
  }, []);

  return (
    <div>
      <Heading size="lg">{`Warnings`}</Heading>
      {user.longitude === 147.3534 && user.latitude === 64.7552 && <h1>No location found. Please visit settings to allow for location access.</h1>}
      {/* {currWeather && <h2>{currWeather.conditions}</h2>} */}
      {alerts.length > 0 && alerts.map((alert, i) => {
        return (
          <div>
          <Heading key={`${alert}-${i}`} size="s">{alert.event}</Heading>
          <h1>{decideWarning(alert.event)}</h1>
          </div>
        )
      })}
    </div>
  );
};

export default PlantWarnings;
