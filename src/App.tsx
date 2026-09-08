import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ForecastList from "./components/ForecastList";
import WeatherCard from "./components/WeatherCard";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
} from "./services/weatherApi";

type WeatherData = {
  name: string;
  condition: string;
  description: string;
  temp: number;
  humidity: number;
  windSpeed: number;
};

type ForecastItem = {
  date: string;
  condition: string;
  temp: number;
};

type ForecastApiItem = {
  dt_txt: string;
  weather: {
    main: string;
  }[];
  main: {
    temp: number;
  };
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const createDailyForecast = (
    forecastList: ForecastApiItem[]
  ): ForecastItem[] => {
    return forecastList
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 5)
      .map((item) => ({
        date: new Date(item.dt_txt).toLocaleDateString("ja-JP", {
          weekday: "short",
        }),
        condition: item.weather[0].main,
        temp: Math.round(item.main.temp),
      }));
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setWeather(null);
      setForecast([]);
      setError("都市名を入力してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const weatherData = await fetchWeatherByCity(city);

      setWeather({
        name: weatherData.name,
        condition: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        temp: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
      });

      const forecastData = await fetchForecastByCity(city);
      setForecast(createDailyForecast(forecastData.list));
    } catch {
      setWeather(null);
      setForecast([]);
      setError("天気情報を取得できませんでした");
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocationSearch = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setLoading(false);
      setWeather(null);
      setForecast([]);
      setError("このブラウザでは位置情報が利用できません");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const weatherData = await fetchWeatherByCoords(
            latitude,
            longitude
          );

          setWeather({
            name: weatherData.name,
            condition: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            temp: Math.round(weatherData.main.temp),
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
          });

          const forecastData = await fetchForecastByCoords(
            latitude,
            longitude
          );

          setForecast(createDailyForecast(forecastData.list));
        } catch {
          setWeather(null);
          setForecast([]);
          setError("現在地の天気情報を取得できませんでした");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setWeather(null);
        setForecast([]);
        setError("位置情報の取得が許可されませんでした");
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-4xl font-bold text-sky-600">
          ☀️ Weather App
        </h1>

        <SearchForm
          city={city}
          onCityChange={setCity}
          onSearch={handleSearch}
          onCurrentLocationSearch={handleCurrentLocationSearch}
          loading={loading}
        />

        {error && (
          <p className="mt-4 text-center font-semibold text-red-600">
            {error}
          </p>
        )}

        {weather && <WeatherCard weather={weather} />}

        <ForecastList forecast={forecast} />

      </div>
    </div>
  );
}

export default App;