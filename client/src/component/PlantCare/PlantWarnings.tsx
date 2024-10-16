import { Progress, Heading, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PlantWarnings = ({ user }) => {
  const [alerts, setAlerts] = useState([]);
  const [currWeather, setWeather] = useState({})

  const decideWarning = (alert) => {
    // make sure your sprouts are nice and cozy
    if (alert.toLowerCase().includes('freeze') || alert.toLowerCase().includes('chill')) { // too cold
      return 'Make sure your sprouts are cozy during this cold time.'
    } else if (alert.toLowerCase().includes('heat')) { // too hot
      return 'Your sprouts may be more thirsty than usual today. Give \'em some shade if needed.'
    } else if (alert.toLowerCase().includes('flood')) {
      return 'Make sure your outdoor sprouts don\'t float away.'
    } else {
      return 0;
    }
  }

  const getWarnings = () => {
        // axios.post(`/plants/warnings/${user.id}`)
        // .then(({data}) => {
        //   console.log(data)
        //     setAlerts(data.alerts)
        //     // setWeather(data.currentConditions)
        // })
        // .catch(() => {
        //   console.error('Issue getting weather warnings. Check if location is set in Settings.')
        // });
  };

  useEffect(() => {
    getWarnings();
  }, []);

  return (
    <div>
      <Heading size="lg">{`Warnings`}</Heading>
      {!user.city || !user.state && <h1>No location found. Please visit settings to allow for location access.</h1>}
      {/* {currWeather && <h2>{currWeather.conditions}</h2>} */}
      {!alerts.length && <Heading size={"md"}>No warnings today.</Heading>}
      {alerts.length > 0 && alerts.map((alert, i) => {
        if (decideWarning(alert.event)) {
          return (
            <div key={`${alert}-${i}`}>
            <Heading size="sm">{alert.event}</Heading>
            <h1>{decideWarning(alert.event)}</h1>
            </div>
          )
        }
      })}
    </div>
  );
};

export default PlantWarnings;
