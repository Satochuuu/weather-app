type ForecastItem = {
  date: string;
  condition: string;
  temp: number;
};

type ForecastListProps = {
  forecast: ForecastItem[];
  getWeatherIcon: (condition: string) => string;
};

function ForecastList({
  forecast,
  getWeatherIcon,
}: ForecastListProps) {
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

                  <span className="text-2xl">
                    {getWeatherIcon(item.condition)}
                  </span>

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