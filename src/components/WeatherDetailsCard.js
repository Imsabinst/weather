import React from "react";
import "./weatherDetailsCard.css";

const WeatherDetailsCard = ({ currentWeather, singleLocation }) => {
  return (
    <div className="weather__info">
      <div>
        <p>
          {singleLocation.EnglishName}{" "}
          <sup className="sup__name">{singleLocation.Country.ID}</sup>
        </p>
      </div>
      <div className="temp_details">
        <div className="temp__value">
          {currentWeather[0].Temperature.Metric.Value}&deg;
          <b>{currentWeather[0].Temperature.Metric.Unit}</b>
        </div>
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
