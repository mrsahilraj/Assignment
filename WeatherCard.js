import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud } from '@fortawesome/free-solid-svg-icons';

const CardContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  margin: 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const DateContainer = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const LineSeparator = styled.hr`
  border: 0.5px solid #333;
  margin: 10px 0;
`;

const WeatherTypeIcon = styled.span`
  font-size: 30px;
  margin-top: 10px;
`;

const WeatherCard = ({ day }) => {
  const {
    date,
    highTemp,
    lowTemp,
    coordinates,
    humidity,
    sunrise,
    sunset,
    weatherType,
  } = day;

  // Function to get the appropriate Font Awesome icon and color based on weather type
  const getWeatherIcon = () => {
    switch (weatherType) {
      case 'clear':
        return { icon: faSun, color: 'darkgoldenrod' };
      case 'clouds':
        return { icon: faCloud, color: 'lightskyblue' };
      default:
        return { icon: null, color: 'black' }; // No icon for other weather types
    }
  };

  const { icon: weatherIcon, color: iconColor } = getWeatherIcon();

  return (
    <CardContainer>
      <DateContainer>{date}</DateContainer>
      <LineSeparator />
      <p>High: {highTemp}°C</p>
      <p>Low: {lowTemp}°C</p>
      <p>Coordinates: {coordinates}</p>
      <p>Humidity: {humidity}%</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
      <p>
        Weather Type: {weatherType}
        <WeatherTypeIcon>
          {weatherIcon && (
            <FontAwesomeIcon icon={weatherIcon} style={{ color: iconColor }} />
          )}
        </WeatherTypeIcon>
      </p>
    </CardContainer>
  );
};

export default WeatherCard;