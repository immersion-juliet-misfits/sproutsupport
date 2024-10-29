import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import UserControls from './UserControls';

const UserWeather = ({ fetchUserData, user, setUser }) => {
  const [editableCity, setEditableCity] = useState('');
  const [editableState, setEditableState] = useState('');
  const [apiError, setApiError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);

  useEffect(() => {
    fetchUserData();
    if (
      user.city !== null &&
      user.state !== null &&
      user.city !== 'undefined' &&
      user.state !== 'undefined'
    ) {
      UserControls.fetchWeather(
        user.city,
        user.state,
        setWeatherData,
        setDailyForecastData,
        setAlertsData,
        UserControls.handleLocationChange,
        setUser
      );
    }
    setEditableCity('');
    setEditableState('');
  }, [user.city, user.state]);

  return (
    <Box
      id='g-box'
      className='u-weatherBox'
    >
      <VStack className='u-box-weatherSet'>
        <p />
        <Heading
          id='g-heading'
          className='u-heading'
        >
          Currently Watching:{' '}
          {user.city &&
          user.state &&
          user.city !== 'undefined' &&
          user.state !== 'undefined'
            ? `${user.city}, ${user.state}`
            : 'No Location Watched'}
        </Heading>

        <HStack
          id='g-hstack'
          className='u-hs-input'
          spacing={1}
        >
          <Input
            id='g-input'
            className='u-input'
            name='city'
            value={editableCity}
            placeholder='Enter new City here'
            onChange={(e) => setEditableCity(e.target.value)}
          />

          <Input
            id='g-input'
            className='u-input'
            name='state'
            value={editableState}
            placeholder='Enter new State here'
            onChange={(e) => setEditableState(e.target.value)}
          />

          <Button
            id='g-button'
            className='u-check-button'
            onClick={() => {
              if (editableCity.trim() !== '' && editableState.trim() !== '') {
                UserControls.handleLocationChange(
                  editableCity,
                  editableState,
                  setUser
                );
              }
            }}
            isDisabled={!editableCity.trim() || !editableState.trim()}
          >
            <CheckIcon className='u-checkIcon' />
          </Button>
        </HStack>
      </VStack>

      <HStack>
        {apiError ? (
          <Text>No Weather Update Currently Available</Text>
        ) : (
          <>
            {weatherData && (
              <Box width='45%'>
                <Heading
                  id='g-heading'
                  className='u-heading5'
                >
                  Current Weather
                </Heading>

                <Box className='u-box-todaysWeather'>
                  <Text className='u-text'>
                    <Box
                      as='span'
                      fontWeight='bold'
                      fontSize='2xl'
                    >
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Box>
                  </Text>
                  <Text className='u-text'>
                    <Box
                      as='span'
                      fontWeight='bold'
                    >
                      Temperature:
                    </Box>
                    {(weatherData.temp * 9) / 5 + 32 ?? 'N/A'}°F
                  </Text>
                  <Text className='u-text'>
                    <Box
                      as='span'
                      fontWeight='bold'
                    >
                      Condition:
                    </Box>{' '}
                    {weatherData.conditions ?? 'N/A'}
                  </Text>
                  <Text className='u-text'>
                    <Box
                      as='span'
                      fontWeight='bold'
                    >
                      Wind Speed:
                    </Box>{' '}
                    {weatherData.windspeed ?? 'N/A'} mph
                  </Text>
                  <Text className='u-text'>
                    <Box
                      as='span'
                      fontWeight='bold'
                    >
                      Humidity:
                    </Box>{' '}
                    {weatherData.humidity ?? 'N/A'}%
                  </Text>
                  <Text className='u-text'>
                    <Box
                      as='span'
                      fontWeight='bold'
                    >
                      Feels Like:
                    </Box>{' '}
                    {weatherData.feelslike ?? 'N/A'}°F
                  </Text>
                  <Text className='u-text'>
                    <Box
                      as='span'
                      fontWeight='bold'
                    >
                      UV Index:
                    </Box>{' '}
                    {weatherData.uvindex ?? 'N/A'}
                  </Text>
                  <Text className='u-text'>
                    <Box
                      as='span'
                      fontWeight='bold'
                    >
                      Visibility:
                    </Box>{' '}
                    {weatherData.visibility ?? 'N/A'} km
                  </Text>
                </Box>
              </Box>
            )}

            {dailyForecastData && dailyForecastData.length > 0 && (
              <Box
                p={5}
                mb={4}
              >
                <Heading
                  id='g-heading'
                  className='u-heading5'
                >
                  Upcoming Forecast
                </Heading>
                <Grid
                  templateColumns='repeat(3, 1fr)'
                  gap={6}
                >
                  {dailyForecastData.slice(1, 7).map((day, index) => {
                    const date = new Date(day.datetime);
                    date.setDate(date.getDate() + 1);
                    const dayOfWeek = date.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    });

                    return (
                      <Box
                        className='u-box-weeksWeather'
                        key={index}
                      >
                        <Text className='u-text'>
                          <Box
                            as='span'
                            fontWeight='bold'
                            fontSize='2xl'
                          >
                            {' '}
                            {dayOfWeek}{' '}
                          </Box>
                        </Text>
                        <Text className='u-text'>
                          <Box
                            as='span'
                            fontWeight='bold'
                          >
                            High:
                          </Box>{' '}
                          {Math.floor((day.tempmax * 9) / 5 + 32) ?? 'N/A'}
                          °F
                        </Text>
                        <Text className='u-text'>
                          <Box
                            as='span'
                            fontWeight='bold'
                          >
                            Low:
                          </Box>{' '}
                          {Math.floor((day.tempmin * 9) / 5 + 32) ?? 'N/A'}
                          °F
                        </Text>
                        <Text className='u-text'>
                          <Box
                            as='span'
                            fontWeight='bold'
                          >
                            Conditions:
                          </Box>{' '}
                          {day.conditions ?? 'N/A'}
                        </Text>
                      </Box>
                    );
                  })}
                </Grid>
              </Box>
            )}
          </>
        )}
      </HStack>
      {alertsData && alertsData.length > 0 && (
        <Box className='u-box-weeksWeather'>
          <Heading
            id='g-heading'
            className='u-heading5'
          >
            Weather Alerts
          </Heading>
          {alertsData.map((alert, index) => (
            <Box
              key={index}
              mb={4}
            >
              <Text
                className='u-text'
                fontWeight='bold'
              >
                <Box
                  as='span'
                  fontWeight='bold'
                >
                  Alert:
                </Box>{' '}
                {alert.event}
              </Text>
              <Text className='u-text'>{alert.headline}</Text>
              <Text
                className='u-text'
                whiteSpace='pre-wrap'
              >
                {alert.description.replace(/(WHERE|WHEN|IMPACTS)/g, '\n$1')}
              </Text>
              <Text className='u-text'>
                <Box
                  as='span'
                  fontWeight='bold'
                >
                  Ends:
                </Box>{' '}
                {new Date(alert.ends).toLocaleString()}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserWeather;
