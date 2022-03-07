import { useEffect, useState } from "react";
import axios from "axios";
import WeatherLocations from "./WeatherLocations";
import { apikey, baseURL } from "../data/constants";
import "./homepage.css";
import WeatherDetailsCard from "./WeatherDetailsCard";

const Homepage = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [singleLocation, setSingleLocation] = useState("");
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      const loc_url = `${baseURL}/locations/v1/search?apikey=${apikey}&q=${city}`;
      const res = await axios.get(loc_url);
      const city_data = await res.data;
      setLocation(city_data);
    } catch (error) {
      console.log(error);
    }
    setCity("");
  };

  useEffect(() => {
    setCurrentWeather("");
  }, [location]);

  return (
    <div className="main">
      <input
        required
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        type="text"
        placeholder="Enter a city name"
      />
      <button
        onClick={() => {
          if (city === "") {
            setError(true);
          } else {
            getData(city);
            setError(false);
          }
        }}
        variant="primary"
      >
        Submit
      </button>
      <div>
        {location ? (
          <WeatherLocations
            location={location}
            setCurrentWeather={setCurrentWeather}
            setSingleLocation={setSingleLocation}
          />
        ) : null}
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

export default Homepage;
