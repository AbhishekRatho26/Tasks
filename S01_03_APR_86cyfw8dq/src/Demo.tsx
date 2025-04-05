import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { WiHumidity, WiStrongWind, WiSunrise, WiSunset, WiThermometer } from 'react-icons/wi';
import { FaSearch } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const API_KEY: string | undefined = "6c8c502a91f06ecbdc04a0c2bcfd1aaf";

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  sys: { sunrise: number; sunset: number };
}

interface ForecastData {
  dt: number;
  weather: { description: string }[];
  main: { temp: number };
}

const Demo: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [city, setCity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  };

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastResponse = await axios.get<{ list: ForecastData[] }>(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=7&appid=${API_KEY}`
      );
      setWeather(response.data);
      setForecast(forecastResponse.data.list);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  };

  const searchCityWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ coord: { lat: number; lon: number } }>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      fetchWeather(response.data.coord.lat, response.data.coord.lon);
    } catch (error) {
      console.error('City not found!');
    }
    setLoading(false);
  };

  const forecastChartData = {
    labels: forecast.map(day => new Date(day.dt * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecast.map(day => day.main.temp),
        borderColor: 'rgb(237, 255, 99)',
        backgroundColor: 'rgba(99, 255, 146, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={searchCityWeather}><FaSearch /></button>
      </div>

      {loading ? <p>Loading...</p> : null}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p><WiThermometer /> Temperature: {weather.main.temp}°C</p>
          <p><WiHumidity /> Humidity: {weather.main.humidity}%</p>
          <p><WiStrongWind /> Wind Speed: {weather.wind.speed} m/s</p>
          <p><WiSunrise /> Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p><WiSunset /> Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}

      <h3>7-Day Forecast</h3>
      <table className="forecast-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Temperature (°C)</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((day, index) => (
            <tr key={index}>
              <td>{new Date(day.dt * 1000).toLocaleDateString()}</td>
              <td>{day.weather[0].description}</td>
              <td>{day.main.temp}°C</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Temperature Trend</h3>
      <Line data={forecastChartData} options={chartOptions}/>
    </div>
  );
};

export default Demo;
