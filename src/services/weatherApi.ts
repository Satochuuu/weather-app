type WeatherApiResponse = {
  name: string;
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
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

type ForecastApiResponse = {
  list: ForecastApiItem[];
};

export const fetchWeatherByCity = async (city: string) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("都市名が見つかりませんでした");
  }

  return data as WeatherApiResponse;
};

export const fetchWeatherByCoords = async (
  latitude: number,
  longitude: number
) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ja`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("現在地の天気を取得できませんでした");
  }

  return data as WeatherApiResponse;
};

export const fetchForecastByCity = async (city: string) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ja`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("5日間予報を取得できませんでした");
  }

  return data as ForecastApiResponse;
};

export const fetchForecastByCoords = async (
  latitude: number,
  longitude: number
) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ja`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("5日間予報を取得できませんでした");
  }

  return data as ForecastApiResponse;
};