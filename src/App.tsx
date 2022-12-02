import axios from "axios";
import React, { useState } from "react";
import HourlyList from "./components/HourlyList";
import "./main.css";

//!fix token fetching
const acessToken: string =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5USXlNREkxUkRRNVJUUkNOakJFUXpJek5EWXlOVGcxUmtORk9FVkdOVVJGUlVSRk5rWTRNZyJ9.eyJodHRwczovL3Nob3BtYW4ubWV0b3BzLm5ldC9yb2xlcyI6eyJiZmYiOlsicmVhZCJdfSwiaHR0cHM6Ly9zaG9wbWFuLm1ldG9wcy5uZXQvY3VzdG9tZXJJZCI6IjEiLCJodHRwczovL3Nob3BtYW4ubWV0b3BzLm5ldC9wcm9kdWN0SWQiOiJiZXdlcmJlckB3ZXR0ZXJtYW51ZmFrdHVyLmRlIiwiaXNzIjoiaHR0cHM6Ly93ZWF0aGVyc29sdXRpb25zLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzczNjE1NzU4ZGY5ZjRjY2Y5NWI5YjYiLCJhdWQiOlsiaHR0cHM6Ly9zaG9wbWFuLm1ldG9wcy5uZXQiLCJodHRwczovL3dlYXRoZXJzb2x1dGlvbnMuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3MDAwNzc3OCwiZXhwIjoxNjcwMDk0MTc4LCJhenAiOiI4QUNZVHdFWlhLcFpFRmFiTjg4eDNuNUg2NjFiMDh3QyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgYWRkcmVzcyBwaG9uZSByZWFkOnBhcmFtZXRlciByZWFkOnJvbGVzIiwiZ3R5IjoicGFzc3dvcmQifQ.Kr7XsYM6GzhdOWALVhnoEZAR1WBVO-q_kEcoMy6i6WD2xIrFCIL4ebfqajO1mFwX8SM8B4hkmGWzXyJnoAf-LOpwu-BYvKjcqI631TLiDuVm0577W1e6HHQILJB720fB8GlitUS5zgctRW3pUC7Xo_B1_gbYggi-FXehbVLILYc1EmsJl5cWrvxuWfM8kF5a-I_xBtBTM7eLUPTtJdtIjTzS_SEenehw89dS3x-UoG9mOeIu2_kupVRhGcIC-fBZFVNtuoy2_xEg4BL4o-mfn4kCuOKYh7185OZ3muKYVpu6WQ-_nPpJ64mMNIy4kTaB7HfL9lq0Q1SvFcRdzANB-A";

interface Station {
  label: string;
  value: string;
}
const stations: Array<Station> = [
  { label: "Berlin", value: "10381" },
  { label: "Hamburg", value: "10147" },
  { label: "Köln", value: "10513" },
  { label: "Dresden", value: "10488" },
  { label: "München", value: "10870" },
];

function App() {
  const [token, setToken] = useState<null | string>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [station, setStation] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);

  const getToken = () => {
    /* const getAccess = async () => {
      const response = await axios.get("/token");
      console.log(response);
    };
    getAccess(); */
    setToken(acessToken);
  };

  const fetchWeatherData = async (station: string) => {
    if (!station) {
      setError("Please select a station!");
      setWeatherData(null);
      return;
    }
    setError(null);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const now: Date = new Date();
    const end: Date = new Date();
    end.setDate(now.getDate() + 4);

    //!fix timezone or its correct?
    const formattedStartDate: string = new Date(
      now.toString().split("GMT")[0] + " UTC"
    ).toISOString();
    const formattedEndDate: string = new Date(
      end.toString().split("GMT")[0] + " UTC"
    ).toISOString();

    //console.log(formattedStartDate, formattedEndDate);

    const res = await axios.get(
      `https://shopman-bff-backend.metops.net/mos/${station}?dtgStart=${formattedStartDate}&dtgEnd=${formattedEndDate}`,
      config
    );

    if (res.status === 200 && res?.data?.stations?.length) {
      setWeatherData(res.data.stations[0]);
    } else {
      setError("please try again later!");
    }
  };
  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-center items-center py-6 px-2">
      <header className="self-start text-lg mb-4 leading-tight">
        Coding task for{" "}
        <a href="https://wettermanufaktur.de/en/home.html">Wettermanufaktur</a>
        <span className="block text-sm text-left text-gray-400">
          Roxana Martins -{" "}
          <a className="underline" href="https://github.com/xrfg">
            https://github.com/xrfg
          </a>
        </span>
      </header>
      {!token ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 duration-150 ease-in-out rounded-lg px-2 py-1 shadow-sm text-white"
          onClick={getToken}
        >
          Get weather data
        </button>
      ) : (
        <main className="w-full flex flex-col gap-4 justify-center">
          <h4>
            <b className="text-lg">Hourly Weather</b>
            {station && <span> - {station}</span>}
          </h4>

          <div id="station-select" className="w-fit">
            <label className=" text-sm pr-2" htmlFor="station-select">
              Select a city
            </label>
            <select
              className="block w-full rounded-sm px-2 py-1 text-sm shadow-sm cursor-pointer focus:outline-none bg-blue-50 border"
              onChange={(e) => {
                const val = stations.find((st) => st.value === e.target.value);
                setStation(val?.label);
                fetchWeatherData(e.target.value);
              }}
              name="stations"
              id="station-select"
            >
              <option value="">--Please choose an option--</option>
              {stations.map((station: Station) => {
                return (
                  <option key={station.value} value={station.value}>
                    {station.label}
                  </option>
                );
              })}
            </select>
            {error && (
              <p className="text-sm text-red-500 font-bold text-center">
                {error}
              </p>
            )}
          </div>
          {weatherData && (
            <HourlyList weatherData={weatherData} station={station} />
          )}
        </main>
      )}
    </div>
  );
}

export default App;
