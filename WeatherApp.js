import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin: 20px;
`;

const ForecastHeader = styled.h1`
  color: #333;
`;

const Subheading = styled.h2`
  font-weight: bold;
  text-transform: capitalize;
  margin-top: 10px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    if (city.trim() !== '') {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = async (cityName) => {
    try {
      const apiKey = '1ccf8c9df565ba27f0cba008d6c41d93';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      const fiveDayForecast = data.list
        .filter((item, index) => index % 8 === 0)
        .map((item) => ({
          date: new Date(item.dt_txt).toLocaleDateString(),
          highTemp: item.main.temp_max,
          lowTemp: item.main.temp_min,
          coordinates: `${data.city.coord.lat}, ${data.city.coord.lon}`,
          humidity: item.main.humidity,
          sunrise: new Date(data.city.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(data.city.sunset * 1000).toLocaleTimeString(),
          weatherType: item.weather[0].main.toLowerCase(),
        }));

      setWeatherData(fiveDayForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <body style={{ background: 'linear-gradient(to bottom, #87CEEB, #4682B4, #000080)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AppContainer>
        <ForecastHeader>Weather Forecast</ForecastHeader>
        <SearchBar onSearch={handleSearch} />
        {city && <Subheading>{city}</Subheading>}
        <CardsContainer>
          {weatherData.map((day, index) => (
            <WeatherCard key={index} day={day} />
          ))}
        </CardsContainer>
      </AppContainer>
    </body>
  );
};

export default WeatherApp;