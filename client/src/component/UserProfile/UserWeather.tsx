import { useEffect, useState } from 'react';
import { Box, Divider, Grid, Heading, Text } from '@chakra-ui/react';
import UserControls, { useGlobalState } from './UserControls';

const UserWeather = ({
  user,
  fetchUserData,
  apiError,
  weatherData,
  dailyForecastData,
  alertsData,
}) => {
  const [apiError, setApiError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);

  useEffect(() => {
    fetchUserData();
    if (
      user.city !== 'undefined' &&
      user.state !== 'undefined' &&
      user.city !== '' &&
      user.state !== ''
    ) {
      UserControls.fetchWeather(
        user.city,
        user.state,
        setWeatherData,
        setDailyForecastData,
        setAlertsData
      );
    }
  }, [user.city, user.state]);

  return (
    <Box id='g-box' className='u-weatherBox'>
      <Divider
        className='u-divider'
        // id=''
      />

      <Heading id='g-heading' className='u-heading'>
        My Weather
      </Heading>
      {apiError ? (
        <Text>No Weather Update Currently Available</Text>
      ) : (
        <>
          {weatherData && (
            <Box
              // id=''
              className='u-box-todaysWeather'
            >
              <Heading id='g-heading' className='u-heading'>
                Current Weather for {user.city}, {user.state}
              </Heading>
              <Text fontSize='lg' fontWeight='bold'>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <Text>
                Temperature: {(weatherData.temp * 9) / 5 + 32 ?? 'N/A'}°F
              </Text>
              <Text>Condition: {weatherData.conditions ?? 'N/A'}</Text>
              <Text>Wind Speed: {weatherData.windspeed ?? 'N/A'} mph</Text>
              <Text>Humidity: {weatherData.humidity ?? 'N/A'}%</Text>
              <Text>Feels Like: {weatherData.feelslike ?? 'N/A'}°F</Text>
              <Text>UV Index: {weatherData.uvindex ?? 'N/A'}</Text>
              <Text>Visibility: {weatherData.visibility ?? 'N/A'} km</Text>
            </Box>
          )}

          {dailyForecastData && dailyForecastData.length > 0 && (
            <Box p={5} mb={4}>
              <Heading id='g-heading' className='u-heading'>
                Daily Forecast
              </Heading>
              <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {dailyForecastData.slice(1, 7).map((day, index) => {
                  const date = new Date(day.datetime);
                  date.setDate(date.getDate() + 1);
                  const dayOfWeek = date.toLocaleDateString('en-US', {
                    weekday: 'long',
                  });

                  return (
                    <Box className='u-box-weeksWeather' key={index}>
                      <Text fontSize='lg' fontWeight='bold'>
                        {dayOfWeek} - {day.datetime}
                      </Text>
                      <Text>
                        High: {Math.floor((day.tempmax * 9) / 5 + 32) ?? 'N/A'}
                        °F
                      </Text>
                      <Text>
                        Low: {Math.floor((day.tempmin * 9) / 5 + 32) ?? 'N/A'}
                        °F
                      </Text>
                      <Text>Conditions: {day.conditions ?? 'N/A'}</Text>
                    </Box>
                  );
                })}
              </Grid>
            </Box>
          )}

          {alertsData && alertsData.length > 0 && (
            <Box
              p={5}
              shadow='md'
              borderWidth='1px'
              borderRadius='lg'
              mb={4}
              textAlign='center'
              maxWidth='85%' // Limit the width for alerts as well
              mx='auto' // Center the box
            >
              <Heading id='g-heading' className='u-heading'>
                Weather Alerts
              </Heading>
              {alertsData.map((alert, index) => (
                <Box key={index} mb={4}>
                  <Text fontWeight='bold'>Alert: {alert.event}</Text>
                  <Text>{alert.headline}</Text>
                  <Text whiteSpace='pre-wrap'>
                    {alert.description.replace(/(WHERE|WHEN|IMPACTS)/g, '\n$1')}
                  </Text>
                  <Text>Ends: {new Date(alert.ends).toLocaleString()}</Text>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default UserWeather;
