export type WeatherData = {
  name: string;
  condition: string;
  description: string;
  temp: number;
  humidity: number;
  windSpeed: number;
};

export type ForecastItem = {
  date: string;
  condition: string;
  temp: number;
};

export type ForecastApiItem = {
  dt_txt: string;
  weather: {
    main: string;
  }[];
  main: {
    temp: number;
  };
};