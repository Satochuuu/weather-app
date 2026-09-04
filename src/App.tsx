import { useState } from "react";
import SearchForm from "./components/SearchForm";

function App() {
  const [city, setCity] = useState("");

  const [weather, setWeather] = useState<{
      name: string;
      condition: string;
      description: string;
      temp: number;
      humidity: number;
      windSpeed: number;
    } | null>(null);

  const [error, setError] = useState("");
  
  const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "Clear":
      return "☀️";

    case "Clouds":
      return "☁️";

    case "Rain":
      return "🌧️";

    case "Drizzle":
      return "🌦️";

    case "Thunderstorm":
      return "⛈️";

    case "Snow":
      return "❄️";

    case "Mist":
    case "Fog":
    case "Haze":
      return "🌫️";

    default:
      return "🌤️";
  }
};  

  const [loading, setLoading] = useState(false);
  
  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`
      );

      const data = await response.json();
      if (!response.ok) {
        setWeather(null);
        setError("都市名が見つかりませんでした");
        return;
      }

      console.log(data);

      setWeather({
        name: data.name,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch {
      setWeather(null);
      setError("通信に失敗しました");
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
    setError("このブラウザでは位置情報が利用できません");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ja`
        );

        const data = await response.json();

        if (!response.ok) {
          setWeather(null);
          setError("現在地の天気を取得できませんでした");
          return;
        }

        setWeather({
          name: data.name,
          condition: data.weather[0].main,
          description: data.weather[0].description,
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      } catch {
        setWeather(null);
        setError("通信に失敗しました");
      } finally {
        setLoading(false);
      }
    },
    () => {
      setLoading(false);
      setWeather(null);
      setError("位置情報の取得が許可されませんでした");
    }
  );
};

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-sky-600 text-center mb-8">
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
          <p className="mt-4 text-center text-red-600 font-semibold">
            {error}
          </p>
        )}

        {weather && (
          <div className="mt-6 rounded-xl bg-sky-50 p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {weather.name}
            </h2>

            <div className="my-4 text-6xl">
              {getWeatherIcon(weather.condition)}
            </div>

            <p className="text-xl text-gray-600">
              {weather.description}
            </p>

            <p className="my-4 text-5xl font-bold text-sky-600">
              {weather.temp}℃
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-4">
                <p className="text-sm text-gray-500">湿度</p>
                <p className="text-xl font-bold">
                  {weather.humidity}%
                </p>
              </div>

              <div className="rounded-lg bg-white p-4">
                <p className="text-sm text-gray-500">風速</p>
                <p className="text-xl font-bold">
                  {weather.windSpeed} m/s
                </p>
              </div>
    </div>
  </div>
        )}
      </div>
    </div>
  );
}

export default App;