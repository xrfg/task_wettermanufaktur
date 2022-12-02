import React from "react";
import HourlyListItem from "./HourlyListItem";

export interface WeatherData {
  stationId: string;
  timezone: string;
  timeseries: timeSeries;
}

export interface timeSeries {
  timeItems: Array<timeItems>;
}

export interface timeItems {
  dtg: string;
  weatherparameters: [temperature, windDirection, windSpeed, precipitation];
}

export interface temperature {
  "Temperature [C]": number;
}

export interface windDirection {
  "Wind direction [deg]": number;
}

export interface windSpeed {
  "Wind speed [m/s]": number;
}
export interface precipitation {
  "1h precipitation [mm]": number;
}

const headerClass = "text-sm font-medium text-center px-5 py-3 leading-tight";

export default function HourlyList({
  weatherData,
  station,
}: {
  weatherData: WeatherData;
  station: string;
}) {
  console.log(weatherData);

  return (
    <div className="border rounded-lg w-full overflow-auto shadow-sm">
      <table>
        <caption className="sr-only">
          Hourly Weather Data table - {station}
        </caption>
        <thead className="border-b">
          <tr>
            <th id="date" scope="col" className={headerClass}>
              Date
            </th>
            <th id="time" scope="col" className={headerClass}>
              Time
            </th>
            <th id="temperature" scope="col" className={headerClass}>
              Temperature
            </th>
            <th id="wind-direction" scope="col" className={headerClass}>
              Wind Direction
            </th>
            <th id="wind-speed" scope="col" className={headerClass}>
              Wind Speed
            </th>
            <th id="precipitation" scope="col" className={headerClass}>
              Precipitation
            </th>
          </tr>
        </thead>
        <tbody>
          {weatherData?.timeseries?.timeItems?.map(
            (timeItem: timeItems, i: number) => {
              return (
                <HourlyListItem
                  key={timeItem?.dtg}
                  timeItem={timeItem}
                  index={i}
                />
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
