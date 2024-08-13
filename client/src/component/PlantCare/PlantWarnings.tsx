import { Progress, Heading, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PlantWarnings = ({ user }) => {
  const [alerts, setAlerts] = useState([]);
  const [currWeather, setWeather] = useState({})
  const getWarnings = () => {
    if (user.longitude !== 147.3534 && user.latitude !== 64.7552) {
        console.log('beiung used TOKEN')
        axios.post(`/plants/warnings/${user.id}`)
        .then(({data}) => {
            console.log('lots of data', data, data.currentConditions.conditions);
            setAlerts(data.alerts)
            setWeather(data.currentConditions)
        });
    }
  };

  useEffect(() => {
    getWarnings();
  }, []);

  return (
    <div>
      <Heading>{`Warnings`}</Heading>
      {user.longitude === 147.3534 && user.latitude === 64.7552 && <h1>No location found. Please visit settings to allow for location access.</h1>}
      {currWeather && <h2>{currWeather.conditions}</h2>}
      {alerts.length > 0 && alerts.map((alert, i) => {
        return (
          <h1 key={`${alert}-${i}`}>{alert.event}</h1>
        )
      })}
    </div>
  );
};

export default PlantWarnings;
