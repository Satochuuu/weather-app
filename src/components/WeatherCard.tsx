import WeatherIcon from "./WeatherIcon.tsx";
import type { WeatherData } from "../types/weather.ts";

type Props = {
  weather: WeatherData;
};

function WeatherCard({ weather }: Props) {
  return (
    <div className="mt-6 rounded-xl bg-sky-50 p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800">
        {weather.name}
      </h2>

      <div className="my-4">
        <WeatherIcon condition={weather.condition} />
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
  );
}

export default WeatherCard;