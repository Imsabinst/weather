import React from "react";
import "./weatherDetailsCard.css";

const WeatherDetailsCard = ({ currentWeather, location }) => {
  return (
    <div className="info">
      <div>
        {location.EnglishName}, {location.Country.ID}
      </div>
      <div>
        {currentWeather[0].Temperature.Metric.Value}&deg;{" "}
        {currentWeather[0].Temperature.Metric.Unit}
      </div>
      <div>
        <img
          alt="weatherIcon"
          src={
            currentWeather[0].WeatherIcon < 10
              ? `https://developer.accuweather.com/sites/default/files/0${currentWeather[0].WeatherIcon}-s.png`
              : `https://developer.accuweather.com/sites/default/files/${currentWeather[0].WeatherIcon}-s.png`
          }
        />
      </div>
      <div>{currentWeather[0].WeatherText}</div>
    </div>
  );
};

export default WeatherDetailsCard;
