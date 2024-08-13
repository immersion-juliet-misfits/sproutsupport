import { Progress, Heading, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PlantWarnings = ({ user }) => {
  const [alerts, setAlerts] = useState([]);
  const [currWeather, setWeather] = useState({})
  const getWarnings = () => {
    axios.post(`/plants/warnings/2`)
      .then(({data}) => {
       console.log('lots of data', data, data.currentConditions.conditions);
       setAlerts(data.alerts)
       setWeather(data.currentConditions)
    });
  };

  useEffect(() => {
    getWarnings();
  }, []);

  return (
    <div>
      <Heading>{`Warnings`}</Heading>
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
