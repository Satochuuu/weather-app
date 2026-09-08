import WeatherIcon from "./WeatherIcon";
import type { ForecastItem } from "../types/weather";

type ForecastListProps = {
  forecast: ForecastItem[];
};

function ForecastList({ forecast }: ForecastListProps) {
  if (forecast.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl bg-white p-4">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        5日間予報
      </h2>

      <div className="space-y-3">
        {forecast.map((item) => (
          <div
            key={item.date}
            className="flex items-center justify-between rounded-lg bg-sky-50 p-3"
          >
            <span className="font-semibold text-gray-700">
              {item.date}
            </span>

            <WeatherIcon
              condition={item.condition}
              className="text-2xl"
            />

            <span className="font-bold text-sky-600">
              {item.temp}℃
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;