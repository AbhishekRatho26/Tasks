import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiHumidity, WiStrongWind, WiSunrise, WiSunset, WiThermometer } from 'react-icons/wi';
import { FaSearch } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, IconButton, Switch } from '@mui/material';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const API_KEY: string = "YOUR WEATHER API";

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number; humidity: number; pressure: number; feels_like: number };
  wind: { speed: number };
  sys: { sunrise: number; sunset: number };
}

interface ForecastData {
  dt: number;
  weather: { description: string }[];
  main: { temp: number; humidity: number; pressure: number };
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${(props: any) => props.theme.bg};
    color: ${(props: any) => props.theme.text};
  }
`;

const lightTheme = {
  bg: '#f4f4f4',
  card: '#ffffff',
  text: '#000000',
  inputBg: '#ffffff',
  inputText: '#000000',
  borderColor: '#ccc'
};

const darkTheme = {
  bg: '#141e30',
  card: '#1c1c1c',
  text: '#ffffff',
  inputBg: '#2c3e50',
  inputText: '#ffffff',
  borderColor: '#555'
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ForecastTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  color: inherit;
  th, td {
    border: 1px solid currentColor;
    padding: 10px;
    text-align: center;
  }
`;

const GraphButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [city, setCity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [graphType, setGraphType] = useState<'temperature' | 'humidity' | 'pressure'>('temperature');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      const forecastResponse = await axios.get<{ list: ForecastData[] }>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=7&appid=${API_KEY}`);
      setWeather(response.data);
      setForecast(forecastResponse.data.list);
    } catch {
      setError('Failed to fetch weather data');
    }
    setLoading(false);
  };

  const searchCityWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<{ coord: { lat: number; lon: number } }>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      fetchWeather(response.data.coord.lat, response.data.coord.lon);
    } catch {
      setError('City not found');
      setWeather(null);
      setForecast([]);
    }
    setLoading(false);
  };

  const generateChartData = () => {
    let label: string = '';
    let data: number[] = [];
    switch (graphType) {
      case 'temperature':
        label = 'Temperature (°C)';
        data = forecast.map(day => day.main.temp);
        break;
      case 'humidity':
        label = 'Humidity (%)';
        data = forecast.map(day => day.main.humidity);
        break;
      case 'pressure':
        label = 'Pressure (hPa)';
        data = forecast.map(day => day.main.pressure);
        break;
    }
    return {
      labels: forecast.map((_, index) => `Day ${index + 1}`),
      datasets: [{ label, data, borderColor: 'rgb(99, 255, 146)', backgroundColor: 'rgba(99, 255, 146, 0.2)', fill: true, tension: 0.4 }],
    };
  };
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: darkMode ? 'white' : 'black'
        }
      },
      title: {
        display: true,
        text: 'Weather Forecast',
        color: darkMode ? 'white' : 'black'
      }
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? 'white' : 'black'
        }
      },
      y: {
        ticks: {
          color: darkMode ? 'white' : 'black'
        }
      }
    }
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <Typography variant="h3">Weather App</Typography>
        <Switch checked={darkMode} onChange={() => setDarkMode(prev => !prev)} />
        <SearchBox>
          <TextField
            variant="outlined"
            label="Enter City"
            value={city}
            onChange={e => setCity(e.target.value)}
            InputLabelProps={{ style: { color: darkMode ? '#fff' : '#000' } }}
            InputProps={{
              style: {
                backgroundColor: darkMode ? '#2c3e50' : '#fff',
                color: darkMode ? '#fff' : '#000',
              },
            }}
            sx={{ borderRadius: 1 }}
          />
          <IconButton
            onClick={searchCityWeather}
            sx={{
              bgcolor: darkMode ? '#fff' : '#ddd',
              color: '#000',
              borderRadius: 1,
              '&:hover': {
                bgcolor: '#ccc',
              },
            }}
          >
            <FaSearch color="#000" />
          </IconButton>
        </SearchBox>
        {error && <Typography color="error">{error}</Typography>}
        {loading && <CircularProgress />}
        {weather && (
          <Card sx={{ bgcolor: darkMode ? '#1c1c1c' : '#fff', color: darkMode ? 'white' : 'black', padding: 3, width: '100%', maxWidth: 500 }}>
            <CardContent>
              <Typography variant="h4">{weather.name}</Typography>
              <Typography>{weather.weather[0].description}</Typography>
              <Typography><WiThermometer /> Temperature: {weather.main.temp}°C (Feels like {weather.main.feels_like}°C)</Typography>
              <Typography><WiHumidity /> Humidity: {weather.main.humidity}%</Typography>
              <Typography><WiStrongWind /> Pressure: {weather.main.pressure} hPa</Typography>
              <Typography><WiSunrise /> Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</Typography>
              <Typography><WiSunset /> Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Typography>
              <ForecastTable>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Description</th>
                    <th>Temp (°C)</th>
                  </tr>
                </thead>
                <tbody>
                  {forecast.map((day, index) => (
                    <tr key={index}>
                      <td>Day {index + 1}</td>
                      <td>{day.weather[0].description}</td>
                      <td>{day.main.temp}°C</td>
                    </tr>
                  ))}
                </tbody>
              </ForecastTable>
              <GraphButtons>
                <Button onClick={() => setGraphType('temperature')} variant="contained">Temperature</Button>
                <Button onClick={() => setGraphType('humidity')} variant="contained">Humidity</Button>
                <Button onClick={() => setGraphType('pressure')} variant="contained">Pressure</Button>
              </GraphButtons>
              <Line data={generateChartData()} options={chartOptions} />
            </CardContent>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
