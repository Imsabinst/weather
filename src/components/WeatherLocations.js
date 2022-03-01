import { useEffect, useState } from "react";
import axios from "axios";
import { apikey } from "../data/constants";
import "./weatherLocations.css";

import WeatherDetailsCard from "./WeatherDetailsCard";

const WeatherLocations = ({ location }) => {
  const [currentWeather, setCurrentWeather] = useState("");
  const [singleLocation, setSingleLocation] = useState("");

  const getMoreInfo = async (cw) => {
    if (cw) {
      try {
        const url = `https://dataservice.accuweather.com/currentconditions/v1/${cw.Key}?apikey=${apikey}`;
        const res = await axios.get(url);
        const location_data = await res.data;
        setCurrentWeather(location_data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getMoreInfo();
  }, []);

  return (
    <div>
      <div className="container">
        {location &&
          location.map((cw, index) => {
            return (
              <div key={index}>
                <div className="card">
                  {cw.EnglishName}, {cw.Country.EnglishName}
                  <button
                    className="button"
                    onClick={() => {
                      getMoreInfo(cw);
                      setSingleLocation(cw);
                    }}
                  >
                    More info
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {currentWeather ? (
        <WeatherDetailsCard
          currentWeather={currentWeather}
          location={singleLocation}
        />
      ) : null}
    </div>
  );
};

export default WeatherLocations;
