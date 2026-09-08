type WeatherIconProps = {
  condition: string;
  className?: string;
};

function WeatherIcon({ condition, className = "" }: WeatherIconProps) {
  const getIcon = () => {
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

  return <span className={className}>{getIcon()}</span>;
}

export default WeatherIcon;