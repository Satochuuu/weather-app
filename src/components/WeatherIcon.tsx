type WeatherIconProps = {
  condition: string;
};

function WeatherIcon({ condition }: WeatherIconProps) {
  switch (condition) {
    case "Clear":
      return <div className="text-6xl">☀️</div>;

    case "Clouds":
      return <div className="text-6xl">☁️</div>;

    case "Rain":
      return <div className="text-6xl">🌧️</div>;

    case "Drizzle":
      return <div className="text-6xl">🌦️</div>;

    case "Thunderstorm":
      return <div className="text-6xl">⛈️</div>;

    case "Snow":
      return <div className="text-6xl">❄️</div>;

    case "Mist":
    case "Fog":
    case "Haze":
      return <div className="text-6xl">🌫️</div>;

    default:
      return <div className="text-6xl">🌤️</div>;
  }
}

export default WeatherIcon;